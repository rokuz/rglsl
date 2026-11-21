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

struct _GLF_struct_5 {
    bool _f0;
};

struct _GLF_struct_4 {
    bvec4 _f0;
    bvec3 _f1;
    uvec3 _f2;
    bvec2 _f3;
    uvec2 _f4;
    uvec2 _f5;
};

struct _GLF_struct_3 {
    int _f0;
    _GLF_struct_4 _f1;
    ivec4 _f2;
    ivec2 _f3;
    int _f4;
    _GLF_struct_5 _f5;
    int top;
    uvec2 _f6;
};

struct _GLF_struct_2 {
    ivec4 _f0;
    vec2 _f1;
};

struct _GLF_struct_1 {
    vec4 _f0;
    mat4 _f1;
    vec4 _f2;
    uvec3 _f3;
    vec4 _f4;
    bvec2 _f5;
    _GLF_struct_2 _f6;
};

struct _GLF_struct_0 {
    _GLF_struct_1 _f0;
    mat2x3 _f1;
    _GLF_struct_3 _f2;
    uvec3 _f3;
    mat4x3 _f4;
};

struct _GLF_struct_11 {
    ivec4 _f0;
    uvec4 _f1;
    ivec4 _f2;
    ivec2 _f3;
};

struct _GLF_struct_10 {
    uvec2 _f0;
    uvec2 _f1;
    ivec3 _f2;
    vec3 _f3;
    mat2 _f4;
    ivec4 _f5;
    bvec2 _f6;
};

struct _GLF_struct_9 {
    vec3 _f0;
    int _f1;
    int _f2;
};

struct _GLF_struct_8 {
    mat4x2 _f0;
    mat4 _f1;
};

struct _GLF_struct_7 {
    _GLF_struct_8 _f0;
    _GLF_struct_9 _f1;
    _GLF_struct_10 _f2;
    ivec3 _f3;
};

struct _GLF_struct_6 {
    vec3 _f0;
    uvec4 _f1;
    mat2x4 _f2;
    _GLF_struct_7 _f3;
    mat2x4 _f4;
    vec4 _f5;
    vec2 uv;
    _GLF_struct_11 _f6;
};

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
    obj.numbers[i] = obj.numbers[j];
    obj.numbers[j] = temp;
}

