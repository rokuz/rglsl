# rglsl-sema

Semantic analysis of Vulkan GLSL (`#version 450` / `460`) over the syntax tree of `rglsl-ast`:
types, scopes, built-ins and the checks glslang makes before it generates code. It is the middle
layer of the rglsl front end (source → `rglsl-ast` → `rglsl-sema` → IR) and gives `rglsl-fuzz`
the types and scopes it needs. `#![no_std]` with `alloc`; no IR, no code generation.

```rust
let unit = rglsl_ast::parse(source)?;
let analysis = rglsl_sema::analyze(&unit, &rglsl_sema::Options::new(rglsl_sema::Stage::Fragment));
for diagnostic in &analysis.diagnostics {
    eprintln!("{}: {}", diagnostic.line(source), diagnostic.kind);
}
```

## What it provides

- `types`: GLSL types as values (`Type` = a `TypeKind` plus array dimensions): scalars, vectors,
  matrices, arrays of arrays, opaque types, and structs and interface blocks interned in a
  `TypeRegistry` (structs are nominal). Helpers: component count, element / column / row type,
  numeric rank and implicit conversions, `is_opaque`, `contains_opaque`, display in GLSL syntax.
- `scope`: symbols (variables with their qualifiers, block members, struct names), functions with
  overload sets, and the nested scopes of GLSL (a function's parameters and body share a scope,
  and so do a `for` / `while` header and the loop body's outermost block).
- `builtins`: the built-in functions and variables of a `(version, stage)` pair under Vulkan
  semantics without extensions, as a `Builtins` value the caller owns and may cache.
  Functions are written as prototype text in the specification's generic notation
  (`builtins/functions.rs`) and expanded once; the texture and image families are generated per
  sampler type (`builtins/textures.rs`). The `gl_Max*` constants come from `ResourceLimits`,
  whose defaults are glslang's.
- `constant`: values and folding of constant expressions (operators, constructors, indexing,
  swizzles, `.length()`, and `abs` / `sign` / `min` / `max` / `clamp` / `floor` / `ceil` /
  `trunc`). Other built-ins that glslang folds are constant expressions without a known value.
- `analyze`: `analyze(&TranslationUnit, &Options) -> Analysis`. The analysis has the type of
  every expression, what every identifier refers to, which function, built-in or constructor
  every call resolves to, the implicit conversions applied, l-value and constant flags, the
  declared symbols, the struct and block types, and the diagnostics. It never stops at the first
  error: an erroneous expression gets the error type, which suppresses follow-on diagnostics.

`Options::relaxed_uniforms` accepts non-opaque uniforms outside blocks, like glslang's `-R`.

## Agreement with glslang

The rules follow glslang (the pinned commit in `oracles.toml`): a diagnostic is reported where
glslang reports an error, on the same line; the wording is ours. The span of a diagnostic is
chosen for that: an operator error spans the gap that holds the operator, a call or constructor
error the closing parenthesis, an initializer error the declared name. `Diagnostic::line` skips
leading white space and comments of the span. That includes behaviour of
glslang that differs from the specification, for instance trailing unknown letters of a swizzle
are dropped (`v.xk` is `v.x`) and implicitly sized arrays can be compared.

Out of scope here and left to lowering: the semantics of layout qualifiers beyond recording them
(name and constant value), `location` / `binding` requirements, link-time checks other than a
missing `main` and a called function without a body, recursion, and everything that needs an
`#extension`.

## Tools

- `cargo run -p rglsl-sema --example check -- <corpus directory> <verdicts.tsv>` compares the
  analysis with glslang's verdicts on a corpus of shaders.
- `cargo run -p rglsl-sema --example diag -- <shader>...` prints the diagnostics of shaders.
- `cargo run -p rglsl-sema --example dump -- <450|460> <stage>` prints the built-in table.

The cases in `src/tests/cases.txt` (`### name | stage [version] | line:Kind, ...`) were each
checked against glslang: it reports errors on exactly the listed lines.
