#![allow(dead_code, reason = "each test uses a part of the support code")]

use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

use rglsl_fuzz::{Donor, ShaderJob};

pub type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

pub const NEEDS_PREPROCESSOR: [&str; 1] = ["matrices_many_loops"];

pub fn samples_directory() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450")
}

fn sample_paths() -> TestResult<Vec<(String, PathBuf)>> {
    let mut paths: Vec<PathBuf> = fs::read_dir(samples_directory())?
        .map(|entry| entry.map(|entry| entry.path()))
        .collect::<Result<Vec<_>, _>>()?
        .into_iter()
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "json")
        })
        .collect();
    paths.sort();
    Ok(paths
        .into_iter()
        .filter_map(|path| {
            let name = path.file_stem()?.to_str()?.to_owned();
            (!NEEDS_PREPROCESSOR.contains(&name.as_str())).then_some((name, path))
        })
        .collect())
}

pub fn sample_jobs() -> TestResult<Vec<(String, ShaderJob)>> {
    sample_paths()?
        .into_iter()
        .map(|(name, path)| {
            let json = fs::read_to_string(&path)?;
            let shader = fs::read_to_string(path.with_extension("frag"))?;
            let job = ShaderJob::parse(&json, &[(String::from("frag"), shader)])
                .map_err(|error| format!("{name}: {error}"))?;
            Ok((name, job))
        })
        .collect()
}

pub fn sample_donors() -> TestResult<Vec<Donor>> {
    sample_paths()?
        .into_iter()
        .map(|(name, path)| {
            let shader = fs::read_to_string(path.with_extension("frag"))?;
            Ok(Donor::parse(&name, "frag", &shader).map_err(|error| format!("{name}: {error}"))?)
        })
        .collect()
}

pub fn glslang() -> Option<PathBuf> {
    let pinned = Path::new(env!("CARGO_MANIFEST_DIR")).join("../target/oracles/bin/glslang");
    std::env::var_os("RGLSL_GLSLANG")
        .map(PathBuf::from)
        .or_else(|| pinned.is_file().then_some(pinned))
}

pub fn glslang_accepts(glslang: &Path, text: &str, extension: &str, tag: &str) -> TestResult<bool> {
    let directory = Path::new(env!("CARGO_TARGET_TMPDIR")).join("rglsl-fuzz-variants");
    fs::create_dir_all(&directory)?;
    let shader = directory.join(format!("{tag}.{extension}"));
    fs::write(&shader, text)?;
    let output = Command::new(glslang)
        .args(["--target-env", "vulkan1.0", "-o"])
        .arg(directory.join(format!("{tag}.spv")))
        .arg(&shader)
        .output()?;
    Ok(output.status.success())
}
