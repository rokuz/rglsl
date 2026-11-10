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
| Crates taken | `naga` (with `naga/fuzz`, `naga/xtask`), `naga-types`, `naga-test`, `naga-cli` |

Everything else in the wgpu repository (wgpu, wgpu-core, wgpu-hal, examples, CTS
runner, ...) is not part of this project.

## Renamed

The compiler is called rglsl. The crates and directories were renamed after the import:
`naga` → `rglsl`, `naga-types` → `rglsl-types`, `naga-test` → `rglsl-test`, `naga-cli` →
`rglsl-cli` (binary `rglsl`), `naga-xtask` → `snapshot-xtask`. Paths below use the upstream
names where they describe what was taken, and the current names otherwise. The upstream
changelog was dropped; see upstream for the history before the fork.

## Changes made while importing

- New workspace `Cargo.toml` with only the dependencies these crates need.
- `unsafe_code = "forbid"` in the workspace lints and in the `rglsl` crate's lints.
- `rglsl/xtask/src/jobserver.rs`: no longer inherits the parent's jobserver
  (`jobserver::Client::from_env` is `unsafe`); it always creates its own.
- Removed `naga/tests/naga/example_wgsl.rs`: it parsed wgpu's `examples/`, which are not
  part of the fork.

## Removed from upstream

- **All backends except SPIR-V**: `back/{msl,hlsl,glsl,wgsl,dot}`, `back/continue_forward.rs`,
  the crate features `msl-out`, `hlsl-out`, `glsl-out`, `wgsl-out`, `dot-out` (and the
  `*-if-target-*` variants), the `naga-types` modules `glsl`, `hlsl`, `msl`, and the
  `hlsl-snapshots` crate.
- Helpers only those backends used: `proc::Namer` and `NameKey`, `proc::KeywordSet`, the
  WGSL keyword sets, `RacyLock` (and the `once_cell` dependency), `back::FunctionCtx`,
  `back::Level`, `Baked`, `proc::index::{find_checked_indexes, access_needs_check,
  bounds_check_iter, oob_local_types}`.
- Snapshot tests: outputs and parameters for the removed backends, the `Targets` flags for
  them, and the SPIRV-Cross step (`*.spvasm.glsl`). GLSL and SPIR-V inputs now produce
  SPIR-V snapshots (they used to produce WGSL).
- `naga-cli`: the output formats and options of the removed backends. `naga-xtask`: every
  `validate` subcommand except `spv`.

- **The WGSL frontend** (`front/wgsl`, the `wgsl-in` feature), the shared WGSL helpers
  (`common/wgsl`, `keywords`), its fuzz target and its tests (`wgsl_errors.rs`, the
  WGSL-based tests in `validation.rs` and `spirv_capabilities.rs`). The validator and the
  constant evaluator still contain WGSL-shaped rules and abstract types; they are removed as
  they get in the way.
- Upstream's 165 WGSL snapshot inputs were converted to serialized IR (`rglsl/tests/in/ir/*.ron`)
  with the WGSL frontend before it was removed, so the SPIR-V backend keeps that coverage.
  The 24 snapshots that embedded the WGSL source as debug information lost it.

