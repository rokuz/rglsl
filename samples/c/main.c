#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "rglsl.h"

static const char *const vertex_source =
    "#version 450\n"
    "layout(location = 0) in vec3 position;\n"
    "layout(location = 1) in vec3 normal;\n"
    "layout(location = 0) out vec3 world_normal;\n"
    "layout(location = 1) out vec3 world_position;\n"
    "void main() {\n"
    "    world_normal = normal;\n"
    "    world_position = position;\n"
    "    gl_Position = vec4(position, 1.0);\n"
    "}\n";

static const char *const fragment_source =
    "#version 450\n"
    "layout(location = 0) in vec3 world_normal;\n"
    "layout(location = 0) out vec4 color;\n"
    "layout(constant_id = 0) const float EXPOSURE = 1.0;\n"
    "vec3 shade(vec3 normal);\n"
    "void main() {\n"
    "    color = vec4(shade(normalize(world_normal)) * EXPOSURE, 1.0);\n"
    "}\n";

static const char *const lighting_source =
    "#version 450\n"
    "#include \"light.h\"\n"
    "#include <material.h>\n"
    "vec3 shade(vec3 normal) {\n"
    "    float diffuse = max(dot(normal, LIGHT_DIRECTION), 0.0);\n"
    "    return ALBEDO * (AMBIENT + diffuse * (1.0 - ROUGHNESS));\n"
    "}\n";

static const char *const broken_source =
    "#version 450\n"
    "layout(location = 0) out vec4 color;\n"
    "void main() {\n"
    "    color = vec4(brightness);\n"
    "}\n";

struct include_log {
    int calls;
};

static void include_material(void *user_data, const char *requested, bool system,
                             const char *includer, rglsl_include_result *result)
{
    struct include_log *log = (struct include_log *)user_data;
    log->calls += 1;
    printf("include callback: %c%s%c from %s\n", system ? '<' : '"', requested,
           system ? '>' : '"', includer ? includer : "(none)");
    if (system && strcmp(requested, "material.h") == 0) {
        rglsl_include_result_set(result, "virtual/material.h",
                                 "const vec3 ALBEDO = vec3(0.8, 0.6, 0.4);\n"
                                 "const float ROUGHNESS = 0.25;\n");
    }
}

static void report(const char *what, rglsl_result code, rglsl_diagnostics *diagnostics)
{
    printf("%s failed with code %u:\n%s\n", what, (unsigned)code,
           diagnostics ? rglsl_diagnostics_text(diagnostics) : "");
    if (diagnostics && rglsl_diagnostics_count(diagnostics) > 0) {
        rglsl_severity severity = RGLSL_SEVERITY_WARNING;
        const char *file = NULL;
        uint32_t line = 0;
        uint32_t column = 0;
        if (rglsl_diagnostics_location(diagnostics, 0, &severity, &file, &line, &column) ==
                RGLSL_RESULT_OK &&
            file != NULL) {
            printf("first %s at %s, line %u, column %u\n",
                   severity == RGLSL_SEVERITY_ERROR ? "error" : "warning", file,
                   (unsigned)line, (unsigned)column);
        }
    }
    rglsl_diagnostics_destroy(diagnostics);
}

static rglsl_object *compile(const char *source, const rglsl_compile_options *options,
                             const char *what)
{
    rglsl_object *object = NULL;
    rglsl_diagnostics *diagnostics = NULL;
    rglsl_result code = rglsl_compile(source, options, &object, &diagnostics);
    if (code != RGLSL_RESULT_OK) {
        report(what, code, diagnostics);
        return NULL;
    }
    printf("compiled %s\n", what);
    return object;
}

static rglsl_compile_options *stage_options(const char *name, rglsl_stage stage)
{
    rglsl_compile_options *options = NULL;
    if (rglsl_compile_options_create(name, stage, &options) != RGLSL_RESULT_OK) {
        return NULL;
    }
    return options;
}

