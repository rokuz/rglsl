use std::collections::{BTreeMap, BTreeSet};

use rspirv::dr::{Instruction, Module, Operand};
use spirv::{
    BuiltIn, Capability, Decoration, Dim, ExecutionMode, ExecutionModel, Op, StorageClass,
};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum ScalarKind {
    Bool,
    Sint,
    Uint,
    Float,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub struct Scalar {
    pub kind: ScalarKind,
    pub width: u32,
}

impl Scalar {
    pub const fn bytes(self) -> u32 {
        match self.kind {
            ScalarKind::Bool => 4,
            _ => self.width / 8,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Layout {
    Scalar(Scalar),
    Vector {
        scalar: Scalar,
        count: u32,
    },
    Matrix {
        scalar: Scalar,
        columns: u32,
        rows: u32,
        stride: u32,
        row_major: bool,
    },
    Array {
        element: Box<Layout>,
        length: Option<u32>,
        stride: u32,
    },
    Struct {
        members: Vec<(u32, Layout)>,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Slot {
    pub offset: u32,
    pub scalar: Scalar,
}

impl Layout {
    pub fn size(&self, runtime_length: u32) -> u32 {
        match self {
            Self::Scalar(scalar) => scalar.bytes(),
            Self::Vector { scalar, count } => scalar.bytes() * count,
            Self::Matrix {
                scalar,
                columns,
                rows,
                stride,
                row_major,
            } => {
                let (major, minor) = if *row_major {
                    (*rows, *columns)
                } else {
                    (*columns, *rows)
                };
                stride * major.saturating_sub(1) + scalar.bytes() * minor
            }
            Self::Array {
                element,
                length,
                stride,
            } => {
                let length = length.unwrap_or(runtime_length);
                if length == 0 {
                    return 0;
                }
                stride * (length - 1) + element.size(runtime_length).max(*stride)
            }
            Self::Struct { members } => members
                .iter()
                .map(|(offset, member)| offset + member.size(runtime_length))
                .max()
                .unwrap_or(0),
        }
    }

    pub fn has_runtime_array(&self) -> bool {
        match self {
            Self::Array { length: None, .. } => true,
            Self::Array { element, .. } => element.has_runtime_array(),
            Self::Struct { members } => members.iter().any(|(_, m)| m.has_runtime_array()),
            _ => false,
        }
    }

    pub fn runtime_stride(&self) -> u32 {
        match self {
            Self::Array {
                length: None,
                stride,
                ..
            } => *stride,
            Self::Array { element, .. } => element.runtime_stride(),
            Self::Struct { members } => members
                .iter()
                .map(|(_, m)| m.runtime_stride())
                .max()
                .unwrap_or(0),
            _ => 0,
        }
    }

    pub fn slots(&self, base: u32, runtime_length: u32, out: &mut Vec<Slot>) {
        match self {
            Self::Scalar(scalar) => out.push(Slot {
                offset: base,
                scalar: *scalar,
            }),
            Self::Vector { scalar, count } => {
                for i in 0..*count {
                    out.push(Slot {
                        offset: base + i * scalar.bytes(),
                        scalar: *scalar,
                    });
                }
            }
            Self::Matrix {
                scalar,
                columns,
                rows,
                stride,
                row_major,
            } => {
                for column in 0..*columns {
                    for row in 0..*rows {
                        let offset = if *row_major {
                            row * stride + column * scalar.bytes()
                        } else {
                            column * stride + row * scalar.bytes()
                        };
                        out.push(Slot {
                            offset: base + offset,
                            scalar: *scalar,
                        });
                    }
                }
            }
            Self::Array {
                element,
                length,
                stride,
            } => {
                for i in 0..length.unwrap_or(runtime_length) {
                    element.slots(base + i * stride, runtime_length, out);
                }
            }
            Self::Struct { members } => {
                for (offset, member) in members {
                    member.slots(base + offset, runtime_length, out);
                }
            }
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ImageType {
    pub dim: Dim,
    pub depth: bool,
    pub arrayed: bool,
    pub multisampled: bool,
    pub sampled: u32,
    pub format: spirv::ImageFormat,
    pub scalar: Scalar,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ResourceKind {
    UniformBuffer(Layout),
    StorageBuffer { layout: Layout, writable: bool },
    StorageImage(ImageType),
    SampledImage(ImageType),
    CombinedImageSampler(ImageType),
    Sampler,
    UniformTexelBuffer(ImageType),
    StorageTexelBuffer(ImageType),
    Unsupported(String),
}

impl ResourceKind {
    pub fn describe(&self) -> &'static str {
        match self {
            Self::UniformBuffer(_) => "uniform buffer",
            Self::StorageBuffer { .. } => "storage buffer",
            Self::StorageImage(_) => "storage image",
            Self::SampledImage(_) => "sampled image",
            Self::CombinedImageSampler(_) => "combined image sampler",
            Self::Sampler => "sampler",
            Self::UniformTexelBuffer(_) => "uniform texel buffer",
            Self::StorageTexelBuffer(_) => "storage texel buffer",
            Self::Unsupported(_) => "unsupported resource",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Resource {
    pub set: u32,
    pub binding: u32,
    pub count: Option<u32>,
    pub kind: ResourceKind,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Interpolation {
    Smooth,
    Flat,
    NoPerspective,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum VaryingType {
    Simple { scalar: Scalar, count: u32 },
    Unsupported(String),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Varying {
    pub location: u32,
    pub component: u32,
    pub ty: VaryingType,
    pub array: Option<u32>,
    pub interpolation: Interpolation,
    pub centroid: bool,
    pub sample: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Reflection {
    pub model: ExecutionModel,
    pub entry: String,
    pub local_size: [u32; 3],
    pub resources: Vec<Resource>,
    pub push_constants: Option<Layout>,
    pub inputs: Vec<Varying>,
    pub outputs: Vec<Varying>,
    pub input_builtins: BTreeSet<BuiltIn>,
    pub output_builtins: BTreeSet<BuiltIn>,
    pub capabilities: BTreeSet<Capability>,
    pub extensions: BTreeSet<String>,
    pub problems: Vec<String>,
}

#[derive(Default)]
struct Decorations {
    by_id: BTreeMap<u32, Vec<(Decoration, Vec<u32>)>>,
    builtins: BTreeMap<u32, BuiltIn>,
    member: BTreeMap<(u32, u32), Vec<(Decoration, Vec<u32>)>>,
    member_builtins: BTreeSet<u32>,
}

impl Decorations {
    fn has(&self, id: u32, decoration: Decoration) -> bool {
        self.by_id
            .get(&id)
            .is_some_and(|list| list.iter().any(|(d, _)| *d == decoration))
    }

    fn value(&self, id: u32, decoration: Decoration) -> Option<u32> {
        self.by_id.get(&id).and_then(|list| {
            list.iter()
                .find(|(d, _)| *d == decoration)
                .and_then(|(_, values)| values.first().copied())
        })
    }

    fn member_has(&self, id: u32, member: u32, decoration: Decoration) -> bool {
        self.member
            .get(&(id, member))
            .is_some_and(|list| list.iter().any(|(d, _)| *d == decoration))
    }

    fn member_value(&self, id: u32, member: u32, decoration: Decoration) -> Option<u32> {
        self.member.get(&(id, member)).and_then(|list| {
            list.iter()
                .find(|(d, _)| *d == decoration)
                .and_then(|(_, values)| values.first().copied())
        })
    }
}

fn literals(operands: &[Operand]) -> Vec<u32> {
    operands
        .iter()
        .filter_map(|operand| match operand {
            Operand::LiteralBit32(value) => Some(*value),
            _ => None,
        })
        .collect()
}

fn id_operand(instruction: &Instruction, index: usize) -> Option<u32> {
    match instruction.operands.get(index) {
        Some(Operand::IdRef(id)) => Some(*id),
        _ => None,
    }
}

fn literal_operand(instruction: &Instruction, index: usize) -> Option<u32> {
    match instruction.operands.get(index) {
        Some(Operand::LiteralBit32(value)) => Some(*value),
        _ => None,
    }
}

fn opcode(instruction: &Instruction) -> Op {
    instruction.class.opcode
}

struct Types<'a> {
    defs: BTreeMap<u32, &'a Instruction>,
    decorations: &'a Decorations,
}

impl Types<'_> {
    fn get(&self, id: u32) -> Option<&Instruction> {
        self.defs.get(&id).copied()
    }

    fn constant_u32(&self, id: u32) -> Option<u32> {
        let instruction = self.get(id)?;
        match opcode(instruction) {
            Op::Constant | Op::SpecConstant => match instruction.operands.first() {
                Some(Operand::LiteralBit32(value)) => Some(*value),
                Some(Operand::LiteralBit64(value)) => u32::try_from(*value).ok(),
                _ => None,
            },
            _ => None,
        }
    }

    fn scalar(&self, id: u32) -> Option<Scalar> {
        let instruction = self.get(id)?;
        match opcode(instruction) {
            Op::TypeBool => Some(Scalar {
                kind: ScalarKind::Bool,
                width: 32,
            }),
            Op::TypeInt => {
                let width = literal_operand(instruction, 0)?;
                let signed = literal_operand(instruction, 1)? != 0;
                Some(Scalar {
                    kind: if signed {
                        ScalarKind::Sint
                    } else {
                        ScalarKind::Uint
                    },
                    width,
                })
            }
            Op::TypeFloat => {
                if instruction.operands.len() > 1 {
                    return None;
                }
                Some(Scalar {
                    kind: ScalarKind::Float,
                    width: literal_operand(instruction, 0)?,
                })
            }
            _ => None,
        }
    }

    fn layout(&self, id: u32, matrix: Option<(u32, bool)>, depth: u32) -> Result<Layout, String> {
        if depth > 32 {
            return Err("type nesting too deep".into());
        }
        let instruction = self.get(id).ok_or_else(|| format!("unknown type %{id}"))?;
        match opcode(instruction) {
            Op::TypeBool | Op::TypeInt | Op::TypeFloat => self
                .scalar(id)
                .map(Layout::Scalar)
                .ok_or_else(|| "unsupported scalar type".to_string()),
            Op::TypeVector => {
                let component = id_operand(instruction, 0).ok_or("bad vector type")?;
                let count = literal_operand(instruction, 1).ok_or("bad vector type")?;
                let scalar = self
                    .scalar(component)
                    .ok_or_else(|| "unsupported vector component".to_string())?;
                Ok(Layout::Vector { scalar, count })
            }
            Op::TypeMatrix => {
                let column = id_operand(instruction, 0).ok_or("bad matrix type")?;
                let columns = literal_operand(instruction, 1).ok_or("bad matrix type")?;
                let Layout::Vector { scalar, count } = self.layout(column, None, depth + 1)? else {
                    return Err("bad matrix column type".into());
                };
                let (stride, row_major) =
                    matrix.ok_or_else(|| "matrix without a MatrixStride".to_string())?;
                Ok(Layout::Matrix {
                    scalar,
                    columns,
                    rows: count,
                    stride,
                    row_major,
                })
            }
            Op::TypeArray | Op::TypeRuntimeArray => {
                let element = id_operand(instruction, 0).ok_or("bad array type")?;
                let length = if opcode(instruction) == Op::TypeArray {
                    let length_id = id_operand(instruction, 1).ok_or("bad array type")?;
                    Some(
                        self.constant_u32(length_id)
                            .ok_or_else(|| "array length is not a constant".to_string())?,
                    )
                } else {
                    None
                };
                let stride = self
                    .decorations
                    .value(id, Decoration::ArrayStride)
                    .ok_or_else(|| "array without an ArrayStride".to_string())?;
                Ok(Layout::Array {
                    element: Box::new(self.layout(element, matrix, depth + 1)?),
                    length,
                    stride,
                })
            }
            Op::TypeStruct => {
                let mut members = Vec::new();
                for (index, operand) in instruction.operands.iter().enumerate() {
                    let Operand::IdRef(member) = operand else {
                        return Err("bad struct type".into());
                    };
                    let index = u32::try_from(index).map_err(|_| "struct too large")?;
                    let offset = self
                        .decorations
                        .member_value(id, index, Decoration::Offset)
                        .ok_or_else(|| "struct member without an Offset".to_string())?;
                    let matrix = self
                        .decorations
                        .member_value(id, index, Decoration::MatrixStride)
                        .map(|stride| {
                            (
                                stride,
                                self.decorations.member_has(id, index, Decoration::RowMajor),
                            )
                        });
                    members.push((offset, self.layout(*member, matrix, depth + 1)?));
                }
                Ok(Layout::Struct { members })
            }
            Op::TypePointer | Op::TypeForwardPointer => {
                Err("pointers in buffers (buffer device address)".into())
            }
            other => Err(format!("unsupported type {other:?} in a buffer")),
        }
    }

    fn image(&self, id: u32) -> Result<ImageType, String> {
        let instruction = self.get(id).ok_or("unknown image type")?;
        if opcode(instruction) != Op::TypeImage {
            return Err("not an image type".into());
        }
        let sampled_type = id_operand(instruction, 0).ok_or("bad image type")?;
        let dim = match instruction.operands.get(1) {
            Some(Operand::Dim(dim)) => *dim,
            _ => return Err("bad image type".into()),
        };
        let depth = literal_operand(instruction, 2).ok_or("bad image type")? == 1;
        let arrayed = literal_operand(instruction, 3).ok_or("bad image type")? != 0;
        let multisampled = literal_operand(instruction, 4).ok_or("bad image type")? != 0;
        let sampled = literal_operand(instruction, 5).ok_or("bad image type")?;
        let format = match instruction.operands.get(6) {
            Some(Operand::ImageFormat(format)) => *format,
            _ => return Err("bad image type".into()),
        };
        let scalar = self
            .scalar(sampled_type)
            .ok_or_else(|| "unsupported image sampled type".to_string())?;
        Ok(ImageType {
            dim,
            depth,
            arrayed,
            multisampled,
            sampled,
            format,
            scalar,
        })
    }

    fn varying_type(&self, id: u32) -> VaryingType {
        let Some(instruction) = self.get(id) else {
            return VaryingType::Unsupported("unknown type".into());
        };
        match opcode(instruction) {
            Op::TypeBool | Op::TypeInt | Op::TypeFloat => match self.scalar(id) {
                Some(scalar) if scalar.kind != ScalarKind::Bool => {
                    VaryingType::Simple { scalar, count: 1 }
                }
                _ => VaryingType::Unsupported("boolean varying".into()),
            },
            Op::TypeVector => {
                let component = id_operand(instruction, 0).and_then(|c| self.scalar(c));
                match (component, literal_operand(instruction, 1)) {
                    (Some(scalar), Some(count)) if scalar.kind != ScalarKind::Bool => {
                        VaryingType::Simple { scalar, count }
                    }
                    _ => VaryingType::Unsupported("unsupported vector varying".into()),
                }
            }
            Op::TypeMatrix => VaryingType::Unsupported("matrix varying".into()),
            Op::TypeArray | Op::TypeRuntimeArray => {
                VaryingType::Unsupported("array varying".into())
            }
            Op::TypeStruct => VaryingType::Unsupported("block or struct varying".into()),
            other => VaryingType::Unsupported(format!("{other:?} varying")),
        }
    }
}

pub fn reflect_words(words: &[u32]) -> Result<Reflection, String> {
    let module = rspirv::dr::load_words(words).map_err(|error| {
        let text = error.to_string();
        let text = match text.find("opname: ") {
            Some(start) => text
                .get(start..)
                .and_then(|rest| rest.split(',').next())
                .unwrap_or_default()
                .to_string(),
            None => text,
        };
        format!(
            "rspirv cannot load the module: {}",
            text.chars().take(120).collect::<String>()
        )
    })?;
    reflect(&module)
}

pub fn reflect_bytes(bytes: &[u8]) -> Result<Reflection, String> {
    if bytes.len() % 4 != 0 {
        return Err("SPIR-V size is not a multiple of 4".into());
    }
    let words: Vec<u32> = bytes
        .chunks_exact(4)
        .map(|chunk| u32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
        .collect();
    reflect_words(&words)
}

fn collect_decorations(module: &Module) -> Decorations {
    let mut decorations = Decorations::default();
    for annotation in &module.annotations {
        match opcode(annotation) {
            Op::Decorate | Op::DecorateId => {
                let Some(target) = id_operand(annotation, 0) else {
                    continue;
                };
                match annotation.operands.get(1) {
                    Some(Operand::Decoration(Decoration::BuiltIn)) => {
                        if let Some(Operand::BuiltIn(builtin)) = annotation.operands.get(2) {
                            decorations.builtins.insert(target, *builtin);
                        }
                    }
                    Some(Operand::Decoration(decoration)) => decorations
                        .by_id
                        .entry(target)
                        .or_default()
                        .push((*decoration, literals(&annotation.operands[2..]))),
                    _ => {}
                }
            }
            Op::MemberDecorate => {
                let (Some(target), Some(member)) =
                    (id_operand(annotation, 0), literal_operand(annotation, 1))
                else {
                    continue;
                };
                match annotation.operands.get(2) {
                    Some(Operand::Decoration(Decoration::BuiltIn)) => {
                        decorations.member_builtins.insert(target);
                    }
                    Some(Operand::Decoration(decoration)) => decorations
                        .member
                        .entry((target, member))
                        .or_default()
                        .push((*decoration, literals(&annotation.operands[3..]))),
                    _ => {}
                }
            }
            _ => {}
        }
    }
    decorations
}

fn local_size(module: &Module, types: &Types, entry: u32) -> [u32; 3] {
    for instruction in &module.types_global_values {
        let Some(id) = instruction.result_id else {
            continue;
        };
        if types.decorations.builtins.get(&id) == Some(&BuiltIn::WorkgroupSize) {
            let components: Vec<u32> = instruction
                .operands
                .iter()
                .filter_map(|operand| match operand {
                    Operand::IdRef(id) => types.constant_u32(*id),
                    _ => None,
                })
                .collect();
            if let [x, y, z] = components.as_slice() {
                return [*x, *y, *z];
            }
        }
    }
    for mode in &module.execution_modes {
        if id_operand(mode, 0) != Some(entry) {
            continue;
        }
        match (opcode(mode), mode.operands.get(1)) {
            (Op::ExecutionMode, Some(Operand::ExecutionMode(ExecutionMode::LocalSize))) => {
                if let [x, y, z] = literals(&mode.operands[2..]).as_slice() {
                    return [*x, *y, *z];
                }
            }
            (Op::ExecutionModeId, Some(Operand::ExecutionMode(ExecutionMode::LocalSizeId))) => {
                let ids: Vec<u32> = mode.operands[2..]
                    .iter()
                    .filter_map(|operand| match operand {
                        Operand::IdRef(id) => types.constant_u32(*id),
                        _ => None,
                    })
                    .collect();
                if let [x, y, z] = ids.as_slice() {
                    return [*x, *y, *z];
                }
            }
            _ => {}
        }
    }
    [1, 1, 1]
}

fn member_interpolation(
    decorations: &Decorations,
    structure: u32,
    member: u32,
    variable: Interpolation,
) -> Interpolation {
    if decorations.member_has(structure, member, Decoration::Flat) {
        Interpolation::Flat
    } else if decorations.member_has(structure, member, Decoration::NoPerspective) {
        Interpolation::NoPerspective
    } else {
        variable
    }
}

fn varyings(types: &Types, id: u32, pointee: u32) -> Result<Vec<Varying>, String> {
    let decorations = types.decorations;
    let location = decorations.value(id, Decoration::Location);
    let base = Varying {
        location: location.unwrap_or(0),
        component: decorations.value(id, Decoration::Component).unwrap_or(0),
        ty: VaryingType::Unsupported(String::new()),
        array: None,
        interpolation: interpolation(decorations, id),
        centroid: decorations.has(id, Decoration::Centroid),
        sample: decorations.has(id, Decoration::Sample),
    };
    let Some(instruction) = types.get(pointee) else {
        return Err("interface variable of an unknown type".into());
    };
    match opcode(instruction) {
        Op::TypeStruct => {
            let mut next = location;
            let mut broken: Option<String> = None;
            let mut result = Vec::new();
            for (index, operand) in instruction.operands.iter().enumerate() {
                let Operand::IdRef(member) = operand else {
                    return Err("bad struct type".into());
                };
                let index = u32::try_from(index).map_err(|_| "struct too large")?;
                let location = decorations
                    .member_value(pointee, index, Decoration::Location)
                    .or(next)
                    .ok_or_else(|| "interface block member without a location".to_string())?;
                let ty = match &broken {
                    Some(reason) => VaryingType::Unsupported(reason.clone()),
                    None => types.varying_type(*member),
                };
                if let VaryingType::Unsupported(reason) = &ty {
                    broken.get_or_insert_with(|| format!("after a member that is a {reason}"));
                }
                result.push(Varying {
                    location,
                    component: decorations
                        .member_value(pointee, index, Decoration::Component)
                        .unwrap_or(0),
                    ty,
                    interpolation: member_interpolation(
                        decorations,
                        pointee,
                        index,
                        base.interpolation,
                    ),
                    centroid: base.centroid
                        || decorations.member_has(pointee, index, Decoration::Centroid),
                    sample: base.sample
                        || decorations.member_has(pointee, index, Decoration::Sample),
                    ..base.clone()
                });
                next = Some(location + 1);
            }
            Ok(result)
        }
        Op::TypeArray => {
            let location = location.ok_or("interface variable without a location")?;
            let length = id_operand(instruction, 1).and_then(|l| types.constant_u32(l));
            let element = id_operand(instruction, 0);
            let ty = match (element.map(|e| types.varying_type(e)), length) {
                (Some(VaryingType::Simple { scalar, count }), Some(_)) => {
                    VaryingType::Simple { scalar, count }
                }
                _ => VaryingType::Unsupported("array of non-vector varyings".into()),
            };
            Ok(vec![Varying {
                location,
                ty,
                array: length,
                ..base
            }])
        }
        _ => Ok(vec![Varying {
            location: location.ok_or("interface variable without a location")?,
            ty: types.varying_type(pointee),
            ..base
        }]),
    }
}

fn interpolation(decorations: &Decorations, id: u32) -> Interpolation {
    if decorations.has(id, Decoration::Flat) {
        Interpolation::Flat
    } else if decorations.has(id, Decoration::NoPerspective) {
        Interpolation::NoPerspective
    } else {
        Interpolation::Smooth
    }
}

pub fn reflect(module: &Module) -> Result<Reflection, String> {
    let decorations = collect_decorations(module);
    let defs: BTreeMap<u32, &Instruction> = module
        .types_global_values
        .iter()
        .filter_map(|instruction| instruction.result_id.map(|id| (id, instruction)))
        .collect();
    let types = Types {
        defs,
        decorations: &decorations,
    };

    let entry_point = match module.entry_points.as_slice() {
        [entry] => entry,
        [] => return Err("no entry point".into()),
        _ => return Err("several entry points".into()),
    };
    let model = match entry_point.operands.first() {
        Some(Operand::ExecutionModel(model)) => *model,
        _ => return Err("bad OpEntryPoint".into()),
    };
    let entry_id = id_operand(entry_point, 1).ok_or("bad OpEntryPoint")?;
    let entry = match entry_point.operands.get(2) {
        Some(Operand::LiteralString(name)) => name.clone(),
        _ => return Err("bad OpEntryPoint".into()),
    };

    let mut reflection = Reflection {
        model,
        entry,
        local_size: local_size(module, &types, entry_id),
        resources: Vec::new(),
        push_constants: None,
        inputs: Vec::new(),
        outputs: Vec::new(),
        input_builtins: BTreeSet::new(),
        output_builtins: BTreeSet::new(),
        capabilities: module
            .capabilities
            .iter()
            .filter_map(|instruction| match instruction.operands.first() {
                Some(Operand::Capability(capability)) => Some(*capability),
                _ => None,
            })
            .collect(),
        extensions: module
            .extensions
            .iter()
            .filter_map(|instruction| match instruction.operands.first() {
                Some(Operand::LiteralString(name)) => Some(name.clone()),
                _ => None,
            })
            .collect(),
        problems: Vec::new(),
    };

    for instruction in &module.types_global_values {
        if opcode(instruction) != Op::Variable {
            continue;
        }
        let (Some(id), Some(pointer)) = (instruction.result_id, instruction.result_type) else {
            continue;
        };
        let Some(Operand::StorageClass(class)) = instruction.operands.first() else {
            continue;
        };
        let pointee = types
            .get(pointer)
            .and_then(|p| id_operand(p, 1))
            .ok_or("variable without a pointer type")?;
        match class {
            StorageClass::Input | StorageClass::Output => {
                let output = *class == StorageClass::Output;
                if let Some(builtin) = decorations.builtins.get(&id) {
                    if output {
                        reflection.output_builtins.insert(*builtin);
                    } else {
                        reflection.input_builtins.insert(*builtin);
                    }
                    continue;
                }
                if decorations.member_builtins.contains(&pointee) {
                    continue;
                }
                let varyings = match varyings(&types, id, pointee) {
                    Ok(varyings) => varyings,
                    Err(problem) => {
                        reflection.problems.push(problem);
                        continue;
                    }
                };
                if output {
                    reflection.outputs.extend(varyings);
                } else {
                    reflection.inputs.extend(varyings);
                }
            }
            StorageClass::PushConstant => match types.layout(pointee, None, 0) {
                Ok(layout) => reflection.push_constants = Some(layout),
                Err(error) => reflection.problems.push(format!("push constants: {error}")),
            },
            StorageClass::Uniform | StorageClass::StorageBuffer | StorageClass::UniformConstant => {
                let set = decorations
                    .value(id, Decoration::DescriptorSet)
                    .unwrap_or(0);
                let Some(binding) = decorations.value(id, Decoration::Binding) else {
                    reflection
                        .problems
                        .push("resource without a binding".into());
                    continue;
                };
                let (count, element) = match types.get(pointee) {
                    Some(array) if opcode(array) == Op::TypeArray => {
                        match id_operand(array, 1).and_then(|length| types.constant_u32(length)) {
                            Some(length) => (Some(length), id_operand(array, 0)),
                            None => (None, None),
                        }
                    }
                    Some(array) if opcode(array) == Op::TypeRuntimeArray => (None, None),
                    _ => (None, Some(pointee)),
                };
                let kind = match element {
                    Some(element) if count != Some(0) => resource_kind(&types, *class, id, element),
                    _ => ResourceKind::Unsupported("runtime arrays of descriptors".into()),
                };
                reflection.resources.push(Resource {
                    set,
                    binding,
                    count,
                    kind,
                });
            }
            StorageClass::PhysicalStorageBuffer => reflection
                .problems
                .push("physical storage buffer variables".into()),
            StorageClass::Private
            | StorageClass::Workgroup
            | StorageClass::Function
            | StorageClass::Image => {}
            other => reflection.problems.push(format!("{other:?} variables")),
        }
    }
    reflection
        .resources
        .sort_by_key(|resource| (resource.set, resource.binding));
    reflection.inputs.sort_by_key(|v| (v.location, v.component));
    reflection
        .outputs
        .sort_by_key(|v| (v.location, v.component));
    Ok(reflection)
}

fn resource_kind(types: &Types, class: StorageClass, variable: u32, pointee: u32) -> ResourceKind {
    let Some(instruction) = types.get(pointee) else {
        return ResourceKind::Unsupported("unknown resource type".into());
    };
    match opcode(instruction) {
        Op::TypeArray | Op::TypeRuntimeArray => {
            return ResourceKind::Unsupported("arrays of arrays of descriptors".into())
        }
        Op::TypeAccelerationStructureKHR => {
            return ResourceKind::Unsupported("acceleration structures".into())
        }
        _ => {}
    }
    let decorations = types.decorations;
    match class {
        StorageClass::Uniform | StorageClass::StorageBuffer => {
            let layout = match types.layout(pointee, None, 0) {
                Ok(layout) => layout,
                Err(error) => return ResourceKind::Unsupported(error),
            };
            let storage = class == StorageClass::StorageBuffer
                || decorations.has(pointee, Decoration::BufferBlock);
            if !storage {
                return ResourceKind::UniformBuffer(layout);
            }
            let member_count = u32::try_from(instruction.operands.len()).unwrap_or(0);
            let read_only = decorations.has(variable, Decoration::NonWritable)
                || (member_count > 0
                    && (0..member_count)
                        .all(|m| decorations.member_has(pointee, m, Decoration::NonWritable)));
            ResourceKind::StorageBuffer {
                layout,
                writable: !read_only,
            }
        }
        StorageClass::UniformConstant => match opcode(instruction) {
            Op::TypeSampler => ResourceKind::Sampler,
            Op::TypeSampledImage => {
                let Some(image_id) = id_operand(instruction, 0) else {
                    return ResourceKind::Unsupported("bad sampled image type".into());
                };
                match types.image(image_id) {
                    Ok(image) if image.dim == Dim::DimBuffer => {
                        ResourceKind::UniformTexelBuffer(image)
                    }
                    Ok(image) => ResourceKind::CombinedImageSampler(image),
                    Err(error) => ResourceKind::Unsupported(error),
                }
            }
            Op::TypeImage => match types.image(pointee) {
                Ok(image) => match (image.dim, image.sampled) {
                    (Dim::DimBuffer, 2) => ResourceKind::StorageTexelBuffer(image),
                    (Dim::DimBuffer, _) => ResourceKind::UniformTexelBuffer(image),
                    (Dim::DimSubpassData, _) => ResourceKind::Unsupported("subpass inputs".into()),
                    (_, 2) => ResourceKind::StorageImage(image),
                    _ => ResourceKind::SampledImage(image),
                },
                Err(error) => ResourceKind::Unsupported(error),
            },
            other => ResourceKind::Unsupported(format!("{other:?} uniform constants")),
        },
        _ => ResourceKind::Unsupported(format!("{class:?} resources")),
    }
}
