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
5) .conf: a configuration file of resource limits that replaces the default
   configuration (see -c below for generating a template)

Options:
  -D<name[=def]> | --D <name[=def]> | --define-macro <name[=def]>
              define a pre-processor macro
  -E          print pre-processed GLSL; cannot be used with -l; errors will
              appear on stderr
  -H          print human readable form of SPIR-V (glslang's disassembly); turns
              on -V
  -I<dir>     add <dir> to the include search path; includer's directory is
              searched first, followed by left-to-right order of -I
  -O          optimizes SPIR-V for performance; with -l, the linked stages are
              one pipeline: outputs the next stage does not read, inputs no
              stage before writes and unread built-ins are removed between
              stages (the inputs of the first stage and the outputs of the
              last stage stay)
  -Os         optimizes for a smaller driver code size
  -Od         disables optimization (the default)
  -P<text> | --preamble-text <text> | --P <text>
              inject custom preamble text, which is treated as if it appeared
              immediately after the version declaration (if any)
  -S <stage>  uses the specified <stage> rather than parsing the file extension
  -U<name> | --undef-macro <name> | --U <name>
              undefine a pre-processor macro
  -V[100]     create SPIR-V binary under Vulkan semantics; turns on -l; default
              file name is <stage>.spv (-o overrides this)
  -c          configuration dump; creates the default configuration file
              (redirect to a .conf file)
  -e <name> | --entry-point <name>
              specify <name> as the entry-point function name
  -g          generate debug information
  -g0         strip debug information
  -gN         generate debug information for the source file name only
  -gV         generate nonsemantic shader debug information
  -gVS        generate nonsemantic shader debug information with source
  -h | --help print this usage message
  -l          link all input files together to form a single module
  -o <file>   save binary to <file>; requires a binary option (e.g., -V)
  -q          dump reflection query database; requires -l for linking
  -s          silence syntax and semantic error reporting
  -v | --version
              print version strings
  -w | --suppress-warnings
              suppress warnings
  -x          save binary output as text-based 32-bit hexadecimal numbers
  -dumpfullversion | -dumpversion   print the bare version
  --absolute-path                   prints absolute path for messages
  --client vulkan100                see -V
  --depfile <file>                  writes depfile for build systems
  --discard-is-terminate            map GLSL discard to OpTerminateInvocation
                                    (SPIR-V 1.6 and later; discard is OpKill
                                    before)
  --enhanced-msgs                   print more readable error messages: only
                                    the first error of each compilation
  --error-column                    display the column of the error along the
                                    line
  --invert-y | --iy                 invert position.Y output in the vertex,
                                    geometry and tessellation evaluation stages
  --nan-clamp                       favor non-NaN operand in min, max, and clamp
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
  --reflect-strict-array-suffix     use strict array suffix rules when
                                    reflecting
  --reflect-unwrap-io-blocks        unwrap input/output blocks the same as
                                    uniform blocks
  --spirv-dis                       output standard-form disassembly; works
                                    only when a SPIR-V generation option is
                                    also used; -H then prints this form too
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
  --validate-io                     validate cross stage IO: an input a stage
                                    reads needs an output of the stage before
  --variable-name <name> | --vn <name>
                                    creates a C header file that contains a
                                    uint32_t array named <name> initialized with
                                    the shader binary code

rglsl's own options:
  --object                          compile every input file to an rglsl object
                                    module (<file>.rglo, or -o for one input)
  --target-gpu {nvidia | amd | universal-desktop | universal-mobile}
                                    the GPU that -O and -Os optimize for;
                                    defaults to universal-desktop
  --opt-passes <pass>[,<pass>...]   runs these optimizer passes, in this order,
                                    instead of the preset of -O or -Os; the
                                    names are those of rglsl-opt's pass table;
                                    an unknown name is an error
  --opt-validate-each               validates the IR after every optimizer
                                    pass (on by default in debug builds)
  --reflection-json <file>          writes the reflection of the generated
                                    SPIR-V as JSON: per stage the entry point,
                                    local size, descriptor bindings, push
                                    constants, inputs, outputs and
                                    specialization constants, and the merged
                                    pipeline layout; bindings that conflict
                                    between stages are an error
  --specialize <id>:<value>[ <id>:<value>...]
                                    replaces the specialization constant
                                    <id> by <value> (true or false, a decimal
                                    or 0x integer, or a float, checked against
                                    the type of the constant) while compiling,
                                    with or without -O; may be repeated; pairs
                                    are separated by spaces or commas; an id
                                    the program does not declare is an error
";
