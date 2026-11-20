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
    vec2 GLF_dead12injectionSwitch;
};

struct GLF_dead12QuicksortObject {
    int numbers[10];
};

GLF_dead12QuicksortObject GLF_dead12obj = GLF_dead12QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead12swap(int GLF_dead12i, int GLF_dead12j) {
    int GLF_dead12temp = GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12i, 10)];
    GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12i, 10)] = GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j, 10)];
    GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j, 10)] = GLF_dead12temp;
}

vec3 GLF_dead12palette(vec3 GLF_dead12a, vec3 GLF_dead12b, vec3 GLF_dead12c, vec3 GLF_dead12d) {
    return fract(mix(GLF_dead12d * GLF_dead12a, GLF_dead12a * GLF_dead12c, GLF_dead12b + GLF_dead12d - GLF_dead12c));
}

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead11resolution;
};

float GLF_dead11b_b = _GLF_FUZZED((2395.7835));
const int GLF_dead13dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead8resolution;
};

struct GLF_dead7BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead7BST GLF_dead7tree[10] = GLF_dead7BST[10](GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0));

void GLF_dead7makeTreeNode(inout GLF_dead7BST GLF_dead7tree, int GLF_dead7data) {
    GLF_dead7tree.data = GLF_dead7data;
    GLF_dead7tree.leftIndex = -1;
    GLF_dead7tree.rightIndex = -1;
}

int GLF_dead7search(int GLF_dead7target) {
    GLF_dead7BST GLF_dead7currentNode = GLF_dead7BST(0, 0, 0);
    int GLF_dead7index = 0;
    while (GLF_dead7index != -1) {
        GLF_dead7currentNode = GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7index, 10)];
        if (GLF_dead7currentNode.data == GLF_dead7target) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                return GLF_dead7target;
            }
        }
        GLF_dead7index = GLF_dead7target > GLF_dead7currentNode.data ? GLF_dead7currentNode.rightIndex : GLF_dead7currentNode.leftIndex;
    }
    for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) | (_GLF_IDENTITY(1, ~(~(1))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        return -1;
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(GLF_dead7target);
        vec2 donor_replacementGLF_dead11position = _GLF_FUZZED(vec2(83.25, 75.13));
        if (abs(donor_replacementGLF_dead11position.y - donor_replacementGLF_dead11position.x) < 0.5) {
            GLF_dead11b_b = clamp(float(bitfieldExtract(int(GLF_dead11resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead11msb8)), GLF_dead11b_b * float(bitCount(donor_replacementGLF_dead11msb8)) * 3.0);
        }
    }
}

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_dead4time;
};

float GLF_dead4h_r = _GLF_FUZZED((-(-168.130)));
float GLF_dead4s_g = _GLF_FUZZED(-6746.1574);
float GLF_dead4b_b = _GLF_FUZZED(-52.78);

void GLF_dead4doConvert() {
    vec3 GLF_dead4temp = _GLF_FUZZED(fwidthCoarse(vec3(1281.3416, 371.374, 2.0)));
    GLF_dead4temp = GLF_dead4b_b * (_GLF_IDENTITY(1.0, 0.0 + (1.0)) - GLF_dead4s_g) + (GLF_dead4b_b - GLF_dead4b_b * (1.0 - GLF_dead4s_g)) * clamp(abs(abs(6.0 * (GLF_dead4h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(((ivec2(84804, 71784) ^ ivec2(-10386, -94230)) % 70565));
        {
            if (donor_replacementGLF_dead13pos.x < GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] + 15 && donor_replacementGLF_dead13pos.x > GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] - 15) {
                float GLF_dead13p = (15.0 - abs(float(donor_replacementGLF_dead13pos.x - GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)]))) / 15.0;
                ;
            }
            donor_replacementGLF_dead13pos.y++;
        }
    }
    GLF_dead4h_r = GLF_dead4temp.x;
    GLF_dead4s_g = GLF_dead4temp.y;
    GLF_dead4b_b = GLF_dead4temp.z;
}

vec3 GLF_dead4computeColor(float GLF_dead4c, vec2 GLF_dead4position) {
    GLF_dead4h_r = fract(GLF_dead4c);
    GLF_dead4s_g = 1.0;
    GLF_dead4b_b = (0.5 + (sin(GLF_dead4time) * 0.5 + 0.5));
    GLF_dead4doConvert();
    GLF_dead4s_g *= 1.0 / GLF_dead4position.y;
    GLF_dead4h_r *= 1.0 / GLF_dead4position.x;
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 ^ 0) | 0)); _injected_loop_counter--) {
        if (abs(GLF_dead4position.y - GLF_dead4position.x) < 0.5) {
            GLF_dead4b_b = clamp(0.0, 1.0, GLF_dead4b_b * 3.0);
        }
    }
    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        return vec3(GLF_dead4h_r, GLF_dead4s_g, GLF_dead4b_b);
    }
}

vec3 GLF_dead4defaultColor() {
    return vec3(0.0);
}

vec3 GLF_dead4drawShape(vec2 GLF_dead4pos, vec2 GLF_dead4square, vec3 GLF_dead4setting) {
    bool GLF_dead4c1 = GLF_dead4pos.x - GLF_dead4setting.x < GLF_dead4square.x;
    if (!GLF_dead4c1) {
        return GLF_dead4defaultColor();
    }
    bool GLF_dead4c2 = GLF_dead4pos.x + GLF_dead4setting.x > GLF_dead4square.x;
    if (!GLF_dead4c2) {
        return GLF_dead4defaultColor();
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(-84148));
            {
                donor_replacementGLF_dead6p.y++;
            }
        }
    }
    bool GLF_dead4c3 = GLF_dead4pos.y - GLF_dead4setting.x < GLF_dead4square.y;
    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))), min(((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))), ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2)))))); _injected_loop_counter++) {
        if (!GLF_dead4c3) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                return _GLF_IDENTITY(GLF_dead4defaultColor(), (true ? GLF_dead4defaultColor() : _GLF_FUZZED(vec3(-0.0, -96.50, -4.2))));
            }
        }
    }
    bool GLF_dead4c4 = GLF_dead4pos.y + GLF_dead4setting.x > GLF_dead4square.y;
    if (!GLF_dead4c4) {
        return GLF_dead4defaultColor();
    }
    bool GLF_dead4c5 = GLF_dead4pos.x - (GLF_dead4setting.x - GLF_dead4setting.y) < GLF_dead4square.x;
    if (!GLF_dead4c5) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead7baseIndex = _GLF_FUZZED((((-80210) >> (-19522)) / 95632));
            int donor_replacementGLF_dead7data = _GLF_FUZZED(floatBitsToInt(GLF_dead4pos)[1]);
            int donor_replacementGLF_dead7treeIndex = _GLF_FUZZED(39653);
            {
                do {
                    GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex = donor_replacementGLF_dead7treeIndex;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                GLF_dead7makeTreeNode(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7treeIndex, 10)], donor_replacementGLF_dead7data);
                ;
            }
        }
        return GLF_dead4computeColor(GLF_dead4setting.z / 40.0, GLF_dead4pos);
    }
    bool GLF_dead4c6 = GLF_dead4pos.x + (GLF_dead4setting.x - GLF_dead4setting.y) > GLF_dead4square.x;
    if (!GLF_dead4c6) {
        return GLF_dead4computeColor(GLF_dead4setting.z / 40.0, GLF_dead4pos);
    }
    bool GLF_dead4c7 = GLF_dead4pos.y - (GLF_dead4setting.x - _GLF_IDENTITY(GLF_dead4setting.y, max(GLF_dead4setting.y, _GLF_IDENTITY(GLF_dead4setting.y, clamp(GLF_dead4setting.y, GLF_dead4setting.y, GLF_dead4setting.y))))) < GLF_dead4square.y;
    if (!GLF_dead4c7) {
        return GLF_dead4computeColor(GLF_dead4setting.z / 40.0, GLF_dead4pos);
    }
    bool GLF_dead4c8 = _GLF_IDENTITY(GLF_dead4pos.y + (GLF_dead4setting.x - GLF_dead4setting.y), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? (GLF_dead4pos.y + (GLF_dead4setting.x - GLF_dead4setting.y)) : _GLF_FUZZED(sinh(GLF_dead4s_g)))) > GLF_dead4square.y;
    if (!GLF_dead4c8) {
        return GLF_dead4computeColor(GLF_dead4setting.z / 40.0, GLF_dead4pos);
    }
    return GLF_dead4defaultColor();
}

