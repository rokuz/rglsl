use alloc::collections::{BTreeMap, BTreeSet};
use std::path::{Path, PathBuf};

use crate::TestResult;

const REGISTRY: &str = "rglsl-types/src/extension.rs";

const SHADER_WRITERS: [&str; 1] = ["xtask/"];

const GLSL_OUTSIDE_REGISTRY: [(&str, &str); 4] = [
    ("rglsl-cli/src/compile.rs", "GL_KHR_vulkan_glsl"),
    ("rglsl-pp/src/diagnostic.rs", "GL_EXT_debug_printf"),
    ("rglsl-pp/src/diagnostic.rs", "GL_EXT_spirv_intrinsics"),
    ("rglsl-pp/src/diagnostic.rs", "GL_EXT_abort"),
];

const SPIRV_NOT_EXTENSIONS: [(&str, &str); 1] = [(
    "rglsl-cli/src/disassemble/ext.rs",
    "SPV_ARB_shader_viewport_layer_array",
)];

const SPIRV_TOOLS_EXTENSIONS: &str = "target/oracles/build/spirv-tools/core_tables_header.inc";

fn workspace() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("..")
}

fn members(root: &Path) -> TestResult<Vec<String>> {
    let manifest = std::fs::read_to_string(root.join("Cargo.toml"))?;
    let start = manifest
        .find("members = [")
        .ok_or("no workspace members in Cargo.toml")?;
    let list = manifest.get(start..).ok_or("no workspace members")?;
    let end = list.find(']').ok_or("unterminated workspace members")?;
    Ok(list
        .get(..end)
        .ok_or("unterminated workspace members")?
        .split('"')
        .skip(1)
        .step_by(2)
        .map(String::from)
        .collect())
}

fn is_test_source(path: &Path) -> bool {
    path.file_name().is_some_and(|name| name == "tests.rs")
        || path
            .components()
            .any(|component| component.as_os_str() == "tests")
}

fn sources(root: &Path) -> TestResult<Vec<PathBuf>> {
    let mut pending: Vec<PathBuf> = members(root)?
        .into_iter()
        .map(|member| root.join(member).join("src"))
        .collect();
    let mut files = Vec::new();
    while let Some(directory) = pending.pop() {
        if !directory.is_dir() {
            continue;
        }
        for entry in std::fs::read_dir(&directory)? {
            let path = entry?.path();
            if path.is_dir() {
                pending.push(path);
            } else if path.extension().is_some_and(|extension| extension == "rs") {
                files.push(path);
            }
        }
    }
    files.retain(|path| {
        path.strip_prefix(root)
            .is_ok_and(|relative| !is_test_source(relative))
    });
    files.sort();
    Ok(files)
}

const fn is_identifier(byte: u8) -> bool {
    byte.is_ascii_alphanumeric() || byte == b'_'
}

fn extension_names<'a>(text: &'a str, prefix: &str) -> Vec<&'a str> {
    let bytes = text.as_bytes();
    let mut names = Vec::new();
    let mut from = 0;
    while let Some(found) = text.get(from..).and_then(|rest| rest.find(prefix)) {
        let start = from + found;
        let end = start
            + bytes.get(start..).map_or(0, |rest| {
                rest.iter().take_while(|&&byte| is_identifier(byte)).count()
            });
        from = end.max(start + 1);
        let preceded = start
            .checked_sub(1)
            .and_then(|before| bytes.get(before))
            .is_some_and(|&byte| is_identifier(byte));
        let Some(name) = text.get(start..end) else {
            continue;
        };
        let rest = name.get(prefix.len()..).unwrap_or_default();
        let vendor = rest.split('_').next().unwrap_or_default();
        let vendored = !vendor.is_empty()
            && vendor
                .bytes()
                .all(|byte| byte.is_ascii_uppercase() || byte.is_ascii_digit())
            && rest.len() > vendor.len() + 1;
        if !preceded && vendored && name.bytes().any(|byte| byte.is_ascii_lowercase()) {
            names.push(name);
        }
    }
    names
}

