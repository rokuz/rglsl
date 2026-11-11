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

#### The remote Windows target

A second exec target runs the same scripts on a real GPU: a Windows machine with a Vulkan
driver, reached over SSH. Set `RGLSL_EXEC_REMOTE` to an SSH host alias of a Windows machine with
Vulkan, configured in your `~/.ssh/config` with key authentication (`ssh -o BatchMode=yes ALIAS
cmd` must work; the remote shell is `cmd.exe`). The machine needs Visual Studio with the C++
tools (found with `vswhere`), the Vulkan SDK (`VULKAN_SDK`), Git and Python 3 on `PATH`.

```sh
export RGLSL_EXEC_REMOTE=my-windows-gpu    # your alias; never commit it
cargo xtask oracles --remote               # clone and build the pinned Amber there, smoke check
cargo xtask test                           # exec on both targets
cargo xtask test --no-remote-exec          # Mac only
```

Everything stays in one directory on that machine (`C:/rglsl-exec`, or
`RGLSL_EXEC_REMOTE_DIR`): sources, build, and per-run batches that are deleted when a run
ends. Nothing is installed system-wide. `RGLSL_EXEC_REMOTE_JOBS` bounds the Amber processes
running there at once (default 4). When `RGLSL_EXEC_REMOTE` is not set, `cargo xtask test` and
`cargo xtask fuzz --exec` warn that the remote target was skipped, and `PROGRESS.md` keeps its
last remote results.

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
