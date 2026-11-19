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

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live15resolution;
};

vec4 GLF_live18gl_FragCoord = _GLF_FUZZED((-(vec4(-0.8, -1.5, -0.9, 8112.8919) + (-9.1))));
const int GLF_live18N = 10;
int GLF_live18data[10] = int[10](_GLF_FUZZED(int((67253u | 148232u))), _GLF_FUZZED((-(-51223))), _GLF_FUZZED((ivec2(-86173, -53399).r - (10495))), _GLF_FUZZED((29968 ^ (-85427))), _GLF_FUZZED(int((12403u + 155219u))), _GLF_FUZZED(-52795), _GLF_FUZZED(4412), _GLF_FUZZED(-97348), _GLF_FUZZED((68838 ^ int(false))), _GLF_FUZZED(7217)), GLF_live18temp[10] = int[10](_GLF_FUZZED(ivec4(4822, -56374, -63922, -77040).a), _GLF_FUZZED(-10036), _GLF_FUZZED(-49110), _GLF_FUZZED((16604 | (-72014))), _GLF_FUZZED((-59313)), _GLF_FUZZED(-50246), _GLF_FUZZED(70019), _GLF_FUZZED((~(-35352))), _GLF_FUZZED(ivec4(28313, 87010, -50234, -46881).p), _GLF_FUZZED((37675 * (-18750))));

void GLF_live18merge(int GLF_live18from, int GLF_live18mid, int GLF_live18to) {
    int GLF_live18k = GLF_live18from, GLF_live18i = GLF_live18from, GLF_live18j = GLF_live18mid + 1;
    {
        int GLF_live18looplimiter0 = 0;
        while (GLF_live18i <= GLF_live18mid && GLF_live18j <= GLF_live18to) {
            if (GLF_live18looplimiter0 >= 3) {
                break;
            }
            GLF_live18looplimiter0++;
            {
                if (GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] < GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18j, 10)]) {
                    GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i++, 10)];
                } else {
                    GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live18looplimiter1 = 0;
        while (GLF_live18i < GLF_live18N && GLF_live18i <= GLF_live18mid) {
            if (GLF_live18looplimiter1 >= 3) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                break;
            }
            GLF_live18looplimiter1++;
            {
                GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i++, 10)];
            }
        }
    }
    {
        int GLF_live18looplimiter2 = 0;
        for (int GLF_live18i = GLF_live18from; GLF_live18i <= GLF_live18to; GLF_live18i++) {
            if (GLF_live18looplimiter2 >= 3) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            GLF_live18looplimiter2++;
            {
                GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] = GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)];
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
            }
        }
    }
}

struct GLF_live14BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live14BST GLF_live14tree[10] = GLF_live14BST[10](GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, _GLF_IDENTITY(0, (0) / 1)));

void GLF_live14makeTreeNode(inout GLF_live14BST GLF_live14tree, int GLF_live14data) {
    GLF_live14tree.data = GLF_live14data;
    GLF_live14tree.leftIndex = -1;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
    }
    GLF_live14tree.rightIndex = -1;
}

int GLF_live14search(int GLF_live14target) {
    GLF_live14BST GLF_live14currentNode = GLF_live14BST(0, 0, 0);
    {
        float GLF_live15xCoord = _GLF_FUZZED(-87.96);
        float GLF_live15yCoord = _GLF_FUZZED((+7.2));
        {
            ;
        }
        if (_GLF_DEAD(false)) {
            return 1;
        }
    }
    int GLF_live14index = 0;
    {
        int GLF_live14looplimiter1 = 0;
        while (GLF_live14index != -1) {
            if (GLF_live14looplimiter1 >= 4) {
                break;
            }
            GLF_live14looplimiter1++;
            {
                GLF_live14currentNode = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14index, 10)];
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    int GLF_live16looplimiter0 = 0;
                    if (GLF_live16looplimiter0 >= 6) {
                        ;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            continue;
                        }
                    }
                }
                if (GLF_live14currentNode.data == GLF_live14target) {
                    return GLF_live14target;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(vec2(-3.7, -1.5));
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        float donor_replacementGLF_dead16th = _GLF_FUZZED(clamp(4.7, -8.1, exp2(-1189.6096)));
                        if (_GLF_DEAD(false)) {
                            return 1;
                        }
                        if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            donor_replacementGLF_dead16th = _GLF_IDENTITY(0.5, min(0.5, 0.5)) - donor_replacementGLF_dead16th;
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    break;
                }
                GLF_live14index = GLF_live14target > GLF_live14currentNode.data ? GLF_live14currentNode.rightIndex : GLF_live14currentNode.leftIndex;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                    discard;
                }
                continue;
            }
        }
        {
            if (_GLF_DEAD(false)) {
                return 1;
            }
            {
                ;
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    return 1;
                }
                if (_GLF_DEAD(false)) {
                    return 1;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return 1;
    }
    return -1;
}

layout(set = 0, binding = 3) uniform sampler2D GLF_live11tex;

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_dead7one;
};

mat2 GLF_dead7m22 = _GLF_FUZZED(mat2(-0.6, -608.766, _GLF_IDENTITY(938.984, _GLF_IDENTITY(float(vec2(938.984, 0.0)), max(_GLF_IDENTITY(float(vec2(938.984, 0.0)), _GLF_IDENTITY((float(vec2(938.984, 0.0))) - 0.0, max((float(vec2(938.984, 0.0))) - 0.0, _GLF_IDENTITY((float(vec2(938.984, 0.0))) - 0.0, float(mat4x3((float(vec2(938.984, 0.0))) - 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0)))))), float(vec2(938.984, 0.0))))), 1.0));
mat2x3 GLF_dead7m23 = _GLF_FUZZED(mat2x3(-6.4, 6.3, 9421.9627, 1718.0452, 7.3, -2810.8048));
mat2x4 GLF_dead7m24 = _GLF_FUZZED(mat2x4(-479.266, -_GLF_IDENTITY(18.11, min(18.11, 18.11)), 5940.0507, 7.1, 8.3, 478.731, 39.94, 5045.0322));
mat3x2 GLF_dead7m32 = _GLF_FUZZED((mat3x2(9.5, 9.0, -661.865, -28.70, -9610.2041, _GLF_IDENTITY(1071.2354, min(_GLF_IDENTITY(1071.2354, clamp(1071.2354, 1071.2354, 1071.2354)), 1071.2354))) * _GLF_IDENTITY((-9.2), max(_GLF_IDENTITY((-9.2), (_GLF_IDENTITY((-9.2), float(vec3((-9.2), _GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, (1.0) + 0.0), 1.0)), 0.0)))) - _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), _GLF_IDENTITY(vec3(0.0, 1.0, 0.0), min(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)))))), (-9.2)))));
mat3 GLF_dead7m33 = _GLF_FUZZED(mat3(mat4x3(-110.350, 741.410, 43.50, -8124.8645, 87.38, 465.562, -11.62, -74.73, -9.5, 5869.2628, -96.19, _GLF_IDENTITY(-2907.9019, max(_GLF_IDENTITY(-2907.9019, mix(float(-2907.9019), float(_GLF_FUZZED(-7.7)), bool(false))), _GLF_IDENTITY(-2907.9019, (_GLF_IDENTITY(-2907.9019, (true ? (-2907.9019) : _GLF_FUZZED(8.6)))) - 0.0))))));
mat3x4 GLF_dead7m34 = _GLF_FUZZED(mat3x4(858.886, -3.3, 17.25, 3.9, -7.2, -52.40, -_GLF_IDENTITY(1.2, (1.2) + length(0.0)), 1868.7621, -90.05, 2.1, 2.5, -6.8));
mat4x2 GLF_dead7m42 = _GLF_FUZZED(mat4x2(0.3, -23.95, 3.3, 8.1, 82.86, -1721.9140, -2774.6657, 8.8));
mat4x3 GLF_dead7m43 = _GLF_FUZZED(mat4x3(-6.2, -6.7, -42.56, -76.13, -2.8, -17.49, 317.889, 108.599, 1.4, 7.1, -4.1, -84.86));
mat4 GLF_dead7m44 = _GLF_IDENTITY(_GLF_FUZZED(((mat2x4(2.3, 7.0, 106.053, -5.1, -9.2, -6149.6813, -0.9, -1.8) - mat2x4(7304.5317, 7.2, 9059.4803, -98.58, -6875.1436, 986.725, 6.2, 7843.4681)) * mat4x2(-145.466, -946.585, 60.79, -4.5, 8417.0798, 8.1, 50.30, 61.69))), mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (_GLF_IDENTITY(_GLF_FUZZED(((mat2x4(2.3, 7.0, 106.053, -5.1, -9.2, -6149.6813, -0.9, -1.8) - mat2x4(7304.5317, 7.2, 9059.4803, -98.58, -6875.1436, 986.725, 6.2, 7843.4681)) * mat4x2(-145.466, -946.585, 60.79, -4.5, 8417.0798, 8.1, 50.30, 61.69))), (_GLF_FUZZED(((mat2x4(2.3, 7.0, 106.053, -5.1, -9.2, -6149.6813, -0.9, -1.8) - mat2x4(7304.5317, 7.2, 9059.4803, -98.58, -6875.1436, 986.725, 6.2, 7843.4681)) * mat4x2(-145.466, -946.585, 60.79, -4.5, 8417.0798, 8.1, 50.30, 61.69)))) / mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, (1.0) / 1.0), 1.0)), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))));
layout(set = 0, binding = 5) uniform sampler2D GLF_dead9tex;

struct GLF_dead6BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead6BST GLF_dead6tree[10] = GLF_dead6BST[10](GLF_dead6BST(_GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, 0 ^ (0))))), 0, 0), GLF_dead6BST(0, 0, 0), GLF_dead6BST(0, 0, 0), GLF_dead6BST(0, 0, 0), GLF_dead6BST(_GLF_IDENTITY(_GLF_IDENTITY(0, int(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), clamp(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(0, 0, 0) | (ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))))), (_GLF_IDENTITY(_GLF_IDENTITY(0, int(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), clamp(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(0, 0, 0) | (ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))))), min(_GLF_IDENTITY(0, int(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), clamp(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(0, 0, 0) | (ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))))), _GLF_IDENTITY(0, int(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), clamp(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(0, 0, 0) | (ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1)))))))) | (_GLF_IDENTITY(0, int(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), clamp(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(0, 0, 0) | (ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1), ivec3(_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(ivec4(24352, -45665, -41137, -98278).q))), 1, 1))))))), 0, _GLF_IDENTITY(0, int(ivec2(_GLF_IDENTITY(0, 0 | (0)), 1)))), GLF_dead6BST(0, 0, 0), GLF_dead6BST(0, _GLF_IDENTITY(0, min(_GLF_IDENTITY(0, min(0, 0)), 0)), 0), GLF_dead6BST(_GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), (~(0)) | (~(0))))), 0, 0), GLF_dead6BST(0, 0, 0), GLF_dead6BST(0, 0, 0));

