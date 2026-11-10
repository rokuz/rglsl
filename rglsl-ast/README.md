# rglsl-ast

A syntax tree, parser and pretty printer for Vulkan GLSL (`#version 450` / `460`), shared by the
rglsl compiler front end and by `rglsl-fuzz`. `#![no_std]` with `alloc`.

- `rglsl_ast::parse(&str) -> Result<TranslationUnit, ParseError>`: a hand-written lexer and
  recursive-descent parser. It never panics; nesting deeper than `MAX_NESTING_DEPTH` and
  expressions taller than `MAX_EXPRESSION_HEIGHT` are parse errors.
- `rglsl_ast::ast`: the tree. Its types are named after the productions of the grammar in
  chapter 9 of the GLSL 4.60 specification (`TranslationUnit`, `ExternalDeclaration`,
  `InitDeclaratorList`, `FullySpecifiedType`, `TypeQualifier`, `LayoutQualifierId`, ...). The set
  of accepted productions, keywords and reserved words follows what glslang accepts for desktop
  450/460 under Vulkan without extensions.
- Every node has a `Span` (byte offsets into the source); statements, expressions, declarations,
  declarators and parameters also have a `NodeId` that is unique in their translation unit.
  `==` on trees is structural: it ignores spans and ids.
- `rglsl_ast::print` and `Display` for `TranslationUnit`: a deterministic printer. Parsing its
  output gives a tree equal to the one printed.

There is no preprocessor yet: `#version`, `#extension` and `#pragma` lines are parsed and kept as
external declarations, any other directive is an error. Comments are skipped.

Not accepted yet (extension-only or not available under Vulkan in glslang's grammar): attributes
`[[...]]`, `spirv_*` qualifiers and types, type parameters `<...>`, `demote`,
`terminateInvocation`, the ray tracing and mesh shader qualifiers and statements, C-style casts,
default parameter values, `...` parameters, explicit-arithmetic and half-float types, string
literals, inline struct blocks in block members other than `qualifier { ... } name;`.

`resourceheap` and `samplerheap` are storage qualifiers (`GL_EXT_structured_descriptor_heap`).
A member declaration that starts with a type qualifier followed by `{` is an inline block
(`TypeSpecifierNonArray::InlineBlock`), as in glslang's `block_heap_inner_structure`; the
semantic analysis accepts it only for `buffer_reference` blocks inside heap blocks. A block
with `layout(buffer_type)` declares a type name, like a `buffer_reference` block.

`nonuniformEXT` is accepted with `GL_EXT_nonuniform_qualifier` as a type qualifier
(`SingleTypeQualifier::NonUniform`) and as `nonuniformEXT(expr)`, a call of the function
identifier `nonuniformEXT` (`NON_UNIFORM`).
