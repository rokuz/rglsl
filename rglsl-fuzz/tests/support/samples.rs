#![allow(
    dead_code,
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    reason = "test support code fails by panicking"
)]

use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

use rglsl_fuzz::{Donor, ShaderJob};

pub const NEEDS_PREPROCESSOR: [&str; 1] = ["matrices_many_loops"];

pub fn samples_directory() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450")
}

fn sample_paths() -> Vec<(String, PathBuf)> {
    let mut paths: Vec<PathBuf> = fs::read_dir(samples_directory())
        .unwrap()
        .map(|entry| entry.unwrap().path())
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
            (!NEEDS_PREPROCESSOR.contains(&name.as_str())).then_some((name, path))
        })
        .collect()
}

pub fn sample_jobs() -> Vec<(String, ShaderJob)> {
    sample_paths()
        .into_iter()
        .map(|(name, path)| {
            let json = fs::read_to_string(&path).unwrap();
            let shader = fs::read_to_string(path.with_extension("frag")).unwrap();
            let job = ShaderJob::parse(&json, &[(String::from("frag"), shader)])
                .unwrap_or_else(|error| panic!("{name}: {error}"));
            (name, job)
        })
        .collect()
}

pub fn sample_donors() -> Vec<Donor> {
    sample_paths()
        .into_iter()
        .map(|(name, path)| {
            let shader = fs::read_to_string(path.with_extension("frag")).unwrap();
            Donor::parse(&name, "frag", &shader).unwrap()
        })
        .collect()
}

pub fn glslang() -> Option<PathBuf> {
    let pinned = Path::new(env!("CARGO_MANIFEST_DIR")).join("../target/oracles/bin/glslang");
    std::env::var_os("RGLSL_GLSLANG")
        .map(PathBuf::from)
        .or_else(|| pinned.is_file().then_some(pinned))
}

pub fn glslang_accepts(glslang: &Path, text: &str, extension: &str, tag: &str) -> bool {
    let directory = Path::new(env!("CARGO_TARGET_TMPDIR")).join("rglsl-fuzz-variants");
    fs::create_dir_all(&directory).unwrap();
    let shader = directory.join(format!("{tag}.{extension}"));
    fs::write(&shader, text).unwrap();
    let output = Command::new(glslang)
        .args(["--target-env", "vulkan1.0", "-o"])
        .arg(directory.join(format!("{tag}.spv")))
        .arg(&shader)
        .output()
        .expect("glslang runs");
    output.status.success()
}
