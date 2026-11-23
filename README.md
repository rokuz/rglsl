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

## Download

[Releases](https://github.com/rokuz/rglsl/releases) carry, for every version:

- C archives `rglsl-c-VERSION-PLATFORM` for `linux-x86_64`, `windows-x86_64`, `macos-arm64`
  (`.tar.gz`, `.zip` on Windows) and `android-arm64-v8a`: the header, the shared and the static
  library, a CMake package, pkg-config files, the `rglsl` command-line tool (not on Android) and
  a README with the link flags of the platform;
- the `cargo package` archives (`.crate`) of the library crates and `SHA256SUMS`.

Rust projects depend on the tag of a release:

```toml
[dependencies]
rglsl-link = { git = "https://github.com/rokuz/rglsl", tag = "v0.1.0" }
rglsl-dis = { git = "https://github.com/rokuz/rglsl", tag = "v0.1.0" }   # SPIR-V as text
```

C and C++ projects unpack an archive and use its CMake package:

```cmake
find_package(rglsl CONFIG REQUIRED)                      # -DCMAKE_PREFIX_PATH=/path/to/archive
target_link_libraries(app PRIVATE rglsl::rglsl_c)        # or rglsl::rglsl_c_static
```

## Usage

```sh
cargo install --path rglsl-cli                        # or bin/rglsl of a C archive

rglsl -V shader.frag                                  # writes frag.spv
rglsl -V --target-env vulkan1.3 -g -Iinclude -o out.spv shader.comp
rglsl -V main.frag lighting.glsl -o shader.spv        # compile and link
rglsl --object lighting.glsl                          # object module lighting.rglo
rglsl -V -l -O main.vert main.frag                    # optimized; the linked stages are one
                                                      # pipeline (glslang's --lto is part of -O)
rglsl -V --specialize "3:16 4:true" shader.comp       # specialization constants 3 and 4 get
                                                      # these values while compiling
```

Options, exit codes and messages are `glslangValidator`'s; rglsl has only its options for Vulkan
GLSL.

### Optimizer

`-O` and `-Os` run rglsl's own optimizer (`rglsl-opt`) on the linked program instead of
SPIRV-Tools: inlining, forwarding of local values, scalar replacement of aggregates, constant
folding, dead branch and dead code elimination, common subexpression elimination, loop unrolling,
and SSA form with `OpPhi` for promoted locals.

- **Same results.** Only exact folds: an optimized shader computes bit for bit what the
  unoptimized one does on the GPU (no reassociation, no fast-math, infinities and NaNs are not
  folded away).
- **One pipeline.** With `-l`, the linked stages are optimized together: outputs the next stage
  does not read, inputs no earlier stage writes and unread built-ins are removed; the inputs of
  the first stage and the outputs of the last stay. Unused inputs, descriptors and push constants
  are removed, as `spirv-opt -O` does, so the reflection of an optimized program can differ.
- **`-Os`** minimizes the size of the driver's machine code, not of the SPIR-V.
- **`--target-gpu nvidia|amd|universal-desktop|universal-mobile`** selects the profile the passes
  are tuned for (default `universal-desktop`).
- **`--specialize`** substitutes specialization constant values while compiling, with or without
  `-O`.
- **Debug information** survives: `-g` keeps line information, `-gV`/`-gVS` keep variables
  through `DebugValue` and inlined calls through `DebugInlinedAt`.

Measured against `glslang -O` (glslang followed by `spirv-opt`'s performance passes) with
`cargo xtask opt-quality --exec` and `cargo xtask bench --in-process`:

- driver statistics (registers, scratch, machine code size from Amber's `--pipeline-stats`) on
  AMD and NVIDIA are no worse than `spirv-opt -O` on the corpus, with a few shaders a register
  apart in either direction;
- GPU time of the `tests/perf` workloads equals `spirv-opt -O`'s within noise on Apple
  (KosmicKrisp), AMD and NVIDIA;
- `rglsl -O` compiles in about a sixth of the time `glslang -O` takes.

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

### C and C++

`rglsl-capi` builds the same API as a C library, `librglsl_c` (shared and static), with the
header `rglsl-capi/include/rglsl.h` generated by cbindgen. Handles are opaque, strings are
NUL-terminated UTF-8, every function returns an `rglsl_result` and never lets a panic through,
and an include callback can supply `#include` files from the application. Its FFI module, which
turns C pointers into references, is the only `unsafe` code in the project.

```c
rglsl_compile_options *options = NULL;
rglsl_compile_options_create("main.comp", RGLSL_STAGE_COMPUTE, &options);
rglsl_object *main_object = NULL;
rglsl_diagnostics *diagnostics = NULL;
if (rglsl_compile(source, options, &main_object, &diagnostics) != RGLSL_RESULT_OK)
    fprintf(stderr, "%s\n", rglsl_diagnostics_text(diagnostics));
```

```sh
cargo build --release -p rglsl-capi     # target/release/librglsl_c.{so,dylib,a}, rglsl_c.dll
cargo xtask capi-cmake                  # CMake package of the build tree: target/debug/cmake/rglsl
```

Release archives ship the libraries with a CMake package (`rglsl::rglsl_c`,
`rglsl::rglsl_c_static`); see [Download](#download).

Conventions, ownership, threads and the include callback: [rglsl-capi](rglsl-capi/README.md);
C and C++ samples: [samples/c](samples/README.md#c-and-c).

## Development

```sh
cargo test --workspace --all-features
cargo xtask oracles --glslang-dir ../glslang          # pinned glslang, spirv-val, Amber
cargo xtask test --glslang-dir ../glslang             # glslang's corpus
cargo xtask test --opt-level O                        # the same with -O
cargo xtask opt-quality --exec                        # optimizer against spirv-opt -O and glslang -O:
                                                      # SPIR-V counts, driver statistics, GPU time
cargo xtask fuzz --random --exec --opt                # differential fuzzing against glslang
```

Every compiled shader is checked with `spirv-val` and, where it can run, executed on GPUs through
Amber and compared with glslang's module: on Apple hardware through KosmicKrisp and, through SSH
targets, on AMD and NVIDIA under Windows. A remote run stops after `--max-resets` driver resets
(default 3).

The fuzzer (`rglsl-fuzz`, a port of GraphicsFuzz) generates semantics-preserving variants of
template shaders, qualifies glslang's modules (and `glslang -O`'s) on every GPU, and then
requires rglsl's module (and `rglsl -O`'s) to render the same image. Shaders whose glslang
module hangs or crashes a driver are kept in `tests/fuzz-quarantine`, per GPU and mode, with
the evidence; `cargo xtask fuzz --recheck-quarantine` checks them again. Driver bugs found on
the way that need a particular SPIR-V form are worked around in the backend and pinned by tests
in `tests/exec` and `xtask/exec-regressions`.

Rules for contributors: [AGENTS.md](AGENTS.md).

## Benchmark

```sh
cargo xtask bench --glslang-dir ../glslang [--runs 10] [--filter TEXT] [--debug-info g|gVS]
```

Compares the compile time of the release-built `rglsl` with the pinned Release-built
`glslangValidator` on the same command lines, one process at a time: the corpus shaders both
accept, the link tests and large generated shaders. The report goes to `target/xtask/bench.md`,
per-shader numbers to `target/xtask/bench.tsv`.

```sh
cargo xtask bench --in-process --glslang-dir ../glslang [--runs 10] [--filter TEXT]
```

Compares the compilers without process start-up: each compiles every shader inside one
long-lived process. rglsl runs through its library (`xtask/harness`), glslang through a small C++
harness built with the system `c++` (or `$CXX`) against the libraries `cargo xtask oracles`
builds. The report shows the first compile (built-in tables built) and the steady state (tables
cached) for the Vulkan and gl-as-vulkan corpus shaders and the generated ones, and splits rglsl's
time into preprocessor, parser, sema, lowering, validator and SPIR-V:
`target/xtask/bench-in-process.md` and `.tsv`.

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
  [libfuzzer-sys](https://github.com/rust-fuzz/libfuzzer), [arbitrary](https://github.com/rust-fuzz/arbitrary),
  [cbindgen](https://github.com/mozilla/cbindgen) (MPL-2.0, generates the C header in `xtask`)
  and others in `Cargo.lock`.

## License

MIT OR Apache-2.0, like naga.
