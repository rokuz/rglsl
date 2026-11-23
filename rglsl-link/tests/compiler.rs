use std::sync::Arc;

use rglsl_link::{
    BuiltinCache, CompileOptions, Compiler, IncludeKind, IncludeRequest, ProgramOptions,
    ResolvedInclude, Severity, ShaderStage, compile, compile_and_link, compile_with_includer,
    link_spirv, read_object, write_object,
};
use rglsl_sema::{BuiltinTables, ResourceLimits};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const PROGRAM: &str = "#version 450
layout(location = 0) out vec4 color;
float halve(float x);
void main() {
    color = vec4(halve(SCALE));
}
";

const LIBRARY: &str = "#version 450
#include \"half.h\"
float halve(float x) {
    return x * HALF;
}
";

fn program_options() -> CompileOptions {
    CompileOptions::new("main.frag", ShaderStage::Fragment).define("SCALE", "4.0")
}

fn library_options() -> CompileOptions {
    CompileOptions::library("halve.glsl").include("half.h", "const float HALF = 0.5;\n")
}

#[test]
fn compiles_and_links_into_spirv() -> TestResult {
    let program = compile_and_link(
        &[(PROGRAM, program_options()), (LIBRARY, library_options())],
        &ProgramOptions::default(),
    )?;
    let binary = program
        .stage(ShaderStage::Fragment)
        .ok_or("no fragment stage")?;
    assert_eq!(binary.entry_point, "main");
    assert_eq!(binary.words.first(), Some(&0x0723_0203));
    assert_eq!(binary.bytes().len(), binary.words.len() * 4);
    Ok(())
}

#[test]
fn tensors_raise_the_spirv_version_to_1_6() -> TestResult {
    const TENSORS: &str = "#version 460
#extension GL_ARM_tensors : enable
layout(set = 0, binding = 0) uniform tensorARM<int, 1> t;
layout(set = 0, binding = 1) buffer Out { uint size; };
void main() {
    size = tensorSizeARM(t, 0);
}
";
    let program = compile_and_link(
        &[(
            TENSORS,
            CompileOptions::new("tensors.comp", ShaderStage::Compute),
        )],
        &ProgramOptions::default(),
    )?;
    let binary = program
        .stage(ShaderStage::Compute)
        .ok_or("no compute stage")?;
    assert_eq!(binary.words.get(1), Some(&0x0001_0600));
    let plain = compile_and_link(
        &[(PROGRAM, program_options()), (LIBRARY, library_options())],
        &ProgramOptions::default(),
    )?;
    let binary = plain
        .stage(ShaderStage::Fragment)
        .ok_or("no fragment stage")?;
    assert_eq!(binary.words.get(1), Some(&0x0001_0000));
    Ok(())
}

#[test]
fn object_files_round_trip() -> TestResult {
    let objects = [
        compile(PROGRAM, &program_options())?,
        compile(LIBRARY, &library_options())?,
    ];
    let decoded = objects
        .iter()
        .map(|object| read_object(&write_object(object)?))
        .collect::<Result<Vec<_>, _>>()?;
    assert_eq!(
        decoded.first().and_then(|object| object.stage()),
        Some(ShaderStage::Fragment)
    );
    assert!(decoded.get(1).is_some_and(|object| object.is_library()));
    let program = link_spirv(&decoded, &ProgramOptions::default())?;
    assert_eq!(program.stages.len(), 1);
    Ok(())
}

#[test]
fn compile_errors_have_locations() {
    let source = "#version 450\nvoid main() {\n    float x = missing;\n}\n";
    let Err(diagnostics) = compile(
        source,
        &CompileOptions::new("bad.comp", ShaderStage::Compute),
    ) else {
        panic!("the shader compiled");
    };
    let diagnostic = diagnostics.iter().next();
    assert_eq!(diagnostic.map(|d| d.severity), Some(Severity::Error));
    assert_eq!(diagnostic.and_then(|d| d.line), Some(3));
    assert!(diagnostics.to_string().starts_with("ERROR: bad.comp:3:"));
}

