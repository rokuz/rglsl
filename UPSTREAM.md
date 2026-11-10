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
  storage buffer or push constants; upstream decorates every struct and array. Pointers in
  other storage classes (`back/spv/plain_types.rs`) point to an undecorated twin of such a
  type, or of any struct or array containing one; loads and stores through them convert
  between the twins with `OpCopyLogical` from SPIR-V 1.4 and member by member before.
- **The workgroup zero-initialisation polyfill reuses a declared `LocalInvocationIndex`**
  input global instead of declaring a second one, which Vulkan forbids
  (VUID-StandaloneSpirv-OpEntryPoint-09658).
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
- **No automatic `NonUniform`; explicit non-uniformity instead.** The SPIR-V backend no
  longer decorates accesses to binding arrays indexed by a value the uniformity analysis
  finds non-uniform; glslang emits `NonUniform` only for `nonuniformEXT`.
  `Function::non_uniform` (new, `NonUniformExpressions`: expression handles with
  `NonUniform` flags `VALUE`, `ACCESS`, `SAMPLED_IMAGE`) says which results the source makes
  non-uniform; handle validation, `compact` and `process_overrides` keep it consistent, and
  it is not serialized when empty. The backend decorates the instruction computing a `VALUE`
  expression (or a decorated `OpCopyObject` of a handle global or argument used as an image
  operand), the `OpAccessChain` of an `ACCESS` pointer or binding array element, the
  `OpImage` extracted from a `VALUE` combined sampler and the `OpSampledImage` of a
  `SAMPLED_IMAGE` sample, and declares `ShaderNonUniform`
  (`Writer::decorate_non_uniform`, replacing `decorate_non_uniform_binding_array_access`).
  See `docs/design/nonuniform.md`.
- **Descriptor indexing capabilities.** A runtime-sized `BindingArray` declares
  `RuntimeDescriptorArray`; a dynamic index into a binding array declares the
  `*ArrayNonUniformIndexing` capability of its element kind when the access is marked
  `ACCESS`, and `UniformTexelBufferArrayDynamicIndexing` or
  `StorageTexelBufferArrayDynamicIndexing` otherwise, with `SPV_EXT_descriptor_indexing`
  before SPIR-V 1.5 (`back/spv/block.rs`, `binding_array_capability`).
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
- **Subpass inputs.** `ImageDimension::Subpass` (new) is `OpTypeImage SubpassData` with
  Sampled=2 and the `InputAttachment` capability; its class is `ImageClass::Sampled { kind,
  multi }` for the texel kind and multisampling. The validator allows it only non-arrayed, as
  an `Image` (not a `SampledImage`), addressed by an `i32` 2-vector, without levels, queries,
  sampling or gathering, and its loads only in fragment shaders. An `ImageLoad` of it is
  `OpImageRead` (with `Sample` when multisampled) and never bounds-checked.
  `GlobalVariable::input_attachment_index` (new, not serialized when `None`) is the
  `InputAttachmentIndex` decoration; the validator allows it only on a `Handle` global of a
  subpass image or a binding array of them. Dynamic indexing of a binding array of subpass
  inputs declares `InputAttachmentArrayDynamicIndexing` or, when marked `ACCESS`,
  `InputAttachmentArrayNonUniformIndexing`.
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

- **Physical storage buffer pointers** (`GL_EXT_buffer_reference`; `docs/design/buffer-reference.md`).
  `AddressSpace::PhysicalStorage { alignment, access, qualifiers }` (new) and `PointerQualifiers`
  (new): a `Pointer` in this space is a data value (8 bytes, 8-aligned) that can be stored,
  passed and returned; its `base` is the only type handle that may refer forward, which is how
  recursive types are built (the frontend replaces a placeholder pointer with
  `UniqueArena::replace`). The handle and type validators check such bases after all types,
  `compact` keeps them, and empty structs are allowed. `Expression::PhysicalPointer` and
  `Expression::PhysicalAddress` (new) convert between such pointers, `u64` and `vec2<u32>`.
  The SPIR-V backend writes `PhysicalStorageBuffer64` addressing, forward pointers, `Block` and
  layout decorations on pointees, `Aligned` on every access through such a pointer (glslang's
  value), `AliasedPointer`/`RestrictPointer`, and never null-initializes variables holding one.
- **Vulkan memory model.** `Module::vulkan_memory_model` (new, serialized only when set)
  selects `MemoryModel Vulkan`; loads and stores of coherent and volatile memory then carry
  `MakePointerAvailable`/`MakePointerVisible`, `NonPrivatePointer` and `Volatile` instead of
  `Coherent`/`Volatile` decorations, and device-scope barriers use `QueueFamily`.
- **Atomics on plain integers.** `Statement::Atomic` accepts a pointer to an `i32`/`u32`/
  `i64`/`u64` scalar as well as to an `Atomic`; the SPIR-V backend gives such operations
  GLSL's scope (`Device`, `QueueFamily` under the Vulkan memory model) and relaxed semantics.
