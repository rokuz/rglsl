use std::collections::{BTreeMap, BTreeSet};

use spirv::{
    BuiltIn, Capability, Decoration, Dim, ExecutionMode, ExecutionModel, ImageFormat, Op,
    StorageClass,
};

use super::module::{self, Instruction, Module};

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

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DataType {
    Scalar(Scalar),
    Vector {
        scalar: Scalar,
        count: u32,
    },
    Matrix {
        scalar: Scalar,
        columns: u32,
        rows: u32,
    },
    Array {
        element: Box<DataType>,
        length: u32,
    },
    Struct(Vec<DataType>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RayVariable {
    pub class: StorageClass,
    pub location: u32,
    pub ty: Result<DataType, String>,
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
    AccelerationStructure,
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
            Self::AccelerationStructure => "acceleration structure",
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
    pub patch: bool,
    pub per_primitive: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum AddressBuffer {
    ShaderRecord,
    PushConstants,
    Resource {
        set: u32,
        binding: u32,
        element: Option<u32>,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub struct AddressField {
    pub buffer: AddressBuffer,
    pub offset: u32,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct RayIndices {
    pub hit_offsets: BTreeSet<u32>,
    pub misses: BTreeSet<u32>,
    pub callables: BTreeSet<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct CooperativeMatrixType {
    pub component: Option<Scalar>,
    pub scope: Option<u32>,
    pub rows: Option<u32>,
    pub columns: Option<u32>,
    pub usage: Option<u32>,
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
    pub unknown_capabilities: BTreeSet<u32>,
    pub extensions: BTreeSet<String>,
    pub modes: BTreeMap<u32, Vec<u32>>,
    pub ray_storage: BTreeSet<StorageClass>,
    pub ray_variables: Vec<RayVariable>,
    pub shader_record: Option<Result<Layout, String>>,
    pub addresses: Vec<AddressField>,
    pub task_payload: Option<Result<DataType, String>>,
    pub body_opcodes: BTreeSet<u32>,
    pub ray_indices: RayIndices,
    pub cooperative_matrices: Vec<CooperativeMatrixType>,
    pub problems: Vec<String>,
}

impl Reflection {
    pub fn new(model: ExecutionModel) -> Self {
        Self {
            model,
            entry: "main".into(),
            local_size: [1, 1, 1],
            resources: Vec::new(),
            push_constants: None,
            inputs: Vec::new(),
            outputs: Vec::new(),
            input_builtins: BTreeSet::new(),
            output_builtins: BTreeSet::new(),
            capabilities: BTreeSet::new(),
            unknown_capabilities: BTreeSet::new(),
            extensions: BTreeSet::new(),
            modes: BTreeMap::new(),
            ray_storage: BTreeSet::new(),
            ray_variables: Vec::new(),
            shader_record: None,
            addresses: Vec::new(),
            task_payload: None,
            body_opcodes: BTreeSet::new(),
            ray_indices: RayIndices::default(),
            cooperative_matrices: Vec::new(),
            problems: Vec::new(),
        }
    }

    pub fn uses(&self, op: Op) -> bool {
        self.body_opcodes.contains(&(op as u32))
    }

    pub fn ray_variable(&self, class: StorageClass) -> Option<&RayVariable> {
        self.ray_variables.iter().find(|v| v.class == class)
    }

    pub fn mode(&self, mode: ExecutionMode) -> Option<&[u32]> {
        self.modes.get(&(mode as u32)).map(Vec::as_slice)
    }

    pub fn has_mode(&self, mode: ExecutionMode) -> bool {
        self.modes.contains_key(&(mode as u32))
    }
}

pub const RUNTIME_DESCRIPTORS: u32 = 64;

type DecorationList = Vec<(Decoration, Vec<u32>)>;

#[derive(Default)]
struct Decorations {
    by_id: BTreeMap<u32, DecorationList>,
    builtins: BTreeMap<u32, BuiltIn>,
    member: BTreeMap<(u32, u32), DecorationList>,
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

struct Types<'a> {
    defs: BTreeMap<u32, &'a Instruction>,
    decorations: &'a Decorations,
}

impl Types<'_> {
    fn get(&self, id: u32) -> Option<&Instruction> {
        self.defs.get(&id).copied()
    }

    fn opcode(&self, id: u32) -> Option<u32> {
        self.get(id).map(|i| i.opcode)
    }

    fn constant_u32(&self, id: u32) -> Option<u32> {
        let instruction = self.get(id)?;
        if !(instruction.is(Op::Constant) || instruction.is(Op::SpecConstant)) {
            return None;
        }
        match instruction.rest(2) {
            [value] => Some(*value),
            [low, 0] => Some(*low),
            _ => None,
        }
    }

    fn scalar(&self, id: u32) -> Option<Scalar> {
        let instruction = self.get(id)?;
        if instruction.is(Op::TypeBool) {
            return Some(Scalar {
                kind: ScalarKind::Bool,
                width: 32,
            });
        }
        if instruction.is(Op::TypeInt) {
            let width = instruction.word(1)?;
            let signed = instruction.word(2)? != 0;
            return Some(Scalar {
                kind: if signed {
                    ScalarKind::Sint
                } else {
                    ScalarKind::Uint
                },
                width,
            });
        }
        if instruction.is(Op::TypeFloat) {
            if instruction.operands.len() > 2 {
                return None;
            }
            return Some(Scalar {
                kind: ScalarKind::Float,
                width: instruction.word(1)?,
            });
        }
        None
    }

    fn layout(&self, id: u32, matrix: Option<(u32, bool)>, depth: u32) -> Result<Layout, String> {
        if depth > 32 {
            return Err("type nesting too deep".into());
        }
        let instruction = self
            .get(id)
            .ok_or_else(|| format!("unsupported type %{id}"))?;
        let op = instruction.opcode;
        if op == Op::TypeBool as u32 || op == Op::TypeInt as u32 || op == Op::TypeFloat as u32 {
            return self
                .scalar(id)
                .map(Layout::Scalar)
                .ok_or_else(|| "unsupported scalar type".to_string());
        }
        if op == Op::TypeVector as u32 {
            let component = instruction.word(1).ok_or("bad vector type")?;
            let count = instruction.word(2).ok_or("bad vector type")?;
            let scalar = self
                .scalar(component)
                .ok_or_else(|| "unsupported vector component".to_string())?;
            return Ok(Layout::Vector { scalar, count });
        }
        if op == Op::TypeMatrix as u32 {
            let column = instruction.word(1).ok_or("bad matrix type")?;
            let columns = instruction.word(2).ok_or("bad matrix type")?;
            let Layout::Vector { scalar, count } = self.layout(column, None, depth + 1)? else {
                return Err("bad matrix column type".into());
            };
            let (stride, row_major) =
                matrix.ok_or_else(|| "matrix without a MatrixStride".to_string())?;
            return Ok(Layout::Matrix {
                scalar,
                columns,
                rows: count,
                stride,
                row_major,
            });
        }
        if op == Op::TypeArray as u32 || op == Op::TypeRuntimeArray as u32 {
            let element = instruction.word(1).ok_or("bad array type")?;
            let length = if op == Op::TypeArray as u32 {
                let length_id = instruction.word(2).ok_or("bad array type")?;
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
            return Ok(Layout::Array {
                element: Box::new(self.layout(element, matrix, depth + 1)?),
                length,
                stride,
            });
        }
        if op == Op::TypeStruct as u32 {
            let mut members = Vec::new();
            for (index, member) in instruction.rest(1).iter().enumerate() {
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
            return Ok(Layout::Struct { members });
        }
        if op == Op::TypePointer as u32 || op == Op::TypeForwardPointer as u32 {
            return Err("pointers in buffers (buffer device address)".into());
        }
        Err(format!("unsupported type {} in a buffer", op_name(op)))
    }

    fn data_type(&self, id: u32, depth: u32) -> Result<DataType, String> {
        if depth > 32 {
            return Err("type nesting too deep".into());
        }
        let instruction = self
            .get(id)
            .ok_or_else(|| format!("unsupported type %{id}"))?;
        let op = instruction.opcode;
        if op == Op::TypeBool as u32 || op == Op::TypeInt as u32 || op == Op::TypeFloat as u32 {
            return self
                .scalar(id)
                .map(DataType::Scalar)
                .ok_or_else(|| "unsupported scalar type".to_string());
        }
        if op == Op::TypeVector as u32 {
            let component = instruction.word(1).ok_or("bad vector type")?;
            let count = instruction.word(2).ok_or("bad vector type")?;
            let scalar = self
                .scalar(component)
                .ok_or_else(|| "unsupported vector component".to_string())?;
            return Ok(DataType::Vector { scalar, count });
        }
        if op == Op::TypeMatrix as u32 {
            let column = instruction.word(1).ok_or("bad matrix type")?;
            let columns = instruction.word(2).ok_or("bad matrix type")?;
            let DataType::Vector {
                scalar,
                count: rows,
            } = self.data_type(column, depth + 1)?
            else {
                return Err("bad matrix column type".into());
            };
            return Ok(DataType::Matrix {
                scalar,
                columns,
                rows,
            });
        }
        if op == Op::TypeArray as u32 {
            let element = instruction.word(1).ok_or("bad array type")?;
            let length = instruction
                .word(2)
                .and_then(|l| self.constant_u32(l))
                .ok_or_else(|| "array length is not a constant".to_string())?;
            return Ok(DataType::Array {
                element: Box::new(self.data_type(element, depth + 1)?),
                length,
            });
        }
        if op == Op::TypeStruct as u32 {
            let members = instruction
                .rest(1)
                .iter()
                .map(|member| self.data_type(*member, depth + 1))
                .collect::<Result<Vec<_>, _>>()?;
            return Ok(DataType::Struct(members));
        }
        Err(format!("{} values", op_name(op)))
    }

    fn image(&self, id: u32) -> Result<ImageType, String> {
        let instruction = self.get(id).ok_or("unknown image type")?;
        if !instruction.is(Op::TypeImage) {
            return Err("not an image type".into());
        }
        let bad = || "bad image type".to_string();
        let sampled_type = instruction.word(1).ok_or_else(bad)?;
        let dim = instruction
            .word(2)
            .and_then(Dim::from_u32)
            .ok_or_else(bad)?;
        let depth = instruction.word(3).ok_or_else(bad)? == 1;
        let arrayed = instruction.word(4).ok_or_else(bad)? != 0;
        let multisampled = instruction.word(5).ok_or_else(bad)? != 0;
        let sampled = instruction.word(6).ok_or_else(bad)?;
        let format = instruction
            .word(7)
            .and_then(ImageFormat::from_u32)
            .ok_or_else(bad)?;
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
        let op = instruction.opcode;
        if op == Op::TypeBool as u32 || op == Op::TypeInt as u32 || op == Op::TypeFloat as u32 {
            return match self.scalar(id) {
                Some(scalar) if scalar.kind != ScalarKind::Bool => {
                    VaryingType::Simple { scalar, count: 1 }
                }
                _ => VaryingType::Unsupported("boolean varying".into()),
            };
        }
        if op == Op::TypeVector as u32 {
            let component = instruction.word(1).and_then(|c| self.scalar(c));
            return match (component, instruction.word(2)) {
                (Some(scalar), Some(count)) if scalar.kind != ScalarKind::Bool => {
                    VaryingType::Simple { scalar, count }
                }
                _ => VaryingType::Unsupported("unsupported vector varying".into()),
            };
        }
        let what = if op == Op::TypeMatrix as u32 {
            "matrix varying".to_string()
        } else if op == Op::TypeArray as u32 || op == Op::TypeRuntimeArray as u32 {
            "array varying".to_string()
        } else if op == Op::TypeStruct as u32 {
            "block or struct varying".to_string()
        } else {
            format!("{} varying", op_name(op))
        };
        VaryingType::Unsupported(what)
    }
}

fn op_name(opcode: u32) -> String {
    Op::from_u32(opcode).map_or_else(|| format!("opcode {opcode}"), |op| format!("{op:?}"))
}

pub fn reflect_bytes(bytes: &[u8]) -> Result<Reflection, String> {
    reflect(&module::parse_bytes(bytes)?)
}

fn collect_decorations(module: &Module) -> Decorations {
    let mut decorations = Decorations::default();
    for annotation in &module.globals {
        if annotation.is(Op::Decorate) || annotation.is(Op::DecorateId) {
            let (Some(target), Some(decoration)) = (
                annotation.word(0),
                annotation.word(1).and_then(Decoration::from_u32),
            ) else {
                continue;
            };
            if decoration == Decoration::BuiltIn {
                if let Some(builtin) = annotation.word(2).and_then(BuiltIn::from_u32) {
                    decorations.builtins.insert(target, builtin);
                }
                continue;
            }
            decorations
                .by_id
                .entry(target)
                .or_default()
                .push((decoration, annotation.rest(2).to_vec()));
        } else if annotation.is(Op::MemberDecorate) {
            let (Some(target), Some(member), Some(decoration)) = (
                annotation.word(0),
                annotation.word(1),
                annotation.word(2).and_then(Decoration::from_u32),
            ) else {
                continue;
            };
            if decoration == Decoration::BuiltIn {
                decorations.member_builtins.insert(target);
                continue;
            }
            decorations
                .member
                .entry((target, member))
                .or_default()
                .push((decoration, annotation.rest(3).to_vec()));
        }
    }
    decorations
}

fn local_size(module: &Module, types: &Types, modes: &BTreeMap<u32, Vec<u32>>) -> [u32; 3] {
    for instruction in &module.globals {
        let Some(id) = instruction.result_id() else {
            continue;
        };
        if types.decorations.builtins.get(&id) == Some(&BuiltIn::WorkgroupSize) {
            let components: Vec<u32> = instruction
                .rest(2)
                .iter()
                .filter_map(|id| types.constant_u32(*id))
                .collect();
            if let [x, y, z] = components.as_slice() {
                return [*x, *y, *z];
            }
        }
    }
    if let Some([x, y, z]) = modes
        .get(&(ExecutionMode::LocalSize as u32))
        .map(Vec::as_slice)
    {
        return [*x, *y, *z];
    }
    if let Some(ids) = modes.get(&(ExecutionMode::LocalSizeId as u32)) {
        let sizes: Vec<u32> = ids
            .iter()
            .filter_map(|id| types.constant_u32(*id))
            .collect();
        if let [x, y, z] = sizes.as_slice() {
            return [*x, *y, *z];
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

fn per_vertex_element(types: &Types, pointee: u32) -> Result<u32, String> {
    let outer = types
        .get(pointee)
        .ok_or("interface variable of an unknown type")?;
    if !(outer.is(Op::TypeArray) || outer.is(Op::TypeRuntimeArray)) {
        return Err("per-vertex interface variable that is not an array".into());
    }
    outer.word(1).ok_or_else(|| "bad array type".to_string())
}

fn varyings(types: &Types, id: u32, pointee: u32, arrayed: bool) -> Result<Vec<Varying>, String> {
    let decorations = types.decorations;
    let patch = decorations.has(id, Decoration::Patch);
    let pointee = if arrayed && !patch {
        per_vertex_element(types, pointee)?
    } else {
        pointee
    };
    let location = decorations.value(id, Decoration::Location);
    let base = Varying {
        location: location.unwrap_or(0),
        component: decorations.value(id, Decoration::Component).unwrap_or(0),
        ty: VaryingType::Unsupported(String::new()),
        array: None,
        interpolation: interpolation(decorations, id),
        centroid: decorations.has(id, Decoration::Centroid),
        sample: decorations.has(id, Decoration::Sample),
        patch,
        per_primitive: decorations.has(id, Decoration::PerPrimitiveEXT),
    };
    let Some(instruction) = types.get(pointee) else {
        return Err("interface variable of an unknown type".into());
    };
    if instruction.is(Op::TypeStruct) {
        let mut next = location;
        let mut broken: Option<String> = None;
        let mut result = Vec::new();
        for (index, member) in instruction.rest(1).iter().enumerate() {
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
                sample: base.sample || decorations.member_has(pointee, index, Decoration::Sample),
                patch: base.patch || decorations.member_has(pointee, index, Decoration::Patch),
                per_primitive: base.per_primitive
                    || decorations.member_has(pointee, index, Decoration::PerPrimitiveEXT),
                ..base.clone()
            });
            next = Some(location + 1);
        }
        return Ok(result);
    }
    if instruction.is(Op::TypeArray) {
        let location = location.ok_or("interface variable without a location")?;
        let length = instruction.word(2).and_then(|l| types.constant_u32(l));
        let element = instruction.word(1);
        let ty = match (element.map(|e| types.varying_type(e)), length) {
            (Some(VaryingType::Simple { scalar, count }), Some(_)) => {
                VaryingType::Simple { scalar, count }
            }
            _ => VaryingType::Unsupported("array of non-vector varyings".into()),
        };
        return Ok(vec![Varying {
            location,
            ty,
            array: length,
            ..base
        }]);
    }
    Ok(vec![Varying {
        location: location.ok_or("interface variable without a location")?,
        ty: types.varying_type(pointee),
        ..base
    }])
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

const fn arrayed_interface(model: ExecutionModel, output: bool) -> bool {
    match model {
        ExecutionModel::Geometry | ExecutionModel::TessellationEvaluation => !output,
        ExecutionModel::TessellationControl => true,
        ExecutionModel::MeshEXT | ExecutionModel::MeshNV => output,
        _ => false,
    }
}

pub const fn is_mesh_shading(model: ExecutionModel) -> bool {
    matches!(
        model,
        ExecutionModel::MeshEXT
            | ExecutionModel::TaskEXT
            | ExecutionModel::MeshNV
            | ExecutionModel::TaskNV
    )
}

pub const fn is_ray_tracing(model: ExecutionModel) -> bool {
    matches!(
        model,
        ExecutionModel::RayGenerationKHR
            | ExecutionModel::IntersectionKHR
            | ExecutionModel::AnyHitKHR
            | ExecutionModel::ClosestHitKHR
            | ExecutionModel::MissKHR
            | ExecutionModel::CallableKHR
    )
}

fn ray_indices(body: &[Instruction], types: &Types) -> RayIndices {
    let mut indices = RayIndices::default();
    let constant = |instruction: &Instruction, index: usize| {
        instruction
            .word(index)
            .and_then(|id| types.constant_u32(id))
    };
    for instruction in body {
        if instruction.is(Op::TraceRayKHR)
            || instruction.is(Op::TraceNV)
            || instruction.is(Op::TraceRayMotionNV)
        {
            indices.hit_offsets.extend(constant(instruction, 3));
            indices.misses.extend(constant(instruction, 5));
        } else if instruction.is(Op::ExecuteCallableKHR) || instruction.is(Op::ExecuteCallableNV) {
            indices.callables.extend(constant(instruction, 0));
        }
    }
    indices
}

fn cooperative_matrix_type(instruction: &Instruction, types: &Types) -> CooperativeMatrixType {
    let constant = |index: usize| {
        instruction
            .word(index)
            .and_then(|id| types.constant_u32(id))
    };
    CooperativeMatrixType {
        component: instruction.word(1).and_then(|id| types.scalar(id)),
        scope: constant(2),
        rows: constant(3),
        columns: constant(4),
        usage: constant(5),
    }
}

pub fn reflect(module: &Module) -> Result<Reflection, String> {
    let decorations = collect_decorations(module);
    let defs: BTreeMap<u32, &Instruction> = module
        .globals
        .iter()
        .filter_map(|instruction| instruction.result_id().map(|id| (id, instruction)))
        .collect();
    let types = Types {
        defs,
        decorations: &decorations,
    };

    let entry_points: Vec<&Instruction> = module
        .globals
        .iter()
        .filter(|i| i.is(Op::EntryPoint))
        .collect();
    let entry_point = match entry_points.as_slice() {
        [entry] => *entry,
        [] => return Err("no entry point".into()),
        _ => return Err("several entry points".into()),
    };
    let model = entry_point
        .word(0)
        .and_then(ExecutionModel::from_u32)
        .ok_or("bad OpEntryPoint")?;
    let entry_id = entry_point.word(1).ok_or("bad OpEntryPoint")?;
    let (entry, _) = entry_point.string(2).ok_or("bad OpEntryPoint")?;

    let mut modes = BTreeMap::new();
    let mut capabilities = BTreeSet::new();
    let mut unknown_capabilities = BTreeSet::new();
    let mut extensions = BTreeSet::new();
    for instruction in &module.globals {
        if (instruction.is(Op::ExecutionMode) || instruction.is(Op::ExecutionModeId))
            && instruction.word(0) == Some(entry_id)
        {
            if let Some(mode) = instruction.word(1) {
                modes.insert(mode, instruction.rest(2).to_vec());
            }
        } else if instruction.is(Op::Capability) {
            if let Some(value) = instruction.word(0) {
                match Capability::from_u32(value) {
                    Some(capability) => {
                        capabilities.insert(capability);
                    }
                    None => {
                        unknown_capabilities.insert(value);
                    }
                }
            }
        } else if instruction.is(Op::Extension) {
            if let Some((name, _)) = instruction.string(0) {
                extensions.insert(name);
            }
        }
    }

    let mut reflection = Reflection {
        entry,
        local_size: local_size(module, &types, &modes),
        capabilities,
        unknown_capabilities,
        extensions,
        modes,
        body_opcodes: module.body_opcodes.clone(),
        ..Reflection::new(model)
    };

    let mut roots = BTreeMap::new();
    for instruction in &module.globals {
        if !instruction.is(Op::Variable) {
            continue;
        }
        let (Some(pointer), Some(id), Some(raw_class)) = (
            instruction.word(0),
            instruction.word(1),
            instruction.word(2),
        ) else {
            continue;
        };
        let Some(class) = StorageClass::from_u32(raw_class) else {
            reflection
                .problems
                .push(format!("variables of storage class {raw_class}"));
            continue;
        };
        let pointee = types
            .get(pointer)
            .filter(|p| p.is(Op::TypePointer))
            .and_then(|p| p.word(2))
            .ok_or("variable without a pointer type")?;
        match class {
            StorageClass::Input | StorageClass::Output => {
                let output = class == StorageClass::Output;
                if let Some(builtin) = decorations.builtins.get(&id) {
                    if output {
                        reflection.output_builtins.insert(*builtin);
                    } else {
                        reflection.input_builtins.insert(*builtin);
                    }
                    continue;
                }
                let arrayed = arrayed_interface(model, output);
                let block = if arrayed {
                    per_vertex_element(&types, pointee).unwrap_or(pointee)
                } else {
                    pointee
                };
                if decorations.member_builtins.contains(&block) {
                    continue;
                }
                let varyings = match varyings(&types, id, pointee, arrayed) {
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
                Ok(layout) => {
                    roots.insert(
                        id,
                        AddressRoot {
                            buffer: AddressBuffer::PushConstants,
                            count: None,
                            layout: layout.clone(),
                        },
                    );
                    reflection.push_constants = Some(layout);
                }
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
                    Some(array) if array.is(Op::TypeArray) => {
                        match array.word(2).and_then(|length| types.constant_u32(length)) {
                            Some(length) => (Some(length), array.word(1)),
                            None => (None, None),
                        }
                    }
                    Some(array) if array.is(Op::TypeRuntimeArray) => {
                        (Some(RUNTIME_DESCRIPTORS), array.word(1))
                    }
                    _ => (None, Some(pointee)),
                };
                let kind = match element {
                    Some(element) if count != Some(0) => resource_kind(&types, class, id, element),
                    _ => ResourceKind::Unsupported(
                        "descriptor arrays without a constant length".into(),
                    ),
                };
                if let ResourceKind::UniformBuffer(layout)
                | ResourceKind::StorageBuffer { layout, .. } = &kind
                {
                    roots.insert(
                        id,
                        AddressRoot {
                            buffer: AddressBuffer::Resource {
                                set,
                                binding,
                                element: None,
                            },
                            count,
                            layout: layout.clone(),
                        },
                    );
                }
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
            StorageClass::ShaderRecordBufferKHR if is_ray_tracing(model) => {
                reflection.ray_storage.insert(class);
                let layout = types.layout(pointee, None, 0);
                if let Ok(layout) = &layout {
                    roots.insert(
                        id,
                        AddressRoot {
                            buffer: AddressBuffer::ShaderRecord,
                            count: None,
                            layout: layout.clone(),
                        },
                    );
                }
                reflection.shader_record = Some(layout);
            }
            StorageClass::RayPayloadKHR
            | StorageClass::IncomingRayPayloadKHR
            | StorageClass::HitAttributeKHR
            | StorageClass::CallableDataKHR
            | StorageClass::IncomingCallableDataKHR
                if is_ray_tracing(model) =>
            {
                reflection.ray_storage.insert(class);
                reflection.ray_variables.push(RayVariable {
                    class,
                    location: decorations.value(id, Decoration::Location).unwrap_or(0),
                    ty: types.data_type(pointee, 0),
                });
            }
            StorageClass::TaskPayloadWorkgroupEXT if is_mesh_shading(model) => {
                reflection.task_payload = Some(types.data_type(pointee, 0));
            }
            other => reflection.problems.push(format!("{other:?} variables")),
        }
    }
    reflection.ray_indices = ray_indices(&module.body, &types);
    reflection.cooperative_matrices = module
        .globals
        .iter()
        .filter(|i| i.is(Op::TypeCooperativeMatrixKHR))
        .map(|i| cooperative_matrix_type(i, &types))
        .collect();
    if reflection.uses(Op::ConvertUToAccelerationStructureKHR) {
        match address_fields(&module.body, &types, &roots) {
            Ok(addresses) => reflection.addresses = addresses,
            Err(problem) => reflection.problems.push(problem),
        }
    }
    reflection
        .ray_variables
        .sort_by_key(|v| (v.class as u32, v.location));
    reflection
        .resources
        .sort_by_key(|resource| (resource.set, resource.binding));
    reflection.inputs.sort_by_key(|v| (v.location, v.component));
    reflection
        .outputs
        .sort_by_key(|v| (v.location, v.component));
    Ok(reflection)
}

struct AddressRoot {
    buffer: AddressBuffer,
    count: Option<u32>,
    layout: Layout,
}

const MAX_ADDRESS_STEPS: usize = 64;

fn address_fields(
    body: &[Instruction],
    types: &Types,
    roots: &BTreeMap<u32, AddressRoot>,
) -> Result<Vec<AddressField>, String> {
    let defs: BTreeMap<u32, &Instruction> = body
        .iter()
        .filter(|i| {
            [
                Op::Load,
                Op::CopyObject,
                Op::AccessChain,
                Op::InBoundsAccessChain,
            ]
            .iter()
            .any(|op| i.is(*op))
        })
        .filter_map(|i| i.word(1).map(|id| (id, i)))
        .collect();
    let mut fields = BTreeSet::new();
    for convert in body
        .iter()
        .filter(|i| i.is(Op::ConvertUToAccelerationStructureKHR))
    {
        let field = convert
            .word(2)
            .and_then(|value| address_field(&defs, types, roots, value))
            .ok_or(
                "an acceleration structure from an address that is not a push constant, \
                 uniform, storage or shader record block field",
            )?;
        fields.insert(field);
    }
    Ok(fields.into_iter().collect())
}

fn address_field(
    defs: &BTreeMap<u32, &Instruction>,
    types: &Types,
    roots: &BTreeMap<u32, AddressRoot>,
    value: u32,
) -> Option<AddressField> {
    let mut value = value;
    for _ in 0..MAX_ADDRESS_STEPS {
        let instruction = defs.get(&value)?;
        if instruction.is(Op::CopyObject) {
            value = instruction.word(2)?;
            continue;
        }
        if !instruction.is(Op::Load) {
            return None;
        }
        let (buffer, offset, layout) = field_pointer(defs, types, roots, instruction.word(2)?)?;
        return is_address(layout).then_some(AddressField { buffer, offset });
    }
    None
}

fn is_address(layout: &Layout) -> bool {
    match layout {
        Layout::Scalar(scalar) => scalar.kind == ScalarKind::Uint && scalar.width == 64,
        Layout::Vector { scalar, count } => {
            scalar.kind == ScalarKind::Uint && scalar.width == 32 && *count == 2
        }
        Layout::Matrix { .. } | Layout::Array { .. } | Layout::Struct { .. } => false,
    }
}

fn field_pointer<'a>(
    defs: &BTreeMap<u32, &Instruction>,
    types: &Types,
    roots: &'a BTreeMap<u32, AddressRoot>,
    pointer: u32,
) -> Option<(AddressBuffer, u32, &'a Layout)> {
    let mut chains = Vec::new();
    let mut current = pointer;
    let mut root = None;
    for _ in 0..MAX_ADDRESS_STEPS {
        if let Some(found) = roots.get(&current) {
            root = Some(found);
            break;
        }
        let instruction = defs.get(&current)?;
        if instruction.is(Op::AccessChain) || instruction.is(Op::InBoundsAccessChain) {
            chains.push(instruction.rest(3));
        } else if !instruction.is(Op::CopyObject) {
            return None;
        }
        current = instruction.word(2)?;
    }
    let root = root?;
    let mut indices = chains.iter().rev().flat_map(|chain| chain.iter().copied());
    let mut buffer = root.buffer;
    if let Some(count) = root.count {
        let element = types.constant_u32(indices.next()?)?;
        if element >= count {
            return None;
        }
        if let AddressBuffer::Resource { element: slot, .. } = &mut buffer {
            *slot = Some(element);
        }
    }
    let mut offset = 0u32;
    let mut layout = &root.layout;
    for index in indices {
        let index = types.constant_u32(index)?;
        let (step, inner) = match layout {
            Layout::Struct { members } => {
                let (member, inner) = members.get(usize::try_from(index).ok()?)?;
                (*member, inner)
            }
            Layout::Array {
                element,
                length,
                stride,
            } => {
                if length.is_some_and(|length| index >= length) {
                    return None;
                }
                (index.checked_mul(*stride)?, element.as_ref())
            }
            Layout::Scalar(_) | Layout::Vector { .. } | Layout::Matrix { .. } => return None,
        };
        offset = offset.checked_add(step)?;
        layout = inner;
    }
    Some((buffer, offset, layout))
}

fn resource_kind(types: &Types, class: StorageClass, variable: u32, pointee: u32) -> ResourceKind {
    let Some(instruction) = types.get(pointee) else {
        return ResourceKind::Unsupported(format!("resource of an unsupported type %{pointee}"));
    };
    if instruction.is(Op::TypeArray) || instruction.is(Op::TypeRuntimeArray) {
        return ResourceKind::Unsupported("arrays of arrays of descriptors".into());
    }
    if instruction.is(Op::TypeAccelerationStructureKHR) {
        return ResourceKind::AccelerationStructure;
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
            let member_count = u32::try_from(instruction.rest(1).len()).unwrap_or(0);
            let read_only = decorations.has(variable, Decoration::NonWritable)
                || (member_count > 0
                    && (0..member_count)
                        .all(|m| decorations.member_has(pointee, m, Decoration::NonWritable)));
            ResourceKind::StorageBuffer {
                layout,
                writable: !read_only,
            }
        }
        StorageClass::UniformConstant => {
            if instruction.is(Op::TypeSampler) {
                return ResourceKind::Sampler;
            }
            if instruction.is(Op::TypeSampledImage) {
                let Some(image_id) = instruction.word(1) else {
                    return ResourceKind::Unsupported("bad sampled image type".into());
                };
                return match types.image(image_id) {
                    Ok(image) if image.dim == Dim::DimBuffer => {
                        ResourceKind::UniformTexelBuffer(image)
                    }
                    Ok(image) => ResourceKind::CombinedImageSampler(image),
                    Err(error) => ResourceKind::Unsupported(error),
                };
            }
            if instruction.is(Op::TypeImage) {
                return match types.image(pointee) {
                    Ok(image) => match (image.dim, image.sampled) {
                        (Dim::DimBuffer, 2) => ResourceKind::StorageTexelBuffer(image),
                        (Dim::DimBuffer, _) => ResourceKind::UniformTexelBuffer(image),
                        (Dim::DimSubpassData, _) => {
                            ResourceKind::Unsupported("subpass inputs".into())
                        }
                        (_, 2) => ResourceKind::StorageImage(image),
                        _ => ResourceKind::SampledImage(image),
                    },
                    Err(error) => ResourceKind::Unsupported(error),
                };
            }
            ResourceKind::Unsupported(format!(
                "{} uniform constants",
                types
                    .opcode(pointee)
                    .map_or_else(|| "unknown".to_string(), op_name)
            ))
        }
        _ => ResourceKind::Unsupported(format!("{class:?} resources")),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::module::tests::{instruction, module, string_words};

    fn op(op: Op, operands: &[u32]) -> anyhow::Result<Vec<u32>> {
        instruction(op as u32, operands)
    }

    fn reflected(words: &[u32]) -> anyhow::Result<Reflection> {
        let module = module::parse(words).map_err(anyhow::Error::msg)?;
        reflect(&module).map_err(anyhow::Error::msg)
    }

    fn entry(model: ExecutionModel) -> Vec<u32> {
        let mut words = vec![model as u32, 1];
        words.extend(string_words("main"));
        words
    }

    #[test]
    fn reflects_a_compute_module_with_unknown_instructions() -> anyhow::Result<()> {
        let words = module(&[
            op(Op::Capability, &[Capability::Shader as u32])?,
            op(Op::Capability, &[60_000])?,
            op(
                Op::Extension,
                &string_words("SPV_KHR_storage_buffer_storage_class"),
            )?,
            op(Op::EntryPoint, &entry(ExecutionModel::GLCompute))?,
            op(
                Op::ExecutionMode,
                &[1, ExecutionMode::LocalSize as u32, 8, 2, 1],
            )?,
            op(Op::Decorate, &[10, Decoration::Block as u32])?,
            op(Op::MemberDecorate, &[10, 0, Decoration::Offset as u32, 0])?,
            op(Op::Decorate, &[12, Decoration::DescriptorSet as u32, 1])?,
            op(Op::Decorate, &[12, Decoration::Binding as u32, 3])?,
            op(Op::Decorate, &[9, Decoration::ArrayStride as u32, 4])?,
            op(Op::TypeInt, &[5, 32, 0])?,
            instruction(61_234, &[77, 5])?,
            op(Op::TypeRuntimeArray, &[9, 5])?,
            op(Op::TypeStruct, &[10, 9])?,
            op(
                Op::TypePointer,
                &[11, StorageClass::StorageBuffer as u32, 10],
            )?,
            op(Op::Variable, &[11, 12, StorageClass::StorageBuffer as u32])?,
        ]);
        let reflection = reflected(&words)?;
        assert_eq!(reflection.model, ExecutionModel::GLCompute);
        assert_eq!(reflection.entry, "main");
        assert_eq!(reflection.local_size, [8, 2, 1]);
        assert!(reflection.capabilities.contains(&Capability::Shader));
        assert!(reflection.unknown_capabilities.contains(&60_000));
        assert!(reflection
            .extensions
            .contains("SPV_KHR_storage_buffer_storage_class"));
        assert_eq!(reflection.resources.len(), 1);
        let resource = &reflection.resources[0];
        assert_eq!((resource.set, resource.binding), (1, 3));
        let ResourceKind::StorageBuffer { layout, writable } = &resource.kind else {
            panic!("expected a storage buffer, got {:?}", resource.kind);
        };
        assert!(*writable);
        assert_eq!(layout.runtime_stride(), 4);
        Ok(())
    }

    fn record_module(load_from: u32) -> anyhow::Result<Vec<u32>> {
        Ok(module(&[
            op(Op::Capability, &[Capability::RayTracingKHR as u32])?,
            op(Op::EntryPoint, &entry(ExecutionModel::RayGenerationKHR))?,
            op(Op::Decorate, &[10, Decoration::Block as u32])?,
            op(Op::MemberDecorate, &[10, 0, Decoration::Offset as u32, 0])?,
            op(Op::MemberDecorate, &[10, 1, Decoration::Offset as u32, 8])?,
            op(Op::MemberDecorate, &[10, 2, Decoration::Offset as u32, 16])?,
            op(Op::Decorate, &[13, Decoration::ArrayStride as u32, 8])?,
            op(Op::TypeVoid, &[2])?,
            op(Op::TypeFunction, &[3, 2])?,
            op(Op::TypeInt, &[5, 32, 0])?,
            op(Op::TypeInt, &[6, 64, 0])?,
            op(Op::TypeVector, &[7, 5, 2])?,
            op(Op::Constant, &[5, 8, 1])?,
            op(Op::Constant, &[5, 9, 2])?,
            op(Op::TypeArray, &[13, 6, 9])?,
            op(Op::TypeStruct, &[10, 5, 7, 13])?,
            op(
                Op::TypePointer,
                &[11, StorageClass::ShaderRecordBufferKHR as u32, 10],
            )?,
            op(
                Op::TypePointer,
                &[14, StorageClass::ShaderRecordBufferKHR as u32, 7],
            )?,
            op(
                Op::TypePointer,
                &[15, StorageClass::ShaderRecordBufferKHR as u32, 6],
            )?,
            op(Op::TypeAccelerationStructureKHR, &[16])?,
            op(
                Op::Variable,
                &[11, 12, StorageClass::ShaderRecordBufferKHR as u32],
            )?,
            op(Op::Function, &[2, 1, 0, 3])?,
            op(Op::Label, &[20])?,
            op(Op::AccessChain, &[14, 21, 12, 8])?,
            op(Op::Load, &[7, 22, load_from])?,
            op(Op::ConvertUToAccelerationStructureKHR, &[16, 23, 22])?,
            op(Op::AccessChain, &[15, 24, 12, 9, 8])?,
            op(Op::Load, &[6, 25, 24])?,
            op(Op::CopyObject, &[6, 26, 25])?,
            op(Op::ConvertUToAccelerationStructureKHR, &[16, 27, 26])?,
            op(Op::Return, &[])?,
            op(Op::FunctionEnd, &[])?,
        ]))
    }

    #[test]
    fn finds_acceleration_structure_addresses_in_the_shader_record() -> anyhow::Result<()> {
        let reflection = reflected(&record_module(21)?)?;
        assert!(reflection.problems.is_empty(), "{:?}", reflection.problems);
        let record = |offset| AddressField {
            buffer: AddressBuffer::ShaderRecord,
            offset,
        };
        assert_eq!(reflection.addresses, vec![record(8), record(24)]);

        let reflection = reflected(&record_module(12)?)?;
        assert!(reflection.addresses.is_empty());
        assert_eq!(reflection.problems, vec![NOT_A_FIELD.to_string()]);
        Ok(())
    }

    const NOT_A_FIELD: &str = "an acceleration structure from an address that is not a push \
                               constant, uniform, storage or shader record block field";

    fn query_module(element: u32, member_type: u32) -> anyhow::Result<Vec<u32>> {
        Ok(module(&[
            op(Op::Capability, &[Capability::RayQueryKHR as u32])?,
            op(Op::EntryPoint, &entry(ExecutionModel::GLCompute))?,
            op(Op::Decorate, &[10, Decoration::Block as u32])?,
            op(Op::MemberDecorate, &[10, 0, Decoration::Offset as u32, 0])?,
            op(Op::MemberDecorate, &[10, 1, Decoration::Offset as u32, 8])?,
            op(Op::Decorate, &[30, Decoration::Block as u32])?,
            op(Op::MemberDecorate, &[30, 0, Decoration::Offset as u32, 0])?,
            op(Op::MemberDecorate, &[30, 1, Decoration::Offset as u32, 16])?,
            op(Op::Decorate, &[33, Decoration::DescriptorSet as u32, 0])?,
            op(Op::Decorate, &[33, Decoration::Binding as u32, 1])?,
            op(Op::TypeVoid, &[2])?,
            op(Op::TypeFunction, &[3, 2])?,
            op(Op::TypeInt, &[5, 32, 0])?,
            op(Op::TypeInt, &[6, 64, 0])?,
            op(Op::TypeVector, &[7, 5, 2])?,
            op(Op::TypeVector, &[4, 5, 4])?,
            op(Op::Constant, &[5, 8, 0])?,
            op(Op::Constant, &[5, 9, 1])?,
            op(Op::Constant, &[5, 17, 2])?,
            op(Op::Constant, &[5, 18, 3])?,
            op(Op::TypeStruct, &[10, 5, 7])?,
            op(
                Op::TypePointer,
                &[11, StorageClass::PushConstant as u32, 10],
            )?,
            op(Op::TypePointer, &[14, StorageClass::PushConstant as u32, 7])?,
            op(Op::TypeStruct, &[30, 4, member_type])?,
            op(Op::TypeArray, &[31, 30, 17])?,
            op(
                Op::TypePointer,
                &[32, StorageClass::StorageBuffer as u32, 31],
            )?,
            op(
                Op::TypePointer,
                &[34, StorageClass::StorageBuffer as u32, member_type],
            )?,
            op(Op::TypeAccelerationStructureKHR, &[16])?,
            op(Op::Variable, &[11, 12, StorageClass::PushConstant as u32])?,
            op(Op::Variable, &[32, 33, StorageClass::StorageBuffer as u32])?,
            op(Op::Function, &[2, 1, 0, 3])?,
            op(Op::Label, &[20])?,
            op(Op::AccessChain, &[14, 21, 12, 9])?,
            op(Op::Load, &[7, 22, 21])?,
            op(Op::ConvertUToAccelerationStructureKHR, &[16, 23, 22])?,
            op(Op::AccessChain, &[34, 24, 33, element])?,
            op(Op::CopyObject, &[34, 25, 24])?,
            op(Op::AccessChain, &[34, 26, 25, 9])?,
            op(Op::Load, &[member_type, 27, 26])?,
            op(Op::ConvertUToAccelerationStructureKHR, &[16, 28, 27])?,
            op(Op::Return, &[])?,
            op(Op::FunctionEnd, &[])?,
        ]))
    }

    #[test]
    fn finds_acceleration_structure_addresses_in_push_constants_and_buffers() -> anyhow::Result<()>
    {
        let reflection = reflected(&query_module(9, 6)?)?;
        assert!(reflection.problems.is_empty(), "{:?}", reflection.problems);
        assert_eq!(
            reflection.addresses,
            vec![
                AddressField {
                    buffer: AddressBuffer::PushConstants,
                    offset: 8,
                },
                AddressField {
                    buffer: AddressBuffer::Resource {
                        set: 0,
                        binding: 1,
                        element: Some(1),
                    },
                    offset: 16,
                },
            ]
        );

        let reflection = reflected(&query_module(18, 6)?)?;
        assert_eq!(reflection.problems, vec![NOT_A_FIELD.to_string()]);

        let reflection = reflected(&query_module(9, 4)?)?;
        assert_eq!(reflection.problems, vec![NOT_A_FIELD.to_string()]);
        Ok(())
    }

    #[test]
    fn reflects_per_vertex_geometry_inputs() -> anyhow::Result<()> {
        let words = module(&[
            op(Op::Capability, &[Capability::Geometry as u32])?,
            op(Op::EntryPoint, &entry(ExecutionModel::Geometry))?,
            op(Op::ExecutionMode, &[1, ExecutionMode::Triangles as u32])?,
            op(Op::Decorate, &[20, Decoration::Location as u32, 2])?,
            op(Op::TypeFloat, &[5, 32])?,
            op(Op::TypeVector, &[6, 5, 4])?,
            op(Op::TypeInt, &[7, 32, 0])?,
            op(Op::Constant, &[7, 8, 3])?,
            op(Op::TypeArray, &[9, 6, 8])?,
            op(Op::TypePointer, &[10, StorageClass::Input as u32, 9])?,
            op(Op::Variable, &[10, 20, StorageClass::Input as u32])?,
        ]);
        let reflection = reflected(&words)?;
        assert!(reflection.has_mode(ExecutionMode::Triangles));
        assert_eq!(reflection.inputs.len(), 1);
        assert_eq!(reflection.inputs[0].location, 2);
        assert_eq!(reflection.inputs[0].array, None);
        assert_eq!(
            reflection.inputs[0].ty,
            VaryingType::Simple {
                scalar: Scalar {
                    kind: ScalarKind::Float,
                    width: 32
                },
                count: 4
            }
        );
        Ok(())
    }
}
