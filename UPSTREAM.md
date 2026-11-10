# Upstream

rglsl is a **hard fork** of [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga),
the shader translator of the gfx-rs/wgpu project (MIT OR Apache-2.0, see `LICENSE.MIT`
and `LICENSE.APACHE`). We do not rebase on upstream releases; useful upstream fixes are
cherry-picked and recorded below.

## Starting point

| | |
|---|---|
| Repository | https://github.com/gfx-rs/wgpu |
| Tag | `v30.0.0` |
| Commit | `8bf3e5ff4ab45e2c150e0d6c70d01d25f5b126c1` |
| Crates taken | `naga` (with `naga/fuzz`, `naga/hlsl-snapshots`, `naga/xtask`), `naga-types`, `naga-test`, `naga-cli` |

Everything else in the wgpu repository (wgpu, wgpu-core, wgpu-hal, examples, CTS
runner, ...) is not part of this project.

## Changes made while importing

- New workspace `Cargo.toml` with only the dependencies these crates need.
- `naga/src/front/mod.rs`: the `interpolator` module is also compiled for `glsl-in`
  (upstream builds it only for `spv-in`/`wgsl-in`, so `glsl-in` alone did not compile).
- `unsafe_code = "forbid"` in the workspace lints and in `naga`'s lints.
- `naga/xtask/src/jobserver.rs`: no longer inherits the parent's jobserver
  (`jobserver::Client::from_env` is `unsafe`); it always creates its own.
- Removed `naga/tests/naga/example_wgsl.rs`: it parsed wgpu's `examples/`, which are not
  part of the fork.

## Cherry-picked upstream commits

None yet.
