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
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

vec4 _GLF_outlined_0(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

void merge(int from, int mid, int to) {
    int k = from, i = from, j = mid + 1;
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-528.727, 9.8, -608.096, 362.876);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-7368.8402, 324.109, -6.7, 4.6);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-6405.9412, 1.6, 7101.2028, -480.709);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-172.395, 2.7, 2.9, -7.7);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } else {
            temp[k++] = data[j++];
        }
    }
    do {
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6.8, -5.4, 7599.8445, -60.80);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mix(vec4(-383.877, 40.95, -4.0, 9.9), vec4(784.855, 1.2, -2.3, 32.88), -8.5);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-0.9, -5441.4420, -81.01, -65.90);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false, true))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return;
        }
        while (i < N && i <= mid) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                temp[k++] = data[i++];
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = step(vec4(4912.6358, -1.1, -55.06, -2.4), vec4(-5818.8351, -1153.6619, -5308.0965, 6.3));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(363.338, -0.4, -62.86, 9.9);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outlined_0(_GLF_outVarBackup_GLF_color);
                    }
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(9.4, -25.47, 2.7, 676.889);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
    }
}

vec4 _GLF_outlined_1(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

void mergeSort() {
    int low = 0;
    int high = N - 1;
    for (int m = 1; m <= high; m = 2 * m) {
        for (int i = low; i < high; i += 2 * m) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-724.629, 6014.1059, 221.809, 72.95);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                discard;
            }
            int from = i;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3379.3381, -56.43, -5.9, -843.973);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (ceil(vec3(-1.4, 81.12, 2.9)) * ((-74.72) / ((-6.7) * mat4x3(-33.21, -1.9, 4956.5710, -1.5, -4117.0180, 5549.9672, 9.4, -64.72, 8.3, -35.77, 742.076, 25.21))));
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                    discard;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = max(vec4(2.9, -433.423, 0.9, 503.427), 4.4);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_1(_GLF_outVarBackup_GLF_color);
                }
            }
            int mid = i + m - 1;
            int to = min(i + 2 * m - 1, high);
            merge(from, mid, to);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (clamp(vec4(-1.7, 3495.3165, -6923.7003, 4.6), 0.2, -0.6) * (mat3x4(2995.6629, 49.87, 304.250, 603.363, 8365.0501, -204.677, -4011.9563, -4.6, -7547.0272, 3.7, 0.3, -5.2) * mat4x3(-45.84, -84.86, 9.2, 2.8, -88.93, -1.9, -56.69, -7448.0536, -40.02, 7549.8078, 84.34, 57.07)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8.3, 1.3, 691.012, 0.0);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
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
            _GLF_color = vec4(-83.83, 70.16, 2058.6213, -92.50);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(129.377, -62.80, -6.1, 6.8);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        }
        _GLF_color = vec4(-7.2, -2.6, 974.579, 9142.3943);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_2() {
    return intBitsToFloat(ivec4(-89051, 92127, -26194, 23804));
}