int performPartition(int l, int h) {
    int pivot = obj.numbers[h];
    {
        switch (_GLF_SWITCH(0)) {
            case 60:
                {
                    for (clamp(min(floatBitsToInt(vec3(6.7, 690.267, 7.6)), pivot), ivec3(-46356, -43767, -18110), ivec3(73429, 25302, -43891)); false; max(vec4(-86.55, 8.3, 543.768, -20.19), faceforward(_GLF_IDENTITY(_GLF_color, mat4(1.0) * (_GLF_color)), trunc(vec4(-0.3, 17.41, -5095.2648, -4.3)), _GLF_color))) {
                        switch (_GLF_SWITCH(0)) {
                            case 0:
                                mat3x4(mat2(-148.332, -9.6, -9009.0147, -6.7));
                            case 54:
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                }
                                while (true) {
                                    mat3 _GLF_SWITCH_0_0v;
                                    ;
                                    mat2x4 _GLF_SWITCH_0_1v;
                                    mat3 _GLF_SWITCH_0_2v[10], _GLF_SWITCH_0_3v[44], _GLF_SWITCH_0_4v;
                                    ivec3 _GLF_SWITCH_0_5v, _GLF_SWITCH_0_6v;
                                    mat2 _GLF_SWITCH_0_7v[82], _GLF_SWITCH_0_8v[87], _GLF_SWITCH_0_9v;
                                    mat3 _GLF_SWITCH_0_10v, _GLF_SWITCH_0_11v, _GLF_SWITCH_0_12v;
                                    matrixCompMult(mat2x3((true ? mat4(175.274, 8.7, -7.1, 186.927, 2.9, -7072.6813, 760.028, -4.2, 471.815, 596.723, 2.4, -3.8, -252.472, 3.3, -41.28, -109.697) : mat4(-9.6, 28.89, 3.6, 3.3, -1.0, 2.1, 683.466, 90.03, -860.448, 7354.9346, 6.6, -142.025, 1.8, 730.392, -460.720, 168.660))), mat2x3(outerProduct(resolution, vec4(-_GLF_IDENTITY(14.11, (_GLF_IDENTITY(14.11, mix(float(14.11), float(_GLF_FUZZED(3288.8341)), bool(false)))) - 0.0), -3491.8181, 4.3, 1.1))));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = radians(vec4(37.34, 98.36, -1.7, -2374.1408));
                                }
                            case 57:
                                if ((resolution.tstt == fract(_GLF_color))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-216.284, -187.346, -12.19, 90.98);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    mat2x3 _GLF_SWITCH_0_13v;
                                    (180080u + uvec3(34294u, 135017u, 199653u));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        discard;
                                        (_GLF_SWITCH_0_13v - _GLF_SWITCH_0_13v);
                                        bool _GLF_SWITCH_0_14v;
                                        mat4x3 _GLF_SWITCH_0_15v, _GLF_SWITCH_0_16v;
                                        mat4(-8.9, -4.3, -442.237, -69.30, 182.131, -9538.5279, -6073.2463, -2.4, -6056.7038, 8.6, 3.9, -2.9, _GLF_IDENTITY(-9592.4252, (_GLF_IDENTITY(-9592.4252, float(mat4x3(-9592.4252, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0)))) + 0.0), 2205.0703, 8.9, -767.599);
                                        bvec3 _GLF_SWITCH_0_17v[25], _GLF_SWITCH_0_18v, _GLF_SWITCH_0_19v[23];
                                        _GLF_SWITCH_0_15v;
                                    }
                                    mat4x2 _GLF_SWITCH_0_20v, _GLF_SWITCH_0_21v[27], _GLF_SWITCH_0_22v;
                                    continue;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = dFdxCoarse(vec4(579.618, 19.27, 8901.0338, -1.7));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    do {
                                        uvec2(189980u, 15764u);
                                        if ((_GLF_IDENTITY(uvec3(29489u, 136659u, 152117u) == uvec2(82136u, 186990u).sss, bool(bool(_GLF_IDENTITY(uvec3(29489u, 136659u, 152117u) == uvec2(82136u, 186990u).sss, !(!(uvec3(29489u, 136659u, 152117u) == uvec2(82136u, 186990u).sss)))))))) {
                                            bvec3 _GLF_SWITCH_0_23v;
                                            uint _GLF_SWITCH_0_24v[12], _GLF_SWITCH_0_25v, _GLF_SWITCH_0_26v;
                                            mat3x2(68.46, -5.5, -92.14, 978.317, -6.1, 0.9);
                                            ivec2(-74182, -99344);
                                            mat4x3 _GLF_SWITCH_0_27v, _GLF_SWITCH_0_28v, _GLF_SWITCH_0_29v;
                                            mat2(mat3x2(1884.5514, 603.291, 758.227, 185.758, -909.700, -9806.0148));
                                            float _GLF_SWITCH_0_30v, _GLF_SWITCH_0_31v, _GLF_SWITCH_0_32v;
                                        } else {
                                        }
                                        vec3(-3331.8742, 226.990, 9120.6850);
                                        (5958.6016 - ((-mat2x3(3.7, 9677.3849, -41.71, -281.452, -7103.4531, 66.96)) * mat4x2(-8.4, 8151.3483, 6588.4052, 14.75, -1064.0027, 6.9, -3234.7913, 28.57)));
                                        for (isinf(resolution); (false == (mat3(mat2(-544.584, -73.68, 2483.9339, 6.0)) != (true ? mat3(-3.1, -7370.2685, 2.5, 22.91, 7.5, 14.34, 10.25, -700.630, -2.6) : mat3(-7075.5055, -480.825, -8.7, 972.412, 0.4, -374.644, 39.59, 429.249, -5.9)))); bvec2(true, false)) {
                                            bvec2 _GLF_SWITCH_0_33v;
                                            mat4x3 _GLF_SWITCH_0_34v, _GLF_SWITCH_0_35v, _GLF_SWITCH_0_36v;
                                            mix((15128, vec2(4.1, -2.7)), injectionSwitch, 4.2);
                                            break;
                                            bvec4(bvec3(true, true, true), true);
                                            ;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(0.0, -4.5, 5.3, 99.69);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            (atanh(-8.0) + mat3(mat4x2(-0.0, 49.23, -5588.6062, -6942.5550, -9.7, -3.4, 8467.2234, -6.2)));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = outerProduct(_GLF_color, _GLF_color)[2];
                                            }
                                            max(mix(ivec4(47241, 76642, -16764, -39376), ivec4(21817, -9690, 77699, -80441), bvec4(true, true, true, false)), ivec4(-78143, -71919, 82573, -85495));
                                            mat2x4 _GLF_SWITCH_0_37v, _GLF_SWITCH_0_38v, _GLF_SWITCH_0_39v;
                                        }
                                    } while (false);
                                    mat4x2((mat3x2(-4127.2557, 4667.7459, -45.92, -7.7, -549.976, 5.1) + mat3x2(-907.702, 8.4, 8.1, 9943.0355, -24.08, 6.0)));
                                }
                                mat4x2(-6.9, 6.3, 43.55, -39.71, -2774.9278, 6.9, -595.000, -9.1);
                            case 62:
                                while ((false || true)) {
                                    int _GLF_SWITCH_0_40v;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = uintBitsToFloat((142231u / uvec4(1243u, 177631u, 119329u, 43067u)));
                                    }
                                    uvec2(159845u, 101904u);
                                    if ((_GLF_IDENTITY(uvec3(145933u, 66659u, 71092u) != (uvec3(191304u, 115011u, 32682u) << 191652u), true && (uvec3(145933u, 66659u, 71092u) != (uvec3(191304u, 115011u, 32682u) << 191652u))))) {
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = clamp(vec4(-29.47, 70.79, 93.55, -193.822), mod(vec4(-7.8, -5.1, 7492.5219, 700.397), vec4(59.25, -72.15, -2.4, -6.3)), vec4(611.348, -3418.2224, 796.189, -530.171));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        continue;
                                        return pivot;
                                        bvec4 _GLF_SWITCH_0_41v, _GLF_SWITCH_0_42v, _GLF_SWITCH_0_43v;
                                        ivec4 _GLF_SWITCH_0_44v[14], _GLF_SWITCH_0_45v;
                                        {
                                            ;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = fwidthFine(_GLF_IDENTITY(vec4(-50.94, 0.6, -4448.9226, -4049.8269), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? vec4(-50.94, 0.6, -4448.9226, -4049.8269) : _GLF_FUZZED(tan(vec4(747.748, 2.4, 9999.7879, -3.8))))));
                                            }
                                            (determinant(mat2(mat2x4(-79.58, -2.0, 3390.9474, 3135.0335, -87.36, 7.3, 9750.7957, 9.3))) * mat4x3(572.515, 9303.3674, 327.000, -2154.8946, -2.2, -17.87, _GLF_IDENTITY(3.6, min(_GLF_IDENTITY(3.6, float(_GLF_IDENTITY(mat2(3.6, sin(0.0), 1.0, 1.0), (true ? mat2(3.6, sin(0.0), 1.0, 1.0) : _GLF_FUZZED(mat2(-4.4, 74.97, -432.523, -5081.0525)))))), 3.6)), 45.61, _GLF_IDENTITY(289.757, clamp(_GLF_IDENTITY(289.757, float(vec3(289.757, 0.0, 0.0))), 289.757, 289.757)), -19.69, -3.8, 7.0));
                                            mat2x3(-317.004, -1.8, 7.4, -1.7, 2482.2870, 56.64);
                                            continue;
                                            mat2x3(mat3(-7705.3438, 3.5, 4.6, 710.970, -5708.0091, 401.474, 86.63, 38.55, 5916.9802));
                                            smoothstep(vec3(-283.491, -91.99, -89.65), vec3(-11.72, 96.12, 83.90), min(vec3(0.3, -349.870, -82.56), vec3(-0.2, -9.6, 28.40)));
                                        }
                                        continue;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-6.6, -3889.6043, 6.2, -70.38);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (acosh(vec4(3.8, 4.4, -4312.0502, 222.540)) * _GLF_color);
                                        }
                                    } else {
                                        {
                                            ivec4(-9545, -33740, 99319, 94484);
                                        }
                                        ((ivec2(22549, 89608) + _GLF_SWITCH_0_40v) | l);
                                    }
                                    ivec3(-75629, -53789, 59976).p;
                                    mat3x2 _GLF_SWITCH_0_46v, _GLF_SWITCH_0_47v;
                                    uvec2(165719u, 59657u);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = vec4(-9.3, vec3(1.9, -5.4, -4.8));
                                    }
                                    if (true) {
                                        while (_GLF_IDENTITY(true, (true) || false)) {
                                            continue;
                                            return ivec3(63542, 63293, -8255)[0];
                                            (-mat2(-7.8, 96.81, -4.6, 8262.6649));
                                        }
                                        {
                                            mat2x3 _GLF_SWITCH_0_48v[62], _GLF_SWITCH_0_49v, _GLF_SWITCH_0_50v[44];
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-1.5, 24.25, 2741.1269, 6.1);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (mat4(-36.93, -3.5, 8341.9331, -4.6, 1.4, 1147.3034, -4935.2552, -267.590, -91.40, 0.0, 512.870, -1.8, -542.490, -626.175, 31.30, -1.8) * vec4(4.3, -3.5, -96.74, 7413.4997));
                                            }
                                            mat4x3(-7.4, 185.740, -4.2, -6.1, 79.53, 29.47, _GLF_IDENTITY(-4881.6735, min(-4881.6735, _GLF_IDENTITY(-4881.6735, max(-4881.6735, -4881.6735)))), 15.34, 922.221, 9415.9741, -2.4, 0.8);
                                            return pivot;
                                            ;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_IDENTITY(_GLF_color = _GLF_color, (true ? (_GLF_color = _GLF_color) : _GLF_FUZZED(ceil(_GLF_color))));
                                        }
                                    }
                                    bvec2 _GLF_SWITCH_0_51v[54], _GLF_SWITCH_0_52v;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            case 10:
                                for (bvec2 _GLF_SWITCH_0_53v, _GLF_SWITCH_0_54v[64], _GLF_SWITCH_0_55v; false; (mat2x3(-1595.1171, -6.8, -9.1, 26.60, 24.19, -28.67) == mat2x3(-6.3, -76.32, 9.6, -46.54, -2.5, -4635.0397))) {
                                    switch (_GLF_SWITCH(0)) {
                                        case 96:
                                            uvec4(107890u, 199655u, 116105u, 199906u);
                                        case 47:
                                            ivec3(clamp(-38149, l, pivot), 44664, h);
                                        case 0:
                                            if (equal((uvec4(194298u, 124507u, 93319u, 195841u) + uvec4(92652u, 162871u, 167128u, 197185u)), uvec4(184001u, 144516u, 52439u, 22950u)).r) {
                                                _GLF_color;
                                                for (bvec4 _GLF_SWITCH_0_56v[64], _GLF_SWITCH_0_57v[31]; true; mat4x2(matrixCompMult((78.33 * mat3(-2.2, 214.490, -2063.2292, 387.105, -0.6, -43.09, 2208.1976, 9560.0203, -0.6)), mat3(-6.3, -8.8, 878.673, -168.385, -1.9, -7404.0149, -370.864, 9984.1551, -773.600)))) {
                                                    ;
                                                    uvec4(157034u, 127884u, 56842u, 18397u);
                                                    return (~_GLF_IDENTITY(l, 1 * (l)));
                                                    continue;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = vec4(-1860.0391, 8866.3270, 6.5, -56.50);
                                                }
                                                ((ivec2(92299, -25148), (_GLF_IDENTITY((-6562.9346), mix(float(_GLF_FUZZED(-0.5)), float((-6562.9346)), bool(true))) * mat4x3(-2.5, 8.8, 6.6, 6318.2993, 43.74, 0.6, -830.500, 2194.8687, -9050.1666, -56.49, 10.04, -7617.8567))));
                                            }
                                            vec3(-8.9, -2468.1967, 8197.8114);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = vec4(-1.0, 8.6, 1309.9764, 9.8);
                                            }
                                            continue;
                                            for (mat3 _GLF_SWITCH_0_58v[71]; true; mat2x3(2042.5557)) {
                                                (acosh(3.2) != 74.10);
                                                for (bvec4(true, true, false, true); false; injectionSwitch) {
                                                    return pivot;
                                                    ;
                                                    (mat4(-702.933, -2.3, -8.6, -6441.4664, 1.9, -1.7, -9.8, 1.6, 6.5, -54.52, -2.1, -2.0, 10.12, -4965.6796, -9.9, 165.382) == mat4(-0.4, -_GLF_IDENTITY(1.3, min(1.3, 1.3)), -13.50, -4.3, -990.602, -9.5, 424.771, -8.7, -45.05, -842.967, 7.5, -758.258, 5277.5986, 43.54, 3.1, -9037.9430));
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = vec4(-226.562, 93.77, -8464.3254, -35.25);
                                                    }
                                                    max(uvec3(115107u, 189902u, 77324u), uvec3(91021u, 129930u, 114219u));
                                                    continue;
                                                    fwidthCoarse(injectionSwitch);
                                                    vec3 _GLF_SWITCH_0_59v;
                                                }
                                                ((+mat2x4(7489.5462, -2.3, -9412.4941, -6.7, 3587.1487, -2.9, -47.13, 8.3)) + (mat2x4(-6.5, -693.807, 762.483, _GLF_IDENTITY(-55.98, clamp(-55.98, -55.98, -55.98)), 49.72, 7.1, -9.9, 0.2) / mat2x4(8.6, 5.2, -6.4, -_GLF_IDENTITY(0.7, (false ? _GLF_FUZZED(dot(injectionSwitch, mix(injectionSwitch, vec2(975.588, 25.62), _GLF_SWITCH_0_55v))) : 0.7)), -6459.4125, -4.9, -1.7, 3.0)));
                                                if (false) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = asin(vec4(6.1, -185.109, 95.26, -39.62));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    continue;
                                                    discard;
                                                    uvec2(65396u, 162168u);
                                                    continue;
                                                    return (-int(fwidthCoarse(-7.6)));
                                                    uvec2 _GLF_SWITCH_0_60v, _GLF_SWITCH_0_61v;
                                                } else {
                                                    mat3(-_GLF_IDENTITY(75.50, min(75.50, 75.50)), -7.9, 608.638, 30.52, 7641.0101, -96.80, -5.3, -7.0, -146.181);
                                                    (ivec3(90473, -22296, 92866) - l);
                                                    break;
                                                    break;
                                                    break;
                                                    uvec2 _GLF_SWITCH_0_62v;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = radians((-vec4(2.7, 7.6, 5.3, -2.8)));
                                                    }
                                                }
                                                while (((-91730) < l)) {
                                                }
                                                mat3x4 _GLF_SWITCH_0_63v, _GLF_SWITCH_0_64v, _GLF_SWITCH_0_65v;
                                                for (mat4x2 _GLF_SWITCH_0_66v[71], _GLF_SWITCH_0_67v; (true == true); bitCount(68883u)) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-360.723, -532.834, -48.09, 3.3);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    bvec3(bvec4(true, false, true, false));
                                                    break;
                                                    ;
                                                    continue;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                        _GLF_color = smoothstep(-4.7, 82.48, uintBitsToFloat(uvec4(116654u, 93344u, 69367u, 49989u)));
                                                    }
                                                    continue;
                                                    clamp(ivec3(-53302, 83072, 21363), l, pivot);
                                                    return bitCount(l);
                                                }
                                                bool _GLF_SWITCH_0_68v;
                                            }
                                        case 36:
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-3.1, 3607.4381, 24.37, 446.147);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            bvec4(false, true, true, true);
                                        case 59:
                                            for (mat4 _GLF_SWITCH_0_69v, _GLF_SWITCH_0_70v, _GLF_SWITCH_0_71v; false; _GLF_SWITCH_0_55v) {
                                                uvec2(83636u, 30425u);
                                                mat4 _GLF_SWITCH_0_72v[75], _GLF_SWITCH_0_73v;
                                            }
                                            {
                                                ;
                                                uint _GLF_SWITCH_0_74v, _GLF_SWITCH_0_75v[19], _GLF_SWITCH_0_76v;
                                                {
                                                    mat4x3(0.9, -6192.5677, 22.13, 1.3, 8.1, 60.33, -32.03, -4.6, 29.80, -745.106, -4604.4941, -0.5);
                                                    determinant(mat2(93.44, 4068.4932, 2726.8633, 67.99));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(_GLF_IDENTITY(-4.9, 0.0 + (_GLF_IDENTITY(-4.9, (true ? (-4.9) : _GLF_FUZZED(4806.6942))))), 2.2, 2.2, -62.76);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    bvec2(bvec3(false, true, false));
                                                    continue;
                                                    floor(vec3(-3.7, 770.466, -98.30));
                                                    vec3 _GLF_SWITCH_0_77v, _GLF_SWITCH_0_78v, _GLF_SWITCH_0_79v[90];
                                                    continue;
                                                    mix(lessThanEqual(ivec2(-17184, 80818), ivec2(-52355, 73052)), greaterThanEqual(uvec2(_GLF_SWITCH_0_74v, _GLF_SWITCH_0_76v), uvec2(128612u, 94906u)), bvec2(false, true));
                                                    bool _GLF_SWITCH_0_80v;
                                                }
                                                uvec2 _GLF_SWITCH_0_81v;
                                                for ((l % 4978); _GLF_IDENTITY(false, (false) || false); _GLF_SWITCH_0_55v) {
                                                    ((mat4x2(-41.65, 2.8, 4.8, -924.145, -5820.8141, -2.5, 0.6, -3.1) == mat4x2(131.430, 9.1, -9331.6303, 95.17, 10.33, 1.0, -198.933, -3.2)) || true);
                                                    mat2x4(8.3, 5.0, -971.130, 0.0, -90.58, 57.45, -879.471, 9.9);
                                                    mat4(-8.3, 2.6, 3.1, -238.140, 4.7, -246.548, 3.4, -8.9, -4.5, 300.772, 2736.3895, 7.4, 60.85, -5.7, 8.6, -3635.8729);
                                                    uvec4(75617u, 196266u, 171390u, 142183u);
                                                }
                                                mat3x4(513.962, -19.89, -975.809, -967.784, -9.5, -4.9, -6594.5489, 558.462, -_GLF_IDENTITY(14.97, min(14.97, 14.97)), -261.709, 22.38, -0.0);
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = fma(vec4(-5.6, 5796.0380, -1.6, -3.3), vec4(744.721, 40.04, 2760.5382, -85.02), vec4(528.929, 5.3, 56.13, -523.978));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                return (h - int(false));
                                            }
                                            break;
                                        case 43:
                                            if (true) {
                                                mat4(mat3x4(-3.9, -2344.8982, 96.62, -8825.2371, -3100.3170, -1.7, 1.5, 2.8, 0.7, -_GLF_IDENTITY(416.429, max(416.429, 416.429)), -3.0, -6423.2651));
                                                ivec2(-52576, -30590);
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = fwidth(smoothstep(-4.6, -2.1, refract(vec4(-5234.4001, -3552.5599, -82.95, -6.7), vec4(-9.9, -594.356, -8344.4456, 6.8), 1.5)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3]));
                                                        }
                                                    }
                                                }
                                                ;
                                                if (true) {
                                                    {
                                                    }
                                                    mat2x3(38.94, 363.788, -8.7, -551.961, 7.9, -62.21);
                                                    mat2x3 _GLF_SWITCH_2_0v, _GLF_SWITCH_2_1v, _GLF_SWITCH_2_2v;
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec4(-6.4, 7.9, -_GLF_IDENTITY(158.797, mix(float(158.797), float(_GLF_FUZZED((1.4 * 7020.8783))), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), 1450.6285) - (-8.7));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    ivec3(61309, 85604, -15338);
                                                    return (~(+pivot));
                                                    mat2(9.9, -890.398, -7029.0248, 36.98);
                                                    if (true) {
                                                        float _GLF_SWITCH_2_3v[6];
                                                        (min(uvec2(2685u, 31050u), uvec2(99682u, 15363u)) == uvec2(12047u, 61394u));
                                                        (h + ivec4(39956, 95638, 30884, -99776));
                                                        ivec2(findLSB(h), pivot);
                                                        (mat4x3(39.11, 992.904, -8.8, 52.60, 57.40, 5.6, -24.95, 49.05, 817.525, 316.289, -7.5, 3.9) / mat4x3(-91.60, 4411.7587, -61.08, 701.242, 556.480, 6.2, -691.616, 422.590, -0.7, -3.5, -9.7, -5585.5616));
                                                        (mat2(79.48, 9.5, -70.06, -931.067) * injectionSwitch);
                                                        mat2x4 _GLF_SWITCH_2_4v[73];
                                                        while ((_GLF_SWITCH_0_55v == isnan(resolution))) {
                                                            (uvec3(3546u, 180420u, 158667u) + uvec3(162544u, 13352u, 58788u));
                                                            break;
                                                        }
                                                        false;
                                                    }
                                                } else {
                                                    if ((l >= (-89040))) {
                                                        lessThanEqual(uvec4(104067u, 123091u, 189436u, 19459u), (uvec4(106590u, 126857u, 59150u, 22933u) % 97780u));
                                                        return ((pivot * 62140) >> l);
                                                        h;
                                                        {
                                                            while (true) {
                                                            }
                                                            if (any(bvec3(true, true, true))) {
                                                                float _GLF_SWITCH_2_5v, _GLF_SWITCH_2_6v[98], _GLF_SWITCH_2_7v;
                                                                mat4x3(4.3, 88.18, 71.94, 3457.9458, 8.3, -800.216, 79.13, -2433.2478, 3.5, -6.3, 769.170, _GLF_IDENTITY(-5.6, (-5.6) / abs(1.0)));
                                                                greaterThan((_GLF_IDENTITY(uvec3(158135u, 78755u, 143401u), (uvec3(158135u, 78755u, 143401u)) | (_GLF_IDENTITY(uvec3(158135u, 78755u, 143401u), (uvec3(158135u, 78755u, 143401u)) | uvec3(0u, 0u, 0u)))) ^ uvec3(169689u, 68286u, 69022u)), uvec3(86365u, 165740u, 37398u));
                                                                mat4 _GLF_SWITCH_2_8v, _GLF_SWITCH_2_9v, _GLF_SWITCH_2_10v;
                                                                mat4(trunc(_GLF_SWITCH_2_5v));
                                                                uvec3 _GLF_SWITCH_2_11v, _GLF_SWITCH_2_12v[41];
                                                                mat2x4(-2.7, 208.008, 61.63, 91.56, 971.796, -719.858, -51.78, 3.1);
                                                                mat3x4 _GLF_SWITCH_2_13v[2], _GLF_SWITCH_2_14v;
                                                            }
                                                            return l;
                                                            mat3x4 _GLF_SWITCH_2_15v, _GLF_SWITCH_2_16v;
                                                            while (_GLF_IDENTITY(false, !(!(false)))) {
                                                                continue;
                                                                mat2x3 _GLF_SWITCH_2_17v[76], _GLF_SWITCH_2_18v;
                                                                return h;
                                                                int _GLF_SWITCH_2_19v, _GLF_SWITCH_2_20v, _GLF_SWITCH_2_21v;
                                                                mat4 _GLF_SWITCH_2_22v, _GLF_SWITCH_2_23v;
                                                                vec2 _GLF_SWITCH_2_24v, _GLF_SWITCH_2_25v;
                                                                (_GLF_SWITCH_2_18v - mat2x3(-3.9, 85.85, -93.92, 9062.9655, 9737.2941, 8736.3263));
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = (vec4(-2325.6214, 14.47, 77.04, 1470.8175) * 5349.9910);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            mat4x2 _GLF_SWITCH_2_26v[7];
                                                            mat2x3(162.448, -22.06, -6.5, -79.06, 10.46, 2.3);
                                                            ivec2 _GLF_SWITCH_2_27v, _GLF_SWITCH_2_28v;
                                                        }
                                                    } else {
                                                        if (((-mat3(-52.11, -7841.3339, 847.158, -2614.7123, 273.170, 2.5, 9.3, -9.8, -8032.5007)) == mat3(-2653.3584, -141.738, -7303.1476, -4.7, -9297.4766, -_GLF_IDENTITY(79.05, (79.05) + 0.0), 1.0, -2.0, -23.69))) {
                                                            return (pivot >> 41136);
                                                            while (true) {
                                                            }
                                                            if (((ivec3(8056, -16425, -29644) == ivec3(-27555, -56072, -7563)) != false)) {
                                                                _GLF_color;
                                                                mat3x4 _GLF_SWITCH_2_29v;
                                                            } else {
                                                                (mat2(-7.5, -722.439, 1793.6048, 3369.0656) + (-0.9));
                                                                return 49757;
                                                                uvec2(48551u, 115484u);
                                                                mat3(-9.5, 5.2, -884.475, 0.9, -5.0, -7043.4810, -0.9, 142.939, -2.5)[2];
                                                                bvec3(true, false, true);
                                                                float _GLF_SWITCH_2_30v;
                                                                uint(_GLF_SWITCH_2_30v);
                                                            }
                                                        } else {
                                                            while (all(bvec2(true, false))) {
                                                                ;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = ((-mat4(-5.5, 85.56, -7.5, 72.59, -0.5, 89.89, 21.10, -1662.9893, -75.61, 3.0, -838.065, 0.0, 6213.8663, 2.1, -7113.5151, 9468.3777)) * vec4(-1463.6199, 319.941, 16.47, -4.8));
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                discard;
                                                                ivec3 _GLF_SWITCH_2_31v, _GLF_SWITCH_2_32v, _GLF_SWITCH_2_33v;
                                                                (l - (ivec4(-66620, 41048, -84170, -38621) | (71896 >> (-31931))));
                                                                vec3(-9.9, -411.903, -1.2);
                                                                mat4x2 _GLF_SWITCH_2_34v[27];
                                                                vec3 _GLF_SWITCH_2_35v[29], _GLF_SWITCH_2_36v, _GLF_SWITCH_2_37v[17];
                                                                (uvec4(194116u, 95814u, 9198u, 33842u) - (57524u >> packUnorm4x8(vec4(4403.8700, 434.138, -6234.8527, -5.7))));
                                                                mat2x4 _GLF_SWITCH_2_38v[91], _GLF_SWITCH_2_39v, _GLF_SWITCH_2_40v[28];
                                                            }
                                                            mat4(1893.5394, 7.7, -2.4, -1687.4887, 239.776, 1.2, 9.4, 590.887, -4.1, 2.6, 7.8, _GLF_IDENTITY(-290.477, (false ? _GLF_FUZZED(1.3) : (-290.477))), -87.38, -1257.5979, 4.8, 7659.5292);
                                                            clamp(((uvec3(59592u, 36758u, 174326u) * uvec3(77295u, 38373u, 187815u)) | uvec3(149055u, 55456u, 164719u)), _GLF_IDENTITY(uvec3(109014u), (uvec3(109014u)) << uvec3(0u, 0u, 0u)), uvec3(199014u, 196440u, 58093u));
                                                            for (mat4x2(-3910.7007, -5.2, 9.9, -448.278, -5147.0159, -_GLF_IDENTITY(8.3, min(8.3, 8.3)), _GLF_IDENTITY(-57.23, min(-57.23, -57.23)), 943.323); greaterThan(_GLF_color, _GLF_color)[3]; vec3(5.1, 5.9, 47.23)) {
                                                                return l;
                                                                ;
                                                                mat3x4(-953.742, -6.2, -6.4, -8.4, -657.528, 39.19, 611.683, -9.6, -5727.7873, -8448.5298, 2481.3604, -8.9);
                                                                uvec2(144691u, 187245u);
                                                                ;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (vec4(-5321.1664, 7.0, -5.8, -0.8) * uintBitsToFloat(uvec4(52549u, 50312u, 57618u, 4720u)));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                mat2x4 _GLF_SWITCH_2_41v;
                                                            }
                                                            ;
                                                            float _GLF_SWITCH_2_42v[13];
                                                            for (ivec3 _GLF_SWITCH_2_43v[59], _GLF_SWITCH_2_44v[81], _GLF_SWITCH_2_45v; (mod(-7502.5219, -8.4) <= (-7.6)); _GLF_color) {
                                                                continue;
                                                                (uvec3(79830u, 199410u, 40633u) << 79536u);
                                                            }
                                                        }
                                                        uvec2 _GLF_SWITCH_2_46v[67];
                                                        1159.4003;
                                                        min(bitfieldInsert(uvec3(159578u, 138895u, 105761u), uvec3(13627u, 194995u, 16225u), h, pivot), (uvec3(92549u, 101516u, 166843u) / 154624u));
                                                        uvec3 _GLF_SWITCH_2_47v[22], _GLF_SWITCH_2_48v[43], _GLF_SWITCH_2_49v;
                                                        mat3x2 _GLF_SWITCH_2_50v, _GLF_SWITCH_2_51v, _GLF_SWITCH_2_52v[55];
                                                        if ((sinh(acosh(7.7)) < 13.49)) {
                                                        }
                                                        {
                                                            for (ivec3 _GLF_SWITCH_2_53v, _GLF_SWITCH_2_54v, _GLF_SWITCH_2_55v; (((-3686.0459) * mat4x3(-3800.2692, -8.8, -9741.4356, -61.30, -1.0, -6.5, 187.346, -7.8, -0.0, 82.71, -7.9, -5.4)) == mat4x3(-2.1, 3.5, -2819.4227, 791.493, 778.905, 3.7, 13.70, 51.20, 8.4, 38.19, 3.9, -2.0)); (mat2(339.329, 2.3, -1.6, 882.491) + mat2(_GLF_IDENTITY(-38.11, _GLF_IDENTITY(float(_GLF_IDENTITY(mat2(-38.11, abs(1.0), length(sin(vec2(0.0, 0.0))), 0.0), (true ? mat2(-38.11, abs(1.0), length(sin(vec2(0.0, 0.0))), 0.0) : _GLF_FUZZED(mat2(-1.4, 5.6, -4.2, -0.5))))), mix(float(_GLF_FUZZED(-887.046)), float(float(_GLF_IDENTITY(mat2(-38.11, abs(1.0), length(sin(vec2(0.0, 0.0))), 0.0), (true ? mat2(-38.11, abs(1.0), length(sin(vec2(0.0, 0.0))), 0.0) : _GLF_FUZZED(mat2(-1.4, 5.6, -4.2, -0.5)))))), bool(true)))), -991.715, 37.93, -8.7))) {
                                                                uvec4 _GLF_SWITCH_2_56v, _GLF_SWITCH_2_57v, _GLF_SWITCH_2_58v;
                                                                mat4x2 _GLF_SWITCH_2_59v, _GLF_SWITCH_2_60v[8], _GLF_SWITCH_2_61v[94];
                                                                ((36205u & 120328u) ^ 85726u);
                                                                125375u;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = _GLF_IDENTITY(mix(vec4(8997.3867, -2.1, -45.53, 5.3), vec4(-443.390, 63.11, -17.55, -2.3), bvec4(true, false, true, true)), (false ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : mix(vec4(8997.3867, -2.1, -45.53, 5.3), vec4(-443.390, 63.11, -17.55, -2.3), bvec4(true, false, true, true))));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                            vec2(-139.037, -_GLF_IDENTITY(6.9, (6.9) * 1.0));
                                                            float _GLF_SWITCH_2_62v[76], _GLF_SWITCH_2_63v[71], _GLF_SWITCH_2_64v;
                                                            bitfieldReverse(mix(uvec3(42666u, 798u, 67354u), _GLF_SWITCH_2_49v, bvec3(false, true, true)));
                                                            return findMSB(185048u);
                                                            ivec3 _GLF_SWITCH_2_65v, _GLF_SWITCH_2_66v;
                                                            mat4x3 _GLF_SWITCH_2_67v, _GLF_SWITCH_2_68v[95], _GLF_SWITCH_2_69v;
                                                            ;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(7.3, -5233.7898, -0.5, 87.08);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                        (uvec2(_GLF_IDENTITY(162839u, (_GLF_IDENTITY(162839u, (162839u) >> 0u)) / 1u), 13035u) + (56853u | uvec2(194996u, 75214u)));
                                                    }
                                                    for (ivec2 _GLF_SWITCH_2_70v, _GLF_SWITCH_2_71v; false; uvec2(34370u, 105431u)) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = sin(ldexp(vec4(-0.8, 264.773, 6492.4895, -7.4), ivec4(58178, -5787, 62498, 21939)));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        mat2x4 _GLF_SWITCH_2_72v[10], _GLF_SWITCH_2_73v, _GLF_SWITCH_2_74v[75];
                                                        vec3 _GLF_SWITCH_2_75v, _GLF_SWITCH_2_76v[63];
                                                        while ((mat4x2(0.2, -5.1, -6309.2482, 100.933, 6107.2800, _GLF_IDENTITY(-13.44, 1.0 * (-13.44)), 45.52, 27.15) == mat4x2(3.7, -786.791, 7.2, 9.4, -5253.3147, -2.8, 7.3, -6.4))) {
                                                            for (mat4x2 _GLF_SWITCH_2_77v[5], _GLF_SWITCH_2_78v; false; mat4(85.06, 5525.0266, -0.7, -43.56, -9.4, 1.9, -313.022, 1282.6720, -81.19, 77.98, -44.13, 8.2, 9.9, -9355.0708, -902.325, -3.7)) {
                                                                bool _GLF_SWITCH_2_79v[10], _GLF_SWITCH_2_80v;
                                                                ivec4(-97018, 37686, 91087, -75332);
                                                                dFdy(_GLF_SWITCH_2_75v);
                                                                mat2x3 _GLF_SWITCH_2_81v;
                                                                mat4(571.227, -9.7, -289.773, 2915.1197, 21.77, -4.2, -5336.2876, -1.4, 608.183, -4.1, -6.4, -61.41, -2.3, 731.074, -7.1, -6305.7515);
                                                            }
                                                            while (false) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = floor(mat2x4(-14.43, 5.8, 7.8, -8935.6368, 2.7, -4.8, -9926.4850, -240.006)[1]);
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                mat3x4 _GLF_SWITCH_2_82v[60];
                                                                mat4(mat3x2(-44.59, -11.81, 113.024, 288.510, -4343.9112, 13.28));
                                                                mat2(-3.1, 1807.0568, -3.3, 135.127);
                                                                ivec2(92644, -22366);
                                                                return (clamp(pivot, (45612 * pivot), h) << (-pivot));
                                                                (129804u ^ uvec4(150732u, 175250u, 122491u, 178536u)).pppp;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = radians(vec4(-159.607, -10.80, 1.6, -0.7));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                            bvec3 _GLF_SWITCH_2_83v[49], _GLF_SWITCH_2_84v, _GLF_SWITCH_2_85v[68];
                                                        }
                                                        mat4(-911.406, -7.6, 42.22, -0.2, -1084.0898, -5.2, -2123.3957, determinant(mat3(-45.53, -0.3, 61.78, -1371.4379, -60.44, -6.8, 5.1, 4.8, -0.2)), 648.387, fwidthCoarse(8.4), 454.041, (asin(191.083) * 7.2), -2026.9779, -7.1, dot(vec2(837.739, 259.841), vec2(6.2, -26.04)), 6.4);
                                                        atan(7.5, (9829.5991 + 6885.1817));
                                                        findMSB(ivec3(-46254, -27516, 69182));
                                                        while ((false ^^ true)) {
                                                            mat4x3(22.78, -121.900, -0.0, _GLF_IDENTITY(8.0, 0.0 + (_GLF_IDENTITY(8.0, (8.0) - 0.0))), -36.81, -8.6, 507.267, 6286.6460, -5805.5104, 35.06, 0.5, 9.7);
                                                            while (((48867u / packSnorm4x8(vec4(-341.926, 389.609, 61.45, 8.7))) <= 76732u)) {
                                                                (float(-51208));
                                                                ;
                                                                return h;
                                                                mat3(mat3x2(-1.1, 5812.7815, 99.02, 4.0, -91.01, -47.46));
                                                            }
                                                            (_GLF_IDENTITY(bitCount(149865u) - ivec3(-76711, -6121, -46908), min(bitCount(149865u) - ivec3(-76711, -6121, -46908), bitCount(149865u) - ivec3(-76711, -6121, -46908))));
                                                            {
                                                                true;
                                                                vec2 _GLF_SWITCH_2_86v, _GLF_SWITCH_2_87v[3];
                                                                mat3 _GLF_SWITCH_2_88v, _GLF_SWITCH_2_89v[44];
                                                                mat2x3(8.4, 7.8, 2770.1994, -2.6, _GLF_IDENTITY(893.249, max(893.249, 893.249)), -315.304);
                                                                float _GLF_SWITCH_2_90v[72];
                                                                ((162272u & uvec2(184367u, 154872u)) % 111379u);
                                                                return -52660;
                                                                greaterThan((ivec2(54167, 87696) / h), (23643 + _GLF_SWITCH_2_71v));
                                                                bvec4 _GLF_SWITCH_2_91v[35], _GLF_SWITCH_2_92v;
                                                            }
                                                        }
                                                    }
                                                    if ((876.064 == 7800.9779)) {
                                                        ivec3(31907, -99334, 26597);
                                                        return -59197;
                                                        for (mat2 _GLF_SWITCH_2_93v, _GLF_SWITCH_2_94v, _GLF_SWITCH_2_95v; true; (((-2497.9758) / vec3(984.547, 8.4, -7.2)) - (-2514.9153))) {
                                                            while (((-64793) != pivot)) {
                                                                bvec3 _GLF_SWITCH_2_96v;
                                                                (_GLF_color * (-4.5));
                                                                bool _GLF_SWITCH_2_97v;
                                                                mix(injectionSwitch, mod(resolution, resolution), _GLF_SWITCH_0_53v);
                                                                ;
                                                            }
                                                            continue;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-5.4, -83.96, 4.8, -7.0);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            continue;
                                                            while ((bvec3(false, true, true) == equal(ivec3(-81949, -52001, 15934), ivec3(27158, 62802, 12796)))) {
                                                                bvec2(true, false);
                                                                ;
                                                            }
                                                            for (bvec3(false, true, true); false; 118587u) {
                                                                break;
                                                                uvec3 _GLF_SWITCH_2_98v;
                                                                ;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = min(vec4(4553.2690, -3.5, 962.474, -_GLF_IDENTITY(3.7, clamp(3.7, 3.7, 3.7))), vec4(-5509.1516, -2.6, -693.927, 904.402));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                            while ((mat3(81.99, -3.6, 26.04, 797.579, -1.3, 1445.3087, 9.5, 3.0, -8.7) != mat3(3.2, -100.246, 895.947, 583.823, 38.13, 662.844, -4.5, 0.7, 6.0))) {
                                                                false;
                                                            }
                                                            (~uvec2(38432u, 144024u));
                                                            uvec4(41338u, 196613u, 124209u, 168707u);
                                                            {
                                                                continue;
                                                                continue;
                                                                ;
                                                                break;
                                                                discard;
                                                                mat3x2 _GLF_SWITCH_2_99v;
                                                                ;
                                                                continue;
                                                                break;
                                                            }
                                                        }
                                                        if ((mat4x2(exp2(injectionSwitch), vec2(99.15, -6.5), injectionSwitch, injectionSwitch) == mat4x2(-93.48, 0.5, -7.7, 8.9, -8.7, -5.8, 6.2, 2.8))) {
                                                            bvec4 _GLF_SWITCH_2_100v;
                                                        } else {
                                                            uint _GLF_SWITCH_2_101v[31], _GLF_SWITCH_2_102v;
                                                            while (false) {
                                                                ;
                                                                ;
                                                                uint _GLF_SWITCH_2_103v, _GLF_SWITCH_2_104v[67];
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = dFdxCoarse(vec4(9.8, 79.92, 4.6, 3.6));
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                bool _GLF_SWITCH_2_105v[29], _GLF_SWITCH_2_106v[77];
                                                                ivec4 _GLF_SWITCH_2_107v, _GLF_SWITCH_2_108v;
                                                                mat4x2 _GLF_SWITCH_2_109v[57], _GLF_SWITCH_2_110v, _GLF_SWITCH_2_111v;
                                                                mat2x4 _GLF_SWITCH_2_112v, _GLF_SWITCH_2_113v, _GLF_SWITCH_2_114v;
                                                                (_GLF_IDENTITY(5.7, clamp(5.7, _GLF_IDENTITY(5.7, (false ? _GLF_FUZZED(-2.4) : 5.7)), _GLF_IDENTITY(5.7, clamp(5.7, 5.7, 5.7)))) - mat4x3(-41.69, 1.0, -2.6, 339.892, -7.2, 6.2, 647.734, -10.45, 3.9, 1.0, 1069.7436, -9.5));
                                                            }
                                                            for (mat3x4 _GLF_SWITCH_2_115v, _GLF_SWITCH_2_116v[75]; all(_GLF_SWITCH_0_55v); _GLF_color) {
                                                                mat4 _GLF_SWITCH_2_117v, _GLF_SWITCH_2_118v[93], _GLF_SWITCH_2_119v;
                                                                ;
                                                                true;
                                                                (ivec3(33876, -20163, 16301) >> 49143);
                                                                vec4 _GLF_SWITCH_2_120v, _GLF_SWITCH_2_121v[43], _GLF_SWITCH_2_122v;
                                                                mat3x2(2.3, -40.82, 2.7, 38.34, 1986.1318, 24.06);
                                                                vec2(-9334.5027, 650.908);
                                                                bvec3 _GLF_SWITCH_2_123v, _GLF_SWITCH_2_124v;
                                                            }
                                                            for (lessThan(uvec3(bitfieldInsert(_GLF_SWITCH_2_102v, 94061u, pivot, pivot)), uvec3(186739u, 107673u, 106704u)); (false || true); mat2x4(-67.98, 6.5, 92.24, -9.2, 991.243, _GLF_IDENTITY(1.0, min(1.0, 1.0)), -6.8, -8.1)) {
                                                                mat2x4 _GLF_SWITCH_2_125v, _GLF_SWITCH_2_126v, _GLF_SWITCH_2_127v;
                                                                continue;
                                                                discard;
                                                                vec4 _GLF_SWITCH_2_128v, _GLF_SWITCH_2_129v, _GLF_SWITCH_2_130v;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = reflect(vec4(-6066.2403, 747.182, -7.3, 320.226), vec4(-9603.8949, 7.7, 15.32, 172.582));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                vec3(-3.9, -198.876, 3.5);
                                                                return h;
                                                                bitfieldExtract(l, sign((-99252)), -61355);
                                                                (h + ((ivec4(79871, -29866, -9963, 30127) ^ h) & pivot));
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(655.552, 6.7, 740.358, -29.86);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            bvec2 _GLF_SWITCH_2_131v[70], _GLF_SWITCH_2_132v;
                                                        }
                                                        (mat2(1.4, 328.057, 5946.3734, 405.936) + 3514.0325);
                                                        _GLF_SWITCH_0_55v;
                                                    }
                                                    ;
                                                    ivec3 _GLF_SWITCH_2_133v, _GLF_SWITCH_2_134v, _GLF_SWITCH_2_135v;
                                                }
                                                uint _GLF_SWITCH_2_136v, _GLF_SWITCH_2_137v, _GLF_SWITCH_2_138v;
                                                if (((mat3(5690.9572, 6964.6199, 1.5, 45.05, 5.8, 7.0, -84.18, 1190.3281, 90.22) - mat3(41.08, -1.2, 2.8, 5.9, 4.9, -8.3, 3375.5305, 609.141, -763.167)) == mat3(-5875.1364, 2.7, -6.2, -1.5, 13.09, -6990.5268, -6010.9800, -2094.0479, -39.47))) {
                                                    if ((123966u != _GLF_SWITCH_2_137v)) {
                                                        ivec2(68514, 55805);
                                                        l;
                                                        ;
                                                        ivec3(-82506, 34488, 8271);
                                                        for (mat3x4 _GLF_SWITCH_2_139v, _GLF_SWITCH_2_140v; (mat2(-613.062, 683.998, -506.797, -7.1) == mat2(6.2, -2.9, -16.89, -86.72)); _GLF_color) {
                                                            {
                                                                mat4x2(1.3, -1.3, -0.7, 85.05, -279.587, 9.0, -66.23, 4315.4173);
                                                                continue;
                                                                ivec3 _GLF_SWITCH_2_141v;
                                                                findLSB(_GLF_SWITCH_2_141v);
                                                                ;
                                                                uintBitsToFloat(uvec2(77049u, 86414u));
                                                                uvec2 _GLF_SWITCH_2_142v[61];
                                                                continue;
                                                            }
                                                            {
                                                                mod(-2.6, -484.275);
                                                                mat4 _GLF_SWITCH_2_143v;
                                                                ;
                                                                vec3(-968.873, -367.982, 424.696);
                                                                matrixCompMult(mat2x4(-1210.4503, -8.7, 46.88, 56.38, -7.0, 20.83, -7.9, -4502.3474), mat2x4(-38.76, -3.9, 16.99, 2959.9582, -1065.6649, -8.5, -6.4, -36.47));
                                                                return h;
                                                            }
                                                            ivec3(34361, 64631, 7174);
                                                            mat4x2 _GLF_SWITCH_2_144v, _GLF_SWITCH_2_145v, _GLF_SWITCH_2_146v;
                                                            return l;
                                                            vec3(-8080.8195, -3.6, 64.49);
                                                        }
                                                        ;
                                                        if ((mat2(-5.2, -6.0, -99.55, -428.875) == mat2(mat4(62.92, -9.0, -7.6, -0.5, -6.8, 42.13, -0.7, -4.9, 3388.5895, 986.390, -22.89, -7.2, 59.25, 8.0, 35.68, 178.625)))) {
                                                            while (false) {
                                                                uvec2 _GLF_SWITCH_2_147v, _GLF_SWITCH_2_148v;
                                                                asinh(vec4(5.2, -8263.5493, 201.676, 54.64));
                                                                ivec4(71799, 52399, -15077, 47776);
                                                                ;
                                                            }
                                                            clamp(uvec3(uvec2(151463u, 41526u), _GLF_SWITCH_2_138v), _GLF_SWITCH_2_136v, 140066u);
                                                        } else {
                                                        }
                                                    }
                                                    bvec3 _GLF_SWITCH_2_149v;
                                                }
                                                ;
                                                for (ivec2(40223, -1032); (mat2x4(7.9, 3.9, -7733.9078, 149.028, -79.80, -7856.3232, -64.15, -5.3) != mat2x4(47.81, 8171.9539, -4158.0898, 7.8, -9.4, 640.674, -43.75, -9942.0451)); (vec4(-43.26, 71.04, 2.1, 3.8) + normalize(vec4(7662.1576, -6412.7115, -8.6, -792.917)))) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (+dFdy(vec4(8.2, -9.5, -428.692, -3.6)));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    max(uvec3(65334u, 40429u, 113471u), _GLF_SWITCH_2_138v);
                                                    break;
                                                    continue;
                                                    (uvec2(20912u, 194051u) + _GLF_SWITCH_2_137v);
                                                    if (any(bvec3(false, true, true))) {
                                                        _GLF_SWITCH_2_138v;
                                                        discard;
                                                        for (bvec4(false, false, true, false); (uvec3(191740u, 188692u, 36836u)[2] <= uvec4(127377u, 138102u, 68814u, 103697u)[0]); mat3x4(7.1, -7804.9824, 62.08, 2593.0923, -579.307, 9.1, 62.24, 1.3, -27.98, 1.2, -2.2, -4.3)) {
                                                            (+mat4x3(-_GLF_IDENTITY(748.428, max(748.428, 748.428)), 49.41, -858.746, -9567.6773, -83.27, -0.5, -1.7, 36.32, 21.51, -3133.5539, 4.3, -1722.3435));
                                                            mat2x4(-_GLF_IDENTITY(624.126, min(624.126, 624.126)), 1602.3871, 768.618, -13.18, -3.0, 553.014, -240.915, -5.0);
                                                        }
                                                        for (notEqual(mod(_GLF_IDENTITY(_GLF_color, (_GLF_color) / vec4(1.0, 1.0, 1.0, 1.0)), 9568.2397), clamp(_GLF_color, _GLF_color, vec4(-46.17, 229.652, -91.15, -_GLF_IDENTITY(1.7, (false ? _GLF_FUZZED(7.3) : 1.7))))); true; mat4x3(mat3(-108.795, 9.0, -9776.7963, 6.0, 593.057, 38.75, 425.790, -1697.8037, 94.50))) {
                                                            (mix(uvec3(133596u, 97723u, 23877u), uvec3(89342u, 184967u, 88699u), bvec3(true, true, false)) | uint(false));
                                                        }
                                                        for (vec3(59.07, -3903.2197, -36.63); (ivec2(_GLF_IDENTITY(50192, ~(~(_GLF_IDENTITY(50192, min(50192, _GLF_IDENTITY(50192, (50192) ^ 0)))))), -55078) == sign(ivec2(-96065, -75699))); mat4x3(-4.2, 2.0, 5.2, 431.143, -569.234, -3.4, 7.3, 8.4, 521.107, 989.072, -4.3, 7.3)) {
                                                            do {
                                                                mat4 _GLF_SWITCH_2_150v, _GLF_SWITCH_2_151v, _GLF_SWITCH_2_152v;
                                                                discard;
                                                                uvec2 _GLF_SWITCH_2_153v[79];
                                                                break;
                                                                continue;
                                                                ;
                                                            } while ((mat2x4(-9.9, 3.8, 444.631, 9.6, -6637.2995, -598.018, 2799.9389, 651.979) == mat2x4(mat4x3(3.8, 33.45, 2595.2347, 5.7, -926.836, -47.07, -3.2, -79.75, -887.700, 6.9, -57.56, 4.6))));
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-9328.1373, 36.22, -5892.0183, 901.149);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, (injectionSwitch.x < injectionSwitch.y) || false)) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            mat4x3 _GLF_SWITCH_2_154v, _GLF_SWITCH_2_155v, _GLF_SWITCH_2_156v;
                                                        }
                                                        mat2(4.3, -7955.5678, -67.62, 3.8);
                                                        break;
                                                        (mat4x2(66.76, -718.109, -8.4, -5.7, -3.8, 1.0, -7949.6170, 6001.6773) / sign(atan(-13.74, 9981.3006)));
                                                        notEqual(uvec3(118673u, 1998u, 155685u), (uvec4(88665u, 52212u, 87152u, 198772u) >> _GLF_SWITCH_2_137v).gbg);
                                                    } else {
                                                        if (bvec3(false, false, true)[1]) {
                                                            if (true) {
                                                                vec4 _GLF_SWITCH_2_157v, _GLF_SWITCH_2_158v;
                                                                uvec4(131643u, 92008u, 170918u, 194780u);
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(63.07, 5486.3601, 3146.8726, -9.1);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                _GLF_IDENTITY(mat3(-7.6, 232.575, -45.99, -5501.0862, 1222.6640, 1412.6493, 76.83, 1.7, 37.40), transpose(transpose(mat3(-7.6, 232.575, -45.99, -5501.0862, 1222.6640, 1412.6493, 76.83, 1.7, 37.40))));
                                                                ;
                                                                (uvec3(_GLF_IDENTITY(61014u, 0u | (61014u)), 101425u, 171929u) / uvec3(99571u, 173570u, 197798u));
                                                                uint _GLF_SWITCH_2_159v[37], _GLF_SWITCH_2_160v;
                                                                mat4 _GLF_SWITCH_2_161v, _GLF_SWITCH_2_162v;
                                                                uvec4 _GLF_SWITCH_2_163v;
                                                            } else {
                                                                ivec4 _GLF_SWITCH_2_164v, _GLF_SWITCH_2_165v, _GLF_SWITCH_2_166v[72];
                                                                mat4(905.105, -7841.7334, 21.71, 72.49, 50.41, 75.88, -9739.9763, 3.1, -6.6, -8.6, -140.831, 44.92, 285.763, -9822.9891, -6.6, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)));
                                                                mat4x3 _GLF_SWITCH_2_167v, _GLF_SWITCH_2_168v;
                                                                vec3 _GLF_SWITCH_2_169v, _GLF_SWITCH_2_170v;
                                                                bvec4(true, false, true, true);
                                                                bvec2 _GLF_SWITCH_2_171v[69], _GLF_SWITCH_2_172v[66];
                                                                uvec4 _GLF_SWITCH_2_173v, _GLF_SWITCH_2_174v;
                                                                int _GLF_SWITCH_2_175v[47], _GLF_SWITCH_2_176v, _GLF_SWITCH_2_177v[33];
                                                            }
                                                            while (false) {
                                                                (uvec4(177906u, 41375u, _GLF_IDENTITY(170823u, (170823u) - 0u), 198117u) | uvec4(195058u, 6476u, 47716u, 168574u));
                                                                bvec4 _GLF_SWITCH_2_178v;
                                                                ivec2 _GLF_SWITCH_2_179v[75], _GLF_SWITCH_2_180v, _GLF_SWITCH_2_181v;
                                                            }
                                                            if (false) {
                                                                mat2x4 _GLF_SWITCH_2_182v;
                                                                uvec3(75964u, 192720u, 166285u);
                                                                ;
                                                            }
                                                        } else {
                                                            continue;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-157.863, 376.348, 213.773, 5.3);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            for ((round(_GLF_color) != roundEven(sin(vec4(2199.7704, -5940.6046, -1572.0227, 61.25)))); (_GLF_SWITCH_0_53v == _GLF_SWITCH_0_53v); 2171) {
                                                            }
                                                            for (uvec4 _GLF_SWITCH_2_183v, _GLF_SWITCH_2_184v, _GLF_SWITCH_2_185v; true; vec4(81.54, 2.0, -906.233, -821.992)) {
                                                                float _GLF_SWITCH_2_186v;
                                                            }
                                                        }
                                                        ;
                                                        break;
                                                        for (uvec4 _GLF_SWITCH_2_187v, _GLF_SWITCH_2_188v[29]; false; 9.1) {
                                                            if (false) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-9021.3502, 490.862, 9.1, 3.0);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                mat4x3(866.317, -94.55, 774.625, 47.75, 9.2, 57.24, -8809.4552, -96.32, 5776.7681, 0.3, 2209.1057, 1.4);
                                                                vec2 _GLF_SWITCH_2_189v, _GLF_SWITCH_2_190v[3], _GLF_SWITCH_2_191v[2];
                                                            }
                                                            while ((ivec4(-56150, 87095, 60170, -65752) == (ivec4(68786, -15517, 42810, -92234) << ivec4(70986, 31577, -71592, -90333)))) {
                                                                break;
                                                                int _GLF_SWITCH_2_192v, _GLF_SWITCH_2_193v, _GLF_SWITCH_2_194v[16];
                                                                max(tan(vec2(8353.1014, -321.338)), trunc(atan(8.2, 7.5)));
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = floor(vec4(7.5, -5.5, -6929.1370, -0.6));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            mat2x4 _GLF_SWITCH_2_195v, _GLF_SWITCH_2_196v[79], _GLF_SWITCH_2_197v;
                                                            (ivec2(-57896, 29265), (mat2x3(-9.5, 72.21, 1285.5603, -3.6, 1.9, 66.15) / 134.304));
                                                        }
                                                        lessThan(vec4(43.23, 98.33, -23.35, -3.3), step(vec4(0.2, 960.520, -5649.0641, 3.9), vec4(-5.2, 294.833, 142.408, 16.64)));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-61.73, 299.298, 593.945, -5.2);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        if (false) {
                                                            _GLF_SWITCH_0_55v;
                                                            ;
                                                            for (mat3x2 _GLF_SWITCH_2_198v; false; mat3x2(9.7, -7.2, 897.362, -44.67, 17.46, -4.5)) {
                                                                (mat2(2.0, 8.3, -9.1, -60.55));
                                                                (+mat4x3(-2620.9887, -7.0, 3644.8879, -_GLF_IDENTITY(438.736, mix(float(_GLF_FUZZED(-29.22)), float(438.736), bool(true))), 206.170, -4.5, -4.2, -189.363, -210.087, -30.01, -6.0, -3.9));
                                                                ((-32.32) - mat2x3(-82.79, 2.4, -26.44, -3.2, 1.1, 6548.6313));
                                                                continue;
                                                                mat2x3(-4.0, -9172.7322, 748.608, -572.924, -5.0, -_GLF_IDENTITY(22.46, float(vec4(22.46, abs(1.0), 0.0, 1.0))));
                                                                continue;
                                                            }
                                                            for (bvec2(false, false).r; bool(ivec2(60114, -96799)[1]); (mat2x3(-7068.6753, 5.7, -54.11, 9.6, 58.29, -956.964) - fwidth(721.511))) {
                                                                return -37154;
                                                                (uvec2(116240u, 195057u) ^ uvec2(132575u, 36030u));
                                                                return h;
                                                                _GLF_SWITCH_2_138v;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (-vec4(3.8, -918.381, 2.6, -2910.3187));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                bvec2(true, true);
                                                                bvec2 _GLF_SWITCH_2_199v, _GLF_SWITCH_2_200v[17], _GLF_SWITCH_2_201v;
                                                                mat3x4 _GLF_SWITCH_2_202v, _GLF_SWITCH_2_203v;
                                                                mat3x2(vec2(632.731, -86.87), resolution, vec2(_GLF_IDENTITY(7933.1903, (7933.1903) / exp(0.0)), 8311.6391));
                                                            }
                                                            if ((mat3(8.2, 5970.3196, -7101.4144, -3.5, -94.80, -355.112, 8702.5981, 0.0, 5.0) == mat3(6.4, 21.30, -659.042, -92.53, -7.7, -6.5, 219.777, -3.5, -7.3))) {
                                                                ;
                                                                continue;
                                                                uvec4(125073u, 57986u, 146583u, 81793u);
                                                            } else {
                                                                int _GLF_SWITCH_2_204v, _GLF_SWITCH_2_205v[8], _GLF_SWITCH_2_206v;
                                                            }
                                                            continue;
                                                            mat3 _GLF_SWITCH_2_207v, _GLF_SWITCH_2_208v[25], _GLF_SWITCH_2_209v;
                                                            if ((_GLF_SWITCH_2_138v < _GLF_SWITCH_2_137v)) {
                                                                mat3 _GLF_SWITCH_2_210v, _GLF_SWITCH_2_211v[24], _GLF_SWITCH_2_212v[82];
                                                                uint _GLF_SWITCH_2_213v, _GLF_SWITCH_2_214v;
                                                                _GLF_color;
                                                                uvec4 _GLF_SWITCH_2_215v[79], _GLF_SWITCH_2_216v;
                                                            } else {
                                                                greaterThan(vec4(5493.4403, 70.62, -6921.6670, 5.7), vec4(28.37, 2016.1800, -3.7, 8.4));
                                                                discard;
                                                                ;
                                                                ;
                                                                continue;
                                                                break;
                                                            }
                                                            ;
                                                        }
                                                    }
                                                    while (false) {
                                                        mat3(28.14, 5.3, 7.1, -72.60, 6.9, -6035.8670, -276.915, 7.6, -892.355);
                                                        for (bvec3 _GLF_SWITCH_2_217v, _GLF_SWITCH_2_218v; true; ivec4(int(-88.65))) {
                                                            for (mat3(-62.48, -3.7, -121.667, 0.5, 857.330, -3220.2077, 22.40, -2896.0611, -9.2); false; mat2x4(3.0, 696.680, -0.8, 529.084, -698.815, -39.05, -819.977, -9896.8003)) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-9.3, -8847.9419, 0.6, 5.5);
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, sqrt(1.0), 0.0, sin(0.0), 0.0)))))) {
                                                                        _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_outVarBackup_GLF_color) + vec4(0.0, 0.0, 0.0, 0.0)), _GLF_outVarBackup_GLF_color));
                                                                    }
                                                                }
                                                                discard;
                                                                ivec3 _GLF_SWITCH_2_219v[37], _GLF_SWITCH_2_220v, _GLF_SWITCH_2_221v[25];
                                                                mat4x3 _GLF_SWITCH_2_222v, _GLF_SWITCH_2_223v[35], _GLF_SWITCH_2_224v;
                                                                vec2 _GLF_SWITCH_2_225v;
                                                            }
                                                            continue;
                                                            if ((_GLF_SWITCH_2_136v < _GLF_SWITCH_2_138v)) {
                                                                _GLF_SWITCH_2_137v;
                                                                mat4x2(9.3, -42.59, 79.15, -0.4, 1.4, 2884.6178, 0.7, 3.9);
                                                                discard;
                                                                vec2 _GLF_SWITCH_2_226v;
                                                                true;
                                                                mat4x2(6.8, 39.89, -6.6, 57.15, 730.198, -1.2, 6.3, -9.9);
                                                            }
                                                            while (true) {
                                                                break;
                                                            }
                                                        }
                                                        for (ivec2 _GLF_SWITCH_2_227v; false; mat3(-4384.9860, -255.269, -254.644, 988.052, -2451.0901, 63.35, _GLF_IDENTITY(74.55, min(74.55, 74.55)), 0.9, 2846.5913)) {
                                                            ;
                                                            while (true) {
                                                                bvec3(true, false, false);
                                                            }
                                                            for (ivec3 _GLF_SWITCH_2_228v[35], _GLF_SWITCH_2_229v[97]; (pow(-22.30, dot(vec3(-881.189, -388.599, 5.9), vec3(8.5, 3664.5786, 0.7))) > fma(62.26, -1.0, -259.338)); mat4(-1.8, -62.92, -9.4, -5.8, 49.52, 6.7, -6.4, 996.539, -3.2, 14.08, -223.923, -7.8, 2.1, 8350.3577, -3048.9561, 241.559)) {
                                                                bvec3(true, true, false);
                                                                (mat2(4.0, 657.432, -7827.6104, 37.33) * mat4x2(-7.7, 2.3, _GLF_IDENTITY(30.40, 0.0 + (30.40)), -2955.9262, -544.559, 362.447, -7.9, -8.0));
                                                                uvec2(174262u, 23105u).yyy;
                                                            }
                                                            ivec4(l, 98641, pivot, findMSB(_GLF_SWITCH_2_136v));
                                                            while ((mat4(9.6, -3.9, 202.133, 441.526, -7921.7584, -6.4, 24.93, -8000.1039, 323.557, 4.6, -823.955, 6.9, 30.69, -5.3, -4.6, -3.0) != _GLF_IDENTITY(mat4(-85.36, 2497.6825, 91.90, -7.7, 25.03, -8.6, 459.020, -61.98, -3.6, -94.78, 44.03, -5521.9359, -4.2, -1187.8837, 5.2, -43.40), transpose(transpose(mat4(-85.36, 2497.6825, 91.90, -7.7, 25.03, -8.6, 459.020, -61.98, -3.6, -94.78, 44.03, -5521.9359, -4.2, -1187.8837, 5.2, -43.40)))))) {
                                                                mat4(816.509, -3530.0621, -2.0, -601.671, -3380.3267, 386.659, 584.880, -7.4, -7.0, 818.788, 6092.2723, 5.8, 5419.4893, 11.22, 107.696, 4336.7902);
                                                            }
                                                            l;
                                                            mat3x2 _GLF_SWITCH_2_230v, _GLF_SWITCH_2_231v;
                                                            (!true);
                                                            for (ivec2 _GLF_SWITCH_2_232v[67], _GLF_SWITCH_2_233v, _GLF_SWITCH_2_234v[48]; true; int(dot(vec4(0.2, -772.261, 249.299, -6691.9269), _GLF_color))) {
                                                                bvec4(false, true, true, false);
                                                                continue;
                                                            }
                                                        }
                                                        mat3 _GLF_SWITCH_2_235v, _GLF_SWITCH_2_236v[11], _GLF_SWITCH_2_237v;
                                                        bvec3 _GLF_SWITCH_2_238v[76], _GLF_SWITCH_2_239v[42];
                                                    }
                                                }
                                            } else {
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-8.5, 222.665, 3.1, -252.742);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        default:
                                            1;
                                    }
                                }
                                break;
                            default:
                                1;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(84.44, -6.5, 952.748, -85.61);
                    }
                    discard;
                    vec3(6.8, -2.7, -0.3);
                }
            case 0:
            case 32:
            case 8:
                vec4 _GLF_outVarBackup_GLF_color;
            case 46:
                if (_GLF_DEAD(false)) {
                    _GLF_color = uintBitsToFloat((uvec4(44091u, 31010u, 158727u, 160891u) ^ 61141u));
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
            case 56:
            case 2:
            case 78:
            case 13:
                if (_GLF_DEAD(false)) {
                    _GLF_color = (_GLF_color * mat4(7.5, -94.00, -2656.4351, 4212.8987, -91.41, -818.731, 317.988, -7.0, 607.039, 6670.7087, -7816.4389, -3.6, 5.7, 4660.6187, -5.9, 0.8));
                }
                _GLF_color = uintBitsToFloat((uvec4(66029u, 68861u, 161201u, 107933u) / uvec4(90304u, 91583u, 55874u, 170396u)[2]));
            case 6:
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_outVarBackup_GLF_color) / vec4(1.0, 1.0, 1.0, 1.0))) + vec4(0.0, 0.0, 0.0, 0.0));
                }
                break;
            case 95:
                mat2x3 _GLF_SWITCH_0_82v;
            case 80:
                -8018.0769;
            default:
                1;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = _GLF_color;
    }
    int i = l - 1;
    for (int j = l; j <= _GLF_IDENTITY(h, clamp(_GLF_IDENTITY(h, clamp(h, h, _GLF_IDENTITY(h, (h) | (h)))), h, h)) - 1; j++) {
        if (obj.numbers[j] <= pivot) {
            switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                case 74:
                    {
                        while ((mat2(-84.93, -417.832, -20.44, 8682.2809) == mat2(mat3x4(_GLF_IDENTITY(-45.42, (false ? _GLF_FUZZED(4.5) : _GLF_IDENTITY(-45.42, mix(float(_GLF_FUZZED(-27.30)), float(-45.42), bool(true))))), 848.141, -8.7, -8.9, 72.85, -6421.4340, 682.722, -96.65, -538.822, -17.51, -6.0, 6.7)))) {
                            break;
                            while ((vec2(_GLF_IDENTITY(-46.23, (true ? (-46.23) : _GLF_FUZZED(-9.7))), -4.3) == injectionSwitch)) {
                                (matrixCompMult(mat2x3(-862.164, 2.7, -932.155, 93.54, 5.2, -779.194), mat2x3(-4.4, 2432.4759, 4.5, -7654.4202, 799.144, 3651.3569)) + (-1387.4468));
                                ;
                            }
                            return ((-87171) & h);
                            while (bvec4(true, false, false, false).x) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = round(vec4(-4502.6955, -231.083, -2.5, -316.585));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat2(0.0, 1.0, sqrt(0.0), log(1.0))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            break;
                            for (mat4x2 _GLF_SWITCH_3_0v, _GLF_SWITCH_3_1v; (mat2x4(16.37, -29.13, 4.2, 2.1, 436.490, -6.0, -6.7, 8.2) != mat2x4(-6882.4246, -4147.6983, -7.3, 5.8, 79.90, 4.8, 974.101, -7.3)); matrixCompMult(outerProduct(_GLF_color, vec3(_GLF_IDENTITY(1219.8352, float(mat3(_GLF_IDENTITY(1219.8352, 1.0 * (1219.8352)), 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0))), 3.3, 5602.6190)), (mat3x4(3.8, 7318.3150, -316.413, -1241.0373, 269.969, 3.7, 4.5, 6549.6481, 8.5, -3.0, -2.4, 1.9) + 6.2))) {
                                if (false) {
                                    if ((tan(2.9) >= (-2.7))) {
                                        ;
                                        ;
                                    }
                                    ivec3 _GLF_SWITCH_3_2v;
                                    continue;
                                    for (vec4 _GLF_SWITCH_3_3v[69], _GLF_SWITCH_3_4v; false; bitfieldInsert(bitfieldReverse(78056), pivot, j, j)) {
                                        mat4x3 _GLF_SWITCH_3_5v;
                                        continue;
                                        ivec4(96871, -98132, -3503, 85335);
                                    }
                                    (dot(_GLF_color, vec4(-2.9, -7853.6469, -1.4, -9139.9334)) * mat3(46.21, -3.0, -62.81, 7742.5457, 855.824, 6.4, 7.9, -0.0, 7.9));
                                }
                                bvec4 _GLF_SWITCH_3_6v;
                                ivec2(-61371, -35837);
                            }
                        }
                        bool _GLF_SWITCH_3_7v;
                        for (bvec2(false, false); bool(h); mat4(926.942, 49.46, 58.88, 8.6, 8805.8107, 49.44, 3.7, -42.49, -35.09, -0.6, 8.0, -50.75, 17.87, -0.3, 6422.8102, 1270.5254)) {
                            for (roundEven((-vec3(-896.002, -9.3, 46.30))); _GLF_SWITCH_3_7v; (+ivec3(-1723, -4565, 367))) {
                                mat4x2(3.3, 8.2, -676.913, 0.0, 772.296, 50.96, 3959.4262, 21.33);
                                discard;
                                mat3 _GLF_SWITCH_3_8v, _GLF_SWITCH_3_9v[26], _GLF_SWITCH_3_10v[39];
                                if (true) {
                                    mat3x2 _GLF_SWITCH_3_11v, _GLF_SWITCH_3_12v, _GLF_SWITCH_3_13v;
                                    {
                                        return pivot;
                                        discard;
                                        vec3 _GLF_SWITCH_3_14v, _GLF_SWITCH_3_15v[52];
                                        mat3 _GLF_SWITCH_3_16v;
                                        continue;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-23.48, _GLF_IDENTITY(3302.7796, max(3302.7796, 3302.7796)), -393.489, -4297.6356);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mix(vec4((_GLF_outVarBackup_GLF_color)[0], (_GLF_outVarBackup_GLF_color)[1], _GLF_FUZZED(-8395.9027), (_GLF_outVarBackup_GLF_color)[3]), vec4(_GLF_FUZZED(-3213.5740), _GLF_FUZZED(4.0), (_GLF_outVarBackup_GLF_color)[2], _GLF_FUZZED(7623.2018)), bvec4(false, false, true, false)));
                                            }
                                        }
                                        ;
                                        (vec3(-5.2, -61.62, -44.73));
                                        mat3x4 _GLF_SWITCH_3_17v, _GLF_SWITCH_3_18v, _GLF_SWITCH_3_19v;
                                        (inverse(mat3(350.122, -0.1, -1790.7730, 9.8, 19.15, 0.3, 32.05, -8002.3946, -9938.5495)) * mat2x3(-9.0, -31.51, 875.684, -9.0, -691.192, 3444.2173));
                                    }
                                }
                                for (bvec3 _GLF_SWITCH_3_20v, _GLF_SWITCH_3_21v; _GLF_SWITCH_3_7v; roundEven(vec3(-50.02, -6.9, -4.6))) {
                                    (pivot * ivec4(79735, -_GLF_IDENTITY(88478, (88478) >> 0), 6921, -94689));
                                    (resolution[0] - (mat2x4(-3170.9494, 53.33, 162.491, -95.41, 9.1, -78.11, 10.49, -4.7) + mat2x4(-14.67, 209.734, -584.032, -9.2, 8.9, 814.693, -767.594, -10.37)));
                                    (uvec4(162605u, 80734u, 117920u, 142878u) % 58460u);
                                    return (i * ivec2(5998, -56947)).x;
                                    for (vec4 _GLF_SWITCH_3_22v, _GLF_SWITCH_3_23v, _GLF_SWITCH_3_24v; (ivec4(68959, 88816, -9237, 3409).x <= h); mat4x3(5.6, 3441.1858, -7672.3973, 363.978, _GLF_IDENTITY(-6.6, float(vec3(-6.6, 0.0, 0.0))), -7.6, 9131.3132, 7730.4529, 148.407, -620.427, -54.90, 50.87)) {
                                    }
                                    {
                                        discard;
                                        return min(j, 17593);
                                        -3161.6574;
                                        _GLF_SWITCH_3_21v;
                                        mat4x2(-221.452, -25.25, -45.14, -87.56, -71.80, -2.2, 4731.5419, 4.8);
                                        vec4 _GLF_SWITCH_3_25v, _GLF_SWITCH_3_26v[33], _GLF_SWITCH_3_27v;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (212.495 + vec4(46.70, 36.60, 1.3, 2.8));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            ivec4 _GLF_SWITCH_3_28v, _GLF_SWITCH_3_29v;
                            float _GLF_SWITCH_3_30v, _GLF_SWITCH_3_31v, _GLF_SWITCH_3_32v;
                            ;
                            while ((mat2x3(-85.99, 5.9, -6.4, -967.838, 99.62, -7.6) == (mat2x3(3.8, 682.745, -9.3, -93.75, 6.8, 8.5)))) {
                                break;
                                if ((uvec3(32346u, 96339u, 124225u) == uvec3(183093u, 86238u, 13345u))) {
                                    if ((false && false)) {
                                        break;
                                        bvec4(false, false, false, false);
                                        true;
                                        continue;
                                        discard;
                                        ;
                                        ((87743u - uvec4(118496u, 111458u, 30124u, 198596u)) & clamp(uvec4(160299u, 35769u, 14746u, 195546u), uvec4(151325u, 57293u, 73090u, 58396u), min(uvec4(36884u, 24526u, 176616u, 69816u), 38835u)));
                                        179613u;
                                    }
                                }
                                for (mat3 _GLF_SWITCH_3_33v, _GLF_SWITCH_3_34v, _GLF_SWITCH_3_35v; (30733u <= 108637u); mat2(-0.1, 2640.5387, -1.5, 2113.3243)) {
                                    matrixCompMult(mat4x3(1.8, -4979.0455, 4.0, -749.383, 3.1, 3242.8621, 526.878, 1.1, 453.304, 0.9, 6.5, 1.3), mat4x3(5.9, -0.1, -4463.6942, -78.82, -4.7, 6776.0443, -11.83, -539.729, -1.3, 9.2, -6322.3890, -7.9));
                                }
                                ;
                                while (_GLF_IDENTITY(_GLF_SWITCH_3_7v, !(!(_GLF_SWITCH_3_7v)))) {
                                    while (isnan(_GLF_SWITCH_3_32v)) {
                                        return pivot;
                                        mat2x3(-4.4, -23.26, 576.860, 5.5, 38.93, 31.43);
                                        mat4x3(5.0, -74.27, 647.174, -4175.0998, -447.848, 18.62, -79.06, 9.0, 67.09, -5.3, -5564.2987, -64.80);
                                        mat3(-925.453, 3.1, 8.3, -6.6, -7.1, -1819.2499, -6829.7434, -8.6, 7.4);
                                        uvec3(162267u, 164719u, 50226u);
                                        bvec4 _GLF_SWITCH_3_36v;
                                        continue;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-61.76, 995.639, 3.7, -3.9);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        (atan(-15.09, _GLF_SWITCH_3_30v) * mat3x4(-9.9, 1.7, -473.395, -6.9, 3.6, 2.3, 6.4, -861.569, 3278.0962, -7987.0061, 8.8, 5990.0064));
                                        findLSB(ivec4(-79910, 40792, -57461, -40046));
                                    }
                                    if (_GLF_SWITCH_3_7v) {
                                    }
                                    mat4 _GLF_SWITCH_3_37v[23], _GLF_SWITCH_3_38v;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-451.382, -74.62, 9.8, -8387.7720);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    radians(resolution);
                                    return pivot;
                                }
                            }
                            mat4x3 _GLF_SWITCH_3_39v, _GLF_SWITCH_3_40v;
                            mat3x2(274.392, 5305.2589, 6.8, -8723.1799, 498.208, -25.17)[0];
                            mat2(4876.1248, -6.1, -702.979, 608.491);
                        }
                        ;
                        injectionSwitch;
                        {
                        }
                    }
                case 0:
                case 98:
                case 80:
                case 59:
                    i++;
                case 40:
                case 13:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(53.63, -74.04, 17.42, -645.473);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(_GLF_color) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
                        _GLF_color = uintBitsToFloat(uvec4(61562u, 43042u, 195490u, 141362u));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-335.395, 595.677, 7.3, -1956.3826);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                case 92:
                case 64:
                case 85:
                case 47:
                    swap(i, j);
                    break;
                case 42:
                    if (any(bvec2(false, false))) {
                        (+vec3(-7.2, 3.5, 0.9));
                        for ((mat4x2(-826.490, 69.91, -102.797, -5.1, 835.849, -5.7, 802.986, 16.58) * (-7.4)); false; ivec3(89836, 68183, -94342).zyy) {
                        }
                        discard;
                        return ivec2(61137, -88792)[0];
                        mat3 _GLF_SWITCH_3_41v, _GLF_SWITCH_3_42v[83];
                        do {
                            ivec3 _GLF_SWITCH_3_43v, _GLF_SWITCH_3_44v;
                            -484.809;
                            mat2x3(5.8, -4.0, 4595.1811, 5.3, -98.67, -4107.0361);
                            uvec3(173402u, 146621u, 125841u);
                            for (mat2x3(-5.0, 8.9, -16.88, 90.22, 880.103, -8.8); (true ^^ true); mat2x3(-452.507, 8.9, 8609.6132, 9.0, -426.746, -5.6)) {
                                (h << i);
                                mat2x3(-71.20, -7.0, -5.0, -4617.1302, 20.00, -52.41);
                                if ((true)) {
                                    (2.6 + mat3x2(3271.2115, 95.44, -76.33, -3755.5448, 456.218, -3.0));
                                    mat4(5.6, 5.9, -277.300, 441.215, 4.4, 82.11, -46.45, -9.5, 756.501, 575.978, 794.092, -626.692, 203.504, -8569.9647, 519.899, -9.5);
                                    do {
                                        discard;
                                        break;
                                        ivec4 _GLF_SWITCH_3_45v, _GLF_SWITCH_3_46v;
                                        mat4x3 _GLF_SWITCH_3_47v;
                                    } while ((injectionSwitch != resolution));
                                } else {
                                    (mat2x4(-7.9, 8.1, -37.01, 92.29, -66.63, 8.7, 26.72, 3.2) * mat4x2(-98.02, -0.8, 72.45, 581.114, 923.305, -292.383, -9928.7199, 6.7));
                                    {
                                        mat3(-84.99, -574.380, -1.2, 8011.7437, 452.746, 837.284, -62.50, 87.37, -9285.7344);
                                        ivec3 _GLF_SWITCH_3_48v;
                                        ;
                                        ;
                                        bvec3 _GLF_SWITCH_3_49v, _GLF_SWITCH_3_50v;
                                    }
                                    ivec4 _GLF_SWITCH_3_51v[48];
                                    if (false) {
                                        bvec2 _GLF_SWITCH_3_52v[74], _GLF_SWITCH_3_53v, _GLF_SWITCH_3_54v[40];
                                        mat2x3(-4806.2674, -1.6, 0.7, -453.371, -4.9, -6680.7287);
                                    }
                                    for (int _GLF_SWITCH_3_55v, _GLF_SWITCH_3_56v, _GLF_SWITCH_3_57v; true; matrixCompMult(mat4x2(-856.963, -247.288, -0.9, 490.004, 1.6, 7.7, -5.7, 953.040), mat4x2(50.10, -6006.4690, -5.6, 0.8, 652.789, -99.77, 2955.9615, 31.95))) {
                                    }
                                    mix(greaterThan(uintBitsToFloat(uvec3(30118u, 17428u, 117491u)), vec3(-40.15, 203.946, 78.68)), bvec3(false, true, false), lessThan(vec3(-3.3, 19.23, 18.71), vec3(41.30, 1159.4342, -5608.5872)));
                                    (mat2x3(-52.41, -258.299, 4.3, 6.8, -2.7, 8.5) * (mat4x2(1.9, -32.77, 114.942, 21.77, 6.4, -9.1, 9.4, 429.438) + (-2674.2836)));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-75.97, -300.718, -635.677, -4.5);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                    float _GLF_SWITCH_3_58v, _GLF_SWITCH_3_59v;
                                }
                                if (((mat3x2(-3.8, 6.6, -0.5, -588.633, 589.529, 5134.8753) * (-_GLF_IDENTITY(5325.4045, clamp(5325.4045, 5325.4045, 5325.4045)))) == mat3x2(7.5, -858.139, 1320.7117, -527.997, 2.8, 6.6))) {
                                    if (false) {
                                        false;
                                        uvec4 _GLF_SWITCH_3_60v, _GLF_SWITCH_3_61v[37];
                                        bvec3 _GLF_SWITCH_3_62v;
                                        mat2(_GLF_SWITCH_3_41v);
                                        ivec3(-11711, 84299, 51388);
                                    }
                                    mat3(87.87, 6497.7428, -17.73, -7.3, -9.3, -0.8, -3688.8712, 696.573, -8.0);
                                    uvec2 _GLF_SWITCH_3_63v[56], _GLF_SWITCH_3_64v[86];
                                    return j;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-8771.6845, -0.6, -5.2, 6.9);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                ((-_GLF_SWITCH_3_41v) / _GLF_SWITCH_3_41v);
                                for (vec3(-7.6, -9.6, 4.3); (mat2x3(3.9, -1.2, -715.461, -49.23, 4592.3981, -5.2) == mat2x3(-1.5, 1751.6736, -0.3, 235.777, 1.5, 9.3)); mat3x2(-3.8, 7.0, -0.5, 4909.1463, -9234.0867, -7.7)) {
                                    for (mat3x2 _GLF_SWITCH_3_65v, _GLF_SWITCH_3_66v[30], _GLF_SWITCH_3_67v; (bvec3(true, false, false) != bvec3(true, true, true)); int(22252u)) {
                                        vec2 _GLF_SWITCH_3_68v, _GLF_SWITCH_3_69v;
                                        mix(4.1, 44.64, fwidthCoarse(-5313.6020));
                                        true;
                                        discard;
                                        (l + ivec2(-88994, -_GLF_IDENTITY(99959, (99959) >> (0 >> _GLF_IDENTITY(int(2), int(2))))));
                                        vec4(435.752, 828.455, 780.863, 1.1);
                                        continue;
                                    }
                                    return ivec2(-37909, 22920).t;
                                    uvec2(88048u, 55649u)[1];
                                    mat4(0.4, -8.8, -9385.1029, -62.81, 1.1, -92.32, 511.721, 9.7, -5.4, -20.50, -655.566, -4376.9484, 0.1, 8.3, -2550.7632, 6524.5249);
                                    while (true) {
                                        mat3x4 _GLF_SWITCH_3_70v, _GLF_SWITCH_3_71v;
                                        break;
                                        mat4x3(-2.3);
                                        (mat2x3(-0.1, 565.478, 73.36, 34.66, -211.048, 7.9) / (-8.2));
                                        bvec3 _GLF_SWITCH_3_72v[70];
                                    }
                                    discard;
                                    ivec3 _GLF_SWITCH_3_73v, _GLF_SWITCH_3_74v[10];
                                    return h;
                                    mat4x3(-187.014, -10.45, 9485.9129, -5676.9904, 4.7, 9096.0218, -1.3, 2.8, -4.9, 5581.9231, -6476.2491, -94.17);
                                }
                                return (((-6947) * h) + l);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(70.25, -8.1, -0.5, 14.15);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                uint _GLF_SWITCH_3_75v, _GLF_SWITCH_3_76v[96];
                            }
                        } while (_GLF_IDENTITY(bvec4(true, false, true, false).w, false || (bvec4(true, false, true, false).w)));
                        return pivot;
                        (+mat4(5.2, 259.797, 3917.7647, 5.3, -785.492, 3.8, -4.4, -3551.1301, 88.75, 1.0, -68.04, -6.2, 7099.8189, -_GLF_IDENTITY(1.2, (1.2) - 0.0), -1166.2083, -2.9));
                        uint _GLF_SWITCH_3_77v, _GLF_SWITCH_3_78v;
                    } else {
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-339.506, -4371.1554, 196.783, -0.4);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        injectionSwitch;
                        (pivot + j);
                        ivec3 _GLF_SWITCH_3_79v;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = cos(vec4(-1.9, 78.97, 65.17, -_GLF_IDENTITY(2868.0467, (2868.0467) / 1.0)));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            {
                                ivec3(-66453, -11687, -48695);
                                vec2(7.0, 793.705);
                                (uvec2(194963u, 100812u) / 122299u);
                                bvec3 _GLF_SWITCH_3_80v;
                                ivec4 _GLF_SWITCH_3_81v[38], _GLF_SWITCH_3_82v;
                                while (false) {
                                    ((-660.802) - mat4(2.0, -5.3, 85.54, 3.3, 70.10, 8.7, -62.03, -6.4, -4.8, -1117.2721, 875.815, 87.36, -7.1, -83.54, 48.34, 9.6));
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-1.2, -9.6, 4.1, 4.2);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    if (false) {
                                        mat2x3 _GLF_SWITCH_3_83v;
                                    } else {
                                        discard;
                                        ldexp(smoothstep(resolution, resolution, acos(injectionSwitch)), ivec2(18703, -35778));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = uintBitsToFloat(uvec4(79955u, 163154u, 73879u, 176155u));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        ivec2 _GLF_SWITCH_3_84v, _GLF_SWITCH_3_85v;
                                        ;
                                        bool _GLF_SWITCH_3_86v, _GLF_SWITCH_3_87v;
                                        ivec3 _GLF_SWITCH_3_88v[77];
                                        bvec4 _GLF_SWITCH_3_89v[74];
                                        ivec4(57571, 33667, 93872, -_GLF_IDENTITY(27929, _GLF_IDENTITY(int(_GLF_IDENTITY(ivec4(_GLF_IDENTITY(27929, (_GLF_IDENTITY(27929, (27929) << 0)) - 0), int(_GLF_ONE(1.0, injectionSwitch.y)), 1, 0), (false ? _GLF_FUZZED(ivec4(4855, 41984, -62678, -51493)) : ivec4(_GLF_IDENTITY(27929, (_GLF_IDENTITY(27929, (27929) << 0)) - 0), int(_GLF_ONE(1.0, injectionSwitch.y)), 1, 0)))), 0 + (int(_GLF_IDENTITY(ivec4(_GLF_IDENTITY(27929, (_GLF_IDENTITY(27929, (27929) << 0)) - 0), int(_GLF_ONE(1.0, injectionSwitch.y)), 1, 0), (false ? _GLF_FUZZED(ivec4(4855, 41984, -62678, -51493)) : ivec4(_GLF_IDENTITY(27929, (_GLF_IDENTITY(27929, (27929) << 0)) - 0), int(_GLF_ONE(1.0, injectionSwitch.y)), 1, 0))))))));
                                    }
                                    while (bvec2(false, false)[0]) {
                                        isinf(vec3(-7.4, 6.2, -3.1));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = dFdx((vec4(-1829.0067, 7.7, 455.156, -3.0) - vec4(5.7, -7.8, 25.02, -72.68)));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    {
                                        mat3x4(-5.2, 4.9, 439.139, -118.284, 2226.4900, 722.894, 3.1, _GLF_IDENTITY(-4.2, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(99.43) : _GLF_IDENTITY(-4.2, (-4.2) - sqrt(0.0)))), -3.5, 57.42, 1.8, -6.7);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(48.81, 1.4, -9431.9538, -49.88);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        uint _GLF_SWITCH_3_90v, _GLF_SWITCH_3_91v;
                                        return pivot;
                                        vec2(722.811, -0.0);
                                        ivec4 _GLF_SWITCH_3_92v, _GLF_SWITCH_3_93v, _GLF_SWITCH_3_94v;
                                        (mat2x4(2628.6137, 4.0, -0.3, -3.0, 2.4, -1.9, -2069.0660, 3.2) * mat4x2(-75.94, 8077.3881, 4.0, -33.36, -636.642, -9.0, 7.2, -183.511));
                                        ivec3(-41707, 84727, -11092);
                                        discard;
                                    }
                                    uint _GLF_SWITCH_3_95v;
                                }
                            }
                            uvec2(49397u, 57893u);
                            if ((true || true)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(1129.1850, -9.4, -8.4, -6659.5652);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                                ;
                                bitfieldReverse(packUnorm4x8(vec4(51.86, -6.3, 8.8, 5927.9849)));
                                uvec2 _GLF_SWITCH_3_96v, _GLF_SWITCH_3_97v, _GLF_SWITCH_3_98v;
                                mat2(_GLF_IDENTITY((mat3(5.2, 5.6, 5.5, 77.34, 2490.6244, -87.22, -3.3, -51.45, 3.4) - mat3(645.609, -5.9, 7057.2260, 7.9, -6939.3737, 80.72, 3215.9843, 5905.1955, 7.0)), mat3(mat3x4((mat3(5.2, 5.6, 5.5, 77.34, 2490.6244, -87.22, -3.3, -51.45, 3.4) - mat3(645.609, -5.9, 7057.2260, 7.9, -6939.3737, 80.72, 3215.9843, 5905.1955, 7.0))))));
                                do {
                                } while ((true ^^ true));
                                {
                                    mat3 _GLF_SWITCH_3_99v[67], _GLF_SWITCH_3_100v[66], _GLF_SWITCH_3_101v;
                                    ivec3 _GLF_SWITCH_3_102v[82], _GLF_SWITCH_3_103v[15];
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = floor(vec4(1799.3056, 3047.9111, -5327.6231, 43.01));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    float _GLF_SWITCH_3_104v;
                                    false;
                                    ivec4 _GLF_SWITCH_3_105v[36];
                                    {
                                        mat4(-672.483, 1.4, -6.5, 7.5, -5.3, -6.4, 1.4, 8052.9828, 703.882, 2826.8720, 968.469, 4036.3341, -70.04, -6.9, -_GLF_IDENTITY(47.91, (47.91) + 0.0), 62.13);
                                    }
                                    ;
                                    if ((cosh(_GLF_SWITCH_3_104v) >= 7.7)) {
                                        mat4 _GLF_SWITCH_3_106v, _GLF_SWITCH_3_107v;
                                        75797u;
                                        vec4 _GLF_SWITCH_3_108v, _GLF_SWITCH_3_109v, _GLF_SWITCH_3_110v[57];
                                        mat4x3 _GLF_SWITCH_3_111v, _GLF_SWITCH_3_112v;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (-vec4(-99.18, 9.9, -953.668, -11.40));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        30447u;
                                    } else {
                                        mat3 _GLF_SWITCH_3_113v;
                                        discard;
                                        bvec4 _GLF_SWITCH_3_114v[64], _GLF_SWITCH_3_115v[27];
                                        mat4x3 _GLF_SWITCH_3_116v, _GLF_SWITCH_3_117v;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = fma(acos(vec4(-6.8, -28.74, 34.68, 87.80)), vec4(3.2, 84.40, -423.208, -53.41), vec4(5152.7924, 52.18, 5103.7650, -3431.5812));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        determinant(_GLF_SWITCH_3_101v);
                                    }
                                    mat2x3(7607.3281, 966.384, -769.576, -50.21, 6.6, -445.685);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-6.5, -4.5, -964.665, 89.50).yzww;
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                for (bvec2(false, true); ((round(vec3(-90.57, -8.7, 4414.8815)) * vec3(-289.860, -2.2, -5.1)) != acosh(vec3(9.1, 1.7, -97.86))); (((mat2x4(13.30, -5.6, 26.12, 0.4, -290.500, 5087.6561, 71.86, -3.2) * 3.0) + mat2x4(3696.0585, 3.4, -89.55, -1.2, -97.59, 234.538, 589.895, 6.2)) - (-931.520))) {
                                    (true, mat3x2(-2290.6852, 66.12, -0.3, -7778.0120, -5620.9265, -2491.4005));
                                    {
                                        break;
                                        uvec2 _GLF_SWITCH_3_118v, _GLF_SWITCH_3_119v, _GLF_SWITCH_3_120v[92];
                                        break;
                                        mat2x4(-9.9, 355.242, 0.9, -6.4, -0.3, -58.10, -2018.7446, -8737.5672);
                                        return j;
                                        mat4x2 _GLF_SWITCH_3_121v;
                                        mat3x2 _GLF_SWITCH_3_122v, _GLF_SWITCH_3_123v[37], _GLF_SWITCH_3_124v[82];
                                        ((-73.29) + vec3(5.4, 962.129, -693.761));
                                        mat3x4 _GLF_SWITCH_3_125v, _GLF_SWITCH_3_126v[14], _GLF_SWITCH_3_127v;
                                    }
                                    return h;
                                }
                                while (true) {
                                    for (vec4 _GLF_SWITCH_3_128v, _GLF_SWITCH_3_129v[26], _GLF_SWITCH_3_130v[42]; (8217.7150 == 0.5); mat3x2(-2.2, 7621.9870, 1501.6576, 6952.3154, 3046.2060, -444.391)) {
                                        (-ivec2(-24530, -12668));
                                        clamp(uvec2(uvec3(163854u, 132300u, 48693u)), 166615u, _GLF_IDENTITY(178986u, (178986u) | (178986u)));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (vec4(-9.1, 9.1, -67.75, -3.9) + (-2053.4152));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        break;
                                    }
                                    injectionSwitch;
                                    (106576u - (uvec2(159200u, 133345u) | uvec4(28332u, 146087u, 35314u, 137901u)[2]));
                                    if (false) {
                                    } else {
                                    }
                                    clamp((~uvec3(130504u, 26614u, 176770u)), 78760u, 167028u);
                                    mat4x2 _GLF_SWITCH_3_131v[24];
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mat2x4(469.369, abs(968.702), -0.4, 38.03, 48.22, -413.768, 2.2, -97.10)[0];
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if ((false && (uvec3(46934u, 76990u, 26469u) == uvec3(160071u, 11897u, 66399u)))) {
                                        bvec2(true, true);
                                        break;
                                        mat3(-3.6, -7.2, -0.3, -3.5, 8.0, -1540.8537, -6.4, -22.18, 7.9);
                                        mat3(98.69, 6960.6290, 3.8, -909.113, -2.3, 0.2, -9.8, -6.5, -7.3);
                                    } else {
                                        matrixCompMult(mat4x3(-8.3, 4445.7461, -4.5, 9.2, 5577.4776, -8.9, 8459.2723, -20.38, 1.4, 6.4, -7.1, -6.2), (-mat4x3(-3.3, -5.0, 95.36, -5.8, 1.5, -4076.7572, -4.2, -4.5, -8181.3676, -67.03, -2648.0784, -0.5)));
                                        vec2 _GLF_SWITCH_3_132v, _GLF_SWITCH_3_133v;
                                        mat4x3(-967.792, 6.5, 3.3, 8467.9877, -20.32, 7.8, 439.413, 17.55, -7.0, -17.93, -810.229, 96.95);
                                        (100955u / uvec3(102242u, 128589u, 148651u));
                                        bvec4(false, true, true, true);
                                        uvec3 _GLF_SWITCH_3_134v;
                                        continue;
                                        continue;
                                        clamp(((_GLF_IDENTITY(uvec4(114372u, 93779u, 63739u, 47561u), (uvec4(114372u, 93779u, 63739u, 47561u)) | uvec4(0u, 0u, 0u, 0u)) / uvec4(181453u, 71481u, 101876u, 94596u)) ^ 12356u), uvec4(141125u, 71683u, 93329u, 196901u), (uvec4(41413u, 183109u, 32896u, 135u) + 125537u));
                                    }
                                    if (true) {
                                        ;
                                        mat3(mat4x3(-4115.1462, -6834.3181, 7.9, 474.750, 618.870, 81.48, 467.946, -17.50, 318.130, 7.6, 14.07, -714.058));
                                        uvec2 _GLF_SWITCH_3_135v;
                                        mat4x3 _GLF_SWITCH_3_136v, _GLF_SWITCH_3_137v, _GLF_SWITCH_3_138v;
                                        int _GLF_SWITCH_3_139v;
                                    } else {
                                        (mat3(-9.8, 654.147, 384.933, -_GLF_IDENTITY(9337.3951, (true ? _GLF_IDENTITY(9337.3951, mix(float(9337.3951), float(_GLF_FUZZED(4649.0158)), bool(false))) : _GLF_FUZZED(-159.720))), 8.5, 86.68, -26.74, -4.5, 7.2) + determinant(mat3(-32.03, -2372.8581, -4623.1056, -71.01, 1.7, 974.303, 230.818, -5.0, 7.1)));
                                        lessThanEqual(injectionSwitch, injectionSwitch);
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-7272.5173, -66.39, 1.3, -4.3);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    for (bvec3(_GLF_IDENTITY(true, (true) || false), false, false); true; ivec2(45798, -96328)[0]) {
                                        continue;
                                        return (+mix(-92570, 95660, false));
                                        mat2x3(mat2(mat2x3(-198.878, 3.4, 3.4, 0.1, 670.660, -8.4)));
                                        true;
                                        mat2 _GLF_SWITCH_3_140v[19], _GLF_SWITCH_3_141v[68];
                                        mat2x3(-687.838, -654.947, 6.3, 6.3, 7407.4716, 6.6);
                                    }
                                }
                            } else {
                                return int(265.658);
                                for (mat3x2 _GLF_SWITCH_3_142v, _GLF_SWITCH_3_143v, _GLF_SWITCH_3_144v[18]; (false ? all(bvec2(true, false)) : true); ivec3(21213, 40785, 24591)) {
                                    float _GLF_SWITCH_3_145v, _GLF_SWITCH_3_146v[33], _GLF_SWITCH_3_147v;
                                }
                                uvec4 _GLF_SWITCH_3_148v, _GLF_SWITCH_3_149v;
                                for ((+(-68.70)); (bvec2(true, false) == bvec2(true, true)); mat3x4(-1982.8132, 0.1, -3.7, -6.0, 3452.9413, 7.2, -740.215, 6.9, 6446.2671, -694.214, -28.07, 191.403)) {
                                    for (mat2x4 _GLF_SWITCH_3_150v; bvec2(false, false)[0]; -77.50) {
                                        uint _GLF_SWITCH_3_151v[17], _GLF_SWITCH_3_152v[47], _GLF_SWITCH_3_153v;
                                        bvec3(false, true, true);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-2.5, -16.80, 786.154, -8.6);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        mat2x3 _GLF_SWITCH_3_154v[2], _GLF_SWITCH_3_155v[94], _GLF_SWITCH_3_156v[13];
                                        _GLF_IDENTITY(_GLF_SWITCH_3_153v, (_GLF_IDENTITY(_GLF_SWITCH_3_153v, (_GLF_SWITCH_3_153v) / 1u)) * 1u);
                                        mat3(2321.7756, 30.79, -961.375, 8.3, -18.02, 78.06, 5.6, -5.1, -6.6);
                                    }
                                    lessThan(uvec2(151603u, 33501u), uvec2(56604u, 149282u));
                                    for (mat4x3 _GLF_SWITCH_3_157v, _GLF_SWITCH_3_158v[9], _GLF_SWITCH_3_159v[8]; (ivec2(94402, -71902) == bitCount(ivec2(41887, -23487))); 8.7) {
                                        continue;
                                        matrixCompMult(mat3x4(7.1, -4.7, 5.3, 9.4, -3121.2863, -39.21, 3.0, -1.3, 320.517, -4.8, 7833.8179, 1280.7994), mat3x4(-6.2, -9.2, -3.2, 4.2, 2370.5358, 4.5, 8.6, 99.20, -8676.5381, 0.1, -64.46, -0.9));
                                        vec2 _GLF_SWITCH_3_160v;
                                        mat4x2(-944.628, degrees(142.704), -9.5, -1.2, 3.1, 9.4, 3.7, -80.18);
                                        return j;
                                    }
                                    ((-95.29) / mat4x2(-88.31, 2211.6597, 48.99, 6.8, 6520.8860, -273.922, 3274.8421, 76.15));
                                }
                                bvec4(true, false, false, true).ar;
                                bvec3 _GLF_SWITCH_3_161v;
                                return sign(j);
                            }
                            for (3181.5576; false; equal(mod(vec3(-2431.1661, 9.1, _GLF_IDENTITY(-8.5, clamp(-8.5, _GLF_IDENTITY(-8.5, float(mat3x4(-8.5, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 1.0, 0.0))), -8.5))), 4.1), vec3(11.46, -900.105, -313.371))) {
                                vec3(879.171, 7849.5475, 648.751);
                                exp(clamp((vec3(22.70, -0.3, -1.5) * mat2x3(92.61, -72.69, -1071.6093, 45.76, -0.6, 21.15)), 8072.6068, 6.7));
                                mat2(7.9, 931.803, 2.2, 443.842);
                                do {
                                    clamp(uvec2(175499u, 13742u), uvec2(54660u, 52267u), max(uvec2(193259u, 114372u), 141524u));
                                } while (true);
                                continue;
                            }
                        }
                        bool _GLF_SWITCH_3_162v, _GLF_SWITCH_3_163v, _GLF_SWITCH_3_164v;
                        {
                            vec2 _GLF_SWITCH_3_165v;
                            (vec4(634.138, -323.481, -207.683, 6.1) + vec4(-99.41, 125.995, -77.67, -44.37));
                            {
                                dFdyFine(vec3(5.9, -4.8, -510.709));
                                greaterThanEqual(ivec4(-74884, 51258, -20350, -51499), ivec4(-35462, -12282, 79301, -79355));
                                for (mat3x4 _GLF_SWITCH_3_166v[60], _GLF_SWITCH_3_167v, _GLF_SWITCH_3_168v[22]; (pivot <= h); (mat3(81.14, 321.454, -671.110, -6.9, -32.84, 4950.8001, -81.65, -297.905, -0.7) / (-317.845))) {
                                    {
                                        ivec2(54915, -55229);
                                        mat2(-2.4, -3.4, 1.2, 62.35);
                                        ivec3 _GLF_SWITCH_3_169v;
                                        continue;
                                        mat4 _GLF_SWITCH_3_170v[51], _GLF_SWITCH_3_171v, _GLF_SWITCH_3_172v;
                                    }
                                    if (_GLF_SWITCH_3_164v) {
                                        mat3x2(-37.95, -983.646, 2.1, -3968.6831, -9542.8768, -5787.9698)[1];
                                        mat2 _GLF_SWITCH_3_173v, _GLF_SWITCH_3_174v[70], _GLF_SWITCH_3_175v;
                                        uvec3 _GLF_SWITCH_3_176v[78], _GLF_SWITCH_3_177v, _GLF_SWITCH_3_178v;
                                        mat3 _GLF_SWITCH_3_179v;
                                        bvec4 _GLF_SWITCH_3_180v[95], _GLF_SWITCH_3_181v;
                                    }
                                    uvec3 _GLF_SWITCH_3_182v;
                                    for (ivec4(ivec2(-_GLF_IDENTITY(78418, int(ivec3(78418, 0, _GLF_IDENTITY(1, clamp(1, 1, 1))))), -82314), -17172, l); true; (_GLF_SWITCH_3_167v * dFdx(6.5))) {
                                    }
                                    ((-39.36) - (_GLF_SWITCH_3_167v - ((-7.9) + _GLF_SWITCH_3_167v)));
                                    return clamp((ivec2(4668, 44900).r << l), (l), 4929);
                                    mat2x4 _GLF_SWITCH_3_183v, _GLF_SWITCH_3_184v[74];
                                    while (((uvec4(35163u, 21919u, 65083u, 83727u) * uvec4(74327u, 42542u, 59772u, 98631u)) != max(uvec4(102177u, 67829u, 141177u, 193539u), 128177u))) {
                                        ;
                                        (bitfieldInsert(j, j, l, l) * ivec3(-21707, 80679, 73030));
                                    }
                                    mat4x2 _GLF_SWITCH_3_185v[40];
                                }
                                {
                                    if (isinf(8896.1871)) {
                                        outerProduct(vec4(752.497, -5.1, -877.446, 91.33), vec3(4.6, -219.645, 9275.8654));
                                        mat2 _GLF_SWITCH_3_186v, _GLF_SWITCH_3_187v;
                                        uint _GLF_SWITCH_3_188v[1], _GLF_SWITCH_3_189v, _GLF_SWITCH_3_190v;
                                        float _GLF_SWITCH_3_191v[95], _GLF_SWITCH_3_192v, _GLF_SWITCH_3_193v[33];
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-0.2, -974.519, 9.1, 97.60);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    for (uvec3 _GLF_SWITCH_3_194v, _GLF_SWITCH_3_195v[90]; _GLF_SWITCH_3_162v; bvec3(false, true, true)) {
                                        _GLF_color;
                                        ;
                                        continue;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(80.65, 1011.7733, 0.4, -952.224);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    for (uint _GLF_SWITCH_3_196v; (mat4x2(-6.4, 5.6, -9891.9385, 6.7, -2.3, -937.645, -3541.4698, -860.553) != mat4x2(-74.60, 9.5, 267.329, 208.519, -1.8, -16.85, 6591.3711, -798.209)); bvec3(true, true, false).xz) {
                                        discard;
                                        vec2(-6272.9745, 407.638);
                                        max(vec3(28.68, 4.0, 9.4), vec3(408.553, -10.94, 923.694));
                                        uvec4 _GLF_SWITCH_3_197v;
                                        break;
                                        ivec4 _GLF_SWITCH_3_198v, _GLF_SWITCH_3_199v, _GLF_SWITCH_3_200v[57];
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = asin(tan(vec4(8.1, 47.05, -92.38, 43.94)));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        25698u;
                                        bvec4(false, _GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, (true) || false)))), false, _GLF_IDENTITY(true, bool(bvec4(_GLF_IDENTITY(true, !(!(true))), false, true, true))));
                                        ;
                                    }
                                    ;
                                }
                                transpose(mat2x3(-8.3, -9.9, 66.55, 83.56, -125.115, -5272.2765));
                            }
                            if (bool(144668u)) {
                                mat2(-46.36, -7.9, -9.0, 62.59);
                                float _GLF_SWITCH_3_201v, _GLF_SWITCH_3_202v;
                                _GLF_SWITCH_3_202v;
                                {
                                    _GLF_SWITCH_3_164v;
                                    mat4x3 _GLF_SWITCH_3_203v[86];
                                }
                                for (mat4x3(-3.8, -34.41, 6.9, 31.90, -8314.8266, -5.1, -2.6, 4.1, -517.272, 9.5, 762.371, 79.09); _GLF_IDENTITY(((mat4x2(910.298, -25.42, -1106.2621, 9.4, 6403.7207, -_GLF_IDENTITY(99.08, (true ? _GLF_IDENTITY(99.08, (_GLF_IDENTITY(99.08, (99.08) - 0.0)) * 1.0) : _GLF_FUZZED((vec4(-6024.9814, 291.070, -667.458, -9641.8698) - _GLF_color)[1]))), 0.0, 9627.8110) * (mat2x4(8052.6579, -554.379, -1.8, -1.8, -665.824, -0.1, -37.46, -4.4) * mat4x2(-4.6, -11.05, 4222.3835, 9.9, -600.896, -9.5, 1739.7553, -54.47))) != mat4x2(371.846, 561.646, _GLF_IDENTITY(31.67, clamp(31.67, _GLF_IDENTITY(31.67, _GLF_IDENTITY(float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), clamp(float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))))), 31.67)), -3.9, 41.45, -869.078, -4.0, 910.950)), false || (((mat4x2(910.298, -25.42, -1106.2621, 9.4, 6403.7207, -_GLF_IDENTITY(99.08, (true ? _GLF_IDENTITY(99.08, (_GLF_IDENTITY(99.08, (99.08) - 0.0)) * 1.0) : _GLF_FUZZED((vec4(-6024.9814, 291.070, -667.458, -9641.8698) - _GLF_color)[1]))), 0.0, 9627.8110) * (mat2x4(8052.6579, -554.379, -1.8, -1.8, -665.824, -0.1, -37.46, -4.4) * mat4x2(-4.6, -11.05, 4222.3835, 9.9, -600.896, -9.5, 1739.7553, -54.47))) != mat4x2(371.846, 561.646, _GLF_IDENTITY(31.67, clamp(31.67, _GLF_IDENTITY(31.67, _GLF_IDENTITY(float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), clamp(float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), float(mat3x4(31.67, 0.0, exp(0.0), 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))))), 31.67)), -3.9, 41.45, -869.078, -4.0, 910.950)))); bitfieldReverse(uvec2(21356u, 113601u))) {
                                }
                                for (_GLF_color; bvec3(false, true, false)[0]; _GLF_SWITCH_3_165v) {
                                    break;
                                    break;
                                    for (mat3 _GLF_SWITCH_3_204v, _GLF_SWITCH_3_205v, _GLF_SWITCH_3_206v[66]; (bitfieldReverse(uvec2(142779u, 45523u)) == (uvec2(59592u, 79865u) * uvec2(172821u, 21301u))); mat3x2(_GLF_SWITCH_3_205v)) {
                                        mat2 _GLF_SWITCH_3_207v, _GLF_SWITCH_3_208v;
                                        equal(_GLF_color, _GLF_color);
                                        bvec2(true, true).x;
                                        break;
                                        _GLF_SWITCH_3_79v;
                                        mat3x2(51.45, 1184.8876, 444.571, 12.91, 8.8, -3094.7298);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, vec4(1.0, 1.0, 1.0, 1.0) * (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (true ? _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0)) : _GLF_FUZZED(_GLF_color)))));
                                            _GLF_color = vec4(-4103.7912, -7.8, -3.7, -161.563);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    uvec4 _GLF_SWITCH_3_209v, _GLF_SWITCH_3_210v;
                                    mat3x2 _GLF_SWITCH_3_211v, _GLF_SWITCH_3_212v[47], _GLF_SWITCH_3_213v;
                                    _GLF_IDENTITY(lessThanEqual(ivec2(-6531, 70307), (_GLF_SWITCH_3_164v ? ivec2(16747, -92050) : ivec2(98401, 96119))), bvec2(bvec3(lessThanEqual(ivec2(-6531, 70307), (_GLF_SWITCH_3_164v ? ivec2(16747, -92050) : ivec2(98401, 96119))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))));
                                    while (_GLF_SWITCH_3_162v) {
                                        return l;
                                        ;
                                        ivec3 _GLF_SWITCH_3_214v, _GLF_SWITCH_3_215v, _GLF_SWITCH_3_216v;
                                        mat4(mat4x2(-16.93, -5.4, 52.08, -1.7, 4.6, -8.6, -4502.5817, -9.4));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = asinh(vec4(0.4, 40.45, -6.6, 42.96));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    bvec3(false, false, false);
                                    {
                                        vec4 _GLF_SWITCH_3_217v[6];
                                        false;
                                        uvec4 _GLF_SWITCH_3_218v;
                                        (+(ceil(1.0) / mat3x4(99.08, 96.45, 677.971, 88.46, 65.19, -61.80, -75.55, 4408.3607, -9112.2425, 59.38, -37.33, -18.10)));
                                        min(_GLF_SWITCH_3_209v, uvec4(122034u, 82321u, 41119u, 126808u));
                                        return findLSB(85200u);
                                        mat3x4 _GLF_SWITCH_3_219v[89], _GLF_SWITCH_3_220v;
                                        ;
                                        float _GLF_SWITCH_3_221v[96], _GLF_SWITCH_3_222v[95];
                                    }
                                }
                                mat4x3 _GLF_SWITCH_3_223v[66], _GLF_SWITCH_3_224v, _GLF_SWITCH_3_225v;
                                do {
                                    (ivec2(67241, 94296) - i);
                                    while ((_GLF_IDENTITY(pivot, clamp(pivot, pivot, _GLF_IDENTITY(pivot, min(pivot, pivot)))) >= (-9026))) {
                                        sign(ivec2(-48225, 74943));
                                        uintBitsToFloat(uvec2(29170u, 127663u));
                                        mat4x2 _GLF_SWITCH_3_226v;
                                        (+mat4x3(803.065, 92.72, 9984.9321, -0.7, -244.235, 2844.9077, -42.58, -4.3, -8.2, 3050.8495, 1063.2054, 876.204));
                                        pow(resolution, step(_GLF_SWITCH_3_202v, cosh(_GLF_SWITCH_3_165v)));
                                        mix(vec4(-6372.4771, 73.28, 454.707, _GLF_IDENTITY(-6272.9119, (true ? _GLF_IDENTITY(-6272.9119, 1.0 * (-6272.9119)) : _GLF_FUZZED(_GLF_SWITCH_3_201v)))), _GLF_color, _GLF_IDENTITY(_GLF_SWITCH_3_201v, 1.0 * (_GLF_IDENTITY(_GLF_SWITCH_3_201v, float(_GLF_IDENTITY(mat2x4(_GLF_IDENTITY(_GLF_SWITCH_3_201v, (_GLF_SWITCH_3_201v) * 1.0), 1.0, 1.0, sin(0.0), 1.0, 0.0, 0.0, 0.0), mat4(1.0) * (mat2x4(_GLF_IDENTITY(_GLF_SWITCH_3_201v, (_GLF_SWITCH_3_201v) * 1.0), 1.0, 1.0, sin(0.0), 1.0, 0.0, 0.0, 0.0))))))));
                                        bvec2 _GLF_SWITCH_3_227v, _GLF_SWITCH_3_228v, _GLF_SWITCH_3_229v[31];
                                        injectionSwitch;
                                    }
                                } while (_GLF_SWITCH_3_164v);
                                mat2x4(-2.5, 5.7, -87.42, -503.799, 756.775, 4.2, 9948.1830, -6.4);
                            }
                            (uvec2(109794u, 178855u), mat3x4(8.8, 47.84, -8.4, 75.24, -2656.6911, 0.8, 3.7, -89.48, -35.77, -9.1, -283.734, 8.0));
                            return bitfieldReverse(findMSB(j));
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (-vec4(-48.69, 0.3, -671.042, -7.9));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    mat2x3(-726.604, -40.41, -338.302, 330.864, 38.11, 3268.0756);
                                    {
                                        ;
                                        lessThanEqual((uvec4(87284u, 62101u, 147843u, 47520u) % 154720u), uvec4(uvec2(9679u, 36992u), uvec2(42882u, 142759u)));
                                        mat4 _GLF_SWITCH_3_230v, _GLF_SWITCH_3_231v, _GLF_SWITCH_3_232v[68];
                                        bvec2 _GLF_SWITCH_3_233v, _GLF_SWITCH_3_234v;
                                        uvec2(187913u, 125222u);
                                        bvec4((179526u <= 165056u), bvec3(true, false, false));
                                    }
                                    int _GLF_SWITCH_3_235v, _GLF_SWITCH_3_236v, _GLF_SWITCH_3_237v[71];
                                    if (_GLF_SWITCH_3_164v) {
                                        mat3(6.9, -4533.8100, 33.85, 603.402, 3711.3666, -_GLF_IDENTITY(601.316, float(_GLF_IDENTITY(vec2(601.316, 0.0), (vec2(601.316, 0.0)) / vec2(1.0, 1.0)))), -6076.9485, -5767.7748, -93.35);
                                        ;
                                        (vec3(8.9, 7.8, -543.715)[0] * mat2x4(72.39, 5.3, -7.6, 6.1, -584.666, -39.69, 3134.8461, 9.3));
                                        mat2(3.1, 605.294, -8452.2225, -0.8);
                                        (bvec4(true, _GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(false, true, true)), true && (bool(bvec3(false, true, true))))), false, false));
                                    } else {
                                        mat4(mat2x4(-9726.9158, 806.272, -0.8, -56.17, 8487.0332, -3.9, 1.2, -2.5));
                                        mat4x2 _GLF_SWITCH_3_238v, _GLF_SWITCH_3_239v;
                                        return j;
                                        vec3(1.8, 7753.6181, -52.43);
                                        bvec3(false, false, false);
                                        greaterThanEqual(uvec4(191790u, 184767u, 706u, 33392u), uvec4(190943u, 90665u, 76350u, 69663u));
                                        mat2(578.574, -0.9, -_GLF_IDENTITY(9.9, (_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))) ? _GLF_FUZZED(-76.85) : 9.9)), -3696.4668);
                                    }
                                    if (any(bvec2(false, _GLF_IDENTITY(true, true && (_GLF_IDENTITY(true, (true) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))))) {
                                        discard;
                                        88762u;
                                        ivec4 _GLF_SWITCH_3_240v, _GLF_SWITCH_3_241v;
                                        ivec4 _GLF_SWITCH_3_242v;
                                        uvec2 _GLF_SWITCH_3_243v, _GLF_SWITCH_3_244v, _GLF_SWITCH_3_245v;
                                        mat4x2 _GLF_SWITCH_3_246v[94], _GLF_SWITCH_3_247v;
                                        notEqual(ivec2(-18555, -69597), ivec2(91371, -6734));
                                    } else {
                                        mat3x2(54.43, 7.9, 0.4, -0.1, -7869.6987, -8.7);
                                        bvec3(false, false, false);
                                        (_GLF_SWITCH_3_164v ? mat4(17.69, -9277.6986, 423.778, -98.45, 995.115, -596.683, -4517.2231, -1714.5054, 776.603, 0.9, -7.9, 28.31, -3553.9951, -37.94, 6.7, -2.3) : mat4(-764.232, 158.757, 1.1, -4.0, 8872.2572, -4406.0781, -31.67, -53.54, 9003.6196, -1746.9394, -58.02, -6.5, -1544.0058, 815.012, -6659.9813, -1554.5875));
                                        mat3x2(-4.2, 107.850, 62.57, asinh(-21.66), 25.84, -1.1);
                                        true;
                                    }
                                }
                                {
                                }
                                floatBitsToUint(injectionSwitch);
                                {
                                    vec3(5.3, 2379.5081, 2.3);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4((vec3(-93.04, 1.6, -4051.1311) * mat3(_GLF_IDENTITY(7150.5988, _GLF_IDENTITY(float(mat2x4(7150.5988, 0.0, 0.0, 1.0, 0.0, sin(sin(0.0)), 0.0, 1.0)), (float(mat2x4(7150.5988, 0.0, 0.0, 1.0, 0.0, sin(sin(0.0)), 0.0, 1.0))) / 1.0)), -3356.6924, -917.418, 4.4, -29.22, 766.612, -48.90, -871.515, -88.20)), log(924.245));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                    }
                                    for (vec4(-87.77, -4.5, 33.85, -949.599); true; 140849u) {
                                        break;
                                        ivec2 _GLF_SWITCH_3_248v, _GLF_SWITCH_3_249v[22], _GLF_SWITCH_3_250v[29];
                                        ivec3(61120, -77322, -80427);
                                        ;
                                        (_GLF_IDENTITY(((-37.89) / _GLF_color) * fract(clamp(vec4(6.5, -_GLF_IDENTITY(6371.6749, mix(float(_GLF_FUZZED(87.04)), float(6371.6749), bool(true))), _GLF_IDENTITY(95.95, sqrt(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0))))) * (95.95)), -8.9), 4.7, 7.9)), (((-37.89) / _GLF_color) * fract(clamp(vec4(6.5, -_GLF_IDENTITY(6371.6749, mix(float(_GLF_FUZZED(87.04)), float(6371.6749), bool(true))), _GLF_IDENTITY(95.95, sqrt(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0))))) * (95.95)), -8.9), 4.7, 7.9))) / vec4(1.0, 1.0, 1.0, 1.0)));
                                        break;
                                        continue;
                                        mat4x3(7.3, -4.7, 9.5, -_GLF_IDENTITY(304.885, min(304.885, 304.885)), -6.9, 513.153, 7.2, 778.140, 77.11, 3215.2320, -9.3, 5900.8491);
                                        mat3x4(7421.5343, 54.24, 2.5, 6.4, -3.4, 9.7, -57.14, 6.2, -417.490, -62.36, -967.896, -1.5);
                                    }
                                    vec2 _GLF_SWITCH_3_251v, _GLF_SWITCH_3_252v[10];
                                    ivec2 _GLF_SWITCH_3_253v;
                                    bvec2 _GLF_SWITCH_3_254v, _GLF_SWITCH_3_255v, _GLF_SWITCH_3_256v;
                                }
                                mat3(-0.6, -3.3, -7.9, 1100.5788, -_GLF_IDENTITY(3.1, mix(float(_GLF_IDENTITY(3.1, (true ? 3.1 : _GLF_FUZZED(9899.9930)))), float(_GLF_FUZZED(-0.3)), bool(false))), 6.4, -5579.7494, 8.3, -1766.6094);
                                bitfieldInsert((false ? ivec4(-92638, -12661, -58416, -86637) : ivec4(88046, -98749, 81877, 36306)), ivec4(-28099, -9070, 43218, 17659), i, h);
                            }
                            ivec2 _GLF_SWITCH_3_257v, _GLF_SWITCH_3_258v, _GLF_SWITCH_3_259v;
                        }
                        if (all(greaterThanEqual(vec3(-5.9, -4265.6989, -77.12), vec3(-5.1, -5.2, 9.4)))) {
                            bvec3(false, true, false);
                            ;
                            for (uvec2 _GLF_SWITCH_3_260v, _GLF_SWITCH_3_261v; _GLF_SWITCH_3_162v; 56534u) {
                                return h;
                                discard;
                                if (_GLF_SWITCH_3_162v) {
                                    {
                                        return l;
                                        vec2 _GLF_SWITCH_3_262v, _GLF_SWITCH_3_263v, _GLF_SWITCH_3_264v;
                                        fwidthFine(236.568);
                                        mat3x4(1132.0136, -0.4, -6.0, -6835.6649, 5.7, 1074.5605, 7.5, -867.704, 1.4, -4.5, -51.99, 55.23);
                                        mat3 _GLF_SWITCH_3_265v, _GLF_SWITCH_3_266v, _GLF_SWITCH_3_267v[47];
                                        bvec2 _GLF_SWITCH_3_268v, _GLF_SWITCH_3_269v;
                                        exp(min(vec3(5810.6095, 81.76, -328.167), 7.1));
                                        mat4x3 _GLF_SWITCH_3_270v[75];
                                        ((mat3x4(-3158.1349, 587.205, -8338.1303, 18.10, 407.759, 6.9, -5.5, -64.02, -174.466, 201.251, 2.7, -5.6) * transpose(mat3(-241.917, 7.6, -1.3, 95.36, -96.84, 846.452, 0.5, -5.8, 4217.4128))) * mat2x3(-3.2, -9.6, -_GLF_IDENTITY(26.38, (26.38) - 0.0), 6.0, -6.9, -641.161));
                                    }
                                    {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = floor(vec4(-5.1, -6.1, 93.43, -851.830));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        bool _GLF_SWITCH_3_271v[6], _GLF_SWITCH_3_272v;
                                        bvec2(true, false);
                                        mat2x3(8524.3095, 83.89, 1.7, -408.590, 6809.8380, -38.65);
                                        (false ? _GLF_IDENTITY(greaterThan(_GLF_IDENTITY(vec3(4.8, 657.443, -23.84), vec3(0.0, 0.0, 0.0) + (vec3(4.8, 657.443, -23.84))), vec3(-1.9, 8.9, -9.4)), bvec3(_GLF_IDENTITY(bvec3(greaterThan(_GLF_IDENTITY(vec3(4.8, 657.443, -23.84), vec3(0.0, 0.0, 0.0) + (vec3(4.8, 657.443, -23.84))), vec3(-1.9, 8.9, -9.4))), bvec3(bvec3(bvec3(greaterThan(_GLF_IDENTITY(vec3(4.8, 657.443, -23.84), vec3(0.0, 0.0, 0.0) + (vec3(4.8, 657.443, -23.84))), vec3(-1.9, 8.9, -9.4)))))))) : bvec3(bvec4(true, true, true, false)));
                                        continue;
                                        continue;
                                        vec4(2032.5064, -7656.0982, -5166.3488, -616.016);
                                    }
                                    {
                                        118857u;
                                        mat2x3(mat4x2(74.35, -640.157, -107.469, _GLF_IDENTITY(3.4, (false ? _GLF_FUZZED(356.617) : 3.4)), -4062.7737, -8121.9893, 9933.2475, -9755.8671));
                                        continue;
                                    }
                                    mat4x3((-mat4x2(-2652.8267, 0.4, -5.3, -80.43, -0.9, 0.2, 6.8, 687.598)));
                                    {
                                        uvec4(169344u, 182062u, 163477u, 190930u);
                                        continue;
                                        continue;
                                        uvec4 _GLF_SWITCH_3_273v, _GLF_SWITCH_3_274v, _GLF_SWITCH_3_275v;
                                    }
                                    ivec2 _GLF_SWITCH_3_276v, _GLF_SWITCH_3_277v;
                                    injectionSwitch;
                                } else {
                                    ;
                                    for (log(_GLF_color); _GLF_SWITCH_3_163v; greaterThanEqual(ivec4(_GLF_IDENTITY(-38236, (_GLF_IDENTITY(-38236, int(ivec2(-38236, 1)))) ^ 0), 85689, 50002, 27177), ivec4(42973, 92801, -40004, 853))) {
                                        vec3(233.605, -655.106, -4050.8528);
                                        vec3 _GLF_SWITCH_3_278v;
                                        ;
                                        bvec4 _GLF_SWITCH_3_279v, _GLF_SWITCH_3_280v, _GLF_SWITCH_3_281v[60];
                                        greaterThan(ivec4(6389, -54362, 44749, -50894).yz, ivec2(-84684, 19585));
                                        mat2x4 _GLF_SWITCH_3_282v, _GLF_SWITCH_3_283v;
                                        uvec4 _GLF_SWITCH_3_284v, _GLF_SWITCH_3_285v, _GLF_SWITCH_3_286v[42];
                                        return -7626;
                                        mat4x2 _GLF_SWITCH_3_287v;
                                    }
                                    while (_GLF_SWITCH_3_164v) {
                                        (167847u % clamp(uvec4(145729u, 83249u, 108919u, 131220u), 42029u, 139372u));
                                        mat3(-7.4, 2.2, -32.98, -7.0, 29.23, 67.39, 67.86, -625.719, -6767.7491);
                                        discard;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (7.5 * vec4(3.7, 0.1, 4.2, -0.6));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        (ivec3(-50106, -87899, -6020) & l);
                                    }
                                    vec4 _GLF_SWITCH_3_288v;
                                    ivec2(40151, -66361);
                                    while (_GLF_SWITCH_3_162v) {
                                        ;
                                        continue;
                                        ;
                                    }
                                }
                                mat2 _GLF_SWITCH_3_289v[40], _GLF_SWITCH_3_290v[20], _GLF_SWITCH_3_291v[19];
                                mat3x4(10.87, -7236.9725, -9758.7968, -6.8, 6811.4511, -83.87, 83.47, -56.66, 9.2, -_GLF_IDENTITY(80.27, (false ? _GLF_FUZZED(dFdxCoarse(cos(30.74))) : 80.27)), 368.374, -2.8);
                            }
                            while ((mat4x3(mat4x2(7.8, -3.9, -0.1, -0.0, -26.06, -99.38, 1.3, -31.86)) != mat4x3(960.008, 56.71, 0.0, -894.807, -26.67, -1.7, -4296.5478, -9.1, -55.64, 130.564, 5.9, -4058.5774))) {
                                while (_GLF_SWITCH_3_163v) {
                                    for ((129630u + uvec4(55591u, 192011u, 39466u, 3040u)); _GLF_SWITCH_3_163v; mat3x4(-472.921, -349.890, -19.76, 541.561, -5395.6828, -5.8, 6511.2425, 1179.4133, -41.71, -4.4, 5329.9803, -7431.9315)) {
                                        mat2 _GLF_SWITCH_3_292v, _GLF_SWITCH_3_293v[53];
                                        bvec4 _GLF_SWITCH_3_294v;
                                        greaterThanEqual((_GLF_color, uvec2(30569u, 37706u)), uvec2(80765u, _GLF_IDENTITY(96361u, max(_GLF_IDENTITY(96361u, 1u * (96361u)), 96361u))));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (clamp(vec4(9603.6846, -450.690, -1260.0834, 580.222), -1.6, 3.5) / 6080.3941);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                (mat2x4(-3793.2417, 9102.5411, -165.344, 3092.8582, -7.8, 281.167, 14.55, -232.747));
                                if ((h < l)) {
                                    continue;
                                    mat2x3 _GLF_SWITCH_3_295v[35], _GLF_SWITCH_3_296v[95], _GLF_SWITCH_3_297v[60];
                                    ivec4 _GLF_SWITCH_3_298v, _GLF_SWITCH_3_299v;
                                    while ((resolution == resolution)) {
                                        mat4x3((mat2x3(13.67, 8.8, 0.0, -9089.6092, 5463.3421, -8.5) / (-6.8)));
                                        bvec4(false, true, false, false);
                                        ivec2 _GLF_SWITCH_3_300v, _GLF_SWITCH_3_301v[29];
                                        return (l | h);
                                        ((-8.7) / mat2x3(-529.228, -4.0, -6.0, -6247.5680, -453.425, 66.62));
                                        mat3 _GLF_SWITCH_3_302v, _GLF_SWITCH_3_303v, _GLF_SWITCH_3_304v;
                                    }
                                    vec4(resolution, 64.13, mix(6092.9222, -38.15, true));
                                    mat2x4(distance(42.49, 1.1), 144.021, -69.41, -27.69, -905.574, -6.1, _GLF_IDENTITY(-3.0, 1.0 * (-3.0)), 8868.0997);
                                }
                                mat4x2(-42.00, -8111.0062, -1144.8636, -7.8, 8094.9404, 42.88, -6757.9033, 8287.6339);
                                _GLF_IDENTITY(mat3x4(-9.9, -47.19, 3.6, -21.96, -695.107, 8.8, 3.2, -4.0, -6.4, 5490.1491, -23.70, 41.44)[2], _GLF_IDENTITY((mat3x4(-9.9, -47.19, 3.6, -21.96, -695.107, 8.8, 3.2, -4.0, -6.4, 5490.1491, -23.70, 41.44)[2]) * mat4(1.0), mat4(1.0) * ((mat3x4(-9.9, -47.19, 3.6, -21.96, -695.107, 8.8, 3.2, -4.0, -6.4, 5490.1491, -23.70, 41.44)[2]) * mat4(1.0))));
                                if ((mat4(2.5, 9.4, 483.569, 6572.1680, 64.02, 1910.5084, 3.2, 2.4, 9.5, 6.2, 45.24, 0.0, 44.48, 630.441, 209.120, -873.595) == mat4(-2.8, -2.9, 284.492, 7149.9927, _GLF_IDENTITY(1.2, float(mat4(1.2, 1.0, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(_GLF_ZERO(0.0, injectionSwitch.x), 0.0, 1.0, length(vec2(0.0, 0.0)))), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(_GLF_ZERO(0.0, injectionSwitch.x), 0.0, 1.0, length(vec2(0.0, 0.0))))), 1.0, abs(0.0), 0.0, 1.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))), 1.0, 1.0, 0.0, 0.0))), 0.1, -6.9, -18.12, -81.14, -0.5, 9.0, -0.2, 29.48, -5.0, -759.367, -5.5))) {
                                    uvec3(46099u, 176265u, 86560u);
                                    break;
                                    continue;
                                    for (mat4x2(6.6, 7763.1604, 8272.0901, 4.7, -143.663, 320.281, _GLF_IDENTITY(9.5, min(9.5, _GLF_IDENTITY(9.5, float(mat2x4(9.5, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0))))), 4.1); isnan(134.899); uvec2(174629u, 194083u)) {
                                        mat4x3 _GLF_SWITCH_3_305v[69], _GLF_SWITCH_3_306v[75], _GLF_SWITCH_3_307v[38];
                                        continue;
                                        findMSB(pivot);
                                    }
                                    continue;
                                    bvec2 _GLF_SWITCH_3_308v, _GLF_SWITCH_3_309v;
                                } else {
                                    vec2(-50.33, -36.77);
                                    mat2x3(-732.215, -7.1, -6.1, 8.4, 4.4, 5.5);
                                    mat4x2 _GLF_SWITCH_3_310v, _GLF_SWITCH_3_311v;
                                    return l;
                                    {
                                        continue;
                                        ;
                                        (mat4(3803.9716, -7.4, 9800.6419, -0.7, -1095.9776, 89.83, 2.9, -8.8, 4.7, 482.312, -3.3, -843.679, 9.9, -744.194, -6.0, 5185.9999) * mat4(-7.9, -8.0, -22.46, 5.4, 185.899, -3470.7808, 3.7, -98.28, 308.240, 1.2, -52.34, -2.8, 7.5, -7.3, -5807.8589, 9.9));
                                        uvec4 _GLF_SWITCH_3_312v, _GLF_SWITCH_3_313v;
                                        ivec3 _GLF_SWITCH_3_314v, _GLF_SWITCH_3_315v[52], _GLF_SWITCH_3_316v;
                                    }
                                    if (_GLF_SWITCH_3_162v) {
                                    } else {
                                        bvec3(true, true, true);
                                    }
                                    {
                                        (mat3(29.86, 7257.7532, 1.6, 760.736, -23.82, 2.3, 65.98, -6.8, -9.1) * outerProduct(vec3(-7.2, 26.98, -1.0), vec3(-4.6, 1964.8910, -1809.3060)));
                                        ivec2 _GLF_SWITCH_3_317v, _GLF_SWITCH_3_318v;
                                        return pivot;
                                        ;
                                        ivec4(min(h, pivot), _GLF_SWITCH_3_79v);
                                        (mat3x2(510.095, -7013.2814, 4.7, 13.44, 1.7, -7.6));
                                        break;
                                        uint _GLF_SWITCH_3_319v;
                                        ;
                                    }
                                    ;
                                    bvec3 _GLF_SWITCH_3_320v, _GLF_SWITCH_3_321v, _GLF_SWITCH_3_322v[20];
                                }
                            }
                            uintBitsToFloat(uint(_GLF_SWITCH_3_162v));
                            return findMSB(((-l) | j));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(inversesqrt(122.223));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(sin(0.0)))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } else {
                            mat4x3 _GLF_SWITCH_3_323v[63];
                            {
                                return l;
                                do {
                                    while ((bvec2(true, false) == bvec2(true, true))) {
                                        vec2 _GLF_SWITCH_3_324v[89], _GLF_SWITCH_3_325v;
                                        _GLF_SWITCH_3_163v;
                                        break;
                                        ivec4(-70035, -67520, 10658, 24370);
                                        ivec2(90553, -68584);
                                        vec2 _GLF_SWITCH_3_326v[26], _GLF_SWITCH_3_327v[7], _GLF_SWITCH_3_328v;
                                    }
                                } while (any(bvec2(false, false)));
                                uvec2(1282u, 97705u).x;
                                discard;
                            }
                            mat4x3(-71.82, -39.03, -6035.1528, 458.298, 84.36, 7534.0895, -5843.5176, -90.05, -5.6, -6.8, -5.9, 1.8);
                            if (_GLF_SWITCH_3_162v) {
                                mat4x3 _GLF_SWITCH_3_329v, _GLF_SWITCH_3_330v, _GLF_SWITCH_3_331v;
                                if (_GLF_SWITCH_3_164v) {
                                } else {
                                    for ((any(bvec4(false, true, true, true)) ? inverse(mat4(-553.383, 8.7, 0.9, 89.31, -3476.3825, 4.0, 7.0, -23.70, 0.8, 3.8, -95.39, -1940.8214, -8674.4885, -1.5, 9550.0029, -9.7)) : mat4(0.8, 61.68, 152.300, -4.5, -16.62, -37.08, 38.71, 18.95, 7576.1817, 3841.5755, -7.8, -8.1, -6.0, -2694.9070, -1.2, -227.888)); (9.5 == (-61.72)); _GLF_IDENTITY(uvec2(145763u, 161664u), clamp(uvec2(145763u, 161664u), uvec2(145763u, 161664u), _GLF_IDENTITY(uvec2(145763u, 161664u), min(uvec2(145763u, 161664u), uvec2(145763u, 161664u)))))) {
                                        break;
                                        mat3x2 _GLF_SWITCH_3_332v, _GLF_SWITCH_3_333v;
                                        ivec3 _GLF_SWITCH_3_334v[28], _GLF_SWITCH_3_335v;
                                        bvec4(bvec3(false, true, true).bg, bvec2(false, true));
                                    }
                                    mat2x4(-47.28, -_GLF_IDENTITY(710.751, mix(float(_GLF_FUZZED(-178.138)), float(710.751), bool(true))), -9.2, 9.3, -9612.6408, -578.932, 9.1, 9122.9716);
                                    {
                                        return j;
                                        discard;
                                        mat3x2(-353.185, -37.11, -2.8, -152.476, 4.6, 20.32);
                                        bool _GLF_SWITCH_3_336v, _GLF_SWITCH_3_337v, _GLF_SWITCH_3_338v;
                                        uvec4(_GLF_IDENTITY(193998u, 0u | (193998u)), 67293u, 152119u, 40180u);
                                    }
                                    ;
                                    vec3(-14.57, 205.493, 2074.6265);
                                }
                                mat3(-42.20, -9139.8393, 9.4, -8.5, 762.672, -0.2, -5.3, 13.51, -5685.4977);
                                mat4x3 _GLF_SWITCH_3_339v;
                                abs(ceil(2.4));
                                uvec2(69739u, 196442u);
                                uvec2(198632u, 26776u);
                                j;
                                {
                                    for (uvec2(38114u, 123292u); _GLF_SWITCH_3_162v; _GLF_SWITCH_3_79v) {
                                        not(bvec2(false, true));
                                        mat3 _GLF_SWITCH_3_340v, _GLF_SWITCH_3_341v[73];
                                        _GLF_SWITCH_3_339v;
                                        equal(bvec3(false, true, true), bvec3(false, true, true));
                                        break;
                                        vec2 _GLF_SWITCH_3_342v, _GLF_SWITCH_3_343v[17], _GLF_SWITCH_3_344v;
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(7.4, 46.24, 9.8, -980.600);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        mat3 _GLF_SWITCH_3_345v[76], _GLF_SWITCH_3_346v[42], _GLF_SWITCH_3_347v;
                                    }
                                    vec3 _GLF_SWITCH_3_348v[40];
                                    for (mat4x2(mat4(342.169, _GLF_IDENTITY(-24.11, clamp(-24.11, -24.11, _GLF_IDENTITY(-24.11, clamp(-24.11, -24.11, -24.11)))), 300.403, -2445.1580, -_GLF_IDENTITY(90.09, mix(float(_GLF_FUZZED(0.2)), float(90.09), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))), 7953.0578, -91.21, -94.24, 8860.2739, -9091.7208, 770.162, 51.31, -5.4, -7.7, 19.18, 8.3)); lessThanEqual(uvec3(118426u, 28481u, 134090u), uvec3(23309u, 27943u, 157515u))[2]; 7.6) {
                                        mat3x4 _GLF_SWITCH_3_349v[15], _GLF_SWITCH_3_350v, _GLF_SWITCH_3_351v;
                                        mat2x3 _GLF_SWITCH_3_352v[73], _GLF_SWITCH_3_353v[62], _GLF_SWITCH_3_354v;
                                        mat4x2(-4.1, -7.5, 92.08, 69.97, 4.1, 4260.6784, 9123.6111, 529.908);
                                        ((_GLF_SWITCH_3_162v ? mat4(1.4, -8.7, 6.6, -195.608, 23.13, -1.3, -51.79, -9.0, -87.35, 20.42, -4.9, -708.537, -1534.7998, 694.202, 0.4, -9.2) : mat4(-592.056, 8.2, 6475.7085, -1.0, 9247.9013, -566.195, 2105.3391, 953.280, 14.31, 1.0, -3.9, -3.4, 4.8, 1.5, -0.2, 2177.1223)));
                                        uint _GLF_SWITCH_3_355v[73], _GLF_SWITCH_3_356v, _GLF_SWITCH_3_357v;
                                        mat3x2 _GLF_SWITCH_3_358v[73], _GLF_SWITCH_3_359v[54];
                                    }
                                    {
                                        ivec3 _GLF_SWITCH_3_360v, _GLF_SWITCH_3_361v[75];
                                        return h;
                                        mat2x3(-287.755, 6.0, 1.0, 4898.7696, 165.997, -4.0);
                                        997.276;
                                        uvec3 _GLF_SWITCH_3_362v, _GLF_SWITCH_3_363v[95];
                                        mat3x2 _GLF_SWITCH_3_364v[67];
                                        _GLF_SWITCH_3_162v;
                                        ;
                                    }
                                    mat4 _GLF_SWITCH_3_365v, _GLF_SWITCH_3_366v, _GLF_SWITCH_3_367v;
                                    if ((_GLF_SWITCH_3_162v && true)) {
                                        uvec4 _GLF_SWITCH_3_368v, _GLF_SWITCH_3_369v, _GLF_SWITCH_3_370v;
                                        return findLSB(j);
                                        bvec2 _GLF_SWITCH_3_371v, _GLF_SWITCH_3_372v;
                                        uint _GLF_SWITCH_3_373v, _GLF_SWITCH_3_374v;
                                        bvec2 _GLF_SWITCH_3_375v, _GLF_SWITCH_3_376v, _GLF_SWITCH_3_377v;
                                        uvec2(16773u, 110360u);
                                        (step(vec3(-2.2, 3.8, -292.999), vec3(5.2, -514.471, 1.2)), bvec4(false, true, false, false));
                                        mat4x2 _GLF_SWITCH_3_378v, _GLF_SWITCH_3_379v, _GLF_SWITCH_3_380v[35];
                                        ldexp(injectionSwitch, ivec2(-50675, -70666));
                                    } else {
                                        uvec4((34651u % uvec2(193895u, 83418u)), uvec2(165993u, 87452u));
                                        return l;
                                        pivot;
                                    }
                                }
                            } else {
                                discard;
                                bvec3 _GLF_SWITCH_3_381v, _GLF_SWITCH_3_382v, _GLF_SWITCH_3_383v;
                                mat2x4(-4.1, -6.7, -9.5, -48.75, 1690.8451, -92.00, 60.70, -9.1);
                                ivec2 _GLF_SWITCH_3_384v, _GLF_SWITCH_3_385v[27];
                                {
                                    bvec2 _GLF_SWITCH_3_386v[22], _GLF_SWITCH_3_387v[32], _GLF_SWITCH_3_388v[87];
                                    true;
                                    uint _GLF_SWITCH_3_389v, _GLF_SWITCH_3_390v;
                                    while (false) {
                                        continue;
                                    }
                                    {
                                        mat4 _GLF_SWITCH_3_391v[58], _GLF_SWITCH_3_392v, _GLF_SWITCH_3_393v;
                                        mat4x2 _GLF_SWITCH_3_394v, _GLF_SWITCH_3_395v[91];
                                        mat3x4(-139.594, 6044.7673, -2572.0444, -9741.0057, 1.9, -527.541, -8.6, 6797.6853, -6.3, -96.60, -7.8, -2930.4116);
                                        mat3(7362.4082, 7.4, -167.043, -6700.0938, -4.4, 60.66, 7384.2431, -367.047, 7.1);
                                        return j;
                                        ((_GLF_SWITCH_3_162v ? mat2x4(-9493.9394, 497.132, -5213.2189, 928.005, -5.0, 8.9, -229.264, 34.51) : matrixCompMult(mat2x4(-0.4, 0.0, -9533.2630, -863.284, 1.5, -1903.0203, -53.89, -37.09), mat2x4(1.3, 1.5, -6813.4595, -2.9, -0.7, -4.6, -30.38, 6.0))) - (-19.93));
                                    }
                                    ;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-6969.2222, -_GLF_IDENTITY(7.2, clamp(_GLF_IDENTITY(7.2, (7.2) / 1.0), _GLF_IDENTITY(7.2, (7.2) / 1.0), 7.2)), -84.30, 51.12);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                {
                                }
                                mat3x4(9.8, -907.662, 7.6, 5.6, 4227.8047, 8887.7377, -498.368, 2308.2685, 4249.9753, -1.8, 661.328, 7.8);
                            }
                            (findMSB(ivec2(64602, -77923)) == floatBitsToInt(injectionSwitch));
                        }
                        uvec4 _GLF_SWITCH_3_396v, _GLF_SWITCH_3_397v[65];
                    }
                default:
                    1;
            }
        }
    }
    i++;
    swap(i, _GLF_IDENTITY(h, ~(~(h))));
    return i;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-8.3, -3095.0898, -2.8, -26.40);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (vec4(-413.737, 0.4, 3.2, 911.056) * _GLF_color);
    }
}