void GLF_dead6makeTreeNode(inout GLF_dead6BST GLF_dead6tree, int GLF_dead6data) {
    GLF_dead6tree.data = GLF_dead6data;
    GLF_dead6tree.leftIndex = -1;
    if (_GLF_DEAD(false)) {
        return;
    }
    GLF_dead6tree.rightIndex = -1;
}

int GLF_dead4data[10] = int[10](_GLF_FUZZED(61596), _GLF_FUZZED(((-92796) | 74652)), _GLF_IDENTITY(_GLF_FUZZED(-91706), clamp(_GLF_IDENTITY(_GLF_FUZZED(-91706), clamp(_GLF_FUZZED(-91706), _GLF_FUZZED(-91706), _GLF_FUZZED(-91706))), _GLF_IDENTITY(_GLF_FUZZED(-91706), (false ? _GLF_FUZZED(-37177) : _GLF_IDENTITY(_GLF_FUZZED(-91706), (_GLF_FUZZED(-91706)) | 0))), _GLF_FUZZED(-91706))), _GLF_FUZZED(82262), _GLF_FUZZED(80057), _GLF_FUZZED(-45117), _GLF_FUZZED(((-99974) * 41905)), _GLF_FUZZED(57538), _GLF_FUZZED(51445), _GLF_IDENTITY(_GLF_FUZZED(74520), (_GLF_IDENTITY(_GLF_FUZZED(74520), (_GLF_FUZZED(74520)) ^ 0)) | (_GLF_FUZZED(74520)))), GLF_dead4temp[10] = int[10](_GLF_FUZZED(-67123), _GLF_FUZZED(ivec2(83898, -93692).x), _GLF_FUZZED(89393), _GLF_FUZZED(ivec4(10340, 95386, -14134, 73611).y), _GLF_FUZZED(-39404), _GLF_FUZZED(-96407), _GLF_FUZZED(-59340), _GLF_FUZZED((10892 * (-65609))), _GLF_FUZZED(-64969), _GLF_FUZZED((+(-68354))));

struct GLF_live2QuicksortObject {
    int numbers[10];
};

GLF_live2QuicksortObject GLF_live2obj = GLF_live2QuicksortObject(int[10](0, 0, 0, 0, 0, _GLF_IDENTITY(0, (_GLF_IDENTITY(0, (0) << (0 >> _GLF_IDENTITY(int(6), int(6))))) | (0)), 0, 0, 0, 0));

void GLF_live2swap(int GLF_live2i, int GLF_live2j) {
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
            return;
        }
        int GLF_live18looplimiter2 = 0;
        if (GLF_live18looplimiter2 >= 3) {
            ;
        }
    }
    int GLF_live2temp = GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i, 10)];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead18result = _GLF_FUZZED(-0.0);
        float donor_replacementGLF_dead18thirty_two = _GLF_FUZZED(GLF_dead7one);
        {
            {
                int GLF_live16looplimiter0 = 0;
                if (GLF_live16looplimiter0 >= 6) {
                    ;
                }
            }
            if (mod(_GLF_IDENTITY(float(GLF_live2j), (_GLF_IDENTITY(float(GLF_live2j), float(mat4x2(float(GLF_live2j), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0)))) - 0.0), round(donor_replacementGLF_dead18thirty_two)) <= 0.01) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                {
                    float GLF_live15xCoord = _GLF_FUZZED(-773.654);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    float GLF_live15yCoord = _GLF_FUZZED(float(61417u));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    {
                        ;
                    }
                }
                donor_replacementGLF_dead18result += 100.0;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    _GLF_IDENTITY(GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i, 10)] = GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)], _GLF_IDENTITY(0 ^ (GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i, 10)] = GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)]), (_GLF_IDENTITY(0 ^ (GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i, 10)] = GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)]), (true ? (0 ^ (GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2i, 10)] = GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)])) : _GLF_FUZZED(24609)))) >> 0));
    GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)] = GLF_live2temp;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, mix(float(_GLF_FUZZED(6.0)), float(injectionSwitch.y), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
}

vec4 GLF_live1_GLF_color = _GLF_FUZZED((vec3(_GLF_IDENTITY(-995.911, clamp(-995.911, -995.911, -995.911)), 45.53, 551.271) * mat4x3(-9897.0423, 1.5, 7.6, 0.0, -456.660, -929.283, 3387.3658, -8928.9298, 34.38, 73.49, 8.8, 4.8)));

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_live1injectionSwitch;
};

float GLF_live1compute_derivative_x(float GLF_live1v) {
    return dFdx(GLF_live1v) * GLF_live1injectionSwitch.y;
    {
        int GLF_live18i = _GLF_FUZZED(52032);
        int GLF_live18j = _GLF_FUZZED(4390);
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        int GLF_live18k = _GLF_FUZZED((-59449));
        int GLF_live18looplimiter0 = 0;
        {
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (GLF_live18looplimiter0 >= 3) {
                ;
            }
            GLF_live18looplimiter0++;
            {
                if (GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] < GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18j, 10)]) {
                    GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i++, 10)];
                } else {
                    GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18j++, 10)];
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead8p = _GLF_FUZZED(ivec2(_GLF_IDENTITY(-14693, ~(~(_GLF_IDENTITY(-14693, (-14693) | (-14693)))))));
        if (donor_replacementGLF_dead8p.x < 0) {
            donor_replacementGLF_dead8p.y++;
        }
    }
}

float GLF_live1compute_derivative_y(float GLF_live1v) {
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    {
        float GLF_live15c_im = _GLF_FUZZED((-(-3.7)));
        float GLF_live15c_re = _GLF_FUZZED(-7.8);
        int GLF_live15iteration = _GLF_FUZZED(((-8542) & 38864));
        if (_GLF_DEAD(false)) {
            return 1.0;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
            }
        }
        int GLF_live15k = _GLF_FUZZED(((-14657) & ivec4(-85880, 89135, 39497, 4869).w));
        float GLF_live15x = _GLF_FUZZED(-69.14);
        float GLF_live15y = _GLF_FUZZED((+70.62));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return 1.0;
        }
        {
            if (GLF_live15x * GLF_live15x + GLF_live15y * GLF_live15y > 4.0) {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1.0;
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                }
            }
            float GLF_live15x_new = GLF_live15x * GLF_live15x - GLF_live15y * GLF_live15y + GLF_live15c_re;
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            GLF_live15y = 2.0 * GLF_live15x * GLF_live15y + GLF_live15c_im;
            GLF_live15x = GLF_live15x_new;
            GLF_live15iteration++;
            GLF_live15k++;
        }
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
    }
    {
        vec2 GLF_live11coord = _GLF_FUZZED((mat4x2(88.90, _GLF_IDENTITY(42.23, float(float(_GLF_IDENTITY(42.23, float(mat3(42.23, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0)))))), -1.9, 8.4, -4.3, -33.17, 2394.6278, -457.832) * vec4(8449.9568, -8.9, -620.864, -43.60)));
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        int GLF_live11i = _GLF_FUZZED(-46042);
        vec4 GLF_live11texel = _GLF_FUZZED(vec4(-54.12, 944.794, 3.0, 34.75));
        {
            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
            GLF_live11i++;
        }
    }
    return dFdy(_GLF_IDENTITY(GLF_live1v, (GLF_live1v) / 1.0)) * GLF_live1injectionSwitch.y;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_live1injectionSwitch);
        if (donor_replacementGLF_dead16a.y < _GLF_IDENTITY(donor_replacementGLF_dead16a, min(donor_replacementGLF_dead16a, donor_replacementGLF_dead16a)).x) {
            {
                float GLF_live18grey = _GLF_FUZZED(((vec4(66.10, 4846.5755, 1.3, -9983.4444) * mat2x4(6.8, 403.939, -619.875, 4131.1117, -2.5, -246.425, -11.66, 8.7)) * mat4x2(2.5, -8.6, -9731.0257, 25.19, -6.5, -95.06, 764.159, -370.157)).b);
                {
                    if (int(GLF_live18gl_FragCoord[1]) < 240) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return 1.0;
                        }
                        GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                    } else {
                        if (int(GLF_live18gl_FragCoord[1]) < 270) {
                            GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                        } else {
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            return 1.0;
                        }
                    }
                }
            }
            GLF_live1v = 0.5 - GLF_live1v;
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
        }
    }
}