- **Explicit memory scopes and semantics** (`GL_KHR_memory_scope_semantics`;
  `docs/design/buffer-reference.md`). `MemoryScope`, `MemorySemantics` (the SPIR-V bits) and
  `MemoryOrder { scope, semantics, unequal }` (new). `Statement::Atomic::order` (new, not
  serialized when `None`) overrides the default scope and semantics; `Statement::AtomicLoad`
  and `Statement::AtomicStore` (new) are `OpAtomicLoad`/`OpAtomicStore` on an
  `AtomicLocation` (new): a pointer to an integer (or `Atomic`) scalar, or a `Texel` (new: image,
  coordinate, layer, sample) written as `OpImageTexelPointer`. `Statement::ScopedBarrier` (new)
  is `OpControlBarrier` (with an execution scope) or `OpMemoryBarrier` with explicit operands.
  Semantics with `MakeAvailable`, `MakeVisible`, `OutputMemory` or `Volatile`, and the
  `QueueFamily` scope, declare `VulkanMemoryModel` (and the extension before SPIR-V 1.5), which
  selects `MemoryModel Vulkan`; `VulkanMemoryModelDeviceScope` is declared when the model is
  Vulkan and a `Device` scope is used (`back/spv/atomic.rs`).
- **Image atomics with a result.** `Statement::ImageAtomic` gains `sample`, `result` (an
  `AtomicResult`) and `order` (all optional and not serialized when absent). The image may be a
  global, an element of a binding array or a function argument; with an `order` the backend
  writes the access chain of a binding-array element as the texel pointer's image instead of
  loading the descriptor, decorates the texel pointer `NonUniform` for a `VALUE` image, and
  supports `Exchange` and compare-exchange (`OpAtomicCompareExchange`, scalar result) on
  `r32i`/`r32ui` and `Exchange` on `r32f`. Without an `order` the upstream behaviour is kept.
  Handle validation, `compact`, `process_overrides` and the uniformity analysis now also visit
  the compare operand of image atomics, which upstream skipped.
- **Multisampled storage images.** `ImageClass::Storage::multi` (new, not serialized when
  false): `OpTypeImage ... MS=1` with `StorageImageMultisample` (and `ImageMSArray` when
  arrayed); `ImageLoad` takes a sample for them.
- **Memory qualifiers of globals.** `MemoryDecorations` gains `DEVICE_COHERENT`,
  `QUEUE_FAMILY_COHERENT`, `WORKGROUP_COHERENT`, `SUBGROUP_COHERENT`, `SHADER_CALL_COHERENT` and
  `NONPRIVATE`, and is allowed on `Handle` and `Uniform` globals as well as `Storage`. Without
  the Vulkan memory model any coherence qualifier or `volatile` decorates `Coherent` (glslang
  decorates a `volatile` variable both `Volatile` and `Coherent`); under the model they give
  loads and stores their availability operands and scope, and storage image reads and writes
  `MakeTexelVisible`/`MakeTexelAvailable`, `NonPrivateTexel` and `VolatileTexel`.
- **Override ids may repeat.** The validator no longer rejects two overrides with the same id
  (`OverrideError::DuplicateID` is gone): glslang gives `local_size_*_id` and `constant_id`
  constants with the same id separate spec constants with one `SpecId`.
- **Scalar block layout** (`std140`/`std430`/`scalar` packing in `front/glsl/lower/offset.rs`)
  and array strides smaller than the natural size of a matrix element (the matrix layout of
  the member decides the size).
- **Debug printf and abort** (`GL_EXT_debug_printf`, `GL_EXT_abort`;
  `docs/design/strings.md`). `Statement::DebugPrintf { format, arguments }` (new, with
  `DebugPrintfArgument::{Value, String}`) is written as `OpExtInst NonSemantic.DebugPrintf`
  with `OpString`s, deduplicated by text (the existing ray-query and ray-tracing validation
  printfs share the cache). `Statement::Abort { message, ty, arguments }` (new) is a block
  terminator like `Kill` (`proc::ensure_block_returns`, the uniformity analysis); `ty` is the
  scalar-laid-out message struct, checked by the validator (`FunctionError::
  InvalidAbortMessage`, `InvalidAbortArgument`), kept by `compact` (`adjust_body` now also
  takes the type map) and validated by the handle validator (`validate_block_handles` takes
  the type arena). The SPIR-V backend writes `OpConstantDataKHR`, a laid-out copy of the
  message type, `UTFEncodedKHR`, `OpCompositeConstruct` and `OpAbortKHR` with `AbortKHR`,
  `ConstantDataKHR`, `Int8` (`back/spv/message.rs`). `back::spv::Instruction` holds a raw
  opcode (`Instruction::raw`) and the writer a list of raw capabilities, because the `spirv`
  crate does not know these opcodes, capabilities and the decoration.

## Cherry-picked upstream commits

None yet.
