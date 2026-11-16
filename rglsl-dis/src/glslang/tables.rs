pub(super) use super::glslang_tables::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Class {
    Id,
    VariableIds,
    OptionalLiteral,
    VariableLiterals,
    VariableIdLiteral,
    VariableLiteralId,
    LiteralNumber,
    LiteralString,
    VariableLiteralStrings,
    Enum(Kind),
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Kind {
    Source,
    ExecutionModel,
    Addressing,
    Memory,
    ExecutionMode,
    Storage,
    Dimensionality,
    SamplerAddressingMode,
    SamplerFilterMode,
    SamplerImageFormat,
    ImageOperands,
    AccessQualifier,
    Decoration,
    Select,
    Loop,
    Function,
    MemorySemantics,
    MemoryAccess,
    Scope,
    GroupOperation,
    Capability,
    CooperativeMatrixOperands,
    TensorAddressingOperands,
}

pub(super) struct Instruction {
    pub(super) opcode: u32,
    pub(super) name: &'static str,
    pub(super) result: bool,
    pub(super) ty: bool,
    pub(super) operands: &'static [Class],
}

pub(super) const fn op(
    opcode: u32,
    name: &'static str,
    result: bool,
    ty: bool,
    operands: &'static [Class],
) -> Instruction {
    Instruction {
        opcode,
        name,
        result,
        ty,
        operands,
    }
}

pub(super) type Names = &'static [(u32, &'static str)];

pub(super) struct EnumClass {
    pub(super) ceiling: u32,
    pub(super) names: Names,
    pub(super) bitmask: bool,
}

const UNKNOWN: Instruction = op(0, "Bad", true, true, &[]);

pub(super) fn instruction(opcode: u32) -> &'static Instruction {
    INSTRUCTIONS
        .binary_search_by_key(&opcode, |instruction| instruction.opcode)
        .ok()
        .and_then(|index| INSTRUCTIONS.get(index))
        .unwrap_or(&UNKNOWN)
}

pub(super) fn name(names: Names, value: u32) -> &'static str {
    names
        .binary_search_by_key(&value, |&(value, _)| value)
        .ok()
        .and_then(|index| names.get(index))
        .map_or("Bad", |&(_, name)| name)
}

pub(super) fn enum_name(kind: Kind, value: u32) -> &'static str {
    name(enum_class(kind).names, value)
}
