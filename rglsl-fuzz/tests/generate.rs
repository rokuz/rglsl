#![allow(
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

use std::fs;
use std::path::{Path, PathBuf};

use rglsl_fuzz::{analyze_shader, generate_family, parse_shader, FamilyOptions, Random, ShaderJob};
use rglsl_sema::Stage;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const NEEDS_PREPROCESSOR: [&str; 1] = ["matrices_many_loops"];

fn sample_jobs() -> TestResult<Vec<(String, ShaderJob)>> {
    let directory = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450");
    let mut paths: Vec<PathBuf> = fs::read_dir(directory)?
        .map(|entry| entry.map(|entry| entry.path()))
        .collect::<Result<Vec<_>, _>>()?
        .into_iter()
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "json")
        })
        .collect();
    paths.sort();
    let mut jobs = Vec::new();
    for path in paths {
        let Some(name) = path.file_stem().and_then(|stem| stem.to_str()) else {
            continue;
        };
        if NEEDS_PREPROCESSOR.contains(&name) {
            continue;
        }
        let json = fs::read_to_string(&path)?;
        let shader = fs::read_to_string(path.with_extension("frag"))?;
        let job = ShaderJob::parse(&json, &[(String::from("frag"), shader)])
            .map_err(|error| format!("{name}: {error}"))?;
        jobs.push((name.to_owned(), job));
    }
    Ok(jobs)
}

fn options() -> FamilyOptions {
    let mut options = FamilyOptions {
        variants: 2,
        ..FamilyOptions::default()
    };
    options.generator.min_nodes = 1500;
    options.generator.max_nodes = 4000;
    options.generator.max_uniforms = 4;
    options
}

fn emitted(job: &ShaderJob) -> Vec<(String, String)> {
    let emitted = job.emit();
    let mut all = emitted.shaders;
    all.push((String::from("json"), emitted.json));
    all
}

fn assert_valid(name: &str, text: &str) -> TestResult {
    let unit = parse_shader(text).map_err(|error| format!("{name}: {error}"))?;
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{name}: {:?}",
        analysis.diagnostics
    );
    Ok(())
}

#[test]
fn variants_of_every_sample_are_valid_and_deterministic() -> TestResult {
    let jobs = sample_jobs()?;
    assert_eq!(jobs.len(), 43);
    let options = options();
    let mut identities = 0;
    for (index, (name, reference)) in jobs.iter().enumerate() {
        let seed = 1000 + u64::try_from(index)?;
        let first = generate_family(reference, &options, &mut Random::new(seed))
            .map_err(|error| format!("{name}: {error}"))?;
        let second = generate_family(reference, &options, &mut Random::new(seed))
            .map_err(|error| format!("{name}: {error}"))?;
        assert_eq!(first.variants.len(), 2, "{name}: {:?}", first.failures);
        assert_valid(
            &format!("{name} reference"),
            &first.reference.emit().shaders[0].1,
        )?;
        for (number, (variant, again)) in first.variants.iter().zip(&second.variants).enumerate() {
            assert_eq!(emitted(variant), emitted(again), "{name} variant {number}");
            let text = &variant.emit().shaders[0].1;
            identities += text.matches("_GLF_IDENTITY(").count();
            assert!(text.contains("injectionSwitch"), "{name}");
            assert_valid(&format!("{name} variant {number}"), text)?;
        }
    }
    assert!(identities > 1000, "{identities}");
    Ok(())
}
