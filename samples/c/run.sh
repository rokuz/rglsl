#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
lib=target/debug
out=target/samples/c
rm -rf "$out"
mkdir -p "$out"
cargo build -q -p rglsl-capi

sanitize=""
if [ -n "${SANITIZE:-}" ]; then
    sanitize="-fsanitize=$SANITIZE -fno-omit-frame-pointer -g"
fi
case "$(uname -s)" in
    Darwin) system_libs="" ;;
    *) system_libs="-lpthread -ldl -lm -lc" ;;
esac

${CC:-cc} -std=c99 -Wall -Wextra -pedantic -Werror $sanitize -Irglsl-capi/include \
    samples/c/main.c -o "$out/compile-and-link" \
    -L"$lib" -lrglsl_c -Wl,-rpath,"$PWD/$lib"
${CXX:-c++} -std=c++17 -Wall -Wextra -pedantic -Werror $sanitize -Irglsl-capi/include \
    samples/c/main.cpp -o "$out/compile-and-link-cpp" \
    "$lib/librglsl_c.a" $system_libs

run() {
    if [ -n "${LEAKS:-}" ]; then
        leaks --atExit -- "$@" > "$out/leaks.txt" || { cat "$out/leaks.txt"; exit 1; }
        grep -E "^Process .*: [0-9]+ leaks? for" "$out/leaks.txt"
    else
        "$@"
    fi
}
run "$out/compile-and-link" "$out"
run "$out/compile-and-link-cpp" "$out"

if [ -n "${SPIRV_VAL:-}" ]; then
    for spv in "$out"/*.spv; do
        "$SPIRV_VAL" --target-env vulkan1.1 "$spv"
        echo "spirv-val: $spv is valid"
    done
fi
