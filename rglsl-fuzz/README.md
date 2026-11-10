# rglsl-fuzz

A port of the GLSL variant generator of [GraphicsFuzz](https://github.com/google/graphicsfuzz)
to safe Rust, for Vulkan GLSL `#version 450` / `460`. The design and the list of increments are
in [docs/design/fuzzer.md](../docs/design/fuzzer.md).

What exists so far (increment 1): the syntax tree, parser and printer live in the shared
[`rglsl-ast`](../rglsl-ast) crate and are re-exported here. This crate holds GraphicsFuzz's 450
sample shaders (`tests/data/450`, unchanged, with their license headers) and the tests that run
on them: parse → print → parse gives the same tree and the same text, truncated and mutated
samples never panic, and the pinned glslang accepts every printed sample it accepts in original
form (skipped when `target/oracles/bin/glslang` is absent; `RGLSL_GLSLANG` overrides the path).

`cargo run -p rglsl-fuzz --example print -- <input directory> <output directory>` prints
every `.frag` of a directory.

Licensed under Apache-2.0 only, as a derivative work of GraphicsFuzz; see `NOTICE`.
