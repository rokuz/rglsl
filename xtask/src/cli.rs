use std::collections::BTreeSet;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use anyhow::{bail, Context, Result};

use crate::interface;
use crate::oracles::{self, Tool};
use crate::process::{self, Exit};

pub struct Options {
    pub glslang_dir: Option<PathBuf>,
    pub filter: Option<String>,
    pub timeout_secs: u64,
}

#[derive(Debug, Clone)]
enum Expect {
    Same,
    Rejected(&'static str),
    Exit(i32, &'static str),
}

#[derive(Debug, Clone)]
struct Case {
    name: &'static str,
    args: Vec<&'static str>,
    files: Vec<(&'static str, &'static str)>,
    dirs: Vec<&'static str>,
    stdin: Option<&'static str>,
    ignore_stdout: Option<&'static str>,
    ignore_stderr: bool,
    spirv_val: Vec<&'static str>,
    expect: Expect,
}

impl Case {
    fn new(name: &'static str, args: &[&'static str], files: &[&'static str]) -> Self {
        Self {
            name,
            args: args.to_vec(),
            files: files.iter().map(|&file| (file, file)).collect(),
            dirs: Vec::new(),
            stdin: None,
            ignore_stdout: None,
            ignore_stderr: false,
            spirv_val: Vec::new(),
            expect: Expect::Same,
        }
    }

    fn file_as(mut self, source: &'static str, name: &'static str) -> Self {
        self.files.push((source, name));
        self
    }

    fn dir(mut self, directory: &'static str) -> Self {
        self.dirs.push(directory);
        self
    }

    fn stdin(mut self, file: &'static str) -> Self {
        self.stdin = Some(file);
        self
    }

    fn ignore_stdout(mut self, why: &'static str) -> Self {
        self.ignore_stdout = Some(why);
        self
    }

    fn ignore_messages(mut self, why: &'static str) -> Self {
        self.ignore_stdout = Some(why);
        self.ignore_stderr = true;
        self
    }

    fn spirv_val(mut self, flag: &'static str) -> Self {
        self.spirv_val.push(flag);
        self
    }

    fn rejected(mut self, why: &'static str) -> Self {
        self.expect = Expect::Rejected(why);
        self
    }

    fn exits(mut self, code: i32, why: &'static str) -> Self {
        self.expect = Expect::Exit(code, why);
        self
    }

    fn target_env(&self) -> String {
        let mut vulkan = None;
        let mut spirv = None;
        for pair in self.args.windows(2) {
            if let [option, value] = *pair {
                if option == "--target-env" {
                    if let Some(version) = value.strip_prefix("vulkan") {
                        vulkan = Some(version);
                    }
                    if let Some(version) = value.strip_prefix("spirv") {
                        spirv = Some(version);
                    }
                }
            }
        }
        match (vulkan, spirv) {
            (Some("1.1"), Some("1.4")) => String::from("vulkan1.1spv1.4"),
            (Some(version), _) => format!("vulkan{version}"),
            (None, Some(version)) => format!("spv{version}"),
            (None, None) => String::from("vulkan1.0"),
        }
    }
}

const TARGET_SHADER: &str = "spv.targetVulkan.vert";
const DEBUG_SHADER: &str = "spv.debuginfo.glsl.frag";
const REGISTERS: &str = "spv.glsl.register.autoassign.frag";

fn cases() -> Vec<Case> {
    vec![
        Case::new("V", &["-V", TARGET_SHADER], &[TARGET_SHADER]),
        Case::new("V100", &["-V100", TARGET_SHADER], &[TARGET_SHADER]),
        Case::new("V-bad-version", &["-V200", TARGET_SHADER], &[TARGET_SHADER]),
        Case::new(
            "client-vulkan100",
            &["--client", "vulkan100", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-vulkan1.0",
            &["--target-env", "vulkan1.0", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-vulkan1.1",
            &["--target-env", "vulkan1.1", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-vulkan1.2",
            &["--target-env", "vulkan1.2", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-vulkan1.3",
            &["--target-env", "vulkan1.3", "-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-vulkan1.4",
            &["--target-env", "vulkan1.4", "-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-spirv1.2",
            &["--target-env", "spirv1.2", "-V", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-vulkan1.1-spirv1.4",
            &[
                "--target-env",
                "vulkan1.1",
                "--target-env",
                "spirv1.4",
                "-o",
                "out.spv",
                TARGET_SHADER,
            ],
            &[TARGET_SHADER],
        ),
        Case::new(
            "target-env-bad",
            &["--target-env", "vulkan9", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "spirv-without-client",
            &["--target-env", "spirv1.3", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new("S", &["-V", "-S", "vert", "-o", "out.spv", "shader"], &[])
            .file_as(TARGET_SHADER, "shader"),
        Case::new("compound-suffix", &["-V", "shader.vert.glsl"], &[])
            .file_as(TARGET_SHADER, "shader.vert.glsl"),
        Case::new(
            "S-bad-stage",
            &["-V", "-S", "bogus", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .ignore_stdout("the usage text is rglsl's"),
        Case::new("no-suffix", &["-V", "shader"], &[])
            .file_as(TARGET_SHADER, "shader")
            .ignore_stdout("the usage text is rglsl's"),
        Case::new(
            "stdin",
            &["--stdin", "-S", "vert", "-V", "-o", "out.spv"],
            &[],
        )
        .stdin(TARGET_SHADER),
        Case::new("stdin-without-S", &["--stdin", "-V"], &[])
            .stdin(TARGET_SHADER)
            .exits(
                1,
                "glslang takes the argument after --stdin for the stage and prints the usage text; rglsl says that -S is missing",
            ),
        Case::new("missing-file", &["-V", "missing.frag"], &[]),
        Case::new(
            "unknown-option",
            &["--frobnicate", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "o-without-V",
            &["-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new("o-missing", &["-V", TARGET_SHADER, "-o"], &[TARGET_SHADER]),
        Case::new("e-missing", &["-V", TARGET_SHADER, "-e"], &[TARGET_SHADER]),
        Case::new(
            "I-detached",
            &["-V", "-I", "inc", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new("E-with-V", &["-E", "-V", TARGET_SHADER], &[TARGET_SHADER]),
        Case::new("help", &["-h"], &[]).ignore_stdout("the usage text is rglsl's"),
        Case::new("no-input", &[], &[]).ignore_stdout("the usage text is rglsl's"),
        Case::new("version", &["--version"], &[]).ignore_stdout("rglsl's version strings"),
        Case::new("version-v", &["-v"], &[]).ignore_stdout("rglsl's version strings"),
        Case::new("dumpversion", &["-dumpversion"], &[]).ignore_stdout("rglsl's version strings"),
        Case::new("H", &["-H", TARGET_SHADER], &[TARGET_SHADER]),
        Case::new(
            "spirv-dis",
            &["-V", "--spirv-dis", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .ignore_stdout("rglsl prints rspirv's disassembly, this glslang prints none"),
        Case::new(
            "entry-point-rename",
            &[
                "-H",
                "-e",
                "foo",
                "--source-entrypoint",
                "main",
                "glsl.entryPointRename.vert",
            ],
            &["glsl.entryPointRename.vert"],
        ),
        Case::new(
            "entry-point-rename-bad-source",
            &[
                "-H",
                "-e",
                "foo",
                "--source-entrypoint",
                "bar",
                "glsl.entryPointRename.vert",
            ],
            &["glsl.entryPointRename.vert"],
        ),
        Case::new(
            "entry-point-rename-no-main",
            &[
                "-H",
                "-e",
                "foo",
                "--source-entrypoint",
                "main",
                "glsl.entryPointRename2.vert",
            ],
            &["glsl.entryPointRename2.vert"],
        ),
        Case::new(
            "entry-point-long",
            &["-V", "--entry-point", "renamed", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "no-location",
            &["-V", "-C", "spv.noLocation.vert"],
            &["spv.noLocation.vert"],
        ),
        Case::new(
            "compile-error",
            &["-V", "samplerlessTextureFunctions.frag"],
            &["samplerlessTextureFunctions.frag"],
        ),
        Case::new(
            "compile-error-column",
            &["--error-column", "-V", "samplerlessTextureFunctions.frag"],
            &["samplerlessTextureFunctions.frag"],
        ),
        Case::new(
            "compile-error-absolute-path",
            &["--absolute-path", "-V", "samplerlessTextureFunctions.frag"],
            &["samplerlessTextureFunctions.frag"],
        ),
        Case::new(
            "compile-error-quiet",
            &["--quiet", "-V", "spv.16bitstorage_Error.frag"],
            &["spv.16bitstorage_Error.frag"],
        ),
        Case::new(
            "compile-error-silent",
            &["-s", "-V", "spv.16bitstorage_Error.frag"],
            &["spv.16bitstorage_Error.frag"],
        ),
        Case::new(
            "validate-error",
            &["450.comp"],
            &["450.comp"],
        ),
        Case::new("validate", &[DEBUG_SHADER], &[DEBUG_SHADER]),
        Case::new(
            "validate-several",
            &[DEBUG_SHADER, "450.comp"],
            &[DEBUG_SHADER, "450.comp"],
        ),
        Case::new(
            "validate-vulkan-rules",
            &["spv.noLocation.vert"],
            &["spv.noLocation.vert"],
        )
        .exits(
            2,
            "without -V glslang checks OpenGL rules, rglsl always checks Vulkan rules",
        ),
        Case::new(
            "link-only",
            &["-l", DEBUG_SHADER],
            &[DEBUG_SHADER],
        ),
        Case::new(
            "missing-main",
            &["-V", "glsl.entryPointRename2.vert"],
            &["glsl.entryPointRename2.vert"],
        ),
        Case::new(
            "D-U",
            &[
                "-V",
                "--aml",
                "-DUNDEFED",
                "-UIN_SHADER",
                "-DFOO=200",
                "--U",
                "UNDEFED",
                "--define-macro",
                "MUL=FOO*2",
                "-o",
                "out.spv",
                "glsl.-D-U.frag",
            ],
            &["glsl.-D-U.frag"],
        ),
        Case::new(
            "D-attached-missing",
            &["-V", "-U", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "E",
            &["-E", "-DUNDEFED", "-DFOO=200", "glsl.-D-U.frag"],
            &["glsl.-D-U.frag"],
        ),
        Case::new(
            "E-include",
            &["-E", "-Iinc2", "include.system.vert"],
            &["include.system.vert", "bar.h"],
        )
        .dir("inc2")
        .ignore_stdout("rglsl's -E output has no #line directives around included text"),
        Case::new(
            "include-system",
            &["-V", "--aml", "-Iinc2", "include.system.vert"],
            &["include.system.vert", "bar.h"],
        )
        .dir("inc2"),
        Case::new(
            "include",
            &["-V", "--aml", "include.vert"],
            &["include.vert"],
        )
        .dir("inc1")
        .dir("inc2")
        .file_as("bar.h", "bar.h")
        .file_as("foo.h", "foo.h"),
        Case::new(
            "depfile",
            &[
                "-V",
                "--aml",
                "--depfile",
                "deps.d",
                "-Iinc2",
                "include.system.vert",
            ],
            &["include.system.vert", "bar.h"],
        )
        .dir("inc2"),
        Case::new(
            "x",
            &["-V", "-x", "-o", "out.txt", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "vn",
            &[
                "-V",
                "--vn",
                "shader_words",
                "-o",
                "shader.h",
                TARGET_SHADER,
            ],
            &[TARGET_SHADER],
        ),
        Case::new(
            "variable-name",
            &["-V", "--variable-name", "words", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "g",
            &["-V", "-g", "-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "g0",
            &["-V", "-g0", "-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "gV",
            &[
                "-V",
                "--target-env",
                "vulkan1.2",
                "-gV",
                "-o",
                "out.spv",
                "spv.debuginfo.glsl.frag",
            ],
            &["spv.debuginfo.glsl.frag"],
        ),
        Case::new(
            "gVS",
            &[
                "-V",
                "--target-env",
                "vulkan1.2",
                "-gVS",
                "-o",
                "out.spv",
                "spv.debuginfo.glsl.comp",
            ],
            &["spv.debuginfo.glsl.comp"],
        ),
        Case::new(
            "g-include",
            &[
                "-V",
                "--aml",
                "-g",
                "-o",
                "out.spv",
                "-Iinc2",
                "include.system.vert",
            ],
            &["include.system.vert", "bar.h"],
        )
        .dir("inc2"),
        Case::new(
            "optimization-flags",
            &["-V", "-Od", "-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        ),
        Case::new(
            "compatibility-flags",
            &[
                "-V",
                "-C",
                "-t",
                "-r",
                "-w",
                "--spirv-val",
                "--relax-set-binding-limits",
                "--suppress-warnings",
                "-o",
                "out.spv",
                TARGET_SHADER,
            ],
            &[TARGET_SHADER],
        ),
        Case::new(
            "i",
            &["-i", "-V", "-o", "out.spv", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .ignore_messages("rglsl prints no AST"),
        Case::new(
            "auto-map",
            &["-V", "--amb", "--aml", "-o", "out.spv", REGISTERS],
            &[REGISTERS],
        ),
        Case::new(
            "shift-bindings",
            &[
                "-V", "--aml", "--amb", "--ssb", "5", "--stb", "10", "--sib", "0", "--sub", "20", "--sbb",
                "30", "-o", "out.spv", REGISTERS,
            ],
            &[REGISTERS],
        ),
        Case::new(
            "shift-bindings-long",
            &[
                "-V",
                "--auto-map-bindings",
                "--aml",
                "--shift-sampler-binding",
                "frag",
                "5",
                "--shift-texture-binding",
                "10",
                "--shift-ubo-binding",
                "20",
                "--shift-ssbo-bindings",
                "30",
                "--shift-uav-binding",
                "7",
                "--shift-combined-sampler-binding",
                "40",
                "-o",
                "out.spv",
                REGISTERS,
            ],
            &[REGISTERS],
        ),
        Case::new(
            "shift-bindings-per-set",
            &[
                "-V", "--aml", "--amb", "--ssb", "5", "0", "--stb", "frag", "12", "0", "3", "1", "-o",
                "out.spv", REGISTERS,
            ],
            &[REGISTERS],
        ),
        Case::new(
            "shift-bindings-no-auto-map",
            &[
                "-V",
                "--aml",
                "--ssb",
                "5",
                "--stb",
                "10",
                "--sub",
                "20",
                "-o",
                "out.spv",
                "spv.glsl.register.noautoassign.frag",
            ],
            &["spv.glsl.register.noautoassign.frag"],
        ),
        Case::new(
            "shift-images",
            &[
                "-V",
                "--aml",
                "--sib",
                "3",
                "--scsb",
                "8",
                "-o",
                "out.spv",
                "spv.image.frag",
            ],
            &["spv.image.frag"],
        ),
        Case::new(
            "resource-set-binding",
            &["-V", "--aml", "--amb", "--rsb", "2", "-o", "out.spv", REGISTERS],
            &[REGISTERS],
        ),
        Case::new(
            "resource-set-binding-stage",
            &[
                "-V", "--aml", "--amb", "--rsb", "frag", "3", "-o", "out.spv", REGISTERS,
            ],
            &[REGISTERS],
        ),
        Case::new(
            "resource-set-binding-other-stage",
            &[
                "-V", "--aml", "--amb", "--rsb", "vert", "3", "-o", "out.spv", REGISTERS,
            ],
            &[REGISTERS],
        ),
        Case::new(
            "keep-uncalled",
            &[
                "-V",
                "--aml",
                "--target-env",
                "vulkan1.2",
                "--keep-uncalled",
                "-o",
                "out.spv",
                "spv.ext.AnyHitShader.rahit",
            ],
            &["spv.ext.AnyHitShader.rahit"],
        ),
        Case::new(
            "hlsl-offsets",
            &[
                "-V",
                "--hlsl-offsets",
                "-o",
                "out.spv",
                "spv.hlslOffsets.vert",
            ],
            &["spv.hlslOffsets.vert"],
        )
        .spirv_val("--relax-block-layout"),
        Case::new(
            "link-matching",
            &[
                "-V",
                "--aml",
                "link.vk.matchingPC.0.0.frag",
                "link.vk.matchingPC.0.1.frag",
                "link.vk.matchingPC.0.2.frag",
            ],
            &[
                "link.vk.matchingPC.0.0.frag",
                "link.vk.matchingPC.0.1.frag",
                "link.vk.matchingPC.0.2.frag",
            ],
        ),
        Case::new(
            "link-l",
            &[
                "-l",
                "-V",
                "--aml",
                "link.vk.pcNamingValid.0.0.vert",
                "link.vk.pcNamingValid.0.1.vert",
            ],
            &[
                "link.vk.pcNamingValid.0.0.vert",
                "link.vk.pcNamingValid.0.1.vert",
            ],
        ),
        Case::new(
            "link-error",
            &[
                "-V",
                "--aml",
                "link.vk.differentPC.0.0.frag",
                "link.vk.differentPC.0.1.frag",
                "link.vk.differentPC.0.2.frag",
            ],
            &[
                "link.vk.differentPC.0.0.frag",
                "link.vk.differentPC.0.1.frag",
                "link.vk.differentPC.0.2.frag",
            ],
        ),
        Case::new(
            "link-stages",
            &[
                "-V",
                "--aml",
                "--amb",
                "link.vk.crossStageIO.1.vert",
                "link.vk.crossStageIO.1.geom",
                "link.vk.crossStageIO.1.frag",
            ],
            &[
                "link.vk.crossStageIO.1.vert",
                "link.vk.crossStageIO.1.geom",
                "link.vk.crossStageIO.1.frag",
            ],
        ),
        Case::new(
            "link-stages-one-output",
            &[
                "-V",
                "--aml",
                "-o",
                "out.spv",
                "link.vk.crossStageIO.0.vert",
                "link.vk.crossStageIO.0.frag",
            ],
            &["link.vk.crossStageIO.0.vert", "link.vk.crossStageIO.0.frag"],
        ),
        Case::new(
            "link-compile-error",
            &[
                "-V",
                "--aml",
                TARGET_SHADER,
                "samplerlessTextureFunctions.frag",
            ],
            &[TARGET_SHADER, "samplerlessTextureFunctions.frag"],
        ),
        Case::new(
            "link-multiple-main",
            &["-V", "link.vk.matchingPC.0.0.frag", "renamed.frag"],
            &["link.vk.matchingPC.0.0.frag"],
        )
        .file_as("link.vk.matchingPC.0.0.frag", "renamed.frag"),
        Case::new(
            "G",
            &["-G", "spv.targetOpenGL.vert"],
            &["spv.targetOpenGL.vert"],
        )
        .rejected("OpenGL SPIR-V is out of scope"),
        Case::new(
            "client-opengl100",
            &["--client", "opengl100", "spv.targetOpenGL.vert"],
            &["spv.targetOpenGL.vert"],
        )
        .rejected("OpenGL SPIR-V is out of scope"),
        Case::new(
            "target-env-opengl",
            &["--target-env", "opengl", "spv.targetOpenGL.vert"],
            &["spv.targetOpenGL.vert"],
        )
        .rejected("OpenGL SPIR-V is out of scope"),
        Case::new("D-hlsl", &["-D", "-V", TARGET_SHADER], &[TARGET_SHADER])
            .rejected("HLSL is out of scope"),
        Case::new(
            "glsl-version",
            &["--glsl-version", "450", "-V", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .rejected("overriding #version is out of scope"),
        Case::new(
            "preamble",
            &["-V", "-P#define X 1", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .rejected("preamble text is not supported"),
        Case::new("reflection", &["-l", "-q", TARGET_SHADER], &[TARGET_SHADER])
            .rejected("the reflection query database is not supported"),
        Case::new(
            "no-link",
            &["-V", "--no-link", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .rejected("SPIR-V with linkage is not supported; --object writes rglsl object modules"),
        Case::new(
            "config-file",
            &["-V", TARGET_SHADER, "limits.conf"],
            &[TARGET_SHADER],
        )
        .rejected("resource limit files are not supported"),
        Case::new(
            "hlsl-iomap",
            &["-V", "--hlsl-iomap", TARGET_SHADER],
            &[TARGET_SHADER],
        )
        .rejected("HLSL is out of scope"),
    ]
}

#[derive(Debug)]
struct Run {
    exit: Exit,
    stdout: String,
    stderr: String,
    files: Vec<String>,
}

fn copy_dir(from: &Path, to: &Path) -> Result<()> {
    let mut pending = vec![(from.to_path_buf(), to.to_path_buf())];
    while let Some((source, target)) = pending.pop() {
        fs::create_dir_all(&target)?;
        for entry in fs::read_dir(&source)? {
            let entry = entry?;
            let path = entry.path();
            let destination = target.join(entry.file_name());
            if path.is_dir() {
                pending.push((path, destination));
            } else {
                fs::copy(&path, &destination)?;
            }
        }
    }
    Ok(())
}

fn listing(directory: &Path) -> Result<BTreeSet<String>> {
    let mut names = BTreeSet::new();
    let mut pending = vec![directory.to_path_buf()];
    while let Some(current) = pending.pop() {
        for entry in fs::read_dir(&current)? {
            let path = entry?.path();
            if path.is_dir() {
                pending.push(path);
            } else if let Ok(relative) = path.strip_prefix(directory) {
                names.insert(relative.to_string_lossy().replace('\\', "/"));
            }
        }
    }
    Ok(names)
}

fn run_tool(
    tool: &Path,
    case: &Case,
    test_dir: &Path,
    work: &Path,
    timeout: Duration,
) -> Result<Run> {
    if work.exists() {
        fs::remove_dir_all(work)?;
    }
    fs::create_dir_all(work)?;
    for &(source, name) in &case.files {
        fs::copy(test_dir.join(source), work.join(name))
            .with_context(|| format!("copying {source}"))?;
    }
    for directory in &case.dirs {
        copy_dir(&test_dir.join(directory), &work.join(directory))?;
    }
    let before = listing(work)?;
    let mut command = Command::new(tool);
    command.current_dir(work).args(&case.args);
    let input = match case.stdin {
        Some(file) => Some(fs::read(test_dir.join(file))?),
        None => None,
    };
    let output = process::run_with_input(command, timeout, input)?;
    let after = listing(work)?;
    let mut prefixes = vec![(tool.to_string_lossy().into_owned(), "<exe>")];
    if let Ok(canonical) = fs::canonicalize(work) {
        prefixes.push((canonical.to_string_lossy().into_owned(), "<work>"));
    }
    prefixes.push((work.to_string_lossy().into_owned(), "<work>"));
    let clean = |text: &str| {
        prefixes
            .iter()
            .fold(text.to_owned(), |text, (prefix, name)| {
                text.replace(prefix.as_str(), name)
            })
    };
    Ok(Run {
        exit: output.exit,
        stdout: clean(&output.stdout),
        stderr: clean(&output.stderr),
        files: after.difference(&before).cloned().collect(),
    })
}

fn exit_code(exit: &Exit) -> Option<i32> {
    match *exit {
        Exit::Code(code) => Some(code),
        Exit::Signal | Exit::Timeout => None,
    }
}

const SUMMARY_SUFFIX: &str = "compilation errors.  No code generated.";

fn is_disassembly_start(line: &str) -> bool {
    line.starts_with("// Module Version") || line.starts_with("; SPIR-V")
}

pub fn normalize(text: &str) -> Vec<String> {
    let lines: Vec<&str> = text.lines().collect();
    let mut normalized = Vec::new();
    let mut index = 0;
    let mut in_errors = false;
    let mut after_error = false;
    while index < lines.len() {
        let line = lines.get(index).map_or("", |line| line.trim_end());
        index += 1;
        if line.trim().is_empty() {
            continue;
        }
        if after_error && line.starts_with(char::is_whitespace) {
            continue;
        }
        after_error = line.starts_with("ERROR: ") || line.starts_with("WARNING: ");
        if let Some(linking) = line.strip_prefix("WARNING: Linking ") {
            normalized.push(format!("WARNING: Linking {}:", link_stage(linking)));
            in_errors = false;
            continue;
        }
        if is_disassembly_start(line) {
            let end = lines
                .iter()
                .enumerate()
                .skip(index)
                .take_while(|&(_, line)| !is_disassembly_start(line))
                .filter(|&(_, line)| line.contains("FunctionEnd"))
                .map(|(position, _)| position + 1)
                .last()
                .unwrap_or(index);
            index = end;
            normalized.push(String::from("<disassembly>"));
            in_errors = false;
            continue;
        }
        if let Some(rest) = line.strip_prefix("ERROR: ") {
            if rest.ends_with(SUMMARY_SUFFIX) {
                normalized.push(format!("ERROR: <n> {SUMMARY_SUFFIX}"));
                in_errors = false;
                continue;
            }
            if let Some(linking) = rest.strip_prefix("Linking ") {
                let entry = format!("ERROR: Linking {}:", link_stage(linking));
                if normalized.last() != Some(&entry) {
                    normalized.push(entry);
                }
                in_errors = false;
                continue;
            }
            if !in_errors {
                let location = error_location(rest);
                normalized.push(format!("ERROR: {location}: <messages>"));
                in_errors = true;
            }
            continue;
        }
        in_errors = false;
        normalized.push(line.trim().to_owned());
    }
    normalized
}

fn link_stage(linking: &str) -> String {
    let stage = linking.split_once(':').map_or(linking, |(stage, _)| stage);
    match stage
        .strip_suffix(" stages")
        .and_then(|pair| pair.split_once(" and "))
    {
        Some((first, second)) if first == second => format!("{first} stage"),
        _ => stage.to_owned(),
    }
}

pub fn without_cascaded_link_errors(lines: Vec<String>) -> Vec<String> {
    let summary = format!("ERROR: <n> {SUMMARY_SUFFIX}");
    if !lines.contains(&summary) {
        return lines;
    }
    lines
        .into_iter()
        .filter(|line| !line.starts_with("ERROR: Linking "))
        .collect()
}

fn error_location(rest: &str) -> String {
    let mut parts = rest.splitn(4, ':');
    let file = parts.next().unwrap_or_default();
    let mut location = String::from(file);
    for part in parts {
        if part.chars().all(|character| character.is_ascii_digit()) && !part.is_empty() {
            location.push(':');
            location.push_str(part);
        } else {
            break;
        }
    }
    location
}

fn hex_words(text: &str) -> Result<Vec<u32>> {
    let mut words = Vec::new();
    for token in text.split(|character: char| character == ',' || character.is_whitespace()) {
        if let Some(hex) = token.strip_prefix("0x") {
            words.push(u32::from_str_radix(hex, 16)?);
        }
    }
    Ok(words)
}

fn hex_skeleton(text: &str) -> Vec<String> {
    text.lines()
        .skip(1)
        .filter(|line| !line.trim_start().starts_with("0x"))
        .map(|line| line.trim().to_owned())
        .collect()
}

struct Environment {
    glslang: Tool,
    spirv_val: Tool,
    rglsl: PathBuf,
    expected: interface::Expected,
    test_dir: PathBuf,
    work: PathBuf,
    timeout: Duration,
}

fn spirv_words(path: &Path) -> Option<Vec<u32>> {
    let bytes = fs::read(path).ok()?;
    let words: Vec<u32> = bytes
        .chunks_exact(4)
        .map(|chunk| u32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
        .collect();
    (bytes.len() % 4 == 0 && words.first() == Some(&0x0723_0203)).then_some(words)
}

fn validate(env: &Environment, case: &Case, module: &Path) -> Result<Option<String>> {
    let mut command = Command::new(&env.spirv_val.path);
    command.args(["--target-env", &case.target_env()]);
    command.args(&case.spirv_val);
    command.arg(module);
    let output = process::run(command, env.timeout)?;
    Ok(match output.exit {
        Exit::Code(0) => None,
        _ => Some(
            output
                .stderr
                .lines()
                .chain(output.stdout.lines())
                .find(|line| !line.trim().is_empty())
                .unwrap_or("spirv-val failed")
                .to_owned(),
        ),
    })
}

fn compare_module(
    env: &Environment,
    case: &Case,
    name: &str,
    reference: &Path,
    ours: &Path,
    problems: &mut Vec<String>,
) -> Result<()> {
    let reference_valid = validate(env, case, reference)?.is_none();
    if let Some(message) = validate(env, case, ours)? {
        if reference_valid {
            problems.push(format!("{name}: spirv-val: {message}"));
        }
        return Ok(());
    }
    let shader = case.files.first().map_or(case.name, |&(source, _)| source);
    let check = interface::check_files(&env.expected, shader, &[(reference, ours)]);
    if !check.passed() {
        problems.push(format!("{name}: interface: {}", check.note()));
    }
    if case
        .args
        .iter()
        .any(|arg| arg.starts_with("-g") && *arg != "-g0")
    {
        let comparison = crate::debuginfo::compare(ours, reference)?;
        if !comparison.matches() && crate::debuginfo::expected_difference(shader).is_none() {
            problems.push(format!("{name}: {}", comparison.note()));
        }
    }
    Ok(())
}

fn compare_files(
    env: &Environment,
    case: &Case,
    glslang: &Run,
    ours: &Run,
    problems: &mut Vec<String>,
) -> Result<()> {
    if glslang.files != ours.files {
        problems.push(format!(
            "files: glslang wrote [{}], rglsl wrote [{}]",
            glslang.files.join(", "),
            ours.files.join(", ")
        ));
        return Ok(());
    }
    let reference_dir = env.work.join(case.name).join("glslang");
    let ours_dir = env.work.join(case.name).join("rglsl");
    for name in &glslang.files {
        let reference = reference_dir.join(name);
        let mine = ours_dir.join(name);
        match (spirv_words(&reference), spirv_words(&mine)) {
            (Some(_), Some(_)) => {
                compare_module(env, case, name, &reference, &mine, problems)?;
                continue;
            }
            (Some(_), None) | (None, Some(_)) => {
                problems.push(format!("{name}: only one of the files is a SPIR-V binary"));
                continue;
            }
            (None, None) => {}
        }
        let reference_text = fs::read_to_string(&reference).unwrap_or_default();
        let ours_text = fs::read_to_string(&mine).unwrap_or_default();
        if reference_text.trim_start().starts_with("//") {
            if hex_skeleton(&reference_text) != hex_skeleton(&ours_text) {
                problems.push(format!(
                    "{name}: the hexadecimal text is laid out differently"
                ));
            }
            let decoded = |text: &str, side: &str| -> Result<PathBuf> {
                let words = hex_words(text)?;
                let path = env.work.join(case.name).join(format!("{name}.{side}.spv"));
                let bytes: Vec<u8> = words.iter().flat_map(|word| word.to_le_bytes()).collect();
                fs::write(&path, bytes)?;
                Ok(path)
            };
            let reference_module = decoded(&reference_text, "glslang")?;
            let ours_module = decoded(&ours_text, "rglsl")?;
            compare_module(env, case, name, &reference_module, &ours_module, problems)?;
        } else if reference_text != ours_text {
            problems.push(format!("{name}: contents differ"));
        }
    }
    Ok(())
}

fn first_difference(reference: &[String], ours: &[String]) -> String {
    let position = reference
        .iter()
        .zip(ours)
        .position(|(left, right)| left != right)
        .unwrap_or_else(|| reference.len().min(ours.len()));
    format!(
        "glslang `{}`, rglsl `{}`",
        reference.get(position).map_or("<end>", String::as_str),
        ours.get(position).map_or("<end>", String::as_str)
    )
}

#[derive(Debug)]
enum Verdict {
    Pass,
    Expected(String),
    Fail(String),
}

fn check(env: &Environment, case: &Case) -> Result<Verdict> {
    let directory = env.work.join(case.name);
    let glslang = run_tool(
        &env.glslang.path,
        case,
        &env.test_dir,
        &directory.join("glslang"),
        env.timeout,
    )?;
    let ours = run_tool(
        &env.rglsl,
        case,
        &env.test_dir,
        &directory.join("rglsl"),
        env.timeout,
    )?;
    let (Some(reference_code), Some(our_code)) = (exit_code(&glslang.exit), exit_code(&ours.exit))
    else {
        return Ok(Verdict::Fail(format!(
            "abnormal exit: glslang {:?}, rglsl {:?}",
            glslang.exit, ours.exit
        )));
    };
    match case.expect {
        Expect::Rejected(why) => {
            let rejected =
                our_code == 1 && ours.stderr.contains(": Error: ") && ours.files.is_empty();
            return Ok(if rejected {
                Verdict::Expected(format!("{why} (glslang exits {reference_code})"))
            } else {
                Verdict::Fail(format!(
                    "rglsl should reject the command line ({why}) but exits {our_code}"
                ))
            });
        }
        Expect::Exit(code, why) => {
            return Ok(if our_code == code {
                Verdict::Expected(format!(
                    "{why} (glslang exits {reference_code}, rglsl {our_code})"
                ))
            } else {
                Verdict::Fail(format!(
                    "rglsl should exit {code} ({why}) but exits {our_code}"
                ))
            });
        }
        Expect::Same => {}
    }
    let mut problems = Vec::new();
    if reference_code != our_code {
        problems.push(format!("exit: glslang {reference_code}, rglsl {our_code}"));
    }
    let reference_stderr = without_cascaded_link_errors(normalize(&glslang.stderr));
    let ours_stderr = without_cascaded_link_errors(normalize(&ours.stderr));
    if !case.ignore_stderr && reference_stderr != ours_stderr {
        problems.push(format!(
            "stderr: {}",
            first_difference(&reference_stderr, &ours_stderr)
        ));
    }
    if case.ignore_stdout.is_none() {
        let reference_stdout = normalize(&glslang.stdout);
        let ours_stdout = normalize(&ours.stdout);
        if reference_stdout != ours_stdout {
            problems.push(format!(
                "stdout: {}",
                first_difference(&reference_stdout, &ours_stdout)
            ));
        }
    }
    compare_files(env, case, &glslang, &ours, &mut problems)?;
    Ok(if problems.is_empty() {
        match case.ignore_stdout {
            Some(why) => Verdict::Expected(format!("stdout not compared: {why}")),
            None => Verdict::Pass,
        }
    } else {
        Verdict::Fail(problems.join("; "))
    })
}

fn build_rglsl(root: &Path) -> Result<PathBuf> {
    if let Some(path) = std::env::var_os("RGLSL_CLI") {
        return Ok(PathBuf::from(path));
    }
    let cargo = std::env::var_os("CARGO").unwrap_or_else(|| "cargo".into());
    process::checked(
        Command::new(cargo)
            .current_dir(root)
            .args(["build", "--release", "-p", "rglsl-cli"]),
        "building the rglsl command-line tool",
    )?;
    Ok(root
        .join("target")
        .join("release")
        .join(format!("rglsl{}", std::env::consts::EXE_SUFFIX)))
}

pub fn run(root: &Path, options: &Options) -> Result<i32> {
    let glslang_dir = options
        .glslang_dir
        .clone()
        .unwrap_or_else(|| oracles::default_glslang_src(root));
    let test_dir = glslang_dir.join("Test");
    if !test_dir.is_dir() {
        bail!(
            "{} has no Test/ directory: run `cargo xtask oracles` or pass --glslang-dir",
            glslang_dir.display()
        );
    }
    let env = Environment {
        glslang: oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?,
        spirv_val: oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?,
        rglsl: build_rglsl(root)?,
        expected: interface::Expected::load(root)?,
        test_dir,
        work: root.join("target").join("xtask").join("cli"),
        timeout: Duration::from_secs(options.timeout_secs),
    };
    let mut report = String::from("case\tverdict\tcommand\tnote\n");
    let (mut passed, mut expected, mut failed) = (0, 0, 0);
    for case in cases() {
        if let Some(ref filter) = options.filter {
            if !case.name.contains(filter.as_str()) {
                continue;
            }
        }
        let verdict = check(&env, &case)?;
        let command = case.args.join(" ");
        let (label, note) = match verdict {
            Verdict::Pass => {
                passed += 1;
                ("pass", String::new())
            }
            Verdict::Expected(note) => {
                expected += 1;
                ("expected", note)
            }
            Verdict::Fail(note) => {
                failed += 1;
                ("FAIL", note)
            }
        };
        println!("{label:8} {:36} {note}", case.name);
        let _ = writeln!(report, "{}\t{label}\t{command}\t{note}", case.name);
    }
    fs::create_dir_all(&env.work)?;
    let report_path = env.work.join("report.tsv");
    fs::write(&report_path, report)?;
    println!(
        "\n{passed} passed, {expected} with deliberate differences, {failed} failed; details: {}",
        report_path.display()
    );
    Ok(i32::from(failed > 0))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn normalizes_glslang_output() {
        let glslang = "a.frag\nERROR: a.frag:3: 'x' : undeclared identifier \nERROR: a.frag:3: '' : compilation terminated \nERROR: 2 compilation errors.  No code generated.\n\n\nERROR: Linking fragment stage: Missing entry point: Each stage requires one entry point\n\n";
        let rglsl = "a.frag\nERROR: a.frag:3: `x` is not declared\nERROR: 1 compilation errors.  No code generated.\n\n\nERROR: Linking fragment stage: Missing entry point: Each stage requires one entry point\n\n";
        assert_eq!(normalize(glslang), normalize(rglsl));
        assert_eq!(
            normalize(rglsl),
            [
                "a.frag",
                "ERROR: a.frag:3: <messages>",
                "ERROR: <n> compilation errors.  No code generated.",
                "ERROR: Linking fragment stage:",
            ]
        );
    }

    #[test]
    fn error_locations_keep_columns() {
        assert_eq!(error_location("a.vert:7:16: 'model' : bad"), "a.vert:7:16");
        assert_eq!(error_location("0:7: 'model' : bad"), "0:7");
        assert_eq!(error_location("a.vert: bad"), "a.vert");
    }

    #[test]
    fn skips_disassembly() {
        let text = "// Module Version 10000\n  Capability Shader\n  FunctionEnd\nafter\n";
        assert_eq!(normalize(text), ["<disassembly>", "after"]);
        let text = "; SPIR-V\nOpCapability Shader\nOpFunctionEnd\n";
        assert_eq!(normalize(text), ["<disassembly>"]);
    }

    #[test]
    fn hex_round_trip() -> Result<()> {
        let text = "\t// x\n\t0x07230203,0x00010000\n\t0x00000001\n";
        assert_eq!(hex_words(text)?, [0x0723_0203, 0x0001_0000, 1]);
        Ok(())
    }
}