static rglsl_compile_options *lighting_options(struct include_log *log)
{
    rglsl_compile_options *options = NULL;
    if (rglsl_compile_options_create_library("lighting.glsl", &options) != RGLSL_RESULT_OK) {
        return NULL;
    }
    if (rglsl_compile_options_add_define(options, "AMBIENT", "0.1") != RGLSL_RESULT_OK ||
        rglsl_compile_options_add_include(
            options, "light.h", "const vec3 LIGHT_DIRECTION = vec3(0.0, 0.0, 1.0);\n") !=
            RGLSL_RESULT_OK ||
        rglsl_compile_options_set_includer(options, include_material, log) != RGLSL_RESULT_OK) {
        rglsl_compile_options_destroy(options);
        return NULL;
    }
    return options;
}

static const char *stage_extension(rglsl_stage stage)
{
    switch (stage) {
    case RGLSL_STAGE_VERTEX:
        return "vert";
    case RGLSL_STAGE_FRAGMENT:
        return "frag";
    default:
        return "spv";
    }
}

static void print_interface(const rglsl_reflection *reflection, rglsl_interface direction,
                            const char *what)
{
    size_t count = rglsl_reflection_interface_count(reflection, direction);
    for (size_t index = 0; index < count; ++index) {
        uint32_t location = 0;
        uint32_t component = 0;
        uint32_t width = 0;
        uint32_t vector_size = 0;
        uint32_t columns = 0;
        rglsl_scalar_kind kind = RGLSL_SCALAR_KIND_FLOAT;
        if (rglsl_reflection_interface(reflection, direction, index, &location, &component,
                                       NULL) != RGLSL_RESULT_OK ||
            rglsl_reflection_interface_type(reflection, direction, index, &kind, &width,
                                            &vector_size, &columns, NULL,
                                            NULL) != RGLSL_RESULT_OK) {
            continue;
        }
        const char *name = rglsl_reflection_interface_name(reflection, direction, index);
        printf("  %s %s: location %u, component %u, %u x %u of %u-bit kind %u\n", what,
               name ? name : "(unnamed)", (unsigned)location, (unsigned)component,
               (unsigned)columns, (unsigned)vector_size, (unsigned)width, (unsigned)kind);
    }
}

static void print_reflection(const rglsl_reflection *reflection)
{
    size_t bindings = rglsl_reflection_binding_count(reflection);
    for (size_t index = 0; index < bindings; ++index) {
        uint32_t set = 0;
        uint32_t binding = 0;
        uint32_t count = 0;
        rglsl_descriptor_type type = RGLSL_DESCRIPTOR_TYPE_SAMPLER;
        if (rglsl_reflection_binding(reflection, index, &set, &binding, &type, &count, NULL) ==
            RGLSL_RESULT_OK) {
            const char *name = rglsl_reflection_binding_name(reflection, index);
            printf("  binding %s: set %u, binding %u, VkDescriptorType %u, count %u\n",
                   name ? name : "(unnamed)", (unsigned)set, (unsigned)binding,
                   (unsigned)type, (unsigned)count);
        }
    }
    print_interface(reflection, RGLSL_INTERFACE_INPUT, "input");
    print_interface(reflection, RGLSL_INTERFACE_OUTPUT, "output");
}

static int write_stages(const rglsl_program *program, const char *directory)
{
    size_t count = rglsl_program_stage_count(program);
    for (size_t index = 0; index < count; ++index) {
        rglsl_stage stage = 0;
        const uint32_t *words = NULL;
        size_t word_count = 0;
        if (rglsl_program_stage(program, index, &stage) != RGLSL_RESULT_OK ||
            rglsl_program_spirv(program, index, &words, &word_count) != RGLSL_RESULT_OK) {
            return 1;
        }
        char path[4096];
        snprintf(path, sizeof path, "%s/%s.spv", directory, stage_extension(stage));
        FILE *file = fopen(path, "wb");
        if (file == NULL) {
            fprintf(stderr, "cannot write %s\n", path);
            return 1;
        }
        size_t written = fwrite(words, sizeof *words, word_count, file);
        fclose(file);
        if (written != word_count) {
            fprintf(stderr, "cannot write %s\n", path);
            return 1;
        }
        printf("%s stage: entry point %s, %zu words -> %s\n", stage_extension(stage),
               rglsl_program_entry_point(program, index), word_count, path);
        print_reflection(rglsl_program_stage_reflection(program, index));
    }
    return 0;
}

