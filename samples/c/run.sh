#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
out=target/samples/c
rglsl_dir=$(cargo xtask capi-cmake)
spirv_val=""
if [ -n "${SPIRV_VAL:-}" ]; then
    spirv_val="$(cd "$(dirname "$SPIRV_VAL")" && pwd)/$(basename "$SPIRV_VAL")"
fi
launcher=""
if [ -n "${LEAKS:-}" ]; then
    launcher="leaks;--atExit;--"
fi

rm -rf "$out"
cmake -S samples/c -B "$out" -DCMAKE_BUILD_TYPE=Debug -Drglsl_DIR="$rglsl_dir" \
    -DRGLSL_SAMPLES_WARNINGS_AS_ERRORS=ON \
    -DRGLSL_SAMPLES_SANITIZE="${SANITIZE:-}" \
    -DRGLSL_SAMPLES_LAUNCHER="$launcher" \
    -DRGLSL_SAMPLES_SPIRV_VAL="$spirv_val"
cmake --build "$out"
ctest --test-dir "$out" --output-on-failure
