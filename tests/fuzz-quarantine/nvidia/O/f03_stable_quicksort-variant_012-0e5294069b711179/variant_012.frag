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

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

struct QuicksortObject {
    int numbers[10];
};

QuicksortObject obj;

void swap(int i, int j) {
    int temp = obj.numbers[i];
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            do {
                _GLF_color = (resolution * ((mat4x2(5907.4296, -3.8, -3.6, 80.51, -5087.6411, -4170.1038, 91.18, 63.96) * 1.3)));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        } else {
        }
    }
    obj.numbers[i] = _GLF_IDENTITY(obj.numbers[j], max(obj.numbers[j], obj.numbers[j]));
    obj.numbers[j] = temp;
}

int performPartition(int l, int h) {
    int pivot = obj.numbers[h];
    int i = l - 1;
    for (int j = l; j <= h - 1; j++) {
        switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
            case 23:
                if (bvec2(false, _GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), true && (!(true))))))[1]) {
                } else {
                    fract(_GLF_color);
                    (135477u % uvec3(173128u, 40524u, 55306u));
                    return (+pivot);
                    ;
                    bvec2 _GLF_SWITCH_2_0v, _GLF_SWITCH_2_1v[21];
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        while ((bvec4(false, false, true, true) == bvec4(false, true, true, _GLF_IDENTITY(false, bool(bvec3(false, true, true)))))) {
                            {
                                uvec3 _GLF_SWITCH_2_2v;
                                (ivec3(-67940, 15534, -4163) << clamp(ivec3(-99981, -75868, -71068), ivec3(-_GLF_IDENTITY(47854, min(47854, 47854)), 65711, 6487), ivec3(87227, 45071, -19726)));
                                bvec2 _GLF_SWITCH_2_3v[71], _GLF_SWITCH_2_4v, _GLF_SWITCH_2_5v[36];
                                vec3(0.9, -916.960, 165.929);
                                if ((bvec4(false, true, true, true) == greaterThanEqual((ivec4(-85656, 83345, -31872, -11692) / pivot), (ivec4(66086, -26206, -32973, -33244) / j)))) {
                                    ivec4(-67320, -93662, 69950, -12736);
                                    (mat2x4(-3.7, 4.2, 88.11, 19.56, 4.8, -2.2, 7.1, 3.6) * mat3x2(-3569.4026, -3.9, 3.5, -7229.0356, 22.33, -71.40));
                                    break;
                                    break;
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                        while (any(bvec2(false, false))) {
                                            bvec2(bvec4(true, true, false, false));
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, min(0, 0))); _injected_loop_counter--) {
                                                mat4x2(-4.4, _GLF_IDENTITY(-48.11, clamp(-48.11, _GLF_IDENTITY(-48.11, (-48.11) / 1.0), -48.11)), -_GLF_IDENTITY(6.1, mix(float(_GLF_FUZZED(4.9)), float(6.1), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))), -1914.2583, 2.0, -3.9, -78.87, 8.5);
                                            }
                                            bvec4 _GLF_SWITCH_2_6v, _GLF_SWITCH_2_7v[79], _GLF_SWITCH_2_8v;
                                            mat4 _GLF_SWITCH_2_9v[60], _GLF_SWITCH_2_10v;
                                            break;
                                            (((-66.26) / mat3x2(0.1, -9.7, -7522.2932, 50.81, -7093.2455, -5358.5494)) * vec3(-1.4, 1193.2162, 72.10));
                                        }
                                    }
                                    mat3x2 _GLF_SWITCH_2_11v[7], _GLF_SWITCH_2_12v[80];
                                } else {
                                    vec4 _GLF_SWITCH_2_13v, _GLF_SWITCH_2_14v[3], _GLF_SWITCH_2_15v;
                                    return pivot;
                                    if (_GLF_IDENTITY((pivot < j), _GLF_IDENTITY(bool(bvec4((pivot < j), false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)))), (bool(bvec4((pivot < j), false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) || _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) {
                                        mat3x2(4.0, 2.5, 5.7, -35.61, 1916.5150, 18.27);
                                    }
                                    mat3x2(-6002.9235, 4262.4585, -1.1, -4517.4243, -57.20, -679.642);
                                    ;
                                    (ivec2(-84798, -68977) != ivec2(-9623, -12447));
                                }
                                for (mat4x3(vec3(-856.562, 2.4, -40.66), vec3(4508.0436, 36.60, 46.74), vec3(-3.3, -1185.8095, -4.3), vec3(931.949, -_GLF_IDENTITY(969.098, (969.098) - 0.0), -61.22)); (mat4x2(9.0, -8.1, 392.339, 87.84, 402.655, 794.333, 18.10, 11.89) != (mat4x2(509.366, -7.6, -7.9, -756.880, 3.5, -1.9, -78.55, -6.9) - mat4x2(592.017, -1.0, -9.4, -8374.3900, -7.6, -2928.4080, 1515.1913, -2.5))); greaterThan(vec3(-8.3, 7.3, 99.22), vec3(56.69, 8.2, 915.276))) {
                                    _GLF_SWITCH_2_0v;
                                    ;
                                    mat2x3(-3504.3604, -6.5, -630.728, -6.4, 145.540, 6696.3719);
                                    for (ivec2 _GLF_SWITCH_2_16v, _GLF_SWITCH_2_17v; (((uvec3(138229u, 196735u, 38020u) / 158914u) + 178079u) != _GLF_SWITCH_2_2v); vec3(345.794, 2.6, -6.4)) {
                                        break;
                                        return pivot;
                                        mat3(1.0, 331.322, 54.44, -5922.5669, 714.483, 3.6, -6.3, -7537.7432, 382.235);
                                        ;
                                        vec3(-75.11, -6.1, -29.58);
                                        _GLF_SWITCH_2_16v;
                                        mat2x4 _GLF_SWITCH_2_18v[25], _GLF_SWITCH_2_19v, _GLF_SWITCH_2_20v[17];
                                        ((-2.5) * mat4x3(0.0, 5563.7953, -9998.9542, 242.721, -842.778, -791.598, 996.369, -7823.1906, 5.2, 9.1, 2951.3851, -0.2));
                                    }
                                    if (false) {
                                        break;
                                        break;
                                        discard;
                                        bvec3 _GLF_SWITCH_2_21v[25], _GLF_SWITCH_2_22v;
                                        vec4 _GLF_SWITCH_2_23v[42], _GLF_SWITCH_2_24v;
                                    }
                                    vec4(0.3, -629.911, 7.3, -37.93);
                                    continue;
                                }
                                {
                                    (-ivec3(-40507, 16448, 29818));
                                    _GLF_IDENTITY(ivec4(-1534, -9373, 93331, 86742).g, 1 * (ivec4(-1534, -9373, 93331, 86742).g));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        while (((mat3x4(-_GLF_IDENTITY(1104.0678, clamp(_GLF_IDENTITY(1104.0678, (_GLF_IDENTITY(1104.0678, min(1104.0678, 1104.0678))) + 0.0), 1104.0678, 1104.0678)), 556.426, 85.36, 3.6, 0.2, 8.0, -3.5, 7.9, -6248.5642, _GLF_IDENTITY(6.0, (true ? _GLF_IDENTITY(6.0, float(mat4(6.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, length(0.0), 1.0, 1.0, 0.0))) : _GLF_FUZZED(7.6))), 73.34, -5.6) * mat2x3(-7.1, 43.02, 524.043, -8.5, -3622.6865, 2.1)) == mat2x4(117.814, -0.5, 4.4, -473.908, -859.585, -6.6, 1377.8058, 9.5))) {
                                            mat4(5.8, -2988.2908, smoothstep(-2.7, 6.6, 501.254), dot(3.6, 5.3), -6.1, 64.20, float(true), 9.1, -298.774, -1.9, 3.1, -8.0, 641.908, -14.09, normalize(-7.2), -6560.3263);
                                            ivec2 _GLF_SWITCH_2_25v;
                                            bvec4(false, false, false, false);
                                        }
                                    } else {
                                    }
                                }
                                for (vec4 _GLF_SWITCH_2_26v, _GLF_SWITCH_2_27v, _GLF_SWITCH_2_28v; (81928u == max(uvec4(123728u, 117328u, 105393u, 9589u).t, 66406u)); smoothstep(vec2(50.80, -23.16), resolution, resolution)) {
                                    87260u;
                                    for ((mat2x4(4.7, 74.57, -5.7, -9.9, -2.3, 9.3, -7.6, 76.35) == mat2x4(2.2, -8.1, 3.3, -996.195, 8.1, 95.11, 51.46, -2694.4954)); (mat2x4(88.96, -8.1, -1.5, 1.3, -4119.5458, -929.295, _GLF_IDENTITY(95.86, mix(float(_GLF_FUZZED(-5148.3099)), float(95.86), bool(true))), -3.2) == mat2x4(-99.84, -810.432, _GLF_IDENTITY(-784.843, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? (-784.843) : _GLF_FUZZED(30.44))), -4.6, 5250.1427, -_GLF_IDENTITY(479.594, min(479.594, _GLF_IDENTITY(479.594, min(479.594, 479.594)))), 7918.3341, -29.41)); (mat4x3(-7.5, -1.2, 9328.9672, -6964.6912, 143.272, -0.4, -1907.0113, -4840.3520, -52.39, 5.5, 87.87, -8.4) / mat4x3(4419.2888, -4.4, -15.78, 49.83, 89.30, 16.81, -2.6, 3.8, -3.6, -8.3, 3001.9134, -10.47))) {
                                        continue;
                                    }
                                    return (ivec4(1094, 48752, 38818, -82844) >> ivec4(-43621, 36730, 61288, 8819))[3];
                                    while (false) {
                                    }
                                    (107558u ^ _GLF_SWITCH_2_2v);
                                    uvec2 _GLF_SWITCH_2_29v;
                                    mat3 _GLF_SWITCH_2_30v;
                                    (mat3x4(92.77, -1.5, -3.3, -502.073, 197.230, -3.6, 8.2, 2.7, 1.4, 5232.4570, 97.41, 6.0) + mat3x4(-68.11, -0.2, 192.784, -4.2, 7623.6685, 5881.8371, -634.735, 82.62, 5.7, -80.99, 14.15, -601.974));
                                }
                            }
                            for (resolution; true; (mat3(-7462.7397, 38.30, -5.1, 32.92, 843.289, 4.9, -70.39, -1.2, -59.71) - mat3(-0.7, 7.5, 9.2, 79.43, 6429.4472, 8.4, 2.9, _GLF_IDENTITY(68.13, float(mat3x4(68.13, 1.0, _GLF_IDENTITY(dot(vec4(sqrt(0.0), 0.0, 0.0, 0.0), vec4(1.0, 1.0, 1.0, 1.0)), dot(vec4(sqrt(0.0), 0.0, 0.0, 0.0), vec4(1.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, round(length(normalize(1.0))), 0.0))), _GLF_IDENTITY(-4022.2970, max(_GLF_IDENTITY(-4022.2970, max(-4022.2970, -4022.2970)), -4022.2970))))) {
                                vec2 _GLF_SWITCH_2_31v[87], _GLF_SWITCH_2_32v;
                                ivec3 _GLF_SWITCH_2_33v, _GLF_SWITCH_2_34v[48], _GLF_SWITCH_2_35v;
                                return bitfieldInsert(l, i, h, j);
                                continue;
                                uint _GLF_SWITCH_2_36v, _GLF_SWITCH_2_37v[69], _GLF_SWITCH_2_38v[61];
                                return j;
                            }
                            mat2 _GLF_SWITCH_2_39v, _GLF_SWITCH_2_40v;
                            _GLF_SWITCH_2_0v;
                            for (mat4(954.155, 4041.4911, 9921.8174, 0.1, 6.3, 2.2, -89.24, 3.6, -3.7, 7.5, -4591.2507, 4511.0605, 3.8, -28.48, 32.75, 7.1); ((48150u > 152573u) ^^ true); clamp(ivec4(-5389, 37036, -47055, -17359), (l + ivec4(44495, -48089, -99134, 17788)), (findMSB(uvec4(143225u, 159626u, 138215u, 3786u)) >> ivec4(-_GLF_IDENTITY(86605, (86605) | 0), 73747, -22826, 13079)))) {
                                continue;
                                vec3 _GLF_SWITCH_2_41v, _GLF_SWITCH_2_42v, _GLF_SWITCH_2_43v;
                                continue;
                            }
                            while ((transpose(mat3x4(29.80, 9.7, 9.1, -5.8, -15.61, -4920.4697, -9385.5788, 2.8, 11.58, _GLF_IDENTITY(-990.158, mix(float(_GLF_IDENTITY(-990.158, max(-990.158, -990.158))), float(_GLF_FUZZED(((-859.619) * (-754.068)))), bool(false))), -4.5, -1.1)) == mat4x3(3639.8116, 62.78, -6815.5171, 613.971, 639.396, 278.970, 34.09, -229.417, -18.87, -7480.8137, -7.0, 6305.5410))) {
                                return ivec2(-43089, 14109)[1];
                                mat4x2 _GLF_SWITCH_2_44v[2], _GLF_SWITCH_2_45v[1];
                                ;
                                if (false) {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        if (true) {
                                        }
                                    }
                                    continue;
                                    bvec4 _GLF_SWITCH_2_46v, _GLF_SWITCH_2_47v, _GLF_SWITCH_2_48v;
                                } else {
                                    bvec4(false, false, false, true);
                                    (uvec4(72128u, 137663u, 2376u, 187791u) ^ 132639u);
                                    uvec2(118826u, 171677u);
                                    dFdy(vec3(-550.068, -7923.0200, -0.6));
                                }
                                if ((mat2(-2.0, 19.18, -2.7, 1.9) == _GLF_SWITCH_2_39v)) {
                                    mat4x2 _GLF_SWITCH_2_49v[55], _GLF_SWITCH_2_50v;
                                    false;
                                    ivec2 _GLF_SWITCH_2_51v[29], _GLF_SWITCH_2_52v;
                                    if ((uvec4(196780u, 3589u, 20960u, 196981u) != uvec4(190446u, 119879u, 152594u, 53882u))) {
                                        bool _GLF_SWITCH_2_53v, _GLF_SWITCH_2_54v, _GLF_SWITCH_2_55v;
                                        mat4x2 _GLF_SWITCH_2_56v, _GLF_SWITCH_2_57v;
                                        _GLF_SWITCH_2_56v;
                                        break;
                                        mat3x4(-797.648, 51.20, -0.6, -8.1, 23.02, -339.500, -3635.4375, 7.9, -4.2, -0.7, -51.18, -7.7);
                                        mat2x4 _GLF_SWITCH_2_58v[40], _GLF_SWITCH_2_59v, _GLF_SWITCH_2_60v;
                                        ;
                                        max(_GLF_SWITCH_2_52v, h);
                                        (mat2x3(722.287, -858.587, -0.2, -1.5, 2171.3220, -8.0) != (mat2x3(8.9, 875.639, 402.274, -271.655, -1393.1402, -0.8) / mat2x3(-796.762, -50.89, -5.4, -7929.4956, 8286.7072, -0.6)));
                                    } else {
                                    }
                                    continue;
                                    mat3(-9922.4087, -3816.9606, 0.0, 94.85, 2.3, 5792.1991, -81.46, -12.68, 8220.5983);
                                }
                                ;
                                for (mat3 _GLF_SWITCH_2_61v, _GLF_SWITCH_2_62v; true; greaterThanEqual(ivec4(42272, 8732, -70817, -81400), _GLF_IDENTITY(ivec4(_GLF_IDENTITY(-30619, (-30619) >> 0), -63075, 67846, 53535), ~(_GLF_IDENTITY(~(ivec4(_GLF_IDENTITY(-30619, (-30619) >> 0), -63075, 67846, 53535)), (false ? _GLF_FUZZED(ivec4(78858, 12162, -15331, 77929)) : _GLF_IDENTITY(~(ivec4(_GLF_IDENTITY(-30619, (-30619) >> 0), -63075, 67846, 53535)), max(~(ivec4(_GLF_IDENTITY(-30619, (-30619) >> 0), -63075, 67846, 53535)), ~(ivec4(_GLF_IDENTITY(-30619, (-30619) >> 0), -63075, 67846, 53535)))))))))) {
                                }
                                uvec3(143305u, 171937u, 62604u);
                                bvec3 _GLF_SWITCH_2_63v, _GLF_SWITCH_2_64v[68], _GLF_SWITCH_2_65v;
                            }
                            bvec3(true, true, true);
                            discard;
                            ;
                        }
                    } else {
                    }
                    ivec2 _GLF_SWITCH_2_66v;
                    {
                        while ((bvec3(true, false, false) == bvec3(false, true, true))) {
                            int _GLF_SWITCH_2_67v;
                            {
                            }
                            mat4x3 _GLF_SWITCH_2_68v, _GLF_SWITCH_2_69v;
                            while (true) {
                                all(bvec4(true, false, false, true));
                                if ((ivec2(57382, 78817) == ivec2(29595, -90788))) {
                                    return i;
                                    ivec2 _GLF_SWITCH_2_70v;
                                    resolution;
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        mat3x2(vec2(288.510, 7.9), vec2(-2.3, -8003.4305), vec2(-7037.1303, 1.0));
                                    }
                                    continue;
                                    vec4(-5.2, vec2(-88.41, 2.3), exp(-8.0));
                                }
                                bool _GLF_SWITCH_2_71v, _GLF_SWITCH_2_72v, _GLF_SWITCH_2_73v;
                                while (((1.0 - resolution) == injectionSwitch)) {
                                    continue;
                                    discard;
                                }
                                return ((-30746) % (-69061));
                                while (((-1.7) > (-9318.5370))) {
                                }
                            }
                            continue;
                            ;
                            while (false) {
                                mat3x4 _GLF_SWITCH_2_74v[1];
                                mat2x4 _GLF_SWITCH_2_75v, _GLF_SWITCH_2_76v, _GLF_SWITCH_2_77v;
                                while (true) {
                                    ivec2(46001, -19406);
                                    (+ivec3(26622, -17774, 10686));
                                    (39315u * uvec2(95546u, 138035u));
                                    for (int _injected_loop_counter = (1 & int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        false;
                                    }
                                    vec4(float(12799), vec3(-0.1, -6.5, -535.374));
                                    break;
                                }
                                vec3 _GLF_SWITCH_2_78v[23], _GLF_SWITCH_2_79v[81], _GLF_SWITCH_2_80v;
                                return i;
                            }
                            refract(_GLF_color, _GLF_color, -694.479);
                            while (false) {
                                (mat3(3.4, -1422.7990, -7739.8284, 9.5, 78.79, -9307.9723, 67.79, 650.811, 20.68) * vec3(383.123, 4.9, 1477.4608));
                                vec3(-4158.6768, -6600.5597, -676.693);
                                uvec4 _GLF_SWITCH_2_81v, _GLF_SWITCH_2_82v, _GLF_SWITCH_2_83v;
                                return findMSB((86452u / 61311u));
                                ;
                                uvec3(22363u, 37760u, 108642u);
                                mat2x4 _GLF_SWITCH_2_84v[4], _GLF_SWITCH_2_85v;
                                mat2x4(7.6, -5184.5364, 5301.8067, -14.21, -15.62, 2.9, 796.705, 1897.6236);
                                bool _GLF_SWITCH_2_86v, _GLF_SWITCH_2_87v[47], _GLF_SWITCH_2_88v[55];
                            }
                        }
                        {
                            uvec4 _GLF_SWITCH_2_89v[13];
                            if (true) {
                                tanh(vec4(-683.810, 65.11, 6.6, -9.7));
                                mat4x3(7245.4418, -81.26, -52.02, -2.9, 24.27, 8768.3951, 2657.7055, -943.296, 273.900, 6919.4637, 81.13, -71.75);
                                (+mat2x3(-33.51, 842.783, 7.8, 355.644, -3.5, 5.4));
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                    while ((!true)) {
                                        uvec3 _GLF_SWITCH_2_90v;
                                        ;
                                        uvec4 _GLF_SWITCH_2_91v, _GLF_SWITCH_2_92v, _GLF_SWITCH_2_93v[82];
                                        float _GLF_SWITCH_2_94v[62], _GLF_SWITCH_2_95v[23], _GLF_SWITCH_2_96v;
                                        bvec4(true, false, true, false).raa;
                                        mat2(-3232.0404, 4530.6942, 51.89, 60.45);
                                    }
                                }
                                notEqual(ivec3(61717, 80527, -25849), ivec3(-95797, -45018, -58807));
                            } else {
                            }
                            ivec4 _GLF_SWITCH_2_97v, _GLF_SWITCH_2_98v[3];
                        }
                        ivec2 _GLF_SWITCH_2_99v, _GLF_SWITCH_2_100v;
                        (+mat3x4(37.72, -7.6, 8831.9968, -78.95, 1.6, 9.9, -5.4, -3.0, 13.78, 3.4, -9662.8715, 806.511));
                        vec3(31.98, _GLF_IDENTITY(69.17, clamp(69.17, 69.17, _GLF_IDENTITY(69.17, (_GLF_IDENTITY(69.17, (69.17) / 1.0)) - 0.0))), 92.51);
                    }
                }
            case 81:
                if (false) {
                    mat3x4 _GLF_SWITCH_2_101v[33], _GLF_SWITCH_2_102v;
                    bvec3 _GLF_SWITCH_2_103v;
                    if ((ivec3(-72500, 89892, -36899) == findMSB(ivec3(-93823, -50767, 76896)))) {
                        ((67749u / (180225u + 20234u)) % uvec4(9122u, 144644u, 184777u, 154256u));
                    } else {
                        if (false) {
                            {
                                {
                                    ;
                                    mat3x2(5243.5390, 1824.0827, 8866.3482, 80.90, -7.2, -83.07);
                                    ivec2 _GLF_SWITCH_2_104v;
                                    (+mat2x3(5.9, 7270.4203, 69.47, -_GLF_IDENTITY(85.05, min(85.05, 85.05)), -7.0, 33.03));
                                }
                            }
                            ;
                            for (mat2x3(-9.6, -5.6, -822.123, 49.86, 1300.2193, -63.18); (vec2(168.650, 41.45) == vec2(-2.7, 6.6)); ((h - h) / ivec4(-89459, 83529, _GLF_IDENTITY(-30574, (-30574) >> 0), 70247))) {
                                uvec2(158637u, 119704u);
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
                                    while ((vec4(-259.140, -6.0, 28.42, 2856.8365) != _GLF_color)) {
                                        ;
                                        mat4x2 _GLF_SWITCH_2_105v, _GLF_SWITCH_2_106v, _GLF_SWITCH_2_107v[84];
                                        outerProduct(injectionSwitch, vec2(-4246.4867, 2035.7162));
                                    }
                                }
                                {
                                    break;
                                    (128675u % uvec3(7629u, 91012u, 87090u));
                                    sinh(vec3(9.2, -5484.1718, 344.982));
                                    continue;
                                    mat3(3675.2346, 9.2, -19.46, -178.744, 6.8, 1225.7943, -2.8, -3.3, 9.8);
                                    uvec4 _GLF_SWITCH_2_108v[4], _GLF_SWITCH_2_109v, _GLF_SWITCH_2_110v;
                                }
                                while (false) {
                                    mat4x3(8.2, -355.724, 52.55, 0.3, 16.91, 4.8, -3288.1421, -9210.1673, 13.69, -38.23, -8.4, 9408.6816);
                                    uvec3(104441u, 142538u, 66890u);
                                    return (+23004);
                                    mat4x2 _GLF_SWITCH_2_111v[39], _GLF_SWITCH_2_112v, _GLF_SWITCH_2_113v;
                                    mat2x4(-7763.1247, -2.9, 2.3, 693.414, 5.6, 7.3, -407.120, 9.9);
                                    continue;
                                    continue;
                                    mat2x3 _GLF_SWITCH_2_114v[43];
                                    ;
                                }
                                while (false) {
                                    return min(i, (bitCount(-63192)));
                                    bvec4 _GLF_SWITCH_2_115v[38], _GLF_SWITCH_2_116v, _GLF_SWITCH_2_117v;
                                    bvec3 _GLF_SWITCH_2_118v, _GLF_SWITCH_2_119v[83];
                                    break;
                                    discard;
                                    continue;
                                }
                                bvec3 _GLF_SWITCH_2_120v[9];
                            }
                            ivec4 _GLF_SWITCH_2_121v[25], _GLF_SWITCH_2_122v[99];
                            mat3x4 _GLF_SWITCH_2_123v;
                            mat4(0.2, 246.515, 436.393, _GLF_IDENTITY(-50.46, (-50.46) + 0.0), -54.98, _GLF_IDENTITY(-5.7, (false ? _GLF_FUZZED(step(904.303, 93.60)) : (-5.7))), 0.3, 44.65, 3517.3045, -6.6, 8770.6989, -200.709, -4651.2527, 9.2, -1520.1990, -1471.9415);
                            while (true) {
                                continue;
                                continue;
                                lessThan(ivec2(_GLF_IDENTITY(68608, (true ? _GLF_IDENTITY(68608, 0 | (_GLF_IDENTITY(68608, 0 + (68608)))) : _GLF_FUZZED(bitfieldExtract(l, int(346.193), pivot)))), -51319), ivec2(-47891, 10188));
                                vec2 _GLF_SWITCH_2_124v;
                                continue;
                            }
                        }
                        (l << bitCount(l));
                        ;
                        ;
                        int _GLF_SWITCH_2_125v[51], _GLF_SWITCH_2_126v, _GLF_SWITCH_2_127v;
                        bvec2(false, true);
                        mat2 _GLF_SWITCH_2_128v;
                        {
                            ivec3 _GLF_SWITCH_2_129v;
                            {
                            }
                            (i | j);
                            (ivec2(84792, 32812) % abs(pivot)).gggr;
                            return int(false);
                            if (false) {
                                float _GLF_SWITCH_2_130v, _GLF_SWITCH_2_131v;
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    floatBitsToInt(_GLF_color);
                                }
                                packSnorm4x8(_GLF_color);
                                true;
                                {
                                    return (h - (-92228));
                                    ivec4(ivec2(-74981, 77053), l, j);
                                    ;
                                    mat2x3(5.5, -7.9, 1.7, 10.93, -2.1, 41.03);
                                    mat2x3 _GLF_SWITCH_2_132v, _GLF_SWITCH_2_133v;
                                    mat3x4 _GLF_SWITCH_2_134v, _GLF_SWITCH_2_135v, _GLF_SWITCH_2_136v;
                                    bvec4(false, true, false, false);
                                    return _GLF_SWITCH_2_127v;
                                }
                                while (false) {
                                    mat2(-2.5, 58.70, -69.41, 2399.1142);
                                    return _GLF_SWITCH_2_126v;
                                    continue;
                                    uvec4 _GLF_SWITCH_2_137v, _GLF_SWITCH_2_138v[15], _GLF_SWITCH_2_139v;
                                    mat2x4 _GLF_SWITCH_2_140v, _GLF_SWITCH_2_141v, _GLF_SWITCH_2_142v;
                                }
                                for (vec3 _GLF_SWITCH_2_143v[58], _GLF_SWITCH_2_144v; false; mat3x4(9421.4096, -240.521, 5.6, -5.2, -230.185, 35.96, -4900.6739, 96.47, -2.8, -7.8, -4.5, 7.3)) {
                                }
                                for (bvec3 _GLF_SWITCH_2_145v[86], _GLF_SWITCH_2_146v, _GLF_SWITCH_2_147v; false; (3.6 - mat2x3(-8.1, 243.926, -5.9, -2.1, -4334.3809, -3.6))) {
                                    _GLF_SWITCH_2_130v;
                                    true;
                                    uvec4(99956u, 176306u, 55808u, 68344u);
                                    discard;
                                    ;
                                    lessThan(resolution, injectionSwitch);
                                }
                                if (false) {
                                    vec2 _GLF_SWITCH_2_148v, _GLF_SWITCH_2_149v;
                                    ivec2(-39577, 66349);
                                }
                            }
                            discard;
                            do {
                                (mat4x2(-6559.0387, -9454.9182, -2073.4861, 4.9, -81.68, -71.69, -3183.0435, 9946.3004) - distance(7979.9840, 93.36));
                                for (bvec2 _GLF_SWITCH_2_150v, _GLF_SWITCH_2_151v, _GLF_SWITCH_2_152v; (mix(l, j, false) > h); mat3x2(56.13, 6.3, 519.160, 5976.8370, -41.53, 389.667)) {
                                    ;
                                    mat3x2 _GLF_SWITCH_2_153v[27], _GLF_SWITCH_2_154v;
                                    false;
                                    uvec2 _GLF_SWITCH_2_155v;
                                    mat4x2(-91.75, -93.49, 425.928, -3.6, 3.0, -5060.9670, 32.46, 8358.4106);
                                    notEqual(uvec3(165052u, 44161u, 221u), (161894u | uvec3(62394u, 109123u, 7274u)));
                                    greaterThanEqual(ivec3(i), ivec3(-33785, -885, -22902));
                                    ;
                                }
                                mat3x2(951.665, 9.4, -7.4, 4.2, 7695.0232, 1566.5595);
                                vec3 _GLF_SWITCH_2_156v[40];
                                while (false) {
                                    ivec4(44254, 31537, -38085, 18289);
                                    do {
                                        mat3x2(-6865.4227, 802.927, 2409.5583, -7.4, 2.0, 7717.9102);
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    mat2 _GLF_SWITCH_2_157v[32];
                                    98655u;
                                    (mat4x3(9350.7426, 59.71, 9.2, 6.2, 4.7, 1.1, 763.199, -1.5, -7.9, -9728.5340, 97.10, -2519.3276) * mat2x4(1.3, -486.048, -8.2, 1310.1090, -8.4, 70.30, 7023.9954, 677.748));
                                    greaterThan(vec4(2977.5141, 82.54, 72.55, 8.7), _GLF_color);
                                    vec4(-4.4, -0.5, 199.655, 5.0);
                                    transpose((mat2x3(-2.3, 702.893, 65.69, -96.80, _GLF_IDENTITY(-8.7, (-8.7) * 1.0), 5.4) / 51.32));
                                }
                                for (mat3x2 _GLF_SWITCH_2_158v, _GLF_SWITCH_2_159v; false; mat2x4(-4978.0378, 49.01, -2.2, -63.12, 8.2, -4.5, -2966.1737, -3312.1396)) {
                                    mat4x3 _GLF_SWITCH_2_160v, _GLF_SWITCH_2_161v, _GLF_SWITCH_2_162v[75];
                                    uint _GLF_SWITCH_2_163v;
                                    discard;
                                    discard;
                                    mat2 _GLF_SWITCH_2_164v, _GLF_SWITCH_2_165v, _GLF_SWITCH_2_166v;
                                    ivec4(99606, -75162, 92602, 81446);
                                    uvec4(96072u, 138964u, 196775u, 112873u);
                                    mat2 _GLF_SWITCH_2_167v, _GLF_SWITCH_2_168v;
                                }
                                while (true) {
                                    determinant(_GLF_SWITCH_2_128v);
                                    ((uvec3(157727u, 151530u, 141813u) & uvec3(65441u, 33464u, 17092u)));
                                    continue;
                                }
                            } while (true);
                        }
                        ivec2 _GLF_SWITCH_2_169v[85], _GLF_SWITCH_2_170v, _GLF_SWITCH_2_171v;
                    }
                    {
                        uvec3(165723u, 191024u, 142919u);
                        outerProduct(vec3(7055.2561, 3001.0681, 299.190), resolution);
                        {
                            bvec4 _GLF_SWITCH_2_172v, _GLF_SWITCH_2_173v, _GLF_SWITCH_2_174v;
                            mat4 _GLF_SWITCH_2_175v[92], _GLF_SWITCH_2_176v, _GLF_SWITCH_2_177v;
                            while (true) {
                                for ((1.3 - sin(vec3(932.267, -5.8, 9.7))); ((77630u << 23112u) < 19389u); i) {
                                    uvec4 _GLF_SWITCH_2_178v[63], _GLF_SWITCH_2_179v, _GLF_SWITCH_2_180v;
                                }
                                {
                                    pivot;
                                    break;
                                    continue;
                                    bvec2(true, true);
                                }
                                mat3(3.4, 9922.1204, 17.08, 49.94, -2.9, 4424.0594, -89.49, -8837.8829, -6840.7329);
                            }
                            uvec4(128936u, 58576u, 180929u, 31682u);
                            if (true) {
                                mat4x2(7569.4859, 4.5, 69.94, 260.557, -29.66, 0.9, 1.2, 29.48);
                                uvec2 _GLF_SWITCH_2_181v;
                                float _GLF_SWITCH_2_182v;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    for (uint _GLF_SWITCH_2_183v, _GLF_SWITCH_2_184v; (false != false); _GLF_SWITCH_2_174v) {
                                        return (pivot ^ h);
                                    }
                                } else {
                                }
                                discard;
                                if (true) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        ;
                                    } else {
                                    }
                                    mix(injectionSwitch, resolution, -90.70);
                                    uvec3(84624u, 20469u, 11823u);
                                    vec4 _GLF_SWITCH_2_185v, _GLF_SWITCH_2_186v, _GLF_SWITCH_2_187v;
                                } else {
                                    bvec2 _GLF_SWITCH_2_188v, _GLF_SWITCH_2_189v, _GLF_SWITCH_2_190v;
                                    bool _GLF_SWITCH_2_191v, _GLF_SWITCH_2_192v;
                                    ivec4(90140, 46631, -97377, -19086);
                                    (uvec3(67018u, 69779u, 169514u) == uvec3(30119u, 177175u, 24281u));
                                    mat2x4(mat4x3(mat2(120.590, 714.431, 434.338, -6.2)));
                                    uvec3 _GLF_SWITCH_2_193v[93], _GLF_SWITCH_2_194v;
                                }
                                float _GLF_SWITCH_2_195v[61], _GLF_SWITCH_2_196v;
                                {
                                    uvec4 _GLF_SWITCH_2_197v[48], _GLF_SWITCH_2_198v[29], _GLF_SWITCH_2_199v[79];
                                    bvec2(true);
                                    mat3(-2.3, 92.22, -8128.6565, 5175.0647, -84.67, 0.0, -6.7, -974.022, -61.87);
                                    int _GLF_SWITCH_2_200v;
                                    return h;
                                    (uvec2(uvec4(150903u, 123772u, 100838u, 21787u)) / 157228u);
                                    uvec4 _GLF_SWITCH_2_201v[31], _GLF_SWITCH_2_202v, _GLF_SWITCH_2_203v;
                                    uvec3(124149u, 66122u, 69925u);
                                    mat3(-1.2, 3932.4385, 50.01, 7.1, 1121.4817, 6.1, 40.05, 3.8, -9.1);
                                }
                                mat4x3 _GLF_SWITCH_2_204v, _GLF_SWITCH_2_205v, _GLF_SWITCH_2_206v;
                            }
                            for (mat2(-17.18, 9.2, 9.5, -0.8); (pivot == bitCount(124434u)); _GLF_SWITCH_2_102v) {
                                for (vec3 _GLF_SWITCH_2_207v; true; j) {
                                    mat4x2(62.57, 0.5, 7.2, 2668.3069, -1.4, 54.93, -381.735, -85.13);
                                    _GLF_SWITCH_2_207v.r;
                                    mat3x4 _GLF_SWITCH_2_208v[41];
                                }
                                for (transpose(mat2(-5.2, -9575.9426, -9.0, -2533.2067)); false; mat3x2(23.28, 8.6, 6.4, -916.453, 4.2, 1.6)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        uvec3(94200u, 192070u, 130725u);
                                    } else {
                                    }
                                }
                                continue;
                                return (-97405);
                                for (ivec4 _GLF_SWITCH_2_209v[52], _GLF_SWITCH_2_210v; true; _GLF_SWITCH_2_177v) {
                                    bvec3(true);
                                    (asinh((vec2(-607.980, 4.6) * (-9.7))) != injectionSwitch);
                                    mat2x3(6244.6000, -718.867, 106.563, -76.83, -452.714, -1.7);
                                    discard;
                                    continue;
                                    continue;
                                }
                                {
                                    continue;
                                }
                                continue;
                            }
                            for ((ivec3(51799, 71482, 59260) + (ivec3(4091, 75133, -78582) << ivec3(39285, -44024, -79362))); not(_GLF_SWITCH_2_103v)[2]; bvec4(true, true, true, true)) {
                                {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, true && (false)))) {
                                    } else {
                                        (+mat3(-7.4, -87.46, 6688.0406, -43.14, -590.788, 7.9, -4980.2432, 7.7, _GLF_IDENTITY(43.06, min(_GLF_IDENTITY(43.06, (false ? _GLF_FUZZED(0.3) : _GLF_IDENTITY(43.06, float(mat3x2(43.06, 1.0, 0.0, 0.0, 0.0, 1.0))))), 43.06))));
                                    }
                                    mat4x2 _GLF_SWITCH_2_211v[45];
                                    _GLF_SWITCH_2_102v;
                                    uvec4(177951u, 86665u, 176068u, 63585u);
                                    break;
                                    bvec2 _GLF_SWITCH_2_212v, _GLF_SWITCH_2_213v[44], _GLF_SWITCH_2_214v;
                                    ivec4 _GLF_SWITCH_2_215v, _GLF_SWITCH_2_216v[97];
                                    mat4 _GLF_SWITCH_2_217v[75];
                                }
                                do {
                                    discard;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                mat3x4 _GLF_SWITCH_2_218v, _GLF_SWITCH_2_219v[12];
                                break;
                                float _GLF_SWITCH_2_220v, _GLF_SWITCH_2_221v;
                                while (false) {
                                    vec4(vec2(253.087, -35.12), (true ? uintBitsToFloat(25253u) : _GLF_SWITCH_2_221v), _GLF_SWITCH_2_220v);
                                    return l;
                                    ;
                                    bitfieldExtract(pivot, pivot, pivot);
                                    lessThan(uvec2(43398u, 14569u).xx, uvec2(45420u, 48049u));
                                    continue;
                                    continue;
                                    do {
                                        sinh(-509.592);
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    min((i % ivec4(-94116, -96787, -59944, 55601)), pivot);
                                }
                            }
                            return 15884;
                        }
                        (ivec3(-61172, 22606, 1963) + ivec3(58465, -77970, -48292));
                        mat4x2(-27.24, -2027.4720, -118.645, 2.7, 7440.8915, 92.36, -9.7, 7.7);
                    }
                    discard;
                    mat4(25.38, 2718.3599, -739.917, 1012.9032, 0.7, -2.9, -5640.8241, -2.9, -4.5, -14.39, 658.317, 6.6, 63.62, -82.04, -81.10, 5.2);
                    vec4 _GLF_SWITCH_2_222v[59], _GLF_SWITCH_2_223v;
                    mat2x3 _GLF_SWITCH_2_224v, _GLF_SWITCH_2_225v;
                }
            case 0:
            case 89:
            case 20:
                if (obj.numbers[j] <= pivot) {
                    switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                        case 0:
                            i++;
                            do {
                                swap(i, j);
                            } while (_GLF_WRAPPED_LOOP(false));
                        case 82:
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            break;
                        case 75:
                            for (bvec4 _GLF_SWITCH_0_0v, _GLF_SWITCH_0_1v, _GLF_SWITCH_0_2v[80]; false; bvec2(false, false)) {
                                return -63128;
                                while ((((-2.9) == 77.27) ^^ false)) {
                                }
                            }
                        case 79:
                            discard;
                        default:
                            1;
                    }
                }
                break;
            default:
                1;
        }
    }
    i++;
    swap(i, h);
    return i;
    if (_GLF_DEAD(false)) {
        _GLF_color = reflect(dFdy(vec3(1516.0651, 4.7, -612.018)), vec3(-6.3, -8.3, _GLF_IDENTITY(69.00, (_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))) ? 69.00 : _GLF_FUZZED(4.6))))).tpps;
    }
}

