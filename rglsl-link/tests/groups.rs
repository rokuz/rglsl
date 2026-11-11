#![allow(clippy::unwrap_used, clippy::expect_used, clippy::panic)]

use std::fs;
use std::path::Path;

use rglsl::front::glsl::{Frontend, Options};
use rglsl::ShaderStage;

fn stage(extension: &str) -> Option<ShaderStage> {
    Some(match extension {
        "vert" => ShaderStage::Vertex,
        "tesc" => ShaderStage::TessControl,
        "tese" => ShaderStage::TessEvaluation,
        "geom" => ShaderStage::Geometry,
        "frag" => ShaderStage::Fragment,
        "comp" => ShaderStage::Compute,
        "task" => ShaderStage::Task,
        "mesh" => ShaderStage::Mesh,
        _ => return None,
    })
}

fn spirv_version(test: &Path) -> Option<(u8, u8)> {
    let text = fs::read_to_string(test.join("target")).ok()?;
    let version = text
        .split_whitespace()
        .find_map(|word| word.strip_prefix("spirv"))?;
    let (major, minor) = version.split_once('.')?;
    Some((major.parse().ok()?, minor.parse().ok()?))
}

fn run(test: &Path) -> (bool, Vec<String>) {
    let spirv = spirv_version(test);
    let mut names: Vec<String> = fs::read_dir(test)
        .unwrap()
        .map(|entry| entry.unwrap().file_name().to_string_lossy().into_owned())
        .filter(|name| !name.starts_with("reference."))
        .filter(|name| {
            name.rsplit_once('.')
                .is_some_and(|(_, extension)| extension == "glsl" || stage(extension).is_some())
        })
        .collect();
    names.sort();
    let mut messages = Vec::new();
    let mut objects = Vec::new();
    for name in names {
        let path = test.join(&name);
        let source = fs::read_to_string(&path).unwrap();
        let extension = name.rsplit_once('.').map_or("", |(_, extension)| extension);
        let options = Options {
            auto_map_locations: true,
            auto_map_bindings: true,
            spirv_version: spirv,
            library: extension == "glsl",
            ..Options::from(stage(extension).unwrap_or(ShaderStage::Compute))
        };
        let mut includer = rglsl_pp::FileSystemIncluder::new(Vec::<String>::new());
        let root = includer.add_root(&path);
        match Frontend::default().compile_with_includer(&options, &source, root, &mut includer) {
            Ok(mut object) => {
                object.name = Some(name.clone());
                objects.push(object);
            }
            Err(errors) => messages.extend(errors.errors.iter().map(ToString::to_string)),
        }
    }
    if !messages.is_empty() {
        return (false, messages);
    }
    let options = rglsl_link::Options {
        auto_map_locations: true,
        auto_map_bindings: true,
    };
    match rglsl_link::link_objects(&objects, &options) {
        Ok(stages) => {
            for linked in stages {
                rglsl::back::spv::write_vec(
                    &linked.module,
                    &linked.info,
                    &rglsl::back::spv::Options {
                        lang_version: spirv.unwrap_or((1, 0)),
                        ..rglsl::back::spv::Options::default()
                    },
                    None,
                )
                .unwrap();
            }
            (true, Vec::new())
        }
        Err(errors) => (false, errors.iter().map(ToString::to_string).collect()),
    }
}

#[test]
fn link_tests() {
    let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../tests/link");
    let mut tests: Vec<_> = fs::read_dir(&root)
        .unwrap()
        .map(|entry| entry.unwrap().path())
        .filter(|path| path.is_dir())
        .collect();
    tests.sort();
    assert!(!tests.is_empty());
    let mut failures = Vec::new();
    for test in tests {
        let expect = fs::read_to_string(test.join("expect")).unwrap();
        let mut lines = expect
            .lines()
            .map(str::trim)
            .filter(|line| !line.is_empty());
        let accept = lines.next() == Some("accept");
        let (accepted, messages) = run(&test);
        let missing: Vec<&str> = lines
            .filter(|expected| !messages.iter().any(|message| message.contains(expected)))
            .collect();
        if accepted != accept || !missing.is_empty() {
            failures.push(format!(
                "{}: accepted {accepted}, missing {missing:?}, errors {messages:?}",
                test.display()
            ));
        }
    }
    assert!(failures.is_empty(), "{}", failures.join("\n"));
}
