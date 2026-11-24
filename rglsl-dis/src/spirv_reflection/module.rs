use std::collections::BTreeMap;

use rglsl_types::ShaderStage;
use spirv::{BuiltIn, Decoration, Dim, ExecutionMode, ExecutionModel, Op, StorageClass};

use super::{
    ReflectError, ScalarKind, ScalarType, ScalarValue, SpecializationConstant, WorkgroupDimension,
};
use crate::string::decode_string;

const MAGIC: u32 = 0x0723_0203;
const HEADER_WORDS: usize = 5;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) enum Enumerant<T> {
    Known(T),
    Unknown(u32),
}

impl<T> Enumerant<T> {
    fn parse(value: u32, from: impl FnOnce(u32) -> Option<T>) -> Self {
        from(value).map_or(Self::Unknown(value), Self::Known)
    }
}

impl<T: PartialEq> Enumerant<T> {
    pub(super) fn is(&self, known: &T) -> bool {
        matches!(*self, Self::Known(ref value) if value == known)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) enum ImageUsage {
    Runtime,
    Sampled,
    Storage,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) enum Type {
    Bool,
    Int {
        width: u32,
        signed: bool,
    },
    Float {
        width: u32,
        encoding: Option<u32>,
    },
    Vector {
        component: u32,
        count: u32,
    },
    Matrix {
        column: u32,
        columns: u32,
    },
    Image {
        dim: Enumerant<Dim>,
        usage: ImageUsage,
    },
    Sampler,
    SampledImage {
        image: u32,
    },
    Array {
        element: u32,
        length: u32,
    },
    RuntimeArray {
        element: u32,
    },
    Struct {
        members: Vec<u32>,
    },
    Pointer {
        class: Enumerant<StorageClass>,
        pointee: Option<u32>,
    },
    AccelerationStructure,
    Tensor {
        element: u32,
        rank: Option<u32>,
        shape: Option<u32>,
    },
    Graph {
        inputs: u32,
    },
    Other,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) enum Scalar {
    Bool(bool),
    Number { ty: u32, bits: u64 },
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) enum Constant {
    Fixed(Scalar),
    Specialization(Scalar),
    Composite { constituents: Vec<u32> },
    Other,
}

bitflags::bitflags! {
    #[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
    pub(super) struct DecorationFlags: u8 {
        const BLOCK = 1 << 0;
        const BUFFER_BLOCK = 1 << 1;
        const ROW_MAJOR = 1 << 2;
        const PATCH = 1 << 3;
        const PER_VERTEX = 1 << 4;
    }
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub(super) struct Decorations {
    pub(super) set: Option<u32>,
    pub(super) binding: Option<u32>,
    pub(super) location: Option<u32>,
    pub(super) component: Option<u32>,
    pub(super) spec_id: Option<u32>,
    pub(super) array_stride: Option<u32>,
    pub(super) matrix_stride: Option<u32>,
    pub(super) offset: Option<u32>,
    pub(super) bank: Option<u32>,
    pub(super) bank_offset: Option<u32>,
    pub(super) built_in: Option<Enumerant<BuiltIn>>,
    pub(super) flags: DecorationFlags,
}

impl Decorations {
    fn apply(
        &mut self,
        decoration: u32,
        operand: impl Fn(usize) -> Result<u32, ReflectError>,
    ) -> Result<(), ReflectError> {
        let Some(decoration) = Decoration::from_u32(decoration) else {
            return Ok(());
        };
        match decoration {
            Decoration::DescriptorSet => self.set = Some(operand(0)?),
            Decoration::Binding => self.binding = Some(operand(0)?),
            Decoration::Location => self.location = Some(operand(0)?),
            Decoration::Component => self.component = Some(operand(0)?),
            Decoration::SpecId => self.spec_id = Some(operand(0)?),
            Decoration::ArrayStride => self.array_stride = Some(operand(0)?),
            Decoration::MatrixStride => self.matrix_stride = Some(operand(0)?),
            Decoration::Offset => self.offset = Some(operand(0)?),
            Decoration::BankNV => self.bank = Some(operand(0)?),
            Decoration::MemberOffsetNV => self.bank_offset = Some(operand(0)?),
            Decoration::BuiltIn => {
                self.built_in = Some(Enumerant::parse(operand(0)?, BuiltIn::from_u32));
            }
            Decoration::Block => self.flags |= DecorationFlags::BLOCK,
            Decoration::BufferBlock => self.flags |= DecorationFlags::BUFFER_BLOCK,
            Decoration::RowMajor => self.flags |= DecorationFlags::ROW_MAJOR,
            Decoration::ColMajor => self.flags -= DecorationFlags::ROW_MAJOR,
            Decoration::Patch => self.flags |= DecorationFlags::PATCH,
            Decoration::PerVertexKHR => self.flags |= DecorationFlags::PER_VERTEX,
            _ => {}
        }
        Ok(())
    }

    fn merge(&mut self, group: &Self) {
        for (own, from_group) in [
            (&mut self.set, group.set),
            (&mut self.binding, group.binding),
            (&mut self.location, group.location),
            (&mut self.component, group.component),
            (&mut self.spec_id, group.spec_id),
            (&mut self.array_stride, group.array_stride),
            (&mut self.matrix_stride, group.matrix_stride),
            (&mut self.offset, group.offset),
            (&mut self.bank, group.bank),
            (&mut self.bank_offset, group.bank_offset),
        ] {
            *own = from_group.or(*own);
        }
        self.built_in = group.built_in.or(self.built_in);
        self.flags |= group.flags;
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) struct Variable {
    pub(super) id: u32,
    pub(super) class: Enumerant<StorageClass>,
    pointer: u32,
    data_type: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) struct EntryPoint {
    pub(super) id: u32,
    pub(super) stage: ShaderStage,
    pub(super) name: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) struct GraphEntry {
    pub(super) graph: u32,
    pub(super) name: String,
    pub(super) interface: Vec<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) struct GraphConstantDeclaration {
    pub(super) ty: u32,
    pub(super) id: u32,
    pub(super) constant_id: u32,
}

#[derive(Debug, Default)]
pub(super) struct Module {
    pub(super) types: BTreeMap<u32, Type>,
    constants: BTreeMap<u32, Constant>,
    decorations: BTreeMap<u32, Decorations>,
    member_decorations: BTreeMap<(u32, u32), Decorations>,
    names: BTreeMap<u32, String>,
    member_names: BTreeMap<(u32, u32), String>,
    pub(super) variables: Vec<Variable>,
    entry_points: Vec<EntryPoint>,
    pub(super) graph_entries: Vec<GraphEntry>,
    pub(super) graph_constants: Vec<GraphConstantDeclaration>,
    graphs: BTreeMap<u32, u32>,
    local_sizes: Vec<(u32, [u32; 3])>,
    local_size_ids: Vec<(u32, [u32; 3])>,
    groups: Vec<(u32, u32)>,
    member_groups: Vec<(u32, u32, u32)>,
}

#[derive(Debug, Clone, Copy)]
struct Instruction<'w> {
    offset: usize,
    opcode: u32,
    words: &'w [u32],
}

impl<'w> Instruction<'w> {
    const fn missing_operand(self) -> ReflectError {
        ReflectError::MissingOperand {
            offset: self.offset,
            opcode: self.opcode,
        }
    }

    fn operand(self, index: usize) -> Result<u32, ReflectError> {
        index
            .checked_add(1)
            .and_then(|index| self.words.get(index))
            .copied()
            .ok_or(self.missing_operand())
    }

    fn operands_from(self, index: usize) -> &'w [u32] {
        index
            .checked_add(1)
            .and_then(|index| self.words.get(index..))
            .unwrap_or_default()
    }

    fn string(self, index: usize) -> Result<String, ReflectError> {
        let words = self.operands_from(index);
        let bytes = decode_string(words);
        if bytes.len() / 4 >= words.len() {
            return Err(ReflectError::UnterminatedString {
                offset: self.offset,
                opcode: self.opcode,
            });
        }
        Ok(String::from_utf8_lossy(&bytes).into_owned())
    }

    fn three(self, first: usize) -> Result<[u32; 3], ReflectError> {
        match *self.operands_from(first) {
            [x, y, z, ..] => Ok([x, y, z]),
            _ => Err(self.missing_operand()),
        }
    }
}

const fn stage(model: ExecutionModel) -> Option<ShaderStage> {
    Some(match model {
        ExecutionModel::Vertex => ShaderStage::Vertex,
        ExecutionModel::TessellationControl => ShaderStage::TessControl,
        ExecutionModel::TessellationEvaluation => ShaderStage::TessEvaluation,
        ExecutionModel::Geometry => ShaderStage::Geometry,
        ExecutionModel::Fragment => ShaderStage::Fragment,
        ExecutionModel::GLCompute => ShaderStage::Compute,
        ExecutionModel::TaskNV | ExecutionModel::TaskEXT => ShaderStage::Task,
        ExecutionModel::MeshNV | ExecutionModel::MeshEXT => ShaderStage::Mesh,
        ExecutionModel::RayGenerationKHR => ShaderStage::RayGeneration,
        ExecutionModel::IntersectionKHR => ShaderStage::Intersection,
        ExecutionModel::AnyHitKHR => ShaderStage::AnyHit,
        ExecutionModel::ClosestHitKHR => ShaderStage::ClosestHit,
        ExecutionModel::MissKHR => ShaderStage::Miss,
        ExecutionModel::CallableKHR => ShaderStage::Callable,
        ExecutionModel::Kernel => return None,
    })
}

impl Module {
    pub(super) fn parse(words: &[u32]) -> Result<Self, ReflectError> {
        let [magic, _, _, _, _, ..] = *words else {
            return Err(ReflectError::Header { words: words.len() });
        };
        if magic != MAGIC {
            return Err(ReflectError::Magic(magic));
        }
        let mut module = Self::default();
        let mut offset = HEADER_WORDS;
        while let Some(&first) = words.get(offset) {
            let count = usize::try_from(first >> 16).unwrap_or(usize::MAX);
            let opcode = first & 0xffff;
            if count == 0 {
                return Err(ReflectError::ZeroWordCount { offset });
            }
            let end = offset
                .checked_add(count)
                .filter(|&end| end <= words.len())
                .ok_or(ReflectError::Truncated { offset, opcode })?;
            let instruction = Instruction {
                offset,
                opcode,
                words: words.get(offset..end).unwrap_or_default(),
            };
            module.instruction(instruction)?;
            offset = end;
        }
        module.resolve();
        Ok(module)
    }

