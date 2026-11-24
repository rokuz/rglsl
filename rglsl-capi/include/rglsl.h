#ifndef RGLSL_H
#define RGLSL_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define RGLSL_FORMAT_ERROR_COLUMN 1

#define RGLSL_FORMAT_ABSOLUTE_PATH (1 << 1)

#define RGLSL_FORMAT_UNNAMED_SOURCE (1 << 2)

#define RGLSL_REFLECT_STRICT_ARRAY_SUFFIX 1

#define RGLSL_REFLECT_BASIC_ARRAY_SUFFIX (1 << 1)

#define RGLSL_REFLECT_INTERMEDIATE_IO (1 << 2)

#define RGLSL_REFLECT_SEPARATE_BUFFERS (1 << 3)

#define RGLSL_REFLECT_ALL_BLOCK_VARIABLES (1 << 4)

#define RGLSL_REFLECT_UNWRAP_IO_BLOCKS (1 << 5)

#define RGLSL_REFLECT_ALL_IO_VARIABLES (1 << 6)

#define RGLSL_ABI_VERSION 3

#define RGLSL_DESCRIPTOR_HEAP_RESOURCE 1

#define RGLSL_DESCRIPTOR_HEAP_SAMPLER (1 << 1)

typedef struct rglsl_blob rglsl_blob;

typedef struct rglsl_compile_options rglsl_compile_options;

typedef struct rglsl_compiler rglsl_compiler;

typedef struct rglsl_diagnostics rglsl_diagnostics;

typedef struct rglsl_include_result rglsl_include_result;

typedef struct rglsl_limits rglsl_limits;

typedef struct rglsl_object rglsl_object;

typedef struct rglsl_pipeline_layout rglsl_pipeline_layout;

typedef struct rglsl_program rglsl_program;

typedef struct rglsl_program_options rglsl_program_options;

typedef struct rglsl_spirv_graph_reflection rglsl_spirv_graph_reflection;

typedef struct rglsl_spirv_reflection rglsl_spirv_reflection;

typedef uint32_t rglsl_result;

typedef uint32_t rglsl_stage;

typedef uint32_t rglsl_debug_info;

typedef void (*rglsl_include_callback)(void *user_data,
                                       const char *requested,
                                       bool system,
                                       const char *includer,
                                       rglsl_include_result *result);

typedef uint32_t rglsl_severity;

typedef uint32_t rglsl_opt_level;

typedef uint32_t rglsl_target_gpu;

typedef uint32_t rglsl_disassembly;

typedef uint32_t rglsl_descriptor_type;

typedef uint32_t rglsl_interface;

typedef uint32_t rglsl_scalar_kind;

#define RGLSL_RESULT_OK 0

#define RGLSL_RESULT_INVALID_ARGUMENT 1

#define RGLSL_RESULT_COMPILE_FAILED 2

#define RGLSL_RESULT_LINK_FAILED 3

#define RGLSL_RESULT_INVALID_OBJECT 4

#define RGLSL_RESULT_INTERNAL_ERROR 5

#define RGLSL_RESULT_INVALID_SPIRV 6

#define RGLSL_STAGE_VERTEX 0

#define RGLSL_STAGE_TESS_CONTROL 1

#define RGLSL_STAGE_TESS_EVALUATION 2

#define RGLSL_STAGE_GEOMETRY 3

#define RGLSL_STAGE_FRAGMENT 4

#define RGLSL_STAGE_COMPUTE 5

#define RGLSL_STAGE_RAY_GENERATION 6

#define RGLSL_STAGE_INTERSECTION 7

#define RGLSL_STAGE_ANY_HIT 8

#define RGLSL_STAGE_CLOSEST_HIT 9

#define RGLSL_STAGE_MISS 10

#define RGLSL_STAGE_CALLABLE 11

#define RGLSL_STAGE_TASK 12

#define RGLSL_STAGE_MESH 13

#define RGLSL_SEVERITY_ERROR 0

#define RGLSL_SEVERITY_WARNING 1

#define RGLSL_DEBUG_INFO_NAMES 0

#define RGLSL_DEBUG_INFO_STRIPPED 1

#define RGLSL_DEBUG_INFO_LINES 2

