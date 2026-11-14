use std::collections::BTreeSet;

use rglsl::ShaderStage;
use rglsl::back::spv;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl_link::{Options as LinkOptions, decode, encode, link_objects, validate_object};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const OP_EXTENSION: u32 = 10;
const OP_EXT_INST_IMPORT: u32 = 11;
const OP_ENTRY_POINT: u32 = 15;
const OP_EXECUTION_MODE: u32 = 16;
const OP_CAPABILITY: u32 = 17;
const OP_DECORATE: u32 = 71;
const OP_MEMBER_DECORATE: u32 = 72;
const OP_EXECUTION_MODE_ID: u32 = 331;

fn writer_options() -> spv::Options<'static> {
    spv::Options {
        lang_version: (1, 6),
        flags: spv::WriterFlags::LABEL_VARYINGS | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    }
}

fn frontend_options(stage: ShaderStage, auto_map: bool) -> Options {
    Options {
        auto_map_bindings: auto_map,
        auto_map_locations: auto_map,
        spirv_version: Some((1, 6)),
        ..Options::from(stage)
    }
}

fn direct(stage: ShaderStage, source: &str, auto_map: bool) -> TestResult<Vec<u32>> {
    let module = Frontend::default()
        .parse(&frontend_options(stage, auto_map), source)
        .map_err(|errors| format!("{errors:?}"))?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module)?;
    Ok(spv::write_vec(&module, &info, &writer_options(), None)?)
}

fn through_object(stage: ShaderStage, source: &str, auto_map: bool) -> TestResult<Vec<u32>> {
    let object = Frontend::default()
        .compile(&frontend_options(stage, auto_map), source)
        .map_err(|errors| format!("{errors:?}"))?;
    validate_object(&object)?;
    let object = decode(&encode(&object)?)?;
    let options = LinkOptions {
        auto_map_bindings: auto_map,
        auto_map_locations: auto_map,
        ..LinkOptions::default()
    };
    let linked = link_objects(&[object], &options)?;
    let [ref stage] = *linked.as_slice() else {
        return Err(format!("{} stages", linked.len()).into());
    };
    Ok(spv::write_vec(
        &stage.module,
        &stage.info,
        &writer_options(),
        None,
    )?)
}

fn instructions(words: &[u32]) -> TestResult<Vec<(u32, &[u32])>> {
    let mut found = Vec::new();
    let mut rest = words.get(5..).ok_or("no header")?;
    while let Some(&first) = rest.first() {
        let count = usize::try_from(first >> 16)?;
        if count == 0 || count > rest.len() {
            return Err("truncated instruction".into());
        }
        let (instruction, tail) = rest.split_at(count);
        found.push((first & 0xffff, instruction.get(1..).unwrap_or_default()));
        rest = tail;
    }
    Ok(found)
}

#[derive(Debug, PartialEq, Eq)]
struct Summary {
    declarations: BTreeSet<(u32, Vec<u32>)>,
    interface: usize,
    decorations: Vec<Vec<u32>>,
}

fn summary(words: &[u32]) -> TestResult<Summary> {
    let mut declarations = BTreeSet::new();
    let mut interface = 0;
    let mut decorations = Vec::new();
    for (opcode, operands) in instructions(words)? {
        match opcode {
            OP_CAPABILITY | OP_EXTENSION | OP_EXT_INST_IMPORT => {
                let start = usize::from(opcode == OP_EXT_INST_IMPORT);
                declarations.insert((opcode, operands.get(start..).unwrap_or_default().to_vec()));
            }
            OP_EXECUTION_MODE => {
                declarations.insert((opcode, operands.get(1..).unwrap_or_default().to_vec()));
            }
            OP_EXECUTION_MODE_ID => {
                declarations.insert((opcode, operands.get(1..2).unwrap_or_default().to_vec()));
            }
            OP_ENTRY_POINT => {
                let name_words = operands
                    .iter()
                    .skip(2)
                    .position(|word| word.to_le_bytes().contains(&0))
                    .ok_or("unterminated name")?;
                interface = operands.len().saturating_sub(3 + name_words);
                declarations.insert((opcode, operands.get(..1).unwrap_or_default().to_vec()));
            }
            OP_DECORATE => decorations.push(operands.get(1..).unwrap_or_default().to_vec()),
            OP_MEMBER_DECORATE => decorations.push(operands.get(1..).unwrap_or_default().to_vec()),
            _ => {}
        }
    }
    decorations.sort();
    Ok(Summary {
        declarations,
        interface,
        decorations,
    })
}

fn assert_same(stage: ShaderStage, source: &str, auto_map: bool) -> TestResult {
    let direct = summary(&direct(stage, source, auto_map)?)?;
    let linked = summary(&through_object(stage, source, auto_map)?)?;
    assert_eq!(direct, linked, "{source}");
    Ok(())
}

#[test]
fn module_flags_are_merged() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
#extension GL_EXT_buffer_reference : enable
#extension GL_EXT_shader_64bit_indexing : enable
#pragma shader_64bit_indexing
layout(local_size_x = 1) in;
layout(binding = 0) buffer Block { float x[]; } block;
void main() { block.x[1] = 2.0; }
",
        false,
    )
}