    fn instruction(&mut self, instruction: Instruction<'_>) -> Result<(), ReflectError> {
        let Some(op) = Op::from_u32(instruction.opcode) else {
            return Ok(());
        };
        match op {
            Op::Name => {
                let name = instruction.string(1)?;
                self.names.insert(instruction.operand(0)?, name);
            }
            Op::MemberName => {
                let name = instruction.string(2)?;
                self.member_names
                    .insert((instruction.operand(0)?, instruction.operand(1)?), name);
            }
            Op::EntryPoint => {
                let model = instruction.operand(0)?;
                let stage = ExecutionModel::from_u32(model)
                    .and_then(stage)
                    .ok_or(ReflectError::ExecutionModel(model))?;
                let id = instruction.operand(1)?;
                let name = instruction.string(2)?;
                self.entry_points.push(EntryPoint { id, stage, name });
            }
            Op::ExecutionMode | Op::ExecutionModeId => {
                let entry = instruction.operand(0)?;
                match (op, ExecutionMode::from_u32(instruction.operand(1)?)) {
                    (Op::ExecutionMode, Some(ExecutionMode::LocalSize)) => {
                        self.local_sizes.push((entry, instruction.three(2)?));
                    }
                    (Op::ExecutionModeId, Some(ExecutionMode::LocalSizeId)) => {
                        self.local_size_ids.push((entry, instruction.three(2)?));
                    }
                    _ => {}
                }
            }
            Op::Decorate => {
                let target = instruction.operand(0)?;
                let decoration = instruction.operand(1)?;
                self.decorations
                    .entry(target)
                    .or_default()
                    .apply(decoration, |index| instruction.operand(index + 2))?;
            }
            Op::MemberDecorate => {
                let target = instruction.operand(0)?;
                let member = instruction.operand(1)?;
                let decoration = instruction.operand(2)?;
                self.member_decorations
                    .entry((target, member))
                    .or_default()
                    .apply(decoration, |index| instruction.operand(index + 3))?;
            }
            Op::GroupDecorate => {
                let group = instruction.operand(0)?;
                for &target in instruction.operands_from(1) {
                    self.groups.push((group, target));
                }
            }
            Op::GroupMemberDecorate => {
                let group = instruction.operand(0)?;
                let pairs = instruction.operands_from(1);
                if !pairs.len().is_multiple_of(2) {
                    return Err(instruction.missing_operand());
                }
                for pair in pairs.chunks_exact(2) {
                    if let [target, member] = *pair {
                        self.member_groups.push((group, target, member));
                    }
                }
            }
            Op::Variable | Op::UntypedVariableKHR => {
                let ty = instruction.operand(0)?;
                let id = instruction.operand(1)?;
                let class = Enumerant::parse(instruction.operand(2)?, StorageClass::from_u32);
                if !class.is(&StorageClass::Function) {
                    let data_type = if op == Op::UntypedVariableKHR {
                        instruction.operand(3).ok()
                    } else {
                        None
                    };
                    self.variables.push(Variable {
                        id,
                        class,
                        pointer: ty,
                        data_type,
                    });
                }
            }
            Op::GraphEntryPointARM => {
                let graph = instruction.operand(0)?;
                let name = instruction.string(1)?;
                let operands = instruction.operands_from(1);
                let name_words = operands
                    .iter()
                    .position(|word| word.to_le_bytes().contains(&0))
                    .map_or(operands.len(), |last| last + 1);
                let interface = operands.get(name_words..).unwrap_or_default().to_vec();
                self.graph_entries.push(GraphEntry {
                    graph,
                    name,
                    interface,
                });
            }
            Op::GraphARM => {
                self.graphs
                    .insert(instruction.operand(1)?, instruction.operand(0)?);
            }
            Op::GraphConstantARM => self.graph_constants.push(GraphConstantDeclaration {
                ty: instruction.operand(0)?,
                id: instruction.operand(1)?,
                constant_id: instruction.operand(2)?,
            }),
            _ if op.is_type() => self.type_instruction(op, instruction)?,
            _ if op.is_constant() => self.constant_instruction(op, instruction)?,
            _ => {}
        }
        Ok(())
    }

