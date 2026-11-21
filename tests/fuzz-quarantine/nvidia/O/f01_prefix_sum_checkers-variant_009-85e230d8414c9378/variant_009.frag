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
vec4 GLF_live11_GLF_color = _GLF_FUZZED((vec2(-6919.7084, 7141.5876) * mat4x2(4743.3025, -393.557, _GLF_IDENTITY(-4.7, abs(0.0) + (_GLF_IDENTITY(-4.7, (false ? _GLF_FUZZED(0.2) : _GLF_IDENTITY(-4.7, clamp(-4.7, -4.7, -4.7)))))), 475.983, -6.5, 448.914, -8386.5458, _GLF_IDENTITY(4256.6088, mix(float(4256.6088), float(_GLF_FUZZED(-0.1)), bool(false))))));
vec4 GLF_live12gl_FragCoord = _GLF_FUZZED((vec4(9289.3872, -6663.4134, -5852.1973, -7389.3418) - (-473.467)));
const int GLF_live12N = 10;
int GLF_live12data[10] = int[10](_GLF_FUZZED(84662), _GLF_FUZZED(95927), _GLF_FUZZED(37362), _GLF_FUZZED(((-62270) ^ ivec4(-96621, -49288, 19474, 92014).w)), _GLF_FUZZED((36071 & (_GLF_IDENTITY((-38208), ((-38208)) << 0) & 56742))), _GLF_FUZZED((~39746)), _GLF_FUZZED((92857 & ((-96895) | (-49861)))), _GLF_FUZZED(97358), _GLF_FUZZED(-66751), _GLF_FUZZED((1054 * (-81364)))), GLF_live12temp[10] = int[10](_GLF_FUZZED(((+41106) - 14636)), _GLF_FUZZED(_GLF_IDENTITY(-_GLF_IDENTITY(79481, (_GLF_IDENTITY(79481, (79481) - 0)) | 0), min(-_GLF_IDENTITY(79481, (_GLF_IDENTITY(79481, (79481) - 0)) | 0), _GLF_IDENTITY(-_GLF_IDENTITY(79481, (_GLF_IDENTITY(79481, (79481) - 0)) | 0), (-_GLF_IDENTITY(79481, (_GLF_IDENTITY(79481, (79481) - 0)) | 0)) << 0)))), _GLF_FUZZED(((-57138) - (-83082))), _GLF_FUZZED(((-85627) & (_GLF_IDENTITY(-56712, (-56712) - 0)))), _GLF_FUZZED((94602 | (~7683))), _GLF_FUZZED((_GLF_IDENTITY(ivec4(47449, 67580, -39273, 65371), (ivec4(47449, 67580, -39273, 65371)) | (ivec4(47449, 67580, -39273, 65371))).s - _GLF_IDENTITY(80311, (0 & GLF_live12N) ^ (80311)))), _GLF_FUZZED(81722), _GLF_FUZZED(-30765), _GLF_FUZZED(_GLF_IDENTITY(((-79210) * 92119), 0 | (((-79210) * 92119)))), _GLF_FUZZED(int((vec2(-73.85, 43.85) != vec2(-7.1, -0.1)))));

void GLF_live12merge(int GLF_live12from, int GLF_live12mid, int GLF_live12to) {
    int GLF_live12k = GLF_live12from, GLF_live12i = GLF_live12from, GLF_live12j = GLF_live12mid + 1;
    {
        int GLF_live12looplimiter0 = 0;
        while (GLF_live12i <= GLF_live12mid && GLF_live12j <= GLF_live12to) {
            if (GLF_live12looplimiter0 >= 5) {
                break;
            }
            GLF_live12looplimiter0++;
            {
                if (GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] < GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)]) {
                    GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i++, 10)];
                } else {
                    GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live12j++, (GLF_live12j++) | 0), 10)];
                }
            }
        }
    }
    {
        int GLF_live12looplimiter1 = 0;
        while (GLF_live12i < GLF_live12N && GLF_live12i <= GLF_live12mid) {
            if (_GLF_IDENTITY(GLF_live12looplimiter1 >= 5, false || (GLF_live12looplimiter1 >= 5))) {
                break;
            }
            GLF_live12looplimiter1++;
            {
                GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i++, 10)];
            }
        }
    }
    {
        int GLF_live12looplimiter2 = 0;
        for (int GLF_live12i = GLF_live12from; GLF_live12i <= GLF_live12to; GLF_live12i++) {
            if (GLF_live12looplimiter2 >= 5) {
                break;
            }
            GLF_live12looplimiter2++;
            {
                GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)];
            }
        }
    }
}

layout(set = 0, binding = 2) uniform sampler2D GLF_live10tex;
vec4 GLF_dead9_GLF_color = _GLF_FUZZED((-vec4(-_GLF_IDENTITY(3.2, (_GLF_IDENTITY(3.2, max(3.2, 3.2))) + 0.0), 5.7, 7586.2714, 6381.6885)));

layout(set = 0, binding = 3) uniform buf3 {
    vec3 GLF_dead9polynomial;
};

float GLF_dead9fx(float GLF_dead9x) {
    return _GLF_IDENTITY(GLF_dead9polynomial.x * pow(GLF_dead9x, 2.0) + GLF_dead9polynomial.y * GLF_dead9x, (_GLF_IDENTITY(GLF_dead9polynomial.x * pow(GLF_dead9x, 2.0) + GLF_dead9polynomial.y * GLF_dead9x, float(float(GLF_dead9polynomial.x * pow(GLF_dead9x, 2.0) + GLF_dead9polynomial.y * GLF_dead9x)))) + 0.0) + GLF_dead9polynomial.z;
}

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead5resolution;
};

