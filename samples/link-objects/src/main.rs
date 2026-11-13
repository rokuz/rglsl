use std::error::Error;
use std::path::PathBuf;
use std::process::ExitCode;

use rglsl_link::{ProgramOptions, link_spirv, read_object};

const USAGE: &str = "usage: link-objects -o OUTPUT.spv OBJECT.rglo...";

struct Arguments {
    output: PathBuf,
    objects: Vec<PathBuf>,
}

fn parse_arguments() -> Result<Arguments, Box<dyn Error>> {
    let mut output = None;
    let mut objects = Vec::new();
    let mut arguments = std::env::args_os().skip(1);
    while let Some(argument) = arguments.next() {
        if argument == "-o" {
            output = Some(PathBuf::from(arguments.next().ok_or(USAGE)?));
        } else {
            objects.push(PathBuf::from(argument));
        }
    }
    let output = output.ok_or(USAGE)?;
    if objects.is_empty() {
        return Err(USAGE.into());
    }
    Ok(Arguments { output, objects })
}

fn run() -> Result<(), Box<dyn Error>> {
    let arguments = parse_arguments()?;
    let mut objects = Vec::with_capacity(arguments.objects.len());
    for path in &arguments.objects {
        let bytes = std::fs::read(path)
            .map_err(|error| format!("cannot read {}: {error}", path.display()))?;
        let object =
            read_object(&bytes).map_err(|errors| format!("{}:\n{errors}", path.display()))?;
        println!(
            "read {}: {}",
            path.display(),
            object.stage().map_or("library", |stage| stage.name())
        );
        objects.push(object);
    }
    let program = link_spirv(&objects, &ProgramOptions::default())?;
    for warning in program.warnings.iter() {
        println!("{warning}");
    }
    let [binary] = program.stages.as_slice() else {
        return Err(format!(
            "the objects link into {} stages; one output file holds one stage",
            program.stages.len()
        )
        .into());
    };
    std::fs::write(&arguments.output, binary.bytes())
        .map_err(|error| format!("cannot write {}: {error}", arguments.output.display()))?;
    println!(
        "wrote {}: {} stage, entry point `{}`, {} words",
        arguments.output.display(),
        binary.stage.name(),
        binary.entry_point,
        binary.words.len()
    );
    Ok(())
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
