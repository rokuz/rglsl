#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
out=target/samples
rm -rf "$out"
mkdir -p "$out"
cargo run -q -p compile-and-link -- "$out"
cargo run -q -p rglsl-cli -- --object samples/link-objects/shaders/main.comp -o "$out/main.rglo"
cargo run -q -p rglsl-cli -- --object samples/link-objects/shaders/easing.glsl -o "$out/easing.rglo"
cargo run -q -p link-objects -- -o "$out/smooth.comp.spv" "$out/main.rglo" "$out/easing.rglo"
if [ -n "${SPIRV_VAL:-}" ]; then
    for spv in "$out"/*.spv; do
        "$SPIRV_VAL" --target-env vulkan1.0 "$spv"
        echo "spirv-val: $spv is valid"
    done
fi