const int GLF_dead4dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, _GLF_IDENTITY(172, (172) | (172)), 163, _GLF_IDENTITY(153, (_GLF_IDENTITY(153, 0 ^ (153))) | (_GLF_IDENTITY(153, 0 | (153)))), 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, _GLF_IDENTITY(124, min(124, 124)), 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, _GLF_IDENTITY(105, min(105, 105)), 97, 93, 91, 93, _GLF_IDENTITY(98, clamp(_GLF_IDENTITY(98, clamp(_GLF_IDENTITY(98, (98) ^ 0), 98, 98)), 98, 98)), 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, _GLF_IDENTITY(155, (155) - 0), 155, 152, 146, 139, 129, _GLF_IDENTITY(118, (118) / 1), 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, _GLF_IDENTITY(51, (51) - 0), 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, _GLF_IDENTITY(186, min(186, 186)), 188, 186, 181, 174, 164, 153, 141, 128, _GLF_IDENTITY(116, min(_GLF_IDENTITY(116, (116) | (116)), 116)), 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, _GLF_IDENTITY(83, (0 >> _GLF_IDENTITY(int(7), int(7))) + (_GLF_IDENTITY(83, (83) >> 0))), 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, _GLF_IDENTITY(87, (false ? _GLF_FUZZED(GLF_live12N) : _GLF_IDENTITY(87, (_GLF_IDENTITY(87, (87) >> 0)) >> 0))), 92, 97, 101, 103, 102, 100, 95, 88, _GLF_IDENTITY(79, 0 ^ (79)), 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_live1_GLF_color = _GLF_FUZZED(vec4(9.6, 3301.8803, 977.165, -61.55));
layout(set = 0, binding = 5) uniform sampler2D GLF_live3tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    if (_GLF_DEAD(false)) {
        _GLF_color = max(vec4(-90.32, _GLF_IDENTITY(939.039, max(939.039, 939.039)), 9.9, -_GLF_IDENTITY(4305.6383, max(4305.6383, _GLF_IDENTITY(4305.6383, (false ? _GLF_FUZZED(-4.5) : 4305.6383))))), vec4(596.603, 8177.1524, -5.2, _GLF_IDENTITY(-9134.0113, clamp(-9134.0113, -9134.0113, -9134.0113))));
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = ((-mat4(-41.89, 688.394, 84.64, -_GLF_IDENTITY(0.4, float(vec4(0.4, 0.0, 1.0, 0.0))), 8536.2207, -889.069, -6434.2099, 7925.3900, -915.180, -6508.4071, 38.52, 3.8, 885.127, 3642.6267, 8681.1611, 6.8)) * vec4(134.336, 2.2, 504.531, 83.86));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                vec2 GLF_live10coord = _GLF_FUZZED((+(_GLF_IDENTITY(vec2(0.5, 7.9), (vec2(0.5, 7.9)) - vec2(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x))) * 0.9)));
                if (GLF_live10coord.x > 1.0)
                    GLF_live10coord.x -= 1.0;
            }
            if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec4(_GLF_DEAD(false), false, false, true)))) {
                _GLF_IDENTITY(_GLF_color = vec4(5908.9039, -1.4, 8.5, 1.2), (_GLF_color = vec4(5908.9039, -1.4, 8.5, 1.2)) - vec4(0.0, 0.0, 0.0, 0.0));
            }
            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color));
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(45.15, -87.36, -4.7, 9.4);
    }
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    for (int j = -1; j <= int(injectionSwitch.y); j++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = round(_GLF_color);
        }
        for (int i = -1; _GLF_IDENTITY(i <= int(injectionSwitch.y), (i <= int(injectionSwitch.y)) && true); i++) {
            vec2 g = vec2(float(j), float(i));
            vec2 o = mix(n, g, 0.2);
            if (injectionSwitch.x < (m.x)) {
                int k = 1;
                while (k >= 0) {
                    o = _GLF_IDENTITY(o, (o) / abs(vec2(1.0, 1.0))) + o;
                    k--;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_live1_GLF_color;
                    }
                    {
                        vec2 GLF_live1coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(2.2, (2.2) - 0.0), -4610.7113));
                        {
                            uvec2 GLF_live1icoord = uvec2(((GLF_live1coord - vec2(0.4, _GLF_IDENTITY(0.0, float(mat4(0.0, 0.0, 1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, 1.0, abs(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0))))) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead7z = _GLF_FUZZED(dFdyFine(_GLF_IDENTITY(-562.824, (-562.824) / 1.0)));
                                {
                                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(-1874.6986, 80.06));
                                    if (GLF_live11coord.y < 0.6) {
                                        uvec2 GLF_live11icoord = uvec2(((_GLF_IDENTITY(GLF_live11coord, max(GLF_live11coord, _GLF_IDENTITY(GLF_live11coord, max(GLF_live11coord, GLF_live11coord)))) - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                    } else {
                                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                                        int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                        int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                    }
                                }
                                {
                                    donor_replacementGLF_dead7z = _GLF_IDENTITY(o.y / o.x, min(o.y / o.x, _GLF_IDENTITY(o.y / o.x, min(_GLF_IDENTITY(o.y / o.x, (true ? (o.y / o.x) : _GLF_FUZZED(donor_replacementGLF_dead7z))), o.y / o.x))));
                                }
                                {
                                    int GLF_live12high = _GLF_FUZZED(((-2599) * (-25936)));
                                    int GLF_live12i = _GLF_FUZZED(65747);
                                    int GLF_live12looplimiter3 = 0;
                                    int GLF_live12m = _GLF_FUZZED((true ? (-68154) : (-69142)));
                                    {
                                        if (GLF_live12looplimiter3 >= 5) {
                                            ;
                                        }
                                        GLF_live12looplimiter3++;
                                        {
                                            int GLF_live12from = GLF_live12i;
                                            int GLF_live12mid = GLF_live12i + GLF_live12m - 1;
                                            int GLF_live12to = min(GLF_live12i + 2 * GLF_live12m - 1, GLF_live12high);
                                            GLF_live12merge(GLF_live12from, GLF_live12mid, GLF_live12to);
                                        }
                                    }
                                }
                            }
                            uint GLF_live1res1 = uint(((GLF_live1icoord.x * GLF_live1icoord.y) >> (GLF_live1icoord.x & 31u)) & _GLF_IDENTITY(0xffffffffu, 0u | (_GLF_IDENTITY(0xffffffffu, (0xffffffffu) | 0u))));
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead9x2 = _GLF_FUZZED(distance(_GLF_outVarBackup_GLF_color, GLF_live1_GLF_color));
                                        if (_GLF_IDENTITY(donor_replacementGLF_dead9x2 <= -0.9, true && (_GLF_IDENTITY(donor_replacementGLF_dead9x2 <= -0.9, false || (donor_replacementGLF_dead9x2 <= -0.9)))) && donor_replacementGLF_dead9x2 >= -1.1) {
                                            GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                        }
                                    }
                                    _GLF_color = vec4(-83.90, 0.2, 454.868, -121.318);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                            {
                                                vec2 GLF_live11coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(-661.776, -149.794)), mat2(1.0) * (_GLF_FUZZED(vec2(-661.776, -149.794))));
                                                {
                                                    ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                    int GLF_live11v = (GLF_live11icoord.x ^ _GLF_IDENTITY(GLF_live11icoord.y, 0 ^ (_GLF_IDENTITY(GLF_live11icoord.y, (GLF_live11icoord.y) * 1)))) * GLF_live11icoord.y;
                                                    bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                                                    bool GLF_live11res2 = ((GLF_live11v >> 11) & 4) != 0;
                                                    bool GLF_live11res3 = ((GLF_live11v >> 12) & 8) != 0;
                                                    GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? 1.0 : 0.0, GLF_live11res3 ? 1.0 : 0.0, 1);
                                                }
                                            }
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mix(vec4(8.8, 2.8, -3856.4678, 771.139), mat4(-2.6, -_GLF_IDENTITY(699.199, (699.199) - _GLF_ZERO(0.0, injectionSwitch.x)), -_GLF_IDENTITY(53.68, float(float(53.68))), 167.285, -72.30, 6.4, 7.1, -489.785, -402.258, -8.0, -4.6, -53.75, 3.8, -7.1, -_GLF_IDENTITY(9.9, mix(float(9.9), float(_GLF_FUZZED(_GLF_IDENTITY(vec3(8982.6466, -9.7, 8.4), mat3(_GLF_ONE(1.0, injectionSwitch.y)) * (vec3(8982.6466, -9.7, 8.4))).t)), bool(false))), 4857.3366)[2], 9.0);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, float(mat4(injectionSwitch.y, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(step(3.7, 531.879)) : _GLF_IDENTITY(0.0, (0.0) * 1.0))), 0.0, 0.0, 0.0)), abs(1.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))), _GLF_IDENTITY(bool(bool(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, float(mat4(injectionSwitch.y, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(step(3.7, 531.879)) : _GLF_IDENTITY(0.0, (0.0) * 1.0))), 0.0, 0.0, 0.0)), abs(1.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, float(mat4(injectionSwitch.y, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(step(3.7, 531.879)) : _GLF_IDENTITY(0.0, (0.0) * 1.0))), 0.0, 0.0, 0.0)), abs(1.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))))))), bool(bool(bool(bool(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, float(mat4(injectionSwitch.y, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(step(3.7, 531.879)) : _GLF_IDENTITY(0.0, (0.0) * 1.0))), 0.0, 0.0, 0.0)), abs(1.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, float(mat4(injectionSwitch.y, 0.0, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 0.0))), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(step(3.7, 531.879)) : _GLF_IDENTITY(0.0, (0.0) * 1.0))), 0.0, 0.0, 0.0)), abs(1.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))))))))))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(findLSB(ivec4(-62811, -_GLF_IDENTITY(28721, max(28721, 28721)), 49921, 98968)).st);
                                {
                                    if (donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(_GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) - ivec2(0, 0)).y, min(_GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) - ivec2(0, 0)).y, _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) - ivec2(0, 0)).y)), 256)] + 15 && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15) {
                                        float GLF_dead4p = _GLF_IDENTITY((15.0 - abs(float(_GLF_IDENTITY(donor_replacementGLF_dead4pos, (_GLF_IDENTITY(false, bool(bvec4(false, false, false, false))) ? _GLF_FUZZED(donor_replacementGLF_dead4pos) : donor_replacementGLF_dead4pos)).x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0, (true ? ((15.0 - abs(float(_GLF_IDENTITY(donor_replacementGLF_dead4pos, (_GLF_IDENTITY(false, bool(bvec4(false, false, false, false))) ? _GLF_FUZZED(donor_replacementGLF_dead4pos) : donor_replacementGLF_dead4pos)).x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0) : _GLF_FUZZED(763.751)));
                                        ;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            {
                                                GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                            }
                                        }
                                    }
                                    {
                                        vec2 GLF_live11coord = _GLF_FUZZED(vec3(-8.5, -959.313, -4474.4428).bg);
                                        if (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y, min(_GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y, _GLF_IDENTITY(_GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y, float(mat4x2(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y, clamp(_GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y, _GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y, _GLF_IDENTITY(GLF_live11coord, mix(vec2((GLF_live11coord)[0], (GLF_live11coord)[1]), vec2(_GLF_FUZZED(2.2), _GLF_FUZZED(863.493)), bvec2(false, false))).y)), abs(1.0), 0.0, 0.0, 1.0, 1.0, 1.0, 0.0))))) < 0.6) {
                                            uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (_GLF_IDENTITY(GLF_live11icoord.x & 31u, max(GLF_live11icoord.x & 31u, _GLF_IDENTITY(GLF_live11icoord.x & 31u, clamp(GLF_live11icoord.x & 31u, GLF_live11icoord.x & 31u, GLF_live11icoord.x & 31u)))))) & 0xffffffffu);
                                            uint GLF_live11res2 = uint((_GLF_IDENTITY((GLF_live11icoord.x * GLF_live11icoord.y), min((GLF_live11icoord.x * GLF_live11icoord.y), (GLF_live11icoord.x * GLF_live11icoord.y))) << _GLF_IDENTITY((GLF_live11icoord.x & 31u), min((GLF_live11icoord.x & 31u), (GLF_live11icoord.x & 31u)))) & 0xffffffffu);
                                            float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                        } else {
                                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.4, (0.4) / 1.0))) * 256.0);
                                            int GLF_live11res3 = ((GLF_live11icoord.x >> _GLF_IDENTITY(5, int(int(5)))) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                                            int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                            int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                            GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = intBitsToFloat(ivec4(36393, -21543, 46265, 11377));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_IDENTITY(false, !(!(false))) ? _GLF_FUZZED(GLF_dead9_GLF_color) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
                                        _GLF_color = vec4(636.227, -9.8, 4.9, 4719.3628);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                float donor_replacementGLF_dead7z = _GLF_FUZZED(0.6);
                                                if (n.y > n.x) {
                                                    donor_replacementGLF_dead7z = n.x / n.y;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) * 1.0))))) {
                                                        _GLF_color = GLF_dead9_GLF_color;
                                                    }
                                                } else {
                                                    donor_replacementGLF_dead7z = n.y / n.x;
                                                }
                                            }
                                            _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (false ? _GLF_FUZZED(vec4(-4.5, 7.9, 8432.5120, 2.1)) : (_GLF_color = _GLF_outVarBackup_GLF_color)))) * vec4(1.0, 1.0, 1.0, 1.0));
                                        }
                                    }
                                    donor_replacementGLF_dead4pos.y++;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                        _GLF_color = (GLF_live1_GLF_color.yzyz * GLF_dead9_GLF_color);
                                    }
                                }
                            }
                            uint GLF_live1res2 = uint(((GLF_live1icoord.x * _GLF_IDENTITY(GLF_live1icoord, uvec2(GLF_live1icoord[0], GLF_live1icoord[1])).y) << (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, (_GLF_IDENTITY(GLF_live1icoord, min(_GLF_IDENTITY(GLF_live1icoord, uvec2(uvec4(GLF_live1icoord, 1u, _GLF_IDENTITY(1u, (true ? 1u : _GLF_FUZZED(GLF_live1res1)))))), _GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, max(GLF_live1icoord, GLF_live1icoord)), (_GLF_IDENTITY(GLF_live1icoord, max(GLF_live1icoord, GLF_live1icoord))) | uvec2(0u, 0u))))) - uvec2(0u, 0u)).x & 31u, ~(~(_GLF_IDENTITY(GLF_live1icoord, (_GLF_IDENTITY(GLF_live1icoord, min(_GLF_IDENTITY(GLF_live1icoord, uvec2(uvec4(GLF_live1icoord, 1u, _GLF_IDENTITY(1u, (true ? 1u : _GLF_FUZZED(GLF_live1res1)))))), _GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, max(GLF_live1icoord, GLF_live1icoord)), (_GLF_IDENTITY(GLF_live1icoord, max(GLF_live1icoord, GLF_live1icoord))) | uvec2(0u, 0u))))) - uvec2(0u, 0u)).x & 31u))))) & 0xffffffffu);
                            float GLF_live1res = float(((GLF_live1res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live1res1 & 1u) != 0u ? 1u : 0u));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    GLF_live1res = GLF_live1coord.y / GLF_live1coord.x;
                                }
                            }
                            _GLF_IDENTITY(GLF_live1_GLF_color = vec4(GLF_live1res, GLF_live1res, GLF_live1res, 1.0), (GLF_live1_GLF_color = vec4(GLF_live1res, GLF_live1res, GLF_live1res, 1.0)) / _GLF_IDENTITY(vec4(1.0, 1.0, 1.0, 1.0), min(vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0))));
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(7.3, -96.38, -6.9, 7204.9598);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (true ? (_GLF_color = _GLF_outVarBackup_GLF_color) : _GLF_FUZZED(GLF_live11_GLF_color)));
                    }
                }
                m = vec3(injectionSwitch.x, cos(o));
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (bvec3(true, false, true), vec4(-3.1, 530.109, 604.086, 1928.8510));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, min(gl_FragCoord.x, gl_FragCoord.x)) < 0.0)))) {
                    float donor_replacementGLF_dead9A = _GLF_FUZZED(faceforward(degrees(2487.9824), _GLF_IDENTITY(72.81, max(72.81, _GLF_IDENTITY(72.81, (true ? 72.81 : _GLF_FUZZED(6888.0580))))), 4257.9903));
                    float donor_replacementGLF_dead9B = _GLF_FUZZED(intBitsToFloat(bitCount(179586u)));
                    float donor_replacementGLF_dead9C = _GLF_FUZZED(fwidthFine(radians(normalize(6.1))));
                    float donor_replacementGLF_dead9temp = _GLF_FUZZED(5.6);
                    float donor_replacementGLF_dead9x0 = _GLF_FUZZED(-5.2);
                    float donor_replacementGLF_dead9x1 = _GLF_FUZZED(_GLF_IDENTITY(1128.8857, max(1128.8857, 1128.8857)));
                    float donor_replacementGLF_dead9x2 = _GLF_FUZZED(normalize(-1.1));
                    {
                        float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                        float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (mat3x4(1399.2802, -4442.0100, 572.607, 9.7, -4.5, 8.5, -582.906, -5.5, -370.368, 5891.3226, 661.253, 6378.0103) * mat2x3(0.2, 22.31, 692.739, -27.19, 2.2, -2.9))[0];
                            {
                                {
                                    ;
                                }
                            }
                        }
                        float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                        float GLF_dead9k1 = _GLF_IDENTITY(GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2), (GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2)) + 0.0);
                        donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                        donor_replacementGLF_dead9A = (((GLF_dead9h1) * (_GLF_IDENTITY(GLF_dead9k0, (GLF_dead9k0) / 1.0))) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                        donor_replacementGLF_dead9B = ((_GLF_IDENTITY((GLF_dead9k0), (_GLF_IDENTITY((GLF_dead9k0), max((GLF_dead9k0), (GLF_dead9k0)))) * _GLF_IDENTITY(dot(vec4(0.0, log(1.0), 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, log(1.0), 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)))) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                        donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                        donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (_GLF_IDENTITY(donor_replacementGLF_dead9B, (_GLF_IDENTITY(donor_replacementGLF_dead9B, min(donor_replacementGLF_dead9B, donor_replacementGLF_dead9B))) / 1.0) + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (_GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, (false ? _GLF_FUZZED(donor_replacementGLF_dead9x0) : _GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, (false ? _GLF_FUZZED(donor_replacementGLF_dead9C) : (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C)))))))));
                        donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            {
                                int GLF_live12i = _GLF_FUZZED(69873);
                                {
                                    int GLF_live12looplimiter5 = 0;
                                    do {
                                        if (GLF_live12looplimiter5 >= 5) {
                                            break;
                                        }
                                        GLF_live12looplimiter5++;
                                        {
                                            switch (GLF_live12i) {
                                                case 0:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    _GLF_IDENTITY(GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 1, 0 ^ (GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 1));
                                                    break;
                                                case 4:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live12i++;
                                        }
                                    } while (GLF_live12i < 10);
                                }
                            }
                        }
                        donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                    }
                    {
                        vec2 GLF_live11coord = _GLF_FUZZED(_GLF_IDENTITY(vec2(_GLF_IDENTITY(-1.6, clamp(-1.6, -1.6, -1.6)), -9.6), mix(vec2((vec2(_GLF_IDENTITY(-1.6, clamp(-1.6, -1.6, -1.6)), -9.6))[0], (vec2(_GLF_IDENTITY(-1.6, clamp(-1.6, -1.6, -1.6)), -9.6))[1]), vec2(_GLF_FUZZED((7922.8391)), _GLF_FUZZED(float(-28116))), bvec2(false, false))));
                        if (_GLF_IDENTITY(GLF_live11coord, (GLF_live11coord) * mat2(1.0)).y < 0.6) {
                            uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live11res1 = _GLF_IDENTITY(uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu), max(uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu), uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu)));
                            uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != _GLF_IDENTITY(0u, clamp(_GLF_IDENTITY(0u, 0u | (0u)), 0u, 0u)) ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                        } else {
                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                            int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                            int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                            GLF_live11_GLF_color = vec4(float(_GLF_IDENTITY(GLF_live11res1 ^ GLF_live11res2, 0 ^ (GLF_live11res1 ^ GLF_live11res2))), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, (_GLF_IDENTITY(gl_FragCoord.x, (gl_FragCoord.x) - 0.0)) / 1.0) < _GLF_IDENTITY(0.0, (0.0) / 1.0))))) {
                        _GLF_color = vec4(88.21, -85.05, 5.4, -503.467);
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            {
                ;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = mat2x4(8.6, 5.6, -_GLF_IDENTITY(5.5, float(float(5.5))), -2.0, -0.5, -7108.2178, -6883.2991, -937.044)[0];
    }
    return vec2(m.x, m.y - m.z);
    {
        int GLF_live2looplimiter0 = 0;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = ((mat2x4(-9.3, 4.8, -6634.5394, 4006.4336, 858.952, 84.37, -115.988, 8156.5965) / _GLF_IDENTITY((-9592.2206), mix(float(_GLF_IDENTITY((-9592.2206), mix(float(_GLF_FUZZED(373.578)), float((-9592.2206)), bool(true)))), float(_GLF_FUZZED(-192.798)), bool(false)))) * vec2(6.0, -4.4));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), true && (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                _GLF_color = dFdxFine(_GLF_color);
            }
        }
        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, (false) || false)), false || (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))))) {
            float donor_replacementGLF_dead5xCoord = _GLF_FUZZED(-3.5);
            float donor_replacementGLF_dead5yCoord = _GLF_FUZZED(exp2(-11.72));
            {
                ;
                if (_GLF_DEAD(false)) {
                    _GLF_color = clamp(GLF_dead9_GLF_color, tan(GLF_dead9_GLF_color), GLF_live1_GLF_color);
                }
            }
        }
        {
            {
                ;
            }
        }
        if (GLF_live2looplimiter0 >= 6) {
            ;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-_GLF_IDENTITY(50.91, (50.91) - 0.0), -2.3, vec2(-0.4, 553.225));
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                float donor_replacementGLF_dead9x2 = _GLF_FUZZED(sinh(94.43));
                if (donor_replacementGLF_dead9x2 <= -0.9 && donor_replacementGLF_dead9x2 >= -1.1) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(sin(vec2(962.396, -6686.8727)), vec2(0.7, -1.1));
                    }
                    GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead9_GLF_color = vec4(_GLF_IDENTITY(0.0, max(0.0, 0.0)), 1.0, 0.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec2 GLF_live10coord = _GLF_FUZZED((mat4x2(49.35, 4.5, 98.06, -58.53, -9683.2420, -9382.5804, 69.43, -285.461) * vec4(483.171, -934.677, 958.705, 333.854)));
            int GLF_live10i = _GLF_FUZZED(34204);
            {
                int GLF_live10looplimiter0 = 0;
                while (_GLF_IDENTITY(GLF_live10i < 1 && GLF_live10coord.x > 1.0, (GLF_live10i < 1 && GLF_live10coord.x > 1.0) && true) || GLF_live10coord.y > 1.0) {
                    if (GLF_live10looplimiter0 >= _GLF_IDENTITY(6, (_GLF_IDENTITY(6, 0 | (6))) | (6))) {
                        break;
                    }
                    GLF_live10looplimiter0++;
                    {
                        if (GLF_live10coord.x > 1.0)
                            GLF_live10coord.x -= 1.0;
                        if (GLF_live10coord.y > 1.0)
                            GLF_live10coord.y -= 1.0;
                        GLF_live10coord *= 2.0;
                        GLF_live10i++;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead5x = _GLF_FUZZED(reflect(-0.2, -5587.4181));
        float donor_replacementGLF_dead5y = _GLF_FUZZED(-8130.4085);
        if (0.0 > GLF_dead5resolution.x) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead9A = _GLF_FUZZED(-1800.2849);
                float donor_replacementGLF_dead9temp = _GLF_FUZZED(-7.5);
                float donor_replacementGLF_dead9x0 = _GLF_FUZZED(atanh(tanh(donor_replacementGLF_dead5x)));
                float donor_replacementGLF_dead9x1 = _GLF_FUZZED(_GLF_IDENTITY(sign(dot(_GLF_IDENTITY(GLF_live1_GLF_color, vec4(_GLF_IDENTITY(mat4x3(GLF_live1_GLF_color, 0.0, 0.0, 0.0, round(length(normalize(1.0))), 1.0, abs(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)))), exp(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))), 0.0), mat4x3(mat4(mat4x3(GLF_live1_GLF_color, 0.0, 0.0, 0.0, round(length(normalize(1.0))), 1.0, abs(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)))), exp(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))), 0.0)))))), (GLF_live1_GLF_color * mat4(-9.4, -6.8, -9.9, 28.77, -50.51, -5.0, 35.73, 7.9, 7.3, 48.90, 6309.1015, _GLF_IDENTITY(-50.26, (-50.26) - 0.0), 780.623, -7312.2173, 494.784, 90.98)))), max(sign(dot(_GLF_IDENTITY(GLF_live1_GLF_color, vec4(_GLF_IDENTITY(mat4x3(GLF_live1_GLF_color, 0.0, 0.0, 0.0, round(length(normalize(1.0))), 1.0, abs(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)))), exp(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))), 0.0), mat4x3(mat4(mat4x3(GLF_live1_GLF_color, 0.0, 0.0, 0.0, round(length(normalize(1.0))), 1.0, abs(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)))), exp(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))), 0.0)))))), (GLF_live1_GLF_color * mat4(-9.4, -6.8, -9.9, 28.77, -50.51, -5.0, 35.73, 7.9, 7.3, 48.90, 6309.1015, _GLF_IDENTITY(-50.26, (-50.26) - 0.0), 780.623, -7312.2173, 494.784, 90.98)))), sign(dot(_GLF_IDENTITY(GLF_live1_GLF_color, vec4(_GLF_IDENTITY(mat4x3(GLF_live1_GLF_color, 0.0, 0.0, 0.0, round(length(normalize(1.0))), 1.0, abs(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)))), exp(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))), 0.0), mat4x3(mat4(mat4x3(GLF_live1_GLF_color, 0.0, 0.0, 0.0, round(length(normalize(1.0))), 1.0, abs(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)))), exp(_GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)))), 0.0)))))), (GLF_live1_GLF_color * mat4(-9.4, -6.8, -9.9, 28.77, -50.51, -5.0, 35.73, 7.9, 7.3, 48.90, 6309.1015, _GLF_IDENTITY(-50.26, (-50.26) - 0.0), 780.623, -7312.2173, 494.784, 90.98)))))));
                while (abs(_GLF_IDENTITY(donor_replacementGLF_dead5x - donor_replacementGLF_dead9x1, (_GLF_IDENTITY(donor_replacementGLF_dead5x - donor_replacementGLF_dead9x1, (true ? (donor_replacementGLF_dead5x - donor_replacementGLF_dead9x1) : _GLF_FUZZED(donor_replacementGLF_dead9x1)))) / 1.0)) >= .000000000000001) {
                    float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead5x;
                    float GLF_dead9h1 = donor_replacementGLF_dead9x1 - _GLF_IDENTITY(donor_replacementGLF_dead5x, clamp(donor_replacementGLF_dead5x, donor_replacementGLF_dead5x, donor_replacementGLF_dead5x));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(-9.3, -1595.3691, 2.3, -2619.4936);
                    }
                    float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead5x);
                    float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead5x);
                    {
                        int GLF_live12i = _GLF_FUZZED(-13092);
                        {
                            switch (GLF_live12i) {
                                case 0:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 4;
                                    break;
                                case 1:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 3;
                                    break;
                                case 2:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 2;
                                    break;
                                case 3:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 1;
                                    break;
                                case 4:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = 0;
                                    break;
                                case 5:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -1;
                                    break;
                                case 6:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -2;
                                    break;
                                case 7:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -3;
                                    break;
                                case 8:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -4;
                                    break;
                                case 9:
                                    GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = -5;
                                    break;
                            }
                            GLF_live12i++;
                        }
                    }
                    donor_replacementGLF_dead9temp = donor_replacementGLF_dead5x;
                    donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / _GLF_IDENTITY(((_GLF_IDENTITY(pow((GLF_dead9h0), 2.0) * (GLF_dead9h1), (false ? _GLF_FUZZED(sign(GLF_dead9k1)) : (pow((GLF_dead9h0), 2.0) * (GLF_dead9h1))))) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0))), mix(float(((_GLF_IDENTITY(pow((GLF_dead9h0), 2.0) * (GLF_dead9h1), (false ? _GLF_FUZZED(sign(GLF_dead9k1)) : (pow((GLF_dead9h0), 2.0) * (GLF_dead9h1))))) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)))), float(_GLF_FUZZED(4463.2434)), bool(false)));
                    donor_replacementGLF_dead5x = _GLF_IDENTITY((((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0)), _GLF_IDENTITY(float(float(_GLF_IDENTITY((((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0)), float(mat3((((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0)), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0))))), 1.0 * (float(float(_GLF_IDENTITY((((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0)), float(mat3((((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0)), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0))))))));
                    donor_replacementGLF_dead5y = GLF_dead9fx(donor_replacementGLF_dead5x);
                    donor_replacementGLF_dead5x = donor_replacementGLF_dead5x - ((2.0 * donor_replacementGLF_dead5y) / (donor_replacementGLF_dead5x + sign(donor_replacementGLF_dead5x) * sqrt(pow(donor_replacementGLF_dead5x, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead5y))));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-_GLF_IDENTITY(6.7, max(6.7, 6.7)), -629.204, -9.7, 8.1);
                    }
                    donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                    donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                }
            }
            donor_replacementGLF_dead5x = 1.0;
            donor_replacementGLF_dead5y = 1.0;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead9A = _GLF_FUZZED(-3.7);
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(2690.3836, -2896.9940));
                    {
                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & _GLF_IDENTITY(0xffffffffu, (0xffffffffu) * 1u));
                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                    }
                }
                float donor_replacementGLF_dead9B = _GLF_FUZZED(donor_replacementGLF_dead5y);
                float donor_replacementGLF_dead9temp = _GLF_FUZZED((uvec2(108768u, 11138u), donor_replacementGLF_dead5y));
                float donor_replacementGLF_dead9x2 = _GLF_FUZZED(intBitsToFloat(64652));
                {
                    float GLF_dead9h0 = donor_replacementGLF_dead5x - donor_replacementGLF_dead9x2;
                    float GLF_dead9h1 = donor_replacementGLF_dead5x - donor_replacementGLF_dead9x2;
                    float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead5x) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = min(_GLF_color, donor_replacementGLF_dead9temp);
                        {
                            {
                                ;
                            }
                        }
                    }
                    float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead5x) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                    donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(6.8, -487.238, -9.6, 827.419);
                    }
                    donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                    donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                    {
                        float GLF_live12grey = _GLF_FUZZED(float(71935u));
                        {
                            GLF_live12grey = 0.5 + float(GLF_live12data[2]) / 10.0;
                        }
                    }
                    donor_replacementGLF_dead5x = GLF_dead9fx(donor_replacementGLF_dead9x2);
                    donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead5x) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead5x))));
                    donor_replacementGLF_dead5x = donor_replacementGLF_dead5x;
                    donor_replacementGLF_dead5x = donor_replacementGLF_dead9temp;
                }
            }
        }
    }
}

