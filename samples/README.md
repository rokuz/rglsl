# Samples

Using rglsl as a library at runtime. Both samples depend only on `rglsl-link`, whose compiler
API takes strings or bytes and options and returns SPIR-V words, object file bytes or
diagnostics:

| Function | Input | Output |
|---|---|---|
| `compile(source, &CompileOptions)` | GLSL text of one module | `ObjectModule` |
| `link_spirv(&[ObjectModule], &ProgramOptions)` | object modules of one or more stages | `Program`: SPIR-V words per stage, warnings |
| `compile_and_link(&[(source, CompileOptions)], &ProgramOptions)` | GLSL texts | `Program` |
| `write_object(&ObjectModule)` / `read_object(&[u8])` | object module / `.rglo` bytes | `.rglo` bytes / object module |

Every function returns `Diagnostics` on failure: a list of `Diagnostic` (severity, file, line,
column, stage, message) that renders as glslang-style lines (`ERROR: main.frag:4:18: ...`).

`CompileOptions::new(name, stage)` compiles a shader of a stage, `CompileOptions::library(name)`
a library: a module without `main` whose functions other modules call through prototypes.
`define(name, value)` adds a macro, `include(name, source)` an in-memory file for `#include`.

## compile-and-link

Compiles a vertex shader, a fragment shader and a lighting library from strings in the program.
The fragment shader declares `vec3 shade(vec3 normal);` without a body; the library defines it,
includes an in-memory header and uses a macro passed as an option. The three objects link into a
program of two stages, and the sample prints the size and entry point of each. Two more programs
show failures without stopping the process: a compile error with its location, and a link that
misses the library.

```sh
cargo run -p compile-and-link [-- OUTPUT_DIR]   # OUTPUT_DIR gets vert.spv and frag.spv
```

## link-objects

Reads `.rglo` object files, links them into one stage and writes the SPIR-V binary.

```sh
rglsl --object samples/link-objects/shaders/main.comp -o main.rglo
rglsl --object samples/link-objects/shaders/easing.glsl -o easing.rglo
cargo run -p link-objects -- -o smooth.spv main.rglo easing.rglo
```

Object files are not kept in the repository: their format is versioned, and a file of another
format version is rejected with a diagnostic.

## Running in CI

`samples/run.sh` builds and runs both samples into `target/samples`, creating the object files
with the CLI first. With `SPIRV_VAL` set to a `spirv-val` binary it also validates every output
for Vulkan 1.0; without it the SPIR-V is checked only by rglsl's own validator, which every link
runs.

```sh
SPIRV_VAL=target/oracles/bin/spirv-val sh samples/run.sh
```
