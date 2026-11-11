# AGENTS.md — rglsl

> A Vulkan GLSL (450/460) → SPIR-V compiler in safe Rust, replacing glslang. Hard fork of naga 30.0.0.
> Out of scope: GLSL ES, other `#version`s, OpenGL semantics.

Read [docs/PLAN.md](docs/PLAN.md) before changing anything substantial: it defines the
goal, the language rules for linkage and `#include`, and the milestones (M0–M9).
[PROGRESS.md](PROGRESS.md) has the current numbers against glslang's corpus.

## Layout

| Path | What |
|---|---|
| `rglsl/` | the compiler: IR, GLSL frontend (`src/front/glsl`: lowering of `rglsl-sema`'s analysis to IR), validator, SPIR-V backend (`src/back/spv`, the only backend) |
| `rglsl-pp/` | GLSL preprocessor: macros, conditionals, `#include`, source map |
| `rglsl-ast/` | GLSL AST, parser and printer; shared by the compiler frontend and the fuzzer |
| `rglsl-sema/` | semantic analysis over the AST: scopes, types, built-ins, expression typing, diagnostics |
| `rglsl-link/` | the linker: merges object modules (`rglsl::object::ObjectModule`) into programs, object file format (`docs/design/linking.md`) |
| `tests/link/` | our own link tests: modules, `expect`, optional single-file `reference.*` for exec |
| `rglsl-fuzz/` | port of GraphicsFuzz's variant generator (Apache-2.0; see `docs/design/fuzzer.md`) |
| `rglsl-types/` | types shared by the rglsl crates (`ShaderStage`, ...) |
| `rglsl-cli/` | the `rglsl` command-line tool (to become `glslangValidator`-compatible in M9) |
| `rglsl-test/`, `rglsl/tests/` | upstream snapshot tests |
| `rglsl/xtask/` | snapshot validation (`cd rglsl && cargo xtask validate spv`) |
| `xtask/` | project automation: `cargo xtask oracles`, `cargo xtask test` |
| `oracles.toml` | pinned glslang / SPIRV-Tools / SPIRV-Headers commits, KosmicKrisp release and Amber commit (exec) |

## Rules

- **No comments.** Do not write comments in code (`//`, `///`, `/* */`), in tests or in
  scripts, unless the user explicitly asks for one. Names and structure carry the meaning;
  rationale goes in commit messages and `docs/`. Existing comments are left alone unless the
  user asks to remove them.
- **Safe Rust only.** `unsafe_code` is forbidden in every crate (workspace lints, and
  the `rglsl` crate's own `[lints]`). Do not add `allow(unsafe_code)`.
- **No panics on user input.** A crash in the corpus run is always a bug.
- **No `unwrap` or other panics in non-test code.** `unwrap`, `expect`, `panic!`,
  `unreachable!`, `unimplemented!` and `todo!` are denied by clippy in every crate; return a
  `Result` instead, and never a silent default that hides a broken invariant. Tests may use
  them (`clippy.toml`). The only exception is the arena handle overflow in
  `Handle::from_usize`, an allocation limit like `Vec::push`.
- The compiler is called **rglsl** everywhere (crates, binary, docs); "naga" only names
  the upstream project it was forked from.
- Keep the IR's style: arenas, typed handles, exhaustive `match`, `Result` errors.
- SPIR-V is the only output for now. Do not add other backends yet; a Metal (MSL) backend may
  come later. IR features must be expressible in SPIR-V; keep SPIR-V encodings (opcodes,
  decorations, capabilities, raw words) in `back/spv`, not in the IR, when that costs nothing.
- When changing code that came from upstream, record non-trivial deviations in
  [UPSTREAM.md](UPSTREAM.md).
- A change that moves corpus numbers must commit the regenerated `PROGRESS.md`
  (CI checks it is up to date).
- **Exec on both targets.** The final gate of every change is a full `cargo xtask test` that
  runs `exec` on both targets: KosmicKrisp on the Mac and the remote Windows target from
  `RGLSL_EXEC_REMOTE` (an SSH host alias; see README). A run that warns that the remote target
  was skipped is not a final gate. Never write host names, addresses or user names of the remote
  machine into the repository.

## Commands

```sh
cargo fmt --all -- --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace --all-features
cargo deny check

cargo xtask oracles [--glslang-dir ../glslang]     # build pinned glslang + spirv-val
RGLSL_EXEC_REMOTE=<alias> cargo xtask oracles --remote  # build the pinned Amber on the remote Windows target
RGLSL_EXEC_REMOTE=<alias> cargo xtask test [--glslang-dir ../glslang]
                                                   # final gate: corpus run with exec on the Mac and
                                                   # the remote Windows target, rewrites PROGRESS.md
cargo xtask test --filter NAME --no-progress-file  # quick local check
cargo xtask test --no-remote-exec | --no-local-exec | --no-exec   # per-target opt-outs (CI: --no-exec)
```

Per-shader results of the last corpus run: `target/xtask/results.tsv`.