#[test]
fn link_errors_name_the_stage() -> TestResult {
    let object = compile(PROGRAM, &program_options())?;
    let Err(diagnostics) = link_spirv(&[object], &ProgramOptions::default()) else {
        panic!("the program linked without the library");
    };
    assert_eq!(
        diagnostics.to_string(),
        "ERROR: Linking fragment stage: No function definition (body) found: halve(float)"
    );
    Ok(())
}

#[test]
fn garbage_is_not_an_object() {
    assert!(read_object(b"\xff\xfe").is_err());
    assert!(read_object(b"not an object").is_err());
}

#[test]
fn includes_resolve_through_a_callback() -> TestResult {
    let source = "#version 450\n#include \"lib/scale.h\"\n#include <common.h>\nfloat halve(float x) {\n    return x * HALF * ONE;\n}\n";
    let options = CompileOptions::library("shaders/halve.glsl");
    let mut requests = Vec::new();
    let object = compile_with_includer(source, &options, &mut |request: IncludeRequest<'_>| {
        requests.push((
            request.requested.to_owned(),
            request.kind,
            request.includer.map(str::to_owned),
        ));
        let (name, source) = match request.requested {
            "lib/scale.h" => ("shaders/lib/scale.h", "#include \"half.h\"\n"),
            "half.h" => ("shaders/lib/half.h", "const float HALF = 0.5;\n"),
            "common.h" => ("include/common.h", "const float ONE = 1.0;\n"),
            _ => return None,
        };
        Some(ResolvedInclude {
            name: name.to_owned(),
            source: source.to_owned(),
        })
    })?;
    assert!(object.is_library());
    assert_eq!(
        requests,
        [
            (
                "lib/scale.h".to_owned(),
                IncludeKind::Local,
                Some("shaders/halve.glsl".to_owned())
            ),
            (
                "half.h".to_owned(),
                IncludeKind::Local,
                Some("shaders/lib/scale.h".to_owned())
            ),
            (
                "common.h".to_owned(),
                IncludeKind::System,
                Some("shaders/halve.glsl".to_owned())
            ),
        ]
    );
    Ok(())
}

#[test]
fn unresolved_includes_are_errors() {
    let source = "#version 450\n#include \"missing.h\"\nvoid main() {}\n";
    let mut calls = 0;
    let Err(diagnostics) = compile_with_includer(
        source,
        &CompileOptions::new("main.comp", ShaderStage::Compute),
        &mut |_| {
            calls += 1;
            None
        },
    ) else {
        panic!("the shader compiled without its include");
    };
    assert!(diagnostics.to_string().contains("main.comp:2"));
    assert_eq!(calls, 1);
}

#[test]
fn a_cache_builds_each_table_once() {
    let cache = BuiltinCache::new();
    let limits = ResourceLimits::default();
    let first = cache.builtins(450, ShaderStage::Fragment, &limits);
    let again = cache.builtins(450, ShaderStage::Fragment, &limits);
    let other = cache.builtins(460, ShaderStage::Fragment, &limits);
    assert!(Arc::ptr_eq(&first, &again));
    assert!(!Arc::ptr_eq(&first, &other));
    assert!(other.is_for(460, ShaderStage::Fragment, &limits));
    let tables = cache.stage_tables(450, &limits);
    assert!(Arc::ptr_eq(&tables, &cache.stage_tables(450, &limits)));
}