void quicksort() {
    int l = 0, h = 9;
    int stack[10];
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(_GLF_struct_1(vec4(1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_struct_2(ivec4(1, 1, 1, 1), vec2(1.0, 1.0))), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_3(1, _GLF_struct_4(bvec4(true, true, true, true), bvec3(true, true, true), uvec3(1u, 1u, 1u), bvec2(true, true), uvec2(1u, 1u), uvec2(1u, 1u)), ivec4(1, 1, 1, 1), ivec2(1, 1), 1, _GLF_struct_5(true), -1, uvec2(1u, 1u)), uvec3(1u, 1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    stack[++_GLF_struct_replacement_0._f2.top] = l;
    stack[++_GLF_struct_replacement_0._f2.top] = h;
    while (_GLF_struct_replacement_0._f2.top >= 0) {
        h = stack[_GLF_struct_replacement_0._f2.top--];
        l = stack[_GLF_struct_replacement_0._f2.top--];
        int p = performPartition(l, h);
        if (p - 1 > l) {
            stack[++_GLF_struct_replacement_0._f2.top] = l;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-48.86, -596.789, -2.6, 5.8);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            stack[++_GLF_struct_replacement_0._f2.top] = p - 1;
        }
        if (_GLF_IDENTITY(p + 1, max(p + 1, p + 1)) < h) {
            stack[++_GLF_struct_replacement_0._f2.top] = p + 1;
            stack[++_GLF_struct_replacement_0._f2.top] = h;
        }
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdyFine(vec4(5420.2593, -5.0, -1.9, 1.8));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    for (int i = _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, 0 + (0)), _GLF_IDENTITY(0, clamp(0, _GLF_IDENTITY(0, min(0, _GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, max(0, _GLF_IDENTITY(0, max(0, 0))))))))), 0)))); _GLF_IDENTITY(i < 10, true && (i < 10)); i++) {
        obj.numbers[i] = (10 - i);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.8, -916.236, 7.7, -22.73);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = normalize(vec4(-3836.7879, 9.1, -20.29, 8015.9170));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        obj.numbers[i] = obj.numbers[i] * obj.numbers[i];
    }
    quicksort();
    _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(vec3(1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_7(_GLF_struct_8(mat4x2(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 1.0, 1.0, 1.0), _GLF_IDENTITY(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), (mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)) - mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), _GLF_struct_9(vec3(1.0, 1.0, 1.0), 1, _GLF_IDENTITY(1, (_GLF_IDENTITY(1, max(_GLF_IDENTITY(1, (1) + 0), 1))) >> 0)), _GLF_struct_10(_GLF_IDENTITY(uvec2(1u, 1u), min(uvec2(1u, 1u), uvec2(1u, 1u))), uvec2(1u, 1u), ivec3(1, 1, 1), vec3(1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), ivec4(_GLF_IDENTITY(1, 0 ^ (1)), 1, 1, 1), bvec2(true, true)), ivec3(1, 1, 1)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), gl_FragCoord.xy / resolution, _GLF_struct_11(ivec4(1, 1, 1, 1), uvec4(1u, 1u, 1u, 1u), ivec4(1, 1, 1, 1), _GLF_IDENTITY(ivec2(1, 1), ~(~(ivec2(1, 1))))));
    vec3 color = vec3(1.0, 2.0, 3.0);
    color.x += float(obj.numbers[0]);
    if (_GLF_struct_replacement_6.uv.x > (1.0 / 4.0)) {
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = fwidth(vec4(-1346.0825, -3.9, -5974.0107, -1.7));
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = cosh(vec4(-4.1, 2084.5061, 7.7, 370.184));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(1761.0786, 10.97, -6.9, 8.1);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        color.x += float(obj.numbers[1]);
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = fract(_GLF_color);
    }
    if (_GLF_struct_replacement_6.uv.x > (2.0 / 4.0)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = dFdx(_GLF_color).yzxz;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(95.04, 1.4, -90.72, 5.0);
        }
        color.y += float(obj.numbers[2]);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(4953.7743, 990.472, -8.1, -564.621) * 666.213);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) / vec4(1.0, 1.0, 1.0, 1.0)).x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = atan(vec4(656.915, -53.31, -80.97, -6.1));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_struct_replacement_6.uv.x > (_GLF_IDENTITY(3.0, max(3.0, 3.0)) / 4.0)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(363.359, -85.76, 60.73, 85.24);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        color.z += float(obj.numbers[3]);
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, (true ? _GLF_IDENTITY(gl_FragCoord.y, mix(float(_GLF_FUZZED(-9.2)), float(gl_FragCoord.y), bool(true))) : _GLF_FUZZED(-7.1))) < 0.0)))) {
            _GLF_color = vec4(-1817.0550, -12.02, -79.40, -127.019);
        }
    }
    color.y += float(obj.numbers[4]);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = round(mat4(9109.9769, -206.587, 2561.3231, -9358.0820, -2252.2456, -5.8, -52.08, 9.9, -50.70, -411.027, -18.41, -284.433, 2934.4608, 8381.7594, 6910.6918, -_GLF_IDENTITY(870.160, (870.160) + 0.0))[1]);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(3.8, -66.42, 5.3, 0.7);
    }
    if (_GLF_struct_replacement_6.uv.y > (1.0 / 4.0)) {
        color.x += float(obj.numbers[5]);
    }
    if (_GLF_struct_replacement_6.uv.y > (2.0 / 4.0)) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdyCoarse(vec4(2590.3603, 4643.7221, -_GLF_IDENTITY(9.5, _GLF_IDENTITY(float(mat4(9.5, 1.0, determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, exp(0.0))), 1.0, tan(0.0), 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), determinant(mat2(1.0, tan(0.0), 0.0, 1.0)), 0.0, 0.0, 1.0, 0.0, 0.0, exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x))), mix(float(_GLF_FUZZED(2.5)), float(float(mat4(9.5, 1.0, determinant(mat3(1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, exp(0.0))), 1.0, tan(0.0), 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), determinant(mat2(1.0, tan(0.0), 0.0, 1.0)), 0.0, 0.0, 1.0, 0.0, 0.0, exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)))), bool(true)))), 991.639));
            }
            _GLF_color = acosh(vec4(1671.4664, 6.8, -3671.1774, -9.9));
        }
        color.y += float(obj.numbers[6]);
        if (_GLF_DEAD(false)) {
            _GLF_color = resolution.gggr;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (98.72 * vec4(912.331, 11.01, -4.7, 725.952));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_struct_replacement_6.uv.y > (3.0 / 4.0)) {
        color.z += float(obj.numbers[7]);
    }
    color.z += _GLF_IDENTITY(float(obj.numbers[8]), mix(float(float(obj.numbers[8])), float(_GLF_FUZZED(8.9)), bool(false)));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-201.417, 0.7, 78.35, 16.42);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = acosh(_GLF_IDENTITY(vec4(-7355.5124, 81.27, 9.8, -3.7), vec4(mat3x4(vec4(-7355.5124, 81.27, 9.8, -3.7), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0))));
    }
    if (abs(_GLF_struct_replacement_6.uv.x - _GLF_struct_replacement_6.uv.y) < 0.25) {
        color.x += float(obj.numbers[9]);
    }
    _GLF_IDENTITY(_GLF_color = vec4(normalize(color), 1.0), (false ? _GLF_FUZZED(vec4(-70.33, -5133.0880, 12.92, -939.558)) : (_GLF_color = vec4(normalize(color), 1.0))));
}