#define RGLSL_DEBUG_INFO_NON_SEMANTIC 3

#define RGLSL_DEBUG_INFO_NON_SEMANTIC_SOURCE 4

#define RGLSL_DEBUG_INFO_FILE_NAME 5

#define RGLSL_OPT_LEVEL_DISABLED 0

#define RGLSL_OPT_LEVEL_PERFORMANCE 1

#define RGLSL_OPT_LEVEL_SIZE 2

#define RGLSL_TARGET_GPU_NVIDIA 0

#define RGLSL_TARGET_GPU_AMD 1

#define RGLSL_TARGET_GPU_UNIVERSAL_DESKTOP 2

#define RGLSL_TARGET_GPU_UNIVERSAL_MOBILE 3

#define RGLSL_DISASSEMBLY_GLSLANG 0

#define RGLSL_DISASSEMBLY_STANDARD 1

#define RGLSL_DESCRIPTOR_TYPE_SAMPLER 0

#define RGLSL_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER 1

#define RGLSL_DESCRIPTOR_TYPE_SAMPLED_IMAGE 2

#define RGLSL_DESCRIPTOR_TYPE_STORAGE_IMAGE 3

#define RGLSL_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER 4

#define RGLSL_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER 5

#define RGLSL_DESCRIPTOR_TYPE_UNIFORM_BUFFER 6

#define RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER 7

#define RGLSL_DESCRIPTOR_TYPE_INPUT_ATTACHMENT 10

#define RGLSL_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE 1000150000

#define RGLSL_DESCRIPTOR_TYPE_TENSOR 1000460000

#define RGLSL_SCALAR_KIND_BOOL 0

#define RGLSL_SCALAR_KIND_INT 1

#define RGLSL_SCALAR_KIND_UINT 2

#define RGLSL_SCALAR_KIND_FLOAT 3

#define RGLSL_SCALAR_KIND_ENCODED_FLOAT 4

#define RGLSL_INTERFACE_INPUT 0

#define RGLSL_INTERFACE_OUTPUT 1

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

const char *rglsl_version(void);

uint32_t rglsl_abi_version(void);

rglsl_result rglsl_compile_options_create(const char *name,
                                          rglsl_stage stage,
                                          rglsl_compile_options **options);

rglsl_result rglsl_compile_options_create_library(const char *name,
                                                  rglsl_compile_options **options);

void rglsl_compile_options_destroy(rglsl_compile_options *options);

rglsl_result rglsl_compile_options_add_define(rglsl_compile_options *options,
                                              const char *name,
                                              const char *value);

rglsl_result rglsl_compile_options_add_include(rglsl_compile_options *options,
                                               const char *name,
                                               const char *source);

rglsl_result rglsl_compile_options_add_include_dir(rglsl_compile_options *options,
                                                   const char *directory);

rglsl_result rglsl_compile_options_set_debug_info(rglsl_compile_options *options,
                                                  rglsl_debug_info level);

rglsl_result rglsl_compile_options_set_spirv_version(rglsl_compile_options *options,
                                                     uint32_t major,
                                                     uint32_t minor);

rglsl_result rglsl_compile_options_set_includer(rglsl_compile_options *options,
                                                rglsl_include_callback callback,
                                                void *user_data);

rglsl_result rglsl_include_result_set(rglsl_include_result *result,
                                      const char *name,
                                      const char *source);

rglsl_result rglsl_compile(const char *source,
                           const rglsl_compile_options *options,
                           rglsl_object **object,
                           rglsl_diagnostics **diagnostics);

rglsl_result rglsl_compiler_create(rglsl_compiler **compiler);

void rglsl_compiler_destroy(rglsl_compiler *compiler);

rglsl_result rglsl_compiler_compile(const rglsl_compiler *compiler,
                                    const char *source,
                                    const rglsl_compile_options *options,
                                    rglsl_object **object,
                                    rglsl_diagnostics **diagnostics);

void rglsl_object_destroy(rglsl_object *object);

rglsl_result rglsl_object_write(const rglsl_object *object,
                                rglsl_blob **blob,
                                rglsl_diagnostics **diagnostics);

