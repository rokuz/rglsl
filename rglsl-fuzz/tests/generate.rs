#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

use std::fs;
use std::path::{Path, PathBuf};

use rglsl_fuzz::{analyze_shader, generate_family, parse_shader, FamilyOptions, Random, ShaderJob};
use rglsl_sema::Stage;

const NEEDS_PREPROCESSOR: [&str; 1] = ["matrices_many_loops"];

fn sample_jobs() -> Vec<(String, ShaderJob)> {
    let directory = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450");
    let mut paths: Vec<PathBuf> = fs::read_dir(directory)
        .expect("the sample directory exists")
        .map(|entry| entry.expect("a readable directory entry").path())
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "json")
        })
        .collect();
    paths.sort();
    paths
        .into_iter()
        .filter_map(|path| {
            let name = path.file_stem()?.to_str()?.to_owned();
            if NEEDS_PREPROCESSOR.contains(&name.as_str()) {
                return None;
            }
            let json = fs::read_to_string(&path).expect("a readable JSON file");
            let shader = fs::read_to_string(path.with_extension("frag")).expect("a shader");
            let job = ShaderJob::parse(&json, &[(String::from("frag"), shader)])
                .unwrap_or_else(|error| panic!("{name}: {error}"));
            Some((name, job))
        })
        .collect()
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

fn assert_valid(name: &str, text: &str) {
    let unit = parse_shader(text).unwrap_or_else(|error| panic!("{name}: {error}"));
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{name}: {:?}",
        analysis.diagnostics
    );
}

#[test]
fn variants_of_every_sample_are_valid_and_deterministic() {
    let jobs = sample_jobs();
    assert_eq!(jobs.len(), 43);
    let options = options();
    let mut identities = 0;
    for (index, (name, reference)) in jobs.iter().enumerate() {
        let seed = 1000 + u64::try_from(index).expect("a small index");
        let first = generate_family(reference, &options, &mut Random::new(seed))
            .unwrap_or_else(|error| panic!("{name}: {error}"));
        let second = generate_family(reference, &options, &mut Random::new(seed))
            .unwrap_or_else(|error| panic!("{name}: {error}"));
        assert_eq!(first.variants.len(), 2, "{name}: {:?}", first.failures);
        assert_valid(
            &format!("{name} reference"),
            &first.reference.emit().shaders[0].1,
        );
        for (number, (variant, again)) in first.variants.iter().zip(&second.variants).enumerate() {
            assert_eq!(emitted(variant), emitted(again), "{name} variant {number}");
            let text = &variant.emit().shaders[0].1;
            identities += text.matches("_GLF_IDENTITY(").count();
            assert!(text.contains("injectionSwitch"), "{name}");
            assert_valid(&format!("{name} variant {number}"), text);
        }
    }
    assert!(identities > 1000, "{identities}");
}
