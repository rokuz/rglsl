pub(super) use super::grammar::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Kind {
    TypeId,
    ResultId,
    Id,
    LiteralInteger,
    LiteralFloat,
    LiteralString,
    TypedNumber,
    ExtInstNumber,
    SpecConstantOp,
    PairNumberId,
    PairIdInteger,
    Enum(u16),
    Mask(u16),
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Quantifier {
    One,
    Optional,
    Variable,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) struct Operand(pub(super) Kind, pub(super) Quantifier);

#[derive(Debug)]
pub(super) struct Instruction {
    pub(super) opcode: u32,
    pub(super) name: &'static str,
    pub(super) type_declaration: bool,
    pub(super) operands: &'static [Operand],
}

#[derive(Debug)]
pub(super) struct Enumerant {
    pub(super) value: u32,
    pub(super) name: &'static str,
    pub(super) parameters: &'static [Operand],
}

#[derive(Debug)]
pub(super) struct EnumKind {
    pub(super) enumerants: &'static [Enumerant],
}

#[derive(Debug)]
pub(super) struct ExtInstruction {
    pub(super) number: u32,
    pub(super) name: &'static str,
    pub(super) operands: &'static [Operand],
}

#[derive(Debug)]
pub(super) struct ExtSet {
    pub(super) import: &'static str,
    pub(super) prefix: bool,
    pub(super) non_semantic: bool,
    pub(super) instructions: &'static [ExtInstruction],
}

pub(super) fn instruction(opcode: u32) -> Option<&'static Instruction> {
    INSTRUCTIONS
        .binary_search_by_key(&opcode, |instruction| instruction.opcode)
        .ok()
        .and_then(|index| INSTRUCTIONS.get(index))
}

pub(super) fn enumerant(kind: u16, value: u32) -> Option<&'static Enumerant> {
    let enumerants = KINDS.get(usize::from(kind))?.enumerants;
    enumerants
        .binary_search_by_key(&value, |enumerant| enumerant.value)
        .ok()
        .and_then(|index| enumerants.get(index))
}

pub(super) fn ext_set(import: &[u8]) -> Option<usize> {
    EXT_SETS.iter().position(|set| {
        if set.prefix {
            import.starts_with(set.import.as_bytes())
        } else {
            import == set.import.as_bytes()
        }
    })
}

pub(super) fn ext_instruction(set: usize, number: u32) -> Option<&'static ExtInstruction> {
    let instructions = EXT_SETS.get(set)?.instructions;
    instructions
        .binary_search_by_key(&number, |instruction| instruction.number)
        .ok()
        .and_then(|index| instructions.get(index))
}

pub(super) fn non_semantic(set: usize) -> bool {
    EXT_SETS.get(set).is_some_and(|set| set.non_semantic)
}

pub(super) fn generator(tool: u32) -> Option<&'static str> {
    GENERATORS
        .iter()
        .find(|&&(value, _)| value == tool)
        .map(|&(_, name)| name)
}

pub(super) fn built_in_name(built_in: u32) -> Option<&'static str> {
    BUILT_IN_NAMES
        .iter()
        .find(|&&(value, _)| value == built_in)
        .map(|&(_, name)| name)
}