void main() {
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (sin(vec4(9.9, 0.2, 1341.6707, -3.8)) / roundEven(5.0));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return;
    }
    int i = int(injectionSwitch.x);
    do {
        switch (i) {
            case 0:
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    } else {
                        data[i] = 4;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_2();
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-332.565, 466.766, 5.3, 446.581);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                }
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter--) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    }
                    _GLF_color = vec4(-4.2, -4889.1545, -0.9, -0.0);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 1:
                data[i] = 3;
                break;
            case 2:
                data[i] = 2;
                break;
            case 3:
                data[i] = 1;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(629.804, 8372.9218, -3.7, -5.2);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = abs(mat3x4(726.018, -9.7, -28.96, 5.8, -2.6, -5.5, -756.484, -4.3, 63.05, 1.6, 264.240, -1639.9271)[0]);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(vec4(-870.785, 3316.1682, 7.3, -5.3), vec4(1.1, -16.67, 5984.5280, -5708.5967));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-8543.7226, 9.2, min(415.139, 8374.7551), -3947.6754);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            case 4:
                {
                    switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                        case 0:
                        case 12:
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        case 16:
                            _GLF_color = vec4(-29.96, 32.68, -1047.3790, 3.6);
                        case 2:
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            break;
                        default:
                            1;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-2.5, 1.3, -98.72, -5.9);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = trunc(vec4(-46.56, -66.56, -6.0, 2015.4734));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                data[i] = 0;
                if (_GLF_DEAD(false)) {
                    return;
                }
                break;
            case 5:
                data[i] = -1;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(vec4(4.2, 6822.3894, vec2(2.8, 1.1)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        do {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, true && (false))) || false)));
                    }
                }
                break;
            case 6:
                data[i] = -2;
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mat2x4(mat3x4(-4.1, -955.512, 5949.4116, 772.752, 8.4, -2.4, 7.2, -2.3, -7413.6375, 0.8, 9442.0918, -6.7))[1];
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            case 7:
                data[i] = -3;
                break;
            case 8:
                data[i] = -4;
                break;
            case 9:
                data[i] = -5;
                break;
        }
        i++;
    } while (i < 10);
    for (int j = 0; j < 10; j++) {
        temp[j] = data[j];
    }
    mergeSort();
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = acosh(vec4(262.619, 2.2, -70.02, -2252.0755));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    float grey;
    if (int(gl_FragCoord[1]) < 30) {
        grey = 0.5 + float(data[0]) / 10.0;
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > ((0 >> _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                _GLF_color = tan((min(vec4(-67.00, 0.8, 149.614, 848.464), -7.6) * vec4(-8635.9594, -6.7, -78.85, -712.338)));
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(vec2(-392.631, -1767.2171), 9873.8675, tan(-1.6));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        }
    } else {
        if (int(gl_FragCoord[1]) < 60) {
            grey = 0.5 + float(data[1]) / 10.0;
        } else {
            for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = uintBitsToFloat(uvec4(99256u, 91820u, 169148u, 126481u));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (int(gl_FragCoord[1]) < 90) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        grey = 0.5 + float(data[2]) / 10.0;
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-975.277, -3.5, -797.047, -91.83);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (int(gl_FragCoord[1]) < 120) {
                        grey = 0.5 + float(data[3]) / 10.0;
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-427.522, -6.2, -207.816, -8.6);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (int(gl_FragCoord[1]) < 150) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1.7, 39.88, -753.491, -21.33);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            discard;
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                if (int(gl_FragCoord[1]) < 180) {
                                    grey = 0.5 + float(data[5]) / 10.0;
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (int(gl_FragCoord[1]) < 210) {
                                        grey = 0.5 + float(data[6]) / 10.0;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (vec4(-26.55, 5.5, 760.105, 2.2) * vec4(2.1, 31.42, -3.1, 98.71));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                            } else {
                                                _GLF_color = vec4(-3801.8383, -45.97, 847.550, 85.09);
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(2908.5832, 502.710, -1.0, -8078.8333);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            } else {
                                            }
                                        }
                                    } else {
                                        if (int(gl_FragCoord[1]) < 240) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = intBitsToFloat(ivec4(61570, 49369, 71690, 47740));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            grey = 0.5 + float(data[7]) / 10.0;
                                        } else {
                                            if (int(gl_FragCoord[1]) < 270) {
                                                switch (_GLF_SWITCH(0)) {
                                                    case 34:
                                                        (mat3(-1.3, 9.7, 4.8, -155.077, -763.052, -41.79, 259.490, 453.220, 2.9));
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = tan(vec4(-9.3, -79.80, -53.48, 0.6));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    case 2:
                                                        mat2(9.6, -29.55, 49.19, 9.5);
                                                    case 0:
                                                    case 26:
                                                    case 96:
                                                        grey = 0.5 + float(data[8]) / 10.0;
                                                    case 1:
                                                    case 49:
                                                    case 14:
                                                    case 4:
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            return;
                                                        }
                                                        break;
                                                    case 12:
                                                        vec3(-4596.7827, -69.10, 67.29);
                                                    case 31:
                                                        mat2x4(-907.819, 6580.3207, -1028.0925, -8.3, 6535.4631, -0.0, 3632.6309, -890.057);
                                                    default:
                                                        1;
                                                }
                                            } else {
                                                switch (_GLF_SWITCH(0)) {
                                                    case 13:
                                                        if (false) {
                                                            switch (_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x)))) {
                                                                case 0:
                                                                    bitCount(min(ivec2(-2453, -63829), ivec2(-2588, -22990)));
                                                                    while (true) {
                                                                        return;
                                                                        ivec2 _GLF_SWITCH_1_0v[70], _GLF_SWITCH_1_1v[3], _GLF_SWITCH_1_2v[79];
                                                                        ;
                                                                        if (true) {
                                                                            ivec4(-72873, 58102, -6828, -85022);
                                                                            mat3x2(mat4(-1.4, -16.91, -578.313, -1.5, -9.3, -897.564, -5.0, -3.1, 585.430, -8.0, -46.28, 853.463, 159.479, -0.2, 1105.0530, 880.882));
                                                                            {
                                                                                for (greaterThan(findMSB(uvec3(62396u, 165858u, 22761u)), (ivec3(-99257, 93315, 88259) & ivec3(16414, -20630, -75169))); (int(false) > 63606); mat3x2(-91.09, 9.0, -2.6, -50.26, 73.73, -9.9)) {
                                                                                    mat3 _GLF_SWITCH_1_3v, _GLF_SWITCH_1_4v, _GLF_SWITCH_1_5v[82];
                                                                                    ((ivec3(-9293, -71401, 11313) % ivec3(47997, 13462, -6477)) + ivec3(85601, 38820, -84700));
                                                                                    degrees(injectionSwitch);
                                                                                    mat2(mat4x2(-9105.9136, 21.61, -3.3, 6326.8507, 6150.9431, 60.91, -7.8, 7802.1333));
                                                                                }
                                                                                break;
                                                                                for (int _injected_loop_counter = (((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))) | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                    while (true) {
                                                                                        float _GLF_SWITCH_1_6v, _GLF_SWITCH_1_7v, _GLF_SWITCH_1_8v;
                                                                                        bool _GLF_SWITCH_1_9v, _GLF_SWITCH_1_10v[37], _GLF_SWITCH_1_11v;
                                                                                        continue;
                                                                                        vec2 _GLF_SWITCH_1_12v;
                                                                                        uvec4 _GLF_SWITCH_1_13v[35], _GLF_SWITCH_1_14v;
                                                                                        ivec4 _GLF_SWITCH_1_15v[66], _GLF_SWITCH_1_16v;
                                                                                    }
                                                                                }
                                                                                continue;
                                                                                while (true) {
                                                                                }
                                                                                do {
                                                                                    if ((findLSB(uvec2(5849u, 137311u)) != ivec2(31362, 51630))) {
                                                                                        int _GLF_SWITCH_1_17v;
                                                                                        uvec4 _GLF_SWITCH_1_18v, _GLF_SWITCH_1_19v[91];
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                            }
                                                                            if (true) {
                                                                            } else {
                                                                                mat4(-12.24, 9161.6272, -1.9, -9.3, -452.906, 98.90, -779.302, 6555.1730, -3.9, 93.68, -67.66, -9.8, -437.128, 5.3, 2.1, 2.5);
                                                                                return;
                                                                                uvec2 _GLF_SWITCH_1_20v[39], _GLF_SWITCH_1_21v, _GLF_SWITCH_1_22v;
                                                                                continue;
                                                                                while ((grey <= (-(-45.37)))) {
                                                                                    bvec4(false, true, false, false);
                                                                                    mat3 _GLF_SWITCH_1_23v, _GLF_SWITCH_1_24v, _GLF_SWITCH_1_25v;
                                                                                    (mat2x3(grey, 0.4, -2.0, grey, grey, 127.809) / 36.54);
                                                                                    mat2x4 _GLF_SWITCH_1_26v;
                                                                                    mat2x4 _GLF_SWITCH_1_27v;
                                                                                    uvec3 _GLF_SWITCH_1_28v[55];
                                                                                }
                                                                                _GLF_color;
                                                                            }
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(9453.4969, 767.376, 9.5, 3.1);
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            break;
                                                                            if (false) {
                                                                                (grey == grey);
                                                                                ;
                                                                                return;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    break;
                                                                                }
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = mat4(-924.484, -6.9, -98.48, -326.777, 852.320, 439.439, 90.52, 3958.1631, 8.9, 1.3, 8.4, -3.7, -5385.7169, 3.2, 98.77, 1.7)[2];
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                                mat4x2 _GLF_SWITCH_1_29v, _GLF_SWITCH_1_30v, _GLF_SWITCH_1_31v;
                                                                                if (((mat3x2(-7.1, -9102.0820, -784.647, 603.829, 7.6, -1.9) + grey) == mat3x2(52.05, -7.0, 848.493, -8.9, 7.1, -8.8))) {
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                        discard;
                                                                                    } else {
                                                                                    }
                                                                                    ;
                                                                                    mat3x2 _GLF_SWITCH_1_32v, _GLF_SWITCH_1_33v, _GLF_SWITCH_1_34v[90];
                                                                                }
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = roundEven(vec4(237.640, 246.843, -1.2, 8.6));
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = vec4(58.34, -89.69, -1.4, -1152.8975);
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        uint _GLF_SWITCH_1_35v[76], _GLF_SWITCH_1_36v[60], _GLF_SWITCH_1_37v;
                                                                    }
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(-67.33, -6.7, -1.9, -4.0);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                case 60:
                                                                    return;
                                                                    mat4x3 _GLF_SWITCH_1_38v[78], _GLF_SWITCH_1_39v[84];
                                                                    do {
                                                                        {
                                                                            for (bvec3 _GLF_SWITCH_1_40v; (mat2(-97.00, 1.6, 26.61, -56.56) != mat2(2.2, -9.1, -2963.4003, -6470.1593)); ldexp(vec4(-0.0, 5.8, -3172.6528, 1393.7476), ivec4(-70172, -41657, 75932, 45694))) {
                                                                                while (false) {
                                                                                    {
                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                        _GLF_color = dFdxCoarse(vec4(-88.68, -2.2, -5.8, 43.20));
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                    continue;
                                                                                    mat4x3 _GLF_SWITCH_1_41v[61], _GLF_SWITCH_1_42v;
                                                                                    transpose(mat2(7400.1088, -9.4, 685.262, -9829.1377));
                                                                                    return;
                                                                                    ivec2(22267, 17024);
                                                                                    vec2 _GLF_SWITCH_1_43v[48], _GLF_SWITCH_1_44v, _GLF_SWITCH_1_45v[75];
                                                                                    ;
                                                                                    ivec3 _GLF_SWITCH_1_46v[37], _GLF_SWITCH_1_47v, _GLF_SWITCH_1_48v;
                                                                                    _GLF_SWITCH_1_44v;
                                                                                }
                                                                                break;
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    return;
                                                                                }
                                                                                uvec2 _GLF_SWITCH_1_49v, _GLF_SWITCH_1_50v[44];
                                                                                ((118573u / _GLF_SWITCH_1_49v) | (42341u * 61968u));
                                                                                continue;
                                                                                while ((bvec4(false, false, true, true) == bvec4(true, true, true, false))) {
                                                                                    bvec3 _GLF_SWITCH_1_51v;
                                                                                    break;
                                                                                    (grey / mat4x3(-144.557, 63.88, -7.8, -981.227, -0.9, 37.53, 1098.8996, -88.42, -7.1, -13.33, 791.643, -13.61));
                                                                                    bool _GLF_SWITCH_1_52v, _GLF_SWITCH_1_53v;
                                                                                    uvec3(24606u, 164416u, 130018u);
                                                                                    (-mat3x4(-23.03, -647.356, -43.97, 9.0, 270.554, -7.9, -9.8, 194.921, 2.5, 3.1, -7.7, -26.32));
                                                                                    {
                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                        _GLF_color = atanh(vec4(-60.23, -3.7, 8.0, -79.78));
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                    (+grey);
                                                                                    float _GLF_SWITCH_1_54v[46], _GLF_SWITCH_1_55v;
                                                                                    ;
                                                                                    {
                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                        _GLF_color = vec4(-5805.7903, -2.5, 4.6, -9.9);
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            for (grey; false; grey) {
                                                                                greaterThanEqual(uvec2(97572u, 175623u), uvec2(197361u, 97396u));
                                                                                uint _GLF_SWITCH_1_56v, _GLF_SWITCH_1_57v;
                                                                                while (((false != false) ^^ false)) {
                                                                                    grey;
                                                                                    floor(grey);
                                                                                    uvec3(41778u, 119934u, 103114u);
                                                                                    i;
                                                                                    packHalf2x16(injectionSwitch);
                                                                                    bvec4(true, true, isinf(injectionSwitch));
                                                                                    mat2x3(mat2x4(-110.638, 494.097, -529.669, 8.3, 3.5, 9753.7002, -6.4, 55.35));
                                                                                    continue;
                                                                                    break;
                                                                                }
                                                                                if (((N >> 68928) > (-64325))) {
                                                                                    return;
                                                                                    mat4 _GLF_SWITCH_1_58v, _GLF_SWITCH_1_59v;
                                                                                    (((+mat2x3(-102.523, 2141.2700, -7.8, 0.0, 943.205, 3.3)) - mat2x3(6578.4591, -6.4, -285.306, -6.9, 4.4, 211.637)) * mat2(4065.0170, 81.66, 3190.2150, 5138.4360));
                                                                                    ;
                                                                                    continue;
                                                                                }
                                                                                bvec4 _GLF_SWITCH_1_60v;
                                                                                while ((mat2x3(7342.8554, 3.8, -0.3, -238.941, -5.6, 788.105) == mat2x3(45.74, -456.158, 6163.9226, 8.2, -493.875, -2.9))) {
                                                                                    mix(_GLF_SWITCH_1_60v, bvec4(true, true, true, false), bvec4(false, true, false, true));
                                                                                    continue;
                                                                                    (mat2x3(87.62, -8384.1165, 7923.9042, -568.417, -464.138, -5.6) * mat4x2(1.1, 548.358, -631.761, 28.11, 32.13, -5.7, -6480.4306, 5808.5224));
                                                                                    mat3x2(-0.7, 42.38, -1.8, -20.18, -3809.6606, 641.421);
                                                                                    findMSB(N);
                                                                                    vec2 _GLF_SWITCH_1_61v;
                                                                                    mat4x2 _GLF_SWITCH_1_62v[81];
                                                                                    return;
                                                                                }
                                                                                for (vec3(5.5, 5989.4636, -0.0); (1.6 != (-891.268)); vec2(-5.3, 4.7)) {
                                                                                    uvec2 _GLF_SWITCH_1_63v, _GLF_SWITCH_1_64v;
                                                                                }
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = max(vec4(-5.7, -684.331, 50.44, -5.3), (vec2(-9418.3741, -7591.4410) * mat4x2(80.11, -5209.0884, -697.319, -3078.2888, 5.2, 8.4, -35.96, -1.1)));
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                                {
                                                                                    mat2x3(mat3x2(8629.2725, -9320.2011, -4164.0854, -834.234, 1716.0697, -0.9));
                                                                                    ;
                                                                                    floatBitsToInt(length(663.910));
                                                                                    break;
                                                                                    {
                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                        _GLF_color = uintBitsToFloat(uvec4(38333u, 113255u, 149866u, 55400u));
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                    mat3x2(19.44, 20.13, 951.911, 7.6, -1397.2840, -7013.9026);
                                                                                    (uvec2(60352u, 174843u) + (_GLF_SWITCH_1_56v % 197048u));
                                                                                    return;
                                                                                    (uvec3(80232u, 185136u, 42201u) >> uvec3(63448u, 180141u, 191593u));
                                                                                    sqrt(vec2(-286.130, -218.996));
                                                                                }
                                                                                vec3 _GLF_SWITCH_1_65v[51], _GLF_SWITCH_1_66v;
                                                                            }
                                                                            continue;
                                                                            continue;
                                                                            if (true) {
                                                                            }
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        } else {
                                                                            ((mat4x3(0.9, 255.279, 3.0, -232.570, -6.7, -2.1, 1.8, 1.1, -49.12, 97.00, -530.265, -326.519) + vec3(-24.26, -905.666, -440.522)[0]) != mat4x3(2.2, -0.8, -40.38, 5.0, -7.2, -0.4, 25.87, 13.47, -0.8, -359.127, 420.713, 844.022));
                                                                        }
                                                                        bvec2 _GLF_SWITCH_1_67v;
                                                                        (~uvec2(142562u, 182310u));
                                                                        ;
                                                                    } while ((uvec4(188400u, 122866u, 156509u, 47u) != uvec4(165015u, 21281u, 33372u, 100582u)));
                                                                    ;
                                                                    break;
                                                                default:
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(5557.4806, 7.3, 7.3, -4.0);
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    1;
                                                            }
                                                        } else {
                                                            switch (_GLF_SWITCH(0)) {
                                                                case 81:
                                                                    for (mat2x4(mat2x3(-17.15, 25.16, 4244.4157, 3.1, -8.4, -6.3)); ((167789u / 85074u) < 55257u); (true ? mat4x2(-6.5, -3.1, 6.7, 9.4, 27.71, 3.9, 9.9, 43.49) : mat4x2(9126.2305, 69.22, -3579.8310, 4218.6538, 6698.3554, 6.0, -3.6, 648.392))) {
                                                                        ;
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = vec4(4.3, 35.95, 69.68, -330.081);
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        for (uint _GLF_SWITCH_4_0v[32], _GLF_SWITCH_4_1v; false; bvec2(bvec3(true, false, false))) {
                                                                            floatBitsToUint(sin(grey));
                                                                            return;
                                                                        }
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = atan(vec4(-9024.4807, -9.7, 6.2, -11.55));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        {
                                                                            for (floatBitsToUint((vec3(8.0, 9.9, -905.390) + mat4x3(16.41, -1621.2439, 86.92, 68.81, -4.3, -6.2, -1.3, -7.3, -874.338, 3.3, 55.31, -70.70)[0])); false; fract(length(vec4(2033.8185, -6.3, -513.770, 1.2)))) {
                                                                            }
                                                                            {
                                                                                (false == (mat2x4(2.4, 5889.3659, -8.9, -7.1, -95.23, -286.584, -799.595, -3.5) != mat2x4(-2.8, 36.77, 6.2, 7.5, -8.9, -1.7, -1.8, -1.4)));
                                                                                (7.5 != asin(grey));
                                                                                break;
                                                                                {
                                                                                    (grey * fwidthCoarse(injectionSwitch));
                                                                                    while (false) {
                                                                                        mat2x3 _GLF_SWITCH_4_2v[91], _GLF_SWITCH_4_3v[68], _GLF_SWITCH_4_4v[99];
                                                                                        (mat2x3(-27.93, -2.9, 75.03, 8.4, -684.535, -587.513) - mat2x3(-9300.7154, -7622.1785, -4.0, -5.4, -5747.4165, 5.5));
                                                                                        float _GLF_SWITCH_4_5v, _GLF_SWITCH_4_6v, _GLF_SWITCH_4_7v;
                                                                                        (N > N);
                                                                                        return;
                                                                                        bvec3 _GLF_SWITCH_4_8v;
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = vec4(805.775, 666.690, -9.6, 4.6);
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    continue;
                                                                                    if (false) {
                                                                                        (mat3x2(mat2(-125.242, -2888.1570, 7.2, 83.85)));
                                                                                        dFdy(vec2(1330.1674, 7.8));
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = tanh(vec4(-305.084, -35.25, -885.854, 46.95));
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        ivec2 _GLF_SWITCH_4_9v, _GLF_SWITCH_4_10v;
                                                                                        bvec4 _GLF_SWITCH_4_11v;
                                                                                        ivec2 _GLF_SWITCH_4_12v, _GLF_SWITCH_4_13v;
                                                                                        uvec4(181871u, 14321u, 153087u, 130629u);
                                                                                    }
                                                                                    continue;
                                                                                    {
                                                                                        break;
                                                                                    }
                                                                                }
                                                                                do {
                                                                                    vec3(-227.246, -45.57, -623.305);
                                                                                    for (int _GLF_SWITCH_4_14v; false; vec3(6.5, 18.74, 38.75)) {
                                                                                        vec2 _GLF_SWITCH_4_15v, _GLF_SWITCH_4_16v[30];
                                                                                    }
                                                                                    uvec3 _GLF_SWITCH_4_17v, _GLF_SWITCH_4_18v[68];
                                                                                    ;
                                                                                    for (mat3x2((-(mat3x4(435.513, 497.851, 70.54, -34.19, 10.60, -2641.7287, -5.4, 9.9, -4.1, 6.4, 84.74, -6139.1472) * mat3(2297.2683, 49.27, -2328.2585, 91.85, 452.958, 238.167, -889.431, 61.14, -5.5)))); (ivec4(-71760, 75429, 40658, -2240) != ivec4(-983, -27057, 1105, 78479)); (vec3(6710.8475, -6690.0329, 60.09) + vec3(5475.9462, -9.8, -5869.3177))) {
                                                                                        mat4x2(4.8, 4465.3160, 8.6, 1916.2874, -9725.5053, 0.9, 815.696, 80.82);
                                                                                        ;
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = (vec4(4.4, -7406.7104, 83.23, -19.96) * mat4(15.98, 4680.2437, -3791.8909, -9835.2044, -9504.3508, 29.60, -0.8, 907.744, -2931.9158, -554.546, 1424.1917, -3.2, -6.7, -3.7, -8.2, 42.32));
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        mat3x4 _GLF_SWITCH_4_19v, _GLF_SWITCH_4_20v[70];
                                                                                        mat2x4 _GLF_SWITCH_4_21v[41], _GLF_SWITCH_4_22v;
                                                                                        130321u;
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = vec4(137.764, 2.4, -55.64, -8130.8960);
                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        mat4(-63.07, -6.5, -0.5, 840.791, 732.695, 4227.6484, -325.957, 3.7, 4.5, -205.809, -3.1, -4.1, 331.752, -8.0, -845.772, -4.2);
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = (vec4(-323.526, -1970.4206, -22.81, 575.934) + vec4(87.09, -6959.1343, -902.496, -8.8));
                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        mat2(mat4x3(mat4(-410.783, 933.894, 25.01, -0.5, -914.255, 0.3, 2.4, 9547.5701, -9610.7271, 923.324, -59.58, -958.277, -4.9, -4.3, 580.853, 89.99)));
                                                                                    }
                                                                                } while (true);
                                                                                bvec3 _GLF_SWITCH_4_23v, _GLF_SWITCH_4_24v, _GLF_SWITCH_4_25v[49];
                                                                                continue;
                                                                                return;
                                                                            }
                                                                            ;
                                                                            uvec3 _GLF_SWITCH_4_26v;
                                                                        }
                                                                        mat2x3 _GLF_SWITCH_4_27v[94], _GLF_SWITCH_4_28v[37], _GLF_SWITCH_4_29v;
                                                                        {
                                                                            for (mat3x4 _GLF_SWITCH_4_30v[33]; false; outerProduct(vec3(-2604.4674, 685.637, 8.1), vec4(-9.3, -8.3, -4350.7101, -3.8))) {
                                                                                ;
                                                                                mat3x2(mat4(4.1, -6291.6044, 6.8, 79.67, 88.02, 682.644, -384.959, 8.8, 8197.6094, -1.5, 5680.0828, -42.11, -260.847, -2885.8679, 5.3, 76.33));
                                                                                mat3(mat4x2(-9781.8117, 4.0, 8081.8935, 416.595, -90.42, -9137.1525, 8.9, -5420.9085));
                                                                                for (ivec2(-45339, 6975); false; abs(vec4(3.4, -442.019, -33.82, -6.3))) {
                                                                                    vec4 _GLF_SWITCH_4_31v;
                                                                                    {
                                                                                        uvec4(34223u, 99486u, 138170u, 5760u);
                                                                                        ivec4 _GLF_SWITCH_4_32v, _GLF_SWITCH_4_33v[65], _GLF_SWITCH_4_34v;
                                                                                    }
                                                                                    {
                                                                                        ;
                                                                                        break;
                                                                                        mat4 _GLF_SWITCH_4_35v, _GLF_SWITCH_4_36v[55], _GLF_SWITCH_4_37v[99];
                                                                                        continue;
                                                                                        return;
                                                                                    }
                                                                                }
                                                                                ;
                                                                                if (true) {
                                                                                    bvec4 _GLF_SWITCH_4_38v, _GLF_SWITCH_4_39v, _GLF_SWITCH_4_40v;
                                                                                    {
                                                                                        break;
                                                                                        mat3(26.32, 4.4, 7944.2412, -59.04, -87.34, -2011.0360, 3.7, 37.31, 6203.0165);
                                                                                        findLSB(134566u);
                                                                                        break;
                                                                                        mat4 _GLF_SWITCH_4_41v, _GLF_SWITCH_4_42v;
                                                                                    }
                                                                                    mat4x3(-0.3, 8403.4034, -15.59, 3.6, 3.2, 0.6, -321.145, 268.039, 9967.8349, 4.3, -9.4, -0.0);
                                                                                }
                                                                                {
                                                                                    do {
                                                                                        mat2(mat3x4(-3.5, 79.85, 597.403, -4904.3391, 24.53, -3482.5037, 5.6, -36.77, 94.49, -0.1, -102.143, -2.6));
                                                                                        (vec3(3019.7850, -350.749, 423.275) * grey);
                                                                                        uvec2 _GLF_SWITCH_4_43v[42];
                                                                                        continue;
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = (+faceforward(vec4(-25.33, -4.8, 527.909, 5.6), vec4(2288.7485, -50.27, -573.769, 4872.0570), vec4(9.0, 617.137, -0.3, 6.3)));
                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        mat4x2 _GLF_SWITCH_4_44v[89];
                                                                                        80.06;
                                                                                        ;
                                                                                        bvec2(true, true);
                                                                                        bvec4(true, false, false, false);
                                                                                    } while (false);
                                                                                    uvec3(143750u, 17045u, 162983u);
                                                                                    ivec2(-55423, 7272);
                                                                                    for (uint _GLF_SWITCH_4_45v[23]; (mat3x2(7811.8984, -9843.6402, 35.49, -1138.4700, 75.60, 9.0) == mat3x2(92.18, 868.702, 14.87, 8.9, -61.52, 0.9)); vec3(refract((+grey), 6443.1246, 28.94))) {
                                                                                        ((mat2x4(-8491.3887, 2.2, -6079.0813, -8.1, 6.7, 4691.6169, 3194.3499, 3209.2770) - mat2x4(-1737.4323, 241.832, -40.65, 6131.7927, -809.333, 54.24, -6.3, 6.9)) * mat2(mat3x4(460.565, 75.69, 13.33, 1.3, -739.338, -6.9, 28.12, 91.87, 8.2, 2.0, 520.806, -3.7)));
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = vec4(561.935, -85.57, unpackUnorm2x16(31545u));
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    for (vec2 _GLF_SWITCH_4_46v, _GLF_SWITCH_4_47v; false; (true ? 167173u : 47106u)) {
                                                                                        uvec2 _GLF_SWITCH_4_48v, _GLF_SWITCH_4_49v, _GLF_SWITCH_4_50v;
                                                                                        continue;
                                                                                        mat2x4(mat3x4(8568.1015, -3.2, -38.13, 9.6, -6.7, -2447.3952, 98.79, -6.7, 1577.0155, -4621.3666, 15.79, 7852.5055));
                                                                                        float _GLF_SWITCH_4_51v[48], _GLF_SWITCH_4_52v, _GLF_SWITCH_4_53v;
                                                                                        mat3x4 _GLF_SWITCH_4_54v;
                                                                                        equal(ivec3(-25569, -37727, 52035), ivec3(64741, 58513, -76954));
                                                                                        (~_GLF_SWITCH_4_48v);
                                                                                        break;
                                                                                    }
                                                                                    ivec2(82513, 59353);
                                                                                    bvec2 _GLF_SWITCH_4_55v;
                                                                                    if (bool(29861u)) {
                                                                                        bvec2(false, true);
                                                                                        uintBitsToFloat(uvec4(uvec3(13425u, 99921u, 52717u), 97112u));
                                                                                        bvec4 _GLF_SWITCH_4_56v;
                                                                                        ;
                                                                                        return;
                                                                                    }
                                                                                }
                                                                                return;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(-7.6, 7077.6149, -34.83, -8.1);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                            ;
                                                                        }
                                                                        mat2 _GLF_SWITCH_4_57v;
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = (1072.8919 / vec4(5.3, -4851.9868, 20.47, 8.4));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                    }
                                                                case 0:
                                                                case 45:
                                                                case 94:
                                                                case 63:
                                                                case 7:
                                                                    if (_GLF_DEAD(false)) {
                                                                        return;
                                                                    }
                                                                    break;
                                                                case 42:
                                                                    mat2x3(mat2x4(-63.11, 3595.3456, -7168.6034, -4.7, -29.89, -36.78, -4784.5342, -1804.9908));
                                                                default:
                                                                    1;
                                                            }
                                                        }
                                                    case 50:
                                                        for (mat2x4 _GLF_SWITCH_1_68v, _GLF_SWITCH_1_69v; false; bvec4(false, false, false, true)) {
                                                            discard;
                                                            for (bvec3 _GLF_SWITCH_1_70v; (vec4(grey, grey, mod(-8.1, 8.5), grey) == vec4(-4.5, 8.7, 77.31, -4.8)); bvec2(false, false)) {
                                                                uvec4 _GLF_SWITCH_1_71v;
                                                                continue;
                                                                break;
                                                            }
                                                            dot(vec3(-185.991, -1.7, 1.2), vec3(0.2, 6.8, -698.006));
                                                            for (mat3x2(mat4x2(8.3, 192.676, -588.211, -9.3, -8.1, 298.108, 81.89, 0.3)); false; (i % i)) {
                                                                do {
                                                                    for (vec4(-8.8, -6.3, -2.5, -23.09); (false || (grey == 3630.4585)); uvec2(48468u, 25958u)) {
                                                                        min(vec4(9.5, -8990.5727, -5201.3775, -6515.2740), _GLF_color);
                                                                        mat4 _GLF_SWITCH_1_72v, _GLF_SWITCH_1_73v;
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                if ((ivec4(-85463, 69665, 29257, 40228) != ivec4(-49214, -4819, 32865, -56929))) {
                                                                    for (ivec2 _GLF_SWITCH_1_74v, _GLF_SWITCH_1_75v[96]; isnan(grey); refract(_GLF_color, _GLF_color, float(any(bvec2(false, false))))) {
                                                                    }
                                                                    ivec3 _GLF_SWITCH_1_76v[29];
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(0.9, 1.4, 77.15, 3.8);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), bool(bool(!(true)))))))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                } else {
                                                                    while (false) {
                                                                        if (false) {
                                                                            vec2 _GLF_SWITCH_1_77v, _GLF_SWITCH_1_78v, _GLF_SWITCH_1_79v;
                                                                        } else {
                                                                            max(ivec4(N), N);
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = atan(trunc(vec4(-515.429, 72.85, -3.7, 65.82)));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            mat4x3 _GLF_SWITCH_1_80v, _GLF_SWITCH_1_81v;
                                                                            ;
                                                                        }
                                                                        vec3(4.9, -931.562, -2293.9475);
                                                                        for (bvec4 _GLF_SWITCH_1_82v, _GLF_SWITCH_1_83v[62], _GLF_SWITCH_1_84v; true; (N ^ ivec3(-18284, 84581, 16758))) {
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(0.5, 2709.0595, 5293.8701, 3.6);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                                return;
                                                                            } else {
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(-2.4, -4343.3865, -47.95, -429.512);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                            float _GLF_SWITCH_1_85v[1], _GLF_SWITCH_1_86v;
                                                                            uvec4 _GLF_SWITCH_1_87v[27], _GLF_SWITCH_1_88v;
                                                                            if (_GLF_DEAD(false)) {
                                                                                continue;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(9813.3079, -31.65, 936.134, 3565.1257);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                            return;
                                                                            bvec2(false, false);
                                                                            vec2 _GLF_SWITCH_1_89v, _GLF_SWITCH_1_90v[7], _GLF_SWITCH_1_91v;
                                                                            ((-3.2) / mat2(-3.6, 87.43, 3.0, -0.5));
                                                                        }
                                                                        grey;
                                                                    }
                                                                    outerProduct(_GLF_color, radians(vec3(-5.7, -6104.4095, -4.6)));
                                                                    if (((-21383) < i)) {
                                                                        mat2x4 _GLF_SWITCH_1_92v;
                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                        } else {
                                                                            ;
                                                                        }
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = uintBitsToFloat(uvec4(155514u, 113027u, 101118u, 118031u));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        continue;
                                                                        mat3x4(-96.48, -1.4, 587.898, 21.37, 13.36, 465.026, 0.8, -71.23, 946.336, 8.9, 39.26, 7.5);
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = vec4(ceil(-7.1), vec3(5.5, -8.4, -7.1));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        dFdy(vec2(-4292.3470, -80.70));
                                                                    }
                                                                    continue;
                                                                    {
                                                                        continue;
                                                                        (injectionSwitch + 8310.6530);
                                                                        if (((i & N) == findMSB(175121u))) {
                                                                            ;
                                                                            ivec4(24190, -68560, -23823, -75326);
                                                                        } else {
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = fwidth((2.8 - vec4(-6410.4888, 39.62, -2.3, 2499.5709)));
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            vec2 _GLF_SWITCH_1_93v, _GLF_SWITCH_1_94v[27], _GLF_SWITCH_1_95v;
                                                                            (uvec2(24803u, 80617u) ^ 153086u);
                                                                        }
                                                                        while (true) {
                                                                            ;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(-8152.0296, -78.60, 190.300, 4137.8019);
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            float _GLF_SWITCH_1_96v, _GLF_SWITCH_1_97v, _GLF_SWITCH_1_98v;
                                                                            continue;
                                                                            uvec3 _GLF_SWITCH_1_99v[80], _GLF_SWITCH_1_100v;
                                                                            uvec4(147155u, _GLF_SWITCH_1_100v);
                                                                            ((injectionSwitch * _GLF_SWITCH_1_97v) * (-vec2(14.85, -9.5)));
                                                                            do {
                                                                                cos(_GLF_SWITCH_1_97v);
                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = clamp((+vec4(3.1, 780.162, -60.01, -5.9)), 8488.8035, -1.4);
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        return;
                                                                    }
                                                                    if ((injectionSwitch != tan(vec2(5148.0140, -182.724)))) {
                                                                        {
                                                                            continue;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(2.8, -9.0, -560.408, -0.3);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                        }
                                                                        ;
                                                                        (mat3(-81.93, -9.6, 5.7, 556.387, -852.857, -124.547, 40.18, -2862.5455, 6.6) + outerProduct((vec3(-74.13, 0.1, -251.213) + vec3(-1060.6477, 7294.9351, 353.622)), vec3(-4.6, -4.5, 132.733)));
                                                                        if (bool(7608u)) {
                                                                            ivec2 _GLF_SWITCH_1_101v[49];
                                                                        }
                                                                        for (mat2x3 _GLF_SWITCH_1_102v, _GLF_SWITCH_1_103v; true; mat4(3.9, -4518.0758, -5008.2688, 4.2, -251.963, 6988.8724, 562.726, 705.128, -6.6, -3808.2236, 9.9, -925.466, -3.4, -4.6, 8.6, -1801.8257)) {
                                                                            (grey * mat4x3(765.085, -8.6, -9.9, -388.429, 2.6, -2333.5038, -3891.8133, 99.93, 22.53, 83.72, 1.1, -319.776));
                                                                            discard;
                                                                            discard;
                                                                            mat3(5.6);
                                                                        }
                                                                        mat3x4 _GLF_SWITCH_1_104v, _GLF_SWITCH_1_105v, _GLF_SWITCH_1_106v;
                                                                        while (true) {
                                                                            mat4x2 _GLF_SWITCH_1_107v, _GLF_SWITCH_1_108v;
                                                                            ivec2 _GLF_SWITCH_1_109v[88], _GLF_SWITCH_1_110v, _GLF_SWITCH_1_111v;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = atan(vec4(1.8, 9814.8088, 9.3, -5447.7210), dFdyFine(vec4(29.59, -238.995, 0.0, -6049.7578)));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            uvec4 _GLF_SWITCH_1_112v;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(26.13, 27.37, 3.5, 822.883);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            mat2x4(950.535, 367.049, 2003.3330, 75.88, 224.737, 98.62, -7.3, 51.91);
                                                                            return;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = min(mix(vec4(-5651.1888, 7.6, -734.246, -650.982), vec4(-1.6, 2.3, 4.5, -85.95), bvec4(true, true, false, true)), unpackUnorm4x8(51709u));
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            (uvec2(158198u, 136468u) >> 197275u);
                                                                            lessThanEqual(uvec4(108297u, 32641u, 156721u, 126835u), (_GLF_SWITCH_1_112v & 125061u));
                                                                            for (int _injected_loop_counter = ((0 ^ 1) & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                discard;
                                                                            }
                                                                            break;
                                                                        }
                                                                        mat3 _GLF_SWITCH_1_113v;
                                                                    } else {
                                                                        if (bvec2(false, true)[0]) {
                                                                            grey;
                                                                            discard;
                                                                        } else {
                                                                            (17.97 + mat2x3(mat3(51.95, -732.375, -76.32, -0.1, 7.3, -694.711, 53.76, 0.5, -2.9)));
                                                                            int _GLF_SWITCH_1_114v[83], _GLF_SWITCH_1_115v;
                                                                            return;
                                                                        }
                                                                        mat4 _GLF_SWITCH_1_116v, _GLF_SWITCH_1_117v, _GLF_SWITCH_1_118v;
                                                                        continue;
                                                                        for (vec4 _GLF_SWITCH_1_119v, _GLF_SWITCH_1_120v[94], _GLF_SWITCH_1_121v[69]; false; bvec2(false, true)) {
                                                                            uvec4(uvec2(107357u, 169295u).x, 38421u, uvec2(8754u, 156602u));
                                                                            bvec2 _GLF_SWITCH_1_122v[5], _GLF_SWITCH_1_123v;
                                                                            vec2 _GLF_SWITCH_1_124v, _GLF_SWITCH_1_125v, _GLF_SWITCH_1_126v;
                                                                        }
                                                                    }
                                                                    if (false) {
                                                                        (ivec2(8666, 30191) - i);
                                                                        if ((!false)) {
                                                                        }
                                                                        bvec2(true, false);
                                                                        while (isnan(trunc(grey))) {
                                                                            switch (_GLF_SWITCH((0 ^ 0))) {
                                                                                case 0:
                                                                                case 23:
                                                                                case 51:
                                                                                case 32:
                                                                                case 40:
                                                                                case 25:
                                                                                case 38:
                                                                                case 41:
                                                                                case 29:
                                                                                case 5:
                                                                                    bvec2(false, false);
                                                                                    break;
                                                                                default:
                                                                                    1;
                                                                            }
                                                                        }
                                                                        mat2x3(-106.968, -8459.8570, 777.043, 6140.6582, -6013.2128, 6.7);
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = unpackSnorm4x8(51419u);
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        return;
                                                                    } else {
                                                                        min(vec2(6841.3742, 786.476), refract(609.829, fwidthFine(9.6), grey));
                                                                        while (((-_GLF_SWITCH_1_69v) == (mat2x4(-5383.0956, 204.358, -7587.3480, 1.9, 2.9, 93.28, -0.2, -4500.2286) * 6.9))) {
                                                                            uvec3(147788u, 151865u, 108178u).g;
                                                                            return;
                                                                        }
                                                                        {
                                                                            continue;
                                                                            cosh((mat2(256.169, -10.81, -330.234, -3.5), clamp(_GLF_color, 2.2, grey)));
                                                                            mat4x3(-965.562);
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                uvec4(180288u, 88201u, 56615u, 46357u);
                                                                            } else {
                                                                            }
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = inversesqrt(vec4(-817.298, -15.55, -81.00, -3.7));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            mat2x3(4.5, -236.475, -853.580, -2.6, -7819.2875, 979.330);
                                                                            mat4 _GLF_SWITCH_1_127v[81];
                                                                            for (int _injected_loop_counter = ((0 | 0) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 0)); _injected_loop_counter++) {
                                                                                ;
                                                                            }
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(-71.82, -761.433, 36.42, 3.1);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                        }
                                                                        {
                                                                            uvec4 _GLF_SWITCH_1_128v;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = (vec4(34.66, -414.443, 6.7, 209.251));
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            ;
                                                                            _GLF_SWITCH_1_68v;
                                                                            ivec3(-35043, -65709, 13578);
                                                                            ivec3 _GLF_SWITCH_1_129v, _GLF_SWITCH_1_130v, _GLF_SWITCH_1_131v;
                                                                            mat3x2(-1337.3407, -423.058, -3681.4872, 2391.9019, -6.6, -40.81);
                                                                        }
                                                                        continue;
                                                                        equal(bvec2(true, false), bvec2(false, true));
                                                                        {
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(-0.2, 968.035, -1.7, 17.96);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            ;
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(_GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))), 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0))), 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0)))))) {
                                                                                mat4(6.0, 233.279, 6770.6427, 526.016, -22.33, -45.91, 1957.8173, 66.57, -770.875, 89.95, -2.6, -366.958, 4.9, -8.1, -6.4, 968.333);
                                                                            } else {
                                                                            }
                                                                            transpose(mat3x4(-941.217, 86.90, -2.3, -6.9, -47.95, 5.2, 64.09, 20.59, 307.231, -3065.1226, 1751.2442, 3.7));
                                                                            mat3(-7.8, 5.6, 4826.7118, 324.474, -3.2, -0.5, 1783.4043, -4197.0315, 8933.0835);
                                                                            ;
                                                                            bvec4 _GLF_SWITCH_1_132v[44];
                                                                            mat3 _GLF_SWITCH_1_133v[23];
                                                                        }
                                                                    }
                                                                }
                                                                for (grey; (ivec3(-51418, -76018, -62982) != ivec3(49090, 17702, -40290)); mix(54036u, 161627u, false)) {
                                                                    {
                                                                        mat3 _GLF_SWITCH_1_134v, _GLF_SWITCH_1_135v;
                                                                        while ((ivec3(4708, 55246, 65741) == ivec3(15834, 5072, 65119))) {
                                                                            bvec4(bvec3(false, true, false), mix(true, ((-7999.1753) < grey), false));
                                                                            continue;
                                                                            break;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = max(vec4(87.95, 6658.5261, 1590.0286, 2.7), 98.18);
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            smoothstep(vec3(1102.7967, 0.3, 0.7), vec3(-8.4, 947.650, 81.55), vec3(4585.9305, -6434.3533, -277.702));
                                                                            bvec2 _GLF_SWITCH_1_136v, _GLF_SWITCH_1_137v, _GLF_SWITCH_1_138v;
                                                                            mat4(9.9, -9.4, 1.9, 24.97, 4158.7820, 3.4, -7.5, -7869.0073, -380.444, 0.0, 81.72, -5.2, 9.8, 803.326, 9134.8038, 10.20);
                                                                        }
                                                                        if (false) {
                                                                            ivec4(74585, 77171, 90687, 7452);
                                                                            uint _GLF_SWITCH_1_139v;
                                                                            clamp(uvec4(156768u, 71884u, 168787u, 196370u), _GLF_SWITCH_1_139v, 152771u);
                                                                            mat2x3(-1.2, -96.43, 4095.6729, -5941.0267, -9482.5387, 1604.4626);
                                                                        } else {
                                                                            ivec3 _GLF_SWITCH_1_140v, _GLF_SWITCH_1_141v;
                                                                            mat4x3(126.490, 41.30, -5.1, 3780.8536, 8.9, -0.2, 97.35, 5.0, -467.777, -190.356, -25.66, -9736.7403);
                                                                            mat2(-145.088, -2031.3656, -457.106, 1.6);
                                                                            float _GLF_SWITCH_1_142v[23];
                                                                            mat3x2 _GLF_SWITCH_1_143v, _GLF_SWITCH_1_144v;
                                                                            mat2x3(-3.9, -1934.5692, 551.238, 4.4, 68.84, 8.6);
                                                                            ;
                                                                            ivec4 _GLF_SWITCH_1_145v;
                                                                        }
                                                                        bvec4(false, true, true, true);
                                                                    }
                                                                    for (mat2x4(fract(grey), grey, grey, grey, sign(grey), grey, -5.8, grey); false; ((_GLF_SWITCH_1_68v, mat4(-7431.5031, -733.376, -8.1, 2.1, 7.4, -367.537, -5.5, 2277.6458, 987.562, 1.2, -2207.0133, 3445.6603, -3.8, -86.83, -42.45, 7465.3640)) + (mat4(129.357, 712.553, -1.4, -97.82, 35.16, -58.69, 3.3, 8.2, 3906.2219, 4.8, 46.12, -7.8, -3460.9360, -93.65, -5.2, 360.050) - mat4(-6428.9318, -8770.2589, -218.469, -3.2, 67.55, -11.84, -247.477, -272.824, 9.4, -58.79, 93.20, -9.7, -8.4, 4749.6159, 91.73, -7.4)))) {
                                                                        mat4x2(-467.776, -9.9, -5811.3200, -350.056, 3119.0269, 26.56, 649.311, -4.9);
                                                                        mat2 _GLF_SWITCH_1_146v, _GLF_SWITCH_1_147v;
                                                                        mat3x4 _GLF_SWITCH_1_148v[89];
                                                                        ivec4 _GLF_SWITCH_1_149v, _GLF_SWITCH_1_150v, _GLF_SWITCH_1_151v;
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = acosh(vec4(vec2(64.96, 5.8), vec2(-3038.1900, -3619.2569)));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                    }
                                                                    while (true) {
                                                                        discard;
                                                                        if (_GLF_DEAD(false)) {
                                                                            return;
                                                                        }
                                                                        while (((N & (-61579)) == 53090)) {
                                                                            mat2x4 _GLF_SWITCH_1_152v;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(-33.11, 876.763, 516.957, -76.83);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                        }
                                                                        if (true) {
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = fwidthFine(dFdyCoarse(vec4(243.096, -2.6, 6742.7518, 2.3)));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            ;
                                                                            uvec2(129253u, 171386u);
                                                                            bvec4 _GLF_SWITCH_1_153v;
                                                                            uvec3(65718u, 161971u, 144050u);
                                                                            bvec3(true, true, false).ppt;
                                                                            continue;
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                discard;
                                                                            } else {
                                                                            }
                                                                        } else {
                                                                            return;
                                                                            int _GLF_SWITCH_1_154v, _GLF_SWITCH_1_155v;
                                                                            reflect(_GLF_color, vec4(-794.364, -88.55, -157.506, 41.02));
                                                                            exp(vec3(85.24, 7389.7823, -3.9));
                                                                            (55278u + 187021u);
                                                                            return;
                                                                        }
                                                                        while ((ivec2(-52022, -60432) == ivec2(99781, 41168))) {
                                                                            ;
                                                                            float _GLF_SWITCH_1_156v[24], _GLF_SWITCH_1_157v[27], _GLF_SWITCH_1_158v;
                                                                        }
                                                                        continue;
                                                                        bvec4 _GLF_SWITCH_1_159v, _GLF_SWITCH_1_160v[24];
                                                                        ;
                                                                        mat2(8787.9353, -246.835, -4.6, 201.458);
                                                                        {
                                                                            bool _GLF_SWITCH_1_161v[35];
                                                                            if (_GLF_DEAD(false)) {
                                                                                break;
                                                                            }
                                                                            ((ivec2(-32057, 36103) * ivec2(33343, -33612)) - ivec2(-83730, 84193));
                                                                            sign(97943);
                                                                            ivec4 _GLF_SWITCH_1_162v[3], _GLF_SWITCH_1_163v;
                                                                            discard;
                                                                            continue;
                                                                            ;
                                                                            return;
                                                                            mat3 _GLF_SWITCH_1_164v;
                                                                        }
                                                                    }
                                                                    N;
                                                                    {
                                                                        if ((mat4x2(43.00, -9278.0866, -1142.2222, -1306.3542, 17.28, -195.821, 7.4, -9.5) == mat4x2(-0.0, 59.44, 8.9, -96.09, 206.337, 32.38, 0.7, 5.3))) {
                                                                            bvec2 _GLF_SWITCH_1_165v[72];
                                                                            continue;
                                                                            return;
                                                                            uvec2 _GLF_SWITCH_1_166v, _GLF_SWITCH_1_167v, _GLF_SWITCH_1_168v;
                                                                            uint _GLF_SWITCH_1_169v;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(-7817.2991, -4.4, -977.517, -79.93);
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                        } else {
                                                                            break;
                                                                            continue;
                                                                            ivec4 _GLF_SWITCH_1_170v;
                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                switch (_GLF_SWITCH((0 >> _GLF_IDENTITY(int(2), int(2))))) {
                                                                                    case 30:
                                                                                        if ((acosh(grey) >= 92.00)) {
                                                                                            {
                                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                _GLF_color = vec4(-7374.7670, -711.865, 360.514, -5207.8832);
                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                }
                                                                                            }
                                                                                            mat2x3(grey, 25.55, degrees(28.31), grey, grey, grey);
                                                                                            133249u;
                                                                                            (71182u * uvec4(127747u, 54990u, 64118u, 182263u));
                                                                                            (+mat4x3(2825.6928, -9.1, 25.76, -4242.3111, -44.19, -8.0, -6.0, -53.95, 62.59, -4.5, 6.9, -7.4));
                                                                                            ;
                                                                                            vec2(-2.6, -79.90);
                                                                                            while (false) {
                                                                                                {
                                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                    _GLF_color = vec4(3.3, -6937.4235, 6.8, 3.5);
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                    }
                                                                                                }
                                                                                                ceil(_GLF_color);
                                                                                                ivec2 _GLF_SWITCH_6_0v[8], _GLF_SWITCH_6_1v[21], _GLF_SWITCH_6_2v;
                                                                                                ;
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                    case 0:
                                                                                    case 21:
                                                                                    case 94:
                                                                                    case 29:
                                                                                    case 57:
                                                                                    case 91:
                                                                                    case 39:
                                                                                    case 43:
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = vec4(-8.0, 356.541, 9.0, 792.200);
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        (mat4(-37.26, -9.2, -5.2, 62.62, 6.3, -8456.2775, 109.843, -1.8, -62.10, -7.6, -95.54, -558.383, 5904.1909, -277.491, -773.017, 5.6) * mat3x4(8964.0345, 35.02, 5.2, -33.57, 6.0, -28.29, 348.841, 4.7, -495.947, 80.25, -48.81, -55.34));
                                                                                        break;
                                                                                    case 1:
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = vec4(3.9, 3.2, -9.5, -27.50);
                                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                        if ((N > ivec2(28486, -16555)[0])) {
                                                                                            asin(vec4(-947.363, -669.386, 341.271, 2.2));
                                                                                            ((-65379) + (ivec2(-69456, -14392) / i)).tss;
                                                                                            bvec4(lessThanEqual(ivec2(78698, -89673), _GLF_SWITCH_1_170v.zy), bvec2(false, true));
                                                                                            (~_injected_loop_counter);
                                                                                            {
                                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                                _GLF_color = vec4(-263.180, -12.02, 7.7, -0.4);
                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                                }
                                                                                            }
                                                                                            int _GLF_SWITCH_6_3v[13], _GLF_SWITCH_6_4v;
                                                                                            return;
                                                                                        }
                                                                                        {
                                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                            _GLF_color = vec4(-493.123, -55.34, 2495.4215, 858.973);
                                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                    default:
                                                                                        1;
                                                                                }
                                                                            }
                                                                            (true ? mat4x3(405.333, 4.7, 721.989, -592.981, 6414.0880, 6609.9282, 58.09, 5.7, 6.5, -2.4, 813.025, 0.6) : mat4x3(mat2x3(-64.07, -46.39, 1969.2331, -48.34, -7.9, 3.0)));
                                                                        }
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = (vec2(803.392, -48.79) * mat4x2(-212.612, 7468.2902, 6.0, 420.949, 2.3, -2303.4856, 1742.8413, -6.1));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        for ((mat4x2(-1.3, 2.6, 3004.2837, -2.4, 90.96, 7406.8466, 6.7, 119.086), mat4x2(453.134, -101.019, -114.683, -707.538, -992.857, 6523.8549, -1014.1219, -4.9)); (greaterThan(uvec2(134353u, 47647u), uvec2(187538u, 171374u)) != bvec2(true, true)); mat2x4(-0.4, -123.762, -7.5, 6.8, 99.02, 2.6, 28.84, 406.740)) {
                                                                            greaterThan((uvec3(106544u, 76368u, 21996u) + uvec2(50485u, 164755u)[0]), uvec3(106225u, 52493u, 108308u).xxy);
                                                                            uvec3 _GLF_SWITCH_1_171v[82], _GLF_SWITCH_1_172v;
                                                                            discard;
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = tan(vec4(5.4, 1.1, 938.568, -113.225));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                (-mat3x4(8.8, -84.43, -792.054, 48.70, -2388.9803, 48.90, -280.744, 48.28, -6699.1986, 9.1, -83.03, -711.109));
                                                                            } else {
                                                                            }
                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            } else {
                                                                                discard;
                                                                            }
                                                                            mat4x3(_GLF_SWITCH_1_68v);
                                                                            uvec2 _GLF_SWITCH_1_173v, _GLF_SWITCH_1_174v;
                                                                            mat3x2(grey);
                                                                            return;
                                                                        }
                                                                        uvec4(14932u, 190863u, 3253u, 77852u);
                                                                        continue;
                                                                    }
                                                                    while ((vec3(3378.4052, -1536.8446, 239.048) == vec3(0.3, 6.8, -4.6))) {
                                                                        {
                                                                            ivec4 _GLF_SWITCH_1_175v;
                                                                            mat4 _GLF_SWITCH_1_176v[61];
                                                                            return;
                                                                            ivec2(6517, -72348);
                                                                            -97992;
                                                                            uvec4(34412u, 1517u, 156952u, 34933u);
                                                                            mat2x4(mat4x3(mat2(57.30, 13.54, 316.361, -5.6)));
                                                                            equal(bvec3(false, true, true), bvec3(true, true, false));
                                                                        }
                                                                        {
                                                                        }
                                                                        ;
                                                                        uvec2 _GLF_SWITCH_1_177v, _GLF_SWITCH_1_178v, _GLF_SWITCH_1_179v[71];
                                                                        ;
                                                                        while (false) {
                                                                            mat3x2(-934.197, 9.8, 384.273, -34.31, 1.1, 3063.6716);
                                                                            mat3 _GLF_SWITCH_1_180v, _GLF_SWITCH_1_181v, _GLF_SWITCH_1_182v[8];
                                                                            mat3x4 _GLF_SWITCH_1_183v;
                                                                            smoothstep(_GLF_color[3], float(101286u), _GLF_color);
                                                                            mat4x3 _GLF_SWITCH_1_184v, _GLF_SWITCH_1_185v[40], _GLF_SWITCH_1_186v;
                                                                            ((-3.3) * mat4(-27.29, -783.900, 828.039, -67.15, -4.9, -75.10, 0.3, -4.6, 3479.9975, 6.4, -1.6, 1891.4956, 6.2, 0.0, 0.8, 72.20));
                                                                            vec4 _GLF_SWITCH_1_187v[86];
                                                                            mat3 _GLF_SWITCH_1_188v, _GLF_SWITCH_1_189v[96], _GLF_SWITCH_1_190v;
                                                                            if (_GLF_DEAD(false)) {
                                                                                discard;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = reflect(vec4(-4641.4506, 413.935, -75.45, 890.871), vec4(-2318.3854, -2.1, 6.4, -86.86));
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                            }
                                                                            ivec2(71781, 24023);
                                                                        }
                                                                    }
                                                                    N;
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                        for (ivec4 _GLF_SWITCH_1_191v, _GLF_SWITCH_1_192v; false; mat2x3(71.76, 3.2, 5289.1432, 8866.0291, 4692.3745, 5362.7657)) {
                                                                            bvec3(true, false, true);
                                                                            mat4x3((mat2(-0.1, -9503.0864, -7.4, -8873.6320) * grey));
                                                                            while ((147579u != 104061u)) {
                                                                                uvec2 _GLF_SWITCH_1_193v, _GLF_SWITCH_1_194v, _GLF_SWITCH_1_195v;
                                                                                mat3x4(vec4(abs(grey), vec2(6.6, 2.9), grey), vec4(192.258, 250.829, -791.613, -5.0), sinh(vec4(5.0, -3644.8596, 1.6, -1.9)));
                                                                                uvec2 _GLF_SWITCH_1_196v, _GLF_SWITCH_1_197v[68], _GLF_SWITCH_1_198v;
                                                                                ivec4 _GLF_SWITCH_1_199v;
                                                                                ;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(464.972, -85.93, 4.2, 8.6);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                                int _GLF_SWITCH_1_200v[22], _GLF_SWITCH_1_201v;
                                                                                vec4 _GLF_SWITCH_1_202v;
                                                                            }
                                                                            {
                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                } else {
                                                                                    mat3(77.61, -9917.1176, 69.64, -9094.4275, -1.1, -3.6, 0.3, 8.5, -842.476);
                                                                                }
                                                                                uvec2 _GLF_SWITCH_1_203v[36], _GLF_SWITCH_1_204v[44];
                                                                                do {
                                                                                    ivec3(-90261, -27523, -47949);
                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                                uvec3 _GLF_SWITCH_1_205v[65], _GLF_SWITCH_1_206v;
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                    _GLF_color = vec4(-877.423, -9.1, -4.5, -4.4);
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                }
                                                                                mat4x2 _GLF_SWITCH_1_207v;
                                                                                mat2(mat3(-14.57, -33.43, -9.8, -601.848, -98.77, -5296.0164, 690.825, 7172.2430, 1380.4514));
                                                                                return;
                                                                                continue;
                                                                            }
                                                                            transpose((mat3x2(13.55, -84.12, -846.288, 47.50, -7573.6909, 1.1) + mat3x2(-8.7, -3.5, 51.73, 0.1, 494.005, 2.0)));
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                            } else {
                                                                                return;
                                                                            }
                                                                            while ((bvec2(false, false) == bvec2(false, false))) {
                                                                                continue;
                                                                            }
                                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                                                                                while (true) {
                                                                                    uvec3 _GLF_SWITCH_1_208v[2], _GLF_SWITCH_1_209v;
                                                                                    mat4x3(-4736.2437, 994.650, 268.911, 14.79, 9222.5201, 734.694, 1.8, -4088.7687, 4783.7026, 0.0, 491.110, 9.5);
                                                                                    break;
                                                                                    continue;
                                                                                    min(ivec3(71631, -5793, -23406), (20473 ^ ivec3(92242, -2448, -71923)));
                                                                                }
                                                                            }
                                                                            if (_GLF_DEAD(false)) {
                                                                                return;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                while (any(bvec2(false, true))) {
                                                                    continue;
                                                                    if ((ivec4(-17359, -53548, -69901, -62209) == ivec4(-38336, 3405, 32728, -64165))) {
                                                                        while ((172741u == 134066u)) {
                                                                            return;
                                                                            continue;
                                                                            ;
                                                                            dot(-753.638, grey);
                                                                            break;
                                                                            uvec4(148556u, 41635u, 152411u, 166515u);
                                                                            mat3(4.6, -1.2, 2725.3008, -3.3, 875.792, 461.817, 873.617, -4.4, 1.2);
                                                                            bvec4 _GLF_SWITCH_1_210v, _GLF_SWITCH_1_211v[5], _GLF_SWITCH_1_212v;
                                                                        }
                                                                        uvec3 _GLF_SWITCH_1_213v, _GLF_SWITCH_1_214v;
                                                                    }
                                                                    for (notEqual((ivec3(59670, 60435, 51889) % i), ivec3(27846, 7172, 19811)); bvec2(false, false).s; ivec2(3375, 50059)) {
                                                                        157072u;
                                                                        for (mat4x2 _GLF_SWITCH_1_215v[29]; false; uvec4(108111u, 127917u, 67857u, 103465u)) {
                                                                            (mat3(-9.5, 62.23, -7115.9797, -2.7, -8467.8306, -2520.3477, -1.0, 471.596, -7.9) * grey);
                                                                            bvec3 _GLF_SWITCH_1_216v[23];
                                                                            vec3(47.45, -1115.9858, -3.3);
                                                                            continue;
                                                                            mat3x2(-5.7, 652.907, 436.845, -50.06, 1567.3199, -506.375);
                                                                        }
                                                                        while (bvec4(false, false, false, true).y) {
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(8712.6881, -2.6, 8.9, 3945.2389);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            (141423u | uvec4(30232u, uvec2(84993u, 132619u), 139768u));
                                                                            continue;
                                                                            mat3(7.3, -2.7, 7.8, -1857.5469, -1.8, 10.44, -787.980, 9.0, -768.769);
                                                                        }
                                                                        vec4(-895.851, 7.4, -165.341, 68.73);
                                                                        mat3x4(75.07, 7760.7482, -89.45, -11.76, 439.681, 93.26, -0.3, 8.6, 701.126, -6.6, 5.7, 4.9);
                                                                        do {
                                                                            ivec4(-36101, 25276, -68637, 96841);
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            if (true) {
                                                                                mat3 _GLF_SWITCH_1_217v, _GLF_SWITCH_1_218v;
                                                                                ivec3 _GLF_SWITCH_1_219v;
                                                                                mat2x3 _GLF_SWITCH_1_220v[82], _GLF_SWITCH_1_221v;
                                                                            }
                                                                        } else {
                                                                        }
                                                                        (-mat2x3(600.581, 5.0, 7.3, 85.60, 1601.6040, -3.1));
                                                                        vec2 _GLF_SWITCH_1_222v, _GLF_SWITCH_1_223v[25];
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = dFdx(vec4(-3.7, -4.9, 4.0, 44.46));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                vec2(-7963.1468, 8.2);
                                                                ivec3 _GLF_SWITCH_1_224v, _GLF_SWITCH_1_225v;
                                                                mat4 _GLF_SWITCH_1_226v, _GLF_SWITCH_1_227v;
                                                                break;
                                                            }
                                                        }
                                                    case 0:
                                                    case 39:
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                    case 23:
                                                    case 69:
                                                    case 20:
                                                    case 12:
                                                    case 89:
                                                    case 68:
                                                    case 73:
                                                    case 25:
                                                        discard;
                                                        break;
                                                    case 27:
                                                        mat4x3(-3818.7899, 2783.0336, 51.23, 3.9, 286.865, -96.83, 8921.4565, 99.15, 62.44, 9.5, 4.6, -4899.2527);
                                                    default:
                                                        1;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mix(vec4(-0.5, -0.3, -9.2, -71.97), step(-36.87, vec4(57.64, -3.9, 8.3, 305.219)), vec4(-0.6, 902.525, -538.565, 7.0));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(194.278, 6.4, 2.6, 493.251);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
        }
    }
    _GLF_color = vec4(vec3(grey), 1.0);
}