    fn type_instruction(
        &mut self,
        op: Op,
        instruction: Instruction<'_>,
    ) -> Result<(), ReflectError> {
        if op == Op::TypeForwardPointer {
            return Ok(());
        }
        let id = instruction.operand(0)?;
        let ty = match op {
            Op::TypeBool => Type::Bool,
            Op::TypeInt => Type::Int {
                width: instruction.operand(1)?,
                signed: instruction.operand(2)? != 0,
            },
            Op::TypeFloat => Type::Float {
                width: instruction.operand(1)?,
                encoding: instruction.operand(2).ok(),
            },
            Op::TypeVector => Type::Vector {
                component: instruction.operand(1)?,
                count: instruction.operand(2)?,
            },
            Op::TypeMatrix => Type::Matrix {
                column: instruction.operand(1)?,
                columns: instruction.operand(2)?,
            },
            Op::TypeImage => Type::Image {
                dim: Enumerant::parse(instruction.operand(2)?, Dim::from_u32),
                usage: match instruction.operand(6)? {
                    0 => ImageUsage::Runtime,
                    1 => ImageUsage::Sampled,
                    2 => ImageUsage::Storage,
                    sampled => return Err(ReflectError::ImageSampled { image: id, sampled }),
                },
            },
            Op::TypeSampler => Type::Sampler,
            Op::TypeSampledImage => Type::SampledImage {
                image: instruction.operand(1)?,
            },
            Op::TypeArray => Type::Array {
                element: instruction.operand(1)?,
                length: instruction.operand(2)?,
            },
            Op::TypeRuntimeArray => Type::RuntimeArray {
                element: instruction.operand(1)?,
            },
            Op::TypeStruct => Type::Struct {
                members: instruction.operands_from(1).to_vec(),
            },
            Op::TypePointer => Type::Pointer {
                class: Enumerant::parse(instruction.operand(1)?, StorageClass::from_u32),
                pointee: Some(instruction.operand(2)?),
            },
            Op::TypeUntypedPointerKHR => Type::Pointer {
                class: Enumerant::parse(instruction.operand(1)?, StorageClass::from_u32),
                pointee: None,
            },
            Op::TypeAccelerationStructureKHR => Type::AccelerationStructure,
            Op::TypeTensorARM => Type::Tensor {
                element: instruction.operand(1)?,
                rank: instruction.operand(2).ok(),
                shape: instruction.operand(3).ok(),
            },
            Op::TypeGraphARM => Type::Graph {
                inputs: instruction.operand(1)?,
            },
            _ => Type::Other,
        };
        if self.types.insert(id, ty).is_some() {
            return Err(ReflectError::DuplicateId(id));
        }
        Ok(())
    }