const vec4 GLF_dead5pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (1.0) * 1.0), 1.0, 1.0)), 1.0))), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead5picdata[8] = vec4[8](vec4(4, 4, _GLF_IDENTITY(20, (_GLF_IDENTITY(20, (_GLF_IDENTITY(20, clamp(20, 20, 20))) | 0)) * 1), 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, _GLF_IDENTITY(2, 1 * (_GLF_IDENTITY(2, (0 << _GLF_IDENTITY(int(7), int(7))) + (2))))), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead5collision(vec2 GLF_dead5pos, vec4 GLF_dead5quad) {
    if (GLF_dead5pos.x < GLF_dead5quad.x) {
        return false;
    }
    if (GLF_dead5pos.y < _GLF_IDENTITY(GLF_dead5quad.y, clamp(GLF_dead5quad.y, _GLF_IDENTITY(GLF_dead5quad.y, mix(float(GLF_dead5quad.y), float(_GLF_FUZZED(-787.180)), bool(false))), GLF_dead5quad.y))) {
        return false;
    }
    if (GLF_dead5pos.x > GLF_dead5quad.x + GLF_dead5quad.z) {
        return false;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | (0 | 0))); _injected_loop_counter--) {
            ;
        }
    }
    if (GLF_dead5pos.y > GLF_dead5quad.y + GLF_dead5quad.w) {
        return false;
    }
    return true;
}

