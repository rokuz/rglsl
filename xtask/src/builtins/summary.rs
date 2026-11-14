use std::collections::{BTreeMap, BTreeSet};

use anyhow::{Context, Result, bail};
use spirv::Op;

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Summary {
    pub version: (u8, u8),
    pub capabilities: BTreeSet<String>,
    pub extensions: BTreeSet<String>,
    pub operations: BTreeSet<String>,
}

const IGNORED: &[Op] = &[
    Op::Nop,
    Op::Undef,
    Op::SourceContinued,
    Op::Source,
    Op::SourceExtension,
    Op::Name,
    Op::MemberName,
    Op::String,
    Op::Line,
    Op::NoLine,
    Op::ModuleProcessed,
    Op::Extension,
    Op::ExtInstImport,
    Op::Capability,
    Op::MemoryModel,
    Op::EntryPoint,
    Op::ExecutionMode,
    Op::ExecutionModeId,
    Op::Decorate,
    Op::DecorateId,
    Op::DecorateString,
    Op::MemberDecorate,
    Op::MemberDecorateString,
    Op::DecorationGroup,
    Op::GroupDecorate,
    Op::GroupMemberDecorate,
    Op::Variable,
    Op::Load,
    Op::Store,
    Op::CopyMemory,
    Op::CopyObject,
    Op::AccessChain,
    Op::InBoundsAccessChain,
    Op::CompositeConstruct,
    Op::CompositeExtract,
    Op::CompositeInsert,
    Op::VectorShuffle,
    Op::Function,
    Op::FunctionParameter,
    Op::FunctionEnd,
    Op::FunctionCall,
    Op::Label,
    Op::Branch,
    Op::BranchConditional,
    Op::SelectionMerge,
    Op::LoopMerge,
    Op::Return,
    Op::ReturnValue,
    Op::Constant,
    Op::ConstantTrue,
    Op::ConstantFalse,
    Op::ConstantComposite,
    Op::ConstantNull,
    Op::SpecConstant,
    Op::SpecConstantTrue,
    Op::SpecConstantFalse,
    Op::SpecConstantComposite,
    Op::SpecConstantOp,
];

fn is_type(op: Op) -> bool {
    format!("{op:?}").starts_with("Type")
}

fn literal_string(words: &[u32]) -> String {
    let mut bytes = Vec::new();
    for word in words {
        for byte in word.to_le_bytes() {
            if byte == 0 {
                return String::from_utf8_lossy(&bytes).into_owned();
            }
            bytes.push(byte);
        }
    }
    String::from_utf8_lossy(&bytes).into_owned()
}

pub fn summarize(bytes: &[u8]) -> Result<Summary> {
    if !bytes.len().is_multiple_of(4) || bytes.len() < 20 {
        bail!("not a SPIR-V module: {} bytes", bytes.len());
    }
    let words: Vec<u32> = bytes
        .chunks_exact(4)
        .map(|chunk| {
            let mut word = [0; 4];
            word.copy_from_slice(chunk);
            u32::from_le_bytes(word)
        })
        .collect();
    if words.first() != Some(&spirv::MAGIC_NUMBER) {
        bail!("bad SPIR-V magic number");
    }
    let version = words.get(1).copied().unwrap_or_default();
    let mut summary = Summary {
        version: (
            u8::try_from((version >> 16) & 0xff).unwrap_or_default(),
            u8::try_from((version >> 8) & 0xff).unwrap_or_default(),
        ),
        ..Summary::default()
    };
    summary.capabilities.insert(String::from("Shader"));
    let mut sets: BTreeMap<u32, String> = BTreeMap::new();
    let mut position = 5;
    while let Some(&first) = words.get(position) {
        let count = usize::try_from(first >> 16).context("instruction size")?;
        if count == 0 {
            bail!("zero-sized instruction at word {position}");
        }
        let operands = words
            .get(position + 1..position + count)
            .context("truncated instruction")?;
        position += count;
        let Some(op) = Op::from_u32(first & 0xffff) else {
            summary.operations.insert(format!("Op#{}", first & 0xffff));
            continue;
        };
        match op {
            Op::Capability => {
                let value = operands.first().copied().unwrap_or_default();
                summary
                    .capabilities
                    .insert(spirv::Capability::from_u32(value).map_or_else(
                        || format!("#{value}"),
                        |capability| format!("{capability:?}"),
                    ));
            }
            Op::Extension => {
                summary.extensions.insert(literal_string(operands));
            }
            Op::ExtInstImport => {
                if let Some((id, name)) = operands.split_first() {
                    sets.insert(*id, literal_string(name));
                }
            }
            Op::ExtInst => {
                if let (Some(set), Some(instruction)) = (operands.get(2), operands.get(3)) {
                    let set = sets.get(set).map_or("?", String::as_str);
                    if !set.starts_with("NonSemantic") {
                        summary.operations.insert(format!("{set}:{instruction}"));
                    }
                }
            }
            _ if IGNORED.contains(&op) || is_type(op) => {}
            _ => {
                summary.operations.insert(format!("{op:?}"));
            }
        }
    }
    Ok(summary)
}

pub fn difference(ours: &BTreeSet<String>, theirs: &BTreeSet<String>) -> String {
    let mut parts = Vec::new();
    for missing in theirs.difference(ours) {
        parts.push(format!("-{missing}"));
    }
    for extra in ours.difference(theirs) {
        parts.push(format!("+{extra}"));
    }
    parts.join(" ")
}
