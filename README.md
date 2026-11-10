# rglsl

A Vulkan GLSL (`#version 450`/`460`) → SPIR-V compiler in safe Rust, meant as a replacement
for glslang (`glslangValidator`) in Vulkan projects. It is a hard fork of [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga)
(naga 30.0.0, see [UPSTREAM.md](UPSTREAM.md)).

It differs from glslang in two ways only, and adds no new syntax:

1. **Function linking across modules.** A function declared but not defined in a
   compilation unit is an external function; the unit compiles to an object module and
   the linker supplies the definition.
2. **`#include` works by default**, with no extension directive.

**Status:** M0 — the naga crates are imported unchanged and the conformance harness runs.
See [docs/PLAN.md](docs/PLAN.md) for the plan and milestones and [PROGRESS.md](PROGRESS.md)
for the current numbers against glslang's test corpus.

## Building and testing

```sh
cargo build
cargo test --workspace --all-features
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo fmt --all -- --check
```

## Conformance against glslang

The reference tools are pinned in [oracles.toml](oracles.toml).

```sh
cargo xtask oracles     # fetch and build the pinned glslang and spirv-val into target/oracles
cargo xtask test        # run glslang's Test/ corpus and regenerate PROGRESS.md
```

With an existing glslang checkout at the pinned commit:

```sh
cargo xtask oracles --glslang-dir ../glslang
cargo xtask test --glslang-dir ../glslang
cargo xtask test --glslang-dir ../glslang --filter spv.100ops --no-progress-file
```

Per-shader results go to `target/xtask/results.tsv`.

## License

MIT OR Apache-2.0, like naga.
