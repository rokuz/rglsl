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
vec4 GLF_live13gl_FragCoord = _GLF_FUZZED(vec4(-559.089, 5714.3579, -87.47, -559.195));

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_live13injectionSwitch;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live13resolution;
};

const int GLF_live13N = 10;
int GLF_live13data[10] = int[10](_GLF_FUZZED(-84298), _GLF_FUZZED(39405), _GLF_FUZZED(-85031), _GLF_FUZZED(-25600), _GLF_FUZZED((ivec2(26482, 50309) - (-6049)).s), _GLF_FUZZED(-90182), _GLF_FUZZED(((-13655) & (82449 + (-6315)))), _GLF_FUZZED(ivec2(-6101, 77106).g), _GLF_FUZZED(((-56300) ^ (-66037))), _GLF_FUZZED(-12043)), GLF_live13temp[10] = int[10](_GLF_FUZZED(-743), _GLF_FUZZED(67746), _GLF_FUZZED(-40646), _GLF_FUZZED(64876), _GLF_FUZZED(-11580), _GLF_FUZZED((-(-73806))), _GLF_FUZZED(-45133), _GLF_FUZZED(-44867), _GLF_FUZZED(70048), _GLF_FUZZED(((-228) | 77843)));

void GLF_live13merge(int GLF_live13from, int GLF_live13mid, int GLF_live13to) {
    int GLF_live13k = GLF_live13from, GLF_live13i = GLF_live13from, GLF_live13j = GLF_live13mid + 1;
    {
        int GLF_live13looplimiter0 = 0;
        while (GLF_live13i <= GLF_live13mid && GLF_live13j <= GLF_live13to) {
            if (GLF_live13looplimiter0 >= 6) {
                break;
            }
            GLF_live13looplimiter0++;
            {
                if (GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] < GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)]) {
                    GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
                } else {
                    GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live13looplimiter1 = 0;
        while (GLF_live13i < GLF_live13N && GLF_live13i <= GLF_live13mid) {
            if (GLF_live13looplimiter1 >= 6) {
                break;
            }
            GLF_live13looplimiter1++;
            {
                GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
            }
        }
    }
    {
        int GLF_live13looplimiter2 = 0;
        for (int GLF_live13i = GLF_live13from; GLF_live13i <= GLF_live13to; GLF_live13i++) {
            if (GLF_live13looplimiter2 >= 6) {
                break;
            }
            GLF_live13looplimiter2++;
            {
                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)];
            }
        }
    }
}

int GLF_live8msb8 = 256;

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_live10time;
};

float GLF_live10h_r = _GLF_FUZZED(float(false));
float GLF_live10s_g = _GLF_FUZZED(((-68.72) - vec3(-883.566, -3.5, 183.291).z));
float GLF_live10b_b = _GLF_FUZZED(-7.2);

void GLF_live10doConvert() {
    vec3 GLF_live10temp = _GLF_FUZZED(fwidthCoarse(vec3(-908.344, 3.4, -6886.3202)));
    GLF_live10temp = GLF_live10b_b * (1.0 - GLF_live10s_g) + (GLF_live10b_b - GLF_live10b_b * (1.0 - GLF_live10s_g)) * clamp(abs(abs(6.0 * (GLF_live10h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_live10h_r = GLF_live10temp.x;
    GLF_live10s_g = GLF_live10temp.y;
    GLF_live10b_b = GLF_live10temp.z;
}

vec3 GLF_live10computeColor(float GLF_live10c, vec2 GLF_live10position) {
    GLF_live10h_r = fract(GLF_live10c);
    GLF_live10s_g = 1.0;
    GLF_live10b_b = (0.5 + (sin(GLF_live10time) * 0.5 + 0.5));
    GLF_live10doConvert();
    GLF_live10s_g *= 1.0 / GLF_live10position.y;
    GLF_live10h_r *= 1.0 / GLF_live10position.x;
    if (abs(GLF_live10position.y - GLF_live10position.x) < 0.5) {
        GLF_live10b_b = clamp(GLF_live10b_b * 3.0, 0.0, 1.0);
    }
    return vec3(GLF_live10h_r, GLF_live10s_g, GLF_live10b_b);
}

vec3 GLF_live10defaultColor() {
    return vec3(0.0);
}

vec3 GLF_live10drawShape(vec2 GLF_live10pos, vec2 GLF_live10square, vec3 GLF_live10setting) {
    bool GLF_live10c1 = GLF_live10pos.x - GLF_live10setting.x < GLF_live10square.x;
    if (!GLF_live10c1) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c2 = GLF_live10pos.x + GLF_live10setting.x > GLF_live10square.x;
    if (!GLF_live10c2) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c3 = GLF_live10pos.y - GLF_live10setting.x < GLF_live10square.y;
    if (!GLF_live10c3) {
        return GLF_live10defaultColor();
    }
    bool GLF_live10c4 = GLF_live10pos.y + GLF_live10setting.x > GLF_live10square.y;
    {
        int GLF_live11i = _GLF_FUZZED((-6563));
        float GLF_live11ref = _GLF_FUZZED((((-0.9) + (-19.55))));
        float GLF_live11s = _GLF_FUZZED(-2043.7209);
        if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
            GLF_live11s += 0.2;
        }
    }
    if (!GLF_live10c4) {
        return GLF_live10defaultColor();
        {
            float GLF_live12result = _GLF_FUZZED((3208.6537 * 0.9));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                ;
            } else {
            }
        }
    }
    bool GLF_live10c5 = GLF_live10pos.x - (GLF_live10setting.x - GLF_live10setting.y) < GLF_live10square.x;
    if (!GLF_live10c5) {
        return GLF_live10computeColor(GLF_live10setting.z / 40.0, GLF_live10pos);
    }
    bool GLF_live10c6 = GLF_live10pos.x + (GLF_live10setting.x - GLF_live10setting.y) > GLF_live10square.x;
    if (!GLF_live10c6) {
        return GLF_live10computeColor(GLF_live10setting.z / 40.0, GLF_live10pos);
    }
    bool GLF_live10c7 = GLF_live10pos.y - (GLF_live10setting.x - GLF_live10setting.y) < GLF_live10square.y;
    if (!GLF_live10c7) {
        return GLF_live10computeColor(GLF_live10setting.z / 40.0, GLF_live10pos);
        {
            {
                ;
            }
        }
    }
    bool GLF_live10c8 = GLF_live10pos.y + (GLF_live10setting.x - GLF_live10setting.y) > GLF_live10square.y;
    if (!GLF_live10c8) {
        return GLF_live10computeColor(GLF_live10setting.z / 40.0, GLF_live10pos);
    }
    return GLF_live10defaultColor();
}

struct GLF_live9QuicksortObject {
    int numbers[10];
};

GLF_live9QuicksortObject GLF_live9obj = GLF_live9QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live9swap(int GLF_live9i, int GLF_live9j) {
    int GLF_live9temp = GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)];
    GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] = GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)];
    GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] = GLF_live9temp;
}

vec4 GLF_live7gl_FragCoord = _GLF_FUZZED(vec4(821.115, -7758.8151, -9.0, 9028.6838));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live7injectionSwitch;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live7resolution;
};

const int GLF_live7N = 10;
int GLF_live7data[10] = int[10](_GLF_FUZZED(int((vec4(3.2, 267.424, 992.968, -4.4) == vec4(-87.87, -8.5, 40.89, -9.0)))), _GLF_FUZZED(52930), _GLF_FUZZED(((-57610) * (-95435))), _GLF_FUZZED(47411), _GLF_FUZZED((21761)), _GLF_FUZZED(73412), _GLF_FUZZED(94725), _GLF_FUZZED(34207), _GLF_FUZZED(int(false)), _GLF_FUZZED(35976)), GLF_live7temp[10] = int[10](_GLF_FUZZED((3830 | (-84446))), _GLF_FUZZED(ivec4(12988, -43026, -78842, 41886).y), _GLF_FUZZED((92174 ^ 59979)), _GLF_FUZZED(-96228), _GLF_FUZZED((ivec4(-79555, -11152, 72625, -32512) - ivec4(67489, -74526, -32643, -41485)).g), _GLF_FUZZED(64434), _GLF_FUZZED(-98206), _GLF_FUZZED((+(-63311))), _GLF_FUZZED(-27706), _GLF_FUZZED(int((3293u & uint(true)))));

void GLF_live7merge(int GLF_live7from, int GLF_live7mid, int GLF_live7to) {
    int GLF_live7k = GLF_live7from, GLF_live7i = GLF_live7from, GLF_live7j = GLF_live7mid + 1;
    {
        int GLF_live7looplimiter0 = 0;
        {
            int GLF_live12i = _GLF_FUZZED((-(-12084)));
            float GLF_live12result = _GLF_FUZZED(8.7);
            float GLF_live12thirty_two = _GLF_FUZZED(75.74);
            if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                GLF_live12result += 100.0;
            }
        }
        while (GLF_live7i <= GLF_live7mid && GLF_live7j <= GLF_live7to) {
            for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (GLF_live7looplimiter0 >= 6) {
                break;
            }
            GLF_live7looplimiter0++;
            {
                if (GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] < GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j, 10)]) {
                    GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i++, 10)];
                    {
                        vec4 GLF_live11c = _GLF_FUZZED(vec4(7.6, 19.39, 2369.2053, -53.40));
                        int GLF_live11i = _GLF_FUZZED(11424);
                        int GLF_live11looplimiter1 = 0;
                        {
                            if (GLF_live11looplimiter1 >= 4) {
                                ;
                            }
                            GLF_live11looplimiter1++;
                            {
                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                }
                            }
                        }
                    }
                } else {
                    GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j++, 10)];
                }
                {
                    int GLF_live8i = _GLF_FUZZED(-27812);
                    float GLF_live8limit = _GLF_FUZZED(-45.57);
                    float GLF_live8ref = _GLF_FUZZED(vec3((794.291 * 6410.2119), vec2(-9490.8802, 150.315)).p);
                    float GLF_live8s = _GLF_FUZZED(83.77);
                    {
                        int GLF_live8looplimiter0 = 0;
                        while (GLF_live8i < bitfieldInsert(800, GLF_live8i, 0, 0)) {
                            if (GLF_live8looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live8looplimiter0++;
                            {
                                if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                                    GLF_live8s += 0.2;
                                }
                                if (float(GLF_live8i) >= GLF_live8limit) {
                                    ;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                                {
                                    int GLF_live11i = _GLF_FUZZED(-93525);
                                    float GLF_live11ref = _GLF_FUZZED(float(97541));
                                    float GLF_live11s = _GLF_FUZZED(((-512.087) + (-7.3)));
                                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                        GLF_live11s += 0.2;
                                    }
                                }
                                GLF_live8i++;
                                {
                                    int GLF_live12looplimiter1 = 0;
                                    if (GLF_live12looplimiter1 >= 5) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                discard;
            }
        }
    }
    {
        if (_GLF_DEAD(false)) {
            return;
        }
        int GLF_live7looplimiter1 = 0;
        while (GLF_live7i < GLF_live7N && GLF_live7i <= GLF_live7mid) {
            if (GLF_live7looplimiter1 >= 6) {
                break;
            }
            GLF_live7looplimiter1++;
            {
                GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i++, 10)];
            }
        }
    }
    {
        int GLF_live7looplimiter2 = 0;
        for (int GLF_live7i = GLF_live7from; GLF_live7i <= GLF_live7to; GLF_live7i++) {
            if (GLF_live7looplimiter2 >= 6) {
                break;
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                GLF_live7looplimiter2++;
            }
            {
                GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] = GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)];
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
}

layout(set = 0, binding = 6) uniform sampler2D GLF_live5tex;

struct GLF_live3QuicksortObject {
    int numbers[10];
};

