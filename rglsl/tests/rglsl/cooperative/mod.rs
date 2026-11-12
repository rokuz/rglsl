use alloc::collections::{BTreeMap, BTreeSet};
use core::sync::atomic::{AtomicUsize, Ordering};
use std::path::PathBuf;
use std::process::Command;

use rglsl::{
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
    ShaderStage,
};
use rspirv::binary::Disassemble;
use rspirv::dr;
use spirv::Op;

use crate::TestResult;

mod smoke;
mod vector;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Target {
    pub vulkan: (u8, u8),
    pub spirv: (u8, u8),
}

pub const VULKAN_1_1: Target = Target {
    vulkan: (1, 1),
    spirv: (1, 3),
};

pub const VULKAN_1_3: Target = Target {
    vulkan: (1, 3),
    spirv: (1, 6),
};

pub const VULKAN_1_4: Target = Target {
    vulkan: (1, 4),
    spirv: (1, 6),
};

impl Target {
    fn validator_environment(self) -> String {
        match (self.vulkan, self.spirv) {
            ((1, 1), (1, 4)) => "vulkan1.1spv1.4".to_string(),
            ((major, minor), _) => format!("vulkan{major}.{minor}"),
        }
    }

    fn glslang_arguments(self) -> Vec<String> {
        vec![
            "--target-env".to_string(),
            format!("vulkan{}.{}", self.vulkan.0, self.vulkan.1),
            "--target-env".to_string(),
            format!("spirv{}.{}", self.spirv.0, self.spirv.1),
        ]
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Debug {
    None,
    NonSemantic,
    NonSemanticWithSource,
}

impl Debug {
    const fn glslang_flag(self) -> Option<&'static str> {
        match self {
            Self::None => None,
            Self::NonSemantic => Some("-gV"),
            Self::NonSemanticWithSource => Some("-gVS"),
        }
    }

    const fn options(self) -> Option<spv::DebugInfo<'static>> {
        let (level, source_text) = match self {
            Self::None => return None,
            Self::NonSemantic => (spv::DebugLevel::NonSemantic, false),
            Self::NonSemanticWithSource => (spv::DebugLevel::NonSemantic, true),
        };
        Some(spv::DebugInfo {
            level,
            source_text,
            processes: &[],
            entry_point: Some(spv::DebugEntryPoint {
                signature: "rglsl",
                arguments: "",
                directory: Some("."),
            }),
        })
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Glslang {
    SameStructure,
    Accepts,
}

pub struct Compiled {
    pub module: dr::Module,
    pub glslang: Option<dr::Module>,
}

impl Compiled {
    pub fn count(&self, op: Op) -> usize {
        count(&self.module, op)
    }

    pub fn instructions(&self, op: Op) -> Vec<&dr::Instruction> {
        self.module
            .all_inst_iter()
            .filter(|inst| inst.class.opcode == op)
            .collect()
    }

    pub fn capabilities(&self) -> BTreeSet<String> {
        capabilities(&self.module)
    }

    pub fn has_capability(&self, capability: spirv::Capability) -> bool {
        self.module.capabilities.iter().any(|inst| {
            matches!(inst.operands.first(), Some(dr::Operand::Capability(c)) if *c == capability)
        })
    }

    pub fn extensions(&self) -> BTreeSet<String> {
        extensions(&self.module)
    }

    pub fn disassemble(&self) -> String {
        self.module.disassemble()
    }
}

fn load(words: &[u32]) -> TestResult<dr::Module> {
    let mut kept = Vec::with_capacity(words.len());
    kept.extend(words.iter().take(5));
    let mut rest = words.get(5..).unwrap_or_default();
    let mut in_functions = false;
    while let Some(&first) = rest.first() {
        let length = usize::try_from(first >> 16)?.max(1);
        let opcode = first & 0xffff;
        let instruction = rest.get(..length).ok_or("truncated SPIR-V")?;
        if opcode == Op::Function as u32 {
            in_functions = true;
        }
        if in_functions || opcode != Op::ExtInst as u32 {
            kept.extend_from_slice(instruction);
        }
        rest = rest.get(length..).unwrap_or_default();
    }
    Ok(dr::load_words(kept)?)
}

fn count(module: &dr::Module, op: Op) -> usize {
    module
        .all_inst_iter()
        .filter(|inst| inst.class.opcode == op)
        .count()
}

fn capabilities(module: &dr::Module) -> BTreeSet<String> {
    module
        .capabilities
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(dr::Operand::Capability(capability)) => Some(format!("{capability:?}")),
            _ => None,
        })
        .collect()
}

fn extensions(module: &dr::Module) -> BTreeSet<String> {
    module
        .extensions
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(dr::Operand::LiteralString(name)) => Some(name.clone()),
            _ => None,
        })
        .collect()
}

const COOPERATIVE_WORDS: [&str; 5] = [
    "Cooperative",
    "Tensor",
    "Replicate",
    "BitcastExtract",
    "QCOM",
];

