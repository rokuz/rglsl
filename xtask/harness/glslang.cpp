#include <SPIRV/GlslangToSpv.h>
#include <StandAlone/DirStackFileIncluder.h>
#include <glslang/Public/ResourceLimits.h>
#include <glslang/Public/ShaderLang.h>
#include <spirv-tools/optimizer.hpp>

#include <chrono>
#include <cstdio>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

namespace {

using Clock = std::chrono::steady_clock;

double milliseconds(Clock::time_point started)
{
    return std::chrono::duration<double, std::milli>(Clock::now() - started).count();
}

struct Job {
    std::string path;
    bool hasStage = false;
    EShLanguage stage = EShLangVertex;
    glslang::EShTargetClientVersion vulkan = glslang::EShTargetVulkan_1_0;
    glslang::EShTargetLanguageVersion spirv = glslang::EShTargetSpv_1_0;
    bool automap = false;
    bool relax = false;
    bool hlslOffsets = false;
    bool optimize = false;
    std::string debug;
    std::vector<std::string> includeDirs;
    std::string preamble;
    int runs = 1;
};

bool unescape(const std::string& text, std::string& out)
{
    out.clear();
    for (size_t i = 0; i < text.size(); ++i) {
        if (text[i] != '\\') {
            out.push_back(text[i]);
            continue;
        }
        if (++i == text.size())
            return false;
        switch (text[i]) {
        case 'n': out.push_back('\n'); break;
        case 't': out.push_back('\t'); break;
        case '\\': out.push_back('\\'); break;
        default: return false;
        }
    }
    return true;
}

std::string escape(const std::string& text)
{
    std::string out;
    for (char c : text) {
        switch (c) {
        case '\n': out += "\\n"; break;
        case '\t': out += "\\t"; break;
        case '\\': out += "\\\\"; break;
        default: out.push_back(c);
        }
    }
    return out;
}

bool stageOf(const std::string& extension, EShLanguage& stage)
{
    static const std::pair<const char*, EShLanguage> stages[] = {
        {"vert", EShLangVertex}, {"tesc", EShLangTessControl}, {"tese", EShLangTessEvaluation},
        {"geom", EShLangGeometry}, {"frag", EShLangFragment}, {"comp", EShLangCompute},
        {"rgen", EShLangRayGen}, {"rint", EShLangIntersect}, {"rahit", EShLangAnyHit},
        {"rchit", EShLangClosestHit}, {"rmiss", EShLangMiss}, {"rcall", EShLangCallable},
        {"task", EShLangTask}, {"mesh", EShLangMesh},
    };
    for (const auto& entry : stages) {
        if (extension == entry.first) {
            stage = entry.second;
            return true;
        }
    }
    return false;
}

bool vulkanOf(const std::string& text, glslang::EShTargetClientVersion& version)
{
    static const std::pair<const char*, glslang::EShTargetClientVersion> versions[] = {
        {"1.0", glslang::EShTargetVulkan_1_0}, {"1.1", glslang::EShTargetVulkan_1_1},
        {"1.2", glslang::EShTargetVulkan_1_2}, {"1.3", glslang::EShTargetVulkan_1_3},
        {"1.4", glslang::EShTargetVulkan_1_4},
    };
    for (const auto& entry : versions) {
        if (text == entry.first) {
            version = entry.second;
            return true;
        }
    }
    return false;
}

bool spirvOf(const std::string& text, glslang::EShTargetLanguageVersion& version)
{
    static const std::pair<const char*, glslang::EShTargetLanguageVersion> versions[] = {
        {"1.0", glslang::EShTargetSpv_1_0}, {"1.1", glslang::EShTargetSpv_1_1},
        {"1.2", glslang::EShTargetSpv_1_2}, {"1.3", glslang::EShTargetSpv_1_3},
        {"1.4", glslang::EShTargetSpv_1_4}, {"1.5", glslang::EShTargetSpv_1_5},
        {"1.6", glslang::EShTargetSpv_1_6},
    };
    for (const auto& entry : versions) {
        if (text == entry.first) {
            version = entry.second;
            return true;
        }
    }
    return false;
}

bool flagOf(const std::string& text, bool& flag)
{
    if (text != "0" && text != "1")
        return false;
    flag = text == "1";
    return true;
}

bool parseJob(const std::string& line, Job& job, std::string& error)
{
    std::stringstream fields(line);
    std::string field;
    while (std::getline(fields, field, '\t')) {
        size_t equals = field.find('=');
        std::string value;
        if (equals == std::string::npos || !unescape(field.substr(equals + 1), value)) {
            error = "bad job field: " + field;
            return false;
        }
        std::string key = field.substr(0, equals);
        bool ok = true;
        if (key == "path")
            job.path = value;
        else if (key == "stage")
            ok = job.hasStage = stageOf(value, job.stage);
        else if (key == "vulkan")
            ok = vulkanOf(value, job.vulkan);
        else if (key == "spirv")
            ok = spirvOf(value, job.spirv);
        else if (key == "automap")
            ok = flagOf(value, job.automap);
        else if (key == "relax")
            ok = flagOf(value, job.relax);
        else if (key == "hlsl-offsets")
            ok = flagOf(value, job.hlslOffsets);
        else if (key == "optimize")
            ok = flagOf(value, job.optimize);
        else if (key == "debug") {
            job.debug = value;
            ok = value.empty() || value == "g" || value == "gVS";
        }
        else if (key == "include")
            job.includeDirs.push_back(value);
        else if (key == "preamble")
            job.preamble = value;
        else if (key == "runs")
            ok = std::sscanf(value.c_str(), "%d", &job.runs) == 1 && job.runs > 0;
        else
            ok = false;
        if (!ok) {
            error = "bad job field: " + field;
            return false;
        }
    }
    if (job.path.empty() || !job.hasStage) {
        error = "job without a path or a stage: " + line;
        return false;
    }
    return true;
}

struct Run {
    bool ok = false;
    std::string error;
    double parse = 0;
    double link = 0;
    double spv = 0;
    double total = 0;
    size_t words = 0;
    bool optimized = false;
    std::string optimizerError;
    double opt = 0;
    double totalOpt = 0;
    size_t optWords = 0;
};

spv_target_env targetEnv(const Job& job)
{
    switch (job.vulkan) {
    case glslang::EShTargetVulkan_1_0:
        return SPV_ENV_VULKAN_1_0;
    case glslang::EShTargetVulkan_1_1:
        return job.spirv >= glslang::EShTargetSpv_1_4 ? SPV_ENV_VULKAN_1_1_SPIRV_1_4 : SPV_ENV_VULKAN_1_1;
    case glslang::EShTargetVulkan_1_2:
        return SPV_ENV_VULKAN_1_2;
    case glslang::EShTargetVulkan_1_3:
        return SPV_ENV_VULKAN_1_3;
    default:
        return SPV_ENV_VULKAN_1_4;
    }
}

void optimize(const Job& job, std::vector<unsigned int>& spirv, Run& run)
{
    spvtools::Optimizer optimizer(targetEnv(job));
    std::string& error = run.optimizerError;
    optimizer.SetMessageConsumer([&error](spv_message_level_t level, const char*, const spv_position_t&, const char* message) {
        if (level <= SPV_MSG_ERROR && error.empty() && message)
            error = message;
    });
    optimizer.RegisterPerformancePasses();
    spvtools::OptimizerOptions options;
    options.set_run_validator(false);
    std::vector<uint32_t> optimized;
    run.optimized = optimizer.Run(spirv.data(), spirv.size(), &optimized, options);
    run.optWords = optimized.size();
    if (run.optimized)
        spirv.swap(optimized);
    else if (error.empty())
        error = "spirv-opt failed";
}

void compile(const Job& job, const std::string& source, bool withOptimizer, Run& run)
{
    int messages = EShMsgSpvRules | EShMsgVulkanRules | EShMsgHlslLegalization;
    if (!job.debug.empty())
        messages |= EShMsgDebugInfo;
    if (job.relax)
        messages |= EShMsgRelaxSetBindingLimits;
    if (job.hlslOffsets)
        messages |= EShMsgHlslOffsets;
    const char* text = source.c_str();
    const char* name = job.path.c_str();

    Clock::time_point started = Clock::now();
    glslang::TShader shader(job.stage);
    shader.setStringsWithLengthsAndNames(&text, nullptr, &name, 1);
    shader.setPreamble(job.preamble.c_str());
    if (job.automap) {
        shader.setAutoMapBindings(true);
        shader.setAutoMapLocations(true);
    }
    if (job.debug == "gVS")
        shader.setDebugInfo(true);
    shader.setEnvInput(glslang::EShSourceGlsl, job.stage, glslang::EShClientVulkan, 100);
    shader.setEnvClient(glslang::EShClientVulkan, job.vulkan);
    shader.setEnvTarget(glslang::EShTargetSpv, job.spirv);
    DirStackFileIncluder includer;
    for (const std::string& directory : job.includeDirs)
        includer.pushExternalDirectory(directory);
    if (!shader.parse(GetDefaultResources(), 100, false, EShMessages(messages), includer)) {
        run.error = shader.getInfoLog();
        return;
    }
    run.parse = milliseconds(started);

    Clock::time_point linking = Clock::now();
    glslang::TProgram program;
    program.addShader(&shader);
    if (!program.link(EShMessages(messages)) || !program.mapIO()) {
        run.error = program.getInfoLog();
        return;
    }
    run.link = milliseconds(linking);

    Clock::time_point generating = Clock::now();
    std::vector<unsigned int> spirv;
    spv::SpvBuildLogger logger;
    glslang::SpvOptions options;
    if (!job.debug.empty()) {
        options.generateDebugInfo = true;
        if (job.debug == "gVS") {
            options.emitNonSemanticShaderDebugInfo = true;
            options.emitNonSemanticShaderDebugSource = true;
        }
    }
    options.compilerSignature = "glslang";
    glslang::GlslangToSpv(*program.getIntermediate(job.stage), spirv, &logger, &options);
    run.spv = milliseconds(generating);
    run.words = spirv.size();
    run.ok = !spirv.empty();
    run.total = milliseconds(started);
    if (!run.ok) {
        run.error = logger.getAllMessages();
        return;
    }
    if (withOptimizer) {
        Clock::time_point optimizing = Clock::now();
        optimize(job, spirv, run);
        run.opt = milliseconds(optimizing);
        run.totalOpt = milliseconds(started);
    }
}

Run measure(const Job& job, const std::string& source, bool withOptimizer)
{
    Run run;
    compile(job, source, withOptimizer, run);
    return run;
}

void field(std::ostream& out, const char* key, const std::vector<double>& values)
{
    out << '\t' << key << '=';
    for (size_t i = 0; i < values.size(); ++i) {
        if (i > 0)
            out << ',';
        char number[32];
        std::snprintf(number, sizeof(number), "%.4f", values[i]);
        out << number;
    }
}

}

