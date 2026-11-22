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

struct GLF_dead14QuicksortObject {
    int numbers[10];
};

GLF_dead14QuicksortObject GLF_dead14obj = GLF_dead14QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead14swap(int GLF_dead14i, int GLF_dead14j) {
    int GLF_dead14temp = GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 10)];
    GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14i, 10)] = GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14j, 10)];
    GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14j, 10)] = GLF_dead14temp;
}

layout(set = 0, binding = 3) uniform sampler2D GLF_dead13tex;

struct GLF_live8BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live8BST GLF_live8tree[10] = GLF_live8BST[10](GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0), GLF_live8BST(0, 0, 0));

void GLF_live8makeTreeNode(inout GLF_live8BST GLF_live8tree, int GLF_live8data) {
    GLF_live8tree.data = GLF_live8data;
    GLF_live8tree.leftIndex = -1;
    GLF_live8tree.rightIndex = -1;
}

int GLF_live8search(int GLF_live8target) {
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead11a = _GLF_FUZZED(vec2(-2018.6128, 625.043));
        float donor_replacementGLF_dead11z = _GLF_FUZZED(-838.021);
        {
            donor_replacementGLF_dead11z = donor_replacementGLF_dead11a.y / donor_replacementGLF_dead11a.x;
        }
    }
    GLF_live8BST GLF_live8currentNode = GLF_live8BST(0, 0, 0);
    int GLF_live8index = 0;
    {
        int GLF_live8looplimiter1 = 0;
        do {
            while (GLF_live8index != -1) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(vec2(-0.5, -853.407));
                    float donor_replacementGLF_dead13h = _GLF_FUZZED(-72.60);
                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(1336.3066);
                    float donor_replacementGLF_dead13slope = _GLF_FUZZED(-29.01);
                    vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(dFdy(vec2(-6.7, -9.7)));
                    while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && GLF_live8target < 32) {
                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                        donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live8target++;
                        } else {
                        }
                    }
                }
                if (GLF_live8looplimiter1 >= 6) {
                    break;
                }
                GLF_live8looplimiter1++;
                {
                    GLF_live8currentNode = GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8index, 10)];
                    if (GLF_live8currentNode.data == GLF_live8target) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            return GLF_live8target;
                        } else {
                        }
                    }
                    GLF_live8index = GLF_live8target > GLF_live8currentNode.data ? GLF_live8currentNode.rightIndex : GLF_live8currentNode.leftIndex;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, !(!(false))))))) {
        int donor_replacementGLF_dead14h = _GLF_FUZZED(GLF_live8target);
        int donor_replacementGLF_dead14i = _GLF_FUZZED((GLF_live8target * GLF_live8index));
        int donor_replacementGLF_dead14l = _GLF_FUZZED(GLF_live8index);
        int donor_replacementGLF_dead14pivot = _GLF_FUZZED(ivec3(8358, -93603, -42271)[2]);
        for (int GLF_dead14j = donor_replacementGLF_dead14l; GLF_dead14j <= donor_replacementGLF_dead14h - 1; GLF_dead14j++) {
            if (GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14j, 10)] <= donor_replacementGLF_dead14pivot) {
                donor_replacementGLF_dead14i++;
                GLF_dead14swap(donor_replacementGLF_dead14i, GLF_dead14j);
            }
        }
    }
    return -1;
}

vec4 GLF_live7_GLF_color = _GLF_FUZZED(vec4(-1571.1031, 0.9, -443.480, 9.1));

layout(set = 0, binding = 4) uniform buf4 {
    vec3 GLF_live7polynomial;
};

float GLF_live7fx(float GLF_live7x) {
    return GLF_live7polynomial.x * (GLF_live7x * GLF_live7x) + GLF_live7polynomial.y * GLF_live7x + GLF_live7polynomial.z;
}

vec4 GLF_dead6gl_FragCoord = _GLF_FUZZED(vec4(-6514.9507, 4.4, -3.0, 6960.0135));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead6injectionSwitch;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead6resolution;
};

int GLF_dead6data[10] = int[10](_GLF_FUZZED((+(-39781))), _GLF_FUZZED((ivec2(-30437, -21045).s ^ (-32546))), _GLF_FUZZED(-35114), _GLF_FUZZED((false ? 91243 : 5442)), _GLF_FUZZED(int(true)), _GLF_FUZZED(64483), _GLF_FUZZED(78203), _GLF_FUZZED(int(26574u)), _GLF_FUZZED((55486 + 18323)), _GLF_FUZZED(13086)), GLF_dead6temp[10] = int[10](_GLF_FUZZED(76569), _GLF_FUZZED((63585 + 14124)), _GLF_FUZZED((42108 | 71527)), _GLF_FUZZED(((-71622) * (-9426))), _GLF_FUZZED(62871), _GLF_FUZZED((80825 + 11930)), _GLF_FUZZED(ivec3(77415, 14806, 53021).p), _GLF_FUZZED(((-16147) & (-24900))), _GLF_FUZZED((-(-13132))), _GLF_FUZZED(33414));
layout(set = 0, binding = 7) uniform sampler2D GLF_dead3tex;
layout(set = 0, binding = 8) uniform sampler2D GLF_dead4tex;
layout(set = 0, binding = 9) uniform sampler2D GLF_live1tex;
vec4 GLF_live0_GLF_color = _GLF_FUZZED((((-98.53) * mat3x4(5.7, -82.30, 9413.0646, -1.2, -1.0, -4.2, -9535.0797, -36.08, -72.51, -826.979, 2608.8460, 1937.3780)) * vec3(5.8, -6.5, 319.688)));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

struct BinarySearchObject {
    int prime_numbers[10];
};

