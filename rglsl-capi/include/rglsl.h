#ifndef RGLSL_H
#define RGLSL_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define RGLSL_ABI_VERSION 1

typedef struct rglsl_blob rglsl_blob;

typedef struct rglsl_compile_options rglsl_compile_options;

typedef struct rglsl_diagnostics rglsl_diagnostics;

typedef struct rglsl_include_result rglsl_include_result;

typedef struct rglsl_object rglsl_object;

typedef struct rglsl_program rglsl_program;

typedef struct rglsl_program_options rglsl_program_options;

typedef uint32_t rglsl_result;

typedef uint32_t rglsl_stage;

typedef void (*rglsl_include_callback)(void *user_data,
                                       const char *requested,
                                       bool system,
                                       const char *includer,
                                       rglsl_include_result *result);

typedef uint32_t rglsl_severity;

#define RGLSL_RESULT_OK 0

#define RGLSL_RESULT_INVALID_ARGUMENT 1

#define RGLSL_RESULT_COMPILE_FAILED 2

#define RGLSL_RESULT_LINK_FAILED 3

#define RGLSL_RESULT_INVALID_OBJECT 4

#define RGLSL_RESULT_INTERNAL_ERROR 5

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

rglsl_result rglsl_compile_options_set_auto_map_bindings(rglsl_compile_options *options,
                                                         bool enabled);

rglsl_result rglsl_compile_options_set_auto_map_locations(rglsl_compile_options *options,
                                                          bool enabled);

rglsl_result rglsl_compile_options_set_debug_info(rglsl_compile_options *options, bool enabled);

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

rglsl_result rglsl_program_options_set_auto_map_bindings(rglsl_program_options *options,
                                                         bool enabled);

rglsl_result rglsl_program_options_set_auto_map_locations(rglsl_program_options *options,
                                                          bool enabled);

rglsl_result rglsl_program_options_set_debug_info(rglsl_program_options *options, bool enabled);

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

#ifdef __cplusplus
}  // extern "C"
#endif  // __cplusplus

#endif  /* RGLSL_H */