rglsl_result rglsl_object_read(const uint8_t *data,
                               size_t size,
                               rglsl_object **object,
                               rglsl_diagnostics **diagnostics);

const uint8_t *rglsl_blob_data(const rglsl_blob *blob);

size_t rglsl_blob_size(const rglsl_blob *blob);

void rglsl_blob_destroy(rglsl_blob *blob);

rglsl_result rglsl_program_options_create(rglsl_program_options **options);

void rglsl_program_options_destroy(rglsl_program_options *options);

rglsl_result rglsl_program_options_set_debug_info(rglsl_program_options *options,
                                                  rglsl_debug_info level);

rglsl_result rglsl_program_options_set_spirv_version(rglsl_program_options *options,
                                                     uint32_t major,
                                                     uint32_t minor);

rglsl_result rglsl_link(const rglsl_object *const *objects,
                        size_t count,
                        const rglsl_program_options *options,
                        rglsl_program **program,
                        rglsl_diagnostics **diagnostics);

void rglsl_program_destroy(rglsl_program *program);

size_t rglsl_program_stage_count(const rglsl_program *program);

rglsl_result rglsl_program_stage(const rglsl_program *program, size_t index, rglsl_stage *stage);

const char *rglsl_program_entry_point(const rglsl_program *program, size_t index);

rglsl_result rglsl_program_spirv(const rglsl_program *program,
                                 size_t index,
                                 const uint32_t **words,
                                 size_t *word_count);

const rglsl_diagnostics *rglsl_program_warnings(const rglsl_program *program);

void rglsl_diagnostics_destroy(rglsl_diagnostics *diagnostics);

size_t rglsl_diagnostics_count(const rglsl_diagnostics *diagnostics);

const char *rglsl_diagnostics_text(const rglsl_diagnostics *diagnostics);

const char *rglsl_diagnostics_message(const rglsl_diagnostics *diagnostics, size_t index);

rglsl_result rglsl_diagnostics_location(const rglsl_diagnostics *diagnostics,
                                        size_t index,
                                        rglsl_severity *severity,
                                        const char **file,
                                        uint32_t *line,
                                        uint32_t *column);

rglsl_result rglsl_compile_options_set_file_system_includes(rglsl_compile_options *options,
                                                            bool enabled);

rglsl_result rglsl_compile_options_set_suppress_warnings(rglsl_compile_options *options,
                                                         bool enabled);

rglsl_result rglsl_program_options_set_generate_spirv(rglsl_program_options *options, bool enabled);

rglsl_result rglsl_program_options_set_suppress_warnings(rglsl_program_options *options,
                                                         bool enabled);

rglsl_result rglsl_compile_options_set_enhanced_messages(rglsl_compile_options *options,
                                                         bool enabled);

rglsl_result rglsl_compile_options_set_invert_y(rglsl_compile_options *options, bool enabled);

rglsl_result rglsl_compile_options_set_nan_clamp(rglsl_compile_options *options, bool enabled);

rglsl_result rglsl_compile_options_set_discard_is_terminate(rglsl_compile_options *options,
                                                            bool enabled);

rglsl_result rglsl_program_options_set_validate_io(rglsl_program_options *options, bool enabled);

rglsl_result rglsl_program_options_set_optimization(rglsl_program_options *options,
                                                    rglsl_opt_level level);

rglsl_result rglsl_program_options_set_target_gpu(rglsl_program_options *options,
                                                  rglsl_target_gpu gpu);

rglsl_result rglsl_program_options_set_optimizer_passes(rglsl_program_options *options,
                                                        const char *passes);

rglsl_result rglsl_program_options_add_specialization(rglsl_program_options *options,
                                                      uint32_t id,
                                                      const char *value);

rglsl_result rglsl_program_options_clear_specializations(rglsl_program_options *options);

rglsl_result rglsl_program_options_set_optimizer_validate_each(rglsl_program_options *options,
                                                               bool enabled);

rglsl_result rglsl_compile_options_add_undefine(rglsl_compile_options *options, const char *name);

rglsl_result rglsl_compile_options_add_preamble_text(rglsl_compile_options *options,
                                                     const char *text);

rglsl_result rglsl_compile_options_set_entry_point(rglsl_compile_options *options,
                                                   const char *name);

