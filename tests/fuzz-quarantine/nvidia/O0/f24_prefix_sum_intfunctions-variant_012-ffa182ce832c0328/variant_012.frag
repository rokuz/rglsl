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

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live13resolution;
};

ivec2 GLF_live14iter(ivec2 GLF_live14p) {
    if (_GLF_DEAD(false)) {
        return ivec2(1, 1);
    }
    if (GLF_live14p.x > 0) {
        if (_GLF_DEAD(false)) {
            return ivec2(1, 1);
        }
        GLF_live14p.y--;
    }
    if (GLF_live14p.x < 0) {
        GLF_live14p.y++;
    }
    GLF_live14p.x += GLF_live14p.y / 2;
    return GLF_live14p;
}

const int GLF_live12dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
layout(set = 0, binding = 3) uniform sampler2D GLF_live11tex;

struct GLF_dead7BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead7BST GLF_dead7tree[10] = GLF_dead7BST[10](GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0));

void GLF_dead7makeTreeNode(inout GLF_dead7BST GLF_dead7tree, int GLF_dead7data) {
    GLF_dead7tree.data = GLF_dead7data;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    GLF_dead7tree.leftIndex = -1;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, false))))) {
            return;
        }
    }
    GLF_dead7tree.rightIndex = -1;
}

int GLF_dead7search(int GLF_dead7target) {
    GLF_dead7BST GLF_dead7currentNode = GLF_dead7BST(0, 0, 0);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return 1;
    }
    int GLF_dead7index = 0;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return 1;
    }
    if (_GLF_DEAD(false)) {
        return 1;
    }
    while (GLF_dead7index != -1) {
        GLF_dead7currentNode = GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7index, 10)];
        if (GLF_dead7currentNode.data == GLF_dead7target) {
            if (_GLF_DEAD(false)) {
                return 1;
            }
            return GLF_dead7target;
        }
        GLF_dead7index = GLF_dead7target > GLF_dead7currentNode.data ? GLF_dead7currentNode.rightIndex : GLF_dead7currentNode.leftIndex;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return 1;
    }
    return -1;
    if (_GLF_DEAD(false)) {
        return 1;
    }
}

struct GLF_dead10BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead10BST GLF_dead10tree[10] = GLF_dead10BST[10](GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0), GLF_dead10BST(0, 0, 0));

void GLF_dead10makeTreeNode(inout GLF_dead10BST GLF_dead10tree, int GLF_dead10data) {
    if (_GLF_DEAD(false)) {
        return;
    }
    GLF_dead10tree.data = GLF_dead10data;
    if (_GLF_DEAD(false)) {
        return;
    }
    GLF_dead10tree.leftIndex = -1;
    GLF_dead10tree.rightIndex = -1;
}

int GLF_dead10search(int GLF_dead10target) {
    {
        vec2 GLF_live11coord = _GLF_FUZZED(vec2(1.4, 30.95));
        int GLF_live11i = _GLF_FUZZED((-97262));
        vec4 GLF_live11texel = _GLF_FUZZED(vec4(33.88, 8.8, -85.53, 2.8));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
            return 1;
        }
        {
            int GLF_live11looplimiter0 = 0;
            while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (GLF_live11looplimiter0 >= 4) {
                    break;
                }
                GLF_live11looplimiter0++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    return 1;
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return 1;
                    }
                    GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                    GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                    GLF_live11i++;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return 1;
        }
    }
    GLF_dead10BST GLF_dead10currentNode = GLF_dead10BST(0, 0, 0);
    int GLF_dead10index = 0;
    while (GLF_dead10index != -1) {
        GLF_dead10currentNode = GLF_dead10tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10index, 10)];
        if (GLF_dead10currentNode.data == GLF_dead10target) {
            return GLF_dead10target;
        }
        GLF_dead10index = GLF_dead10target > GLF_dead10currentNode.data ? GLF_dead10currentNode.rightIndex : GLF_dead10currentNode.leftIndex;
    }
    return -1;
}

const int GLF_dead9dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_dead8_GLF_color = _GLF_FUZZED(vec4(702.933, 941.748, vec2(-723.903, -9.6)));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead8injectionSwitch;
};

float GLF_dead8compute_derivative_x(float GLF_dead8v) {
    {
        {
            ;
        }
    }
    return dFdx(GLF_dead8v) * GLF_dead8injectionSwitch.y;
}

float GLF_dead8compute_derivative_y(float GLF_dead8v) {
    return dFdy(GLF_dead8v) * GLF_dead8injectionSwitch.y;
}

float GLF_dead8compute_stripe(float GLF_dead8v, float GLF_dead8t) {
    return smoothstep(-.9, 1., (GLF_dead8v) / (20.0 * ((GLF_dead8injectionSwitch.y > GLF_dead8injectionSwitch.x) ? GLF_dead8compute_derivative_x(GLF_dead8t) : GLF_dead8compute_derivative_y(GLF_dead8t))));
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
}

vec4 GLF_dead6gl_FragCoord = _GLF_FUZZED(vec4(8.3, -_GLF_IDENTITY(9.0, float(vec4(9.0, exp(0.0), 1.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(sin(0.0), round(length(normalize(1.0))), 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(sin(0.0), round(length(normalize(1.0))), 0.0)))))), -537.297, 9.4));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead6injectionSwitch;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead6resolution;
};