    fn constant_instruction(
        &mut self,
        op: Op,
        instruction: Instruction<'_>,
    ) -> Result<(), ReflectError> {
        let id = instruction.operand(1)?;
        let number = || -> Result<Scalar, ReflectError> {
            let low = u64::from(instruction.operand(2)?);
            let high = u64::from(instruction.operand(3).unwrap_or(0));
            Ok(Scalar::Number {
                ty: instruction.operand(0)?,
                bits: low | (high << 32),
            })
        };
        let constant = match op {
            Op::Constant => Constant::Fixed(number()?),
            Op::SpecConstant => Constant::Specialization(number()?),
            Op::ConstantTrue => Constant::Fixed(Scalar::Bool(true)),
            Op::ConstantFalse => Constant::Fixed(Scalar::Bool(false)),
            Op::SpecConstantTrue => Constant::Specialization(Scalar::Bool(true)),
            Op::SpecConstantFalse => Constant::Specialization(Scalar::Bool(false)),
            Op::ConstantComposite | Op::SpecConstantComposite => Constant::Composite {
                constituents: instruction.operands_from(2).to_vec(),
            },
            _ => Constant::Other,
        };
        if self.constants.insert(id, constant).is_some() {
            return Err(ReflectError::DuplicateId(id));
        }
        Ok(())
    }

