use std::fs;
use std::io::Write as _;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const FRAGMENT: &str = "#version 450
layout(location = 0) out vec4 color;
layout(binding = 1) uniform Block { vec4 tint; };
layout(binding = 2) uniform sampler2D image;
void unused() { color = vec4(0.0); }
void main() { color = tint * texture(image, vec2(0.5)); }
";

struct Run {
    code: Option<i32>,
    stdout: String,
    stderr: String,
}

fn work_dir(name: &str) -> TestResult<PathBuf> {
    let directory = Path::new(env!("CARGO_TARGET_TMPDIR"))
        .join("cli")
        .join(name);
    if directory.exists() {
        fs::remove_dir_all(&directory)?;
    }
    fs::create_dir_all(&directory)?;
    Ok(directory)
}

fn rglsl(directory: &Path, args: &[&str]) -> TestResult<Run> {
    rglsl_with_input(directory, args, None)
}

fn rglsl_with_input(directory: &Path, args: &[&str], input: Option<&str>) -> TestResult<Run> {
    let mut child = Command::new(env!("CARGO_BIN_EXE_rglsl"))
        .current_dir(directory)
        .args(args)
        .stdin(if input.is_some() {
            Stdio::piped()
        } else {
            Stdio::null()
        })
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;
    if let (Some(input), Some(mut stdin)) = (input, child.stdin.take()) {
        stdin.write_all(input.as_bytes())?;
    }
    let output = child.wait_with_output()?;
    Ok(Run {
        code: output.status.code(),
        stdout: String::from_utf8_lossy(&output.stdout).into_owned(),
        stderr: String::from_utf8_lossy(&output.stderr).into_owned(),
    })
}

fn module(path: &Path) -> TestResult<rspirv::dr::Module> {
    Ok(rspirv::dr::load_bytes(fs::read(path)?)?)
}

fn decorations(module: &rspirv::dr::Module, decoration: spirv::Decoration) -> Vec<u32> {
    let mut values: Vec<u32> = module
        .annotations
        .iter()
        .filter(|instruction| instruction.class.opcode == spirv::Op::Decorate)
        .filter_map(|instruction| match instruction.operands.as_slice() {
            [_, rspirv::dr::Operand::Decoration(found), rspirv::dr::Operand::LiteralBit32(value)]
                if *found == decoration =>
            {
                Some(*value)
            }
            _ => None,
        })
        .collect();
    values.sort_unstable();
    values
}

fn entry_point_names(module: &rspirv::dr::Module) -> Vec<String> {
    module
        .entry_points
        .iter()
        .filter_map(|instruction| match instruction.operands.get(2) {
            Some(rspirv::dr::Operand::LiteralString(name)) => Some(name.clone()),
            _ => None,
        })
        .collect()
}