#[test]
fn a_shared_compiler_compiles_like_the_free_functions_on_several_threads() -> TestResult {
    let compiler = Compiler::new();
    let sources = [(PROGRAM, program_options()), (LIBRARY, library_options())];
    let expected = compile_and_link(&sources, &ProgramOptions::default())?;
    let expected_library = write_object(&compile(LIBRARY, &library_options())?)?;
    std::thread::scope(|scope| -> TestResult {
        let threads: Vec<_> = (0..4)
            .map(|_| {
                scope.spawn(|| {
                    let program = compiler.compile_and_link(&sources, &ProgramOptions::default());
                    let library = compiler
                        .compile(LIBRARY, &library_options())
                        .and_then(|object| write_object(&object));
                    (program, library)
                })
            })
            .collect();
        for thread in threads {
            let (program, library) = thread.join().map_err(|_| "a thread panicked")?;
            assert_eq!(program?, expected);
            assert_eq!(library?, expected_library);
        }
        Ok(())
    })
}

#[test]
fn a_preamble_comes_before_the_source() -> TestResult {
    let mut options = program_options();
    options
        .macros
        .push(rglsl_link::Macro::Text(String::from("#define VALUE 0.5")));
    let program = compile_and_link(
        &[(
            "#version 450
layout(location = 0) out vec4 color;
void main() { color = vec4(VALUE); }
",
            options,
        )],
        &ProgramOptions::default(),
    )?;
    assert_eq!(program.stages.len(), 1);
    Ok(())
}

const VERTEX: &str = "#version 450
layout(location = 0) in vec3 position;
layout(location = 0) out vec2 coordinate;
void main() {
    coordinate = position.xy;
    gl_Position = vec4(position, 1.0);
}
";

const SAMPLED: &str = "#version 450
layout(location = 0) in vec2 coordinate;
layout(location = 0) out vec4 color;
layout(binding = 1) uniform sampler2D image;
void main() {
    color = texture(image, coordinate);
}
";

fn glsl(text: &str, options: CompileOptions) -> rglsl_link::Input<'_> {
    rglsl_link::Input {
        source: rglsl_link::Source::Glsl(text),
        options,
    }
}

#[test]
fn builds_programs_like_the_command_line() -> TestResult {
    let compiler = Compiler::new();
    let mut fragment =
        CompileOptions::new("shader.frag", ShaderStage::Fragment).target_vulkan(1, 2);
    fragment.entry_point = Some(String::from("shade"));
    let vertex = CompileOptions::new("shader.vert", ShaderStage::Vertex).target_vulkan(1, 2);
    let processes = fragment.processes();
    assert!(processes.contains(&String::from("entry-point shade")));
    assert!(processes.contains(&String::from("target-env vulkan1.2")));
    let options = ProgramOptions {
        spirv_version: (1, 5),
        reflection: Some(rglsl_link::reflect::Options::default()),
        ..ProgramOptions::default()
    };
    let build = compiler.build(
        &[glsl(VERTEX, vertex), glsl(SAMPLED, fragment)],
        &options,
        &mut |_| None,
    );
    assert!(
        !build.compile_failed() && !build.link_failed(),
        "{}",
        build.link
    );
    assert_eq!(build.units.len(), 2);
    assert_eq!(build.stages.len(), 2);
    let fragment = build.stages.get(1).ok_or("no fragment stage")?;
    assert_eq!(fragment.stage, ShaderStage::Fragment);
    assert_eq!(fragment.entry_point, "shade");
    assert!(fragment.result.is_ok());
    let reflection = build.reflection.ok_or("no reflection")?;
    assert!(reflection.contains("image:"), "{reflection}");
    assert!(reflection.contains("binding 1"), "{reflection}");
    Ok(())
}

#[test]
fn single_programs_report_link_errors_per_stage() {
    let build = Compiler::new().build(
        &[glsl(
            "#version 450\nvoid helper();\nvoid main() { helper(); }\n",
            CompileOptions::new("missing.comp", ShaderStage::Compute),
        )],
        &ProgramOptions::default(),
        &mut |_| None,
    );
    assert!(!build.compile_failed());
    assert!(build.link_failed());
    assert!(
        build
            .link
            .to_string()
            .starts_with("ERROR: Linking compute stage: "),
        "{}",
        build.link
    );
}

