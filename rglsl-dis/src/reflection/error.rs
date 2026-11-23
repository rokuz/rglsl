use std::fmt;

use rglsl_types::ShaderStage;

use super::DescriptorType;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ReflectError {
    Header { words: usize },
    Magic(u32),
    ZeroWordCount { offset: usize },
    Truncated { offset: usize, opcode: u32 },
    MissingOperand { offset: usize, opcode: u32 },
    UnterminatedString { offset: usize, opcode: u32 },
    DuplicateId(u32),
    UndefinedType(u32),
    UndefinedConstant(u32),
    NotAPointer { variable: u32 },
    CyclicType(u32),
    NoEntryPoint,
    MultipleEntryPoints,
    ExecutionModel(u32),
    UnknownResource { variable: u32 },
    MissingDescriptorSet { variable: u32 },
    MissingLocation { variable: u32 },
    UnsizedType(u32),
    ArrayLength { array: u32 },
    NonConstantWorkgroupSize(u32),
    InterfaceType(u32),
    SpecializationType(u32),
    Overflow(u32),
}

impl fmt::Display for ReflectError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match *self {
            Self::Header { words } => {
                write!(f, "the SPIR-V header needs 5 words, the module has {words}")
            }
            Self::Magic(magic) => write!(f, "invalid SPIR-V magic number 0x{magic:08x}"),
            Self::ZeroWordCount { offset } => {
                write!(f, "instruction at word {offset} has a word count of zero")
            }
            Self::Truncated { offset, opcode } => write!(
                f,
                "instruction with opcode {opcode} at word {offset} runs past the end of the module"
            ),
            Self::MissingOperand { offset, opcode } => write!(
                f,
                "instruction with opcode {opcode} at word {offset} is missing operands"
            ),
            Self::UnterminatedString { offset, opcode } => write!(
                f,
                "instruction with opcode {opcode} at word {offset} has a string without a terminating NUL"
            ),
            Self::DuplicateId(id) => write!(f, "id {id} is defined more than once"),
            Self::UndefinedType(id) => write!(f, "id {id} is not a type"),
            Self::UndefinedConstant(id) => write!(f, "id {id} is not a constant"),
            Self::NotAPointer { variable } => {
                write!(f, "the type of variable {variable} is not a pointer")
            }
            Self::CyclicType(id) => write!(f, "type {id} contains itself"),
            Self::NoEntryPoint => f.write_str("the module has no entry point"),
            Self::MultipleEntryPoints => {
                f.write_str("the module has several entry points; reflection needs exactly one")
            }
            Self::ExecutionModel(model) => {
                write!(f, "execution model {model} is not a Vulkan shader stage")
            }
            Self::UnknownResource { variable } => write!(
                f,
                "variable {variable} has a descriptor binding but no known descriptor type"
            ),
            Self::MissingDescriptorSet { variable } => {
                write!(f, "variable {variable} has a binding but no descriptor set")
            }
            Self::MissingLocation { variable } => write!(
                f,
                "stage input or output {variable} is neither a built-in nor has a location"
            ),
            Self::UnsizedType(id) => write!(f, "type {id} has no size in an explicit layout"),
            Self::ArrayLength { array } => write!(
                f,
                "the length of array type {array} is not a constant or a specialization constant"
            ),
            Self::NonConstantWorkgroupSize(id) => write!(
                f,
                "workgroup size {id} is not a constant or a specialization constant"
            ),
            Self::InterfaceType(id) => {
                write!(f, "type {id} cannot be the type of a stage input or output")
            }
            Self::SpecializationType(id) => {
                write!(
                    f,
                    "specialization constant {id} does not have a scalar type"
                )
            }
            Self::Overflow(id) => write!(f, "the size of type {id} does not fit in 32 bits"),
        }
    }
}

impl std::error::Error for ReflectError {}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LayoutError {
    pub set: u32,
    pub binding: u32,
    pub first: (ShaderStage, DescriptorType, u32),
    pub second: (ShaderStage, DescriptorType, u32),
}

impl fmt::Display for LayoutError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (first_stage, first_type, first_count) = self.first;
        let (second_stage, second_type, second_count) = self.second;
        write!(
            f,
            "set {} binding {} is {} x{} in the {} stage but {} x{} in the {} stage",
            self.set,
            self.binding,
            first_type.name(),
            first_count,
            first_stage.extension(),
            second_type.name(),
            second_count,
            second_stage.extension()
        )
    }
}

impl std::error::Error for LayoutError {}