int GLF_dead6data[10] = int[10](_GLF_FUZZED(-32220), _GLF_FUZZED(86500), _GLF_FUZZED(-33070), _GLF_FUZZED(-29745), _GLF_FUZZED(-99929), _GLF_FUZZED(ivec4(-55898, -2651, 31050, 16713).w), _GLF_FUZZED((~((46203 * (-69644))))), _GLF_FUZZED(76386), _GLF_FUZZED(_GLF_IDENTITY(3526, (3526) | 0)), _GLF_FUZZED(-12872)), GLF_dead6temp[10] = int[10](_GLF_FUZZED((~(-44831))), _GLF_FUZZED((92777 & (-7697))), _GLF_FUZZED(35367), _GLF_FUZZED(ivec4(86838, -77846, 8578, -73343).p), _GLF_FUZZED(-72187), _GLF_FUZZED((~52538)), _GLF_FUZZED(-52440), _GLF_FUZZED((-_GLF_IDENTITY((-81238), int(_GLF_IDENTITY(ivec4((-81238), _GLF_IDENTITY(1, max(1, 1)), 0, 0), max(ivec4((-81238), _GLF_IDENTITY(1, max(1, 1)), 0, 0), _GLF_IDENTITY(ivec4((-81238), _GLF_IDENTITY(1, max(1, 1)), 0, 0), clamp(ivec4((-81238), _GLF_IDENTITY(1, max(1, 1)), 0, 0), ivec4((-81238), _GLF_IDENTITY(1, max(1, 1)), 0, 0), ivec4((-81238), _GLF_IDENTITY(1, max(1, 1)), 0, 0))))))))), _GLF_FUZZED(-2171), _GLF_FUZZED(int(false)));
layout(set = 0, binding = 7) uniform sampler2D GLF_dead3tex;
layout(set = 0, binding = 8) uniform sampler2D GLF_live0tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

