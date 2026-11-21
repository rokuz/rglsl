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

void merge(int from, int mid, int to) {
    int k = from, i = _GLF_IDENTITY(from, _GLF_IDENTITY(min(from, from), _GLF_IDENTITY((min(from, from)) >> 0, 0 | ((min(from, from)) >> 0)))), j = mid + 1;
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
        } else {
            do {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) - 0.0), _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) / 1.0))))) > injectionSwitch.y)))) {
                } else {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 0)); _injected_loop_counter++) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter))), min(_GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter))), _GLF_IDENTITY(_injected_loop_counter, ~(~(_injected_loop_counter))))) > _GLF_IDENTITY((0 & N), ((0 & N)) << 0)); _injected_loop_counter--) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, false || (false)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                for (int _injected_loop_counter = (1 & (1 | 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) && true))) {
                                                        } else {
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                temp[k++] = data[_GLF_IDENTITY(j++, 0 | (j++))];
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                } else {
                                }
                            }
                        } else {
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        }
    }
    do {
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            do {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        do {
                                            while (_GLF_IDENTITY(i < N && i <= mid, _GLF_IDENTITY(false || (i < N && i <= mid), _GLF_IDENTITY(bool(bool(_GLF_IDENTITY(false || (i < N && i <= mid), false || (false || _GLF_IDENTITY((i < N && i <= mid), ((i < N && i <= mid)) || false))))), (_GLF_IDENTITY(_GLF_IDENTITY(bool(bool(_GLF_IDENTITY(false || (i < N && i <= mid), false || (false || _GLF_IDENTITY((i < N && i <= mid), ((i < N && i <= mid)) || false))))), (bool(bool(_GLF_IDENTITY(false || (i < N && i <= mid), false || (false || _GLF_IDENTITY((i < N && i <= mid), ((i < _GLF_IDENTITY(N, ~(_GLF_IDENTITY(~(N), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(k) : (~(N)))))) && i <= mid)) || false)))))) && true), (_GLF_IDENTITY(bool(bool(_GLF_IDENTITY(false || (i < N && i <= mid), false || (false || _GLF_IDENTITY((i < N && i <= mid), ((i < N && i <= mid)) || false))))), (bool(bool(_GLF_IDENTITY(false || (i < N && i <= mid), false || (false || _GLF_IDENTITY(_GLF_IDENTITY((i < N && i <= mid), ((i < _GLF_IDENTITY(N, ~(_GLF_IDENTITY(~(N), (_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, (false ? _GLF_FUZZED(-1.0) : _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y)))))) ? _GLF_FUZZED(k) : (~(N)))))) && i <= mid)) || false), bool(bvec3(_GLF_IDENTITY((i < N && i <= mid), ((i < _GLF_IDENTITY(N, ~(_GLF_IDENTITY(~(N), (_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, (false ? _GLF_FUZZED(-1.0) : _GLF_IDENTITY(injectionSwitch.y, max(injectionSwitch.y, injectionSwitch.y)))))) ? _GLF_FUZZED(k) : (~(N)))))) && i <= mid)) || false), true, false)))))))) && true)) || false)) || false)))) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                    temp[k++] = data[i++];
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                } else {
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        } else {
                        }
                    }
                } else {
                }
            } else {
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), bool(_GLF_IDENTITY(bvec3((gl_FragCoord.y < 0.0), false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), bvec3(bvec4(bvec3(_GLF_IDENTITY((gl_FragCoord.y < 0.0), ((gl_FragCoord.y < 0.0)) || false), false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), true))))))));
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
        for (int _injected_loop_counter = (_GLF_IDENTITY(0, (_GLF_IDENTITY(0, 1 * (0))) ^ ((0 >> _GLF_IDENTITY(int(8), int(8))) & 78981)) ^ 1); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) | (int(6))))), _GLF_IDENTITY(bool(bvec3(_GLF_IDENTITY(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) | (int(6))))), !(!(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) | (int(6)))))))), false, false)), !(!(bool(bvec3(_GLF_IDENTITY(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) | (int(6))))), !(_GLF_IDENTITY(!(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), _GLF_IDENTITY((int(6)), clamp(_GLF_IDENTITY((int(6)), (false ? _GLF_FUZZED(mid) : (int(6)))), _GLF_IDENTITY((int(6)), ((int(6))) * 1), (int(6)))) | (int(_GLF_IDENTITY(6, (6) / 1))))))), _GLF_IDENTITY(bool(bvec3(!(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), _GLF_IDENTITY((int(6)), clamp(_GLF_IDENTITY((int(6)), (false ? _GLF_FUZZED(mid) : (int(6)))), _GLF_IDENTITY((int(6)), ((int(6))) * 1), (int(6)))) | (int(_GLF_IDENTITY(6, (6) / 1))))))), true, true)), !(_GLF_IDENTITY(!(bool(bvec3(!(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), _GLF_IDENTITY((int(6)), clamp(_GLF_IDENTITY((int(6)), (false ? _GLF_FUZZED(mid) : (int(6)))), _GLF_IDENTITY((int(6)), ((int(6))) * 1), (int(6)))) | (int(_GLF_IDENTITY(6, (6) / 1))))))), true, true))), bool(bvec2(!(bool(bvec3(!(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), _GLF_IDENTITY((int(6)), clamp(_GLF_IDENTITY((int(6)), (false ? _GLF_FUZZED(mid) : (int(6)))), _GLF_IDENTITY((int(6)), ((int(6))) * 1), (int(6)))) | (int(_GLF_IDENTITY(6, (6) / 1))))))), true, true))), true)))))))), false, false))))))); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), false || ((gl_FragCoord.y < 0.0)))))) {
            } else {
                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), int(ivec4(int(0), (1 ^ 0), 1, 1))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                for (int i = _GLF_IDENTITY(from, (from) << 0); i <= to; _GLF_IDENTITY(i++, 0 | (i++))) {
                                    data[i] = temp[i];
                                }
                            } else {
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
        }
    }
}

