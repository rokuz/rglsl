#![allow(clippy::panic)]

use std::fs;
use std::path::{Path, PathBuf};

use rglsl::front::glsl::{Frontend, Options};
use rglsl::ShaderStage;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const EXTENSIONS: [&str; 15] = [
    "glsl", "vert", "tesc", "tese", "geom", "frag", "comp", "task", "mesh", "rgen", "rint",
    "rahit", "rchit", "rmiss", "rcall",
];

fn sources(directory: &Path, found: &mut Vec<PathBuf>) -> TestResult {
    let mut pending = vec![directory.to_path_buf()];
    while let Some(directory) = pending.pop() {
        for entry in fs::read_dir(&directory)? {
            let path = entry?.path();
            if path.is_dir() {
                pending.push(path);
            } else if path
                .extension()
                .and_then(|extension| extension.to_str())
                .is_some_and(|extension| EXTENSIONS.contains(&extension))
            {
                found.push(path);
            }
        }
    }
    Ok(())
}

fn without_main(text: &str) -> String {
    let mut result = String::with_capacity(text.len());
    let bytes = text.as_bytes();
    let mut index = 0;
    while index < text.len() {
        let identifier_before = index > 0
            && bytes
                .get(index - 1)
                .is_some_and(|&byte| byte.is_ascii_alphanumeric() || byte == b'_');
        let rest = text.get(index..).unwrap_or("");
        if !identifier_before && rest.starts_with("main") {
            let after = rest.get(4..).unwrap_or("");
            if after.trim_start().starts_with('(') {
                result.push_str("main_entry");
                index += 4;
                continue;
            }
        }
        let Some(character) = rest.chars().next() else {
            break;
        };
        result.push(character);
        index += character.len_utf8();
    }
    result
}

fn outcome(result: Result<rglsl::object::ObjectModule, rglsl::front::glsl::ParseErrors>) -> String {
    match result {
        Ok(object) => rglsl_link::encode(&object).unwrap_or_else(|error| error.to_string()),
        Err(errors) => format!("{:?}", errors.errors),
    }
}

fn compare(path: &Path) -> TestResult<Option<String>> {
    let Ok(text) = fs::read_to_string(path) else {
        return Ok(None);
    };
    if text.contains("#include") {
        return Ok(None);
    }
    let source = without_main(&text);
    let options = Options {
        library: true,
        ..Options::from(ShaderStage::Fragment)
    };
    let shared = outcome(Frontend::default().compile(&options, &source));
    let separate = outcome(Frontend::default().compile_library_per_stage(&options, &source));
    Ok((shared != separate).then(|| path.display().to_string()))
}

#[test]
fn libraries_compile_as_if_lowered_for_every_stage() -> TestResult {
    let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("..");
    let mut paths = Vec::new();
    sources(&root.join("tests/link"), &mut paths)?;
    sources(&root.join("rglsl/tests/in/glsl"), &mut paths)?;
    if let Ok(extra) = std::env::var("RGLSL_LIBRARY_STAGE_SOURCES") {
        sources(Path::new(&extra), &mut paths)?;
    }
    paths.sort();
    let mut different = Vec::new();
    for path in &paths {
        if let Some(path) = compare(path)? {
            different.push(path);
        }
    }
    assert!(different.is_empty(), "{}", different.join("\n"));
    Ok(())
}