float GLF_live1compute_stripe(float GLF_live1v) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return 1.0;
    }
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    return smoothstep(-.9, 1., (_GLF_IDENTITY(GLF_live1v, mix(float(_GLF_FUZZED(-3.6)), float(GLF_live1v), bool(true)))) / _GLF_IDENTITY(((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v)), (_GLF_IDENTITY(((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v)), (((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v))) / sqrt(1.0))) / 1.0));
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return 1.0;
        }
        return 1.0;
    }
    {
        vec2 GLF_live12v = _GLF_FUZZED((true ? vec2(-7.4, 1.8) : vec2(5.4, 219.727)));
        if (length(_GLF_IDENTITY(GLF_live12v, vec2(_GLF_IDENTITY(GLF_live12v[0], max(GLF_live12v[0], _GLF_IDENTITY(GLF_live12v[0], (GLF_live12v[0]) * 1.0))), GLF_live12v[1]))) < 0.001) {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return 1.0;
        {
            float GLF_live15c_im = _GLF_FUZZED(7.7);
            float GLF_live15c_re = _GLF_FUZZED(vec4(432.580, -7.5, 4319.3203, 8.6).y);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return 1.0;
                }
                return 1.0;
            }
            int GLF_live15iteration = _GLF_FUZZED(-47424);
            int GLF_live15iterationCap = _GLF_FUZZED(-27213);
            int GLF_live15k = _GLF_FUZZED(ivec3(6055, 86454, -27422).b);
            int GLF_live15looplimiter0 = 0;
            float GLF_live15x = _GLF_FUZZED(vec3(4.3, 5.9, 5.0).y);
            float GLF_live15y = _GLF_FUZZED(vec2(-5.7, 951.805).r);
            do {
                if (GLF_live15looplimiter0 >= 7) {
                    break;
                }
                GLF_live15looplimiter0++;
                {
                    if (GLF_live15x * GLF_live15x + GLF_live15y * GLF_live15y > 4.0) {
                        break;
                    }
                    float GLF_live15x_new = GLF_live15x * GLF_live15x - GLF_live15y * GLF_live15y + GLF_live15c_re;
                    GLF_live15y = 2.0 * GLF_live15x * GLF_live15y + GLF_live15c_im;
                    GLF_live15x = GLF_live15x_new;
                    GLF_live15iteration++;
                    GLF_live15k++;
                }
            } while (GLF_live15k < bitfieldInsert(GLF_live15iterationCap + (257.0 > GLF_live15resolution.y ? 1 : 0), 0, 0, 0));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1.0;
        }
    }
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        int GLF_live16count = _GLF_FUZZED(92662);
        int GLF_live16v = _GLF_FUZZED(-66963);
        {
            int GLF_live16looplimiter0 = 0;
            while (GLF_live16v > 1) {
                if (GLF_live16looplimiter0 >= 6) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                    discard;
                }
                GLF_live16looplimiter0++;
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if ((GLF_live16v & 1) == 1) {
                        GLF_live16v = 3 * GLF_live16v + 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    } else {
                        GLF_live16v /= 2;
                    }
                    GLF_live16count++;
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, _GLF_IDENTITY(gl_FragCoord, vec4(mat2(gl_FragCoord))))).y < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(normalize(GLF_live1injectionSwitch));
            float donor_replacementGLF_dead16z = _GLF_FUZZED(GLF_dead7one);
            if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                if (_GLF_DEAD(false)) {
                    _GLF_color = atanh((false ? vec4(-8693.7825, -1790.3818, -2886.9976, 5.8) : GLF_live18gl_FragCoord));
                }
            } else {
                _GLF_IDENTITY(donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x, (false ? _GLF_FUZZED(tanh(donor_replacementGLF_dead16z)) : _GLF_IDENTITY(donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x, (donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x) + 0.0)));
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(roundEven(resolution));
            if (donor_replacementGLF_dead9coord.y > 1.0)
                donor_replacementGLF_dead9coord.y -= 1.0;
            {
                int GLF_live14baseIndex = _GLF_FUZZED(-31479);
                int GLF_live14data = _GLF_FUZZED((+(-38514)));
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                int GLF_live14treeIndex = _GLF_FUZZED(-55333);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    _GLF_color = vec4(488.433, 3.3, 4.6, -51.43);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    if (GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex == -1) {
                        GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex = GLF_live14treeIndex;
                        GLF_live14makeTreeNode(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14treeIndex, 10)], GLF_live14data);
                        ;
                    } else {
                        {
                            int GLF_live16count = _GLF_FUZZED(84730);
                            int GLF_live16v = _GLF_FUZZED(-52142);
                            {
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                int GLF_live16looplimiter0 = 0;
                                while (GLF_live16v > 1) {
                                    if (GLF_live16looplimiter0 >= 6) {
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    GLF_live16looplimiter0++;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live1_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    {
                                        if ((GLF_live16v & 1) == 1) {
                                            GLF_live16v = 3 * GLF_live16v + 1;
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                return vec3(1.0, 1.0, 1.0);
                                            }
                                            GLF_live16v /= 2;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                continue;
                                            }
                                        }
                                        GLF_live16count++;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live18gl_FragCoord;
                            }
                            return vec3(1.0, 1.0, 1.0);
                        }
                        GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            float donor_replacementGLF_dead16th = _GLF_FUZZED((28.76 * 13.03));
                            {
                                donor_replacementGLF_dead16th = _GLF_IDENTITY(1.0 - donor_replacementGLF_dead16th, clamp(1.0 - donor_replacementGLF_dead16th, _GLF_IDENTITY(1.0 - donor_replacementGLF_dead16th, max(1.0 - donor_replacementGLF_dead16th, 1.0 - donor_replacementGLF_dead16th)), 1.0 - donor_replacementGLF_dead16th));
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                        }
                        ;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        _GLF_color = acos(_GLF_color);
    }
    return vec3(float(i) / 50.0, float(i) / 120.0, float(i) / 140.0);
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-4184.1117, 4.4, -1.9, 8.9);
    }
}

