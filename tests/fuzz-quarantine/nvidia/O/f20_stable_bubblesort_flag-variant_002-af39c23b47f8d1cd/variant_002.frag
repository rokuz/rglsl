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

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead0resolution;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead3resolution;
};

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_dead2time;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead2resolution;
};

float GLF_dead2h_r = _GLF_FUZZED(-8735.9222);
float GLF_dead2s_g = _GLF_FUZZED(float(true));
float GLF_dead2b_b = _GLF_IDENTITY(_GLF_FUZZED((+(-839.198))), mix(float(_GLF_FUZZED(-4.0)), float(_GLF_FUZZED((+(-839.198)))), bool(_GLF_IDENTITY(true, !(!(true))))));

void GLF_dead2doConvert() {
    int GLF_dead2msb8 = 256;
    vec3 GLF_dead2temp = _GLF_FUZZED(clamp(vec3(-56.10, 706.316, 405.927), vec3(-34.78, 0.2, -0.0), sqrt(vec3(-53.96, -8874.1311, 9.5))));
    GLF_dead2temp = _GLF_IDENTITY(GLF_dead2b_b, (false ? _GLF_FUZZED(GLF_dead2time) : GLF_dead2b_b)) * (float(bitCount(GLF_dead2msb8)) - GLF_dead2s_g) + (GLF_dead2b_b - GLF_dead2b_b * (float(bitCount(GLF_dead2msb8)) - GLF_dead2s_g)) * clamp(abs(abs(6.0 * (GLF_dead2h_r - vec3(bitfieldReverse(0), bitCount(GLF_dead2msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_dead2msb8)), float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), float(bitCount(int(GLF_dead2resolution.x))));
    GLF_dead2h_r = GLF_dead2temp.x;
    GLF_dead2s_g = GLF_dead2temp.y;
    GLF_dead2b_b = GLF_dead2temp.z;
}

vec3 GLF_dead2computeColor(float GLF_dead2c, vec2 GLF_dead2position) {
    int GLF_dead2msb8 = _GLF_IDENTITY(256, (true ? 256 : _GLF_FUZZED((+(-10084)))));
    GLF_dead2h_r = fract(GLF_dead2c);
    GLF_dead2s_g = float(bitCount(GLF_dead2msb8));
    GLF_dead2b_b = (0.5 + (sin(GLF_dead2time) * 0.5 + 0.5));
    GLF_dead2doConvert();
    GLF_dead2s_g *= float(bitCount(GLF_dead2msb8)) / GLF_dead2position.y;
    GLF_dead2h_r *= float(bitCount(GLF_dead2msb8)) / GLF_dead2position.x;
    if (abs(GLF_dead2position.y - GLF_dead2position.x) < 0.5) {
        GLF_dead2b_b = clamp(GLF_dead2b_b * float(bitCount(GLF_dead2msb8)) * 3.0, float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), float(bitCount(GLF_dead2msb8)));
    }
    return vec3(GLF_dead2h_r, GLF_dead2s_g, GLF_dead2b_b);
}

vec3 GLF_dead2defaultColor() {
    return vec3(float(_GLF_IDENTITY(bitfieldExtract(int(GLF_dead2resolution.y), 0, 1), clamp(bitfieldExtract(int(GLF_dead2resolution.y), 0, 1), _GLF_IDENTITY(bitfieldExtract(int(GLF_dead2resolution.y), 0, 1), int(int(bitfieldExtract(int(GLF_dead2resolution.y), 0, 1)))), bitfieldExtract(int(GLF_dead2resolution.y), 0, 1)))));
}

vec3 GLF_dead2drawShape(vec2 GLF_dead2pos, vec2 GLF_dead2square, vec3 GLF_dead2setting) {
    int GLF_dead2msb8 = 256;
    bool GLF_dead2c1 = GLF_dead2pos.x - GLF_dead2setting.x < GLF_dead2square.x;
    if (!GLF_dead2c1) {
        return GLF_dead2defaultColor();
    }
    bool GLF_dead2c2 = GLF_dead2pos.x + GLF_dead2setting.x > GLF_dead2square.x;
    if (_GLF_IDENTITY(!GLF_dead2c2, bool(bvec4(_GLF_IDENTITY(!GLF_dead2c2, bool(bvec2(!GLF_dead2c2, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))), true, false, true)))) {
        return GLF_dead2defaultColor();
    }
    bool GLF_dead2c3 = GLF_dead2pos.y - GLF_dead2setting.x < GLF_dead2square.y;
    if (!GLF_dead2c3) {
        return GLF_dead2defaultColor();
    }
    bool GLF_dead2c4 = GLF_dead2pos.y + GLF_dead2setting.x > GLF_dead2square.y;
    if (!GLF_dead2c4) {
        return GLF_dead2defaultColor();
    }
    bool GLF_dead2c5 = GLF_dead2pos.x - (GLF_dead2setting.x - GLF_dead2setting.y) < GLF_dead2square.x;
    if (!GLF_dead2c5) {
        return GLF_dead2computeColor(GLF_dead2setting.z / (5.0 * float(findMSB(GLF_dead2msb8))), GLF_dead2pos);
    }
    bool GLF_dead2c6 = _GLF_IDENTITY(GLF_dead2pos.x + (GLF_dead2setting.x - GLF_dead2setting.y), (GLF_dead2pos.x + (GLF_dead2setting.x - GLF_dead2setting.y)) / 1.0) > GLF_dead2square.x;
    if (!GLF_dead2c6) {
        return GLF_dead2computeColor(GLF_dead2setting.z / (5.0 * float(findMSB(GLF_dead2msb8))), GLF_dead2pos);
    }
    bool GLF_dead2c7 = GLF_dead2pos.y - (GLF_dead2setting.x - GLF_dead2setting.y) < GLF_dead2square.y;
    if (!GLF_dead2c7) {
        return GLF_dead2computeColor(GLF_dead2setting.z / (5.0 * float(findMSB(GLF_dead2msb8))), GLF_dead2pos);
    }
    bool GLF_dead2c8 = _GLF_IDENTITY(GLF_dead2pos.y + (GLF_dead2setting.x - GLF_dead2setting.y) > GLF_dead2square.y, bool(bool(GLF_dead2pos.y + (GLF_dead2setting.x - GLF_dead2setting.y) > GLF_dead2square.y)));
    if (!GLF_dead2c8) {
        return GLF_dead2computeColor(GLF_dead2setting.z / (5.0 * float(_GLF_IDENTITY(findMSB(GLF_dead2msb8), (findMSB(GLF_dead2msb8)) | (findMSB(GLF_dead2msb8))))), GLF_dead2pos);
    }
    return GLF_dead2defaultColor();
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

bool checkSwap(float a, float b) {
    return gl_FragCoord.y < _GLF_IDENTITY(resolution.y, mix(float(_GLF_FUZZED(-245.850)), float(resolution.y), bool(true))) / 2.0 ? a > b : a < b;
}

vec4 _GLF_outlined_0(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_1(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_2(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_3() {
    return vec4(9991.9214, -7.1, -4635.6310, 0.5);
}

vec4 _GLF_outlined_4() {
    return vec4(8.2, -3528.9779, 8.2, -57.44);
}

vec4 _GLF_outlined_5(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_6() {
    return abs(pow(vec4(5.0, -254.833, 938.865, -526.095), vec4(-482.136, _GLF_IDENTITY(10.87, float(_GLF_IDENTITY(_GLF_IDENTITY(vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))), clamp(vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))), vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))), vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))))), (_GLF_IDENTITY(vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))), clamp(vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))), vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)))), vec3(10.87, 1.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) + vec3(0.0, 0.0, 0.0)))), -1468.6715, -627.218)));
}

vec4 _GLF_outlined_7() {
    return (+vec4(7.8, -3105.3772, -1463.6179, 577.110));
}

