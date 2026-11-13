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

## Development

```sh
cargo test --workspace --all-features
cargo xtask oracles --glslang-dir ../glslang          # pinned glslang, spirv-val, Amber
cargo xtask test --glslang-dir ../glslang             # glslang's corpus
```

Rules for contributors: [AGENTS.md](AGENTS.md).

## License

MIT OR Apache-2.0, like naga.
