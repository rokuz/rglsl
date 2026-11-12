# rglsl

A Vulkan GLSL (`#version 450`/`460`) → SPIR-V compiler in safe Rust, meant as a replacement
for glslang (`glslangValidator`) in Vulkan projects. It is a hard fork of [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga)
(naga 30.0.0, see [UPSTREAM.md](UPSTREAM.md)).

It differs from glslang in two ways only, and adds no new syntax:

1. **Function linking across modules.** A function declared but not defined in a
   compilation unit is an external function; the unit compiles to an object module and
   the linker supplies the definition.
2. **`#include` works by default**, with no extension directive.

**Status:** early. The compiler is the forked naga IR and SPIR-V backend behind a new GLSL
frontend (`rglsl-pp` → `rglsl-ast` → `rglsl-sema` → lowering to IR), and the conformance
harness runs against glslang.
See [docs/PLAN.md](docs/PLAN.md) for the plan and milestones and [PROGRESS.md](PROGRESS.md)
for the current numbers against glslang's test corpus, and [docs/parity/](docs/parity/README.md)
for the feature-by-feature gap analysis against glslang.

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

### Renamed twins

rglsl always reserves the keywords of extensions (`demote`, `vector`, ...), also when the
extension is not enabled, where glslang leaves them names. glslang's sources are not modified,
so a test that uses such a word as a name is listed in
[xtask/corpus-renamed/renamed.toml](xtask/corpus-renamed/renamed.toml): the words it renames,
their new names, and why. Its twin `xtask/corpus-renamed/<name>` renames only those identifiers,
on the same lines, and replaces the original for glslang and for rglsl in every column
(`accept`, `diag`, `valid`, `interface`, `debug`, `exec`), compiled with the original's
options, stage and suite. `cargo xtask test` checks that every listed test has a twin and every
twin is listed, that the twin is the original with the renames applied and nothing else, and
that glslang gives the twin the original's verdict and error lines. The test's row in
`results.tsv` notes `renamed twin: vector → vector_`.

### Comparing interfaces (`interface`)

The `interface` column reflects our SPIR-V module and glslang's for every shader both accept
(`xtask/src/interface.rs`, a reader of the binary that ignores ids, names and debug
information) and compares entry points, execution modes, the local size with its
specialization constant ids, inputs and outputs (location, component, built-in, type,
interpolation and the other interface decorations), resources (set, binding, storage class,
type with array sizes, image dimensions, format and sampling, block layout: offsets, strides,
matrix layout), push constants, ray tracing and task payloads, and specialization constants
(ids, types, defaults). Every mismatch is listed in `target/xtask/results.tsv` (`interface`,
`interface_note`) and in the terminal summary. Deliberate differences from glslang are listed,
with the reason, in `xtask/interface-expected.toml`: a mismatch on one of the keys an entry
names for a shader counts as expected and is reported as such.

### Running shaders (`exec`)

