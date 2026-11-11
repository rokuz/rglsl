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

### Running shaders (`exec`)

The `exec` column runs our module and glslang's on a Vulkan driver and compares what they
write. The driver is [KosmicKrisp](https://docs.mesa3d.org/drivers/kosmickrisp.html), Mesa's
Vulkan driver on Metal, so `exec` needs macOS on Apple silicon. The modules are run by our fork
of [Amber](https://github.com/google/amber), [rokuz/amber](https://github.com/rokuz/amber)
(branch `rglsl`), which adds mesh shading pipelines, shader record data and the device features
the mesh and ray tracing stages need. Both are pinned in `oracles.toml` and installed by
`cargo xtask oracles`: it downloads the prebuilt KosmicKrisp release, checks its sha256, unpacks
it into `target/oracles/kosmickrisp/` with an ICD manifest that points at the driver by absolute
path, builds Amber against that loader, and prints the Vulkan device it finds. Requirements:
`cmake`, `ninja` (optional), `python3`, `curl`, `unzip`, `shasum`, and Homebrew's `spirv-tools`
(`brew install spirv-tools`), which the prebuilt driver links against.

```sh
cargo xtask oracles --exec-only          # install only KosmicKrisp and Amber
cargo xtask test --no-exec               # skip exec; PROGRESS.md keeps the last exec results
cargo xtask fuzz --shaders DIR --exec    # metamorphic check of rglsl-fuzz shader families
```

On other platforms `cargo xtask oracles` skips the exec oracles and `cargo xtask test` needs
`--no-exec`. `RGLSL_AMBER` and `RGLSL_VK_ICD` select another Amber binary or driver manifest.
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
cargo xtask oracles --remote               # clone and build the pinned Amber on every machine
                                           # in parallel, then smoke check every target
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
batches that are deleted when a run ends. Nothing is installed system-wide.
`RGLSL_EXEC_REMOTE_DIR` changes that directory and `RGLSL_EXEC_REMOTE_JOBS` bounds the Amber
processes running at once on a machine (default 4); both take one value for every machine or a
comma-separated list of `alias=value` entries with an optional plain default, e.g.
`RGLSL_EXEC_REMOTE_DIR=C:/rglsl-exec,gpu-box=D:/exec`. When `RGLSL_EXEC_REMOTE` is not set,
`cargo xtask test` and `cargo xtask fuzz --exec` warn that the remote targets were skipped, and
`PROGRESS.md` keeps their last results. A run that reaches at least one remote target replaces
every remote column with the targets it ran.

## Command line

```sh
cargo run -p rglsl-cli -- shader.frag shader.spv
cargo run -p rglsl-cli -- --auto-map-bindings --auto-map-locations shader.frag shader.spv
```

`--auto-map-bindings` and `--auto-map-locations` assign missing bindings and locations the way
glslang's options of the same names do.

### Linking

A function declared without a body is an import; any number of files can be compiled and linked
into one program. Files with a stage extension (`.vert`, `.frag`, `.comp`, ...) are modules of
that stage and may leave out `main`; `.glsl` files are libraries, which have no stage and link
into a program of any stage.

```sh
rglsl --link main.frag lighting.glsl noise.glsl -o shader.spv   # compile and link in one step
rglsl --object lighting.glsl                                   # writes lighting.rglo
rglsl --link main.frag lighting.rglo -o shader.spv             # link object modules
rglsl --link scene.vert scene.frag common.glsl                 # one program, vert.spv and frag.spv
```

`-I DIR` adds an include directory; `#include` needs no extension directive. Link errors are
glslang's (missing or duplicate definitions, mismatched globals, contradictory layouts); see
[docs/design/linking.md](docs/design/linking.md).

## License

MIT OR Apache-2.0, like naga.