rglsl_result rglsl_compile_options_set_vulkan_version(rglsl_compile_options *options,
                                                      uint32_t major,
                                                      uint32_t minor);

rglsl_result rglsl_compile_options_set_limits(rglsl_compile_options *options,
                                              const rglsl_limits *limits);

rglsl_result rglsl_program_options_set_command_line(rglsl_program_options *options,
                                                    const char *command_line);

rglsl_result rglsl_program_options_set_working_directory(rglsl_program_options *options,
                                                         const char *directory);

rglsl_result rglsl_program_options_set_limits(rglsl_program_options *options,
                                              const rglsl_limits *limits);

rglsl_result rglsl_program_options_set_reflection(rglsl_program_options *options,
                                                  bool enabled,
                                                  uint32_t flags);

rglsl_result rglsl_limits_create(rglsl_limits **limits);

rglsl_result rglsl_limits_decode(const uint8_t *data, size_t size, rglsl_limits **limits);

void rglsl_limits_destroy(rglsl_limits *limits);

rglsl_result rglsl_limits_set(rglsl_limits *limits, const char *name, int32_t value);

rglsl_result rglsl_limits_get(const rglsl_limits *limits, const char *name, int32_t *value);

size_t rglsl_limits_message_count(const rglsl_limits *limits);

const char *rglsl_limits_message(const rglsl_limits *limits, size_t index);

rglsl_result rglsl_limits_configuration(const rglsl_limits *limits, rglsl_blob **text);

size_t rglsl_object_file_count(const rglsl_object *object);

const char *rglsl_object_file(const rglsl_object *object, size_t index);

rglsl_result rglsl_compiler_preprocess(const rglsl_compiler *compiler,
                                       const char *source,
                                       const rglsl_compile_options *options,
                                       rglsl_blob **text,
                                       rglsl_diagnostics **diagnostics);

rglsl_result rglsl_compiler_build(const rglsl_compiler *compiler,
                                  const char *const *sources,
                                  const rglsl_compile_options *const *options,
                                  size_t count,
                                  const rglsl_program_options *program_options,
                                  rglsl_program **program,
                                  rglsl_diagnostics **diagnostics);

const char *rglsl_program_reflection(const rglsl_program *program);

size_t rglsl_program_file_count(const rglsl_program *program);

const char *rglsl_program_file(const rglsl_program *program, size_t index);

const char *rglsl_blob_text(const rglsl_blob *blob);

rglsl_result rglsl_disassemble(const uint32_t *words,
                               size_t word_count,
                               rglsl_disassembly form,
                               rglsl_blob **text);

rglsl_result rglsl_hex_text(const uint32_t *words,
                            size_t word_count,
                            const char *variable_name,
                            rglsl_blob **text);

rglsl_result rglsl_depfile(const char *const *targets,
                           size_t target_count,
                           const char *const *dependencies,
                           size_t dependency_count,
                           rglsl_blob **text);

rglsl_result rglsl_diagnostics_format(const rglsl_diagnostics *diagnostics,
                                      uint32_t flags,
                                      rglsl_blob **text);

rglsl_result rglsl_diagnostics_info_log(const rglsl_diagnostics *diagnostics,
                                        uint32_t flags,
                                        rglsl_blob **text);

rglsl_result rglsl_spirv_reflect(const uint32_t *words,
                                 size_t word_count,
                                 rglsl_spirv_reflection **reflection,
                                 rglsl_diagnostics **diagnostics);

void rglsl_spirv_reflection_destroy(rglsl_spirv_reflection *reflection);

rglsl_result rglsl_program_spirv_reflection(const rglsl_program *program,
                                            size_t index,
                                            rglsl_spirv_reflection **reflection,
                                            rglsl_diagnostics **diagnostics);

rglsl_result rglsl_spirv_reflection_stage(const rglsl_spirv_reflection *reflection,
                                          rglsl_stage *stage);

const char *rglsl_spirv_reflection_entry_point(const rglsl_spirv_reflection *reflection);

rglsl_result rglsl_spirv_reflection_local_size(const rglsl_spirv_reflection *reflection,
                                               uint32_t dimension,
                                               bool *present,
                                               uint32_t *size,
                                               bool *specialized,
                                               uint32_t *spec_id);

