# rglsl @VERSION@: C API for @PLATFORM@

rglsl compiles Vulkan GLSL (`#version 450` and `460`) to SPIR-V. This archive holds its C API
and its command-line tool, built for `@TARGET@`. They run on @REQUIREMENT@.

| Path | What |
|---|---|
@LAYOUT@| `LICENSE-MIT`, `LICENSE-APACHE` | rglsl is available under either license |

## CMake

```cmake
find_package(rglsl @MAJOR@.@MINOR@ CONFIG REQUIRED)
target_link_libraries(app PRIVATE rglsl::rglsl_c)
target_link_libraries(tool PRIVATE rglsl::rglsl_c_static)
```

```sh
cmake -S . -B build -DCMAKE_PREFIX_PATH=/path/to/this/directory
```

`rglsl::rglsl_c` is the shared library, `rglsl::rglsl_c_static` the static library together with
the system libraries it needs. Both carry the include directory.
[samples/c](https://github.com/rokuz/rglsl/tree/v@VERSION@/samples/c) is a CMake project with a
C program on the shared library and a C++ program on the static one:

```sh
cmake -S samples/c -B build -DCMAKE_PREFIX_PATH=/path/to/this/directory
cmake --build build --config Release
ctest --test-dir build -C Release --output-on-failure
```

The API, its conventions (results, ownership, threads, the include callback) and every function
are described in
[rglsl-capi/README.md](https://github.com/rokuz/rglsl/blob/v@VERSION@/rglsl-capi/README.md).
`rglsl_version()` returns `"@VERSION@"`; `rglsl_abi_version()` returns the `RGLSL_ABI_VERSION`
of the header the library was built with.

## Without CMake

@LINKING@
The static library needs these system libraries after it:

```
@NATIVE_LIBS@
```
@PKG_CONFIG@