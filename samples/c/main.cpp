#include <cstdio>
#include <fstream>
#include <map>
#include <memory>
#include <string>
#include <vector>

#include "rglsl.h"

namespace {

struct Deleter {
    void operator()(rglsl_compile_options *options) const { rglsl_compile_options_destroy(options); }
    void operator()(rglsl_object *object) const { rglsl_object_destroy(object); }
    void operator()(rglsl_program *program) const { rglsl_program_destroy(program); }
    void operator()(rglsl_diagnostics *diagnostics) const { rglsl_diagnostics_destroy(diagnostics); }
    void operator()(rglsl_reflection *reflection) const { rglsl_reflection_destroy(reflection); }
};

template <typename T>
using Handle = std::unique_ptr<T, Deleter>;

using Headers = std::map<std::string, std::string>;

const char *const blur_source = R"(#version 450
#include "kernel.h"
layout(local_size_x = 64) in;
layout(set = 0, binding = 0) buffer Samples { float samples[]; };
void main() {
    uint index = gl_GlobalInvocationID.x;
    samples[index] = blur(index);
}
)";

const char *const kernel_source = R"(#version 450
#include <weights.h>
layout(set = 0, binding = 0) buffer Samples { float samples[]; };
float blur(uint index) {
    float sum = 0.0;
    for (int offset = -RADIUS; offset <= RADIUS; ++offset) {
        sum += samples[uint(int(index) + offset)] * weight(offset);
    }
    return sum;
}
)";

void include_header(void *user_data, const char *requested, bool, const char *,
                    rglsl_include_result *result)
{
    const Headers &headers = *static_cast<const Headers *>(user_data);
    auto header = headers.find(requested);
    if (header != headers.end()) {
        rglsl_include_result_set(result, header->first.c_str(), header->second.c_str());
    }
}

Handle<rglsl_object> compile(const char *source, const char *name, const rglsl_stage *stage,
                             const Headers &headers)
{
    rglsl_compile_options *raw_options = nullptr;
    rglsl_result code = stage ? rglsl_compile_options_create(name, *stage, &raw_options)
                              : rglsl_compile_options_create_library(name, &raw_options);
    Handle<rglsl_compile_options> options(raw_options);
    if (code != RGLSL_RESULT_OK ||
        rglsl_compile_options_set_includer(options.get(), include_header,
                                           const_cast<Headers *>(&headers)) != RGLSL_RESULT_OK) {
        return nullptr;
    }
    rglsl_object *object = nullptr;
    rglsl_diagnostics *raw_diagnostics = nullptr;
    code = rglsl_compile(source, options.get(), &object, &raw_diagnostics);
    Handle<rglsl_diagnostics> diagnostics(raw_diagnostics);
    if (code != RGLSL_RESULT_OK) {
        std::fprintf(stderr, "%s\n", rglsl_diagnostics_text(diagnostics.get()));
    }
    return Handle<rglsl_object>(object);
}

}

int main(int argc, char **argv)
{
    std::string directory = argc > 1 ? argv[1] : ".";
    Headers headers = {
        {"kernel.h", "float blur(uint index);\n"},
        {"weights.h", "const int RADIUS = 2;\nfloat weight(int offset) { return 1.0 / "
                      "float(2 * RADIUS + 1); }\n"},
    };
    const rglsl_stage compute = RGLSL_STAGE_COMPUTE;
    Handle<rglsl_object> blur = compile(blur_source, "blur.comp", &compute, headers);
    Handle<rglsl_object> kernel = compile(kernel_source, "kernel.glsl", nullptr, headers);
    if (!blur || !kernel) {
        return 1;
    }
    const rglsl_object *objects[] = {blur.get(), kernel.get()};
    rglsl_program *raw_program = nullptr;
    rglsl_diagnostics *raw_diagnostics = nullptr;
    rglsl_result code = rglsl_link(objects, 2, nullptr, &raw_program, &raw_diagnostics);
    Handle<rglsl_program> program(raw_program);
    Handle<rglsl_diagnostics> diagnostics(raw_diagnostics);
    if (code != RGLSL_RESULT_OK) {
        std::fprintf(stderr, "%s\n", rglsl_diagnostics_text(diagnostics.get()));
        return 1;
    }
    const uint32_t *words = nullptr;
    size_t word_count = 0;
    if (rglsl_program_spirv(program.get(), 0, &words, &word_count) != RGLSL_RESULT_OK) {
        return 1;
    }
    std::vector<uint32_t> binary(words, words + word_count);
    std::string path = directory + "/blur.comp.spv";
    std::ofstream(path, std::ios::binary)
        .write(reinterpret_cast<const char *>(binary.data()),
               static_cast<std::streamsize>(binary.size() * sizeof(uint32_t)));
    std::printf("C++: compute stage, entry point %s, %zu words -> %s\n",
                rglsl_program_entry_point(program.get(), 0), word_count, path.c_str());

    rglsl_reflection *raw_reflection = nullptr;
    code = rglsl_reflect(binary.data(), binary.size(), &raw_reflection, &raw_diagnostics);
    Handle<rglsl_reflection> reflection(raw_reflection);
    diagnostics.reset(raw_diagnostics);
    if (code != RGLSL_RESULT_OK) {
        std::fprintf(stderr, "%s\n", rglsl_diagnostics_text(diagnostics.get()));
        return 1;
    }
    uint32_t local_size[3] = {0, 0, 0};
    for (uint32_t dimension = 0; dimension < 3; ++dimension) {
        if (rglsl_reflection_local_size(reflection.get(), dimension, &local_size[dimension],
                                        nullptr, nullptr) != RGLSL_RESULT_OK) {
            return 1;
        }
    }
    uint32_t set = 0;
    uint32_t binding = 0;
    uint32_t block_size = 0;
    uint32_t stride = 0;
    rglsl_descriptor_type type = RGLSL_DESCRIPTOR_TYPE_SAMPLER;
    if (rglsl_reflection_binding_count(reflection.get()) != 1 ||
        rglsl_reflection_binding(reflection.get(), 0, &set, &binding, &type, nullptr,
                                 nullptr) != RGLSL_RESULT_OK ||
        type != RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER ||
        rglsl_reflection_binding_block(reflection.get(), 0, &block_size, &stride) !=
            RGLSL_RESULT_OK) {
        return 1;
    }
    std::printf("C++: local size %u x %u x %u, storage buffer at set %u binding %u, "
                "%u bytes + %u-byte elements\n",
                local_size[0], local_size[1], local_size[2], set, binding, block_size, stride);
    return 0;
}