size_t rglsl_spirv_reflection_binding_count(const rglsl_spirv_reflection *reflection);

rglsl_result rglsl_spirv_reflection_binding(const rglsl_spirv_reflection *reflection,
                                            size_t index,
                                            uint32_t *set,
                                            uint32_t *binding,
                                            rglsl_descriptor_type *descriptor_type,
                                            uint32_t *count,
                                            uint32_t *variable_id);

const char *rglsl_spirv_reflection_binding_name(const rglsl_spirv_reflection *reflection,
                                                size_t index);

rglsl_result rglsl_spirv_reflection_binding_block(const rglsl_spirv_reflection *reflection,
                                                  size_t index,
                                                  bool *is_block,
                                                  uint32_t *size,
                                                  uint32_t *runtime_array_stride);

uint32_t rglsl_spirv_reflection_descriptor_heaps(const rglsl_spirv_reflection *reflection);

size_t rglsl_spirv_reflection_push_constant_count(const rglsl_spirv_reflection *reflection);

rglsl_result rglsl_spirv_reflection_push_constant(const rglsl_spirv_reflection *reflection,
                                                  size_t index,
                                                  uint32_t *offset,
                                                  uint32_t *size,
                                                  uint32_t *variable_id);

const char *rglsl_spirv_reflection_push_constant_name(const rglsl_spirv_reflection *reflection,
                                                      size_t index);

rglsl_result rglsl_spirv_reflection_push_constant_bank(const rglsl_spirv_reflection *reflection,
                                                       size_t index,
                                                       bool *banked,
                                                       uint32_t *bank,
                                                       uint32_t *bank_offset);

size_t rglsl_spirv_reflection_interface_count(const rglsl_spirv_reflection *reflection,
                                              rglsl_interface direction);

rglsl_result rglsl_spirv_reflection_interface(const rglsl_spirv_reflection *reflection,
                                              rglsl_interface direction,
                                              size_t index,
                                              uint32_t *location,
                                              uint32_t *component,
                                              uint32_t *variable_id);

const char *rglsl_spirv_reflection_interface_name(const rglsl_spirv_reflection *reflection,
                                                  rglsl_interface direction,
                                                  size_t index);

rglsl_result rglsl_spirv_reflection_interface_type(const rglsl_spirv_reflection *reflection,
                                                   rglsl_interface direction,
                                                   size_t index,
                                                   rglsl_scalar_kind *kind,
                                                   uint32_t *encoding,
                                                   uint32_t *width,
                                                   uint32_t *vector_size,
                                                   uint32_t *columns,
                                                   const uint32_t **array,
                                                   size_t *array_rank);

size_t rglsl_spirv_reflection_specialization_count(const rglsl_spirv_reflection *reflection);

rglsl_result rglsl_spirv_reflection_specialization(const rglsl_spirv_reflection *reflection,
                                                   size_t index,
                                                   uint32_t *spec_id,
                                                   rglsl_scalar_kind *kind,
                                                   uint32_t *encoding,
                                                   uint32_t *width,
                                                   uint64_t *default_bits,
                                                   uint32_t *result_id);

const char *rglsl_spirv_reflection_specialization_name(const rglsl_spirv_reflection *reflection,
                                                       size_t index);

rglsl_result rglsl_spirv_reflection_json(const rglsl_spirv_reflection *reflection,
                                         rglsl_blob **json);

rglsl_result rglsl_program_spirv_reflection_json(const rglsl_program *program,
                                                 rglsl_blob **json,
                                                 rglsl_diagnostics **diagnostics);

rglsl_result rglsl_spirv_reflect_graph(const uint32_t *words,
                                       size_t word_count,
                                       rglsl_spirv_graph_reflection **reflection,
                                       rglsl_diagnostics **diagnostics);

void rglsl_spirv_graph_reflection_destroy(rglsl_spirv_graph_reflection *reflection);

size_t rglsl_spirv_graph_reflection_entry_point_count(const rglsl_spirv_graph_reflection *reflection);

const char *rglsl_spirv_graph_reflection_entry_point_name(const rglsl_spirv_graph_reflection *reflection,
                                                          size_t entry);