fn structure(module: &dr::Module) -> BTreeMap<String, usize> {
    let mut histogram = BTreeMap::new();
    for inst in module.all_inst_iter() {
        let name = format!("{:?}", inst.class.opcode);
        if COOPERATIVE_WORDS.iter().any(|word| name.contains(word)) {
            *histogram.entry(name).or_insert(0) += 1;
        }
    }
    for capability in capabilities(module) {
        histogram.insert(format!("capability {capability}"), 1);
    }
    for extension in extensions(module) {
        histogram.insert(format!("extension {extension}"), 1);
    }
    histogram
}

fn tool(variable: &str, name: &str) -> Option<PathBuf> {
    if let Some(path) = std::env::var_os(variable) {
        let path = PathBuf::from(path);
        return path.exists().then_some(path);
    }
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../target/oracles/bin")
        .join(name);
    path.exists().then_some(path)
}

fn scratch(extension: &str) -> PathBuf {
    static NEXT: AtomicUsize = AtomicUsize::new(0);
    std::env::temp_dir().join(format!(
        "rglsl-cooperative-{}-{}.{extension}",
        std::process::id(),
        NEXT.fetch_add(1, Ordering::Relaxed)
    ))
}

fn bytes(words: &[u32]) -> Vec<u8> {
    words.iter().flat_map(|word| word.to_le_bytes()).collect()
}

fn options(target: Target, debug: Debug) -> glsl::Options {
    glsl::Options {
        auto_map_bindings: true,
        auto_map_locations: true,
        spirv_version: Some(target.spirv),
        debug_info: debug != Debug::None,
        source_name: Some(String::from("cooperative.comp")),
        ..glsl::Options::from(ShaderStage::Compute)
    }
}

fn line_of(source: &str, span: rglsl::Span) -> u32 {
    span.location(source).line_number
}

fn message(error: &dyn core::error::Error) -> String {
    let mut text = error.to_string();
    let mut source = error.source();
    while let Some(inner) = source {
        text.push_str(": ");
        text.push_str(&inner.to_string());
        source = inner.source();
    }
    text
}

fn ours(source: &str, target: Target, debug: Debug) -> Result<Vec<u32>, Vec<(u32, String)>> {
    let module = glsl::Frontend::default()
        .parse(&options(target, debug), source)
        .map_err(|errors| {
            errors
                .errors
                .iter()
                .map(|error| (line_of(source, error.meta), message(error)))
                .collect::<Vec<_>>()
        })?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .map_err(|error| {
            let line = error
                .spans()
                .next()
                .map_or(0, |(span, _)| line_of(source, *span));
            vec![(line, format!("validation: {}", message(error.as_inner())))]
        })?;
    let options = spv::Options {
        lang_version: target.spirv,
        debug_info: debug.options(),
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        mesh_shader_primitive_indices_clamp: false,
        ..spv::Options::default()
    };
    spv::write_vec(&module, &info, &options, None)
        .map_err(|error| vec![(0, format!("backend: {}", message(&error)))])
}

