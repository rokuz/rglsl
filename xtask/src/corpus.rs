//! The glslang test corpus (`Test/` in a glslang checkout).
//!
//! glslang's own tests (`gtests/*.FromFile.cpp`) say how each shader is
//! compiled: Vulkan or OpenGL semantics, the target environment, and whether
//! SPIR-V or only the AST is produced. We read that from the gtest sources so
//! that the oracle runs every shader the way glslang's test suite does. Shaders
//! no gtest lists are compiled the way `glslangValidator <file>` does by default.
//!
//! The project targets Vulkan GLSL with `#version 450` or `460` only, so only
//! shaders compiled under Vulkan semantics with one of those versions are in
//! scope (see [`Case::in_scope`]).

use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{Context, Result};

/// File extensions of the GLSL shader stages, as glslang names them.
pub const STAGE_EXTENSIONS: &[&str] = &[
    "vert", "tesc", "tese", "geom", "frag", "comp", "mesh", "task", "rgen", "rint", "rahit",
    "rchit", "rmiss", "rcall",
];

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Semantics {
    Vulkan,
    OpenGL,
}

/// How glslang's test suite compiles a shader.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Target {
    pub semantics: Semantics,
    /// Vulkan version, e.g. `(1, 0)`.
    pub vulkan: (u8, u8),
    /// SPIR-V version, e.g. `(1, 0)`.
    pub spirv: (u8, u8),
    /// glslang only builds the AST; no SPIR-V is generated.
    pub ast_only: bool,
    /// Compiled without linking (`--no-link`), as an object module.
    pub compile_only: bool,
    /// Locations and bindings are assigned automatically. glslang's test
    /// fixture does this unless a test passes `automap = false`.
    pub automap: bool,
    /// `EShMsgRelaxSetBindingLimits`: larger `set`/`binding` values are allowed.
    pub relax_set_binding_limits: bool,
}

impl Target {
    /// What `glslangValidator <file>` does with no options: OpenGL rules, AST only.
    pub const DEFAULT: Self = Self {
        semantics: Semantics::OpenGL,
        vulkan: (1, 0),
        spirv: (1, 0),
        ast_only: true,
        compile_only: false,
        automap: false,
        relax_set_binding_limits: false,
    };

    /// Command-line options that make glslangValidator compile like the gtest does.
    pub fn glslang_args(&self) -> Vec<String> {
        let mut args: Vec<String> = match (self.semantics, self.ast_only) {
            (Semantics::OpenGL, true) => Vec::new(),
            (Semantics::OpenGL, false) => vec!["-G".into()],
            (Semantics::Vulkan, _) => vec![
                "--target-env".into(),
                format!("vulkan{}.{}", self.vulkan.0, self.vulkan.1),
                "--target-env".into(),
                format!("spirv{}.{}", self.spirv.0, self.spirv.1),
            ],
        };
        if self.compile_only {
            args.push("--no-link".into());
        }
        if self.automap {
            args.push("--auto-map-locations".into());
            args.push("--auto-map-bindings".into());
        }
        if self.relax_set_binding_limits {
            args.push("--relax-set-binding-limits".into());
        }
        args
    }

    /// The `spirv-val --target-env` for modules compiled for this target.
    pub fn spirv_val_env(&self) -> String {
        match self.semantics {
            // We always produce Vulkan-flavoured SPIR-V for now.
            Semantics::OpenGL => "vulkan1.0".into(),
            Semantics::Vulkan => match (self.vulkan, self.spirv) {
                ((1, 1), (1, 4)) => "vulkan1.1spv1.4".into(),
                ((major, minor), _) => format!("vulkan{major}.{minor}"),
            },
        }
    }

    pub fn describe(&self) -> String {
        let kind = match (self.ast_only, self.compile_only) {
            (true, _) => "ast",
            (false, true) => "spv-nolink",
            (false, false) => "spv",
        };
        match self.semantics {
            Semantics::OpenGL => format!("gl-{kind}"),
            Semantics::Vulkan => format!(
                "vk{}.{}-spv{}.{}-{kind}",
                self.vulkan.0, self.vulkan.1, self.spirv.0, self.spirv.1
            ),
        }
    }
}

#[derive(Debug, Clone)]
pub struct Case {
    /// File name relative to `Test/`.
    pub name: String,
    pub path: PathBuf,
    /// Stage file extension (`frag`, `comp`, ...).
    pub stage: &'static str,
    pub target: Target,
    /// The gtest suite that lists the file, if any.
    pub suite: Option<String>,
    /// The `#version` directive: number and profile (`es`, `core`, ...), if any.
    pub version: Option<(u32, Option<String>)>,
}

