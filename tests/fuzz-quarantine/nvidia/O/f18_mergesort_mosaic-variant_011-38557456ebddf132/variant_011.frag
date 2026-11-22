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
vec4 GLF_dead9gl_FragCoord = _GLF_FUZZED(vec4(-2.4, 5928.1995, -3108.7634, 6.9));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_dead10time;
};

float GLF_dead10h_r = _GLF_FUZZED((-29.62));
float GLF_dead10s_g = _GLF_FUZZED(-335.921);
float GLF_dead10b_b = _GLF_FUZZED(vec3(-0.7, 3480.8842, -4.3).y);

void GLF_dead10doConvert() {
    vec3 GLF_dead10temp = _GLF_FUZZED(log(vec3(-7.5, -65.50, 6355.1859)));
    GLF_dead10temp = GLF_dead10b_b * (1.0 - GLF_dead10s_g) + (GLF_dead10b_b - GLF_dead10b_b * (1.0 - GLF_dead10s_g)) * clamp(abs(abs(6.0 * (GLF_dead10h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        GLF_dead10h_r = GLF_dead10temp.x;
    }
    GLF_dead10s_g = GLF_dead10temp.y;
    GLF_dead10b_b = GLF_dead10temp.z;
}

vec3 GLF_dead10computeColor(float GLF_dead10c, vec2 GLF_dead10position) {
    GLF_dead10h_r = fract(GLF_dead10c);
    GLF_dead10s_g = 1.0;
    GLF_dead10b_b = (0.5 + (sin(GLF_dead10time) * 0.5 + 0.5));
    GLF_dead10doConvert();
    GLF_dead10s_g *= 1.0 / GLF_dead10position.y;
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        GLF_dead10h_r *= 1.0 / GLF_dead10position.x;
    } else {
    }
    if (abs(GLF_dead10position.y - GLF_dead10position.x) < 0.5) {
        GLF_dead10b_b = clamp(GLF_dead10b_b * 3.0, 0.0, 1.0);
    }
    return vec3(GLF_dead10h_r, GLF_dead10s_g, GLF_dead10b_b);
}

vec3 GLF_dead10defaultColor() {
    return vec3(0.0);
}

vec3 GLF_dead10drawShape(vec2 GLF_dead10pos, vec2 GLF_dead10square, vec3 GLF_dead10setting) {
    bool GLF_dead10c1 = GLF_dead10pos.x - GLF_dead10setting.x < GLF_dead10square.x;
    if (!GLF_dead10c1) {
        return GLF_dead10defaultColor();
    }
    bool GLF_dead10c2 = GLF_dead10pos.x + GLF_dead10setting.x > GLF_dead10square.x;
    if (!GLF_dead10c2) {
        return GLF_dead10defaultColor();
    }
    bool GLF_dead10c3 = GLF_dead10pos.y - GLF_dead10setting.x < GLF_dead10square.y;
    if (!GLF_dead10c3) {
        return GLF_dead10defaultColor();
    }
    bool GLF_dead10c4 = GLF_dead10pos.y + GLF_dead10setting.x > GLF_dead10square.y;
    if (!GLF_dead10c4) {
        return GLF_dead10defaultColor();
    }
    bool GLF_dead10c5 = GLF_dead10pos.x - (GLF_dead10setting.x - GLF_dead10setting.y) < GLF_dead10square.x;
    if (!GLF_dead10c5) {
        return GLF_dead10computeColor(GLF_dead10setting.z / 40.0, GLF_dead10pos);
    }
    bool GLF_dead10c6 = GLF_dead10pos.x + (GLF_dead10setting.x - GLF_dead10setting.y) > GLF_dead10square.x;
    if (!GLF_dead10c6) {
        return GLF_dead10computeColor(GLF_dead10setting.z / 40.0, GLF_dead10pos);
    }
    bool GLF_dead10c7 = GLF_dead10pos.y - (GLF_dead10setting.x - GLF_dead10setting.y) < GLF_dead10square.y;
    if (!GLF_dead10c7) {
        return GLF_dead10computeColor(GLF_dead10setting.z / 40.0, GLF_dead10pos);
    }
    bool GLF_dead10c8 = GLF_dead10pos.y + (GLF_dead10setting.x - GLF_dead10setting.y) > GLF_dead10square.y;
    if (!GLF_dead10c8) {
        return GLF_dead10computeColor(GLF_dead10setting.z / 40.0, GLF_dead10pos);
    }
    return GLF_dead10defaultColor();
}

layout(set = 0, binding = 3) uniform sampler2D GLF_dead8tex;
const float GLF_dead8weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

struct _GLF_struct_3 {
    int _f0;
    int _f1;
    mat4 _f2;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_4 {
    mat2 _f0;
    bvec4 _f1;
    vec3 _f2;
    ivec2 donor_replacementGLF_dead4p;
};

struct _GLF_struct_5 {
    mat3x4 _f0;
    int donor_replacementGLF_dead4j;
};

struct _GLF_struct_14 {
    mat2x4 _f0;
    int donor_replacementGLF_dead4v;
    uvec4 _f1;
    mat2x4 _f2;
    vec3 _f3;
    mat3x2 _f4;
    float _f5;
    mat2x3 _f6;
};

struct _GLF_struct_13 {
    mat4 _f0;
    mat3 _f1;
    ivec3 _f2;
    _GLF_struct_14 _f3;
};

struct _GLF_struct_12 {
    mat4x2 _f0;
    uvec4 _f1;
    int _f2;
};

struct _GLF_struct_11 {
    float _f0;
    uvec4 _f1;
    mat3x4 _f2;
    mat4x3 _f3;
    vec3 _f4;
};

struct _GLF_struct_10 {
    _GLF_struct_11 _f0;
    int _f1;
    _GLF_struct_12 _f2;
    mat4x2 _f3;
};

struct _GLF_struct_9 {
    uvec3 _f0;
    mat4x3 _f1;
    uint _f2;
};

struct _GLF_struct_8 {
    int _f0;
    ivec3 _f1;
    mat2x3 _f2;
    mat4x3 _f3;
    mat4x3 _f4;
    uvec2 _f5;
    mat3 _f6;
};

struct _GLF_struct_7 {
    _GLF_struct_8 _f0;
    mat3x4 _f1;
    bvec4 _f2;
    mat3x2 _f3;
    _GLF_struct_9 _f4;
    mat4x3 _f5;
    mat4 _f6;
};

struct _GLF_struct_6 {
    _GLF_struct_7 _f0;
    _GLF_struct_10 _f1;
    mat2x3 _f2;
    _GLF_struct_13 _f3;
    mat3x4 _f4;
};

vec4 GLF_dead4_GLF_color = _GLF_FUZZED(vec3(6256.6633, -77.02, -16.81).rgrb);
int GLF_dead4map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

ivec2 GLF_dead5iter(ivec2 GLF_dead5p) {
    if (GLF_dead5p.x > 0) {
        GLF_dead5p.y--;
    }
    if (GLF_dead5p.x < 0) {
        GLF_dead5p.y++;
    }
    GLF_dead5p.x += GLF_dead5p.y / 2;
    return GLF_dead5p;
}

struct _GLF_struct_2 {
    vec3 _f0;
    ivec2 _f1;
    mat2 _f2;
    vec4 _GLF_outVarBackup_GLF_color;
    ivec4 _f3;
    uvec2 _f4;
    mat2x3 _f5;
};

struct _GLF_struct_1 {
    vec4 _f0;
    mat4x3 _f1;
    _GLF_struct_2 _f2;
    mat4 _f3;
};

struct _GLF_struct_0 {
    mat4x3 _f0;
    bool _f1;
    _GLF_struct_1 _f2;
    vec2 _f3;
    uvec3 _f4;
    ivec3 _f5;
};

vec4 GLF_dead2gl_FragCoord = _GLF_FUZZED(vec4(2326.0882, vec3(-51.31, 8.7, -25.36)));
int GLF_dead2data[10] = int[10](_GLF_FUZZED((50780)), _GLF_FUZZED((~80860)), _GLF_FUZZED(31422), _GLF_FUZZED((58257 ^ ivec4(69716, 51556, -44221, 34846).a)), _GLF_FUZZED(-80444), _GLF_FUZZED((-62598)), _GLF_FUZZED(-99003), _GLF_FUZZED(ivec2(-75937, -52247).x), _GLF_FUZZED(((65768) | (-67408))), _GLF_FUZZED(((-29082) - 83720))), GLF_dead2temp[10] = int[10](_GLF_FUZZED(((-62679) | 30385)), _GLF_FUZZED(-15310), _GLF_FUZZED(-34197), _GLF_FUZZED(-81688), _GLF_FUZZED(((-64893) & (-58617))), _GLF_FUZZED(55299), _GLF_FUZZED(((-29368) | (-48114))), _GLF_FUZZED(((+42238) | (-96711))), _GLF_FUZZED((~((-88354) - (-21019)))), _GLF_FUZZED((709 & (-10438))));
vec4 GLF_dead0gl_FragCoord = _GLF_FUZZED(vec4(89.27, 4.2, -271.305, 16.22));
const int GLF_dead0N = 10;
int GLF_dead0data[10] = int[10](_GLF_FUZZED(-97853), _GLF_FUZZED(-77126), _GLF_FUZZED(42890), _GLF_FUZZED(10954), _GLF_FUZZED((+(-18969))), _GLF_FUZZED(-75495), _GLF_FUZZED(-37467), _GLF_FUZZED(-66146), _GLF_FUZZED(-4948), _GLF_FUZZED(73842)), GLF_dead0temp[10] = int[10](_GLF_FUZZED(-41037), _GLF_FUZZED((((28199 & 92462) + (-4355)) & (-24521))), _GLF_FUZZED((ivec3(-27453, 40930, -65245) * 64141).p), _GLF_FUZZED(51695), _GLF_FUZZED(ivec3(37324, 48546, 17781).y), _GLF_FUZZED(28231), _GLF_FUZZED(((60985) ^ 89713)), _GLF_FUZZED(-41941), _GLF_FUZZED((-(-10618))), _GLF_FUZZED(75014));

void GLF_dead0merge(int GLF_dead0from, int GLF_dead0mid, int GLF_dead0to) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 0.0, 0.0, 0.0))))))) {
        {
            GLF_dead0mid += 1;
        }
    }
    int GLF_dead0k = GLF_dead0from, GLF_dead0i = GLF_dead0from, GLF_dead0j = GLF_dead0mid + 1;
    do {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(5.8, -64.12));
                int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_dead0from);
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(round(-88.83));
                {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        GLF_dead4_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                    }
                }
            }
            while (GLF_dead0i <= GLF_dead0mid && GLF_dead0j <= GLF_dead0to) {
                if (GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] < GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)]) {
                    GLF_dead0temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0k++, 10)] = GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i++, 10)];
                } else {
                    GLF_dead0temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0k++, 10)] = GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j++, 10)];
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        while (GLF_dead0i < GLF_dead0N && GLF_dead0i <= GLF_dead0mid) {
            GLF_dead0temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0k++, 10)] = GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i++, 10)];
        }
    } else {
    }
    do {
        for (int GLF_dead0i = GLF_dead0from; GLF_dead0i <= GLF_dead0to; GLF_dead0i++) {
            GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = GLF_dead0temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)];
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead5i = _GLF_FUZZED(6646);
            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(14050, -97797));
            for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < 100; donor_replacementGLF_dead5i++) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    donor_replacementGLF_dead5p = GLF_dead5iter(donor_replacementGLF_dead5p);
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c8 = _GLF_FUZZED(false);
                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(vec2(-84.90, 60.29));
                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(acosh(vec3(vec2(977.302, -4.6), fwidthCoarse(-6380.5102))));
                        if (!donor_replacementGLF_dead10c8) {
                            ;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-0.6, -7.4));
                int donor_replacementGLF_dead8j = _GLF_FUZZED(GLF_dead0k);
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead4_GLF_color);
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(-1.7);
                {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead0i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i * 3 + donor_replacementGLF_dead8j, 9)];
                }
            }
        }
    } else {
    }
}

