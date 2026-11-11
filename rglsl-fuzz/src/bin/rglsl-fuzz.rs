#![forbid(unsafe_code)]

use std::error::Error;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, ExitCode};

use rglsl_fuzz::amber::amber_script;
use rglsl_fuzz::reduce::{finalise, reduce, ReduceOptions};
use rglsl_fuzz::{
    generate_family, prepare_reference, Donor, EnabledTransformations, FamilyOptions, Random,
    ShaderJob, STAGE_EXTENSIONS,
};
use serde_json::{Map, Value};

const USAGE: &str = "usage:
  rglsl-fuzz generate [--seed N] [--variants K] [--max-uniforms M] [--prefix P] [--small]
                      [--no-injection-switch] [--max-bytes B] [--donors DIR]
                      [--enable-only T,T,...] [--disable T,T,...]
                      <references dir> <output dir>
  rglsl-fuzz prepare-reference [--max-uniforms M] <reference.json> <output.json>
  rglsl-fuzz reduce [--preserve-semantics] [--max-steps N] [--output DIR]
                    <shader job.json> -- <interestingness command> [arguments...]
      the command gets the candidate shader job's .json path as its last argument;
      exit status 0 means interesting";

type Result<T> = std::result::Result<T, Box<dyn Error>>;

#[derive(Debug, Default)]
struct Arguments {
    flags: Vec<String>,
    values: Vec<(String, String)>,
    positional: Vec<String>,
}

impl Arguments {
    fn parse(raw: &[String], valued: &[&str]) -> Result<Self> {
        let mut arguments = Self::default();
        let mut iterator = raw.iter();
        while let Some(argument) = iterator.next() {
            if valued.contains(&argument.as_str()) {
                let Some(value) = iterator.next() else {
                    return Err(format!("{argument} needs a value").into());
                };
                arguments.values.push((argument.clone(), value.clone()));
            } else if argument.starts_with("--") {
                arguments.flags.push(argument.clone());
            } else {
                arguments.positional.push(argument.clone());
            }
        }
        Ok(arguments)
    }

    fn value(&self, name: &str) -> Option<&str> {
        self.values
            .iter()
            .rev()
            .find(|(key, _)| key == name)
            .map(|(_, value)| value.as_str())
    }

    fn parsed<T: std::str::FromStr>(&self, name: &str, default: T) -> Result<T> {
        match self.value(name) {
            Some(text) => text
                .parse()
                .map_err(|_| format!("invalid value for {name}: {text}").into()),
            None => Ok(default),
        }
    }

    fn flag(&self, name: &str) -> bool {
        self.flags.iter().any(|flag| flag == name)
    }
}

fn read_job(json: &Path) -> Result<ShaderJob> {
    let text = fs::read_to_string(json)?;
    let mut sources = Vec::new();
    for extension in STAGE_EXTENSIONS {
        let shader = json.with_extension(extension);
        if shader.is_file() {
            sources.push((extension.to_owned(), fs::read_to_string(&shader)?));
        }
    }
    if sources.is_empty() {
        return Err(format!("{}: no shader next to the shader job", json.display()).into());
    }
    Ok(ShaderJob::parse(&text, &sources)?)
}

fn write_job(job: &ShaderJob, json: &Path) -> Result<()> {
    let emitted = job.emit();
    fs::write(json, emitted.json)?;
    for (extension, text) in emitted.shaders {
        fs::write(json.with_extension(extension), text)?;
    }
    Ok(())
}

fn read_donors(directory: &Path) -> Result<Vec<Donor>> {
    let mut paths: Vec<PathBuf> = fs::read_dir(directory)?
        .collect::<std::result::Result<Vec<_>, _>>()?
        .into_iter()
        .map(|entry| entry.path())
        .filter(|path| {
            path.extension()
                .and_then(|extension| extension.to_str())
                .is_some_and(|extension| STAGE_EXTENSIONS.contains(&extension))
        })
        .collect();
    paths.sort();
    let mut donors = Vec::new();
    for path in paths {
        let (Some(name), Some(extension)) = (
            path.file_stem().and_then(|stem| stem.to_str()),
            path.extension().and_then(|extension| extension.to_str()),
        ) else {
            continue;
        };
        match Donor::parse(name, extension, &fs::read_to_string(&path)?) {
            Ok(donor) => donors.push(donor),
            Err(error) => eprintln!("skipping donor {}: {error}", path.display()),
        }
    }
    Ok(donors)
}