GLF_live3QuicksortObject GLF_live3obj = GLF_live3QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live3swap(int GLF_live3i, int GLF_live3j) {
    int GLF_live3temp = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)];
    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)];
    {
        int GLF_live4i = _GLF_FUZZED(-14415);
        float GLF_live4result = _GLF_FUZZED((false ? 6976.8533 : 3430.8100));
        float GLF_live4thirty_two = _GLF_FUZZED(-393.306);
        if (mod(float(GLF_live4i), round(GLF_live4thirty_two)) <= 0.01) {
            GLF_live4result += 100.0;
        }
    }
    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)] = GLF_live3temp;
    {
        int GLF_live13i = _GLF_FUZZED(int(false));
        int GLF_live13k = _GLF_FUZZED(23888);
        int GLF_live13looplimiter1 = 0;
        int GLF_live13mid = _GLF_FUZZED(-60610);
        while (GLF_live13i < GLF_live13N && GLF_live13i <= GLF_live13mid) {
            if (GLF_live13looplimiter1 >= 6) {
                break;
            }
            GLF_live13looplimiter1++;
            {
                GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
            }
        }
    }
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    {
        {
            float GLF_live12result = _GLF_FUZZED(float(78788));
            {
                ;
            }
        }
        int GLF_live5looplimiter0 = 0;
        {
            bool GLF_live10c5 = _GLF_FUZZED(true);
            vec2 GLF_live10pos = _GLF_FUZZED(vec2(22.30, -72.26));
            vec3 GLF_live10setting = _GLF_FUZZED((vec3(421.222, 30.02, -829.689) - 8.7));
            if (!GLF_live10c5) {
                ;
            }
        }
        if (GLF_live5looplimiter0 >= 7) {
            ;
            {
                bool GLF_live10c1 = _GLF_FUZZED((vec2(5.2, -7.2) != vec2(971.656, 0.3)));
                if (!GLF_live10c1) {
                    ;
                }
            }
        }
    }
    int k = from, i = from, j = mid + 1;
    {
        vec2 GLF_live10center = _GLF_FUZZED((false ? (vec2(-508.520, 6757.2182) * (mat2(-5.7, 94.81, 9782.4844, 82.90) - (-7637.2036))) : vec2(900.305, -16.84)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = GLF_live7gl_FragCoord;
        }
        int GLF_live10i = _GLF_FUZZED(94638);
        int GLF_live10looplimiter0 = 0;
        vec2 GLF_live10position = _GLF_FUZZED(vec2(4.9, 851.862));
        vec3 GLF_live10result = _GLF_FUZZED(vec3(179.617, 2.3, -6.5));
        {
            if (GLF_live10looplimiter0 >= 7) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    ;
                }
            }
            GLF_live10looplimiter0++;
            {
                vec3 GLF_live10d = _GLF_FUZZED(vec3(-0.6, 8413.8936, -597.152));
                GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / 10.0 + GLF_live10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live10i) / 100.0), 0.01, float(GLF_live10i)));
                if (length(GLF_live10d) <= 0.0) {
                    ;
                }
                GLF_live10result = vec3(GLF_live10d);
            }
        }
        {
            {
                ;
            }
        }
    }
    do {
        while (i <= mid && j <= to) {
            {
                int GLF_live9i = _GLF_FUZZED(-82778);
                {
                    int GLF_live13high = _GLF_FUZZED(-47277);
                    int GLF_live13low = _GLF_FUZZED(92022);
                    int GLF_live13m = _GLF_FUZZED((true ? (-37338) : 58284));
                    {
                        int GLF_live13looplimiter3 = 0;
                        for (int GLF_live13i = GLF_live13low; GLF_live13i < GLF_live13high; GLF_live13i += 2 * GLF_live13m) {
                            if (GLF_live13looplimiter3 >= 6) {
                                break;
                            }
                            GLF_live13looplimiter3++;
                            {
                                int GLF_live13from = GLF_live13i;
                                int GLF_live13mid = GLF_live13i + GLF_live13m - 1;
                                int GLF_live13to = min(GLF_live13i + 2 * GLF_live13m - 1, GLF_live13high);
                                GLF_live13merge(GLF_live13from, GLF_live13mid, GLF_live13to);
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_live7injectionSwitch * mat4x2(3.5, -50.99, -8847.7263, -1188.8268, 9.6, 5.0, -1527.2104, -502.621));
                }
                int GLF_live9j = _GLF_FUZZED(int(true));
                {
                    GLF_live9i++;
                    GLF_live9swap(GLF_live9i, GLF_live9j);
                    {
                        vec2 GLF_live13color = _GLF_FUZZED(vec2(-9.5, 721.744));
                        int GLF_live13i = _GLF_FUZZED((true ? 77421 : 25404));
                        vec3 GLF_live13vecCoor = _GLF_FUZZED(vec3(5.4, -40.71, -8.7));
                        if (int(GLF_live13gl_FragCoord[1]) < 60) {
                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[1]))));
                            GLF_live13color[1] *= atan(faceforward(GLF_live13injectionSwitch, GLF_live13color.xx, GLF_live13vecCoor.yx).y);
                            ;
                        } else if (int(GLF_live13gl_FragCoord[1]) < 90) {
                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[2]))));
                            GLF_live13color.x += atanh(GLF_live13color.x) * cosh(GLF_live13injectionSwitch.y) * smoothstep(GLF_live13color, GLF_live13injectionSwitch, GLF_live13gl_FragCoord.yy).x;
                            ;
                        } else if (int(GLF_live13gl_FragCoord[1]) < 120) {
                            GLF_live13color = fract(acosh(clamp(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[3])), 1.0, 1000.0)));
                            GLF_live13color.x += (isnan(GLF_live13gl_FragCoord.x) ? log2(GLF_live13gl_FragCoord.x) : log2(GLF_live13gl_FragCoord.y));
                            ;
                        } else if (int(GLF_live13gl_FragCoord[1]) < 150) {
                            ;
                        } else if (int(GLF_live13gl_FragCoord[1]) < 180) {
                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[4]))));
                            GLF_live13color[1] += asinh(GLF_live13gl_FragCoord.y * ldexp(GLF_live13color.y, -GLF_live13i));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                ;
                            } else {
                            }
                        } else if (int(GLF_live13gl_FragCoord[1]) < 210) {
                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[5]))));
                            GLF_live13color.y -= tanh(GLF_live13color.x) / cosh(GLF_live13color.y);
                            ;
                        } else if (int(GLF_live13gl_FragCoord[1]) < 240) {
                            GLF_live13color = fract(asinh(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[6]))));
                            GLF_live13color.y -= isnan(float(GLF_live13i)) ? tanh(GLF_live13gl_FragCoord.x) : atanh(GLF_live13gl_FragCoord.y / GLF_live13resolution.y);
                            ;
                        } else if (int(GLF_live13gl_FragCoord[1]) < 270) {
                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[7]))));
                            GLF_live13color.y *= mix(normalize(GLF_live13vecCoor), normalize(vec3(GLF_live13color, degrees(GLF_live13color.x))), GLF_live13injectionSwitch.x).y;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                ;
                            }
                        } else {
                            ;
                        }
                    }
                }
                {
                    {
                        ;
                    }
                }
            }
            if (data[i] < data[j]) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (vec3(-6803.7907, 7539.0362, 5.6) * mat4x3(-7489.4626, -69.10, 7600.8674, -4.2, -95.80, -6.2, 9.1, -5.6, -6.5, -6795.2594, -3.2, -52.64));
                }
                temp[k++] = data[i++];
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = asin(_GLF_color);
                }
                temp[k++] = data[j++];
                if (_GLF_DEAD(false)) {
                    {
                        {
                            float GLF_live11s = _GLF_FUZZED(85.07);
                            {
                                GLF_live11s += 0.2;
                            }
                        }
                        int GLF_live7high = _GLF_FUZZED(-33579);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        int GLF_live7looplimiter4 = 0;
                        int GLF_live7low = _GLF_FUZZED(ivec2(-45564, 26084).r);
                        if (_GLF_DEAD(false)) {
                            return;
                            {
                                int GLF_live9looplimiter0 = 0;
                                if (GLF_live9looplimiter0 >= 7) {
                                    ;
                                }
                            }
                        }
                        int GLF_live7m = _GLF_FUZZED(3149);
                        {
                            if (GLF_live7looplimiter4 >= 6) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    ;
                                }
                            }
                            GLF_live7looplimiter4++;
                            {
                                vec4 GLF_live8c = _GLF_FUZZED(vec4(-4.7, -1498.9122, -7807.6394, 0.3));
                                int GLF_live8i = _GLF_FUZZED((false ? 86692 : ((-64154) | (-61293))));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    {
                                        ;
                                    }
                                }
                                int GLF_live8msb8 = _GLF_FUZZED(ivec3(-60138, 81986, 59124).r);
                                {
                                    int GLF_live8looplimiter1 = 0;
                                    do {
                                        if (GLF_live8looplimiter1 >= 5) {
                                            break;
                                        }
                                        {
                                            int GLF_live13i = _GLF_FUZZED(ivec3(-41543, 35824, -93649).b);
                                            int GLF_live13j = _GLF_FUZZED(-14455);
                                            int GLF_live13k = _GLF_FUZZED((~60085));
                                            int GLF_live13mid = _GLF_FUZZED(84918);
                                            int GLF_live13to = _GLF_FUZZED(98829);
                                            {
                                                int GLF_live13looplimiter0 = 0;
                                                while (GLF_live13i <= GLF_live13mid && GLF_live13j <= GLF_live13to) {
                                                    if (GLF_live13looplimiter0 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter0++;
                                                    {
                                                        if (GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] < GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)]) {
                                                            GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
                                                        } else {
                                                            GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j++, 10)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live8looplimiter1++;
                                        {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] >= 1.0) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                                                    } else {
                                                    }
                                                }
                                            }
                                            GLF_live8i++;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(sin(0.0)))))) {
                                                _GLF_color = GLF_live8c;
                                                {
                                                    int GLF_live12i = _GLF_FUZZED(int(false));
                                                    float GLF_live12result = _GLF_FUZZED((true ? 2.6 : (-6343.1003)));
                                                    float GLF_live12thirty_two = _GLF_FUZZED(-344.994);
                                                    {
                                                        if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                            GLF_live12result += 100.0;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } while (GLF_live8i < findMSB(findLSB(GLF_live8msb8)));
                                }
                            }
                            do {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    int GLF_live7looplimiter3 = 0;
                                    do {
                                        for (int GLF_live7i = GLF_live7low; GLF_live7i < GLF_live7high; GLF_live7i += 2 * GLF_live7m) {
                                            if (GLF_live7looplimiter3 >= 6) {
                                                break;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    {
                                                        vec3 GLF_live9color = _GLF_FUZZED(vec3(3.6, 23.12, -483.052));
                                                        {
                                                            GLF_live9color.y += float(GLF_live9obj.numbers[6]);
                                                        }
                                                    }
                                                    _GLF_color = min(vec4(8234.3568, GLF_live7injectionSwitch, smoothstep(-4.1, 10.86, -3.9)), GLF_live7gl_FragCoord);
                                                }
                                            }
                                            GLF_live7looplimiter3++;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            {
                                                int GLF_live7from = GLF_live7i;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                                    _GLF_color = GLF_live7gl_FragCoord;
                                                }
                                                int GLF_live7mid = GLF_live7i + GLF_live7m - 1;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                int GLF_live7to = min(GLF_live7i + 2 * GLF_live7m - 1, GLF_live7high);
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        int GLF_live12i = _GLF_FUZZED(54057);
                                                        float GLF_live12result = _GLF_FUZZED((+3515.3834));
                                                        float GLF_live12thirty_two = _GLF_FUZZED(float(199526u));
                                                        if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                            GLF_live12result += 100.0;
                                                        }
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            int GLF_live12i = _GLF_FUZZED(ivec4(-41640, 53661, -94733, -98258).p);
                                                            float GLF_live12limit = _GLF_FUZZED(-2770.0067);
                                                            float GLF_live12result = _GLF_FUZZED(-691.539);
                                                            float GLF_live12thirty_two = _GLF_FUZZED(-169.305);
                                                            {
                                                                if ((GLF_live12i % 32) == 0) {
                                                                    GLF_live12result += 0.4;
                                                                } else {
                                                                    if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                                        GLF_live12result += 100.0;
                                                                    }
                                                                }
                                                                if (float(GLF_live12i) >= GLF_live12limit) {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                        _GLF_color = dFdyFine(mix(GLF_live7gl_FragCoord, sinh(_GLF_color), GLF_live10b_b));
                                                    }
                                                    {
                                                        int GLF_live12i = _GLF_FUZZED(-10043);
                                                        float GLF_live12limit = _GLF_FUZZED((2.9));
                                                        float GLF_live12result = _GLF_FUZZED(((-69.36) + (6.3 - (-64.37))));
                                                        if (float(GLF_live12i) >= GLF_live12limit) {
                                                            ;
                                                        }
                                                    }
                                                }
                                                GLF_live7merge(GLF_live7from, GLF_live7mid, GLF_live7to);
                                                {
                                                    int GLF_live11i = _GLF_FUZZED(((-27724) & 14715));
                                                    float GLF_live11limit = _GLF_FUZZED(-8.3);
                                                    float GLF_live11s = _GLF_FUZZED(vec4(62.41, -5.6, -4.2, -7.6).y);
                                                    if (float(GLF_live11i) >= GLF_live11limit) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                            _GLF_color = sign(_GLF_color);
                        }
                    }
                    break;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        {
            {
                ;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    while (i < N && i <= mid) {
        temp[k++] = data[i++];
    }
    for (int i = from; i <= to; i++) {
        {
            float GLF_live12limit = _GLF_FUZZED(float(false));
            float GLF_live12result = _GLF_FUZZED(vec4(5.7, -2.1, 1.8, -15.74).z);
            float GLF_live12thirty_two = _GLF_FUZZED(-4.3);
            {
                int GLF_live12looplimiter0 = 0;
                for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                    if (GLF_live12looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live12looplimiter0++;
                    {
                        if ((GLF_live12i % 32) == 0) {
                            GLF_live12result += 0.4;
                        } else {
                            if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                GLF_live12result += 100.0;
                            }
                        }
                        if (float(GLF_live12i) >= GLF_live12limit) {
                            ;
                        }
                    }
                }
            }
        }
        data[i] = temp[i];
    }
}