void quicksort() {
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_color;
        }
    } while (_GLF_WRAPPED_LOOP(false));
    int l = 0, h = 9;
    int stack[10];
    int top = -1;
    stack[++top] = l;
    stack[++top] = h;
    while (top >= 0) {
        h = stack[top--];
        l = stack[top--];
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(_GLF_IDENTITY(bvec3(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, false), bvec3(bvec3(bvec3(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, false)))))))) {
            _GLF_color = acos(_GLF_color).tqpp;
        }
        int p = performPartition(l, h);
        if (p - 1 > l) {
            stack[++top] = l;
            stack[++top] = p - 1;
        }
        if (p + 1 < h) {
            stack[++top] = _GLF_IDENTITY(p + 1, (p + 1) | 0);
            stack[++top] = h;
        }
    }
}

vec4 _GLF_outlined_0() {
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        return vec4(30.50, -8.0, -4803.6125, 719.718);
    }
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    return _GLF_color;
}

void main() {
    for (int i = 0; i < 10; i++) {
        obj.numbers[i] = (10 - i);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-8.7, 7.7, -0.1, -9.7);
        }
        obj.numbers[i] = obj.numbers[i] * obj.numbers[i];
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        quicksort();
    } else {
    }
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = vec3(1.0, 2.0, 3.0);
    color.x += float(obj.numbers[0]);
    if (uv.x > (_GLF_IDENTITY(1.0 / 4.0, clamp(_GLF_IDENTITY(1.0 / 4.0, (1.0 / 4.0) / 1.0), 1.0 / 4.0, _GLF_IDENTITY(1.0 / 4.0, min(_GLF_IDENTITY(1.0 / 4.0, float(mat2x4(1.0 / 4.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0))), 1.0 / 4.0)))))) {
        switch (_GLF_SWITCH((0 << _GLF_IDENTITY(int(7), int(7))))) {
            case 25:
                ivec4 _GLF_SWITCH_1_0v, _GLF_SWITCH_1_1v[88], _GLF_SWITCH_1_2v;
            case 0:
            case 63:
            case 49:
            case 54:
            case 74:
            case 73:
            case 19:
            case 65:
                color.x += _GLF_IDENTITY(float(obj.numbers[1]), _GLF_IDENTITY(float(mat4x2(_GLF_IDENTITY(float(obj.numbers[1]), float(vec2(float(obj.numbers[1]), 1.0))), abs(0.0), determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, exp(0.0), 0.0, 1.0)), float(vec2(float(mat4x2(_GLF_IDENTITY(float(obj.numbers[1]), float(vec2(float(obj.numbers[1]), 1.0))), abs(0.0), determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, exp(0.0), 0.0, 1.0)), 0.0))));
                break;
            case 75:
                if ((mat2x4(-713.217, -1187.2486, -2.7, -37.53, 82.69, 167.748, 52.91, -8.1) != mat2x4(0.9, -1.5, -45.81, 8719.8328, 26.36, 752.800, -681.344, 727.981))) {
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        if (true) {
                            for (uvec4 _GLF_SWITCH_1_3v; ((-9.7) >= (-4366.6784)); (uvec2(121293u, 32077u) ^ uvec2(80639u, 100815u))) {
                            }
                            vec3 _GLF_SWITCH_1_4v[74];
                            trunc(sinh(31.91));
                            mat2x3 _GLF_SWITCH_1_5v, _GLF_SWITCH_1_6v, _GLF_SWITCH_1_7v;
                            if ((uvec4(177259u, 31035u, 133041u, 153936u) == uvec4(108472u, 167119u, 114512u, 106595u))) {
                                (uvec2(144886u, 192652u));
                                mat2x4(534.110, -49.54, -95.13, 454.310, -4.4, 5.3, 9.1, -118.863);
                                mat4(-8.8, -803.597, -4.0, 312.333, 255.995, 32.35, -0.6, -4.3, -2.1, -9.7, -1.0, -5.6, 1.4, -5.4, -990.270, 1262.7295);
                                if ((vec4(0.8, -540.700, 513.670, -79.59) != _GLF_color)) {
                                    dFdyCoarse(pow(distance(vec4(-8.9, 3377.3961, -3580.6720, -48.08), _GLF_color), (-(-8150.5488))));
                                    float _GLF_SWITCH_1_8v[26], _GLF_SWITCH_1_9v, _GLF_SWITCH_1_10v;
                                    ;
                                    mat4(4.6, 264.978, 4373.6800, -682.359, 1394.4485, 0.0, -5599.9156, -86.60, 5.6, -98.26, -6.0, -37.50, -0.6, 3454.1346, 58.03, 92.73);
                                    bvec2 _GLF_SWITCH_1_11v, _GLF_SWITCH_1_12v;
                                }
                                bvec2 _GLF_SWITCH_1_13v[71], _GLF_SWITCH_1_14v, _GLF_SWITCH_1_15v[15];
                                mat3x2 _GLF_SWITCH_1_16v, _GLF_SWITCH_1_17v, _GLF_SWITCH_1_18v;
                                mat4 _GLF_SWITCH_1_19v, _GLF_SWITCH_1_20v, _GLF_SWITCH_1_21v[53];
                                vec3(_GLF_IDENTITY(9237.6098, (9237.6098) / exp(tan(0.0))), -10.66, 70.70);
                            } else {
                                do {
                                    ;
                                    bvec2(true, true);
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    } else {
                                        ;
                                    }
                                    for (uvec3 _GLF_SWITCH_1_22v[99], _GLF_SWITCH_1_23v; (bool(43.57) ? true : (98997 < (-78856))); findLSB(79928u)) {
                                        uvec4(122225u, 150370u, 167792u, 107075u);
                                        continue;
                                    }
                                    do {
                                        vec4(8.6, -6964.3482, 544.550, -4.8);
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                } while ((ivec4(-26108, -2947, -75956, -74759) != ivec4(-_GLF_IDENTITY(71217, max(71217, 71217)), 50957, -87017, 97139)));
                                for (bvec4 _GLF_SWITCH_1_24v; true; uvec3(78838u, 56907u, 28734u)) {
                                    bool _GLF_SWITCH_1_25v, _GLF_SWITCH_1_26v, _GLF_SWITCH_1_27v;
                                    bvec3 _GLF_SWITCH_1_28v[71], _GLF_SWITCH_1_29v;
                                    bvec3 _GLF_SWITCH_1_30v[35];
                                }
                                uvec3 _GLF_SWITCH_1_31v, _GLF_SWITCH_1_32v;
                                (mat4x3(mat4(-448.091, -4.3, -1.5, -3433.4861, -4.0, 23.11, 9.9, 477.407, -670.800, -1.0, 9.3, 402.656, -_GLF_IDENTITY(95.50, (false ? _GLF_FUZZED((-87177, -74.62)) : 95.50)), -2818.6391, -5518.6270, -7.3)));
                                vec4 _GLF_SWITCH_1_33v, _GLF_SWITCH_1_34v;
                                for (bvec2 _GLF_SWITCH_1_35v; false; mat4(((_GLF_IDENTITY(-838.202, mix(float(_GLF_FUZZED(float(72488u))), float(_GLF_IDENTITY(-838.202, mix(float(-838.202), float(_GLF_FUZZED(-8920.1907)), bool(false)))), bool(true)))) + _GLF_SWITCH_1_34v), fwidth(atan(_GLF_SWITCH_1_33v, _GLF_color)), vec4(1243.1902, -278.221, 5937.2856, 518.843), _GLF_color)) {
                                    uvec3 _GLF_SWITCH_1_36v, _GLF_SWITCH_1_37v;
                                    ((uvec4(149804u, 15043u, 91475u, 199785u) >> (130126u % 99118u)) % 30421u);
                                    while (true) {
                                    }
                                    continue;
                                    (mat2(1450.3733, 837.641, -4.8, 18.75) / sign(9030.7168));
                                }
                                if ((mat4x3(6.5, -3.4, -74.91, 7.2, 476.520, 868.552, 47.10, -194.438, -7972.9947, 61.30, 353.128, 366.114) == mat4x3(-9221.4137, -176.463, -0.6, 0.6, 6.8, 7.5, 8215.2552, -9395.2072, 3956.5904, -14.05, 29.48, 355.506))) {
                                    for (ivec4 _GLF_SWITCH_1_38v[13]; (_GLF_SWITCH_1_6v == _GLF_SWITCH_1_5v); false) {
                                        uvec4(8730u, 27290u, 6638u, 82552u);
                                        uvec3 _GLF_SWITCH_1_39v[14], _GLF_SWITCH_1_40v;
                                        break;
                                        atan(inversesqrt(tanh(-72.63)));
                                        (-_GLF_SWITCH_1_0v);
                                        uvec4(194892u, 87152u, 61482u, 125244u);
                                        (_GLF_SWITCH_1_31v % _GLF_SWITCH_1_32v);
                                        color;
                                    }
                                    mat4x3(8.6, 32.98, -6.1, -1.5, -126.788, 2.9, 762.960, 77.54, 36.80, -1.9, 97.28, -415.662);
                                    for (ivec4 _GLF_SWITCH_1_41v, _GLF_SWITCH_1_42v; true; uv) {
                                        mat2x4 _GLF_SWITCH_1_43v, _GLF_SWITCH_1_44v, _GLF_SWITCH_1_45v;
                                        _GLF_SWITCH_1_41v;
                                        (ivec3(-98305, -80979, 19186)[1] + ivec3(4712, -9110, 24772));
                                        ivec2 _GLF_SWITCH_1_46v;
                                        bvec4(bvec3(_GLF_IDENTITY(false, !(!(false))), false, false), false);
                                        _GLF_color;
                                        8.3;
                                        discard;
                                    }
                                    {
                                        ivec2 _GLF_SWITCH_1_47v;
                                        uvec4 _GLF_SWITCH_1_48v[56];
                                        greaterThanEqual(color, vec3(4.5, -687.267, -82.61));
                                        bvec4(false, false, true, true);
                                        _GLF_SWITCH_1_6v;
                                        min(vec4(-7197.8226, 0.4, -577.025, -5.6), -0.4);
                                        do {
                                            uvec4(34778u, 192884u, 85829u, 135513u);
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0)))));
                                        uvec2 _GLF_SWITCH_1_49v, _GLF_SWITCH_1_50v, _GLF_SWITCH_1_51v;
                                        bvec2 _GLF_SWITCH_1_52v[41], _GLF_SWITCH_1_53v[6];
                                    }
                                } else {
                                    int _GLF_SWITCH_1_54v[85], _GLF_SWITCH_1_55v;
                                    while (true) {
                                        mat2 _GLF_SWITCH_1_56v, _GLF_SWITCH_1_57v, _GLF_SWITCH_1_58v[87];
                                        mat3x4(-35.91);
                                        bvec2 _GLF_SWITCH_1_59v, _GLF_SWITCH_1_60v[60], _GLF_SWITCH_1_61v;
                                        vec2 _GLF_SWITCH_1_62v;
                                        bool _GLF_SWITCH_1_63v, _GLF_SWITCH_1_64v[32], _GLF_SWITCH_1_65v;
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            return;
                                        } else {
                                        }
                                    }
                                    if ((radians(injectionSwitch) != vec2(6.1, -247.262))) {
                                        float _GLF_SWITCH_1_66v;
                                        mat2(56.33, -8.5, -7.7, 524.656);
                                        bvec4 _GLF_SWITCH_1_67v, _GLF_SWITCH_1_68v, _GLF_SWITCH_1_69v;
                                    }
                                }
                                (all(bvec2(true, true)) ? _GLF_SWITCH_1_7v : _GLF_SWITCH_1_6v);
                            }
                            uint _GLF_SWITCH_1_70v, _GLF_SWITCH_1_71v;
                        } else {
                            mat3x2 _GLF_SWITCH_1_72v, _GLF_SWITCH_1_73v[68], _GLF_SWITCH_1_74v;
                            (false ? (676.634 / transpose(mat4x3(-1.3, 929.738, -7702.2101, 3.2, 9768.6988, 5.7, 3.6, -5064.1255, -8.7, -1.7, -1.7, -38.91))) : mat3x4(-125.773, -78.97, -9386.1843, -641.165, 91.13, 680.882, -661.906, -5.7, 917.519, 256.956, 7.4, 74.39));
                            return;
                        }
                    }
                    return;
                    float _GLF_SWITCH_1_75v;
                    bvec3(true, true, false);
                    mat3x4 _GLF_SWITCH_1_76v, _GLF_SWITCH_1_77v[7];
                    mat3 _GLF_SWITCH_1_78v[65], _GLF_SWITCH_1_79v, _GLF_SWITCH_1_80v;
                    for (vec4 _GLF_SWITCH_1_81v, _GLF_SWITCH_1_82v; false; mat3x4(-82.54, 1006.3447, -2254.9366, 385.149, -8719.6509, 910.240, 592.088, 7938.0581, 966.863, -3.1, -425.045, -8046.6290)) {
                        ;
                        do {
                            if (isnan(-4.2)) {
                                if (true) {
                                    vec2 _GLF_SWITCH_1_83v, _GLF_SWITCH_1_84v;
                                    discard;
                                    _GLF_color;
                                } else {
                                }
                                for (mat3x2 _GLF_SWITCH_1_85v; false; mat2x4(-9.4, -210.050, 4487.1647, 573.244, 148.525, -8.9, 8.6, -58.39)) {
                                    if (((mat4(_GLF_IDENTITY(-3.1, min(-3.1, -3.1)), 691.897, 22.28, -7710.1293, -4.3, -10.80, 453.309, -200.118, -34.40, -80.78, -623.581, -0.5, 959.509, -0.4, 38.27, -2.5) != mat4(-2.9, 53.31, -9.0, -810.363, 1029.2867, 1.2, 5155.2360, -8055.9587, 244.306, 69.71, 532.809, -5.2, -564.260, -4079.6113, 3440.8154, -2.6)) || false)) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            lessThanEqual(_GLF_IDENTITY(vec2(-9.2, -1933.3659), vec2(vec4(vec2(-9.2, -1933.3659), 1.0, 1.0))), uv);
                                        } else {
                                        }
                                        return;
                                        mat3x2(-74.63, 9.5, -515.508, 6.2, -0.5, 8.4);
                                        return;
                                        continue;
                                        vec3(706.374, -5005.4432, 6633.9968).ptsp;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                    bvec3(false, false, true);
                                } else {
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (any(bvec3(true, true, false))) {
                            ;
                            for (mat4x3 _GLF_SWITCH_1_86v; (ivec4(-870, -57181, 35448, -61202) == ivec4(42659, 81591, 25178, 31955)); ((-81767) / ivec3(-14682, -52391, 3011))) {
                                ;
                                {
                                    ivec2(-29285, -64264);
                                    return;
                                    _GLF_SWITCH_1_75v;
                                    false;
                                    break;
                                    continue;
                                    (mat2(7560.5134, -8.6, -5.9, 39.82), _GLF_SWITCH_1_79v);
                                    return;
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        return;
                                    }
                                }
                            }
                            return;
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                mat2x3(1.4, -1358.5581, 9.2, 6189.4310, _GLF_IDENTITY(9.2, (false ? _GLF_FUZZED(radians(7.6)) : _GLF_IDENTITY(9.2, (true ? 9.2 : _GLF_FUZZED(-89.57))))), 0.5);
                            }
                            return;
                            for (bvec4 _GLF_SWITCH_1_87v, _GLF_SWITCH_1_88v[6], _GLF_SWITCH_1_89v[9]; all(bvec2(false, true)); bvec3(true, false, false)) {
                            }
                            {
                                do {
                                    ivec4 _GLF_SWITCH_1_90v, _GLF_SWITCH_1_91v, _GLF_SWITCH_1_92v;
                                    break;
                                    _GLF_SWITCH_1_76v;
                                    discard;
                                    ;
                                    mat2 _GLF_SWITCH_1_93v, _GLF_SWITCH_1_94v;
                                    continue;
                                    mat2x3 _GLF_SWITCH_1_95v, _GLF_SWITCH_1_96v;
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_IDENTITY(_injected_loop_counter--, 0 ^ (_injected_loop_counter--))) {
                                        outerProduct(sinh(vec3(-48.96, 1.8, -66.48)), inversesqrt(_GLF_SWITCH_1_81v));
                                    }
                                } while (false);
                                continue;
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 ^ 0) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                                    if (false) {
                                    } else {
                                        ;
                                        ;
                                    }
                                }
                                mat3x4(mat2x4(2745.8219, 5.0, -2109.7850, -3.7, 8107.8406, -9.1, 7.5, -867.156));
                                vec3(5.0, 8.5, -2.2);
                                vec2 _GLF_SWITCH_1_97v;
                                uint _GLF_SWITCH_1_98v[50];
                            }
                            continue;
                        }
                        mat4(-1906.7719, -2299.5349, 59.70, -53.80, -9.7, 7733.6817, 6.6, -8125.7308, 3781.1654, -1.1, -37.85, 442.199, -0.3, 466.389, -2188.4493, 6.6);
                    }
                    uvec4(89094u, 141926u, 107324u, 71816u);
                } else {
                    {
                        ;
                        if ((_GLF_IDENTITY(false, (false) || false) ^^ true)) {
                            float _GLF_SWITCH_1_99v, _GLF_SWITCH_1_100v, _GLF_SWITCH_1_101v;
                            bvec4 _GLF_SWITCH_1_102v, _GLF_SWITCH_1_103v, _GLF_SWITCH_1_104v;
                            mat3x4 _GLF_SWITCH_1_105v;
                            for (mat4 _GLF_SWITCH_1_106v[88]; (color != color); injectionSwitch) {
                                do {
                                    while (false) {
                                        break;
                                        ((bvec3(true, true, true), -49.18) - mat4(-8.0, -3.1, 437.738, 58.82, -153.549, -5.7, -4.3, -9.4, 7.5, 69.66, 9.7, -602.925, -657.460, -1165.1470, 5992.4892, 927.082));
                                        uint _GLF_SWITCH_1_107v;
                                        (mat3(-8578.7289, 24.26, -1.4, 27.90, -7359.9378, 3.2, 699.433, 9.4, 66.67) / _GLF_SWITCH_1_100v);
                                        (77456 % _GLF_SWITCH_1_0v);
                                        mat3(0.5, 7050.2155, 3.1, 6.9, -770.626, -8.3, -999.825, 5.5, -0.9);
                                        continue;
                                        (67722 ^ ivec2(4837, 12672));
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(length(vec2(0.0, 0.0)), (length(vec2(0.0, 0.0))) * 1.0)))));
                            }
                            2330.0612;
                            matrixCompMult(mat4(3.6, 1.1, -968.274, 591.557, 5655.3043, 2504.4543, -8.2, -9.1, -6.5, -5.2, 6761.1033, 5.4, -5.9, 6.0, -9.8, -8410.7056), mat4(mat4x2(-3742.4908, 91.09, _GLF_IDENTITY(7906.3848, max(7906.3848, _GLF_IDENTITY(7906.3848, float(mat2x3(7906.3848, 0.0, 0.0, 0.0, 0.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))), -3.5, -95.74, 8775.2219, 6.9, -24.97)));
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (false) {
                                    mat3x4(mat3(-8978.9772, 3.6, 7.7, -52.36, -4.2, 2.9, 3.3, -5.9, -9.7));
                                    ivec3(-62376, -44977, -24690);
                                    bvec2(false, true);
                                    uvec3 _GLF_SWITCH_1_108v, _GLF_SWITCH_1_109v, _GLF_SWITCH_1_110v[76];
                                    vec2 _GLF_SWITCH_1_111v[12], _GLF_SWITCH_1_112v;
                                    uvec3(181659u, 185074u, 60869u);
                                    {
                                        mat2x3 _GLF_SWITCH_1_113v[58], _GLF_SWITCH_1_114v;
                                        acos(dFdy(8.5));
                                        bvec3 _GLF_SWITCH_1_115v[39], _GLF_SWITCH_1_116v[8], _GLF_SWITCH_1_117v[57];
                                        ;
                                        ((-5915.7098) * outerProduct(mix(vec4(912.966, 6100.6868, -88.29, 4.2), _GLF_color, -546.846), vec4(-9.7, 5.0, -5978.0966, 8847.7022)));
                                        77136;
                                    }
                                }
                            } else {
                            }
                            injectionSwitch;
                            137208u;
                            for (mat4x3 _GLF_SWITCH_1_118v, _GLF_SWITCH_1_119v[68], _GLF_SWITCH_1_120v; (62834u <= 64188u); mat2(8402.0692, -404.222, 29.07, 1.8)) {
                            }
                            ;
                            injectionSwitch;
                            mat2x3 _GLF_SWITCH_1_121v, _GLF_SWITCH_1_122v[5], _GLF_SWITCH_1_123v;
                            if ((mat3x4(-93.94, -652.301, -111.390, 956.040, 0.5, 9.1, -8964.9941, 7.5, 4.3, 1.1, -5.2, -4065.7804) != mat3x4(2055.1813, 6.1, 5288.4903, -6562.9596, 6.9, -_GLF_IDENTITY(0.1, min(0.1, 0.1)), -0.7, 26.41, 7.5, -45.27, -_GLF_IDENTITY(6.4, clamp(_GLF_IDENTITY(6.4, float(vec4(6.4, 1.0, 1.0, 0.0))), 6.4, 6.4)), 42.91))) {
                                bvec2(true, false);
                                bvec4 _GLF_SWITCH_1_124v;
                                return;
                                if ((mat4x2(-695.673, -44.06, 4879.0912, -8.1, 1434.2123, -137.901, 95.01, 3699.1082) == mat4x2(-5.8, -3276.6433, 7.9, 73.06, 4.4, 2.6, -40.59, -69.49))) {
                                    switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                                        case 84:
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            } else {
                                                bvec2((19622u < 199215u), true);
                                            }
                                        case 0:
                                        case 94:
                                            (87043u - (uvec4(35471u, _GLF_IDENTITY(17093u, (_GLF_IDENTITY(17093u, (17093u) ^ 0u)) | 0u), 171322u, 72843u) + uvec4(89755u, 198527u, 13823u, 130209u))[3]);
                                            (bvec2(true, _GLF_IDENTITY(false, bool(bvec2(false, true)))));
                                        case 52:
                                            ;
                                            return;
                                            bvec4 _GLF_SWITCH_1_125v[74], _GLF_SWITCH_1_126v[22], _GLF_SWITCH_1_127v;
                                            break;
                                        default:
                                            1;
                                    }
                                }
                                uvec3 _GLF_SWITCH_1_128v, _GLF_SWITCH_1_129v[35];
                                while (false) {
                                    continue;
                                    mat4x2 _GLF_SWITCH_1_130v[35], _GLF_SWITCH_1_131v;
                                    ;
                                    (mat3x2(6073.6158, 1915.4832, 15.88, -31.65, 7057.1437, -17.49) * (mat4x3(-2092.5161, -2.7, 86.26, -8.1, -0.0, 611.666, 298.379, 3981.9707, -4.8, -14.93, 2164.2290, 9868.1209) * mat2x4(-8.3, 6.8, 705.444, 5427.9983, -6451.1503, -1421.3397, -5.2, 70.56)));
                                }
                                (uvec3(131367u, 109354u, 170900u) / uvec3(62290u, 153835u, 181369u));
                                for (uvec3 _GLF_SWITCH_1_132v, _GLF_SWITCH_1_133v, _GLF_SWITCH_1_134v; (!(bvec3(true, false, false) != notEqual(ivec3(75212, 39633, 22041), ivec3(59493, -76495, -_GLF_IDENTITY(56777, ~(~(56777))))))); mat3x2(111.966, -566.523, -914.009, -8.1, 21.16, 2223.7660)) {
                                }
                            }
                            (28571u - uint(13.70));
                        }
                        ivec3 _GLF_SWITCH_1_135v, _GLF_SWITCH_1_136v, _GLF_SWITCH_1_137v[23];
                        {
                            mat2x3(-42.38, -4690.0356, -9.7, -61.20, 3.9, -91.41);
                            discard;
                            for (mat3x4 _GLF_SWITCH_1_138v[15], _GLF_SWITCH_1_139v, _GLF_SWITCH_1_140v[69]; ((-92064) >= 10929); floatBitsToUint((vec3(96.38, 29.71, 11.84) * vec3(735.642, -0.4, -3.3))).sp) {
                                {
                                    ((47170 << 2387) ^ _GLF_SWITCH_1_135v);
                                    mat3x4 _GLF_SWITCH_1_141v, _GLF_SWITCH_1_142v, _GLF_SWITCH_1_143v[35];
                                }
                                ivec3 _GLF_SWITCH_1_144v;
                                while (true) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        mat3(-52.40, -85.14, -650.268, -78.65, 2869.0058, 2.5, -74.92, 6385.9965, 3802.3584);
                                    } else {
                                    }
                                    (173583u % uvec4(72612u, 148823u, 151462u, 103246u));
                                    discard;
                                    bvec4 _GLF_SWITCH_1_145v[34], _GLF_SWITCH_1_146v, _GLF_SWITCH_1_147v;
                                    mat3x4(93.56, -823.568, -9.4, 987.651, 190.032, 570.306, 48.86, 2625.8154, -6788.6086, -2.3, 56.98, -44.27);
                                    break;
                                    return;
                                    mat4x2(-863.144, -25.22, 46.00, -14.23, 3952.0349, 2900.7020, -835.132, -2997.3521);
                                    ivec2 _GLF_SWITCH_1_148v, _GLF_SWITCH_1_149v, _GLF_SWITCH_1_150v[46];
                                }
                                while (false) {
                                    (mat3(-588.120, -8936.9744, -2856.3601, 2925.2578, -322.867, -35.88, 5.9, -82.72, 686.983) * mat2x3(-5408.8640, -128.603, -9.3, -6.4, 5.3, 2354.3547));
                                    bool _GLF_SWITCH_1_151v;
                                    bitCount((36784u + 89209u));
                                    int _GLF_SWITCH_1_152v, _GLF_SWITCH_1_153v;
                                    color;
                                }
                                if (true) {
                                    (ivec3(-70969, -32496, -40167) == _GLF_SWITCH_1_144v);
                                    mat3x4(_GLF_color, vec4(5.6, 2161.1229, -22.49, -7.9), vec4(7.8, -73.90, -7.2, -1814.3094));
                                }
                            }
                            for (bvec2(bvec3(false, true, true))[0]; true; bvec3(false, false, false)) {
                                do {
                                    max(findLSB(uvec3(92983u, 73290u, 100778u)), _GLF_IDENTITY(_GLF_SWITCH_1_136v, ivec3(_GLF_SWITCH_1_136v[0], _GLF_SWITCH_1_136v[1], _GLF_SWITCH_1_136v[2])));
                                } while (false);
                                if (((mat4x3(-3.7, 5057.9579, -5.9, -5.8, 6.4, 3.2, 6.0, 2851.0680, 7503.3360, 4.2, 8.4, -7.5) - mat4x3(mat4(18.52, -325.549, 5.1, 1.2, 3.1, -1.7, 7733.6408, 1604.7406, -9.1, 2.2, 5311.9846, -3882.9452, -3465.4435, -969.948, 3.3, -0.3))) != mat4x3(vec3(-3.9, 12.07, -9127.7446)[2]))) {
                                }
                                discard;
                                uvec4 _GLF_SWITCH_1_154v;
                            }
                            ivec2(60260, -77225);
                            while ((true && true)) {
                                mat3 _GLF_SWITCH_1_155v, _GLF_SWITCH_1_156v;
                                mat2x3 _GLF_SWITCH_1_157v;
                                {
                                }
                                if (true) {
                                    (ivec4(8696, 86120, 17855, -97061) >> clamp(_GLF_SWITCH_1_0v, bitCount(74674u), 83858));
                                    continue;
                                    ;
                                    radians(color);
                                    mat4(float(true), 914.741, 8.8, fwidth(458.539), round(79.88), -109.289, -46.86, 2918.4084, -93.47, reflect(778.575, step(-7803.5588, -6243.0314)), 4.9, round(25.63), 543.037, -8973.8508, -5.7, _GLF_IDENTITY(-4500.7126, (-4500.7126) * 1.0));
                                } else {
                                    bvec3(false, true, true);
                                }
                                {
                                    ;
                                    -77.17;
                                    mat2x3 _GLF_SWITCH_1_158v, _GLF_SWITCH_1_159v;
                                    (mat2x4(6939.3343, -304.011, 26.89, -418.979, 9408.3861, 4.1, 3.7, 54.93) * mat4x2(5.1, -165.419, 1.8, 44.99, 9.1, 7230.9332, -0.1, -23.31));
                                    float _GLF_SWITCH_1_160v, _GLF_SWITCH_1_161v, _GLF_SWITCH_1_162v[26];
                                    (146708u >> 110111u);
                                    vec4 _GLF_SWITCH_1_163v, _GLF_SWITCH_1_164v[22], _GLF_SWITCH_1_165v[95];
                                    ivec4 _GLF_SWITCH_1_166v;
                                    _GLF_SWITCH_1_0v;
                                }
                                _GLF_SWITCH_1_156v;
                            }
                        }
                        discard;
                        for (mat4x3(-941.057, -2.3, -1.1, 727.430, 5.2, 2.9, -89.67, 6.6, -264.832, -40.05, -8229.7177, -1.3); false; ivec4(-54799, 11504, 32711, -15395).zwyy) {
                            while ((((-1.4) - mat2x4(7.8, 0.5, -9.0, -1.1, -0.5, 7.8, 654.155, 46.00)) != mat2x4(-18.92, 699.189, 3.9, 4.7, 2.4, -72.14, -292.765, 9889.5185))) {
                            }
                            uv;
                            injectionSwitch;
                            while ((171510u >= 8600u)) {
                                {
                                    mat3x4 _GLF_SWITCH_1_167v;
                                    mat2x3(47.04, -676.828, 131.269, -7.8, 6.3, -9.3);
                                    mat4x2 _GLF_SWITCH_1_168v, _GLF_SWITCH_1_169v;
                                    bvec4(true, true, false, false);
                                    return;
                                    continue;
                                    float _GLF_SWITCH_1_170v;
                                    (ivec4(-95914, 33225, -93315, 59760) ^ _GLF_SWITCH_1_0v);
                                    mat2(3.2, -5.6, 3271.9521, -0.0);
                                }
                                bvec2 _GLF_SWITCH_1_171v;
                                if ((false || false)) {
                                    return;
                                    36620;
                                    ;
                                    int _GLF_SWITCH_1_172v[17], _GLF_SWITCH_1_173v;
                                    mat4x2 _GLF_SWITCH_1_174v, _GLF_SWITCH_1_175v, _GLF_SWITCH_1_176v;
                                    vec4 _GLF_SWITCH_1_177v, _GLF_SWITCH_1_178v, _GLF_SWITCH_1_179v[72];
                                    uint _GLF_SWITCH_1_180v, _GLF_SWITCH_1_181v, _GLF_SWITCH_1_182v;
                                }
                                discard;
                                continue;
                                while (((_GLF_IDENTITY(uvec3(168555u, 66468u, 55368u) & uvec3(109391u, 187283u, 93140u), uvec3(_GLF_IDENTITY(uvec4(uvec3(168555u, 66468u, 55368u) & uvec3(109391u, 187283u, 93140u), (156601u & 0u)), uvec4(1u, 1u, 1u, 1u) * (_GLF_IDENTITY(uvec4(uvec3(168555u, 66468u, 55368u) & uvec3(109391u, 187283u, 93140u), (156601u & 0u)), (uvec4(uvec3(168555u, 66468u, 55368u) & uvec3(109391u, 187283u, 93140u), (156601u & 0u))) ^ uvec4(0u, 0u, 0u, 0u))))))) == uvec3(139159u, 42111u, 147198u))) {
                                    mat2 _GLF_SWITCH_1_183v;
                                    _GLF_SWITCH_1_2v;
                                    atan(vec2(88.82, -166.306), injectionSwitch);
                                    mat2x4(360.437, 2.9, -9712.9682, -0.4, 75.38, 0.2, 41.70, -3.9);
                                    mat3 _GLF_SWITCH_1_184v, _GLF_SWITCH_1_185v;
                                    uvec4 _GLF_SWITCH_1_186v[67], _GLF_SWITCH_1_187v, _GLF_SWITCH_1_188v;
                                    mat3x4 _GLF_SWITCH_1_189v, _GLF_SWITCH_1_190v, _GLF_SWITCH_1_191v;
                                    return;
                                    mat3x4 _GLF_SWITCH_1_192v, _GLF_SWITCH_1_193v;
                                }
                                while (false) {
                                    continue;
                                    vec3 _GLF_SWITCH_1_194v, _GLF_SWITCH_1_195v;
                                    float _GLF_SWITCH_1_196v, _GLF_SWITCH_1_197v, _GLF_SWITCH_1_198v;
                                    _GLF_SWITCH_1_0v.wxz;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        transpose(mat3x2(6.8, -7.7, 5783.6285, 81.41, -39.89, 4828.6368));
                                    } else {
                                    }
                                    ivec3 _GLF_SWITCH_1_199v, _GLF_SWITCH_1_200v;
                                    _GLF_SWITCH_1_196v;
                                    mat3(-0.5, -0.6, 44.66, -3885.5938, -58.82, -3134.9180, _GLF_IDENTITY(-66.29, _GLF_IDENTITY(float(float(-66.29)), clamp(float(float(-66.29)), float(float(-66.29)), float(float(-66.29))))), 1812.7934, 5709.9615);
                                    uvec4((_GLF_SWITCH_1_2v, uvec2(26527u, 141692u)), uvec2(183918u, 197413u));
                                }
                                break;
                            }
                            do {
                                mat2(-2.9, 3.4, -8.2, 9.6);
                            } while (_GLF_WRAPPED_LOOP(false));
                            mat4x2(939.544, -3.7, -6045.1285, -2.7, 6.4, -132.694, 2.5, -2.4);
                            (pow(color, sign(color)) * ((vec4(-8215.0321, _GLF_IDENTITY(-83.89, float(_GLF_IDENTITY(mat4(_GLF_IDENTITY(-83.89, (_GLF_IDENTITY(-83.89, (-83.89) / 1.0)) / 1.0), 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(mat4(-1.1, -0.5, -40.23, -3.8, -5028.0749, 1.3, 9.7, 46.01, 75.92, -5.3, -87.18, -3.0, 710.836, -5.1, 46.79, -9.2)) : mat4(_GLF_IDENTITY(-83.89, (_GLF_IDENTITY(-83.89, (-83.89) / 1.0)) / 1.0), 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0))))), 29.50, -3.3) == _GLF_color) ? mat2x3(-33.12, -2300.9010, -9088.5017, -3.6, 2.6, -9023.6937) : mat2x3(8.0, -8.5, -5309.4270, 33.60, 8.9, -72.58)));
                            do {
                                for (mat2x3(-8017.3739, -0.9, 48.30, 60.41, 54.04, 6768.2303); (true == false); -77094) {
                                    switch (_GLF_SWITCH((0 << _GLF_IDENTITY(int(2), int(2))))) {
                                        case 62:
                                            ;
                                        case 0:
                                            while (false) {
                                                ivec2(bitfieldInsert(clamp(_GLF_SWITCH_1_0v, ivec4(71106, -88350, -87793, -52682), _GLF_SWITCH_1_2v), ivec4(86714, -18656, -17656, 27278), 39610, 75724));
                                                bitCount(ivec2(82637, -3857))[0];
                                            }
                                        case 38:
                                            do {
                                                mat3x4 _GLF_SWITCH_1_201v[41], _GLF_SWITCH_1_202v[39];
                                                mat2(4775.6257, -732.296, 6.8, -9.7);
                                                mat3x4(3672.4323, -9.7, -5.0, 641.959, -881.242, 8846.6351, 51.10, -363.591, 1.9, 3850.0344, -334.091, -6.3);
                                                uvec3(8882u, 103854u, 42378u);
                                                transpose(mat4(44.62, 66.70, 299.604, 7.3, 6748.1125, -92.28, 41.74, 10.08, 739.546, -960.886, 484.184, -91.79, 6109.3127, 2.7, 312.632, 87.97));
                                                return;
                                                return;
                                                ((7.4 * mat3x2(-96.54, 87.50, -471.515, 910.894, -140.399, 97.02)) - mat3x2(-156.635, 4721.1023, 3.8, 5.7, -25.77, 7765.7734));
                                            } while (true);
                                            (mat3(3.8, 50.02, -2.2, 1.5, 66.53, -49.62, 75.49, -2064.1649, -6951.5440) * (-848.179));
                                        case 31:
                                        case 85:
                                            for ((_GLF_IDENTITY(mat2(3.1, 723.042, 12.04, -91.84), (_GLF_IDENTITY(mat2(3.1, 723.042, 12.04, -91.84), (false ? _GLF_FUZZED(mat2(81.17, -95.73, -9.8, 4250.5531)) : mat2(3.1, 723.042, 12.04, -91.84)))) / mat2(1.0, 1.0, 1.0, 1.0)) * mat2(5250.4321, -1.5, -5.1, -642.408)); true; (mat2x3(-90.40, -5.8, -8.4, -203.403, -3.8, 677.362) == mat2x3(mat3(62.95, 9309.8198, 8.4, -3.2, -8938.8207, 1827.3319, -4.4, 4.1, 773.550)))) {
                                            }
                                            continue;
                                            bvec3 _GLF_SWITCH_1_203v, _GLF_SWITCH_1_204v;
                                            ;
                                            _GLF_SWITCH_1_203v;
                                            break;
                                        default:
                                            1;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            findLSB(ivec3(-49365));
                        }
                    }
                    (56.61 + mat2x3(-980.595, -_GLF_IDENTITY(0.9, (false ? _GLF_FUZZED(4.8) : _GLF_IDENTITY(0.9, clamp(0.9, _GLF_IDENTITY(0.9, min(0.9, 0.9)), 0.9)))), -8563.4790, -154.584, 3.4, 3.7));
                    ;
                    mat3x2(-4979.3587, -8817.7143, -9571.0235, 2.8, 49.04, -4.5);
                }
            case 33:
                if (false) {
                    bvec2 _GLF_SWITCH_1_205v, _GLF_SWITCH_1_206v[85];
                    (mat2x3(4.3, 1725.7401, 4823.8219, 6.7, -2329.6282, 4829.5128) - mat2x3(568.495, -490.416, -22.67, 42.56, 1.5, -6363.2335));
                } else {
                }
            default:
                1;
        }
    }
    if (uv.x > (2.0 / 4.0)) {
        color.y += float(obj.numbers[2]);
    }
    if (uv.x > (3.0 / 4.0)) {
        do {
            color.z += float(obj.numbers[3]);
        } while (_GLF_WRAPPED_LOOP(false));
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        color.y += float(obj.numbers[4]);
    } else {
    }
    {
        switch (_GLF_SWITCH((((-88665) & 0) << _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), int(_GLF_IDENTITY(ivec3(int(8), 0, 0), (ivec3(int(8), 0, 0)) / ivec3(1, 1, 1)))))))) {
            case 0:
            case 69:
            case 31:
            case 16:
                vec4 _GLF_outVarBackup_GLF_color;
            case 11:
            case 75:
            case 66:
                _GLF_outVarBackup_GLF_color = _GLF_color;
            case 81:
            case 27:
            case 20:
                _GLF_color = unpackUnorm4x8(packSnorm2x16(vec2(9.8, -730.699)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                break;
            case 26:
                return;
            default:
                1;
        }
    }
    if (uv.y > (1.0 / 4.0)) {
        color.x += float(obj.numbers[5]);
    }
    if (uv.y > (2.0 / 4.0)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outlined_1(_GLF_color);
        }
        color.y += float(obj.numbers[6]);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = step(136.593, mod(vec4(1.4, -2443.2071, -7.4, -23.09), vec4(-0.5, 71.22, -6774.3627, -9.7)));
    }
    if (uv.y > (3.0 / 4.0)) {
        color.z += float(obj.numbers[7]);
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            _GLF_color = _GLF_outlined_0();
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    color.z += float(obj.numbers[8]);
    if (abs(uv.x - uv.y) < 0.25) {
        color.x += float(obj.numbers[9]);
    }
    _GLF_color = vec4(normalize(color), 1.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = clamp(_GLF_color, 74.66, -28.90);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (_GLF_IDENTITY(0, (0) / 1) ^ 1)); _injected_loop_counter++) {
                _GLF_color = ((-9961.6426) * vec4(-7247.5681, 0.8, -92.99, 4303.6168));
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}