The `exec` column runs our module and glslang's on a Vulkan driver and compares what they
write. The driver is [KosmicKrisp](https://docs.mesa3d.org/drivers/kosmickrisp.html), Mesa's
Vulkan driver on Metal, so `exec` needs macOS on Apple silicon. The modules are run by our fork
of [Amber](https://github.com/google/amber), [rokuz/amber](https://github.com/rokuz/amber)
(branch `rglsl`), which adds mesh shading pipelines (EXT and NV), shader record data, NV ray
tracing pipelines and acceleration structures, motion blur pipelines and scenes, buffer device
addresses written into other buffers (`BUFFER_ADDRESS`), transform feedback buffers
(`AS transform_feedback`), input attachments (`AS input_attachment`), image arrays, cube and
cube-array images (`DIM_1D_ARRAY`, `DIM_2D_ARRAY`, `DIM_CUBE`, `DIM_CUBE_ARRAY`), multisampled
images filled and read per sample, multiview rendering (`MULTIVIEW`), and the device features
the mesh and ray tracing stages, float and 64-bit image atomics, multiview, transform feedback,
expect/assume, replicated composites, compute derivatives (also in mesh and task shaders),
subgroup rotate and partitioned operations, quad control, fragment shader interlock, image
footprints, fragment density maps, shading rate images and relaxed extended instructions need,
and tensors (`TENSOR`, `AS tensor`, `VK_ARM_tensors`). Tensor shaders run through Arm's
[ML Emulation Layer for Vulkan](https://github.com/arm/ai-ml-emulation-layer-for-vulkan), which
implements `VK_ARM_tensors` on any Vulkan 1.3 driver; Amber loads its library directly
(`--layer-library`), without a manifest or environment variable, for the scripts that use
tensors ([docs/design/tensors.md](docs/design/tensors.md)). All three are pinned in
`oracles.toml` and installed by
`cargo xtask oracles`: it downloads the prebuilt KosmicKrisp release, checks its sha256, unpacks
it into `target/oracles/kosmickrisp/` with an ICD manifest that points at the driver by absolute
path, builds Amber against that loader and the emulation layer's tensor library, and prints the
Vulkan device it finds. Requirements:
`cmake`, `ninja` (optional), `python3`, `curl`, `unzip`, `shasum`, and Homebrew's `spirv-tools`
(`brew install spirv-tools`), which the prebuilt driver links against.

```sh
cargo xtask oracles --exec-only          # install only KosmicKrisp, Amber and the tensor layer
cargo xtask test --no-exec               # skip exec; PROGRESS.md keeps the last exec results
cargo xtask fuzz --shaders DIR --exec    # metamorphic check of rglsl-fuzz shader families
cargo xtask fuzz --libfuzzer glsl_variant --time 1800   # coverage-guided variants (cargo-fuzz)
```

On other platforms `cargo xtask oracles` skips the exec oracles and `cargo xtask test` needs
`--no-exec`. `RGLSL_AMBER`, `RGLSL_VK_ICD` and `RGLSL_TENSOR_LAYER` select another Amber binary,
driver manifest or tensor layer library. `RGLSL_AMBER_SRC=<dir>` makes `cargo xtask oracles`
(also with `--remote`, which uploads the sources) build Amber from a local working copy instead
of the pinned commit, to try Amber changes before they are committed.
Scripts, inputs and dumps of the last run are kept in `target/xtask/exec/<target>/<shader>/`.

#### Remote Windows targets

More exec targets run the same scripts on real GPUs: Windows machines with a Vulkan driver,
reached over SSH. `RGLSL_EXEC_REMOTE` lists them, separated by commas: each entry is an SSH host
alias configured in your `~/.ssh/config` with key authentication (`ssh -o BatchMode=yes ALIAS
cmd` must work; the remote shell is `cmd.exe`), optionally followed by `@` and a device filter
for a machine with several GPUs. Amber then runs on the first Vulkan device whose name contains
the filter, ignoring case (its `--device-name` option; without a filter it takes the first device
that supports the script). The device is chosen inside Amber because the Vulkan loader ignores
`VK_DRIVER_FILES` and `VK_LOADER_DRIVERS_SELECT` in the elevated sessions an administrator gets
over SSH. One machine may appear twice with different filters. Each machine needs Visual Studio
with the C++ tools (found with `vswhere`), the Vulkan SDK (`VULKAN_SDK`), Git and Python 3 on
`PATH`.

```sh
export RGLSL_EXEC_REMOTE=gpu-box,big-box@NVIDIA   # your aliases; never commit them
cargo xtask oracles --remote               # clone and build the pinned Amber and the ML
                                           # emulation layer on every machine in parallel,
                                           # then smoke check every target
cargo xtask test                           # exec on the Mac and every remote target, in parallel
cargo xtask test --no-remote-exec          # Mac only
cargo xtask fuzz --shaders DIR --exec --exec-target big-box@NVIDIA   # one target
```

Each target is named after the GPU it reports, never after the alias: `amd`, `nvidia`, `intel`,
... from the device and driver names, or the GPU's full name (`amd-radeon-rx-9060-xt`) when two
targets share a vendor. The name labels the target's column in `PROGRESS.md` (`exec nvidia`), in
`target/xtask/results.tsv` (`exec_nvidia`, `exec_nvidia_note`) and in the terminal summary; the
driver-bug lists in `xtask/exec-drivers/` apply by driver name.

Everything stays in one directory on each machine (`C:/rglsl-exec`): sources, build, and per-run
batches that are deleted when a run ends. Nothing is installed system-wide: the tensor layer is
a library next to `amber.exe` that Amber loads itself, because the loader ignores
`VK_ADD_LAYER_PATH` in the elevated session.
`RGLSL_EXEC_REMOTE_DIR` changes that directory and `RGLSL_EXEC_REMOTE_JOBS` bounds the Amber
processes running at once on a machine (default 4); both take one value for every machine or a
comma-separated list of `alias=value` entries with an optional plain default, e.g.
`RGLSL_EXEC_REMOTE_DIR=C:/rglsl-exec,gpu-box=D:/exec`. When `RGLSL_EXEC_REMOTE` is not set,
`cargo xtask test` and `cargo xtask fuzz --exec` warn that the remote targets were skipped, and
`PROGRESS.md` keeps their last results. A run that reaches at least one remote target replaces
every remote column with the targets it ran.

## Command line

`rglsl` takes `glslangValidator`'s command lines for Vulkan GLSL: the same options, output
names, exit codes and message format ([docs/design/cli.md](docs/design/cli.md)).

```sh
cargo run -p rglsl-cli -- -V shader.frag                       # writes frag.spv
rglsl -V --target-env vulkan1.2 -o shader.spv shader.comp
rglsl -V --amb --aml -DQUALITY=2 -Iinclude -g -o out.spv shader.frag
rglsl -V --vn shader_words -o shader.h shader.vert              # C header
rglsl -V --sub 10 --stb frag 20 --rsb 1 shader.frag             # binding shifts, set
rglsl -E shader.frag                                            # preprocess only
rglsl shader.frag                                               # validate only
```

Supported: `-V`, `-H`, `-S`, `-o`, `-e`, `--sep`, `-D`/`-U`, `-I`, `--target-env`, `-x`/`--vn`,
`-g`/`-g0`/`-gV`/`-gVS`, `-l`, `-E`, `--amb`/`--aml`, `--shift-*-binding`, `--rsb`, `--ku`,
`--hlsl-offsets`, `--stdin`, `--depfile`, `--quiet`, `-s`, `--error-column`, `--absolute-path`,
`-v`; `-O*`, `-C`, `-t`, `-i`, `-r`, `-w`, `--spirv-val` are accepted. OpenGL, HLSL, other GLSL
versions, reflection (`-q`), preamble text and resource limit files are usage errors. Exit codes
are glslang's: 1 usage, 2 compile, 3 link. `cargo xtask cli` compares rglsl with glslang on
glslangValidator command lines.

### Linking

A function declared without a body is an import; any number of files can be compiled and linked
into one program. Files with a stage extension (`.vert`, `.frag`, `.comp`, ...) are modules of
that stage and may leave out `main`; `.glsl` files are libraries, which have no stage and link
into a program of any stage.

```sh
rglsl -V main.frag lighting.glsl noise.glsl -o shader.spv      # compile and link in one step
rglsl --object lighting.glsl                                   # writes lighting.rglo
rglsl -V main.frag lighting.rglo -o shader.spv                 # link object modules
rglsl -V scene.vert scene.frag common.glsl                     # one program, vert.spv and frag.spv
```

Debug information uses glslangValidator's options: `-g` (`OpLine`, `OpSource` with the
sources of the main and included files), `-gV` (`NonSemantic.Shader.DebugInfo`), `-gVS` (with
the source text) and `-g0` (no names); it survives object files and linking
([docs/design/debug-info.md](docs/design/debug-info.md)).

`-IDIR` adds an include directory; `#include` needs no extension directive. Link errors are
glslang's (missing or duplicate definitions, mismatched globals, contradictory layouts); see
[docs/design/linking.md](docs/design/linking.md).

## License

MIT OR Apache-2.0, like naga.