void mergeSort() {
    int low = 0;
    int high = N - 1;
    do {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            for (int m = 1; _GLF_IDENTITY(m <= high, !(!(_GLF_IDENTITY(m <= high, _GLF_IDENTITY((_GLF_IDENTITY(m <= high, bool(bool(m <= high)))), _GLF_IDENTITY((_GLF_IDENTITY((_GLF_IDENTITY(m <= high, bool(bool(m <= high)))), ((_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true && (_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), bool(bvec2(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true))))))) && _GLF_IDENTITY(true, bool(bvec4(true, _GLF_IDENTITY(false, false || (false)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))) && true, _GLF_IDENTITY(((_GLF_IDENTITY((_GLF_IDENTITY(m <= high, bool(bool(m <= high)))), ((_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true && (_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), bool(bvec2(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true))))))) && _GLF_IDENTITY(true, bool(bvec4(true, _GLF_IDENTITY(false, _GLF_IDENTITY(false, false || (false)) || (false)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))) && true), !(_GLF_IDENTITY(!(((_GLF_IDENTITY((_GLF_IDENTITY(m <= high, bool(bool(m <= high)))), ((_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true && (_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), bool(bvec2(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true))))))) && _GLF_IDENTITY(true, bool(bvec4(true, _GLF_IDENTITY(false, _GLF_IDENTITY(false, false || (false)) || (false)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))) && true)), (_GLF_IDENTITY(!(((_GLF_IDENTITY((_GLF_IDENTITY(m <= high, bool(bool(m <= high)))), ((_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true && (_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), bool(bvec2(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true))))))) && _GLF_IDENTITY(true, bool(bvec4(true, _GLF_IDENTITY(false, _GLF_IDENTITY(false, false || (false)) || (false)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))) && true)), !(!(!(((_GLF_IDENTITY((_GLF_IDENTITY(m <= high, bool(bool(m <= high)))), ((_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true && (_GLF_IDENTITY(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), bool(bvec2(_GLF_IDENTITY(m <= high, bool(bool(m <= high))), true))))))) && _GLF_IDENTITY(true, bool(bvec4(true, _GLF_IDENTITY(false, _GLF_IDENTITY(false, false || (false)) || (false)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))) && true)))))) || false))) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) || false)))); m = 2 * m) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        for (int i = low; _GLF_IDENTITY(i, int(int(_GLF_IDENTITY(i, _GLF_IDENTITY(int(ivec3(i, 1, 0)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(ivec4(-96093, 83161, 24910, -15950).s) : int(_GLF_IDENTITY(ivec3(i, 1, 0), ivec3(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x)) | (ivec3(i, 1, 0)))))))))) < high; i += 2 * m) {
                            int from = _GLF_IDENTITY(i, (_GLF_IDENTITY(i, min(i, i))) | (0 & 44654));
                            int mid = i + m - 1;
                            int to = min(_GLF_IDENTITY(i + 2 * m - 1, 0 + (_GLF_IDENTITY(i + 2 * m - 1, min(_GLF_IDENTITY(i + 2 * m, clamp(i + 2 * m, i + 2 * m, i + 2 * m)) - 1, i + _GLF_IDENTITY(2, (_GLF_IDENTITY(2, _GLF_IDENTITY(0 + (_GLF_IDENTITY(2, clamp(_GLF_IDENTITY(2, 1 * (2)), 2, _GLF_IDENTITY(2, (2) | 0)))), ~(~(0 + (_GLF_IDENTITY(2, clamp(_GLF_IDENTITY(2, 1 * (2)), 2, _GLF_IDENTITY(2, (2) | 0))))))))) << _GLF_IDENTITY(0, (false ? _GLF_FUZZED(low) : 0))) * m - 1)))), high);
                            do {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(true), true && (_GLF_IDENTITY(bool(true), bool(bool(bool(true))))))), bool(bvec4(bool(_GLF_IDENTITY(bool(true), true && (_GLF_IDENTITY(bool(true), bool(bool(bool(true))))))), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), false, true)))))) {
                                        for (int _injected_loop_counter = _GLF_IDENTITY((((N & 0) >> _GLF_IDENTITY(int(5), int(5))) | 0), 0 | (_GLF_IDENTITY((((N & 0) >> _GLF_IDENTITY(int(5), int(5))) | 0), ((((N & 0) >> _GLF_IDENTITY(int(5), int(5))) | 0)) ^ _GLF_IDENTITY(0, (0) ^ 0)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (_GLF_IDENTITY(1, (1) | int(_GLF_ZERO(0.0, injectionSwitch.x))) & _GLF_IDENTITY(_GLF_IDENTITY(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))), int(ivec2(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(_GLF_IDENTITY(4, clamp(_GLF_IDENTITY(4, (4) ^ 0), 4, _GLF_IDENTITY(4, 0 | (4))))))), 0))), min(_GLF_IDENTITY(_GLF_IDENTITY(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))), int(ivec2(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(_GLF_IDENTITY(4, clamp(_GLF_IDENTITY(4, (4) ^ 0), 4, _GLF_IDENTITY(4, 0 | (4))))))), 0))), 0 ^ (_GLF_IDENTITY(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))), int(ivec2(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(_GLF_IDENTITY(4, clamp(_GLF_IDENTITY(4, (4) ^ 0), 4, _GLF_IDENTITY(4, 0 | (4))))))), 0))))), _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))), int(ivec2(((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(_GLF_IDENTITY(4, clamp(_GLF_IDENTITY(4, (4) ^ 0), 4, _GLF_IDENTITY(4, 0 | (4))))))), 0))))))); _injected_loop_counter++) {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                do {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            } else {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, _GLF_IDENTITY((_GLF_IDENTITY(gl_FragCoord.y, mix(float(gl_FragCoord.y), float(_GLF_FUZZED((-30.58))), bool(false))) < 0.0), ((_GLF_IDENTITY(gl_FragCoord.y, mix(_GLF_IDENTITY(_GLF_IDENTITY(float(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))))).y), (true ? float(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))))).y) : _GLF_FUZZED(_GLF_IDENTITY(-315.123, mix(float(-315.123), float(_GLF_FUZZED(3413.6533)), bool(false)))))), (false ? _GLF_FUZZED(-6357.7845) : _GLF_IDENTITY(float(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))))).y), (true ? float(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_IDENTITY(_GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))), clamp(_GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))), _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))), _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), (false ? _GLF_FUZZED(vec4(-5.9, -53.27, -857.564, 2.9)) : _GLF_IDENTITY(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), clamp(_GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)), _GLF_FUZZED(vec4(-1.9, 1.4, 2.6, 969.347)))))))))).y) : _GLF_FUZZED(_GLF_IDENTITY(-315.123, mix(float(-315.123), float(_GLF_FUZZED(3413.6533)), bool(false)))))))), float(_GLF_FUZZED((-30.58))), bool(false))) < 0.0)) || false)))) {
                                                                        } else {
                                                                            do {
                                                                                merge(from, mid, to);
                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                        }
                                                                    } else {
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                        }
                                    } else {
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), (_GLF_IDENTITY((gl_FragCoord.x < 0.0), true && (_GLF_IDENTITY((gl_FragCoord.x < 0.0), false || ((gl_FragCoord.x < 0.0)))))) && true))));
                        }
                    }
                } else {
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, 0.0 + (injectionSwitch.y))), _GLF_IDENTITY(bool(bvec2((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, 0.0 + (injectionSwitch.y))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), !(!(bool(bvec2((injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, 0.0 + (injectionSwitch.y))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))))));
}

