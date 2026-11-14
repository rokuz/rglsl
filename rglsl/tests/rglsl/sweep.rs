use alloc::collections::BTreeSet;
use std::process::Command;

use rglsl::{
    ShaderStage,
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
};
use rspirv::dr::{self, Operand};
use spirv::Op;

use crate::TestResult;

#[derive(Clone, Copy)]
enum Target {
    Vulkan11,
    Vulkan13,
}

impl Target {
    const fn spirv(self) -> (u8, u8) {
        match self {
            Self::Vulkan11 => (1, 3),
            Self::Vulkan13 => (1, 6),
        }
    }

    const fn environment(self) -> &'static str {
        match self {
            Self::Vulkan11 => "vulkan1.1",
            Self::Vulkan13 => "vulkan1.3",
        }
    }
}

const fn extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Fragment => "frag",
        ShaderStage::Vertex => "vert",
        ShaderStage::Mesh => "mesh",
        _ => "comp",
    }
}

fn scratch(name: &str) -> std::path::PathBuf {
    std::env::temp_dir().join(format!(
        "rglsl-sweep-{}-{:?}-{name}",
        std::process::id(),
        std::thread::current().id()
    ))
}

fn ours(stage: ShaderStage, target: Target, source: &str) -> Result<Vec<u32>, Vec<String>> {
    let module = glsl::Frontend::default()
        .parse(&glsl::Options::from(stage), source)
        .map_err(|errors| {
            errors
                .errors
                .iter()
                .map(|error| error.kind.to_string())
                .collect::<Vec<_>>()
        })?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .map_err(|error| vec![format!("validation: {:?}", error.into_inner())])?;
    let options = spv::Options {
        lang_version: target.spirv(),
        ..spv::Options::default()
    };
    spv::write_vec(&module, &info, &options, None).map_err(|error| vec![format!("{error}")])
}

enum Glslang {
    Missing,
    Accepted(Vec<u32>),
    Rejected(String),
}

fn glslang(stage: ShaderStage, target: Target, source: &str) -> TestResult<Glslang> {
    let glslang = crate::stage_io::oracle("RGLSL_GLSLANG", "glslang");
    if !glslang.exists() {
        println!("glslang not found at {}", glslang.display());
        return Ok(Glslang::Missing);
    }
    let input = scratch(&format!("input.{}", extension(stage)));
    let output = scratch("glslang.spv");
    std::fs::write(&input, source)?;
    let result = Command::new(&glslang)
        .args(["--target-env", target.environment(), "-o"])
        .arg(&output)
        .arg(&input)
        .output()?;
    let _ = std::fs::remove_file(&input);
    if !result.status.success() {
        return Ok(Glslang::Rejected(format!(
            "{}{}",
            String::from_utf8_lossy(&result.stdout),
            String::from_utf8_lossy(&result.stderr)
        )));
    }
    let bytes = std::fs::read(&output)?;
    let _ = std::fs::remove_file(&output);
    let words = bytes
        .chunks_exact(4)
        .map(|chunk| <[u8; 4]>::try_from(chunk).map(u32::from_le_bytes))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(Glslang::Accepted(words))
}

fn validate(words: &[u32], target: Target) -> TestResult {
    crate::stage_io::spirv_val_in(words, &["--target-env", target.environment()])
}

#[derive(Debug, PartialEq, Eq)]
struct Summary {
    capabilities: BTreeSet<String>,
    extensions: BTreeSet<String>,
    opcodes: BTreeSet<String>,
}

fn summary(words: &[u32]) -> TestResult<Summary> {
    let module = dr::load_words(words)?;
    let capabilities = module
        .capabilities
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(Operand::Capability(capability)) => Some(format!("{capability:?}")),
            _ => None,
        })
        .collect();
    let extensions = module
        .extensions
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(Operand::LiteralString(name)) => Some(name.clone()),
            _ => None,
        })
        .collect();
    let opcodes = module
        .functions
        .iter()
        .flat_map(|function| function.blocks.iter())
        .flat_map(|block| block.instructions.iter())
        .map(|inst| format!("{:?}", inst.class.opcode))
        .collect();
    Ok(Summary {
        capabilities,
        extensions,
        opcodes,
    })
}

fn valid_like_glslang(stage: ShaderStage, target: Target, source: &str) -> TestResult<Summary> {
    let words =
        ours(stage, target, source).map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
    validate(&words, target)?;
    let mine = summary(&words)?;
    match glslang(stage, target, source)? {
        Glslang::Missing => {}
        Glslang::Rejected(text) => return Err(format!("glslang rejects: {text}").into()),
        Glslang::Accepted(words) => {
            let theirs = summary(&words)?;
            if theirs.capabilities != mine.capabilities || theirs.extensions != mine.extensions {
                return Err(format!(
                    "the module differs from glslang's:\n  glslang {theirs:?}\n  rglsl   {mine:?}"
                )
                .into());
            }
        }
    }
    Ok(mine)
}

fn opcode(summary: &Summary, op: Op) -> bool {
    summary.opcodes.contains(&format!("{op:?}"))
}

#[test]
fn amd_group_operations_declare_the_extension_of_groups() -> TestResult {
    let source = "#version 450
        #extension GL_AMD_shader_ballot : require
        layout(local_size_x = 8) in;
        layout(std430, binding = 0) buffer B { float f; uint u; };
        void main() {
            f = minInvocationsAMD(f);
            u = addInvocationsInclusiveScanAMD(u);
        }";
    for target in [Target::Vulkan11, Target::Vulkan13] {
        let words = ours(ShaderStage::Compute, target, source)
            .map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
        validate(&words, target)?;
        let summary = summary(&words)?;
        assert!(summary.capabilities.contains("Groups"), "{summary:?}");
        assert!(
            summary.extensions.contains("SPV_AMD_shader_ballot"),
            "{summary:?}"
        );
        assert!(opcode(&summary, Op::GroupFMin), "{summary:?}");
    }
    Ok(())
}
