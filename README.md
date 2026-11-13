# rglsl

A Vulkan GLSL (`#version 450`/`460`) → SPIR-V compiler in safe Rust, a drop-in replacement for
`glslangValidator` in Vulkan projects, descended from naga.

On glslang's own test corpus rglsl accepts what glslang accepts, reports errors on the same
lines, and produces SPIR-V that passes `spirv-val`, has the same interface and gives the same
results on real GPUs (KosmicKrisp on Apple, AMD, NVIDIA).

## Relation to naga

rglsl started as a hard fork of [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga) 30.0.0
and keeps its core:

- **IR** (`rglsl/src/ir`): naga's module format — arenas of types, constants, globals, functions
  and expressions addressed by typed handles, structured control flow, `Emit` ranges. It is
  extended for Vulkan GLSL: imports and linkage, geometry and tessellation stages, debug
  information, cooperative matrices and vectors, tensors and more.
- **Validator** (`rglsl/src/valid`), including the uniformity analysis.
- **SPIR-V backend** (`rglsl/src/back/spv`), the only backend.
- **Processing** (`rglsl/src/proc`, `compact`): layouter, typifier, constant evaluator, compaction.
- The arena, span and diagnostic infrastructure and the snapshot tests.

Replaced or removed: naga's GLSL frontend (now a preprocessor, parser, semantic analysis and
lowering in `rglsl-pp`, `rglsl-ast`, `rglsl-sema` and `rglsl/src/front/glsl`), the WGSL and SPIR-V
frontends, and the WGSL, MSL, HLSL, GLSL and DOT backends. New: the linker (`rglsl-link`), object
files and the `glslangValidator`-compatible CLI.

## Differences from glslang

- **Linking.** A function declared without a body is an import; modules link into one program.
- **`#include`** works without an extension directive.
- **Rejected on purpose**, with a clear error: what glslang turns into SPIR-V that Vulkan does not
  allow (16-bit transform feedback, `GL_AMD_gpu_shader_half_float_fetch`, opaque types in uniform
  structures, OpenCL-only instructions).
- **Dead code** under constant conditions is not emitted.
- **Extension keywords** are always reserved.

## Usage

```sh
cargo install --path rglsl-cli

rglsl -V shader.frag                                  # writes frag.spv
rglsl -V --target-env vulkan1.3 -g -Iinclude -o out.spv shader.comp
rglsl -V main.frag lighting.glsl -o shader.spv        # compile and link
rglsl --object lighting.glsl                          # object module lighting.rglo
```

Options, exit codes and messages are `glslangValidator`'s.

From Rust, `rglsl-link` compiles GLSL strings into object modules, links them and returns SPIR-V
words or diagnostics:

```rust
use rglsl_link::{CompileOptions, ProgramOptions, ShaderStage, compile, link_spirv};

let main = compile(MAIN, &CompileOptions::new("main.comp", ShaderStage::Compute))?;
let library = compile(LIBRARY, &CompileOptions::library("library.glsl"))?;
let program = link_spirv(&[main, library], &ProgramOptions::default())?;
for binary in &program.stages {
    upload(binary.stage, &binary.words);
}
```

Complete examples, including object files on disk: [samples](samples/README.md).

## Development

```sh
cargo test --workspace --all-features
cargo xtask oracles --glslang-dir ../glslang          # pinned glslang, spirv-val, Amber
cargo xtask test --glslang-dir ../glslang             # glslang's corpus
```

Rules for contributors: [AGENTS.md](AGENTS.md).

## Benchmark

```sh
cargo xtask bench --glslang-dir ../glslang [--runs 10] [--filter TEXT] [--debug-info g|gVS]
```

Compares the compile time of the release-built `rglsl` with the pinned Release-built
`glslangValidator` on the same command lines, one process at a time: the corpus shaders both
accept, the link tests and large generated shaders. The report goes to `target/xtask/bench.md`,
per-shader numbers to `target/xtask/bench.tsv`.

## Projects used

- [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga) — the base of the IR, validator and
  SPIR-V backend.
- [glslang](https://github.com/KhronosGroup/glslang) — the reference compiler and its test corpus.
- [SPIRV-Tools](https://github.com/KhronosGroup/SPIRV-Tools) (`spirv-val`),
  [SPIRV-Headers](https://github.com/KhronosGroup/SPIRV-Headers),
  [Vulkan-Headers](https://github.com/KhronosGroup/Vulkan-Headers).
- [GraphicsFuzz](https://github.com/google/graphicsfuzz) — the variant generator and reducer,
  ported in `rglsl-fuzz` (Apache-2.0).
- [Amber](https://github.com/google/amber) ([fork](https://github.com/rokuz/amber)) — runs the
  compiled shaders on GPUs.
- [KosmicKrisp](https://gitlab.freedesktop.org/mesa/mesa) — Mesa's Vulkan driver on Apple
  hardware ([prebuilt binaries](https://github.com/rokuz/kosmickrisp-binaries)).
- [Arm ML Emulation Layer for Vulkan](https://github.com/arm/ai-ml-emulation-layer-for-vulkan) —
  `VK_ARM_tensors` on GPUs without native support, with
  [SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross) and
  [nlohmann/json](https://github.com/nlohmann/json).
- Rust crates: [rspirv](https://github.com/gfx-rs/rspirv), [spirv](https://crates.io/crates/spirv),
  [ron](https://github.com/ron-rs/ron), [cargo-fuzz](https://github.com/rust-fuzz/cargo-fuzz) /
  [libfuzzer-sys](https://github.com/rust-fuzz/libfuzzer), [arbitrary](https://github.com/rust-fuzz/arbitrary)
  and others in `Cargo.lock`.

## License

MIT OR Apache-2.0, like naga.
