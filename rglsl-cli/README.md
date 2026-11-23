# rglsl-cli

The `rglsl` command-line tool: a Vulkan GLSL (`#version 450`/`460`) to SPIR-V compiler, a drop-in
replacement for `glslangValidator` in Vulkan projects.

```sh
cargo install rglsl-cli

rglsl -V shader.frag                                  # writes frag.spv
rglsl -V main.frag lighting.glsl -o shader.spv        # compile and link
rglsl -V -l -O main.vert main.frag                    # optimized
rglsl -V --reflection-json layout.json main.vert main.frag
                                                      # descriptor bindings, push constants,
                                                      # inputs, outputs, specialization
                                                      # constants and the pipeline layout as JSON
```

Options, exit codes and messages are `glslangValidator`'s; rglsl has only its options for Vulkan
GLSL. The compiler itself is the library `rglsl-link`; see the
[repository](https://github.com/rokuz/rglsl) for the Rust and C APIs.