layout(set = 0, binding = 6) uniform sampler2D GLF_dead3tex;
float GLF_dead0b_b = _GLF_FUZZED(-84.29);
layout(set = 0, binding = 7) uniform sampler2D GLF_dead1tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(10.08, -2228.6646, -3993.5567, -2.1);
    }
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    for (int j = -1; _GLF_IDENTITY(j, (j) - 0) <= int(injectionSwitch.y); j++) {
        for (int i = -1; i <= int(injectionSwitch.y); i++) {
            vec4 GLF_merged2_0_2_1_2_2_1go;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead7baseIndex = _GLF_FUZZED(i);
                        if (GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex == -1) {
                            GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex = i;
                            GLF_dead7makeTreeNode(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], j);
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat3x4(-782.387, 5551.7925, -41.60, -1.4, 2522.2961, 2.1, 5.2, 2.3, 3.6, -8.7, _GLF_IDENTITY(605.403, min(605.403, 605.403)), -4.5) * vec3(56.55, _GLF_IDENTITY(-58.56, max(-58.56, -58.56)), -9424.9478));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec3 donor_replacementGLF_dead12color = _GLF_FUZZED(vec3(-9.4, -34.61, 8.0));
                                        vec2 donor_replacementGLF_dead12grid = _GLF_FUZZED(injectionSwitch);
                                        vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED(smoothstep(GLF_dead0b_b, x.y, vec3(-4.4, -554.593, -6.4).ss));
                                        if (donor_replacementGLF_dead12uv.x > (3.0 / 4.0)) {
                                            int GLF_dead12count = int(GLF_dead12injectionSwitch.x);
                                            do {
                                                donor_replacementGLF_dead12color -= GLF_dead12palette(vec3(float(GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead12injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead12injectionSwitch.x, 0.6, float(GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead12injectionSwitch.x), 10)]) * 0.1));
                                                GLF_dead12count++;
                                            } while (GLF_dead12count != GLF_dead12obj.numbers[2]);
                                            donor_replacementGLF_dead12grid += vec2(GLF_dead12count + GLF_dead12obj.numbers[3], GLF_dead12count + GLF_dead12obj.numbers[3]);
                                        }
                                    }
                                    _GLF_color = (mat3x4(1905.4568, 75.19, -5076.3558, 8.5, 6.6, -8.3, -372.939, 2.9, 5519.3199, -7.7, -4601.2254, 10.96) * vec3(170.863, 8.5, 1.6));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                            }
                        } else {
                            do {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = vec4(-6286.8579, -206.919, -743.105, 2895.7054);
                                    } else {
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = asinh(vec4(2.1, -2814.4062, 35.11, -7388.3815));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            donor_replacementGLF_dead7baseIndex = GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex;
                            continue;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = normalize(_GLF_color);
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_color;
                        } else {
                        }
                    }
                }
            }
            vec2 g = vec2(float(j), float(i));
            GLF_merged2_0_2_1_2_2_1go.xy = g;
            vec2 o = mix(n, GLF_merged2_0_2_1_2_2_1go.xy, 0.2);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead12i = _GLF_FUZZED(abs(j));
                {
                    if (GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] <= j) {
                        donor_replacementGLF_dead12i++;
                        GLF_dead12swap(donor_replacementGLF_dead12i, j);
                    }
                }
            }
            GLF_merged2_0_2_1_2_2_1go.zw = o;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), bool(bvec2((injectionSwitch.x < injectionSwitch.y), false)))))) {
                if (injectionSwitch.x < (m.x)) {
                    int k = 1;
                    while (_GLF_IDENTITY(k >= 0, (k >= 0) || false)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                            GLF_merged2_0_2_1_2_2_1go.zw = _GLF_IDENTITY(GLF_merged2_0_2_1_2_2_1go, clamp(GLF_merged2_0_2_1_2_2_1go, GLF_merged2_0_2_1_2_2_1go, GLF_merged2_0_2_1_2_2_1go)).zw + GLF_merged2_0_2_1_2_2_1go.zw;
                        } else {
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED((GLF_merged2_0_2_1_2_2_1go * mat2x4(-80.42, 439.201, 364.471, 6.2, -7.0, 3.2, 732.698, -1411.2785)));
                                    if (donor_replacementGLF_dead12uv.x > (2.0 / 4.0)) {
                                        int GLF_dead12count = int(GLF_dead12injectionSwitch.x);
                                        do {
                                            m -= GLF_dead12palette(vec3(float(GLF_dead12obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead12injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead12injectionSwitch.x, float(GLF_dead12obj.numbers[2]) * 0.1, float(GLF_dead12obj.numbers[8]) * 0.1));
                                            GLF_dead12count++;
                                        } while (GLF_dead12count != GLF_dead12obj.numbers[1]);
                                        n += vec2(GLF_dead12count + int(GLF_dead12injectionSwitch.y), GLF_dead12count + int(GLF_dead12injectionSwitch.x));
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mat4(1.0) * (_GLF_outVarBackup_GLF_color)), _GLF_outVarBackup_GLF_color));
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } else {
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(63151);
                                vec2 donor_replacementGLF_dead11position = _GLF_FUZZED(n);
                                if (abs(donor_replacementGLF_dead11position.y - donor_replacementGLF_dead11position.x) < 0.5) {
                                    GLF_dead11b_b = clamp(float(bitfieldExtract(int(GLF_dead11resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead11msb8)), GLF_dead11b_b * float(bitCount(donor_replacementGLF_dead11msb8)) * 3.0);
                                }
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), bool(bvec2(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false)))) {
                                _GLF_color = smoothstep(GLF_merged2_0_2_1_2_2_1go, vec4(-7.3, 6.5, 67.21, -0.9), GLF_merged2_0_2_1_2_2_1go);
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(_GLF_IDENTITY(1, ~(~(1))), _GLF_IDENTITY(int(int(_GLF_IDENTITY(_GLF_IDENTITY(1, ~(~(1))), clamp(_GLF_IDENTITY(1, ~(~(1))), _GLF_IDENTITY(1, ~(~(1))), _GLF_IDENTITY(1, ~(~(1))))))), 0 | (int(int(_GLF_IDENTITY(_GLF_IDENTITY(1, ~(~(1))), clamp(_GLF_IDENTITY(1, ~(~(1))), _GLF_IDENTITY(1, ~(~(1))), _GLF_IDENTITY(1, ~(~(1))))))))))); _injected_loop_counter++) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(-7.4, 1498.4654, -58.57, 3.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= 0.0), bool(bvec2((gl_FragCoord.x >= 0.0), false)))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead7count = _GLF_FUZZED(18004);
                                    if (i == -1) {
                                        donor_replacementGLF_dead7count++;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fwidth(GLF_merged2_0_2_1_2_2_1go);
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mod(vec4(7.5, -4.1, 6.2, -165.637), 2098.8703);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    int donor_replacementGLF_dead2result = _GLF_FUZZED(j);
                                    int donor_replacementGLF_dead2sum = _GLF_FUZZED(i);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = step(_GLF_color, vec4(-35.14, -1.7, 8507.7942, 5817.2138));
                                    }
                                    {
                                        switch (donor_replacementGLF_dead2result) {
                                            case -1:
                                                donor_replacementGLF_dead2sum += 1;
                                                break;
                                            case 0:
                                                ;
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_IDENTITY(_GLF_color = floor(vec4(9.0, -8.4, 51.61, 0.8)), (false ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : (_GLF_color = floor(vec4(9.0, -8.4, 51.61, 0.8)))));
                                                    } else {
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = atan(vec4(-440.536, -129.954, 7.6, 3.8), vec4(7.9, 0.4, -93.86, 417.293)).abbb;
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(4.0, 142.561, -92.55, -9089.8872);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            int donor_replacementGLF_dead12count = _GLF_FUZZED(k);
                                                            do {
                                                                m -= GLF_dead12palette(vec3(float(GLF_dead12obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead12injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead12injectionSwitch.x, float(GLF_dead12obj.numbers[2]) * 0.1, float(GLF_dead12obj.numbers[8]) * 0.1));
                                                                donor_replacementGLF_dead12count++;
                                                            } while (donor_replacementGLF_dead12count != GLF_dead12obj.numbers[1]);
                                                        }
                                                    }
                                                }
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, false || (injectionSwitch.x > injectionSwitch.y))) || false))))) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                        } else {
                                            _GLF_color = _GLF_IDENTITY(vec4(526.851, 636.999, 7.0, -4037.4715), min(vec4(526.851, 636.999, 7.0, _GLF_IDENTITY(-4037.4715, mix(float(_GLF_FUZZED(-60.01)), float(_GLF_IDENTITY(-4037.4715, mix(float(_GLF_FUZZED(-4991.1072)), float(-4037.4715), bool(true)))), bool(true)))), vec4(526.851, 636.999, 7.0, -4037.4715)));
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    for (int _injected_loop_counter = (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        _GLF_color = _GLF_IDENTITY(vec4(-1973.4354, -2705.5838, _GLF_IDENTITY(-38.96, max(_GLF_IDENTITY(-38.96, mix(float(_GLF_FUZZED(-72.18)), float(-38.96), bool(true))), -38.96)), 0.3), min(vec4(-1973.4354, -2705.5838, _GLF_IDENTITY(-38.96, max(_GLF_IDENTITY(-38.96, mix(float(_GLF_FUZZED(-72.18)), float(-38.96), bool(true))), -38.96)), 0.3), _GLF_IDENTITY(vec4(-1973.4354, -2705.5838, _GLF_IDENTITY(-38.96, max(_GLF_IDENTITY(-38.96, mix(float(_GLF_FUZZED(-72.18)), float(-38.96), bool(true))), -38.96)), 0.3), (vec4(-1973.4354, -2705.5838, _GLF_IDENTITY(-38.96, max(_GLF_IDENTITY(-38.96, mix(float(_GLF_FUZZED(-72.18)), float(-38.96), bool(true))), -38.96)), 0.3)) / vec4(1.0, 1.0, 1.0, 1.0))));
                                    }
                                }
                            } else {
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, float(_GLF_IDENTITY(mat3(0.0, 0.0, 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0), (mat3(0.0, 0.0, 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0)) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)))), 0.0, 0.0, 0.0, 1.0, cos(0.0), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        do {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = smoothstep(vec4(-3038.7048, 8.8, 93.37, -5548.3494), vec4(-8630.0641, -9914.6642, -5.6, 6855.3131), _GLF_color);
                                }
                                _GLF_color = dFdxCoarse(vec4(660.055, -569.498, 1581.3638, -100.178));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = GLF_merged2_0_2_1_2_2_1go;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            _GLF_color = vec4(-44.82, -8981.0641, 800.771, -35.67);
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), _GLF_IDENTITY((int(1)) ^ 0, min(_GLF_IDENTITY((int(1)) ^ 0, clamp((int(1)) ^ 0, (int(1)) ^ 0, (int(1)) ^ 0)), (int(1)) ^ 0))))); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter < 1, bool(_GLF_IDENTITY(bvec2(_injected_loop_counter < 1, false), bvec2(bvec2(bvec2(_injected_loop_counter < 1, false))))))); _injected_loop_counter++) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            k--;
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-5885.7743, -8.5, 6536.8365, 7913.1172);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = ldexp(GLF_merged2_0_2_1_2_2_1go, ivec4(ivec2(55061, -75702), ivec2(-1468, -46839)));
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                _GLF_color = inversesqrt(vec4(-40.21, -912.156, vec2(434.358, 4.7)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = sinh(vec4(-817.221, -29.30, -5.0, 9.9));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = log(vec4(6.8, -_GLF_IDENTITY(3894.0450, min(3894.0450, 3894.0450)), -_GLF_IDENTITY(301.503, min(301.503, 301.503)), -3.7));
                                        }
                                        int donor_replacementGLF_dead8i = _GLF_FUZZED((_GLF_IDENTITY(findLSB(198696u), (findLSB(198696u)) - 0) & 49700));
                                        if (donor_replacementGLF_dead8i >= int(GLF_dead8resolution.x)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(0.4, 2828.0088, 9917.2740, 2.4);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    do {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        } else {
                                        }
                                        _GLF_color = vec4(vec2(-46.87, 3.5), -1.8, (bvec4(false, false, false, false), 30.86));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, int(_GLF_IDENTITY(ivec4(_injected_loop_counter, 0, 1, 1), (ivec4(_injected_loop_counter, 0, 1, 1)) ^ ivec4(0, 0, 0, 0)))) != 1); _injected_loop_counter++) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        } else {
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    do {
                                        _GLF_color = log(_GLF_color);
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = refract(vec4(759.407, 3.5, -705.238, -6.8), mod(vec4(0.4, 934.621, -2.7, 14.04), -7.3), _GLF_IDENTITY(length(vec4(-4.6, -4149.4273, 23.72, 6461.3480)), float(mat2x3(_GLF_IDENTITY(length(vec4(-4.6, -4149.4273, 23.72, 6461.3480)), (false ? _GLF_FUZZED(GLF_dead4time) : length(vec4(-4.6, -4149.4273, 23.72, 6461.3480)))), 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 1.0, 0.0, 0.0))));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    _GLF_IDENTITY(m = vec3(injectionSwitch.x, cos(GLF_merged2_0_2_1_2_2_1go.zw)), (false ? _GLF_FUZZED(m) : (m = vec3(injectionSwitch.x, cos(GLF_merged2_0_2_1_2_2_1go.zw)))));
                }
            } else {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(8.9, -8250.7258, -1.0, -583.962);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), !(!(!(_GLF_DEAD(false)))))))) {
                        _GLF_color = (vec4(8.1, -5496.9750, -3279.8529, -6.7) - asin(GLF_dead0b_b));
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
        _GLF_color = asin(smoothstep(_GLF_IDENTITY(vec4(76.49, -4.0, 931.069, -0.0), mix(vec4(_GLF_FUZZED(-6.4), _GLF_FUZZED(vec3(-820.512, 903.130, -9.6).b), (vec4(76.49, -4.0, 931.069, -0.0))[2], _GLF_FUZZED(float(false))), vec4(_GLF_IDENTITY((vec4(76.49, -4.0, 931.069, -0.0))[0], min((vec4(76.49, -4.0, 931.069, -0.0))[0], (vec4(76.49, -4.0, 931.069, -0.0))[0])), (vec4(76.49, -4.0, 931.069, -0.0))[1], _GLF_FUZZED(-8443.2815), (vec4(76.49, -4.0, 931.069, -0.0))[3]), bvec4(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), true, false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))), vec4(3.7, 8.0, 7.4, -523.092), vec4(5.0, -22.05, 57.85, -451.049)));
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-80.22, -735.497, 422.336, 5.1);
        }
    }
    return vec2(m.x, m.y - _GLF_IDENTITY(m.z, (_GLF_IDENTITY(m.z, max(m.z, m.z))) / 1.0));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.y;
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(-68394, 23251));
        {
            donor_replacementGLF_dead6p.x = -donor_replacementGLF_dead6p.x;
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        _GLF_color = max(vec4(8.0, -4.5, 3.1, -0.5), GLF_dead4time);
                    }
                }
            } else {
            }
        }
    }
    float A[50];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord)).y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(injectionSwitch);
                int donor_replacementGLF_dead3i = _GLF_FUZZED(int(-3.6));
                vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED(_GLF_color);
                {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), !(!(_GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), true && ((injectionSwitch.x > injectionSwitch.y))))))))) {
                    } else {
                        donor_replacementGLF_dead3coord = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        ivec2 donor_replacementGLF_dead13pos = _GLF_FUZZED((ivec2(76421, 66093) >> ivec2(41654, -36457)));
                        while (donor_replacementGLF_dead13pos.y != 256) {
                            if (donor_replacementGLF_dead13pos.x < GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] + 15 && donor_replacementGLF_dead13pos.x > GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] - 15) {
                                float GLF_dead13p = (15.0 - abs(float(donor_replacementGLF_dead13pos.x - GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)]))) / 15.0;
                                ;
                            }
                            donor_replacementGLF_dead13pos.y++;
                        }
                    }
                    donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                    donor_replacementGLF_dead3texel = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        bool donor_replacementGLF_dead11c5 = _GLF_FUZZED(false);
                        int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(-26768);
                        vec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(resolution);
                        vec3 donor_replacementGLF_dead11setting = _GLF_FUZZED(faceforward((fma(vec3(-90.23, 1519.1602, -9.2), vec3(-8732.6272, -3.5, 1.1), vec3(7477.6616, -72.38, 890.039)) * mat3(335.951, 7825.9736, -2954.2746, -2.7, -7690.8853, 53.23, 2.2, 177.498, -5335.0707)), vec3(414.761, -7109.4903, -620.952), vec3(-9.2, 5220.1579, -9886.7709)));
                        if (!donor_replacementGLF_dead11c5) {
                            ;
                        }
                    }
                    donor_replacementGLF_dead3i++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead12h = _GLF_FUZZED((20049 * (-17139)));
                int donor_replacementGLF_dead12i = _GLF_FUZZED(-61593);
                int donor_replacementGLF_dead12l = _GLF_FUZZED(29599);
                int donor_replacementGLF_dead12pivot = _GLF_FUZZED(8497);
                for (int GLF_dead12j = donor_replacementGLF_dead12l; GLF_dead12j <= donor_replacementGLF_dead12h - 1; GLF_dead12j++) {
                    if (GLF_dead12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j, 10)] <= donor_replacementGLF_dead12pivot) {
                        donor_replacementGLF_dead12i++;
                        GLF_dead12swap(donor_replacementGLF_dead12i, GLF_dead12j);
                    }
                }
            }
            _GLF_color = log((faceforward(GLF_dead0b_b, 9.4, 119.214) / vec4(-3.0, -85.49, -58.11, 38.67)));
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            _GLF_color = exp((-_GLF_color));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-6501.7811, 6.1, -9.3, -4125.5263);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = mat3x4(mat2x3(5.9, 0.2, -649.643, 0.8, 512.397, 63.91))[0];
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(6.9, 59.89, 172.853, 40.81);
    }
    for (int i = 0; i < 200; i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            bool donor_replacementGLF_dead11c6 = _GLF_FUZZED((uvec3(111240u, 73926u, 68986u) != min((uvec3(21640u, 118483u, 143291u) ^ uvec3(144790u, 165122u, 50437u)), uvec3(94489u, 79477u, 21273u))));
            int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(-95222);
            vec3 donor_replacementGLF_dead11setting = _GLF_FUZZED(vec3(-7.1, 3.4, 7304.3076));
            if (!donor_replacementGLF_dead11c6) {
                ;
            }
        }
        if (i >= int(resolution.x)) {
            break;
        }
        if ((4 * (i / 4)) == i) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = floor(dFdx(vec4(4.4, -1.8, -207.247, -89.88)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(75678);
                        vec2 donor_replacementGLF_dead11position = _GLF_FUZZED(vec2(GLF_dead0b_b));
                        if (abs(donor_replacementGLF_dead11position.y - donor_replacementGLF_dead11position.x) < 0.5) {
                            GLF_dead11b_b = clamp(float(bitfieldExtract(int(GLF_dead11resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead11msb8)), GLF_dead11b_b * float(bitCount(donor_replacementGLF_dead11msb8)) * 3.0);
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            A[i / 4] = float(i);
        }
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            break;
        }
        if (i > 0) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_IDENTITY(A[i] += A[i - 1], (_GLF_IDENTITY(true ? (A[i] += A[i - 1]) : _GLF_FUZZED(1.3), (false ? _GLF_FUZZED(GLF_dead4time) : (true ? (A[i] += A[i - 1]) : _GLF_FUZZED(1.3))))));
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(86.56, 0.5, -890.175, 4.1);
                }
            }
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    do {
                        _GLF_color = min(vec4(5.5, -1895.1150, -1.4, -417.822), atan(vec4(-8276.7553, 6.9, 3.8, 9903.0968), fwidthCoarse(_GLF_color)));
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))), !(_GLF_IDENTITY(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))), !(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))), true && (_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))))))))), bool(bvec2(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))), !(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))), true && (_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(145.421)), float(0.0), bool(true))))))))))), true))))))) {
        _GLF_color = cos(vec4(9.2, -3.9, 3123.5111, 6038.1724));
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            vec2 donor_replacementGLF_dead4center = _GLF_FUZZED(atan(reflect(resolution, vec2(70.39, _GLF_IDENTITY(5.3, (true ? 5.3 : _GLF_FUZZED((+GLF_dead4h_r)))))), vec2(8782.6136, -3.9)));
            int donor_replacementGLF_dead4i = _GLF_FUZZED(findLSB(134665u));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-2.2, 2.5, 6170.6455, -6979.8093);
                }
            }
            vec2 donor_replacementGLF_dead4position = _GLF_FUZZED(uv);
            vec3 donor_replacementGLF_dead4result = _GLF_FUZZED(max(intBitsToFloat(ivec3(-5142, -41701, -44662)), smoothstep(vec3(-733.026, -6.1, _GLF_IDENTITY(9.6, (9.6) - length(vec2(0.0, 0.0)))), vec3(2557.6257, 4.3, 8.4), vec3(6.0, 4720.2671, 215.801))));
            {
                vec3 GLF_dead4d = _GLF_FUZZED(ceil(vec3(-6.7, -19.00, -95.31)));
                GLF_dead4d = GLF_dead4drawShape(donor_replacementGLF_dead4position, donor_replacementGLF_dead4center + vec2(sin(float(donor_replacementGLF_dead4i) / 10.0 + GLF_dead4time) / 4.0, 0.0), vec3(0.01 + sin(float(donor_replacementGLF_dead4i) / 100.0), 0.01, float(donor_replacementGLF_dead4i)));
                if (length(GLF_dead4d) <= 0.0) {
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = step(degrees(62.44), vec4(-96.80, -592.705, -4092.1839, 2.1));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, bool(bvec4(_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, !(!(injectionSwitch.x < injectionSwitch.y))), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false))))))) {
                    donor_replacementGLF_dead4result = vec3(GLF_dead4d);
                } else {
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < determinant(mat2(0.0, 1.0, sqrt(0.0), sqrt(0.0)))), !(!(_GLF_IDENTITY((gl_FragCoord.y < determinant(mat2(0.0, 1.0, sqrt(0.0), sqrt(0.0)))), true && ((gl_FragCoord.y < determinant(mat2(0.0, 1.0, sqrt(0.0), sqrt(0.0)))))))))))) {
            {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2.8, -436.530, 1.9, -5397.0687);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, float(vec2(injectionSwitch.x, 0.0))) < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } else {
                    if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false)))))))) {
                        vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(fwidthFine((bvec2(false, false).r ? uv : uv)));
                        vec4 donor_replacementGLF_dead5quad = _GLF_FUZZED(vec4(resolution, GLF_dead0b_b, GLF_dead0b_b));
                        if (donor_replacementGLF_dead5pos.y > donor_replacementGLF_dead5quad.y + donor_replacementGLF_dead5quad.w) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(77153);
                                    vec2 donor_replacementGLF_dead11position = _GLF_FUZZED(injectionSwitch);
                                    if (abs(donor_replacementGLF_dead11position.y - donor_replacementGLF_dead11position.x) < 0.5) {
                                        GLF_dead11b_b = clamp(float(bitfieldExtract(int(GLF_dead11resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead11msb8)), GLF_dead11b_b * float(bitCount(donor_replacementGLF_dead11msb8)) * 3.0);
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(_GLF_IDENTITY(-9.8, max(-9.8, -9.8)), 4.4, 8618.3107, -8.2);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            ;
                        }
                    }
                }
                GLF_dead0b_b = clamp(_GLF_IDENTITY(_GLF_IDENTITY(0.0, (true ? _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(777.587)), float(0.0), bool(true))) : _GLF_FUZZED(determinant(mat3(-8582.1330, -1060.7760, 9.0, 37.80, -327.227, 7.5, -1.1, -6.4, -8726.8756))))), abs(1.0) * (_GLF_IDENTITY(0.0, (true ? _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(777.587)), float(0.0), bool(true))) : _GLF_FUZZED(determinant(mat3(-8582.1330, -1060.7760, 9.0, 37.80, -327.227, 7.5, -1.1, -6.4, -8726.8756))))))), 1.0, GLF_dead0b_b * 3.0);
            }
        }
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-822.788, -398.074, -534.295, 1.4);
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)).x > injectionSwitch.y)))) {
                _GLF_color = (_GLF_IDENTITY(all(greaterThan(uvec4(117491u, 103321u, 144086u, 109896u), uvec4(137608u, 9809u, 821u, 6281u))) ? _GLF_color : _GLF_outVarBackup_GLF_color, mix(vec4((all(greaterThan(uvec4(117491u, 103321u, 144086u, 109896u), uvec4(137608u, 9809u, 821u, 6281u))) ? _GLF_color : _GLF_outVarBackup_GLF_color)[0], _GLF_FUZZED(5.8), _GLF_FUZZED(9.2), _GLF_FUZZED((403.067 - (-_GLF_IDENTITY(5.1, (5.1) * 1.0))))), vec4(_GLF_FUZZED(5912.5566), (all(greaterThan(uvec4(117491u, 103321u, 144086u, 109896u), uvec4(137608u, 9809u, 821u, 6281u))) ? _GLF_color : _GLF_outVarBackup_GLF_color)[1], (all(greaterThan(uvec4(117491u, 103321u, 144086u, 109896u), uvec4(137608u, 9809u, 821u, 6281u))) ? _GLF_color : _GLF_outVarBackup_GLF_color)[2], (all(greaterThan(uvec4(117491u, 103321u, 144086u, 109896u), uvec4(137608u, 9809u, 821u, 6281u))) ? _GLF_color : _GLF_outVarBackup_GLF_color)[3]), bvec4(false, true, true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead9c_im = _GLF_FUZZED(length(_GLF_IDENTITY(vec3(4.3, 583.589, -3.9), min(vec3(4.3, 583.589, -3.9), _GLF_IDENTITY(vec3(4.3, 583.589, -3.9), vec3(0.0, 0.0, 0.0) + (vec3(4.3, 583.589, -3.9)))))));
                int donor_replacementGLF_dead9iteration = _GLF_FUZZED(floatBitsToInt(dot(GLF_dead4b_b, GLF_dead4h_r)));
                float donor_replacementGLF_dead9x = _GLF_FUZZED(ceil(distance(atan(_GLF_color, _GLF_color), vec4(-7.4, -2262.9368, 925.262, -1.6))));
                float donor_replacementGLF_dead9y = _GLF_FUZZED(GLF_dead4h_r);
                do {
                    if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 4.0) {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_IDENTITY(_GLF_color = cos(vec4(-88.71, 1964.8882, -6.9, -4139.2164)), (false ? _GLF_FUZZED(_GLF_color) : (_GLF_color = cos(vec4(-88.71, 1964.8882, -6.9, -4139.2164)))));
                    }
                    float GLF_dead9x_new = donor_replacementGLF_dead9x * donor_replacementGLF_dead9x - donor_replacementGLF_dead9y * donor_replacementGLF_dead9y + GLF_dead4h_r;
                    donor_replacementGLF_dead9y = 2.0 * donor_replacementGLF_dead9x * donor_replacementGLF_dead9y + donor_replacementGLF_dead9c_im;
                    donor_replacementGLF_dead9x = GLF_dead9x_new;
                    donor_replacementGLF_dead9iteration++;
                } while (_GLF_WRAPPED_LOOP(false));
            }
            int donor_replacementGLF_dead5i = _GLF_FUZZED(bitCount(48830));
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9iteration = _GLF_FUZZED(bitfieldInsert(donor_replacementGLF_dead5i, donor_replacementGLF_dead5i, (donor_replacementGLF_dead5i / donor_replacementGLF_dead5i), -93392));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5.0, -39.87, -6027.0854, -8.4);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float donor_replacementGLF_dead9yCoord = _GLF_FUZZED(tan(GLF_dead4s_g));
                if (donor_replacementGLF_dead9iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
            vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(resolution);
            vec4 donor_replacementGLF_dead5res = _GLF_FUZZED(_GLF_color);
            for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < 8; donor_replacementGLF_dead5i++) {
                if (GLF_dead5collision(donor_replacementGLF_dead5pos, GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)])) {
                    donor_replacementGLF_dead5res = GLF_dead5pal[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY((int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)].x) * int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)].y) + _GLF_IDENTITY(donor_replacementGLF_dead5i, (donor_replacementGLF_dead5i) | 0) * 9 + 11) % 16, max((int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)].x) * int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)].y) + _GLF_IDENTITY(donor_replacementGLF_dead5i, (donor_replacementGLF_dead5i) | 0) * 9 + _GLF_IDENTITY(11, (11) * 1)) % 16, (int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)].x) * int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 8)].y) + _GLF_IDENTITY(donor_replacementGLF_dead5i, (donor_replacementGLF_dead5i) | 0) * 9 + 11) % 16)), 16)];
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(844.442, 9.3, -879.448, -3777.2148);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), (int(_GLF_ZERO(0.0, injectionSwitch.x))) >> 0)); _injected_loop_counter--) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            _GLF_color = vec4(-8549.1621, _GLF_IDENTITY(4923.3871, (true ? 4923.3871 : _GLF_FUZZED(GLF_dead0b_b))), 775.812, 3.5);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = smoothstep(vec4(17.32, -994.776, -4730.3524, -8.9), vec4(-2.4, 31.05, -475.255, 5228.5742), vec4(278.077, 1.5, 162.587, -5.5));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                _GLF_color = vec4(-55.14, -0.1, -6354.0251, 42.29);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    ;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, sin(vec4(0.0, 0.0, 0.0, 0.0)) + (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3]))));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = mix(vec4(-70.96, -414.366, -416.648, 6266.1733), vec4(8.9, -52.37, -584.529, 5.8), -9493.2921);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = ldexp(vec4(-7.4, -6204.2713, -2.3, _GLF_IDENTITY(-5.4, min(_GLF_IDENTITY(-5.4, min(_GLF_IDENTITY(-5.4, 0.0 + (-5.4)), -5.4)), -5.4))), ivec4(-22139, 5191, -31239, 65619));
                        }
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                _GLF_color = vec4(-770.591, -1.1, 308.654, 487.375);
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(-0.9, -1803.9105, 790.747, 8394.0592);
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = (_GLF_color - log2(8350.1875));
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    vec3 col;
    do {
        if (int(gl_FragCoord.y) < 20) {
            col = .5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(A[4], clamp(A[4], _GLF_IDENTITY(A[4], (A[4]) - 0.0), _GLF_IDENTITY(A[4], clamp(A[4], A[4], A[4])))) / resolution.x + 50.0, 22.0));
        } else {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = atan(vec4(524.451, 7616.8643, 842.002, 0.7));
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (int(gl_FragCoord.y) < 40) {
                col = .5 + cos(c.y + vec3(_GLF_IDENTITY(resolution, max(resolution, resolution)).x, A[9] / resolution.x + 50.0, 22.0));
            } else if (int(gl_FragCoord.y) < 60) {
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(findLSB(ivec2(32155, 93135)));
                    if (donor_replacementGLF_dead13pos.x < GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] + 15 && donor_replacementGLF_dead13pos.x > GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] - 15) {
                        float GLF_dead13p = (15.0 - abs(float(donor_replacementGLF_dead13pos.x - GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(_GLF_IDENTITY(82.42, min(_GLF_IDENTITY(82.42, min(82.42, _GLF_IDENTITY(82.42, mix(float(82.42), float(_GLF_FUZZED(-5.3)), bool(false))))), 82.42)), _GLF_IDENTITY(-8934.1065, _GLF_IDENTITY(float(mat2x3(_GLF_IDENTITY(-8934.1065, max(-8934.1065, -8934.1065)), determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, log(1.0), 0.0, 0.0, 0.0, 0.0)), abs(1.0), 0.0, abs(1.0), 0.0)), 0.0 + (float(mat2x3(_GLF_IDENTITY(-8934.1065, max(-8934.1065, -8934.1065)), determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, log(1.0), 0.0, 0.0, 0.0, 0.0)), abs(1.0), 0.0, abs(1.0), 0.0))))), -0.0, 7.9);
                }
                col = .5 + cos(c.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_IDENTITY((_GLF_color / GLF_dead4s_g), max((_GLF_color / GLF_dead4s_g), (_GLF_color / GLF_dead4s_g)));
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidth(vec4(119.985, 73.16, -8.4, -7093.2005));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } else {
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    _GLF_color = vec4(8578.1468, -4.0, -301.883, _GLF_IDENTITY(0.9, (false ? _GLF_FUZZED(1.9) : _GLF_IDENTITY(0.9, (_GLF_IDENTITY(0.9, 0.0 + (0.9))) * cos(0.0)))));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _GLF_IDENTITY(_injected_loop_counter++, (_injected_loop_counter++) * 1)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead13pos = _GLF_FUZZED(ivec2(-8104, -96225));
                    {
                        float GLF_dead13p = (15.0 - abs(float(donor_replacementGLF_dead13pos.x - GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 1.0, 0.0, 0.0, 1.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0))), gl_FragCoord, gl_FragCoord)).y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        } else {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                if (int(gl_FragCoord.y) < 80) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = vec4(-3.0, 290.937, -629.533, -884.264);
                            }
                            col = .5 + cos(_GLF_IDENTITY(c, (true ? c : _GLF_FUZZED(uv))).y + vec3(resolution.x, A[_GLF_IDENTITY(39, clamp(39, 39, 39))] / _GLF_IDENTITY(resolution.x, min(resolution.x, resolution.x)) + 50.0, 22.0));
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(findMSB(22154));
                                vec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(vec2(normalize(GLF_dead4time)));
                                vec3 donor_replacementGLF_dead11setting = _GLF_FUZZED(step(vec3(7.9, -4.8, -850.353), vec3(12.85, -195.502, -8.2)));
                                {
                                    ;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = fwidth(vec4(-80.94, -218.843, 1.7, -_GLF_IDENTITY(20.19, (true ? 20.19 : _GLF_FUZZED(GLF_dead4h_r)))));
                                }
                            } else {
                            }
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdxCoarse(atanh(vec4(92.97, -5315.0521, 3303.8757, -474.540)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(-769.405, -824.635, 6666.6195, -18.98);
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        if (int(gl_FragCoord.y) < 100) {
                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                        } else {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                if (_GLF_IDENTITY(int(gl_FragCoord.y), 0 ^ (int(gl_FragCoord.y))) < 120) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                            col = .5 + cos(_GLF_IDENTITY(c.y, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? c.y : _GLF_FUZZED(GLF_dead4h_r))) + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                        }
                                    } else {
                                    }
                                } else {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color));
                                        _GLF_color = vec4(-950.968, 9.7, -654.676, 6578.6018);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (int(gl_FragCoord.y) < 140) {
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (vec2(641.192, -5858.6542) * mat4x2(mat4(-1.1, 953.000, -0.5, -681.914, -12.48, 6744.0084, 631.153, 58.96, 0.7, 89.88, 41.70, 3.6, 0.3, -183.407, -9.8, -6.9)));
                                                if (_GLF_DEAD(false)) {
                                                    ivec2 donor_replacementGLF_dead13pos = _GLF_FUZZED((ivec2(56098, -87125) | ivec2(-74738, -99943)));
                                                    while (donor_replacementGLF_dead13pos.y != 256) {
                                                        if (donor_replacementGLF_dead13pos.x < GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] + 15 && donor_replacementGLF_dead13pos.x > GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] - 15) {
                                                            float GLF_dead13p = (15.0 - abs(float(donor_replacementGLF_dead13pos.x - GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        donor_replacementGLF_dead13pos.y++;
                                                    }
                                                }
                                            }
                                            col = .5 + cos(c.y + vec3(resolution.x, A[39] / _GLF_IDENTITY(resolution.x, (resolution.x) - 0.0) + 50.0, 22.0));
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            do {
                                                if (int(gl_FragCoord.y) < 160) {
                                                    col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        bool donor_replacementGLF_dead11c6 = _GLF_FUZZED(any(lessThan(uvec4(157481u, 16910u, 6032u, 183874u), uvec4(37015u, 82256u, 155043u, 189515u))));
                                                        int donor_replacementGLF_dead11msb8 = _GLF_FUZZED(((-66820) & 35656));
                                                        vec3 donor_replacementGLF_dead11setting = _GLF_FUZZED(fwidthFine(uintBitsToFloat(uvec3(47300u, 143172u, 119631u))));
                                                        if (!donor_replacementGLF_dead11c6) {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(7280.0311, 373.344, -_GLF_IDENTITY(3.6, min(3.6, _GLF_IDENTITY(3.6, float(mat2x4(3.6, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0))))), -0.7);
                                                        do {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-26.94, 23.63, -8.5, -849.302);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    if (_GLF_DEAD(false)) {
                                                                        ivec2 donor_replacementGLF_dead13pos = _GLF_FUZZED((ivec2(-57976, -23190) - ivec2(-67239, -11436)));
                                                                        while (donor_replacementGLF_dead13pos.y != 256) {
                                                                            if (donor_replacementGLF_dead13pos.x < GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] + 15 && donor_replacementGLF_dead13pos.x > GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)] - 15) {
                                                                                float GLF_dead13p = (15.0 - abs(float(donor_replacementGLF_dead13pos.x - GLF_dead13dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13pos.y, 256)]))) / 15.0;
                                                                                ;
                                                                            }
                                                                            donor_replacementGLF_dead13pos.y++;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-4292.3314, -9488.4340, 54.81, -4.3);
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, !(_GLF_IDENTITY(!(gl_FragCoord.x < 0.0), bool(_GLF_IDENTITY(bvec2(!(gl_FragCoord.x < 0.0), true), bvec2(bvec4(bvec2(!(gl_FragCoord.x < 0.0), true), false, true))))))))))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                    if (int(gl_FragCoord.y) < 180) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        do {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                vec2 donor_replacementGLF_dead1coord = _GLF_FUZZED(cosh((_GLF_IDENTITY(uv * c, vec2(mat2x3(uv * c, 0.0, 0.0, 0.0, 1.0))))));
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = max(vec4(268.467, 9922.1978, -169.658, -91.43), -53.12);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                float donor_replacementGLF_dead1h = _GLF_FUZZED(float(-94603));
                                                                int donor_replacementGLF_dead1i = _GLF_FUZZED(-47949);
                                                                float donor_replacementGLF_dead1refh = _GLF_IDENTITY(_GLF_FUZZED(827.823), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(clamp(GLF_dead4s_g, GLF_dead4h_r, GLF_dead4b_b)) : _GLF_IDENTITY(_GLF_FUZZED(827.823), min(_GLF_FUZZED(827.823), _GLF_FUZZED(827.823)))));
                                                                float donor_replacementGLF_dead1slope = _GLF_FUZZED(length(vec2(3.2, 5681.4154)));
                                                                {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        _GLF_color = (vec4(9851.1856, -89.42, _GLF_IDENTITY(-5742.3402, (true ? (-5742.3402) : _GLF_FUZZED(GLF_dead0b_b))), 412.858) * mat4(-7.7, -1.0, -5.2, -2.1, 9.3, -5.3, -76.87, 3.1, -1.3, -4.8, 37.20, -7361.3847, 218.258, -4.2, 5998.3958, -5.6));
                                                                    }
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (_GLF_IDENTITY((exp2(vec4(-32.50, 707.514, 679.034, 51.94)), dFdxFine(vec4(-_GLF_IDENTITY(1095.6283, (true ? 1095.6283 : _GLF_FUZZED(GLF_dead4time))), -445.846, -874.229, -8497.8040))), (exp2(vec4(-32.50, 707.514, 679.034, 51.94)), dFdxFine(vec4(-_GLF_IDENTITY(1095.6283, (true ? 1095.6283 : _GLF_FUZZED(GLF_dead4time))), -445.846, -874.229, -8497.8040))) / vec4(1.0, 1.0, 1.0, 1.0)));
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, max(injectionSwitch, injectionSwitch)).x < injectionSwitch.y)))) {
                                                                            do {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                        }
                                                                    }
                                                                }
                                                                while (donor_replacementGLF_dead1h < donor_replacementGLF_dead1refh && donor_replacementGLF_dead1i < _GLF_IDENTITY(32, (_GLF_IDENTITY(true ? _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), max(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), (true ? _GLF_IDENTITY(32, int(ivec3(32, 0, 1))) : _GLF_FUZZED(_injected_loop_counter))))) : _GLF_FUZZED(donor_replacementGLF_dead1i), max(true ? _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), max(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), (true ? _GLF_IDENTITY(32, int(ivec3(32, 0, 1))) : _GLF_FUZZED(_injected_loop_counter))))) : _GLF_FUZZED(donor_replacementGLF_dead1i), _GLF_IDENTITY(true ? _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), max(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), (true ? _GLF_IDENTITY(32, int(ivec3(32, 0, 1))) : _GLF_FUZZED(_injected_loop_counter))))) : _GLF_FUZZED(donor_replacementGLF_dead1i), ~(_GLF_IDENTITY(~(true ? _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), max(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), (true ? _GLF_IDENTITY(32, int(ivec3(32, 0, 1))) : _GLF_FUZZED(_injected_loop_counter))))) : _GLF_FUZZED(donor_replacementGLF_dead1i)), (~(true ? _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), max(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), _GLF_IDENTITY(_GLF_IDENTITY(32, int(ivec3(32, 0, 1))), (true ? _GLF_IDENTITY(32, int(ivec3(32, 0, 1))) : _GLF_FUZZED(_injected_loop_counter))))) : _GLF_FUZZED(donor_replacementGLF_dead1i))) << 0)))))))) {
                                                                    donor_replacementGLF_dead1coord -= c;
                                                                    donor_replacementGLF_dead1refh += donor_replacementGLF_dead1slope;
                                                                    donor_replacementGLF_dead1h = texture(GLF_dead1tex, donor_replacementGLF_dead1coord).y;
                                                                    donor_replacementGLF_dead1i++;
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!_GLF_IDENTITY((false), ((false)) && true)))) || false)));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                            _GLF_color = vec4(-822.282, -4748.3932, -8.7, -3.7);
                                                        }
                                                        col = .5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(A[44] / resolution.x + 50.0, mix(float(_GLF_FUZZED(0.0)), float(_GLF_IDENTITY(A[44] / resolution.x + 50.0, max(_GLF_IDENTITY(A[44] / resolution.x + 50.0, max(A[_GLF_IDENTITY(44, 0 | (44))] / resolution.x + 50.0, A[44] / resolution.x + 50.0)), A[44] / resolution.x + 50.0))), bool(true))), _GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, (true ? 22.0 : _GLF_FUZZED(GLF_dead4time))) : _GLF_FUZZED(4.4)))))));
                                                        {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(vec3(-716.871, 9445.9014, 6.0), 0.3);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(vec3(-8.5, -5700.3085, -0.5), 96.37);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) + 0.0) >= determinant(mat4(0.0, 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        } else {
                                                        }
                                                    } else if (int(gl_FragCoord.y) < 200) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        } else {
                                                            col = .5 + _GLF_IDENTITY(cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0)), min(cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0)), cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0))));
                                                        }
                                                    } else {
                                                        discard;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = exp(vec4(-2.7, 8847.2448, -5.0, 5.1));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            int donor_replacementGLF_dead7count = _GLF_FUZZED(findMSB(_injected_loop_counter));
                                                            int donor_replacementGLF_dead7i = _GLF_FUZZED(_injected_loop_counter);
                                                            {
                                                                int GLF_dead7result = GLF_dead7search(donor_replacementGLF_dead7i);
                                                                switch (donor_replacementGLF_dead7i) {
                                                                    case 9:
                                                                    case 5:
                                                                    case 12:
                                                                    case 15:
                                                                    case 7:
                                                                    case 8:
                                                                    case 2:
                                                                    case 6:
                                                                    case 17:
                                                                    case 13:
                                                                        if (GLF_dead7result == _GLF_IDENTITY(donor_replacementGLF_dead7i, min(_GLF_IDENTITY(donor_replacementGLF_dead7i, (donor_replacementGLF_dead7i) | (donor_replacementGLF_dead7i)), donor_replacementGLF_dead7i))) {
                                                                            donor_replacementGLF_dead7count++;
                                                                        }
                                                                        break;
                                                                    default:
                                                                        if (GLF_dead7result == -1) {
                                                                            donor_replacementGLF_dead7count++;
                                                                        }
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = reflect(vec4(9574.7169, 795.397, 923.415, -7949.0254), vec4(0.0, 3.0, 671.837, -294.789));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_IDENTITY(_GLF_color = _GLF_color, (_GLF_color = _GLF_color) / vec4(1.0, 1.0, 1.0, 1.0));
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = min(acos(_GLF_color), (mat3x4(-8690.1513, -558.000, 4.1, _GLF_IDENTITY(-9.7, clamp(-9.7, _GLF_IDENTITY(-9.7, (-9.7) + 0.0), -9.7)), 18.33, 973.829, -6.0, 3824.0343, _GLF_IDENTITY(-7100.7962, float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-7100.7962, mix(float(_GLF_FUZZED(-98.72)), float(-7100.7962), bool(true))), round(length(normalize(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)))))), 1.0, 0.0), (mat2(_GLF_IDENTITY(-7100.7962, mix(float(_GLF_FUZZED(-98.72)), float(-7100.7962), bool(true))), _GLF_IDENTITY(round(length(normalize(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)))))), min(_GLF_IDENTITY(round(length(normalize(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)))))), (false ? _GLF_FUZZED(GLF_dead0b_b) : round(length(normalize(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)))))))), _GLF_IDENTITY(round(length(normalize(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)))))), (true ? round(length(normalize(_GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)))))) : _GLF_FUZZED(log(GLF_dead4b_b)))))), 1.0, 0.0)) / mat2(1.0, 1.0, 1.0, 1.0)))), -897.567, -74.36, -9.2) * vec3(-_GLF_IDENTITY(4882.1387, min(4882.1387, _GLF_IDENTITY(4882.1387, (4882.1387) * 1.0))), 2941.7839, -2723.2596)));
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-5.0, 236.947, 814.326, 4961.5745);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mod((vec4(_GLF_IDENTITY(33.22, clamp(33.22, 33.22, _GLF_IDENTITY(33.22, max(33.22, 33.22)))), -6.4, 3.4, -8.9) * vec4(7.5, 992.464, -343.203, -4624.1034)), degrees(GLF_dead4s_g));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(3.9, 5133.7457, -9.2, 6.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(length(0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(GLF_dead0b_b, vec3(-3.6, 8.8, 3.3));
                    }
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    _GLF_color = vec4(col, 1.0);
}
