use rglsl_link::{
    CompileOptions, ProgramOptions, Severity, ShaderStage, compile, compile_and_link, link_spirv,
    read_object, write_object,
};

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