rglsl_result rglsl_spirv_graph_reflection_entry_point_graph_id(const rglsl_spirv_graph_reflection *reflection,
                                                               size_t entry,
                                                               uint32_t *graph_id);

size_t rglsl_spirv_graph_reflection_tensor_count(const rglsl_spirv_graph_reflection *reflection,
                                                 size_t entry,
                                                 rglsl_interface direction);

rglsl_result rglsl_spirv_graph_reflection_tensor(const rglsl_spirv_graph_reflection *reflection,
                                                 size_t entry,
                                                 rglsl_interface direction,
                                                 size_t index,
                                                 uint32_t *set,
                                                 uint32_t *binding,
                                                 uint32_t *count,
                                                 uint32_t *variable_id);

const char *rglsl_spirv_graph_reflection_tensor_name(const rglsl_spirv_graph_reflection *reflection,
                                                     size_t entry,
                                                     rglsl_interface direction,
                                                     size_t index);

rglsl_result rglsl_spirv_graph_reflection_tensor_type(const rglsl_spirv_graph_reflection *reflection,
                                                      size_t entry,
                                                      rglsl_interface direction,
                                                      size_t index,
                                                      rglsl_scalar_kind *kind,
                                                      uint32_t *encoding,
                                                      uint32_t *width,
                                                      bool *ranked,
                                                      uint32_t *rank,
                                                      bool *shaped,
                                                      const uint32_t **shape,
                                                      size_t *shape_rank);

size_t rglsl_spirv_graph_reflection_constant_count(const rglsl_spirv_graph_reflection *reflection);

rglsl_result rglsl_spirv_graph_reflection_constant(const rglsl_spirv_graph_reflection *reflection,
                                                   size_t index,
                                                   uint32_t *id,
                                                   uint32_t *result_id);

const char *rglsl_spirv_graph_reflection_constant_name(const rglsl_spirv_graph_reflection *reflection,
                                                       size_t index);

rglsl_result rglsl_spirv_graph_reflection_constant_type(const rglsl_spirv_graph_reflection *reflection,
                                                        size_t index,
                                                        rglsl_scalar_kind *kind,
                                                        uint32_t *encoding,
                                                        uint32_t *width,
                                                        bool *ranked,
                                                        uint32_t *rank,
                                                        bool *shaped,
                                                        const uint32_t **shape,
                                                        size_t *shape_rank);

rglsl_result rglsl_spirv_graph_reflection_json(const rglsl_spirv_graph_reflection *reflection,
                                               rglsl_blob **json);

rglsl_result rglsl_pipeline_layout_create(const rglsl_spirv_reflection *const *reflections,
                                          size_t count,
                                          rglsl_pipeline_layout **layout,
                                          rglsl_diagnostics **diagnostics);

rglsl_result rglsl_program_pipeline_layout(const rglsl_program *program,
                                           rglsl_pipeline_layout **layout,
                                           rglsl_diagnostics **diagnostics);

void rglsl_pipeline_layout_destroy(rglsl_pipeline_layout *layout);

size_t rglsl_pipeline_layout_binding_count(const rglsl_pipeline_layout *layout);

rglsl_result rglsl_pipeline_layout_binding(const rglsl_pipeline_layout *layout,
                                           size_t index,
                                           uint32_t *set,
                                           uint32_t *binding,
                                           rglsl_descriptor_type *descriptor_type,
                                           uint32_t *count,
                                           uint32_t *stage_flags);

const char *rglsl_pipeline_layout_binding_name(const rglsl_pipeline_layout *layout, size_t index);

size_t rglsl_pipeline_layout_push_constant_range_count(const rglsl_pipeline_layout *layout);

rglsl_result rglsl_pipeline_layout_push_constant_range(const rglsl_pipeline_layout *layout,
                                                       size_t index,
                                                       uint32_t *stage_flags,
                                                       uint32_t *offset,
                                                       uint32_t *size);

rglsl_result rglsl_pipeline_layout_push_constant_range_bank(const rglsl_pipeline_layout *layout,
                                                            size_t index,
                                                            bool *banked,
                                                            uint32_t *bank);

#ifdef __cplusplus
}  // extern "C"
#endif  // __cplusplus

#endif  /* RGLSL_H */