fn shader_jobs(directory: &Path) -> Result<Vec<PathBuf>> {
    let mut jobs: Vec<PathBuf> = fs::read_dir(directory)?
        .collect::<std::result::Result<Vec<_>, _>>()?
        .into_iter()
        .map(|entry| entry.path())
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "json")
        })
        .collect();
    jobs.sort();
    Ok(jobs)
}

fn generate(raw: &[String]) -> Result<()> {
    let arguments = Arguments::parse(
        raw,
        &[
            "--seed",
            "--variants",
            "--max-uniforms",
            "--prefix",
            "--max-bytes",
            "--donors",
            "--enable-only",
            "--disable",
        ],
    )?;
    let [references, output] = arguments.positional.as_slice() else {
        return Err(USAGE.into());
    };
    let seed: u64 = arguments.parsed("--seed", 0)?;
    let mut options = FamilyOptions {
        variants: arguments.parsed("--variants", 10)?,
        max_bytes: arguments.parsed("--max-bytes", 500_000)?,
        ..FamilyOptions::default()
    };
    options.generator.max_uniforms = arguments.parsed("--max-uniforms", 0)?;
    options.generator.small = arguments.flag("--small");
    options.generator.add_injection_switch = !arguments.flag("--no-injection-switch");
    if let Some(list) = arguments.value("--enable-only") {
        let mut enabled = EnabledTransformations::none();
        for transformation in EnabledTransformations::parse_list(list)? {
            enabled = enabled.with(transformation);
        }
        options.generator.enabled = enabled;
    }
    if let Some(list) = arguments.value("--disable") {
        for transformation in EnabledTransformations::parse_list(list)? {
            options.generator.enabled = options.generator.enabled.without(transformation);
        }
    }
    if let Some(donors) = arguments.value("--donors") {
        options.donors = read_donors(Path::new(donors))?;
    }
    let output = PathBuf::from(output);
    fs::create_dir_all(&output)?;
    let mut random = Random::new(seed);
    let jobs = shader_jobs(Path::new(references))?;
    if jobs.is_empty() {
        eprintln!("warning: no reference shader jobs in {references}");
    }
    let mut families = 0_usize;
    for job_path in jobs {
        let inner_seed = u64::from(random.next_int(i32::MAX.unsigned_abs()));
        let Some(stem) = job_path.file_stem().and_then(|stem| stem.to_str()) else {
            continue;
        };
        let name = match arguments.value("--prefix") {
            Some(prefix) => format!("{prefix}_{stem}"),
            None => stem.to_owned(),
        };
        let reference = match read_job(&job_path) {
            Ok(reference) => reference,
            Err(error) => {
                eprintln!("skipping {}: {error}", job_path.display());
                continue;
            }
        };
        let mut family_random = Random::new(inner_seed);
        let family = match generate_family(&reference, &options, &mut family_random) {
            Ok(family) => family,
            Err(error) => {
                eprintln!("skipping {}: {error}", job_path.display());
                continue;
            }
        };
        let directory = output.join(&name);
        fs::create_dir_all(&directory)?;
        write_job(&family.reference, &directory.join("reference.json"))?;
        for (index, variant) in family.variants.iter().enumerate() {
            write_job(variant, &directory.join(format!("variant_{index:03}.json")))?;
        }
        for failure in &family.failures {
            eprintln!("{name}: {failure}");
        }
        let mut info = Map::new();
        info.insert(String::from("git_hash"), Value::from("none"));
        info.insert(String::from("args"), Value::from(raw.join(" ")));
        info.insert(
            String::from("seed"),
            Value::from(family_random.description()),
        );
        info.insert(
            String::from("family_seed"),
            Value::from(inner_seed.to_string()),
        );
        fs::write(
            directory.join("infolog.json"),
            serde_json::to_string_pretty(&Value::Object(info))?,
        )?;
        eprintln!(
            "{name}: {} variants in {} tries",
            family.variants.len(),
            family.tried
        );
        families += 1;
    }
    eprintln!(
        "generated {families} shader families in {}",
        output.display()
    );
    Ok(())
}

