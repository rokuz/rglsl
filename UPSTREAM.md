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
  (`common/wgsl`, `keywords`, `front::SymbolTable`), its fuzz target and its tests
  (`wgsl_errors.rs`, the WGSL-based tests in `validation.rs` and `spirv_capabilities.rs`).
  The validator and the constant evaluator still contain WGSL-shaped rules and abstract
  types; they are removed as they get in the way.
- Upstream's 165 WGSL snapshot inputs were converted to serialized IR (`rglsl/tests/in/ir/*.ron`)
  with the WGSL frontend before it was removed, so the SPIR-V backend keeps that coverage.
  The 24 snapshots that embedded the WGSL source as debug information lost it.

- **WGSL semantics in the SPIR-V backend.** Code that made the output behave as WGSL
  requires and that glslang does not emit, since GLSL leaves those cases undefined or does
  not define them that way:
  - the `FClamp` of a float to the range of the integer type before `OpConvertFToS` and
    `OpConvertFToU` (GLSL leaves an out-of-range conversion undefined; glslang converts
    directly);
  - the integer division and remainder wrappers (`rglsl_div`, `rglsl_mod`) that replaced a
    zero divisor and `INT_MIN / -1`, with the `Options::emit_int_div_checks` option, and the
    `a - b * (a / b)` lowering of signed `%`: signed `%` is `OpSMod`, unsigned `OpUMod`, and
    division is `OpSDiv`/`OpUDiv`, as glslang writes them (GLSL leaves a zero divisor and
    negative operands of `%` undefined);
  - integer `clamp` written as `min(max(x, low), high)`: it is `SClamp`/`UClamp`, as glslang
    writes it (GLSL leaves `low > high` undefined; constant folding still follows glslang's
    folding);
  - loop bounding (`Options::force_loop_bounding`, the `loop_bound` counter in every loop);
  - zero initialisation of workgroup memory (`Options::zero_initialize_workgroup_memory`,
    `ZeroInitializeWorkgroupMemoryMode`, the `LocalInvocationIndex == 0` store-and-barrier
    polyfill and the `OpConstantNull` initializer of the native mode);
  - the `OpConstantNull` initializer of `Private` globals and function variables without an
    initializer: a variable is initialised only when the IR gives it an `init`, as glslang
    initialises only declarations with an initializer (or `GL_EXT_null_initializer`'s `{}`);
  - the splat of a scalar `Select` condition to a vector from SPIR-V 1.4 on, where `OpSelect`
    takes the scalar condition, as glslang writes it (before 1.4 the condition is still
    splatted, as in glslang).

  Bounds checks were already off by default (`BoundsCheckPolicy::Unchecked`), and the
  coordinate-space flip, frag-depth clamp, mesh output clamp and task dispatch limits only
  apply to entry points with WGSL-style arguments and results, which the GLSL front end does
  not produce.
- **The GLSL frontend's parser and one-pass lowering** (`front/glsl/{lex,token,ast,parser,
  parser/*,parser_tests,context,functions,builtins,types,variables}.rs`), the
  `ShaderMetadata`, `Profile`, `Precision`, `TokenValue` and `ExpectedToken` types,
  `Frontend::metadata`, the `ErrorKind` variants only that parser produced, and the `pp-rs`
  dependency. The frontend is now `rglsl-pp` → `rglsl-ast` → `rglsl-sema` →
  `front/glsl/lower` (`docs/design/lowering.md`). Kept from upstream: `Options` (with
  `Options::from(stage)`), `Frontend::parse`, `Error`, `ErrorKind` (`Unsupported`, `Syntax`,
  `SemanticError`, `InternalError`), `ParseErrors` with its emitters. The block layout
  computation of upstream's `offset.rs` was kept at first and later replaced by
  `rglsl-sema`'s (`rglsl-sema/src/layout.rs`), which lowering applies to the IR types.
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
  not overlap. Members need not be in offset order (GLSL's explicit `offset` allows any
  order in Vulkan): the overlap check sorts members by offset, and a matrix member's extent is
  measured with its `matrix_layout` stride.
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
- **Bit-field operands are not clamped.** The SPIR-V backend writes `ExtractBits` and
  `InsertBits` as `OpBitField[SU]Extract`/`OpBitFieldInsert` on the offset and count as they
  are, like glslang, instead of upstream's WGSL clamps (`min(offset, w)`, `min(count, w -
  offset)`); GLSL and SPIR-V leave an out-of-range field undefined (`back/spv/block.rs`).
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
  `LocalSizeId` on SPIR-V 1.6 and a `WorkgroupSize` spec-constant composite before.
  `EntryPoint::workgroup_size_builtin` (new, not serialized when false) says that the source
  declared a workgroup size (`local_size_*` or `local_size_*_id`); with fixed sizes the backend
  then writes an `OpConstantComposite` of the size decorated `BuiltIn WorkgroupSize` before
  SPIR-V 1.6, as glslang does for the `gl_WorkGroupSize` linker object it keeps whenever a
  size is declared, in compute, mesh and task shaders (rglsl-link sets it when any linked unit
  declares a size). An
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
- **Memory qualifiers of struct members.** `StructMember::memory_decorations` (new, not
  serialized when empty) holds the memory qualifiers of a member of a buffer block (its own and
  its block's), and `MemoryDecorations::RESTRICT` (new) is `restrict`. The SPIR-V backend
  decorates each member of a laid-out struct with `Volatile`/`Coherent` (without the Vulkan
  memory model), `Restrict`, `NonWritable` and `NonReadable`, as glslang's
  `TranslateMemoryDecoration` does for the members of storage blocks, and decorates a global
  with `RESTRICT` `Restrict`. Loads, stores and atomics through a member add the member's
  qualifiers to those of the variable when choosing the memory operands, scope and `Volatile`
  semantics (`back/spv/physical.rs`, `root_qualifiers`). A buffer variable's own
  `memory_decorations` are those of its declaration only (they used to merge the members').
- **Override ids may repeat.** The validator no longer rejects two overrides with the same id
  (`OverrideError::DuplicateID` is gone): glslang gives `local_size_*_id` and `constant_id`
  constants with the same id separate spec constants with one `SpecId`.
- **Scalar block layout** (`std140`/`std430`/`scalar` packing, computed by `rglsl-sema/src/layout.rs`)
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

- **Descriptor heaps** (`GL_EXT_descriptor_heap`, `GL_EXT_structured_descriptor_heap`;
  `docs/design/descriptor-heap.md`). `AddressSpace::DescriptorHeap(DescriptorHeap)` (new, with
  `DescriptorHeap::{Resource, Sampler}`): globals in it are typed views of a heap, with
  `GlobalVariable::heap_offset` (new, a global expression, not serialized when `None`) as their
  byte offset. `TypeInner::BufferDescriptor { base, space }` (new) is a buffer descriptor;
  `Expression::BufferPointer` (new) turns a heap pointer to one into a `Uniform`/`Storage`
  pointer, `Expression::HeapOffset` (new) moves a view by a run-time byte offset.
  `StructMember::heap` (new, `HeapMember { offset, size }`, not serialized when `None`) holds
  explicit offsets and `descriptor_size` of members of structures that contain descriptors;
  the `stride` of an array of descriptors is the explicit stride or 0. The validator gives
  heap layouts `TypeFlags::HEAP_LAYOUT` (new; `TypeFlags` is now `u16`) instead of `DATA`,
  accepts loads of descriptors through heap pointers and images loaded from heaps in image
  operations; `compact` and `process_overrides` keep `heap_offset`. The SPIR-V backend writes
  untyped pointers (`SPV_KHR_untyped_pointers`), `OpUntypedVariableKHR` heap built-ins,
  `OpTypeBufferEXT`, `OpBufferPointerEXT`, `OpConstantSizeOfEXT`, `ArrayStrideIdEXT`,
  `OffsetIdEXT` computed as glslang does, and `OpUntypedImageTexelPointerEXT` for image
  atomics (`back/spv/heap.rs`). `Module::descriptor_heap` (new, serialized only when set)
  records that the source requested `GL_EXT_descriptor_heap`: `NonUniform` decorations are then
  replaced by the `DescriptorHeapEXT` capability, as glslang does.
  The SPIR-V backend writes the types of a heap view only when a function uses the view
  (`back/spv/heap.rs`, `unused_heap_types`): naga writes every type of the arena, which
  declared `OpTypeTensorARM` and its capability for unused tensor views.
- **Immediate slots of override-sized arrays.** `ImmediateSlots::from_type` no longer panics on
  an array sized by a specialization constant in push constants (it built a context without
  overrides); such an array covers the rest of the push-constant range, and
  `ImmediateSlots::from_range` saturates instead of overflowing.
- **No panics in the front ends.** The SPIR-V front end returns an error where upstream
  panicked on malformed input or a broken invariant (`front/spv`: the new `Error` variants
  `InvalidImageCoordinateType`, `Layout` and `InternalError`; `atomic_upgrade::Error::
  StructNotAccessedAtomically`). `ParseErrors::emit_to_writer*`/`emit_to_stderr*` (GLSL) and
  `spv::Error::emit_to_writer*` return the rendering error instead of panicking, and
  `emit_to_string*` falls back to the plain message when the source location cannot be
  rendered. `VertexFormat::min_acceleration_structure_vertex_stride` and
  `acceleration_structure_stride_alignment` (`rglsl-types`) return `None` for other formats.
- **No panics in the SPIR-V backend.** `back/spv` returns `Error::Validation` for a broken
  invariant of the validated module and `Error::FeatureNotImplemented` for external textures
  and the other unimplemented operations where upstream used `unwrap`, `expect`,
  `unreachable!`, `unimplemented!` or `assert!`. Cached expression ids, type ids of type
  handles and expression type resolutions, `Writer::get_constant_composite` and
  `Function::to_words` are fallible; `LocalType::BindingArray` holds the base type id instead of
  its handle; an abstract scalar reaching a type or constant declaration makes
  `Writer::write` fail. `process_overrides` reports the new `PipelineConstantError` variants
  `UnresolvedOverride` and `InvalidOverrideType` instead of panicking.
- **Ray tracing in SPIR-V shape** ([docs/design/ray-tracing.md](docs/design/ray-tracing.md)).
  `ShaderStage::{Intersection, Callable}` and `ShaderStage::ray_tracing`; address spaces
  `HitAttribute`, `CallableData`, `IncomingCallableData`, `ShaderRecord`; payload and callable
  data locations in `GlobalVariable::io`. `RayPipelineFunction::TraceRay` takes the ten operands
  of `OpTraceRayKHR`, an optional motion `time` and a `RayTracingData` (payload pointer or NV
  location) instead of a `RayDesc`; new `ExecuteCallable`, `ReportIntersection` (with
  `Expression::ReportIntersectionResult`), `IgnoreIntersection` and `TerminateRay` (block
  terminators unless `nv`). `RayQueryFunction::Initialize` takes the six ray operands instead of a
  `RayDesc`; `Expression::RayQueryGetIntersection` and `RayQueryVertexPositions` are replaced by
  `RayQueryGet { query, value: RayQueryValue }`, and the `RayQueryIntersection` enum is removed.
  `Expression::AccelerationStructureFromAddress`, `BuiltIn::{InstanceId, IncomingRayFlags,
  CullMask, HitTriangleVertexPositions, CurrentRayTime}`, `Module::ray_tracing:
  RayTracingFeatures` and `EntryPoint::opacity_micromap` are new. The SPIR-V backend writes the
  instructions directly: the ray query state tracking, the trace argument validation, their
  helper functions and the options `ray_query_initialization_tracking`,
  `trace_ray_argument_validation`, `PRINT_ON_RAY_QUERY_INITIALIZATION_FAIL` and
  `PRINT_ON_TRACE_RAYS_FAIL` are removed, with the WGSL-converted ray snapshot tests. The
  validator drops the WGSL rule that every trace uses one payload type, accepts ray queries in
  `Private` globals and pointer parameters, and checks the operand types of every ray instruction.
  Without the Vulkan memory model only `coherent` and `volatile` decorate `Coherent`, as glslang's
  `TranslateMemoryDecoration` (the scoped coherence qualifiers did before).
- **Hit objects and the NV geometry extensions** ([docs/design/ray-tracing.md](docs/design/ray-tracing.md)).
  New `TypeInner::HitObject { kind: HitObjectKind }` (`OpTypeHitObjectNV`/`EXT`), only in
  `Private` globals and pointer parameters like ray queries (`proc::contains_ray_object`, which
  replaces `contains_ray_query`, keeps both without a null initializer); new
  `AddressSpace::HitObjectAttribute { kind }`; `Statement::HitObject { object, fun:
  HitObjectFunction }` (trace, trace-reorder-execute, record hit/miss/empty/from query, execute,
  reorder-execute, get attributes, set the SBT record index, reorder with the hit object) and
  `Statement::ReorderThread { kind, hint, bits }`; `Expression::HitObjectGet { object, value:
  HitObjectValue }` and `Expression::FetchMicroTriangleVertex`. `RayQueryIntersectionValue` gains
  the cluster id and the sphere and swept-sphere values; `BuiltIn` gains `ClusterId`, the
  micro-triangle built-ins and the sphere and swept-sphere built-ins. The array results
  (`vec3[2]`, `float[2]`) are the new `PredeclaredType::F32Array { size, length }`; the validator
  checks each hit object operation against the hit object kind and its stages.
- **Geometry and tessellation stages.** `ShaderStage::{TessControl, TessEvaluation, Geometry}`
  (new; `ShaderStage::has_arrayed_io`), the matching `ShaderStages` bits of the validator and
  the `TessellationControl`/`TessellationEvaluation`/`Geometry` execution models.
  `Statement::EmitVertex { stream }` and `Statement::EndPrimitive { stream }` (new) are
  `OpEmitVertex`/`OpEndPrimitive`, or `OpEmitStreamVertex`/`OpEndStreamPrimitive` with the
  `GeometryStreams` capability when a stream is given; they restrict a function to the
  geometry stage. `EntryPoint::geometry: Option<GeometryInfo>` (input and output primitive,
  `max_vertices`, `invocations`, the `Stream` of each output when the shader uses streams, the
  `PassthroughNV` inputs of `GL_NV_geometry_shader_passthrough`) and
  `EntryPoint::tessellation: Option<TessellationInfo>` (output vertices, primitive mode,
  spacing, vertex order, point mode) are the execution modes; both are serialized only when
  set, and the validator requires the one of the entry point's stage and rejects the other.
  `BuiltIn::{InvocationId, PatchVertices, TessCoord, TessLevelOuter, TessLevelInner, Layer,
  ViewportIndex}` (new) with their stage rules; `PrimitiveIndex` is also a geometry output and
  a tessellation and geometry input. `TessLevelOuter`/`TessLevelInner` get the `Patch`
  decoration; `Binding::Location::patch` is allowed on tessellation control outputs and
  tessellation evaluation inputs and takes a location space of its own. Inputs of the
  tessellation and geometry stages and tessellation control outputs, unless per-patch or
  standalone built-ins, are per-vertex arrays (`proc::is_per_vertex_variable`): the validator
  checks the element type against the bindings, so the arrayed dimension takes no locations
  and an arrayed block may have member locations. `Position` is `FragCoord` only on fragment
  inputs. `PointSize`, `ClipDistance` and `CullDistance` members of a block add their
  capability (`GeometryPointSize`, `TessellationPointSize`, `ClipDistance`, `CullDistance`)
  only when a function reachable from an entry point accesses them, also through an element
  of an arrayed block. `Layer`/`ViewportIndex` add `Geometry`/`MultiViewport` in the
  geometry and fragment stages and `ShaderViewportIndexLayerEXT` (with
  `SPV_EXT_shader_viewport_index_layer`) before SPIR-V 1.5, `ShaderLayer`/
  `ShaderViewportIndex` after, in the vertex and tessellation stages, as glslang does;
  `PrimitiveId` adds `Geometry` except in the tessellation stages.
- **Subgroups** (`GL_KHR_shader_subgroup_*`, `GL_KHR_shader_subgroup_rotate`,
  `GL_EXT_shader_subgroup_extended_types_*`, `GL_EXT_shader_quad_control`,
  `GL_NV_shader_subgroup_partitioned`, `GL_ARB_shader_ballot`, `GL_ARB_shader_group_vote`,
  `GL_AMD_shader_ballot` reductions). `CollectiveOperation` loses its explicit discriminants and
  gains `ClusteredReduce(u32)` and `PartitionedReduce`/`PartitionedInclusiveScan`/
  `PartitionedExclusiveScan` (with the partition ballot); `GatherMode::Rotate { delta,
  cluster_size }` (new); `Statement::SubgroupFunction { fun, result }` (new) with
  `SubgroupFunction` (new): `Elect`, `AllEqual`, `QuadAll`/`QuadAny`, `InverseBallot`,
  `BallotBitExtract`, `BallotBitCount` (reduce or scan), `BallotFindLsb`/`BallotFindMsb`,
  `Partition`, the `SPV_KHR_shader_ballot`/`SPV_KHR_subgroup_vote` operations `KhrBallot`,
  `KhrReadInvocation`, `KhrReadFirstInvocation`, `KhrAll`, `KhrAny`, `KhrAllEqual`, and
  `Group { op, collective_op, argument, non_uniform }` (`OpGroup*` or
  `OpGroup*NonUniformAMD`); its result is a `SubgroupOperationResult`. `proc/subgroup.rs`
  (new) lists the operand handles of these for handle validation, `compact`,
  `process_overrides` and the uniformity analysis. `BuiltIn::SubgroupMask(SubgroupMask)` and
  `BuiltIn::ShaderBallot(ShaderBallot)` (new) are the `gl_Subgroup*Mask` and
  `gl_SubGroup*ARB` inputs (the latter declare `SubgroupBallotKHR` instead of
  `GroupNonUniform`). `EntryPoint::quad_control` (new, `QuadControl`, not serialized when
  default) writes `QuadDerivativesKHR`/`RequireFullQuadsKHR`. The validator accepts subgroup
  operations in every stage, every scan of every operation, bitwise operations on integers of
  any width and on booleans, booleans in gathers, and a non-constant `Broadcast` index (SPIR-V
  1.5; the frontend checks it for older targets); `SubgroupOperationSet` is `u16` with
  `CLUSTERED`, `ROTATE`, `PARTITIONED` and `QUAD_CONTROL`; the WGSL rule that rejected
  `SubgroupId`/`SubgroupInvocationId` with a multi-dimensional workgroup and the vertex-stage
  restriction of `SubgroupSize`/`SubgroupInvocationId` are gone. The SPIR-V backend writes
  `GatherMode::Broadcast` as `OpGroupNonUniformBroadcast` (upstream used a shuffle), declares
  `GroupNonUniform` together with the specific capability as glslang does, and splits the
  `SPV_KHR_shader_ballot` reads and the AMD group operations into components as glslang does
  (`back/spv/subgroup.rs`). An `Input` global may carry `MemoryDecorations::VOLATILE` (the
  subgroup built-ins of the ray-tracing stages other than any-hit, as glslang declares them): it
  is decorated `Volatile` but not `Coherent`, or loaded `Volatile` under the Vulkan memory model.
- **Multiview and per-view built-ins** (`GL_EXT_multiview`, `GL_NV_viewport_array2`,
  `GL_NV_stereo_view_rendering`, `GL_NVX_multiview_per_view_attributes`,
  `GL_NV_sample_mask_override_coverage`). `BuiltIn::{ViewportMaskNV, SecondaryPositionNV,
  SecondaryViewportMaskNV, PositionPerViewNV, ViewportMaskPerViewNV}` (new), outputs of the
  stages before rasterization and, for the two positions, inputs of the tessellation and
  geometry stages; their types are `int` arrays (any depth) and `vec4` or `vec4` arrays.
  `BuiltIn::Layer` gains `viewport_relative` and `secondary_view_offset`
  (`ViewportRelativeNV`, `SecondaryViewportRelativeNV N`) and `BuiltIn::SampleMask` gains
  `override_coverage` (`OverrideCoverageNV`); the validator ignores them in duplicate checks, and
  `SampleMask` also accepts an `int`/`uint` array, the GLSL form. The SPIR-V backend declares
  `SPV_KHR_multiview` for `ViewIndex` before SPIR-V 1.3 only (upstream declared it whenever an
  entry point argument was `ViewIndex`), adds the NV capabilities and extensions, decorates
  integer arrays among fragment built-in inputs `Flat`, and adds the capability of an NV member
  of an interface block only when it is accessed, as for `ClipDistance`.
- **GLSL mesh and task shaders** (`GL_EXT_mesh_shader`, `GL_NV_mesh_shader`). Upstream's mesh
  model (the WGSL one: `EntryPoint::mesh_info: MeshStageInfo` with a workgroup output variable
  copied to the real outputs by a generated wrapper, and a task entry point returning its group
  count) is kept unchanged for the IR snapshot inputs. The GLSL model is new and is chosen by
  `EntryPoint::mesh_shader: Option<MeshShaderInfo>` (new, not serialized when `None`): the
  extension flavour (`MeshShaderExtension::{Ext, Nv}`, selecting `MeshEXT`/`TaskEXT` with
  `SPV_EXT_mesh_shader`/`MeshShadingEXT` or `MeshNV`/`TaskNV` with `SPV_NV_mesh_shader`/
  `MeshShadingNV`), the output layout of a mesh entry point (`MeshOutputLayout`: topology,
  `max_vertices`, `max_primitives`, written as `OutputVertices`, `OutputPrimitivesEXT` and
  `OutputPoints`/`OutputLinesEXT`/`OutputTrianglesEXT`; the workgroup size goes through
  `write_workgroup_size` as in compute) and the `taskNV` blocks (`task_memory`), whose members
  are decorated `Offset` and `PerTaskNV` and their arrays `ArrayStride`. A fragment entry point
  with `per_primitive` inputs carries it too, without an output layout, to select the
  capability. With `mesh_shader` the validator does not ask for `mesh_info`, a task payload or
  a task result, and the backend writes no wrapper: outputs are `Output` globals listed in
  `EntryPoint::interface` and written directly; a task entry point's `task_payload` is the
  `taskPayloadSharedEXT` global (`AddressSpace::TaskPayload`). `Statement::MeshFunction(
  MeshFunction)` (new): `SetMeshOutputs` (`OpSetMeshOutputsEXT`), `EmitMeshTasks`
  (`OpEmitMeshTasksEXT` with the module's `TaskPayload` global as payload, a block
  terminator) and `WritePackedPrimitiveIndices` (`OpWritePackedPrimitiveIndices4x8NV`); their
  operands are `u32` and they restrict a function to the mesh or the task stage.
  `Binding::Location::per_view` (new, `PerViewNV`, not serialized when false): the outer
  dimension of the type is the view dimension and takes no locations. `per_primitive` is now
  also allowed on mesh outputs and decorated there. Outputs of the mesh stage other than
  standalone built-ins are per-vertex arrays (`proc::is_per_vertex_variable`).
  `BuiltIn::{PrimitiveShadingRate, TaskCountNV, PrimitiveCountNV, PrimitiveIndicesNV,
  MeshViewCountNV, MeshViewIndicesNV, ClipDistancePerViewNV, CullDistancePerViewNV,
  LayerPerViewNV}` (new); `PointIndex`/`LineIndices`/`TriangleIndices` are arrays when
  declared as interface variables. The backend decorates `PrimitiveId`, `Layer`,
  `ViewportIndex`, `ViewportMaskNV`, `LayerPerViewNV`, `ViewportMaskPerViewNV`,
  `CullPrimitive` and `PrimitiveShadingRate` outputs of the mesh stage `PerPrimitiveEXT`, the
  per-view built-ins `PerViewNV`, does not add `Geometry` for a mesh `PrimitiveId`, and adds the
  capabilities of the members of a mesh output block only when they are accessed. The
  validator accepts `Flat` together with `Centroid` or `Sample` on interface variables, as
  SPIR-V and glslang do. `MeshOutputTopology` derives `Hash`.
- **Cooperative matrices, cooperative vectors, long vectors and small floats**
  (`docs/design/cooperative.md`). Upstream's WGSL-shaped cooperative matrix (sizes
  `CooperativeSize::{Eight, Sixteen}`, `CooperativeData::row_major`, A/B/C roles of `f16`/`f32`
  only) is replaced: `CooperativeSize` is `Constant(NonZeroU32)` or `Pending(Handle<Override>)`;
  `TypeInner::CooperativeMatrix` gains `scope` and `class: CooperativeMatrixClass::{Khr, Nv}`
  and takes any scalar and size; `CooperativeData` is `{ pointer, stride: Option, layout }` with the
  layout an expression. New types: `TypeInner::LongVector { size, scalar, class:
  LongVectorClass::{Plain, CooperativeNv} }` (vectors of more than four components or of a
  specialization size, and `coopvecNV`), `TypeInner::TensorLayout` and `TensorView`. New scalar
  kinds `ScalarKind::{BFloat, FloatE4M3, FloatE5M2}` with `Literal::{BF16, FE4M3, FE5M2}` (the
  bits) and `Scalar::{BF16, FE4M3, FE5M2}`; the constant evaluator converts them bit-exactly as
  glslang (`proc::small_float`). New expressions: `CooperativeMultiplyAdd::saturating`,
  `CooperativeMatrixLength` (also a global expression, an `OpSpecConstantOp` for NV matrices),
  `Replicate`, `Expect`, `CooperativeVectorLoad`, `CooperativeVectorMatMul`, `Convert { expr, ty,
  saturating, family: CooperativeFamily }`, `CooperativeMatrixResult`, `TensorCreate`,
  `TensorSet`. New statements: `Assume`, `CooperativeVector(CooperativeVectorFunction)` and
  `CooperativeMatrix { function: CooperativeMatrixFunction, result }`, whose `Reduce`,
  `PerElement` and `LoadTensor` reference functions by handle (`compact` traces them). Binary,
  unary, `As`, `Math`, `Relational` and `Access` accept long vectors; `Access` with a constant
  index behind a pointer to an array is not bounds-checked against an implicitly sized array.
  `proc::long_math_result` builds the struct results of `modf`/`frexp`/carry/borrow/extended
  multiplication on long vectors. The SPIR-V backend writes the KHR and NV instructions, the
  `SPV_NV_cooperative_matrix2`, `SPV_NV_tensor_addressing`, `SPV_EXT_cooperative_matrix_maintenance1`,
  `SPV_NV_cooperative_matrix_decode_vector`, `SPV_NV_cooperative_vector`, `SPV_EXT_long_vector`,
  `SPV_EXT_replicated_composites`, `SPV_KHR_bfloat16`, `SPV_EXT_float8` and
  `SPV_KHR_expect_assume` capabilities and extensions, and the ARM cooperative matrix layouts.
  Upstream's `ir-cooperative-matrix*` snapshot inputs and outputs were deleted: they used the
  removed sizes and `row_major`, and the GLSL corpus covers the feature.
- **QCOM extensions** ([docs/design/qcom.md](docs/design/qcom.md)).
  `Expression::ImageSample::gather_pattern: ImageGatherPattern` (new; `Quad` is the ordinary
  gather, the others are the `GL_QCOM_image_processing3` modes written as `OpImageGatherQCOM`).
  `Expression::ImageProcessing { operation: ImageProcessingOperation, image, sampler,
  coordinate, reference, reference_sampler, reference_coordinate, size }` (new: weighted
  sampling, box filter, and block matching with `BlockMatchMetric` and `BlockMatchSearch`); it
  is a `vec4<f32>`. `Expression::ArrayConversion { conversion: ArrayConversion, expr, index, ty }`
  (new: the array bitcast, sub-array extraction and the array to cooperative matrix
  conversions of `GL_QCOM_cooperative_matrix_conversion`). `GlobalVariable::tile_attachment`
  (new, not serialized when false): a `Handle` global in the `TileAttachmentQCOM` storage class.
  `BuiltIn::{TileOffset, TileDimension, TileApronSize}` (new). `EntryPoint::tile_shading:
  TileShading { rate, non_coherent_attachment_read }` (new, not serialized when default); a
  rate replaces `LocalSize` with `TileShadingRateQCOM`. `Statement::Loop::control: LoopControl`
  (new, not serialized when default) carries the loop attributes of
  `GL_EXT_control_flow_attributes(2)` and `GL_QCOM_multiple_wait_queues` to `OpLoopMerge`.
  `Statement::If::control` and `Statement::Switch::control: SelectionControl` (new, `None`,
  `Flatten` or `DontFlatten`, not serialized when `None`) carry `[[flatten]]`, `[[branch]]` and
  `[[dont_flatten]]` to `OpSelectionMerge`; an `If` with empty branches is written when it has a
  control.
  The SPIR-V backend keeps the QCOM opcodes, capabilities and loop control bits the `spirv`
  crate lacks in `back/spv/qcom.rs`, and records the pointer of every binding-array element it
  loads so that the image processing decorations land on the `OpAccessChain`, as glslang
  writes them.
- **ARM tensors** (`GL_ARM_tensors`, `docs/design/cooperative.md`). New handle type
  `TypeInner::Tensor { scalar, rank }` (an `OpTypeTensorARM`, valid in `Handle` globals, binding
  arrays, function arguments and descriptor heaps), expressions `TensorRead { ty, tensor,
  coordinates, nontemporal, out_of_bounds }` and `TensorQuerySize { tensor, dimension }`, and
  the statement `TensorWrite { tensor, coordinates, value, nontemporal }`. `MemoryDecorations`
  is now `u16` and gains `NON_WRITABLE`/`NON_READABLE`, written as `NonWritable`/`NonReadable`
  on the global (the GLSL frontend sets them on `readonly`/`writeonly` tensors only).
- **64-bit indexing** (`GL_EXT_shader_64bit_indexing`). `Access` takes 64-bit integer indices;
  the validator accepts 64-bit index literals (a negative one is an error) and the SPIR-V
  backend never bounds-checks a 64-bit index. New expression `WideArrayLength(pointer)`, an
  `OpArrayLength` with a 64-bit unsigned result (`length64()`), and
  `Module::shader_64bit_indexing`, which writes the `Shader64BitIndexingEXT` capability,
  extension and execution mode.
- **SM and core built-ins.** `BuiltIn::ShaderCore(ShaderCore)` covers
  `WarpsPerSMNV`/`SMCountNV`/`WarpIDNV`/`SMIDNV` (`ShaderSMBuiltinsNV`) and
  `CoreIDARM`/`CoreCountARM`/`CoreMaxIDARM`/`WarpIDARM`/`WarpMaxIDARM` (`CoreBuiltinsARM`):
  `u32` inputs in every stage.

- **Function linkage and object modules** (M2, `docs/design/linking.md`). `Function::linkage`
  (`Linkage::{Definition, Import}`, serialized only when it is `Import`): an import is a
  prototype with no body, supplied by the linker (`rglsl-link`). The validator has
  `ValidationMode::{Object, Executable}` (`Validator::mode`): object mode accepts imports with an
  empty body, executable mode (the default) rejects any import (`ValidationError::Import`,
  `ImportWithBody`, `EntryPointError::Import`). The SPIR-V backend refuses imports
  (`spv::Error::Import`). `object::ObjectModule` wraps a module with what the linker needs and
  the IR does not say (stage or none, `#version`, extensions, function signatures in GLSL terms,
  link names of globals and their implicitly sized dimensions, automatic locations and bindings,
  the declared stage layout), with `object::FORMAT_VERSION`. `compact::KeepUnused::Declarations`
  keeps functions, globals and named overrides but drops unused types; `compact::Remap` exposes
  compaction's handle adjustment (one exhaustive `match` per IR enum) to the linker.
- **Storage images without a format, multisampled and cube storage images.**
  `StorageFormat::Unknown(Scalar)` is an image without a format qualifier whose texel type is
  the given scalar; the SPIR-V backend writes `Unknown` and requires
  `StorageImageReadWithoutFormat`/`StorageImageWriteWithoutFormat` on a read or a write.
  `Statement::ImageStore` has a `sample` (required for multisampled images, like
  `ImageLoad`). Cube storage images take their `vec3<i32>` coordinate unchanged and never an
  `array_index`, even when arrayed (`valid::image_array_index_expected`); `addresses_image`
  accepts it. A query of the size of a 1D arrayed image no longer shuffles to a scalar.
- **Sparse residency and minimum level of detail.** `ImageSample` has `min_lod` and `sparse`,
  `ImageLoad` has `sparse`: a struct type `{ i32, texel }` that is the result of the
  expression (`OpImageSparse*`). `Expression::ImageSparseResident { code }` is
  `OpImageSparseTexelsResident`. `ImageQuery::Lod { sampler, coordinate }` is
  `OpImageQueryLod`. A gather may have an explicit level or a bias
  (`SPV_AMD_texture_gather_bias_lod`) and an `array<vec2<i32>, 4>` offset (`ConstOffsets`).
- **Compute shader derivatives.** `EntryPoint::derivative_group` (`DerivativeGroup { shape,
  extension }`) writes the `DerivativeGroup*KHR` execution mode. Derivatives, implicit and
  biased sampling and level-of-detail queries are valid in compute, mesh and task stages as
  well as in fragment shaders (`valid/expression.rs`).
- **Libraries without a stage** (2026-11-11, format version 2). A library object module keeps
  one lowering per distinct stage meaning (`ObjectModule::stages`, `variants`), the first error
  of every stage it cannot be used in (`rejections`, `StageRejection`) and an optional file
  `name` for link errors; `StageLayout` also records the tile shading rate and non-coherent
  tile reads. In `ValidationMode::Object` the validator accepts a geometry, tessellation or
  mesh entry point whose stage layout is missing (`EntryPointError::ExpectedGeometryInfo`,
  `ExpectedOutputVertices`, `ExpectedTessellationPrimitive`, and a mesh entry point with
  `MeshShaderInfo::output` unset): the layout may come from another unit. `ShaderStage` gained
  `ALL` and `name()`.

- **SPIR-V intrinsics** (`GL_EXT_spirv_intrinsics`, `docs/design/spirv-intrinsics.md`).
  `TypeInner::Spirv { opcode, operands }` (`SpirvTypeOperand::{Literal, Type}`), a raw type
  instruction; `Statement::SpirvInstruction { instruction, operands, result }` with
  `SpirvInstruction { set, opcode }`, `SpirvOperand::{Value, Pointer, Literal}` and the result
  expression `Expression::SpirvInstructionResult { ty }`; `GlobalVariable::spirv_decorations`
  (`SpirvDecoration`, `SpirvDecorationOperands::{Literals, Ids, Strings}`, `SpirvId::{Constant,
  Global}`); `EntryPoint::spirv_execution_modes` (`SpirvExecutionMode`, operands literal words or
  global expressions); `Module::spirv_requirements` (extensions and capabilities). An `Input` or
  `Output` global with a raw `BuiltIn` decoration (`proc::has_spirv_built_in`) needs no binding.
  The SPIR-V backend writes them in `back/spv/intrinsics.rs`.

- **A comparison sampler may sample a float texture that is not a depth image.**
  `ImageSample` with a separate comparison sampler and a `depth_ref` accepts an
  `ImageClass::Sampled { kind: Float, multi: false }` image and has a scalar `f32` result; the
  SPIR-V backend combines it into an `OpTypeSampledImage` of the depth variant of the image
  type, as glslang does for a texture used both with and without a shadow sampler.

- **Workgroup variables may be null-initialized.** A `WorkGroup` global may have an
  initializer when it is a `ZeroValue` (`GL_EXT_null_initializer`'s `shared T x = {};`); the
  SPIR-V backend writes it as `OpConstantNull`, as glslang does.

- **Composite overrides.** An `Override` without an id may have a matrix, cooperative matrix,
  array or struct type (`GL_EXT_spec_constant_composites`); its initializer is a `Compose` or
  `Replicate` of override expressions, written as `OpSpecConstantComposite` (or
  `OpSpecConstantCompositeReplicateEXT`).

- **Push constant banks** (`GL_NV_push_constant_bank`). `GlobalVariable::immediate_bank`
  (`ImmediateBank { bank, member_offset }`), written as `BankNV` on the variable and its block
  type and `MemberOffsetNV` on the variable, with `PushConstantBanksNV`. An entry point may use
  several `Immediate` variables when no two of them have the same bank and member offset (no
  bank is bank 0, offset 0); `EntryPointError::MoreThanOneImmediateUsed` is reported otherwise.

## Cherry-picked upstream commits

None yet.
