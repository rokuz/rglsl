## Changes since 0.1.4

### New

- **Ray tracing locations from library parameters.** A function in a library (a unit without
  `main`) may pass a `const int` parameter as the location of `traceRayEXT`,
  `executeCallableEXT`, their NV forms and the hit object calls. The linker makes one copy of
  the function per combination of locations its callers pass and points it at the program's
  variable with that location. A location that is not a compile-time constant, or one without a
  variable, is a link error. Programs keep glslang's rule.
- **Unused library resources are pruned when linking.** Uniform and storage blocks and
  descriptors of a library that no reachable function uses are no longer emitted. The
  opacity micromap execution mode is dropped from entry points that make no ray query.
  `--keep-library-globals`, `rglsl_program_options_set_keep_library_globals` and
  `ProgramOptions::prune_library_globals = false` keep them, as glslang does.
- `--object` accepts `--target-env spirv1.x`, so units that need SPIR-V 1.4 or newer (ray
  tracing) can be compiled to object modules.

### Fixes

- A descriptor array that one unit indexes with a variable and another declares without a size
  stays runtime-sized after linking. It used to get a size of 1, and `-O` then failed validation.
- Heap blocks (`GL_EXT_structured_descriptor_heap`):
  - `resourceheap` blocks hold textures, images and acceleration structures;
    `samplerheap` blocks hold samplers.
  - Combined image samplers, subpass inputs, ray queries and hit objects in a heap block
    are reported as errors instead of stopping the compiler with an internal error.
  - Members of struct type are checked in full.
- `descriptor_stride` on a block member without `descriptor_heap` is an error, as in glslang.
- An image without a format needs `writeonly` or `GL_EXT_shader_image_load_formatted` also when
  it is an array or a heap block member.
- A `.glsl` file whose inner suffix is not a stage (`1.lighting.glsl`) is a library. It used to
  be a usage error without a message.

### Compatibility

- The object module format is version 41: object modules written by 0.1.4 must be compiled again.
- Linked output can differ from 0.1.4 when libraries declare resources they do not use. Pass
  `--keep-library-globals` for the previous output.
- IR: the payload and attribute operands of `HitObjectFunction` are `RayTracingData`, which has a
  new `Argument` variant. New helpers: `Statement::ray_tracing_data`, `ray_tracing_data_mut`,
  `RayDataKind` and `Block::try_visit_blocks_mut`.