fn without_test_module(text: &str) -> &str {
    text.split("#[cfg(test)]\nmod tests").next().unwrap_or(text)
}

fn unknown_names(
    prefix: &str,
    exceptions: &[(&str, &str)],
    known: impl Fn(&str, &str) -> bool,
) -> TestResult<BTreeMap<String, BTreeSet<String>>> {
    let root = workspace();
    let mut unknown: BTreeMap<String, BTreeSet<String>> = BTreeMap::new();
    for path in sources(&root)? {
        let text = std::fs::read_to_string(&path)?;
        let relative = path
            .strip_prefix(&root)?
            .to_string_lossy()
            .replace('\\', "/");
        for name in extension_names(without_test_module(&text), prefix) {
            let excepted = exceptions
                .iter()
                .any(|&(file, exception)| file == relative && exception == name);
            if !known(&relative, name) && !excepted {
                unknown
                    .entry(name.to_owned())
                    .or_default()
                    .insert(relative.clone());
            }
        }
    }
    Ok(unknown)
}

fn report(unknown: &BTreeMap<String, BTreeSet<String>>) -> String {
    unknown
        .iter()
        .map(|(name, files)| {
            format!(
                "{name} in {}",
                files.iter().cloned().collect::<Vec<_>>().join(", ")
            )
        })
        .collect::<Vec<_>>()
        .join("; ")
}

#[test]
fn glsl_extension_names_are_spelled_only_in_the_registry() -> TestResult {
    let outside = unknown_names("GL_", &GLSL_OUTSIDE_REGISTRY, |file, name| {
        let writes_shaders = SHADER_WRITERS.iter().any(|writer| file.starts_with(writer));
        (file == REGISTRY || writes_shaders)
            && rglsl_types::extension::Extension::from_name(name).is_some()
    })?;
    if !outside.is_empty() {
        return Err(format!(
            "GLSL extension names spelled outside the registry in {REGISTRY}: the compiler \
             names an extension by its `Extension` variant, and tools that write shaders may \
             spell only registered names (a new extension gets a row in the registry first): {}",
            report(&outside)
        )
        .into());
    }
    Ok(())
}

#[test]
fn spirv_extension_names_are_known() -> TestResult {
    let table = workspace().join(SPIRV_TOOLS_EXTENSIONS);
    if !table.exists() {
        if std::env::var_os("RGLSL_REQUIRE_ORACLES").is_some() {
            return Err(format!("{} not found", table.display()).into());
        }
        println!(
            "{} not found: run `cargo xtask oracles` to check SPIR-V extension names",
            table.display()
        );
        return Ok(());
    }
    let text = std::fs::read_to_string(&table)?;
    let known: BTreeSet<&str> = extension_names(&text, "kSPV_")
        .into_iter()
        .filter_map(|name| name.strip_prefix('k'))
        .collect();
    if known.is_empty() {
        return Err(format!("no SPIR-V extensions in {}", table.display()).into());
    }
    let unknown = unknown_names("SPV_", &SPIRV_NOT_EXTENSIONS, |_, name| {
        known.contains(name)
    })?;
    if !unknown.is_empty() {
        return Err(format!(
            "SPIR-V extension names that the pinned SPIRV-Headers and SPIRV-Tools do not know \
             (a typo, or a newer extension that needs new pins in oracles.toml): {}",
            report(&unknown)
        )
        .into());
    }
    Ok(())
}

#[test]
fn not_extensions_are_current() -> TestResult {
    let root = workspace();
    for &(file, name) in GLSL_OUTSIDE_REGISTRY.iter().chain(&SPIRV_NOT_EXTENSIONS) {
        let text = std::fs::read_to_string(root.join(file))
            .map_err(|error| format!("{file}, which has an exception for {name}: {error}"))?;
        let prefix = if name.starts_with("GL_") {
            "GL_"
        } else {
            "SPV_"
        };
        if !extension_names(&text, prefix).contains(&name) {
            return Err(format!("{name} no longer appears in {file}: remove the exception").into());
        }
    }
    Ok(())
}