fn spirv_val(words: &[u32], target: Target) -> TestResult {
    let Some(validator) = tool("RGLSL_SPIRV_VAL", "spirv-val") else {
        println!("spirv-val not found: SPIR-V not validated");
        return Ok(());
    };
    let path = scratch("spv");
    std::fs::write(&path, bytes(words))?;
    let output = Command::new(validator)
        .args(["--target-env", &target.validator_environment()])
        .arg(&path)
        .output()?;
    let _ = std::fs::remove_file(&path);
    if !output.status.success() {
        return Err(format!(
            "spirv-val rejects the module: {}{}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        )
        .into());
    }
    Ok(())
}

enum GlslangResult {
    Accepted(Box<dr::Module>),
    Rejected(Vec<(u32, String)>),
}

fn glslang(source: &str, target: Target, debug: Debug) -> TestResult<Option<GlslangResult>> {
    let Some(glslang) = tool("RGLSL_GLSLANG", "glslang") else {
        println!("glslang not found: not compared");
        return Ok(None);
    };
    let input = scratch("comp");
    let output = scratch("spv");
    std::fs::write(&input, source)?;
    let mut command = Command::new(glslang);
    command
        .args(["-V", "-C", "--auto-map-bindings", "--auto-map-locations"])
        .args(target.glslang_arguments());
    if let Some(flag) = debug.glslang_flag() {
        command.arg(flag);
    }
    let result = command.arg(&input).arg("-o").arg(&output).output()?;
    let _ = std::fs::remove_file(&input);
    let text = format!(
        "{}{}",
        String::from_utf8_lossy(&result.stdout),
        String::from_utf8_lossy(&result.stderr)
    );
    if result.status.success() {
        let bytes = std::fs::read(&output)?;
        let _ = std::fs::remove_file(&output);
        let words: Vec<u32> = bytes
            .chunks_exact(4)
            .filter_map(|chunk| <[u8; 4]>::try_from(chunk).ok().map(u32::from_le_bytes))
            .collect();
        let module = load(&words)?;
        return Ok(Some(GlslangResult::Accepted(Box::new(module))));
    }
    let _ = std::fs::remove_file(&output);
    let errors = text
        .lines()
        .filter_map(|line| {
            let rest = line.strip_prefix("ERROR: ")?;
            let mut parts = rest.splitn(3, ':');
            let _file = parts.next()?;
            let number = parts.next()?.trim().parse().ok()?;
            let message = parts.next()?.trim().to_string();
            (!message.contains("compilation terminated")).then_some((number, message))
        })
        .collect();
    Ok(Some(GlslangResult::Rejected(errors)))
}

pub fn compile(source: &str, target: Target) -> TestResult<Compiled> {
    compile_with(source, target, Debug::None, Glslang::SameStructure)
}

pub fn compile_with(
    source: &str,
    target: Target,
    debug: Debug,
    expectation: Glslang,
) -> TestResult<Compiled> {
    let words = ours(source, target, debug).map_err(|errors| {
        format!(
            "rglsl rejects the shader: {}",
            errors
                .iter()
                .map(|(line, text)| format!("{line}: {text}"))
                .collect::<Vec<_>>()
                .join("; ")
        )
    })?;
    spirv_val(&words, target)?;
    let module = load(&words)?;
    let reference = match glslang(source, target, debug)? {
        None => None,
        Some(GlslangResult::Rejected(errors)) => {
            return Err(format!("glslang rejects the shader: {errors:?}").into())
        }
        Some(GlslangResult::Accepted(reference)) => Some(*reference),
    };
    if let (Some(reference), Glslang::SameStructure) = (&reference, expectation) {
        let theirs = structure(reference);
        let mine = structure(&module);
        if theirs != mine {
            let keys: BTreeSet<&String> = theirs.keys().chain(mine.keys()).collect();
            let differences: Vec<String> = keys
                .into_iter()
                .filter(|key| theirs.get(*key) != mine.get(*key))
                .map(|key| {
                    format!(
                        "{key}: glslang {}, rglsl {}",
                        theirs.get(key).copied().unwrap_or_default(),
                        mine.get(key).copied().unwrap_or_default()
                    )
                })
                .collect();
            return Err(format!(
                "the module differs from glslang's: {}",
                differences.join("; ")
            )
            .into());
        }
    }
    Ok(Compiled {
        module,
        glslang: reference,
    })
}

pub fn errors(source: &str, target: Target) -> TestResult<Vec<(u32, String)>> {
    match ours(source, target, Debug::None) {
        Ok(_) => Err("rglsl accepts the shader".into()),
        Err(errors) => Ok(errors),
    }
}

pub fn assert_errors(source: &str, target: Target, expected: &[(u32, &str)]) -> TestResult {
    let found = errors(source, target)?;
    for (line, text) in expected {
        if !found
            .iter()
            .any(|(found_line, message)| found_line == line && message.contains(text))
        {
            return Err(format!("no error `{text}` on line {line}; errors: {found:?}").into());
        }
    }
    let ours_lines: BTreeSet<u32> = found.iter().map(|(line, _)| *line).collect();
    let expected_lines: BTreeSet<u32> = expected.iter().map(|(line, _)| *line).collect();
    if ours_lines != expected_lines {
        return Err(format!("errors on lines {ours_lines:?}, expected {expected_lines:?}").into());
    }
    match glslang(source, target, Debug::None)? {
        None => Ok(()),
        Some(GlslangResult::Accepted(_)) => Err("glslang accepts the shader".into()),
        Some(GlslangResult::Rejected(theirs)) => {
            let their_lines: BTreeSet<u32> = theirs.iter().map(|(line, _)| *line).collect();
            if their_lines != ours_lines {
                return Err(format!(
                    "glslang reports errors on lines {their_lines:?}, rglsl on {ours_lines:?}: {theirs:?}"
                )
                .into());
            }
            Ok(())
        }
    }
}

pub fn assert_rejected_like_glslang(source: &str, target: Target) -> TestResult {
    let found = errors(source, target)?;
    let ours_lines: BTreeSet<u32> = found.iter().map(|(line, _)| *line).collect();
    match glslang(source, target, Debug::None)? {
        None => Ok(()),
        Some(GlslangResult::Accepted(_)) => Err("glslang accepts the shader".into()),
        Some(GlslangResult::Rejected(theirs)) => {
            let their_lines: BTreeSet<u32> = theirs.iter().map(|(line, _)| *line).collect();
            if their_lines != ours_lines {
                return Err(format!(
                    "glslang reports errors on lines {their_lines:?}, rglsl on {ours_lines:?}: glslang {theirs:?}, rglsl {found:?}"
                )
                .into());
            }
            Ok(())
        }
    }
}
