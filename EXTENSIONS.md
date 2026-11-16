# Adding a GLSL extension

Every kind of knowledge about an extension has one home: a row in a table. The compiler (exhaustive
matches over the kinds) and guard tests point at whatever else must change. Work through the steps in
pipeline order and stop as soon as the extension needs nothing more: most extensions are steps 1, 2 and
5 plus tests.

## 1. Register the extension

`rglsl-types/src/extension.rs`, table `extensions!`, one row sorted by name (checked at compile time):

```rust
ExtMeshShader "GL_EXT_mesh_shader" {
    predefined: Always,
    minimum_spirv: Some((1, 4)),
    only_stages: &[Task, Mesh, Fragment],
    conflicts: &[NvMeshShader],
}
```

| Field | Meaning |
|---|---|
| `predefined` | the preprocessor macro: `Never`, `Always`, `Since(460)` |
| `implies` | extensions switched on and off with this one |
| `minimum_spirv` | lowest SPIR-V version the extension can target |
| `vulkan` | `Supported`, `WithoutSpirv`, or `Unsupported(reason)`: rejected with that reason |
| `only_stages`, `conflicts` | checked at the `#extension` directive |
| `keywords` | reserved words; never identifiers, whether the extension is on or not |
| `preprocessor`, `string_literals` | the preprocessor itself behaves differently while it is on |

The row gives the `Extension` variant, its name, `from_name`, sets and keyword tables. From now on code
names the extension only as `Extension::ExtMeshShader`: a `"GL_…"` string anywhere else fails the
`extension_names` guard test.

New syntax or types only: the lexer and parser in `rglsl-ast`, the printer (`rglsl-ast/src/printer.rs`,
used by the fuzzer's round trip), `Feature` in `rglsl-ast/src/extensions.rs` for type keywords, and
`Scalar` (`rglsl-ast/src/scalar.rs`) / `TypeKind` (`rglsl-sema/src/types.rs`) for new types.

## 2. Built-ins (rglsl-sema)

**Functions**: one row per name in the `builtins!` table of its family,
`rglsl-sema/src/builtins/table/{pure,stage,texture,subgroup,ray}.rs`:

```rust
"subgroupQuadAll": Subgroup(Function(QuadAll)) => [bool(bool)] {
    requires: &[ExtShaderQuadControl, KhrShaderSubgroupVote],
    flags: flags!(SUBGROUP_OPERATION),
}
```

The kind (`rglsl-sema/src/builtins/kind.rs`) says how the call is lowered; signatures are words from
`table/words.rs` (`genF`, `vecN`, `out genI`, ...); `requires`, `stages`, `since` and `flags` (`FOLD`,
`FUZZ`, precision flags, ...) replace any hand-written check. A function with an existing kind is one
row. A new kind is a variant in `kind.rs`; the compiler then lists the arms to write (lowering, constant
folding, barrier/atomic shapes).

**Variables and constants**: one row in `rglsl-sema/src/builtins/variables/{constants,stage,ray,blocks}.rs`:

```rust
"gl_SubgroupEqMask": Input(SubgroupMask(Mask::Eq)) => uvec4 {
    stages: ALL_STAGES,
    requires_one_of: &[KhrShaderSubgroupBallot],
    precision: Some(High),
}
```

Stages, versions, required extensions, stages where Vulkan forbids the variable (`vulkan_forbidden`) and
the IR `BuiltIn` all live in the row. A variable with an existing IR built-in is one row.

**Layout qualifiers**: one row in `rglsl-sema/src/layout_id.rs` (`layout_ids!`), then the arms the
compiler asks for in `analyze/layout_qualifiers.rs` and `layout.rs`.

**Other rules**: `require_extension(span, Extension::X, what)` / `require_extensions` in
`rglsl-sema/src/analyze/extension.rs` for checks that are not a property of a built-in row. Special
callees (cooperative matrices, tensors, ...) are `Callee` variants in `analyze/mod.rs`.

## 3. Lowering (rglsl/src/front/glsl/lower)

Built-in calls are dispatched exhaustively on `BuiltinKind`, variables are read from their rows: nothing
to do for rows with existing kinds. Lowering picks NV/EXT/KHR variants from
`analysis.extensions.contains(Extension::X)`; a new vendor of an existing feature is a row in
`rglsl-types/src/flavor.rs`.

## 4. IR, only for new semantics

1. Add the `Expression`, `Statement`, `TypeInner` or `MathFunction` variant in `rglsl/src/ir/mod.rs`.
2. Add one arm naming every handle field in `rglsl/src/ir/visit.rs`. Compaction, handle validation,
   pipeline constants, the linker and `Block` walks all use it.
3. Build. Every exhaustive dispatcher that the compiler reports needs an arm: typifier, validator,
   uniformity analyzer, SPIR-V writer, constant evaluator. Predicates use `matches!` or enum methods
   (`Statement::is_terminator`, `ScalarKind::is_integer`, ...), so you rarely have to touch them; if one
   is wrong for the new variant, fix the method.
4. A new IR built-in is a `BuiltIn` variant in `rglsl-types/src/builtin.rs`: its `BuiltIn::info()` arm
   (stages, type; this is the whole validator check) and its `map_built_in` arm in
   `rglsl/src/back/spv/builtin.rs`.
5. If the object file format changed, bump `FORMAT_VERSION` in `rglsl/src/object.rs` and update the
   schema snapshot: `RGLSL_UPDATE_OBJECT_SCHEMA=1 cargo test -p rglsl --test rglsl object_schema`.

New nesting (a construct that can contain itself) is walked with loops and work lists or recurses
only through `rglsl_types::stack::recurse`, and gets a case in `rglsl-link/tests/nesting.rs`.

## 5. SPIR-V (rglsl/src/back/spv)

What an instruction needs is one row in `feature.rs`, used as `writer.require(&feature::X)`:

```rust
QUAD_CONTROL {
    what: "quad control",
    capabilities: &[C::QuadControlKHR],
    extensions: &["SPV_KHR_quad_control"],
}
```

`core_since` and `min_version` carry the SPIR-V versions. `SPV_…` names are spelled only here
(guard test). Opcodes and enumerants missing from the `spirv` crate: add the name to
`xtask/src/gen_spirv/backend.rs` and run `cargo xtask gen-spirv`, which also regenerates the
disassembler tables of `rglsl -H`. Never write enumerant numbers by hand.

## 6. Linker, exec harness, C API

- `rglsl-link` (`interface.rs`, `layout.rs`, `merge.rs`): only when the extension adds qualifiers that
  stages or modules must agree on.
- `xtask/src/exec/requirements.rs`: the Vulkan device extension and features that the GL extension and
  its SPIR-V capabilities need on a GPU. If Amber does not know a feature struct, add it to the pinned
  Amber fork (`oracles.toml`).
- `rglsl-capi`: only when compile options change (`cargo xtask capi-header`).

## 7. Tests

- glslang's tests for the extension: `cargo xtask test --filter NAME --no-progress-file` (accepted,
  same diagnostics, spirv-val, same interface as glslang).
- Every new built-in against glslang: `cargo xtask builtins --filter NAME`; a deliberate difference goes
  into `xtask/builtins-expected.toml` with its reason.
- Command lines: `cargo xtask cli`.
- Own tests where glslang has none: `rglsl/tests/rglsl/`, snapshots in `rglsl/tests/in` (`cargo xtask
  snapshots`), link tests in `tests/link/`.
- An exec test in `tests/exec/` with expected values whenever a driver supports the extension.
- All commands in `AGENTS.md` before committing.
