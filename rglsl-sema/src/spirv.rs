use alloc::collections::{BTreeMap, BTreeSet};
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::NodeId;

use crate::constant::Value;
use crate::scope::SymbolId;
use crate::types::{Scalar, Type};

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct SpirvRequirements {
    pub extensions: BTreeSet<String>,
    pub capabilities: BTreeSet<u32>,
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct SpirvInstruction {
    pub set: String,
    pub id: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SpirvDecoration {
    pub decoration: u32,
    pub operands: SpirvDecorationOperands,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SpirvDecorationOperands {
    Literals(Vec<u32>),
    Ids(Vec<SpirvIdOperand>),
    Strings(Vec<String>),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SpirvIdOperand {
    Symbol(SymbolId),
    Constant(NodeId),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SpirvExecutionModeOperands {
    Literals(Vec<u32>),
    Ids(Vec<NodeId>),
}

pub type SpirvExecutionModes = BTreeMap<u32, SpirvExecutionModeOperands>;

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct SpirvType {
    pub instruction: SpirvInstruction,
    pub parameters: Vec<SpirvTypeParameter>,
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum SpirvTypeParameter {
    Literal(Vec<u32>),
    Constant(Vec<u32>),
    Type(Type),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct SpirvTypeId(pub(crate) u32);

impl SpirvTypeId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

pub fn string_words(text: &str) -> Vec<u32> {
    let mut bytes: Vec<u8> = text.bytes().collect();
    bytes.push(0);
    while !bytes.len().is_multiple_of(4) {
        bytes.push(0);
    }
    bytes
        .chunks(4)
        .map(|chunk| {
            let mut word = [0_u8; 4];
            for (slot, byte) in word.iter_mut().zip(chunk) {
                *slot = *byte;
            }
            u32::from_le_bytes(word)
        })
        .collect()
}

#[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
pub fn value_word(value: &Value) -> Option<u32> {
    Some(match *value {
        Value::Bool(value) => u32::from(value),
        Value::Int(value) => value as u32,
        Value::Uint(value) => value,
        Value::Float(value) => (value as f32).to_bits(),
        _ => return None,
    })
}

const OP_TYPE_BOOL: u32 = 20;
const OP_TYPE_INT: u32 = 21;
const OP_TYPE_FLOAT: u32 = 22;

impl SpirvType {
    pub fn scalar(&self) -> Option<Scalar> {
        if !self.instruction.set.is_empty() {
            return None;
        }
        let literal = |index: usize| match self.parameters.get(index) {
            Some(SpirvTypeParameter::Literal(words)) if words.len() == 1 => words.first().copied(),
            _ => None,
        };
        match (self.instruction.id?, self.parameters.len()) {
            (OP_TYPE_BOOL, 0) => Some(Scalar::Bool),
            (OP_TYPE_INT, 2) => match (literal(0)?, literal(1)?) {
                (8, 1) => Some(Scalar::Int8),
                (8, 0) => Some(Scalar::Uint8),
                (16, 1) => Some(Scalar::Int16),
                (16, 0) => Some(Scalar::Uint16),
                (32, 1) => Some(Scalar::Int),
                (32, 0) => Some(Scalar::Uint),
                (64, 1) => Some(Scalar::Int64),
                (64, 0) => Some(Scalar::Uint64),
                _ => None,
            },
            (OP_TYPE_FLOAT, 1) => match literal(0)? {
                16 => Some(Scalar::Float16),
                32 => Some(Scalar::Float),
                64 => Some(Scalar::Double),
                _ => None,
            },
            _ => None,
        }
    }
}