vec3 mand(float xCoord, float yCoord) {
    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true && (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), false || (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    float height = resolution.y;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        _GLF_color = _GLF_color;
    }
    float width = resolution.x;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            vec2 GLF_live11coord = _GLF_FUZZED((mat2(8.1, 5955.5483, -4.2, -86.41) * vec2(108.256, -4076.9932)));
            int GLF_live11i = _GLF_FUZZED(-61687);
            int GLF_live11looplimiter0 = 0;
            vec4 GLF_live11texel = _GLF_FUZZED(vec4(3.2, 0.8, 0.1, -2.1));
            while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                if (GLF_live11looplimiter0 >= 5) {
                    break;
                }
                GLF_live11looplimiter0++;
                {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        uint donor_replacementGLF_dead17uselessOutVariable = _GLF_FUZZED(160458u);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live18gl_FragCoord;
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (uint(GLF_live11looplimiter0) < uaddCarry(uint(GLF_live11i), 1u, donor_replacementGLF_dead17uselessOutVariable)) {
                            continue;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                _GLF_color = ((yCoord + GLF_dead7m34) * vec3(-7.5, -2.0, -3.9));
                            }
                        }
                        {
                            {
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                        }
                    }
                    GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                    {
                        float GLF_live15x = _GLF_FUZZED((+(-625.358)));
                        float GLF_live15y = _GLF_FUZZED(-3.9);
                        {
                            GLF_live15x = 1.0;
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            GLF_live15y = 1.0;
                        }
                    }
                    GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                    GLF_live11i++;
                }
            }
        }
        return _GLF_IDENTITY(vec3(1.0, 1.0, 1.0), vec3(mat4x2(vec3(1.0, 1.0, 1.0), determinant(mat3(1.0, 0.0, 1.0, 0.0, 1.0, 0.0, determinant(mat2(0.0, 0.0, 1.0, 0.0)), 0.0, 1.0)), 1.0, 0.0, 0.0, 1.0)));
        {
            int GLF_live16v = _GLF_FUZZED(int(false));
            if ((GLF_live16v & 1) == 1) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_live16v = 3 * GLF_live16v + 1;
            } else {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_live16v /= 2;
            }
        }
    }
    {
        {
            ;
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    float xpos = xCoord * 0.1 + (_GLF_IDENTITY(resolution, vec2(0.0, 0.0) + (_GLF_IDENTITY(resolution, vec2(mat4x2(resolution, 1.0, 0.0, tan(0.0), 1.0, 1.0, sin(0.0)))))).x * 0.6);
    float ypos = yCoord * 0.1 + (resolution.y * 0.4);
    {
        vec2 GLF_live12a = _GLF_FUZZED((vec2(-2366.2933, 3.9) * vec2(6878.3423, 72.44)));
        float GLF_live12th = _GLF_FUZZED((_GLF_IDENTITY((((-75117) + (-65740)) <= (-74279)) ? (-7.1) : (-4.7), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? ((((-75117) + (-65740)) <= (-74279)) ? (-7.1) : (-4.7)) : _GLF_FUZZED(width)))));
        if (_GLF_IDENTITY(GLF_live12a.y < GLF_live12a.x, (GLF_live12a.y < GLF_live12a.x) || _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            GLF_live12th = 0.5 - GLF_live12th;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, float(_GLF_IDENTITY(mat4x3(_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) - 0.0), 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0), transpose(transpose(mat4x3(_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) - 0.0), 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0)))))) < 0.0)))) {
        {
            int GLF_live16count = _GLF_FUZZED(61642);
            int GLF_live16looplimiter0 = 0;
            int GLF_live16v = _GLF_FUZZED(-82267);
            {
                if (GLF_live16looplimiter0 >= 6) {
                    ;
                }
                GLF_live16looplimiter0++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    if ((GLF_live16v & 1) == 1) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        GLF_live16v = 3 * GLF_live16v + 1;
                    } else {
                        GLF_live16v /= 2;
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    GLF_live16count++;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = ((ivec2(76399, -56590), GLF_dead7m34) * vec3(xpos, GLF_live1injectionSwitch));
        }
        _GLF_color = vec4(-34.49, -2724.2259, -7.6, -9.2);
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10i = _GLF_FUZZED(18100);
            {
                if (mod(_GLF_IDENTITY(float(donor_replacementGLF_dead10i), (float(donor_replacementGLF_dead10i)) / 1.0), height) <= 0.01) {
                    yCoord += 0.2;
                }
                if (float(donor_replacementGLF_dead10i) >= height) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                    ;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-3152.2648, 4.3, -2600.5829, -9.9);
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = atan(clamp(_GLF_color, _GLF_color, (-vec4(-3022.0440, 0.5, -0.5, 859.952))));
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                _GLF_color = tanh(GLF_live18gl_FragCoord);
            }
        }
        {
            int GLF_live15iteration = _GLF_FUZZED(-20570);
            {
                ;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
        _GLF_color = GLF_live1_GLF_color;
    }
    {
        bool GLF_live1c1 = _GLF_FUZZED((mat2(-67.00, -75.80, 38.81, _GLF_IDENTITY(-33.46, mix(float(_GLF_IDENTITY(-33.46, max(_GLF_IDENTITY(-33.46, _GLF_IDENTITY((-33.46) / 1.0, min(_GLF_IDENTITY((-33.46) / 1.0, clamp((-33.46) / 1.0, (-33.46) / 1.0, (-33.46) / 1.0)), (-33.46) / 1.0))), _GLF_IDENTITY(-33.46, clamp(-33.46, -33.46, -33.46))))), float(_GLF_FUZZED(-2.1)), _GLF_IDENTITY(bool(false), bool(bvec2(bool(false), false)))))) == _GLF_IDENTITY((mat2(-_GLF_IDENTITY(1.4, clamp(1.4, 1.4, 1.4)), -3.9, 65.90, -76.08) - (mat2(183.422, 1.7, -0.1, -6.0) - 739.212)), (_GLF_IDENTITY((mat2(-_GLF_IDENTITY(1.4, clamp(1.4, 1.4, 1.4)), -3.9, 65.90, -76.08) - (mat2(183.422, 1.7, -0.1, -6.0) - 739.212)), mat2(1.0) * ((mat2(-_GLF_IDENTITY(1.4, clamp(1.4, 1.4, 1.4)), -3.9, 65.90, -76.08) - (mat2(_GLF_IDENTITY(183.422, (true ? 183.422 : _GLF_FUZZED(trunc(yCoord)))), 1.7, -0.1, -_GLF_IDENTITY(6.0, max(_GLF_IDENTITY(6.0, min(6.0, 6.0)), 6.0))) - 739.212))))) - mat2(0.0, 0.0, 0.0, 0.0))));
        vec3 GLF_live1col = _GLF_FUZZED(vec3(-7532.8530, 2.6, -84.79));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead18i = _GLF_FUZZED(bitCount(152625u));
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                if (mod(float(donor_replacementGLF_dead18i), round(xpos)) <= 0.01) {
                    {
                        float GLF_live18grey = _GLF_FUZZED(8.5);
                        if (int(GLF_live18gl_FragCoord[1]) < 30) {
                            GLF_live18grey = 0.5 + float(GLF_live18data[0]) / 10.0;
                        } else {
                            if (int(GLF_live18gl_FragCoord[1]) < 60) {
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (mat4(8856.1047, 86.48, 9.6, 5.7, -583.587, 80.65, -984.805, -1.0, 8761.3867, 641.790, 9.9, -5.4, 1.6, 87.67, 5.5, -8661.1916) * GLF_live1_GLF_color);
                                    }
                                }
                                GLF_live18grey = 0.5 + float(GLF_live18data[1]) / 10.0;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                if (int(GLF_live18gl_FragCoord[1]) < 90) {
                                    GLF_live18grey = 0.5 + float(GLF_live18data[2]) / 10.0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                } else {
                                    if (int(GLF_live18gl_FragCoord[1]) < 120) {
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        GLF_live18grey = 0.5 + float(GLF_live18data[3]) / 10.0;
                                    } else {
                                        if (int(GLF_live18gl_FragCoord[1]) < 150) {
                                            ;
                                        } else {
                                            if (int(GLF_live18gl_FragCoord[1]) < 180) {
                                                GLF_live18grey = 0.5 + float(GLF_live18data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_live18gl_FragCoord[1]) < 210) {
                                                    GLF_live18grey = 0.5 + float(GLF_live18data[6]) / 10.0;
                                                } else {
                                                    if (int(GLF_live18gl_FragCoord[1]) < 240) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live18gl_FragCoord[1]) < 270) {
                                                            GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                            }
                        }
                    }
                    xpos += 100.0;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = degrees(_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        vec2 GLF_live1uv = _GLF_FUZZED((true ? vec2(-968.782, 80.98) : vec2(8.0, 5.9)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead18i = _GLF_FUZZED((-ivec3(4601, 86720, -18224).z));
                float donor_replacementGLF_dead18result = _GLF_FUZZED(ypos);
                if (float(donor_replacementGLF_dead18i) >= ypos) {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    ;
                    {
                        int GLF_live16v = _GLF_FUZZED(((-(true ? (-17806) : 61740)) | (-84763)));
                        if ((GLF_live16v & 1) == 1) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            GLF_live16v = 3 * GLF_live16v + 1;
                        } else {
                            GLF_live16v /= 2;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        _GLF_color = _GLF_color;
                    }
                }
                {
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_IDENTITY(GLF_live1c1, (GLF_live1c1) || false)) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            float GLF_live1stripe = GLF_live1compute_stripe(_GLF_IDENTITY(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0), float(_GLF_IDENTITY(mat4x3(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0), 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0, 1.0, 0.0, 1.0), transpose(_GLF_IDENTITY(transpose(_GLF_IDENTITY(mat4x3(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0), 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0, 1.0, 0.0, 1.0), transpose(transpose(mat4x3(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0), 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0, 1.0, 0.0, 1.0))))), mat4(1.0) * (transpose(_GLF_IDENTITY(mat4x3(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0), 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0, 1.0, 0.0, 1.0), transpose(transpose(mat4x3(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0), 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 0.0, 1.0, 1.0, sqrt(1.0), 0.0, 1.0, 0.0, 1.0))))))))))));
            GLF_live1col = mix(vec3(GLF_live1uv.x, 0, 0.75), vec3(.8, .7, GLF_live1uv.x), GLF_live1stripe);
            GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = radians(vec4(62.59, 5.1, 457.568, -155.049));
                    }
                    ;
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            ;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4i = _GLF_FUZZED(-61204);
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0))))), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)))))), false || (!(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)))))))))))) {
                return vec3(_GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, min(1.0, 1.0))) / 1.0), 1.0, 1.0);
            }
            {
                float GLF_live15xCoord = _GLF_FUZZED(vec3(-990.383, 15.97, 5.0).x);
                float GLF_live15yCoord = _GLF_FUZZED(vec3((vec4(1.0, -2084.1675, 7.6, 6.1) * mat2x4(8049.8882, -1.5, -95.71, -6.5, 4.5, 881.136, -4.1, -313.183)), -4203.9659).p);
                {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        _GLF_color = uintBitsToFloat(uvec4(18833u, 142503u, 89219u, 146223u));
                    }
                    ;
                }
            }
            int donor_replacementGLF_dead4k = _GLF_FUZZED(ivec4(ivec2(_GLF_IDENTITY(22463, (22463) | (22463)), 57236), clamp(ivec2(-73873, -48798), 19906, 51701)).b);
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) / vec4(1.0, 1.0, 1.0, 1.0)).x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), mix(float(_GLF_FUZZED(-81.89)), float(dot(vec2(0.0, 1.0), vec2(1.0, 0.0))), bool(true)))))))) {
                    float donor_replacementGLF_dead16th = _GLF_FUZZED(height);
                    if (GLF_live1uv.y < 0.0) {
                        _GLF_IDENTITY(donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th, (false ? _GLF_FUZZED(height) : (donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th)));
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                }
                GLF_dead4temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4k++, 10)] = GLF_dead4data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i++, 10)];
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    {
        float GLF_live15c_im = _GLF_FUZZED((-881.722));
        float GLF_live15c_re = _GLF_FUZZED((-5490.9375));
        int GLF_live15iteration = _GLF_FUZZED((-(-98950)));
        int GLF_live15iterationCap = _GLF_FUZZED((2425 & (-34010)));
        int GLF_live15k = _GLF_FUZZED((-(-62168)));
        float GLF_live15x = _GLF_FUZZED(-1.1);
        float GLF_live15y = _GLF_FUZZED(float(-43921));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            int GLF_live15looplimiter0 = 0;
            do {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (GLF_live15looplimiter0 >= 7) {
                    break;
                }
                GLF_live15looplimiter0++;
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live18gl_FragCoord;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(_GLF_ZERO(0.0, injectionSwitch.x), 1.0)), dot(vec2(1.0, 0.0), vec2(_GLF_ZERO(0.0, injectionSwitch.x), 1.0))))))) {
                        discard;
                    }
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(length(vec2(0.0, 0.0))))))) {
                        _GLF_color = vec4(132.513, 852.632, 90.26, -7.3);
                    }
                }
                {
                    if (GLF_live15x * GLF_live15x + GLF_live15y * GLF_live15y > 4.0) {
                        break;
                    }
                    float GLF_live15x_new = GLF_live15x * GLF_live15x - GLF_live15y * GLF_live15y + GLF_live15c_re;
                    GLF_live15y = 2.0 * GLF_live15x * GLF_live15y + GLF_live15c_im;
                    GLF_live15x = GLF_live15x_new;
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    GLF_live15iteration++;
                    GLF_live15k++;
                }
            } while (GLF_live15k < bitfieldInsert(GLF_live15iterationCap + (257.0 > GLF_live15resolution.y ? 1 : 0), 0, 0, 0));
        }
    }
    float c_re = 0.8 * (xpos - width / 2.0) * 4.0 / width - 0.4;
    float c_im = 0.8 * (ypos - height / _GLF_IDENTITY(2.0, min(_GLF_IDENTITY(2.0, float(_GLF_IDENTITY(mat4(2.0, abs(0.0), 1.0, 0.0, 0.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 1.0, 0.0, 1.0, 0.0, abs(1.0), 0.0, 0.0, 1.0, 0.0), transpose(transpose(mat4(2.0, abs(0.0), 1.0, 0.0, 0.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 1.0, 0.0, 1.0, 0.0, abs(1.0), 0.0, 0.0, 1.0, 0.0)))))), 2.0))) * 4.0 / width;
    float x = 0.0, y = 0.0;
    int iteration = 0;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            y += 0.4;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live18gl_FragCoord;
    }
    for (int k = 0; k < 1000; k++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            discard;
        }
        if (x * x + y * y > 4.0) {
            {
                float GLF_live12th = _GLF_FUZZED((6.7 - (-418.416)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = GLF_live18gl_FragCoord;
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    GLF_live12th = 1.0 - GLF_live12th;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                    {
                        int GLF_live18looplimiter5 = 0;
                        if (_GLF_DEAD(false)) {
                            break;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        if (GLF_live18looplimiter5 >= 3) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            break;
            {
                int GLF_live16v = _GLF_FUZZED(ivec4(69567, 29631, 85776, 22955).a);
                {
                    GLF_live16v /= 2;
                }
            }
        }
        float x_new = x * x - y * y + c_re;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                for (int GLF_dead10i = 1; GLF_dead10i < 800; GLF_dead10i++) {
                    if (mod(float(GLF_dead10i), xCoord) <= 0.01) {
                        height += 0.2;
                    }
                    if (float(GLF_dead10i) >= _GLF_IDENTITY(x, (_GLF_IDENTITY(x, float(mat4x2(x, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))), 1.0, 0.0, 1.0, 1.0)))) + _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 1.0, 1.0))))) {
                        ;
                    }
                }
            }
            {
                {
                    ;
                }
            }
            {
                x_new = -x_new;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = GLF_live1_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            continue;
        }
        y = 2.0 * x * y + c_im;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    xpos += 100.0;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = intBitsToFloat(ivec4(10050, 84390, -76176, -63915));
                }
                int GLF_live14baseIndex = _GLF_FUZZED(-7260);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                {
                    int GLF_live18i = _GLF_FUZZED(int(false));
                    int GLF_live18j = _GLF_FUZZED(-95086);
                    int GLF_live18k = _GLF_FUZZED(((-42498) & (-84730)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i, 10)] < GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18j, 10)]) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i++, 10)];
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            continue;
                        }
                    } else {
                        GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18j++, 10)];
                    }
                }
                int GLF_live14data = _GLF_FUZZED(-61364);
                int GLF_live14treeIndex = _GLF_FUZZED(-27305);
                if (GLF_live14data <= GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, _GLF_IDENTITY(10, (true ? 10 : _GLF_FUZZED(((true, GLF_live14data) * (-64209))))))].data) {
                    if (GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex == -1) {
                        GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex = GLF_live14treeIndex;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        GLF_live14makeTreeNode(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14treeIndex, 10)], GLF_live14data);
                        ;
                    } else {
                        GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex;
                        ;
                    }
                } else {
                    if (GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex == -1) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex = GLF_live14treeIndex;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        GLF_live14makeTreeNode(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14treeIndex, 10)], GLF_live14data);
                        ;
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                _GLF_color = GLF_live18gl_FragCoord;
                            }
                            int GLF_live16count = _GLF_FUZZED(((-25418) | (-47493)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = min(GLF_live1_GLF_color, width);
                                }
                                discard;
                            }
                            int GLF_live16v = _GLF_FUZZED(1617);
                            {
                                if ((GLF_live16v & 1) == 1) {
                                    GLF_live16v = 3 * GLF_live16v + 1;
                                } else {
                                    GLF_live16v /= 2;
                                }
                                GLF_live16count++;
                            }
                        }
                    } else {
                        GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                            _GLF_color = _GLF_color;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-722.664, -2270.2099, -0.2, -942.373);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            float GLF_live18grey = _GLF_FUZZED(147.892);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                            }
                        }
                        ;
                    }
                }
            }
            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(vec2(905.405, 8162.2593));
            if (donor_replacementGLF_dead9coord.y > 1.0)
                donor_replacementGLF_dead9coord.y -= 1.0;
        }
        {
            int GLF_live18high = _GLF_FUZZED((~90766));
            int GLF_live18low = _GLF_FUZZED(int(false));
            int GLF_live18m = _GLF_FUZZED(-67093);
            {
                int GLF_live18looplimiter3 = 0;
                for (int GLF_live18i = GLF_live18low; GLF_live18i < GLF_live18high; GLF_live18i += 2 * GLF_live18m) {
                    if (GLF_live18looplimiter3 >= 3) {
                        break;
                    }
                    GLF_live18looplimiter3++;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live1_GLF_color;
                    }
                    {
                        int GLF_live18from = GLF_live18i;
                        int GLF_live18mid = GLF_live18i + GLF_live18m - 1;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        int GLF_live18to = min(GLF_live18i + 2 * GLF_live18m - 1, GLF_live18high);
                        GLF_live18merge(GLF_live18from, GLF_live18mid, GLF_live18to);
                    }
                }
            }
        }
        {
            int GLF_live3i = _GLF_FUZZED((-(-_GLF_IDENTITY(14180, max(14180, 14180)))));
            {
                int GLF_live16count = _GLF_FUZZED(((-59175) & (52342 & ivec2(-65758, 6606)).x));
                if (_GLF_DEAD(false)) {
                    discard;
                }
                int GLF_live16v = _GLF_FUZZED((true ? 41669 : (-18728)));
                {
                    if ((GLF_live16v & 1) == 1) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = uintBitsToFloat(uvec4(8456u, 63132u, 50070u, 3847u));
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        GLF_live16v = 3 * GLF_live16v + 1;
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = cos(_GLF_color);
                        }
                        GLF_live16v /= 2;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    GLF_live16count++;
                }
            }
            int GLF_live3iters = _GLF_FUZZED((_GLF_IDENTITY((~(-48586)), ((~(-48586))) * 1) + _GLF_IDENTITY(((-15617) * (-36251)), ~(~(((-15617) * (-36251)))))));
            {
                int GLF_live16v = _GLF_FUZZED(-14926);
                if ((GLF_live16v & 1) == 1) {
                    GLF_live16v = 3 * GLF_live16v + 1;
                } else {
                    GLF_live16v /= 2;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = GLF_live1_GLF_color;
                    }
                }
            }
            int GLF_live3looplimiter0 = 0;
            int GLF_live3v = _GLF_FUZZED(-39441);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = (mat4(GLF_live18gl_FragCoord, GLF_live1_GLF_color, _GLF_color, GLF_live18gl_FragCoord) * _GLF_color);
                }
                continue;
            }
            for (GLF_live3i = 0; GLF_live3i < GLF_live3iters; GLF_live3i++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                        continue;
                    }
                }
                if (GLF_live3looplimiter0 >= 6) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead7m44[1];
                        }
                        return vec3(1.0, _GLF_IDENTITY(1.0, float(mat3x4(_GLF_IDENTITY(1.0, min(1.0, 1.0)), determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, _GLF_IDENTITY(0.0, (0.0) * exp(0.0))), vec2(0.0, 1.0))), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 0.0, 0.0, abs(1.0), 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0))), 1.0);
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        int GLF_live14baseIndex = _GLF_FUZZED(-49058);
                        int GLF_live14data = _GLF_FUZZED(((-25921) | (-84332)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        int GLF_live14treeIndex = _GLF_FUZZED((-ivec2(ivec3(57584, 30852, -83782))).y);
                        {
                            int GLF_live18high = _GLF_FUZZED(94471);
                            int GLF_live18low = _GLF_FUZZED((2312));
                            {
                                int GLF_live18looplimiter4 = 0;
                                for (int GLF_live18m = 1; GLF_live18m <= GLF_live18high; GLF_live18m = 2 * GLF_live18m) {
                                    if (GLF_live18looplimiter4 >= 3) {
                                        break;
                                    }
                                    GLF_live18looplimiter4++;
                                    {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            int GLF_live18looplimiter3 = 0;
                                            for (int GLF_live18i = GLF_live18low; GLF_live18i < GLF_live18high; GLF_live18i += 2 * GLF_live18m) {
                                                if (GLF_live18looplimiter3 >= 3) {
                                                    break;
                                                }
                                                GLF_live18looplimiter3++;
                                                {
                                                    int GLF_live18from = GLF_live18i;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                    }
                                                    int GLF_live18mid = GLF_live18i + GLF_live18m - 1;
                                                    int GLF_live18to = min(GLF_live18i + 2 * GLF_live18m - 1, GLF_live18high);
                                                    GLF_live18merge(GLF_live18from, GLF_live18mid, GLF_live18to);
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        continue;
                                    }
                                }
                            }
                        }
                        {
                            if (_GLF_IDENTITY(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex, int(ivec2(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex, 0))) == -1) {
                                GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex = GLF_live14treeIndex;
                                GLF_live14makeTreeNode(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14treeIndex, 10)], GLF_live14data);
                                ;
                                {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    int GLF_live15looplimiter2 = 0;
                                    if (GLF_live15looplimiter2 >= 7) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        ;
                                    }
                                }
                            } else {
                                GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex;
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (GLF_dead6tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 10)].leftIndex == -1) {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(vec2(-7248.1423, -8.4));
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        _GLF_color = GLF_live18gl_FragCoord;
                                    }
                                    yCoord = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                            }
                            GLF_dead6tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 10)].leftIndex = GLF_live3looplimiter0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live1_GLF_color;
                            }
                            GLF_dead6makeTreeNode(GLF_dead6tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 10)], GLF_live3v);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            ;
                        } else {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            GLF_live3looplimiter0 = GLF_dead6tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 10)].leftIndex;
                            continue;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, mix(float(_GLF_FUZZED(7.1)), float(injectionSwitch.x), bool(true))) > injectionSwitch.y)))) {
                        _GLF_color = _GLF_color;
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        break;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
                {
                    int GLF_live16count = _GLF_FUZZED(((4301 & 40067) - (-21475)));
                    int GLF_live16looplimiter0 = 0;
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    int GLF_live16v = _GLF_FUZZED(-47597);
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    while (GLF_live16v > 1) {
                        if (GLF_live16looplimiter0 >= 6) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            break;
                        }
                        GLF_live16looplimiter0++;
                        {
                            if ((GLF_live16v & 1) == 1) {
                                GLF_live16v = 3 * GLF_live16v + 1;
                            } else {
                                GLF_live16v /= 2;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                            GLF_live16count++;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live18gl_FragCoord;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0))))))) {
                    continue;
                }
                GLF_live3looplimiter0++;
                {
                    {
                        int GLF_live18i = _GLF_FUZZED(99492);
                        int GLF_live18k = _GLF_FUZZED(-98514);
                        int GLF_live18mid = _GLF_FUZZED(-9210);
                        {
                            int GLF_live18looplimiter1 = 0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            while (GLF_live18i < GLF_live18N && GLF_live18i <= GLF_live18mid) {
                                if (GLF_live18looplimiter1 >= 3) {
                                    break;
                                }
                                GLF_live18looplimiter1++;
                                {
                                    GLF_live18temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18k++, 10)] = GLF_live18data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18i++, 10)];
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                            _GLF_color = clamp(vec4(-820.377, -6901.1811, 863.305, 763.143), GLF_live18gl_FragCoord, GLF_live18gl_FragCoord);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                        _GLF_color = min((-vec4(-1616.3595, 8.0, 2494.9407, -3.9)), float(179941u));
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                    GLF_live3v = (4 * GLF_live3v * (1000 - GLF_live3v)) / 1000;
                    if (_GLF_DEAD(false)) {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                _GLF_color = GLF_live1_GLF_color;
                            }
                            int GLF_live16count = _GLF_FUZZED((~33767));
                            int GLF_live16v = _GLF_FUZZED((89392));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                            {
                                if ((GLF_live16v & 1) == 1) {
                                    GLF_live16v = 3 * GLF_live16v + 1;
                                } else {
                                    GLF_live16v /= 2;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            discard;
                                        }
                                    }
                                }
                                GLF_live16count++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec3 donor_replacementGLF_dead18c = _GLF_FUZZED(uintBitsToFloat(uvec3(136203u, 82455u, 199329u)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 3)] >= 1.0) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 3)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 3)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 3)];
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                break;
                            }
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        vec2 GLF_live12a = _GLF_FUZZED(vec2(-7.9, -41.30));
                        float GLF_live12z = _GLF_FUZZED(((-2.6) - 1440.3904));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (fwidthCoarse(ypos) / GLF_live18gl_FragCoord);
                        }
                        {
                            GLF_live12z = GLF_live12a.x / GLF_live12a.y;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    {
                        ;
                    }
                    {
                        int GLF_live18high = _GLF_FUZZED(-51235);
                        int GLF_live18i = _GLF_FUZZED(-52505);
                        int GLF_live18m = _GLF_FUZZED(-8518);
                        {
                            int GLF_live18from = GLF_live18i;
                            int GLF_live18mid = GLF_live18i + GLF_live18m - 1;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                discard;
                            }
                            int GLF_live18to = min(GLF_live18i + 2 * GLF_live18m - 1, GLF_live18high);
                            GLF_live18merge(GLF_live18from, GLF_live18mid, GLF_live18to);
                        }
                    }
                }
            }
            {
                {
                    ;
                    {
                        int GLF_live16v = _GLF_FUZZED(-75631);
                        if ((GLF_live16v & 1) == 1) {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            GLF_live16v = 3 * GLF_live16v + 1;
                        } else {
                            GLF_live16v /= 2;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                discard;
            }
        }
        x = x_new;
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, !(!(false)))))))) {
                discard;
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live18gl_FragCoord;
                }
            }
        }
        {
            int GLF_live15iteration = _GLF_FUZZED(79688);
            {
                ;
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
        }
        iteration++;
        {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                float GLF_live12th = _GLF_FUZZED(-6.7);
                vec2 GLF_live12v = _GLF_FUZZED(vec2(4.5, 658.059));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    break;
                }
                if (GLF_live12v.x < 0.0) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    _GLF_IDENTITY(GLF_live12th = 1.0 - GLF_live12th, (GLF_live12th = 1.0 - GLF_live12th) * 1.0);
                }
            }
            vec3 GLF_live1col = _GLF_FUZZED(vec3(vec2(-492.731, 700.662), float(171262u)));
            {
                vec2 GLF_live11coord = _GLF_FUZZED((_GLF_IDENTITY(vec2(-0.2, -560.895), vec2(mat3(_GLF_IDENTITY(vec2(-0.2, -560.895), (false ? _GLF_FUZZED(injectionSwitch) : vec2(-0.2, -560.895))), 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, sqrt(1.0)))) * (-32.25)));
                int GLF_live11i = _GLF_FUZZED(69544);
                vec4 GLF_live11texel = _GLF_FUZZED(vec4(9806.6837, -206.239, 2.7, -1.2));
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) {
                    {
                        x = 1.0 - x;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            break;
                        }
                    }
                }
                {
                    GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (c_re * GLF_live11texel);
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        discard;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                    GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                    GLF_live11i++;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) || false)) {
                        if (GLF_live11coord.y < 0.0) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                continue;
                            }
                            height = -height;
                        }
                    }
                }
                {
                    float GLF_live15x = _GLF_FUZZED((vec3(7321.6219, 590.660, 864.821) - 37.21).s);
                    float GLF_live15y = _GLF_FUZZED(77.34);
                    if (GLF_live15x * GLF_live15x + GLF_live15y * GLF_live15y > 4.0) {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            vec2 GLF_live1uv = _GLF_FUZZED((+vec2(-2.2, -633.825)));
            if (_GLF_DEAD(false)) {
                while (iteration < 1 && GLF_live1uv.x > 1.0 || GLF_live1uv.y > 1.0) {
                    {
                        int GLF_live18looplimiter1 = 0;
                        if (GLF_live18looplimiter1 >= 3) {
                            ;
                        }
                    }
                    if (GLF_live1uv.x > 1.0) {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        GLF_live1uv.x -= 1.0;
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (GLF_live1uv.y > 1.0)
                        GLF_live1uv.y -= 1.0;
                    GLF_live1uv *= 2.0;
                    iteration++;
                }
            }
            {
                int GLF_live13iterationCap = _GLF_FUZZED(74511);
                {
                    GLF_live13iterationCap += 1;
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                int GLF_live16v = _GLF_FUZZED(((-33335) * int(88580u)));
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mod(GLF_live18gl_FragCoord, height);
                    }
                    GLF_live16v /= 2;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = log(GLF_live1_GLF_color);
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (float(k) >= width) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(log(1.0), 1.0, 1.0, tan(0.0), 0.0, 1.0, 0.0, 0.0, 0.0)))))) {
                            break;
                        }
                    }
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    if (float(iteration) >= x_new) {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                discard;
            }
            {
                float GLF_live1stripe = GLF_live1compute_stripe(cos((GLF_live1uv.x + GLF_live1uv.y) * 20.0));
                GLF_live1col = _GLF_IDENTITY(mix(_GLF_IDENTITY(vec3(GLF_live1uv.x, 0, 0.75), vec3(mat2x3(vec3(GLF_live1uv.x, 0, 0.75), 0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)), 1.0))), vec3(.8, .7, GLF_live1uv.x), GLF_live1stripe), (mix(_GLF_IDENTITY(vec3(GLF_live1uv.x, 0, 0.75), vec3(mat2x3(vec3(GLF_live1uv.x, 0, 0.75), 0.0, determinant(mat2(1.0, 0.0, 1.0, 1.0)), 1.0))), vec3(.8, .7, GLF_live1uv.x), GLF_live1stripe)) * mat3(1.0));
                GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
                if (_GLF_DEAD(false)) {
                    discard;
                }
                ;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                continue;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            break;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, min(gl_FragCoord, gl_FragCoord)).x < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))))))) {
            if (_GLF_IDENTITY(mod(_GLF_IDENTITY(float(k), min(float(k), float(k))), x), (mod(_GLF_IDENTITY(float(k), min(float(k), float(k))), x)) * 1.0) <= 0.01) {
                height += 0.2;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                continue;
            }
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                break;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(vec2(76.39, _GLF_IDENTITY(-47.16, (true ? (-47.16) : _GLF_FUZZED(ypos)))));
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(mix(xCoord, width, (true ^^ true)), GLF_dead7one, faceforward(ypos, xpos, ypos), c_re);
        }
        if (_GLF_IDENTITY(donor_replacementGLF_dead9coord.x, mix(float(donor_replacementGLF_dead9coord.x), float(_GLF_FUZZED(float(-61162))), bool(false))) > 1.0)
            donor_replacementGLF_dead9coord.x -= 1.0;
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (iteration < 1000) {
        return pickColor(iteration);
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_live1_GLF_color;
        }
    } else {
        return _GLF_IDENTITY(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), clamp(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), _GLF_IDENTITY(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), min(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y))), _GLF_IDENTITY(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat3x2(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), 1.0, determinant(mat4(0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), abs(0.0), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)), sin(0.0)), transpose(transpose(mat3x2(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), 1.0, determinant(mat4(0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), abs(0.0), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)), sin(0.0)))))), (vec3(_GLF_IDENTITY(mat3x2(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), 1.0, determinant(mat4(0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), abs(0.0), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)), sin(0.0)), transpose(transpose(mat3x2(vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y), 1.0, determinant(mat4(0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), abs(0.0), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)), sin(0.0))))))) / vec3(1.0, 1.0, 1.0)))));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        int GLF_live14looplimiter2 = 0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        int GLF_live14sum = _GLF_FUZZED(68639);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        int GLF_live14target = _GLF_FUZZED(-24002);
        {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (GLF_live14looplimiter2 >= 4) {
                ;
            }
            GLF_live14looplimiter2++;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(dFdxFine(resolution));
                if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                    xCoord = 0.5 - xCoord;
                }
                {
                    int GLF_live16v = _GLF_FUZZED((51545 - (-16313)));
                    {
                        GLF_live16v = 3 * GLF_live16v + 1;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(-1.0, 9.7, 4.6, -0.1);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(3.4, 414.026, 3063.7671, -563.984);
                }
                return vec3(1.0, 1.0, 1.0);
            }
            {
                int GLF_live16count = _GLF_FUZZED(68443);
                int GLF_live16v = _GLF_FUZZED((54925 ^ ivec2(99407, 99010).y));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    _GLF_color = faceforward(GLF_live18gl_FragCoord, normalize(GLF_live18gl_FragCoord), GLF_live1_GLF_color);
                }
                {
                    if ((GLF_live16v & 1) == 1) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        GLF_live16v = 3 * GLF_live16v + 1;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = trunc((GLF_live18gl_FragCoord - yCoord));
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        GLF_live16v /= 2;
                    }
                    GLF_live16count++;
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                int GLF_live14result = GLF_live14search(GLF_live14target);
                if (GLF_live14result > 0) {
                    GLF_live14sum += GLF_live14result;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    switch (GLF_live14result) {
                        case -1:
                            GLF_live14sum += 1;
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            {
                                float GLF_live18grey = _GLF_FUZZED(7926.6416);
                                {
                                    if (int(GLF_live18gl_FragCoord[1]) < 150) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live1_GLF_color;
                                        }
                                        ;
                                    } else {
                                        if (int(GLF_live18gl_FragCoord[1]) < 180) {
                                            GLF_live18grey = 0.5 + float(GLF_live18data[5]) / 10.0;
                                        } else {
                                            if (int(GLF_live18gl_FragCoord[1]) < 210) {
                                                GLF_live18grey = 0.5 + float(GLF_live18data[6]) / 10.0;
                                            } else {
                                                if (int(GLF_live18gl_FragCoord[1]) < 240) {
                                                    GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_live18gl_FragCoord;
                                                    }
                                                    if (int(GLF_live18gl_FragCoord[1]) < 270) {
                                                        GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                                                    } else {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                            }
                        case 0:
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                uint donor_replacementGLF_dead17uselessOutVariable = _GLF_FUZZED(68489u);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(float(136994u), y, vec2(723.265, 8.2));
                                }
                                if (uint(GLF_live14target) < uaddCarry(uint(iteration), 1u, donor_replacementGLF_dead17uselessOutVariable)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    ;
                                }
                            }
                            ;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        _GLF_color = GLF_live1_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead16v = _GLF_FUZZED((mat3x2(277.115, -9860.5474, -2682.7036, -3.5, 27.01, -1.4) * vec3(-53.38, 135.720, 17.00)));
                    if (donor_replacementGLF_dead16v.y < 0.0) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = min(vec4(6714.9990, 708.795, 3773.0785, 31.92), y);
                        }
                        width = -width;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        _GLF_color = (mat3x4(4.1, 7.9, 4389.4626, 0.4, -1429.4368, -3.6, _GLF_IDENTITY(13.85, mix(float(_GLF_FUZZED(6660.8054)), float(13.85), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), -0.1, -92.53, -6.1, -22.37, -248.849) * tan(vec3(-0.6, -4.5, -90.98)));
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = asin(tanh(resolution).yyxx);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0), vec3(1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))))), _GLF_IDENTITY(dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0), vec3(1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))))), 0.0 + (dot(vec3(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0), vec3(1.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)))))))))))) {
        _GLF_color = GLF_live1_GLF_color;
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead10i = _GLF_FUZZED(((-_GLF_IDENTITY(91016, (true ? 91016 : _GLF_FUZZED(-97799)))) & (bitfieldReverse(10153) - (-20022))));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                _GLF_color = (vec4(-182.620, -9.7, -6.8, -99.72) / 45.81);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
            }
        }
        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 4)] >= 1.0) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 4)] = _GLF_IDENTITY(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 4)], mix(float(_GLF_FUZZED(-3360.8067)), float(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 4)]), bool(true))) * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 4)];
        }
    }
    if (_GLF_IDENTITY(_GLF_DEAD(false), _GLF_IDENTITY(bool(bvec4(_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false))), true, false, true)), !(!(bool(bvec4(_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false))), true, false, true))))))) {
        _GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    vec3 data[16];
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
        if (_GLF_DEAD(false)) {
            _GLF_color = donor_replacementGLF_dead9coord.ssts;
        }
        int donor_replacementGLF_dead9i = _GLF_FUZZED(-43322);
        {
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(GLF_dead7one);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                int GLF_live13looplimiter3 = 0;
                if (GLF_live13looplimiter3 >= 5) {
                    ;
                }
            }
            if (_GLF_IDENTITY(donor_replacementGLF_dead9coord.x, (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(-1.8) : donor_replacementGLF_dead9coord.x)) > 1.0) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = acos(clamp(_GLF_color, GLF_dead7one, GLF_dead7one));
                }
                donor_replacementGLF_dead9coord.x -= 1.0;
            }
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_dead7m24 * GLF_live15resolution);
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                int GLF_live16looplimiter0 = 0;
                if (GLF_live16looplimiter0 >= 6) {
                    ;
                }
            }
            if (donor_replacementGLF_dead9coord.y > 1.0)
                donor_replacementGLF_dead9coord.y -= 1.0;
            donor_replacementGLF_dead9coord *= 2.0;
            donor_replacementGLF_dead9i++;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            _GLF_color = vec4(9.9, 870.654, -3879.4541, 97.40);
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        int GLF_live3v = _GLF_FUZZED(61443);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = acos((_GLF_color - _GLF_color));
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live18gl_FragCoord;
            }
            return;
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_IDENTITY(min(_GLF_color, GLF_live1_GLF_color), vec4(0.0, 0.0, 0.0, 0.0) + (min(_GLF_color, GLF_live1_GLF_color)));
            }
            GLF_live3v = (4 * GLF_live3v * (1000 - GLF_live3v)) / 1000;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(abs(1.0)))))) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(GLF_dead7one, vec3(784.600, 0.2, 5.4));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < _GLF_IDENTITY(4, 0 | (4)); j++) {
            {
                if (_GLF_DEAD(false)) {
                    return;
                }
                int GLF_live14looplimiter1 = 0;
                if (GLF_live14looplimiter1 >= 4) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                int GLF_live2i = _GLF_FUZZED((((-2592) + (10540 - 6944)) * (-88780)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
                int GLF_live2j = _GLF_FUZZED(91186);
                if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), bool(bvec3(!(_GLF_DEAD(false)), true, true)))))) {
                    return;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                int GLF_live2looplimiter0 = 0;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    continue;
                }
                int GLF_live2pivot = _GLF_FUZZED(-95810);
                {
                    if (GLF_live2looplimiter0 >= 4) {
                        {
                            int GLF_live16v = _GLF_FUZZED(55919);
                            {
                                GLF_live16v = 3 * GLF_live16v + 1;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(8616.7659, -5141.1712, 374.361, -84.86);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                        }
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live14sum = _GLF_FUZZED((~(-9989)));
                            int GLF_live14target = _GLF_FUZZED(34832);
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live18gl_FragCoord.stqs;
                                }
                                int GLF_live14result = GLF_live14search(GLF_live14target);
                                if (GLF_live14result > 0) {
                                    GLF_live14sum += GLF_live14result;
                                } else {
                                    switch (GLF_live14result) {
                                        case -1:
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            GLF_live14sum += 1;
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                    }
                                                    _GLF_color = mix(reflect(GLF_live1_GLF_color, GLF_live18gl_FragCoord), vec4(1.4, -1686.0981, 68.56, 7.4), -46.71);
                                                }
                                                int GLF_live16count = _GLF_FUZZED(int(true));
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    _GLF_color = (GLF_dead7one + _GLF_color);
                                                }
                                                int GLF_live16v = _GLF_FUZZED(((-30412) * 73072));
                                                {
                                                    if ((GLF_live16v & 1) == 1) {
                                                        GLF_live16v = 3 * GLF_live16v + 1;
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            discard;
                                                        }
                                                        GLF_live16v /= 2;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                continue;
                                                            }
                                                            _GLF_color = cos(GLF_live1_GLF_color);
                                                        }
                                                        return;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            return;
                                                        }
                                                    }
                                                    GLF_live16count++;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        continue;
                                                    }
                                                }
                                            }
                                            break;
                                            {
                                                int GLF_live16count = _GLF_FUZZED(-5878);
                                                int GLF_live16v = _GLF_FUZZED((59195 - 55493));
                                                {
                                                    int GLF_live16looplimiter0 = 0;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = sign(GLF_live18gl_FragCoord);
                                                    }
                                                    while (GLF_live16v > 1) {
                                                        if (GLF_live16looplimiter0 >= 6) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_live18gl_FragCoord;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                discard;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            discard;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        GLF_live16looplimiter0++;
                                                        {
                                                            if ((GLF_live16v & 1) == 1) {
                                                                GLF_live16v = 3 * GLF_live16v + 1;
                                                            } else {
                                                                GLF_live16v /= 2;
                                                            }
                                                            GLF_live16count++;
                                                        }
                                                    }
                                                }
                                            }
                                        case 0:
                                            ;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                            }
                        }
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(vec2(92.04, 29.07));
                        if (donor_replacementGLF_dead9coord.x < 1.0 && donor_replacementGLF_dead9coord.y < 1.0) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                            {
                                int GLF_live16v = _GLF_FUZZED(int(154444u));
                                {
                                    GLF_live16v /= 2;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            GLF_live1_GLF_color = texture(GLF_dead9tex, donor_replacementGLF_dead9coord);
                        }
                        {
                            int GLF_live16v = _GLF_FUZZED(42207);
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live1_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                GLF_live16v /= 2;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    }
                    GLF_live2looplimiter0++;
                    {
                        if (_GLF_IDENTITY(GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)] <= GLF_live2pivot, (_GLF_IDENTITY(GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)] <= GLF_live2pivot, (_GLF_IDENTITY(GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)] <= GLF_live2pivot, bool(bvec4(GLF_live2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2j, 10)] <= GLF_live2pivot, false, false, false)))) || false)) && true)) {
                            GLF_live2i++;
                            GLF_live2swap(GLF_live2i, GLF_live2j);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                continue;
                            }
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead18c = _GLF_FUZZED(vec3(5.9, 8.2, 42.98));
                                {
                                    donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(j, 3)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                break;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            _GLF_color = sinh(_GLF_color);
                        }
                        uint donor_replacementGLF_dead7matrix_number = _GLF_FUZZED(floatBitsToUint((true ? (-81.60) : (-_GLF_IDENTITY(5203.4145, _GLF_IDENTITY(_GLF_IDENTITY(float(_GLF_IDENTITY(mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0), (mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0)) + mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), (true ? float(_GLF_IDENTITY(mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0), (mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0)) + mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, 0.0))) : _GLF_FUZZED(-4.2))), (_GLF_IDENTITY(float(_GLF_IDENTITY(mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0), (mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0)) + mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), (true ? float(_GLF_IDENTITY(mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0), (mat4(_GLF_IDENTITY(5203.4145, max(_GLF_IDENTITY(5203.4145, 1.0 * (5203.4145)), 5203.4145)), 0.0, 0.0, abs(sqrt(1.0)), 1.0, 0.0, 0.0, 0.0, 1.0, tan(0.0), 0.0, 1.0, 1.0, 1.0, sqrt(1.0), 0.0)) + mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, 0.0))) : _GLF_FUZZED(-4.2)))) * 1.0))))));
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        {
                            for (int GLF_dead7rows = 2; GLF_dead7rows <= 4; GLF_dead7rows++) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    break;
                                }
                                for (int GLF_dead7c = 0; GLF_dead7c < GLF_live2pivot; GLF_dead7c++) {
                                    for (int GLF_dead7r = 0; GLF_dead7r < GLF_dead7rows; GLF_dead7r++) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = asin(vec4(-6.4, 9826.8405, 15.98, 3.5));
                                        }
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                            float GLF_live12th = _GLF_FUZZED(float(false));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            {
                                                {
                                                    int GLF_live16count = _GLF_FUZZED((~(-79671)));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                    }
                                                    int GLF_live16v = _GLF_FUZZED((35789 & ((-83859) & (-50652))));
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    {
                                                        if ((GLF_live16v & 1) == 1) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = GLF_live18gl_FragCoord;
                                                            }
                                                            GLF_live16v = 3 * GLF_live16v + 1;
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = (cosh(distance(GLF_live1_GLF_color, _GLF_color)) - GLF_live18gl_FragCoord);
                                                            }
                                                            GLF_live16v /= 2;
                                                        }
                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                                            return;
                                                        }
                                                        GLF_live16count++;
                                                    }
                                                }
                                                GLF_live12th = -GLF_live12th;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        switch (donor_replacementGLF_dead7matrix_number) {
                                            case 0u:
                                                {
                                                    float GLF_live18grey = _GLF_FUZZED(vec3(-2772.8731, -96.64, -1102.8919).y);
                                                    if (int(GLF_live18gl_FragCoord[1]) < 120) {
                                                        GLF_live18grey = 0.5 + float(GLF_live18data[3]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live18gl_FragCoord[1]) < 150) {
                                                            ;
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                        } else {
                                                            if (int(GLF_live18gl_FragCoord[1]) < 180) {
                                                                GLF_live18grey = 0.5 + float(GLF_live18data[5]) / 10.0;
                                                            } else {
                                                                if (int(GLF_live18gl_FragCoord[1]) < 210) {
                                                                    GLF_live18grey = 0.5 + float(GLF_live18data[6]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_live18gl_FragCoord[1]) < 240) {
                                                                        GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = (+vec4(-0.1, -6.6, 73.84, 7690.1549));
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), !(!(bool(bool(false)))))))) {
                                                                            continue;
                                                                            if (_GLF_DEAD(false)) {
                                                                                return;
                                                                            }
                                                                        }
                                                                    } else {
                                                                        if (int(GLF_live18gl_FragCoord[1]) < 270) {
                                                                            GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                                                                            if (_GLF_DEAD(false)) {
                                                                                discard;
                                                                            }
                                                                        } else {
                                                                            ;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_dead7m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 2)] = GLF_dead7one;
                                                break;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    break;
                                                }
                                            case 1u:
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                    _GLF_color = floor(vec4(900.581, -182.012, 9.4, -4.8));
                                                }
                                                GLF_dead7m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 3)] = GLF_dead7one;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        break;
                                                    }
                                                    break;
                                                }
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    vec2 GLF_live12a = _GLF_FUZZED(vec2(-908.173, -7.3));
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        float GLF_live18grey = _GLF_FUZZED(750.854);
                                                        {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                return;
                                                            }
                                                            if (int(GLF_live18gl_FragCoord[1]) < 120) {
                                                                GLF_live18grey = 0.5 + float(GLF_live18data[3]) / 10.0;
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = GLF_live1_GLF_color;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        discard;
                                                                    }
                                                                }
                                                            } else {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    break;
                                                                }
                                                                if (int(GLF_live18gl_FragCoord[1]) < 150) {
                                                                    ;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        continue;
                                                                    }
                                                                } else {
                                                                    if (int(GLF_live18gl_FragCoord[1]) < 180) {
                                                                        GLF_live18grey = 0.5 + float(GLF_live18data[5]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_live18gl_FragCoord[1]) < 210) {
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                discard;
                                                                            }
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                break;
                                                                            }
                                                                            GLF_live18grey = 0.5 + float(GLF_live18data[6]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_live18gl_FragCoord[1]) < 240) {
                                                                                GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_live18gl_FragCoord[1]) < 270) {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        return;
                                                                                    }
                                                                                    GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                                                                                } else {
                                                                                    ;
                                                                                }
                                                                                if (_GLF_DEAD(false)) {
                                                                                    continue;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                        }
                                                    }
                                                    float GLF_live12z = _GLF_FUZZED(float(true));
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = mix(GLF_live1_GLF_color, (GLF_live12z / vec4(-4.9, -89.76, 89.52, -3785.2908)), bvec4(false, true, true, true));
                                                        }
                                                        {
                                                            int GLF_live16looplimiter0 = 0;
                                                            if (GLF_live16looplimiter0 >= 6) {
                                                                ;
                                                            }
                                                        }
                                                        GLF_live12z = GLF_live12a.y / GLF_live12a.x;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_live18gl_FragCoord;
                                                }
                                            case 2u:
                                                GLF_dead7m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 4)] = GLF_dead7one;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    continue;
                                                }
                                                break;
                                            case 3u:
                                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(82.25), _GLF_FUZZED(-8230.6276)), vec2((injectionSwitch)[0], (injectionSwitch)[1]), bvec2(true, true))).x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = vec4(-8227.2137, 934.366, 0.2, -8.7);
                                                        }
                                                        discard;
                                                    }
                                                    if (uint(i) < uaddCarry(uint(GLF_live2looplimiter0), 1u, donor_replacementGLF_dead7matrix_number)) {
                                                        continue;
                                                    }
                                                }
                                                GLF_dead7m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 2)] = GLF_dead7one;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    discard;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-83.55, 7.6, 4484.8873, 4484.7949);
                                                }
                                            case 4u:
                                                GLF_dead7m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 3)] = GLF_dead7one;
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(_GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0, 1.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(_GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0))), 1.0, 1.0, 0.0))))))) {
                                                        _GLF_color = (vec4(-4.2, 79.83, 61.86, -5103.3733) + (GLF_dead7one / GLF_live18gl_FragCoord));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            discard;
                                                        }
                                                    }
                                                    return;
                                                }
                                                break;
                                            case 5u:
                                                GLF_dead7m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 4)] = GLF_dead7one;
                                                {
                                                    float GLF_live14v = _GLF_FUZZED(97.32);
                                                    if (GLF_live14v < float(GLF_live14search(6))) {
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    break;
                                                                }
                                                                GLF_live14v = 1.0 - GLF_live14v;
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                continue;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                    }
                                                }
                                                break;
                                            case 6u:
                                                GLF_dead7m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 2)] = GLF_dead7one;
                                                break;
                                            case 7u:
                                                GLF_dead7m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 3)] = GLF_dead7one;
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_live18gl_FragCoord;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            break;
                                                        }
                                                    }
                                                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(injectionSwitch);
                                                    float donor_replacementGLF_dead16z = _GLF_FUZZED(GLF_dead7one);
                                                    {
                                                        donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
                                                    }
                                                }
                                                break;
                                            case 8u:
                                                GLF_dead7m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7r, 4)] = GLF_dead7one;
                                                break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-22.11, -436.728, 119.450, -1.7);
                                        }
                                    }
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live1_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                                donor_replacementGLF_dead7matrix_number = donor_replacementGLF_dead7matrix_number + 1u;
                            }
                        }
                        {
                            vec2 GLF_live12a = _GLF_FUZZED((vec2(2.2, 4.1) + (-3866.0785)));
                            float GLF_live12z = _GLF_FUZZED(834.923);
                            if (GLF_live12a.y > GLF_live12a.x) {
                                GLF_live12z = GLF_live12a.x / GLF_live12a.y;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = cosh(GLF_live1_GLF_color);
                                }
                                GLF_live12z = GLF_live12a.y / GLF_live12a.x;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = step(dFdxFine(GLF_live1_GLF_color), GLF_live1_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = sinh(_GLF_color);
                            }
                        }
                        {
                            int GLF_live16count = _GLF_FUZZED(int((vec4(-865.203, 8.9, 9834.4445, 9.1) != vec4(vec2(6860.6334, -214.909), 35.51, -78.16))));
                            int GLF_live16v = _GLF_FUZZED((+(false ? (-83063) : 75518)));
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                if ((GLF_live16v & 1) == 1) {
                                    GLF_live16v = 3 * GLF_live16v + 1;
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                } else {
                                    GLF_live16v /= 2;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        discard;
                                    }
                                }
                                GLF_live16count++;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = refract(vec4(-29.72, -6.0, 4805.0894, -4.0), GLF_live1_GLF_color, -9.5);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    continue;
                                }
                            }
                            ivec2 donor_replacementGLF_dead8p = _GLF_FUZZED((GLF_live2j & (GLF_live2j % ivec2(-27022, -29654))));
                            while (donor_replacementGLF_dead8p.x > 15) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead18result = _GLF_FUZZED(GLF_dead7one);
                                        float donor_replacementGLF_dead18thirty_two = _GLF_FUZZED(GLF_dead7one);
                                        if (mod(float(i), round(donor_replacementGLF_dead18thirty_two)) <= 0.01) {
                                            donor_replacementGLF_dead18result += 100.0;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live18gl_FragCoord;
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    }
                                    vec2 GLF_live11coord = _GLF_FUZZED((vec2(-284.725, -44.61) + 927.867));
                                    int GLF_live11i = _GLF_FUZZED(18522);
                                    int GLF_live11looplimiter0 = 0;
                                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(-5.0, 426.103, -9.2, 821.148));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-3.9, 6833.2329, -0.8, 5.0);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                        discard;
                                    }
                                    {
                                        int GLF_live18high = _GLF_FUZZED(42722);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        int GLF_live18low = _GLF_FUZZED(-76356);
                                        {
                                            int GLF_live18looplimiter4 = 0;
                                            for (int GLF_live18m = 1; GLF_live18m <= GLF_live18high; GLF_live18m = 2 * GLF_live18m) {
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                if (GLF_live18looplimiter4 >= 3) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                                        discard;
                                                    }
                                                    break;
                                                }
                                                GLF_live18looplimiter4++;
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    {
                                                        int GLF_live18looplimiter3 = 0;
                                                        for (int GLF_live18i = GLF_live18low; GLF_live18i < GLF_live18high; GLF_live18i += 2 * GLF_live18m) {
                                                            if (GLF_live18looplimiter3 >= 3) {
                                                                break;
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                            GLF_live18looplimiter3++;
                                                            {
                                                                int GLF_live18from = GLF_live18i;
                                                                int GLF_live18mid = GLF_live18i + GLF_live18m - 1;
                                                                int GLF_live18to = min(GLF_live18i + 2 * GLF_live18m - 1, GLF_live18high);
                                                                GLF_live18merge(GLF_live18from, GLF_live18mid, GLF_live18to);
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            discard;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = GLF_live1_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                    while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (min(_GLF_color, GLF_live18gl_FragCoord));
                                        }
                                        if (GLF_live11looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live11looplimiter0++;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            return;
                                        }
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                _GLF_color = vec4(78.60, -516.704, 8.7, 8.8);
                                            }
                                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            {
                                                float GLF_live18grey = _GLF_FUZZED(((+0.7) + 1.0));
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        continue;
                                                    }
                                                    if (int(GLF_live18gl_FragCoord[1]) < 240) {
                                                        GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        if (int(GLF_live18gl_FragCoord[1]) < 270) {
                                                            GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                                discard;
                                                            }
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live11i++;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_live2j);
                                        float donor_replacementGLF_dead18result = _GLF_FUZZED(-2.7);
                                        float donor_replacementGLF_dead18thirty_two = _GLF_FUZZED(-85.27);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                        {
                                            if (mod(float(donor_replacementGLF_dead18i), round(donor_replacementGLF_dead18thirty_two)) <= 0.01) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                donor_replacementGLF_dead18result += 100.0;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                donor_replacementGLF_dead8p.x -= 16;
                            }
                        }
                    }
                }
            }
            data[4 * j + i] = mand(gl_FragCoord.x + float(_GLF_IDENTITY(i - 1, max(i - 1, i - 1))), gl_FragCoord.y + float(j - 1));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                continue;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
            return;
        }
    }
    vec3 sum = vec3(0.0);
    for (int i = 0; i < 16; i++) {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                break;
            }
            int GLF_live15iterationCap = _GLF_FUZZED(96127);
            if (0.0 > GLF_live15resolution.y) {
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                GLF_live15iterationCap += 1;
            }
        }
        sum += data[i];
        if (_GLF_DEAD(false)) {
            _GLF_color = atan(GLF_live18gl_FragCoord, _GLF_color);
        }
    }
    {
        int GLF_live16looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            return;
        }
        if (GLF_live16looplimiter0 >= 6) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead7m24 - mat2x4(9.3, -3177.4461, -8.8, 0.8, 0.8, -72.67, -1.5, -3856.4961))[0];
            }
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (vec4(-85.13, 9.2, -6.7, -599.502) + vec4(-469.940, -5.0, 5.3, 2.3));
    }
    {
        float GLF_live18grey = _GLF_FUZZED(float(19317));
        if (int(GLF_live18gl_FragCoord[1]) < 150) {
            ;
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                return;
            }
            if (int(GLF_live18gl_FragCoord[1]) < 180) {
                GLF_live18grey = 0.5 + float(GLF_live18data[5]) / 10.0;
            } else {
                if (int(GLF_live18gl_FragCoord[1]) < 210) {
                    GLF_live18grey = 0.5 + float(GLF_live18data[6]) / 10.0;
                } else {
                    if (int(GLF_live18gl_FragCoord[1]) < 240) {
                        GLF_live18grey = 0.5 + float(GLF_live18data[7]) / 10.0;
                    } else {
                        if (int(GLF_live18gl_FragCoord[1]) < 270) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            GLF_live18grey = 0.5 + float(GLF_live18data[8]) / 10.0;
                        } else {
                            ;
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = GLF_live1_GLF_color;
    }
    sum /= vec3(16.0);
    if (_GLF_DEAD(false)) {
        _GLF_color = mat4(-8.7, -27.43, 55.04, 1.8, 388.842, 900.447, 8398.9340, 3.4, 9.8, 8335.2997, -9.2, 147.116, 9.9, 2.1, -5280.1458, -17.19)[1];
    }
    _GLF_color = vec4(sum, 1.0);
}
