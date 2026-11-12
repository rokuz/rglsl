# rglsl

A Vulkan GLSL (`#version 450`/`460`) → SPIR-V compiler in safe Rust, a drop-in replacement for
`glslangValidator` in Vulkan projects. Hard fork of [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga)
30.0.0.

On glslang's own test corpus rglsl accepts what glslang accepts, reports errors on the same
lines, and produces SPIR-V that passes `spirv-val`, has the same interface and gives the same
results on real GPUs (KosmicKrisp on Apple, AMD, NVIDIA).

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
