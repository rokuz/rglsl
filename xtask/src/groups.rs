use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{Context, Result};

use crate::corpus::{supported_version, Case, Corpus, Kind, Target, STAGE_EXTENSIONS};

pub const LINK_SUITES: [(&str, &str); 2] = [
    ("Link.FromFile.Vk.cpp", "LinkTestVulkan"),
    ("Link.FromFile.cpp", "LinkTest"),
];

pub const LIBRARY_EXTENSION: &str = "glsl";

pub fn stage_of(name: &str) -> Option<&'static str> {
    let (_, extension) = name.rsplit_once('.')?;
    STAGE_EXTENSIONS
        .iter()
        .copied()
        .find(|stage| *stage == extension)
}

pub fn parse_groups(source: &str) -> Vec<Vec<String>> {
    let mut groups = Vec::new();
    let mut rest = source;
    while let Some(open) = rest.find('{') {
        rest = &rest[open + 1..];
        let Some(close) = rest.find('}') else { break };
        let inner = &rest[..close];
        if inner.contains('{') {
            continue;
        }
        let names: Vec<String> = inner
            .split('"')
            .skip(1)
            .step_by(2)
            .map(str::to_string)
            .collect();
        let only_literals = inner
            .split('"')
            .step_by(2)
            .all(|between| between.chars().all(|c| c == ',' || c.is_whitespace()));
        if !names.is_empty() && only_literals && names.iter().all(|name| stage_of(name).is_some()) {
            groups.push(names);
        }
    }
    groups
}