void main() {
    float data[10];
    for (int i = 0; i < 10; i++) {
        switch (_GLF_SWITCH((int(_GLF_ZERO(0.0, injectionSwitch.x)) | 0))) {
            case 46:
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = reflect(vec4(-5.8, -6.7, 10.88, _GLF_IDENTITY(-61.13, (true ? (-61.13) : _GLF_FUZZED(GLF_dead2time)))), ldexp(vec4(418.246, -2.7, -8087.8918, 6710.3437), (ivec4(98731, 85780, -47049, 61531) % ivec4(-62559, 10281, 33130, 79577))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) - vec4(0.0, 0.0, 0.0, 0.0)))).x >= tan(abs(_GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (0.0) + 0.0)) - 0.0))))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    mat3 _GLF_SWITCH_0_0v[89], _GLF_SWITCH_0_1v;
                    {
                        while ((i != (-2942))) {
                            {
                            }
                            int _GLF_SWITCH_0_2v, _GLF_SWITCH_0_3v, _GLF_SWITCH_0_4v;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead0iterationCap = _GLF_FUZZED(i);
                            {
                                donor_replacementGLF_dead0iterationCap += 1;
                            }
                        }
                        for (-76600; (_GLF_IDENTITY(notEqual(vec2(-0.8, 734.226), resolution) == bvec2(true, true), !(!(notEqual(vec2(_GLF_IDENTITY(-0.8, sqrt(1.0) * (-0.8)), 734.226), resolution) == bvec2(true, true))))); bvec3(false, false, _GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, _GLF_IDENTITY(_GLF_IDENTITY(true, true && (true)) && (_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (false))), (_GLF_IDENTITY(true, true && (true)) && (_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (false)))) && true))))).ts) {
                            for (bool _GLF_SWITCH_0_5v, _GLF_SWITCH_0_6v[49], _GLF_SWITCH_0_7v; (_GLF_SWITCH_0_5v || _GLF_SWITCH_0_7v); bvec4(_GLF_SWITCH_0_5v, bvec3(bvec2(true, false), false)).bb) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            vec3 _GLF_SWITCH_0_8v;
                            ivec2(-45494, 94055);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead1th = _GLF_FUZZED(9.7);
                                {
                                    donor_replacementGLF_dead1th = -donor_replacementGLF_dead1th;
                                }
                            }
                            while ((uvec4(53437u, 27191u, 22816u, 99712u) != uvec4(113215u, 199615u, 139298u, 28002u))) {
                                if ((ivec4(2405, 14371, 16008, 7641) == ivec4(-17901, 80874, -19709, 96947))) {
                                    mat3 _GLF_SWITCH_0_9v, _GLF_SWITCH_0_10v[24];
                                    continue;
                                    1541;
                                } else {
                                    -64.29;
                                    103959u;
                                    continue;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-922.130, -8.8, 1555.9459, -1.5);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).x >= 0.0)))) {
                                            _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) + vec4(0.0, 0.0, 0.0, 0.0));
                                        }
                                    }
                                    70020u;
                                    ivec3 _GLF_SWITCH_0_11v;
                                    discard;
                                    uvec4 _GLF_SWITCH_0_12v, _GLF_SWITCH_0_13v;
                                    ivec2(25160, 93449);
                                    mat4(-7.3, -6.8, -912.832, -43.74, 7.2, 16.14, -7080.6268, 7.5, 5984.2618, -45.81, -721.812, 6.9, -13.91, -9.4, -78.69, 306.738);
                                }
                                discard;
                            }
                            {
                                uvec4(92217u, 44641u, 20785u, 87292u);
                            }
                            {
                                for (injectionSwitch; isinf(285.781); (ivec2(-32802, -510) % ivec2(-2632, -68103))) {
                                    return;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !_GLF_IDENTITY((!(false)), !(!((!(false)))))))) {
                                        break;
                                    }
                                    uvec2 _GLF_SWITCH_0_14v[85], _GLF_SWITCH_0_15v, _GLF_SWITCH_0_16v;
                                    mat2x4 _GLF_SWITCH_0_17v, _GLF_SWITCH_0_18v, _GLF_SWITCH_0_19v[69];
                                    mat2 _GLF_SWITCH_0_20v, _GLF_SWITCH_0_21v;
                                    mat4 _GLF_SWITCH_0_22v[84], _GLF_SWITCH_0_23v[40];
                                    mat4x3(-3.3, 14.79, -3369.3458, -61.70, -2.8, _GLF_IDENTITY(-3.1, (-3.1) + 0.0), 955.397, 8.9, -8268.7054, 0.9, 613.063, 0.6);
                                    mat3(_GLF_SWITCH_0_17v);
                                    ivec4 _GLF_SWITCH_0_24v;
                                    mat4x3 _GLF_SWITCH_0_25v, _GLF_SWITCH_0_26v, _GLF_SWITCH_0_27v[52];
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(14.40, _GLF_IDENTITY(-314.546, _GLF_IDENTITY(float(mat3x2(-314.546, 1.0, 1.0, 1.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y))), (float(mat3x2(-314.546, 1.0, 1.0, 1.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y)))) * 1.0)), 9912.3740, -2.9);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        if (true) {
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            mat4(mat2x3(847.344, 486.687, -1.9, 2.1, 5.9, 50.07));
                            mat4 _GLF_SWITCH_0_28v, _GLF_SWITCH_0_29v;
                            for (180.774; (_GLF_IDENTITY(ivec2(96249, 2266) != _GLF_IDENTITY(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))), _GLF_IDENTITY(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))), ~(~(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))))))), _GLF_IDENTITY(bool(bvec2(ivec2(96249, 2266) != _GLF_IDENTITY(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))), _GLF_IDENTITY(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))), ~(~(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))))))), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), _GLF_IDENTITY(bool(bvec4(bool(bvec2(ivec2(96249, 2266) != _GLF_IDENTITY(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))), _GLF_IDENTITY(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))), ~(~(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))))))), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true, false)), (bool(bvec4(bool(bvec2(ivec2(96249, 2266) != _GLF_IDENTITY(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))), _GLF_IDENTITY(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))), ~(~(ivec2(ivec2(findMSB(ivec2(68015, _GLF_IDENTITY(42606, (42606) | (42606)))))))))), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true, false))) || false)))); (clamp(ivec2(-86243, -32695), i, i) & ivec2(-43455, 25017))) {
                                if (((ivec3(-74545, -85360, 12671) * (-73549)) != ivec3(85437, 33885, -13285))) {
                                    return;
                                } else {
                                    vec3 _GLF_SWITCH_0_30v, _GLF_SWITCH_0_31v[2];
                                    _GLF_IDENTITY(bvec2(true, false), bvec2(bvec3(bvec2(true, false), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))));
                                    ((_GLF_IDENTITY(93647u == 48229u, bool(bvec4(_GLF_IDENTITY(93647u == 48229u, bool(bvec4(93647u == 48229u, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true, false))), false, true, false)))) ? ivec3(1690, 9147, -29540) : findLSB((uvec3(191040u, 195093u, 68140u) / 40153u)));
                                    mat2x4 _GLF_SWITCH_0_32v[73], _GLF_SWITCH_0_33v;
                                    (ivec2(_GLF_IDENTITY(62276, (62276) >> ((-57106) & 0)), -19994) - ivec2(-52277, -16623));
                                    ivec3(37248, 77619, -68223);
                                }
                                mat4x3 _GLF_SWITCH_0_34v, _GLF_SWITCH_0_35v, _GLF_SWITCH_0_36v;
                                (51173u ^ uvec2(161704u, 87460u)[1]);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    return;
                                }
                                ;
                                ivec4(-8398, 26035, 57675, -67768);
                                bvec3 _GLF_SWITCH_0_37v, _GLF_SWITCH_0_38v;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    bool donor_replacementGLF_dead2c2 = _GLF_FUZZED((((-57714) << 49030) > (-93100)));
                                    if (!donor_replacementGLF_dead2c2) {
                                        ;
                                    }
                                }
                            }
                            mat3 _GLF_SWITCH_0_39v, _GLF_SWITCH_0_40v, _GLF_SWITCH_0_41v;
                            if (false) {
                                do {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(76.90, 185.184, 3.3, 4.8);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false || (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))), bool(bvec2(_GLF_IDENTITY(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false || (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))), _GLF_IDENTITY(bool(bvec4(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false || (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))), false, false, true)), bool(bvec4(bool(bvec4(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false || (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))), false, false, true)), _GLF_IDENTITY(false, (false) || false), _GLF_IDENTITY(false, !(!(false))), true)))), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    continue;
                                    mat2(-8.0, 9869.5173, -_GLF_IDENTITY(546.405, (546.405) + _GLF_IDENTITY(dot(vec3(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)), vec3(1.0, 1.0, 1.0)))), 1.5);
                                    (ivec4(-95338, -18039, 21190, 37992) << (i >> (-13506)));
                                } while ((injectionSwitch != vec2(-3871.6528, 146.301)));
                                (_GLF_SWITCH_0_40v != _GLF_SWITCH_0_41v);
                                while (false) {
                                    discard;
                                    continue;
                                    continue;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = tanh(vec4(98.40, _GLF_IDENTITY(-0.5, mix(float(_GLF_FUZZED(3.3)), float(-0.5), bool(true))), -983.315, _GLF_IDENTITY(8.5, mix(float(8.5), float(_GLF_FUZZED(-45.52)), bool(false)))));
                                        if (_GLF_DEAD(false)) {
                                            bool donor_replacementGLF_dead2c1 = _GLF_FUZZED(false);
                                            if (!donor_replacementGLF_dead2c1) {
                                                ;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) * vec4(1.0, 1.0, 1.0, 1.0));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(_GLF_IDENTITY(!(injectionSwitch.x > injectionSwitch.y), !(!(!(injectionSwitch.x > injectionSwitch.y)))))))))) {
                                                vec3 GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v;
                                                float donor_replacementGLF_dead1th = _GLF_FUZZED(907.633);
                                                GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.x = donor_replacementGLF_dead1th;
                                                vec2 donor_replacementGLF_dead1v = _GLF_FUZZED(injectionSwitch);
                                                GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.yz = donor_replacementGLF_dead1v;
                                                if (GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.yz.x < 0.0) {
                                                    GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.x = 1.0 - GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.x;
                                                }
                                            }
                                        }
                                    }
                                    ivec2 _GLF_SWITCH_0_42v, _GLF_SWITCH_0_43v, _GLF_SWITCH_0_44v;
                                    ((-23311) / _GLF_IDENTITY((-13595), ((-13595)) | (_GLF_IDENTITY((-13595), ((-13595)) >> 0))));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (vec4(-_GLF_IDENTITY(2371.7531, mix(float(2371.7531), float(_GLF_FUZZED(-6.9)), bool(false))), -608.687, -3.9, -6.5) + (-6230.3221));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    return;
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec2 donor_replacementGLF_dead1a = _GLF_FUZZED(vec2(16.38, -5.1));
                                        float donor_replacementGLF_dead1th = _GLF_FUZZED(cos(-5.3));
                                        if (donor_replacementGLF_dead1a.y < donor_replacementGLF_dead1a.x) {
                                            donor_replacementGLF_dead1th = 0.5 - donor_replacementGLF_dead1th;
                                        }
                                    }
                                    mat2 _GLF_SWITCH_0_45v;
                                    discard;
                                }
                            } else {
                                183316u;
                                {
                                    uvec4(187784u, 61539u, 38256u, 34727u);
                                    mat3x4(-5.5, -490.580, 68.99, -12.85, 8.6, 6.8, -1.7, -55.51, 0.6, -5436.9230, 4731.9568, 0.6);
                                    mat3 _GLF_SWITCH_0_46v[1], _GLF_SWITCH_0_47v;
                                    ivec2 _GLF_SWITCH_0_48v;
                                    bvec3 _GLF_SWITCH_0_49v;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = unpackUnorm4x8(156000u);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    mat3 _GLF_SWITCH_0_50v, _GLF_SWITCH_0_51v;
                                    _GLF_SWITCH_0_1v;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        int donor_replacementGLF_dead3i = _GLF_FUZZED(floatBitsToInt(7828.6625));
                                        if (donor_replacementGLF_dead3i >= int(GLF_dead3resolution.x)) {
                                            break;
                                        }
                                    }
                                    vec3(-0.6, 2.7, 9.5);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_0(_GLF_color);
                                        _GLF_color = vec4(-8.3, -2042.6428, -4.5, 4672.4875);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                while ((fwidth(9.1) > (-2462.7519))) {
                                    vec3 _GLF_SWITCH_0_52v, _GLF_SWITCH_0_53v, _GLF_SWITCH_0_54v;
                                    break;
                                    return;
                                    uvec3 _GLF_SWITCH_0_55v, _GLF_SWITCH_0_56v, _GLF_SWITCH_0_57v[9];
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    bool donor_replacementGLF_dead2c4 = _GLF_FUZZED(((min(ivec3(-58374, -66778, 96416), i) | ivec3(-63950, -94274, -27147)) != (ivec3(-60807, 74368, -29211) % (~(-4793)))));
                                    if (!donor_replacementGLF_dead2c4) {
                                        ;
                                    }
                                }
                                bitCount(min(98418u, 187299u));
                                {
                                    float _GLF_SWITCH_0_58v[10];
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead2b_b = clamp(GLF_dead2b_b * float(bitCount(i)) * 3.0, float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), float(bitCount(i)));
                                        }
                                    }
                                }
                                if ((uvec3(179985u, 142823u, 51785u) == uvec3(91434u, 152420u, 89302u))) {
                                    discard;
                                }
                            }
                            if ((8.8 == floor(-3.3))) {
                                mat4x3 _GLF_SWITCH_0_59v, _GLF_SWITCH_0_60v, _GLF_SWITCH_0_61v[64];
                                (9.7 - mat3x4(-0.6, 7.8, 73.89, -47.96, 104.617, 5.8, -971.606, 3913.8800, -3180.5009, -7552.4841, -_GLF_IDENTITY(0.2, clamp(0.2, 0.2, _GLF_IDENTITY(0.2, mix(float(_GLF_FUZZED(-83.86)), float(0.2), bool(true))))), -9825.7309));
                                uint _GLF_SWITCH_0_62v, _GLF_SWITCH_0_63v, _GLF_SWITCH_0_64v;
                            }
                        } else {
                            if (false) {
                                mat4(_GLF_IDENTITY(-9870.0497, clamp(-9870.0497, -9870.0497, -9870.0497)), -_GLF_IDENTITY(9.8, min(9.8, _GLF_IDENTITY(9.8, clamp(_GLF_IDENTITY(_GLF_IDENTITY(9.8, (9.8) / 1.0), sin(0.0) + (_GLF_IDENTITY(9.8, (9.8) / 1.0))), 9.8, 9.8)))), 6572.3665, -7868.6540, -4.8, -4.6, 6597.8221, 8.7, -468.245, -_GLF_IDENTITY(5301.1058, (_GLF_IDENTITY(5301.1058, 1.0 * (5301.1058))) / _GLF_ONE(1.0, injectionSwitch.y)), 159.284, -0.4, 7.7, 0.6, -2.0, -15.69);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead0xCoord = _GLF_FUZZED(acosh(distance(resolution, resolution)));
                                    float donor_replacementGLF_dead0yCoord = _GLF_FUZZED(exp2(9.2));
                                    {
                                        ;
                                    }
                                }
                                mat2x3(9.9, -2466.7610, 4.5, 3.9, -_GLF_IDENTITY(6685.8442, 1.0 * (_GLF_IDENTITY(6685.8442, (false ? _GLF_FUZZED(-7.8) : 6685.8442)))), -12.83);
                            } else {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = log(vec4(8.1, -3884.7731, 2.5, 983.200));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        mat4x2(mat3(_GLF_IDENTITY(4.3, mix(float(_GLF_FUZZED(1.8)), float(4.3), bool(true))), -5.3, 5407.9319, -76.39, 2.7, 7077.9469, 83.29, -1397.2547, 26.04));
                        -39734;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_IDENTITY((vec4(-0.0, 137.737, -58.31, 5.1)), vec4(1.0, 1.0, 1.0, 1.0) * ((vec4(-0.0, 137.737, -58.31, 5.1))));
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead2position = _GLF_FUZZED(injectionSwitch);
                                if (abs(donor_replacementGLF_dead2position.y - donor_replacementGLF_dead2position.x) < 0.5) {
                                    GLF_dead2b_b = clamp(GLF_dead2b_b * float(bitCount(i)) * 3.0, float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), float(bitCount(i)));
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        discard;
                        atan(injectionSwitch);
                    }
                    if (false) {
                        bvec4(_GLF_IDENTITY(false, (false) || false), true, false, true);
                        for (vec4(80.91, 3626.5457, 423.255, 3.5); (false ^^ true); mat4(mat4x3(-2.2, 4.1, -7.2, 38.56, -64.08, -542.631, -7.8, -5.9, 287.877, -0.2, 2.2, -9.3))) {
                            while ((!false)) {
                                return;
                                vec4(839.846, 0.3, _GLF_IDENTITY(463.830, float(_GLF_IDENTITY(mat4x2(463.830, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0), (mat4x2(463.830, 1.0, _GLF_IDENTITY(1.0, (1.0) - _GLF_ZERO(0.0, injectionSwitch.x)), 0.0, 0.0, 0.0, 0.0, 0.0)) - mat4x2(_GLF_IDENTITY(0.0, (0.0) - sqrt(0.0)), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))), -87.19);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(63.26, -0.9, 891.526, 4.9);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_IDENTITY(_GLF_DEAD(false), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_DEAD(false)))) {
                                    continue;
                                }
                                greaterThanEqual(ivec4(-20974, -78394, _GLF_IDENTITY(79752, (_GLF_IDENTITY(79752, _GLF_IDENTITY(int(int(_GLF_IDENTITY(79752, (79752) | (79752)))), 0 | (int(int(_GLF_IDENTITY(79752, (79752) | (79752)))))))) | (_GLF_IDENTITY(79752, (79752) ^ 0))), -98096), _GLF_IDENTITY(findLSB(ivec4(-33831, 81336, -97737, 18624)), min(findLSB(ivec4(-33831, 81336, -97737, 18624)), findLSB(ivec4(-33831, 81336, -97737, 18624)))));
                                while (false) {
                                    continue;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = dFdx(exp(vec4(655.199, -_GLF_IDENTITY(92.20, (92.20) - length(vec3(_GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0, 0.0))), 6.4, 326.433)));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-968.454)), float(0.0), bool(true))))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        break;
                                    }
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead2pos = _GLF_FUZZED(injectionSwitch);
                                        vec3 donor_replacementGLF_dead2setting = _GLF_FUZZED(vec3(3.3, -3421.2121, 2014.6130));
                                        {
                                            ;
                                        }
                                    }
                                    vec3(-954.669, -3.0, _GLF_IDENTITY(-3.6, (-3.6) * 1.0));
                                    ;
                                    (_GLF_IDENTITY(vec3(-7.3, -2217.3370, 1.9), (false ? _GLF_FUZZED(vec3(515.366, 42.94, 9530.9920)) : vec3(-7.3, -2217.3370, 1.9))) - vec3(-585.889, _GLF_IDENTITY(-7.7, (-7.7) / 1.0), 6121.3710));
                                }
                            }
                        }
                        for (vec2 _GLF_SWITCH_0_65v[54], _GLF_SWITCH_0_66v[9], _GLF_SWITCH_0_67v; true; (-(mat3x2(-2.3, 6.1, 995.214, 6.1, 0.2, -5503.7782) * (-730.293)))) {
                            {
                                mat3(mat4x3(vec3(-4.1, -2219.0077, -646.485), vec3(-4.2, 9.5, -88.13), vec3(_GLF_IDENTITY(0.6, mix(float(_GLF_FUZZED(7961.0612)), float(0.6), bool(true))), 139.339, 9239.5247), vec3(31.97, -9087.8307, -1.8)));
                                mat4(-9931.0337, 3.0, -96.28, -4.4, -65.34, -8469.6523, -205.439, -3824.7166, -181.363, -3.8, 19.41, _GLF_IDENTITY(27.98, (27.98) + 0.0), 8650.4809, 50.94, 8.1, 3.9);
                                if (_GLF_DEAD(false)) {
                                    if (abs(_GLF_SWITCH_0_67v.y - _GLF_IDENTITY(_GLF_SWITCH_0_67v.x, clamp(_GLF_SWITCH_0_67v.x, _GLF_SWITCH_0_67v.x, _GLF_IDENTITY(_GLF_SWITCH_0_67v.x, mix(float(_GLF_SWITCH_0_67v.x), float(_GLF_FUZZED(57.96)), bool(false)))))) < 0.5) {
                                        GLF_dead2b_b = clamp(GLF_dead2b_b * float(bitCount(i)) * 3.0, float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), float(bitCount(i)));
                                    }
                                }
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        float donor_replacementGLF_dead1th = _GLF_FUZZED(degrees(347.768));
                                        {
                                            donor_replacementGLF_dead1th = -donor_replacementGLF_dead1th;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_color));
                                    _GLF_color = vec4(-570.255, vec2(-7.4, 2550.7853), dot(smoothstep(vec3(-3.4, 4364.6678, 9.8), vec3(61.32, 303.797, -91.13), vec3(698.791, 116.337, -73.93)), vec3(237.596, -7142.1259, 3.7)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ((uvec2(122960u, 117522u) | uvec2(88401u, 135492u)) != uvec2(122542u, 199437u));
                                bvec4(false, false, false, true);
                                while ((mat3x2(-65.61, -5.5, 7.7, -645.974, 21.98, -59.37) == mat3x2(-5.4, 7070.5629, -3517.5869, 3.9, -_GLF_IDENTITY(5.9, float(mat4x3(_GLF_IDENTITY(5.9, (5.9) + 0.0), 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 1.0, 0.0, 1.0))), -0.8))) {
                                    ivec3 GLF_merged2_0_2_17_2_1_17_GLF_SWITCH_0_68v_GLF_SWITCH_0_71v;
                                    ivec2 _GLF_SWITCH_0_68v, _GLF_SWITCH_0_69v[57], _GLF_SWITCH_0_70v[87];
                                    GLF_merged2_0_2_17_2_1_17_GLF_SWITCH_0_68v_GLF_SWITCH_0_71v.xy = _GLF_SWITCH_0_68v;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                    }
                                    mat4x3(mat2x3(4.2, 838.480, -3.4, 11.70, -14.36, -406.866));
                                    bvec2(false, false);
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead1a = _GLF_FUZZED(vec2(7.8, 42.22));
                                        float donor_replacementGLF_dead1z = _GLF_FUZZED(_GLF_IDENTITY(-63.61, (-63.61) + 0.0));
                                        {
                                            donor_replacementGLF_dead1z = donor_replacementGLF_dead1a.y / donor_replacementGLF_dead1a.x;
                                        }
                                    }
                                    int _GLF_SWITCH_0_71v, _GLF_SWITCH_0_72v;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(95.02, 9.1, -2130.2783, 5.9);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_IDENTITY(GLF_merged2_0_2_17_2_1_17_GLF_SWITCH_0_68v_GLF_SWITCH_0_71v.z = _GLF_SWITCH_0_71v, (GLF_merged2_0_2_17_2_1_17_GLF_SWITCH_0_68v_GLF_SWITCH_0_71v.z = _GLF_SWITCH_0_71v) >> 0);
                                    bvec4 _GLF_SWITCH_0_73v[67], _GLF_SWITCH_0_74v, _GLF_SWITCH_0_75v;
                                    ((0.7 * mat3(-532.525, -_GLF_IDENTITY(2.0, (false ? _GLF_FUZZED(dot((92.70 / injectionSwitch), injectionSwitch)) : 2.0)), 18.97, -3952.1664, -66.20, 6482.9347, 1111.4392, -84.10, 4371.4747)) * mat2x3(-4131.9842, -8.7, -9551.1729, -5.7, 7.8, 6.6));
                                    float _GLF_SWITCH_0_76v, _GLF_SWITCH_0_77v[55], _GLF_SWITCH_0_78v;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(dFdxFine(_GLF_color)) : _GLF_IDENTITY((_GLF_outVarBackup_GLF_color = _GLF_color), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(_GLF_color) : (_GLF_outVarBackup_GLF_color = _GLF_color)))));
                                    if (_GLF_DEAD(false)) {
                                        {
                                            break;
                                        }
                                    }
                                    _GLF_color = vec4(5369.6685, -3.6, -2.5, -9.8);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.y >= 0.0), ((gl_FragCoord.y >= 0.0)) && true)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(fwidthCoarse((_GLF_IDENTITY(-vec3(9690.9814, -6045.0621, 688.745), (-vec3(9690.9814, -6045.0621, 688.745)) / vec3(1.0, 1.0, 1.0)))), 7.3);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outlined_1(_GLF_outVarBackup_GLF_color);
                                }
                            }
                        }
                        discard;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-11.77, 1.0, -16.96, -2594.5808);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, float(mat2x3(injectionSwitch.x, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)), tan(0.0), 1.0, 0.0))) < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outlined_2(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        while (bvec2(true, true).r) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead0iterationCap = _GLF_FUZZED(bitCount(-72605));
                                    {
                                        donor_replacementGLF_dead0iterationCap += 1;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = atan(sin(vec4(-21.89, -3882.8006, 1.2, 77.92)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            mat4x2(-4.5, -5357.6129, -8400.8485, 8.4, 0.9, -42.97, 8.3, -438.010);
                            lessThan(uvec2(6554u, _GLF_IDENTITY(59623u, uint(uint(59623u)))), (82950u | _GLF_IDENTITY(uvec2(_GLF_IDENTITY(65922u, min(65922u, 65922u)), 174055u), (uvec2(_GLF_IDENTITY(65922u, min(65922u, 65922u)), 174055u)) * uvec2(1u, 1u))));
                            break;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    {
                                        break;
                                    }
                                }
                                _GLF_color = vec4(-5.3, 4.6, 4.9, -7.4);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_IDENTITY(_GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (true ? _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3])) : _GLF_FUZZED(_GLF_color))), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : (_GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (true ? _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3])) : _GLF_FUZZED(_GLF_color))))));
                                }
                            }
                            mix(injectionSwitch, vec2(1.5, 35.17), injectionSwitch);
                            return;
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead2c1 = _GLF_FUZZED(all(bvec3(true, true, true)));
                                if (!donor_replacementGLF_dead2c1) {
                                    ;
                                }
                            }
                            vec3 _GLF_SWITCH_0_79v;
                            continue;
                            do {
                                for (outerProduct(vec2(5.8, 6.0), vec4(743.533, -3.0, -913.510, -0.7)); false; ivec4(-41765, 20413, 71181, 11537)) {
                                    uvec3 _GLF_SWITCH_0_80v, _GLF_SWITCH_0_81v, _GLF_SWITCH_0_82v;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    mat3x2 _GLF_SWITCH_0_83v, _GLF_SWITCH_0_84v;
                                    return;
                                    discard;
                                    bvec2(false, false);
                                    findMSB(_GLF_IDENTITY(23583u, min(23583u, 23583u)));
                                    _GLF_SWITCH_0_82v;
                                    ivec3(-_GLF_IDENTITY(_GLF_IDENTITY(71409, 0 ^ (_GLF_IDENTITY(71409, (false ? _GLF_FUZZED(63808) : 71409)))), 0 ^ (_GLF_IDENTITY(_GLF_IDENTITY(71409, 0 ^ (_GLF_IDENTITY(71409, (false ? _GLF_FUZZED(63808) : 71409)))), min(_GLF_IDENTITY(71409, 0 ^ (_GLF_IDENTITY(71409, (false ? _GLF_FUZZED(63808) : 71409)))), _GLF_IDENTITY(71409, 0 ^ (_GLF_IDENTITY(71409, (false ? _GLF_FUZZED(63808) : 71409)))))))), _GLF_IDENTITY(-29910, ~(_GLF_IDENTITY(~(-29910), (~(-29910)) * 1))), _GLF_IDENTITY(76506, (76506) | (76506)));
                                    bvec3(true, _GLF_IDENTITY(false, bool(bvec4(false, false, true, false))), false);
                                }
                                for (mat3x2 _GLF_SWITCH_0_85v; false; mix(injectionSwitch, vec2(27.93, -9.7), _GLF_IDENTITY(bvec2(true, true), _GLF_IDENTITY(bvec2(bvec3(_GLF_IDENTITY(bvec2(true, true), bvec2(bvec2(bvec2(true, true)))), true)), bvec2(bvec4(bvec2(bvec3(_GLF_IDENTITY(bvec2(true, true), bvec2(bvec2(bvec2(true, true)))), true)), true, true)))))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (_GLF_IDENTITY(true, bool(bvec3(true, false, true))) ? vec4(3594.2550, -837.836, -9023.6414, -652.600) : vec4(-0.3, -9683.9342, -2.6, 7654.3552));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    uvec3(153376u, 129502u, 81545u);
                                    bvec2(false, true);
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead1th = _GLF_FUZZED(-49.31);
                                    {
                                        donor_replacementGLF_dead1th = 1.0 - donor_replacementGLF_dead1th;
                                    }
                                }
                                mat4x2(mat2(-12.32, -4.6, 654.288, -8.8));
                                bvec2 _GLF_SWITCH_0_86v;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, float(_GLF_IDENTITY(mat3x4(0.0, 0.0, 0.0, sin(0.0), 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0), transpose(transpose(mat3x4(0.0, 0.0, 0.0, sin(0.0), 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0)))))))))) {
                                        {
                                            discard;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_IDENTITY(_GLF_color = vec4(94.85, -835.028, 71.22, -6.8), _GLF_IDENTITY(vec4(0.0, 0.0, 0.0, 0.0), clamp(vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0), _GLF_IDENTITY(vec4(0.0, 0.0, 0.0, 0.0), vec4(mat2x3(vec4(0.0, 0.0, 0.0, 0.0), 0.0, 0.0))))) + (_GLF_color = vec4(94.85, -835.028, 71.22, -6.8)));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_IDENTITY(_GLF_outVarBackup_GLF_color[1], mix(float(_GLF_outVarBackup_GLF_color[1]), float(_GLF_FUZZED(302.166)), bool(false))), _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3]));
                                    }
                                }
                                ((-43195) * ivec3(73739, 33869, 89495));
                                if ((bvec3(true, true, true) != bvec3(false, true, false))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(mat2x3(_GLF_color, abs(0.0), 1.0)));
                                        _GLF_color = _GLF_outlined_3();
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead1a = _GLF_FUZZED(resolution);
                                                float donor_replacementGLF_dead1th = _GLF_FUZZED(75.42);
                                                if (donor_replacementGLF_dead1a.y < donor_replacementGLF_dead1a.x) {
                                                    donor_replacementGLF_dead1th = 0.5 - donor_replacementGLF_dead1th;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                vec2 donor_replacementGLF_dead2position = _GLF_FUZZED(asinh(vec2(-34.72, 505.777)));
                                                if (abs(donor_replacementGLF_dead2position.y - donor_replacementGLF_dead2position.x) < 0.5) {
                                                    GLF_dead2b_b = clamp(GLF_dead2b_b * float(bitCount(i)) * 3.0, float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), float(bitCount(i)));
                                                }
                                            }
                                        }
                                    }
                                    mat4 _GLF_SWITCH_0_87v[69], _GLF_SWITCH_0_88v;
                                    bvec3(true, false, true)[0];
                                    (mat3x2(495.548, 4.2, 495.354, -1.5, -17.99, -1606.7055) / mat3x2(-7.8, 30.80, 6.4, _GLF_IDENTITY(-53.79, (-53.79) / 1.0), _GLF_IDENTITY(29.22, max(29.22, 29.22)), 5.8));
                                    continue;
                                    ivec3 _GLF_SWITCH_0_89v, _GLF_SWITCH_0_90v[86];
                                    _GLF_color;
                                    mat2x3 _GLF_SWITCH_0_91v, _GLF_SWITCH_0_92v;
                                    log2(injectionSwitch);
                                }
                                ;
                            } while (all(bvec3(false, _GLF_IDENTITY(false, (false) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))), true)));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                        bvec2 _GLF_SWITCH_0_93v, _GLF_SWITCH_0_94v[1], _GLF_SWITCH_0_95v[91];
                    }
                    bvec2(false, false);
                    uvec2 _GLF_SWITCH_0_96v[5], _GLF_SWITCH_0_97v, _GLF_SWITCH_0_98v;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_IDENTITY(_GLF_color = vec4(68.00, 7.0, 92.15, 6.9), tan(vec4(0.0, 0.0, 0.0, 0.0)) + (_GLF_color = vec4(68.00, 7.0, 92.15, 6.9)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, min(_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, _GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)))), gl_FragCoord)).y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    max(uvec4(125121u, 147018u, 149095u, 67062u), 163753u);
                    return;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead0c_im = _GLF_FUZZED(_GLF_IDENTITY(4.2, max(4.2, 4.2)));
                        float donor_replacementGLF_dead0c_re = _GLF_FUZZED(length(vec3(-6.6, -25.89, -1.2)));
                        int donor_replacementGLF_dead0k = _GLF_FUZZED(i);
                        float donor_replacementGLF_dead0x = _GLF_FUZZED(uintBitsToFloat(141955u));
                        float donor_replacementGLF_dead0y = _GLF_FUZZED(mod(radians(-10.00), fwidthFine(50.82)));
                        {
                            if (donor_replacementGLF_dead0x * donor_replacementGLF_dead0x + donor_replacementGLF_dead0y * donor_replacementGLF_dead0y > 4.0) {
                                break;
                            }
                            float GLF_dead0x_new = donor_replacementGLF_dead0x * donor_replacementGLF_dead0x - donor_replacementGLF_dead0y * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_re;
                            donor_replacementGLF_dead0y = 2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im;
                            donor_replacementGLF_dead0x = GLF_dead0x_new;
                            i++;
                            donor_replacementGLF_dead0k++;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_4();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outlined_5(_GLF_outVarBackup_GLF_color);
                    }
                }
            case 52:
                _GLF_color;
            case 0:
            case 85:
            case 81:
                data[i] = float(10 - i) * injectionSwitch.y;
                break;
            case 27:
                for (uint(true); (mat2x4(-866.157, 33.00, 8.3, -82.33, 8.6, 1072.9995, 4443.4243, -313.140) == mat2x4(7.9, -56.55, 886.070, -8.5, -53.43, -1559.5185, -5.5, -5.4)); mat3x4(5977.2828, 2.4, 18.86, -2.5, -7709.9344, -7.4, 6.3, -3.3, 976.700, _GLF_IDENTITY(9363.8393, clamp(9363.8393, 9363.8393, 9363.8393)), 55.66, -5464.6354)) {
                    return;
                    mat3 _GLF_SWITCH_0_99v, _GLF_SWITCH_0_100v[96], _GLF_SWITCH_0_101v;
                    (_GLF_IDENTITY(abs(-421.110) + vec4(-8.1, 89.04, -7.9, 7518.9371), vec4(mat2(abs(-421.110) + vec4(-8.1, 89.04, -7.9, 7518.9371)))));
                    do {
                        clamp(uvec2(_GLF_IDENTITY(4240u, ~(~(4240u))), 169637u), 16736u, 177386u);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-3.8, -_GLF_IDENTITY(546.372, 1.0 * (546.372)), 9552.3739, 5158.7932);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } while (true);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                        float donor_replacementGLF_dead0c_im = _GLF_FUZZED(length(vec3(68.89, 8.4, -6.0)));
                        float donor_replacementGLF_dead0c_re = _GLF_FUZZED(injectionSwitch[0]);
                        float donor_replacementGLF_dead0x = _GLF_FUZZED(8655.9741);
                        float donor_replacementGLF_dead0y = _GLF_FUZZED(cos(-7.9));
                        {
                            if (donor_replacementGLF_dead0x * donor_replacementGLF_dead0x + donor_replacementGLF_dead0y * donor_replacementGLF_dead0y > 4.0) {
                                break;
                            }
                            float GLF_dead0x_new = donor_replacementGLF_dead0x * donor_replacementGLF_dead0x - donor_replacementGLF_dead0y * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_re;
                            donor_replacementGLF_dead0y = _GLF_IDENTITY(2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im, float(_GLF_IDENTITY(mat3x4(2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im, 1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, abs(0.0), 1.0, 1.0, 0.0, 1.0, 1.0), mat3x4(mat3x4(mat3x4(2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im, 1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, abs(0.0), 1.0, 1.0, 0.0, 1.0, 1.0))))));
                            donor_replacementGLF_dead0x = GLF_dead0x_new;
                            i++;
                            i++;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_6();
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (false) {
                        for (mat3x2 _GLF_SWITCH_0_102v[68], _GLF_SWITCH_0_103v[26], _GLF_SWITCH_0_104v; (bvec3(true, false, true) != bvec3(true, true, false)); ((-25698) * floatBitsToInt(-252.389))) {
                            mat2x4 _GLF_SWITCH_0_105v, _GLF_SWITCH_0_106v, _GLF_SWITCH_0_107v[8];
                            for (bvec3(true, true, true); bool(58309u); mat4x3(77.07, -7.7, -975.652, 37.46, -3534.6788, -1785.3940, _GLF_IDENTITY(431.794, float(vec3(431.794, 0.0, 1.0))), 883.563, -9.0, -1.4, 1.5, 867.068)) {
                                {
                                    continue;
                                    mat2(_GLF_SWITCH_0_101v);
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                        bool donor_replacementGLF_dead2c6 = _GLF_FUZZED(bool((124189u - 171256u)));
                                        vec2 donor_replacementGLF_dead2pos = _GLF_FUZZED(injectionSwitch);
                                        vec3 donor_replacementGLF_dead2setting = _GLF_FUZZED(((-4225.5960) + _GLF_IDENTITY(vec3(-8.3, 7.4, -5.8), max(_GLF_IDENTITY(vec3(-8.3, 7.4, -5.8), mix(vec3((vec3(-8.3, 7.4, -5.8))[0], _GLF_FUZZED(3791.9587), (vec3(-8.3, 7.4, -5.8))[2]), vec3(_GLF_FUZZED(3.3), (vec3(-8.3, 7.4, -5.8))[1], _GLF_FUZZED(-3.2)), bvec3(false, true, false))), _GLF_IDENTITY(vec3(-8.3, 7.4, -5.8), (false ? _GLF_FUZZED(mix(vec3(-270.358, -262.898, -7153.6012), vec3(-99.35, 1.7, 955.010), bvec3(false, false, true))) : vec3(-8.3, 7.4, -5.8)))))));
                                        if (!donor_replacementGLF_dead2c6) {
                                            ;
                                        }
                                    }
                                    mat3x4 _GLF_SWITCH_0_108v, _GLF_SWITCH_0_109v, _GLF_SWITCH_0_110v[61];
                                    ;
                                    return;
                                    continue;
                                }
                                mat2 _GLF_SWITCH_0_111v, _GLF_SWITCH_0_112v, _GLF_SWITCH_0_113v[40];
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead0iterationCap = _GLF_FUZZED(bitfieldReverse(((-93105) % 44541)));
                                    {
                                        donor_replacementGLF_dead0iterationCap += 1;
                                    }
                                }
                                (i * i);
                                return;
                            }
                            discard;
                            while (true) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-34.29, -1.8, 6.3, -4841.1900);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            continue;
                            int _GLF_SWITCH_0_114v, _GLF_SWITCH_0_115v;
                        }
                        mat3x4 _GLF_SWITCH_0_116v[4], _GLF_SWITCH_0_117v;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead0c_im = _GLF_FUZZED(min(28.48, 1.0));
                            float donor_replacementGLF_dead0c_re = _GLF_FUZZED(determinant(mat4(3318.0796, -2.9, 2773.8784, 24.05, -1052.2799, -293.004, 97.97, 8.9, -724.541, 9.0, 6094.9339, -1.1, -7602.9313, 409.961, 17.15, -2.0)));
                            int donor_replacementGLF_dead0iterationCap = _GLF_FUZZED(i);
                            int donor_replacementGLF_dead0k = _GLF_FUZZED(47924);
                            float donor_replacementGLF_dead0x = _GLF_FUZZED(9661.4369);
                            float donor_replacementGLF_dead0y = _GLF_FUZZED(98.19);
                            do {
                                if (donor_replacementGLF_dead0x * donor_replacementGLF_dead0x + donor_replacementGLF_dead0y * donor_replacementGLF_dead0y > 4.0) {
                                    break;
                                }
                                float GLF_dead0x_new = donor_replacementGLF_dead0x * donor_replacementGLF_dead0x - donor_replacementGLF_dead0y * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_re;
                                donor_replacementGLF_dead0y = 2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im;
                                donor_replacementGLF_dead0x = GLF_dead0x_new;
                                i++;
                                donor_replacementGLF_dead0k++;
                            } while (donor_replacementGLF_dead0k < bitfieldInsert(_GLF_IDENTITY(donor_replacementGLF_dead0iterationCap + (257.0 > GLF_dead0resolution.y ? 1 : 0), max(donor_replacementGLF_dead0iterationCap + (257.0 > GLF_dead0resolution.y ? 1 : 0), donor_replacementGLF_dead0iterationCap + (257.0 > GLF_dead0resolution.y ? 1 : 0))), 0, 0, 0));
                        }
                        vec3(45.11, -4.4, 68.61);
                        atan(vec4(2462.8283, 1.3, -4.2, -641.929));
                        if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                            vec2 donor_replacementGLF_dead2center = _GLF_FUZZED(injectionSwitch);
                            vec2 donor_replacementGLF_dead2position = _GLF_FUZZED(resolution);
                            vec3 donor_replacementGLF_dead2result = _GLF_FUZZED((_GLF_IDENTITY(vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1), mix(vec3(_GLF_IDENTITY((vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[0], float(vec3(_GLF_IDENTITY((vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[0], clamp((vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[0], (vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[0], (vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[0])), 1.0, 1.0))), (vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[1], _GLF_FUZZED(-5.9)), vec3(_GLF_FUZZED(-6.1), _GLF_FUZZED(-7.9), (vec3(-7460.1778, 2.1, -2.4) + vec3(2.0, -1.4, -5.1))[2]), bvec3(false, false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))));
                            for (int GLF_dead2i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)); GLF_dead2i >= _GLF_IDENTITY(bitfieldReverse(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), 0 | (_GLF_IDENTITY(bitfieldReverse(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)), 0 | (bitfieldReverse(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1)))))); _GLF_IDENTITY(GLF_dead2i--, (GLF_dead2i--) | 0)) {
                                vec3 GLF_dead2d = _GLF_FUZZED(fract(vec3(762.576, 968.822, -9.6)));
                                GLF_dead2d = GLF_dead2drawShape(donor_replacementGLF_dead2position, donor_replacementGLF_dead2center + vec2(sin(float(GLF_dead2i) / (float(bitCount(i)) * 10.0) + GLF_dead2time) / 4.0 * float(bitCount(i)), float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_dead2i) / 100.0 * float(bitCount(i))), 0.01, float(GLF_dead2i)));
                                if (length(GLF_dead2d) <= float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1))) {
                                    continue;
                                }
                                donor_replacementGLF_dead2result = vec3(GLF_dead2d);
                            }
                        }
                        for ((bitfieldInsert((ivec4(62222, 18520, -80422, -94808)), ivec4(-53640, _GLF_IDENTITY(-21666, (-21666) | (-21666)), _GLF_IDENTITY(-73782, min(-73782, -73782)), -26029), i, min(-90993, i)) & (-67733)); false; fma(injectionSwitch, vec2(62.80, -13.56), injectionSwitch)) {
                            if (_GLF_DEAD(false)) {
                                vec3 GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v;
                                float donor_replacementGLF_dead1th = _GLF_FUZZED(intBitsToFloat(int(-7.3)));
                                GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.x = donor_replacementGLF_dead1th;
                                vec2 donor_replacementGLF_dead1v = _GLF_FUZZED(injectionSwitch);
                                GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.yz = donor_replacementGLF_dead1v;
                                if (GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.yz.x < 0.0) {
                                    GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.x = 1.0 - GLF_merged2_0_1_28_1_2_27donor_replacementGLF_dead1thdonor_replacementGLF_dead1v.x;
                                }
                            }
                            for ((53566u ^ uvec2(150407u, 17314u))[1]; false; (284.912 + vec4(0.0, 151.738, 808.603, _GLF_IDENTITY(16.34, min(16.34, 16.34))))) {
                                for (mat2x3(2.7); false; _GLF_SWITCH_0_99v) {
                                    bvec3(false, true, false);
                                    bvec4 _GLF_SWITCH_0_118v, _GLF_SWITCH_0_119v[42], _GLF_SWITCH_0_120v[40];
                                    max(vec4(0.2, -1.4, -83.05, -7332.9027), _GLF_IDENTITY((length(resolution) * 7.6), 0.0 + ((length(resolution) * 7.6))));
                                    mat2 _GLF_SWITCH_0_121v[60];
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead1th = _GLF_FUZZED(dFdy(62.29));
                                        {
                                            donor_replacementGLF_dead1th = -donor_replacementGLF_dead1th;
                                        }
                                    }
                                    matrixCompMult(mat4x2(-4.0, -5.6, -4.3, -1.1, -5035.3668, 7.0, 4.6, 4.5), (mat4x2(4.7, -467.342, 864.038, _GLF_IDENTITY(-0.1, min(-0.1, -0.1)), -8.2, 25.60, 27.42, 24.57) * mat4(-441.887, 3391.4911, -57.24, -387.112, -301.375, -933.021, -5940.3199, 69.00, 8.1, -332.830, -370.902, 5.2, -158.247, 33.46, -50.25, -6908.4034)));
                                    vec4 _GLF_SWITCH_0_122v;
                                    _GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mat4(-6275.0975, -24.43, 9.3, -_GLF_IDENTITY(743.295, mix(float(743.295), float(_GLF_FUZZED(float(-82276))), bool(false))), 1.4, -_GLF_IDENTITY(7914.9907, (true ? 7914.9907 : _GLF_FUZZED(dFdy(fwidth(628.398))))), -550.931, 3.0, 680.406, -479.010, 3818.3863, -1.5, 3.5, 3322.2500, -0.2, _GLF_IDENTITY(-0.4, float(_GLF_IDENTITY(mat4x2(-0.4, 0.0, determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0)), tan(_GLF_ZERO(0.0, injectionSwitch.x)), 1.0, 1.0, abs(abs(1.0)), 1.0), (true ? mat4x2(-0.4, 0.0, determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0)), tan(_GLF_ZERO(0.0, injectionSwitch.x)), 1.0, 1.0, abs(abs(1.0)), 1.0) : _GLF_FUZZED(mat4x2(1.6, 440.128, -18.07, -6.1, -12.51, 79.33, _GLF_IDENTITY(7490.9556, max(7490.9556, 7490.9556)), 1.8)))))))[0];
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ivec2(13418, 17741);
                                    bvec2 _GLF_SWITCH_0_123v;
                                }
                                ;
                                if (bool(i)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        vec2 donor_replacementGLF_dead2center = _GLF_FUZZED((mat2(-814.845, 90.31, 6742.7776, _GLF_IDENTITY(1.2, min(1.2, 1.2)))[0] * mat2(-5849.1286, -3480.5345, 5091.6575, 1.3)));
                                        vec2 donor_replacementGLF_dead2position = _GLF_FUZZED(mat3x2(80.57, -2299.6002, 1.3, -7.7, 28.98, 9141.9139)[2]);
                                        vec3 donor_replacementGLF_dead2result = _GLF_FUZZED((cos(vec3(-7.5, 1160.6235, 67.73)) / vec3(225.500, _GLF_IDENTITY(83.21, 0.0 + (83.21)), 1430.4233)));
                                        for (int GLF_dead2i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_dead2resolution.x), 0, _GLF_IDENTITY(1, (1) ^ 0))); _GLF_IDENTITY(GLF_dead2i >= bitfieldReverse(bitfieldExtract(int(GLF_dead2resolution.x), 0, _GLF_IDENTITY(1, min(1, 1)))), bool(bvec4(GLF_dead2i >= bitfieldReverse(bitfieldExtract(int(GLF_dead2resolution.x), 0, _GLF_IDENTITY(1, min(1, 1)))), true, false, true))); GLF_dead2i--) {
                                            vec3 GLF_dead2d = _GLF_FUZZED(fract(vec3(762.576, 968.822, -9.6)));
                                            GLF_dead2d = GLF_dead2drawShape(donor_replacementGLF_dead2position, donor_replacementGLF_dead2center + vec2(sin(float(GLF_dead2i) / (float(bitCount(i)) * 10.0) + GLF_dead2time) / 4.0 * float(bitCount(i)), float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1))), vec3(0.01 + sin(_GLF_IDENTITY(float(GLF_dead2i) / 100.0 * float(bitCount(i)), (float(GLF_dead2i) / 100.0 * float(bitCount(i))) - _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(tan(0.0), 1.0, 1.0, 1.0)), dot(vec4(1.0, 0.0, 0.0, 0.0), vec4(tan(0.0), 1.0, 1.0, 1.0))))), 0.01, _GLF_IDENTITY(float(GLF_dead2i), (false ? _GLF_FUZZED(-625.160) : float(GLF_dead2i)))));
                                            if (length(GLF_dead2d) <= float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1))) {
                                                continue;
                                            }
                                            donor_replacementGLF_dead2result = vec3(GLF_dead2d);
                                        }
                                    }
                                    float _GLF_SWITCH_0_124v[38];
                                    mat2 _GLF_SWITCH_0_125v;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = mat2x4(5.0, 0.2, 1.9, _GLF_IDENTITY(7.9, min(7.9, 7.9)), -0.1, 5634.0719, 940.269, -64.09)[1];
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                                while (_GLF_IDENTITY(false, bool(bvec4(false, true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false)))) {
                                    uvec3(82013u, 16326u, 147420u);
                                    mat2 _GLF_SWITCH_0_126v;
                                    break;
                                    uint _GLF_SWITCH_0_127v, _GLF_SWITCH_0_128v[87];
                                    ;
                                    mat3x4(1.1, 7.1, 3.7, -2119.0553, 2.3, -54.39, 8.1, _GLF_IDENTITY(7390.5266, (7390.5266) * _GLF_ONE(1.0, injectionSwitch.y)), -7.1, 0.5, 212.301, -5.1);
                                    uvec4(56105u, 14172u, 136615u, 82853u);
                                }
                                ;
                                return;
                                uvec2(142590u, 98828u);
                                break;
                            }
                            vec3 _GLF_SWITCH_0_129v;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, min(_GLF_IDENTITY(_GLF_color, clamp(_GLF_color, _GLF_color, _GLF_color)), _GLF_color));
                                _GLF_color = vec4(-4.9, 9.2, _GLF_IDENTITY(98.11, mix(_GLF_IDENTITY(float(_GLF_FUZZED(1129.8408)), clamp(float(_GLF_FUZZED(1129.8408)), _GLF_IDENTITY(float(_GLF_FUZZED(1129.8408)), (false ? _GLF_FUZZED(2.0) : float(_GLF_FUZZED(1129.8408)))), float(_GLF_FUZZED(1129.8408)))), float(98.11), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))), 2025.2240);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead1th = _GLF_FUZZED(vec3(40.35, 65.44, 16.16)[0]);
                                    vec2 donor_replacementGLF_dead1v = _GLF_FUZZED(resolution);
                                    if (donor_replacementGLF_dead1v.x < 0.0) {
                                        donor_replacementGLF_dead1th = 1.0 - donor_replacementGLF_dead1th;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            45578u;
                        }
                        do {
                            for (exp(-1.4); false; uvec2(12405u, 78341u)) {
                                return;
                                if ((ivec2(-532, 9262).y >= 66647)) {
                                    continue;
                                    bvec2 _GLF_SWITCH_0_130v[46], _GLF_SWITCH_0_131v;
                                }
                                ;
                                ;
                                mat4(-5.7, -922.136, -9103.4356, -50.27, 1823.9240, 497.216, 9.7, -1.8, -244.501, 1.9, _GLF_IDENTITY(7.0, (7.0) / _GLF_ONE(1.0, injectionSwitch.y)), 0.1, -2860.3343, 4059.8245, 2102.1676, 4.1);
                                while (true) {
                                    bvec3 _GLF_SWITCH_0_132v[90], _GLF_SWITCH_0_133v[62];
                                    mat4 _GLF_SWITCH_0_134v, _GLF_SWITCH_0_135v;
                                    (_GLF_IDENTITY(resolution, vec2(resolution[0], resolution[1])) / (-9022.7182));
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            ;
                                        }
                                    }
                                    vec2 _GLF_SWITCH_0_136v, _GLF_SWITCH_0_137v[29], _GLF_SWITCH_0_138v;
                                    bvec3 _GLF_SWITCH_0_139v[83], _GLF_SWITCH_0_140v;
                                }
                                mat2(946.145, 1.4, 1.8, -400.896);
                                80475;
                            }
                            bvec2 _GLF_SWITCH_0_141v;
                            break;
                            float _GLF_SWITCH_0_142v, _GLF_SWITCH_0_143v[55], _GLF_SWITCH_0_144v[85];
                            uint _GLF_SWITCH_0_145v;
                            for (ivec3(44223, 54893, -11479); any(bvec2(false, false)); clamp(_GLF_IDENTITY(uvec2(55339u, _GLF_IDENTITY(52208u, ~(~(_GLF_IDENTITY(52208u, ~(~(52208u)))))))[1], (uvec2(55339u, _GLF_IDENTITY(52208u, ~(~(_GLF_IDENTITY(52208u, ~(~_GLF_IDENTITY((52208u), 1u * ((52208u)))))))))[1]) >> (170050u & 0u)), _GLF_IDENTITY(_GLF_SWITCH_0_145v, (_GLF_SWITCH_0_145v) | (_GLF_SWITCH_0_145v)), _GLF_SWITCH_0_145v)) {
                                return;
                                mat3 _GLF_SWITCH_0_146v, _GLF_SWITCH_0_147v;
                                if (_GLF_DEAD(false)) {
                                    vec3 donor_replacementGLF_dead2d = _GLF_FUZZED(vec3(-4453.4265, -1.3, -9792.7319));
                                    if (length(donor_replacementGLF_dead2d) <= float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1))) {
                                        continue;
                                    }
                                }
                                mat2x3(81.67, 938.477, -31.18, -9.1, -5.3, -2808.7380);
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) - vec4(0.0, 0.0, 0.0, 0.0)).y < 0.0)))) {
                                    continue;
                                }
                                {
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead2pos = _GLF_FUZZED(resolution);
                                    vec3 donor_replacementGLF_dead2setting = _GLF_FUZZED(_GLF_SWITCH_0_99v[2]);
                                    {
                                        ;
                                    }
                                }
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = _GLF_outlined_7();
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead1th = _GLF_FUZZED(-5678.3362);
                                            vec2 donor_replacementGLF_dead1v = _GLF_FUZZED(dFdx(vec2(-17.52, 5.6)));
                                            if (donor_replacementGLF_dead1v.x < 0.0) {
                                                donor_replacementGLF_dead1th = 1.0 - donor_replacementGLF_dead1th;
                                            }
                                        }
                                    }
                                    continue;
                                    bool _GLF_SWITCH_0_148v;
                                    discard;
                                    if (_GLF_DEAD(false)) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                discard;
                                            }
                                        }
                                    }
                                    uvec4 _GLF_SWITCH_0_149v, _GLF_SWITCH_0_150v;
                                    equal(_GLF_SWITCH_0_141v, bvec2(false, true));
                                    unpackHalf2x16(_GLF_IDENTITY(_GLF_SWITCH_0_149v.x, max(_GLF_SWITCH_0_149v.x, _GLF_IDENTITY(_GLF_SWITCH_0_149v.x, uint(uvec4(_GLF_SWITCH_0_149v.x, 0u, 1u, 0u))))));
                                }
                                while (false) {
                                    uint _GLF_SWITCH_0_151v;
                                    uvec2(148156u, 194055u);
                                    ;
                                    break;
                                    (ivec3(-93287, -52775, -78410) * (-89342));
                                    ;
                                    ivec3(-53200, -48403, -16462);
                                    mat2 _GLF_SWITCH_0_152v, _GLF_SWITCH_0_153v[1], _GLF_SWITCH_0_154v;
                                }
                                {
                                    uvec4(136819u, 40190u, 42089u, 191862u);
                                    bitfieldExtract(uvec3(7358u, 165403u, 132567u), 5414, i);
                                    continue;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = dFdxCoarse(vec4(8427.7429, 3.7, -4.6, -8.6));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    continue;
                                    continue;
                                    return;
                                    discard;
                                }
                            }
                            continue;
                        } while ((ivec3(45311, -39438, -12909) != ivec3(-54350, -2814, 11818)));
                    }
                    ;
                    mat4 _GLF_SWITCH_0_155v[73], _GLF_SWITCH_0_156v;
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = log2(vec4(1.8, 112.996, 116.557, 3.4));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        discard;
                    }
                }
            default:
                1;
        }
    }
    for (int i = 0; i < 9; i++) {
        {
            for (int _GLF_SPLIT_LOOP_COUNTERj = 0; _GLF_SPLIT_LOOP_COUNTERj < 4; _GLF_SPLIT_LOOP_COUNTERj++) {
                if (_GLF_SPLIT_LOOP_COUNTERj < i + 1) {
                    continue;
                }
                bool doSwap = checkSwap(data[i], data[_GLF_SPLIT_LOOP_COUNTERj]);
                if (doSwap) {
                    float temp = data[i];
                    data[i] = data[_GLF_SPLIT_LOOP_COUNTERj];
                    data[_GLF_SPLIT_LOOP_COUNTERj] = _GLF_IDENTITY(temp, (true ? temp : _GLF_FUZZED(GLF_dead2h_r)));
                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec4(_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (false)), false, false, true)), (bool(bvec4(_GLF_IDENTITY(false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (false)), false, false, true))) || false)))) {
                        continue;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        _GLF_color = (_GLF_IDENTITY((vec2(-12.47, -6063.4520) * mat2(7.4, _GLF_IDENTITY(4.9, min(4.9, 4.9)), _GLF_IDENTITY(-21.69, min(-21.69, -21.69)), 621.224)) * (exp(-5.6) * mat4x2(-27.06, 12.91, 1.7, 395.138, 0.0, 319.021, -5.1, 21.75)), _GLF_IDENTITY(vec4(mat4x3((vec2(-12.47, -6063.4520) * mat2(7.4, _GLF_IDENTITY(4.9, min(4.9, 4.9)), _GLF_IDENTITY(-21.69, min(-21.69, -21.69)), 621.224)) * (exp(-5.6) * mat4x2(-27.06, 12.91, 1.7, 395.138, 0.0, 319.021, -5.1, 21.75)), determinant(mat2(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 1.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, tan(0.0))), dot(vec2(1.0, 0.0), vec2(1.0, tan(0.0)))), 1.0, cos(0.0))), (vec4(mat4x3((_GLF_IDENTITY(vec2(-12.47, -6063.4520), (_GLF_IDENTITY(vec2(-12.47, -6063.4520), (vec2(-12.47, -6063.4520)) - vec2(0.0, 0.0))) - vec2(0.0, 0.0)) * mat2(7.4, _GLF_IDENTITY(4.9, _GLF_IDENTITY(min(4.9, 4.9), clamp(_GLF_IDENTITY(min(4.9, 4.9), float(vec4(min(4.9, 4.9), 1.0, 1.0, 0.0))), min(4.9, 4.9), min(4.9, 4.9)))), _GLF_IDENTITY(-21.69, min(-21.69, -21.69)), 621.224)) * (exp(-5.6) * mat4x2(-27.06, 12.91, 1.7, 395.138, 0.0, 319.021, _GLF_IDENTITY(-5.1, mix(float(_GLF_FUZZED(float(-6536))), float(-5.1), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))), 21.75)), determinant(mat2(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 1.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, tan(0.0))), dot(vec2(1.0, 0.0), vec2(1.0, tan(0.0)))), 1.0, cos(0.0)))) - vec4(0.0, _GLF_IDENTITY(0.0, float(mat4x2(_GLF_IDENTITY(0.0, (0.0) - 0.0), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0))), 0.0, 0.0))));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(true, false, false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord.x, 0.0 + (gl_FragCoord.x)) < _GLF_ZERO(0.0, injectionSwitch.x), bool(bvec2(_GLF_IDENTITY(gl_FragCoord.x, 0.0 + (gl_FragCoord.x)) < _GLF_ZERO(0.0, injectionSwitch.x), true))))))) {
                                {
                                    temp = -temp;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                    vec2 donor_replacementGLF_dead2center = _GLF_FUZZED((vec2(85.90, 614.746) * dFdxFine(4184.4728)));
                    int donor_replacementGLF_dead2i = _GLF_FUZZED(_GLF_SPLIT_LOOP_COUNTERj);
                    vec2 donor_replacementGLF_dead2position = _GLF_FUZZED(injectionSwitch);
                    vec3 donor_replacementGLF_dead2result = _GLF_FUZZED(atanh(vec3(1.6, -_GLF_IDENTITY(5.9, max(5.9, 5.9)), 6.8)));
                    {
                        vec3 GLF_dead2d = _GLF_FUZZED(fract(vec3(762.576, 968.822, -9.6)));
                        GLF_dead2d = GLF_dead2drawShape(donor_replacementGLF_dead2position, donor_replacementGLF_dead2center + vec2(sin(float(donor_replacementGLF_dead2i) / (float(bitCount(i)) * 10.0) + GLF_dead2time) / 4.0 * float(bitCount(i)), float(bitfieldExtract(_GLF_IDENTITY(int(GLF_dead2resolution.x), (int(GLF_dead2resolution.x)) | (int(GLF_dead2resolution.x))), 0, 1))), vec3(0.01 + sin(_GLF_IDENTITY(float(donor_replacementGLF_dead2i), clamp(float(donor_replacementGLF_dead2i), float(donor_replacementGLF_dead2i), float(donor_replacementGLF_dead2i))) / 100.0 * float(bitCount(i))), 0.01, float(donor_replacementGLF_dead2i)));
                        if (length(GLF_dead2d) <= float(bitfieldExtract(int(GLF_dead2resolution.x), 0, 1))) {
                            continue;
                        }
                        donor_replacementGLF_dead2result = vec3(GLF_dead2d);
                    }
                }
            }
            for (int _GLF_SPLIT_LOOP_COUNTERj = 4; _GLF_SPLIT_LOOP_COUNTERj < 10; _GLF_SPLIT_LOOP_COUNTERj++) {
                if (_GLF_SPLIT_LOOP_COUNTERj < i + 1) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead0c_im = _GLF_IDENTITY(_GLF_FUZZED(-97.59), clamp(_GLF_FUZZED(-97.59), _GLF_FUZZED(-97.59), _GLF_FUZZED(-97.59)));
                        float donor_replacementGLF_dead0c_re = _GLF_IDENTITY(_GLF_FUZZED(tanh(pow(-6.5, -5.4))), max(_GLF_FUZZED(tanh(pow(-6.5, -5.4))), _GLF_FUZZED(tanh(pow(-6.5, -5.4)))));
                        int donor_replacementGLF_dead0iteration = _GLF_FUZZED(i);
                        float donor_replacementGLF_dead0x = _GLF_FUZZED(0.7);
                        float donor_replacementGLF_dead0y = _GLF_FUZZED(8180.9110);
                        do {
                            if (donor_replacementGLF_dead0x * donor_replacementGLF_dead0x + donor_replacementGLF_dead0y * donor_replacementGLF_dead0y > 4.0) {
                                break;
                            }
                            float GLF_dead0x_new = donor_replacementGLF_dead0x * donor_replacementGLF_dead0x - donor_replacementGLF_dead0y * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_re;
                            donor_replacementGLF_dead0y = 2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im;
                            donor_replacementGLF_dead0x = GLF_dead0x_new;
                            donor_replacementGLF_dead0iteration++;
                            _GLF_IDENTITY(i++, (i++) | 0);
                        } while (i < bitfieldInsert(_GLF_SPLIT_LOOP_COUNTERj + (_GLF_IDENTITY(257.0 > GLF_dead0resolution.y ? 1 : 0, 0 | (257.0 > GLF_dead0resolution.y ? 1 : 0))), 0, 0, 0));
                    }
                }
                bool doSwap = checkSwap(data[i], data[_GLF_SPLIT_LOOP_COUNTERj]);
                if (doSwap) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0)), dot(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0))))))) {
                        float donor_replacementGLF_dead0c_im = _GLF_FUZZED(7.3);
                        float donor_replacementGLF_dead0c_re = _GLF_FUZZED(-5.0);
                        int donor_replacementGLF_dead0iteration = _GLF_FUZZED((bitfieldReverse(_GLF_SPLIT_LOOP_COUNTERj) >> (-14462)));
                        float donor_replacementGLF_dead0x = _GLF_FUZZED(-576.538);
                        float donor_replacementGLF_dead0y = _GLF_FUZZED(resolution[1]);
                        do {
                            if (donor_replacementGLF_dead0x * donor_replacementGLF_dead0x + donor_replacementGLF_dead0y * donor_replacementGLF_dead0y > 4.0) {
                                break;
                            }
                            float GLF_dead0x_new = donor_replacementGLF_dead0x * donor_replacementGLF_dead0x - donor_replacementGLF_dead0y * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_re;
                            donor_replacementGLF_dead0y = 2.0 * donor_replacementGLF_dead0x * donor_replacementGLF_dead0y + donor_replacementGLF_dead0c_im;
                            _GLF_IDENTITY(donor_replacementGLF_dead0x = GLF_dead0x_new, (_GLF_IDENTITY(donor_replacementGLF_dead0x = GLF_dead0x_new, (donor_replacementGLF_dead0x = GLF_dead0x_new) * 1.0)) - 0.0);
                            donor_replacementGLF_dead0iteration++;
                            i++;
                        } while (i < bitfieldInsert(_GLF_SPLIT_LOOP_COUNTERj + (257.0 > GLF_dead0resolution.y ? 1 : 0), 0, 0, 0));
                    }
                    float temp = data[i];
                    data[i] = data[_GLF_SPLIT_LOOP_COUNTERj];
                    data[_GLF_SPLIT_LOOP_COUNTERj] = temp;
                }
            }
        }
    }
    if (gl_FragCoord.x < resolution.x / 2.0) {
        _GLF_color = vec4(data[0] / 10.0, data[5] / 10.0, data[9] / 10.0, 1.0);
    } else {
        _GLF_color = vec4(data[5] / 10.0, data[9] / 10.0, data[0] / 10.0, 1.0);
    }
}