static int print_pipeline_layout(const rglsl_program *program)
{
    rglsl_pipeline_layout *layout = NULL;
    rglsl_diagnostics *diagnostics = NULL;
    rglsl_result code = rglsl_program_pipeline_layout(program, &layout, &diagnostics);
    if (code != RGLSL_RESULT_OK) {
        report("merging the pipeline layout", code, diagnostics);
        return 1;
    }
    printf("pipeline layout: %zu bindings, %zu push constant ranges\n",
           rglsl_pipeline_layout_binding_count(layout),
           rglsl_pipeline_layout_push_constant_range_count(layout));
    rglsl_pipeline_layout_destroy(layout);
    rglsl_blob *json = NULL;
    code = rglsl_program_reflection_json(program, &json, &diagnostics);
    if (code != RGLSL_RESULT_OK) {
        report("writing the reflection", code, diagnostics);
        return 1;
    }
    printf("reflection JSON: %zu bytes\n", rglsl_blob_size(json));
    rglsl_blob_destroy(json);
    return 0;
}

static rglsl_object *round_trip(const rglsl_object *object)
{
    rglsl_blob *blob = NULL;
    rglsl_diagnostics *diagnostics = NULL;
    rglsl_result code = rglsl_object_write(object, &blob, &diagnostics);
    if (code != RGLSL_RESULT_OK) {
        report("writing the object", code, diagnostics);
        return NULL;
    }
    rglsl_object *copy = NULL;
    code = rglsl_object_read(rglsl_blob_data(blob), rglsl_blob_size(blob), &copy, &diagnostics);
    printf("object file: %zu bytes\n", rglsl_blob_size(blob));
    rglsl_blob_destroy(blob);
    if (code != RGLSL_RESULT_OK) {
        report("reading the object", code, diagnostics);
        return NULL;
    }
    return copy;
}

static int link_program(const char *directory, rglsl_object *const *objects, size_t count)
{
    rglsl_program_options *options = NULL;
    if (rglsl_program_options_create(&options) != RGLSL_RESULT_OK ||
        rglsl_program_options_set_spirv_version(options, 1, 3) != RGLSL_RESULT_OK ||
        rglsl_program_options_set_optimization(options, RGLSL_OPT_LEVEL_PERFORMANCE) !=
            RGLSL_RESULT_OK ||
        rglsl_program_options_set_target_gpu(options, RGLSL_TARGET_GPU_UNIVERSAL_DESKTOP) !=
            RGLSL_RESULT_OK ||
        rglsl_program_options_add_specialization(options, 0, "1.5") != RGLSL_RESULT_OK) {
        rglsl_program_options_destroy(options);
        return 1;
    }
    rglsl_program *program = NULL;
    rglsl_diagnostics *diagnostics = NULL;
    rglsl_result code = rglsl_link((const rglsl_object *const *)objects, count, options,
                                   &program, &diagnostics);
    rglsl_program_options_destroy(options);
    if (code != RGLSL_RESULT_OK) {
        report("linking", code, diagnostics);
        return 1;
    }
    int status = write_stages(program, directory);
    status |= print_pipeline_layout(program);
    rglsl_program_destroy(program);
    return status;
}

static int show_compile_error(void)
{
    rglsl_compile_options *options = stage_options("broken.frag", RGLSL_STAGE_FRAGMENT);
    rglsl_object *object = compile(broken_source, options, "broken.frag");
    rglsl_compile_options_destroy(options);
    if (object != NULL) {
        rglsl_object_destroy(object);
        return 1;
    }
    return 0;
}

static int show_link_error(const rglsl_object *fragment)
{
    rglsl_program *program = NULL;
    rglsl_diagnostics *diagnostics = NULL;
    rglsl_result code = rglsl_link(&fragment, 1, NULL, &program, &diagnostics);
    if (code == RGLSL_RESULT_OK) {
        rglsl_program_destroy(program);
        return 1;
    }
    report("linking without the library", code, diagnostics);
    return 0;
}