    fn resolve(&mut self) {
        for &(group, target) in &self.groups {
            if let Some(decorations) = self.decorations.get(&group).copied() {
                self.decorations
                    .entry(target)
                    .or_default()
                    .merge(&decorations);
            }
        }
        for &(group, target, member) in &self.member_groups {
            if let Some(decorations) = self.decorations.get(&group).copied() {
                self.member_decorations
                    .entry((target, member))
                    .or_default()
                    .merge(&decorations);
            }
        }
    }

    pub(super) fn pointee(&self, variable: &Variable) -> Result<Option<u32>, ReflectError> {
        match self.types.get(&variable.pointer) {
            Some(&Type::Pointer { pointee, .. }) => Ok(variable.data_type.or(pointee)),
            _ => Err(ReflectError::NotAPointer {
                variable: variable.id,
            }),
        }
    }

    pub(super) fn entry_point(&self) -> Result<&EntryPoint, ReflectError> {
        match *self.entry_points.as_slice() {
            [] => Err(ReflectError::NoEntryPoint),
            [ref entry] => Ok(entry),
            _ => Err(ReflectError::MultipleEntryPoints),
        }
    }

    pub(super) fn ty(&self, id: u32) -> Result<&Type, ReflectError> {
        self.types.get(&id).ok_or(ReflectError::UndefinedType(id))
    }

    pub(super) fn decorations(&self, id: u32) -> Decorations {
        self.decorations.get(&id).copied().unwrap_or_default()
    }

    pub(super) fn member_decorations(&self, id: u32, member: u32) -> Decorations {
        self.member_decorations
            .get(&(id, member))
            .copied()
            .unwrap_or_default()
    }

    pub(super) fn name(&self, id: u32) -> Option<String> {
        self.names.get(&id).filter(|name| !name.is_empty()).cloned()
    }

    pub(super) fn member_name(&self, id: u32, member: u32) -> Option<String> {
        self.member_names
            .get(&(id, member))
            .filter(|name| !name.is_empty())
            .cloned()
    }

    pub(super) fn graph_inputs(&self, graph: u32) -> Option<u32> {
        match self.types.get(self.graphs.get(&graph)?) {
            Some(&Type::Graph { inputs }) => Some(inputs),
            _ => None,
        }
    }

    pub(super) fn constant_u32(&self, id: u32) -> Option<u32> {
        self.integer(id).and_then(|value| u32::try_from(value).ok())
    }

    pub(super) fn composite(&self, id: u32) -> Option<&[u32]> {
        match self.constants.get(&id) {
            Some(Constant::Composite { constituents }) => Some(constituents),
            _ => None,
        }
    }

    fn integer(&self, id: u32) -> Option<u64> {
        match *self.constants.get(&id)? {
            Constant::Fixed(Scalar::Number { bits, .. })
            | Constant::Specialization(Scalar::Number { bits, .. }) => Some(bits),
            _ => None,
        }
    }

