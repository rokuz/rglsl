use std::collections::BTreeMap;

use super::number::{Encoding, Number};
use super::tables::{self, Kind, Operand, Quantifier};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Printed {
    Id,
    ResultId,
    Number(Number),
    String,
    Enum(u16),
    Mask(u16),
    ExtInst,
    SpecConstantOp,
}

#[derive(Clone, Copy, Debug)]
pub(super) struct ParsedOperand {
    pub(super) offset: usize,
    pub(super) count: usize,
    pub(super) printed: Printed,
}

#[derive(Debug)]
pub(super) struct Parsed<'w> {
    pub(super) opcode: u32,
    pub(super) name: &'static str,
    pub(super) words: &'w [u32],
    pub(super) result_id: u32,
    pub(super) type_id: u32,
    pub(super) ext_set: Option<usize>,
    pub(super) operands: Vec<ParsedOperand>,
}

impl Parsed<'_> {
    pub(super) fn word(&self, index: usize) -> u32 {
        self.words.get(index).copied().unwrap_or(0)
    }

    pub(super) fn string(&self, operand: usize) -> Vec<u8> {
        self.operands
            .get(operand)
            .map(|operand| decode_string(self.words.get(operand.offset..).unwrap_or_default()))
            .unwrap_or_default()
    }
}

pub(super) fn decode_string(words: &[u32]) -> Vec<u8> {
    let mut bytes = Vec::new();
    for word in words {
        for byte in word.to_le_bytes() {
            if byte == 0 {
                return bytes;
            }
            bytes.push(byte);
        }
    }
    bytes
}

#[derive(Debug, Default)]
pub(super) struct Parser {
    id_types: BTreeMap<u32, u32>,
    numbers: BTreeMap<u32, Option<Number>>,
    imports: BTreeMap<u32, usize>,
}

fn encoding(value: u32) -> Encoding {
    match value {
        tables::FP_ENCODING_BFLOAT16 => Encoding::BFloat16,
        tables::FP_ENCODING_FLOAT8_E4M3 => Encoding::Float8E4M3,
        tables::FP_ENCODING_FLOAT8_E5M2 => Encoding::Float8E5M2,
        tables::FP_ENCODING_FLOAT8_E8M0 => Encoding::Float8E8M0,
        tables::FP_ENCODING_FLOAT6_E2M3 => Encoding::Float6E2M3,
        tables::FP_ENCODING_FLOAT6_E3M2 => Encoding::Float6E3M2,
        tables::FP_ENCODING_FLOAT4_E2M1 => Encoding::Float4E2M1,
        tables::FP_ENCODING_MXINT8 => Encoding::MxInt8,
        _ => Encoding::Unknown,
    }
}

const fn width(number: Number) -> u32 {
    match number {
        Number::Unsigned(width) | Number::Signed(width) | Number::Float(width, _) => width,
    }
}

const fn optional(operand: Operand) -> bool {
    matches!(operand.1, Quantifier::Optional | Quantifier::Variable)
}

fn push_all(pending: &mut Vec<Operand>, operands: &[Operand]) {
    pending.extend(operands.iter().rev().copied());
}