ivec2 GLF_dead3iter(ivec2 GLF_dead3p) {
    if (GLF_dead3p.x > 0) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            GLF_dead3p.y--;
        } else {
        }
    }
    if (GLF_dead3p.x < 0) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead11index = _GLF_FUZZED((int(8.9) << (GLF_dead0N << 48355)));
            int donor_replacementGLF_dead11j = _GLF_FUZZED(sign(abs(GLF_dead0N)));
            {
                donor_replacementGLF_dead11index = donor_replacementGLF_dead11j;
            }
        }
        GLF_dead3p.y++;
    }
    GLF_dead3p.x += GLF_dead3p.y / 2;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead7c_im = _GLF_FUZZED(712.962);
        float donor_replacementGLF_dead7c_re = _GLF_FUZZED(5.1);
        int donor_replacementGLF_dead7iteration = _GLF_FUZZED(61550);
        float donor_replacementGLF_dead7x = _GLF_FUZZED(fract(-0.2));
        float donor_replacementGLF_dead7y = _GLF_FUZZED(-0.1);
        {
            if (donor_replacementGLF_dead7x * donor_replacementGLF_dead7x + donor_replacementGLF_dead7y * donor_replacementGLF_dead7y > 4.0) {
                ;
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
            }
            float GLF_dead7x_new = donor_replacementGLF_dead7x * donor_replacementGLF_dead7x - donor_replacementGLF_dead7y * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_re;
            donor_replacementGLF_dead7y = 2.0 * donor_replacementGLF_dead7x * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_im;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9i = _GLF_FUZZED(-93400);
                for (int _injected_loop_counter = _GLF_IDENTITY(1, int(int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, ~(~(0)))); _injected_loop_counter--) {
                    if (donor_replacementGLF_dead9i < int(GLF_dead9gl_FragCoord.x)) {
                        ;
                    }
                }
            }
            donor_replacementGLF_dead7x = GLF_dead7x_new;
            do {
                donor_replacementGLF_dead7iteration++;
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    return GLF_dead3p;
}

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
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = GLF_dead4_GLF_color;
    }
    int k = from, i = from, j = mid + 1;
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    ;
                }
            }
        } else {
            do {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdyFine(GLF_dead0gl_FragCoord);
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead0gl_FragCoord;
                        }
                        {
                            GLF_dead4_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                            return;
                        }
                    }
                } else {
                }
            } while (_GLF_WRAPPED_LOOP(false));
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    temp[k++] = data[j++];
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        do {
            while (i < N && i <= mid) {
                temp[k++] = data[i++];
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(N, (k << i)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                ;
                            }
                        }
                        {
                            donor_replacementGLF_dead5p.x -= 16;
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    } else {
                        _GLF_color = vec4(819.717, 649.796, -3730.6277, -26.94);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } else {
                        }
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
    }
    for (int i = from; i <= to; i++) {
        {
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead10c6 = _GLF_FUZZED(false);
                vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED((86.86 / resolution));
                vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vec3(4.4, 3182.2068, -16.29));
                if (!donor_replacementGLF_dead10c6) {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        j = j;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(512.109));
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(fract(vec4(-2864.2578, 5286.6648, 2998.0185, -215.678)));
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(94.69);
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                        }
                    }
                }
            }
            do {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            _GLF_color = vec3(-8.7, 2225.3038, 6.3).bbgr;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(71.77, 24.88));
                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(log2(6.5));
                    for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                        do {
                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) && true)));
                    }
                }
            }
        }
        data[i] = temp[i];
    }
    do {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead11j = _GLF_FUZZED(44030);
            {
                j = donor_replacementGLF_dead11j;
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(3418.4790, -5.8, 95.41, -7.8);
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = GLF_dead2gl_FragCoord;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = vec4(1.2, 2.5, -15.70, 5.9);
                        } else {
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(vec2(4279.1867, 24.33));
                                if (abs(donor_replacementGLF_dead10position.y - donor_replacementGLF_dead10position.x) < 0.5) {
                                    GLF_dead10b_b = clamp(GLF_dead10b_b * 3.0, 0.0, 1.0);
                                }
                            }
                        }
                    }
                    float donor_replacementGLF_dead0grey = _GLF_FUZZED(step(5599.5491, 226.936));
                    if (int(GLF_dead0gl_FragCoord[1]) < 240) {
                        donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[7]) / 10.0;
                    } else {
                        if (int(GLF_dead0gl_FragCoord[1]) < 270) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[8]) / 10.0;
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead4directions = _GLF_FUZZED(i);
                                ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED((i - ivec2(53290, 17157)));
                                {
                                    int GLF_dead4d = k % donor_replacementGLF_dead4directions;
                                    k += donor_replacementGLF_dead4directions;
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                                    } else {
                                        if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.x > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                                            GLF_dead4d--;
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead0gl_FragCoord;
                                                }
                                            }
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead4p.x -= 2;
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        discard;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                    if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.y > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 2) * 16, 256)] == 0) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            GLF_dead4d--;
                                        }
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 1) * 16, 256)] = 1;
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 2) * 16, 256)] = 1;
                                        do {
                                            donor_replacementGLF_dead4p.y -= 2;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(false)) {
                                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.x < 14 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                                        GLF_dead4d--;
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        do {
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        donor_replacementGLF_dead4p.x += 2;
                                    }
                                    if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.y < 14 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 2) * 16, 256)] == 0) {
                                        GLF_dead4d--;
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 1) * 16, 256)] = 1;
                                        } else {
                                        }
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 2) * 16, 256)] = 1;
                                        donor_replacementGLF_dead4p.y += 2;
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(16.59, 9.2, -8.6, 3424.2990) - vec4(66.05, 72.36, 60.95, -638.943));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    do {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                            _GLF_color = vec4(-5.7, 6.7, 0.6, -4.8);
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            } else {
                            }
                        } else {
                            discard;
                        }
                        for (int _injected_loop_counter = ((-62021) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead4d = _GLF_FUZZED(max((GLF_dead0N | from), 82210));
                                ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED((~ivec2(-5436, 1960)));
                                do {
                                    do {
                                        if (donor_replacementGLF_dead4d >= 0 && donor_replacementGLF_dead4p.x < 14 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                                            donor_replacementGLF_dead4d--;
                                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            }
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            do {
                                                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                            donor_replacementGLF_dead4p.x += 2;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = sqrt(vec4(-24.00, 7.1, 5149.8567, 79.75));
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            if (mid < int(GLF_dead9gl_FragCoord.x)) {
                                                ;
                                            }
                                        }
                                        int donor_replacementGLF_dead7iteration = _GLF_FUZZED(mid);
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead10d = _GLF_FUZZED(vec3(-4.7, -10.37, -65.82));
                                        if (length(donor_replacementGLF_dead10d) <= 0.0) {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            do {
                                if (_GLF_DEAD(false)) {
                                    {
                                        ;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead9i = _GLF_FUZZED(i);
                                        if (donor_replacementGLF_dead9i < int(GLF_dead9gl_FragCoord.x)) {
                                            ;
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1237.8002, -34.29, -0.8, 138.570);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead2gl_FragCoord;
                                }
                            }
                        }
                        discard;
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(vec2(791.988, -7258.3679));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (abs(donor_replacementGLF_dead10position.y - donor_replacementGLF_dead10position.x) < 0.5) {
                    GLF_dead10b_b = clamp(GLF_dead10b_b * 3.0, 0.0, 1.0);
                }
            } else {
            }
        }
    }
}

void mergeSort() {
    int low = 0;
    int high = N - 1;
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            bool donor_replacementGLF_dead10c7 = _GLF_FUZZED((mat3(-47.29, 4.5, -54.79, 98.42, -56.49, 818.598, -6.5, 3.8, -96.07) == mat3(-30.35, 918.584, 4.1, -0.9, -6.6, -6.7, -0.5, 1.9, 9803.5378)));
            vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(log((resolution - injectionSwitch)));
            vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vec3(injectionSwitch, 6.1));
            if (!donor_replacementGLF_dead10c7) {
                ;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
        for (int m = 1; m <= high; m = 2 * m) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                {
                    continue;
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), (int(0)) >> 0)))); _injected_loop_counter--) {
                for (int i = low; i < high; i += 2 * m) {
                    int from = i;
                    int mid = i + m - 1;
                    int to = min(i + 2 * m - 1, high);
                    merge(from, mid, to);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        {
                            break;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = floor(mat3x4(875.681, 44.44, -91.46, -51.82, 2.0, -4.1, 0.2, -2.2, 2.4, 7919.7340, 74.14, 0.4)[0]);
                            }
                        } else {
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-87986, 96840));
                        while (donor_replacementGLF_dead3p.x > 15) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead0gl_FragCoord;
                            }
                            donor_replacementGLF_dead3p.x -= 16;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = sqrt(GLF_dead4_GLF_color);
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = sqrt(_GLF_color);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 1.0)), dot(vec4(1.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 1.0))))))) {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                    {
                                        ;
                                    }
                                }
                                mid += 1;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdxFine(dFdyFine(vec4(91.58, 6504.6955, -9496.6482, -7.5)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))) && true))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-695.060, -8.8, 7.3, -353.817);
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-6302.3681, 8.3, -3900.5319, -4.9);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(fma(resolution, vec2(3094.4354, -3.6), resolution));
                int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_dead0N);
                int donor_replacementGLF_dead8j = _GLF_FUZZED((max(-89076, GLF_dead0N) & (-46025)));
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(((4.2 + floor(8.2)) - vec4(-27.17, 53.05, -697.983, -2.6)));
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(clamp(float(N), acosh(vec3(263.115, 6.8, 533.766))[0], 3.0));
                {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead8j, 9)];
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(((vec3(6210.1043, 5.5, 7.7) * mat2x3(-691.666, -4.7, -68.15, -8.1, -6009.1975, 70.14)) - dFdxFine(resolution)));
            int donor_replacementGLF_dead8i = _GLF_FUZZED(-69862);
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead4_GLF_color);
            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(determinant(mat3(-26.37, -8793.7445, 45.29, 5427.4901, 7232.0002, -4.3, -348.060, 8.4, -8.9)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                }
            } else {
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4d = _GLF_FUZZED(N);
            ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED((ivec2(-52764, 23199) & bitCount(-29054)));
            if (donor_replacementGLF_dead4d >= 0 && donor_replacementGLF_dead4p.y > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 2) * 16, 256)] == 0) {
                donor_replacementGLF_dead4d--;
                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 1) * 16, 256)] = 1;
                } else {
                }
                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 2) * 16, 256)] = 1;
                donor_replacementGLF_dead4p.y -= 2;
            }
        }
        _GLF_color = (_GLF_color - (-1246.2328));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-0.5, 7467.4681, -6.6, -18.16);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead10c4 = _GLF_FUZZED(true);
                    if (!donor_replacementGLF_dead10c4) {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED((resolution - determinant(mat4(-7.4, -3.7, 8202.8050, 9.4, -80.21, 81.44, 35.50, 6.5, -1.6, -927.605, -98.66, -2283.1538, -8.3, -110.124, -8646.2503, -5.6))));
            if (abs(donor_replacementGLF_dead10position.y - donor_replacementGLF_dead10position.x) < 0.5) {
                GLF_dead10b_b = clamp(GLF_dead10b_b * 3.0, 0.0, 1.0);
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = tanh(vec4(-97.35, -1.6, 905.556, 7.5));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int i = int(injectionSwitch.x);
    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        do {
            switch (i) {
                case 0:
                    data[i] = 4;
                    break;
                case 1:
                    data[i] = 3;
                    break;
                    do {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, false))))) {
                            int donor_replacementGLF_dead2j = _GLF_FUZZED(findLSB(60744u));
                            {
                                GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j, 10)];
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    if (_GLF_DEAD(false)) {
                        {
                            continue;
                        }
                    }
                case 2:
                    data[i] = 2;
                    break;
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(min(ivec2(23779, 79702), -81759));
                        {
                            donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                        }
                    }
                case 3:
                    data[i] = 1;
                    break;
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c6 = _GLF_FUZZED((ivec2(88679, -19151) == ivec2(-46820, 96564)));
                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(injectionSwitch);
                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vec3(-71.94, 5.3, -82.98));
                        if (!donor_replacementGLF_dead10c6) {
                            ;
                        }
                    }
                case 4:
                    data[i] = 0;
                    break;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-76.12, -195.427, -19.68, 2.6);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                _GLF_color = _GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = cos(GLF_dead4_GLF_color);
                            }
                        }
                    }
                case 5:
                    data[i] = -1;
                    break;
                case 6:
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        data[i] = -2;
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            ;
                        }
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c8 = _GLF_FUZZED((uvec2(193175u, 168694u) == uvec2(134956u, 157468u)));
                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(matrixCompMult(mat4x2(mat3x4(-9315.5204, 6.1, 17.57, 91.28, 7.6, 205.921, 516.374, -42.03, -460.651, 5.9, 804.686, 0.3)), mat4x2(8101.9254, -96.93, 26.34, 3715.0447, 9.5, -2.5, -53.79, -9.3))[1]);
                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(pow(vec3(89.44, -6.7, -2.7), min(vec3(552.390, 5.5, -319.103), exp2(-6.0))));
                        if (!donor_replacementGLF_dead10c8) {
                            ;
                        }
                    }
                case 7:
                    {
                        _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(1, 1, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
                        _GLF_struct_replacement_3._GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(466.541, -761.843, 6678.2097, 4587.3370);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_struct_replacement_3._GLF_outVarBackup_GLF_color;
                            } else {
                            }
                        }
                    }
                    data[i] = -3;
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-27127, -32667));
                        {
                            donor_replacementGLF_dead5p.y++;
                        }
                    }
                    break;
                case 8:
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            switch (i) {
                                case 0:
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = vec3(-8.9, 4.0, 1.3).xzyz;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(8213.3488, -629.978, -917.773, -8.5);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = GLF_dead2gl_FragCoord;
                                    }
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (+_GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec2 donor_replacementGLF_dead10center = _GLF_FUZZED(vec2(vec3(-711.986, 473.873, 750.870)));
                                            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(resolution);
                                            vec3 donor_replacementGLF_dead10result = _GLF_FUZZED(vec3(-3.9, -303.510, -8795.5006));
                                            {
                                                vec3 GLF_dead10d = _GLF_FUZZED(pow(uintBitsToFloat(uvec3(18976u, 7162u, 49682u)), vec3(-7.8, 221.430, 46.49)));
                                                GLF_dead10d = GLF_dead10drawShape(donor_replacementGLF_dead10position, donor_replacementGLF_dead10center + vec2(sin(float(i) / 10.0 + GLF_dead10time) / 4.0, 0.0), vec3(0.01 + sin(float(i) / 100.0), 0.01, float(i)));
                                                if (length(GLF_dead10d) <= 0.0) {
                                                    continue;
                                                }
                                                donor_replacementGLF_dead10result = vec3(GLF_dead10d);
                                            }
                                        }
                                        GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 4;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(57.43, -420.024, -607.402, 3341.3894);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                case 1:
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(605.249, -466.312, -8.6, -9.6);
                                    }
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 3;
                                    break;
                                case 2:
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 2;
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(652.753, 5.5));
                                        int donor_replacementGLF_dead8j = _GLF_FUZZED(GLF_dead0N);
                                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(length(-3.6));
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            GLF_dead0gl_FragCoord += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + donor_replacementGLF_dead8j, 9)];
                                        }
                                    }
                                case 3:
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 1;
                                    break;
                                case 4:
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 0;
                                    break;
                                case 5:
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -1;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = round(vec4(-683.867, 39.88, 9.9, -7270.6305));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead10center = _GLF_FUZZED(faceforward(vec2(-70.73, -62.86), injectionSwitch, unpackUnorm2x16(46468u)));
                                            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED((step(step(94.16, -5640.3685), injectionSwitch) / vec2(6949.8476, 26.88)));
                                            vec3 donor_replacementGLF_dead10result = _GLF_FUZZED(vec3(6.1, -336.084, 2118.5550));
                                            for (int GLF_dead10i = 35; GLF_dead10i >= 0; GLF_dead10i--) {
                                                vec3 GLF_dead10d = _GLF_FUZZED(pow(uintBitsToFloat(uvec3(18976u, 7162u, 49682u)), vec3(-7.8, 221.430, 46.49)));
                                                GLF_dead10d = GLF_dead10drawShape(donor_replacementGLF_dead10position, donor_replacementGLF_dead10center + vec2(sin(float(GLF_dead10i) / 10.0 + GLF_dead10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead10i) / 100.0), 0.01, float(GLF_dead10i)));
                                                if (length(GLF_dead10d) <= 0.0) {
                                                    continue;
                                                }
                                                donor_replacementGLF_dead10result = vec3(GLF_dead10d);
                                            }
                                        }
                                    }
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = mod(fwidthCoarse(GLF_dead2gl_FragCoord), GLF_dead0gl_FragCoord);
                                    }
                                case 6:
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -2;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (true)))) {
                                            _GLF_color = vec3(-2.4, -3.2, 9.6).xyyz;
                                        } else {
                                        }
                                    }
                                    break;
                                    for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(min(findMSB(ivec2(75872, -21585)), -53264));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = log(_GLF_color);
                                                }
                                                donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                                            }
                                        }
                                    }
                                case 7:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
                                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(injectionSwitch[0]);
                                        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                GLF_dead2gl_FragCoord += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                            }
                                        }
                                    }
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -3;
                                    break;
                                case 8:
                                    {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                discard;
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(756.967, -22.98, 7063.0610, -752.779);
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED((i + ivec2(68842, 67266)));
                                            if (donor_replacementGLF_dead5p.x > 0) {
                                                donor_replacementGLF_dead5p.y--;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            } else {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(faceforward(vec2(241.307, -9503.9995), dFdyFine(abs(resolution)), vec2(6.9, -1.3)));
                                                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(distance(1.9, -727.886));
                                                for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                        _GLF_outVarBackup_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_color;
                                                } else {
                                                }
                                            }
                                        }
                                    }
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -4;
                                    break;
                                case 9:
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -5;
                                    break;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                i++;
                            }
                        }
                    }
                    do {
                        data[i] = -4;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(fwidth(dFdxCoarse(vec2(83.54, -144.027))));
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(bitCount(-97663));
                                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(767.362);
                                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                    GLF_dead2gl_FragCoord += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            } else {
                            }
                            do {
                                _GLF_color = vec4(-452.649, 2.5, -41.52, 500.543);
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-942.212, 44.24, -5.7, 439.605);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(findMSB(uvec2(59072u, 45069u)));
                                    {
                                        donor_replacementGLF_dead5p.x -= 16;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(i, 256)] = 0;
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (GLF_dead4_GLF_color - 6.3);
                                    }
                                    do {
                                        do {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(0.6, -407.708, 4.8, 195.889);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead4directions = _GLF_FUZZED(i);
                                        _GLF_struct_4 _GLF_struct_replacement_4 = _GLF_struct_4(mat2(1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), vec3(1.0, 1.0, 1.0), _GLF_FUZZED(ivec2(43189, -40195)));
                                        if (_GLF_struct_replacement_4.donor_replacementGLF_dead4p.x < 14 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((_GLF_struct_replacement_4.donor_replacementGLF_dead4p.x + 2) + (_GLF_struct_replacement_4.donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                                            do {
                                                donor_replacementGLF_dead4directions += 1;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    ;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(((ivec2(66884, -37758) << ivec2(37160, 24180)) & N));
                                for (i = 0; i < 100; i++) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead2gl_FragCoord;
                                    }
                                    donor_replacementGLF_dead3p = GLF_dead3iter(donor_replacementGLF_dead3p);
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0)))));
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead10c3 = _GLF_FUZZED(false);
                            if (!donor_replacementGLF_dead10c3) {
                                ;
                            }
                        }
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(bitfieldExtract(ivec2(30535, 84571), i, N));
                        while (donor_replacementGLF_dead5p.x > 15) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                donor_replacementGLF_dead5p.x -= 16;
                            } else {
                            }
                        }
                    }
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-4471, 51896));
                        {
                            donor_replacementGLF_dead5p.x -= 16;
                        }
                    }
                case 9:
                    data[i] = -5;
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead10center = _GLF_FUZZED(asin(injectionSwitch));
                            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(dFdy(unpackHalf2x16(1543u)));
                            vec3 donor_replacementGLF_dead10result = _GLF_FUZZED(vec3(3.0, -60.15, 5.5));
                            for (int GLF_dead10i = 35; GLF_dead10i >= 0; GLF_dead10i--) {
                                vec3 GLF_dead10d = _GLF_FUZZED(pow(uintBitsToFloat(uvec3(18976u, 7162u, 49682u)), vec3(-7.8, 221.430, 46.49)));
                                GLF_dead10d = GLF_dead10drawShape(donor_replacementGLF_dead10position, donor_replacementGLF_dead10center + vec2(sin(float(GLF_dead10i) / 10.0 + GLF_dead10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead10i) / 100.0), 0.01, float(GLF_dead10i)));
                                if (length(GLF_dead10d) <= 0.0) {
                                    continue;
                                }
                                donor_replacementGLF_dead10result = vec3(GLF_dead10d);
                            }
                        }
                        _GLF_color = (_GLF_color * mat4(-1.8, -378.813, 55.69, -73.22, 452.347, -2635.9543, -1512.7907, -6.6, -1257.1896, -78.78, -2.7, -3.5, -1215.2459, 329.089, 5.5, -53.88));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead7c_im = _GLF_FUZZED(961.257);
                                float donor_replacementGLF_dead7c_re = _GLF_FUZZED(roundEven(0.6));
                                int donor_replacementGLF_dead7iteration = _GLF_FUZZED(bitCount(i));
                                float donor_replacementGLF_dead7x = _GLF_FUZZED(degrees(length((false ? vec4(-3.2, 3.6, 1562.9955, -4.3) : GLF_dead2gl_FragCoord))));
                                float donor_replacementGLF_dead7y = _GLF_FUZZED(0.1);
                                {
                                    if (donor_replacementGLF_dead7x * donor_replacementGLF_dead7x + donor_replacementGLF_dead7y * donor_replacementGLF_dead7y > 4.0) {
                                        break;
                                    }
                                    float GLF_dead7x_new = donor_replacementGLF_dead7x * donor_replacementGLF_dead7x - donor_replacementGLF_dead7y * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_re;
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = mix(_GLF_outVarBackup_GLF_color, _GLF_color, mix(bvec4(false, false, false, true), bvec4(false, true, true, true), lessThan(uvec4(74383u, 104055u, 192869u, 154265u), uvec4(96177u, 88769u, 101527u, 191766u))));
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    do {
                                        donor_replacementGLF_dead7y = 2.0 * donor_replacementGLF_dead7x * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_im;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    donor_replacementGLF_dead7x = GLF_dead7x_new;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        bool donor_replacementGLF_dead10c2 = _GLF_FUZZED((mat4x3(1436.3340, -6.6, -3.9, -9928.4902, 53.35, -1147.0310, 928.172, -2638.2187, 94.89, 0.1, 64.20, -9551.0884) != mat4x3(-1.0, -9160.4899, 3.7, -1359.1445, -411.347, -4920.2772, 1.9, -7486.6967, -4721.7910, 9295.1545, 224.071, 664.362)));
                                        if (!donor_replacementGLF_dead10c2) {
                                            ;
                                        }
                                    }
                                    donor_replacementGLF_dead7iteration++;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = vec4(-9.2, 3.4, -77.54, 8680.9584);
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                i++;
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (vec4(0.2, 6.2, -46.32, -61.35) + (true ? _GLF_color : _GLF_color));
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED(all(bvec2(true, false)));
                            int donor_replacementGLF_dead4j = _GLF_FUZZED(N);
                            ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(bitfieldReverse(min(ivec2(65808, -22040), 80396)));
                            do {
                                if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j * 2 + i * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead4p.x = donor_replacementGLF_dead4j * 2;
                                    donor_replacementGLF_dead4p.y = i * 2;
                                    donor_replacementGLF_dead4canwalk = true;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        ;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        discard;
                    } else {
                    }
                }
            }
        } while (i < 10);
    }
    if (_GLF_DEAD(false)) {
        bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED(((153250u % uvec4(74625u, 11060u, 48571u, 84690u)) == uvec4(150206u, 32893u, 3082u, 97487u)));
        int donor_replacementGLF_dead4i = _GLF_FUZZED(N);
        ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(-90838, 36620));
        {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    donor_replacementGLF_dead4canwalk = false;
                }
            }
            int GLF_dead4j = _GLF_FUZZED(-12968);
            for (donor_replacementGLF_dead4i = 0; donor_replacementGLF_dead4i < 8; donor_replacementGLF_dead4i++) {
                for (GLF_dead4j = 0; GLF_dead4j < 8; GLF_dead4j++) {
                    if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j * 2 + donor_replacementGLF_dead4i * 2 * 16, 256)] == 0) {
                        donor_replacementGLF_dead4p.x = GLF_dead4j * 2;
                        donor_replacementGLF_dead4p.y = donor_replacementGLF_dead4i * 2;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            donor_replacementGLF_dead4canwalk = true;
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(inversesqrt(injectionSwitch));
                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(inversesqrt(1.8));
                    for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            GLF_dead4_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                        }
                    }
                }
            }
            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
        }
    }
    for (int j = 0; j < 10; j++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead2color = _GLF_FUZZED((vec2(1.1, -46.28) + (mat3x2(9.4, -5.2, 74.60, 7.2, -1.1, -40.49), vec2(69.36, -53.16))));
            vec3 donor_replacementGLF_dead2vecCoor = _GLF_FUZZED(vec3(-6.1, 8979.2335, -58.08));
            {
                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) + 0)))); _injected_loop_counter++) {
                    donor_replacementGLF_dead2color = fract(acosh(clamp(donor_replacementGLF_dead2vecCoor.yx - trunc(float(GLF_dead2data[3])), 1.0, 1000.0)));
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    donor_replacementGLF_dead2color.x += (isnan(GLF_dead2gl_FragCoord.x) ? log2(GLF_dead2gl_FragCoord.x) : log2(GLF_dead2gl_FragCoord.y));
                } else {
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(-91190, 58207));
                        if (i >= 0 && donor_replacementGLF_dead4p.x > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = GLF_dead0gl_FragCoord;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-3.2, -5.5));
                                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead4_GLF_color);
                                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(determinant(mat2(-4759.0894, 9.8, -161.546, -79.72)));
                                for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                    }
                                }
                            }
                            i--;
                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                            donor_replacementGLF_dead4p.x -= 2;
                        }
                    }
                    _GLF_color = pow(vec4(-548.179, -1.2, 29.19, 191.681), (vec4(-72.44, 0.8, -955.487, 884.739) - 1.5));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } else {
                }
                break;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(injectionSwitch);
            if (abs(donor_replacementGLF_dead10position.y - donor_replacementGLF_dead10position.x) < 0.5) {
                GLF_dead10b_b = clamp(GLF_dead10b_b * 3.0, 0.0, 1.0);
            }
        }
        {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED((mix(ivec2(97656, 82657), ivec2(-49946, 52073), bvec2(true, false)) / ivec2(83159, 86167)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            ;
                        }
                    }
                    if (donor_replacementGLF_dead5p.x < 0) {
                        donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(81360);
                        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead4_GLF_color);
                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(43.50);
                        {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | ((1 << _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), ~(~(int(4)))))) >> _GLF_IDENTITY(int(4), int(4))))); _injected_loop_counter++) {
                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + j, 9)];
                            }
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(9.8, 4.1, 4450.5095, -83.08);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            do {
                                discard;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(floor(injectionSwitch));
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(26511);
                        int donor_replacementGLF_dead8j = _GLF_FUZZED(i);
                        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(injectionSwitch, resolution));
                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(253.136);
                        {
                            donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead8j, 9)];
                        }
                    }
                }
            } else {
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(4.3, 1.3, 6385.9623, 2795.4827);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-49853, -7455));
                    {
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED(true);
                            {
                                for (j = 0; j < 8; j++) {
                                    if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(j * 2 + i * 2 * 16, 256)] == 0) {
                                        donor_replacementGLF_dead3p.x = j * 2;
                                        donor_replacementGLF_dead3p.y = i * 2;
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), ~(~(int(1))))))); _injected_loop_counter--) {
                                            donor_replacementGLF_dead4canwalk = true;
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                            donor_replacementGLF_dead3p.x = -donor_replacementGLF_dead3p.x;
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead11index = _GLF_FUZZED(max(i, GLF_dead0N));
                    {
                        donor_replacementGLF_dead11index = i;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(92241, -40437));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(N);
                            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(cos(determinant(mat2(-87.61, 205.636, 622.213, 8.9))));
                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                GLF_dead2gl_FragCoord += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                            }
                        }
                        i--;
                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 1) * 16, 256)] = 1;
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead10c8 = _GLF_FUZZED(true);
                            vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(resolution);
                            vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vec3(-7.7, -706.419, 40.28));
                            if (!donor_replacementGLF_dead10c8) {
                                ;
                            }
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 2) * 16, 256)] = 1;
                        }
                        donor_replacementGLF_dead4p.y += 2;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = ((mat3x2(3666.7540, -7.6, 9.6, -9835.7040, -5045.9510, 0.5) * (-1.4)), _GLF_outVarBackup_GLF_color);
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(asin(resolution));
                int donor_replacementGLF_dead8j = _GLF_FUZZED(i);
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(-4.1);
                {
                    _GLF_outVarBackup_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + donor_replacementGLF_dead8j, 9)];
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(5464.8362, 629.781, 10.47, -49.41);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED((mix(resolution, resolution, bvec2(false, true)) + vec2(3686.5194, 483.811)));
                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(asinh((vec3(470.253, -0.9, 8.8) * mat3(0.9, -4.8, 7981.9319, -4.9, 6.6, 9.0, 842.240, 764.316, 2.1))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            ;
                        } else {
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
                _GLF_color = vec3(-3040.3059, 9155.4130, -54.02).xxyx;
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c8 = _GLF_FUZZED((bvec2(false, false) != bvec2(true, false)));
                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(((-7026.7864) / resolution));
                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(asin(vec3(-723.336, 4.2, 182.876)));
                        if (!donor_replacementGLF_dead10c8) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } else {
                }
            }
            float donor_replacementGLF_dead0grey = _GLF_FUZZED(84.14);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(acos(injectionSwitch));
                        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                GLF_dead2gl_FragCoord += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead0grey, float(GLF_dead8j - 1) * donor_replacementGLF_dead0grey)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                            }
                        }
                    }
                }
            }
            {
                donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[3]) / 10.0;
            }
        }
        temp[j] = data[j];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            bool donor_replacementGLF_dead10c7 = _GLF_FUZZED(false);
            vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(mix(injectionSwitch, ldexp(vec2(0.6, 6.8), ivec2(-41792, -60034)), (-9.3)));
            vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED((vec3(-48.86, 72.42, 9770.4313) * (-6.4)));
            if (!donor_replacementGLF_dead10c7) {
                ;
            }
        }
    }
    mergeSort();
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (6150.5962 - vec4(-6.9, -10.33, -5.3, 60.19));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    do {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    } while (_GLF_WRAPPED_LOOP(false));
                } else {
                }
            }
        }
        do {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        _GLF_color = vec4(0.6, 4.7, -95.71, -29.84);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(step(-4142.6025, resolution));
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(acos(vec4(94.05, -6.6, -61.53, 181.654)));
            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(0.8);
            for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                }
            }
        }
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(-93341, -2383));
            if (i >= 0 && donor_replacementGLF_dead4p.x > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                    i--;
                } else {
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                } else {
                }
                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                donor_replacementGLF_dead4p.x -= 2;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead0grey = _GLF_FUZZED(0.2);
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c8 = _GLF_FUZZED(false);
                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(tanh(resolution));
                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED((vec3(-1753.2981, -0.5, 67.46) - donor_replacementGLF_dead0grey));
                        if (!donor_replacementGLF_dead10c8) {
                            ;
                        }
                    }
                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(findLSB(uvec2(74726u, 176191u)));
                    if (donor_replacementGLF_dead5p.x < 0) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            donor_replacementGLF_dead5p.y++;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    bool donor_replacementGLF_dead10c8 = _GLF_FUZZED(any(bvec4(true, true, true, true)));
                    vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(dFdyCoarse(resolution));
                    vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vec3(-7.6, 467.682, 1.2));
                    if (!donor_replacementGLF_dead10c8) {
                        ;
                    }
                }
                if (int(GLF_dead0gl_FragCoord[1]) < 60) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(step(-59.36, vec2(-21.06, -888.312)));
                        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(-8235.2679, -9.8, 510.399, 93.18));
                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(donor_replacementGLF_dead0grey);
                        {
                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead8j, 9)];
                            }
                        }
                    }
                    donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[1]) / 10.0;
                } else {
                    if (int(GLF_dead0gl_FragCoord[1]) < 90) {
                        donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[2]) / 10.0;
                    } else {
                        do {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (int(GLF_dead0gl_FragCoord[1]) < 120) {
                                    donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[3]) / 10.0;
                                } else {
                                    if (int(GLF_dead0gl_FragCoord[1]) < 150) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    i = i;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color.rgga;
                                        }
                                        discard;
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-14406, -99400));
                                            while (donor_replacementGLF_dead5p.x > 15) {
                                                donor_replacementGLF_dead5p.x -= 16;
                                            }
                                        }
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        } else {
                                            if (int(GLF_dead0gl_FragCoord[1]) < 180) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = asinh(vec4(69.25, 7.5, 11.94, -4106.1829));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED((clamp(min(uvec4(144266u, 99309u, 78065u, 178531u), uvec4(24168u, 108330u, 61362u, 52577u)), bitfieldExtract(uvec4(177903u, 193637u, 110568u, 163817u), 37771, GLF_dead0N), uvec4(183793u, 44247u, 15683u, 17770u)) == uvec4(182532u, 53980u, 122076u, 89738u)));
                                                            int donor_replacementGLF_dead4j = _GLF_FUZZED((+(-GLF_dead0N)));
                                                            ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(-80748, 89513));
                                                            {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                }
                                                                do {
                                                                    if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j * 2 + i * 2 * 16, 256)] == 0) {
                                                                        donor_replacementGLF_dead4p.x = donor_replacementGLF_dead4j * 2;
                                                                        donor_replacementGLF_dead4p.y = i * 2;
                                                                        donor_replacementGLF_dead4canwalk = true;
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            }
                                                        }
                                                    }
                                                }
                                                do {
                                                    donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[5]) / 10.0;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            } else {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = vec4(3237.3605, -879.522, 721.623, -7400.8481);
                                                    } else {
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(log(1.0), 0.0, 0.0, 0.0)))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (int(GLF_dead0gl_FragCoord[1]) < 210) {
                                                    donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[6]) / 10.0;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                } else {
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0, 0.0, sqrt(1.0), 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                                    } else {
                                                        if (int(GLF_dead0gl_FragCoord[1]) < 240) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                                                                    donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[7]) / 10.0;
                                                                    if (_GLF_DEAD(false)) {
                                                                        vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(vec2(-9.5, 8.1));
                                                                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(sqrt(vec3(-6114.1727, -6.2, -5.9)));
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                            } else {
                                                            }
                                                        } else {
                                                            if (int(GLF_dead0gl_FragCoord[1]) < 270) {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    donor_replacementGLF_dead0grey = 0.5 + float(GLF_dead0data[8]) / 10.0;
                                                                } else {
                                                                }
                                                            } else {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-979.758, -63.21, -10.04, -2.7);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                discard;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = sinh(vec4(donor_replacementGLF_dead0grey, 0.9, 6458.4940, donor_replacementGLF_dead0grey));
                                        }
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(true, true, true, true))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = vec4(-395.523, 0.5, -3965.9865, 0.9);
    }
    mat3 pos = mat3(vec3(4, 0, int(injectionSwitch.y)) * ldexp(0.5, 2), vec3(0, -5, int(injectionSwitch.y)) * ldexp(0.2, 5), vec3(1, 8, int(injectionSwitch.y)) * ldexp(injectionSwitch.y, 0));
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdxCoarse(vec4(-8.5, -91.85, -6083.2878, 1694.7245));
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    vec3 vecCoor = roundEven(pos * vec3(gl_FragCoord.xx / resolution.yx, 1));
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead7c_im = _GLF_FUZZED(-2.3);
        float donor_replacementGLF_dead7c_re = _GLF_FUZZED(348.498);
        float donor_replacementGLF_dead7x = _GLF_FUZZED(length(GLF_dead0gl_FragCoord));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-0.6, 8.0));
            int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_dead0N);
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead0gl_FragCoord);
            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(reflect(donor_replacementGLF_dead7c_re, -3.4));
            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                }
            }
        }
        float donor_replacementGLF_dead7y = _GLF_FUZZED(-649.538);
        for (int GLF_dead7k = 0; GLF_dead7k < 1000; GLF_dead7k++) {
            if (donor_replacementGLF_dead7x * donor_replacementGLF_dead7x + donor_replacementGLF_dead7y * donor_replacementGLF_dead7y > 4.0) {
                break;
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = (1 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | (0 | 0))); _injected_loop_counter--) {
                        _GLF_color = (mod(_GLF_color, donor_replacementGLF_dead7y) * donor_replacementGLF_dead7x);
                    }
                }
            }
            float GLF_dead7x_new = donor_replacementGLF_dead7x * donor_replacementGLF_dead7x - donor_replacementGLF_dead7y * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_re;
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(cosh(injectionSwitch));
                int donor_replacementGLF_dead8i = _GLF_FUZZED(N);
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(_GLF_color);
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(donor_replacementGLF_dead7y);
                {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                    }
                }
            }
            donor_replacementGLF_dead7y = 2.0 * donor_replacementGLF_dead7x * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_im;
            donor_replacementGLF_dead7x = GLF_dead7x_new;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
                int donor_replacementGLF_dead8i = _GLF_FUZZED(bitfieldReverse(-56684));
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(clamp(GLF_dead4_GLF_color, vec4(-8839.9088, 72.96, -3375.3607, -70.64), _GLF_color));
                {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead7c_im, float(GLF_dead8j - 1) * donor_replacementGLF_dead7c_im)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                    }
                }
            }
            i++;
        }
    }
    for (int _injected_loop_counter = (0 & N); _GLF_WRAPPED_LOOP(_injected_loop_counter < (((1 & 1) << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 ^ (int(6)))))); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = GLF_dead4_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead10center = _GLF_FUZZED(resolution);
        vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(resolution);
        vec3 donor_replacementGLF_dead10result = _GLF_FUZZED((vec3(-5.3, -4836.8634, -6.0) - 50.86));
        for (int GLF_dead10i = 35; GLF_dead10i >= 0; GLF_dead10i--) {
            vec3 GLF_dead10d = _GLF_FUZZED(pow(uintBitsToFloat(uvec3(18976u, 7162u, 49682u)), vec3(-7.8, 221.430, 46.49)));
            GLF_dead10d = GLF_dead10drawShape(donor_replacementGLF_dead10position, donor_replacementGLF_dead10center + vec2(sin(float(GLF_dead10i) / 10.0 + GLF_dead10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead10i) / 100.0), 0.01, float(GLF_dead10i)));
            if (length(GLF_dead10d) <= 0.0) {
                continue;
            }
            donor_replacementGLF_dead10result = vec3(GLF_dead10d);
        }
    }
    vec2 color;
    do {
        if (_GLF_DEAD(false)) {
            _GLF_color = sign(vec4(-4.8, 5.0, -7.3, 1823.8314));
        }
        if (int(gl_FragCoord[1]) < 30) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED(findLSB(GLF_dead0N));
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(degrees(GLF_dead2gl_FragCoord));
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(exp(2963.1240));
                {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, color + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                            }
                        }
                    }
                }
            }
            color = fract(sin(vecCoor.yx - trunc(float(data[0]))));
            color[0] = dFdy(gl_FragCoord.y);
            break;
        } else if (int(gl_FragCoord[1]) < 60) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                color = fract(sin(vecCoor.yx - trunc(float(data[1]))));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead11index = _GLF_FUZZED(N);
                    int donor_replacementGLF_dead11j = _GLF_FUZZED(N);
                    {
                        donor_replacementGLF_dead11index = donor_replacementGLF_dead11j;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = faceforward(roundEven(GLF_dead2gl_FragCoord), GLF_dead0gl_FragCoord, GLF_dead2gl_FragCoord);
                }
            }
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead10c3 = _GLF_FUZZED((resolution.gg != dFdyFine(color)));
                if (!donor_replacementGLF_dead10c3) {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead3i = _GLF_FUZZED(-82852);
                ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-12721, -42378));
                for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < 100; donor_replacementGLF_dead3i++) {
                    donor_replacementGLF_dead3p = GLF_dead3iter(donor_replacementGLF_dead3p);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mix(vec4(14.54, -5.4, 9.0, -4824.5172), vec4(9.4, -2.2, -0.2, 1977.2293), bvec4(false, false, false, false));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8i = _GLF_FUZZED((75863 ^ (-12797)));
                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(-7178.1480);
                    {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            GLF_dead4_GLF_color += texture(GLF_dead8tex, color + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(int((false ? 146467u : 190424u)));
                        int donor_replacementGLF_dead8j = _GLF_FUZZED((findLSB(48058u) * ((-50039) & N)));
                        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(sin(vec4(-9.2, -1.4, 6.1, -5023.1740)));
                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(2.3);
                        {
                            do {
                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead8j, 9)];
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-874.220, 9158.8226));
                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(determinant(mat2(-4.1, -8.8, -996.551, 767.664)));
                    do {
                        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                GLF_dead0gl_FragCoord += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))));
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c5 = _GLF_FUZZED(true);
                        if (!donor_replacementGLF_dead10c5) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                ;
                            }
                        }
                    }
                    _GLF_color = GLF_dead4_GLF_color;
                }
            }
            color[1] *= atan(faceforward(injectionSwitch, color.xx, vecCoor.yx).y);
            break;
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(resolution);
                {
                    ;
                }
            }
            if (int(gl_FragCoord[1]) < 90) {
                color = fract(sin(vecCoor.yx - trunc(float(data[2]))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = clamp(GLF_dead4_GLF_color, -0.7, 1006.2895);
                }
                color.x += atanh(color.x) * cosh(injectionSwitch.y) * smoothstep(color, injectionSwitch, gl_FragCoord.yy).x;
                break;
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED(true);
                    int donor_replacementGLF_dead4i = _GLF_FUZZED(bitfieldExtract(N, -24075, GLF_dead0N));
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    _GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(-35433));
                    ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(11939, -97742));
                    if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_5.donor_replacementGLF_dead4j * 2 + donor_replacementGLF_dead4i * 2 * 16, 256)] == 0) {
                        donor_replacementGLF_dead4p.x = _GLF_struct_replacement_5.donor_replacementGLF_dead4j * 2;
                        donor_replacementGLF_dead4p.y = donor_replacementGLF_dead4i * 2;
                        donor_replacementGLF_dead4canwalk = true;
                    }
                }
                {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(53236, -47057));
                            do {
                                if (donor_replacementGLF_dead5p.x < 0) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))), 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))), 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = GLF_dead4_GLF_color;
                                            } else {
                                            }
                                        }
                                    } else {
                                    }
                                    donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } else {
                    }
                    _GLF_color = vec4(0.5, 9.8, -8.6, -4.9);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead0high = _GLF_FUZZED(i);
                            int donor_replacementGLF_dead0low = _GLF_FUZZED(N);
                            do {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                for (int GLF_dead0i = donor_replacementGLF_dead0low; GLF_dead0i < donor_replacementGLF_dead0high; GLF_dead0i += 2 * i) {
                                    int GLF_dead0from = GLF_dead0i;
                                    int GLF_dead0mid = GLF_dead0i + i - 1;
                                    int GLF_dead0to = min(GLF_dead0i + 2 * i - 1, donor_replacementGLF_dead0high);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        GLF_dead0merge(GLF_dead0from, GLF_dead0mid, GLF_dead0to);
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(unpackHalf2x16(138266u));
                                            int donor_replacementGLF_dead8i = _GLF_FUZZED((ivec2(-91787, 94327) / ivec2(-11841, -27087))[1]);
                                            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(abs(_GLF_outVarBackup_GLF_color));
                                            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(dFdxCoarse(48.83));
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                            }
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = smoothstep((vec4(328.987, 7.4, -100.895, -0.9) / vec4(365.022, -84.44, 6.8, 36.94)), vec4(2.6, 7.2, -1.8, 5787.1494), vec4(-8924.8352, 2736.6133, -414.888, -4.6));
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead11j = _GLF_FUZZED(i);
                                        {
                                            i = donor_replacementGLF_dead11j;
                                        }
                                    }
                                    continue;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(color);
                                    vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(mod(GLF_dead4_GLF_color, 4.1));
                                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(degrees(2.4));
                                    for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                            donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (GLF_dead2gl_FragCoord * (-40.40));
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-672.373, 1674.6657));
                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(269.352);
                        {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                    _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead8j, 9)];
                                }
                            }
                        }
                    }
                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(15387, 18520));
                    if (donor_replacementGLF_dead5p.x < 0) {
                        donor_replacementGLF_dead5p.y++;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(mix(injectionSwitch, reflect(injectionSwitch, color), ((-3.2) * resolution)));
                    int donor_replacementGLF_dead8i = _GLF_FUZZED((i | findLSB(-21590)));
                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(refract(9.2, -2250.7619, -843.883));
                    {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            GLF_dead4_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                    _GLF_color = vec4(717.366, 6680.4758, 7610.0926, -8.1);
                }
                if (int(gl_FragCoord[1]) < 120) {
                    do {
                        color = fract(acosh(clamp(vecCoor.yx - trunc(float(data[3])), 1.0, 1000.0)));
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-65777, 90571));
                            while (donor_replacementGLF_dead5p.x > 15) {
                                donor_replacementGLF_dead5p.x -= 16;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = (GLF_dead0gl_FragCoord + vec4(7.6, 8662.4469, -2626.2428, 7.8));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(resolution);
                                vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(reflect(vecCoor, vec3(6902.2548, 245.933, 3.6)));
                                {
                                    ;
                                }
                            }
                            _GLF_color = _GLF_color;
                        }
                        _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, _GLF_struct_1(vec4(1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_2(vec3(1.0, 1.0, 1.0), ivec2(1, 1), mat2(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), uvec2(1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec2(1.0, 1.0), uvec3(1u, 1u, 1u), ivec3(1, 1, 1));
                        _GLF_struct_replacement_0._f2._f2._GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(-27461, 93686));
                                _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(_GLF_struct_7(_GLF_struct_8(1, ivec3(1, 1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_9(uvec3(1u, 1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_10(_GLF_struct_11(1.0, uvec4(1u, 1u, 1u, 1u), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), 1, _GLF_struct_12(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), 1), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_13(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), _GLF_struct_14(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((mat3x2(-18.84, 784.870, 0.3, 1.5, -4.6, -1.7), GLF_dead0N)), uvec4(1u, 1u, 1u, 1u), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                                {
                                    int GLF_dead4d = _GLF_struct_replacement_6._f3._f3.donor_replacementGLF_dead4v % i;
                                    _GLF_struct_replacement_6._f3._f3.donor_replacementGLF_dead4v += i;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED((421.098 * dFdx(injectionSwitch)));
                                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(acos(-996.228));
                                        {
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead4d - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4d * 3 + GLF_dead8j, 9)];
                                            }
                                        }
                                    }
                                    if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.x > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                                        GLF_dead4d--;
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(-3.9, -23.31, -491.328, -1.0);
                                        }
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x - 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                        donor_replacementGLF_dead4p.x -= 2;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.y > 0 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 2) * 16, 256)] == 0) {
                                            GLF_dead4d--;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 1) * 16, 256)] = 1;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y - 2) * 16, 256)] = 1;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                int donor_replacementGLF_dead8i = _GLF_FUZZED(findMSB(N));
                                                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead4_GLF_color);
                                                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(fwidth(2.7));
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, color + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead4p.y -= 2;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec2 donor_replacementGLF_dead10position = _GLF_FUZZED(color);
                                            for (int GLF_dead10i = 35; GLF_dead10i >= 0; GLF_dead10i--) {
                                                vec3 GLF_dead10d = _GLF_FUZZED(pow(uintBitsToFloat(uvec3(18976u, 7162u, 49682u)), vec3(-7.8, 221.430, 46.49)));
                                                GLF_dead10d = GLF_dead10drawShape(donor_replacementGLF_dead10position, color + vec2(sin(float(GLF_dead10i) / 10.0 + GLF_dead10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead10i) / 100.0), 0.01, float(GLF_dead10i)));
                                                if (length(GLF_dead10d) <= 0.0) {
                                                    continue;
                                                }
                                                vecCoor = vec3(GLF_dead10d);
                                            }
                                        }
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_dead4_GLF_color;
                                            }
                                        }
                                        if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.x < 14 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] == 0) {
                                            GLF_dead4d--;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = atanh(GLF_dead0gl_FragCoord);
                                            }
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 1) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x + 2) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead4p.x += 2;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (GLF_dead4d >= 0 && donor_replacementGLF_dead4p.y < 14 && GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 2) * 16, 256)] == 0) {
                                            GLF_dead4d--;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y) * 16, 256)] = 1;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 1) * 16, 256)] = 1;
                                            GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead4p.x) + (donor_replacementGLF_dead4p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead4p.y += 2;
                                        }
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(length(vec2(0.0, 0.0))))))) {
                                            _GLF_color = vecCoor.zxxx;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                                        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(mod(smoothstep(-81.60, -0.2, GLF_dead2gl_FragCoord), GLF_dead0gl_FragCoord));
                                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(acosh(749.013));
                                        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        _GLF_color = tan(vec4(7.1, -188.176, -5.1, -2.9));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-31315, -71313));
                            {
                                donor_replacementGLF_dead3p = GLF_dead3iter(donor_replacementGLF_dead3p);
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_struct_replacement_0._f2._f2._GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (GLF_dead0gl_FragCoord - GLF_dead4_GLF_color);
                        }
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(90171, 51585));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            bool donor_replacementGLF_dead10c8 = _GLF_FUZZED(false);
                            vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vecCoor);
                            if (!donor_replacementGLF_dead10c8) {
                                ;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            donor_replacementGLF_dead5p.y--;
                            if (_GLF_DEAD(false)) {
                                {
                                    continue;
                                }
                            }
                        } else {
                        }
                    }
                    color.x += (isnan(gl_FragCoord.x) ? log2(gl_FragCoord.x) : log2(gl_FragCoord.y));
                    do {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sqrt(vec4(7.3, 9.9, 8.6, -8.4));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    break;
                } else if (int(gl_FragCoord[1]) < 150) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-1983, -42311));
                            for (i = 0; i < 100; i++) {
                                donor_replacementGLF_dead5p = GLF_dead5iter(donor_replacementGLF_dead5p);
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead2gl_FragCoord;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                {
                                    break;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(bitfieldInsert(ivec2(-23954, -55644), ivec2(51109, 26280), (true ? N : GLF_dead0N), (N | GLF_dead0N)));
                                    if (donor_replacementGLF_dead5p.x < 0) {
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED((vec3(-6.7, 55.05, 9.5) * (-4915.9845)).yz);
                                            int donor_replacementGLF_dead8i = _GLF_FUZZED((N ^ ((-13750) / i)));
                                            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(refract(vec4(60.50, -2261.0211, -0.6, 2.6), GLF_dead2gl_FragCoord, 2527.7019));
                                            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(5.4);
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                            }
                                        }
                                        donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                                    }
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-2.0, -33.26, -4.8, -8593.4623);
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        _GLF_color = min(vec4(-3.7, 98.38, 5632.2184, -6.0), float(182198u));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    discard;
                } else if (int(gl_FragCoord[1]) < 180) {
                    color = fract(sin(vecCoor.yx - trunc(float(data[4]))));
                    color[1] += asinh(gl_FragCoord.y * ldexp(color.y, -i));
                    break;
                } else if (int(gl_FragCoord[1]) < 210) {
                    color = fract(sin(vecCoor.yx - trunc(float(data[5]))));
                    color.y -= tanh(color.x) / cosh(color.y);
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    continue;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec3 donor_replacementGLF_dead10result = _GLF_FUZZED((vec3(-0.1, 42.67, -9.9) + (-326.644)));
                                for (int GLF_dead10i = 35; GLF_dead10i >= 0; GLF_dead10i--) {
                                    vec3 GLF_dead10d = _GLF_FUZZED(pow(uintBitsToFloat(uvec3(18976u, 7162u, 49682u)), vec3(-7.8, 221.430, 46.49)));
                                    GLF_dead10d = GLF_dead10drawShape(color, color + vec2(sin(float(GLF_dead10i) / 10.0 + GLF_dead10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead10i) / 100.0), 0.01, float(GLF_dead10i)));
                                    if (length(GLF_dead10d) <= 0.0) {
                                        continue;
                                    }
                                    donor_replacementGLF_dead10result = vec3(GLF_dead10d);
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-149.924, -40.09, 3.2, 2353.0681);
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-14152, 93285));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        donor_replacementGLF_dead5p.x -= 16;
                                    } else {
                                    }
                                }
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = ((+(false ? 91875 : N)) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead5i = _GLF_FUZZED(int(false));
                                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(34311, -16906));
                                    for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < 100; donor_replacementGLF_dead5i++) {
                                        donor_replacementGLF_dead5p = GLF_dead5iter(donor_replacementGLF_dead5p);
                                    }
                                }
                                _GLF_color = vec4(5.4, 87.59, 69.15, 8.0);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                                    do {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                _GLF_color = (mat2x4(4.7, -647.483, -8.1, 8487.3763, -2472.9939, -0.3, -0.2, -4.3) * vec2(-12.42, 88.08));
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(mix(vec2(7878.2988, 3.8), injectionSwitch, color));
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    ;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = log2(_GLF_color);
                    }
                    break;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(485.909, 9281.4611, -7298.3884, 9.2);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                            ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(-57539, -89952));
                            if (donor_replacementGLF_dead3p.x < 0) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat4(33.40, -4.8, -6.6, -2673.8303, 4531.0469, -419.633, 58.39, 1.8, -1.4, 0.7, -1.8, 1207.3809, 12.35, -4.8, -185.506, 89.49) * vec4(-3.2, 7860.3899, -638.577, 5.7));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            bool donor_replacementGLF_dead10c8 = _GLF_FUZZED(false);
                                            vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(vec2(75.50, 8.8));
                                            vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(((-73.59) + vec3(381.491, -6634.4078, -881.366)));
                                            if (!donor_replacementGLF_dead10c8) {
                                                ;
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                donor_replacementGLF_dead3p.x = -donor_replacementGLF_dead3p.x;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_dead0N);
                                        int donor_replacementGLF_dead8j = _GLF_FUZZED(N);
                                        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(atan(238.335, 12.24));
                                        {
                                            _GLF_outVarBackup_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead8j, 9)];
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(ivec3(495, -26448, -29881)[0]);
                                    vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead2gl_FragCoord);
                                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(round(-8.5));
                                    {
                                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                            donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = cosh((984.024 - _GLF_color));
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(vec2(-860.682, 4648.1694), 3.6, 8372.3461);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                do {
                                    do {
                                        _GLF_color = vec4(exp2(dFdyFine(vec2(51.28, 7.7))), vec2(9.8, -0.5));
                                    } while (_GLF_WRAPPED_LOOP(false));
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(0.0))))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(46110, 19874));
                                            {
                                                donor_replacementGLF_dead5p.y++;
                                            }
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            } else {
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead10setting = _GLF_FUZZED(vec3(-33.47, 5.2, 22.66));
                                        {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_color;
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    ;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    }
                    do {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fract(vec4(-6177.0979, -9593.0672, 73.72, -560.203));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(findLSB(uvec2(70836u, 21683u)));
                            if (donor_replacementGLF_dead5p.x < 0) {
                                donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-5.3, -5.5));
                                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead0gl_FragCoord);
                                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(-158.781);
                                for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(GLF_dead0N));
                                {
                                    donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } else if (int(gl_FragCoord[1]) < 240) {
                    color = fract(asinh(vecCoor.yx - trunc(float(data[6]))));
                    color.y -= isnan(float(i)) ? tanh(gl_FragCoord.x) : atanh(gl_FragCoord.y / resolution.y);
                    break;
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-27060, 3273));
                            {
                                donor_replacementGLF_dead5p.x = -donor_replacementGLF_dead5p.x;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    int donor_replacementGLF_dead8j = _GLF_FUZZED(-53284);
                                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED((-8.7));
                                    {
                                        GLF_dead2gl_FragCoord += texture(GLF_dead8tex, color + vec2(float(i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + donor_replacementGLF_dead8j, 9)];
                                    }
                                }
                            }
                        }
                        int donor_replacementGLF_dead0i = _GLF_FUZZED(i);
                        {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true && (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                                if (GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 10)] < GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)]) {
                                    if (_GLF_DEAD(false)) {
                                        bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(false);
                                        if (!donor_replacementGLF_dead10c1) {
                                            ;
                                        }
                                    }
                                    GLF_dead0temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i++, 10)];
                                } else {
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        GLF_dead0temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead0data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)];
                                    }
                                }
                            } else {
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c1 = _GLF_FUZZED((uvec4(163699u, 30875u, 6743u, 10249u) == uvec4(uvec2(142379u, 194150u), 56546u, 139613u)));
                        if (!donor_replacementGLF_dead10c1) {
                            ;
                        }
                    }
                    if (int(gl_FragCoord[1]) < 270) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead7iteration = _GLF_FUZZED((~GLF_dead0N));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (length(vecCoor) <= 0.0) {
                                        continue;
                                    }
                                }
                                {
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) | (int(2))))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(int(2), int(2))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead0gl_FragCoord;
                                        }
                                    }
                                }
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                _GLF_color = vec4(-7.8, 9398.3252, -42.30, -915.120);
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(8.8, -847.539));
                                    vec4 donor_replacementGLF_dead8res = _GLF_FUZZED((_GLF_outVarBackup_GLF_color + GLF_dead2gl_FragCoord));
                                    float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(73.88);
                                    for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        color = fract(sin(vecCoor.yx - trunc(float(data[7]))));
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        } else {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(152.428, -9.2, -256.662, -6775.1541);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        color.y *= mix(normalize(vecCoor), normalize(vec3(color, degrees(color.x))), injectionSwitch.x).y;
                        if (_GLF_DEAD(false)) {
                            if (i < int(GLF_dead9gl_FragCoord.x)) {
                                break;
                            }
                        }
                        break;
                    } else {
                        discard;
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead7xCoord = _GLF_FUZZED((bvec2(true, false), 55.28));
            float donor_replacementGLF_dead7yCoord = _GLF_FUZZED(8.0);
            if (i < 1000) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    ;
                } else {
                }
            } else {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    ;
                } else {
                }
            }
        }
    } while (0 == int(injectionSwitch.x));
    _GLF_color = vec4(vec3(color, trunc(injectionSwitch.y)), injectionSwitch.y);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            _GLF_color = GLF_dead2gl_FragCoord;
        }
    }
}
