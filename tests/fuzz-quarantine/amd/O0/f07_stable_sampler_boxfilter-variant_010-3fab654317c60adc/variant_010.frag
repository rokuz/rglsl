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

vec4 GLF_dead12gl_FragCoord = _GLF_FUZZED(vec4(2.9, 37.56, 528.554, -0.7));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead12injectionSwitch;
};

vec4 GLF_dead14_GLF_color = _GLF_FUZZED(vec4(51.81, -1.6, 273.609, 9.3));

layout(set = 0, binding = 3) uniform buf3 {
    vec3 GLF_dead14polynomial;
};

float GLF_dead14fx(float GLF_dead14x) {
    return GLF_dead14polynomial.x * pow(GLF_dead14x, 2.0) + GLF_dead14polynomial.y * GLF_dead14x + GLF_dead14polynomial.z;
}

vec4 GLF_dead13_GLF_color = _GLF_FUZZED(vec4(-407.436, -1.8, -2061.0891, -8.6));
vec4 GLF_dead10gl_FragCoord = _GLF_FUZZED(vec4(((-677.435) - _GLF_IDENTITY((-35.00), (true ? (-35.00) : _GLF_FUZZED(((-(-1307.9169)) + 229.620))))), ((-8.4) + 0.5), vec2(8.8, 98.03)));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead10injectionSwitch;
};

int GLF_dead10data[10] = int[10](_GLF_FUZZED(62549), _GLF_FUZZED(99365), _GLF_FUZZED(((-63915) - (-20981))), _GLF_FUZZED(int(false)), _GLF_FUZZED(-92844), _GLF_FUZZED(ivec2(82861, 40091).t), _GLF_FUZZED((+(-3454))), _GLF_FUZZED(-98727), _GLF_FUZZED(-60277), _GLF_FUZZED(-41628)), GLF_dead10temp[10] = int[10](_GLF_FUZZED((47710 & (-22776))), _GLF_FUZZED(-90692), _GLF_FUZZED(24212), _GLF_FUZZED((-(26930))), _GLF_FUZZED(-37972), _GLF_FUZZED(74797), _GLF_FUZZED(((-72371) | 5125)), _GLF_FUZZED(-43768), _GLF_FUZZED((-((-10325) * (-53001)))), _GLF_FUZZED(-42182));
layout(set = 0, binding = 5) uniform sampler2D GLF_dead8tex;
const float GLF_dead8weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(set = 0, binding = 6) uniform sampler2D GLF_dead9tex;
vec4 GLF_dead6_GLF_color = _GLF_FUZZED((vec4(-1980.6313, 9767.1427, 2822.1820, 98.52) + 9478.5515));
int GLF_dead2data[10] = int[10](_GLF_FUZZED(-8916), _GLF_FUZZED(-29327), _GLF_FUZZED(_GLF_IDENTITY((4276 & (-78824)), 0 | ((4276 & (-78824))))), _GLF_FUZZED((-44382)), _GLF_FUZZED(-93055), _GLF_FUZZED(38521), _GLF_FUZZED(_GLF_IDENTITY(92114, min(92114, _GLF_IDENTITY(92114, (92114) << 0)))), _GLF_FUZZED(-37471), _GLF_FUZZED(-21087), _GLF_FUZZED(-73171)), GLF_dead2temp[10] = int[10](_GLF_FUZZED(-96280), _GLF_FUZZED(ivec4(-41386, _GLF_IDENTITY(79732, (true ? 79732 : _GLF_FUZZED(-11008))), -94145, -1798).g), _GLF_FUZZED((false ? 33085 : 48411)), _GLF_FUZZED(_GLF_IDENTITY(-31140, (-31140) | (-31140))), _GLF_FUZZED(-93254), _GLF_FUZZED(((-96807) + _GLF_IDENTITY((-55164), ((-55164)) - 0))), _GLF_FUZZED(49217), _GLF_FUZZED(ivec2(30086, -8062).r), _GLF_FUZZED(42214), _GLF_FUZZED((20282 - (-23277))));

struct GLF_dead0QuicksortObject {
    int numbers[10];
};

GLF_dead0QuicksortObject GLF_dead0obj = GLF_dead0QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, _GLF_IDENTITY(0, clamp(0, 0, 0)) ^ (0)), 0));
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;
const float weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, _GLF_IDENTITY(-0.25, min(-0.25, _GLF_IDENTITY(-0.25, mix(float(-0.25), float(_GLF_FUZZED(-5.9)), bool(_GLF_IDENTITY(false, _GLF_IDENTITY(false || (_GLF_IDENTITY(false, !(!(false)))), bool(bvec3(false || (_GLF_IDENTITY(false, !(!(false)))), true, false))))))))), -0.5, -1.0);

