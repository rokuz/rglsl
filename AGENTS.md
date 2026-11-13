# AGENTS.md — rglsl

> A Vulkan GLSL (450/460) → SPIR-V compiler in safe Rust, replacing glslang. Hard fork of naga 30.0.0.
> Out of scope: GLSL ES, other `#version`s, OpenGL semantics.

If `AGENTS.local.md` exists, read it too: it has the maintainers' local workflow.

## Layout

| Path | What |
|---|---|
| `rglsl/` | the compiler: IR, GLSL frontend (`src/front/glsl`: lowering of `rglsl-sema`'s analysis to IR), validator, SPIR-V backend (`src/back/spv`, the only backend) |
| `rglsl-pp/` | GLSL preprocessor: macros, conditionals, `#include`, source map |
| `rglsl-ast/` | GLSL AST, parser and printer; shared by the compiler frontend and the fuzzer |
| `rglsl-sema/` | semantic analysis over the AST: scopes, types, built-ins, expression typing, diagnostics |
| `rglsl-link/` | the linker: merges object modules (`rglsl::object::ObjectModule`) into programs, object file format |
| `tests/link/` | link tests: modules, `expect`, optional single-file `reference.*` for exec |
| `tests/exec/` | exec tests with expected values (cooperative matrices and vectors, tensors, barycentrics) |
| `rglsl-fuzz/` | port of GraphicsFuzz's variant generator and reducer (Apache-2.0) |
| `rglsl-fuzz/fuzz/` | the cargo-fuzz targets (crate `rglsl-libfuzzer`): `glsl_parser`, `ir`, `object`, `glsl_variant` |
| `rglsl-types/` | types shared by the rglsl crates (`ShaderStage`, ...) |
| `rglsl-cli/` | the `rglsl` command-line tool, `glslangValidator`-compatible for Vulkan GLSL |
| `rglsl-test/`, `rglsl/tests/` | upstream snapshot tests |
| `rglsl/xtask/` | snapshot validation (`cd rglsl && cargo xtask validate spv`) |
| `xtask/` | project automation: `cargo xtask oracles`, `cargo xtask test`, `cargo xtask cli`, `cargo xtask fuzz` |
| `oracles.toml` | pinned glslang / SPIRV-Tools / SPIRV-Headers, KosmicKrisp, Amber and the ML emulation layer |

## Rules

- **No comments.** Do not write comments in code (`//`, `///`, `/* */`), in tests or in
  scripts, unless explicitly asked. Names and structure carry the meaning; rationale goes in
  commit messages. Existing comments are left alone unless asked to remove them.
- **Safe Rust only.** `unsafe_code` is forbidden in every crate (workspace lints, and
  the `rglsl` crate's own `[lints]`). Do not add `allow(unsafe_code)`.
- **No panics on user input.** A crash in the corpus run is always a bug.
- **No recursion over input structure.** A stack overflow aborts the process. Every pass —
  preprocessor, AST, sema, lowering, fuzzer, IR (`Block` drop and clone), `proc`, compaction,
  validator, uniformity analysis, SPIR-V backend, linker, object files — walks nesting with
  loops, work lists, or `async` functions driven by `rglsl_types::stack` (every recursive call
  through `Stack::call`), so its stack use is constant. Recursion is fine only over structure
  bounded by a small constant (vector sizes, matrix columns). There are no artificial nesting
  limits; only glslang's preprocessor limits (macro expansion depth 200, `#if` nesting 65) are
  kept for parity. `rglsl-link/tests/nesting.rs` runs the whole pipeline at 10,000 levels on a
  256 KiB debug stack in `cargo test`, and at 100,000 levels in release behind `--ignored` (CI
  runs it): add a case for every new kind of nesting, and replace a scan per level (quadratic
  at depth) with an index or a memo.
- **No `unwrap` or `expect` anywhere, no other panics in non-test code.** `unwrap`, `expect`,
  `panic!`, `unreachable!`, `unimplemented!` and `todo!` are denied by clippy in every crate;
  return a `Result` instead, and never a silent default that hides a broken invariant.
  `unwrap`/`expect` (and `unwrap_err`/`expect_err`) are banned in tests too (`clippy.toml`):
  tests and their helpers return `Result` and use `?`, an `Option` becomes an error with
  `ok_or`/`context` or a `let ... else`, and `unwrap_or_else(|| panic!(..))` is no way around
  it. Tests may still fail with `assert!`/`panic!`. The only exception is the arena handle
  overflow in `Handle::from_usize`, an allocation limit like `Vec::push`.
- The compiler is called **rglsl** everywhere (crates, binary, docs); "naga" only names
  the upstream project it was forked from.
- Keep the IR's style: arenas, typed handles, exhaustive `match`, `Result` errors.
- SPIR-V is the only output for now. Do not add other backends yet. IR features must be
  expressible in SPIR-V; keep SPIR-V encodings (opcodes, decorations, capabilities, raw words)
  in `back/spv`, not in the IR, when that costs nothing.
- What glslang turns into SPIR-V that Vulkan does not allow is rejected with a short, clear
  error ("<thing> is not supported: <reason>"), never silently replaced by something else.

## Commands

```sh
cargo fmt --all -- --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
RUSTFLAGS="--cfg fuzzing" cargo clippy -p rglsl-libfuzzer --all-targets -- -D warnings
cargo test --workspace --all-features
cargo test --release -p rglsl-link --test nesting -- --ignored   # 100,000-level nesting
cargo deny check

cargo xtask oracles [--glslang-dir ../glslang] [--no-exec]   # pinned glslang, spirv-val (+ exec oracles)
cargo xtask test [--glslang-dir ../glslang] [--no-exec]      # glslang's corpus (+ exec on the local GPU)
cargo xtask test --filter NAME --no-progress-file            # quick check of some shaders
cargo xtask cli [--glslang-dir ../glslang]                   # glslangValidator command lines: rglsl vs glslang
cargo xtask fuzz --shaders DIR [--exec]                      # differential fuzzing against glslang (+ exec)
cargo xtask fuzz --libfuzzer TARGET [--time SECS] [--jobs N] # cargo +nightly fuzz run
cargo xtask fuzz --decode INPUT                              # glsl_variant input -> shader family
cargo xtask fuzz --reduce JOB.json --interesting K           # GraphicsFuzz reducer
```

Per-shader results of the last corpus run: `target/xtask/results.tsv`. Fuzzer findings of every
mode: `target/xtask/fuzz/`.
