use std::error::Error;
use std::path::Path;
use std::process::ExitCode;

use rglsl_link::spirv_reflection::{PipelineLayout, Reflection};
use rglsl_link::{
    CompileOptions, Diagnostics, ObjectModule, OptLevel, OptOptions, Program, ProgramOptions,
    ShaderStage, compile, compile_and_link, link_spirv,
};

const VERTEX: &str = "#version 450
layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 0) out vec3 world_normal;
void main() {
    world_normal = normal;
    gl_Position = vec4(position, 1.0);
}
";

const FRAGMENT: &str = "#version 450
layout(location = 0) in vec3 world_normal;
layout(location = 0) out vec4 color;
vec3 shade(vec3 normal);
void main() {
    color = vec4(shade(normalize(world_normal)), 1.0);
}
";

const LIGHTING: &str = "#version 450
#include \"light.h\"
vec3 shade(vec3 normal) {
    return LIGHT_COLOR * max(dot(normal, LIGHT_DIRECTION), AMBIENT);
}
";

const LIGHT_HEADER: &str = "const vec3 LIGHT_DIRECTION = vec3(0.0, 0.0, 1.0);
const vec3 LIGHT_COLOR = vec3(1.0, 0.9, 0.8);
";

const BROKEN_FRAGMENT: &str = "#version 450
layout(location = 0) out vec4 color;
void main() {
    color = vec4(undeclared, 1.0);
}
";

fn lighting_options() -> CompileOptions {
    CompileOptions::library("lighting.glsl")
        .include("light.h", LIGHT_HEADER)
        .define("AMBIENT", "0.1")
}

fn compile_objects() -> Result<Vec<ObjectModule>, Diagnostics> {
    let vertex = compile(
        VERTEX,
        &CompileOptions::new("mesh.vert", ShaderStage::Vertex),
    )?;
    let fragment = compile(
        FRAGMENT,
        &CompileOptions::new("mesh.frag", ShaderStage::Fragment),
    )?;
    let lighting = compile(LIGHTING, &lighting_options())?;
    Ok(vec![vertex, fragment, lighting])
}

fn describe(program: &Program) {
    for binary in &program.stages {
        println!(
            "  {} stage: entry point `{}`, {} words ({} bytes)",
            binary.stage.name(),
            binary.entry_point,
            binary.words.len(),
            binary.bytes().len()
        );
    }
    match program.spirv_reflections() {
        Ok(reflections) => describe_reflections(&reflections),
        Err(error) => println!("  no SPIR-V reflection: {error}"),
    }
    for warning in program.warnings.iter() {
        println!("  {warning}");
    }
}

fn describe_reflections(reflections: &[Reflection]) {
    for reflection in reflections {
        println!("  {} stage reflection:", reflection.stage.name());
        for binding in &reflection.descriptor_bindings {
            println!(
                "    set {} binding {}: {} x{} `{}`",
                binding.set,
                binding.binding,
                binding.descriptor_type.name(),
                binding.count,
                binding.name.as_deref().unwrap_or_default()
            );
        }
        for (direction, variables) in [("in", &reflection.inputs), ("out", &reflection.outputs)] {
            for variable in variables {
                println!(
                    "    {direction} location {}: `{}`",
                    variable.location,
                    variable.name.as_deref().unwrap_or_default()
                );
            }
        }
    }
    match PipelineLayout::new(reflections) {
        Ok(layout) => println!(
            "  pipeline layout: {} descriptor sets, {} push constant ranges",
            layout.sets.len(),
            layout.push_constant_ranges.len()
        ),
        Err(error) => println!("  no pipeline layout: {error}"),
    }
}

fn write_binaries(program: &Program, directory: &Path) -> Result<(), Box<dyn Error>> {
    std::fs::create_dir_all(directory)?;
    for binary in &program.stages {
        let path = directory.join(format!("{}.spv", binary.stage.extension()));
        std::fs::write(&path, binary.bytes())?;
        println!("  wrote {}", path.display());
    }
    Ok(())
}

fn expect_failure(title: &str, result: Result<Program, Diagnostics>) -> Result<(), Box<dyn Error>> {
    match result {
        Ok(_) => Err(format!("{title}: expected a failure").into()),
        Err(diagnostics) => {
            println!("{title} fails as expected:");
            for diagnostic in diagnostics.iter() {
                println!("  {diagnostic}");
            }
            Ok(())
        }
    }
}

fn failures() -> Result<(), Box<dyn Error>> {
    expect_failure(
        "compiling an undeclared identifier",
        compile_and_link(
            &[(
                BROKEN_FRAGMENT,
                CompileOptions::new("broken.frag", ShaderStage::Fragment),
            )],
            &ProgramOptions::default(),
        ),
    )?;
    let fragment = compile(
        FRAGMENT,
        &CompileOptions::new("mesh.frag", ShaderStage::Fragment),
    )?;
    expect_failure(
        "linking without the lighting library",
        link_spirv(&[fragment], &ProgramOptions::default()),
    )
}

fn run() -> Result<(), Box<dyn Error>> {
    let objects = compile_objects()?;
    println!("compiled {} object modules", objects.len());
    let options = ProgramOptions {
        optimize: OptOptions {
            level: OptLevel::Performance,
            ..OptOptions::default()
        },
        ..ProgramOptions::default()
    };
    let program = link_spirv(&objects, &options)?;
    println!("linked {} stages:", program.stages.len());
    describe(&program);
    if let Some(directory) = std::env::args_os().nth(1) {
        write_binaries(&program, Path::new(&directory))?;
    }
    failures()
}

fn main() -> ExitCode {
    match run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(error) => {
            eprintln!("{error}");
            ExitCode::FAILURE
        }
    }
}