fn prepare(raw: &[String]) -> Result<()> {
    let arguments = Arguments::parse(raw, &["--max-uniforms"])?;
    let [reference, output] = arguments.positional.as_slice() else {
        return Err(USAGE.into());
    };
    let max_uniforms: usize = arguments.parsed("--max-uniforms", 0)?;
    let job = read_job(Path::new(reference))?;
    let prepared = prepare_reference(&job, max_uniforms, true)?;
    let output = PathBuf::from(output);
    if let Some(parent) = output.parent() {
        if !parent.as_os_str().is_empty() {
            fs::create_dir_all(parent)?;
        }
    }
    write_job(&prepared, &output)
}

fn reduce_command(raw: &[String]) -> Result<()> {
    let separator = raw
        .iter()
        .position(|argument| argument == "--")
        .ok_or(USAGE)?;
    let (own, command) = raw.split_at(separator);
    let command = command.get(1..).unwrap_or_default();
    let Some((program, program_arguments)) = command.split_first() else {
        return Err(USAGE.into());
    };
    let arguments = Arguments::parse(own, &["--max-steps", "--output"])?;
    let [input] = arguments.positional.as_slice() else {
        return Err(USAGE.into());
    };
    let input = PathBuf::from(input);
    let stem = input
        .file_stem()
        .and_then(|stem| stem.to_str())
        .unwrap_or("shader")
        .to_owned();
    let output = PathBuf::from(arguments.value("--output").unwrap_or("reduction"));
    fs::create_dir_all(&output)?;
    let job = read_job(&input)?;
    let options = ReduceOptions {
        preserve_semantics: arguments.flag("--preserve-semantics"),
        max_steps: arguments.parsed("--max-steps", ReduceOptions::default().max_steps)?,
    };
    let candidate = output.join(format!("{stem}_candidate.json"));
    let mut judge = |job: &ShaderJob| -> std::result::Result<bool, rglsl_fuzz::Error> {
        write_job(job, &candidate)
            .map_err(|error| rglsl_fuzz::Error::Generation(error.to_string()))?;
        let status = Command::new(program)
            .args(program_arguments)
            .arg(&candidate)
            .status()
            .map_err(|error| rglsl_fuzz::Error::Generation(error.to_string()))?;
        Ok(status.success())
    };
    let reduction = reduce(&job, options, &mut judge)?;
    let reduced = finalise(&reduction.job);
    let reduced = if judge(&reduced)? {
        reduced
    } else {
        reduction.job
    };
    let final_json = output.join(format!("{stem}_reduced_final.json"));
    write_job(&reduced, &final_json)?;
    match amber_script(&reduced) {
        Ok(script) => fs::write(output.join(format!("{stem}_reduced_final.amber")), script)?,
        Err(error) => eprintln!("no Amber script: {error}"),
    }
    let _ = fs::remove_file(&candidate);
    for extension in STAGE_EXTENSIONS {
        let _ = fs::remove_file(candidate.with_extension(extension));
    }
    eprintln!(
        "{} steps, {} interesting; reduced shader job in {}",
        reduction.steps,
        reduction.successes,
        final_json.display()
    );
    Ok(())
}

fn run() -> Result<()> {
    let raw: Vec<String> = std::env::args().skip(1).collect();
    match raw.split_first() {
        Some((command, rest)) if command == "generate" => generate(rest),
        Some((command, rest)) if command == "prepare-reference" => prepare(rest),
        Some((command, rest)) if command == "reduce" => reduce_command(rest),
        _ => Err(USAGE.into()),
    }
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
