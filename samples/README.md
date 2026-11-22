# Samples

Using rglsl as a library at runtime. The Rust samples depend only on `rglsl-link`, whose compiler
API takes strings or bytes and options and returns SPIR-V words, object file bytes or
diagnostics:

| Function | Input | Output |
|---|---|---|
| `compile(source, &CompileOptions)` | GLSL text of one module | `ObjectModule` |
| `compile_with_includer(source, &CompileOptions, resolve)` | the same, `#include` files from a callback | `ObjectModule` |
| `link_spirv(&[ObjectModule], &ProgramOptions)` | object modules of one or more stages | `Program`: SPIR-V words per stage, warnings |
| `compile_and_link(&[(source, CompileOptions)], &ProgramOptions)` | GLSL texts | `Program` |
| `write_object(&ObjectModule)` / `read_object(&[u8])` | object module / `.rglo` bytes | `.rglo` bytes / object module |

`Compiler` has `compile`, `compile_with_includer` and `compile_and_link` as methods. It keeps the
built-in tables (the built-in functions and variables of a GLSL version, stage and resource
limits) it has built and reuses them in every later compilation; the free functions build them
again for every call. A `Compiler` is `Send` and `Sync`, and clones share their tables, so one
compiler serves every thread of a process.

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

## C and C++

`samples/c` is a CMake project on the C API of `rglsl-capi` (`rglsl-capi/include/rglsl.h`,
library `rglsl_c`). `main.c` compiles a vertex shader, a fragment shader and a lighting library
from strings; the library gets a define, an in-memory include and an include callback that
supplies `<material.h>`. It writes the library to object file bytes and reads it back, links the
three objects for SPIR-V 1.3, writes `vert.spv` and `frag.spv`, and shows a compile error and a
link error with their diagnostics. `main.cpp` compiles a compute shader and a library with
`std::unique_ptr` deleters and an include callback over a `std::map`, and writes
`blur.comp.spv`.

`CMakeLists.txt` finds the library with `find_package(rglsl CONFIG)`, links `main.c` (C99) to the
shared library `rglsl::rglsl_c` and `main.cpp` (C++17) to the static library
`rglsl::rglsl_c_static`, and registers both as CTest tests that write into the build directory.
The package config comes from an unpacked release archive or from the build tree:

```sh
cmake -S samples/c -B build -DCMAKE_PREFIX_PATH=/path/to/rglsl-c-0.1.0-linux-x86_64
cmake --build build --config Release
ctest --test-dir build -C Release --output-on-failure
```

`cargo xtask capi-cmake` builds `rglsl-capi` and writes the package config of the build tree into
`target/debug/cmake/rglsl` (`--profile` for another profile); `samples/c/run.sh` does that,
configures `samples/c` with it into `target/samples/c` with `-Wall -Wextra -pedantic -Werror`,
builds it and runs CTest:

```sh
sh samples/c/run.sh
SPIRV_VAL=target/oracles/bin/spirv-val sh samples/c/run.sh   # + a spirv-val test of every .spv
SANITIZE=address,undefined sh samples/c/run.sh               # AddressSanitizer (LeakSanitizer on Linux), UBSan
LEAKS=1 sh samples/c/run.sh                                  # macOS: each sample under leaks --atExit
```

The cache variables behind them are `RGLSL_SAMPLES_SANITIZE`, `RGLSL_SAMPLES_LAUNCHER`,
`RGLSL_SAMPLES_SPIRV_VAL` and `RGLSL_SAMPLES_WARNINGS_AS_ERRORS`; `CC` and `CXX` choose the
compilers as for any CMake project. The release workflow builds and runs the same project against
every C archive it can run (`cargo xtask package-c`).

## Running in CI

`samples/run.sh` builds and runs both Rust samples into `target/samples`, creating the object files
with the CLI first. With `SPIRV_VAL` set to a `spirv-val` binary it also validates every output
for Vulkan 1.0; without it the SPIR-V is checked only by rglsl's own validator, which every link
runs.

```sh
SPIRV_VAL=target/oracles/bin/spirv-val sh samples/run.sh
```

CI runs `samples/c/run.sh` on Linux three times: plain, under AddressSanitizer with LeakSanitizer
and UBSan, and with `SPIRV_VAL` (Vulkan 1.1, for the SPIR-V 1.3 outputs) in the corpus job.
