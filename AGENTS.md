# AGENTS.md — rglsl

> A Vulkan GLSL (450/460) → SPIR-V compiler in safe Rust, replacing glslang. Hard fork of naga 30.0.0.
> Out of scope: GLSL ES, other `#version`s, OpenGL semantics.

Read [docs/PLAN.md](docs/PLAN.md) before changing anything substantial: it defines the
goal, the language rules for linkage and `#include`, and the milestones (M0–M9).
[PROGRESS.md](PROGRESS.md) has the current numbers against glslang's corpus.

## Layout

| Path | What |
|---|---|
| `rglsl/` | the compiler: IR, GLSL frontend (`src/front/glsl`), validator, SPIR-V backend (`src/back/spv`, the only backend) |
| `rglsl-types/` | types shared by the rglsl crates (`ShaderStage`, ...) |
| `rglsl-cli/` | the `rglsl` command-line tool (to become `glslangValidator`-compatible in M9) |
| `rglsl-test/`, `rglsl/tests/` | upstream snapshot tests |
| `rglsl/xtask/` | snapshot validation (`cd rglsl && cargo xtask validate spv`) |
| `xtask/` | project automation: `cargo xtask oracles`, `cargo xtask test` |
| `oracles.toml` | pinned glslang / SPIRV-Tools / SPIRV-Headers commits |

## Rules

- **No comments.** Do not write comments in code (`//`, `///`, `/* */`), in tests or in
  scripts, unless the user explicitly asks for one. Names and structure carry the meaning;
  rationale goes in commit messages and `docs/`. Existing comments are left alone unless the
  user asks to remove them.
- **Safe Rust only.** `unsafe_code` is forbidden in every crate (workspace lints, and
  the `rglsl` crate's own `[lints]`). Do not add `allow(unsafe_code)`.
- **No panics on user input.** A crash in the corpus run is always a bug.
- The compiler is called **rglsl** everywhere (crates, binary, docs); "naga" only names
  the upstream project it was forked from.
- Keep the IR's style: arenas, typed handles, exhaustive `match`, `Result` errors.
- SPIR-V is the only output. Do not add other backends; IR features need only be
  expressible in SPIR-V.
- When changing code that came from upstream, record non-trivial deviations in
  [UPSTREAM.md](UPSTREAM.md).
- A change that moves corpus numbers must commit the regenerated `PROGRESS.md`
  (CI checks it is up to date).

## Commands

```sh
cargo fmt --all -- --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace --all-features
cargo deny check

cargo xtask oracles [--glslang-dir ../glslang]     # build pinned glslang + spirv-val
cargo xtask test [--glslang-dir ../glslang]        # corpus run, rewrites PROGRESS.md
cargo xtask test --filter NAME --no-progress-file  # quick local check
```

Per-shader results of the last corpus run: `target/xtask/results.tsv`.