vec4 _GLF_outlined_0(float grey) {
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            return vec4(vec3(grey), 1.0);
        }
    }
}

void main() {
    int i = int(_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? injectionSwitch : _GLF_FUZZED(vec2(5.3, -65.87)))).x, _GLF_IDENTITY(injectionSwitch.x, float(mat4(injectionSwitch.x, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(_GLF_IDENTITY(1.0, max(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), _GLF_IDENTITY(1.0, min(1.0, 1.0)))), (true ? _GLF_IDENTITY(1.0, max(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), _GLF_IDENTITY(1.0, min(1.0, 1.0)))) : _GLF_FUZZED(dFdxFine(_GLF_IDENTITY(2143.1860, (2143.1860) * _GLF_ONE(1.0, injectionSwitch.y)))))), _GLF_IDENTITY(1.0, max(1.0, 1.0)))), 0.0, _GLF_IDENTITY(1.0, min(1.0, _GLF_IDENTITY(1.0, (1.0) - 0.0))), 1.0, 0.0, 0.0, 1.0, 0.0, sin(0.0)))))));
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        do {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((_GLF_IDENTITY(_GLF_IDENTITY(1, 0 | (1)) << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), max(_GLF_IDENTITY(int(3), max(int(3), int(3))), int(3)))), (_GLF_IDENTITY(1, 0 | (1)) << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), max(_GLF_IDENTITY(int(3), _GLF_IDENTITY(max(int(3), int(3)), min(max(int(3), int(3)), max(int(3), int(3))))), int(3))))) << 0)) >> _GLF_IDENTITY(int(3), int(3)))); _GLF_IDENTITY(_injected_loop_counter++, 0 ^ (_GLF_IDENTITY(_injected_loop_counter++, (_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, min(_GLF_IDENTITY(0.0, min(0.0, _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(91.30)), bool(false))))), 0.0)))) ? _GLF_FUZZED(_injected_loop_counter) : (_injected_loop_counter++)))))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, 1.0 * (gl_FragCoord.y)) < 0.0)))) {
                        } else {
                            for (int _injected_loop_counter = (0 | _GLF_IDENTITY(0, (0) / 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    do {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 0.0, _GLF_IDENTITY(length(0.0), max(length(0.0), length(0.0))), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, bool(bvec4(true, true, false, false))))))))))) {
                                                    switch (_GLF_IDENTITY(i, ~(~(i)))) {
                                                        case 0:
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                data[i] = _GLF_IDENTITY(4, (4) + 0);
                                                            }
                                                            break;
                                                        case 1:
                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, min(_GLF_IDENTITY(_injected_loop_counter, max(_injected_loop_counter, _injected_loop_counter)), _injected_loop_counter)) > (0 & (-54288))); _injected_loop_counter--) {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    } else {
                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & 1)); _injected_loop_counter++) {
                                                                            data[i] = 3;
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            break;
                                                        case 2:
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                            for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter < 1, (_injected_loop_counter < 1) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))); _injected_loop_counter++) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, (_injected_loop_counter) | (_injected_loop_counter)) > _GLF_IDENTITY(0, clamp(0, _GLF_IDENTITY(0, (0) + 0), _GLF_IDENTITY(0, (false ? _GLF_FUZZED(-92859) : 0))))); _injected_loop_counter--) {
                                                                                        _GLF_IDENTITY(data[i] = 2, (false ? _GLF_IDENTITY(_GLF_FUZZED(i), (_GLF_FUZZED(i)) | 0) : _GLF_IDENTITY(data[i] = 2, (data[i] = 2) * 1)));
                                                                                    }
                                                                                } else {
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                            } else {
                                                            }
                                                            break;
                                                        case 3:
                                                            do {
                                                                data[i] = _GLF_IDENTITY(1, (_GLF_IDENTITY(1, max(1, 1))) ^ 0);
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, min(injectionSwitch.y, injectionSwitch.y))))));
                                                            break;
                                                        case 4:
                                                            data[i] = 0;
                                                            break;
                                                        case 5:
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            } else {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                                                            data[i] = -1;
                                                                        } else {
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            break;
                                                        case 6:
                                                            for (int _injected_loop_counter = _GLF_IDENTITY((1 ^ 1), ((1 ^ 1)) << 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, _GLF_IDENTITY(bool(bool(true)), !(!(bool(bool(true))))))) && true))) {
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                data[i] = -2;
                                                                            } else {
                                                                            }
                                                                        } else {
                                                                        }
                                                                    } else {
                                                                    }
                                                                }
                                                            }
                                                            break;
                                                        case 7:
                                                            data[i] = -_GLF_IDENTITY(3, (3) | 0);
                                                            break;
                                                        case 8:
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                data[i] = -4;
                                                            } else {
                                                            }
                                                            break;
                                                        case 9:
                                                            do {
                                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (1) | (_GLF_IDENTITY(1, clamp(1, 1, 1))))); _injected_loop_counter++) {
                                                                    do {
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        } else {
                                                                            data[i] = -_GLF_IDENTITY(5, (5) ^ 0);
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), bool(_GLF_IDENTITY(bvec2((gl_FragCoord.y < 0.0), true), bvec2(bvec4(bvec2((gl_FragCoord.y < 0.0), true), false, true))))))));
                                                            break;
                                                    }
                                                } else {
                                                }
                                            }
                                        }
                                        do {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, true && (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0)))) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))), bool(_GLF_IDENTITY(bool(_GLF_TRUE(true, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, true && (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0)))) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))))), !(!(bool(_GLF_TRUE(true, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, true && (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, (_GLF_IDENTITY(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0, !(!(_GLF_IDENTITY(gl_FragCoord, vec4(mat3x2(gl_FragCoord, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))).x >= 0.0)))) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))))))))))) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                } else {
                                                                    do {
                                                                        for (int _injected_loop_counter = ((0 >> _GLF_IDENTITY(int(0), int(0))) ^ (0 | 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                    for (int _injected_loop_counter = _GLF_IDENTITY(1, max(_GLF_IDENTITY(1, (false ? _GLF_FUZZED(N) : 1)), 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                            } else {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                } else {
                                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                        for (int _injected_loop_counter = (1 ^ _GLF_IDENTITY(1, 0 | (1))); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                                                            i++;
                                                                                                        }
                                                                                                    } else {
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        } else {
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                }
                                                                            }
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                }
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    } while (i < 10);
                                } else {
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, mix(float(injectionSwitch.x), float(_GLF_FUZZED(9.7)), bool(false))) > _GLF_IDENTITY(injectionSwitch, (injectionSwitch) + abs(vec2(0.0, 0.0))).y)))) {
    } else {
        do {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                do {
                    for (int j = _GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, 0 ^ (0)))); j < 10; j++) {
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    do {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, mix(vec4(_GLF_FUZZED(-8653.5318), _GLF_FUZZED(-85.83), (gl_FragCoord)[2], (gl_FragCoord)[3]), vec4((gl_FragCoord)[0], _GLF_IDENTITY((gl_FragCoord)[1], (true ? (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, _GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])), gl_FragCoord)))[1] : _GLF_FUZZED(length(vec4(_GLF_IDENTITY(5.4, max(5.4, 5.4)), -9495.9393, 244.835, 541.285))))), _GLF_FUZZED((-1.9)), _GLF_FUZZED(vec2(59.96, 119.470).x)), bvec4(true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))).y < 0.0)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), _GLF_IDENTITY(bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false, _GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))), false || (bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false, _GLF_FALSE(false, (gl_FragCoord.x < log(1.0)))))))))) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true && _GLF_IDENTITY((_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), (_GLF_IDENTITY((_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), bool(_GLF_IDENTITY(bvec3((_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), true, true), bvec3(bvec4(bvec3((_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), true, true), true)))))) && true)))) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                do {
                                                                    do {
                                                                        _GLF_IDENTITY(temp[j] = data[j], 0 ^ (_GLF_IDENTITY(temp[j] = data[j], ~(~(temp[j] = data[j])))));
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                } else {
                                                }
                                            } else {
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                } else {
                                }
                            } else {
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, length(0.0))))), false || (_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, length(0.0))))), false || (_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, length(0.0))))))))))) {
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), bool(bvec3(_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), false || ((injectionSwitch.x < injectionSwitch.y)))), false, false))))) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, _GLF_IDENTITY(true, (true) || _GLF_IDENTITY(false, (false) || false)) && (_GLF_IDENTITY(false, !(!(false))))))) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                            mergeSort();
                        }
                    } else {
                    }
                }
            } else {
            }
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
    }
    float grey;
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(1.0, 1.0, log(1.0)), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, max(1.0, 1.0))) - 0.0))), _GLF_IDENTITY(log(1.0), clamp(_GLF_IDENTITY(_GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))), clamp(_GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))), _GLF_IDENTITY(_GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))), _GLF_IDENTITY(clamp(_GLF_IDENTITY(log(1.0), _GLF_IDENTITY(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), float(_GLF_IDENTITY(mat2x3(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), abs(1.0)), transpose(transpose(mat2x3(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), abs(1.0)))))))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0)))), min(clamp(_GLF_IDENTITY(log(1.0), _GLF_IDENTITY(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), float(_GLF_IDENTITY(mat2x3(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), abs(1.0)), transpose(transpose(mat2x3(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), abs(1.0)))))))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0)))), clamp(_GLF_IDENTITY(log(1.0), _GLF_IDENTITY(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), float(_GLF_IDENTITY(mat2x3(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), abs(1.0)), transpose(transpose(mat2x3(clamp(log(1.0), log(1.0), log(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)))))), round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), abs(1.0)))))))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))))))), _GLF_IDENTITY(log(1.0), clamp(log(1.0), log(1.0), log(1.0))))), log(1.0), log(1.0)))), vec3(0.0, 0.0, 1.0))))))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) | (_GLF_IDENTITY(1, (_GLF_IDENTITY(1, int(ivec4(1, 1, 0, 1)))) | (1)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), min(int(6), _GLF_IDENTITY(int(6), (int(6)) / 1)))))); _injected_loop_counter--) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) / 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, _GLF_IDENTITY(int(int(0)), (int(int(0))) / 1))); _injected_loop_counter--) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (int(gl_FragCoord[1]) < 30) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) || false))) {
                                                } else {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                do {
                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    } else {
                                                                        do {
                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                            } else {
                                                                                grey = 0.5 + float(data[0]) / 10.0;
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                    for (int _injected_loop_counter = _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) - 0.0))))); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter != 1, !(!(_injected_loop_counter != 1)))); _injected_loop_counter++) {
                                                        do {
                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(4), int(4)))); _GLF_IDENTITY(_injected_loop_counter--, (_GLF_IDENTITY(_injected_loop_counter--, (false ? _GLF_FUZZED(_injected_loop_counter) : (_injected_loop_counter--)))) + 0)) {
                                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                    if (int(gl_FragCoord[1]) < 60) {
                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        } else {
                                                                            do {
                                                                                grey = 0.5 + float(data[1]) / _GLF_IDENTITY(10.0, mix(float(10.0), float(_GLF_FUZZED(3806.3681)), bool(false)));
                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                        }
                                                                    } else {
                                                                        if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 90, !(!(int(_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, _GLF_IDENTITY(gl_FragCoord, vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_IDENTITY(gl_FragCoord, min(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))), _GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) - vec4(0.0, 0.0, 0.0, 0.0))))))))[1]) < 90)))) {
                                                                            grey = 0.5 + float(data[2]) / 10.0;
                                                                        } else {
                                                                            if (int(gl_FragCoord[_GLF_IDENTITY(1, clamp(1, 1, _GLF_IDENTITY(1, clamp(_GLF_IDENTITY(1, int(ivec4(1, 1, _GLF_IDENTITY(_GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, (0) * 1))), ~(_GLF_IDENTITY(~(_GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, (0) * 1)))), (false ? _GLF_FUZZED(-20109) : (~(_GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, (0) * 1))))))))), 1))), _GLF_IDENTITY(1, (true ? _GLF_IDENTITY(1, ~(~(_GLF_IDENTITY(1, (1) / 1)))) : _GLF_FUZZED(N))), 1))))]) < 120) {
                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, min(_GLF_IDENTITY(gl_FragCoord.x, clamp(gl_FragCoord.x, gl_FragCoord.x, _GLF_IDENTITY(gl_FragCoord.x, float(mat2x3(gl_FragCoord.x, 1.0, 1.0, 1.0, 0.0, 0.0))))), gl_FragCoord.x)) < 0.0)))) {
                                                                                } else {
                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            grey = _GLF_IDENTITY(0.5, mix(float(_GLF_FUZZED(-_GLF_IDENTITY(7.7, determinant(mat4(_GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(406.664)), bool(false))), 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0)) * (_GLF_IDENTITY(7.7, (false ? _GLF_FUZZED(grey) : _GLF_IDENTITY(7.7, (7.7) + 0.0))))))), float(_GLF_IDENTITY(0.5, float(_GLF_IDENTITY(float(0.5), float(mat4x3(float(0.5), 0.0, _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(vec3(-62.47, -4.2, -555.552).t)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), cos(0.0), 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0)))))), bool(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, _GLF_IDENTITY(bool(bool(injectionSwitch.x < injectionSwitch.y)), !(!(bool(bool(injectionSwitch.x < _GLF_IDENTITY(_GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)).y, (_GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY((injectionSwitch) * mat2(1.0), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(round(dFdx(vec2(6.9, 768.277)))) : ((injectionSwitch) * mat2(1.0))))).y) / 1.0)))))))))))) + float(data[3]) / 10.0;
                                                                                        } else {
                                                                                        }
                                                                                    } else {
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                if (int(_GLF_IDENTITY(gl_FragCoord[1], clamp(gl_FragCoord[_GLF_IDENTITY(1, (1) | (1))], _GLF_IDENTITY(gl_FragCoord[1], min(gl_FragCoord[1], gl_FragCoord[1])), gl_FragCoord[1]))) < 150) {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                        } else {
                                                                                            return;
                                                                                        }
                                                                                    }
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, (_GLF_IDENTITY(_injected_loop_counter, 0 | (_injected_loop_counter))) / 1) != 1); _injected_loop_counter++) {
                                                                                            do {
                                                                                                for (int _injected_loop_counter = _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))), (((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))) - int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                    discard;
                                                                                                }
                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                        }
                                                                                    } else {
                                                                                    }
                                                                                } else {
                                                                                    if (_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), max(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (_GLF_IDENTITY(ivec3(1, 1, 0), ivec3(0, 0, 0) ^ (_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) - ivec3(0, 0, 0))))) / ivec3(1, 1, 1))))])) ^ 0), _GLF_IDENTITY(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))), max(_GLF_IDENTITY(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))), min(_GLF_IDENTITY(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))), ~(~(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, _GLF_IDENTITY(_GLF_IDENTITY(1, (1) >> 0), (true ? _GLF_IDENTITY(1, (1) >> 0) : _GLF_FUZZED(i))), 1))))])))))), _GLF_IDENTITY(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))), (true ? _GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))) : _GLF_FUZZED(_injected_loop_counter))))), _GLF_IDENTITY(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))), int(ivec4(_GLF_IDENTITY(int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]), 0 ^ (int(gl_FragCoord[_GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec3(1, 1, 0), (ivec3(1, 1, 0)) / ivec3(1, 1, 1))))]))), (1 ^ 0), int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x))))))))) < 180) {
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                            } else {
                                                                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                                } else {
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                    } else {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            do {
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                    } else {
                                                                                                                        grey = 0.5 + float(_GLF_IDENTITY(data[5], (_GLF_IDENTITY(data[5], (_GLF_IDENTITY(data[5], (data[5]) ^ 0)) << (N & 0))) - 0)) / _GLF_IDENTITY(10.0, (_GLF_IDENTITY(10.0, mix(float(_GLF_FUZZED(((-7.1) - (-8812.8046)))), float(10.0), bool(true)))) * 1.0);
                                                                                                                    }
                                                                                                                } else {
                                                                                                                }
                                                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        } else {
                                                                                        }
                                                                                    } else {
                                                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                        } else {
                                                                                            if (int(gl_FragCoord[1]) < 210) {
                                                                                                do {
                                                                                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch, mat2(_GLF_ONE(1.0, injectionSwitch.y)) * (injectionSwitch)).x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter++) {
                                                                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), ((_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, !(!(injectionSwitch.x < injectionSwitch.y))))) && _GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(0.0, (0.0) * 1.0))))))) {
                                                                                                                    do {
                                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                        } else {
                                                                                                                            do {
                                                                                                                                do {
                                                                                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, (true ? _GLF_IDENTITY(_injected_loop_counter, clamp(_injected_loop_counter, _GLF_IDENTITY(_injected_loop_counter, int(int(_injected_loop_counter))), _injected_loop_counter)) : _GLF_FUZZED(6530))) < 1); _injected_loop_counter++) {
                                                                                                                                        grey = _GLF_IDENTITY(0.5 + float(data[6]) / 10.0, min(0.5 + float(_GLF_IDENTITY(data[6], _GLF_IDENTITY((_GLF_IDENTITY(data[6], min(data[6], data[6]))) - 0, 0 | ((_GLF_IDENTITY(data[6], min(data[6], data[6]))) - 0)))) / 10.0, _GLF_IDENTITY(0.5 + float(data[6]) / 10.0, _GLF_IDENTITY(mix(float(_GLF_IDENTITY(0.5 + float(data[6]) / 10.0, clamp(0.5 + float(data[6]) / 10.0, 0.5 + float(data[6]) / 10.0, 0.5 + float(data[6]) / 10.0))), float(_GLF_FUZZED(-7801.9208)), bool(false)), mix(float(_GLF_FUZZED(39.90)), float(mix(float(_GLF_IDENTITY(0.5 + float(data[6]) / 10.0, clamp(0.5 + float(data[6]) / 10.0, 0.5 + float(data[6]) / 10.0, 0.5 + float(data[6]) / 10.0))), float(_GLF_FUZZED(-7801.9208)), bool(false))), bool(true))))));
                                                                                                                                    }
                                                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                        }
                                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                } else {
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                                            } else {
                                                                                                if (int(gl_FragCoord[1]) < 240) {
                                                                                                    do {
                                                                                                        grey = 0.5 + float(data[7]) / 10.0;
                                                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                                                } else {
                                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                                    } else {
                                                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, (false) || false)) && _GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x, mix(float(gl_FragCoord.x), float(_GLF_FUZZED(2807.1130)), bool(false))) >= 0.0))))) {
                                                                                                            for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.y, min(gl_FragCoord.y, _GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) + 0.0))) >= 0.0)))) {
                                                                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                        } else {
                                                                                                                            do {
                                                                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                                } else {
                                                                                                                                    return;
                                                                                                                                }
                                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                        }
                                                                                                                    } else {
                                                                                                                    }
                                                                                                                } else {
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((0 << _GLF_IDENTITY(int(8), int(8))), ((_GLF_IDENTITY(0 << _GLF_IDENTITY(int(8), int(_GLF_IDENTITY(8, int(ivec4(8, 0, 0, (0 & (-36272))))))), (0 << _GLF_IDENTITY(int(8), int(_GLF_IDENTITY(8, int(ivec4(8, 0, 0, (0 & (-36272)))))))) >> 0))) ^ 0)); _injected_loop_counter--) {
                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                                                                                do {
                                                                                                                    if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 270, true && (int(_GLF_IDENTITY(gl_FragCoord[1], 0.0 + (gl_FragCoord[1]))) < 270))) {
                                                                                                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _GLF_IDENTITY(_injected_loop_counter++, (_injected_loop_counter++) << 0)) {
                                                                                                                            grey = 0.5 + _GLF_IDENTITY(float(data[8]) / 10.0, float(vec4(float(data[8]) / 10.0, sqrt(0.0), 0.0, 1.0)));
                                                                                                                        }
                                                                                                                    } else {
                                                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                            do {
                                                                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                                                                    } else {
                                                                                                                                        discard;
                                                                                                                                    }
                                                                                                                                } else {
                                                                                                                                }
                                                                                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                                                                                        } else {
                                                                                                                        }
                                                                                                                    }
                                                                                                                } while (_GLF_WRAPPED_LOOP(false));
                                                                                                            }
                                                                                                        } else {
                                                                                                        }
                                                                                                    }
                                                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                                        continue;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                } else {
                                }
                            }
                        } else {
                        }
                    }
                }
            } else {
            }
        }
    }
    _GLF_IDENTITY(_GLF_color = _GLF_outlined_0(grey), (_GLF_color = _GLF_outlined_0(grey)) + vec4(_GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), (_GLF_ZERO(0.0, injectionSwitch.x)) / _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0)))), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x)));
}