#[test]
fn diagnostics_format_as_glslang() {
    let source = "#version 450\nvoid main() {\n    float x = missing;\n}\n";
    let Err(diagnostics) = compile(
        source,
        &CompileOptions::new("bad.comp", ShaderStage::Compute),
    ) else {
        panic!("the shader compiled");
    };
    let plain = diagnostics.format(rglsl_link::DiagnosticFormat::default());
    assert!(plain.starts_with("ERROR: bad.comp:3: "), "{plain}");
    let unnamed = diagnostics.info_log(rglsl_link::DiagnosticFormat {
        unnamed_source: true,
        ..rglsl_link::DiagnosticFormat::default()
    });
    assert!(unnamed.starts_with("ERROR: 0:3: "), "{unnamed}");
    assert!(unnamed.ends_with("ERROR: 1 compilation errors.  No code generated.\n\n"));
}

#[test]
fn preprocesses_with_the_preamble_and_lists_includes() {
    let options = CompileOptions::new("main.vert", ShaderStage::Vertex)
        .define("SIZE", "3")
        .include("common.h", "float common_value;\n");
    let preprocessed = Compiler::new().preprocess(
        "#version 450\n#extension GL_GOOGLE_include_directive : require\n#include \"common.h\"\nfloat values[SIZE];\n",
        &options,
        &mut |_| None,
    );
    assert!(
        preprocessed.diagnostics.is_empty(),
        "{}",
        preprocessed.diagnostics
    );
    assert!(
        preprocessed.text.contains("float values[3];"),
        "{}",
        preprocessed.text
    );
    assert!(preprocessed.text.contains("float common_value;"));
    assert_eq!(preprocessed.files_read, ["./common.h"]);
}

#[test]
fn depfiles_escape_like_make() {
    assert_eq!(
        rglsl_link::depfile(
            &[String::from("frag.spv")],
            &[String::from("a b.frag"), String::from("$x.h")]
        ),
        "frag.spv: a\\ b.frag $$x.h\n"
    );
}

#[test]
fn enhanced_messages_keep_the_first_error() {
    let source = "#version 450\nvoid main() {\n    float x = missing;\n    float y = absent;\n}\n";
    let mut options = CompileOptions::new("two.comp", ShaderStage::Compute);
    let Err(all) = compile(source, &options) else {
        panic!("the shader compiled");
    };
    assert!(all.errors() >= 2, "{all}");
    options.enhanced_messages = true;
    let Err(first) = compile(source, &options) else {
        panic!("the shader compiled");
    };
    assert_eq!(first.errors(), 1);
    assert_eq!(first.list.first(), all.list.first());
}

#[test]
fn validate_io_needs_an_output_for_every_input_read() {
    let vertex = "#version 450\nvoid main() { gl_Position = vec4(0.0); }\n";
    let fragment = "#version 450\nlayout(location = 2) in vec4 tint;\nlayout(location = 0) out vec4 color;\nvoid helper() {}\nvoid main() {\n    color = tint;\n}\n";
    let inputs = [
        glsl(
            vertex,
            CompileOptions::new("plain.vert", ShaderStage::Vertex),
        ),
        glsl(
            fragment,
            CompileOptions::new("tinted.frag", ShaderStage::Fragment),
        ),
    ];
    let compiler = Compiler::new();
    let lenient = compiler.build(&inputs, &ProgramOptions::default(), &mut |_| None);
    assert!(!lenient.link_failed(), "{}", lenient.link);
    let options = ProgramOptions {
        validate_io: true,
        ..ProgramOptions::default()
    };
    let strict = compiler.build(&inputs, &options, &mut |_| None);
    assert!(strict.link_failed());
    assert_eq!(
        strict.link.to_string(),
        "ERROR: tinted.frag:6: Linking fragment and vertex stages: Preceding stage has no matching declaration for statically used input: tint"
    );
}