void mergeSort() {
    if (_GLF_DEAD(false)) {
        return;
    }
    int low = 0;
    int high = N - 1;
    if (_GLF_DEAD(false)) {
        {
            int GLF_live4i = _GLF_FUZZED(((true ? 4969 : (-990)) | ivec2(18282, 75282).y));
            float GLF_live4result = _GLF_FUZZED((5343.6160 + (-26.21)));
            float GLF_live4thirty_two = _GLF_FUZZED(0.8);
            {
                {
                    int GLF_live11i = _GLF_FUZZED(int((false == true)));
                    float GLF_live11limit = _GLF_FUZZED(888.919);
                    int GLF_live11looplimiter0 = 0;
                    float GLF_live11ref = _GLF_FUZZED(775.020);
                    float GLF_live11s = _GLF_FUZZED(6625.3785);
                    {
                        if (GLF_live11looplimiter0 >= 4) {
                            ;
                        }
                        GLF_live11looplimiter0++;
                        {
                            if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                GLF_live11s += 0.2;
                            }
                            if (float(GLF_live11i) >= GLF_live11limit) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (mod(float(GLF_live4i), round(GLF_live4thirty_two)) <= 0.01) {
                        {
                            vec3 GLF_live12c = _GLF_FUZZED(vec3(vec2(-376.972, 98.08), -6193.0642));
                            int GLF_live12i = _GLF_FUZZED(18115);
                            int GLF_live12looplimiter1 = 0;
                            {
                                if (GLF_live12looplimiter1 >= 5) {
                                    ;
                                }
                                GLF_live12looplimiter1++;
                                {
                                    if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] >= 1.0) {
                                        GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = atanh(GLF_live7gl_FragCoord);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                            return;
                        }
                        GLF_live4result += 100.0;
                    }
                } else {
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live7gl_FragCoord;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    {
                        ;
                    }
                }
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = reflect(vec4(8.4, 61.08, 520.444, 3.7), (GLF_live10h_r / vec4(-225.332, 11.71, -45.32, -4.3)));
        }
        {
            {
                int GLF_live8looplimiter1 = 0;
                if (GLF_live8looplimiter1 >= 5) {
                    ;
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) | (int(7))))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                int GLF_live7i = _GLF_FUZZED((98684 + (-46603)));
                int GLF_live7j = _GLF_FUZZED((ivec3(-19559, -80429, 83366) ^ 94438).b);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = vec4(-4.4, -70.38, -4.9, -6677.0444);
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, true, true))))) {
                        return;
                    }
                }
                int GLF_live7k = _GLF_FUZZED(7536);
                {
                    if (GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 10)] < GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j, 10)]) {
                        GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i++, 10)];
                    } else {
                        GLF_live7temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7k++, 10)] = GLF_live7data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7j++, 10)];
                    }
                }
            }
            int GLF_live0looplimiter2 = 0;
            if (GLF_live0looplimiter2 >= 5) {
                ;
            }
        }
        return;
        {
            vec2 GLF_live5coord = _GLF_FUZZED(vec2(-5147.3134, -7500.5575));
            int GLF_live5i = _GLF_FUZZED((-47373));
            int GLF_live5looplimiter0 = 0;
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live7gl_FragCoord;
            }
            while (GLF_live5i < 1 && GLF_live5coord.x > 1.0 || GLF_live5coord.y > 1.0) {
                if (GLF_live5looplimiter0 >= 7) {
                    break;
                    {
                        vec4 GLF_live8c = _GLF_FUZZED(vec4(63.55, 231.762, -5.2, -8.3));
                        int GLF_live8i = _GLF_FUZZED(int(true));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-3.6, -439.116, -1794.4597, -799.378);
                                }
                                _GLF_color = min(vec4(-9.8, 181.179, -9.9, 0.2), max(GLF_live10time, GLF_live10b_b));
                            }
                            GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                        }
                    }
                }
                GLF_live5looplimiter0++;
                {
                    if (GLF_live5coord.x > 1.0)
                        GLF_live5coord.x -= 1.0;
                    if (GLF_live5coord.y > 1.0)
                        GLF_live5coord.y -= 1.0;
                    GLF_live5coord *= 2.0;
                    GLF_live5i++;
                    {
                        vec2 GLF_live13color = _GLF_FUZZED((((-8.6) < (-77.38)) ? vec2(-1929.8092, -5.7) : (mat2(203.630, 86.87, 8.8, -9.5) * vec2(165.505, -6465.1087))));
                        vec3 GLF_live13vecCoor = _GLF_FUZZED(vec3(3.2, -897.964, 6014.6914));
                        {
                            GLF_live13color = fract(acosh(clamp(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[3])), 1.0, 1000.0)));
                            GLF_live13color.x += (isnan(GLF_live13gl_FragCoord.x) ? log2(GLF_live13gl_FragCoord.x) : log2(GLF_live13gl_FragCoord.y));
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = ((mat3(-523.942, -0.0, 506.232, 54.20, 581.463, 785.054, 3.8, 9.7, 2.7) * GLF_live10s_g), smoothstep(vec4(-7.9, -2.1, 1.5, 5.1), vec4(-868.045, -860.552, -1.6, 8648.3443), vec4(539.287, 5.2, -3203.4486, 6.3)));
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    for (int m = 1; m <= high; m = 2 * m) {
        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (1) >> 0)); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                break;
            }
            for (int i = low; i < high; i += 2 * m) {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                int from = i;
                int mid = i + m - 1;
                int to = min(i + 2 * m - 1, high);
                merge(from, mid, to);
            }
        }
    }
    {
        vec2 GLF_live5coord = _GLF_FUZZED((vec2(6068.1327, -87.40)));
        if (GLF_live5coord.x > 1.0) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live13looplimiter2 = 0;
                        if (GLF_live13looplimiter2 >= 6) {
                            ;
                        }
                    }
                    _GLF_color = asin(_GLF_color);
                }
                _GLF_color = GLF_live7gl_FragCoord;
            }
            GLF_live5coord.x -= 1.0;
        }
    }
    {
        {
            int GLF_live12i = _GLF_FUZZED(-16316);
            float GLF_live12limit = _GLF_FUZZED(-3.4);
            float GLF_live12result = _GLF_FUZZED((float(true)));
            if (float(GLF_live12i) >= GLF_live12limit) {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_color;
        }
        vec4 GLF_live8c = _GLF_FUZZED((vec3(5406.8778, -78.66, 8.3) * ((-3.5) + mat4x3(84.13, -8.9, -2997.7183, 0.3, -4.9, 192.111, 29.74, -9.2, 968.466, 6.2, 4.6, 56.48))));
        int GLF_live8i = _GLF_FUZZED(ivec2(-25651, 48358).g);
        int GLF_live8looplimiter1 = 0;
        int GLF_live8msb8 = _GLF_FUZZED((65576 ^ (-72394)));
        do {
            if (GLF_live8looplimiter1 >= 5) {
                break;
            }
            GLF_live8looplimiter1++;
            {
                if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] >= 1.0) {
                    GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                }
                GLF_live8i++;
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live13i = _GLF_FUZZED(39390);
                        int GLF_live13j = _GLF_FUZZED(39520);
                        int GLF_live13k = _GLF_FUZZED(((-67428) ^ (-900)));
                        int GLF_live13looplimiter0 = 0;
                        {
                            if (GLF_live13looplimiter0 >= 6) {
                                ;
                            }
                            GLF_live13looplimiter0++;
                            {
                                if (GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] < GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)]) {
                                    GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
                                } else {
                                    GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j++, 10)];
                                }
                            }
                        }
                    }
                    _GLF_color = vec4(mix(GLF_live10h_r, -2098.4465, (false ^^ true)), -4.2, GLF_live7resolution);
                }
            }
        } while (GLF_live8i < findMSB(findLSB(GLF_live8msb8)));
    }
}

