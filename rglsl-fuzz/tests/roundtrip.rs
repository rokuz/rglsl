use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

use rglsl_fuzz::{parse, print, ParseErrorKind};

const NEEDS_PREPROCESSOR: [&str; 1] = ["matrices_many_loops.frag"];

fn samples_directory() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450")
}

fn samples() -> Vec<(String, String)> {
    let mut paths: Vec<PathBuf> = fs::read_dir(samples_directory())
        .expect("the sample directory exists")
        .map(|entry| entry.expect("a readable directory entry").path())
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "frag")
        })
        .collect();
    paths.sort();
    paths
        .into_iter()
        .map(|path| {
            let name = path
                .file_name()
                .and_then(|name| name.to_str())
                .expect("a UTF-8 file name")
                .to_owned();
            let source = fs::read_to_string(&path).expect("a readable shader");
            (name, source)
        })
        .collect()
}

fn parseable_samples() -> Vec<(String, String)> {
    samples()
        .into_iter()
        .filter(|(name, _)| !NEEDS_PREPROCESSOR.contains(&name.as_str()))
        .collect()
}

#[test]
fn every_sample_has_its_uniforms_file() {
    let all = samples();
    assert_eq!(all.len(), 44);
    for (name, _) in all {
        let json = samples_directory().join(name).with_extension("json");
        assert!(json.is_file(), "{}", json.display());
    }
}

#[test]
fn printing_a_sample_and_parsing_it_again_gives_the_same_tree() {
    let parseable = parseable_samples();
    assert_eq!(parseable.len(), 43);
    for (name, source) in parseable {
        let first = parse(&source).unwrap_or_else(|error| panic!("{name}: {error}"));
        let printed = print(&first);
        let second = parse(&printed).unwrap_or_else(|error| panic!("{name}: {error}\n{printed}"));
        assert_eq!(first, second, "{name}");
        assert_eq!(first.next_id(), second.next_id(), "{name}");
        assert_eq!(printed, print(&second), "{name}");
        assert_eq!(printed, first.to_string(), "{name}");
    }
}

#[test]
fn a_sample_that_needs_the_preprocessor_is_rejected() {
    for (name, source) in samples() {
        if !NEEDS_PREPROCESSOR.contains(&name.as_str()) {
            continue;
        }
        let error = parse(&source).expect_err("macros are not supported");
        assert_eq!(
            error.kind,
            ParseErrorKind::UnsupportedDirective(String::from("define")),
            "{name}"
        );
        assert!(error
            .to_string()
            .contains("preprocessor directives are not supported"));
        assert_eq!((error.position.line, error.position.column), (27, 1));
    }
}

#[test]
fn truncated_samples_never_panic() {
    let mut attempts = 0_usize;
    let mut accepted = 0_usize;
    for (index, (_, source)) in parseable_samples().into_iter().enumerate() {
        let step = 23 + index % 7;
        let boundaries: Vec<usize> = source.char_indices().map(|(offset, _)| offset).collect();
        for end in boundaries.into_iter().step_by(step) {
            let prefix = &source[..end];
            attempts += 1;
            if let Ok(unit) = parse(prefix) {
                accepted += 1;
                assert_eq!(parse(&print(&unit)).ok(), Some(unit));
            }
        }
    }
    assert!(attempts > 2000, "{attempts}");
    assert!(accepted > 40, "{accepted}");
}

#[test]
fn mutated_samples_never_panic() {
    let replacements = [
        "",
        "(",
        ")",
        "{",
        "}",
        "[",
        "]",
        ";",
        ",",
        "=",
        "#",
        "/*",
        "*/",
        "0x",
        "1.e",
        "\u{3bb}",
        "\n#define X\n",
        "struct",
        "for",
        "case",
        "else",
        "layout(",
        "\u{0}",
    ];
    let mut attempts = 0_usize;
    for (index, (_, source)) in parseable_samples().into_iter().enumerate() {
        let boundaries: Vec<usize> = source.char_indices().map(|(offset, _)| offset).collect();
        for (step, window) in boundaries.windows(2).enumerate().skip(index).step_by(31) {
            let (start, end) = (window[0], window[1]);
            let replacement = replacements[step % replacements.len()];
            let mutated = format!("{}{replacement}{}", &source[..start], &source[end..]);
            attempts += 1;
            if let Ok(unit) = parse(&mutated) {
                assert_eq!(parse(&print(&unit)).ok(), Some(unit));
            }
        }
    }
    assert!(attempts > 1500, "{attempts}");
}

fn glslang() -> Option<PathBuf> {
    let configured = std::env::var_os("RGLSL_GLSLANG").map(PathBuf::from);
    let pinned = Path::new(env!("CARGO_MANIFEST_DIR")).join("../target/oracles/bin/glslang");
    configured.or(Some(pinned)).filter(|path| path.is_file())
}

fn glslang_accepts(glslang: &Path, shader: &Path) -> bool {
    let output = Path::new(env!("CARGO_TARGET_TMPDIR")).join("glslang-output.spv");
    Command::new(glslang)
        .args(["-R", "-V", "--auto-map-locations", "--auto-map-bindings"])
        .arg(shader)
        .arg("-o")
        .arg(&output)
        .output()
        .expect("glslang runs")
        .status
        .success()
}

#[test]
fn glslang_accepts_every_printed_sample_it_accepts_in_original_form() {
    let Some(glslang) = glslang() else {
        eprintln!("skipped: no glslang at target/oracles/bin/glslang (run `cargo xtask oracles`) or in RGLSL_GLSLANG");
        return;
    };
    let printed_directory = Path::new(env!("CARGO_TARGET_TMPDIR")).join("printed-450");
    fs::create_dir_all(&printed_directory).expect("a writable temporary directory");
    let mut accepted = 0_usize;
    for (name, source) in parseable_samples() {
        if !glslang_accepts(&glslang, &samples_directory().join(&name)) {
            continue;
        }
        accepted += 1;
        let unit = parse(&source).unwrap_or_else(|error| panic!("{name}: {error}"));
        let printed = printed_directory.join(&name);
        fs::write(&printed, print(&unit)).expect("a writable temporary file");
        assert!(glslang_accepts(&glslang, &printed), "{name}");
    }
    assert_eq!(accepted, 43);
}
