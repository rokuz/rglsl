# AGENTS.md — rglsl

> A Vulkan GLSL (450/460) → SPIR-V compiler in safe Rust, replacing glslang. Hard fork of naga 30.0.0.
> Out of scope: GLSL ES, other `#version`s, OpenGL semantics.

Read [docs/PLAN.md](docs/PLAN.md) before changing anything substantial: it defines the
goal, the language rules for linkage and `#include`, and the milestones (M0–M9).
[PROGRESS.md](PROGRESS.md) has the current numbers against glslang's corpus.

## Layout

| Path | What |
|---|---|
| `naga/` | the compiler: IR, GLSL frontend (`src/front/glsl`), validator, SPIR-V backend (`src/back/spv`, the only backend) |
| `naga-types/` | types shared by naga (`ShaderStage`, ...) |
| `naga-cli/` | upstream naga CLI (to become the `glslangValidator`-compatible tool in M9) |
| `naga-test/`, `naga/tests/` | upstream snapshot tests |
| `naga/xtask/` | upstream snapshot validation (`cd naga && cargo xtask validate spv`) |
| `xtask/` | project automation: `cargo xtask oracles`, `cargo xtask test` |
| `oracles.toml` | pinned glslang / SPIRV-Tools / SPIRV-Headers commits |

## Rules

- **Safe Rust only.** `unsafe_code` is forbidden in every crate (workspace lints, and
  `naga`'s own `[lints]`). Do not add `allow(unsafe_code)`.
- **No panics on user input.** A crash in the corpus run is always a bug.
- Keep naga's style: arenas, typed handles, exhaustive `match`, `Result` errors.
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