void main() {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        int donor_replacementGLF_dead11count = _GLF_FUZZED(98935);
        int donor_replacementGLF_dead11v = _GLF_FUZZED(10119);
        {
            if ((donor_replacementGLF_dead11v & 1) == 1) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = mix(min(vec4(-434.514, 325.617, GLF_dead12injectionSwitch), -53.76), vec4(870.322, 0.8, 51.96, 2.5), float(39142u));
                }
                donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
            } else {
                donor_replacementGLF_dead11v /= 2;
            }
            donor_replacementGLF_dead11count++;
        }
    }
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead12a = _GLF_FUZZED(-16399);
                int donor_replacementGLF_dead12b = _GLF_FUZZED(-88743);
                int donor_replacementGLF_dead12c = _GLF_FUZZED(bitCount(32213));
                int donor_replacementGLF_dead12d = _GLF_FUZZED(68301);
                vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED(vec2(5450.8981, 8.2));
                {
                    donor_replacementGLF_dead12uv.y -= step(GLF_dead12injectionSwitch.y, donor_replacementGLF_dead12uv.x) + float(donor_replacementGLF_dead12a) + float(donor_replacementGLF_dead12b) + float(donor_replacementGLF_dead12c);
                    donor_replacementGLF_dead12d--;
                }
            }
            _GLF_color = intBitsToFloat(bitfieldReverse(ivec4(-21560, -27161, -40571, -89560)));
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = GLF_dead6_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = GLF_dead6_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(coord);
                if (donor_replacementGLF_dead13coord.x > 0.4) {
                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = intBitsToFloat(ivec4(7124, 29970, -57041, -5998));
                        }
                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                    }
                } else {
                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = log2(vec4(-9506.2137, -6064.3786, 5.7, 0.4));
                    }
                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                }
            }
        } else {
        }
    }
    do {
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                break;
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_IDENTITY(bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false)), bool(bvec3(bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false)), true, true)))))) {
            _GLF_color = vec4(1.9, 841.253, -450.920, 8.7);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, _GLF_IDENTITY(float(float(0.0)), max(float(float(0.0)), float(float(0.0))))))))) {
                break;
            }
            do {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead7v = _GLF_FUZZED(30347);
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead6_GLF_color;
                        }
                        donor_replacementGLF_dead7v = (4 * donor_replacementGLF_dead7v * (1000 - donor_replacementGLF_dead7v)) / 1000;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) && _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = unpackUnorm4x8(uint(false));
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    float uvstep = 1.0 / 256.0;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(tan(0.0)))))) {
        int donor_replacementGLF_dead8i = _GLF_FUZZED((+62026));
        if (_GLF_DEAD(false)) {
            return;
        }
        int donor_replacementGLF_dead8j = _GLF_FUZZED(-33121);
        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(float(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(_GLF_IDENTITY(false, (false) || false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false)), (_GLF_IDENTITY(bool(bvec3(_GLF_IDENTITY(false, (false) || false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false)), bool(bvec4(bool(bvec3(_GLF_IDENTITY(false, (false) || false), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false)), false, true, true)))) && true))));
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead6_GLF_color;
        }
        {
            GLF_dead6_GLF_color += texture(GLF_dead8tex, coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead8j, 9)];
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead14A = _GLF_FUZZED(donor_replacementGLF_dead8uvstep);
            float donor_replacementGLF_dead14B = _GLF_FUZZED(asinh(uvstep));
            float donor_replacementGLF_dead14C = _GLF_FUZZED(uvstep);
            float donor_replacementGLF_dead14x1 = _GLF_FUZZED(donor_replacementGLF_dead8uvstep);
            float donor_replacementGLF_dead14x2 = _GLF_FUZZED(uvstep);
            while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                uvstep = donor_replacementGLF_dead14x2;
                if (_GLF_DEAD(false)) {
                    _GLF_color = min(GLF_dead13_GLF_color, GLF_dead6_GLF_color);
                }
                donor_replacementGLF_dead14A = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = tan(GLF_dead14_GLF_color);
                }
                donor_replacementGLF_dead14B = (((GLF_dead14k0) - (donor_replacementGLF_dead14A * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * donor_replacementGLF_dead14A * donor_replacementGLF_dead14C))));
                uvstep = donor_replacementGLF_dead14x1;
                donor_replacementGLF_dead14x1 = uvstep;
            }
        }
    }
    vec4 res = vec4(0);
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (_GLF_IDENTITY(false, true && (false)))))))) {
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        for (int _injected_loop_counter = (1 ^ ((1 << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), 1 * (int(0))))) >> _GLF_IDENTITY(int(0), int(0)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ _GLF_IDENTITY(0, (0) ^ 0))); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead9uvstep = _GLF_FUZZED(coord);
                {
                    if (_GLF_DEAD(false)) {
                        if (uvstep <= -0.9 && uvstep >= -1.1) {
                            GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    coord -= donor_replacementGLF_dead9uvstep;
                    uvstep += uvstep;
                    uvstep = texture(GLF_dead9tex, coord).y;
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        _injected_loop_counter++;
                    }
                }
            }
            return;
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(uvstep, log2(807.921), GLF_dead12injectionSwitch);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = ldexp((GLF_dead12gl_FragCoord - GLF_dead14_GLF_color), ivec4(14176, -40284, -10408, -50013));
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bvec2(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true)))) || false))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = (mat2x4(32.72, 77.43, -88.39, 60.11, -64.93, -1.6, -780.163, 7.8) * GLF_dead10injectionSwitch);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
        vec2 donor_replacementGLF_dead3a = _GLF_FUZZED(vec2(3.9, 47.12));
        if (_GLF_DEAD(false)) {
            return;
        }
        float donor_replacementGLF_dead3z = _GLF_FUZZED(uvstep);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = GLF_dead14_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead14A = _GLF_FUZZED(uvstep);
            float donor_replacementGLF_dead14x1 = _GLF_FUZZED((donor_replacementGLF_dead3z * donor_replacementGLF_dead3z));
            float donor_replacementGLF_dead14x2 = _GLF_FUZZED(dot(uvstep, uvstep));
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead13_GLF_color;
                }
                float GLF_dead14h0 = donor_replacementGLF_dead3z - donor_replacementGLF_dead14x2;
                float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                float GLF_dead14k0 = GLF_dead14fx(donor_replacementGLF_dead3z) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                uvstep = donor_replacementGLF_dead14x2;
                donor_replacementGLF_dead14A = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                uvstep = (((GLF_dead14k0) - (donor_replacementGLF_dead14A * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                uvstep = GLF_dead14fx(donor_replacementGLF_dead14x2);
                donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * uvstep) / (uvstep + sign(uvstep) * sqrt(pow(uvstep, 2.0) - (4.0 * donor_replacementGLF_dead14A * uvstep))));
                donor_replacementGLF_dead3z = donor_replacementGLF_dead14x1;
                donor_replacementGLF_dead14x1 = uvstep;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = log(vec4(4.8, 8.5, 3219.3312, 6.0));
            }
        }
        {
            donor_replacementGLF_dead3z = donor_replacementGLF_dead3a.x / donor_replacementGLF_dead3a.y;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(injectionSwitch, dot(uvstep, uvstep), donor_replacementGLF_dead3z);
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead10from = _GLF_FUZZED(ivec3(-22339, 91519, -36419)[2]);
                    int donor_replacementGLF_dead10to = _GLF_FUZZED(45111);
                    for (int GLF_dead10i = donor_replacementGLF_dead10from; _GLF_IDENTITY(GLF_dead10i <= donor_replacementGLF_dead10to, bool(bvec4(_GLF_IDENTITY(GLF_dead10i <= donor_replacementGLF_dead10to, true && (GLF_dead10i <= donor_replacementGLF_dead10to)), false, true, true))); GLF_dead10i++) {
                        GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10i, 10)] = GLF_dead10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10i, 10)];
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(917.599, -64.56, 1.9, -9901.2048);
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = sin(GLF_dead6_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead7i = _GLF_FUZZED(((~37055) ^ 60163));
            int donor_replacementGLF_dead7iters = _GLF_FUZZED((_GLF_IDENTITY(80271, 0 ^ (80271)) << (~(-21783))));
            int donor_replacementGLF_dead7v = _GLF_FUZZED(86811);
            for (donor_replacementGLF_dead7i = 0; donor_replacementGLF_dead7i < donor_replacementGLF_dead7iters; donor_replacementGLF_dead7i++) {
                donor_replacementGLF_dead7v = (4 * donor_replacementGLF_dead7v * (1000 - donor_replacementGLF_dead7v)) / _GLF_IDENTITY(1000, clamp(1000, _GLF_IDENTITY(1000, (true ? 1000 : _GLF_FUZZED(findLSB(162006u)))), _GLF_IDENTITY(1000, max(1000, 1000))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    _GLF_color = atanh(GLF_dead10gl_FragCoord);
                }
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(331.453)), bool(false))))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            do {
                _GLF_color = res;
            } while (_GLF_WRAPPED_LOOP(false));
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec3(_GLF_DEAD(false), false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(66.68, -184.397, 0.0, 8.4);
                    }
                    do {
                        _GLF_color = max(vec4(1.4, -9.7, -538.431, 399.417), uvstep);
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            } else {
            }
            ;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = res;
                }
            } else {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                if (_GLF_DEAD(false)) {
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                return;
                            }
                        } else {
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (injectionSwitch) - vec2(0.0, 0.0)).x > injectionSwitch.y)), (_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (injectionSwitch) - vec2(0.0, 0.0)).x > injectionSwitch.y))) || false)));
                }
            }
            for (int _injected_loop_counter = (_GLF_IDENTITY((-74973) & 0, (true ? ((-74973) & 0) : _GLF_FUZZED(31839)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _GLF_IDENTITY(_injected_loop_counter++, (_GLF_IDENTITY(_injected_loop_counter++, 0 ^ (_injected_loop_counter++))) ^ 0)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead6_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, float(mat3(gl_FragCoord.x, 1.0, abs(1.0), sqrt(0.0), _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), log(1.0)))) < 0.0)))) {
                            _GLF_IDENTITY(_GLF_color = res, (_GLF_color = res) + vec4(0.0, 0.0, 0.0, 0.0));
                        }
                        for (int GLF_dead0i = 0; GLF_dead0i < 10; GLF_dead0i++) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) / 1.0))))) {
                                    _GLF_color = GLF_dead13_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead13_GLF_color;
                                        }
                                        GLF_dead0i /= 2;
                                    }
                                }
                                GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = (10 - GLF_dead0i);
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = dFdx(acos(degrees(vec4(6.6, 6.7, 0.9, -5.6))));
                                    }
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (uvstep <= -0.9 && uvstep >= -1.1) {
                                        GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    } else {
                                        GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                }
                            }
                            GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] * GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead0i, ~(~(GLF_dead0i))), 10)];
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead9h = _GLF_FUZZED(distance(res, vec4(-324.021, uvstep, injectionSwitch)));
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(floatBitsToInt(5.2));
                                float donor_replacementGLF_dead9refh = _GLF_FUZZED(uvstep);
                                while (donor_replacementGLF_dead9h < donor_replacementGLF_dead9refh && donor_replacementGLF_dead9i < 32) {
                                    coord -= coord;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = GLF_dead6_GLF_color;
                                    }
                                    donor_replacementGLF_dead9refh += uvstep;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead10injectionSwitch);
                                            if (donor_replacementGLF_dead13coord.x > 0.4) {
                                                if (donor_replacementGLF_dead13coord.y < 0.6) {
                                                    uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = (GLF_dead10injectionSwitch * mat4x2(-550.716, -2.6, 237.753, -5969.1298, 119.181, -7.6, 29.74, -1.6));
                                                    }
                                                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = normalize(GLF_dead13_GLF_color);
                                                    }
                                                } else {
                                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = GLF_dead10gl_FragCoord;
                                                    }
                                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                }
                                            } else {
                                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                                bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                                bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                                bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                                GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-70.23, -1178.7107, -473.293, 5.9);
                                            }
                                        }
                                        _GLF_color = (GLF_dead10gl_FragCoord + res[1]);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        float donor_replacementGLF_dead14x2 = _GLF_FUZZED(73.08);
                                        if (donor_replacementGLF_dead14x2 <= -0.9 && donor_replacementGLF_dead14x2 >= -1.1) {
                                            GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = max(GLF_dead6_GLF_color, vec4(-2891.2421, -9.8, 7.9, 6766.1839));
                                    }
                                    donor_replacementGLF_dead9h = texture(GLF_dead9tex, coord).y;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = intBitsToFloat(ivec4(82437, 99477, -82343, -59065));
                                    }
                                    donor_replacementGLF_dead9i++;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead11v = _GLF_FUZZED(_injected_loop_counter);
                                {
                                    if ((donor_replacementGLF_dead11v & 1) == 1) {
                                        donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                    } else {
                                        donor_replacementGLF_dead11v /= 2;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = ((GLF_dead0i <= donor_replacementGLF_dead11v) ? _GLF_color : GLF_dead14_GLF_color);
                                    }
                                    GLF_dead0i++;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead12gl_FragCoord;
                        }
                    }
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(ldexp(GLF_dead10injectionSwitch, (min(ivec2(-57753, -95770), ivec2(8058, 89894)) ^ _injected_loop_counter)));
                    {
                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                    }
                }
            }
            do {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead12l = _GLF_FUZZED(94824);
                        int donor_replacementGLF_dead12m = _GLF_FUZZED(-69855);
                        {
                            donor_replacementGLF_dead12l = donor_replacementGLF_dead12m + 1;
                        }
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, clamp(_injected_loop_counter, _GLF_IDENTITY(_injected_loop_counter, int(ivec2(_injected_loop_counter, 1))), _injected_loop_counter)) > 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            {
                                ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                            }
                        }
                        _GLF_color = max(smoothstep(_GLF_color, res, vec4(2.3, -3.4, 1.1, 9788.3846)), res);
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), true && ((gl_FragCoord.y < 0.0))))));
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) * mat4(_GLF_ONE(1.0, injectionSwitch.y))).y < 0.0)))) {
                discard;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = inversesqrt(_GLF_color);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead11count = _GLF_FUZZED(floatBitsToInt(0.4));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead14_GLF_color;
                        }
                        int donor_replacementGLF_dead11v = _GLF_FUZZED(mix((true ? ivec4(-21746, -49584, -60934, -68048) : ivec4(-32811, -9150, -73140, -3513)).s, -36395, true));
                        {
                            if ((donor_replacementGLF_dead11v & 1) == 1) {
                                donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                            } else {
                                donor_replacementGLF_dead11v /= 2;
                            }
                            donor_replacementGLF_dead11count++;
                        }
                    }
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            _GLF_color = vec4(-83.87, -195.671, -1287.0284, 77.42);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                _GLF_color = vec3(6974.1023, 2334.2415, 26.60).bggb;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = inversesqrt(GLF_dead6_GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            if (uvstep <= -0.9 && uvstep >= -1.1) {
                GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                if (_GLF_DEAD(false)) {
                    _GLF_color = mat2x4(5.6, 1858.9386, -24.88, 1.8, 0.1, 9429.8383, 4.0, 2286.6631)[0];
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead13_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(46896);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_dead6_GLF_color;
            }
            float donor_replacementGLF_dead9slope = _GLF_FUZZED(uvstep);
            vec2 donor_replacementGLF_dead9uvstep = _GLF_FUZZED(ldexp((injectionSwitch), (ivec2(48474, -17405) - _GLF_IDENTITY((-80627), (true ? (-80627) : _GLF_FUZZED(donor_replacementGLF_dead9i))))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    uvec2 GLF_dead13icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = res;
                    }
                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(2305.3826, 158.817, -15.16, 738.765);
                    }
                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                }
            }
            {
                do {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead12b = _GLF_FUZZED(int(64920u));
                        vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED(refract(sign(unpackHalf2x16(113859u)), coord, uvstep));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead6_GLF_color;
                        }
                        do {
                            donor_replacementGLF_dead12uv.y -= step(GLF_dead12injectionSwitch.y, donor_replacementGLF_dead12uv.x) + float(donor_replacementGLF_dead9i);
                            donor_replacementGLF_dead12uv.x *= (isnan(donor_replacementGLF_dead12uv.y) ? cosh(GLF_dead12gl_FragCoord.y) : tanh(GLF_dead12gl_FragCoord.x));
                            donor_replacementGLF_dead12b--;
                        } while (donor_replacementGLF_dead12b > int(GLF_dead12injectionSwitch.x));
                    }
                    coord -= donor_replacementGLF_dead9uvstep;
                } while (_GLF_WRAPPED_LOOP(false));
                uvstep += donor_replacementGLF_dead9slope;
                uvstep = texture(GLF_dead9tex, coord).y;
                donor_replacementGLF_dead9i++;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                do {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = smoothstep(res, step(_GLF_color, _GLF_color), mod(res, _GLF_color));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = res;
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                int donor_replacementGLF_dead1i = _GLF_FUZZED(-9729);
                int donor_replacementGLF_dead1iters = _GLF_FUZZED(-52241);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = abs(mix(GLF_dead13_GLF_color, GLF_dead13_GLF_color, uvstep));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, false || (injectionSwitch.x > injectionSwitch.y))))))))) {
                        if (_GLF_DEAD(false)) {
                            {
                                ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(donor_replacementGLF_dead1iters);
                            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(reflect(uvstep, uvstep));
                            {
                                _GLF_color += texture(GLF_dead8tex, _GLF_IDENTITY(coord, (coord) + sin(vec2(0.0, 0.0))) + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(donor_replacementGLF_dead1iters - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead1iters, 9)];
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead14A = _GLF_FUZZED(uvstep);
                                float donor_replacementGLF_dead14B = _GLF_FUZZED(mix(dot(GLF_dead10injectionSwitch, injectionSwitch), uvstep, 3.7));
                                float donor_replacementGLF_dead14C = _GLF_FUZZED(uvstep);
                                float donor_replacementGLF_dead14temp = _GLF_FUZZED(9.9);
                                float donor_replacementGLF_dead14x1 = _GLF_FUZZED(atanh(-7.0));
                                float donor_replacementGLF_dead14x2 = _GLF_FUZZED(-9274.8118);
                                while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                                    float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                                    float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                                    float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                    float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                    donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                                    donor_replacementGLF_dead14A = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                    donor_replacementGLF_dead14B = (((GLF_dead14k0) - (donor_replacementGLF_dead14A * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                    donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                    donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * donor_replacementGLF_dead14A * donor_replacementGLF_dead14C))));
                                    uvstep = donor_replacementGLF_dead14x1;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead14_GLF_color;
                                    }
                                    donor_replacementGLF_dead14x1 = donor_replacementGLF_dead14temp;
                                }
                            }
                            _GLF_color = GLF_dead6_GLF_color;
                        }
                        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED((exp(coord) / vec2(-1.9, -9.7)));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = mix(GLF_dead14_GLF_color, GLF_dead14_GLF_color, GLF_dead14_GLF_color);
                                    }
                                    GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            uvec2 GLF_dead6icoord = uvec2(((donor_replacementGLF_dead6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead6res1 = _GLF_IDENTITY(uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) >> (GLF_dead6icoord.x & _GLF_IDENTITY(31u, _GLF_IDENTITY(uint(uint(31u)), (uint(uint(31u))) + 0u)))) & 0xffffffffu), (uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) >> (GLF_dead6icoord.x & _GLF_IDENTITY(31u, _GLF_IDENTITY(uint(uint(31u)), (uint(uint(31u))) + 0u)))) & 0xffffffffu)) >> 0u);
                            uint GLF_dead6res2 = _GLF_IDENTITY(uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu), (uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu)) | 0u);
                            float GLF_dead6res = float(((GLF_dead6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead6res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead6_GLF_color = vec4(GLF_dead6res, GLF_dead6res, GLF_dead6res, 1.0);
                        }
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                    int donor_replacementGLF_dead10i = _GLF_FUZZED(-77435);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead10gl_FragCoord;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead11count = _GLF_FUZZED(-54109);
                        while (donor_replacementGLF_dead10i > 1) {
                            if ((donor_replacementGLF_dead10i & 1) == 1) {
                                donor_replacementGLF_dead10i = 3 * donor_replacementGLF_dead10i + 1;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = exp2(GLF_dead14_GLF_color);
                                }
                            } else {
                                donor_replacementGLF_dead10i /= 2;
                            }
                            donor_replacementGLF_dead11count++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = fwidthCoarse(GLF_dead14_GLF_color);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = reflect(GLF_dead12gl_FragCoord, GLF_dead13_GLF_color);
                                }
                                GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        _GLF_color = vec4(55.97, -5.2, 8028.9844, -382.580);
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead11v = _GLF_FUZZED(donor_replacementGLF_dead10i);
                        while (donor_replacementGLF_dead11v > 1) {
                            if ((donor_replacementGLF_dead11v & 1) == 1) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (mod(GLF_dead14polynomial, (mat2x3(-73.71, 3.7, 5.5, -4.0, 8.9, -7.9) * GLF_dead10injectionSwitch)) * (outerProduct(GLF_dead14polynomial, GLF_dead12gl_FragCoord)));
                                }
                                donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                            } else {
                                donor_replacementGLF_dead11v /= 2;
                            }
                            donor_replacementGLF_dead1i++;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead13_GLF_color;
                        }
                    }
                    int donor_replacementGLF_dead10k = _GLF_FUZZED(findMSB(43047u));
                    {
                        GLF_dead10temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10k++, 10)] = GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i++, 10)];
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead11count = _GLF_FUZZED(donor_replacementGLF_dead1iters);
                    int donor_replacementGLF_dead11v = _GLF_FUZZED(ivec2(-13908, 26721)[1]);
                    while (donor_replacementGLF_dead11v > 1) {
                        if ((donor_replacementGLF_dead11v & 1) == 1) {
                            donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                        } else {
                            donor_replacementGLF_dead11v /= 2;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead10gl_FragCoord;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead10gl_FragCoord;
                        }
                        donor_replacementGLF_dead11count++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? gl_FragCoord.y : _GLF_FUZZED(71.20))) < 0.0)))) {
                    _GLF_color = res;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead7v = _GLF_FUZZED(-12091);
                        {
                            donor_replacementGLF_dead7v = (4 * donor_replacementGLF_dead7v * (1000 - donor_replacementGLF_dead7v)) / 1000;
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead14_GLF_color;
                            }
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                int donor_replacementGLF_dead1v = _GLF_FUZZED(bitfieldInsert(-66006, -16022, -21982, -_GLF_IDENTITY(71516, 1 * (71516))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = (true ? res : vec4(22.75, -8.5, 4.3, -2.8));
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead11v = _GLF_FUZZED(-11160);
                        {
                            if ((donor_replacementGLF_dead11v & 1) == 1) {
                                donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                            } else {
                                donor_replacementGLF_dead11v /= 2;
                            }
                            donor_replacementGLF_dead1v++;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead6_GLF_color;
                        }
                    }
                }
                for (donor_replacementGLF_dead1i = 0; donor_replacementGLF_dead1i < donor_replacementGLF_dead1iters; donor_replacementGLF_dead1i++) {
                    donor_replacementGLF_dead1v = (4 * donor_replacementGLF_dead1v * (1000 - donor_replacementGLF_dead1v)) / 1000;
                    if (_GLF_DEAD(false)) {
                        {
                            ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead12gl_FragCoord;
                            }
                        }
                    }
                }
                for (int _injected_loop_counter = _GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, (0) | (0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                _GLF_color = res;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead14x2 = _GLF_FUZZED(uvstep);
                                if (donor_replacementGLF_dead14x2 <= -0.9 && donor_replacementGLF_dead14x2 >= -1.1) {
                                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = faceforward(vec4(845.991, 6.8, 3.8, 8818.5718), _GLF_color, vec4(2.5, 94.83, -6047.1038, 7.0));
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (GLF_dead6_GLF_color - GLF_dead14_GLF_color);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead6_GLF_color;
                }
            }
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), true && (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, bool(bool(gl_FragCoord.x < 0.0))))))))) && true)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead12a = _GLF_FUZZED((max(ivec4(-50038, 71033, 57472, -13362), ivec4(62260, 27988, -53722, -10247))[1] << (80944 >> (-94017))));
                    int donor_replacementGLF_dead12b = _GLF_FUZZED(-29322);
                    vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED(GLF_dead10injectionSwitch);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = unpackSnorm4x8(165718u);
                        }
                        donor_replacementGLF_dead12uv.y -= step(GLF_dead12injectionSwitch.y, donor_replacementGLF_dead12uv.x) + float(donor_replacementGLF_dead12a);
                        donor_replacementGLF_dead12uv.x *= (isnan(donor_replacementGLF_dead12uv.y) ? cosh(GLF_dead12gl_FragCoord.y) : tanh(GLF_dead12gl_FragCoord.x));
                        donor_replacementGLF_dead12b--;
                    } while (donor_replacementGLF_dead12b > int(GLF_dead12injectionSwitch.x));
                }
                _GLF_color = vec4(460.173, 4.0, 73.32, 618.915);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = log((GLF_dead10injectionSwitch * mat4x2(9.2, -229.221, 37.55, 5355.6487, -65.78, 7968.0152, -9.4, -12.39)));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    _GLF_IDENTITY(_GLF_color = log2(dFdxCoarse(min(res, _GLF_color))), (true ? (_GLF_color = log2(dFdxCoarse(min(res, _GLF_color)))) : _GLF_FUZZED(_GLF_color)));
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead9coord = _GLF_IDENTITY(_GLF_FUZZED(max(injectionSwitch, dFdy(roundEven(7.6)))), (true ? _GLF_FUZZED(max(injectionSwitch, dFdy(roundEven(7.6)))) : _GLF_FUZZED(refract(GLF_dead10injectionSwitch, coord, uvstep))));
                    float donor_replacementGLF_dead9h = _GLF_FUZZED(-90.84);
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(int(9864.5545));
                    float donor_replacementGLF_dead9refh = _GLF_FUZZED(fma(intBitsToFloat(22974), distance(coord, vec2(66.10, -573.710)), dFdx(-7.9)));
                    while (donor_replacementGLF_dead9h < donor_replacementGLF_dead9refh && donor_replacementGLF_dead9i < 32) {
                        donor_replacementGLF_dead9coord -= coord;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_color;
                        }
                        donor_replacementGLF_dead9refh += uvstep;
                        donor_replacementGLF_dead9h = texture(GLF_dead9tex, donor_replacementGLF_dead9coord).y;
                        donor_replacementGLF_dead9i++;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead12gl_FragCoord;
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(coord);
                    if (donor_replacementGLF_dead6coord.y < 0.6) {
                        uvec2 GLF_dead6icoord = uvec2(((donor_replacementGLF_dead6coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead6res1 = uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) >> (GLF_dead6icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead6res2 = uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead6res = float(((GLF_dead6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((_GLF_IDENTITY(GLF_dead6res1, ~(_GLF_IDENTITY(~(GLF_dead6res1), (~(GLF_dead6res1)) << 0u))) & 1u) != 0u ? _GLF_IDENTITY(1u, min(1u, 1u)) : 0u));
                        GLF_dead6_GLF_color = vec4(GLF_dead6res, GLF_dead6res, GLF_dead6res, 1.0);
                    } else {
                        ivec2 GLF_dead6icoord = ivec2((_GLF_IDENTITY((donor_replacementGLF_dead6coord - vec2(0.4, 0.6)), mix(vec2(_GLF_FUZZED(((-27.92) * ((-337.439) + (-8.6)))), ((donor_replacementGLF_dead6coord - vec2(0.4, 0.6)))[1]), vec2(((donor_replacementGLF_dead6coord - vec2(0.4, 0.6)))[0], _GLF_FUZZED(-7.7)), bvec2(true, false))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead6res3 = ((GLF_dead6icoord.x >> 5) & 1) ^ (_GLF_IDENTITY((_GLF_IDENTITY(_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32, (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32) | (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32))) >> 5, clamp((_GLF_IDENTITY(_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32, (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32) | (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32))) >> 5, (_GLF_IDENTITY(_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32, (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32) | (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32))) >> 5, (_GLF_IDENTITY(_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32, (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32) | (_GLF_IDENTITY(GLF_dead6icoord.y, (GLF_dead6icoord.y) | 0) & 32))) >> 5)));
                        int GLF_dead6res2 = (GLF_dead6icoord.y * GLF_dead6icoord.y >> 10) & 1;
                        if (_GLF_DEAD(false)) {
                            if (uvstep <= -0.9 && uvstep >= -1.1) {
                                GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(-61011);
                            {
                                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                    GLF_dead6_GLF_color += texture(GLF_dead8tex, coord + vec2(float(donor_replacementGLF_dead8i - 1) * uvstep, float(GLF_dead8j - 1) * uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                            }
                        }
                        int GLF_dead6res1 = (GLF_dead6icoord.x * GLF_dead6icoord.y >> 9) & 1;
                        GLF_dead6_GLF_color = vec4(float(GLF_dead6res1 ^ GLF_dead6res2), float(GLF_dead6res2 & GLF_dead6res3), float(GLF_dead6res1 | GLF_dead6res3), 1.0);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead14_GLF_color;
                        }
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                if (coord.y < 0.6) {
                                    uvec2 GLF_dead13icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = ceil(GLF_dead13_GLF_color);
                                    }
                                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                } else {
                                    ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (((ivec3(-53647, 57455, 43702) & GLF_dead13res1), vec3(-4146.7510, 4569.7760, -8009.8894)) * mat4x3(-63.80, 527.979, 573.398, -396.803, -2.1, 4583.7674, -2.6, -194.004, 5.5, -4675.1196, 14.99, 3.1));
                                    }
                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = mat2x4(3952.0648, 4.8, 28.88, -3.3, -20.16, 341.124, -3.1, -96.20)[0];
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = (uvstep - mat2x4(4.8, 3.5, 9.7, 1.0, 474.081, -563.258, 6155.6527, 200.695))[0];
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead10i = _GLF_FUZZED(ivec4(-22822, -16660, -54513, 71283).s);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = dFdxCoarse(vec4(276.014, -8319.5405, 9.0, -6.6));
                                    }
                                    {
                                        GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                }
                                int donor_replacementGLF_dead10j = _GLF_FUZZED(11930);
                                int donor_replacementGLF_dead10k = _GLF_FUZZED(ivec2(-16330, -30475)[0]);
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = refract(res, GLF_dead13_GLF_color, 5.3);
                                    }
                                    if (GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] < GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10j, 10)]) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) || _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) {
                                            _GLF_color = clamp(_GLF_color, _GLF_color, res);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = min(GLF_dead13_GLF_color, 2.7);
                                            }
                                        }
                                        GLF_dead10temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10k++, 10)] = GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i++, 10)];
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = faceforward(max(_GLF_color, uvstep), (determinant(mat2(75.21, 8.3, 35.54, -3.0)) / atan(_GLF_color)), vec4(6.9, 550.527, -41.22, -215.892));
                                        }
                                    } else {
                                        GLF_dead10temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10k++, 10)] = GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10j++, 10)];
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                    _GLF_color = fwidthFine(_GLF_color);
                                }
                            }
                            _GLF_color = fwidthCoarse((_GLF_color - uvstep));
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat4(-890.607, 467.142, 4.1, 3.9, -6.9, 35.38, -9.4, -2432.6419, -6.4, -8.4, -2.9, -3.3, 62.95, -691.734, 59.13, -3955.0214) * GLF_dead12gl_FragCoord);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    if (coord.y < 0.6) {
                        uvec2 GLF_dead13icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                    } else {
                        ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = ((_GLF_color + uvstep) * (-20.86));
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = fwidthFine((mat3x4(-87.58, -330.095, 8161.3684, 3.0, 5.6, -99.61, 538.843, -0.2, 4.4, -321.080, 98.50, -413.893) * vec3(-74.55, -638.162, -4.2)));
            }
            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(injectionSwitch);
            if (donor_replacementGLF_dead13coord.y < 0.6) {
                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
            } else {
                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                    _GLF_color = GLF_dead10gl_FragCoord;
                }
                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                _GLF_color = (mat4(8.5, 52.19, -539.218, 7486.1767, -76.62, 3728.7598, -8.4, -31.72, -5964.0225, -87.86, 6.7, -434.848, 4.2, -74.40, 166.829, -1.5) * mod(GLF_dead14_GLF_color, (GLF_dead6_GLF_color / GLF_dead13_GLF_color)));
            }
            return;
            if (_GLF_DEAD(false)) {
                _GLF_color = sqrt(GLF_dead6_GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(-79605);
            float donor_replacementGLF_dead9refh = _GLF_FUZZED(-705.455);
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                int donor_replacementGLF_dead11v = _GLF_FUZZED(donor_replacementGLF_dead9i);
                {
                    donor_replacementGLF_dead11v /= 2;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                _GLF_color = vec4(8367.4766, 6675.7619, 6838.7858, -8.2);
            }
            while (uvstep < donor_replacementGLF_dead9refh && donor_replacementGLF_dead9i < 32) {
                coord -= coord;
                donor_replacementGLF_dead9refh += uvstep;
                uvstep = texture(GLF_dead9tex, coord).y;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(radians(injectionSwitch));
                    {
                        if (donor_replacementGLF_dead13coord.y < 0.6) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead10gl_FragCoord;
                            }
                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                        } else {
                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                        }
                    }
                }
                donor_replacementGLF_dead9i++;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead14B = _GLF_FUZZED(uvstep);
            float donor_replacementGLF_dead14temp = _GLF_FUZZED(mix(-3022.3959, -2532.6317, true));
            float donor_replacementGLF_dead14x1 = _GLF_FUZZED(uvstep);
            float donor_replacementGLF_dead14x2 = _GLF_FUZZED(abs(-33.35));
            while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                donor_replacementGLF_dead14B = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                uvstep = GLF_dead14fx(donor_replacementGLF_dead14x2);
                donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * uvstep) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * uvstep * uvstep))));
                uvstep = donor_replacementGLF_dead14x1;
                donor_replacementGLF_dead14x1 = donor_replacementGLF_dead14temp;
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
            _GLF_color = mat4(70.65, 589.751, -2.5, -2416.2249, 248.307, -0.7, 8418.0261, -3.2, -2670.7016, 42.85, 5.4, -7546.1054, 1.5, 6743.3192, 85.20, 869.590)[1];
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), bool(bvec4(!(_GLF_DEAD(false)), false, true, false))))))))) {
            _GLF_color = vec4(ceil(uvstep), (94.39 + uvstep), refract(coord, coord, -850.903));
            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(_GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5))), _GLF_IDENTITY(min(_GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5))), _GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5)))), (min(_GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5))), _GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5))))) << 0)), _GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5))), _GLF_IDENTITY(int(5), (false ? _GLF_FUZZED(60469) : int(5)))))))); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead2i = _GLF_FUZZED(-39004);
                    int donor_replacementGLF_dead2j = _GLF_FUZZED((ivec4(-91434, -52582, -87102, _GLF_IDENTITY(-26779, (-26779) - 0)), 87377));
                    int donor_replacementGLF_dead2k = _GLF_FUZZED(-13591);
                    {
                        if (GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i, 10)] < GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j, 10)]) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    _GLF_color = dFdx(_GLF_color);
                                }
                                GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2k++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i++, 10)];
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = clamp(GLF_dead6_GLF_color, 723.290, uvstep);
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        } else {
                            GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2k++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j++, 10)];
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead14B = _GLF_FUZZED(9.9);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead13_GLF_color;
                                }
                                float donor_replacementGLF_dead14C = _GLF_FUZZED(2543.3452);
                                float donor_replacementGLF_dead14temp = _GLF_FUZZED(uvstep);
                                float donor_replacementGLF_dead14x0 = _GLF_FUZZED(faceforward(-9766.8451, roundEven(uvstep), -8429.2851));
                                float donor_replacementGLF_dead14x1 = _GLF_FUZZED(fract(uvstep));
                                float donor_replacementGLF_dead14x2 = _GLF_FUZZED(determinant(mat2(5.7, 749.864, -1912.8152, -1.3)));
                                while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                                    float GLF_dead14h0 = donor_replacementGLF_dead14x0 - donor_replacementGLF_dead14x2;
                                    float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                                    float GLF_dead14k0 = GLF_dead14fx(donor_replacementGLF_dead14x0) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                    float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                    donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                                    uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                    donor_replacementGLF_dead14B = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                    donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                    donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * uvstep * donor_replacementGLF_dead14C))));
                                    donor_replacementGLF_dead14x0 = donor_replacementGLF_dead14x1;
                                    donor_replacementGLF_dead14x1 = donor_replacementGLF_dead14temp;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead10gl_FragCoord;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead12gl_FragCoord;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = vec4(4773.4583, -98.33, -764.904, 586.428);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead6_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = normalize(GLF_dead10gl_FragCoord);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead11v = _GLF_FUZZED(mix(-36023, (ivec2(64995, -9406)[0] ^ 5001), (ivec2(76051, -19195) == ivec2(-2364, 1816))));
                                if ((donor_replacementGLF_dead11v & 1) == 1) {
                                    donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                } else {
                                    donor_replacementGLF_dead11v /= 2;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            continue;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))) || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(cos(230.974), coord[1], -6728.6233, uvstep);
                }
                return;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(mix(GLF_dead10injectionSwitch, vec2(0.4, 6.2), bvec2(false, false)));
                    {
                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = atan(_GLF_color, _GLF_color);
                        }
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-732.248, -1734.3905, 4736.4920, 48.45);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = pow(vec4(60.11, 7.8, -6.4, 6.6), GLF_dead6_GLF_color);
                    }
                }
                return;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = roundEven(sinh(GLF_dead10gl_FragCoord));
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 0)); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(_GLF_IDENTITY(float(0.0), (float(0.0)) / exp(0.0)), float(_GLF_FUZZED(668.155)), bool(false))))))) {
            int donor_replacementGLF_dead1i = _GLF_FUZZED(ivec2(-50632, -53707).r);
            int donor_replacementGLF_dead1iters = _GLF_FUZZED(bitfieldExtract(-26425, (_GLF_IDENTITY(~(-95691), (_GLF_IDENTITY(~(-95691), (~(-95691)) >> 0)) >> 0)), findMSB(35300)));
            int donor_replacementGLF_dead1v = _GLF_FUZZED(-52548);
            for (donor_replacementGLF_dead1i = 0; donor_replacementGLF_dead1i < _GLF_IDENTITY(donor_replacementGLF_dead1iters, (donor_replacementGLF_dead1iters) | 0); donor_replacementGLF_dead1i++) {
                donor_replacementGLF_dead1v = (4 * donor_replacementGLF_dead1v * (1000 - donor_replacementGLF_dead1v)) / 1000;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead3z = _GLF_FUZZED(sign(9.1));
                    if (coord.y > coord.x) {
                        donor_replacementGLF_dead3z = coord.x / coord.y;
                    } else {
                        do {
                            donor_replacementGLF_dead3z = coord.y / coord.x;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
        }
    }
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = max(vec4(-9867.1483, 8.3, 615.205, -5386.6269), uvstep);
                }
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))) {
                    int donor_replacementGLF_dead7i = _GLF_FUZZED(j);
                    int donor_replacementGLF_dead7iters = _GLF_FUZZED(j);
                    int donor_replacementGLF_dead7v = _GLF_FUZZED(clamp(ivec2(-48654, 33814), j, i).x);
                    for (donor_replacementGLF_dead7i = 0; donor_replacementGLF_dead7i < donor_replacementGLF_dead7iters; donor_replacementGLF_dead7i++) {
                        donor_replacementGLF_dead7v = (4 * donor_replacementGLF_dead7v * (1000 - donor_replacementGLF_dead7v)) / 1000;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = normalize(_GLF_IDENTITY(GLF_dead6_GLF_color, vec4(mat4x2(GLF_dead6_GLF_color, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, cos(0.0), 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, cos(0.0), 0.0))), determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, abs(0.0), 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0)), 0.0))));
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead14A = _GLF_FUZZED(dot(-657.692, 890.232));
                        float donor_replacementGLF_dead14C = _GLF_FUZZED(uvstep);
                        float donor_replacementGLF_dead14temp = _GLF_FUZZED(5.4);
                        float donor_replacementGLF_dead14x2 = _GLF_FUZZED(uvstep);
                        {
                            float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                            float GLF_dead14h1 = uvstep - donor_replacementGLF_dead14x2;
                            float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                            float GLF_dead14k1 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                            donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                            donor_replacementGLF_dead14A = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                            uvstep = (((GLF_dead14k0) - (donor_replacementGLF_dead14A * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                            donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                            donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (uvstep + sign(uvstep) * sqrt(pow(uvstep, 2.0) - (4.0 * donor_replacementGLF_dead14A * donor_replacementGLF_dead14C))));
                            uvstep = uvstep;
                            uvstep = donor_replacementGLF_dead14temp;
                        }
                    }
                }
                _GLF_color = mat2x4(mat3x2(5.1, -142.583, 25.93, 946.676, 1.4, -9688.0831))[1];
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = pow(_GLF_color, vec4(89.25, -19.75, -485.527, -6999.1256));
            }
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(res);
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(7.8);
                {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead11count = _GLF_FUZZED((+99551));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    _GLF_color = vec4(-86.61, 5.0, 43.11, -1.1);
                                }
                                if ((i & 1) == 1) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (false ? donor_replacementGLF_dead8res : GLF_dead14_GLF_color);
                                    }
                                    i = 3 * i + 1;
                                } else {
                                    i /= 2;
                                }
                                donor_replacementGLF_dead11count++;
                            }
                        }
                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, coord + vec2(float(i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead8j, 9)];
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                {
                    if (coord.y < 0.6) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = injectionSwitch.yxyy;
                        }
                        uvec2 GLF_dead6icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.6, max(0.6, 0.6)))) * 256.0);
                        uint GLF_dead6res1 = uint(((GLF_dead6icoord.x * GLF_dead6icoord.y) >> (GLF_dead6icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead6res2 = uint(_GLF_IDENTITY(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu, min(_GLF_IDENTITY(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu, clamp(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu, _GLF_IDENTITY(((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu, (((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu) ^ 0u), ((_GLF_IDENTITY(GLF_dead6icoord.x, _GLF_IDENTITY(uint(uvec2(GLF_dead6icoord.x, (1u | 0u))), clamp(_GLF_IDENTITY(uint(uvec2(GLF_dead6icoord.x, (1u | 0u))), uint(uvec3(uint(uvec2(GLF_dead6icoord.x, (1u | 0u))), 0u, 1u))), uint(uvec2(GLF_dead6icoord.x, (1u | 0u))), uint(uvec2(GLF_dead6icoord.x, (1u | 0u)))))) * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu)), ((GLF_dead6icoord.x * GLF_dead6icoord.y) << (GLF_dead6icoord.x & 31u)) & 0xffffffffu)));
                        float GLF_dead6res = float(((GLF_dead6res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead6res1 & 1u) != 0u ? 1u : 0u));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        GLF_dead6_GLF_color = vec4(GLF_dead6res, GLF_dead6res, GLF_dead6res, 1.0);
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead12gl_FragCoord;
                        }
                        ivec2 GLF_dead6icoord = ivec2(((coord - vec2(_GLF_IDENTITY(0.4, min(0.4, 0.4)), 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead6res3 = ((GLF_dead6icoord.x >> _GLF_IDENTITY(5, (5) - (0 >> _GLF_IDENTITY(int(3), int(3))))) & 1) ^ ((GLF_dead6icoord.y & 32) >> 5);
                        int GLF_dead6res2 = (GLF_dead6icoord.y * _GLF_IDENTITY(GLF_dead6icoord, _GLF_IDENTITY(ivec2(0, 0), max(ivec2(0, 0), ivec2(0, 0))) + (GLF_dead6icoord)).y >> 10) & 1;
                        int GLF_dead6res1 = (GLF_dead6icoord.x * GLF_dead6icoord.y >> 9) & 1;
                        GLF_dead6_GLF_color = vec4(float(GLF_dead6res1 ^ GLF_dead6res2), float(GLF_dead6res2 & GLF_dead6res3), float(GLF_dead6res1 | GLF_dead6res3), 1.0);
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead10color = _GLF_FUZZED(mix(injectionSwitch, dFdxCoarse(coord), vec2(90.94, 6.1)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                }
                                vec3 donor_replacementGLF_dead10vecCoor = _GLF_FUZZED((vec3(951.532, -7.8, -8496.3124)));
                                {
                                    donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[4]))));
                                    donor_replacementGLF_dead10color[1] += asinh(GLF_dead10gl_FragCoord.y * ldexp(donor_replacementGLF_dead10color.y, -GLF_dead6res3));
                                    break;
                                }
                            }
                            _GLF_color = res;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (uvstep <= -0.9 && uvstep >= -1.1) {
                                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                        }
                    }
                }
            }
            res += texture(tex, coord + vec2(float(i - 1) * _GLF_IDENTITY(uvstep, (true ? uvstep : _GLF_FUZZED(913.384))), float(j - 1) * uvstep)) * weights[i * 3 + j];
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead12gl_FragCoord;
                    }
                    GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (_GLF_IDENTITY(false, !(!(false))))))) {
                            if (coord.x > 0.4) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = GLF_dead13_GLF_color;
                                }
                                if (coord.y < 0.6) {
                                    uvec2 GLF_dead13icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                } else {
                                    ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                }
                            } else {
                                ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                            }
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (false)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead10gl_FragCoord;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                {
                                    ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                }
                            }
                            _GLF_color = _GLF_color;
                        } else {
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            int donor_replacementGLF_dead11count = _GLF_FUZZED(i);
                            int donor_replacementGLF_dead11v = _GLF_FUZZED(27691);
                            {
                                if ((donor_replacementGLF_dead11v & 1) == 1) {
                                    donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                } else {
                                    donor_replacementGLF_dead11v /= 2;
                                }
                                donor_replacementGLF_dead11count++;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                _GLF_color = fwidthCoarse(GLF_dead10gl_FragCoord);
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = res;
                            }
                            {
                                ivec2 GLF_dead6icoord = ivec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / _GLF_IDENTITY(0.6, (0.6) / 1.0), 1.0)) * 256.0);
                                int GLF_dead6v = (GLF_dead6icoord.x ^ GLF_dead6icoord.y) * GLF_dead6icoord.y;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead10gl_FragCoord;
                                }
                                bool GLF_dead6res1 = ((GLF_dead6v >> 10) & 1) != 0;
                                bool GLF_dead6res2 = ((GLF_dead6v >> 11) & 4) != 0;
                                bool GLF_dead6res3 = (_GLF_IDENTITY((GLF_dead6v >> 12) & 8, ~(~((GLF_dead6v >> 12) & 8)))) != 0;
                                GLF_dead6_GLF_color = vec4(GLF_dead6res1 ? 1.0 : 0.0, GLF_dead6res2 ? 1.0 : _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (true ? 0.0 : _GLF_FUZZED(57.39)))) + 0.0), GLF_dead6res3 ? 1.0 : 0.0, 1);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = mod(GLF_dead10gl_FragCoord, -7649.4217);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead13_GLF_color;
                        }
                    }
                }
                do {
                    return;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = res;
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (false))));
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(injectionSwitch);
            {
                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = mat4(512.909, 183.293, -2.4, -4.8, -0.1, 548.473, 84.60, -8.4, 7.6, -740.230, 6666.2807, -4806.6875, 1.4, -9.3, -9.5, 759.559)[0];
                }
                float donor_replacementGLF_dead9h = _GLF_FUZZED((+uvstep));
                int donor_replacementGLF_dead9i = _GLF_FUZZED(-79406);
                float donor_replacementGLF_dead9slope = _GLF_FUZZED(ldexp(5.3, 90721));
                {
                    coord -= coord;
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch))) * vec2(1.0, 1.0)).x > injectionSwitch.y)))) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(coord);
                        if (donor_replacementGLF_dead13coord.x > 0.4) {
                            if (donor_replacementGLF_dead13coord.y < 0.6) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(126.624, GLF_dead12injectionSwitch, GLF_dead14polynomial[2]);
                                }
                                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                            } else {
                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                            }
                        } else {
                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                            bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                            bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                            bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                            GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    uvstep += donor_replacementGLF_dead9slope;
                    donor_replacementGLF_dead9h = texture(GLF_dead9tex, coord).y;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead6_GLF_color;
                    }
                    donor_replacementGLF_dead9i++;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            do {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    switch (i) {
                        case 0:
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(5.6, 322.513, -7.6, -1.9);
                            }
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 4;
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                }
                            }
                        case 1:
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 3;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(sin(0.0)))))) {
                                _GLF_color = sign((_GLF_color - (+uvstep)));
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        case 2:
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 2;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = degrees(res);
                                if (_GLF_DEAD(false)) {
                                    {
                                        uvstep = -uvstep;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            _GLF_color = log(mat3x4(uvstep)[0]);
                                            if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                vec2 donor_replacementGLF_dead10color = _GLF_FUZZED(ldexp(injectionSwitch, ivec2(3111, 60296)));
                                                int donor_replacementGLF_dead10i = _GLF_FUZZED(i);
                                                vec3 donor_replacementGLF_dead10vecCoor = _GLF_FUZZED(tan(vec3(219.091, 4.1, -8.4)));
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_dead12gl_FragCoord;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead11v = _GLF_FUZZED(findMSB(132637u));
                                                        {
                                                            donor_replacementGLF_dead11v /= 2;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_dead14_GLF_color;
                                                    }
                                                }
                                                if (int(GLF_dead10gl_FragCoord[1]) < 120) {
                                                    donor_replacementGLF_dead10color = fract(acosh(clamp(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[3])), 1.0, 1000.0)));
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = GLF_dead6_GLF_color;
                                                        }
                                                        _GLF_color = GLF_dead10gl_FragCoord;
                                                    }
                                                    donor_replacementGLF_dead10color.x += (isnan(GLF_dead10gl_FragCoord.x) ? log2(GLF_dead10gl_FragCoord.x) : log2(GLF_dead10gl_FragCoord.y));
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_dead10gl_FragCoord;
                                                    }
                                                } else if (int(GLF_dead10gl_FragCoord[1]) < 150) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        int donor_replacementGLF_dead11count = _GLF_FUZZED(findLSB(i));
                                                        int donor_replacementGLF_dead11v = _GLF_FUZZED(donor_replacementGLF_dead10i);
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_dead10gl_FragCoord;
                                                        }
                                                        while (donor_replacementGLF_dead11v > 1) {
                                                            if ((donor_replacementGLF_dead11v & 1) == 1) {
                                                                donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                                            } else {
                                                                donor_replacementGLF_dead11v /= 2;
                                                            }
                                                            donor_replacementGLF_dead11count++;
                                                        }
                                                    }
                                                    discard;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), ((gl_FragCoord.y < 0.0)) || false)))) {
                                                        break;
                                                    }
                                                } else if (int(GLF_dead10gl_FragCoord[1]) < 180) {
                                                    donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[4]))));
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    donor_replacementGLF_dead10color[1] += asinh(GLF_dead10gl_FragCoord.y * ldexp(donor_replacementGLF_dead10color.y, -donor_replacementGLF_dead10i));
                                                    break;
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = smoothstep(GLF_dead14_GLF_color, vec4(442.620, 18.87, 3.9, 6.3), GLF_dead14_GLF_color);
                                                    }
                                                    if (int(GLF_dead10gl_FragCoord[1]) < 210) {
                                                        donor_replacementGLF_dead10color = fract(_GLF_IDENTITY(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[5]))), (sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[5])))) + vec2(0.0, 0.0)));
                                                        donor_replacementGLF_dead10color.y -= tanh(donor_replacementGLF_dead10color.x) / cosh(donor_replacementGLF_dead10color.y);
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = (res / vec4(-6.0, -41.38, -4.3, -5931.4586));
                                                        }
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = abs(_GLF_color);
                                                        }
                                                        if (int(GLF_dead10gl_FragCoord[1]) < 240) {
                                                            donor_replacementGLF_dead10color = fract(asinh(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[6]))));
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = fwidth(_GLF_color);
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                donor_replacementGLF_dead10color.y -= isnan(float(donor_replacementGLF_dead10i)) ? tanh(GLF_dead10gl_FragCoord.x) : atanh(GLF_dead10gl_FragCoord.y);
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    float donor_replacementGLF_dead14temp = _GLF_FUZZED(tan(uvstep));
                                                                    float donor_replacementGLF_dead14x0 = _GLF_FUZZED(cosh(uvstep));
                                                                    float donor_replacementGLF_dead14x1 = _GLF_FUZZED(-8405.3539);
                                                                    float donor_replacementGLF_dead14x2 = _GLF_FUZZED(uvstep);
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = GLF_dead13_GLF_color;
                                                                    }
                                                                    while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                                                                        float GLF_dead14h0 = donor_replacementGLF_dead14x0 - donor_replacementGLF_dead14x2;
                                                                        float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = GLF_dead14_GLF_color;
                                                                        }
                                                                        float GLF_dead14k0 = GLF_dead14fx(donor_replacementGLF_dead14x0) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                                        float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                                        donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                                                                        uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                                                        uvstep = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                                                        uvstep = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                                        donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * uvstep) / (uvstep + sign(uvstep) * sqrt(pow(uvstep, 2.0) - (4.0 * uvstep * uvstep))));
                                                                        donor_replacementGLF_dead14x0 = donor_replacementGLF_dead14x1;
                                                                        donor_replacementGLF_dead14x1 = donor_replacementGLF_dead14temp;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        int donor_replacementGLF_dead11v = _GLF_FUZZED(-41952);
                                                                        {
                                                                            donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                                                        }
                                                                    }
                                                                    _GLF_color = GLF_dead6_GLF_color;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    float donor_replacementGLF_dead14B = _GLF_FUZZED(dot(GLF_dead10gl_FragCoord, vec4(7.9, donor_replacementGLF_dead10vecCoor)));
                                                                    float donor_replacementGLF_dead14x0 = _GLF_FUZZED(uvstep);
                                                                    float donor_replacementGLF_dead14x2 = _GLF_FUZZED(-4.6);
                                                                    while (abs(donor_replacementGLF_dead14x2 - uvstep) >= .000000000000001) {
                                                                        float GLF_dead14h0 = donor_replacementGLF_dead14x0 - donor_replacementGLF_dead14x2;
                                                                        float GLF_dead14h1 = uvstep - donor_replacementGLF_dead14x2;
                                                                        float GLF_dead14k0 = GLF_dead14fx(donor_replacementGLF_dead14x0) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                                        float GLF_dead14k1 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                                        uvstep = donor_replacementGLF_dead14x2;
                                                                        uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                                                        donor_replacementGLF_dead14B = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                                                        uvstep = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                                        donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * uvstep) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * uvstep * uvstep))));
                                                                        donor_replacementGLF_dead14x0 = uvstep;
                                                                        uvstep = uvstep;
                                                                    }
                                                                }
                                                            }
                                                            break;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = acos(GLF_dead10gl_FragCoord);
                                                                }
                                                                _GLF_color = vec4(donor_replacementGLF_dead10vecCoor, -62.25);
                                                            }
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = mix(GLF_dead10gl_FragCoord, GLF_dead13_GLF_color, floor(uvstep));
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = (_GLF_IDENTITY(donor_replacementGLF_dead10vecCoor, _GLF_IDENTITY(vec3(mat2x4(donor_replacementGLF_dead10vecCoor, exp(_GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0)))), 1.0, 0.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, 1.0)), 0.0)), _GLF_IDENTITY(mat3(1.0) * (vec3(mat2x4(donor_replacementGLF_dead10vecCoor, exp(_GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0)))), 1.0, 0.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, 1.0)), 0.0))), (mat3(1.0) * (vec3(mat2x4(donor_replacementGLF_dead10vecCoor, exp(_GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0)))), 1.0, 0.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0, 0.0, 1.0)), 0.0)))) + vec3(0.0, 0.0, 0.0)))) * (mat4x3(648.046, 14.27, -8757.9444, -3.1, -4.9, 8702.1777, 7.1, 26.83, 4607.3863, -3.7, -48.69, 301.187) * uvstep));
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                            }
                                                            if (int(GLF_dead10gl_FragCoord[1]) < 270) {
                                                                donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[7]))));
                                                                donor_replacementGLF_dead10color.y *= mix(normalize(donor_replacementGLF_dead10vecCoor), normalize(vec3(donor_replacementGLF_dead10color, degrees(donor_replacementGLF_dead10color.x))), GLF_dead10injectionSwitch.x).y;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = vec4(min(dFdyCoarse(6.8), -488.272), GLF_dead14polynomial);
                                                                }
                                                                break;
                                                            } else {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = GLF_dead6_GLF_color;
                                                                        }
                                                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead10color - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                                        int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                                                        bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                                                        bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                                                        bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                                                        GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                                                    }
                                                                }
                                                                discard;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_dead6_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                discard;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(log(vec2(53.06, -8.8)), 645.673, 24.42);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                i = 3 * i + 1;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead14B = _GLF_FUZZED(tan(((-8647.9464) - 4035.2747)));
                                    float donor_replacementGLF_dead14C = _GLF_FUZZED(uvstep);
                                    float donor_replacementGLF_dead14temp = _GLF_FUZZED(uvstep);
                                    float donor_replacementGLF_dead14x1 = _GLF_FUZZED(uvstep);
                                    float donor_replacementGLF_dead14x2 = _GLF_FUZZED(tanh(-1.6));
                                    while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                                        float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                                        float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                                        float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = dFdxFine(GLF_dead10gl_FragCoord);
                                        }
                                        donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                                        uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead10gl_FragCoord;
                                        }
                                        donor_replacementGLF_dead14B = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                        donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * uvstep * donor_replacementGLF_dead14C))));
                                        uvstep = donor_replacementGLF_dead14x1;
                                        donor_replacementGLF_dead14x1 = donor_replacementGLF_dead14temp;
                                    }
                                }
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(floatBitsToInt(uvstep));
                                    int donor_replacementGLF_dead8j = _GLF_FUZZED((96439 ^ i));
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                            _GLF_color = GLF_dead12gl_FragCoord;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead11count = _GLF_FUZZED(((67287u == 181351u) ? mix(donor_replacementGLF_dead8j, donor_replacementGLF_dead8i, true) : donor_replacementGLF_dead8i));
                                                while (donor_replacementGLF_dead8i > 1) {
                                                    if ((donor_replacementGLF_dead8i & 1) == 1) {
                                                        donor_replacementGLF_dead8i = 3 * donor_replacementGLF_dead8i + 1;
                                                    } else {
                                                        donor_replacementGLF_dead8i /= 2;
                                                    }
                                                    donor_replacementGLF_dead11count++;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            float donor_replacementGLF_dead14B = _GLF_FUZZED(min(-4.8, uvstep));
                                            float donor_replacementGLF_dead14C = _GLF_FUZZED(uvstep);
                                            float donor_replacementGLF_dead14temp = _GLF_FUZZED(-1.3);
                                            float donor_replacementGLF_dead14x1 = _GLF_FUZZED(uvstep);
                                            float donor_replacementGLF_dead14x2 = _GLF_FUZZED(7101.5883);
                                            while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                                                float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                                                float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                                                float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                                                uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                                donor_replacementGLF_dead14B = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                                donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                                donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * uvstep * donor_replacementGLF_dead14C))));
                                                uvstep = donor_replacementGLF_dead14x1;
                                                donor_replacementGLF_dead14x1 = donor_replacementGLF_dead14temp;
                                            }
                                        }
                                        GLF_dead6_GLF_color += texture(GLF_dead8tex, coord + vec2(float(donor_replacementGLF_dead8i - 1) * uvstep, float(donor_replacementGLF_dead8j - 1) * _GLF_IDENTITY(uvstep, min(uvstep, uvstep)))) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + donor_replacementGLF_dead8j, 9)];
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            uvec2 GLF_dead13icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
                                float donor_replacementGLF_dead9h = _GLF_FUZZED(radians(uvstep));
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(-4462);
                                float donor_replacementGLF_dead9refh = _GLF_FUZZED(-5316.5374);
                                float donor_replacementGLF_dead9slope = _GLF_FUZZED(uvstep);
                                while (donor_replacementGLF_dead9h < donor_replacementGLF_dead9refh && donor_replacementGLF_dead9i < 32) {
                                    donor_replacementGLF_dead9coord -= coord;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-87.81, GLF_dead10injectionSwitch, 57.07);
                                    }
                                    donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    do {
                                        donor_replacementGLF_dead9h = texture(GLF_dead9tex, donor_replacementGLF_dead9coord).y;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    donor_replacementGLF_dead9i++;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (coord.x > 0.4) {
                                    if (coord.y < 0.6) {
                                        uvec2 GLF_dead13icoord = uvec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = dFdy(res);
                                        }
                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                    } else {
                                        ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(-6.5, uvstep, fma(78.75, uvstep, -962.332), 9.6);
                                        }
                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                    }
                                } else {
                                    ivec2 GLF_dead13icoord = ivec2(((coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                }
                            }
                        case 3:
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    if ((i & 1) == 1) {
                                        i = 3 * i + 1;
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead14_GLF_color;
                                        }
                                        i /= 2;
                                    }
                                }
                                _GLF_IDENTITY(GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 1, (false ? _GLF_FUZZED(i) : (GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 1)));
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead14B = _GLF_FUZZED(uvstep);
                                    float donor_replacementGLF_dead14x1 = _GLF_FUZZED(atan(-6.2));
                                    float donor_replacementGLF_dead14x2 = _GLF_FUZZED(-586.961);
                                    while (abs(donor_replacementGLF_dead14x2 - donor_replacementGLF_dead14x1) >= .000000000000001) {
                                        float GLF_dead14h0 = uvstep - donor_replacementGLF_dead14x2;
                                        float GLF_dead14h1 = donor_replacementGLF_dead14x1 - donor_replacementGLF_dead14x2;
                                        float GLF_dead14k0 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead14x1) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        uvstep = donor_replacementGLF_dead14x2;
                                        uvstep = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                        donor_replacementGLF_dead14B = (((GLF_dead14k0) - (uvstep * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                        uvstep = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * uvstep) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * uvstep * uvstep))));
                                        uvstep = donor_replacementGLF_dead14x1;
                                        donor_replacementGLF_dead14x1 = uvstep;
                                    }
                                }
                            } else {
                            }
                            break;
                        case 4:
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 0;
                            break;
                        case 5:
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -1;
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead14_GLF_color;
                            }
                        case 6:
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -2;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead14x2 = _GLF_FUZZED(-2.0);
                                if (donor_replacementGLF_dead14x2 <= -0.9 && donor_replacementGLF_dead14x2 >= -1.1) {
                                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead14A = _GLF_FUZZED(-23.46);
                                    float donor_replacementGLF_dead14B = _GLF_FUZZED(5.0);
                                    float donor_replacementGLF_dead14C = _GLF_FUZZED(fwidthFine(uvstep));
                                    float donor_replacementGLF_dead14temp = _GLF_FUZZED(fwidth(uvstep));
                                    float donor_replacementGLF_dead14x0 = _GLF_FUZZED(dFdxFine(-0.9));
                                    float donor_replacementGLF_dead14x2 = _GLF_FUZZED(inversesqrt(-7914.8500));
                                    {
                                        float GLF_dead14h0 = donor_replacementGLF_dead14x0 - donor_replacementGLF_dead14x2;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = mod(log(res), GLF_dead14_GLF_color);
                                        }
                                        float GLF_dead14h1 = uvstep - donor_replacementGLF_dead14x2;
                                        float GLF_dead14k0 = GLF_dead14fx(donor_replacementGLF_dead14x0) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        float GLF_dead14k1 = GLF_dead14fx(uvstep) - GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        donor_replacementGLF_dead14temp = donor_replacementGLF_dead14x2;
                                        donor_replacementGLF_dead14A = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                        donor_replacementGLF_dead14B = (((GLF_dead14k0) - (donor_replacementGLF_dead14A * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                        donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead14x2);
                                        donor_replacementGLF_dead14x2 = donor_replacementGLF_dead14x2 - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * donor_replacementGLF_dead14A * donor_replacementGLF_dead14C))));
                                        donor_replacementGLF_dead14x0 = uvstep;
                                        uvstep = donor_replacementGLF_dead14temp;
                                    }
                                }
                                _GLF_color = pow(_GLF_color, GLF_dead6_GLF_color);
                            }
                        case 7:
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(uvstep, GLF_dead10injectionSwitch, uvstep);
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(injectionSwitch);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (mat4(-3.9, 9395.2837, 8737.0737, 8.3, -4.6, -30.00, -11.67, -5377.0650, 7.4, 8.1, -26.26, -4276.1316, -893.065, -6.2, 9.2, -9.2) * vec4(0.0, 1.9, 7.2, 739.883));
                                    }
                                    {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                _GLF_color = (dFdxCoarse(-588.089) + _GLF_color);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(7891.5551, 45.63, 55.05, 8417.0296);
                                }
                            }
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -3;
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y >= 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = mod(_GLF_color, GLF_dead6_GLF_color);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                                        _GLF_color = step(-7127.1564, inversesqrt(_GLF_color));
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = floor(GLF_dead14_GLF_color);
                                    }
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead10gl_FragCoord;
                                }
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead10color = _GLF_FUZZED(coord);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-4.7, 937.170, -7577.4722, 92.61);
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead14x2 = _GLF_FUZZED(uvstep);
                                    if (donor_replacementGLF_dead14x2 <= -0.9 && donor_replacementGLF_dead14x2 >= -1.1) {
                                        GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    } else {
                                        GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(7.6, -836.488, 629.911, 1459.6173);
                                    }
                                }
                                vec3 donor_replacementGLF_dead10vecCoor = _GLF_FUZZED((uvstep + vec3(184.858, -521.768, -3.9)));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = tan(acos(acos(GLF_dead6_GLF_color)));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = mat2x4(4.0, -1.9, 5.5, 2.9, -0.8, -821.044, -69.71, -9.0)[0];
                                    }
                                }
                                if (int(GLF_dead10gl_FragCoord[1]) < 60) {
                                    donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[1]))));
                                    donor_replacementGLF_dead10color[1] *= atan(faceforward(GLF_dead10injectionSwitch, donor_replacementGLF_dead10color.xx, donor_replacementGLF_dead10vecCoor.yx).y);
                                    break;
                                } else if (int(GLF_dead10gl_FragCoord[1]) < 90) {
                                    donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[2]))));
                                    donor_replacementGLF_dead10color.x += atanh(donor_replacementGLF_dead10color.x) * cosh(GLF_dead10injectionSwitch.y) * smoothstep(donor_replacementGLF_dead10color, GLF_dead10injectionSwitch, GLF_dead10gl_FragCoord.yy).x;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    break;
                                } else if (int(GLF_dead10gl_FragCoord[1]) < 120) {
                                    donor_replacementGLF_dead10color = fract(acosh(clamp(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[3])), 1.0, 1000.0)));
                                    donor_replacementGLF_dead10color.x += (isnan(GLF_dead10gl_FragCoord.x) ? log2(GLF_dead10gl_FragCoord.x) : log2(GLF_dead10gl_FragCoord.y));
                                    break;
                                } else if (int(GLF_dead10gl_FragCoord[1]) < 150) {
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = atan(GLF_dead10gl_FragCoord, GLF_dead13_GLF_color);
                                    }
                                } else if (int(GLF_dead10gl_FragCoord[1]) < 180) {
                                    donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[4]))));
                                    donor_replacementGLF_dead10color[1] += asinh(GLF_dead10gl_FragCoord.y * ldexp(donor_replacementGLF_dead10color.y, -i));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = tanh(vec4(9.8, 2769.2886, -6.6, -900.865));
                                    }
                                    break;
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (GLF_dead6_GLF_color + 946.991);
                                    }
                                    if (_GLF_IDENTITY(int(GLF_dead10gl_FragCoord[1]), ~(_GLF_IDENTITY(~(int(GLF_dead10gl_FragCoord[1])), int(ivec4(~(int(GLF_dead10gl_FragCoord[1])), 0, 0, 0))))) < 210) {
                                        donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[5]))));
                                        donor_replacementGLF_dead10color.y -= tanh(donor_replacementGLF_dead10color.x) / cosh(donor_replacementGLF_dead10color.y);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = GLF_dead6_GLF_color;
                                        }
                                        break;
                                    } else if (int(GLF_dead10gl_FragCoord[1]) < 240) {
                                        donor_replacementGLF_dead10color = fract(asinh(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[6]))));
                                        donor_replacementGLF_dead10color.y -= isnan(float(i)) ? tanh(GLF_dead10gl_FragCoord.x) : atanh(GLF_dead10gl_FragCoord.y);
                                        break;
                                    } else if (int(GLF_dead10gl_FragCoord[1]) < 270) {
                                        donor_replacementGLF_dead10color = fract(sin(donor_replacementGLF_dead10vecCoor.yx - trunc(float(GLF_dead10data[7]))));
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead12a = _GLF_FUZZED(int(uvstep));
                                            int donor_replacementGLF_dead12b = _GLF_FUZZED(22014);
                                            int donor_replacementGLF_dead12c = _GLF_FUZZED(36217);
                                            vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED(GLF_dead10injectionSwitch);
                                            do {
                                                donor_replacementGLF_dead12uv.y -= step(GLF_dead12injectionSwitch.y, donor_replacementGLF_dead12uv.x) + float(donor_replacementGLF_dead12a) + float(donor_replacementGLF_dead12b);
                                                donor_replacementGLF_dead12uv.x += ldexp(GLF_dead12injectionSwitch.y, isinf(donor_replacementGLF_dead12uv.y + donor_replacementGLF_dead12uv.x) ? findMSB(donor_replacementGLF_dead12b) : findMSB(donor_replacementGLF_dead12a));
                                                donor_replacementGLF_dead12c--;
                                            } while (donor_replacementGLF_dead12c > int(GLF_dead12injectionSwitch.x));
                                        }
                                        donor_replacementGLF_dead10color.y *= mix(normalize(donor_replacementGLF_dead10vecCoor), normalize(vec3(donor_replacementGLF_dead10color, degrees(donor_replacementGLF_dead10color.x))), GLF_dead10injectionSwitch.x).y;
                                        break;
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    discard;
                                                }
                                            }
                                            discard;
                                        } else {
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(coord);
                                {
                                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                    } else {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead12gl_FragCoord;
                                        }
                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                    }
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(GLF_dead12injectionSwitch, coord);
                            }
                        case 8:
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(log2(injectionSwitch));
                                        float donor_replacementGLF_dead9h = _GLF_FUZZED(-77.70);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (GLF_dead6_GLF_color * res);
                                            }
                                            int donor_replacementGLF_dead11count = _GLF_FUZZED(90943);
                                            while (i > 1) {
                                                if ((i & 1) == 1) {
                                                    i = 3 * i + 1;
                                                } else {
                                                    i /= 2;
                                                }
                                                donor_replacementGLF_dead11count++;
                                            }
                                        }
                                        float donor_replacementGLF_dead9refh = _GLF_FUZZED(injectionSwitch.x);
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(pow(injectionSwitch, injectionSwitch));
                                            {
                                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 0.0, tan(0.0), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))) {
                                                    _GLF_color = GLF_dead6_GLF_color;
                                                }
                                                bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                                bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                                bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                                GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = smoothstep(cosh(GLF_dead12gl_FragCoord), _GLF_color, res);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = fma(_GLF_color, smoothstep(-14.46, 7017.3024, _GLF_color), vec4(1.1, 87.75, 5.0, -93.64));
                                                }
                                                int donor_replacementGLF_dead11count = _GLF_FUZZED((true ? (-15086) : 51825));
                                                int donor_replacementGLF_dead11v = _GLF_FUZZED(((-14586) - ivec2(40908, -40139)).x);
                                                while (donor_replacementGLF_dead11v > 1) {
                                                    if ((donor_replacementGLF_dead11v & 1) == 1) {
                                                        donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = roundEven(GLF_dead6_GLF_color);
                                                        }
                                                    } else {
                                                        donor_replacementGLF_dead11v /= 2;
                                                    }
                                                    donor_replacementGLF_dead11count++;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead12injectionSwitch.yxyx;
                                                }
                                            }
                                            _GLF_color = intBitsToFloat(ivec4(-78406, -75793, 31682, -12038));
                                        }
                                        {
                                            donor_replacementGLF_dead9coord -= coord;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = atan(vec2(6004.1192, 5.2), donor_replacementGLF_dead9coord).xxxy;
                                            }
                                            donor_replacementGLF_dead9refh += uvstep;
                                            donor_replacementGLF_dead9h = texture(GLF_dead9tex, donor_replacementGLF_dead9coord).y;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            i++;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                {
                                                    i = 3 * i + 1;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(vec2(vec3(8.8, -671.889, -864.466)));
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = sinh(GLF_dead14_GLF_color);
                                            }
                                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                        }
                                    }
                                    _GLF_color = (uvstep * res);
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead10i = _GLF_FUZZED(i);
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = res;
                                            }
                                            break;
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            switch (donor_replacementGLF_dead10i) {
                                                case 0:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_dead10gl_FragCoord;
                                                        }
                                                        _GLF_color = tanh(res);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = fract(GLF_dead14_GLF_color);
                                                    }
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = 1;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = pow(GLF_dead12gl_FragCoord, GLF_dead10gl_FragCoord);
                                                    }
                                                    break;
                                                case 4:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = 0;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(245.595, 894.535, -810.576, 8.2);
                                                            }
                                                            i = 3 * i + 1;
                                                        }
                                                    }
                                                case 5:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = -_GLF_IDENTITY(1, (true ? _GLF_IDENTITY(1, (1) >> 0) : _GLF_FUZZED(i)));
                                                    break;
                                                case 6:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = -2;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead11count = _GLF_FUZZED(donor_replacementGLF_dead10i);
                                                        while (i > 1) {
                                                            if ((i & 1) == 1) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                i = 3 * i + 1;
                                                            } else {
                                                                i /= 2;
                                                            }
                                                            donor_replacementGLF_dead11count++;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(uvstep);
                                                            }
                                                        }
                                                    }
                                                case 7:
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = GLF_dead6_GLF_color;
                                                    }
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = -4;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                                        }
                                                    }
                                                case 9:
                                                    GLF_dead10data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i, 10)] = -5;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = max(GLF_dead12gl_FragCoord, log2(GLF_dead12gl_FragCoord));
                                                    }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                int donor_replacementGLF_dead12a = _GLF_FUZZED(i);
                                                int donor_replacementGLF_dead12b = _GLF_FUZZED(i);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                    _GLF_color = roundEven(GLF_dead14_GLF_color);
                                                }
                                                vec2 donor_replacementGLF_dead12uv = _GLF_FUZZED(injectionSwitch);
                                                {
                                                    donor_replacementGLF_dead12uv.y -= step(GLF_dead12injectionSwitch.y, donor_replacementGLF_dead12uv.x) + float(donor_replacementGLF_dead12a) + float(donor_replacementGLF_dead12b);
                                                    donor_replacementGLF_dead12uv.x += ldexp(GLF_dead12injectionSwitch.y, isinf(donor_replacementGLF_dead12uv.y + donor_replacementGLF_dead12uv.x) ? findMSB(donor_replacementGLF_dead12b) : findMSB(donor_replacementGLF_dead12a));
                                                    i--;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead10i++;
                                    } while (donor_replacementGLF_dead10i < 10);
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                                {
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                                        _GLF_color = GLF_dead6_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = smoothstep(uvstep, uvstep, _GLF_color);
                                    }
                                    i = i;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead13_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = vec4(-2.3, -4.4, -919.251, -2.4);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                    _GLF_color = (mat3(6.4, 360.414, 4.1, 70.52, -582.011, 6.1, -6420.4356, -5302.0808, 967.705), GLF_dead6_GLF_color);
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = (GLF_dead12gl_FragCoord / GLF_dead6_GLF_color);
                                    }
                                    break;
                                }
                            }
                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -4;
                            break;
                        case 9:
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(tan(vec2(522.673, -7263.8688)));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = (mat4(3239.1697, -52.93, 9.4, -916.841, 49.61, -2.8, 1.7, 92.11, -5251.2027, 88.40, -15.46, -5136.1179, 5.3, 5.2, -6317.6819, -6.8) * GLF_dead13_GLF_color).xzww;
                                        }
                                        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = GLF_dead12gl_FragCoord;
                                                }
                                                GLF_dead6_GLF_color += _GLF_IDENTITY(texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * uvstep, float(GLF_dead8j - 1) * uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)], (texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * uvstep, float(GLF_dead8j - 1) * uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)]) * vec4(1.0, 1.0, 1.0, 1.0));
                                            }
                                        }
                                    }
                                }
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead11count = _GLF_FUZZED((uvstep, 64480));
                                        int donor_replacementGLF_dead11v = _GLF_FUZZED(-61049);
                                        {
                                            if ((donor_replacementGLF_dead11v & 1) == 1) {
                                                donor_replacementGLF_dead11v = 3 * donor_replacementGLF_dead11v + 1;
                                            } else {
                                                donor_replacementGLF_dead11v /= 2;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (-GLF_dead13_GLF_color);
                                                }
                                            }
                                            donor_replacementGLF_dead11count++;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-7511.6929, 4.9, -1.0, 8.4);
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(GLF_dead12injectionSwitch, uvstep, uvstep);
                                    }
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        discard;
                                    }
                                    GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -5;
                                } else {
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                        _GLF_color = GLF_dead10gl_FragCoord;
                                    }
                                    _GLF_color = (res * mat4(uvstep));
                                }
                            }
                            break;
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(false, false, false)), false || (bool(bvec3(false, false, false))))))) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(coord);
                    float donor_replacementGLF_dead9h = _GLF_FUZZED(-714.759);
                    {
                        donor_replacementGLF_dead9coord -= coord;
                        uvstep += uvstep;
                        donor_replacementGLF_dead9h = texture(GLF_dead9tex, donor_replacementGLF_dead9coord).y;
                        i++;
                    }
                }
                i++;
            } while (_GLF_IDENTITY(i < 10, bool(_GLF_IDENTITY(bvec3(i < 10, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false), bvec3(_GLF_IDENTITY(bvec3(bvec3(i < 10, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false)), bvec3(bvec3(bvec3(bvec3(i < 10, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false))))))))));
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    continue;
                }
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = (+GLF_dead12gl_FragCoord);
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (uvstep <= -0.9 && uvstep >= -1.1) {
                            GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(uvstep, injectionSwitch, ceil(-95.90));
                    }
                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(atan(vec2(-9.6, 253.730)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = GLF_dead10gl_FragCoord;
                    }
                    float donor_replacementGLF_dead9refh = _GLF_FUZZED(uvstep);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(dFdxCoarse(-8.8), GLF_dead14polynomial);
                    }
                    float donor_replacementGLF_dead9slope = _GLF_FUZZED(273.199);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0))))))) {
                        if (donor_replacementGLF_dead9refh <= -0.9 && donor_replacementGLF_dead9refh >= -1.1) {
                            GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead14_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    while (uvstep < donor_replacementGLF_dead9refh && i < 32) {
                        donor_replacementGLF_dead9coord -= coord;
                        donor_replacementGLF_dead9refh += donor_replacementGLF_dead9slope;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(6.2, -1.0, -3.8, 7.5);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead10gl_FragCoord;
                            }
                        }
                        uvstep = texture(GLF_dead9tex, donor_replacementGLF_dead9coord).y;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            i++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead12gl_FragCoord;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            float donor_replacementGLF_dead14A = _GLF_FUZZED(distance(vec4(2078.7227, 7761.0720, 6621.4464, 139.326), vec4(-327.531, donor_replacementGLF_dead9refh, dFdyFine(injectionSwitch))));
                            float donor_replacementGLF_dead14B = _GLF_FUZZED(radians(donor_replacementGLF_dead9refh));
                            float donor_replacementGLF_dead14C = _GLF_FUZZED((uvstep + donor_replacementGLF_dead9refh));
                            float donor_replacementGLF_dead14x0 = _GLF_FUZZED(vec3(1245.4694, 35.66, 38.42).p);
                            {
                                float GLF_dead14h0 = donor_replacementGLF_dead14x0 - donor_replacementGLF_dead9slope;
                                float GLF_dead14h1 = donor_replacementGLF_dead9refh - donor_replacementGLF_dead9slope;
                                float GLF_dead14k0 = GLF_dead14fx(donor_replacementGLF_dead14x0) - GLF_dead14fx(donor_replacementGLF_dead9slope);
                                float GLF_dead14k1 = GLF_dead14fx(donor_replacementGLF_dead9refh) - GLF_dead14fx(donor_replacementGLF_dead9slope);
                                donor_replacementGLF_dead9slope = donor_replacementGLF_dead9slope;
                                donor_replacementGLF_dead14A = (((GLF_dead14h1) * (GLF_dead14k0)) - ((GLF_dead14h0) * (GLF_dead14k1))) / ((pow((GLF_dead14h0), 2.0) * (GLF_dead14h1)) - (pow((GLF_dead14h1), 2.0) * (GLF_dead14h0)));
                                donor_replacementGLF_dead14B = (((GLF_dead14k0) - (donor_replacementGLF_dead14A * (pow((GLF_dead14h0), 2.0)))) / (GLF_dead14h0));
                                donor_replacementGLF_dead14C = GLF_dead14fx(donor_replacementGLF_dead9slope);
                                donor_replacementGLF_dead9slope = donor_replacementGLF_dead9slope - ((2.0 * donor_replacementGLF_dead14C) / (donor_replacementGLF_dead14B + sign(donor_replacementGLF_dead14B) * sqrt(pow(donor_replacementGLF_dead14B, 2.0) - (4.0 * donor_replacementGLF_dead14A * donor_replacementGLF_dead14C))));
                                donor_replacementGLF_dead14x0 = donor_replacementGLF_dead9refh;
                                donor_replacementGLF_dead9refh = donor_replacementGLF_dead9slope;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mix(_GLF_color, vec4(-0.8, -623.849, -9840.5676, -2.8), refract(dFdy(GLF_dead10gl_FragCoord), vec4(-72.62, -244.444, -1.2, 4.2), -8.1));
                    }
                    _GLF_IDENTITY(_GLF_color = (trunc(vec3(-5828.2116, 893.479, -662.839)) * mat4x3(-34.10, -4022.6219, 981.973, 57.46, -3.2, 0.6, 6.1, -525.680, 5.4, -944.451, 67.87, 552.901)), (_GLF_color = (trunc(vec3(-5828.2116, 893.479, -662.839)) * mat4x3(-34.10, -4022.6219, 981.973, 57.46, -3.2, 0.6, 6.1, -525.680, 5.4, -944.451, 67.87, 552.901))) / sqrt(vec4(1.0, 1.0, 1.0, 1.0)));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(4.6, GLF_dead12injectionSwitch, 560.122);
                }
            }
        }
    }
    _GLF_color = vec4(res.xyz, 1.0);
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead6_GLF_color;
    }
}
