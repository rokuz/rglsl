rglsl @VERSION@: a Vulkan GLSL (`#version 450`/`460`) to SPIR-V compiler in safe Rust, a drop-in
replacement for `glslangValidator` in Vulkan projects, with its own optimizer (`-O`, `-Os`), a
linker of object modules, reflection of the SPIR-V it produces, a Rust API and a C API.

## Files

| File | What |
|---|---|
| `rglsl-c-@VERSION@-linux-x86_64.tar.gz` | C API (`librglsl_c.so`, `librglsl_c.a`) and the `rglsl` command-line tool for x86_64 Linux (glibc, built on Ubuntu 22.04) |
| `rglsl-c-@VERSION@-windows-x86_64.zip` | C API (`bin/rglsl_c.dll`, its import library `lib/rglsl_c.dll.lib`, the static library `lib/rglsl_c.lib`, dynamic CRT) and `rglsl.exe` for x86_64 Windows |
| `rglsl-c-@VERSION@-macos-arm64.tar.gz` | C API (`librglsl_c.dylib` with the install name `@rpath/librglsl_c.dylib`, `librglsl_c.a`) and `rglsl` for macOS 11 or newer on Apple silicon |
| `rglsl-c-@VERSION@-android-arm64-v8a.tar.gz` | C API (`librglsl_c.so`, `librglsl_c.a`) for Android arm64-v8a, API level 24 or newer |
| `*.crate` | `cargo package` archives of the crates published to crates.io: the library crates (`rglsl-link` is the API, the others are its parts) and `rglsl-cli` |
| `SHA256SUMS` | SHA-256 of every file: `sha256sum -c SHA256SUMS` |

Every C archive has `include/rglsl.h`, `lib/` with the shared and the static library, a CMake
package (`lib/cmake/rglsl`), pkg-config files (not on Windows), `LICENSE-MIT`, `LICENSE-APACHE`
and a `README.md` with the link flags of its platform. The command-line tool needs neither
library.

## Rust

The crates are on [crates.io](https://crates.io/crates/rglsl-link):

```toml
[dependencies]
rglsl-link = "@VERSION@"
rglsl-dis = "@VERSION@"
```

```rust
use rglsl_link::{CompileOptions, ProgramOptions, ShaderStage, compile, link_spirv};

let main = compile(MAIN, &CompileOptions::new("main.comp", ShaderStage::Compute))?;
let library = compile(LIBRARY, &CompileOptions::library("library.glsl"))?;
let program = link_spirv(&[main, library], &ProgramOptions::default())?;
for binary in &program.stages {
    upload(binary.stage, &binary.words);
}
```

`binary.spirv_reflection()` reflects a stage: descriptor bindings with their Vulkan descriptor
types and counts, push constants, inputs and outputs, specialization constants and the workgroup
size; `spirv_reflection::PipelineLayout::new` merges the stages into descriptor set layouts and
push-constant ranges. `spirv_reflection::reflect_graph(words)` reflects a data graph module
(`SPV_ARM_graph`): graph entry points with their input and output tensors, and graph constants;
the C API has it as `rglsl_spirv_reflect_graph`.

`rglsl-dis` turns SPIR-V into text: glslang's `-H` disassembly, SPIRV-Tools' `spirv-dis` form and
hexadecimal text. [samples](https://github.com/rokuz/rglsl/tree/v@VERSION@/samples) has complete
programs.

## C and C++

```cmake
find_package(rglsl CONFIG REQUIRED)
target_link_libraries(app PRIVATE rglsl::rglsl_c)
target_link_libraries(tool PRIVATE rglsl::rglsl_c_static)
```

```sh
cmake -S . -B build -DCMAKE_PREFIX_PATH=/path/to/rglsl-c-@VERSION@-<platform>
```

`rglsl::rglsl_c` is the shared library, `rglsl::rglsl_c_static` the static one with the system
libraries it needs. The API is described in
[rglsl-capi/README.md](https://github.com/rokuz/rglsl/blob/v@VERSION@/rglsl-capi/README.md);
[samples/c](https://github.com/rokuz/rglsl/tree/v@VERSION@/samples/c) builds a C and a C++
program against an archive.

## Command line

```sh
cargo install rglsl-cli                               # or bin/rglsl of a C archive
rglsl -V shader.frag                                  # writes frag.spv
rglsl -V main.frag lighting.glsl -o shader.spv        # compile and link
rglsl -V -l -O main.vert main.frag                    # optimized
rglsl -V --spirv-reflection-json layout.json main.vert main.frag
                                                      # reflection of the SPIR-V as JSON
```

Options, exit codes and messages are `glslangValidator`'s; rglsl has only its options for Vulkan
GLSL.

The binaries are not signed: macOS may need `xattr -dr com.apple.quarantine` on the unpacked
directory, and Windows SmartScreen may warn about `rglsl.exe`.