void main() {
    int i = int(injectionSwitch.x);
    do {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            {
                vec4 GLF_live11c = _GLF_FUZZED(vec4(vec2(-5015.5163, 600.944), 2748.3784, -986.718));
                int GLF_live11i = _GLF_FUZZED(97717);
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                        GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                    }
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(-9.0, -19.57, 3.1, 2283.5223);
            }
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        {
            vec4 GLF_live11c = _GLF_FUZZED((vec4(-73.66, 9410.7926, 9.9, -2.4) - float(-90720)));
            int GLF_live11i = _GLF_FUZZED((~(~80418)));
            int GLF_live11looplimiter1 = 0;
            {
                if (GLF_live11looplimiter1 >= 4) {
                    ;
                }
                GLF_live11looplimiter1++;
                {
                    if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                        GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            int GLF_live1looplimiter1 = 0;
            {
                vec3 GLF_live10d = _GLF_FUZZED(vec3(1.1, vec2(2241.3696, 228.010)));
                if (length(GLF_live10d) <= 0.0) {
                    ;
                }
            }
            if (GLF_live1looplimiter1 >= 7) {
                {
                    int GLF_live4looplimiter1 = 0;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (GLF_live4looplimiter1 >= 5) {
                            ;
                        }
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(length(0.0)))))) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                {
                    {
                        ;
                    }
                }
            }
        }
        switch (i) {
            case 0:
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    data[i] = 4;
                }
                {
                    vec2 GLF_live7color = _GLF_FUZZED(vec2(-9.1, 1.4));
                    int GLF_live7i = _GLF_FUZZED(((-(-64028)) | (-58625)));
                    {
                        int GLF_live14i = _GLF_FUZZED(39283);
                        int GLF_live14j = _GLF_FUZZED(75764);
                        if (GLF_live14j < GLF_live14i + 1) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    vec3 GLF_live7vecCoor = _GLF_FUZZED((mat4x2(-678.856, 886.699, 2801.6902, 725.960, 873.432, -5.0, -2.6, 1720.1100) * vec4(-1438.7362, 487.543, -6.3, 507.352)).xxx);
                    if (int(GLF_live7gl_FragCoord[1]) < 240) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        GLF_live7color = fract(asinh(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[6]))));
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                vec4 GLF_live11c = _GLF_FUZZED(vec4(-43.55, -0.3, vec3(-1.7, -61.66, -2633.4133).xy));
                                int GLF_live11i = _GLF_FUZZED(((80763) | (+1624)));
                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                }
                            }
                        } else {
                            GLF_live7color.y -= isnan(float(GLF_live7i)) ? tanh(GLF_live7gl_FragCoord.x) : atanh(GLF_live7gl_FragCoord.y / GLF_live7resolution.y);
                        }
                        ;
                    } else if (int(GLF_live7gl_FragCoord[1]) < 270) {
                        GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[7]))));
                        GLF_live7color.y *= mix(normalize(GLF_live7vecCoor), normalize(vec3(GLF_live7color, degrees(GLF_live7color.x))), GLF_live7injectionSwitch.x).y;
                        ;
                    } else {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = faceforward(_GLF_color, dFdxCoarse(_GLF_color), vec4(-1774.9347, -8.3, -8163.2760, 3720.5602));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                break;
            case 1:
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    data[i] = 3;
                } else {
                    {
                        vec4 GLF_live8c = _GLF_FUZZED((vec3(942.667, -74.00, -4249.5676) * mat4x3(-83.58, -8311.8896, -6.9, 988.182, -686.273, 3.6, -0.5, -494.714, 82.51, 52.64, 2.7, 3052.5090)));
                        int GLF_live8i = _GLF_FUZZED(55033);
                        if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] >= 1.0) {
                            {
                                int GLF_live14looplimiter2 = 0;
                                if (GLF_live14looplimiter2 >= 7) {
                                    ;
                                }
                            }
                            GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live7gl_FragCoord;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                break;
            case 2:
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    {
                        {
                            {
                                vec2 GLF_live13color = _GLF_FUZZED(vec2(625.710, 7.0));
                                int GLF_live13i = _GLF_FUZZED(ivec4(13428, -48775, 84189, -38043).y);
                                vec3 GLF_live13vecCoor = _GLF_FUZZED(vec3(-3114.3666, -2283.2433, -549.556));
                                {
                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[4]))));
                                    GLF_live13color[1] += asinh(GLF_live13gl_FragCoord.y * ldexp(GLF_live13color.y, -GLF_live13i));
                                    ;
                                }
                            }
                            int GLF_live8i = _GLF_FUZZED(-35740);
                            float GLF_live8limit = _GLF_FUZZED((-((-9.0) + vec4(2.7, -3.2, -7.1, -37.98)).y));
                            int GLF_live8looplimiter0 = 0;
                            float GLF_live8ref = _GLF_FUZZED(7.1);
                            float GLF_live8s = _GLF_FUZZED(((2163.9468 - (-789.677)) + (630.156 + 3971.5664)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_live7gl_FragCoord;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = refract(step(vec3(4805.6184, 1.6, 4.4).pstp, _GLF_color), vec4(GLF_live10time), -271.848);
                                }
                            }
                            while (GLF_live8i < bitfieldInsert(800, GLF_live8i, 0, 0)) {
                                if (GLF_live8looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                                        GLF_live8s += 0.2;
                                    }
                                    if (float(GLF_live8i) >= GLF_live8limit) {
                                        ;
                                    }
                                    GLF_live8i++;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = ((GLF_live7gl_FragCoord) + vec4(7.6, 3.8, -9.5, 3.9));
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            {
                                {
                                    int GLF_live11i = _GLF_FUZZED(((int(21232u) | ((-17995) + 64911)) * ((-28849) - (-8494))));
                                    float GLF_live11limit = _GLF_FUZZED(vec3(-4.5, 6067.3993, 272.858).z);
                                    int GLF_live11looplimiter0 = 0;
                                    float GLF_live11ref = _GLF_FUZZED(vec3(46.03, -620.169, -1.5).x);
                                    float GLF_live11s = _GLF_FUZZED(515.062);
                                    {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            if (GLF_live11looplimiter0 >= 4) {
                                                ;
                                            }
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                                GLF_live11s += 0.2;
                                            }
                                            if (float(GLF_live11i) >= GLF_live11limit) {
                                                ;
                                            }
                                        }
                                    }
                                }
                                vec2 GLF_live10pos = _GLF_FUZZED((vec2(4.5, 4.5) + (-15.20)));
                                vec3 GLF_live10setting = _GLF_FUZZED(vec3(38.42, 534.085, 2446.9877));
                                {
                                    ;
                                }
                            }
                            {
                                int GLF_live13i = _GLF_FUZZED(96244);
                                int GLF_live13looplimiter5 = 0;
                                do {
                                    if (GLF_live13looplimiter5 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter5++;
                                    {
                                        switch (GLF_live13i) {
                                            case 0:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 4;
                                                break;
                                            case 1:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 3;
                                                break;
                                            case 2:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 2;
                                                break;
                                            case 3:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 1;
                                                break;
                                            case 4:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 0;
                                                break;
                                            case 5:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -1;
                                                break;
                                            case 6:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -2;
                                                break;
                                            case 7:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -3;
                                                break;
                                            case 8:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -4;
                                                break;
                                            case 9:
                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -5;
                                                break;
                                        }
                                        GLF_live13i++;
                                    }
                                } while (GLF_live13i < 10);
                            }
                        }
                        float GLF_live2th = _GLF_FUZZED(701.451);
                        {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                    break;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                GLF_live2th = -GLF_live2th;
                                {
                                    int GLF_live9i = _GLF_FUZZED(ivec4(64851, 63365, -75044, -81597).s);
                                    do {
                                        int GLF_live11i = _GLF_FUZZED((~(-36935)));
                                        float GLF_live11limit = _GLF_FUZZED(vec4(-88.81, -229.435, 93.89, 75.06).s);
                                        float GLF_live11ref = _GLF_FUZZED((true ? (556.550) : (-9.7)));
                                        float GLF_live11s = _GLF_FUZZED(2.6);
                                        {
                                            if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                                GLF_live11s += 0.2;
                                            }
                                            if (float(GLF_live11i) >= GLF_live11limit) {
                                                ;
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    int GLF_live9j = _GLF_FUZZED(33883);
                                    int GLF_live9pivot = _GLF_FUZZED(ivec4(-7434, -18458, -71760, 1895).y);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live7gl_FragCoord;
                                    }
                                    {
                                        if (GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] <= GLF_live9pivot) {
                                            {
                                                int GLF_live11looplimiter1 = 0;
                                                if (GLF_live11looplimiter1 >= 4) {
                                                    ;
                                                }
                                            }
                                            GLF_live9i++;
                                            GLF_live9swap(GLF_live9i, GLF_live9j);
                                        }
                                        {
                                            int GLF_live13i = _GLF_FUZZED(19153);
                                            int GLF_live13looplimiter2 = 0;
                                            {
                                                if (GLF_live13looplimiter2 >= 6) {
                                                    ;
                                                }
                                                GLF_live13looplimiter2++;
                                                {
                                                    GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)];
                                                }
                                            }
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (true)))) {
                                    return;
                                } else {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, exp(0.0), log(1.0), 0.0, 0.0)))))) {
                                continue;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                        break;
                    }
                    {
                        int GLF_live14looplimiter1 = 0;
                        if (GLF_live14looplimiter1 >= 7) {
                            ;
                        }
                    }
                    data[i] = 2;
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live12looplimiter1 = 0;
                            if (GLF_live12looplimiter1 >= 5) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        break;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                } else {
                }
                break;
            case 3:
                if (_GLF_DEAD(false)) {
                    continue;
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                            _GLF_color = (GLF_live7gl_FragCoord);
                        }
                    }
                    {
                        vec2 GLF_live5coord = _GLF_FUZZED((5787.7313 - (vec2(4159.6777, -77.61) - 8833.6433)));
                        int GLF_live5i = _GLF_FUZZED(int(true));
                        {
                            int GLF_live5looplimiter0 = 0;
                            while (GLF_live5i < 1 && GLF_live5coord.x > 1.0 || GLF_live5coord.y > 1.0) {
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (vec4(27.42, -9440.1329, -992.952, 4178.3154) - vec4(-206.802, -7.5, -78.69, -0.1));
                                    }
                                }
                                if (GLF_live5looplimiter0 >= 7) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                GLF_live5looplimiter0++;
                                {
                                    if (GLF_live5coord.x > 1.0) {
                                        {
                                            float GLF_live11limit = _GLF_FUZZED(float(true));
                                            int GLF_live11looplimiter0 = 0;
                                            float GLF_live11ref = _GLF_FUZZED((-72.85));
                                            float GLF_live11s = _GLF_FUZZED((-62.90));
                                            for (int GLF_live11i = 1; GLF_live11i < 800; GLF_live11i++) {
                                                if (GLF_live11looplimiter0 >= 4) {
                                                    break;
                                                }
                                                GLF_live11looplimiter0++;
                                                {
                                                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                                        GLF_live11s += 0.2;
                                                    }
                                                    if (float(GLF_live11i) >= GLF_live11limit) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        GLF_live5coord.x -= 1.0;
                                        {
                                            float GLF_live8s = _GLF_FUZZED(-7152.0388);
                                            {
                                                GLF_live8s += 0.2;
                                            }
                                        }
                                    }
                                    if (GLF_live5coord.y > 1.0)
                                        GLF_live5coord.y -= 1.0;
                                    GLF_live5coord *= 2.0;
                                    GLF_live5i++;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                        }
                    }
                }
                data[i] = 1;
                break;
            case 4:
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        _GLF_color = vec4(7552.6968, 2260.0248, 3.0, 2.1);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (vec4(4.9, -76.47, -66.37, 24.04) + GLF_live10b_b);
                    }
                    {
                        int GLF_live8i = _GLF_FUZZED((~69660));
                        float GLF_live8ref = _GLF_FUZZED(-4.3);
                        float GLF_live8s = _GLF_FUZZED(-5.7);
                        if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                            GLF_live8s += 0.2;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live9i = _GLF_FUZZED(16027);
                            int GLF_live9j = _GLF_FUZZED((56961 - (-99974)));
                            int GLF_live9pivot = _GLF_FUZZED(-645);
                            if (GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] <= GLF_live9pivot) {
                                GLF_live9i++;
                                GLF_live9swap(GLF_live9i, GLF_live9j);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = cos(roundEven(_GLF_color));
                            }
                        }
                        continue;
                    }
                    {
                        vec2 GLF_live13color = _GLF_FUZZED(vec2(-594.287, -4.7));
                        vec3 GLF_live13vecCoor = _GLF_FUZZED(vec3(1579.5530, -877.492, 622.723));
                        {
                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[7]))));
                            GLF_live13color.y *= mix(normalize(GLF_live13vecCoor), normalize(vec3(GLF_live13color, degrees(GLF_live13color.x))), GLF_live13injectionSwitch.x).y;
                            ;
                        }
                    }
                    do {
                        _GLF_color = mod(_GLF_color, 992.107);
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    {
                        vec4 GLF_live11c = _GLF_FUZZED(vec4(789.516, 362.670, -826.295, -7.6));
                        int GLF_live11looplimiter1 = 0;
                        for (int GLF_live11i = 0; GLF_live11i < 3; GLF_live11i++) {
                            if (GLF_live11looplimiter1 >= 4) {
                                break;
                            }
                            GLF_live11looplimiter1++;
                            {
                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    {
                        float GLF_live4result = _GLF_FUZZED(float(138403u));
                        {
                            ;
                        }
                    }
                }
                data[i] = 0;
                break;
            case 5:
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                    {
                        {
                            ;
                        }
                    }
                }
                data[i] = -1;
                break;
            case 6:
                {
                    {
                        ;
                    }
                }
                data[i] = -2;
                break;
            case 7:
                data[i] = -3;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    _GLF_color = vec4(2.8, -8.4, 7.1, -5.0);
                }
                break;
            case 8:
                data[i] = -4;
                break;
            case 9:
                {
                    int GLF_live3i = _GLF_FUZZED(-3918);
                    int GLF_live3j = _GLF_FUZZED(-89478);
                    int GLF_live3pivot = _GLF_FUZZED(-36366);
                    if (GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)] <= GLF_live3pivot) {
                        {
                            float GLF_live12result = _GLF_FUZZED((64.00 * (-531.031)));
                            {
                                ;
                            }
                        }
                        {
                            vec3 GLF_live4c = _GLF_FUZZED(((vec3(893.057, 5.1, 8629.8199) * mat3(376.424, -4080.8024, -1.3, -5.6, -64.22, -2226.4707, -89.22, 8390.1764, -6.3)) * mat3(8.6, 362.285, -3.8, 36.46, -5441.2431, -7611.1945, 3.9, -8.8, 1630.5631)));
                            int GLF_live4looplimiter1 = 0;
                            for (int GLF_live4i = 0; GLF_live4i < 3; GLF_live4i++) {
                                if (GLF_live4looplimiter1 >= 5) {
                                    break;
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = ((GLF_live10h_r * vec2(-9.6, 63.07)) * (mat4x2(-817.568, -991.380, 1786.2863, -79.08, 68.05, -3325.2551, 8227.8609, -0.7) - (-6159.5689)));
                                        }
                                        int GLF_live8looplimiter1 = 0;
                                        if (GLF_live8looplimiter1 >= 5) {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = (GLF_live4c * mat4x3(1920.4673, -68.90, -1.3, -7.8, -221.555, 0.4, -3.1, 345.481, 4.0, -5.6, -2.9, 75.80));
                                    }
                                }
                                {
                                    vec3 GLF_live9color = _GLF_FUZZED(vec3(vec4(458.118, -66.50, -6.7, -5.6)));
                                    vec2 GLF_live9uv = _GLF_FUZZED(vec2(6.7, -3.3));
                                    if (GLF_live9uv.x > (3.0 / 4.0)) {
                                        GLF_live9color.z += float(GLF_live9obj.numbers[3]);
                                    }
                                }
                                do {
                                    GLF_live4looplimiter1++;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 3)] >= 1.0) {
                                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 3)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 3)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 3)];
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (vec4(16.96, 75.21, -119.971, 219.798) + fwidthFine(vec4(62.61, -5902.6934, 399.103, 689.001)));
                                    }
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-508.400, -1767.4656, 6.5, 31.76);
                        }
                        GLF_live3i++;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live7gl_FragCoord;
                        }
                        GLF_live3swap(GLF_live3i, GLF_live3j);
                        if (_GLF_DEAD(false)) {
                            {
                                {
                                    ;
                                }
                            }
                            return;
                            {
                                vec3 GLF_live12c = _GLF_FUZZED(vec3(-7426.9079, 4.1, 4.5));
                                int GLF_live12i = _GLF_FUZZED(73732);
                                int GLF_live12looplimiter1 = 0;
                                {
                                    do {
                                        if (GLF_live12looplimiter1 >= 5) {
                                            ;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    GLF_live12looplimiter1++;
                                    {
                                        if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] >= 1.0) {
                                            GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                                        }
                                    }
                                }
                            }
                        }
                        {
                            float GLF_live11limit = _GLF_FUZZED(9.3);
                            int GLF_live11looplimiter0 = 0;
                            float GLF_live11ref = _GLF_FUZZED(1773.1891);
                            float GLF_live11s = _GLF_FUZZED(4.3);
                            for (int GLF_live11i = 1; GLF_live11i < 800; GLF_live11i++) {
                                if (GLF_live11looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live11looplimiter0++;
                                {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                            GLF_live11s += 0.2;
                                        }
                                    }
                                    if (float(GLF_live11i) >= GLF_live11limit) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                data[i] = -5;
                break;
        }
        i++;
    } while (i < 10);
    do {
        for (int j = 0; j < 10; j++) {
            {
                bool GLF_live10c7 = _GLF_FUZZED((false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                    _GLF_color = _GLF_color;
                    {
                        vec4 GLF_live11c = _GLF_FUZZED(vec4(9677.5909, 6616.1914, 1332.2501, 49.15));
                        int GLF_live11i = _GLF_FUZZED((false ? 36895 : 29540));
                        {
                            if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                }
                            }
                        }
                    }
                }
                vec2 GLF_live10pos = _GLF_FUZZED((vec3(-7.3, -9.8, 7.3).s - vec2(-191.347, -60.26).yx));
                vec3 GLF_live10setting = _GLF_FUZZED(vec3(18.47, -6.5, -2645.1785).brg);
                if (!GLF_live10c7) {
                    ;
                }
            }
            {
                float GLF_live12result = _GLF_FUZZED(-9.8);
                {
                    ;
                }
            }
            temp[j] = data[j];
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    {
        vec2 GLF_live10pos = _GLF_FUZZED((mat4x2(459.265, 6.3, -0.4, -5910.2723, 8.0, 6635.6092, 871.792, -0.9) * vec4(-7.5, -4978.9371, -861.414, -8.4)));
        vec3 GLF_live10setting = _GLF_FUZZED(vec4(1071.3428, 77.75, -4097.7354, -5.8).zyy);
        {
            ;
        }
    }
    mergeSort();
    float grey;
    {
        vec2 GLF_live5coord = _GLF_FUZZED(vec2(6.4, 64.09));
        vec4 GLF_live5res = _GLF_FUZZED((vec4(53.11, -7.4, -6292.0569, 6058.1675) + vec4(66.09, -243.363, -8822.7719, 55.56)));
        if (GLF_live5coord.x < 1.0 && GLF_live5coord.y < 1.0) {
            GLF_live5res = texture(GLF_live5tex, GLF_live5coord);
        }
        {
            vec3 GLF_live12c = _GLF_FUZZED(vec3(-9.4, 3924.6100, -5.1));
            int GLF_live12i = _GLF_FUZZED(-76948);
            int GLF_live12looplimiter1 = 0;
            {
                if (GLF_live12looplimiter1 >= 5) {
                    ;
                }
                GLF_live12looplimiter1++;
                {
                    if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] >= 1.0) {
                        GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (int(gl_FragCoord[1]) < 30) {
        grey = 0.5 + float(data[0]) / 10.0;
        if (_GLF_DEAD(false)) {
            {
                {
                    ;
                }
            }
            return;
        }
        if (_GLF_DEAD(false)) {
            return;
            do {
                int GLF_live13i = _GLF_FUZZED((int(true) * 9421));
                int GLF_live13k = _GLF_FUZZED(int(77290u));
                int GLF_live13looplimiter1 = 0;
                int GLF_live13mid = _GLF_FUZZED(62974);
                while (GLF_live13i < GLF_live13N && GLF_live13i <= GLF_live13mid) {
                    if (GLF_live13looplimiter1 >= 6) {
                        break;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    } else {
                        GLF_live13looplimiter1++;
                    }
                    {
                        GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(false, true, false)), bool(bvec4(bool(bvec3(false, true, false)), true, true, false))))));
        }
    } else {
        {
            vec2 GLF_live7color = _GLF_FUZZED(vec2(-0.1, -630.967));
            int GLF_live7i = _GLF_FUZZED(43531);
            vec3 GLF_live7vecCoor = _GLF_FUZZED(vec3(5.8));
            {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (int(GLF_live7gl_FragCoord[1]) < 30) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                vec2 GLF_live10pos = _GLF_FUZZED((vec2(8836.7098, 7.4) + (mat2(8.2, -2.3, 0.1, 3321.4443) * vec2(-53.23, 0.8))));
                                vec3 GLF_live10setting = _GLF_FUZZED(vec3(-24.59, -1.2, -4.6));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = round(vec4(242.858, 762.922, 0.2, 45.44));
                                }
                                {
                                    int GLF_live13high = _GLF_FUZZED(-68490);
                                    int GLF_live13looplimiter4 = 0;
                                    int GLF_live13low = _GLF_FUZZED((72725 + ((-62194) | ivec3(-40779, -18452, -74787).b)));
                                    int GLF_live13m = _GLF_FUZZED(-3050);
                                    {
                                        if (GLF_live13looplimiter4 >= 6) {
                                            ;
                                        }
                                        GLF_live13looplimiter4++;
                                        {
                                            {
                                                int GLF_live13looplimiter3 = 0;
                                                for (int GLF_live13i = GLF_live13low; GLF_live13i < GLF_live13high; GLF_live13i += 2 * GLF_live13m) {
                                                    if (GLF_live13looplimiter3 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter3++;
                                                    {
                                                        int GLF_live13from = GLF_live13i;
                                                        int GLF_live13mid = GLF_live13i + GLF_live13m - 1;
                                                        int GLF_live13to = min(GLF_live13i + 2 * GLF_live13m - 1, GLF_live13high);
                                                        GLF_live13merge(GLF_live13from, GLF_live13mid, GLF_live13to);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (_GLF_color - sign(_GLF_color));
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        _GLF_color = vec4(3.7, -0.7, 8.7, 6613.9744);
                                        {
                                            vec4 GLF_live11c = _GLF_FUZZED(vec4(-730.578, 68.51, -294.081, 30.46));
                                            int GLF_live11i = _GLF_FUZZED(98054);
                                            int GLF_live11looplimiter1 = 0;
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                if (GLF_live11looplimiter1 >= 4) {
                                                    ;
                                                }
                                                GLF_live11looplimiter1++;
                                                {
                                                    if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                                        GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                                    }
                                                }
                                            } else {
                                            }
                                        }
                                    }
                                    {
                                        float GLF_live11s = _GLF_FUZZED(-59.95);
                                        {
                                            GLF_live11s += 0.2;
                                        }
                                    }
                                    ;
                                }
                            }
                            _GLF_color = vec4(-51.99);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = sqrt(GLF_live7gl_FragCoord);
                            }
                        } else {
                        }
                        GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[0]))));
                        GLF_live7color[0] = dFdy(GLF_live7gl_FragCoord.y);
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            ;
                        }
                    } else if (int(GLF_live7gl_FragCoord[1]) < 60) {
                        GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[1]))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = GLF_live7gl_FragCoord;
                        }
                        GLF_live7color[1] *= atan(faceforward(GLF_live7injectionSwitch, GLF_live7color.xx, GLF_live7vecCoor.yx).y);
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-5.1, 0.1, 1821.9106, 5.6);
                            }
                            {
                                int GLF_live8looplimiter1 = 0;
                                if (GLF_live8looplimiter1 >= 5) {
                                    ;
                                    {
                                        vec3 GLF_live12c = _GLF_FUZZED(vec3(93.68, -37.92, -9.1));
                                        int GLF_live12i = _GLF_FUZZED(-57267);
                                        if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] >= 1.0) {
                                            GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(636.819, 0.6, -3.1, 0.2);
                                }
                            }
                            return;
                        }
                        {
                            int GLF_live8i = _GLF_FUZZED(((true ? 79890 : (-20574)) & (-93327)));
                            float GLF_live8limit = _GLF_FUZZED(vec4(91.38, -7.8, 757.232, -5.5).y);
                            float GLF_live8ref = _GLF_FUZZED(-5574.8151);
                            float GLF_live8s = _GLF_FUZZED((true ? (-0.4) : 6.6));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(849.922, 6.2, -807.260, -4.5);
                            }
                            {
                                int GLF_live8looplimiter0 = 0;
                                while (GLF_live8i < bitfieldInsert(800, GLF_live8i, 0, 0)) {
                                    if (GLF_live8looplimiter0 >= 5) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fract(GLF_live7gl_FragCoord);
                                    }
                                    GLF_live8looplimiter0++;
                                    {
                                        if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                                            GLF_live8s += 0.2;
                                        }
                                        if (float(GLF_live8i) >= GLF_live8limit) {
                                            ;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = vec4(GLF_live10h_r, GLF_live7vecCoor);
                                            }
                                        }
                                        GLF_live8i++;
                                    }
                                    {
                                        int GLF_live12i = _GLF_FUZZED((17585 | (-19601)));
                                        float GLF_live12result = _GLF_FUZZED(-2.1);
                                        float GLF_live12thirty_two = _GLF_FUZZED(6761.1042);
                                        if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                            GLF_live12result += 100.0;
                                        }
                                    }
                                }
                            }
                        }
                        ;
                    } else {
                        {
                            vec4 GLF_live11c = _GLF_FUZZED((-vec4(-4006.4923, 8.7, 807.110, 5.0)));
                            {
                                int GLF_live11looplimiter1 = 0;
                                for (int GLF_live11i = 0; GLF_live11i < 3; GLF_live11i++) {
                                    if (GLF_live11looplimiter1 >= 4) {
                                        break;
                                    }
                                    GLF_live11looplimiter1++;
                                    {
                                        if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                            GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                        }
                                    }
                                }
                            }
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (int(GLF_live7gl_FragCoord[1]) < 90) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = trunc(_GLF_color);
                                }
                                GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[2]))));
                                GLF_live7color.x += atanh(GLF_live7color.x) * cosh(GLF_live7injectionSwitch.y) * smoothstep(GLF_live7color, GLF_live7injectionSwitch, GLF_live7gl_FragCoord.yy).x;
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                            } else if (int(GLF_live7gl_FragCoord[1]) < 120) {
                                {
                                    int GLF_live11i = _GLF_FUZZED(48250);
                                    float GLF_live11limit = _GLF_FUZZED(-4133.5029);
                                    float GLF_live11ref = _GLF_FUZZED(9438.8492);
                                    float GLF_live11s = _GLF_FUZZED(83.34);
                                    {
                                        if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                            GLF_live11s += 0.2;
                                        }
                                        if (float(GLF_live11i) >= GLF_live11limit) {
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                GLF_live7color = fract(acosh(clamp(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[3])), 1.0, 1000.0)));
                                GLF_live7color.x += (isnan(GLF_live7gl_FragCoord.x) ? log2(GLF_live7gl_FragCoord.x) : log2(GLF_live7gl_FragCoord.y));
                                ;
                            } else if (int(GLF_live7gl_FragCoord[1]) < 150) {
                                ;
                                {
                                    int GLF_live11i = _GLF_FUZZED(((26970 & (-61716)) | (-(-98558))));
                                    float GLF_live11limit = _GLF_FUZZED(8.2);
                                    float GLF_live11ref = _GLF_FUZZED((-3.2));
                                    float GLF_live11s = _GLF_FUZZED(543.141);
                                    {
                                        if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                            GLF_live11s += 0.2;
                                        }
                                        if (float(GLF_live11i) >= GLF_live11limit) {
                                            ;
                                        }
                                    }
                                }
                            } else if (int(GLF_live7gl_FragCoord[1]) < 180) {
                                GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[4]))));
                                GLF_live7color[1] += asinh(GLF_live7gl_FragCoord.y * ldexp(GLF_live7color.y, -GLF_live7i));
                                ;
                            } else if (int(GLF_live7gl_FragCoord[1]) < 210) {
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live7gl_FragCoord;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = GLF_live7gl_FragCoord;
                                    }
                                }
                                GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[5]))));
                                for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    GLF_live7color.y -= tanh(GLF_live7color.x) / cosh(GLF_live7color.y);
                                }
                                {
                                    int GLF_live11i = _GLF_FUZZED(-63369);
                                    float GLF_live11ref = _GLF_FUZZED((vec3(8.0, 9860.3142, -2.4) + (-2.9)).s);
                                    float GLF_live11s = _GLF_FUZZED((700.343));
                                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                        GLF_live11s += 0.2;
                                    }
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    {
                                        vec4 GLF_live8c = _GLF_FUZZED((vec4(-5.9, 1.5, -4444.4769, -0.4) + vec4(8.0, -155.604, -5384.1893, 9.2)));
                                        int GLF_live8i = _GLF_FUZZED(80475);
                                        {
                                            GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                                        }
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (int(GLF_live7gl_FragCoord[1]) < 240) {
                                    GLF_live7color = fract(asinh(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[6]))));
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                    GLF_live7color.y -= isnan(float(GLF_live7i)) ? tanh(GLF_live7gl_FragCoord.x) : atanh(GLF_live7gl_FragCoord.y / GLF_live7resolution.y);
                                    ;
                                } else {
                                    {
                                        int GLF_live12i = _GLF_FUZZED(-43883);
                                        float GLF_live12limit = _GLF_FUZZED((vec3(49.56, 4611.0011, 285.981) - (-1.3)).s);
                                        float GLF_live12result = _GLF_FUZZED(vec3(-9715.0266, -6526.6811, -34.56).t);
                                        float GLF_live12thirty_two = _GLF_FUZZED(-1137.1344);
                                        {
                                            if ((GLF_live12i % 32) == 0) {
                                                GLF_live12result += 0.4;
                                            } else {
                                                if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                    GLF_live12result += 100.0;
                                                }
                                            }
                                            if (float(GLF_live12i) >= GLF_live12limit) {
                                                ;
                                            }
                                        }
                                    }
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (int(GLF_live7gl_FragCoord[1]) < 270) {
                                            GLF_live7color = fract(sin(GLF_live7vecCoor.yx - trunc(float(GLF_live7data[7]))));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(9.9, -6.7, 7704.8578, -25.00);
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                _GLF_color = (vec4(-30.61, -0.4, 6067.8404, 684.479) * GLF_live10b_b);
                                            }
                                            GLF_live7color.y *= mix(normalize(GLF_live7vecCoor), normalize(vec3(GLF_live7color, degrees(GLF_live7color.x))), GLF_live7injectionSwitch.x).y;
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = round(vec4(GLF_live10h_r, GLF_live10time, GLF_live7injectionSwitch));
                                                }
                                                {
                                                    {
                                                        float GLF_live12limit = _GLF_FUZZED(6.4);
                                                        float GLF_live12result = _GLF_FUZZED(float(15951));
                                                        float GLF_live12thirty_two = _GLF_FUZZED(vec2(vec3(75.22, 2.9, -396.299)).y);
                                                        {
                                                            int GLF_live12looplimiter0 = 0;
                                                            for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                                                                if (GLF_live12looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live12looplimiter0++;
                                                                {
                                                                    if ((GLF_live12i % 32) == 0) {
                                                                        GLF_live12result += 0.4;
                                                                    } else {
                                                                        if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                                            GLF_live12result += 100.0;
                                                                        }
                                                                    }
                                                                    if (float(GLF_live12i) >= GLF_live12limit) {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    ;
                                                }
                                            }
                                            ;
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                ;
                                            } else {
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = _GLF_color;
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
                }
            }
        }
        if (int(gl_FragCoord[1]) < 60) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            {
                {
                    ;
                }
            }
            grey = 0.5 + float(data[1]) / 10.0;
            {
                int GLF_live13high = _GLF_FUZZED(((-91784) | 53768));
                int GLF_live13low = _GLF_FUZZED(24218);
                int GLF_live13m = _GLF_FUZZED(((-(-66678)) + 19781));
                do {
                    {
                        int GLF_live13looplimiter3 = 0;
                        for (int GLF_live13i = GLF_live13low; GLF_live13i < GLF_live13high; GLF_live13i += 2 * GLF_live13m) {
                            if (GLF_live13looplimiter3 >= 6) {
                                break;
                            }
                            GLF_live13looplimiter3++;
                            {
                                int GLF_live13from = GLF_live13i;
                                int GLF_live13mid = GLF_live13i + GLF_live13m - 1;
                                int GLF_live13to = min(GLF_live13i + 2 * GLF_live13m - 1, GLF_live13high);
                                GLF_live13merge(GLF_live13from, GLF_live13mid, GLF_live13to);
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                do {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = radians(_GLF_color);
                        {
                            float GLF_live12limit = _GLF_FUZZED((7.2 - 2948.5340));
                            float GLF_live12result = _GLF_FUZZED(vec3(-3006.7377, -91.51, 0.8).t);
                            float GLF_live12thirty_two = _GLF_FUZZED(93.16);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                int GLF_live12looplimiter0 = 0;
                                for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                                    if (GLF_live12looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live12looplimiter0++;
                                    {
                                        if ((GLF_live12i % 32) == 0) {
                                            GLF_live12result += 0.4;
                                        } else {
                                            if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                GLF_live12result += 100.0;
                                            }
                                        }
                                        if (float(GLF_live12i) >= GLF_live12limit) {
                                            ;
                                        }
                                    }
                                }
                            } else {
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                {
                    float GLF_live4limit = _GLF_FUZZED(9723.9821);
                    float GLF_live4result = _GLF_FUZZED(-33.76);
                    float GLF_live4thirty_two = _GLF_FUZZED((true ? 10.36 : (-3.6)));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-32.59, -2.7, -1973.9036, -0.1);
                            }
                            return;
                        }
                        int GLF_live4looplimiter0 = 0;
                        for (int GLF_live4i = 1; GLF_live4i < 800; GLF_live4i++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdyCoarse(_GLF_color);
                            }
                            if (GLF_live4looplimiter0 >= 5) {
                                {
                                    int GLF_live11i = _GLF_FUZZED(int(129447u));
                                    float GLF_live11ref = _GLF_FUZZED(float(-15759));
                                    float GLF_live11s = _GLF_FUZZED(86.47);
                                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                        GLF_live11s += 0.2;
                                    }
                                }
                                break;
                                if (_GLF_DEAD(false)) {
                                    break;
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        int GLF_live13high = _GLF_FUZZED(ivec3(-23339, -66307, 37840).t);
                                        int GLF_live13low = _GLF_FUZZED((((-84296) & (-25267)) & 98627));
                                        int GLF_live13m = _GLF_FUZZED(45444);
                                        {
                                            {
                                                int GLF_live13looplimiter3 = 0;
                                                for (int GLF_live13i = GLF_live13low; GLF_live13i < GLF_live13high; GLF_live13i += 2 * GLF_live13m) {
                                                    if (GLF_live13looplimiter3 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter3++;
                                                    {
                                                        int GLF_live13from = GLF_live13i;
                                                        int GLF_live13mid = GLF_live13i + GLF_live13m - 1;
                                                        int GLF_live13to = min(GLF_live13i + 2 * GLF_live13m - 1, GLF_live13high);
                                                        GLF_live13merge(GLF_live13from, GLF_live13mid, GLF_live13to);
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                                {
                                    vec3 GLF_live9color = _GLF_FUZZED(vec3(81.96, -7.6, 44.56));
                                    vec2 GLF_live9uv = _GLF_FUZZED(vec2(97.90, 5.0));
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            do {
                                                _GLF_color = _GLF_color;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                    if (GLF_live9uv.y > (1.0 / 4.0)) {
                                        GLF_live9color.x += float(GLF_live9obj.numbers[5]);
                                    }
                                }
                            }
                            GLF_live4looplimiter0++;
                            {
                                if ((GLF_live4i % 32) == 0) {
                                    GLF_live4result += 0.4;
                                } else {
                                    if (mod(float(GLF_live4i), round(GLF_live4thirty_two)) <= 0.01) {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                            {
                                                vec3 GLF_live9color = _GLF_FUZZED((vec3(-93.87, -2470.2054, -2195.1701) * vec3(7677.3615, -23.68, 3.7)));
                                                {
                                                    {
                                                        int GLF_live11looplimiter1 = 0;
                                                        if (GLF_live11looplimiter1 >= 4) {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live9color.x += float(GLF_live9obj.numbers[5]);
                                                }
                                            }
                                        }
                                        GLF_live4result += 100.0;
                                    }
                                }
                                if (float(GLF_live4i) >= GLF_live4limit) {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = atanh(_GLF_color);
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(0.0, -1.4, 622.701, -527.577);
                                    }
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_color = trunc(vec4(-512.221, 1421.0974, -8227.6450, -7.2));
                                    }
                                }
                            }
                        }
                    }
                }
                return;
            }
            if (int(gl_FragCoord[1]) < 90) {
                grey = 0.5 + float(data[2]) / 10.0;
                if (_GLF_DEAD(false)) {
                    return;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                    {
                        float GLF_live12result = _GLF_FUZZED(7604.3791);
                        {
                            GLF_live12result += 100.0;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        _GLF_color = _GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live7gl_FragCoord;
                }
                if (int(gl_FragCoord[1]) < 120) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                        _GLF_color = _GLF_color;
                    }
                    {
                        {
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(sqrt(0.0)))))) {
                                {
                                    vec4 GLF_live11c = _GLF_FUZZED((vec4(-6383.5143, -2.9, 8900.3351, 920.928) + vec4(31.47, 9.9, 1.8, -5.4)));
                                    {
                                        int GLF_live11looplimiter1 = 0;
                                        for (int GLF_live11i = 0; GLF_live11i < 3; GLF_live11i++) {
                                            if (GLF_live11looplimiter1 >= 4) {
                                                break;
                                            }
                                            GLF_live11looplimiter1++;
                                            {
                                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                                }
                                            }
                                        }
                                    }
                                }
                                _GLF_color = vec4(-973.512, 71.93, 5.3, -1409.3863);
                            }
                        }
                        {
                            float GLF_live11s = _GLF_FUZZED(7350.2346);
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bvec3(false, false, false))))) {
                            } else {
                                do {
                                    _GLF_color = (-GLF_live7gl_FragCoord);
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = mat3x4(-34.31, -31.03, 3412.2612, -1.4, -0.5, 64.44, 9.8, 28.09, -46.31, 596.012, -43.58, 7317.2921)[1];
                        }
                        int GLF_live1i = _GLF_FUZZED(1064);
                        float GLF_live1limit = _GLF_FUZZED(782.294);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            return;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        float GLF_live1ref = _GLF_FUZZED(float((155665u & 18649u)));
                        float GLF_live1s = _GLF_FUZZED((false ? (-865.499) : (-53.62)));
                        {
                            int GLF_live11i = _GLF_FUZZED(-63172);
                            float GLF_live11limit = _GLF_FUZZED(((-64.78) + (-8792.3854)));
                            float GLF_live11s = _GLF_FUZZED((5.9 * (-0.1)));
                            if (float(GLF_live11i) >= GLF_live11limit) {
                                ;
                            }
                        }
                        {
                            int GLF_live1looplimiter0 = 0;
                            if (_GLF_DEAD(false)) {
                                return;
                                {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = log(_GLF_color);
                                        } else {
                                        }
                                    }
                                    int GLF_live9h = _GLF_FUZZED(-8105);
                                    int GLF_live9i = _GLF_FUZZED(-55849);
                                    int GLF_live9l = _GLF_FUZZED(-24820);
                                    int GLF_live9looplimiter0 = 0;
                                    int GLF_live9pivot = _GLF_FUZZED(65551);
                                    {
                                        vec3 GLF_live12c = _GLF_FUZZED(vec3(5967.2048, -486.350, -83.80));
                                        int GLF_live12i = _GLF_FUZZED((false ? ((-5959) - 17165) : (-60871)));
                                        if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] >= 1.0) {
                                            for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                                            }
                                        }
                                    }
                                    for (int GLF_live9j = GLF_live9l; GLF_live9j <= GLF_live9h - 1; GLF_live9j++) {
                                        if (GLF_live9looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live9looplimiter0++;
                                        {
                                            if (GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] <= GLF_live9pivot) {
                                                GLF_live9i++;
                                                GLF_live9swap(GLF_live9i, GLF_live9j);
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sin(_GLF_color);
                                    {
                                        int GLF_live13j = _GLF_FUZZED(-83225);
                                        int GLF_live13k = _GLF_FUZZED((+97276));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j++, 10)];
                                        } else {
                                        }
                                    }
                                }
                            }
                            while (GLF_live1i < bitfieldInsert(800, GLF_live1i, 0, 0)) {
                                if (GLF_live1looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live1looplimiter0++;
                                {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = vec4(-8.9, -3.7, 0.8, -6736.4596);
                                            }
                                            return;
                                            {
                                                vec4 GLF_live8c = _GLF_FUZZED((vec3(37.27, 8.3, -746.119) * mat3(999.871, 16.38, 3.0, -99.14, -19.63, -9.2, -399.154, -21.51, 54.34)).xyyz);
                                                int GLF_live8i = _GLF_FUZZED(ivec3(73769, -93807, 48268).r);
                                                int GLF_live8looplimiter1 = 0;
                                                {
                                                    if (GLF_live8looplimiter1 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live8looplimiter1++;
                                                    {
                                                        if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] >= 1.0) {
                                                            GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                                                        }
                                                        GLF_live8i++;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = GLF_live8c;
                                                        }
                                                    }
                                                }
                                                {
                                                    int GLF_live11i = _GLF_FUZZED((~(-64069)));
                                                    float GLF_live11ref = _GLF_FUZZED(60.38);
                                                    float GLF_live11s = _GLF_FUZZED(float(((-41511) + (27575 & 63283))));
                                                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                                        GLF_live11s += 0.2;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        bool GLF_live10c3 = _GLF_FUZZED(false);
                                        if (!GLF_live10c3) {
                                            ;
                                        }
                                    }
                                    if (mod(float(GLF_live1i), GLF_live1ref) <= 0.01) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = GLF_live7gl_FragCoord;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = asin(vec4(4144.1518, 0.8, -2363.2720, -74.07));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                        GLF_live1s += 0.2;
                                    }
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(sin(0.0)))))) {
                                            _GLF_color = vec4(GLF_live1ref, GLF_live1limit, mod(injectionSwitch, GLF_live7resolution));
                                        }
                                    }
                                    if (float(GLF_live1i) >= GLF_live1limit) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            ;
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    GLF_live1i++;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            vec4 GLF_live11c = _GLF_FUZZED(vec4(83.61));
                            int GLF_live11i = _GLF_FUZZED(-21895);
                            {
                                if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                    GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                }
                            }
                        }
                        _GLF_color = vec4(-800.050, 922.712, 58.21, -1585.2726);
                        {
                            vec4 GLF_live11c = _GLF_FUZZED((vec4(-562.603, 465.382, -7.7, -528.527) + vec4(vec3(3963.9665, -39.85, 0.9).tp, vec2(-380.424, -11.34))));
                            {
                                int GLF_live11looplimiter1 = 0;
                                for (int GLF_live11i = 0; GLF_live11i < 3; GLF_live11i++) {
                                    if (GLF_live11looplimiter1 >= 4) {
                                        break;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        GLF_live11looplimiter1++;
                                    }
                                    {
                                        if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                            GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        vec2 GLF_live5coord = _GLF_FUZZED(vec2(9944.3076, 72.98));
                        int GLF_live5i = _GLF_FUZZED(-42910);
                        int GLF_live5looplimiter0 = 0;
                        {
                            if (GLF_live5looplimiter0 >= 7) {
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = trunc((mat3x4(-64.08, -5576.4741, -3923.3512, 4.9, 2782.9218, 2.9, 29.79, 74.95, 70.09, -41.74, -2.0, 3588.6741) * vec3(5997.5781, -315.901, -87.30)));
                            }
                            GLF_live5looplimiter0++;
                            {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                    if (GLF_live5coord.x > 1.0)
                                        GLF_live5coord.x -= 1.0;
                                }
                                if (GLF_live5coord.y > 1.0) {
                                    {
                                        int GLF_live8i = _GLF_FUZZED(-80930);
                                        float GLF_live8limit = _GLF_FUZZED(vec3(-8076.3446, 6.2, -9159.3953).z);
                                        float GLF_live8ref = _GLF_FUZZED(8.4);
                                        float GLF_live8s = _GLF_FUZZED(78.02);
                                        {
                                            {
                                                {
                                                    int GLF_live13looplimiter6 = 0;
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        for (int GLF_live13j = 0; GLF_live13j < 10; GLF_live13j++) {
                                                            if (GLF_live13looplimiter6 >= 6) {
                                                                break;
                                                            }
                                                            GLF_live13looplimiter6++;
                                                            {
                                                                GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)];
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                }
                                            }
                                            if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                                                GLF_live8s += 0.2;
                                            }
                                            if (float(GLF_live8i) >= GLF_live8limit) {
                                                ;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = fwidth(vec4(4080.2769, 1578.0682, 67.94, -120.194));
                                            }
                                            GLF_live8i++;
                                        }
                                    }
                                    GLF_live5coord.y -= 1.0;
                                }
                                GLF_live5coord *= 2.0;
                                GLF_live5i++;
                            }
                        }
                        {
                            int GLF_live9looplimiter1 = 0;
                            if (GLF_live9looplimiter1 >= 7) {
                                ;
                            }
                        }
                    }
                    grey = 0.5 + float(data[3]) / 10.0;
                    {
                        vec2 GLF_live5coord = _GLF_FUZZED(vec2(7194.4195, 9.1));
                        vec4 GLF_live5res = _GLF_FUZZED(vec4(-8456.8500, -4.6, 1115.6480, -10.34));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_color;
                        }
                        if (GLF_live5coord.x < 1.0 && GLF_live5coord.y < 1.0) {
                            GLF_live5res = texture(GLF_live5tex, GLF_live5coord);
                        }
                    }
                    {
                        int GLF_live12i = _GLF_FUZZED(86561);
                        float GLF_live12limit = _GLF_FUZZED(-3565.4418);
                        int GLF_live12looplimiter0 = 0;
                        float GLF_live12result = _GLF_FUZZED(vec3(-1.5, -7.4, 5498.8190).b);
                        float GLF_live12thirty_two = _GLF_FUZZED(-121.682);
                        {
                            if (GLF_live12looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live12looplimiter0++;
                            {
                                if ((GLF_live12i % 32) == 0) {
                                    GLF_live12result += 0.4;
                                } else {
                                    if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                        GLF_live12result += 100.0;
                                    }
                                }
                                if (float(GLF_live12i) >= GLF_live12limit) {
                                    ;
                                }
                            }
                        }
                    }
                } else {
                    if (int(gl_FragCoord[1]) < 150) {
                        do {
                            discard;
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(9164.8447, -817.221, 35.36, 6.5);
                                }
                                return;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = reflect(vec4(764.852, -1.4, 0.8, -129.340), (GLF_live7gl_FragCoord * GLF_live10b_b));
                                }
                            }
                            vec2 GLF_live5coord = _GLF_FUZZED(vec2(-3.0, -700.123));
                            int GLF_live5i = _GLF_FUZZED(7452);
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = outerProduct(vec4(-918.024, -55.32, 33.20, 10.68), vec4(-380.981, -942.681, -1.5, -640.537))[1];
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = GLF_live7gl_FragCoord;
                                    }
                                }
                                int GLF_live5looplimiter0 = 0;
                                while (GLF_live5i < 1 && GLF_live5coord.x > 1.0 || GLF_live5coord.y > 1.0) {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (GLF_live5looplimiter0 >= 7) {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                vec4 GLF_live11c = _GLF_FUZZED(vec4(-144.088, -9.0, -350.509, -5934.5340));
                                                int GLF_live11looplimiter1 = 0;
                                                for (int GLF_live11i = 0; GLF_live11i < 3; GLF_live11i++) {
                                                    if (GLF_live11looplimiter1 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live11looplimiter1++;
                                                    {
                                                        if (GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] >= 1.0) {
                                                            GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] = GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)];
                                                        }
                                                    }
                                                }
                                            }
                                            _GLF_color = log2(clamp(vec4(-7.2, -3.1, 6936.1266, -144.607), _GLF_color, _GLF_color));
                                        }
                                        {
                                            int GLF_live8i = _GLF_FUZZED(73329);
                                            float GLF_live8limit = _GLF_FUZZED(float(12420));
                                            float GLF_live8ref = _GLF_FUZZED((true ? 5.6 : (-831.676)));
                                            {
                                                vec3 GLF_live12c = _GLF_FUZZED((mat3(5.2, -3.7, -815.080, -5.0, 310.458, -8.2, -4.3, 867.286, 447.378) * vec3(7563.5225, -39.98, -82.51)));
                                                int GLF_live12i = _GLF_FUZZED((+(-83128)));
                                                int GLF_live12looplimiter1 = 0;
                                                {
                                                    if (GLF_live12looplimiter1 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live12looplimiter1++;
                                                    {
                                                        if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] >= 1.0) {
                                                            GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                                                        }
                                                    }
                                                }
                                            }
                                            float GLF_live8s = _GLF_FUZZED(vec3(-0.7, 615.085, -670.495).r);
                                            {
                                                int GLF_live8looplimiter0 = 0;
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    while (GLF_live8i < bitfieldInsert(800, GLF_live8i, 0, 0)) {
                                                        if (GLF_live8looplimiter0 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live8looplimiter0++;
                                                        {
                                                            if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                                                                GLF_live8s += 0.2;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = GLF_live7gl_FragCoord;
                                                                }
                                                            }
                                                            if (float(GLF_live8i) >= GLF_live8limit) {
                                                                ;
                                                            }
                                                            GLF_live8i++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live5looplimiter0++;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (GLF_live5coord.x > 1.0) {
                                            {
                                                bool GLF_live10c3 = _GLF_FUZZED(((-8.1) <= 6.3));
                                                if (!GLF_live10c3) {
                                                    {
                                                        vec2 GLF_live13color = _GLF_FUZZED((vec2(-9.7, -796.443) - 782.882));
                                                        int GLF_live13i = _GLF_FUZZED(79060);
                                                        vec3 GLF_live13vecCoor = _GLF_FUZZED(vec3(-0.1, 9.8, -6.4));
                                                        if (int(GLF_live13gl_FragCoord[1]) < 150) {
                                                            ;
                                                        } else if (int(GLF_live13gl_FragCoord[1]) < 180) {
                                                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[4]))));
                                                            GLF_live13color[1] += asinh(GLF_live13gl_FragCoord.y * ldexp(GLF_live13color.y, -GLF_live13i));
                                                            ;
                                                        } else if (int(GLF_live13gl_FragCoord[1]) < 210) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[5]))));
                                                            } else {
                                                            }
                                                            GLF_live13color.y -= tanh(GLF_live13color.x) / cosh(GLF_live13color.y);
                                                            ;
                                                        } else if (int(GLF_live13gl_FragCoord[1]) < 240) {
                                                            GLF_live13color = fract(asinh(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[6]))));
                                                            GLF_live13color.y -= isnan(float(GLF_live13i)) ? tanh(GLF_live13gl_FragCoord.x) : atanh(GLF_live13gl_FragCoord.y / GLF_live13resolution.y);
                                                            ;
                                                        } else if (int(GLF_live13gl_FragCoord[1]) < 270) {
                                                            GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[7]))));
                                                            GLF_live13color.y *= mix(normalize(GLF_live13vecCoor), normalize(vec3(GLF_live13color, degrees(GLF_live13color.x))), GLF_live13injectionSwitch.x).y;
                                                            ;
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                    ;
                                                }
                                                {
                                                    float GLF_live11s = _GLF_FUZZED(-33.55);
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                            GLF_live5coord.x -= 1.0;
                                        }
                                        if (GLF_live5coord.y > 1.0)
                                            GLF_live5coord.y -= 1.0;
                                        {
                                            int GLF_live11looplimiter1 = 0;
                                            if (GLF_live11looplimiter1 >= 4) {
                                                ;
                                            }
                                        }
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        GLF_live5coord *= 2.0;
                                        GLF_live5i++;
                                    }
                                }
                                {
                                    int GLF_live13looplimiter5 = 0;
                                    if (GLF_live13looplimiter5 >= 6) {
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(3.7, 5.5, -4.1, 37.91);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                            {
                                int GLF_live13high = _GLF_FUZZED(3147);
                                int GLF_live13low = _GLF_FUZZED(82574);
                                {
                                    int GLF_live13looplimiter4 = 0;
                                    for (int GLF_live13m = 1; GLF_live13m <= GLF_live13high; GLF_live13m = 2 * GLF_live13m) {
                                        if (GLF_live13looplimiter4 >= 6) {
                                            break;
                                        }
                                        GLF_live13looplimiter4++;
                                        {
                                            {
                                                int GLF_live13looplimiter3 = 0;
                                                for (int GLF_live13i = GLF_live13low; GLF_live13i < GLF_live13high; GLF_live13i += 2 * GLF_live13m) {
                                                    if (GLF_live13looplimiter3 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter3++;
                                                    {
                                                        int GLF_live13from = GLF_live13i;
                                                        int GLF_live13mid = GLF_live13i + GLF_live13m - 1;
                                                        int GLF_live13to = min(GLF_live13i + 2 * GLF_live13m - 1, GLF_live13high);
                                                        GLF_live13merge(GLF_live13from, GLF_live13mid, GLF_live13to);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(false, false, false, false)), (bool(bvec4(false, false, false, false))) || false)))) {
                                _GLF_color = inversesqrt(GLF_live7gl_FragCoord);
                            }
                        } else {
                            if (int(gl_FragCoord[1]) < 180) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                                    {
                                        int GLF_live1i = _GLF_FUZZED(39970);
                                        float GLF_live1limit = _GLF_FUZZED(-41.35);
                                        float GLF_live1ref = _GLF_FUZZED(float(ivec2(62301, -5277).t));
                                        float GLF_live1s = _GLF_FUZZED((-334.140));
                                        {
                                            int GLF_live1looplimiter0 = 0;
                                            while (GLF_live1i < bitfieldInsert(800, GLF_live1i, 0, 0)) {
                                                if (GLF_live1looplimiter0 >= 7) {
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                }
                                                GLF_live1looplimiter0++;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    discard;
                                                    {
                                                        int GLF_live8i = _GLF_FUZZED(int(27543u));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = refract(vec4(6.0, 7.7, -8.9, 2440.2438), ceil(GLF_live7gl_FragCoord), GLF_live1ref);
                                                        }
                                                        float GLF_live8limit = _GLF_FUZZED(8.1);
                                                        float GLF_live8ref = _GLF_FUZZED(421.277);
                                                        float GLF_live8s = _GLF_FUZZED(-55.87);
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                            if (mod(float(GLF_live8i), GLF_live8ref) <= 0.01) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = uintBitsToFloat(clamp(uvec4(118537u, 194799u, 188846u, 117582u), 155260u, 90951u));
                                                                }
                                                                GLF_live8s += 0.2;
                                                            }
                                                            if (float(GLF_live8i) >= GLF_live8limit) {
                                                                {
                                                                    vec2 GLF_live13color = _GLF_FUZZED((vec2(5519.6565, 625.589) * (-24.08)));
                                                                    int GLF_live13i = _GLF_FUZZED((ivec3(25011, -98934, -78743).z * (+17094)));
                                                                    vec3 GLF_live13vecCoor = _GLF_FUZZED((mat3(51.75, 0.4, -4141.8283, -617.567, 555.416, 3316.0717, -92.84, 9.7, -5.9) * (vec3(6.4, 6.1, -71.34) * vec3(978.562, -12.14, 3.1))));
                                                                    {
                                                                        int GLF_live13looplimiter7 = 0;
                                                                        do {
                                                                            if (GLF_live13looplimiter7 >= 6) {
                                                                                break;
                                                                            }
                                                                            GLF_live13looplimiter7++;
                                                                            {
                                                                                if (int(GLF_live13gl_FragCoord[1]) < 30) {
                                                                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[0]))));
                                                                                    GLF_live13color[0] = dFdy(GLF_live13gl_FragCoord.y);
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 60) {
                                                                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[1]))));
                                                                                    GLF_live13color[1] *= atan(faceforward(GLF_live13injectionSwitch, GLF_live13color.xx, GLF_live13vecCoor.yx).y);
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 90) {
                                                                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[2]))));
                                                                                    GLF_live13color.x += atanh(GLF_live13color.x) * cosh(GLF_live13injectionSwitch.y) * smoothstep(GLF_live13color, GLF_live13injectionSwitch, GLF_live13gl_FragCoord.yy).x;
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 120) {
                                                                                    GLF_live13color = fract(acosh(clamp(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[3])), 1.0, 1000.0)));
                                                                                    GLF_live13color.x += (isnan(GLF_live13gl_FragCoord.x) ? log2(GLF_live13gl_FragCoord.x) : log2(GLF_live13gl_FragCoord.y));
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 150) {
                                                                                    ;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 180) {
                                                                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[4]))));
                                                                                    GLF_live13color[1] += asinh(GLF_live13gl_FragCoord.y * ldexp(GLF_live13color.y, -GLF_live13i));
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 210) {
                                                                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[5]))));
                                                                                    GLF_live13color.y -= tanh(GLF_live13color.x) / cosh(GLF_live13color.y);
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 240) {
                                                                                    GLF_live13color = fract(asinh(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[6]))));
                                                                                    GLF_live13color.y -= isnan(float(GLF_live13i)) ? tanh(GLF_live13gl_FragCoord.x) : atanh(GLF_live13gl_FragCoord.y / GLF_live13resolution.y);
                                                                                    break;
                                                                                } else if (int(GLF_live13gl_FragCoord[1]) < 270) {
                                                                                    GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[7]))));
                                                                                    GLF_live13color.y *= mix(normalize(GLF_live13vecCoor), normalize(vec3(GLF_live13color, degrees(GLF_live13color.x))), GLF_live13injectionSwitch.x).y;
                                                                                    break;
                                                                                } else {
                                                                                    ;
                                                                                }
                                                                            }
                                                                        } while (0 == int(GLF_live13injectionSwitch.x));
                                                                    }
                                                                }
                                                                ;
                                                            }
                                                            GLF_live8i++;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(-7.7, 6.9, 25.77, 9166.1683);
                                                        }
                                                    }
                                                }
                                                {
                                                    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), int(8))); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((_GLF_IDENTITY(1, max(1, 1)) << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                                                        if (mod(float(GLF_live1i), GLF_live1ref) <= 0.01) {
                                                            GLF_live1s += 0.2;
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            {
                                                                int GLF_live14looplimiter0 = 0;
                                                                if (GLF_live14looplimiter0 >= 7) {
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                        ;
                                                                    } else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (float(GLF_live1i) >= GLF_live1limit) {
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                    }
                                                    GLF_live1i++;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                    }
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live7gl_FragCoord;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (_GLF_color + GLF_live10b_b);
                                }
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                int GLF_live11looplimiter0 = 0;
                                                if (GLF_live11looplimiter0 >= 4) {
                                                    ;
                                                }
                                            }
                                            _GLF_color = (mat3x4(-89.35, 24.27, -65.51, -7393.6626, 3429.3849, -86.35, -60.55, 0.8, 27.80, -8117.0296, 5.3, 444.279) * mat4x3(mat3x2(5440.7245, -54.50, -4.3, -6936.2274, -3.9, 11.40)))[1];
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                do {
                                                    discard;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                            {
                                                vec2 GLF_live10pos = _GLF_FUZZED(vec2(-961.342, 3.6));
                                                vec3 GLF_live10setting = _GLF_FUZZED(vec2(-6411.6491, 21.38).sts);
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            grey = 0.5 + float(data[5]) / 10.0;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = asin(vec4(vec2(-604.461, 4.3), GLF_live7resolution));
                                    }
                                }
                            } else {
                                if (int(gl_FragCoord[1]) < 210) {
                                    {
                                        int GLF_live11i = _GLF_FUZZED(-80858);
                                        float GLF_live11limit = _GLF_FUZZED(-9676.4601);
                                        int GLF_live11looplimiter0 = 0;
                                        float GLF_live11ref = _GLF_FUZZED(((-23.49) - 48.65));
                                        float GLF_live11s = _GLF_FUZZED(vec4(3602.3231, -8.6, 6.5, -7.5).x);
                                        {
                                            if (GLF_live11looplimiter0 >= 4) {
                                                ;
                                            }
                                            GLF_live11looplimiter0++;
                                            {
                                                if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                                    GLF_live11s += 0.2;
                                                }
                                                if (float(GLF_live11i) >= GLF_live11limit) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = fwidthCoarse(GLF_live7gl_FragCoord);
                                    }
                                    grey = 0.5 + float(data[6]) / 10.0;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            int GLF_live6looplimiter0 = 0;
                                            if (GLF_live6looplimiter0 >= 7) {
                                                ;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            {
                                                float GLF_live12limit = _GLF_FUZZED(6297.4486);
                                                float GLF_live12result = _GLF_FUZZED((true ? ((-6.7) * (-1.2)) : 488.080));
                                                float GLF_live12thirty_two = _GLF_FUZZED(-94.49);
                                                {
                                                    int GLF_live12looplimiter0 = 0;
                                                    for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                                                        if (GLF_live12looplimiter0 >= 5) {
                                                            break;
                                                        }
                                                        GLF_live12looplimiter0++;
                                                        {
                                                            if ((GLF_live12i % 32) == 0) {
                                                                GLF_live12result += 0.4;
                                                            } else {
                                                                if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                                                    GLF_live12result += 100.0;
                                                                }
                                                            }
                                                            if (float(GLF_live12i) >= GLF_live12limit) {
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
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                } else {
                                    if (int(gl_FragCoord[1]) < 240) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            do {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = atan(smoothstep(-72.36, GLF_live10b_b, GLF_live7gl_FragCoord), _GLF_color);
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            _GLF_color = vec4(injectionSwitch, GLF_live10h_r, grey);
                                        }
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            {
                                                ;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            {
                                                int GLF_live11looplimiter0 = 0;
                                                if (GLF_live11looplimiter0 >= 4) {
                                                    ;
                                                }
                                            }
                                        }
                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, (0) * 1)); _injected_loop_counter--) {
                                            grey = 0.5 + float(data[7]) / 10.0;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                    } else {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        return;
                                                    }
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            return;
                                                        }
                                                        int GLF_live5looplimiter0 = 0;
                                                        if (GLF_live5looplimiter0 >= 7) {
                                                            ;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    int GLF_live3looplimiter3 = 0;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        return;
                                                    }
                                                    do {
                                                        if (GLF_live3looplimiter3 >= 4) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                                                {
                                                                    int GLF_live13high = _GLF_FUZZED(32204);
                                                                    int GLF_live13low = _GLF_FUZZED(ivec2(65818, -15101).s);
                                                                    int GLF_live13m = _GLF_FUZZED(-84730);
                                                                    {
                                                                        {
                                                                            int GLF_live13looplimiter3 = 0;
                                                                            for (int GLF_live13i = GLF_live13low; GLF_live13i < GLF_live13high; GLF_live13i += 2 * GLF_live13m) {
                                                                                if (GLF_live13looplimiter3 >= 6) {
                                                                                    break;
                                                                                }
                                                                                GLF_live13looplimiter3++;
                                                                                {
                                                                                    int GLF_live13from = GLF_live13i;
                                                                                    int GLF_live13mid = GLF_live13i + GLF_live13m - 1;
                                                                                    int GLF_live13to = min(GLF_live13i + 2 * GLF_live13m - 1, GLF_live13high);
                                                                                    GLF_live13merge(GLF_live13from, GLF_live13mid, GLF_live13to);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                return;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                            ;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-9477.7140, 34.28, -443.040, 4.3);
                                                    }
                                                }
                                                if (int(gl_FragCoord[1]) < 270) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        grey = 0.5 + float(data[8]) / 10.0;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                            _GLF_color = mix(GLF_live7gl_FragCoord, vec4(5.9, 987.814, 7.6, 9.6), lessThanEqual(vec4(-3.5, 60.23, -89.30, 3996.4883), vec4(511.149, -6716.3363, 286.020, 7.8)));
                                                        }
                                                        {
                                                            int GLF_live8looplimiter0 = 0;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = inversesqrt(faceforward(vec4(405.778, -7052.7899, 72.67, 8370.2580), _GLF_color, vec4(2.5, -397.665, 7.9, -0.2)));
                                                            }
                                                            if (GLF_live8looplimiter0 >= 5) {
                                                                ;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_live7gl_FragCoord;
                                                        }
                                                        return;
                                                    }
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        } else {
                                                            {
                                                                bool GLF_live10c6 = _GLF_FUZZED((true || true));
                                                                vec2 GLF_live10pos = _GLF_FUZZED(vec2(-219.210, -332.426));
                                                                vec3 GLF_live10setting = _GLF_FUZZED(vec3(-7.9, -7.3, -8.6));
                                                                if (!GLF_live10c6) {
                                                                    {
                                                                        vec2 GLF_live13color = _GLF_FUZZED(vec2(-8.6, -21.93));
                                                                        int GLF_live13i = _GLF_FUZZED(32176);
                                                                        vec3 GLF_live13vecCoor = _GLF_FUZZED(vec3(68.29, 22.21, -97.71));
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(0.0))))) {
                                                                            if (int(GLF_live13gl_FragCoord[1]) < 120) {
                                                                                GLF_live13color = fract(acosh(clamp(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[3])), 1.0, 1000.0)));
                                                                                GLF_live13color.x += (isnan(GLF_live13gl_FragCoord.x) ? log2(GLF_live13gl_FragCoord.x) : log2(GLF_live13gl_FragCoord.y));
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 150) {
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 180) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[4]))));
                                                                                GLF_live13color[1] += asinh(GLF_live13gl_FragCoord.y * ldexp(GLF_live13color.y, -GLF_live13i));
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 210) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[5]))));
                                                                                GLF_live13color.y -= tanh(GLF_live13color.x) / cosh(GLF_live13color.y);
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 240) {
                                                                                GLF_live13color = fract(asinh(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[6]))));
                                                                                GLF_live13color.y -= isnan(float(GLF_live13i)) ? tanh(GLF_live13gl_FragCoord.x) : atanh(GLF_live13gl_FragCoord.y / GLF_live13resolution.y);
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 270) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[7]))));
                                                                                GLF_live13color.y *= mix(normalize(GLF_live13vecCoor), normalize(vec3(GLF_live13color, degrees(GLF_live13color.x))), GLF_live13injectionSwitch.x).y;
                                                                                ;
                                                                            } else {
                                                                                ;
                                                                            }
                                                                        } else {
                                                                        }
                                                                    }
                                                                    ;
                                                                }
                                                            }
                                                            return;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = atan(vec4(45.42, -4.9, -4.4, 1.8));
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    do {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                            continue;
                                                            {
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                                int GLF_live6looplimiter1 = 0;
                                                                if (GLF_live6looplimiter1 >= 7) {
                                                                    ;
                                                                }
                                                                {
                                                                    vec2 GLF_live13color = _GLF_FUZZED(vec2(-5909.3579, -93.33));
                                                                    int GLF_live13i = _GLF_FUZZED(((-15442) * 99470));
                                                                    int GLF_live13looplimiter7 = 0;
                                                                    vec3 GLF_live13vecCoor = _GLF_FUZZED((false ? vec4(-22.95, -1.6, 1.3, -2.7) : vec4(-8222.7324, -1748.0077, -0.2, -10.93)).wwz);
                                                                    {
                                                                        if (GLF_live13looplimiter7 >= 6) {
                                                                            ;
                                                                        }
                                                                        GLF_live13looplimiter7++;
                                                                        {
                                                                            if (int(GLF_live13gl_FragCoord[1]) < 30) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[0]))));
                                                                                GLF_live13color[0] = dFdy(GLF_live13gl_FragCoord.y);
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 60) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[1]))));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    GLF_live13color[1] *= atan(faceforward(GLF_live13injectionSwitch, GLF_live13color.xx, GLF_live13vecCoor.yx).y);
                                                                                } else {
                                                                                }
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 90) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[2]))));
                                                                                GLF_live13color.x += atanh(GLF_live13color.x) * cosh(GLF_live13injectionSwitch.y) * smoothstep(GLF_live13color, GLF_live13injectionSwitch, GLF_live13gl_FragCoord.yy).x;
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 120) {
                                                                                GLF_live13color = fract(acosh(clamp(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[3])), 1.0, 1000.0)));
                                                                                GLF_live13color.x += (isnan(GLF_live13gl_FragCoord.x) ? log2(GLF_live13gl_FragCoord.x) : log2(GLF_live13gl_FragCoord.y));
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 150) {
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 180) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[4]))));
                                                                                GLF_live13color[1] += asinh(GLF_live13gl_FragCoord.y * ldexp(GLF_live13color.y, -GLF_live13i));
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 210) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[5]))));
                                                                                GLF_live13color.y -= tanh(GLF_live13color.x) / cosh(GLF_live13color.y);
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 240) {
                                                                                GLF_live13color = fract(asinh(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[6]))));
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | (52759 & 0))); _injected_loop_counter--) {
                                                                                    GLF_live13color.y -= isnan(float(GLF_live13i)) ? tanh(GLF_live13gl_FragCoord.x) : atanh(GLF_live13gl_FragCoord.y / GLF_live13resolution.y);
                                                                                }
                                                                                ;
                                                                            } else if (int(GLF_live13gl_FragCoord[1]) < 270) {
                                                                                GLF_live13color = fract(sin(GLF_live13vecCoor.yx - trunc(float(GLF_live13data[7]))));
                                                                                GLF_live13color.y *= mix(normalize(GLF_live13vecCoor), normalize(vec3(GLF_live13color, degrees(GLF_live13color.x))), GLF_live13injectionSwitch.x).y;
                                                                                ;
                                                                            } else {
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = normalize(vec4(-3065.7632, 5.8, 1.6, -5569.9782));
                                                            }
                                                        }
                                                        {
                                                            int GLF_live9looplimiter2 = 0;
                                                            for (int GLF_live9i = 0; GLF_live9i < 10; GLF_live9i++) {
                                                                if (GLF_live9looplimiter2 >= 7) {
                                                                    break;
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = GLF_live7gl_FragCoord;
                                                                    }
                                                                }
                                                                {
                                                                    int GLF_live13looplimiter2 = 0;
                                                                    if (GLF_live13looplimiter2 >= 6) {
                                                                        ;
                                                                    }
                                                                }
                                                                GLF_live9looplimiter2++;
                                                                {
                                                                    GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] = (10 - GLF_live9i);
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                    GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] = GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] * GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)];
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                            }
                                                        }
                                                        discard;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            } else {
                                                {
                                                    vec2 GLF_live10center = _GLF_FUZZED(vec2(-6.8, 2885.0085).tt);
                                                    int GLF_live10looplimiter0 = 0;
                                                    vec2 GLF_live10position = _GLF_FUZZED((mat3x2(mat3(-7.9, 49.10, -4.5, 1.8, 2552.6354, 800.308, 55.39, 651.899, -543.673)) * vec3(129.935, -3577.3665, -7.5)));
                                                    vec3 GLF_live10result = _GLF_FUZZED(vec3(257.514, -8925.5881, 446.885));
                                                    for (int GLF_live10i = 35; GLF_live10i >= 0; GLF_live10i--) {
                                                        if (GLF_live10looplimiter0 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live10looplimiter0++;
                                                        {
                                                            {
                                                                int GLF_live13i = _GLF_FUZZED((+((-74265) - (-86697))));
                                                                int GLF_live13looplimiter5 = 0;
                                                                do {
                                                                    if (GLF_live13looplimiter5 >= 6) {
                                                                        break;
                                                                    }
                                                                    GLF_live13looplimiter5++;
                                                                    {
                                                                        switch (GLF_live13i) {
                                                                            case 0:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 4;
                                                                                break;
                                                                            case 1:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 3;
                                                                                break;
                                                                            case 2:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 2;
                                                                                break;
                                                                            case 3:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 1;
                                                                                break;
                                                                            case 4:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = 0;
                                                                                break;
                                                                            case 5:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -1;
                                                                                break;
                                                                            case 6:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -2;
                                                                                break;
                                                                            case 7:
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -3;
                                                                                } else {
                                                                                }
                                                                                break;
                                                                            case 8:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -4;
                                                                                break;
                                                                            case 9:
                                                                                GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] = -5;
                                                                                break;
                                                                        }
                                                                        GLF_live13i++;
                                                                    }
                                                                } while (GLF_live13i < 10);
                                                            }
                                                            vec3 GLF_live10d = _GLF_FUZZED(vec3(-0.6, 8413.8936, -597.152));
                                                            GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / 10.0 + GLF_live10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live10i) / 100.0), 0.01, float(GLF_live10i)));
                                                            if (length(GLF_live10d) <= 0.0) {
                                                                continue;
                                                            }
                                                            GLF_live10result = vec3(GLF_live10d);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(sin(0.0)))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                                    _GLF_color = GLF_live7gl_FragCoord;
                                                }
                                                {
                                                    bool GLF_live10c3 = _GLF_FUZZED(false);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = vec4(GLF_live10time, 97.69, GLF_live7resolution);
                                                    }
                                                    {
                                                        int GLF_live13i = _GLF_FUZZED((17143 * int((mat2(-3.7, -59.05, 921.912, -524.783) != mat2(-9175.2174, 2.3, -949.341, -3777.2649)))));
                                                        int GLF_live13j = _GLF_FUZZED(-9487);
                                                        int GLF_live13k = _GLF_FUZZED(((-58704) | (false ? ivec3(60684, 25706, 89467).p : (-61156))));
                                                        if (GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 10)] < GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)]) {
                                                            GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i++, 10)];
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k++, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j++, 10)];
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                    if (!GLF_live10c3) {
                                                        ;
                                                    }
                                                }
                                                return;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            return;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                {
                                                    vec3 GLF_live12c = _GLF_FUZZED(vec3(794.334, 47.65, 9.8));
                                                    int GLF_live12i = _GLF_FUZZED(ivec3(37114, -75084, -86336).b);
                                                    {
                                                        GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 3)];
                                                    }
                                                }
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_live7gl_FragCoord;
                                                    }
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                        }
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = vec4(exp2(GLF_live10b_b), GLF_live7resolution, float(99961));
                                            }
                                            vec2 GLF_live10center = _GLF_FUZZED(vec2(vec3(-5.2)));
                                            int GLF_live10looplimiter0 = 0;
                                            {
                                                {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                        ;
                                                    }
                                                }
                                            }
                                            vec2 GLF_live10position = _GLF_FUZZED(((-9.4) + vec2(91.93, 321.116)));
                                            vec3 GLF_live10result = _GLF_FUZZED(vec3(3.7, 4.5, -4076.5310));
                                            for (int GLF_live10i = 35; GLF_live10i >= 0; GLF_live10i--) {
                                                if (GLF_live10looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live10looplimiter0++;
                                                {
                                                    vec3 GLF_live10d = _GLF_FUZZED(vec3(-0.6, 8413.8936, -597.152));
                                                    GLF_live10d = GLF_live10drawShape(GLF_live10position, GLF_live10center + vec2(sin(float(GLF_live10i) / 10.0 + GLF_live10time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live10i) / 100.0), 0.01, float(GLF_live10i)));
                                                    if (length(GLF_live10d) <= 0.0) {
                                                        continue;
                                                    }
                                                    {
                                                        int GLF_live12looplimiter1 = 0;
                                                        if (GLF_live12looplimiter1 >= 5) {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live10result = vec3(GLF_live10d);
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        do {
                                            {
                                                int GLF_live11i = _GLF_FUZZED((~58041));
                                                float GLF_live11limit = _GLF_FUZZED(vec3(7.9, -3.1, -203.036).g);
                                                float GLF_live11ref = _GLF_FUZZED(-304.353);
                                                float GLF_live11s = _GLF_FUZZED(float(175644u));
                                                {
                                                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                                                        GLF_live11s += 0.2;
                                                    }
                                                    if (float(GLF_live11i) >= GLF_live11limit) {
                                                        ;
                                                    }
                                                }
                                            }
                                            return;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                }
                            }
                            {
                                int GLF_live12i = _GLF_FUZZED(int((3216u * 48675u)));
                                float GLF_live12limit = _GLF_FUZZED((8.0 + (-2.1)));
                                float GLF_live12result = _GLF_FUZZED(-3.0);
                                float GLF_live12thirty_two = _GLF_FUZZED((6.3 * (+7.7)));
                                {
                                    if ((GLF_live12i % 32) == 0) {
                                        GLF_live12result += 0.4;
                                    } else {
                                        if (mod(float(GLF_live12i), round(GLF_live12thirty_two)) <= 0.01) {
                                            GLF_live12result += 100.0;
                                        }
                                    }
                                    if (float(GLF_live12i) >= GLF_live12limit) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            ;
                                        } else {
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live7gl_FragCoord;
                            }
                        }
                        {
                            {
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = sin(vec4(9.5, 91.27, 22.05, -9.4));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        return;
                                    }
                                    ;
                                    {
                                        int GLF_live8looplimiter1 = 0;
                                        if (GLF_live8looplimiter1 >= 5) {
                                            ;
                                        }
                                    }
                                }
                            }
                            vec2 GLF_live2a = _GLF_FUZZED(vec2(-438.256, 7168.6406));
                            float GLF_live2z = _GLF_FUZZED(float(173179u));
                            if (GLF_live2a.y > GLF_live2a.x) {
                                GLF_live2z = GLF_live2a.x / GLF_live2a.y;
                            } else {
                                GLF_live2z = GLF_live2a.y / GLF_live2a.x;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, true, true))))) {
                                    return;
                                    {
                                        int GLF_live13looplimiter5 = 0;
                                        if (GLF_live13looplimiter5 >= 6) {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    float GLF_live8s = _GLF_FUZZED((+(-5.7)));
                    {
                        {
                            float GLF_live12result = _GLF_FUZZED(float(-71584));
                            {
                                GLF_live12result += 100.0;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            GLF_live8s += 0.2;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = GLF_live7gl_FragCoord;
        }
        {
            float GLF_live11limit = _GLF_FUZZED(-779.276);
            int GLF_live11looplimiter0 = 0;
            float GLF_live11ref = _GLF_FUZZED(3.0);
            float GLF_live11s = _GLF_FUZZED(36.81);
            for (int GLF_live11i = 1; GLF_live11i < 800; GLF_live11i++) {
                if (GLF_live11looplimiter0 >= 4) {
                    break;
                }
                GLF_live11looplimiter0++;
                {
                    if (mod(float(GLF_live11i), GLF_live11ref) <= 0.01) {
                        GLF_live11s += 0.2;
                    }
                    if (float(GLF_live11i) >= GLF_live11limit) {
                        ;
                    }
                }
            }
        }
        {
            vec4 GLF_live8c = _GLF_FUZZED((1.6 * vec4(-8.3, -4.0, -7.9, -86.98)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(sin(0.0)))))) {
                _GLF_color = vec4(521.307, 1.9, 292.223, -5.7);
            }
            int GLF_live8i = _GLF_FUZZED(47236);
            int GLF_live8msb8 = _GLF_FUZZED(9754);
            {
                int GLF_live8looplimiter1 = 0;
                do {
                    if (GLF_live8looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live8looplimiter1++;
                    {
                        if (GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] >= 1.0) {
                            GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] = GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] * GLF_live8c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                        }
                        GLF_live8i++;
                        {
                            int GLF_live13j = _GLF_FUZZED(61570);
                            int GLF_live13looplimiter6 = 0;
                            {
                                if (GLF_live13looplimiter6 >= 6) {
                                    ;
                                }
                                GLF_live13looplimiter6++;
                                {
                                    GLF_live13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)] = GLF_live13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 10)];
                                }
                            }
                        }
                    }
                } while (GLF_live8i < findMSB(findLSB(GLF_live8msb8)));
            }
        }
    }
    _GLF_color = vec4(vec3(grey), 1.0);
}