/// The `#version` numbers the project supports.
pub const SUPPORTED_VERSIONS: &[u32] = &[450, 460];

impl Case {
    /// Vulkan semantics and a desktop `#version` 450 or 460.
    pub fn in_scope(&self) -> bool {
        self.target.semantics == Semantics::Vulkan
            && matches!(&self.version, Some((number, profile))
                if SUPPORTED_VERSIONS.contains(number) && profile.as_deref() != Some("es"))
    }
}

/// Finds the `#version` directive: the first preprocessor line that is one.
fn parse_version(source: &str) -> Option<(u32, Option<String>)> {
    source.lines().find_map(|line| {
        let rest = line.trim_start().strip_prefix('#')?.trim_start();
        let rest = rest.strip_prefix("version")?;
        let mut words = rest.split_whitespace();
        let number = words.next()?.parse().ok()?;
        let profile = words
            .next()
            .filter(|w| !w.starts_with("//"))
            .map(str::to_string);
        Some((number, profile))
    })
}

/// Lists the shaders in `<glslang>/Test` with the target their gtest uses.
pub fn load(glslang_dir: &Path) -> Result<Vec<Case>> {
    let test_dir = glslang_dir.join("Test");
    let manifest = load_manifest(&glslang_dir.join("gtests"))?;

    let mut cases = Vec::new();
    let entries =
        fs::read_dir(&test_dir).with_context(|| format!("reading {}", test_dir.display()))?;
    for entry in entries {
        let path = entry?.path();
        if !path.is_file() {
            continue;
        }
        let Some(name) = path.file_name().and_then(|n| n.to_str()) else {
            continue;
        };
        let Some(ext) = path.extension().and_then(|e| e.to_str()) else {
            continue;
        };
        let Some(stage) = STAGE_EXTENSIONS.iter().copied().find(|s| *s == ext) else {
            continue;
        };
        let (target, suite) = match manifest.get(name) {
            Some((target, suite)) => (*target, Some(suite.clone())),
            None => (Target::DEFAULT, None),
        };
        let source = String::from_utf8_lossy(&fs::read(&path)?).into_owned();
        cases.push(Case {
            name: name.to_string(),
            path: path.clone(),
            stage,
            target,
            suite,
            version: parse_version(&source),
        });
    }
    cases.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(cases)
}

/// File name -> (target, suite) from the gtest sources. SPIR-V suites take
/// precedence over AST suites when a file is listed in both.
fn load_manifest(gtests: &Path) -> Result<BTreeMap<String, (Target, String)>> {
    let mut manifest = BTreeMap::new();
    // Later files do not override earlier ones, so list the SPIR-V tests first.
    for file in ["Spv.FromFile.cpp", "AST.FromFile.cpp"] {
        let path = gtests.join(file);
        let source =
            fs::read_to_string(&path).with_context(|| format!("reading {}", path.display()))?;
        let targets = parse_test_bodies(&source);
        for (suite, files) in parse_instantiations(&source) {
            let Some(target) = targets.get(&suite) else {
                continue;
            };
            for name in files {
                manifest
                    .entry(name)
                    .or_insert_with(|| (*target, suite.clone()));
            }
        }
    }
    Ok(manifest)
}

/// Reads each `TEST_P(Suite, ...) { ... }` body for its semantics and target.
/// When a suite has several bodies, the first one wins.
fn parse_test_bodies(source: &str) -> BTreeMap<String, Target> {
    let mut targets = BTreeMap::new();
    let mut rest = source;
    while let Some(start) = rest.find("TEST_P(") {
        rest = &rest[start + "TEST_P(".len()..];
        let Some(comma) = rest.find(',') else { break };
        let suite = rest[..comma].trim().to_string();
        let end = ["TEST_P(", "INSTANTIATE_TEST_SUITE_P("]
            .iter()
            .filter_map(|m| rest.find(m))
            .min()
            .unwrap_or(rest.len());
        let body = &rest[..end];

        let semantics = if body.contains("Semantics::OpenGL") {
            Semantics::OpenGL
        } else {
            Semantics::Vulkan
        };
        let target = Target {
            semantics,
            vulkan: version_after(body, "EShTargetVulkan_").unwrap_or((1, 0)),
            spirv: version_after(body, "EShTargetSpv_").unwrap_or((1, 0)),
            ast_only: body.contains("Target::AST"),
            compile_only: body.contains("compileOnly = true"),
            // `loadFileCompileAndCheck(..., Target::X, /*automap=*/false)`
            automap: !body.contains("Target::Spv, false") && !body.contains("Target::AST, false"),
            relax_set_binding_limits: body.contains("EShMsgRelaxSetBindingLimits"),
        };
        targets.entry(suite).or_insert(target);
    }
    targets
}

