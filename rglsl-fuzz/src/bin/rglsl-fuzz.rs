#![forbid(unsafe_code)]

use std::error::Error;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

use rglsl_fuzz::{
    generate_family, prepare_reference, FamilyOptions, Random, ShaderJob, STAGE_EXTENSIONS,
};
use serde_json::{Map, Value};

const USAGE: &str = "usage:
  rglsl-fuzz generate [--seed N] [--variants K] [--max-uniforms M] [--prefix P] [--small]
                      [--no-injection-switch] [--max-bytes B] <references dir> <output dir>
  rglsl-fuzz prepare-reference [--max-uniforms M] <reference.json> <output.json>";

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

fn run() -> Result<()> {
    let raw: Vec<String> = std::env::args().skip(1).collect();
    match raw.split_first() {
        Some((command, rest)) if command == "generate" => generate(rest),
        Some((command, rest)) if command == "prepare-reference" => prepare(rest),
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