- **The GLSL frontend's parser and one-pass lowering** (`front/glsl/{lex,token,ast,parser,
  parser/*,parser_tests,context,functions,builtins,types,variables}.rs`), the
  `ShaderMetadata`, `Profile`, `Precision`, `TokenValue` and `ExpectedToken` types,
  `Frontend::metadata`, the `ErrorKind` variants only that parser produced, and the `pp-rs`
  dependency. The frontend is now `rglsl-pp` → `rglsl-ast` → `rglsl-sema` →
  `front/glsl/lower` (`docs/design/lowering.md`). Kept from upstream: `Options` (with
  `Options::from(stage)`), `Frontend::parse`, `Error`, `ErrorKind` (`Unsupported`, `Syntax`,
  `SemanticError`, `InternalError`), `ParseErrors` with its emitters, and the block layout
  computation of `offset.rs` (now `front/glsl/lower/offset.rs`).
- Upstream's GLSL snapshot inputs without a `#version`, or with `#version 440`, now declare
  `#version 450`; `declarations.frag` (a fragment output block, which GLSL rejects) was
  deleted.

## Deviations from upstream behaviour

Changes to shared code (IR, validator, SPIR-V backend) that make it differ from naga.

- **Index built-ins may be signed.** The validator accepts `i32` as well as `u32` for
  `VertexIndex`, `InstanceIndex`, `BaseVertex`, `BaseInstance`, `DrawIndex`, `PrimitiveIndex`,
  `SampleIndex` and `ViewIndex` (`valid/interface.rs`). GLSL declares them as `int`.
- **Depth-comparison sampling accepts any level.** `ImageSample` with a `depth_ref` may use
  `Exact` (with a float level), `Gradient` or `Bias`; `Bias` is allowed for every
  non-multisampled image. The errors `InvalidDepthSampleLevel` and
  `InvalidSampleLevelBiasDimension` are removed (`valid/expression.rs`, `back/spv/image.rs`).
- **`flat` is required on fragment inputs only**, for integers and doubles; vertex and mesh
  outputs need no interpolation qualifier (`valid/interface.rs`).
- **Write-only storage buffers are valid** (`StorageAddressSpaceWriteOnlyNotSupported` is
  removed), **integer textures can be sampled**, and **clip distances may be fragment inputs**.
- **Block layout is the front end's.** `StructMember::matrix_layout` (new) carries the
  stride and majorness of a matrix member; the SPIR-V backend emits it as `MatrixStride` and
  `RowMajor`/`ColMajor` and does not apply its std140 compatibility rewriting of two-row
  matrices to such members. The validator no longer checks offsets, strides and spans against
  WGSL alignment rules (`Disalignment::{ArrayStride, StructSpan, MemberOffset,
  MemberOffsetAfterStruct}` are removed); it checks only that members and array elements do
  not overlap.
- **Stage inputs and outputs can be global variables** (`AddressSpace::Input`/`Output`,
  `GlobalVariable::io`, `EntryPoint::interface`, and `component`/`invariant`/`patch` on
  `Binding::Location`); see `docs/design/stage-io.md`. A vertex shader need not return a
  position. Locations are limited to 4096.
- **Interface blocks.** An `Input`/`Output` global whose type is a struct, or an array of
  structs, with member bindings is a block (`proc::interface_block`): the validator checks each
  member like a variable, plus block rules (`valid/interface.rs`), and the SPIR-V backend
  decorates the struct `Block` with the bindings on the members (`back/spv/writer.rs`,
  `write_interface_block`). Upstream cannot express stage blocks.
- **Layout decorations only on buffer contents.** The SPIR-V backend decorates a type with
  `Offset`, `ArrayStride` and `MatrixStride` only if it is stored in a uniform buffer, a
  storage buffer or push constants; upstream decorates every struct and array.
- **`MathFunction::Outer` typing.** `outer(c, r)` has one row per component of `c` and one
  column per component of `r`, as in GLSL and SPIR-V; upstream had them swapped
  (`proc/overloads/mathfunction.rs`).
- **Default interpolation keeps an explicit sampling** (`front/interpolator.rs`).
- **Cull distances are supported by the SPIR-V backend** (`Capabilities::CULL_DISTANCE` is in
  `back::spv::supported_capabilities`): every vertex shader declares `gl_PerVertex` with
  `gl_CullDistance`, as glslang does.
- **Combined image samplers.** `TypeInner::SampledImage { dim, arrayed, class }` (new) is a
  handle type (`OpTypeSampledImage`), valid in the `Handle` address space, in binding arrays
  and as a function argument. `ImageSample::sampler` is optional: `None` samples a
  `SampledImage` directly; `ImageLoad` and `ImageQuery` accept one, and the SPIR-V backend
  extracts the image with `OpImage`. A call passes an element of a binding array of handles
  by pointer (`OpAccessChain`), as handle arguments are pointers.
- **Transform feedback.** `EntryPoint::transform_feedback` (new) adds the `TransformFeedback`
  capability and the `Xfb` execution mode; `GlobalVariable::xfb` (new, `XfbBinding`) is emitted
  as `XfbBuffer`, `XfbStride` and `Offset` on the variable, and `StructMember::xfb_offset` (new)
  as `Offset` on a member of an interface block. The validator allows `xfb` only on `Output`
  globals.
- **No automatic `NonUniform`.** The SPIR-V backend no longer decorates accesses to binding
  arrays indexed by a non-uniform value with `NonUniform` (and no longer requires
  `ShaderNonUniform`); glslang emits them only for `nonuniformEXT`.
  `Writer::decorate_non_uniform_binding_array_access` remains for an explicit request.
- **Buffer blocks decorate their own struct.** A `Uniform`, `Storage` or `Immediate` global
  of struct type is not wrapped in another struct: the struct itself (or its std140-compatible
  variant) is decorated `Block`, as glslang does, unless another type contains the struct
  (`back/spv/helpers.rs`, `global_needs_wrapper`). Only globals of other types are wrapped.
- **Resources may share a binding.** The validator no longer rejects two resources of an entry
  point with the same group and binding (`EntryPointError::BindingCollision` is gone): glslang
  accepts them for Vulkan, where descriptor aliasing is legal.
- **Buffer images.** `ImageDimension::Buffer` (new) is `OpTypeImage Buffer` with the
  `SampledBuffer` or `ImageBuffer` capability. The validator allows it only non-arrayed,
  single-sampled and not depth, addresses it with a scalar integer, and gives it no levels: a
  load has no level and the size query has no level (`OpImageQuerySize`); it cannot be sampled
  or gathered.
- **Non-constant sample offsets.** `ImageSample::offset` may be any expression, not only a
  const-expression; the SPIR-V backend emits a constant one as `ConstOffset` and another as
  `Offset` with the `ImageGatherExtended` capability, as glslang does.
- **8-bit integers.** `Literal::I8`/`U8` and `Scalar::I8`/`U8` exist; the validator accepts
  width 1 for integers (behind `SHADER_INT16`), the constant evaluator folds them, overload
  resolution knows them (`proc/overloads/scalar_set.rs`), and the SPIR-V backend writes them.
- **Sized types are not restricted to WGSL rules.** The constant evaluator casts between
  64-bit and every other scalar instead of failing, and converts `f16` without `unwrap`
  (saturating like `as`). 8- and 16-bit types are allowed in immediates (push constants),
  overrides may be 8- and 64-bit integers, and derivatives accept `f16`
  (`valid/type.rs`, `valid/mod.rs`, `valid/expression.rs`).
- **`frexp` exponents are `i32`** for every float width, as SPIR-V's `FrexpStruct` requires
  (`front/type_gen.rs`); upstream used an exponent as wide as the fraction.
- **`FindUMsb`/`FindSMsb` for every integer width** in the SPIR-V backend instead of an
  `unreachable!` for non-32-bit arguments (the GLSL front end widens them first).
- **Capabilities of 8- and 16-bit types by use.** With
  `WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE` the SPIR-V backend does not request
  `Float16`/`Int16`/`Int8` and the storage capabilities when a type is declared; it derives
  them after writing the module, as glslang does (`back/spv/small_types.rs`): storage
  capabilities from the storage class of each variable, arithmetic capabilities from the
  instructions that use the types.
- **GLSL constant folding follows glslang** (`proc/constant_evaluator.rs`, GLSL behaviour):
  built-ins outside their domain or overflowing fold to NaN or infinity (`asin`, `acos`,
  `acosh`, `atanh`, `log`, `log2`, `sqrt`, `pow`, `exp`, `exp2`, `sinh`, `cosh`, `degrees`,
  `dot`, `length`, `normalize`), `clamp` is `min(max(x, low), high)` even when `low > high`,
  32-bit shifts use the amount modulo 32, and integer division and remainder by zero give
  `0x7FFFFFFF`/`0xFFFFFFFF` and the dividend. A math function the evaluator cannot fold (for
  example on `f64`) stays a run-time expression. Float literals may be NaN or infinite, and the
  validator no longer rejects constant shift amounts at least as wide as the operand or a
  constant zero divisor (SPIR-V leaves both undefined).
- **Extended integer arithmetic.** `MathFunction::{AddCarry, SubBorrow, MulExtended}` (new)
  return `PredeclaredType::WideResult` (new, a `{ low, high }` struct) and are written as
  `OpIAddCarry`, `OpISubBorrow` and `OpUMulExtended`/`OpSMulExtended`. `Refract` also accepts
  scalars.
- **Specialization constants.** The SPIR-V backend writes overrides instead of rejecting them
  (`back/spv/specialization.rs`): an override with an id is `OpSpecConstant[True/False]` with
  `SpecId` and its literal default; an override without an id is its initializer; an
  override-dependent global expression is `OpSpecConstantComposite` or `OpSpecConstantOp`
  (integer and boolean arithmetic, comparisons, `Select`, conversions, `CompositeExtract`,
  `VectorShuffle`; floating-point arithmetic is an error); `ArraySize::Pending` is an
  `OpTypeArray` with the spec constant as length; `EntryPoint::workgroup_size_overrides` is
  `LocalSizeId` on SPIR-V 1.6 and a `WorkgroupSize` spec-constant composite before. An
  `Expression::Override` in a function is the spec constant's id, and a `Compose` or `Splat`
  of overrides and constants in a function is an `OpSpecConstantComposite`, so it can be a
  `ConstOffset`. Before SPIR-V 1.4 an unsigned integer conversion is `SConvert`, masked with
  `BitwiseAnd` when it widens, because `UConvert` needs `Kernel` there. `Override::id` is a `u32`;
  an override without an id may have a vector type. The validator treats arrays sized by an
  override as constructible (local variables, zero values), counts their locations as one
  element, and accepts an override expression as an image sample offset.
  `process_overrides` still bakes values: it also resolves overrides without name or id and
  clears the ids of the overrides it replaced, so the backend writes no spec constant for them.

## Cherry-picked upstream commits

None yet.