/// Parses `Prefix_1_3` style versions.
fn version_after(text: &str, prefix: &str) -> Option<(u8, u8)> {
    let at = text.find(prefix)? + prefix.len();
    let digits: String = text[at..]
        .chars()
        .take_while(|c| c.is_ascii_digit() || *c == '_')
        .collect();
    let mut parts = digits.split('_');
    let major = parts.next()?.parse().ok()?;
    let minor = parts.next()?.parse().ok()?;
    Some((major, minor))
}

/// Reads each `INSTANTIATE_TEST_SUITE_P(Prefix, Suite, ...)` for the shader
/// file names it lists.
fn parse_instantiations(source: &str) -> Vec<(String, Vec<String>)> {
    const MARKER: &str = "INSTANTIATE_TEST_SUITE_P(";
    let mut result = Vec::new();
    let mut rest = source;
    while let Some(start) = rest.find(MARKER) {
        rest = &rest[start + MARKER.len()..];
        let end = rest.find(MARKER).unwrap_or(rest.len());
        let block = &rest[..end];
        let mut header = block.splitn(3, ',');
        let _prefix = header.next();
        let Some(suite) = header.next() else { continue };
        let files = string_literals(block)
            .filter(|s| {
                s.rsplit_once('.')
                    .is_some_and(|(_, ext)| STAGE_EXTENSIONS.contains(&ext))
            })
            .map(str::to_string)
            .collect();
        result.push((suite.trim().to_string(), files));
    }
    result
}

fn string_literals(text: &str) -> impl Iterator<Item = &str> {
    text.split('"').skip(1).step_by(2)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_version() {
        assert_eq!(
            parse_version("// c\n#version 450\nvoid main(){}"),
            Some((450, None))
        );
        assert_eq!(
            parse_version("  #  version 310 es\n"),
            Some((310, Some("es".to_string())))
        );
        assert_eq!(parse_version("#version 460 // x\n"), Some((460, None)));
        assert_eq!(parse_version("void main(){}"), None);
    }

    #[test]
    fn parses_suites() {
        let source = r#"
TEST_P(CompileToSpirv14Test, FromFile)
{
    loadFileCompileAndCheck(GlobalTestSettings.testRoot, GetParam(),
                            Source::GLSL, Semantics::Vulkan, glslang::EShTargetVulkan_1_1, glslang::EShTargetSpv_1_4,
                            Target::Spv);
}
TEST_P(OpenGLSemantics, FromFile)
{
    loadFileCompileAndCheck(GlobalTestSettings.testRoot, GetParam(),
                            Source::GLSL, Semantics::OpenGL, glslang::EShTargetVulkan_1_0, glslang::EShTargetSpv_1_0,
                            Target::Spv, false);
}
INSTANTIATE_TEST_SUITE_P(
    Glsl, CompileToSpirv14Test,
    ::testing::ValuesIn(std::vector<std::string>({
        "spv.1.4.load.bool.array.interface.block.frag",
        "spv.1.4.image.frag",
    })),
    FileNameAsCustomTestSuffix
);
INSTANTIATE_TEST_SUITE_P(
    Glsl, OpenGLSemantics,
    ::testing::ValuesIn(std::vector<std::string>({
        "glspv.esversion.vert",
    })),
    FileNameAsCustomTestSuffix
);
"#;
        let targets = parse_test_bodies(source);
        let spv14 = targets["CompileToSpirv14Test"];
        assert_eq!(spv14.semantics, Semantics::Vulkan);
        assert_eq!(spv14.vulkan, (1, 1));
        assert_eq!(spv14.spirv, (1, 4));
        assert!(!spv14.ast_only);
        assert!(!spv14.compile_only);
        assert!(spv14.automap);
        assert!(!targets["OpenGLSemantics"].automap);
        assert_eq!(spv14.spirv_val_env(), "vulkan1.1spv1.4");
        assert_eq!(targets["OpenGLSemantics"].semantics, Semantics::OpenGL);

        let inst = parse_instantiations(source);
        assert_eq!(inst.len(), 2);
        assert_eq!(inst[0].0, "CompileToSpirv14Test");
        assert_eq!(
            inst[0].1,
            [
                "spv.1.4.load.bool.array.interface.block.frag",
                "spv.1.4.image.frag"
            ]
        );
        assert_eq!(inst[1].1, ["glspv.esversion.vert"]);
    }
}