    pub(super) fn array_length(&self, array: u32, length: u32) -> Result<u32, ReflectError> {
        self.integer(length)
            .and_then(|value| u32::try_from(value).ok())
            .ok_or(ReflectError::ArrayLength { array })
    }

    pub(super) fn scalar_type(&self, id: u32) -> Option<ScalarType> {
        Some(match *self.types.get(&id)? {
            Type::Bool => ScalarType::BOOL,
            Type::Int { width, signed } => ScalarType {
                kind: if signed {
                    ScalarKind::Int
                } else {
                    ScalarKind::Uint
                },
                width,
            },
            Type::Float { width, encoding } => ScalarType {
                kind: encoding.map_or(ScalarKind::Float, ScalarKind::EncodedFloat),
                width,
            },
            _ => return None,
        })
    }

    fn dimension(&self, id: u32) -> Result<WorkgroupDimension, ReflectError> {
        let size = self
            .integer(id)
            .and_then(|value| u32::try_from(value).ok())
            .ok_or(ReflectError::NonConstantWorkgroupSize(id))?;
        let specialized = matches!(self.constants.get(&id), Some(Constant::Specialization(_)));
        Ok(match self.decorations(id).spec_id.filter(|_| specialized) {
            Some(spec_id) => WorkgroupDimension::Specialization {
                id: spec_id,
                default: size,
            },
            None => WorkgroupDimension::Fixed(size),
        })
    }

    pub(super) fn local_size(
        &self,
        entry: &EntryPoint,
    ) -> Result<Option<[WorkgroupDimension; 3]>, ReflectError> {
        let built_in = self.constants.iter().find_map(|(&id, constant)| {
            let Constant::Composite { ref constituents } = *constant else {
                return None;
            };
            self.decorations(id)
                .built_in
                .is_some_and(|built_in| built_in.is(&BuiltIn::WorkgroupSize))
                .then_some((id, constituents))
        });
        let ids = match built_in {
            Some((id, constituents)) => match *constituents.as_slice() {
                [x, y, z] => Some([x, y, z]),
                _ => return Err(ReflectError::NonConstantWorkgroupSize(id)),
            },
            None => self
                .local_size_ids
                .iter()
                .find(|&&(target, _)| target == entry.id)
                .map(|&(_, ids)| ids),
        };
        if let Some([x, y, z]) = ids {
            return Ok(Some([
                self.dimension(x)?,
                self.dimension(y)?,
                self.dimension(z)?,
            ]));
        }
        Ok(self
            .local_sizes
            .iter()
            .find(|&&(target, _)| target == entry.id)
            .map(|&(_, sizes)| sizes.map(WorkgroupDimension::Fixed)))
    }

    pub(super) fn specialization_constants(
        &self,
    ) -> Result<Vec<SpecializationConstant>, ReflectError> {
        let mut constants = Vec::new();
        for (&constant_id, constant) in &self.constants {
            let Constant::Specialization(scalar) = *constant else {
                continue;
            };
            let Some(spec_id) = self.decorations(constant_id).spec_id else {
                continue;
            };
            let (scalar, default) = match scalar {
                Scalar::Bool(value) => (ScalarType::BOOL, ScalarValue::Bool(value)),
                Scalar::Number { ty, bits } => {
                    let scalar = self
                        .scalar_type(ty)
                        .ok_or(ReflectError::SpecializationType(constant_id))?;
                    (scalar, decode_default(scalar, bits))
                }
            };
            constants.push(SpecializationConstant {
                spec_id,
                name: self.name(constant_id),
                result_id: constant_id,
                scalar,
                default,
            });
        }
        constants.sort_by_key(|constant| (constant.spec_id, constant.result_id));
        Ok(constants)
    }
}

fn decode_default(scalar: ScalarType, bits: u64) -> ScalarValue {
    let width = if scalar.width == 0 || scalar.width > 64 {
        64
    } else {
        scalar.width
    };
    let unused = 64 - width;
    let raw = bits & (u64::MAX >> unused);
    match scalar.kind {
        ScalarKind::Bool => ScalarValue::Bool(raw != 0),
        ScalarKind::Int => ScalarValue::Int((raw << unused).cast_signed() >> unused),
        ScalarKind::Uint => ScalarValue::Uint(raw),
        ScalarKind::Float | ScalarKind::EncodedFloat(_) => ScalarValue::FloatBits(raw),
    }
}
