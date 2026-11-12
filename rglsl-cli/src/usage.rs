pub const USAGE: &str = "\
Usage: rglsl [option]... [file]...

rglsl compiles Vulkan GLSL (#version 450 and 460) to SPIR-V. Its options are the
subset of glslangValidator's options that applies to Vulkan GLSL.

'file' with one of the following endings can be auto-classified:
1) .<stage>, where <stage> is one of:
    vert    for a vertex shader
    tesc    for a tessellation control shader
    tese    for a tessellation evaluation shader
    geom    for a geometry shader
    frag    for a fragment shader
    comp    for a compute shader
    mesh    for a mesh shader
    task    for a task shader
    rgen    for a ray generation shader
    rint    for a ray intersection shader
    rahit   for a ray any hit shader
    rchit   for a ray closest hit shader
    rmiss   for a ray miss shader
    rcall   for a ray callable shader
2) .<stage>.glsl compound suffix, where stage options are described above
3) .glsl without a stage: a library, linked into the programs of the other files
4) .rglo: an rglsl object module (see --object)

Options:
  -C          accepted for compatibility (all errors are reported)
  -D<name[=def]> | --D <name[=def]> | --define-macro <name[=def]>
              define a pre-processor macro
  -E          print pre-processed GLSL; cannot be used with -l; errors will
              appear on stderr
  -H          print human readable form of SPIR-V (rspirv's disassembly); turns
              on -V
  -I<dir>     add <dir> to the include search path; includer's directory is
              searched first, followed by left-to-right order of -I
  -O | -Os | -Od
              accepted for compatibility; rglsl does not optimize
  -S <stage>  uses the specified <stage> rather than parsing the file extension
  -U<name> | --undef-macro <name> | --U <name>
              undefine a pre-processor macro
  -V[100]     create SPIR-V binary under Vulkan semantics; turns on -l; default
              file name is <stage>.spv (-o overrides this)
  -e <name> | --entry-point <name>
              specify <name> as the entry-point function name
  -g          generate debug information
  -g0         strip debug information
  -gV         generate nonsemantic shader debug information
  -gVS        generate nonsemantic shader debug information with source
  -h | --help print this usage message
  -i          accepted for compatibility; no AST is printed
  -l          link all input files together to form a single module
  -o <file>   save binary to <file>; requires a binary option (e.g., -V)
  -q          dump reflection query database; requires -l for linking
  -r | --relaxed-errors
              accepted for compatibility; errors are not relaxed
  -s          silence syntax and semantic error reporting
  -t          accepted for compatibility
  -v | --version
              print version strings
  -w | --suppress-warnings
              suppress warnings
  -x          save binary output as text-based 32-bit hexadecimal numbers
  -dumpfullversion | -dumpversion   print the bare version
  --absolute-path                   prints absolute path for messages
  --auto-map-binding | --auto-map-bindings | --amb
                                    automatically bind uniform variables without
                                    explicit bindings
  --auto-map-locations | --aml      automatically locate input/output lacking
                                    'location'
  --client vulkan100                see -V
  --depfile <file>                  writes depfile for build systems
  --error-column                    display the column of the error along the
                                    line
  --hlsl-offsets                    allow block offsets to follow HLSL rules
  --keep-uncalled | --ku            don't eliminate uncalled functions
  --quiet                           do not print the names of the compiled files
  --reflect-all-block-variables     reflect all variables in blocks, whether
                                    inactive or active
  --reflect-all-io-variables        reflect all input and output variables,
                                    whether used or not
  --reflect-basic-array-suffix      arrays of basic types will have trailing [0]
  --reflect-intermediate-io         reflection includes inputs/outputs of linked
                                    shaders rather than just vertex/fragment
  --reflect-separate-buffers        reflect buffer variables and blocks
                                    separately to uniforms
  --reflect-shared-std140-ssbo      reflect std140 and shared buffer blocks
                                    whether used or not
  --reflect-shared-std140-ubo       reflect std140 and shared uniform blocks
                                    whether used or not
  --reflect-strict-array-suffix     use strict array suffix rules when
                                    reflecting
  --reflect-unwrap-io-blocks        unwrap input/output blocks the same as
                                    uniform blocks
  --relax-set-binding-limits        accepted for compatibility
  --resource-set-binding [stage] <set>
                                    set descriptor set for all resources
  --resource-set-bindings | --rsb   synonyms for --resource-set-binding
  --shift-image-binding [stage] <num>
  --shift-image-binding [stage] <num> <set>...
                                    base binding number for images, for all sets
                                    or per descriptor set
  --shift-image-bindings | --sib    synonyms for --shift-image-binding
  --shift-sampler-binding [stage] <num> [<set>]...
  --shift-sampler-bindings | --ssb  base binding number for samplers
  --shift-ssbo-binding [stage] <num> [<set>]...
  --shift-ssbo-bindings | --sbb     base binding number for SSBOs
  --shift-texture-binding [stage] <num> [<set>]...
  --shift-texture-bindings | --stb  base binding number for textures
  --shift-uav-binding [stage] <num> [<set>]...
  --shift-uav-bindings | --suavb    base binding number for UAVs (no GLSL resource
                                    is a UAV)
  --shift-ubo-binding [stage] <num> [<set>]...
  --shift-ubo-bindings | --sub | --shift-cbuffer-binding(s) | --scb
                                    base binding number for UBOs
  --shift-combined-sampler-binding [stage] <num> [<set>]...
  --shift-combined-sampler-bindings | --scsb
                                    base binding number for combined samplers
  --shift-as-binding [stage] <num> [<set>]...
  --shift-as-bindings | --sab       base binding number for acceleration
                                    structures
  --spirv-dis                       same as -H
  --spirv-val                       accepted for compatibility; rglsl validates
                                    every module it writes
  --source-entrypoint <name> | --sep <name>
                                    the source entry point, which must be main
  --stdin                           read from stdin instead of from a file;
                                    requires providing the shader stage using -S
  --target-env {vulkan1.0 | vulkan1.1 | vulkan1.2 | vulkan1.3 | vulkan1.4 |
                spirv1.0 | spirv1.1 | spirv1.2 | spirv1.3 | spirv1.4 |
                spirv1.5 | spirv1.6}
                                    set the execution environment the generated
                                    code will be executed in; defaults to:
                                     * spirv1.0  under --target-env vulkan1.0
                                     * spirv1.3  under --target-env vulkan1.1
                                     * spirv1.5  under --target-env vulkan1.2
                                     * spirv1.6  under --target-env vulkan1.3
                                     * spirv1.6  under --target-env vulkan1.4
  --variable-name <name> | --vn <name>
                                    creates a C header file that contains a
                                    uint32_t array named <name> initialized with
                                    the shader binary code

rglsl's own options:
  --object                          compile every input file to an rglsl object
                                    module (<file>.rglo, or -o for one input)
  --link                            the same as -V: compile and link every input
                                    (GLSL sources, libraries, .rglo modules)
";