vec4 _GLF_outlined_0(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_1(vec4 _GLF_outVarBackup_GLF_color) {
    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
        ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(16540, 74325).rg);
        if (_GLF_IDENTITY(_GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x, (_GLF_IDENTITY(_GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x, _GLF_IDENTITY((true ? _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x : _GLF_FUZZED(-60025)), clamp(_GLF_IDENTITY((true ? _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x : _GLF_FUZZED(-60025)), ((true ? _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x : _GLF_FUZZED(-60025))) | ((true ? _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x : _GLF_FUZZED(-60025)))), (true ? _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x : _GLF_FUZZED(-60025)), (true ? _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) >> ivec2(0, 0)).x : _GLF_FUZZED(-60025)))))) << 0) < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, _GLF_IDENTITY(256, 0 | (256)))] + 15 && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15) {
            float GLF_dead4p = (15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0;
            return vec4(GLF_dead4p, GLF_dead4p, GLF_dead4p, _GLF_IDENTITY(1.0, max(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(GLF_dead4p) : 1.0)), 1.0)));
        }
        {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = sqrt(vec4(9.0, -487.229, -27.25, 73.41));
        }
    }
    return _GLF_outVarBackup_GLF_color;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = (GLF_dead9_GLF_color - _GLF_color);
    }
}

vec4 _GLF_outlined_2() {
    return log2(vec4(235.274, _GLF_IDENTITY(-4023.8560, max(-4023.8560, _GLF_IDENTITY(-4023.8560, (-4023.8560) - 0.0))), -9.4, 8.9));
}

