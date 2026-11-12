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

fn outcome(
    result: Result<rglsl::object::ObjectModule, rglsl::front::glsl::ParseErrors>,
) -> Vec<(String, String)> {
    let object = match result {
        Ok(object) => object,
        Err(errors) => return vec![(String::from("errors"), format!("{:?}", errors.errors))],
    };
    ShaderStage::ALL
        .into_iter()
        .map(|stage| {
            let linked = match object.for_stage(stage) {
                Ok(mut variant) => {
                    variant.stages = vec![stage];
                    rglsl_link::encode(&variant).unwrap_or_else(|error| error.to_string())
                }
                Err(rejection) => format!("{rejection:?}"),
            };
            (format!("{stage:?}"), linked)
        })
        .collect()
}

fn hint(path: &Path) -> Option<ShaderStage> {
    let extension = path.extension().and_then(|extension| extension.to_str())?;
    EXTENSIONS
        .iter()
        .skip(1)
        .position(|&known| known == extension)
        .and_then(|index| {
            [
                ShaderStage::Vertex,
                ShaderStage::TessControl,
                ShaderStage::TessEvaluation,
                ShaderStage::Geometry,
                ShaderStage::Fragment,
                ShaderStage::Compute,
                ShaderStage::Task,
                ShaderStage::Mesh,
                ShaderStage::RayGeneration,
                ShaderStage::Intersection,
                ShaderStage::AnyHit,
                ShaderStage::ClosestHit,
                ShaderStage::Miss,
                ShaderStage::Callable,
            ]
            .get(index)
            .copied()
        })
}

fn compare(path: &Path) -> TestResult<Vec<String>> {
    let Ok(text) = fs::read_to_string(path) else {
        return Ok(Vec::new());
    };
    if text.contains("#include") {
        return Ok(Vec::new());
    }
    let source = without_main(&text);
    let mut different = Vec::new();
    let hinted = hint(path);
    for stage in [None, hinted]
        .into_iter()
        .collect::<std::collections::BTreeSet<_>>()
    {
        let options = match stage {
            Some(stage) => Options::from(stage),
            None => Options {
                library: true,
                ..Options::from(ShaderStage::Fragment)
            },
        };
        let shared = outcome(Frontend::default().compile(&options, &source));
        let separate = outcome(Frontend::default().compile_library_per_stage(&options, &source));
        if shared != separate {
            let at = shared
                .iter()
                .zip(&separate)
                .find(|&(left, right)| left != right)
                .map_or_else(|| String::from("result"), |(left, _)| left.0.clone());
            different.push(format!("{} (hint {stage:?}): {at}", path.display()));
        }
    }
    Ok(different)
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
        different.extend(compare(path)?);
    }
    assert!(different.is_empty(), "{}", different.join("\n"));
    Ok(())
}

const ONCE: [&str; 9] = [
    "#version 450\nfloat twice(float value) { return value * 2.0; }\n",
    "#version 460\nfloat twice(float value) { return value * 2.0; }\n",
    "#version 450\nvoid place(vec4 position) { gl_Position = position; }\n",
    "#version 450\nvoid drop() { discard; }\n",
    "#version 450\nlayout(binding = 0) uniform sampler2D image;\nvec4 biased(vec2 uv) { return texture(image, uv, 1.0); }\n",
    "#version 450\nlayout(binding = 0) uniform sampler2D image;\nvec4 sampled(vec2 uv) { return texture(image, uv); }\n",
    "#version 450\nlayout(location = 0) in vec4 color;\nlayout(location = 0) out vec4 result;\nvoid copy() { result = color; }\n",
    "#version 450\nvec4 coordinate() { return gl_FragCoord; }\n",
    "#version 450\nshared float values[64];\nvoid store(uint index, float value) { values[index] = value; }\n",
];

#[test]
fn a_library_is_lowered_once() {
    for source in ONCE {
        for options in [
            Options {
                library: true,
                ..Options::from(ShaderStage::Fragment)
            },
            Options::from(ShaderStage::Vertex),
            Options::from(ShaderStage::Fragment),
            Options::from(ShaderStage::Compute),
            Options::from(ShaderStage::ClosestHit),
        ] {
            let lowerings = Frontend::default().library_lowerings(&options, source);
            assert_eq!(lowerings, 1, "{source} (stage {:?})", options.stage);
        }
    }
}

#[test]
fn a_library_that_branches_on_the_stage_is_compiled_per_class() {
    let source = "#version 450\n#ifdef GL_FRAGMENT_SHADER\nvoid stop() { discard; }\n#endif\n";
    let options = Options {
        library: true,
        ..Options::from(ShaderStage::Fragment)
    };
    assert!(Frontend::default().library_lowerings(&options, source) > 1);
}