void main() {
    {
        vec2 GLF_live0coord = _GLF_FUZZED(vec2(67.11, 8.6));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        float GLF_live0h = _GLF_FUZZED((1265.3210 * 0.6));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        int GLF_live0i = _GLF_FUZZED(-2640);
        float GLF_live0refh = _GLF_FUZZED(65.55);
        float GLF_live0slope = _GLF_FUZZED(18.94);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        vec2 GLF_live0uvstep = _GLF_FUZZED(vec2(-8668.2147, -58.04));
        {
            int GLF_live0looplimiter0 = 0;
            while (GLF_live0h < GLF_live0refh && GLF_live0i < _GLF_IDENTITY(32, (_GLF_IDENTITY(32, ~(~(_GLF_IDENTITY(32, 0 | (32)))))) << 0)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    continue;
                }
                if (GLF_live0looplimiter0 >= 7) {
                    break;
                }
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), !(!(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                        {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    return;
                    {
                        ivec2 GLF_live14p = _GLF_FUZZED((ivec2(-83979, 46927) - ivec2(-18564, -55989)));
                        {
                            int GLF_live14looplimiter1 = 0;
                            while (GLF_live14p.x > 15) {
                                if (GLF_live14looplimiter1 >= 6) {
                                    break;
                                }
                                GLF_live14looplimiter1++;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                {
                                    GLF_live14p.x -= 16;
                                }
                            }
                        }
                    }
                }
                GLF_live0looplimiter0++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    return;
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    GLF_live0coord -= GLF_live0uvstep;
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    GLF_live0refh += GLF_live0slope;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    GLF_live0h = texture(GLF_live0tex, GLF_live0coord).y;
                    GLF_live0i++;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
            }
        }
        {
            ivec2 GLF_live14p = _GLF_FUZZED((ivec2(35529, -55885) - ivec2(-75264, -85659)));
            if (GLF_live14p.x < 0) {
                GLF_live14p.x = -GLF_live14p.x;
            }
        }
    }
    int msb9 = 512;
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        int GLF_live14looplimiter0 = 0;
        ivec2 GLF_live14p = _GLF_FUZZED((((-23943) | ivec2(28471, 90413)) | (((-47938) - (-30688)) + (-42366))));
        {
            if (GLF_live14looplimiter0 >= 6) {
                ;
            }
            GLF_live14looplimiter0++;
            {
                GLF_live14p = GLF_live14iter(GLF_live14p);
            }
        }
    }
    int msb10 = 1024;
    int msb14 = 16384;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
    }
    int msb15 = 32768;
    int msb19 = 524288;
    int msb20 = 1048576;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
        int donor_replacementGLF_dead7baseIndex = _GLF_FUZZED(msb14);
        int donor_replacementGLF_dead7data = _GLF_FUZZED(ivec4(85620, -89123, -7728, -7341).q);
        int donor_replacementGLF_dead7treeIndex = _GLF_FUZZED((+(-(-88856))));
        {
            if (GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex == -1) {
                GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex = donor_replacementGLF_dead7treeIndex;
                GLF_dead7makeTreeNode(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7treeIndex, 10)], donor_replacementGLF_dead7data);
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            } else {
                donor_replacementGLF_dead7baseIndex = GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex;
                ;
            }
        }
    }
    int msb24 = 16777216;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 1.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0)), dot(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 1.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0))))))) {
            return;
        }
        return;
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
        return;
    }
    int msb25 = 33554432;
    if (_GLF_DEAD(false)) {
        return;
    }
    int msb29 = 536870912;
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            ;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(mat3(7.0, 48.19, -9658.4469, -13.36, 3.4, 556.064, 59.14, -5644.6135, -6620.0753)[2]);
            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(GLF_dead6injectionSwitch);
            {
                float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                donor_replacementGLF_dead8col = mix(vec3(.7, sinh(donor_replacementGLF_dead8uv.x), donor_replacementGLF_dead8uv.x), vec3(.3, .5, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                if (_GLF_DEAD(false)) {
                    return;
                }
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
    }
    int msb30 = 1073741824;
    uint uselessOutVariable;
    if (_GLF_DEAD(false)) {
        return;
    }
    float A[50];
    int i = bitfieldExtract(0, 0, 0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
    do {
        if (i >= int(_GLF_IDENTITY(resolution, (resolution) - vec2(0.0, 0.0)).x)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    continue;
                }
                vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(_GLF_IDENTITY(sin(injectionSwitch), mat2(_GLF_ONE(1.0, injectionSwitch.y)) * (sin(injectionSwitch))));
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_IDENTITY(!(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))), (!(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) || false)))) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 1.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))), 0.0, 0.0)))))) {
                        continue;
                    }
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                float donor_replacementGLF_dead3h = _GLF_FUZZED(dFdy(-2945.9074));
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                int donor_replacementGLF_dead3i = _GLF_FUZZED(msb24);
                float donor_replacementGLF_dead3refh = _GLF_FUZZED(14.00);
                float donor_replacementGLF_dead3slope = _GLF_FUZZED(dot(vec2(6.3, -7.7), vec2(317.449, -_GLF_IDENTITY(2.6, (false ? _GLF_FUZZED(normalize(6.9)) : 2.6)))));
                vec2 donor_replacementGLF_dead3uvstep = _GLF_FUZZED(resolution);
                while (donor_replacementGLF_dead3h < donor_replacementGLF_dead3refh && donor_replacementGLF_dead3i < 32) {
                    donor_replacementGLF_dead3coord -= donor_replacementGLF_dead3uvstep;
                    donor_replacementGLF_dead3refh += donor_replacementGLF_dead3slope;
                    donor_replacementGLF_dead3h = texture(GLF_dead3tex, donor_replacementGLF_dead3coord).y;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(ivec2(msb20));
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        {
                            float GLF_dead9p = (15.0 - abs(float(donor_replacementGLF_dead9pos.x - GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    donor_replacementGLF_dead3i++;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
            }
            break;
            if (_GLF_DEAD(false)) {
                continue;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    continue;
                }
            }
            {
                {
                    ;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(exp(resolution));
            vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED(vec3(-5427.1088, 6262.2097, -6.3));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(-185.502) : 0.0)), 0.0, 0.0)), 0.0, 0.0)))))) {
                break;
            }
            {
                ;
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    discard;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            continue;
        }
        if (findLSB(16) * (i / findMSB(16)) == i) {
            A[i / findLSB(16)] = float(i);
        }
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead5c = _GLF_FUZZED((+vec4(-7707.4795, 39.79, 973.817, -4.7)));
            int donor_replacementGLF_dead5i = _GLF_FUZZED(57055);
            if (donor_replacementGLF_dead5c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)] >= _GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(-238.070)))) {
                donor_replacementGLF_dead5c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)] = donor_replacementGLF_dead5c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)] * donor_replacementGLF_dead5c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)];
            }
        }
        {
            int GLF_live12looplimiter0 = 0;
            ivec2 GLF_live12pos = _GLF_FUZZED(((+35927) * ivec2(-21165, 12329)));
            {
                if (GLF_live12looplimiter0 >= 5) {
                    ;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    continue;
                }
                GLF_live12looplimiter0++;
                {
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (GLF_live12pos.x < GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)] + 15 && GLF_live12pos.x > GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)] - 15) {
                        float GLF_live12p = (15.0 - abs(float(GLF_live12pos.x - GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)]))) / 15.0;
                        ;
                    }
                    GLF_live12pos.y++;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        i++;
    } while (i < bitfieldInsert(200, 0, _GLF_IDENTITY(0, (_GLF_IDENTITY(0, _GLF_IDENTITY((0), ((0)) | ((0))) + 0)) << 0), 0));
    i = findLSB(0);
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(cosh(vec3(46.14, 0.2, 1.0)));
        vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED((min(-1.3, -6.3) / GLF_dead6resolution));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        {
            float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
            if (_GLF_DEAD(false)) {
                return;
            }
            donor_replacementGLF_dead8col = mix(vec3(donor_replacementGLF_dead8uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
            GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
            if (_GLF_DEAD(false)) {
                return;
            }
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        ivec2 GLF_live14p = _GLF_FUZZED((ivec2(-52404, 52938) | ivec2(-62965, 12836)));
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            GLF_live14p = GLF_live14iter(GLF_live14p);
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            bool donor_replacementGLF_dead8c1 = _GLF_FUZZED((true ? true : false));
            if (_GLF_DEAD(false)) {
                return;
            }
            vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(vec3(166.461, -715.959, -3.4));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
            }
            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(dFdyFine(GLF_dead6injectionSwitch));
            if (_GLF_DEAD(false)) {
                return;
            }
            if (donor_replacementGLF_dead8c1) {
                float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                donor_replacementGLF_dead8col = mix(vec3(donor_replacementGLF_dead8uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead6color = _GLF_FUZZED(tanh(resolution));
            int donor_replacementGLF_dead6i = _GLF_FUZZED(msb29);
            if (_GLF_DEAD(false)) {
                discard;
            }
            vec3 donor_replacementGLF_dead6vecCoor = _GLF_FUZZED(max(vec3(-634.718, -86.70, 78.71), vec3(-2.2, -3.8, -478.229)));
            if (int(GLF_dead6gl_FragCoord[1]) < 90) {
                donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[2]))));
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)).x > injectionSwitch.y)))) {
                    continue;
                    {
                        ivec2 GLF_live14p = _GLF_FUZZED((ivec2(27035, 91742)));
                        {
                            GLF_live14p.x = -GLF_live14p.x;
                        }
                    }
                }
                _GLF_IDENTITY(donor_replacementGLF_dead6color.x += atanh(donor_replacementGLF_dead6color.x) * cosh(GLF_dead6injectionSwitch.y) * smoothstep(donor_replacementGLF_dead6color, GLF_dead6injectionSwitch, GLF_dead6gl_FragCoord.yy).x, (donor_replacementGLF_dead6color.x += atanh(donor_replacementGLF_dead6color.x) * cosh(GLF_dead6injectionSwitch.y) * smoothstep(donor_replacementGLF_dead6color, GLF_dead6injectionSwitch, GLF_dead6gl_FragCoord.yy).x) - 0.0);
                break;
            } else if (int(GLF_dead6gl_FragCoord[1]) < 120) {
                donor_replacementGLF_dead6color = fract(acosh(clamp(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[3])), 1.0, 1000.0)));
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                donor_replacementGLF_dead6color.x += (isnan(GLF_dead6gl_FragCoord.x) ? log2(GLF_dead6gl_FragCoord.x) : log2(GLF_dead6gl_FragCoord.y));
                break;
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        vec2 GLF_live11coord = _GLF_FUZZED(((-6.8) - vec2(5043.2777, 7.0)));
                        int GLF_live11i = _GLF_FUZZED((70624 | (false ? (53333 & (-16874)) : (-84466))));
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        int GLF_live11looplimiter0 = 0;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        vec4 GLF_live11texel = _GLF_FUZZED(vec4(float(46978u), 5259.4408, (3490.4370 + vec2(-551.960, 68.20))));
                        while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                            if (GLF_live11looplimiter0 >= 4) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            GLF_live11looplimiter0++;
                            {
                                GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                                GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                GLF_live11i++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                    }
                    return;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true)))), bool(bool(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true)))))))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                if (_GLF_IDENTITY(int(GLF_dead6gl_FragCoord[1]), (int(GLF_dead6gl_FragCoord[1])) >> 0) < 150) {
                    discard;
                } else if (int(GLF_dead6gl_FragCoord[1]) < 180) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                            return;
                        }
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[4]))));
                    donor_replacementGLF_dead6color[1] += asinh(GLF_dead6gl_FragCoord.y * ldexp(donor_replacementGLF_dead6color.y, -donor_replacementGLF_dead6i));
                    break;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                } else {
                    {
                        {
                            ;
                        }
                    }
                    if (int(GLF_dead6gl_FragCoord[1]) < 210) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[5]))));
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        _GLF_IDENTITY(donor_replacementGLF_dead6color.y -= tanh(donor_replacementGLF_dead6color.x) / cosh(donor_replacementGLF_dead6color.y), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(-8674.6089) : (donor_replacementGLF_dead6color.y -= tanh(donor_replacementGLF_dead6color.x) / cosh(donor_replacementGLF_dead6color.y))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        break;
                    } else if (int(GLF_dead6gl_FragCoord[1]) < 240) {
                        donor_replacementGLF_dead6color = fract(asinh(donor_replacementGLF_dead6vecCoor.yx - trunc(float(_GLF_IDENTITY(GLF_dead6data[6], int(ivec4(GLF_dead6data[6], 0, 1, 0)))))));
                        donor_replacementGLF_dead6color.y -= isnan(float(donor_replacementGLF_dead6i)) ? tanh(GLF_dead6gl_FragCoord.x) : atanh(GLF_dead6gl_FragCoord.y / GLF_dead6resolution.y);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead7sum = _GLF_FUZZED((~msb9));
                                int donor_replacementGLF_dead7target = _GLF_FUZZED(msb24);
                                {
                                    int GLF_dead7result = GLF_dead7search(donor_replacementGLF_dead7target);
                                    if (GLF_dead7result > 0) {
                                        donor_replacementGLF_dead7sum += GLF_dead7result;
                                    } else {
                                        switch (GLF_dead7result) {
                                            case -1:
                                                donor_replacementGLF_dead7sum += 1;
                                                break;
                                            case 0:
                                                return;
                                        }
                                    }
                                }
                            }
                            break;
                        }
                        break;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead10baseIndex = _GLF_FUZZED(bitfieldExtract(msb9, ivec4(-47471, -21836, -41091, -97793).a, msb19));
                                int donor_replacementGLF_dead10data = _GLF_FUZZED(bitfieldReverse(donor_replacementGLF_dead6i));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                int donor_replacementGLF_dead10treeIndex = _GLF_FUZZED((-(-i)));
                                if (GLF_dead10tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10baseIndex, 10)].rightIndex == -1) {
                                    GLF_dead10tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10baseIndex, 10)].rightIndex = donor_replacementGLF_dead10treeIndex;
                                    GLF_dead10makeTreeNode(GLF_dead10tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10treeIndex, 10)], donor_replacementGLF_dead10data);
                                    return;
                                } else {
                                    donor_replacementGLF_dead10baseIndex = GLF_dead10tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10baseIndex, 10)].rightIndex;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                            discard;
                        }
                    } else if (int(GLF_dead6gl_FragCoord[1]) < 270) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            return;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            int donor_replacementGLF_dead10count = _GLF_FUZZED(msb10);
                            int donor_replacementGLF_dead10result = _GLF_FUZZED(ivec2(77824, -80221).r);
                            if (donor_replacementGLF_dead10result == -1) {
                                donor_replacementGLF_dead10count++;
                            }
                        }
                        donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[7]))));
                        _GLF_IDENTITY(donor_replacementGLF_dead6color.y *= mix(normalize(donor_replacementGLF_dead6vecCoor), normalize(vec3(donor_replacementGLF_dead6color, degrees(donor_replacementGLF_dead6color.x))), GLF_dead6injectionSwitch.x).y, (_GLF_IDENTITY(donor_replacementGLF_dead6color.y *= mix(normalize(donor_replacementGLF_dead6vecCoor), normalize(vec3(donor_replacementGLF_dead6color, degrees(donor_replacementGLF_dead6color.x))), GLF_dead6injectionSwitch.x).y, (donor_replacementGLF_dead6color.y *= mix(normalize(donor_replacementGLF_dead6vecCoor), normalize(vec3(donor_replacementGLF_dead6color, degrees(donor_replacementGLF_dead6color.x))), GLF_dead6injectionSwitch.x).y) + 0.0)) + sqrt(0.0));
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                    } else {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            break;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                discard;
            }
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        if (i < int(gl_FragCoord.x)) {
            if (_GLF_DEAD(false)) {
                discard;
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            break;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            discard;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
        }
        if (i > findMSB(0)) {
            A[i] += A[int(usubBorrow(uint(i), _GLF_IDENTITY(1u, min(_GLF_IDENTITY(1u, (1u) | (1u)), 1u)), uselessOutVariable))];
        }
        i++;
        if (_GLF_DEAD(false)) {
            break;
        }
    } while (i < bitfieldInsert(50, 0, 0, 0));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
    }
    if (int(_GLF_IDENTITY(gl_FragCoord, max(_GLF_IDENTITY(gl_FragCoord, vec4(mat4(gl_FragCoord, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0))), gl_FragCoord)).x) < _GLF_IDENTITY(findLSB(msb20), (findLSB(msb20)) | (_GLF_IDENTITY(findLSB(msb20), (_GLF_IDENTITY(findLSB(msb20), (findLSB(msb20)) | (findLSB(msb20)))) | (findLSB(msb20)))))) {
        _GLF_color = vec4(A[bitfieldReverse(0)] / _GLF_IDENTITY(resolution, (resolution) * vec2(1.0, 1.0)).x, A[findMSB(16)] / resolution.y, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead8c1 = _GLF_FUZZED(true);
            bool donor_replacementGLF_dead8c2 = _GLF_FUZZED(false);
            if (_GLF_DEAD(false)) {
                return;
            }
            bool donor_replacementGLF_dead8c3 = _GLF_FUZZED(false);
            vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(vec3(2898.0405, -777.330, 5.1));
            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(GLF_dead6resolution);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                return;
            }
            if (!donor_replacementGLF_dead8c1 && !donor_replacementGLF_dead8c2 && donor_replacementGLF_dead8c3) {
                float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                donor_replacementGLF_dead8col = mix(vec3(.7, sinh(donor_replacementGLF_dead8uv.x), donor_replacementGLF_dead8uv.x), vec3(.3, .5, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                return;
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        if (int(gl_FragCoord.x) < bitfieldInsert(40, 0, 0, 0)) {
            _GLF_IDENTITY(_GLF_color = vec4(A[findLSB(32)] / resolution.x, A[findMSB(_GLF_IDENTITY(msb9, (msb9) ^ 0))] / resolution.y, 1.0, 1.0), (false ? _GLF_FUZZED(_GLF_color) : (_GLF_color = vec4(A[findLSB(32)] / resolution.x, A[findMSB(_GLF_IDENTITY(msb9, (msb9) ^ 0))] / resolution.y, 1.0, 1.0))));
        } else {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(vec3(26.60, -4.3, 6192.2562));
                vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(GLF_dead6resolution);
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                    donor_replacementGLF_dead8col = mix(vec3(donor_replacementGLF_dead8uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                    GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (int(gl_FragCoord.x) < _GLF_IDENTITY(bitfieldInsert(60, 0, 0, 0), (bitfieldInsert(60, 0, 0, 0)) >> 0)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                _GLF_color = vec4(A[findMSB(msb10)] / resolution.x, A[findLSB(msb14)] / resolution.y, 1.0, 1.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                    }
                }
            } else if (_GLF_IDENTITY(int(gl_FragCoord.x) < bitfieldInsert(80, 0, 0, 0), (int(gl_FragCoord.x) < bitfieldInsert(80, 0, 0, 0)) || false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(_GLF_color.aag);
                            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(exp(radians(injectionSwitch)));
                            {
                                float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                                donor_replacementGLF_dead8col = mix(vec3(.7, sinh(donor_replacementGLF_dead8uv.x), donor_replacementGLF_dead8uv.x), vec3(.3, .5, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                                GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, false, true))))) {
                        return;
                    }
                }
                _GLF_color = vec4(A[findLSB(msb15)] / resolution.x, A[findMSB(msb19)] / resolution.y, 1.0, 1.0);
            } else {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (int(gl_FragCoord.x) < bitfieldInsert(100, 0, 0, 0)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            return;
                        }
                        vec2 donor_replacementGLF_dead6color = _GLF_FUZZED(resolution);
                        vec3 donor_replacementGLF_dead6vecCoor = _GLF_IDENTITY(_GLF_FUZZED(vec3(-55.31, -8601.3077, 7018.2253)), (_GLF_FUZZED(vec3(-55.31, -8601.3077, 7018.2253))) * mat3(1.0));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        {
                            donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(_GLF_IDENTITY(float(GLF_dead6data[2]), mix(float(_GLF_FUZZED(2.0)), float(_GLF_IDENTITY(float(GLF_dead6data[2]), (float(GLF_dead6data[2])) - tan(0.0))), bool(true))))));
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            donor_replacementGLF_dead6color.x += atanh(donor_replacementGLF_dead6color.x) * cosh(GLF_dead6injectionSwitch.y) * smoothstep(donor_replacementGLF_dead6color, GLF_dead6injectionSwitch, GLF_dead6gl_FragCoord.yy).x;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    _GLF_color = vec4(A[findMSB(msb20)] / resolution.x, A[findLSB(msb24)] / resolution.y, 1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                } else if (int(gl_FragCoord.x) < bitfieldInsert(120, 0, 0, 0)) {
                    _GLF_color = vec4(A[findLSB(msb25)] / resolution.x, _GLF_IDENTITY(A[findMSB(msb29)] / resolution.y, (false ? _GLF_FUZZED(9395.4936) : _GLF_IDENTITY(A[findMSB(msb29)] / resolution.y, mix(float(_GLF_FUZZED(-7445.1525)), float(A[findMSB(msb29)] / resolution.y), bool(true))))), 1.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            return;
                        }
                        for (int GLF_dead6j = 0; GLF_dead6j < 10; GLF_dead6j++) {
                            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)];
                            if (_GLF_DEAD(false)) {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (int(_GLF_IDENTITY(gl_FragCoord.x, max(_GLF_IDENTITY(gl_FragCoord.x, min(_GLF_IDENTITY(gl_FragCoord.x, mix(float(_GLF_FUZZED(2.9)), float(gl_FragCoord.x), bool(true))), gl_FragCoord.x)), _GLF_IDENTITY(gl_FragCoord.x, clamp(gl_FragCoord.x, gl_FragCoord.x, gl_FragCoord.x))))) < bitfieldInsert(_GLF_IDENTITY(140, _GLF_IDENTITY((140) ^ 0, min((140) ^ 0, _GLF_IDENTITY((140) ^ 0, 1 * ((140) ^ 0))))), 0, 0, 0)) {
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                ivec2 GLF_live14p = _GLF_FUZZED((+ivec2(-42749, 97566)));
                                {
                                    int GLF_live14looplimiter1 = 0;
                                    while (GLF_live14p.x > 15) {
                                        if (GLF_live14looplimiter1 >= 6) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        GLF_live14looplimiter1++;
                                        {
                                            GLF_live14p.x -= 16;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                            }
                        }
                        _GLF_color = vec4(A[findMSB(msb30)] / _GLF_IDENTITY(resolution, abs(vec2(1.0, 1.0)) * (resolution)).x, A[bitfieldInsert(34, 0, 0, 0)] / resolution.y, 1.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, sin(0.0), 0.0, log(1.0), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, tan(0.0), 0.0, 1.0, _GLF_IDENTITY(dot(vec4(1.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 1.0)), dot(vec4(1.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 1.0))), 0.0)))))) {
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            float donor_replacementGLF_dead5s = _GLF_FUZZED(((-6.6) / 7239.4798));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            {
                                _GLF_IDENTITY(donor_replacementGLF_dead5s += 0.2, (donor_replacementGLF_dead5s += 0.2) / 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    return;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    } else if (int(gl_FragCoord.x) < bitfieldInsert(160, 0, 0, 0)) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        _GLF_color = _GLF_IDENTITY(vec4(A[bitfieldInsert(35, 0, 0, 0)] / resolution.x, A[bitfieldInsert(39, 0, 0, 0)] / resolution.y, 1.0, _GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, 0.0 + (1.0))))), (vec4(A[bitfieldInsert(35, 0, 0, 0)] / resolution.x, A[bitfieldInsert(39, 0, 0, 0)] / resolution.y, 1.0, _GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, 0.0 + (1.0)))))) * mat4(_GLF_ONE(1.0, injectionSwitch.y)));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                bool donor_replacementGLF_dead8c1 = _GLF_FUZZED(false);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        return;
                                    }
                                    {
                                        ;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                bool donor_replacementGLF_dead8c2 = _GLF_FUZZED(false);
                                bool donor_replacementGLF_dead8c3 = _GLF_FUZZED(true);
                                vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(dFdxFine(inversesqrt(vec3(3072.7254, -0.7, -78.55))));
                                vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(vec2(vec3(0.3, -0.5, 6.7)));
                                if (!donor_replacementGLF_dead8c1 && !donor_replacementGLF_dead8c2 && donor_replacementGLF_dead8c3) {
                                    float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                                    donor_replacementGLF_dead8col = mix(vec3(.7, sinh(donor_replacementGLF_dead8uv.x), donor_replacementGLF_dead8uv.x), vec3(.3, .5, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                                    GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                                    return;
                                }
                            }
                            int donor_replacementGLF_dead5i = _GLF_FUZZED(msb25);
                            {
                                {
                                    ;
                                }
                            }
                            float donor_replacementGLF_dead5ref = _GLF_FUZZED(step(-0.9, 25.18));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead10count = _GLF_FUZZED(ivec2(97766, -35050).s);
                                int donor_replacementGLF_dead10i = _GLF_FUZZED(bitfieldReverse(msb9));
                                {
                                    int GLF_dead10result = GLF_dead10search(donor_replacementGLF_dead10i);
                                    switch (donor_replacementGLF_dead10i) {
                                        case 9:
                                        case 5:
                                        case 12:
                                        case 15:
                                        case 7:
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                return;
                                            }
                                        case 8:
                                        case 2:
                                            {
                                                int GLF_live13iterationCap = _GLF_FUZZED((((-95045) + (-15714))));
                                                if (0.0 > GLF_live13resolution.y) {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    GLF_live13iterationCap += 1;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        case 6:
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        case 17:
                                        case 13:
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    return;
                                                }
                                                return;
                                            }
                                            if (GLF_dead10result == donor_replacementGLF_dead10i) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(tan(0.0), 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                    return;
                                                }
                                                donor_replacementGLF_dead10count++;
                                            }
                                            break;
                                        default:
                                            if (GLF_dead10result == -1) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                                                    return;
                                                }
                                                donor_replacementGLF_dead10count++;
                                            }
                                            break;
                                    }
                                }
                            }
                            float donor_replacementGLF_dead5s = _GLF_FUZZED(-7.5);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            if (mod(float(donor_replacementGLF_dead5i), donor_replacementGLF_dead5ref) <= 0.01) {
                                donor_replacementGLF_dead5s += 0.2;
                            }
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead9pos = _GLF_FUZZED((msb10 + ivec2(-44645, -80019)));
                                while (donor_replacementGLF_dead9pos.y != 256) {
                                    if (donor_replacementGLF_dead9pos.x < GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)] + 15 && donor_replacementGLF_dead9pos.x > GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)] - 15) {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        float GLF_dead9p = (15.0 - abs(float(donor_replacementGLF_dead9pos.x - GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)]))) / 15.0;
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    donor_replacementGLF_dead9pos.y++;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    } else if (int(gl_FragCoord.x) < bitfieldInsert(180, 0, 0, 0)) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        _GLF_color = vec4(A[bitfieldInsert(40, 0, 0, 0)] / resolution.x, A[bitfieldInsert(44, 0, 0, 0)] / resolution.y, 1.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(mod(cos(vec3(-435.585, 54.89, 2888.5592)), uintBitsToFloat(uselessOutVariable)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                            }
                            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(resolution);
                            {
                                float GLF_dead8stripe = GLF_dead8compute_stripe(cos((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                                donor_replacementGLF_dead8col = mix(vec3(donor_replacementGLF_dead8uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead8uv.x), GLF_dead8stripe);
                                GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return;
                            }
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                ivec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(ivec2(-3931, 70410));
                                if (donor_replacementGLF_dead9pos.x < GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)] + 15 && donor_replacementGLF_dead9pos.x > GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)] - 15) {
                                    float GLF_dead9p = (15.0 - abs(float(donor_replacementGLF_dead9pos.x - GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            int donor_replacementGLF_dead5i = _GLF_FUZZED(msb25);
                            float donor_replacementGLF_dead5limit = _GLF_FUZZED(min(-713.204, 88.28));
                            float donor_replacementGLF_dead5ref = _GLF_FUZZED(5.8);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            float donor_replacementGLF_dead5s = _GLF_FUZZED(-0.3);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    ivec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(bitfieldInsert(ivec2(92588, -32642), ivec2(-98757, -5910), msb10, i));
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                                                return;
                                            }
                                        }
                                        if (donor_replacementGLF_dead9pos.x < GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)] + 15 && donor_replacementGLF_dead9pos.x > GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)] - 15) {
                                            float GLF_dead9p = (15.0 - abs(float(donor_replacementGLF_dead9pos.x - GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        donor_replacementGLF_dead9pos.y++;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                }
                                if (_GLF_IDENTITY(mod(float(donor_replacementGLF_dead5i), donor_replacementGLF_dead5ref), clamp(mod(float(donor_replacementGLF_dead5i), donor_replacementGLF_dead5ref), mod(float(donor_replacementGLF_dead5i), donor_replacementGLF_dead5ref), mod(float(donor_replacementGLF_dead5i), donor_replacementGLF_dead5ref))) <= 0.01) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        ivec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(ivec2(47022, 16256));
                                        {
                                            float GLF_dead9p = (15.0 - abs(float(donor_replacementGLF_dead9pos.x - GLF_dead9dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9pos.y, 256)]))) / 15.0;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            ;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead5s += 0.2;
                                }
                                if (float(donor_replacementGLF_dead5i) >= donor_replacementGLF_dead5limit) {
                                    ;
                                }
                                donor_replacementGLF_dead5i++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                            }
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                                return;
                            }
                            int GLF_live2count = _GLF_FUZZED(-9584);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead7baseIndex = _GLF_FUZZED((msb25 << (vec4(-1.9, 890.930, 6.6, 5.0), msb10)));
                                {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) || false))))) {
                                        return;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                    }
                                    ivec2 GLF_live12pos = _GLF_FUZZED(ivec2(25478, -31856));
                                    {
                                        if (GLF_live12pos.x < GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)] + 15 && GLF_live12pos.x > GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)] - 15) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return;
                                            }
                                            float GLF_live12p = (15.0 - abs(float(GLF_live12pos.x - GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                        }
                                        GLF_live12pos.y++;
                                    }
                                }
                                {
                                    donor_replacementGLF_dead7baseIndex = GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex;
                                    {
                                        int GLF_live12looplimiter0 = 0;
                                        ivec2 GLF_live12pos = _GLF_FUZZED(ivec2(13472, -31782));
                                        while (GLF_live12pos.y != 256) {
                                            if (GLF_live12looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live12looplimiter0++;
                                            {
                                                if (GLF_live12pos.x < GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)] + 15 && GLF_live12pos.x > GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)] - 15) {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    float GLF_live12p = (15.0 - abs(float(GLF_live12pos.x - GLF_live12dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live12pos.y++;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                        }
                                    }
                                    ;
                                }
                                {
                                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(4051.5272, 6742.6578));
                                    int GLF_live11i = _GLF_FUZZED((+32111));
                                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(vec2(-4.7, -6268.3835), (true ? (-6.3) : (-96.17)), (2.8 * (6.7 * (-358.829)))));
                                    {
                                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                        GLF_live11i++;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                return;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                                        return;
                                    }
                                    vec3 donor_replacementGLF_dead8col = _GLF_FUZZED(vec3(-26.35, 1553.5531, -87.96));
                                    vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED((vec2(-1858.0919, -977.499) - 526.030));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        return;
                                    }
                                    {
                                        float GLF_dead8stripe = GLF_dead8compute_stripe(tan((donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y) * 20.0), donor_replacementGLF_dead8uv.x + donor_replacementGLF_dead8uv.y);
                                        donor_replacementGLF_dead8col = mix(vec3(donor_replacementGLF_dead8uv.x, .8, 0), vec3(1, donor_replacementGLF_dead8uv.y, 0), GLF_dead8stripe);
                                        GLF_dead8_GLF_color = vec4(donor_replacementGLF_dead8col, 1.0);
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        {
                                            ivec2 GLF_live14p = _GLF_FUZZED(ivec2(-99734, 92105));
                                            if (GLF_live14p.x > 0) {
                                                GLF_live14p.y--;
                                            }
                                        }
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                                return;
                            }
                            int GLF_live2v = _GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), _GLF_IDENTITY(int(int(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))))), (_GLF_IDENTITY(int(int(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))))), min(int(int(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED((_GLF_IDENTITY((-58068), ((-58068)) << 0) & 29047)))))), int(int(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_IDENTITY(_GLF_FUZZED(_GLF_IDENTITY(((-58068) & 29047), (_GLF_IDENTITY(((-58068) & 29047), int(ivec4(((-58068) & 29047), 1, 1, 1)))) | (((-58068) & 29047)))), min(_GLF_IDENTITY(_GLF_FUZZED(_GLF_IDENTITY(((-58068) & 29047), (_GLF_IDENTITY(((-58068) & 29047), int(ivec4(((-58068) & 29047), 1, 1, 1)))) | (((-58068) & 29047)))), max(_GLF_FUZZED(_GLF_IDENTITY(((-58068) & 29047), (_GLF_IDENTITY(((-58068) & 29047), int(ivec4(((-58068) & 29047), 1, 1, 1)))) | (((-58068) & 29047)))), _GLF_FUZZED(_GLF_IDENTITY(((-58068) & 29047), (_GLF_IDENTITY(((-58068) & 29047), int(ivec4(((-58068) & 29047), 1, 1, 1)))) | (((-58068) & 29047)))))), _GLF_FUZZED(_GLF_IDENTITY(((-58068) & 29047), (_GLF_IDENTITY(((-58068) & 29047), int(ivec4(((-58068) & 29047), 1, 1, 1)))) | (((-58068) & 29047))))))))))))) | (int(int(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), _GLF_IDENTITY(clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047))), clamp(clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047))), clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047))), _GLF_IDENTITY(clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047))), max(_GLF_IDENTITY(clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047))), (clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))) ^ 0), clamp(_GLF_IDENTITY(_GLF_FUZZED(((-58068) & 29047)), max(_GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))), _GLF_FUZZED(((-58068) & 29047)), _GLF_FUZZED(((-58068) & 29047)))))))))))));
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                if (_GLF_IDENTITY((GLF_live2v & 1) == 1, bool(bvec2((GLF_live2v & 1) == _GLF_IDENTITY(1, clamp(1, _GLF_IDENTITY(1, clamp(1, 1, 1)), _GLF_IDENTITY(1, (1) >> 0))), true)))) {
                                    GLF_live2v = 3 * GLF_live2v + 1;
                                } else {
                                    GLF_live2v /= 2;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                        return;
                                    }
                                }
                                GLF_live2count++;
                            }
                        }
                        if (_GLF_IDENTITY(int(gl_FragCoord.x), (int(gl_FragCoord.x)) << 0) < bitfieldInsert(180, 0, 0, 0)) {
                            _GLF_color = vec4(A[bitfieldInsert(45, 0, _GLF_IDENTITY(0, ~(~(0))), 0)] / resolution.x, A[bitfieldInsert(49, 0, 0, 0)] / _GLF_IDENTITY(resolution, _GLF_IDENTITY(vec2(vec2(_GLF_IDENTITY(resolution, (resolution) - vec2(0.0, 0.0)))), (vec2(vec2(_GLF_IDENTITY(resolution, (resolution) - vec2(0.0, 0.0))))) - vec2(0.0, 0.0))).y, 1.0, 1.0);
                        } else {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                return;
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            discard;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), (!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) && true))))) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            return;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
}