int main()
{
    glslang::InitializeProcess();
    std::string line;
    while (std::getline(std::cin, line)) {
        Job job;
        std::string error;
        if (!parseJob(line, job, error)) {
            std::cerr << error << '\n';
            return 2;
        }
        std::ifstream file(job.path, std::ios::binary);
        if (!file.is_open()) {
            std::cout << "rejected\t" << escape("cannot read " + job.path) << std::endl;
            continue;
        }
        std::stringstream text;
        text << file.rdbuf();
        std::string source = text.str();

        glslang::FinalizeProcess();
        glslang::InitializeProcess();
        Run first = measure(job, source, false);
        if (!first.ok) {
            std::cout << "rejected\t" << escape(first.error) << std::endl;
            continue;
        }
        Run warm = measure(job, source, job.optimize);
        bool optimized = job.optimize && warm.optimized;
        std::vector<double> steady, parse, link, spv, opt, steadyOpt;
        bool failed = false;
        for (int i = 0; i < job.runs && !failed; ++i) {
            Run run = measure(job, source, optimized);
            failed = !run.ok || (optimized && !run.optimized);
            steady.push_back(run.total);
            parse.push_back(run.parse);
            link.push_back(run.link);
            spv.push_back(run.spv);
            opt.push_back(run.opt);
            steadyOpt.push_back(run.totalOpt);
        }
        if (failed) {
            std::cout << "rejected\t" << escape("a timed run failed after the first one succeeded") << std::endl;
            continue;
        }
        std::cout << "ok";
        field(std::cout, "first", {first.total});
        field(std::cout, "words", {double(first.words)});
        field(std::cout, "steady", steady);
        field(std::cout, "parse", parse);
        field(std::cout, "link", link);
        field(std::cout, "spv", spv);
        if (optimized) {
            field(std::cout, "opt", opt);
            field(std::cout, "steady_opt", steadyOpt);
            field(std::cout, "opt_words", {double(warm.optWords)});
        } else if (job.optimize) {
            std::cout << "\topt_error=" << escape(warm.optimizerError);
        }
        std::cout << std::endl;
    }
    glslang::FinalizeProcess();
    return 0;
}