vec4 _GLF_outlined_3(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.y;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (length(_GLF_IDENTITY(uv, clamp(uv, uv, _GLF_IDENTITY(uv, vec2(uv[0], uv[1]))))) < 0.001) {
            {
                vec2 GLF_live11coord = _GLF_FUZZED((vec2(855.208, -7784.6815) - 4859.7798));
                {
                    if (GLF_live11coord.y < 0.6) {
                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.6, max(0.6, 0.6))), max(vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.6, max(0.6, 0.6))), vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.6, max(0.6, 0.6)))))) * 256.0);
                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & _GLF_IDENTITY(0xffffffffu, (0xffffffffu) >> 0u));
                        uint GLF_live11res2 = uint(((_GLF_IDENTITY(GLF_live11icoord.x * GLF_live11icoord.y, (true ? (GLF_live11icoord.x * GLF_live11icoord.y) : _GLF_FUZZED(clamp(uvec4(59839u, 186636u, 152676u, 54393u), 79170u, 55740u)[1])))) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? _GLF_IDENTITY(1u, (true ? 1u : _GLF_FUZZED(uvec3(158759u, 188392u, 176975u)[2]))) : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                    } else {
                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - _GLF_IDENTITY(vec2(0.4, 0.6), max(_GLF_IDENTITY(vec2(0.4, 0.6), (vec2(0.4, 0.6)) / vec2(1.0, 1.0)), vec2(0.4, 0.6)))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                        int GLF_live11res2 = (_GLF_IDENTITY(GLF_live11icoord, ivec2(ivec2(GLF_live11icoord))).y * GLF_live11icoord.y >> 10) & 1;
                        int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                    }
                }
            }
            ;
        }
    }
    float A[50];
    for (int i = 0; i < 200; i++) {
        if (i >= _GLF_IDENTITY(int(resolution.x), (false ? _GLF_FUZZED((25051 & i)) : int(resolution.x)))) {
            break;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = exp2(GLF_dead9_GLF_color);
        }
        if (_GLF_DEAD(false)) {
            {
                vec2 GLF_live11coord = _GLF_FUZZED((-((-53.94) - vec2(-73.97, 0.1))));
                {
                    ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_live11v = (GLF_live11icoord.x ^ GLF_live11icoord.y) * GLF_live11icoord.y;
                    bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                    bool GLF_live11res2 = ((GLF_live11v >> 11) & 4) != 0;
                    bool GLF_live11res3 = ((GLF_live11v >> 12) & 8) != 0;
                    GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? 1.0 : 0.0, GLF_live11res3 ? 1.0 : 0.0, 1);
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead7th = _GLF_FUZZED(determinant((mat4(115.686, 0.4, -2334.9817, -7.0, 18.24, 7.8, 5.4, 455.336, -_GLF_IDENTITY(99.18, min(99.18, _GLF_IDENTITY(99.18, float(vec2(99.18, 0.0))))), 7440.1878, -71.29, -9.7, 1.2, -81.11, 0.0, _GLF_IDENTITY(2.6, max(2.6, 2.6))))));
                {
                    donor_replacementGLF_dead7th = -donor_replacementGLF_dead7th;
                }
            }
            _GLF_color = vec4(358.860, -33.62, -_GLF_IDENTITY(99.50, max(99.50, 99.50)), -6.9);
            {
                int GLF_live12looplimiter1 = 0;
                if (GLF_live12looplimiter1 >= 5) {
                    ;
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live1_GLF_color;
            }
            if ((4 * _GLF_IDENTITY((i / _GLF_IDENTITY(4, 0 ^ (4))), int(_GLF_ZERO(0.0, injectionSwitch.x)) | ((i / _GLF_IDENTITY(4, 0 ^ (4)))))) == i) {
                A[i / 4] = float(i);
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(-1.3, 7.0));
                    {
                        if (GLF_live11coord.y < 0.6) {
                            uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live11res1 = uint(_GLF_IDENTITY(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu, (true ? _GLF_IDENTITY(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu, (false ? _GLF_FUZZED(99268u) : (((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu))) : _GLF_FUZZED(72311u))));
                            uint GLF_live11res2 = uint((_GLF_IDENTITY((GLF_live11icoord.x * GLF_live11icoord.y), uint(uvec2((GLF_live11icoord.x * GLF_live11icoord.y), 0u))) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? _GLF_IDENTITY(1u, 0u ^ (1u)) : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                        } else {
                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - _GLF_IDENTITY(vec2(0.4, 0.6), mix(vec2(_GLF_FUZZED(vec3(930.618, 9061.1915, -7.8).s), _GLF_FUZZED(-6352.4787)), vec2((vec2(0.4, 0.6))[0], (vec2(0.4, 0.6))[1]), bvec2(true, true)))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                            int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                            int GLF_live11res1 = (GLF_live11icoord.x * _GLF_IDENTITY(_GLF_IDENTITY(GLF_live11icoord, min(GLF_live11icoord, GLF_live11icoord)).y, min(_GLF_IDENTITY(GLF_live11icoord, min(GLF_live11icoord, GLF_live11icoord)).y, _GLF_IDENTITY(_GLF_IDENTITY(GLF_live11icoord, min(GLF_live11icoord, GLF_live11icoord)).y, 0 | (_GLF_IDENTITY(GLF_live11icoord, min(GLF_live11icoord, GLF_live11icoord)).y)))) >> 9) & 1;
                            _GLF_IDENTITY(GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0), (GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0)) / sqrt(vec4(1.0, 1.0, 1.0, 1.0)));
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), max(determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)))))))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                        _GLF_color = vec4(-3.2, -1.9, -2.4, -806.776);
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead7z = _GLF_FUZZED(floor(64.59));
                            {
                                vec2 GLF_live10coord = _GLF_FUZZED((vec2(-160.850, 3.6) - 8.0));
                                int GLF_live10i = _GLF_FUZZED(3970);
                                {
                                    int GLF_live10looplimiter0 = 0;
                                    while (GLF_live10i < 1 && GLF_live10coord.x > 1.0 || GLF_live10coord.y > 1.0) {
                                        if (GLF_live10looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live10looplimiter0++;
                                        {
                                            if (GLF_live10coord.x > 1.0)
                                                GLF_live10coord.x -= 1.0;
                                            if (GLF_live10coord.y > 1.0)
                                                GLF_live10coord.y -= 1.0;
                                            GLF_live10coord *= 2.0;
                                            GLF_live10i++;
                                        }
                                    }
                                }
                            }
                            {
                                donor_replacementGLF_dead7z = _GLF_IDENTITY(uv.y / uv.x, (false ? _GLF_FUZZED(asinh(9.6)) : (uv.y / uv.x)));
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                int GLF_live12high = _GLF_FUZZED(-96204);
                                int GLF_live12looplimiter4 = 0;
                                int GLF_live12low = _GLF_FUZZED((29115 + (-1563)));
                                for (int GLF_live12m = 1; GLF_live12m <= GLF_live12high; GLF_live12m = 2 * GLF_live12m) {
                                    if (GLF_live12looplimiter4 >= 5) {
                                        break;
                                    }
                                    GLF_live12looplimiter4++;
                                    {
                                        {
                                            int GLF_live12looplimiter3 = 0;
                                            for (int GLF_live12i = GLF_live12low; GLF_live12i < GLF_live12high; GLF_live12i += 2 * GLF_live12m) {
                                                if (GLF_live12looplimiter3 >= 5) {
                                                    break;
                                                }
                                                GLF_live12looplimiter3++;
                                                {
                                                    int GLF_live12from = GLF_live12i;
                                                    int GLF_live12mid = GLF_live12i + GLF_live12m - 1;
                                                    int GLF_live12to = min(GLF_live12i + 2 * GLF_live12m - 1, GLF_live12high);
                                                    GLF_live12merge(GLF_live12from, GLF_live12mid, GLF_live12to);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead7th = _GLF_IDENTITY(_GLF_FUZZED(62.45), min(_GLF_IDENTITY(_GLF_FUZZED(62.45), max(_GLF_FUZZED(62.45), _GLF_FUZZED(62.45))), _GLF_FUZZED(62.45)));
                                {
                                    donor_replacementGLF_dead7th = 1.0 - donor_replacementGLF_dead7th;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y < 0.0)))) {
                            float donor_replacementGLF_dead7th = _GLF_FUZZED(mix(43.03, max(31.82, exp(64.46)), false));
                            {
                                donor_replacementGLF_dead7th = 1.0 - donor_replacementGLF_dead7th;
                            }
                        }
                    }
                    float donor_replacementGLF_dead5c_im = _GLF_FUZZED(ldexp(intBitsToFloat(-_GLF_IDENTITY(72279, (72279) - 0)), 2462));
                    float donor_replacementGLF_dead5c_re = _GLF_FUZZED(asin(-85.90));
                    float donor_replacementGLF_dead5x = _GLF_IDENTITY(_GLF_FUZZED(2720.7324), (_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))) ? _GLF_FUZZED(donor_replacementGLF_dead5c_im) : _GLF_IDENTITY(_GLF_FUZZED(2720.7324), mix(float(_GLF_FUZZED(-0.0)), float(_GLF_IDENTITY(_GLF_FUZZED(2720.7324), float(vec4(_GLF_FUZZED(2720.7324), 0.0, 1.0, 0.0)))), bool(true)))));
                    float donor_replacementGLF_dead5y = _GLF_FUZZED(reflect(1.9, vec3(-90.90, _GLF_IDENTITY(844.331, (844.331) * 1.0), -3.4).y));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = min(GLF_dead9_GLF_color, _GLF_color);
                    }
                    {
                        if (_GLF_IDENTITY(donor_replacementGLF_dead5x * donor_replacementGLF_dead5x + donor_replacementGLF_dead5y * donor_replacementGLF_dead5y, max(donor_replacementGLF_dead5x * donor_replacementGLF_dead5x + donor_replacementGLF_dead5y * donor_replacementGLF_dead5y, donor_replacementGLF_dead5x * donor_replacementGLF_dead5x + donor_replacementGLF_dead5y * donor_replacementGLF_dead5y)) > _GLF_IDENTITY(4.0, mix(float(4.0), float(_GLF_FUZZED(((-44.38) * 7.4))), bool(false)))) {
                            if (_GLF_DEAD(false)) {
                                {
                                    donor_replacementGLF_dead5c_im = 1.0 - donor_replacementGLF_dead5c_im;
                                }
                            }
                            {
                                int GLF_live13looplimiter2 = 0;
                                if (GLF_live13looplimiter2 >= 6) {
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-538.633, -2.4, _GLF_IDENTITY(-663.791, max(-663.791, -663.791)), 5800.4009);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_IDENTITY(_GLF_DEAD(false), bool(bool(_GLF_DEAD(false))))))) {
                                _GLF_color = clamp(_GLF_color, donor_replacementGLF_dead5y, asin(donor_replacementGLF_dead5y));
                            }
                            break;
                        }
                        {
                            int GLF_live13i = _GLF_FUZZED(((-61437) & 9431));
                            int GLF_live13j = _GLF_FUZZED(46341);
                            uint GLF_live13uselessOutVariable = _GLF_FUZZED(4459u);
                            if (uint(GLF_live13j) < uaddCarry(uint(GLF_live13i), 1u, GLF_live13uselessOutVariable)) {
                                ;
                            }
                        }
                        float GLF_dead5x_new = donor_replacementGLF_dead5x * donor_replacementGLF_dead5x - donor_replacementGLF_dead5y * donor_replacementGLF_dead5y + donor_replacementGLF_dead5c_re;
                        donor_replacementGLF_dead5y = 2.0 * donor_replacementGLF_dead5x * donor_replacementGLF_dead5y + _GLF_IDENTITY(donor_replacementGLF_dead5c_im, max(donor_replacementGLF_dead5c_im, donor_replacementGLF_dead5c_im));
                        donor_replacementGLF_dead5x = GLF_dead5x_new;
                        _GLF_IDENTITY(i++, (i++) | 0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            float donor_replacementGLF_dead9B = _GLF_FUZZED(donor_replacementGLF_dead5c_im);
                            while (abs(donor_replacementGLF_dead5c_re - donor_replacementGLF_dead5c_im) >= .000000000000001) {
                                float GLF_dead9h0 = donor_replacementGLF_dead5y - donor_replacementGLF_dead5c_re;
                                {
                                    int GLF_live13looplimiter0 = 0;
                                    if (_GLF_IDENTITY(GLF_live13looplimiter0, (_GLF_IDENTITY(false, true && (false)) ? _GLF_FUZZED((true ? GLF_live12N : (-92766))) : _GLF_IDENTITY(GLF_live13looplimiter0, ~(~(GLF_live13looplimiter0))))) >= 6) {
                                        ;
                                    }
                                }
                                float GLF_dead9h1 = donor_replacementGLF_dead5c_im - donor_replacementGLF_dead5c_re;
                                {
                                    float GLF_live12grey = _GLF_FUZZED(-4.1);
                                    if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                        GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                                    } else {
                                        ;
                                    }
                                }
                                float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead5y) - GLF_dead9fx(donor_replacementGLF_dead5c_re);
                                float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead5c_im) - GLF_dead9fx(donor_replacementGLF_dead5c_re);
                                GLF_dead5x_new = donor_replacementGLF_dead5c_re;
                                donor_replacementGLF_dead5x = _GLF_IDENTITY((((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))), clamp(_GLF_IDENTITY((((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))), float(mat3((((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))), 0.0, determinant(mat4(1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)), exp(0.0), 0.0, 1.0, 0.0, 0.0, abs(1.0)))), (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))), _GLF_IDENTITY((((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))), min((((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))), (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))))))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - _GLF_IDENTITY((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), clamp(_GLF_IDENTITY((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), clamp((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), _GLF_IDENTITY((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), ((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0))) / 1.0))), (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), _GLF_IDENTITY((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), min((pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)), (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)))))));
                                donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead5x * _GLF_IDENTITY((pow((GLF_dead9h0), 2.0)), (_GLF_IDENTITY((pow((GLF_dead9h0), 2.0)), float(mat2x3((pow((GLF_dead9h0), 2.0)), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 1.0, 1.0, 1.0, 0.0)))) * 1.0))) / (GLF_dead9h0));
                                donor_replacementGLF_dead5c_re = GLF_dead9fx(donor_replacementGLF_dead5c_re);
                                {
                                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(5.6, 5857.8628));
                                    {
                                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live11res3 = _GLF_IDENTITY(((GLF_live11icoord.x >> 5) & 1), 0 | (((GLF_live11icoord.x >> 5) & 1))) ^ ((GLF_live11icoord.y & 32) >> 5);
                                        int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                        int GLF_live11res1 = (_GLF_IDENTITY(GLF_live11icoord.x * GLF_live11icoord.y, (GLF_live11icoord.x * GLF_live11icoord.y) - 0) >> 9) & 1;
                                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                    }
                                }
                                donor_replacementGLF_dead5c_re = donor_replacementGLF_dead5c_re - _GLF_IDENTITY(((2.0 * donor_replacementGLF_dead5c_re) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead5x * donor_replacementGLF_dead5c_re)))), (_GLF_IDENTITY(true, bool(bvec4(true, false, false, true))) ? ((2.0 * donor_replacementGLF_dead5c_re) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead5x * donor_replacementGLF_dead5c_re)))) : _GLF_FUZZED(donor_replacementGLF_dead5x)));
                                donor_replacementGLF_dead5y = donor_replacementGLF_dead5c_im;
                                donor_replacementGLF_dead5c_im = GLF_dead5x_new;
                            }
                        }
                        i++;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6.9, 3571.3221, -5293.1701, 74.78);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                _GLF_color = reflect(acosh(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color))), vec4(-1483.5816, -6.1, -_GLF_IDENTITY(5804.4257, (true ? 5804.4257 : _GLF_FUZZED(donor_replacementGLF_dead5x))), -2.5));
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
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead9x2 = _GLF_FUZZED(-8.1);
                    if (donor_replacementGLF_dead9x2 <= -0.9 && donor_replacementGLF_dead9x2 >= -1.1) {
                        GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)));
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(-_GLF_IDENTITY(83695, ~(~(83695))), -69417));
                    while (donor_replacementGLF_dead4pos.y != 256) {
                        if (donor_replacementGLF_dead4pos.x < _GLF_IDENTITY(GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + _GLF_IDENTITY(15, (_GLF_IDENTITY(15, 0 ^ (_GLF_IDENTITY(15, (false ? _GLF_FUZZED(-47328) : 15))))) | (_GLF_IDENTITY(15, (15) >> 0))), (GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + _GLF_IDENTITY(15, (_GLF_IDENTITY(15, 0 ^ (_GLF_IDENTITY(15, (false ? _GLF_FUZZED(-47328) : 15))))) | (_GLF_IDENTITY(15, (15) >> 0)))) | 0) && donor_replacementGLF_dead4pos.x > _GLF_IDENTITY(GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)], (GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]) | 0) - _GLF_IDENTITY(15, (15) | (15))) {
                            float GLF_dead4p = _GLF_IDENTITY((15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0, float(mat3x4((15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0, 0.0, 0.0, 0.0, 0.0, determinant(mat3(0.0, log(1.0), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, 1.0)), (true ? dot(vec3(0.0, 1.0, 0.0), vec3(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, 1.0)) : _GLF_FUZZED(-485.885)))), length(0.0), 1.0, 1.0, 1.0, 1.0)));
                            ;
                        }
                        donor_replacementGLF_dead4pos.y++;
                        {
                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(6753.1683, -4.0));
                            int GLF_live10i = _GLF_FUZZED(((-17716) * 84822));
                            {
                                if (GLF_live10coord.x > 1.0)
                                    GLF_live10coord.x -= 1.0;
                                if (GLF_live10coord.y > 1.0)
                                    GLF_live10coord.y -= 1.0;
                                GLF_live10coord *= 2.0;
                                GLF_live10i++;
                            }
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_outlined_0(_GLF_color);
                _GLF_color = normalize(vec4(3.4, 979.664, -591.302, 2546.1680));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-5.5, -44.00, -59.02, 9242.8777);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            break;
        }
        for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
            if (i > 0) {
                if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                    _GLF_color = vec4(-0.3, 70.59, 8837.3571, 8.2);
                }
                A[i] += A[_GLF_IDENTITY(i, max(i, i)) - 1];
                {
                    {
                        vec2 GLF_live10coord = _GLF_FUZZED((vec2(-5.6, -847.716) - vec2(-7.4, -982.241)));
                        int GLF_live10i = _GLF_FUZZED(((true ? (-3677) : 76103) ^ (40796 * (-33682))));
                        int GLF_live10looplimiter0 = 0;
                        {
                            if (GLF_live10looplimiter0 >= 6) {
                                ;
                            }
                            GLF_live10looplimiter0++;
                            {
                                if (GLF_live10coord.x > 1.0)
                                    GLF_live10coord.x -= 1.0;
                                if (GLF_live10coord.y > 1.0)
                                    GLF_live10coord.y -= 1.0;
                                GLF_live10coord *= 2.0;
                                GLF_live10i++;
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = step(exp2(29.11), fwidthCoarse(vec4(3.1, 748.977, -8.8, 3.4)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(-9.9, -46.75));
                    {
                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live11res1 = uint(_GLF_IDENTITY(((_GLF_IDENTITY(GLF_live11icoord, (true ? GLF_live11icoord : _GLF_FUZZED((uvec2(88288u, 21142u) >> uvec2(149194u, 8833u))))).x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu, clamp(((_GLF_IDENTITY(GLF_live11icoord, (true ? GLF_live11icoord : _GLF_FUZZED((uvec2(88288u, 21142u) >> uvec2(149194u, 8833u))))).x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu, ((_GLF_IDENTITY(GLF_live11icoord, (true ? GLF_live11icoord : _GLF_FUZZED((uvec2(88288u, 21142u) >> uvec2(149194u, 8833u))))).x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu, ((_GLF_IDENTITY(GLF_live11icoord, (true ? GLF_live11icoord : _GLF_FUZZED((uvec2(88288u, 21142u) >> uvec2(149194u, 8833u))))).x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu)));
                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(false)))) && true))) {
        float donor_replacementGLF_dead9A = _GLF_FUZZED(reflect(_GLF_IDENTITY(-7475.6653, min(-7475.6653, -7475.6653)), 97.48));
        float donor_replacementGLF_dead9B = _GLF_FUZZED(1980.3457);
        float donor_replacementGLF_dead9C = _GLF_FUZZED(-9.7);
        float donor_replacementGLF_dead9temp = _GLF_FUZZED(tan(2.5));
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(_GLF_IDENTITY(!(injectionSwitch.x > injectionSwitch.y), _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec3(!(injectionSwitch.x > injectionSwitch.y), false, false), bvec3(bvec3(bvec3(!(injectionSwitch.x > injectionSwitch.y), false, false))))), !(!(bool(_GLF_IDENTITY(bvec3(!(injectionSwitch.x > injectionSwitch.y), false, false), bvec3(bvec3(bvec3(!(injectionSwitch.x > injectionSwitch.y), false, false))))))))))))))) {
            _GLF_color = (donor_replacementGLF_dead9C + GLF_dead9_GLF_color);
        }
        float donor_replacementGLF_dead9x0 = _GLF_FUZZED((-5.1));
        {
            vec2 GLF_live11coord = _GLF_FUZZED(vec2(((-62.96) * (-_GLF_IDENTITY(166.865, min(166.865, 166.865)))), 1.4));
            {
                ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0, (1.0) / 1.0) / 0.6, 1.0)) * 256.0);
                int GLF_live11v = (GLF_live11icoord.x ^ GLF_live11icoord.y) * GLF_live11icoord.y;
                bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                bool GLF_live11res2 = ((GLF_live11v >> _GLF_IDENTITY(11, int(ivec4(_GLF_IDENTITY(11, (_GLF_IDENTITY(11, (11) | (11))) + 0), 1, 1, 0)))) & 4) != 0;
                bool GLF_live11res3 = ((GLF_live11v >> 12) & 8) != 0;
                GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? 1.0 : 0.0, GLF_live11res3 ? 1.0 : 0.0, 1);
            }
        }
        float donor_replacementGLF_dead9x1 = _GLF_FUZZED(step(14.95, _GLF_IDENTITY(-49.75, mix(float(_GLF_FUZZED(-594.858)), float(-49.75), bool(true)))));
        float donor_replacementGLF_dead9x2 = _GLF_FUZZED(uv.y);
        while (abs(donor_replacementGLF_dead9x2 - donor_replacementGLF_dead9x1) >= .000000000000001) {
            float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
            float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
            float GLF_dead9k0 = _GLF_IDENTITY(GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2), (GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2)) * round(length(normalize(1.0))));
            float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
            donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
            donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = ((mat2(7553.9628, -6136.2100, _GLF_IDENTITY(76.09, (76.09) - 0.0), 5001.1949) * mat3x2(416.244, 129.555, -59.56, -7.3, -6189.1575, 80.64))[0] * mat4x2(-2822.6737, 28.24, 4.1, 6165.4931, 0.8, 3.5, -9.6, -303.987));
            }
            donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow(_GLF_IDENTITY((GLF_dead9h0), max((GLF_dead9h0), (GLF_dead9h0))), 2.0)))) / (GLF_dead9h0));
            donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
            donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * _GLF_IDENTITY(sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (_GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, float(mat2(_GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, clamp(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, 4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, 4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C)), 1.0, 0.0, length(0.0)))))), (sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (_GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, float(mat2(_GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, clamp(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, 4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, 4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C)), 1.0, 0.0, length(0.0))))))) - 0.0)));
            donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
            donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
        }
        {
            vec2 GLF_live11coord = _GLF_FUZZED(vec2(5732.3766, -62.67));
            if (GLF_live11coord.x > 0.4) {
                if (GLF_live11coord.y < 0.6) {
                    uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live11res2 = uint(((_GLF_IDENTITY(GLF_live11icoord.x * GLF_live11icoord.y, (GLF_live11icoord.x * GLF_live11icoord.y) / 1u)) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                } else {
                    ivec2 GLF_live11icoord = ivec2(((_GLF_IDENTITY(GLF_live11coord, min(_GLF_IDENTITY(GLF_live11coord, vec2(1.0, 1.0) * (GLF_live11coord)), GLF_live11coord)) - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.4, clamp(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.4, clamp(_GLF_IDENTITY(1.0 / 0.4, float(mat3x2(1.0 / 0.4, 1.0, 0.0, 0.0, 1.0, 1.0))), 1.0 / 0.4, 1.0 / 0.4)), _GLF_IDENTITY(1.0 / 0.4, (1.0 / 0.4) - 0.0))))) * 256.0);
                    int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> _GLF_IDENTITY(5, clamp(5, _GLF_IDENTITY(5, (5) << 0), _GLF_IDENTITY(5, max(5, 5)))));
                    int GLF_live11res2 = (_GLF_IDENTITY(GLF_live11icoord, (GLF_live11icoord) - (ivec2(0, 0) << _GLF_IDENTITY(ivec2(5), ivec2(5)))).y * GLF_live11icoord.y >> 10) & 1;
                    int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                    GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(_GLF_IDENTITY(GLF_live11res1 | GLF_live11res3, (_GLF_IDENTITY(GLF_live11res1 | GLF_live11res3, int(ivec3(GLF_live11res1 | GLF_live11res3, (0 | 0), 1)))) | 0)), 1.0);
                }
            } else {
                ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_live11v = (GLF_live11icoord.x ^ GLF_live11icoord.y) * GLF_live11icoord.y;
                bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                bool GLF_live11res2 = ((GLF_live11v >> 11) & 4) != 0;
                bool GLF_live11res3 = ((GLF_live11v >> 12) & _GLF_IDENTITY(8, clamp(8, _GLF_IDENTITY(8, max(8, 8)), 8))) != _GLF_IDENTITY(0, 0 ^ (0));
                GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? 1.0 : 0.0, GLF_live11res3 ? 1.0 : 0.0, 1);
            }
        }
    }
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        {
            vec2 GLF_live3coord = _GLF_FUZZED(_GLF_IDENTITY((6383.7020 * vec2(-5.6, 266.773)), mix(vec2(_GLF_FUZZED(-2.9), _GLF_FUZZED(-58.22)), vec2(_GLF_IDENTITY(((6383.7020 * _GLF_IDENTITY(vec2(-5.6, 266.773), mix(vec2(_GLF_FUZZED(-132.583), (vec2(-5.6, 266.773))[1]), vec2((vec2(-5.6, 266.773))[0], _GLF_FUZZED(69.83)), bvec2(true, false))))), _GLF_IDENTITY((((6383.7020 * _GLF_IDENTITY(vec2(-5.6, 266.773), mix(vec2(_GLF_FUZZED(-132.583), (vec2(-5.6, 266.773))[1]), vec2((vec2(-5.6, 266.773))[0], _GLF_FUZZED(69.83)), bvec2(true, false)))))) * mat2(1.0), max((((6383.7020 * _GLF_IDENTITY(vec2(-5.6, 266.773), mix(vec2(_GLF_FUZZED(-132.583), (vec2(-5.6, 266.773))[1]), vec2((vec2(-5.6, 266.773))[0], _GLF_FUZZED(69.83)), bvec2(true, false)))))) * mat2(1.0), (((6383.7020 * _GLF_IDENTITY(vec2(-5.6, 266.773), mix(vec2(_GLF_FUZZED(-132.583), (vec2(-5.6, 266.773))[1]), vec2((vec2(-5.6, 266.773))[0], _GLF_FUZZED(69.83)), bvec2(true, false)))))) * mat2(1.0))))[0], ((6383.7020 * vec2(-5.6, 266.773)))[1]), bvec2(true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))));
            vec4 GLF_live3res = _GLF_FUZZED(vec4(-40.33, 4003.7160, 6601.1334, _GLF_IDENTITY(-1617.2602, float(mat3x4(-1617.2602, abs(1.0), tan(0.0), 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 1.0, 1.0, abs(1.0), abs(0.0), 1.0)))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(exp(0.0), 0.0, 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(exp(0.0), 0.0, 0.0))))))) {
                float donor_replacementGLF_dead9A = _GLF_FUZZED(4.3);
                float donor_replacementGLF_dead9B = _GLF_FUZZED(22.74);
                float donor_replacementGLF_dead9C = _GLF_FUZZED(-1.4);
                float donor_replacementGLF_dead9temp = _GLF_FUZZED(vec3(4.3, -6787.3659, -71.51).s);
                float donor_replacementGLF_dead9x0 = _GLF_FUZZED(8.4);
                float donor_replacementGLF_dead9x1 = _GLF_FUZZED(2.1);
                float donor_replacementGLF_dead9x2 = _GLF_FUZZED(sin(uintBitsToFloat(191529u)));
                {
                    float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                    float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                    float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                    float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                    donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                    donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                    donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                    donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                    {
                        vec2 GLF_live11coord = _GLF_FUZZED(vec2(-1.2, 42.64));
                        {
                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_live11v = (GLF_live11icoord.x ^ GLF_live11icoord.y) * GLF_live11icoord.y;
                            bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                            bool GLF_live11res2 = (_GLF_IDENTITY((GLF_live11v >> 11) & 4, max((GLF_live11v >> 11) & 4, (GLF_live11v >> 11) & 4))) != 0;
                            bool GLF_live11res3 = ((_GLF_IDENTITY(GLF_live11v, 0 ^ (GLF_live11v)) >> 12) & 8) != 0;
                            GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(float(172140u))), bool(false))) : 0.0, GLF_live11res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / _GLF_IDENTITY((donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY((donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))), ((donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C)))) - 0.0) : _GLF_FUZZED(donor_replacementGLF_dead9x1))));
                    donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                    donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                }
            }
            if (GLF_live3coord.x < _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(-2882.6871)), float(1.0), bool(true))) && GLF_live3coord.y < 1.0) {
                GLF_live3res = texture(GLF_live3tex, GLF_live3coord);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mix(vec4(162.204, _GLF_IDENTITY(-_GLF_IDENTITY(91.65, clamp(91.65, 91.65, 91.65)), (_GLF_IDENTITY(-_GLF_IDENTITY(91.65, clamp(91.65, 91.65, 91.65)), float(mat4x2(-_GLF_IDENTITY(91.65, clamp(91.65, 91.65, 91.65)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0)))) / 1.0), 12.40, -30.28), dFdxCoarse(vec4(984.743, -775.458, -0.1, -76.36)), vec4(_GLF_IDENTITY(-566.102, (-566.102) / 1.0), -954.030, 21.90, -278.178));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (_GLF_IDENTITY((5.0 - (8874.3882 / _GLF_outVarBackup_GLF_color)), ((5.0 - (8874.3882 / _GLF_outVarBackup_GLF_color))) - vec4(0.0, 0.0, 0.0, 0.0)) + (-781.248));
                    }
                    {
                        vec2 GLF_live10coord = _GLF_FUZZED(vec2(9400.5136, 7249.1162).gr);
                        if (GLF_live10coord.x > 1.0)
                            GLF_live10coord.x -= 1.0;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        col = .5 + _GLF_IDENTITY(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)), min(_GLF_IDENTITY(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)), _GLF_IDENTITY(mat3(1.0) * (cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0))), (mat3(1.0) * (cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)))) + vec3(0.0, 0.0, 0.0))), _GLF_IDENTITY(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)), max(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)), _GLF_IDENTITY(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)), min(cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0)), cos(c.y + vec3(_GLF_IDENTITY(resolution.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(resolution.x, max(resolution.x, resolution.x)) : _GLF_FUZZED(roundEven(8646.9860)))), A[4] / resolution.x + 50.0, 22.0))))))));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mat3x4(-_GLF_IDENTITY(8820.9282, (false ? _GLF_FUZZED(-203.411) : 8820.9282)), 6.8, -271.407, -5144.4536, -3.7, 6.1, 5329.9935, -637.220, -972.218, 8.1, 2666.7467, -3200.0800)[0];
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = (inversesqrt(2.6) + GLF_live1_GLF_color);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_IDENTITY(exp2(_GLF_color), max(exp2(_GLF_color), exp2(_GLF_color)));
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(3.6, -64.36).gr);
                    if (GLF_live11coord.x > 0.4) {
                        if (GLF_live11coord.y < 0.6) {
                            uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * _GLF_IDENTITY(256.0, clamp(256.0, _GLF_IDENTITY(256.0, _GLF_IDENTITY(float(mat4x3(256.0, tan(0.0), 0.0, 0.0, 1.0, 0.0, 1.0, sin(0.0), tan(0.0), 0.0, 1.0, 1.0)), clamp(float(mat4x3(256.0, tan(0.0), 0.0, 0.0, 1.0, 0.0, 1.0, sin(0.0), tan(0.0), 0.0, 1.0, 1.0)), float(mat4x3(256.0, tan(0.0), 0.0, 0.0, 1.0, 0.0, 1.0, sin(0.0), tan(0.0), 0.0, 1.0, 1.0)), float(mat4x3(256.0, tan(0.0), 0.0, 0.0, 1.0, 0.0, 1.0, sin(0.0), tan(0.0), 0.0, 1.0, 1.0))))), _GLF_IDENTITY(256.0, _GLF_IDENTITY(float(float(256.0)), (float(float(256.0))) / 1.0)))));
                            uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live11res2 = _GLF_IDENTITY(uint(((_GLF_IDENTITY(GLF_live11icoord.x, (GLF_live11icoord.x) | (GLF_live11icoord.x)) * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu), uint(uint(_GLF_IDENTITY(uint(((_GLF_IDENTITY(GLF_live11icoord.x, (GLF_live11icoord.x) | (GLF_live11icoord.x)) * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu), uint(uint(uint(((_GLF_IDENTITY(GLF_live11icoord.x, (GLF_live11icoord.x) | (GLF_live11icoord.x)) * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu)))))));
                            float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                        } else {
                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(_GLF_IDENTITY(1.0 / 0.4, (_GLF_IDENTITY(1.0 / 0.4, float(_GLF_IDENTITY(mat3(1.0 / 0.4, 1.0, tan(0.0), 1.0, 0.0, 0.0, 1.0, 0.0, 0.0), transpose(transpose(mat3(1.0 / 0.4, 1.0, tan(0.0), 1.0, 0.0, 0.0, 1.0, 0.0, 0.0))))))) + 0.0), _GLF_IDENTITY(1.0 / 0.4, (_GLF_IDENTITY(1.0 / 0.4, mix(float(_GLF_FUZZED(40.69)), float(1.0 / 0.4), bool(true)))) / 1.0))) * 256.0);
                            int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                            int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                            int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                            GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                        }
                    } else {
                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        int GLF_live11v = (GLF_live11icoord.x ^ GLF_live11icoord.y) * GLF_live11icoord.y;
                        bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                        bool GLF_live11res2 = ((GLF_live11v >> 11) & 4) != 0;
                        bool GLF_live11res3 = ((GLF_live11v >> 12) & 8) != 0;
                        GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? 1.0 : 0.0, GLF_live11res3 ? 1.0 : 0.0, 1);
                    }
                }
            }
        }
        {
            vec2 GLF_live10coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(-2672.7045, -330.193)), min(_GLF_FUZZED(vec2(-2672.7045, -330.193)), _GLF_FUZZED(vec2(-2672.7045, -330.193))));
            int GLF_live10i = _GLF_FUZZED(-36803);
            int GLF_live10looplimiter0 = 0;
            {
                if (GLF_live10looplimiter0 >= 6) {
                    ;
                }
                GLF_live10looplimiter0++;
                {
                    if (GLF_live10coord.x > 1.0)
                        GLF_live10coord.x -= 1.0;
                    if (_GLF_IDENTITY(GLF_live10coord.y > 1.0, !(!(_GLF_IDENTITY(GLF_live10coord.y > 1.0, (_GLF_IDENTITY(GLF_live10coord.y > 1.0, (GLF_live10coord.y > 1.0) || false)) && true)))))
                        GLF_live10coord.y -= 1.0;
                    GLF_live10coord *= _GLF_IDENTITY(2.0, _GLF_IDENTITY(float(mat2x3(2.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, round(length(normalize(1.0))))), dot(vec2(0.0, 1.0), vec2(0.0, round(length(normalize(1.0)))))), cos(0.0), determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, abs(0.0), 0.0, 0.0, 0.0, 0.0, 0.0)))), max(float(mat2x3(2.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, round(length(normalize(1.0))))), dot(vec2(0.0, 1.0), vec2(0.0, round(length(normalize(1.0)))))), cos(0.0), determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, abs(0.0), 0.0, 0.0, 0.0, 0.0, 0.0)))), float(mat2x3(2.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, round(length(normalize(1.0))))), dot(vec2(0.0, 1.0), vec2(0.0, round(length(normalize(1.0)))))), cos(0.0), determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, abs(0.0), 0.0, 0.0, 0.0, 0.0, 0.0)))))));
                    GLF_live10i++;
                }
            }
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = (-pow(GLF_live1_GLF_color, GLF_dead9_GLF_color));
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (mat4(_GLF_IDENTITY(-530.666, min(-530.666, _GLF_IDENTITY(-530.666, clamp(-530.666, -530.666, -530.666)))), 6512.2948, 95.53, 6.4, 9.7, 376.604, 6642.6434, -1.2, 53.41, -24.46, -3.0, 3689.7721, 2519.8679, -2025.5176, 8156.3293, -8825.1591)[_GLF_IDENTITY(1, clamp(1, 1, _GLF_IDENTITY(_GLF_IDENTITY(1, min(1, 1)), int(ivec2(_GLF_IDENTITY(1, min(1, 1)), 0)))))] * mat4(mat4x3(-8824.7644, _GLF_IDENTITY(47.64, clamp(_GLF_IDENTITY(47.64, mix(float(_GLF_FUZZED(float(true))), float(47.64), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), _GLF_IDENTITY(47.64, (47.64) - 0.0), _GLF_IDENTITY(47.64, clamp(47.64, 47.64, 47.64)))), -6.5, -5671.0936, -34.32, -650.218, 955.750, 5002.0707, -93.05, -959.846, -9641.5796, 8222.9743)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                _GLF_color = _GLF_outlined_1(_GLF_outVarBackup_GLF_color);
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = dFdyCoarse(GLF_dead9_GLF_color);
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                float donor_replacementGLF_dead7th = _GLF_FUZZED(125.986);
                {
                    donor_replacementGLF_dead7th = 1.0 - donor_replacementGLF_dead7th;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec2 GLF_live10coord = _GLF_FUZZED(vec2((-688.691)));
                vec4 GLF_live10res = _GLF_FUZZED(vec4(9.7, 472.024, _GLF_IDENTITY(86.65, mix(float(_GLF_IDENTITY(86.65, (_GLF_IDENTITY(86.65, (86.65) / 1.0)) / round(length(normalize(vec3(1.0, 1.0, 1.0)))))), float(_GLF_FUZZED(-9.3)), bool(false))), 9608.7975));
                if (GLF_live10coord.x < 1.0 && GLF_live10coord.y < 1.0) {
                    GLF_live10res = texture(GLF_live10tex, GLF_live10coord);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead7th = _GLF_FUZZED(-5.8);
                {
                    donor_replacementGLF_dead7th = 1.0 - donor_replacementGLF_dead7th;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-34.41);
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live1_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead9x2 = _GLF_FUZZED(2.0);
                if (donor_replacementGLF_dead9x2 <= -0.9 && donor_replacementGLF_dead9x2 >= -1.1) {
                    _GLF_IDENTITY(GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0), (GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0)) + sin(vec4(0.0, 0.0, 0.0, 0.0)));
                } else {
                    GLF_dead9_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) * vec4(1.0, 1.0, 1.0, 1.0)) : _GLF_FUZZED(GLF_live11_GLF_color)));
            }
        }
        if (int(gl_FragCoord.y) < 40) {
            {
                vec2 GLF_live10coord = _GLF_FUZZED(vec2(7605.0004, -14.99).rr);
                if (GLF_live10coord.y > 1.0)
                    GLF_live10coord.y -= 1.0;
            }
            col = .5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(_GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x, max(_GLF_IDENTITY(_GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x, clamp(_GLF_IDENTITY(_GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x, mix(float(_GLF_FUZZED(-2.5)), float(_GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x), bool(true))), _GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x, _GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x)), _GLF_IDENTITY(A[9], mix(float(A[9]), float(_GLF_FUZZED(5917.8394)), bool(false))) / resolution.x)) + 50.0, 22.0));
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, (false ? _GLF_FUZZED(176.515) : injectionSwitch.y))))), false || ((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, clamp(injectionSwitch.y, injectionSwitch.y, _GLF_IDENTITY(injectionSwitch.y, (false ? _GLF_FUZZED(176.515) : injectionSwitch.y)))))))))) {
                        _GLF_color = ((-9093.2857) + _GLF_color);
                    }
                    float donor_replacementGLF_dead7th = _GLF_FUZZED(51.36);
                    {
                        donor_replacementGLF_dead7th = 0.5 - donor_replacementGLF_dead7th;
                        if (_GLF_DEAD(false)) {
                            {
                                vec2 GLF_live11coord = _GLF_FUZZED(_GLF_IDENTITY(vec2(-87.46, 628.106), mix(vec2((vec2(-87.46, 628.106))[0], (vec2(-87.46, 628.106))[1]), vec2(_GLF_FUZZED((-(false ? 8414.4016 : 15.70))), _GLF_FUZZED(-6236.6904)), bvec2(false, false))));
                                {
                                    if (GLF_live11coord.y < 0.6) {
                                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live11res1 = uint((_GLF_IDENTITY((GLF_live11icoord.x * GLF_live11icoord.y), ~(_GLF_IDENTITY(~((GLF_live11icoord.x * GLF_live11icoord.y)), 0u | (~((GLF_live11icoord.x * GLF_live11icoord.y)))))) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & _GLF_IDENTITY(1u, (1u) - 0u)) != 0u ? 1u : 0u));
                                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                    } else {
                                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.4, (1.0 / 0.4) - 0.0))) * 256.0);
                                        int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                                        int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                        int GLF_live11res1 = (GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord, ~(~(GLF_live11icoord))).y >> 9) & 1;
                                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(_GLF_IDENTITY(GLF_live11res1, ~(_GLF_IDENTITY(~(GLF_live11res1), max(_GLF_IDENTITY(~(GLF_live11res1), (~(GLF_live11res1)) | 0), ~(GLF_live11res1))))) | GLF_live11res3), 1.0);
                                    }
                                }
                            }
                            _GLF_color = floor(_GLF_IDENTITY(vec4(1.7, 7876.4444, -7262.4146, -9043.8927), (vec4(1.7, 7876.4444, -7262.4146, -9043.8927)) - vec4(0.0, 0.0, 0.0, 0.0)));
                            {
                                vec2 GLF_live11coord = _GLF_FUZZED(vec3(6.9, -88.67, -8.2).rg);
                                {
                                    uvec2 GLF_live11icoord = _GLF_IDENTITY(uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0), (uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0)) - uvec2(0u, 0u));
                                    uint GLF_live11res1 = uint((_GLF_IDENTITY((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, uint(_GLF_IDENTITY(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), min(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), uvec4(GLF_live11icoord.y, 0u, 1u, 0u)))))), (_GLF_IDENTITY((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, uint(_GLF_IDENTITY(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), min(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), uvec4(GLF_live11icoord.y, 0u, 1u, 0u)))))), max((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, uint(_GLF_IDENTITY(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), min(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), uvec4(GLF_live11icoord.y, 0u, 1u, 0u)))))), (GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, uint(_GLF_IDENTITY(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), min(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), uvec4(GLF_live11icoord.y, 0u, 1u, 0u))))))))) | (_GLF_IDENTITY((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, uint(_GLF_IDENTITY(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), min(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), uvec4(GLF_live11icoord.y, 0u, 1u, 0u)))))), 0u | ((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, uint(_GLF_IDENTITY(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), min(uvec4(GLF_live11icoord.y, 0u, 1u, 0u), uvec4(GLF_live11icoord.y, 0u, 1u, 0u)))))))))) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (_GLF_IDENTITY(GLF_live11icoord.x, 0u ^ (GLF_live11icoord.x)) & 31u)) & 0xffffffffu);
                                    float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                }
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = roundEven(step(-73.54, vec4(-7.3, -7030.1041, -48.32, -49.02)));
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED((ivec2(-6693, -24418) << ivec2(-8547, -20822)));
                    while (donor_replacementGLF_dead4pos.y != 256) {
                        if (donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15 && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15) {
                            float GLF_dead4p = (15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0;
                            ;
                        }
                        donor_replacementGLF_dead4pos.y++;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            int GLF_live12high = _GLF_FUZZED(-48644);
                            int GLF_live12i = _GLF_FUZZED(-51612);
                            int GLF_live12looplimiter3 = 0;
                            int GLF_live12m = _GLF_FUZZED(52811);
                            {
                                if (GLF_live12looplimiter3 >= 5) {
                                    ;
                                }
                                GLF_live12looplimiter3++;
                                {
                                    int GLF_live12from = GLF_live12i;
                                    int GLF_live12mid = GLF_live12i + GLF_live12m - 1;
                                    int GLF_live12to = min(GLF_live12i + 2 * GLF_live12m - 1, GLF_live12high);
                                    GLF_live12merge(GLF_live12from, GLF_live12mid, GLF_live12to);
                                }
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead5xCoord = _GLF_IDENTITY(_GLF_FUZZED(round(-8007.9818)), float(mat3x4(_GLF_IDENTITY(_GLF_FUZZED(round(-8007.9818)), min(_GLF_FUZZED(round(-8007.9818)), _GLF_FUZZED(round(-8007.9818)))), abs(_GLF_ONE(1.0, injectionSwitch.y)), determinant(mat3(1.0, 0.0, 0.0, 0.0, abs(1.0), 1.0, 0.0, 0.0, 1.0)), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0)));
                float donor_replacementGLF_dead5yCoord = _GLF_FUZZED((4958.0306));
                {
                    ;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead7a = _GLF_FUZZED(step(clamp(vec2(_GLF_IDENTITY(-5317.7152, mix(float(-5317.7152), float(_GLF_FUZZED(0.6)), bool(false))), -5.2), GLF_dead5resolution, c), uv));
                        float donor_replacementGLF_dead7z = _GLF_FUZZED(log(donor_replacementGLF_dead5xCoord));
                        {
                            donor_replacementGLF_dead7z = donor_replacementGLF_dead7a.x / donor_replacementGLF_dead7a.y;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, mix(vec4((gl_FragCoord)[0], (gl_FragCoord)[1], (gl_FragCoord)[2], (gl_FragCoord)[3]), vec4(_GLF_FUZZED(vec2(803.306, -9.8).t), _GLF_FUZZED(-354.047), _GLF_FUZZED(53.38), _GLF_FUZZED(51.70)), bvec4(false, false, false, false))).y < 0.0)))) {
                            _GLF_color = step(_GLF_color, fract(vec4(-528.672, 4.9, 91.36, 6.2)));
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4.5, -63.85, -2292.7095, -19.86);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            vec2 GLF_live11coord = _GLF_FUZZED((mat4x2(-68.34, -5.2, -5.5, 761.649, -14.22, 9.8, -366.690, 268.597) * (vec4(9812.6087, 471.537, -486.929, 173.988) + 3731.8488)));
                            {
                                ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                                int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & _GLF_IDENTITY(1, (1) | (1));
                                int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & _GLF_IDENTITY(GLF_live11res3, ~(_GLF_IDENTITY(~(GLF_live11res3), clamp(~(GLF_live11res3), ~(GLF_live11res3), ~(GLF_live11res3)))))), float(GLF_live11res1 | GLF_live11res3), 1.0);
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(refract(-4.2, 94.64, ceil(-89.80)));
                {
                    {
                        ;
                    }
                }
            }
            if (int(gl_FragCoord.y) < 60) {
                _GLF_IDENTITY(col = .5 + cos(_GLF_IDENTITY(c, clamp(c, c, c)).y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)), vec3(1.0, 1.0, 1.0) * _GLF_IDENTITY((col = .5 + _GLF_IDENTITY(cos(_GLF_IDENTITY(c, clamp(_GLF_IDENTITY(c, vec2(1.0, 1.0) * (c)), c, c)).y + vec3(resolution.x, A[14] / resolution.x + _GLF_IDENTITY(50.0, (50.0) - 0.0), 22.0)), vec3(mat2(cos(_GLF_IDENTITY(c, clamp(_GLF_IDENTITY(c, vec2(1.0, 1.0) * (c)), c, c)).y + vec3(resolution.x, A[14] / resolution.x + _GLF_IDENTITY(50.0, (50.0) - 0.0), 22.0)), 0.0)))), ((col = .5 + _GLF_IDENTITY(cos(_GLF_IDENTITY(c, clamp(_GLF_IDENTITY(c, vec2(1.0, 1.0) * (c)), c, c)).y + vec3(resolution.x, A[14] / resolution.x + _GLF_IDENTITY(50.0, (50.0) - 0.0), 22.0)), vec3(mat2(cos(_GLF_IDENTITY(c, clamp(_GLF_IDENTITY(c, vec2(1.0, 1.0) * (c)), c, c)).y + vec3(resolution.x, A[14] / resolution.x + _GLF_IDENTITY(50.0, (50.0) - 0.0), 22.0)), 0.0))))) / vec3(1.0, 1.0, 1.0)));
            } else {
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(8109.6999, 29.03));
                    {
                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live11res2 = uint((_GLF_IDENTITY((GLF_live11icoord.x * GLF_live11icoord.y) << (_GLF_IDENTITY(GLF_live11icoord.x, (GLF_live11icoord.x) >> 0u) & 31u), 0u | ((GLF_live11icoord.x * GLF_live11icoord.y) << (_GLF_IDENTITY(GLF_live11icoord.x, (GLF_live11icoord.x) >> 0u) & 31u)))) & 0xffffffffu);
                        float GLF_live11res = float(((GLF_live11res2 & _GLF_IDENTITY(0x80000000u, (0x80000000u) - 0u)) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                    }
                }
                for (int _injected_loop_counter = (1 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY((0 & (-45186)), ((_GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, (0) - 0))) & (-45186))) - 0)); _injected_loop_counter--) {
                    if (int(gl_FragCoord.y) < 80) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead9_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                }
                            }
                            _GLF_color = vec4(-842.016, 4.9, 4.2, -470.274);
                        }
                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                    } else if (int(_GLF_IDENTITY(gl_FragCoord.y, (_GLF_IDENTITY(true, true && (_GLF_IDENTITY(true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (true)))) ? gl_FragCoord.y : _GLF_FUZZED(distance(GLF_live1_GLF_color, GLF_live1_GLF_color))))) < 100) {
                        col = .5 + cos(c.y + vec3(resolution.x, A[_GLF_IDENTITY(39, max(39, 39))] / resolution.x + 50.0, _GLF_IDENTITY(22.0, min(22.0, 22.0))));
                    } else {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead7th = _GLF_FUZZED(ldexp(599.854, -78366));
                            {
                                donor_replacementGLF_dead7th = 1.0 - donor_replacementGLF_dead7th;
                                {
                                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(254.478, (7.2)));
                                    if (_GLF_IDENTITY(GLF_live11coord.y < 0.6, (_GLF_IDENTITY(GLF_live11coord.y < 0.6, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (GLF_live11coord.y < 0.6))) && true)) {
                                        uvec2 GLF_live11icoord = uvec2((_GLF_IDENTITY((_GLF_IDENTITY(GLF_live11coord, clamp(GLF_live11coord, GLF_live11coord, _GLF_IDENTITY(GLF_live11coord, mat2(1.0) * (GLF_live11coord)))) - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), vec2(mat4x2((_GLF_IDENTITY(GLF_live11coord, clamp(GLF_live11coord, GLF_live11coord, _GLF_IDENTITY(GLF_live11coord, mat2(1.0) * (GLF_live11coord)))) - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), 1.0, sqrt(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0))), 0.0, 1.0)))) * 256.0);
                                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x, (_GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x) | (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x, clamp(_GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x, _GLF_IDENTITY(_GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x, (_GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x) ^ 0u), _GLF_IDENTITY(GLF_live11icoord, uvec2(0u, 0u) | (GLF_live11icoord)).x)))) & 31u)) & 0xffffffffu);
                                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                    } else {
                                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(_GLF_IDENTITY(1.0, (1.0) - 0.0) / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & _GLF_IDENTITY(1, clamp(_GLF_IDENTITY(1, 0 ^ (1)), 1, 1))) ^ ((GLF_live11icoord.y & 32) >> 5);
                                        int GLF_live11res2 = (GLF_live11icoord.y * _GLF_IDENTITY(GLF_live11icoord, max(GLF_live11icoord, GLF_live11icoord)).y >> 10) & 1;
                                        int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(57920, 7995));
                            {
                                if (_GLF_IDENTITY(donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15 && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15, !(!(donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15 && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15)))) {
                                    {
                                        vec2 GLF_live11coord = _GLF_FUZZED(vec2(67.04, -2.6));
                                        {
                                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_live11v = (GLF_live11icoord.x ^ GLF_live11icoord.y) * GLF_live11icoord.y;
                                            bool GLF_live11res1 = ((GLF_live11v >> 10) & 1) != 0;
                                            bool GLF_live11res2 = ((GLF_live11v >> 11) & 4) != 0;
                                            bool GLF_live11res3 = ((GLF_live11v >> 12) & 8) != 0;
                                            GLF_live11_GLF_color = vec4(GLF_live11res1 ? 1.0 : 0.0, GLF_live11res2 ? 1.0 : 0.0, GLF_live11res3 ? 1.0 : 0.0, _GLF_IDENTITY(1, max(_GLF_IDENTITY(1, (_GLF_IDENTITY(1, (1) - 0)) << 0), 1)));
                                        }
                                    }
                                    float GLF_dead4p = _GLF_IDENTITY((_GLF_IDENTITY(15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)])), mix(float(_GLF_FUZZED(vec4(2.2, -37.37, -3340.1094, 8901.3299).q)), float(15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))), bool(true)))), min((_GLF_IDENTITY(15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)])), mix(float(_GLF_FUZZED(vec4(2.2, -37.37, -3340.1094, 8901.3299).q)), float(15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))), bool(true)))), (_GLF_IDENTITY(15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)])), mix(float(_GLF_FUZZED(vec4(2.2, -37.37, -3340.1094, 8901.3299).q)), float(15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))), bool(true)))))) / 15.0;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        _GLF_color = (_GLF_IDENTITY(vec4(9.5, 5.0, 0.6, -44.73), mix(vec4((vec4(9.5, 5.0, 0.6, -44.73))[0], (vec4(9.5, 5.0, 0.6, -44.73))[1], _GLF_IDENTITY((vec4(9.5, 5.0, 0.6, -44.73))[2], mix(float((vec4(9.5, 5.0, 0.6, -44.73))[2]), float(_GLF_FUZZED(-4.7)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), _GLF_FUZZED(5.6)), vec4(_GLF_FUZZED(889.013), _GLF_FUZZED(-5.2), _GLF_FUZZED(95.13), (vec4(9.5, 5.0, 0.6, -44.73))[3]), bvec4(false, false, false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) * GLF_dead9_GLF_color);
                                    }
                                    ;
                                }
                                {
                                    vec2 GLF_live10coord = _GLF_FUZZED(((ivec3(-98302, -49898, -919) != ivec3(95622, 38407, -44834)) ? (vec2(-6584.4909, 8.0) + vec2(4626.3552, 3056.3205)) : vec2(816.993, 9.7)));
                                    int GLF_live10i = _GLF_FUZZED(3362);
                                    int GLF_live10looplimiter0 = 0;
                                    {
                                        if (GLF_live10looplimiter0 >= 6) {
                                            ;
                                        }
                                        GLF_live10looplimiter0++;
                                        {
                                            if (GLF_live10coord.x > 1.0)
                                                GLF_live10coord.x -= 1.0;
                                            if (_GLF_IDENTITY(GLF_live10coord.y > 1.0, true && (GLF_live10coord.y > 1.0)))
                                                GLF_live10coord.y -= 1.0;
                                            GLF_live10coord *= 2.0;
                                            GLF_live10i++;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead4pos.y++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead7v = _GLF_FUZZED(dFdyFine((resolution)));
                            if (length(donor_replacementGLF_dead7v) < 0.001) {
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead9_GLF_color;
                                }
                            }
                        }
                        if (int(gl_FragCoord.y) < 120) {
                            col = _GLF_IDENTITY(.5, float(mat4x2(_GLF_IDENTITY(.5, clamp(.5, _GLF_IDENTITY(.5, (true ? _GLF_IDENTITY(.5, max(.5, _GLF_IDENTITY(.5, max(.5, .5)))) : _GLF_FUZZED(asin(-33.46)))), _GLF_IDENTITY(.5, min(.5, .5)))), 1.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0, 0.0, 0.0, 0.0, sqrt(1.0)))) + _GLF_IDENTITY(cos(c.y + vec3(_GLF_IDENTITY(resolution, clamp(resolution, resolution, _GLF_IDENTITY(resolution, mat2(1.0) * (resolution)))).x, A[39] / _GLF_IDENTITY(resolution, (true ? resolution : _GLF_FUZZED(injectionSwitch))).x + 50.0, 22.0)), min(cos(c.y + vec3(_GLF_IDENTITY(resolution, clamp(resolution, resolution, _GLF_IDENTITY(resolution, mat2(1.0) * (resolution)))).x, A[39] / _GLF_IDENTITY(resolution, (true ? resolution : _GLF_FUZZED(injectionSwitch))).x + 50.0, 22.0)), cos(c.y + vec3(_GLF_IDENTITY(resolution, clamp(resolution, resolution, _GLF_IDENTITY(resolution, mat2(1.0) * (resolution)))).x, A[39] / _GLF_IDENTITY(resolution, (true ? resolution : _GLF_FUZZED(injectionSwitch))).x + 50.0, 22.0))));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (277.592 + _GLF_outVarBackup_GLF_color);
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = _GLF_IDENTITY(vec4(9838.3130, -858.989, log(49.89), 4.5), _GLF_IDENTITY(mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)), clamp(mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)), mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)), _GLF_IDENTITY(mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)), clamp(mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)), mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)), mat4(1.0) * (vec4(9838.3130, -858.989, log(49.89), 4.5)))))));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = asin(vec4(-604.420, 4.6, -1385.8962, -6.7));
                            }
                            if (int(gl_FragCoord.y) < 140) {
                                {
                                    int GLF_live2looplimiter0 = 0;
                                    if (GLF_live2looplimiter0 >= 6) {
                                        ;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead9_GLF_color;
                                        }
                                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) * vec4(_GLF_IDENTITY(1.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))) * (1.0)), 1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(-32.05) : 1.0)), 1.0));
                                        _GLF_color = vec4(-9.7, -6.4, -8469.5677, -4089.4449);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= sqrt(0.0)), ((gl_FragCoord.x >= sqrt(0.0))) || false)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                float donor_replacementGLF_dead7th = _GLF_FUZZED(fwidthCoarse(-8.9));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_live1_GLF_color;
                                                }
                                                {
                                                    donor_replacementGLF_dead7th = 1.0 - donor_replacementGLF_dead7th;
                                                }
                                            }
                                        }
                                    }
                                }
                                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            } else if (int(gl_FragCoord.y) < 160) {
                                col = _GLF_IDENTITY(.5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0)), mix(vec3((.5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0)))[0], _GLF_FUZZED((13.77 + 4798.4066)), (.5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0)))[2]), vec3(_GLF_FUZZED(-7.6), (.5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0)))[1], _GLF_FUZZED(((-3.4) + float(GLF_live12N)))), bvec3(false, true, false)));
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead5xCoord = _GLF_FUZZED(5.0);
                                        float donor_replacementGLF_dead5yCoord = _GLF_FUZZED(-1820.9918);
                                        if (_GLF_IDENTITY(_injected_loop_counter, ((0 ^ 0) | 0) + (_GLF_IDENTITY(_injected_loop_counter, (true ? _GLF_IDENTITY(_injected_loop_counter, (_injected_loop_counter) - 0) : _GLF_FUZZED(GLF_live12N))))) < bitfieldInsert(_injected_loop_counter, 0, _GLF_IDENTITY(0, (0) | 0), 0)) {
                                            ;
                                        } else {
                                            ;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                donor_replacementGLF_dead5yCoord = 0.5 - donor_replacementGLF_dead5yCoord;
                                            }
                                        }
                                    }
                                    _GLF_IDENTITY(_GLF_color = ((-8.2) / _GLF_IDENTITY(_GLF_color, vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_color))), (_GLF_color = ((-8.2) / _GLF_IDENTITY(_GLF_color, vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_color)))) - vec4(0.0, 0.0, 0.0, 0.0));
                                }
                                if (int(gl_FragCoord.y) < 180) {
                                    for (int _injected_loop_counter = _GLF_IDENTITY(0, clamp(0, 0, 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(6.5, -0.1, 50.03, -1394.6558);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(0.2, 847.846, -948.066, -532.762);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            float donor_replacementGLF_dead7z = _GLF_FUZZED(asinh(0.9));
                                            {
                                                donor_replacementGLF_dead7z = c.x / c.y;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = faceforward(mod(vec4(996.664, -8448.7820, -61.71, 9.9), _GLF_outVarBackup_GLF_color), GLF_dead9_GLF_color, dFdx(vec4(5313.8229, -3.0, -1401.0473, -1338.4974)));
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead7z = _GLF_FUZZED(-9.0);
                                        if (c.y > c.x) {
                                            donor_replacementGLF_dead7z = c.x / c.y;
                                        } else {
                                            donor_replacementGLF_dead7z = c.y / c.x;
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true))))) {
                                                _GLF_color = mix(radians(vec4(8.1, -3.2, -65.28, -4.9)), _GLF_color, _GLF_color);
                                            }
                                        }
                                    }
                                    if (int(gl_FragCoord.y) < 200) {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            float donor_replacementGLF_dead9A = _GLF_FUZZED(_GLF_IDENTITY(6.1, float(vec3(6.1, 1.0, 0.0))));
                                            float donor_replacementGLF_dead9B = _GLF_FUZZED(dot(vec3(-_GLF_IDENTITY(0.7, 0.0 + (0.7)), -76.93, -26.33), col));
                                            {
                                                vec2 GLF_live11coord = _GLF_FUZZED(vec2(-5.5, -5.8));
                                                {
                                                    if (GLF_live11coord.y < 0.6) {
                                                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (_GLF_IDENTITY(GLF_live11icoord, (GLF_live11icoord) | (_GLF_IDENTITY(GLF_live11icoord, (true ? GLF_live11icoord : _GLF_FUZZED(uvec2(198442u, 30785u)))))).x & _GLF_IDENTITY(31u, clamp(31u, 31u, 31u)))) & 0xffffffffu);
                                                        float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                                                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                                    } else {
                                                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                        int GLF_live11res3 = _GLF_IDENTITY(((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5), (((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5)) ^ (0 << _GLF_IDENTITY(int(2), int(2))));
                                                        int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                                        int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                                    }
                                                }
                                            }
                                            float donor_replacementGLF_dead9C = _GLF_FUZZED(1182.2091);
                                            float donor_replacementGLF_dead9temp = _GLF_FUZZED(-96.73);
                                            {
                                                int GLF_live12high = _GLF_FUZZED(-68535);
                                                int GLF_live12i = _GLF_FUZZED(int(((vec2(840.808, 5301.2601)) != vec2(-4068.2386, 5160.7671))));
                                                int GLF_live12m = _GLF_FUZZED(43815);
                                                {
                                                    int GLF_live12from = GLF_live12i;
                                                    int GLF_live12mid = GLF_live12i + GLF_live12m - 1;
                                                    int GLF_live12to = min(GLF_live12i + 2 * GLF_live12m - 1, GLF_live12high);
                                                    GLF_live12merge(GLF_live12from, GLF_live12mid, GLF_live12to);
                                                }
                                            }
                                            float donor_replacementGLF_dead9x0 = _GLF_FUZZED(step(-343.235, intBitsToFloat(_injected_loop_counter)));
                                            float donor_replacementGLF_dead9x1 = _GLF_FUZZED(643.049);
                                            float donor_replacementGLF_dead9x2 = _GLF_FUZZED(distance(GLF_dead5resolution, GLF_dead5resolution));
                                            while (abs(donor_replacementGLF_dead9x2 - donor_replacementGLF_dead9x1) >= .000000000000001) {
                                                float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                                                float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                                                float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                                                donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((_GLF_IDENTITY(GLF_dead9h1, (_GLF_IDENTITY(GLF_dead9h1, clamp(GLF_dead9h1, GLF_dead9h1, GLF_dead9h1))) / round(length(normalize(vec3(1.0, 1.0, 1.0)))))), 2.0) * (GLF_dead9h0)));
                                                donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                                                if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                                                    _GLF_color = vec4(8815.5146, -3.7, 8235.8764, -232.011);
                                                }
                                                donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (_GLF_IDENTITY(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C, mix(float(_GLF_FUZZED(-4.6)), float(4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C), bool(true)))))));
                                                donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                                                donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                                            }
                                            {
                                                vec2 GLF_live10coord = _GLF_FUZZED((vec2(359.719, -7.0) + _GLF_IDENTITY(vec2(325.511, 56.95), mix(vec2((vec2(325.511, 56.95))[0], _GLF_FUZZED(-265.793)), vec2(_GLF_FUZZED(-8.8), (vec2(325.511, 56.95))[1]), bvec2(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true)))));
                                                int GLF_live10i = _GLF_IDENTITY(_GLF_FUZZED(-50170), (_GLF_FUZZED(-50170)) * 1);
                                                {
                                                    int GLF_live10looplimiter0 = 0;
                                                    while (GLF_live10i < 1 && GLF_live10coord.x > 1.0 || GLF_live10coord.y > 1.0) {
                                                        if (GLF_live10looplimiter0 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live10looplimiter0++;
                                                        {
                                                            if (GLF_live10coord.x > 1.0)
                                                                GLF_live10coord.x -= 1.0;
                                                            if (GLF_live10coord.y > 1.0)
                                                                GLF_live10coord.y -= 1.0;
                                                            GLF_live10coord *= 2.0;
                                                            GLF_live10i++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(21767, -94605));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            {
                                                {
                                                    float GLF_live12grey = _GLF_FUZZED(((-205.698) * (-_GLF_IDENTITY(6.7, float(_GLF_IDENTITY(mat3x4(6.7, 0.0, 1.0, 0.0, sqrt(0.0), 1.0, 1.0, 0.0, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))), _GLF_ONE(1.0, injectionSwitch.y), 1.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0))))), (mat3x4(6.7, 0.0, 1.0, 0.0, sqrt(0.0), 1.0, 1.0, 0.0, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))), _GLF_ONE(1.0, injectionSwitch.y), 1.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))))) + mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))));
                                                    {
                                                        if (_GLF_IDENTITY(int(GLF_live12gl_FragCoord[1]) < 90, !(!(_GLF_IDENTITY(int(GLF_live12gl_FragCoord[1]) < 90, (int(GLF_live12gl_FragCoord[1]) < 90) && _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))) {
                                                            GLF_live12grey = 0.5 + float(GLF_live12data[2]) / 10.0;
                                                        } else {
                                                            if (int(GLF_live12gl_FragCoord[1]) < 120) {
                                                                GLF_live12grey = 0.5 + float(GLF_live12data[3]) / 10.0;
                                                            } else {
                                                                if (int(GLF_live12gl_FragCoord[1]) < 150) {
                                                                    ;
                                                                } else {
                                                                    if (int(GLF_live12gl_FragCoord[1]) < 180) {
                                                                        GLF_live12grey = 0.5 + float(GLF_live12data[5]) / _GLF_IDENTITY(10.0, max(10.0, 10.0));
                                                                    } else {
                                                                        if (int(_GLF_IDENTITY(GLF_live12gl_FragCoord[1], (GLF_live12gl_FragCoord[1]) - 0.0)) < 210) {
                                                                            GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_live12gl_FragCoord[1]) < 240) {
                                                                                GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                                                                    GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                                                                                } else {
                                                                                    ;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    float donor_replacementGLF_dead9A = _GLF_FUZZED(-2191.6401);
                                                    float donor_replacementGLF_dead9B = _GLF_FUZZED(dFdyFine(1.1));
                                                    float donor_replacementGLF_dead9C = _GLF_FUZZED(8.3);
                                                    float donor_replacementGLF_dead9temp = _GLF_FUZZED(-7615.9187);
                                                    float donor_replacementGLF_dead9x0 = _GLF_IDENTITY(_GLF_FUZZED(-793.018), (_GLF_FUZZED(-793.018)) - 0.0);
                                                    {
                                                        vec2 GLF_live10coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(3.6, (3.6) / 1.0), 761.156));
                                                        int GLF_live10i = _GLF_FUZZED(((_GLF_IDENTITY((-86218) | ivec3(25967, -_GLF_IDENTITY(64730, min(64730, 64730)), -25357).b, (true ? ((-86218) | ivec3(25967, -_GLF_IDENTITY(64730, min(64730, 64730)), -25357).b) : _GLF_FUZZED(-23912)))) + (-67207)));
                                                        {
                                                            if (GLF_live10coord.x > 1.0)
                                                                GLF_live10coord.x -= 1.0;
                                                            if (GLF_live10coord.y > 1.0)
                                                                GLF_live10coord.y -= 1.0;
                                                            GLF_live10coord *= 2.0;
                                                            GLF_live10i++;
                                                        }
                                                    }
                                                    float donor_replacementGLF_dead9x1 = _GLF_FUZZED(fwidthFine(2707.5415));
                                                    float donor_replacementGLF_dead9x2 = _GLF_FUZZED(_GLF_IDENTITY(dFdy(276.880), mix(float(_GLF_FUZZED((-45.96))), float(dFdy(276.880)), bool(true))));
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = vec4(7479.9776, -6.6, -69.24, -2.9);
                                                        }
                                                        float GLF_dead9h0 = _GLF_IDENTITY(donor_replacementGLF_dead9x0, min(_GLF_IDENTITY(donor_replacementGLF_dead9x0, clamp(donor_replacementGLF_dead9x0, donor_replacementGLF_dead9x0, donor_replacementGLF_dead9x0)), donor_replacementGLF_dead9x0)) - donor_replacementGLF_dead9x2;
                                                        float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                                                        float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                        float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                        donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                                                        donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (_GLF_IDENTITY(GLF_dead9k1, 1.0 * (GLF_dead9k1))))) / ((_GLF_IDENTITY(pow((GLF_dead9h0), 2.0) * (GLF_dead9h1), clamp(pow((GLF_dead9h0), 2.0) * (GLF_dead9h1), pow((GLF_dead9h0), 2.0) * (GLF_dead9h1), pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)))) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                                                        donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                                                        donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                        donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (_GLF_IDENTITY(4.0, min(4.0, 4.0)) * donor_replacementGLF_dead9A * _GLF_IDENTITY(donor_replacementGLF_dead9C, mix(float(_GLF_FUZZED(6624.6691)), float(donor_replacementGLF_dead9C), bool(true)))))));
                                                        donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                                                        donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                                                    }
                                                    {
                                                        vec2 GLF_live10coord = _GLF_FUZZED(vec2(253.740, 703.060));
                                                        if (GLF_live10coord.y > 1.0)
                                                            GLF_live10coord.y -= 1.0;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = dFdyFine(GLF_dead9_GLF_color);
                                                }
                                                if (_GLF_IDENTITY(donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15, (donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15) || false) && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15) {
                                                    float GLF_dead4p = (_GLF_IDENTITY(15.0, (_GLF_IDENTITY(15.0, (_GLF_IDENTITY(15.0, 1.0 * (15.0))) / 1.0)) - 0.0) - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0;
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(9.3, _GLF_IDENTITY(27.09, mix(float(_GLF_IDENTITY(27.09, mix(float(27.09), float(_GLF_FUZZED(-8.4)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))), float(_GLF_FUZZED(-770.823)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))), 6.1, 1.6);
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = floor(vec4(-3172.0275, -50.10, 0.5, -2.1));
                                                        {
                                                            vec2 GLF_live10coord = _GLF_FUZZED((vec2(47.88, -6.7) * vec4(32.32, 2972.1532, -84.87, 9231.5944).g));
                                                            if (GLF_live10coord.x > 1.0)
                                                                GLF_live10coord.x -= 1.0;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                                _GLF_color = min(vec4(GLF_dead4p, resolution, GLF_dead4p), (mat2x4(98.87, 2.0, 6021.1061, 4.8, 70.19, 2.0, 7.9, -_GLF_IDENTITY(323.603, clamp(_GLF_IDENTITY(323.603, clamp(323.603, _GLF_IDENTITY(323.603, (323.603) / 1.0), _GLF_IDENTITY(323.603, (false ? _GLF_FUZZED(GLF_dead4p) : 323.603)))), 323.603, 323.603))) * injectionSwitch));
                                                            }
                                                            {
                                                                GLF_dead4p = 1.0 - GLF_dead4p;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(_GLF_IDENTITY(-13.27, clamp(_GLF_IDENTITY(-13.27, mix(float(_GLF_FUZZED(3.0)), float(-13.27), bool(true))), _GLF_IDENTITY(-13.27, (_GLF_IDENTITY(-13.27, 0.0 + (-13.27))) + 0.0), _GLF_IDENTITY(-13.27, min(-13.27, -13.27)))), _GLF_IDENTITY(-7532.3181, mix(float(-7532.3181), float(_GLF_FUZZED(1737.0116)), bool(false))), -5618.4749, 5212.3778);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = GLF_live1_GLF_color;
                                                            }
                                                            vec2 donor_replacementGLF_dead7a = _GLF_FUZZED(c);
                                                            float donor_replacementGLF_dead7th = _GLF_FUZZED(distance(fwidthCoarse(vec3(-1638.1995, 694.335, -4763.2563)), col));
                                                            if (donor_replacementGLF_dead7a.y < donor_replacementGLF_dead7a.x) {
                                                                donor_replacementGLF_dead7th = _GLF_IDENTITY(0.5, (_GLF_IDENTITY(0.5, clamp(0.5, 0.5, 0.5))) / 1.0) - donor_replacementGLF_dead7th;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                donor_replacementGLF_dead4pos.y++;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, injectionSwitch.x, injectionSwitch.x)) > injectionSwitch.y)))) {
                                                _GLF_color = GLF_live1_GLF_color;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead9_GLF_color;
                                                }
                                                float donor_replacementGLF_dead9A = _GLF_FUZZED(37.21);
                                                {
                                                    float GLF_live12grey = _GLF_FUZZED(-1.8);
                                                    {
                                                        if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                                            GLF_live12grey = 0.5 + _GLF_IDENTITY(float(GLF_live12data[8]), clamp(float(GLF_live12data[8]), float(GLF_live12data[8]), _GLF_IDENTITY(float(GLF_live12data[8]), (float(GLF_live12data[8])) - 0.0))) / 10.0;
                                                        } else {
                                                            ;
                                                        }
                                                    }
                                                }
                                                float donor_replacementGLF_dead9B = _GLF_FUZZED(dFdxFine((mat3x4(-635.425, -202.731, 87.04, -3846.2806, 81.46, -6.4, -399.750, -765.074, 6.4, 793.344, -9.3, -3.6), -8.8)));
                                                float donor_replacementGLF_dead9C = _GLF_FUZZED(fma(-6.1, normalize(-96.45), distance(_GLF_color, vec4(-836.370, -4709.8257, 3.1, -3.6))));
                                                float donor_replacementGLF_dead9temp = _GLF_FUZZED(-4.5);
                                                float donor_replacementGLF_dead9x0 = _GLF_FUZZED(degrees(6.5));
                                                float donor_replacementGLF_dead9x1 = _GLF_FUZZED((41.39 - 1.1));
                                                float donor_replacementGLF_dead9x2 = _GLF_FUZZED(exp2(913.441));
                                                while (abs(donor_replacementGLF_dead9x2 - donor_replacementGLF_dead9x1) >= .000000000000001) {
                                                    float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                                                    float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                                                    float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                    float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                    donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                                                    donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                                                    donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                                                    donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                    donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / _GLF_IDENTITY((donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))), max((donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))), _GLF_IDENTITY((donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))), (true ? (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))) : _GLF_FUZZED(donor_replacementGLF_dead9temp))))));
                                                    donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                                                    donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                                                }
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(vec3(-67.89, -7552.2566, -25.32), -933.006);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), !(!_GLF_IDENTITY((!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))), !(!((!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))))))))) {
                                                    _GLF_color = cos(GLF_dead9polynomial.yzyy);
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)).x))); _injected_loop_counter--) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(9.3, vec2(253.433, 8117.2334), -42.31);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            col = .5 + cos(c.y + vec3(resolution.x, A[49] / _GLF_IDENTITY(resolution, vec2(_GLF_IDENTITY(mat3x2(_GLF_IDENTITY(resolution, vec2(mat4x2(resolution, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))), 0.0, 1.0, 1.0, 0.0), (false ? _GLF_FUZZED(mat3x2(-76.60, -7.9, 1881.6406, 928.906, 8.6, 3.4)) : mat3x2(_GLF_IDENTITY(resolution, vec2(mat4x2(resolution, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))), 0.0, 1.0, 1.0, 0.0))))).x + 50.0, 22.0));
                                            {
                                                vec2 GLF_live1coord = _GLF_FUZZED(vec2(385.466, 3163.9576));
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead7th = _GLF_FUZZED(6.3);
                                                    if (c.y < c.x) {
                                                        donor_replacementGLF_dead7th = 0.5 - donor_replacementGLF_dead7th;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, vec2(mat3x4(injectionSwitch, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, _GLF_IDENTITY(0.0, 1.0 * (0.0))))).x > injectionSwitch.y, bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(injectionSwitch, vec2(mat3x4(injectionSwitch, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, _GLF_IDENTITY(0.0, 1.0 * (0.0))))).x > injectionSwitch.y), true && (bool(_GLF_IDENTITY(injectionSwitch, vec2(mat3x4(injectionSwitch, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, _GLF_IDENTITY(0.0, 1.0 * (0.0))))).x > injectionSwitch.y))))))))) {
                                                    int donor_replacementGLF_dead5iterationCap = _GLF_FUZZED(ivec3(-41958, 5460, 33598)[_GLF_IDENTITY(2, _GLF_IDENTITY(int(ivec3(2, 1, 1)), _GLF_IDENTITY((int(ivec3(2, 1, 1))), min((int(ivec3(2, 1, 1))), (int(ivec3(2, 1, 1))))) | 0))]);
                                                    {
                                                        _GLF_IDENTITY(donor_replacementGLF_dead5iterationCap += 1, (donor_replacementGLF_dead5iterationCap += 1) | 0);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            float donor_replacementGLF_dead9A = _GLF_FUZZED(dFdyFine(smoothstep(col, col, col))[0]);
                                                            float donor_replacementGLF_dead9B = _GLF_IDENTITY(_GLF_FUZZED((((-861.261) != (-_GLF_IDENTITY(0.6, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-51.93) : _GLF_IDENTITY(0.6, 0.0 + (0.6)))))) ? GLF_dead5resolution[1] : (-702.049))), clamp(_GLF_FUZZED((((-861.261) != (-_GLF_IDENTITY(0.6, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-51.93) : _GLF_IDENTITY(0.6, 0.0 + (0.6)))))) ? GLF_dead5resolution[1] : (-702.049))), _GLF_FUZZED((((-861.261) != (-_GLF_IDENTITY(0.6, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-51.93) : _GLF_IDENTITY(0.6, 0.0 + (0.6)))))) ? GLF_dead5resolution[1] : (-702.049))), _GLF_FUZZED((((-861.261) != (-_GLF_IDENTITY(0.6, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(-51.93) : _GLF_IDENTITY(0.6, 0.0 + (0.6)))))) ? GLF_dead5resolution[1] : (-702.049)))));
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(6.2, 1.1, -_GLF_IDENTITY(6.1, mix(float(6.1), float(_GLF_FUZZED(306.715)), bool(false))), -715.211);
                                                            }
                                                            float donor_replacementGLF_dead9C = _GLF_FUZZED(7.7);
                                                            float donor_replacementGLF_dead9temp = _GLF_FUZZED(distance(max(vec3(-0.9, -2.5, -82.82), -3671.5012), sinh(col)));
                                                            float donor_replacementGLF_dead9x0 = _GLF_FUZZED(_GLF_IDENTITY(clamp(3.3, 4.8, _GLF_IDENTITY(inversesqrt(6.6), 1.0 * (inversesqrt(6.6)))), clamp(_GLF_IDENTITY(clamp(3.3, 4.8, _GLF_IDENTITY(inversesqrt(6.6), 1.0 * (inversesqrt(6.6)))), mix(float(_GLF_FUZZED(-967.659)), float(clamp(3.3, 4.8, _GLF_IDENTITY(inversesqrt(6.6), 1.0 * (inversesqrt(6.6))))), bool(true))), clamp(3.3, 4.8, _GLF_IDENTITY(inversesqrt(6.6), 1.0 * (inversesqrt(6.6)))), clamp(3.3, 4.8, _GLF_IDENTITY(inversesqrt(6.6), 1.0 * (inversesqrt(6.6)))))));
                                                            float donor_replacementGLF_dead9x1 = _GLF_FUZZED(tanh(0.4));
                                                            float donor_replacementGLF_dead9x2 = _GLF_FUZZED(-_GLF_IDENTITY(6849.1070, mix(float(6849.1070), float(_GLF_FUZZED(-5.5)), bool(false))));
                                                            while (abs(donor_replacementGLF_dead9x2 - donor_replacementGLF_dead9x1) >= .000000000000001) {
                                                                float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                                                                float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                                                                float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                                float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                                donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                                                                donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                                                                donor_replacementGLF_dead9B = (((GLF_dead9k0) - (donor_replacementGLF_dead9A * (pow((_GLF_IDENTITY(GLF_dead9h0, (true ? GLF_dead9h0 : _GLF_FUZZED(donor_replacementGLF_dead9B)))), 2.0)))) / (GLF_dead9h0));
                                                                donor_replacementGLF_dead9C = GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                                donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))));
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    _GLF_color = GLF_live1_GLF_color;
                                                                }
                                                                donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                                                                donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-3.4, -806.501, -6691.1387, -525.590);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(301.756, 462.212, -107.624, 2830.8841);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                float donor_replacementGLF_dead7th = _GLF_FUZZED(dFdy(9.4));
                                                                {
                                                                    vec2 GLF_live11coord = _GLF_FUZZED((vec2(-16.73, 5.1).ts * vec2(-9969.7008, 8.9)));
                                                                    if (_GLF_IDENTITY(GLF_live11coord.y, (_GLF_IDENTITY(GLF_live11coord.y, (GLF_live11coord.y) * 1.0)) - length(vec2(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x)))) < 0.6) {
                                                                        uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.6, (0.6) - 0.0))) * 256.0);
                                                                        uint GLF_live11res1 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                                                        uint GLF_live11res2 = uint(((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord.y, (GLF_live11icoord.y) | (GLF_live11icoord.y))) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                                                        float GLF_live11res = float(_GLF_IDENTITY(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u), uint(uvec3(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u), 0u, 1u))) ^ ((GLF_live11res1 & 1u) != 0u ? 1u : 0u));
                                                                        GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                                                                    } else {
                                                                        ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                                        int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((GLF_live11icoord.y & 32) >> 5);
                                                                        int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                                                        int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                                                        GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(_GLF_IDENTITY(GLF_live11res2, (GLF_live11res2) / (int(_GLF_ONE(1.0, injectionSwitch.y)) & 1)) & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                                                    }
                                                                }
                                                                vec2 donor_replacementGLF_dead7v = _GLF_FUZZED(step(vec2(-7612.4891, 83.03), GLF_live1coord));
                                                                if (_GLF_IDENTITY(donor_replacementGLF_dead7v.x, (_GLF_IDENTITY(donor_replacementGLF_dead7v.x, max(donor_replacementGLF_dead7v.x, donor_replacementGLF_dead7v.x))) / _GLF_ONE(1.0, injectionSwitch.y)) < 0.0) {
                                                                    donor_replacementGLF_dead7th = _GLF_IDENTITY(1.0 - donor_replacementGLF_dead7th, float(_GLF_IDENTITY(vec3(_GLF_IDENTITY(1.0 - donor_replacementGLF_dead7th, max(_GLF_IDENTITY(1.0 - donor_replacementGLF_dead7th, mix(float(_GLF_FUZZED(-5.6)), float(1.0 - donor_replacementGLF_dead7th), bool(true))), 1.0 - donor_replacementGLF_dead7th)), abs(1.0), 0.0), mat3(_GLF_ONE(1.0, injectionSwitch.y)) * (vec3(_GLF_IDENTITY(1.0 - donor_replacementGLF_dead7th, max(_GLF_IDENTITY(1.0 - donor_replacementGLF_dead7th, mix(float(_GLF_FUZZED(-5.6)), float(1.0 - donor_replacementGLF_dead7th), bool(true))), 1.0 - donor_replacementGLF_dead7th)), abs(1.0), 0.0)))));
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_IDENTITY(GLF_live1coord.y < 0.6, bool(bvec2(GLF_live1coord.y < 0.6, true)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = asinh(GLF_dead9_GLF_color);
                                                        {
                                                            float GLF_live12grey = _GLF_FUZZED(-354.987);
                                                            {
                                                                if (int(GLF_live12gl_FragCoord[1]) < 150) {
                                                                    ;
                                                                } else {
                                                                    if (int(GLF_live12gl_FragCoord[1]) < 180) {
                                                                        GLF_live12grey = 0.5 + float(GLF_live12data[5]) / 10.0;
                                                                    } else {
                                                                        if (_GLF_IDENTITY(int(GLF_live12gl_FragCoord[1]), (int(GLF_live12gl_FragCoord[1])) * 1) < 210) {
                                                                            GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_live12gl_FragCoord[1]) < 240) {
                                                                                GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                                                                    GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                                                                                } else {
                                                                                    ;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    uvec2 GLF_live1icoord = uvec2(((GLF_live1coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                    uint GLF_live1res1 = uint(((GLF_live1icoord.x * GLF_live1icoord.y) >> (GLF_live1icoord.x & 31u)) & 0xffffffffu);
                                                    uint GLF_live1res2 = uint(_GLF_IDENTITY(((GLF_live1icoord.x * GLF_live1icoord.y) << (_GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u, (_GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u, (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u) | (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u))) | 0u))) & 0xffffffffu, 0u ^ (((GLF_live1icoord.x * GLF_live1icoord.y) << (_GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u, (_GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u, (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u) | (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x, (_GLF_IDENTITY(GLF_live1icoord, uvec2(1u, 1u) * (_GLF_IDENTITY(GLF_live1icoord, ~(~(_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) ^ uvec2(0u, 0u))))))).x) << 0u) & 31u))) | 0u))) & 0xffffffffu)));
                                                    float GLF_live1res = float(_GLF_IDENTITY(((GLF_live1res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live1res1 & 1u) != 0u ? 1u : 0u), min(((GLF_live1res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live1res1 & 1u) != _GLF_IDENTITY(0u, clamp(0u, _GLF_IDENTITY(0u, ~(_GLF_IDENTITY(~(0u), (~(0u)) - 0u))), _GLF_IDENTITY(0u, (0u) / 1u))) ? 1u : 0u), ((GLF_live1res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live1res1 & 1u) != 0u ? _GLF_IDENTITY(1u, (1u) >> (0u << _GLF_IDENTITY(uint(7u), uint(7u)))) : 0u))));
                                                    GLF_live1_GLF_color = vec4(GLF_live1res, GLF_live1res, GLF_live1res, 1.0);
                                                } else {
                                                    ivec2 GLF_live1icoord = ivec2(((GLF_live1coord - vec2(_GLF_IDENTITY(0.4, float(mat3x2(0.4, sqrt(1.0), 1.0, 0.0, 1.0, 0.0))), 0.6)) * vec2(1.0 / _GLF_IDENTITY(0.4, max(0.4, _GLF_IDENTITY(0.4, min(0.4, _GLF_IDENTITY(0.4, clamp(0.4, 0.4, 0.4)))))), 1.0 / 0.4)) * 256.0);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_IDENTITY(_GLF_color = vec4(_GLF_IDENTITY(-3.4, (-3.4) / 1.0), 5.7, 1970.8283, 2.7), abs(vec4(0.0, 0.0, 0.0, 0.0)) + (_GLF_color = vec4(_GLF_IDENTITY(-3.4, (-3.4) / 1.0), 5.7, 1970.8283, 2.7)));
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-1.3, 29.37, 879.799, -4.4);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), ((injectionSwitch.x > injectionSwitch.y)) && true)))) {
                                                                _GLF_color = GLF_live1_GLF_color;
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    int GLF_live1res3 = ((GLF_live1icoord.x >> 5) & 1) ^ ((GLF_live1icoord.y & 32) >> 5);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        {
                                                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(5110.8977, -4240.3052));
                                                            vec4 GLF_live10res = _GLF_FUZZED(vec4(-56.50, 660.700, 12.41, 5.0));
                                                            if (GLF_live10coord.x < 1.0 && GLF_live10coord.y < 1.0) {
                                                                GLF_live10res = texture(GLF_live10tex, GLF_live10coord);
                                                            }
                                                        }
                                                        _GLF_color = vec4(-4.1, -_GLF_IDENTITY(34.27, float(_GLF_IDENTITY(vec4(34.27, log(1.0), 1.0, 0.0), clamp(vec4(34.27, log(1.0), 1.0, 0.0), vec4(34.27, log(1.0), 1.0, 0.0), vec4(34.27, log(1.0), 1.0, 0.0))))), -6.1, 0.4);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        int GLF_live12high = _GLF_FUZZED(63087);
                                                        int GLF_live12i = _GLF_FUZZED(33345);
                                                        int GLF_live12m = _GLF_FUZZED(ivec3(-_GLF_IDENTITY(23383, (23383) >> (83634 & 0)), -20769, -84431).y);
                                                        {
                                                            int GLF_live12from = GLF_live12i;
                                                            int GLF_live12mid = GLF_live12i + GLF_live12m - 1;
                                                            int GLF_live12to = min(GLF_live12i + 2 * GLF_live12m - 1, GLF_live12high);
                                                            GLF_live12merge(GLF_live12from, GLF_live12mid, GLF_live12to);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec2(_GLF_DEAD(false), false)))), true && (!(_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec2(_GLF_DEAD(false), false))))))))) {
                                                            _GLF_color = GLF_live1_GLF_color;
                                                        }
                                                        float donor_replacementGLF_dead7z = _GLF_FUZZED(min(-0.5, _GLF_IDENTITY(64.20, float(mat2x4(64.20, 0.0, abs(0.0), 1.0, 0.0, 0.0, 1.0, log(abs(1.0)))))));
                                                        {
                                                            _GLF_IDENTITY(donor_replacementGLF_dead7z = c.x / c.y, (donor_replacementGLF_dead7z = c.x / c.y) + 0.0);
                                                        }
                                                    }
                                                    int GLF_live1res2 = (_GLF_IDENTITY(GLF_live1icoord, ivec2(0, 0) | (GLF_live1icoord)).y * _GLF_IDENTITY(GLF_live1icoord, ivec2(0, 0) ^ (_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) >> ivec2(0, 0)))).y >> 10) & 1;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, !(!(false)))))))) {
                                                        _GLF_color = GLF_live1_GLF_color;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        float donor_replacementGLF_dead7z = _GLF_FUZZED(tan(-13.15));
                                                        {
                                                            float GLF_live12grey = _GLF_FUZZED(((vec3(7.7, -9.4, -3.9) * vec3(67.93, 274.527, 1.1)).b * 88.37));
                                                            {
                                                                if (int(GLF_live12gl_FragCoord[1]) < 90) {
                                                                    GLF_live12grey = 0.5 + float(GLF_live12data[2]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_live12gl_FragCoord[1]) < 120) {
                                                                        GLF_live12grey = 0.5 + float(GLF_live12data[3]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_live12gl_FragCoord[1]) < 150) {
                                                                            ;
                                                                        } else {
                                                                            if (int(GLF_live12gl_FragCoord[1]) < 180) {
                                                                                GLF_live12grey = 0.5 + float(GLF_live12data[5]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_live12gl_FragCoord[1]) < 210) {
                                                                                    GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
                                                                                } else {
                                                                                    if (int(_GLF_IDENTITY(GLF_live12gl_FragCoord[1], float(mat3x4(GLF_live12gl_FragCoord[1], 1.0, 0.0, abs(0.0), 0.0, 0.0, 1.0, 1.0, determinant(mat3(1.0, 1.0, 0.0, sin(0.0), 1.0, 0.0, 0.0, 0.0, 1.0)), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, 0.0)))) < 240) {
                                                                                        GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                                                                                    } else {
                                                                                        if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                                                                            GLF_live12grey = 0.5 + _GLF_IDENTITY(float(_GLF_IDENTITY(GLF_live12data[8], min(GLF_live12data[8], GLF_live12data[8]))) / 10.0, 1.0 * (_GLF_IDENTITY(float(_GLF_IDENTITY(GLF_live12data[8], min(GLF_live12data[8], GLF_live12data[8]))) / 10.0, 0.0 + (float(_GLF_IDENTITY(GLF_live12data[8], min(GLF_live12data[8], GLF_live12data[8]))) / 10.0))));
                                                                                        } else {
                                                                                            ;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (c.y > c.x) {
                                                            donor_replacementGLF_dead7z = c.x / c.y;
                                                        } else {
                                                            donor_replacementGLF_dead7z = c.y / c.x;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = uintBitsToFloat(uvec4(116908u, 4721u, 185077u, 123153u));
                                                    }
                                                    int GLF_live1res1 = _GLF_IDENTITY((_GLF_IDENTITY(GLF_live1icoord.x, (true ? _GLF_IDENTITY(GLF_live1icoord.x, max(GLF_live1icoord.x, GLF_live1icoord.x)) : _GLF_FUZZED(GLF_live1res2))) * GLF_live1icoord.y >> 9), ~(_GLF_IDENTITY(~((_GLF_IDENTITY(GLF_live1icoord.x, (true ? _GLF_IDENTITY(GLF_live1icoord.x, max(GLF_live1icoord.x, GLF_live1icoord.x)) : _GLF_FUZZED(GLF_live1res2))) * GLF_live1icoord.y >> 9)), ~(~(~((_GLF_IDENTITY(GLF_live1icoord.x, (true ? _GLF_IDENTITY(GLF_live1icoord.x, max(GLF_live1icoord.x, GLF_live1icoord.x)) : _GLF_FUZZED(_GLF_IDENTITY(GLF_live1res2, ~(~(GLF_live1res2)))))) * _GLF_IDENTITY(GLF_live1icoord, (_GLF_IDENTITY(GLF_live1icoord, (GLF_live1icoord) - ivec2(0, 0))) / ivec2(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y))).y >> 9))))))) & 1;
                                                    GLF_live1_GLF_color = vec4(float(GLF_live1res1 ^ GLF_live1res2), float(GLF_live1res2 & GLF_live1res3), _GLF_IDENTITY(float(GLF_live1res1 | _GLF_IDENTITY(GLF_live1res3, (GLF_live1res3) + (0 << _GLF_IDENTITY(int(8), int(8))))), _GLF_IDENTITY(float(_GLF_IDENTITY(mat2(float(GLF_live1res1 | _GLF_IDENTITY(GLF_live1res3, (GLF_live1res3) + (0 << _GLF_IDENTITY(int(8), int(8))))), log(1.0), 1.0, 0.0), mat2(mat3x4(mat2(float(GLF_live1res1 | _GLF_IDENTITY(GLF_live1res3, (GLF_live1res3) + (0 << _GLF_IDENTITY(int(8), int(8))))), log(1.0), 1.0, 0.0))))), 0.0 + (float(_GLF_IDENTITY(mat2(float(GLF_live1res1 | _GLF_IDENTITY(GLF_live1res3, (GLF_live1res3) + (0 << _GLF_IDENTITY(int(8), int(8))))), log(1.0), 1.0, 0.0), mat2(mat3x4(mat2(float(GLF_live1res1 | _GLF_IDENTITY(GLF_live1res3, (GLF_live1res3) + (0 << _GLF_IDENTITY(int(8), int(8))))), log(1.0), 1.0, 0.0)))))))), 1.0);
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-301.790, 314.644, -4840.3143, 2.7);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(718.402) : injectionSwitch.x)) < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(_GLF_IDENTITY(mat4(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0), transpose(_GLF_IDENTITY(transpose(_GLF_IDENTITY(mat4(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0), (mat4(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)) / mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), (transpose(_GLF_IDENTITY(mat4(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0), (mat4(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)) / mat4(1.0, _GLF_IDENTITY(1.0, _GLF_ONE(1.0, injectionSwitch.y) * (_GLF_IDENTITY(1.0, float(vec2(1.0, 1.0))))), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, min(1.0, 1.0))) / 1.0), 1.0)), 1.0, 1.0, 1.0, 1.0)))) / mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))))))))) {
                                                ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(86420, -29913));
                                                while (donor_replacementGLF_dead4pos.y != 256) {
                                                    if (_GLF_IDENTITY(donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15, !(!(donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15))) && _GLF_IDENTITY(donor_replacementGLF_dead4pos, (donor_replacementGLF_dead4pos) + ivec2(0, 0)).x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = log(vec4(3.0, 7945.2613, 0.8, 720.354));
                                                            }
                                                            _GLF_color = step(round(vec4(-5.8, 97.62, 1.5, _GLF_IDENTITY(-9501.0191, max(-9501.0191, -9501.0191)))), vec4(-_GLF_IDENTITY(36.37, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(faceforward(-99.91, -6113.0778, -4.7)) : 36.37)), -9.6, -3.9, 0.2));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = roundEven(_GLF_color);
                                                                }
                                                                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = smoothstep(GLF_dead9_GLF_color, GLF_live1_GLF_color, GLF_live1_GLF_color);
                                                        }
                                                        float GLF_dead4p = (15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    donor_replacementGLF_dead4pos.y++;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead9A = _GLF_FUZZED(dot(sinh((resolution - 3.1)), (true ? min(injectionSwitch, -7.4) : (vec2(-691.889, -9.4) / 3786.1712))));
                                                    float donor_replacementGLF_dead9B = _GLF_FUZZED(abs(-4035.7431));
                                                    {
                                                        vec2 GLF_live11coord = _GLF_FUZZED((vec2(8.6, 7104.3790) + (true ? (-919.408) : vec4(10.57, 9.0, -0.2, -4.0).b)));
                                                        {
                                                            ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - vec2(_GLF_IDENTITY(0.4, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))) * (0.4)), 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                            int GLF_live11res3 = ((GLF_live11icoord.x >> 5) & 1) ^ ((_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11icoord, ivec2(0, 0) + (GLF_live11icoord)).y & 32, min(_GLF_IDENTITY(GLF_live11icoord, ivec2(0, 0) + (GLF_live11icoord)).y & 32, _GLF_IDENTITY(GLF_live11icoord, ivec2(0, 0) + (GLF_live11icoord)).y & 32))) >> 5);
                                                            int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                                            int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                                            GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), float(GLF_live11res1 | GLF_live11res3), 1.0);
                                                        }
                                                    }
                                                    float donor_replacementGLF_dead9C = _GLF_FUZZED(-411.539);
                                                    float donor_replacementGLF_dead9temp = _GLF_FUZZED(dot(col, vec3(-5729.3816, _GLF_IDENTITY(6.6, (6.6) - 0.0), 2.6)));
                                                    float donor_replacementGLF_dead9x0 = _GLF_FUZZED(determinant((mat2(40.81, 97.81, -355.208, 78.41) + 9.7)));
                                                    float donor_replacementGLF_dead9x1 = _GLF_FUZZED(9.0);
                                                    float donor_replacementGLF_dead9x2 = _GLF_FUZZED(log2(round(-464.014)));
                                                    {
                                                        int GLF_live10looplimiter0 = 0;
                                                        if (GLF_live10looplimiter0 >= 6) {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        float GLF_dead9h0 = donor_replacementGLF_dead9x0 - donor_replacementGLF_dead9x2;
                                                        float GLF_dead9h1 = donor_replacementGLF_dead9x1 - donor_replacementGLF_dead9x2;
                                                        float GLF_dead9k0 = GLF_dead9fx(donor_replacementGLF_dead9x0) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                        float GLF_dead9k1 = GLF_dead9fx(donor_replacementGLF_dead9x1) - GLF_dead9fx(donor_replacementGLF_dead9x2);
                                                        donor_replacementGLF_dead9temp = donor_replacementGLF_dead9x2;
                                                        donor_replacementGLF_dead9A = (((GLF_dead9h1) * (GLF_dead9k0)) - ((GLF_dead9h0) * (GLF_dead9k1))) / ((pow((GLF_dead9h0), 2.0) * (GLF_dead9h1)) - (pow((GLF_dead9h1), 2.0) * (GLF_dead9h0)));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = GLF_live1_GLF_color;
                                                        }
                                                        donor_replacementGLF_dead9B = (((GLF_dead9k0) - (_GLF_IDENTITY(donor_replacementGLF_dead9A, min(donor_replacementGLF_dead9A, donor_replacementGLF_dead9A)) * (pow((GLF_dead9h0), 2.0)))) / (GLF_dead9h0));
                                                        donor_replacementGLF_dead9C = _GLF_IDENTITY(GLF_dead9fx(donor_replacementGLF_dead9x2), (GLF_dead9fx(donor_replacementGLF_dead9x2)) * sqrt(1.0));
                                                        donor_replacementGLF_dead9x2 = donor_replacementGLF_dead9x2 - ((2.0 * donor_replacementGLF_dead9C) / (donor_replacementGLF_dead9B + sign(donor_replacementGLF_dead9B) * sqrt(pow(donor_replacementGLF_dead9B, 2.0) - (4.0 * donor_replacementGLF_dead9A * donor_replacementGLF_dead9C))));
                                                        donor_replacementGLF_dead9x0 = donor_replacementGLF_dead9x1;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                            _GLF_color = round(_GLF_outVarBackup_GLF_color);
                                                        }
                                                        donor_replacementGLF_dead9x1 = donor_replacementGLF_dead9temp;
                                                    }
                                                }
                                                _GLF_IDENTITY(_GLF_color = _GLF_outlined_2(), (_GLF_color = _GLF_outlined_2()) / vec4(1.0, 1.0, 1.0, 1.0));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outlined_3(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, min(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(mat4(1.0), transpose(transpose(mat4(1.0)))) * (_GLF_outVarBackup_GLF_color)), _GLF_outVarBackup_GLF_color)), _GLF_outVarBackup_GLF_color)));
                                                }
                                            }
                                        }
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            discard;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, exp(vec2(0.0, 0.0)) * (injectionSwitch)).y)))) {
                    {
                        vec2 GLF_live11coord = _GLF_FUZZED((((_GLF_IDENTITY(-5.9, (-5.9) / 1.0)) + vec2(vec4(-698.815, -1.2, -326.411, -98.51))) * (mat2(10.74, -246.866, -5.4, 493.346) - (3.7 * 58.29))));
                        {
                            if (GLF_live11coord.y < 0.6) {
                                uvec2 GLF_live11icoord = uvec2(((GLF_live11coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) / 1.0) / 0.6)) * 256.0);
                                uint GLF_live11res1 = uint(((GLF_live11icoord.x * _GLF_IDENTITY(GLF_live11icoord, (GLF_live11icoord) - (uvec2(0u, 0u) << _GLF_IDENTITY(uvec2(7u), uvec2(7u)))).y) >> (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live11res2 = uint(((GLF_live11icoord.x * GLF_live11icoord.y) << (GLF_live11icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live11res = float(((GLF_live11res2 & 0x80000000u) != 0u ? 1u : 0u) ^ _GLF_IDENTITY(((GLF_live11res1 & 1u) != 0u ? 1u : 0u), (((GLF_live11res1 & 1u) != 0u ? 1u : 0u)) << 0u));
                                GLF_live11_GLF_color = vec4(GLF_live11res, GLF_live11res, GLF_live11res, 1.0);
                            } else {
                                ivec2 GLF_live11icoord = ivec2(((GLF_live11coord - _GLF_IDENTITY(vec2(0.4, 0.6), (true ? vec2(0.4, 0.6) : _GLF_FUZZED(uv)))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live11res3 = ((_GLF_IDENTITY(GLF_live11icoord.x >> 5, 0 ^ (GLF_live11icoord.x >> 5))) & 1) ^ ((_GLF_IDENTITY(GLF_live11icoord.y & 32, int(ivec4(_GLF_IDENTITY(GLF_live11icoord.y & 32, int(ivec4(GLF_live11icoord.y & 32, 1, 1, 1))), 0, 0, (0 << _GLF_IDENTITY(int(1), int(1))))))) >> 5);
                                int GLF_live11res2 = (GLF_live11icoord.y * GLF_live11icoord.y >> 10) & 1;
                                int GLF_live11res1 = (GLF_live11icoord.x * GLF_live11icoord.y >> 9) & 1;
                                GLF_live11_GLF_color = vec4(float(GLF_live11res1 ^ GLF_live11res2), float(GLF_live11res2 & GLF_live11res3), _GLF_IDENTITY(float(GLF_live11res1 | GLF_live11res3), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(float(GLF_live11res1 | GLF_live11res3), mix(float(float(GLF_live11res1 | GLF_live11res3)), float(_GLF_FUZZED(-2.1)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) : _GLF_FUZZED(3221.6462))), 1.0);
                            }
                        }
                    }
                    float donor_replacementGLF_dead7th = _GLF_FUZZED(-8726.0421);
                    if (c.y < c.x) {
                        donor_replacementGLF_dead7th = 0.5 - donor_replacementGLF_dead7th;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_IDENTITY(_GLF_color = _GLF_IDENTITY(vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758), mix(vec4(_GLF_FUZZED(((mat4x3(725.904, 9.4, 7635.1162, 3727.7759, 804.149, 1.9, 2.3, 9.7, 5.8, -578.287, 2928.5714, -0.2) == mat4x3(21.81, 6.5, -2.1, -0.5, 7.5, -0.1, -922.558, -1.0, -2237.1266, 8.4, 0.8, 42.34)) ? (-82.52) : 6.5)), _GLF_FUZZED(-4576.4215), (vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758))[2], _GLF_FUZZED(0.7)), vec4((vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758))[0], (vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758))[1], _GLF_FUZZED(-3.8), (vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758))[3]), bvec4(true, true, false, true))), (_GLF_color = _GLF_IDENTITY(vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758), mix(vec4(_GLF_FUZZED(((mat4x3(725.904, 9.4, 7635.1162, 3727.7759, _GLF_IDENTITY(804.149, 0.0 + (804.149)), 1.9, 2.3, 9.7, 5.8, -578.287, 2928.5714, -0.2) == mat4x3(21.81, 6.5, -2.1, -0.5, 7.5, -0.1, -922.558, -1.0, -2237.1266, 8.4, 0.8, 42.34)) ? (-82.52) : 6.5)), _GLF_FUZZED(-4576.4215), (vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(_GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0), (true ? _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0) : _GLF_FUZZED(9.5)))), 8.5, 5586.0758))[2], _GLF_FUZZED(0.7)), vec4((vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-81.23)), bool(false))), 0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, 0.0))) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758))[0], (vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(_GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0), (_GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)) * abs(1.0))), 8.5, _GLF_IDENTITY(5586.0758, (false ? _GLF_FUZZED(-958.593) : 5586.0758))))[1], _GLF_FUZZED(-3.8), (vec4(57.52, _GLF_IDENTITY(-4.2, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0)))), (float(_GLF_IDENTITY(mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0), mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat3x4(-4.2, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, tan(0.0), 0.0, 0.0, sqrt(0.0), 0.0))))) * 1.0)), 8.5, 5586.0758))[3]), bvec4(true, true, false, true)))) / vec4(_GLF_IDENTITY(1.0, float(mat2x3(1.0, 1.0, 1.0, 1.0, 0.0, 1.0))), 1.0, 1.0, 1.0));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                        _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (true ? (_GLF_color = _GLF_outVarBackup_GLF_color) : _GLF_FUZZED(vec4(0.2, acos(-56.87), 5.5, 575.483))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            ivec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(ivec2(-_GLF_IDENTITY(53803, max(_GLF_IDENTITY(53803, (53803) - 0), 53803)), 75524));
                            if (donor_replacementGLF_dead4pos.x < GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] + 15 && donor_replacementGLF_dead4pos.x > GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)] - 15) {
                                float GLF_dead4p = (15.0 - abs(float(donor_replacementGLF_dead4pos.x - GLF_dead4dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4pos.y, 256)]))) / 15.0;
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sinh(_GLF_color);
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = round(vec4(1.2, 8.8, -9.6, -809.143));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = clamp(normalize(_GLF_outVarBackup_GLF_color), GLF_dead9_GLF_color, _GLF_color);
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    {
        vec2 GLF_live10coord = _GLF_FUZZED((mat2(-90.82, -385.761, 8.7, 27.98) * vec2(4820.8507, -7.1)));
        vec4 GLF_live10res = _GLF_FUZZED(vec4(vec3(1.1, -890.737, -258.527), 31.84));
        {
            GLF_live10res = texture(GLF_live10tex, GLF_live10coord);
        }
    }
    _GLF_color = vec4(col, 1.0);
}