static int show_build_and_text_forms(rglsl_compile_options *const *options)
{
    rglsl_compiler *compiler = NULL;
    rglsl_program_options *program_options = NULL;
    rglsl_program *program = NULL;
    rglsl_diagnostics *diagnostics = NULL;
    rglsl_blob *text = NULL;
    int status = 1;
    if (rglsl_compiler_create(&compiler) != RGLSL_RESULT_OK ||
        rglsl_program_options_create(&program_options) != RGLSL_RESULT_OK ||
        rglsl_program_options_set_reflection(program_options, true, 0) != RGLSL_RESULT_OK) {
        goto done;
    }
    const char *sources[3] = {vertex_source, fragment_source, lighting_source};
    rglsl_result code =
        rglsl_compiler_build(compiler, sources, (const rglsl_compile_options *const *)options, 3,
                             program_options, &program, &diagnostics);
    if (code != RGLSL_RESULT_OK) {
        report("building from sources", code, diagnostics);
        goto done;
    }
    const char *reflection = rglsl_program_reflection(program);
    printf("reflection: %s", reflection != NULL ? reflection : "(none)\n");
    const uint32_t *words = NULL;
    size_t word_count = 0;
    if (rglsl_program_spirv(program, 0, &words, &word_count) != RGLSL_RESULT_OK ||
        rglsl_disassemble(words, word_count, RGLSL_DISASSEMBLY_GLSLANG, &text) != RGLSL_RESULT_OK) {
        goto done;
    }
    const char *disassembly = rglsl_blob_text(text);
    printf("disassembly: %.*s\n", (int)strcspn(disassembly, "\n"), disassembly);
    status = 0;

done:
    rglsl_blob_destroy(text);
    rglsl_program_destroy(program);
    rglsl_program_options_destroy(program_options);
    rglsl_compiler_destroy(compiler);
    return status;
}

int main(int argc, char **argv)
{
    const char *directory = argc > 1 ? argv[1] : ".";
    printf("rglsl %s (ABI %u)\n", rglsl_version(), (unsigned)rglsl_abi_version());
    if (rglsl_abi_version() != RGLSL_ABI_VERSION) {
        fprintf(stderr, "rglsl.h does not match the library\n");
        return 1;
    }

    struct include_log log = {0};
    rglsl_compile_options *vertex_options = stage_options("main.vert", RGLSL_STAGE_VERTEX);
    rglsl_compile_options *fragment_options = stage_options("main.frag", RGLSL_STAGE_FRAGMENT);
    rglsl_compile_options *library_options = lighting_options(&log);
    rglsl_object *objects[3] = {NULL, NULL, NULL};
    int status = 1;
    if (vertex_options == NULL || fragment_options == NULL || library_options == NULL) {
        fprintf(stderr, "cannot create the compile options\n");
        goto done;
    }
    objects[0] = compile(vertex_source, vertex_options, "main.vert");
    objects[1] = compile(fragment_source, fragment_options, "main.frag");
    rglsl_object *library = compile(lighting_source, library_options, "lighting.glsl");
    if (library != NULL) {
        objects[2] = round_trip(library);
        rglsl_object_destroy(library);
    }
    if (objects[0] == NULL || objects[1] == NULL || objects[2] == NULL) {
        goto done;
    }
    printf("include callback calls: %d\n", log.calls);
    status = link_program(directory, objects, 3);
    status |= show_compile_error();
    status |= show_link_error(objects[1]);
    rglsl_compile_options *all_options[3] = {vertex_options, fragment_options, library_options};
    status |= show_build_and_text_forms(all_options);

done:
    for (size_t index = 0; index < 3; ++index) {
        rglsl_object_destroy(objects[index]);
    }
    rglsl_compile_options_destroy(vertex_options);
    rglsl_compile_options_destroy(fragment_options);
    rglsl_compile_options_destroy(library_options);
    return status;
}
