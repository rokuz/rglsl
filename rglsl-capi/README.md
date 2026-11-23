# rglsl-capi

The C API of rglsl: a shared library (`librglsl_c.so`, `librglsl_c.dylib`, `rglsl_c.dll`), a
static library (`librglsl_c.a`, `rglsl_c.lib`) and the header `include/rglsl.h`. It wraps the
compiler API of `rglsl-link` (`Compiler::compile_unit`, `preprocess`, `build`, `link_spirv`,
`write_object`, `read_object`, diagnostics formatting, resource limits, depfiles) and the text
forms and reflection of `rglsl-dis` (disassembly, hexadecimal text, SPIR-V reflection): everything
the `rglsl` command line does.

## CMake

Every [release](https://github.com/rokuz/rglsl/releases) has an archive per platform
(`rglsl-c-VERSION-linux-x86_64.tar.gz`, `-windows-x86_64.zip`, `-macos-arm64.tar.gz`,
`-android-arm64-v8a.tar.gz`) with the header, both libraries and a CMake package:

```cmake
find_package(rglsl CONFIG REQUIRED)
target_link_libraries(app PRIVATE rglsl::rglsl_c)
target_link_libraries(tool PRIVATE rglsl::rglsl_c_static)
```

```sh
cmake -S . -B build -DCMAKE_PREFIX_PATH=/path/to/rglsl-c-VERSION-PLATFORM
```

`rglsl::rglsl_c` is the shared library (on Windows the DLL in `bin/` and its import library),
`rglsl::rglsl_c_static` the static library with the system libraries rustc lists for it
(`--print native-static-libs`). On macOS the shared library's install name is
`@rpath/librglsl_c.dylib`, on Linux and Android its `SONAME` is `librglsl_c.so`. Android
projects pass `-Drglsl_DIR=.../lib/cmake/rglsl`, since the NDK toolchain file searches packages
only in the sysroot. The archive's `README.md` also lists the link flags without CMake and its
pkg-config files.

From a checkout, `cargo xtask capi-cmake` builds the library and writes the same package for the
build tree (`target/debug/cmake/rglsl`, passed as `-Drglsl_DIR`), and `cargo xtask package-c
--target T` builds a release archive:

```sh
cargo build --release -p rglsl-capi          # target/release/librglsl_c.{so,dylib,a}, rglsl_c.dll
cargo xtask capi-cmake                       # target/debug/cmake/rglsl/rglsl-config.cmake
cargo xtask package-c --target aarch64-apple-darwin   # target/dist/rglsl-c-VERSION-macos-arm64.tar.gz
cargo xtask capi-header                      # regenerate include/rglsl.h with cbindgen
cargo xtask capi-header --check              # CI: the committed header is up to date
sh samples/c/run.sh                          # the C and C++ samples, through CMake and CTest
```

## Library name

The library is `rglsl_c`, not `rglsl`: the compiler crate `rglsl` already produces
`librglsl.rlib` in the same workspace, and on Windows the command-line tool `rglsl.exe` writes
`rglsl.pdb` next to where `rglsl.dll` would write its own. Cargo reports both as output file
name collisions.

## Usage

```c
#include "rglsl.h"

rglsl_compile_options *options = NULL;
rglsl_compile_options_create("main.frag", RGLSL_STAGE_FRAGMENT, &options);
rglsl_compile_options_add_define(options, "QUALITY", "2");

rglsl_object *object = NULL;
rglsl_diagnostics *diagnostics = NULL;
if (rglsl_compile(source, options, &object, &diagnostics) != RGLSL_RESULT_OK) {
    fprintf(stderr, "%s\n", rglsl_diagnostics_text(diagnostics));
    rglsl_diagnostics_destroy(diagnostics);
}

rglsl_program *program = NULL;
const rglsl_object *objects[] = {object, library};
rglsl_link(objects, 2, NULL, &program, &diagnostics);

const uint32_t *words;
size_t word_count;
rglsl_program_spirv(program, 0, &words, &word_count);
```

`samples/c/main.c` compiles a vertex shader, a fragment shader and a library with a define, an
in-memory include and an include callback, round-trips the library through object file bytes,
links the program, writes `vert.spv` and `frag.spv`, and shows a compile error and a link error.
`samples/c/main.cpp` does the same from C++ with `std::unique_ptr` deleters.

| Function | What |
|---|---|
| `rglsl_version`, `rglsl_abi_version` | library version string; `RGLSL_ABI_VERSION` the header was generated with |
| `rglsl_compile_options_create(name, stage, &options)` | options of a shader of a stage |
| `rglsl_compile_options_create_library(name, &options)` | options of a library: a module without `main` |
| `rglsl_compile_options_add_define`, `_add_undefine`, `_add_preamble_text` | the user preamble of `-D`, `-U` and `-P`, in order |
| `rglsl_compile_options_add_include`, `_add_include_dir`, `_set_file_system_includes` | in-memory `#include` files, include directories over the in-memory files (or, with file system includes, on disk as `glslangValidator` searches them) |
| `rglsl_compile_options_set_entry_point`, `_set_vulkan_version`, `_set_spirv_version`, `_set_debug_info` | `-e`, `--target-env` (Vulkan 1.0 to 1.4, SPIR-V 1.0 to 1.6), `-g*` (`RGLSL_DEBUG_INFO_*`) |
| `rglsl_compile_options_set_suppress_warnings`, `_set_limits` | `-w`, `.conf` |
| `rglsl_compile_options_set_invert_y`, `_set_nan_clamp`, `_set_discard_is_terminate` | `--invert-y`, `--nan-clamp`, `--discard-is-terminate` |
| `rglsl_compile_options_set_enhanced_messages` | `--enhanced-msgs`: only the first error of a compilation |
| `rglsl_compile_options_set_includer(options, callback, user_data)` | the include callback, `NULL` to remove it |
| `rglsl_include_result_set(result, name, source)` | called by the callback to resolve the include |
| `rglsl_compile(source, options, &object, &diagnostics)` | GLSL text to an object |
| `rglsl_compiler_create(&compiler)`, `rglsl_compiler_compile(compiler, source, options, &object, &diagnostics)` | like `rglsl_compile`, but the compiler keeps the built-in tables of every GLSL version and stage it has compiled and reuses them; one compiler can be shared by all threads |
| `rglsl_object_write(object, &blob, &diagnostics)`, `rglsl_blob_data`, `rglsl_blob_size`, `rglsl_blob_text` | object to `.rglo` bytes; every blob is followed by a NUL byte, so a text blob is also a C string |
| `rglsl_object_file_count`, `rglsl_object_file` | the files the compilation included (`--depfile`) |
| `rglsl_compiler_preprocess(compiler, source, options, &text, &diagnostics)` | `-E` |
| `rglsl_compiler_build(compiler, sources, options, count, program_options, &program, &diagnostics)` | what `rglsl -V`/`-l` does with GLSL files: one source of a stage is compiled as a program, several are compiled and linked; `rglsl_program_reflection`, `rglsl_program_file_count`, `rglsl_program_file` |
| `rglsl_object_read(data, size, &object, &diagnostics)` | `.rglo` bytes to an object |
| `rglsl_program_options_create`, `_set_debug_info`, `_set_spirv_version`, `_set_command_line`, `_set_working_directory`, `_set_limits`, `_set_suppress_warnings`, `_set_generate_spirv`, `_set_reflection` | options of the link and of SPIR-V generation: debug info, SPIR-V version, the command line and working directory recorded by `-gV`, limits, `-w`, generating SPIR-V (`-l` without `-V`), reflection (`-q`, `RGLSL_REFLECT_*` for the `--reflect-*` options) |
| `rglsl_program_options_set_validate_io` | `--validate-io`: an input a stage reads needs an output of the stage before |
| `rglsl_program_options_set_optimization`, `_set_target_gpu` | `-O`, `-Os`, `-Od` (`RGLSL_OPT_LEVEL_*`, disabled by default) and `--target-gpu` (`RGLSL_TARGET_GPU_*`, universal desktop by default): the optimizer runs on every linked stage before SPIR-V generation; the stages of one linked program are one pipeline, so outputs the next stage does not read, inputs no stage before writes and unread `gl_PerVertex` members are removed between stages (the inputs of the first stage and the outputs of the last stage stay); objects are never optimized |
| `rglsl_program_options_set_optimizer_passes`, `_set_optimizer_validate_each` | `--opt-passes` (comma-separated pass names that replace the preset, `NULL` for the preset; an unknown name is `RGLSL_RESULT_INVALID_ARGUMENT`) and `--opt-validate-each` (validate the IR after every pass; on by default in debug builds) |
| `rglsl_program_options_add_specialization(options, id, value)`, `_clear_specializations` | `--specialize <id>:<value>`: replaces the specialization constant `id` by `value` (`true`/`false`, a decimal or `0x` integer, or a float, checked against the constant's type when the program is linked) at any optimization level; `-O` then folds it and prunes the branches it decides; a value for an id the program does not declare, two values for one id or a value of the wrong type make linking fail with a diagnostic; constants without a value stay specializable |
| `rglsl_limits_create`, `_decode`, `_set`, `_get`, `_message_count`, `_message`, `_configuration` | resource limits: glslang's defaults, a `.conf` file and its messages, `-c` |
| `rglsl_disassemble(words, count, form, &text)` | `-H` (`RGLSL_DISASSEMBLY_GLSLANG`) and `--spirv-dis` (`RGLSL_DISASSEMBLY_STANDARD`, the form of SPIRV-Tools' `spirv-dis`); `RGLSL_RESULT_INVALID_SPIRV` with the text up to the error for malformed SPIR-V |
| `rglsl_hex_text(words, count, variable_name, &text)` | `-x`, `--vn` |
| `rglsl_depfile(targets, count, dependencies, count, &text)` | `--depfile` |
| `rglsl_diagnostics_format(diagnostics, flags, &text)`, `rglsl_diagnostics_info_log` | glslang's message lines, with `RGLSL_FORMAT_ERROR_COLUMN`, `_ABSOLUTE_PATH`, `_UNNAMED_SOURCE`; the info log adds glslang's summary line |
| `rglsl_link(objects, count, options, &program, &diagnostics)` | objects to a program; `options` may be `NULL` |
| `rglsl_program_stage_count`, `_stage`, `_entry_point`, `_spirv`, `_warnings` | the SPIR-V binary and entry point of every stage, link warnings |
| `rglsl_program_stage_reflection(program, index)` | the reflection of a stage's SPIR-V, owned by the program |
| `rglsl_reflect(words, count, &reflection, &diagnostics)` | the reflection of any SPIR-V module with one entry point; `RGLSL_RESULT_INVALID_SPIRV` with a diagnostic for malformed words |
| `rglsl_reflection_stage`, `_entry_point`, `_local_size(reflection, dimension, &size, &specialized, &spec_id)` | stage, entry point, local size (`RGLSL_RESULT_INVALID_ARGUMENT` without one) |
| `rglsl_reflection_binding_count`, `_binding(reflection, index, &set, &binding, &type, &count, &variable_id)`, `_binding_name`, `_binding_block(reflection, index, &size, &runtime_array_stride)` | descriptor bindings sorted by set and binding: `rglsl_descriptor_type` (`RGLSL_DESCRIPTOR_TYPE_*`, the values of `VkDescriptorType`), count (0 for a runtime array), name (`NULL` without debug names), the fixed size of a buffer block and the stride of its trailing runtime array (0 without one) |
| `rglsl_reflection_descriptor_heaps` | `RGLSL_DESCRIPTOR_HEAP_RESOURCE`, `_SAMPLER`: the descriptor heaps the stage uses |
| `rglsl_reflection_push_constant_count`, `_push_constant(reflection, index, &offset, &size, &variable_id)`, `_push_constant_name`, `_push_constant_bank` | push constant blocks: lowest member offset and size; the `GL_NV_push_constant_bank` bank and member offset |
| `rglsl_reflection_interface_count(reflection, direction)`, `_interface`, `_interface_name`, `_interface_type` | stage inputs (`RGLSL_INTERFACE_INPUT`) and outputs (`RGLSL_INTERFACE_OUTPUT`) without built-ins, members of blocks one by one: location, component, `rglsl_scalar_kind` (`RGLSL_SCALAR_KIND_*`), bit width, vector size, columns, array dimensions |
| `rglsl_reflection_specialization_count`, `_specialization(reflection, index, &spec_id, &kind, &width, &default_bits, &result_id)`, `_specialization_name` | specialization constants: `SpecId`, type, the bits of the default value |
| `rglsl_reflection_json(reflection, &text)`, `rglsl_program_reflection_json(program, &text, &diagnostics)` | the reflection as JSON; of a program with the merged pipeline layout (`--reflection-json`) |
| `rglsl_program_pipeline_layout(program, &layout, &diagnostics)`, `rglsl_pipeline_layout_create(reflections, count, &layout, &diagnostics)` | the stages merged into a pipeline layout; a binding whose type or count differs between stages is `RGLSL_RESULT_LINK_FAILED` |
| `rglsl_pipeline_layout_binding_count`, `_binding(layout, index, &set, &binding, &type, &count, &stage_flags)`, `_binding_name`, `_push_constant_range_count`, `_push_constant_range(layout, index, &stage_flags, &offset, &size)`, `_push_constant_range_bank` | bindings sorted by set and binding with the stages that use them (`VkShaderStageFlags` bits), push constant ranges per stage |
| `rglsl_diagnostics_count`, `_text`, `_message`, `_location` | every diagnostic as a glslang-style line, all of them as one text, severity, file, line and column |
| `rglsl_*_destroy` | frees a handle; `NULL` is ignored |

## Conventions

- **Results.** Every function that can fail returns `rglsl_result`: `RGLSL_RESULT_OK`,
  `_INVALID_ARGUMENT` (a `NULL` pointer, a string that is not UTF-8, an unknown stage, an
  unsupported SPIR-V version, an index out of range), `_COMPILE_FAILED`, `_LINK_FAILED`,
  `_INVALID_OBJECT` (bytes that are not an object file of this version), `_INVALID_SPIRV`
  (words that do not disassemble or reflect) and `_INTERNAL_ERROR`
  (a panic inside rglsl, caught at the boundary; it is a bug). Getters return `NULL` or `0` for
  a `NULL` handle or an index out of range. The output pointers of the reflection and pipeline
  layout getters may be `NULL` for values the caller does not need.
- **Enumerations** (`rglsl_result`, `rglsl_stage`, `rglsl_severity`, `rglsl_debug_info`,
  `rglsl_disassembly`, `rglsl_opt_level`, `rglsl_target_gpu`, `rglsl_descriptor_type`,
  `rglsl_scalar_kind`, `rglsl_interface`) are `uint32_t` with
  `#define`d values, so any value a caller passes is defined behavior and an unknown one is
  rejected with `RGLSL_RESULT_INVALID_ARGUMENT`. Stages are numbered like glslang's
  `EShLanguage`.
- **Strings** are NUL-terminated UTF-8, both ways. GLSL text cannot contain NUL, so sources need
  no length. Binary data (object file bytes, SPIR-V words) is a pointer and a length.
- **Options are opaque handles with setters**, not a struct: a new option is a new function and
  never changes the layout or the size of anything the caller allocates, so the ABI only grows.
  `RGLSL_ABI_VERSION` changes when a function changes its signature or meaning or is removed.
- **Ownership.** A handle written to an output pointer belongs to the caller, who frees it with
  the matching `rglsl_*_destroy`. Output pointers are set to `NULL` on failure. The diagnostics
  output pointer may be `NULL` when the caller does not want them; on success it is set to
  `NULL`. Strings, words, bytes and the warnings returned by getters belong to the handle they
  come from and stay valid until it is destroyed; they are never freed separately. Inputs are
  copied: a string or an object passed to a function may be freed right after the call.
- **Reuse.** Options can compile any number of shaders, objects can be linked into any number
  of programs, and setters can be called between compilations.

## Threads

The library has no global state. Different handles can be used from different threads at the
same time. A handle can be read from several threads at once by the functions that take it as
`const` (`rglsl_compile`, `rglsl_compiler_compile`, `rglsl_link`, `rglsl_object_write` and every
getter), but not while
another thread changes or destroys it. All handles can be moved between threads. The include
callback runs on the thread that called `rglsl_compile`, before `rglsl_compile` returns; its
`user_data` must allow that.

## The include callback

```c
void include(void *user_data, const char *requested, bool system, const char *includer,
             rglsl_include_result *result);
```

rglsl first looks for an `#include` among the in-memory files of the options (`#include "x"`
relative to the including file, then the include directories; `#include <x>` only in the include
directories). The callback is called for everything else, with the requested name, whether it was
`<...>`, and the name of the including file. It resolves the include by calling
`rglsl_include_result_set(result, name, source)` with the resolved name (`NULL` keeps the
requested one) and the source; both are copied. Not calling it means the file was not found.
Includes inside the resolved file are looked up relative to its resolved name. Within one
compilation the callback is asked once for each requested name, kind and including file; the
answer, found or not, is reused. `result`
is valid only during the call. The callback must not throw a C++ exception or `longjmp` out.

## Safety

The C caller's obligations are the usual ones and are not checked beyond `NULL`: a handle
argument is `NULL` or a live handle of the right type returned by this library, never destroyed
twice; a string is `NULL` or NUL-terminated; `data`/`size` and `objects`/`count` describe readable
memory (`NULL` is allowed with a count of 0); output pointers are `NULL` or writable.

Inside the crate all `unsafe` code is in `src/ffi.rs` and does only that conversion, one
operation per `unsafe` block: a raw pointer becomes `Option<&T>`, `Option<&mut T>`, `&CStr` or a
slice (`c_str`, `bytes`, `handles`), a handle is taken back into its `Box` (`take`), and the
include callback is called (`Includer::call`). The functions of `src/api.rs` are safe Rust: they
validate the arguments, run the work inside `catch_unwind` so that no panic crosses the C
boundary, and publish results through `Box::into_raw`. `unsafe_code` is denied for the crate and
allowed only on that module; everywhere else in the workspace it is forbidden.

The Rust integration tests (`tests/api.rs`) call the exported functions through the `rlib` and
therefore allow `unsafe_code` too.