pub fn load_groups(glslang_dir: &Path) -> Result<Vec<Case>> {
    let test_dir = glslang_dir.join("Test");
    let mut cases = Vec::new();
    for (file, suite) in LINK_SUITES {
        let path = glslang_dir.join("gtests").join(file);
        let source =
            fs::read_to_string(&path).with_context(|| format!("reading {}", path.display()))?;
        let corpus = if suite == "LinkTestVulkan" {
            Corpus::Vulkan
        } else {
            Corpus::OpenGlAsVulkan
        };
        for files in parse_groups(&source) {
            let mut versions = Vec::new();
            for name in &files {
                let text = fs::read(test_dir.join(name))
                    .map(|bytes| String::from_utf8_lossy(&bytes).into_owned())
                    .unwrap_or_default();
                versions.push(supported_version(&text));
            }
            let (Some(first), Some(Some(version))) = (files.first(), versions.first()) else {
                continue;
            };
            if versions.iter().any(Option::is_none) {
                continue;
            }
            let Some(stage) = stage_of(first) else {
                continue;
            };
            cases.push(Case {
                name: files.join("+"),
                path: test_dir.join(first),
                stage,
                target: Target::VULKAN_DEFAULT,
                suite: Some(suite.to_string()),
                version: *version,
                corpus,
                kind: Kind::Group {
                    files: files.clone(),
                    auto_map_bindings: corpus == Corpus::OpenGlAsVulkan,
                },
            });
        }
    }
    Ok(cases)
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Expectation {
    pub accept: bool,
    pub messages: Vec<String>,
}

pub fn parse_expectation(text: &str) -> Option<Expectation> {
    let mut lines = text.lines().map(str::trim).filter(|line| !line.is_empty());
    let accept = match lines.next()? {
        "accept" => true,
        "reject" => false,
        _ => return None,
    };
    Some(Expectation {
        accept,
        messages: lines.map(str::to_string).collect(),
    })
}

fn parse_version(text: &str, prefix: &str) -> Option<(u8, u8)> {
    let (major, minor) = text.strip_prefix(prefix)?.split_once('.')?;
    Some((major.parse().ok()?, minor.parse().ok()?))
}

pub fn parse_target(text: &str) -> Option<Target> {
    let mut words = text.split_whitespace();
    let vulkan = parse_version(words.next()?, "vulkan")?;
    let spirv = parse_version(words.next()?, "spirv")?;
    if words.next().is_some() {
        return None;
    }
    Some(Target {
        vulkan,
        spirv,
        ..Target::VULKAN_DEFAULT
    })
}

fn is_module(name: &str) -> bool {
    !name.starts_with("reference.")
        && (stage_of(name).is_some() || name.ends_with(&format!(".{LIBRARY_EXTENSION}")))
}

pub fn load_own(root: &Path) -> Result<Vec<Case>> {
    let dir = root.join("tests").join("link");
    let mut cases = Vec::new();
    let Ok(entries) = fs::read_dir(&dir) else {
        return Ok(cases);
    };
    let mut tests: Vec<PathBuf> = entries
        .filter_map(|entry| entry.ok().map(|entry| entry.path()))
        .filter(|path| path.is_dir())
        .collect();
    tests.sort();
    for test in tests {
        let Some(test_name) = test.file_name().and_then(|n| n.to_str()) else {
            continue;
        };
        let expect = fs::read_to_string(test.join("expect"))
            .with_context(|| format!("reading {}", test.join("expect").display()))?;
        let expectation = parse_expectation(&expect).with_context(|| {
            format!(
                "{}: the first line must be `accept` or `reject`",
                test.display()
            )
        })?;
        let mut files: Vec<String> = fs::read_dir(&test)?
            .filter_map(|entry| entry.ok())
            .filter_map(|entry| entry.file_name().to_str().map(str::to_string))
            .filter(|name| is_module(name))
            .collect();
        files.sort();
        let reference = fs::read_dir(&test)?
            .filter_map(|entry| entry.ok())
            .filter_map(|entry| entry.file_name().to_str().map(str::to_string))
            .find(|name| name.starts_with("reference.") && stage_of(name).is_some());
        let stage = files
            .iter()
            .find_map(|name| stage_of(name))
            .unwrap_or("comp");
        let Some(first) = files.first() else {
            continue;
        };
        let target = match fs::read_to_string(test.join("target")) {
            Ok(text) => parse_target(&text).with_context(|| {
                format!(
                    "{}: `target` must be `vulkan<major>.<minor> spirv<major>.<minor>`",
                    test.display()
                )
            })?,
            Err(_) => Target::VULKAN_DEFAULT,
        };
        cases.push(Case {
            name: format!("link/{test_name}"),
            path: test.join(first),
            stage,
            target,
            suite: None,
            version: 450,
            corpus: Corpus::Link,
            kind: Kind::Own {
                dir: test.clone(),
                files,
                expectation,
                reference,
            },
        });
    }
    Ok(cases)
}

pub const EXEC_SCRIPT: &str = "test.amber";

pub fn load_exec(root: &Path) -> Result<Vec<Case>> {
    let dir = root.join("tests").join("exec");
    let mut cases = Vec::new();
    let Ok(entries) = fs::read_dir(&dir) else {
        return Ok(cases);
    };
    let mut tests: Vec<PathBuf> = entries
        .filter_map(|entry| entry.ok().map(|entry| entry.path()))
        .filter(|path| path.is_dir())
        .collect();
    tests.sort();
    for test in tests {
        let Some(test_name) = test.file_name().and_then(|n| n.to_str()) else {
            continue;
        };
        if !test.join(EXEC_SCRIPT).is_file() {
            anyhow::bail!("{}: no {EXEC_SCRIPT}", test.display());
        }
        let mut files: Vec<String> = fs::read_dir(&test)?
            .filter_map(|entry| entry.ok())
            .filter_map(|entry| entry.file_name().to_str().map(str::to_string))
            .filter(|name| stage_of(name).is_some())
            .collect();
        files.sort();
        let Some(first) = files.first() else {
            anyhow::bail!("{}: no shader", test.display());
        };
        let stage = stage_of(first).unwrap_or("comp");
        let source = fs::read_to_string(test.join(first))
            .with_context(|| format!("reading {}", test.join(first).display()))?;
        let version = supported_version(&source).with_context(|| {
            format!(
                "{}: `#version 450` or `460` expected",
                test.join(first).display()
            )
        })?;
        let target = match fs::read_to_string(test.join("target")) {
            Ok(text) => parse_target(&text).with_context(|| {
                format!(
                    "{}: `target` must be `vulkan<major>.<minor> spirv<major>.<minor>`",
                    test.display()
                )
            })?,
            Err(_) => Target::VULKAN_DEFAULT,
        };
        cases.push(Case {
            name: format!("exec/{test_name}"),
            path: test.join(first),
            stage,
            target,
            suite: None,
            version,
            corpus: Corpus::Exec,
            kind: Kind::Script {
                dir: test.clone(),
                files,
                script: EXEC_SCRIPT.to_string(),
            },
        });
    }
    Ok(cases)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_link_groups() {
        let source = r#"
INSTANTIATE_TEST_SUITE_P(
    Glsl, LinkTestVulkan,
    ::testing::ValuesIn(std::vector<std::vector<std::string>>({
        {"link1.vk.frag", "link2.vk.frag"},
        {"spv.unit1.frag", "spv.unit2.frag", "spv.unit3.frag"},
           {"link.vk.differentPC.0.0.frag", "link.vk.differentPC.0.1.frag",
            "link.vk.differentPC.0.2.frag"},
        {"missingBodies.vert"},
    }))
);
"#;
        assert_eq!(
            parse_groups(source),
            [
                vec!["link1.vk.frag", "link2.vk.frag"],
                vec!["spv.unit1.frag", "spv.unit2.frag", "spv.unit3.frag"],
                vec![
                    "link.vk.differentPC.0.0.frag",
                    "link.vk.differentPC.0.1.frag",
                    "link.vk.differentPC.0.2.frag"
                ],
                vec!["missingBodies.vert"],
            ]
        );
    }

    #[test]
    fn parses_targets() {
        let target = parse_target("vulkan1.3 spirv1.6\n");
        assert_eq!(target.map(|t| (t.vulkan, t.spirv)), Some(((1, 3), (1, 6))));
        assert_eq!(parse_target("vulkan1.3"), None);
        assert_eq!(parse_target("spirv1.6 vulkan1.3"), None);
    }

    #[test]
    fn parses_expectations() {
        assert_eq!(
            parse_expectation("reject\nMissing entry point\n"),
            Some(Expectation {
                accept: false,
                messages: vec!["Missing entry point".to_string()],
            })
        );
        assert_eq!(
            parse_expectation("accept\n").map(|expectation| expectation.accept),
            Some(true)
        );
        assert_eq!(parse_expectation("maybe\n"), None);
    }
}