impl Parser {
    pub(super) fn parse<'w>(&mut self, words: &'w [u32]) -> Result<Parsed<'w>, String> {
        let first = words.first().copied().unwrap_or(0);
        let count = usize::try_from(first >> 16).unwrap_or(0);
        let opcode = first & 0xffff;
        if count < 1 {
            return Err(format!("Invalid instruction word count: {count}"));
        }
        let instruction =
            tables::instruction(opcode).ok_or_else(|| format!("Invalid opcode: {opcode}"))?;
        if count > words.len() {
            return Err(format!(
                "End of input reached while decoding Op{} starting at word 0: expected more operands after {} words.",
                instruction.name,
                words.len()
            ));
        }
        let words = words.get(..count).unwrap_or_default();
        let mut parsed = Parsed {
            opcode,
            name: instruction.name,
            words,
            result_id: 0,
            type_id: 0,
            ext_set: None,
            operands: Vec::new(),
        };
        let mut pending = Vec::new();
        push_all(&mut pending, instruction.operands);
        let mut index = 1;
        while index < count {
            let Some(mut operand) = pending.pop() else {
                return Err(format!(
                    "Invalid instruction Op{} starting at word 0: expected no more operands after {index} words, but stated word count is {count}.",
                    instruction.name
                ));
            };
            loop {
                match operand {
                    Operand(kind @ (Kind::PairNumberId | Kind::PairIdInteger), quantifier) => {
                        if quantifier == Quantifier::Variable {
                            pending.push(operand);
                        }
                        let (first, second) = if kind == Kind::PairNumberId {
                            (Kind::TypedNumber, Kind::Id)
                        } else {
                            (Kind::Id, Kind::LiteralInteger)
                        };
                        pending.push(Operand(second, Quantifier::One));
                        operand = Operand(first, Quantifier::Optional);
                    }
                    Operand(kind, Quantifier::Variable) => {
                        pending.push(operand);
                        operand = Operand(kind, Quantifier::Optional);
                    }
                    _ => break,
                }
            }
            index = self.operand(&mut parsed, operand.0, index, &mut pending)?;
        }
        if pending.last().is_some_and(|&operand| !optional(operand)) {
            return Err(format!(
                "End of input reached while decoding Op{} starting at word 0: expected more operands after {count} words.",
                instruction.name
            ));
        }
        if instruction.type_declaration || parsed.result_id != 0 {
            self.record(&parsed, instruction.type_declaration);
        }
        Ok(parsed)
    }

    fn record(&mut self, parsed: &Parsed<'_>, type_declaration: bool) {
        if parsed.result_id == 0 {
            return;
        }
        let type_of = if type_declaration {
            parsed.result_id
        } else {
            parsed.type_id
        };
        self.id_types.insert(parsed.result_id, type_of);
        if type_declaration {
            let number = match parsed.opcode {
                tables::OP_TYPE_INT => {
                    let width = parsed.word(2);
                    Some(if parsed.word(3) == 0 {
                        Number::Unsigned(width)
                    } else {
                        Number::Signed(width)
                    })
                }
                tables::OP_TYPE_FLOAT => {
                    let encoding = if parsed.words.len() >= 4 {
                        encoding(parsed.word(3))
                    } else {
                        Encoding::Unknown
                    };
                    Some(Number::Float(parsed.word(2), encoding))
                }
                _ => None,
            };
            self.numbers.insert(parsed.result_id, number);
        }
    }

    fn number_of(&self, type_id: u32) -> Result<Number, String> {
        match self.numbers.get(&type_id) {
            Some(&Some(number)) => Ok(number),
            Some(&None) => Err(format!("Type Id {type_id} is not a scalar numeric type")),
            None => Err(format!("Type Id {type_id} is not a type")),
        }
    }

    fn operand(
        &mut self,
        parsed: &mut Parsed<'_>,
        kind: Kind,
        offset: usize,
        pending: &mut Vec<Operand>,
    ) -> Result<usize, String> {
        let word = parsed.word(offset);
        let mut count = 1;
        let printed = match kind {
            Kind::TypeId => {
                if word == 0 {
                    return Err(String::from("Error: Type Id is 0"));
                }
                parsed.type_id = word;
                Printed::Id
            }
            Kind::ResultId => {
                if word == 0 {
                    return Err(String::from("Error: Result Id is 0"));
                }
                if self.id_types.contains_key(&word) {
                    return Err(format!("Id {word} is defined more than once"));
                }
                parsed.result_id = word;
                Printed::ResultId
            }
            Kind::Id => {
                if word == 0 {
                    return Err(String::from("Id is 0"));
                }
                if offset == 3
                    && matches!(
                        parsed.opcode,
                        tables::OP_EXT_INST | tables::OP_EXT_INST_WITH_FORWARD_REFS
                    )
                {
                    let set = self.imports.get(&word).copied().ok_or_else(|| {
                        format!(
                            "OpExtInst set Id {word} does not reference an OpExtInstImport result Id"
                        )
                    })?;
                    parsed.ext_set = Some(set);
                }
                Printed::Id
            }
            Kind::LiteralInteger => Printed::Number(Number::Unsigned(32)),
            Kind::LiteralFloat => Printed::Number(Number::Float(32, Encoding::Unknown)),
            Kind::TypedNumber => {
                let type_id = if parsed.opcode == tables::OP_SWITCH {
                    let selector = parsed.word(1);
                    let type_id = self
                        .id_types
                        .get(&selector)
                        .copied()
                        .filter(|&type_id| type_id != 0)
                        .ok_or_else(|| {
                            format!("Invalid OpSwitch: selector id {selector} has no type")
                        })?;
                    if type_id == selector {
                        return Err(format!(
                            "Invalid OpSwitch: selector id {selector} is a type, not a value"
                        ));
                    }
                    type_id
                } else {
                    parsed.type_id
                };
                let number = self.number_of(type_id)?;
                count = usize::try_from(width(number).div_ceil(32)).unwrap_or(1);
                Printed::Number(number)
            }
            Kind::ExtInstNumber => {
                let set = parsed
                    .ext_set
                    .ok_or_else(|| String::from("an extended instruction without a set"))?;
                match tables::ext_instruction(set, word) {
                    Some(instruction) => {
                        if tables::non_semantic(set) {
                            pending.push(Operand(Kind::Id, Quantifier::Variable));
                        }
                        push_all(pending, instruction.operands);
                    }
                    None if tables::non_semantic(set) => {
                        pending.push(Operand(Kind::Id, Quantifier::Variable));
                    }
                    None => return Err(format!("Invalid extended instruction number: {word}")),
                }
                Printed::ExtInst
            }
            Kind::SpecConstantOp => {
                let instruction =
                    tables::instruction(word).ok_or_else(|| format!("Invalid Operand: {word}"))?;
                push_all(pending, instruction.operands.get(2..).unwrap_or_default());
                Printed::SpecConstantOp
            }
            Kind::LiteralString => {
                let remaining = parsed.words.get(offset..).unwrap_or_default();
                let bytes = decode_string(remaining);
                if bytes.len() == remaining.len() * 4 {
                    return Err(String::from("End of input reached while decoding a string"));
                }
                count = bytes.len() / 4 + 1;
                if parsed.opcode == tables::OP_EXT_INST_IMPORT {
                    let set = tables::ext_set(&bytes).ok_or_else(|| {
                        format!(
                            "Invalid extended instruction import '{}'",
                            String::from_utf8_lossy(&bytes)
                        )
                    })?;
                    self.imports.insert(parsed.result_id, set);
                }
                Printed::String
            }
            Kind::Enum(index) => {
                let enumerant = tables::enumerant(index, word)
                    .ok_or_else(|| format!("Invalid operand: {word}"))?;
                push_all(pending, enumerant.parameters);
                Printed::Enum(index)
            }
            Kind::Mask(index) => {
                let mut remaining = word;
                let mut bit = 1_u32 << 31;
                while remaining != 0 {
                    if remaining & bit != 0 {
                        let enumerant = tables::enumerant(index, bit).ok_or_else(|| {
                            format!("Invalid operand: {word} has invalid mask component {bit}")
                        })?;
                        remaining ^= bit;
                        push_all(pending, enumerant.parameters);
                    }
                    bit >>= 1;
                }
                if word == 0
                    && let Some(enumerant) = tables::enumerant(index, 0)
                {
                    push_all(pending, enumerant.parameters);
                }
                Printed::Mask(index)
            }
            Kind::PairNumberId | Kind::PairIdInteger => {
                return Err(String::from("an unexpanded operand pair"));
            }
        };
        if offset + count > parsed.words.len() {
            return Err(format!(
                "End of input reached while decoding Op{} starting at word 0: expected more operands after {} words.",
                parsed.name,
                parsed.words.len()
            ));
        }
        parsed.operands.push(ParsedOperand {
            offset,
            count,
            printed,
        });
        Ok(offset + count)
    }
}
