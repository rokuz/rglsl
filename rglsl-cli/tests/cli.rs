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
    assert!(run.stdout.contains("OpEntryPoint Fragment"));
    assert!(directory.join("frag.spv").is_file());
    Ok(())
}

const REFLECTION_VERTEX: &str = "#version 450
layout(binding = 1) uniform Block { vec4 tint; };
layout(location = 0) in vec4 position;
void main() { gl_Position = position * tint; }
";

const STORAGE_COMPUTE: &str = "#version 450
layout(binding = 0) buffer Data { uint count; float values[]; } data;
layout(local_size_x = 64) in;
void main() { data.values[gl_GlobalInvocationID.x] = float(data.count); }
";

#[test]
fn reflects_the_program_as_glslang() -> TestResult {
    let directory = work_dir("reflection")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(&directory, &["-V", "-q", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert_eq!(
        run.stdout,
        "Uniform reflection:
tint: offset 0, type 8b52, size 1, index 0, binding -1, stages 16
image: offset -1, type 8b5e, size 1, index -1, binding 2, stages 16

Uniform block reflection:
Block: offset -1, type ffffffff, size 16, index 0, binding 1, stages 16, numMembers 1

Buffer variable reflection:

Buffer block reflection:

Pipeline input reflection:

Pipeline output reflection:
color: offset 0, type 8b52, size 1, index 0, binding -1, stages 16

"
    );
    assert!(directory.join("frag.spv").is_file());
    Ok(())
}

#[test]
fn reflects_linked_stages_and_options() -> TestResult {
    let directory = work_dir("reflection_linked")?;
    fs::write(directory.join("shader.vert"), REFLECTION_VERTEX)?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(&directory, &["-l", "-q", "shader.vert", "shader.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(run
        .stdout
        .contains("tint: offset 0, type 8b52, size 1, index 0, binding -1, stages 17\n"));
    assert!(run.stdout.contains(
        "Block: offset -1, type ffffffff, size 16, index 0, binding 1, stages 17, numMembers 1\n"
    ));
    assert!(run.stdout.contains(
        "Pipeline input reflection:\nposition: offset 0, type 8b52, size 1, index 0, binding -1, stages 1\n"
    ));
    assert!(!directory.join("vert.spv").exists());
    fs::write(directory.join("shader.comp"), STORAGE_COMPUTE)?;
    let run = rglsl(
        &directory,
        &["-V", "-q", "--reflect-separate-buffers", "shader.comp"],
    )?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(run.stdout.starts_with(
        "Uniform reflection:\n\nUniform block reflection:\n\nBuffer variable reflection:\nData.values: offset 4, type 1406, size 0, index 0, binding -1, stages 32, arrayStride 4, topLevelArrayStride 4\nData.count: offset 0, type 1405, size 1, index 0, binding -1, stages 32\n"
    ));
    assert!(run.stdout.ends_with("Local size X: 64\n\n"));
    Ok(())
}

#[test]
fn reflects_deeply_nested_code() -> TestResult {
    let directory = work_dir("reflection_nested")?;
    let depth = 10_000;
    let mut source = String::from(
        "#version 450\nlayout(location = 0) out vec4 color;\nlayout(binding = 1) uniform Block { vec4 tint; };\nvoid main() {\n",
    );
    source.push_str(&"{".repeat(depth));
    source.push_str("color = ");
    source.push_str(&"(tint + ".repeat(depth));
    source.push_str("tint");
    source.push_str(&")".repeat(depth));
    source.push(';');
    source.push_str(&"}".repeat(depth));
    source.push_str("\n}\n");
    fs::write(directory.join("deep.frag"), source)?;
    let run = rglsl(&directory, &["-l", "-q", "deep.frag"])?;
    assert_eq!(run.code, Some(0), "{}", run.stderr);
    assert!(run
        .stdout
        .contains("tint: offset 0, type 8b52, size 1, index 0, binding -1, stages 16\n"));
    Ok(())
}

#[test]
fn reflection_needs_linking_and_survives_errors() -> TestResult {
    let directory = work_dir("reflection_errors")?;
    fs::write(directory.join("shader.frag"), FRAGMENT)?;
    let run = rglsl(&directory, &["-q", "shader.frag"])?;
    assert_eq!(run.code, Some(1));
    assert!(run
        .stderr
        .ends_with("Error: reflection requires -l for linking (use -h for usage)\n"));
    fs::write(
        directory.join("bad.frag"),
        "#version 450\nlayout(location = 0) out vec4 c;\nvoid main() { c = x; }\n",
    )?;
    let run = rglsl(&directory, &["-V", "-q", "bad.frag"])?;
    assert_eq!(run.code, Some(2));
    assert_eq!(
        run.stdout,
        "Uniform reflection:\n\nUniform block reflection:\n\nBuffer variable reflection:\n\nBuffer block reflection:\n\nPipeline input reflection:\n\nPipeline output reflection:\n\nSPIR-V is not generated for failed compile or link\n"
    );
    Ok(())
}
