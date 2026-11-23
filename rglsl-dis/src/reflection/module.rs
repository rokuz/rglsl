use std::collections::BTreeMap;

use rglsl_types::ShaderStage;
use spirv::{BuiltIn, Decoration, ExecutionMode, ExecutionModel, Op, StorageClass};

use super::{
    ReflectError, ScalarKind, ScalarType, ScalarValue, SpecializationConstant, WorkgroupDimension,
};
use crate::string::decode_string;

const MAGIC: u32 = 0x0723_0203;
const HEADER_WORDS: usize = 5;

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) enum Type {
    Bool,
    Int { width: u32, signed: bool },
    Float { width: u32, encoding: Option<u32> },
    Vector { component: u32, count: u32 },
    Matrix { column: u32, columns: u32 },
    Image { dim: u32, sampled: u32 },
    Sampler,
    SampledImage { image: u32 },
    Array { element: u32, length: u32 },
    RuntimeArray { element: u32 },
    Struct { members: Vec<u32> },
    Pointer { class: u32, pointee: Option<u32> },
    AccelerationStructure,
    Tensor,
    Other,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) enum Constant {
    Scalar {
        ty: u32,
        words: Vec<u32>,
        spec: bool,
    },
    Bool {
        value: bool,
        spec: bool,
    },
    Composite {
        constituents: Vec<u32>,
    },
    Other,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
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
    pub(super) built_in: Option<u32>,
    pub(super) block: bool,
    pub(super) buffer_block: bool,
    pub(super) row_major: bool,
    pub(super) patch: bool,
    pub(super) per_vertex: bool,
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
            Decoration::BuiltIn => self.built_in = Some(operand(0)?),
            Decoration::Block => self.block = true,
            Decoration::BufferBlock => self.buffer_block = true,
            Decoration::RowMajor => self.row_major = true,
            Decoration::ColMajor => self.row_major = false,
            Decoration::Patch => self.patch = true,
            Decoration::PerVertexKHR => self.per_vertex = true,
            _ => {}
        }
        Ok(())
    }

    fn merge(&mut self, group: &Self) {
        let options = [
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
            (&mut self.built_in, group.built_in),
        ];
        for (own, from_group) in options {
            if from_group.is_some() {
                *own = from_group;
            }
        }
        self.block |= group.block;
        self.buffer_block |= group.buffer_block;
        self.row_major |= group.row_major;
        self.patch |= group.patch;
        self.per_vertex |= group.per_vertex;
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) struct Variable {
    pub(super) id: u32,
    pub(super) class: u32,
    pointer: u32,
    data_type: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(super) struct EntryPoint {
    pub(super) id: u32,
    pub(super) stage: ShaderStage,
    pub(super) name: String,
}

#[derive(Debug, Default)]
pub(super) struct Module {
    pub(super) types: BTreeMap<u32, Type>,
    pub(super) constants: BTreeMap<u32, Constant>,
    decorations: BTreeMap<u32, Decorations>,
    member_decorations: BTreeMap<(u32, u32), Decorations>,
    names: BTreeMap<u32, String>,
    member_names: BTreeMap<(u32, u32), String>,
    pub(super) variables: Vec<Variable>,
    entry_points: Vec<EntryPoint>,
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
    fn operand(self, index: usize) -> Result<u32, ReflectError> {
        index
            .checked_add(1)
            .and_then(|index| self.words.get(index))
            .copied()
            .ok_or(ReflectError::MissingOperand {
                offset: self.offset,
                opcode: self.opcode,
            })
    }

    fn operands_from(self, index: usize) -> &'w [u32] {
        index
            .checked_add(1)
            .and_then(|index| self.words.get(index..))
            .unwrap_or_default()
    }

    fn string(self, index: usize) -> Result<(String, usize), ReflectError> {
        let words = self.operands_from(index);
        let bytes = decode_string(words);
        let used = bytes.len() / 4 + 1;
        if used > words.len() {
            return Err(ReflectError::UnterminatedString {
                offset: self.offset,
                opcode: self.opcode,
            });
        }
        Ok((String::from_utf8_lossy(&bytes).into_owned(), index + used))
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

fn three(instruction: Instruction<'_>, first: usize) -> Result<[u32; 3], ReflectError> {
    Ok([
        instruction.operand(first)?,
        instruction.operand(first + 1)?,
        instruction.operand(first + 2)?,
    ])
}

impl Module {
    pub(super) fn parse(words: &[u32]) -> Result<Self, ReflectError> {
        if words.len() < HEADER_WORDS {
            return Err(ReflectError::Header { words: words.len() });
        }
        match words.first() {
            Some(&MAGIC) => {}
            Some(&magic) => return Err(ReflectError::Magic(magic)),
            None => return Err(ReflectError::Header { words: 0 }),
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
        module.resolve()?;
        Ok(module)
    }

    fn instruction(&mut self, instruction: Instruction<'_>) -> Result<(), ReflectError> {
        let Some(op) = Op::from_u32(instruction.opcode) else {
            return Ok(());
        };
        match op {
            Op::Name => {
                let (name, _) = instruction.string(1)?;
                self.names.insert(instruction.operand(0)?, name);
            }
            Op::MemberName => {
                let (name, _) = instruction.string(2)?;
                self.member_names
                    .insert((instruction.operand(0)?, instruction.operand(1)?), name);
            }
            Op::EntryPoint => {
                let model = instruction.operand(0)?;
                let stage = ExecutionModel::from_u32(model)
                    .and_then(stage)
                    .ok_or(ReflectError::ExecutionModel(model))?;
                let id = instruction.operand(1)?;
                let (name, _) = instruction.string(2)?;
                self.entry_points.push(EntryPoint { id, stage, name });
            }
            Op::ExecutionMode | Op::ExecutionModeId => {
                let entry = instruction.operand(0)?;
                let mode = instruction.operand(1)?;
                if op == Op::ExecutionMode && mode == ExecutionMode::LocalSize as u32 {
                    self.local_sizes.push((entry, three(instruction, 2)?));
                } else if op == Op::ExecutionModeId && mode == ExecutionMode::LocalSizeId as u32 {
                    self.local_size_ids.push((entry, three(instruction, 2)?));
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
                    return Err(ReflectError::MissingOperand {
                        offset: instruction.offset,
                        opcode: instruction.opcode,
                    });
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
                let class = instruction.operand(2)?;
                if class != StorageClass::Function as u32 {
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
                dim: instruction.operand(2)?,
                sampled: instruction.operand(6)?,
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
                class: instruction.operand(1)?,
                pointee: Some(instruction.operand(2)?),
            },
            Op::TypeUntypedPointerKHR => Type::Pointer {
                class: instruction.operand(1)?,
                pointee: None,
            },
            Op::TypeAccelerationStructureKHR => Type::AccelerationStructure,
            Op::TypeTensorARM => Type::Tensor,
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
        let constant = match op {
            Op::Constant | Op::SpecConstant => Constant::Scalar {
                ty: instruction.operand(0)?,
                words: instruction.operands_from(2).to_vec(),
                spec: op == Op::SpecConstant,
            },
            Op::ConstantTrue | Op::ConstantFalse | Op::SpecConstantTrue | Op::SpecConstantFalse => {
                Constant::Bool {
                    value: matches!(op, Op::ConstantTrue | Op::SpecConstantTrue),
                    spec: matches!(op, Op::SpecConstantTrue | Op::SpecConstantFalse),
                }
            }
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

    fn resolve(&mut self) -> Result<(), ReflectError> {
        for &(group, target) in &self.groups {
            if let Some(decorations) = self.decorations.get(&group).cloned() {
                self.decorations
                    .entry(target)
                    .or_default()
                    .merge(&decorations);
            }
        }
        for &(group, target, member) in &self.member_groups {
            if let Some(decorations) = self.decorations.get(&group).cloned() {
                self.member_decorations
                    .entry((target, member))
                    .or_default()
                    .merge(&decorations);
            }
        }
        Ok(())
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
        self.decorations.get(&id).cloned().unwrap_or_default()
    }

    pub(super) fn member_decorations(&self, id: u32, member: u32) -> Decorations {
        self.member_decorations
            .get(&(id, member))
            .cloned()
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

    fn integer(&self, id: u32) -> Option<(u64, bool)> {
        let Some(&Constant::Scalar {
            ref words, spec, ..
        }) = self.constants.get(&id)
        else {
            return None;
        };
        let low = u64::from(words.first().copied().unwrap_or(0));
        let high = u64::from(words.get(1).copied().unwrap_or(0));
        Some((low | (high << 32), spec))
    }

    pub(super) fn array_length(&self, array: u32, length: u32) -> Result<u32, ReflectError> {
        self.integer(length)
            .and_then(|(value, _)| u32::try_from(value).ok())
            .ok_or(ReflectError::ArrayLength { array })
    }

    pub(super) fn scalar_type(&self, id: u32) -> Option<ScalarType> {
        Some(match *self.types.get(&id)? {
            Type::Bool => ScalarType {
                kind: ScalarKind::Bool,
                width: 32,
            },
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
        let (value, spec) = self
            .integer(id)
            .ok_or(ReflectError::NonConstantWorkgroupSize(id))?;
        let size = u32::try_from(value).map_err(|_| ReflectError::NonConstantWorkgroupSize(id))?;
        Ok(match self.decorations(id).spec_id.filter(|_| spec) {
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
            (self.decorations(id).built_in == Some(BuiltIn::WorkgroupSize as u32))
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
            let Some(id) = self.decorations(constant_id).spec_id else {
                continue;
            };
            let (scalar, default) = match *constant {
                Constant::Bool { value, spec: true } => (
                    ScalarType {
                        kind: ScalarKind::Bool,
                        width: 32,
                    },
                    ScalarValue::Bool(value),
                ),
                Constant::Scalar { ty, spec: true, .. } => {
                    let scalar = self
                        .scalar_type(ty)
                        .ok_or(ReflectError::SpecializationType(constant_id))?;
                    let (bits, _) = self
                        .integer(constant_id)
                        .ok_or(ReflectError::SpecializationType(constant_id))?;
                    (scalar, value(scalar, bits))
                }
                _ => continue,
            };
            constants.push(SpecializationConstant {
                id,
                name: self.name(constant_id),
                constant_id,
                scalar,
                default,
            });
        }
        constants.sort_by_key(|constant| (constant.id, constant.constant_id));
        Ok(constants)
    }
}

fn value(scalar: ScalarType, bits: u64) -> ScalarValue {
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
        ScalarKind::Float | ScalarKind::EncodedFloat(_) => ScalarValue::Float(raw),
    }
}