vec2 brick(vec2 uv) {
    int a = 4;
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= tanh(_GLF_IDENTITY(uv.x * 0.25, clamp(uv.x * 0.25, uv.x * 0.25, uv.x * 0.25))) / ldexp(injectionSwitch.y, findMSB(a));
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = sin(vec4(790.020, 1.3, -134.533, -71.88));
            }
            a--;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = cos(unpackUnorm4x8(132506u));
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(atan(GLF_live7polynomial));
                    {
                        donor_replacementGLF_dead14color.z += float(GLF_dead14obj.numbers[7]);
                    }
                }
                {
                    GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(GLF_live7polynomial);
                {
                    donor_replacementGLF_dead14color.y += float(GLF_dead14obj.numbers[2]);
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead12j = _GLF_FUZZED(a);
                vec3 donor_replacementGLF_dead12m = _GLF_FUZZED(vec3(-176.684, 5.6, 1.3));
                vec2 donor_replacementGLF_dead12n = _GLF_FUZZED(GLF_dead6injectionSwitch);
                for (int GLF_dead12i = -1; GLF_dead12i <= int(GLF_dead12injectionSwitch.y); GLF_dead12i++) {
                    vec2 GLF_dead12g = vec2(float(donor_replacementGLF_dead12j), float(GLF_dead12i));
                    vec2 GLF_dead12o = mix(donor_replacementGLF_dead12n, GLF_dead12g, 0.2);
                    if (GLF_dead12injectionSwitch.x < (donor_replacementGLF_dead12m.x)) {
                        int GLF_dead12k = 1;
                        while (GLF_dead12k >= 0) {
                            GLF_dead12o = GLF_dead12o + GLF_dead12o;
                            GLF_dead12k--;
                        }
                        donor_replacementGLF_dead12m = vec3(GLF_dead12injectionSwitch.x, cos(GLF_dead12o));
                    }
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                _GLF_color = vec4(9.4, -5781.4075, 187.841, 1.4);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec2(1.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    do {
                        return vec2(1.0, 1.0);
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = resolution.xyxx;
                        } else {
                        }
                    }
                }
            }
        } else {
        }
    } while (a > int(injectionSwitch.x));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        vec2 donor_replacementGLF_dead11a = _GLF_FUZZED(resolution);
        float donor_replacementGLF_dead11z = _GLF_FUZZED(-3.9);
        {
            donor_replacementGLF_dead11z = donor_replacementGLF_dead11a.y / donor_replacementGLF_dead11a.x;
        }
    }
    int b = 3;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            int GLF_live8target = _GLF_FUZZED((~27016));
            {
                ;
            }
        }
        b--;
    } while (b > int(injectionSwitch.x));
    {
        for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(((false ? distance(GLF_dead6gl_FragCoord, _GLF_color) : (-2.9)) / GLF_dead6resolution));
                    float donor_replacementGLF_dead13h = _GLF_FUZZED(79.11);
                    int donor_replacementGLF_dead13i = _GLF_FUZZED(b);
                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(dFdx(-24.18));
                    float donor_replacementGLF_dead13slope = _GLF_FUZZED(dot(GLF_dead6injectionSwitch, GLF_dead6injectionSwitch));
                    vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(injectionSwitch);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = floor(vec4(-3856.1259, 1.6, -3.3, -7949.1301));
                    }
                    {
                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                        donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                        donor_replacementGLF_dead13i++;
                    }
                }
                int donor_replacementGLF_dead3i = _GLF_FUZZED(a);
                vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED(vec4(-2.3, -20.27, injectionSwitch));
                while (donor_replacementGLF_dead3texel.x + donor_replacementGLF_dead3texel.y + donor_replacementGLF_dead3texel.z > 1.0 && donor_replacementGLF_dead3i < 16) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead13h = _GLF_FUZZED(3.8);
                        float donor_replacementGLF_dead13refh = _GLF_FUZZED(fma(mod(-4.5, 80.27), 2.9, -95.24));
                        float donor_replacementGLF_dead13slope = _GLF_FUZZED(sqrt(-7484.9520));
                        vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(vec2(-6.0, 8571.0790));
                        while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead3i < 32) {
                            uv -= donor_replacementGLF_dead13uvstep;
                            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, uv).y;
                            }
                            donor_replacementGLF_dead3i++;
                        }
                    }
                    uv = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                    uv = floor(uv * 256.0) / 256.0;
                    donor_replacementGLF_dead3texel = texture(GLF_dead3tex, uv);
                    donor_replacementGLF_dead3i++;
                }
            }
        }
        {
            ;
        }
    }
    int c = 2;
    do {
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
            {
                {
                    ;
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live0_GLF_color;
            }
            do {
                uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(min(injectionSwitch, GLF_dead6resolution));
                float donor_replacementGLF_dead13h = _GLF_FUZZED(dFdxFine(sinh(-7663.3239)));
                int donor_replacementGLF_dead13i = _GLF_FUZZED(int(uint(false)));
                if (_GLF_DEAD(false)) {
                    do {
                        _GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                }
                float donor_replacementGLF_dead13refh = _GLF_FUZZED(-989.682);
                float donor_replacementGLF_dead13slope = _GLF_FUZZED(6373.4950);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(629.130, -67.25, -2711.4449, -10.43);
                }
                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(radians(uv));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(422.318, 445.660, 854.469, 560.445);
                }
                {
                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                    }
                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                    donor_replacementGLF_dead13i++;
                }
            }
            {
                {
                    ;
                }
            }
        }
        do {
            int GLF_live8sum = _GLF_FUZZED(66138);
            int GLF_live8target = _GLF_FUZZED(((-44344) + (-52147)));
            {
                int GLF_live8result = GLF_live8search(GLF_live8target);
                if (GLF_live8result > 0) {
                    GLF_live8sum += GLF_live8result;
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = degrees(GLF_dead6gl_FragCoord);
                        }
                        float donor_replacementGLF_dead11th = _GLF_FUZZED(-32.77);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(5.7, -44.24, 210.645, 7.0);
                            }
                            donor_replacementGLF_dead11th = -donor_replacementGLF_dead11th;
                        }
                    }
                    switch (GLF_live8result) {
                        case -1:
                            do {
                                GLF_live8sum += 1;
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead11z = _GLF_FUZZED(floor(-951.522));
                                if (uv.y > uv.x) {
                                    donor_replacementGLF_dead11z = uv.x / uv.y;
                                } else {
                                    do {
                                        donor_replacementGLF_dead11z = uv.y / uv.x;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(floor(-0.9), donor_replacementGLF_dead11z, donor_replacementGLF_dead11z, donor_replacementGLF_dead11z);
                                }
                            }
                            break;
                        case 0:
                            do {
                                ;
                            } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        c--;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            discard;
        }
    } while (c > int(injectionSwitch.x));
    int d = 1;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead11v = _GLF_FUZZED(fwidthCoarse(resolution));
        if (_GLF_DEAD(false)) {
            _GLF_color = uintBitsToFloat(uvec4(109118u, 13903u, 111534u, 84715u));
        }
        do {
            if (length(donor_replacementGLF_dead11v) < 0.001) {
                ;
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0)))));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            int GLF_live8looplimiter2 = 0;
            do {
                if (GLF_live8looplimiter2 >= 6) {
                    ;
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(step(-4.4, injectionSwitch));
            float donor_replacementGLF_dead4h = _GLF_FUZZED(vec3(-177.931, -9686.1286, -1.2).t);
            float donor_replacementGLF_dead4refh = _GLF_FUZZED(-846.995);
            float donor_replacementGLF_dead4slope = _GLF_FUZZED(dFdx(1.6));
            vec2 donor_replacementGLF_dead4uvstep = _GLF_FUZZED(uv);
            while (donor_replacementGLF_dead4h < donor_replacementGLF_dead4refh && c < 32) {
                donor_replacementGLF_dead4coord -= donor_replacementGLF_dead4uvstep;
                donor_replacementGLF_dead4refh += donor_replacementGLF_dead4slope;
                donor_replacementGLF_dead4h = texture(GLF_dead4tex, donor_replacementGLF_dead4coord).y;
                c++;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (donor_replacementGLF_dead4uvstep.y < donor_replacementGLF_dead4uvstep.x) {
                        donor_replacementGLF_dead4h = 0.5 - donor_replacementGLF_dead4h;
                    }
                }
            }
        }
        {
            vec2 GLF_live1coord = _GLF_FUZZED((vec4(-7.0, -1168.0096, -54.43, 9.0) * mat2x4(1.1, 14.58, 948.367, 1993.4793, 4.9, -8.4, -31.25, 9.7)));
            float GLF_live1h = _GLF_FUZZED((-(-0.4)));
            int GLF_live1i = _GLF_FUZZED(-32627);
            float GLF_live1refh = _GLF_FUZZED(float(123499u));
            float GLF_live1slope = _GLF_FUZZED((-21.78));
            vec2 GLF_live1uvstep = _GLF_FUZZED(vec2(4196.2245, -1.9));
            {
                int GLF_live1looplimiter0 = 0;
                while (GLF_live1h < GLF_live1refh && GLF_live1i < 32) {
                    if (GLF_live1looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live1looplimiter0++;
                    {
                        GLF_live1coord -= GLF_live1uvstep;
                        GLF_live1refh += GLF_live1slope;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(cos(GLF_live1uvstep));
                                float donor_replacementGLF_dead13h = _GLF_FUZZED(GLF_live1slope);
                                int donor_replacementGLF_dead13i = _GLF_FUZZED(findLSB(37763u));
                                float donor_replacementGLF_dead13refh = _GLF_FUZZED((+GLF_live1h));
                                float donor_replacementGLF_dead13slope = _GLF_FUZZED(906.970);
                                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(GLF_live1uvstep);
                                while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                    donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = (GLF_live7polynomial * mat4x3(523.340, 7585.4261, 7826.4795, 253.335, -4255.2991, 954.809, 22.76, 7.0, 457.258, 224.737, 740.286, -25.12));
                                        }
                                    }
                                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                    donor_replacementGLF_dead13i++;
                                }
                            }
                            int GLF_live8result = _GLF_FUZZED(9304);
                            int GLF_live8sum = _GLF_FUZZED(52666);
                            if (GLF_live8result > 0) {
                                GLF_live8sum += GLF_live8result;
                            } else {
                                switch (GLF_live8result) {
                                    case -1:
                                        GLF_live8sum += 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(sqrt(0.0), 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(sqrt(0.0), 0.0, 0.0), vec3(1.0, 1.0, 1.0))))))) {
                                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6resolution);
                                            float donor_replacementGLF_dead13h = _GLF_FUZZED(cosh(float(GLF_live8result)));
                                            int donor_replacementGLF_dead13i = _GLF_FUZZED((ivec4(-77800, 18064, -411, -4535).x ^ c));
                                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(GLF_live1h);
                                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                            while (donor_replacementGLF_dead13h < GLF_live1refh && donor_replacementGLF_dead13i < 32) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead6gl_FragCoord;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                                } else {
                                                }
                                                GLF_live1refh += donor_replacementGLF_dead13slope;
                                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                                donor_replacementGLF_dead13i++;
                                            }
                                        }
                                        break;
                                    case 0:
                                        ;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(vec3(2943.0739, 49.65, -45.64));
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        donor_replacementGLF_dead14color.z += float(GLF_dead14obj.numbers[7]);
                                    }
                                }
                            } else {
                            }
                        }
                        GLF_live1h = texture(GLF_live1tex, GLF_live1coord).y;
                        GLF_live1i++;
                        {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead14i = _GLF_FUZZED(mix((67112 | (-18366)), b, true));
                                    int donor_replacementGLF_dead14j = _GLF_FUZZED(ivec4(27967, 80995, -38342, 46411).z);
                                    int donor_replacementGLF_dead14pivot = _GLF_FUZZED(a);
                                    {
                                        if (GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14j, 10)] <= donor_replacementGLF_dead14pivot) {
                                            donor_replacementGLF_dead14i++;
                                            GLF_dead14swap(donor_replacementGLF_dead14i, donor_replacementGLF_dead14j);
                                        }
                                    }
                                }
                                GLF_live7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead12m = _GLF_FUZZED((vec3(-29.77, -4.9, -58.25) * vec3(-190.396, 575.480, -0.2)));
                        for (int GLF_dead12i = -1; GLF_dead12i <= int(GLF_dead12injectionSwitch.y); GLF_dead12i++) {
                            vec2 GLF_dead12g = vec2(float(d), float(GLF_dead12i));
                            vec2 GLF_dead12o = mix(GLF_live1coord, GLF_dead12g, 0.2);
                            if (GLF_dead12injectionSwitch.x < (donor_replacementGLF_dead12m.x)) {
                                int GLF_dead12k = 1;
                                while (GLF_dead12k >= 0) {
                                    GLF_dead12o = GLF_dead12o + GLF_dead12o;
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        GLF_dead12k--;
                                    }
                                }
                                donor_replacementGLF_dead12m = vec3(GLF_dead12injectionSwitch.x, cos(GLF_dead12o));
                            }
                        }
                    }
                }
                {
                    {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) || false))) {
                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(resolution);
                        float donor_replacementGLF_dead13h = _GLF_FUZZED(acos(distance(vec3(-68.88, 63.53, 2.9), GLF_live7polynomial)));
                        int donor_replacementGLF_dead13i = _GLF_FUZZED(a);
                        float donor_replacementGLF_dead13refh = _GLF_FUZZED(dFdy(GLF_live1refh));
                        float donor_replacementGLF_dead13slope = _GLF_FUZZED(dot(vec4(-1.3, 9.1, -7.4, -441.458), _GLF_color));
                        vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(resolution);
                        {
                            donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                            donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                donor_replacementGLF_dead13i++;
                            } else {
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        {
                            float GLF_live10c_im = _GLF_FUZZED((float(65868) + (+9.5)));
                            float GLF_live10c_re = _GLF_FUZZED(float(138330u));
                            int GLF_live10iteration = _GLF_FUZZED(ivec2(-55357, -57541).s);
                            int GLF_live10looplimiter0 = 0;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 1.0, 1.0, 0.0, 0.0, 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 0.0, 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0)))))) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED((GLF_live10c_im / GLF_dead6resolution));
                                int donor_replacementGLF_dead13i = _GLF_FUZZED(d);
                                float donor_replacementGLF_dead13refh = _GLF_FUZZED(inversesqrt(GLF_live10c_re));
                                float donor_replacementGLF_dead13slope = _GLF_FUZZED(degrees(GLF_live1slope));
                                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                {
                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                    donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                    GLF_live10c_re = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                    donor_replacementGLF_dead13i++;
                                }
                            }
                            float GLF_live10x = _GLF_FUZZED(((-318.695) + (-(-5434.9332))));
                            float GLF_live10y = _GLF_FUZZED(-3359.2490);
                            for (int GLF_live10k = 0; GLF_live10k < 1000; GLF_live10k++) {
                                if (GLF_live10looplimiter0 >= 6) {
                                    break;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    GLF_live10looplimiter0++;
                                }
                                {
                                    if (GLF_live10x * GLF_live10x + GLF_live10y * GLF_live10y > 4.0) {
                                        break;
                                    }
                                    float GLF_live10x_new = GLF_live10x * GLF_live10x - GLF_live10y * GLF_live10y + GLF_live10c_re;
                                    GLF_live10y = 2.0 * GLF_live10x * GLF_live10y + GLF_live10c_im;
                                    GLF_live10x = GLF_live10x_new;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        _GLF_color = dFdx(sin(GLF_live0_GLF_color));
                                    }
                                    GLF_live10iteration++;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        } else {
                            discard;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = unpackUnorm4x8(140672u);
                            }
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_live1uvstep);
                            int donor_replacementGLF_dead13i = _GLF_FUZZED(-84632);
                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(smoothstep(GLF_live1slope, GLF_live1slope, -6.5));
                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(tan(exp(-0.1)));
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(GLF_live1uvstep);
                            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), int(int(int(7)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                while (GLF_live1h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                    donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                    GLF_live1h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                    donor_replacementGLF_dead13i++;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-74.67, 391.166, 1530.7087, 71.97);
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = degrees(_GLF_color);
            }
        }
        return vec2(1.0, 1.0);
    }
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        do {
            d--;
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6resolution);
            float donor_replacementGLF_dead13h = _GLF_FUZZED(4.1);
            int donor_replacementGLF_dead13i = _GLF_FUZZED((ivec4(-7125, -87477, 57013, -93521).g ^ (-16295)));
            float donor_replacementGLF_dead13refh = _GLF_FUZZED(-24.13);
            float donor_replacementGLF_dead13slope = _GLF_FUZZED(-10.14);
            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(dFdxFine(GLF_dead6resolution));
            while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                }
                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                donor_replacementGLF_dead13i++;
            }
        }
    } while (d > int(injectionSwitch.x));
    return fract(_GLF_IDENTITY(uv, min(uv, _GLF_IDENTITY(uv, vec2(uv[0], uv[1])))));
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    vec2 st = step(size, uv);
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(st.x, injectionSwitch.y), _GLF_IDENTITY(st, max(st, st)).x, _GLF_IDENTITY(size, vec2(_GLF_IDENTITY(size[0], (size[0]) - 0.0), size[1])).y);
            break;
        case 1:
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                float GLF_live2th = _GLF_FUZZED(-3014.5502);
                {
                    GLF_live2th = -GLF_live2th;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live7_GLF_color;
            }
            break;
        case 2:
            {
                vec2 GLF_live1coord = _GLF_FUZZED(vec2(vec4(-3151.2860, 7792.5639, 7.6, -1.4)));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidthFine(GLF_live7_GLF_color);
                    }
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(fwidthFine((GLF_dead6injectionSwitch + st)));
                    float donor_replacementGLF_dead13h = _GLF_FUZZED(770.203);
                    int donor_replacementGLF_dead13i = _GLF_FUZZED(ivec3(59418, -91551, -92446)[2]);
                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(mix(-0.8, -7.1, false));
                    float donor_replacementGLF_dead13slope = _GLF_FUZZED(2.2);
                    {
                        donor_replacementGLF_dead13coord -= st;
                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                        donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                        donor_replacementGLF_dead13i++;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-1694.7822, 28.87, -2604.4920, -8.2);
                    }
                }
                float GLF_live1h = _GLF_FUZZED(((-2073.6365) - (-(-2982.4895))));
                int GLF_live1i = _GLF_FUZZED(58553);
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(injectionSwitch);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))) << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), (int(4)) + 0)))); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live7_GLF_color;
                            }
                            discard;
                        }
                    }
                    float donor_replacementGLF_dead4h = _GLF_FUZZED(GLF_live1h);
                    float donor_replacementGLF_dead4refh = _GLF_FUZZED(-8538.1744);
                    float donor_replacementGLF_dead4slope = _GLF_FUZZED(GLF_live1h);
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead11v = _GLF_FUZZED(st);
                        if (donor_replacementGLF_dead11v.y < 0.0) {
                            donor_replacementGLF_dead4refh = -donor_replacementGLF_dead4refh;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    vec2 donor_replacementGLF_dead4uvstep = _GLF_FUZZED((mat4x2(91.74, 7.4, 7.9, -4552.8539, 241.209, -2.3, -154.219, -37.65) * vec4(544.943, 9.5, 2861.3900, 7.8)));
                    while (donor_replacementGLF_dead4h < donor_replacementGLF_dead4refh && GLF_live1i < 32) {
                        donor_replacementGLF_dead4coord -= donor_replacementGLF_dead4uvstep;
                        donor_replacementGLF_dead4refh += donor_replacementGLF_dead4slope;
                        donor_replacementGLF_dead4h = texture(GLF_dead4tex, donor_replacementGLF_dead4coord).y;
                        GLF_live1i++;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead6gl_FragCoord;
                        }
                    } else {
                    }
                    {
                        int GLF_live8looplimiter0 = 0;
                        if (GLF_live8looplimiter0 >= 6) {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (uv.x < 0.0) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (GLF_dead6gl_FragCoord + GLF_live1h);
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            GLF_live1h = 1.0 - GLF_live1h;
                        }
                    }
                }
                int GLF_live1looplimiter0 = 0;
                float GLF_live1refh = _GLF_FUZZED((11.55 + 7767.5775));
                float GLF_live1slope = _GLF_FUZZED(-4129.9294);
                vec2 GLF_live1uvstep = _GLF_FUZZED(vec2(-5276.9598, 1357.8604));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(vec3(52.66, -643.265, -8429.5989));
                    vec2 donor_replacementGLF_dead14uv = _GLF_FUZZED(injectionSwitch);
                    if (donor_replacementGLF_dead14uv.x > (3.0 / 4.0)) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            donor_replacementGLF_dead14color.z += float(GLF_dead14obj.numbers[3]);
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead11th = _GLF_FUZZED(ldexp(max(4.8, GLF_live1refh), abs(GLF_live1i)));
                        {
                            donor_replacementGLF_dead11th = 0.5 - donor_replacementGLF_dead11th;
                        }
                    }
                    if (GLF_live1looplimiter0 >= 5) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(GLF_live1coord);
                            float donor_replacementGLF_dead4h = _GLF_FUZZED(874.500);
                            float donor_replacementGLF_dead4refh = _GLF_FUZZED(99.33);
                            float donor_replacementGLF_dead4slope = _GLF_FUZZED(642.591);
                            vec2 donor_replacementGLF_dead4uvstep = _GLF_FUZZED(mod(injectionSwitch, length(1736.1472)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                while (donor_replacementGLF_dead4h < donor_replacementGLF_dead4refh && GLF_live1i < 32) {
                                    donor_replacementGLF_dead4coord -= donor_replacementGLF_dead4uvstep;
                                    donor_replacementGLF_dead4refh += donor_replacementGLF_dead4slope;
                                    donor_replacementGLF_dead4h = texture(GLF_dead4tex, donor_replacementGLF_dead4coord).y;
                                    GLF_live1i++;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead13h = _GLF_FUZZED(acos(mod(donor_replacementGLF_dead4refh, donor_replacementGLF_dead4refh)));
                                        float donor_replacementGLF_dead13refh = _GLF_FUZZED(-16.50);
                                        float donor_replacementGLF_dead13slope = _GLF_FUZZED(donor_replacementGLF_dead4h);
                                        {
                                            donor_replacementGLF_dead4coord -= uv;
                                            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                            donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead4coord).y;
                                            do {
                                                GLF_live1looplimiter0++;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                }
                            } else {
                            }
                        }
                    }
                    {
                        int GLF_live8result = _GLF_FUZZED(((-49155) | (-2876)));
                        int GLF_live8sum = _GLF_FUZZED(-65707);
                        {
                            GLF_live8sum += GLF_live8result;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(mod(vec3(2.2, -91.66, 0.8), -1727.9572));
                            {
                                donor_replacementGLF_dead14color.x += float(GLF_dead14obj.numbers[9]);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead11a = _GLF_FUZZED((uv / GLF_live1h));
                        float donor_replacementGLF_dead11z = _GLF_FUZZED(determinant(mat4(140.581, 413.927, -43.13, 2.8, -209.321, 371.362, -74.36, 140.147, 1.2, -1.5, -8.8, -1.8, 85.20, 99.89, -822.245, -8.7)));
                        if (donor_replacementGLF_dead11a.y > donor_replacementGLF_dead11a.x) {
                            donor_replacementGLF_dead11z = donor_replacementGLF_dead11a.x / donor_replacementGLF_dead11a.y;
                        } else {
                            donor_replacementGLF_dead11z = donor_replacementGLF_dead11a.y / donor_replacementGLF_dead11a.x;
                        }
                    }
                    GLF_live1looplimiter0++;
                    {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            GLF_live1coord -= GLF_live1uvstep;
                        }
                        GLF_live1refh += GLF_live1slope;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(st);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = log((GLF_live1slope - vec4(-9072.9933, -88.61, 989.769, 1881.4647)));
                            }
                            int donor_replacementGLF_dead13i = _GLF_FUZZED(int(GLF_live1slope));
                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(tan(GLF_live1slope));
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(resolution);
                            while (GLF_live1h < GLF_live1slope && donor_replacementGLF_dead13i < 32) {
                                donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                GLF_live1slope += donor_replacementGLF_dead13slope;
                                GLF_live1h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                donor_replacementGLF_dead13i++;
                            }
                        }
                        GLF_live1h = texture(GLF_live1tex, GLF_live1coord).y;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            GLF_live1i++;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(mod(vec3(-4507.9752, -54.53, -3.7), clamp(GLF_live7polynomial, 7293.8884, 8.5)));
                vec2 donor_replacementGLF_dead14uv = _GLF_FUZZED(((false ? mat4x2(48.26, -59.54, -5.4, 5.6, 495.573, 3198.1372, 5.3, 6.1) : mat4x2(923.276, -3.6, 8053.3436, 498.598, -7.0, -2396.6540, -251.939, 16.21)) * GLF_live0_GLF_color));
                if (donor_replacementGLF_dead14uv.y > (2.0 / 4.0)) {
                    donor_replacementGLF_dead14color.y += float(GLF_dead14obj.numbers[6]);
                }
            }
            discard;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-9992.2679, -1.1, -8.7, -1291.1497);
                }
            }
            break;
        case 3:
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                    _GLF_color = GLF_live0_GLF_color;
                }
            }
            break;
            {
                int GLF_live8looplimiter0 = 0;
                for (int _injected_loop_counter = ((0 | 1) ^ (0 << _GLF_IDENTITY(int(6), int(6)))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    if (GLF_live8looplimiter0 >= 6) {
                        ;
                    }
                }
            }
        case 4:
            return mix(pow(st.y, injectionSwitch.y), st.x, size.x);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return 1.0;
            }
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                return 1.0;
            }
            {
                {
                    vec2 GLF_live1coord = _GLF_FUZZED((true ? vec2(-13.58, 600.920) : vec2(9.6, -5.8)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead5i = _GLF_FUZZED(92947);
                        int donor_replacementGLF_dead5j = _GLF_FUZZED(bitCount(packSnorm4x8(GLF_live0_GLF_color)));
                        uint donor_replacementGLF_dead5uselessOutVariable = _GLF_FUZZED(164315u);
                        if (uint(donor_replacementGLF_dead5j) < uaddCarry(uint(donor_replacementGLF_dead5i), 1u, donor_replacementGLF_dead5uselessOutVariable)) {
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(resolution);
                            float donor_replacementGLF_dead13h = _GLF_FUZZED(_GLF_color[1]);
                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(-56.90);
                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(round(7.4));
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED((GLF_dead6injectionSwitch - (((-3691.8128) < (-1.3)) ? GLF_dead6injectionSwitch : size)));
                            {
                                do {
                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                } while (_GLF_WRAPPED_LOOP(false));
                                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                donor_replacementGLF_dead5j++;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            _GLF_color = (log2(injectionSwitch) * mat4x2(-4.1, -9.8, -4930.6701, 768.075, -304.265, -6.6, 7.8, -627.929));
                        }
                    }
                    float GLF_live1h = _GLF_FUZZED((false ? 697.789 : 59.39));
                    int GLF_live1i = _GLF_FUZZED(61953);
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead6color = _GLF_FUZZED((87.20 * sinh(dFdy(size))));
                        int donor_replacementGLF_dead6i = _GLF_FUZZED(93162);
                        vec3 donor_replacementGLF_dead6vecCoor = _GLF_FUZZED(vec3(8.7, -3.7, 69.89));
                        if (int(GLF_dead6gl_FragCoord[1]) < 90) {
                            donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[2]))));
                            donor_replacementGLF_dead6color.x += atanh(donor_replacementGLF_dead6color.x) * cosh(GLF_dead6injectionSwitch.y) * smoothstep(donor_replacementGLF_dead6color, GLF_dead6injectionSwitch, GLF_dead6gl_FragCoord.yy).x;
                            break;
                        } else if (int(GLF_dead6gl_FragCoord[1]) < 120) {
                            donor_replacementGLF_dead6color = fract(acosh(clamp(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[3])), 1.0, 1000.0)));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live7_GLF_color;
                            }
                            donor_replacementGLF_dead6color.x += (isnan(GLF_dead6gl_FragCoord.x) ? log2(GLF_dead6gl_FragCoord.x) : log2(GLF_dead6gl_FragCoord.y));
                            break;
                        } else if (int(GLF_dead6gl_FragCoord[1]) < 150) {
                            discard;
                        } else if (int(GLF_dead6gl_FragCoord[1]) < 180) {
                            do {
                                donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[4]))));
                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                            donor_replacementGLF_dead6color[1] += asinh(GLF_dead6gl_FragCoord.y * ldexp(donor_replacementGLF_dead6color.y, -donor_replacementGLF_dead6i));
                            break;
                        } else if (int(GLF_dead6gl_FragCoord[1]) < 210) {
                            donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[5]))));
                            donor_replacementGLF_dead6color.y -= tanh(donor_replacementGLF_dead6color.x) / cosh(donor_replacementGLF_dead6color.y);
                            break;
                        } else if (int(GLF_dead6gl_FragCoord[1]) < 240) {
                            donor_replacementGLF_dead6color = fract(asinh(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[6]))));
                            do {
                                donor_replacementGLF_dead6color.y -= isnan(float(donor_replacementGLF_dead6i)) ? tanh(GLF_dead6gl_FragCoord.x) : atanh(GLF_dead6gl_FragCoord.y / GLF_dead6resolution.y);
                            } while (_GLF_WRAPPED_LOOP(false));
                            break;
                        } else if (int(GLF_dead6gl_FragCoord[1]) < 270) {
                            donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[7]))));
                            donor_replacementGLF_dead6color.y *= mix(normalize(donor_replacementGLF_dead6vecCoor), normalize(vec3(donor_replacementGLF_dead6color, degrees(donor_replacementGLF_dead6color.x))), GLF_dead6injectionSwitch.x).y;
                            break;
                        } else {
                            {
                                int GLF_live8sum = _GLF_FUZZED((31306 - (-60371)));
                                {
                                    int GLF_live8looplimiter2 = 0;
                                    for (int GLF_live8target = 0; GLF_live8target < 20; GLF_live8target++) {
                                        if (GLF_live8looplimiter2 >= 6) {
                                            break;
                                        }
                                        GLF_live8looplimiter2++;
                                        {
                                            int GLF_live8result = GLF_live8search(GLF_live8target);
                                            if (GLF_live8result > 0) {
                                                GLF_live8sum += GLF_live8result;
                                            } else {
                                                switch (GLF_live8result) {
                                                    case -1:
                                                        GLF_live8sum += 1;
                                                        break;
                                                    case 0:
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = sinh(GLF_live0_GLF_color);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead12k = _GLF_FUZZED(bitfieldInsert(donor_replacementGLF_dead6i, donor_replacementGLF_dead6i, GLF_live8sum, GLF_live8sum));
                                                            vec2 donor_replacementGLF_dead12o = _GLF_FUZZED(intBitsToFloat(findMSB(uvec2(47889u, 173158u))));
                                                            while (donor_replacementGLF_dead12k >= 0) {
                                                                donor_replacementGLF_dead12o = donor_replacementGLF_dead12o + donor_replacementGLF_dead12o;
                                                                do {
                                                                    donor_replacementGLF_dead12k--;
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            }
                                                        }
                                                        ;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            discard;
                        }
                    }
                    float GLF_live1refh = _GLF_FUZZED(3.0);
                    {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live0_GLF_color;
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead13h = _GLF_FUZZED(34.63);
                            int donor_replacementGLF_dead13i = _GLF_FUZZED(-97972);
                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(GLF_live1refh);
                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(GLF_live1h);
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(resolution);
                            while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                size -= donor_replacementGLF_dead13uvstep;
                                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, size).y;
                                donor_replacementGLF_dead13i++;
                            }
                        }
                        int GLF_live7looplimiter0 = 0;
                        if (GLF_live7looplimiter0 >= 7) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = vec4(742.540, 780.464, 1.0, 4.7);
                    }
                    float GLF_live1slope = _GLF_FUZZED((-4323.1552));
                    vec2 GLF_live1uvstep = _GLF_FUZZED(vec2(vec4(-2.5, 64.43, 4.3, 8.8)));
                    {
                        GLF_live1coord -= GLF_live1uvstep;
                        if (_GLF_DEAD(false)) {
                            for (int GLF_dead6j = 0; GLF_dead6j < 10; GLF_dead6j++) {
                                GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 10)];
                            }
                        }
                        {
                            float GLF_live7x2 = _GLF_FUZZED(float(false));
                            if (GLF_live7x2 <= -0.9 && GLF_live7x2 >= -1.1) {
                                GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_live7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        GLF_live1refh += GLF_live1slope;
                        GLF_live1h = texture(GLF_live1tex, GLF_live1coord).y;
                        GLF_live1i++;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return 1.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return 1.0;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = vec4(6.5, 279.427, 375.504, -83.67);
                    {
                        vec2 GLF_live2a = _GLF_FUZZED((vec2(-1.2, 8253.4484) * vec2(893.333, -202.226)));
                        float GLF_live2z = _GLF_FUZZED((288.102));
                        {
                            GLF_live2z = GLF_live2a.y / GLF_live2a.x;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(atanh((resolution / GLF_live2z)));
                            int donor_replacementGLF_dead3i = _GLF_FUZZED(9722);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(size);
                                int donor_replacementGLF_dead13i = _GLF_FUZZED(floatBitsToInt(atan(7.4)));
                                float donor_replacementGLF_dead13slope = _GLF_FUZZED(8.0);
                                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(size);
                                {
                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                    GLF_live2z += donor_replacementGLF_dead13slope;
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        GLF_live2z = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                    }
                                    donor_replacementGLF_dead13i++;
                                }
                            }
                            vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED((+_GLF_color));
                            {
                                donor_replacementGLF_dead3coord = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                                donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                                donor_replacementGLF_dead3texel = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                                donor_replacementGLF_dead3i++;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            int GLF_live8baseIndex = _GLF_FUZZED(-76452);
                            {
                                GLF_live8baseIndex = GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8baseIndex, 10)].leftIndex;
                                ;
                            }
                        }
                        vec2 donor_replacementGLF_dead6color = _GLF_FUZZED(st);
                        int donor_replacementGLF_dead6i = _GLF_FUZZED(min(10713, -90845));
                        vec3 donor_replacementGLF_dead6vecCoor = _GLF_FUZZED(vec3(8763.2800, -0.4, -13.38));
                        {
                            donor_replacementGLF_dead6color = fract(asinh(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[6]))));
                            donor_replacementGLF_dead6color.y -= isnan(float(donor_replacementGLF_dead6i)) ? tanh(GLF_dead6gl_FragCoord.x) : atanh(GLF_dead6gl_FragCoord.y / GLF_dead6resolution.y);
                            break;
                        }
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(size);
                    float donor_replacementGLF_dead13h = _GLF_FUZZED(-3.9);
                    int donor_replacementGLF_dead13i = _GLF_FUZZED(93823);
                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(-680.409);
                    float donor_replacementGLF_dead13slope = _GLF_FUZZED(4421.5230);
                    vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(uintBitsToFloat(uvec2(83234u, 176356u)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                            donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(resolution, donor_replacementGLF_dead13refh, -2.0);
                            }
                            donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = intBitsToFloat(bitCount(ivec4(-59163, -66833, -27392, -93796)));
                                    } else {
                                    }
                                }
                            } else {
                            }
                            donor_replacementGLF_dead13i++;
                        }
                    } else {
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    while (l <= r) {
        int m = _GLF_IDENTITY((l + r) / 2, max((l + r) / 2, (l + r) / 2));
        if (_GLF_DEAD(false)) {
            discard;
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
            if (obj.prime_numbers[m] == x) {
                return m;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(vec3(GLF_dead6gl_FragCoord));
                    vec2 donor_replacementGLF_dead14uv = _GLF_FUZZED(vec2(105.726, -77.81));
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) >> 0)))); _injected_loop_counter--) {
                        if (donor_replacementGLF_dead14uv.x > (2.0 / 4.0)) {
                            donor_replacementGLF_dead14color.y += float(GLF_dead14obj.numbers[2]);
                        }
                    }
                }
            }
        }
        if (obj.prime_numbers[m] < x) {
            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                l = m + 1;
            }
            {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    float GLF_live2th = _GLF_FUZZED((false ? (-4061.1997) : (-86.12)));
                    vec2 GLF_live2v = _GLF_FUZZED(vec2(82.95, 34.09).ss);
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = GLF_live7_GLF_color;
                            }
                        }
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        if (GLF_live2v.y < 0.0) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                    float donor_replacementGLF_dead13h = _GLF_FUZZED(trunc((mat4x3(-9.0, -1.3, 658.331, 26.33, -4.4, 9433.3801, 2.5, 82.88, 89.59, -6321.8970, -124.532, 1.2), GLF_live2th)));
                                    int donor_replacementGLF_dead13i = _GLF_FUZZED(l);
                                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(GLF_live2th);
                                    vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(ldexp(GLF_dead6injectionSwitch, bitfieldInsert(ivec2(39995, -24154), ivec2(23528, 86442), m, x)));
                                    while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                        donor_replacementGLF_dead13refh += GLF_live2th;
                                        donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                        donor_replacementGLF_dead13i++;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = faceforward(GLF_dead6gl_FragCoord, vec4(-1.4, -9151.5924, 3.3, 2.6), GLF_live0_GLF_color);
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, true && (false)))) {
                            } else {
                                GLF_live2th = -GLF_live2th;
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-683.094, 69.82, -924.762, 95.08);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        int GLF_live1looplimiter0 = 0;
                        do {
                            if (GLF_live1looplimiter0 >= 5) {
                                ;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                    }
                }
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                break;
                {
                    float GLF_live10xCoord = _GLF_FUZZED(2.3);
                    float GLF_live10yCoord = _GLF_FUZZED((-(-2.4)));
                    {
                        ;
                    }
                }
            }
            {
                float GLF_live7A = _GLF_FUZZED(-4.4);
                float GLF_live7B = _GLF_FUZZED(-0.8);
                float GLF_live7C = _GLF_FUZZED(vec3(6.3, 3.8, -5478.3500).g);
                int GLF_live7iterations = _GLF_FUZZED(ivec3(-89309, 15973, 19342).p);
                int GLF_live7looplimiter0 = 0;
                float GLF_live7temp = _GLF_FUZZED(-724.459);
                float GLF_live7x0 = _GLF_FUZZED((1.7 + (-43.72)));
                float GLF_live7x1 = _GLF_FUZZED(4.0);
                float GLF_live7x2 = _GLF_FUZZED(-1.0);
                while (abs(GLF_live7x2 - GLF_live7x1) >= .00001 && GLF_live7iterations < 64) {
                    if (GLF_live7looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live7looplimiter0++;
                    {
                        float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                        float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                        float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                        float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead14j = _GLF_FUZZED(ivec2(-68572, -69290)[0]);
                            {
                                GLF_live7looplimiter0++;
                                GLF_dead14swap(GLF_live7looplimiter0, donor_replacementGLF_dead14j);
                            }
                        }
                        GLF_live7temp = GLF_live7x2;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                            int donor_replacementGLF_dead13i = _GLF_FUZZED(x);
                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(GLF_live7k1);
                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(GLF_live7x1);
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED((mat3x2(9415.9169, -5.1, 74.22, 1127.6201, 994.491, 1854.4790) * roundEven(vec3(-2.4, 65.57, -9.2))));
                            while (GLF_live7x2 < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                GLF_live7x2 = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                donor_replacementGLF_dead13i++;
                            }
                        }
                        GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                        GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                        GLF_live7C = GLF_live7fx(GLF_live7x2);
                        GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                        GLF_live7x0 = GLF_live7x1;
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(mat4x3(9.7, 4.4, -69.37, -8.8, 6953.3474, -3959.9636, 8.1, 8080.3436, -3.7, -277.191, 0.7, -250.892)[0]);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead6gl_FragCoord;
                            }
                            {
                                donor_replacementGLF_dead14color.y += float(GLF_dead14obj.numbers[2]);
                            }
                        }
                        GLF_live7x1 = GLF_live7temp;
                        GLF_live7iterations++;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = floor(tan(GLF_live7_GLF_color));
                }
            }
            r = m - 1;
        }
    }
    {
        int GLF_live8baseIndex = _GLF_FUZZED(((20418 ^ (-6433)) * 70812));
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = (ivec4(-32912, -57214, 28801, -59149), GLF_live0_GLF_color);
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(resolution);
                float donor_replacementGLF_dead13h = _GLF_FUZZED(-8127.4179);
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                    _GLF_color = vec4(7.6, -4514.9471, 8.8, 658.958);
                }
                int donor_replacementGLF_dead13i = _GLF_FUZZED(r);
                float donor_replacementGLF_dead13refh = _GLF_FUZZED(-196.807);
                float donor_replacementGLF_dead13slope = _GLF_FUZZED(2.2);
                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(acos(resolution));
                {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                    }
                    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ONE(1.0, injectionSwitch.y)) ^ 0)); _injected_loop_counter++) {
                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                    }
                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                    donor_replacementGLF_dead13i++;
                }
            }
            if (_GLF_DEAD(false)) {
                do {
                    _GLF_color = sign(GLF_live7_GLF_color);
                } while (_GLF_WRAPPED_LOOP(false));
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                GLF_live8baseIndex = GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8baseIndex, 10)].leftIndex;
            } else {
            }
            ;
        }
    }
    {
        vec2 GLF_live2a = _GLF_FUZZED((vec3(1795.2264, -7185.0797, -7.2) * (mat2x3(-9.9, -96.15, 0.8, -3.9, 868.675, 1.3) + vec4(4.0, -88.33, 6.3, 1556.6362).x)));
        float GLF_live2z = _GLF_FUZZED(-2.3);
        if (GLF_live2a.y > GLF_live2a.x) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(vec2(-6.8, -6.6));
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(sqrt(vec3(58.39, -2166.8951, 5.4).rb));
                    int donor_replacementGLF_dead13i = _GLF_FUZZED((sign(x) << (-81419)));
                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(-3.1);
                    float donor_replacementGLF_dead13slope = _GLF_FUZZED(GLF_live2z);
                    vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(((-4.9) - GLF_live7polynomial).rb);
                    {
                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                        GLF_live2z = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                        donor_replacementGLF_dead13i++;
                    }
                }
                vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED(vec4(vec3(4.1, 1.3, 0.4), 4.2));
                {
                    donor_replacementGLF_dead3coord = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                    donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                    do {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(acosh(vec2(7707.0353, 6.7)));
                            float donor_replacementGLF_dead13h = _GLF_FUZZED(acosh(7.1));
                            int donor_replacementGLF_dead13i = _GLF_FUZZED((+r));
                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(1792.0353);
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(dFdxCoarse(fwidthCoarse(GLF_live2a)));
                            {
                                donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                donor_replacementGLF_dead13refh += GLF_live2z;
                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                donor_replacementGLF_dead13i++;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        donor_replacementGLF_dead3texel = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                    }
                    r++;
                }
            }
            GLF_live2z = GLF_live2a.x / GLF_live2a.y;
        } else {
            GLF_live2z = GLF_live2a.y / GLF_live2a.x;
        }
    }
    do {
        {
            float GLF_live7x2 = _GLF_FUZZED((true ? 366.242 : 7.2));
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(mix(vec2(-8.0, 4.0), GLF_dead6resolution, bvec2(false, true)));
                float donor_replacementGLF_dead13h = _GLF_FUZZED(log2(GLF_live7x2));
                int donor_replacementGLF_dead13i = _GLF_FUZZED(r);
                float donor_replacementGLF_dead13slope = _GLF_FUZZED((-3614.7361));
                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(min(injectionSwitch, normalize(GLF_live7x2)));
                while (donor_replacementGLF_dead13h < GLF_live7x2 && donor_replacementGLF_dead13i < 32) {
                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                    GLF_live7x2 += donor_replacementGLF_dead13slope;
                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                    donor_replacementGLF_dead13i++;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (GLF_live7x2 <= -0.9 && GLF_live7x2 >= -1.1) {
                    GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = atan(GLF_live7_GLF_color);
                    }
                } else {
                    GLF_live7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(mod(dFdyFine(GLF_live7polynomial), GLF_live7x2));
                vec2 donor_replacementGLF_dead14uv = _GLF_FUZZED(GLF_dead6resolution);
                if (donor_replacementGLF_dead14uv.y > (1.0 / 4.0)) {
                    donor_replacementGLF_dead14color.x += float(GLF_dead14obj.numbers[5]);
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            discard;
        }
        return -1;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                _GLF_color = (vec4(-0.5, 9.0, -1.4, 1051.0009) - GLF_live7_GLF_color);
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead11th = _GLF_FUZZED(dFdxCoarse(pow(-9119.7779, -4.9)));
        {
            donor_replacementGLF_dead11th = 0.5 - donor_replacementGLF_dead11th;
        }
    }
    {
        {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                ;
            } else {
            }
        }
    }
    {
        float GLF_live2th = _GLF_FUZZED(((-0.8) - (+(-226.685))));
        do {
            for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                float GLF_live7x2 = _GLF_FUZZED(11.38);
                if (GLF_live7x2 <= -0.9 && GLF_live7x2 >= -1.1) {
                    GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_live7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            GLF_live2th = -GLF_live2th;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead11th = _GLF_FUZZED(289.761);
                {
                    donor_replacementGLF_dead11th = 1.0 - donor_replacementGLF_dead11th;
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    }
    BinarySearchObject obj;
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
        _GLF_color = GLF_dead6gl_FragCoord;
    }
    for (int i = 0; i < 10; i++) {
        if (i == 0) {
            obj.prime_numbers[i] = 2;
        } else if (i == 1) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = log(GLF_live7_GLF_color);
                        }
                    }
                }
                break;
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_DEAD(false)) {
                        do {
                            ;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = ((-1828.5446) + _GLF_color);
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (+vec4(2.5, -9.1, -6.2, 7.1));
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            obj.prime_numbers[i] = 3;
        } else {
            {
                {
                    {
                        ;
                    }
                }
                {
                    GLF_live0_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = GLF_dead6gl_FragCoord;
            }
            if (i == 2) {
                obj.prime_numbers[i] = 5;
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead6gl_FragCoord;
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 & (-(-11532)))); _injected_loop_counter--) {
                        _GLF_color = dFdyCoarse(sinh(vec4(-6.5, -9.7, 2326.1403, 5283.9128)));
                    }
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec3 donor_replacementGLF_dead12m = _GLF_FUZZED(GLF_live7polynomial);
                                vec2 donor_replacementGLF_dead12n = _GLF_FUZZED(vec2(7601.2977, 4.5));
                                for (int GLF_dead12i = -1; GLF_dead12i <= int(GLF_dead12injectionSwitch.y); GLF_dead12i++) {
                                    vec2 GLF_dead12g = vec2(float(i), float(GLF_dead12i));
                                    vec2 GLF_dead12o = mix(donor_replacementGLF_dead12n, GLF_dead12g, 0.2);
                                    if (GLF_dead12injectionSwitch.x < (donor_replacementGLF_dead12m.x)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        } else {
                                        }
                                        int GLF_dead12k = 1;
                                        while (GLF_dead12k >= 0) {
                                            GLF_dead12o = GLF_dead12o + GLF_dead12o;
                                            GLF_dead12k--;
                                        }
                                        donor_replacementGLF_dead12m = vec3(GLF_dead12injectionSwitch.x, cos(GLF_dead12o));
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (i == 3) {
                    obj.prime_numbers[i] = 7;
                    do {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(injectionSwitch);
                            int donor_replacementGLF_dead3i = _GLF_FUZZED(-81074);
                            {
                                donor_replacementGLF_dead3coord = GLF_live0_GLF_color.xz + GLF_live0_GLF_color.yy;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                                } else {
                                }
                                GLF_live0_GLF_color = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    donor_replacementGLF_dead3i++;
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                } else if (i == 4) {
                    obj.prime_numbers[i] = 11;
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6resolution);
                            float donor_replacementGLF_dead13h = _GLF_FUZZED((true ? (-64.46) : (-14.47)));
                            int donor_replacementGLF_dead13i = _GLF_FUZZED(findLSB(59798));
                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(round(-4389.1238));
                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(9136.5157);
                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(vec2(35.90, 0.8));
                            {
                                donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                donor_replacementGLF_dead13i++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                float GLF_live10c_im = _GLF_FUZZED(-8848.5088);
                                float GLF_live10c_re = _GLF_FUZZED((6.3 + vec2(vec4(900.894, -2719.3519, -410.436, -8263.1034)).s));
                                int GLF_live10iteration = _GLF_FUZZED(((-69815) + ((-7785) * (-82638))));
                                int GLF_live10looplimiter0 = 0;
                                float GLF_live10x = _GLF_FUZZED((true ? 127.183 : (-3659.8049)));
                                float GLF_live10y = _GLF_FUZZED(float(84301u));
                                for (int GLF_live10k = 0; GLF_live10k < 1000; GLF_live10k++) {
                                    if (GLF_live10looplimiter0 >= 6) {
                                        break;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        float donor_replacementGLF_dead11th = _GLF_FUZZED(abs(GLF_live10y));
                                        {
                                            donor_replacementGLF_dead11th = 1.0 - donor_replacementGLF_dead11th;
                                        }
                                    }
                                    GLF_live10looplimiter0++;
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(radians((abs(GLF_live7_GLF_color) * mat2x4(207.442, -5.2, -27.06, 3.3, 5.0, -974.565, -8.6, 65.13))));
                                        float donor_replacementGLF_dead13h = _GLF_FUZZED(sin(GLF_live10c_im));
                                        int donor_replacementGLF_dead13i = _GLF_FUZZED(GLF_live10k);
                                        float donor_replacementGLF_dead13refh = _GLF_FUZZED(GLF_live10y);
                                        float donor_replacementGLF_dead13slope = _GLF_FUZZED(floor(GLF_live10y));
                                        vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED((true ? GLF_dead6injectionSwitch : injectionSwitch));
                                        while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                            donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                            donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                            donor_replacementGLF_dead13i++;
                                        }
                                    }
                                    {
                                        if (GLF_live10x * GLF_live10x + GLF_live10y * GLF_live10y > 4.0) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                ;
                                            }
                                        }
                                        float GLF_live10x_new = GLF_live10x * GLF_live10x - GLF_live10y * GLF_live10y + GLF_live10c_re;
                                        GLF_live10y = 2.0 * GLF_live10x * GLF_live10y + GLF_live10c_im;
                                        GLF_live10x = GLF_live10x_new;
                                        GLF_live10iteration++;
                                    }
                                }
                            }
                            continue;
                        }
                        if (i == 5) {
                            {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead11a = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                        float donor_replacementGLF_dead11z = _GLF_FUZZED(-1.2);
                                        {
                                            donor_replacementGLF_dead11z = donor_replacementGLF_dead11a.y / donor_replacementGLF_dead11a.x;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        ;
                                    } else {
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(acosh(vec2(764.152, 0.0)));
                                        float donor_replacementGLF_dead13h = _GLF_FUZZED(4.1);
                                        int donor_replacementGLF_dead13i = _GLF_FUZZED(max(83706, i));
                                        float donor_replacementGLF_dead13refh = _GLF_FUZZED((+(-9631.9168)));
                                        float donor_replacementGLF_dead13slope = _GLF_FUZZED(length(GLF_live7polynomial));
                                        vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(ldexp(vec2(-6.9, 3.9), ivec2(41156, -39694)));
                                        while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                            donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                            donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                            donor_replacementGLF_dead13i++;
                                        }
                                    }
                                    break;
                                    {
                                        float GLF_live7A = _GLF_FUZZED(vec4(-757.588, -9082.5987, 11.95, -4.3).x);
                                        float GLF_live7B = _GLF_FUZZED(9.0);
                                        float GLF_live7C = _GLF_FUZZED((3.7));
                                        int GLF_live7iterations = _GLF_FUZZED((19518 + (-96530)));
                                        int GLF_live7looplimiter0 = 0;
                                        float GLF_live7temp = _GLF_FUZZED(-45.56);
                                        float GLF_live7x0 = _GLF_FUZZED(vec4(505.020, 291.973, 3575.8095, 3.2).a);
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false, false))))) {
                                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(cosh(injectionSwitch));
                                            float donor_replacementGLF_dead13h = _GLF_FUZZED(GLF_live7temp);
                                            int donor_replacementGLF_dead13i = _GLF_FUZZED((GLF_live7iterations >> GLF_live7looplimiter0));
                                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(fract(GLF_live7B));
                                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(sinh((true ? GLF_live7B : GLF_live7x0)));
                                            vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED((vec4(-1.1, 49.04, -1886.9410, -8609.4059) * mat2x4(-6016.3109, 0.2, 0.8, 394.160, -5.2, 5551.8507, 45.88, -4.0)));
                                            {
                                                donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                                donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                                donor_replacementGLF_dead13i++;
                                            }
                                        }
                                        float GLF_live7x1 = _GLF_FUZZED((6.1 * 7.1));
                                        float GLF_live7x2 = _GLF_FUZZED((true ? (-4.0) : (true ? 13.54 : (-9.9))));
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(78.60, 4.3, -7776.5742, 122.460);
                                            }
                                            if (GLF_live7looplimiter0 >= 7) {
                                                ;
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        vec3 donor_replacementGLF_dead12m = _GLF_FUZZED(vec3(-5726.8688, 77.65, 3.7));
                                                        vec2 donor_replacementGLF_dead12o = _GLF_FUZZED(round(vec2(2090.2513, 7396.2090)));
                                                        {
                                                            int GLF_dead12k = 1;
                                                            while (GLF_dead12k >= 0) {
                                                                do {
                                                                    donor_replacementGLF_dead12o = donor_replacementGLF_dead12o + donor_replacementGLF_dead12o;
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                GLF_dead12k--;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(GLF_live7x1, min(GLF_live7polynomial, GLF_live7A));
                                                                }
                                                            }
                                                            donor_replacementGLF_dead12m = vec3(GLF_dead12injectionSwitch.x, cos(donor_replacementGLF_dead12o));
                                                        }
                                                    }
                                                } else {
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                GLF_live7looplimiter0++;
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                            } else {
                                                float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                                                float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                                                float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                                                float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                                                GLF_live7temp = GLF_live7x2;
                                                GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                                                GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                                                GLF_live7C = GLF_live7fx(GLF_live7x2);
                                                do {
                                                    GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                GLF_live7x0 = GLF_live7x1;
                                                GLF_live7x1 = GLF_live7temp;
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(injectionSwitch);
                                                    float donor_replacementGLF_dead13h = _GLF_FUZZED(mix(GLF_live7B, GLF_live7B, 62.17));
                                                    int donor_replacementGLF_dead13i = _GLF_FUZZED(i);
                                                    float donor_replacementGLF_dead13refh = _GLF_FUZZED(GLF_live7B);
                                                    float donor_replacementGLF_dead13slope = _GLF_FUZZED(GLF_live7x0);
                                                    vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(resolution);
                                                    while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                                        donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                                        donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                                        donor_replacementGLF_dead13i++;
                                                    }
                                                }
                                                GLF_live7iterations++;
                                            }
                                        }
                                    }
                                }
                                obj.prime_numbers[i] = 13;
                            } else {
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(injectionSwitch);
                                int donor_replacementGLF_dead3i = _GLF_FUZZED(bitfieldReverse(i));
                                vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED(vec4(250.121, vec3(-4140.9250, -846.436, 6.9)));
                                {
                                    donor_replacementGLF_dead3coord = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                                    donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                                    donor_replacementGLF_dead3texel = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                                    donor_replacementGLF_dead3i++;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = vec4(-16.57, -7.5, -68.15, -3304.3972);
                            }
                            if (i == 6) {
                                obj.prime_numbers[i] = _GLF_IDENTITY(17, max(17, 17));
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(max((-mat2(-6.4, 59.05, 651.850, -346.784))[0], vec2(-5.9, -98.66)));
                                        int donor_replacementGLF_dead3i = _GLF_FUZZED((i / (-17725)));
                                        vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED(dFdxFine((-_GLF_color)));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = dFdx(radians(vec4(-3.8, -5.4, 195.809, 509.688)));
                                            }
                                        } else {
                                        }
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(vec3(-3.2, 741.764, 609.496));
                                                {
                                                    donor_replacementGLF_dead14color.x += float(GLF_dead14obj.numbers[5]);
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                donor_replacementGLF_dead3coord = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                                            } else {
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                float donor_replacementGLF_dead11th = _GLF_FUZZED(-4.7);
                                                {
                                                    donor_replacementGLF_dead11th = 1.0 - donor_replacementGLF_dead11th;
                                                }
                                            }
                                            donor_replacementGLF_dead3texel = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                                            donor_replacementGLF_dead3i++;
                                        }
                                    }
                                } else {
                                    if (i == 7) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            obj.prime_numbers[i] = 19;
                                        }
                                    } else if (i == 8) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            obj.prime_numbers[i] = 23;
                                        } else {
                                        }
                                    } else {
                                        {
                                            float GLF_live7A = _GLF_FUZZED(((-5.5) - (34.45 + 6.5)));
                                            float GLF_live7B = _GLF_FUZZED(-3.5);
                                            float GLF_live7C = _GLF_FUZZED(5.4);
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(fract(GLF_dead6resolution));
                                                float donor_replacementGLF_dead13h = _GLF_FUZZED(GLF_live7C);
                                                int donor_replacementGLF_dead13i = _GLF_FUZZED(mix(68650, (~(-20772)), true));
                                                float donor_replacementGLF_dead13refh = _GLF_FUZZED(tanh(asin(GLF_live7B)));
                                                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED((vec2(-7.0, -858.522) - GLF_dead6resolution));
                                                while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = smoothstep(_GLF_color, vec4(-7597.6735, 3057.2910, 488.351, 4898.9629), _GLF_color);
                                                    }
                                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                                    donor_replacementGLF_dead13refh += GLF_live7A;
                                                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                                    donor_replacementGLF_dead13i++;
                                                }
                                            }
                                            int GLF_live7iterations = _GLF_FUZZED((-45627));
                                            float GLF_live7temp = _GLF_FUZZED(55.37);
                                            float GLF_live7x0 = _GLF_FUZZED(7351.7714);
                                            float GLF_live7x1 = _GLF_FUZZED((4.7 + (-3.3)));
                                            float GLF_live7x2 = _GLF_FUZZED(float(-61531));
                                            {
                                                float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                                                float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                                                float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                                                float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                                                GLF_live7temp = GLF_live7x2;
                                                do {
                                                    GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                                                GLF_live7C = GLF_live7fx(GLF_live7x2);
                                                do {
                                                    GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                GLF_live7x0 = GLF_live7x1;
                                                GLF_live7x1 = GLF_live7temp;
                                                GLF_live7iterations++;
                                            }
                                        }
                                        if (i == 9) {
                                            obj.prime_numbers[i] = 29;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                                float donor_replacementGLF_dead13h = _GLF_FUZZED(exp(-2884.7587));
                                                int donor_replacementGLF_dead13i = _GLF_FUZZED(bitfieldInsert((79021 - i), i, i, i));
                                                float donor_replacementGLF_dead13refh = _GLF_FUZZED(-87.63);
                                                float donor_replacementGLF_dead13slope = _GLF_FUZZED(mix(-5387.7197, -2771.2187, 0.7));
                                                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(unpackUnorm2x16(110092u));
                                                while (donor_replacementGLF_dead13h < donor_replacementGLF_dead13refh && donor_replacementGLF_dead13i < 32) {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                                                    } else {
                                                        donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                                    }
                                                    donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                                    donor_replacementGLF_dead13i++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        do {
                            discard;
                        } while (_GLF_WRAPPED_LOOP(false));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead6color = _GLF_FUZZED(vec2(-5.5, -1684.6861));
                                int donor_replacementGLF_dead6i = _GLF_FUZZED(floatBitsToInt(-3.1));
                                vec3 donor_replacementGLF_dead6vecCoor = _GLF_FUZZED(vec3(646.193, 36.63, 983.836));
                                if (int(GLF_dead6gl_FragCoord[1]) < 240) {
                                    donor_replacementGLF_dead6color = fract(asinh(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[6]))));
                                    donor_replacementGLF_dead6color.y -= isnan(float(donor_replacementGLF_dead6i)) ? tanh(GLF_dead6gl_FragCoord.x) : atanh(GLF_dead6gl_FragCoord.y / GLF_dead6resolution.y);
                                    do {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(injectionSwitch);
                                            float donor_replacementGLF_dead13h = _GLF_FUZZED(-4.6);
                                            float donor_replacementGLF_dead13refh = _GLF_FUZZED(8.4);
                                            float donor_replacementGLF_dead13slope = _GLF_FUZZED(dot(donor_replacementGLF_dead6vecCoor, acos(GLF_live7polynomial)));
                                            {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead6color;
                                                }
                                                donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                                } else {
                                                }
                                                do {
                                                    i++;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                        }
                                        int GLF_live8looplimiter1 = 0;
                                        if (GLF_live8looplimiter1 >= 6) {
                                            ;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    break;
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            ;
                                        }
                                    }
                                    if (int(GLF_dead6gl_FragCoord[1]) < 270) {
                                        donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[7]))));
                                        donor_replacementGLF_dead6color.y *= mix(normalize(donor_replacementGLF_dead6vecCoor), normalize(vec3(donor_replacementGLF_dead6color, degrees(donor_replacementGLF_dead6color.x))), GLF_dead6injectionSwitch.x).y;
                                        break;
                                    } else {
                                        discard;
                                    }
                                }
                            }
                            float GLF_live0pab = _GLF_FUZZED(-3.3);
                            float GLF_live0pca = _GLF_FUZZED(-3.1);
                            if (!((GLF_live0pab < 0.0 && GLF_live0pca < 0.0) || (GLF_live0pab >= 0.0 && GLF_live0pca >= 0.0))) {
                                do {
                                    ;
                                } while (_GLF_WRAPPED_LOOP(false));
                                {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead11th = _GLF_FUZZED(GLF_live0pab);
                                        vec2 donor_replacementGLF_dead11v = _GLF_FUZZED(dFdx(resolution));
                                        if (donor_replacementGLF_dead11v.x < 0.0) {
                                            donor_replacementGLF_dead11th = 1.0 - donor_replacementGLF_dead11th;
                                        }
                                    }
                                    float GLF_live10c_im = _GLF_FUZZED(155.378);
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead12k = _GLF_FUZZED((bvec3(false, false, true), 81908));
                                        vec2 donor_replacementGLF_dead12o = _GLF_FUZZED(asinh((+mat3x2(77.10, 6212.5284, 410.391, -24.35, -3.0, -2.7))[2]));
                                        {
                                            donor_replacementGLF_dead12o = donor_replacementGLF_dead12o + donor_replacementGLF_dead12o;
                                            donor_replacementGLF_dead12k--;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = ((mat4(1.9, -293.068, -3.1, -9.3, 5.9, 7.4, -8.1, -51.87, -695.024, 2.3, -48.55, 20.13, 5075.5932, 7.4, 4.6, -171.715) * GLF_live0_GLF_color));
                                            }
                                        }
                                    }
                                    float GLF_live10c_re = _GLF_FUZZED((6.2 - (-249.707)));
                                    int GLF_live10iteration = _GLF_FUZZED(89516);
                                    int GLF_live10looplimiter0 = 0;
                                    float GLF_live10x = _GLF_FUZZED((mat2x3(-7892.3170, 3252.8900, -640.825, 618.335, 186.694, -1.6) * vec2(-6360.9241, -405.434)).r);
                                    float GLF_live10y = _GLF_FUZZED(3.8);
                                    for (int GLF_live10k = 0; GLF_live10k < 1000; GLF_live10k++) {
                                        if (GLF_live10looplimiter0 >= 6) {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead11th = _GLF_FUZZED(exp2(GLF_live10y));
                                                vec2 donor_replacementGLF_dead11v = _GLF_FUZZED(mix(GLF_dead6resolution, vec2(89.33, -41.61), 1.5));
                                                if (donor_replacementGLF_dead11v.y < 0.0) {
                                                    donor_replacementGLF_dead11th = -donor_replacementGLF_dead11th;
                                                }
                                            }
                                            break;
                                        }
                                        GLF_live10looplimiter0++;
                                        {
                                            if (GLF_live10x * GLF_live10x + GLF_live10y * GLF_live10y > 4.0) {
                                                break;
                                            }
                                            float GLF_live10x_new = GLF_live10x * GLF_live10x - GLF_live10y * GLF_live10y + GLF_live10c_re;
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                GLF_live10y = 2.0 * GLF_live10x * GLF_live10y + GLF_live10c_im;
                                            }
                                            GLF_live10x = GLF_live10x_new;
                                            GLF_live10iteration++;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED((+vec2(311.543, -457.968)));
                                int donor_replacementGLF_dead3i = _GLF_FUZZED(mix(max(-44024, 15328), sign(i), false));
                                vec4 donor_replacementGLF_dead3texel = _GLF_FUZZED(GLF_live0_GLF_color);
                                {
                                    donor_replacementGLF_dead3coord = donor_replacementGLF_dead3texel.xz + donor_replacementGLF_dead3texel.yy;
                                    donor_replacementGLF_dead3coord = floor(donor_replacementGLF_dead3coord * 256.0) / 256.0;
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        donor_replacementGLF_dead3texel = texture(GLF_dead3tex, donor_replacementGLF_dead3coord);
                                    }
                                    donor_replacementGLF_dead3i++;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    continue;
                    {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            vec2 donor_replacementGLF_dead11a = _GLF_FUZZED(GLF_dead6injectionSwitch);
                            float donor_replacementGLF_dead11th = _GLF_FUZZED(-0.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (donor_replacementGLF_dead11a.y < donor_replacementGLF_dead11a.x) {
                                    donor_replacementGLF_dead11th = 0.5 - donor_replacementGLF_dead11th;
                                }
                            } else {
                            }
                        }
                        {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                ;
                            } else {
                            }
                        }
                    }
                }
            }
        }
    }
    {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = asin(GLF_dead6gl_FragCoord);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            ;
        } else {
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
        _GLF_color = mod(_GLF_color, (_GLF_color - step(8529.2133, _GLF_color)));
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = GLF_dead6gl_FragCoord;
    }
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (_GLF_DEAD(false)) {
        {
            float GLF_live2th = _GLF_FUZZED(((1235.1006 * 1117.8434)));
            vec2 GLF_live2v = _GLF_FUZZED(vec3(7248.7028, -865.108, -3.3).tp);
            do {
                if (GLF_live2v.x < 0.0) {
                    GLF_live2th = 1.0 - GLF_live2th;
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
        return;
    }
    {
        vec2 GLF_live1coord = _GLF_FUZZED((910.892 - vec2(220.143, 4.2)));
        float GLF_live1h = _GLF_FUZZED(82.21);
        int GLF_live1i = _GLF_FUZZED(((-93058) | (-63683)));
        float GLF_live1refh = _GLF_FUZZED(((-8.9) - (-84.51)));
        float GLF_live1slope = _GLF_FUZZED((82.65 + float(10552)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = dFdyFine(GLF_live7_GLF_color);
        }
        if (_GLF_DEAD(false)) {
            {
                GLF_live1h = -GLF_live1h;
            }
        }
        vec2 GLF_live1uvstep = _GLF_FUZZED(vec2((vec3(-8260.0363, -3941.7066, 0.4) - 0.4)));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                float donor_replacementGLF_dead4h = _GLF_FUZZED(GLF_live1refh);
                int donor_replacementGLF_dead4i = _GLF_FUZZED(int(GLF_live1refh));
                float donor_replacementGLF_dead4refh = _GLF_FUZZED(GLF_live1slope);
                float donor_replacementGLF_dead4slope = _GLF_FUZZED(dFdxCoarse((false ? GLF_live1h : (-3.6))));
                vec2 donor_replacementGLF_dead4uvstep = _GLF_FUZZED(uv);
                {
                    GLF_live1coord -= donor_replacementGLF_dead4uvstep;
                    do {
                        donor_replacementGLF_dead4refh += donor_replacementGLF_dead4slope;
                    } while (_GLF_WRAPPED_LOOP(false));
                    donor_replacementGLF_dead4h = texture(GLF_dead4tex, GLF_live1coord).y;
                    donor_replacementGLF_dead4i++;
                }
            }
            {
                {
                    ;
                }
            }
            GLF_live1coord -= GLF_live1uvstep;
            GLF_live1refh += GLF_live1slope;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead6color = _GLF_FUZZED(uv);
                vec3 donor_replacementGLF_dead6vecCoor = _GLF_FUZZED(vec3(-1805.9347, 0.9, 1.2));
                {
                    int GLF_live10iteration = _GLF_FUZZED(ivec3(-89010, 58666, -35733).z);
                    {
                        ;
                    }
                }
                {
                    donor_replacementGLF_dead6color = fract(sin(donor_replacementGLF_dead6vecCoor.yx - trunc(float(GLF_dead6data[1]))));
                    donor_replacementGLF_dead6color[1] *= atan(faceforward(GLF_dead6injectionSwitch, donor_replacementGLF_dead6color.xx, donor_replacementGLF_dead6vecCoor.yx).y);
                    ;
                }
            }
            GLF_live1h = texture(GLF_live1tex, GLF_live1coord).y;
            GLF_live1i++;
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead13h = _GLF_FUZZED(atan(1105.7340));
        int donor_replacementGLF_dead13i = _GLF_FUZZED(-50286);
        float donor_replacementGLF_dead13refh = _GLF_FUZZED(645.213);
        float donor_replacementGLF_dead13slope = _GLF_FUZZED(-37.82);
        {
            b -= b;
            donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
            donor_replacementGLF_dead13h = texture(GLF_dead13tex, b).y;
            donor_replacementGLF_dead13i++;
        }
    }
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
        if (gl_FragCoord.y < resolution.y / 1.1) {
            if (_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]), (_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]), (false ? _GLF_FUZZED(56257) : binarySearch(obj, obj.prime_numbers[4])))) - 0) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
                color.yz -= dot(float(_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]), (binarySearch(obj, obj.prime_numbers[4])) >> 0)), float(binarySearch(obj, obj.prime_numbers[0])));
            } else {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead14i = _GLF_FUZZED(-6351);
                        {
                            do {
                                GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 10)] = (10 - donor_replacementGLF_dead14i);
                            } while (_GLF_WRAPPED_LOOP(false));
                            GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 10)] = GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 10)] * GLF_dead14obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 10)];
                        }
                    }
                }
                discard;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    vec2 GLF_live1coord = _GLF_FUZZED((vec3(3703.5582, 378.498, -95.18) * mat2x3(-21.80, -83.41, 4.2, 9.4, 5252.2709, 240.039)));
                    float GLF_live1h = _GLF_FUZZED((true ? 0.1 : (-3621.2540)));
                    {
                        float GLF_live7A = _GLF_FUZZED(vec3(94.55, -99.07, -4.2).r);
                        float GLF_live7B = _GLF_FUZZED((+4.1));
                        float GLF_live7C = _GLF_FUZZED((-(-8549.1388)));
                        int GLF_live7iterations = _GLF_FUZZED(ivec3(-1140, 67711, 27632).s);
                        int GLF_live7looplimiter0 = 0;
                        float GLF_live7temp = _GLF_FUZZED(float(91011));
                        float GLF_live7x0 = _GLF_FUZZED(-92.13);
                        float GLF_live7x1 = _GLF_FUZZED(float(4691));
                        float GLF_live7x2 = _GLF_FUZZED(173.328);
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-2.7, 4.8, 878.813, -2265.2600);
                            }
                            if (GLF_live7looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live7looplimiter0++;
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 0)); _injected_loop_counter++) {
                                float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                                float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                                float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                                float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                                GLF_live7temp = GLF_live7x2;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                                } else {
                                }
                                GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                                GLF_live7C = GLF_live7fx(GLF_live7x2);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                                } else {
                                }
                                GLF_live7x0 = GLF_live7x1;
                                GLF_live7x1 = GLF_live7temp;
                                GLF_live7iterations++;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(color);
                            vec2 donor_replacementGLF_dead14uv = _GLF_FUZZED(GLF_dead6injectionSwitch);
                            if (donor_replacementGLF_dead14uv.y > (1.0 / 4.0)) {
                                donor_replacementGLF_dead14color.x += float(GLF_dead14obj.numbers[5]);
                            }
                        }
                    } else {
                    }
                    int GLF_live1i = _GLF_FUZZED(-77972);
                    float GLF_live1refh = _GLF_FUZZED(((-1.8) - 89.03));
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead11th = _GLF_FUZZED(1206.1121);
                        {
                            donor_replacementGLF_dead11th = -donor_replacementGLF_dead11th;
                        }
                    }
                    float GLF_live1slope = _GLF_FUZZED(vec4(4970.8309, 2.2, -852.737, -1.8).t);
                    vec2 GLF_live1uvstep = _GLF_FUZZED(vec2(vec4(-357.224, 6026.5050, -21.89, -5239.1585)));
                    {
                        int GLF_live1looplimiter0 = 0;
                        while (GLF_live1h < GLF_live1refh && GLF_live1i < 32) {
                            if (GLF_live1looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live1looplimiter0++;
                            {
                                GLF_live1coord -= GLF_live1uvstep;
                                GLF_live1refh += GLF_live1slope;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live1h = texture(GLF_live1tex, GLF_live1coord).y;
                                } else {
                                }
                                GLF_live1i++;
                            }
                        }
                    }
                    {
                        int GLF_live8baseIndex = _GLF_FUZZED(-99431);
                        int GLF_live8data = _GLF_FUZZED(67367);
                        int GLF_live8treeIndex = _GLF_FUZZED((~((+31926) | 59538)));
                        if (GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8baseIndex, 10)].rightIndex == -1) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = (dot(GLF_live1slope, GLF_live1slope) / mod(fwidthCoarse(vec4(-211.615, 0.8, -5.9, -1.8)), _GLF_color));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6resolution);
                                float donor_replacementGLF_dead13h = _GLF_FUZZED(refract(GLF_live1refh, GLF_live1refh, GLF_live1h));
                                float donor_replacementGLF_dead13refh = _GLF_FUZZED(radians(571.867));
                                float donor_replacementGLF_dead13slope = _GLF_FUZZED(GLF_live1refh);
                                vec2 donor_replacementGLF_dead13uvstep = _GLF_FUZZED(mix(GLF_dead6resolution, b, GLF_live1slope));
                                {
                                    donor_replacementGLF_dead13coord -= donor_replacementGLF_dead13uvstep;
                                    donor_replacementGLF_dead13refh += donor_replacementGLF_dead13slope;
                                    donor_replacementGLF_dead13h = texture(GLF_dead13tex, donor_replacementGLF_dead13coord).y;
                                    GLF_live8data++;
                                }
                            }
                            GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8baseIndex, 10)].rightIndex = GLF_live8treeIndex;
                            GLF_live8makeTreeNode(GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8treeIndex, 10)], GLF_live8data);
                            ;
                        } else {
                            GLF_live8baseIndex = GLF_live8tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8baseIndex, 10)].rightIndex;
                            do {
                                ;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                } else {
                }
                return;
            }
        } else {
            do {
                if (binarySearch(obj, 1) == -1) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        discard;
                    } else {
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead6gl_FragCoord;
                    }
                    color.yz += color.yz;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    _GLF_color = vec4(color, injectionSwitch.y);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        int donor_replacementGLF_dead6i = _GLF_FUZZED(findMSB(-12359));
        int donor_replacementGLF_dead6k = _GLF_FUZZED((24714 % ((-35648) & 18711)));
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead14color = _GLF_FUZZED(GLF_live7polynomial);
            if (uv.y > (1.0 / 4.0)) {
                donor_replacementGLF_dead14color.x += float(GLF_dead14obj.numbers[5]);
            }
        }
        {
            GLF_dead6temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k++, 10)] = GLF_dead6data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i++, 10)];
        }
    }
}