#[test]
fn writes_the_stage_named_binary_by_default() -> TestResult {
    let directory = work_dir("default_name")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(&directory, &["-V", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(run.stderr, "shader.frag\n");
    let module = module(&directory.join("frag.spv"))?;
    assert_eq!(entry_point_names(&module), ["main"]);
    assert_eq!(decorations(&module, spirv::Decoration::Binding), [1, 2]);
    Ok(())
}

#[test]
fn reports_compile_errors_as_glslang() -> TestResult {
    let directory = work_dir("compile_error")?;
    fs::write(
        directory.join("bad.frag"),
        "#version 450\nlayout(location = 0) out vec4 c;\nvoid main() { c = x; }\n",
    )?;
    let run = rglsl(&directory, &["-V", "--error-column", "bad.frag"])?;
    assert_eq!(run.code, Some(2));
    let lines: Vec<&str> = run.stderr.lines().collect();
    assert_eq!(lines.first().copied(), Some("bad.frag"));
    assert!(lines
        .get(1)
        .is_some_and(|line| line.starts_with("ERROR: bad.frag:3:19: ")));
    assert!(run
        .stderr
        .contains("ERROR: 1 compilation errors.  No code generated.\n\n\n"));
    assert_eq!(
        run.stdout,
        "SPIR-V is not generated for failed compile or link\n"
    );
    assert!(!directory.join("frag.spv").exists());
    let run = rglsl(&directory, &["bad.frag"])?;
    assert_eq!(run.code, Some(2));
    assert!(run.stdout.starts_with("bad.frag\nERROR: 0:3: "));
    Ok(())
}

#[test]
fn a_missing_main_is_a_link_error() -> TestResult {
    let directory = work_dir("missing_main")?;
    fs::write(directory.join("lib.vert"), "#version 450\nvoid f() {}\n")?;
    let run = rglsl(&directory, &["-V", "lib.vert"])?;
    assert_eq!(run.code, Some(3));
    assert!(run.stderr.contains(
        "ERROR: Linking vertex stage: Missing entry point: Each stage requires one entry point"
    ));
    Ok(())
}

#[test]
fn usage_errors_exit_with_one() -> TestResult {
    let directory = work_dir("usage")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    for args in [
        &["--frobnicate", "shader.frag"][..],
        &["-G", "shader.frag"],
        &["-o", "out.spv", "shader.frag"],
        &["-E", "-V", "shader.frag"],
        &["-V", "missing.frag"],
        &["--target-env", "opengl", "shader.frag"],
    ] {
        let run = rglsl(&directory, args)?;
        assert_eq!(run.code, Some(1), "{args:?}");
        assert!(run.stderr.contains(": Error: "), "{args:?}: {}", run.stderr);
        assert!(run.stderr.ends_with("(use -h for usage)\n"));
    }
    let run = rglsl(&directory, &["-V", "-S", "bogus", "shader.frag"])?;
    assert_eq!(run.code, Some(1));
    assert!(run.stdout.starts_with("Usage: rglsl"));
    Ok(())
}

#[test]
fn hexadecimal_output_and_variable_names() -> TestResult {
    let directory = work_dir("hex")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(
        &directory,
        &["-V", "--vn", "words", "-o", "shader.h", "shader.frag"],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    let text = fs::read_to_string(directory.join("shader.h"))?;
    let lines: Vec<&str> = text.lines().collect();
    assert_eq!(lines.get(1).copied(), Some("\t #pragma once"));
    assert_eq!(lines.get(2).copied(), Some("const uint32_t words[] = {"));
    assert!(lines
        .get(3)
        .is_some_and(|line| line.starts_with("\t0x07230203,")));
    assert_eq!(lines.last().copied(), Some("};"));
    Ok(())
}

#[test]
fn renames_the_entry_point_and_keeps_uncalled_functions() -> TestResult {
    let directory = work_dir("entry_point")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(
        &directory,
        &["-V", "-e", "foo", "-o", "renamed.spv", "shader.frag"],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(
        entry_point_names(&module(&directory.join("renamed.spv"))?),
        ["foo"]
    );
    let run = rglsl(&directory, &["-V", "-o", "dropped.spv", "shader.frag"])?;
    assert_eq!(run.code, Some(0));
    let run = rglsl(&directory, &["-V", "--ku", "-o", "kept.spv", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    let dropped = module(&directory.join("dropped.spv"))?.functions.len();
    let kept = module(&directory.join("kept.spv"))?.functions.len();
    assert_eq!(kept, dropped + 1);
    Ok(())
}

#[test]
fn shifts_bindings_and_sets() -> TestResult {
    let directory = work_dir("shifts")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(
        &directory,
        &[
            "-V",
            "--sub",
            "10",
            "--scsb",
            "frag",
            "20",
            "--scsb",
            "vert",
            "40",
            "--rsb",
            "3",
            "shader.frag",
        ],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    let module = module(&directory.join("frag.spv"))?;
    assert_eq!(decorations(&module, spirv::Decoration::Binding), [11, 22]);
    assert_eq!(
        decorations(&module, spirv::Decoration::DescriptorSet),
        [3, 3]
    );
    Ok(())
}

#[test]
fn defines_undefines_and_preprocesses() -> TestResult {
    let directory = work_dir("preprocess")?;
    fs::write(
        directory.join("shader.frag"),
        "#version 450\n#ifdef A\nint a = B;\n#endif\n#ifdef C\nint c;\n#endif\n",
    )?;
    let run = rglsl(
        &directory,
        &[
            "-E",
            "-DA",
            "--define-macro",
            "B=7",
            "-DC",
            "-UC",
            "shader.frag",
        ],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(run.stdout.contains("int a = 7;"));
    assert!(!run.stdout.contains("int c;"));
    Ok(())
}

#[test]
fn links_libraries_and_object_modules() -> TestResult {
    let directory = work_dir("link")?;
    fs::write(
        directory.join("main.frag"),
        "#version 450\nlayout(location = 0) out vec4 color;\nvec4 shade();\nvoid main() { color = shade(); }\n",
    )?;
    fs::write(
        directory.join("lighting.glsl"),
        "#version 450\nvec4 shade() { return vec4(1.0); }\n",
    )?;
    let run = rglsl(
        &directory,
        &["-V", "-o", "linked.spv", "main.frag", "lighting.glsl"],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(
        entry_point_names(&module(&directory.join("linked.spv"))?),
        ["main"]
    );
    let run = rglsl(&directory, &["--object", "lighting.glsl"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(directory.join("lighting.rglo").is_file());
    let run = rglsl(&directory, &["--link", "main.frag", "lighting.rglo"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(directory.join("frag.spv").is_file());
    let run = rglsl(&directory, &["-V", "main.frag"])?;
    assert_eq!(run.code, Some(3));
    assert!(run
        .stderr
        .contains("ERROR: Linking fragment stage: No function definition (body) found: "));
    Ok(())
}

#[test]
fn reads_the_standard_input_and_writes_depfiles() -> TestResult {
    let directory = work_dir("stdin")?;
    fs::write(directory.join("common.h"), "const float scale = 2.0;\n")?;
    let source = "#version 450\n#include \"common.h\"\nlayout(location = 0) out vec4 color;\nvoid main() { color = vec4(scale); }\n";
    let run = rglsl_with_input(
        &directory,
        &["--stdin", "-S", "frag", "-V", "-I.", "-o", "stdin.spv"],
        Some(source),
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(directory.join("stdin.spv").is_file());
    fs::write(directory.join("shader.frag"), source)?;
    let run = rglsl(
        &directory,
        &["-V", "--depfile", "deps.d", "-o", "out.spv", "shader.frag"],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(
        fs::read_to_string(directory.join("deps.d"))?,
        "out.spv: shader.frag ./common.h\n"
    );
    Ok(())
}

#[test]
fn disassembles_with_h() -> TestResult {
    let directory = work_dir("disassemble")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(&directory, &["-H", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(directory.join("frag.spv").is_file());
    let lines: Vec<&str> = run.stdout.lines().collect();
    assert_eq!(
        lines.get(..4),
        Some(
            &[
                "// Module Version 10000",
                "// Generated by (magic number): 1c",
                "// Id's are bound by 29",
                "",
            ][..]
        )
    );
    for expected in [
        "                              Capability Shader",
        "               1:             ExtInstImport  \"GLSL.std.450\"",
        "                              MemoryModel Logical GLSL450",
        "                              EntryPoint Fragment 16  \"main\" 9",
        "                              ExecutionMode 16 OriginUpperLeft",
        "                              Decorate 13(image) Binding 2",
        "        5(Block):             TypeStruct 3(fvec4)",
        "               6:             TypeImage 4(float) 2D sampled format:Unknown",
        "        9(color):     10(ptr) Variable Output",
        "        16(main):           2 Function None 17",
        "              28:    3(fvec4) FMul 26 27",
    ] {
        assert!(lines.contains(&expected), "missing `{expected}`");
    }
    assert!(run
        .stdout
        .ends_with("                              FunctionEnd\n"));
    assert_eq!(fs::read(directory.join("frag.spv"))?.len() % 4, 0);
    let run = rglsl(
        &directory,
        &["-H", "--target-env", "vulkan1.1", "shader.frag"],
    )?;
    assert!(run.stdout.starts_with("// Module Version 10300\n"));
    Ok(())
}

#[test]
fn indents_structured_control_flow() -> TestResult {
    let directory = work_dir("disassemble_control_flow")?;
    fs::write(
        directory.join("shader.frag"),
        "#version 450\nlayout(location = 0) in float x;\nlayout(location = 0) out vec4 c;\n\
         void main() { c = vec4(0.0); if (x > 0.5) { c = vec4(1.0); } }\n",
    )?;
    let run = rglsl(&directory, &["-H", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    let lines: Vec<&str> = run.stdout.lines().collect();
    let merge = lines
        .iter()
        .position(|line| line.trim_start().starts_with("SelectionMerge "))
        .ok_or("no SelectionMerge")?;
    let branch = lines.get(merge + 1).ok_or("no branch")?;
    assert!(branch.starts_with("                              BranchConditional "));
    let label = lines.get(merge + 2).ok_or("no label")?;
    assert!(label.ends_with(":               Label"), "`{label}`");
    Ok(())
}

#[test]
fn spirv_dis_prints_no_disassembly() -> TestResult {
    let directory = work_dir("spirv_dis")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    for args in [
        &["-V", "--spirv-dis", "shader.frag"][..],
        &["-H", "--spirv-dis", "shader.frag"][..],
    ] {
        let run = rglsl(&directory, args)?;
        assert_eq!(run.code, Some(0), "{}", run.stderr);
        assert_eq!(run.stdout, "");
        assert!(directory.join("frag.spv").is_file());
    }
    Ok(())
}

#[test]
fn preprocesses_with_line_directives_around_included_text() -> TestResult {
    let directory = work_dir("preprocess-include")?;
    fs::write(
        directory.join("shader.frag"),
        "#version 450\n#extension GL_GOOGLE_include_directive : require\n#include \"common.h\"\nlayout(location = 0) out vec4 color;\nvoid main() { color = tint; }\n",
    )?;
    fs::write(directory.join("common.h"), "const vec4 tint = vec4(1.0);\n")?;
    let run = rglsl(&directory, &["-E", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(
        run.stdout,
        "#version 450\n#extension GL_GOOGLE_include_directive : require\n#line 1 \"./common.h\"\nconst vec4 tint = vec4(1.0);\n#line 4 \"shader.frag\"\n layout(location = 0) out vec4 color;\nvoid main() { color = tint; }\n\n"
    );
    Ok(())
}

#[test]
fn takes_preamble_text() -> TestResult {
    let directory = work_dir("preamble")?;
    fs::write(
        directory.join("shader.frag"),
        "#version 450\n#ifndef ONE\n#error ONE\n#endif\nlayout(location = 0) out vec4 color;\nvoid main() { color = tint(); }\n",
    )?;
    let run = rglsl(
        &directory,
        &[
            "-V",
            "-DONE",
            "--preamble-text",
            "vec4 tint() { return vec4(1.0); }",
            "shader.frag",
        ],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    let run = rglsl(&directory, &["-V", "-DONE", "-P#undef ONE", "shader.frag"])?;
    assert_eq!(run.code, Some(2));
    assert!(
        run.stderr.contains("ERROR: shader.frag:3:"),
        "{}",
        run.stderr
    );
    let run = rglsl(&directory, &["-V", "-P#error early", "shader.frag"])?;
    assert_eq!(run.code, Some(2));
    assert!(run.stderr.contains("ERROR: -1:1:"), "{}", run.stderr);
    Ok(())
}

#[test]
fn compiles_without_linking() -> TestResult {
    let directory = work_dir("no-link")?;
    fs::write(
        directory.join("functions.comp"),
        "#version 450\nfloat imported(float x);\nfloat add(float a, float b) { return a + imported(b); }\n",
    )?;
    let run = rglsl(&directory, &["-V", "--no-link", "functions.comp"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    let module = module(&directory.join("comp.spv"))?;
    assert!(module.entry_points.is_empty());
    assert!(module.capabilities.iter().any(|instruction| matches!(
        instruction.operands.first(),
        Some(rspirv::dr::Operand::Capability(spirv::Capability::Linkage))
    )));
    let linkage: Vec<String> = module
        .annotations
        .iter()
        .filter_map(|instruction| match instruction.operands.as_slice() {
            [_, rspirv::dr::Operand::Decoration(spirv::Decoration::LinkageAttributes), rspirv::dr::Operand::LiteralString(name), rspirv::dr::Operand::LinkageType(kind)] => {
                Some(format!("{name} {kind:?}"))
            }
            _ => None,
        })
        .collect();
    assert_eq!(linkage, ["imported Import", "add Export"]);
    fs::write(directory.join("main.frag"), FRAGMENT)?;
    let run = rglsl(&directory, &["-V", "--no-link", "main.frag"])?;
    assert_eq!(run.code, Some(2));
    assert!(
        run.stderr.contains("main function cannot be exported"),
        "{}",
        run.stderr
    );
    Ok(())
}

#[test]
fn keeps_uncalled_functions_of_every_linked_file() -> TestResult {
    let directory = work_dir("keep-uncalled")?;
    fs::write(
        directory.join("main.frag"),
        "#version 450\nlayout(location = 0) out vec4 color;\nfloat used(float x);\nfloat unusedA(float x) { return x * 2.0; }\nvoid main() { color = vec4(used(1.0)); }\n",
    )?;
    fs::write(
        directory.join("helpers.frag"),
        "#version 450\nfloat used(float x) { return x + 1.0; }\nfloat unusedB(float x) { return x - 1.0; }\n",
    )?;
    let run = rglsl(&directory, &["-V", "main.frag", "helpers.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(module(&directory.join("frag.spv"))?.functions.len(), 2);
    let run = rglsl(&directory, &["-V", "--ku", "main.frag", "helpers.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(module(&directory.join("frag.spv"))?.functions.len(), 4);
    Ok(())
}

const WIDE_COMPUTE: &str = "#version 450\nlayout(local_size_x = 2048) in;\nvoid main() {}\n";

#[test]
fn dumps_the_default_configuration() -> TestResult {
    let directory = work_dir("dump_config")?;
    let run = rglsl(&directory, &["-c"])?;
    assert_eq!(run.code, Some(0));
    assert_eq!(run.stderr, "");
    assert_eq!(run.stdout.lines().count(), 111);
    assert!(run.stdout.starts_with("MaxLights 32\nMaxClipPlanes 6\n"));
    assert!(run
        .stdout
        .ends_with("generalConstantMatrixVectorIndexing 1\n"));
    fs::write(directory.join("defaults.conf"), &run.stdout)?;
    fs::write(directory.join("wide.comp"), WIDE_COMPUTE)?;
    let run = rglsl(&directory, &["-V", "wide.comp", "defaults.conf"])?;
    assert_eq!(run.code, Some(2));
    assert!(run.stderr.contains("ERROR: wide.comp:2: "));
    let run = rglsl(&directory, &["-c", "missing.conf"])?;
    assert_eq!(run.code, Some(0));
    Ok(())
}

#[test]
fn configuration_files_set_the_limits() -> TestResult {
    let directory = work_dir("config_file")?;
    fs::write(directory.join("wide.comp"), WIDE_COMPUTE)?;
    fs::write(
        directory.join("wide.conf"),
        "MaxComputeWorkGroupSizeX 2048\nMaxWidgets 3\n",
    )?;
    let run = rglsl(&directory, &["-V", "wide.comp", "wide.conf"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(
        run.stdout,
        "Warning: unrecognized limit (MaxWidgets) in configuration file.\n"
    );
    assert!(directory.join("comp.spv").is_file());
    fs::write(
        directory.join("bad.conf"),
        "MaxComputeWorkGroupSizeX lots\n",
    )?;
    let run = rglsl(&directory, &["-V", "wide.comp", "bad.conf"])?;
    assert_eq!(run.code, Some(2));
    assert!(run
        .stdout
        .starts_with("Error: 'lots' bad .conf file.  Each name must be followed by one number.\n"));
    let run = rglsl(&directory, &["-V", "wide.comp", "absent.conf"])?;
    assert_eq!(run.code, Some(1));
    assert!(run
        .stderr
        .ends_with(": Error: unable to open input file (use -h for usage)\n"));
    fs::write(
        directory.join("library.glsl"),
        "#version 450\nfloat clip[gl_MaxClipDistances - 9];\nfloat first() { return clip[0]; }\n",
    )?;
    fs::write(directory.join("clip.conf"), "MaxClipDistances 10\n")?;
    let run = rglsl(&directory, &["--object", "library.glsl"])?;
    assert_eq!(run.code, Some(2));
    let run = rglsl(&directory, &["--object", "library.glsl", "clip.conf"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(directory.join("library.rglo").is_file());
    Ok(())
}
