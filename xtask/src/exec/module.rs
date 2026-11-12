use std::collections::BTreeSet;

use spirv::Op;

pub const MAGIC: u32 = 0x0723_0203;
const HEADER_WORDS: usize = 5;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Instruction {
    pub opcode: u32,
    pub operands: Vec<u32>,
}

impl Instruction {
    pub fn is(&self, op: Op) -> bool {
        self.opcode == op as u32
    }

    pub fn word(&self, index: usize) -> Option<u32> {
        self.operands.get(index).copied()
    }

    pub fn rest(&self, start: usize) -> &[u32] {
        self.operands.get(start..).unwrap_or_default()
    }

    pub fn string(&self, start: usize) -> Option<(String, usize)> {
        literal_string(self.rest(start))
    }

    pub fn result_id(&self) -> Option<u32> {
        let index = result_id_index(self.opcode)?;
        self.word(index)
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Module {
    pub globals: Vec<Instruction>,
    pub body: Vec<Instruction>,
    pub body_opcodes: BTreeSet<u32>,
}

pub fn literal_string(words: &[u32]) -> Option<(String, usize)> {
    let mut bytes = Vec::new();
    for (index, word) in words.iter().enumerate() {
        for byte in word.to_le_bytes() {
            if byte == 0 {
                let text = String::from_utf8(bytes).ok()?;
                return Some((text, index + 1));
            }
            bytes.push(byte);
        }
    }
    None
}

fn result_id_index(opcode: u32) -> Option<usize> {
    const TYPE_FIRST: u32 = Op::TypeVoid as u32;
    const TYPE_LAST: u32 = Op::TypeForwardPointer as u32;
    const TYPED: [Op; 14] = [
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
        Op::Variable,
        Op::Undef,
        Op::ConstantCompositeReplicateEXT,
        Op::SpecConstantCompositeReplicateEXT,
    ];
    const UNTYPED: [Op; 9] = [
        Op::TypeRayQueryKHR,
        Op::TypeAccelerationStructureKHR,
        Op::TypeCooperativeMatrixKHR,
        Op::TypeCooperativeMatrixNV,
        Op::TypeHitObjectNV,
        Op::TypeCooperativeVectorNV,
        Op::TypeTensorLayoutNV,
        Op::TypeTensorViewNV,
        Op::ExtInstImport,
    ];
    if opcode == Op::TypeForwardPointer as u32 {
        return None;
    }
    if (TYPE_FIRST..=TYPE_LAST).contains(&opcode) || UNTYPED.iter().any(|op| *op as u32 == opcode) {
        return Some(0);
    }
    TYPED.iter().any(|op| *op as u32 == opcode).then_some(1)
}

pub fn parse_bytes(bytes: &[u8]) -> Result<Module, String> {
    if !bytes.len().is_multiple_of(4) {
        return Err("SPIR-V size is not a multiple of 4".into());
    }
    let words: Vec<u32> = bytes
        .chunks_exact(4)
        .map(|chunk| u32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
        .collect();
    parse(&words)
}

pub fn parse(words: &[u32]) -> Result<Module, String> {
    match words.first() {
        Some(&MAGIC) => {}
        Some(magic) if magic.swap_bytes() == MAGIC => {
            let swapped: Vec<u32> = words.iter().map(|w| w.swap_bytes()).collect();
            return parse(&swapped);
        }
        _ => return Err("not a SPIR-V module (bad magic number)".into()),
    }
    let mut position = HEADER_WORDS;
    if words.len() < position {
        return Err("the SPIR-V header is truncated".into());
    }
    let mut module = Module::default();
    let mut in_body = false;
    while let Some(&first) = words.get(position) {
        let count = usize::try_from(first >> 16).unwrap_or(0);
        let opcode = first & 0xffff;
        if count == 0 {
            return Err(format!(
                "instruction with a word count of 0 at word {position}"
            ));
        }
        let end = position
            .checked_add(count)
            .filter(|end| *end <= words.len())
            .ok_or_else(|| format!("instruction at word {position} runs past the end"))?;
        in_body |= opcode == Op::Function as u32;
        let instruction = Instruction {
            opcode,
            operands: words.get(position + 1..end).unwrap_or_default().to_vec(),
        };
        if in_body {
            module.body_opcodes.insert(opcode);
            module.body.push(instruction);
        } else {
            module.globals.push(instruction);
        }
        position = end;
    }
    Ok(module)
}

#[cfg(test)]
pub mod tests {
    use super::*;

    pub fn string_words(text: &str) -> Vec<u32> {
        let mut bytes = text.as_bytes().to_vec();
        bytes.push(0);
        while !bytes.len().is_multiple_of(4) {
            bytes.push(0);
        }
        bytes
            .chunks_exact(4)
            .map(|c| u32::from_le_bytes([c[0], c[1], c[2], c[3]]))
            .collect()
    }

    pub fn instruction(op: u32, operands: &[u32]) -> anyhow::Result<Vec<u32>> {
        let count = u32::try_from(operands.len() + 1)?;
        let mut words = vec![(count << 16) | op];
        words.extend_from_slice(operands);
        Ok(words)
    }

    pub fn module(instructions: &[Vec<u32>]) -> Vec<u32> {
        let mut words = vec![MAGIC, 0x0001_0600, 0, 100, 0];
        for instruction in instructions {
            words.extend_from_slice(instruction);
        }
        words
    }

    #[test]
    fn decodes_literal_strings() {
        let words = string_words("main");
        assert_eq!(words.len(), 2);
        assert_eq!(literal_string(&words), Some(("main".to_string(), 2)));
        let words = string_words("abc");
        assert_eq!(literal_string(&words), Some(("abc".to_string(), 1)));
        assert_eq!(literal_string(&[0x6161_6161]), None);
    }

    #[test]
    fn reads_the_global_section_and_skips_unknown_opcodes() -> anyhow::Result<()> {
        let mut name = vec![1];
        name.extend(string_words("main"));
        let words = module(&[
            instruction(Op::Capability as u32, &[1])?,
            instruction(Op::TypeVoid as u32, &[2])?,
            instruction(65_000, &[7, 8, 9])?,
            instruction(Op::TypeInt as u32, &[3, 32, 1])?,
            instruction(Op::Constant as u32, &[3, 4, 9])?,
            instruction(Op::Function as u32, &[2, 1, 0, 5])?,
            instruction(Op::Return as u32, &[])?,
        ]);
        let module = parse(&words).map_err(anyhow::Error::msg)?;
        assert_eq!(module.globals.len(), 5);
        assert!(module.globals[0].is(Op::Capability));
        assert_eq!(module.globals[1].result_id(), Some(2));
        assert_eq!(module.globals[2].opcode, 65_000);
        assert_eq!(module.globals[2].result_id(), None);
        assert_eq!(module.globals[4].result_id(), Some(4));
        assert_eq!(module.globals[4].rest(2), [9]);
        assert!(module.body_opcodes.contains(&(Op::Return as u32)));
        assert!(!module.body_opcodes.contains(&(Op::Capability as u32)));
        Ok(())
    }

    #[test]
    fn rejects_broken_modules() -> anyhow::Result<()> {
        assert!(parse(&[]).is_err());
        assert!(parse(&[1, 2, 3, 4, 5]).is_err());
        assert!(parse(&[MAGIC, 0, 0]).is_err());
        assert!(parse(&module(&[vec![0]])).is_err());
        assert!(parse(&module(&[vec![(3 << 16) | 17, 1]])).is_err());
        assert!(parse_bytes(&[0; 7]).is_err());
        let swapped: Vec<u32> = module(&[instruction(Op::Capability as u32, &[1])?])
            .iter()
            .map(|w| w.swap_bytes())
            .collect();
        assert_eq!(
            parse(&swapped).map_err(anyhow::Error::msg)?.globals.len(),
            1
        );
        Ok(())
    }
}
