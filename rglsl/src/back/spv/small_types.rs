use alloc::vec::Vec;

use spirv::{Capability, Op, StorageClass, Word};

use crate::{FastHashMap, FastHashSet, FastIndexSet};

#[derive(Clone, Debug)]
enum TypeInfo {
    Int(Word),
    Float(Word),
    EncodedFloat(Word),
    Struct(Vec<Word>),
    Element(Word),
    Pointer(Word, Word),
    Other,
}

struct Instruction<'a> {
    op: u32,
    operands: &'a [Word],
}

fn instructions(words: &[Word]) -> impl Iterator<Item = Instruction<'_>> {
    let mut rest = words;
    core::iter::from_fn(move || {
        let (&first, _) = rest.split_first()?;
        let count = usize::try_from(first >> 16).ok()?.max(1);
        let instruction = rest.get(..count)?;
        rest = rest.get(count..).unwrap_or(&[]);
        Some(Instruction {
            op: first & 0xffff,
            operands: instruction.get(1..).unwrap_or(&[]),
        })
    })
}

const fn op(op: Op) -> u32 {
    op as u32
}

fn has_result_type(code: u32) -> bool {
    let Some(op) = Op::from_u32(code) else {
        return false;
    };
    !matches!(
        op,
        Op::Store
            | Op::CopyMemory
            | Op::CopyMemorySized
            | Op::LoopMerge
            | Op::SelectionMerge
            | Op::Label
            | Op::Branch
            | Op::BranchConditional
            | Op::Switch
            | Op::Kill
            | Op::Return
            | Op::ReturnValue
            | Op::Unreachable
            | Op::FunctionEnd
            | Op::ControlBarrier
            | Op::MemoryBarrier
            | Op::EmitVertex
            | Op::EndPrimitive
            | Op::EmitStreamVertex
            | Op::EndStreamPrimitive
            | Op::ImageWrite
            | Op::AtomicStore
            | Op::TerminateInvocation
            | Op::DemoteToHelperInvocation
            | Op::Line
            | Op::NoLine
            | Op::SetMeshOutputsEXT
            | Op::EmitMeshTasksEXT
            | Op::IgnoreIntersectionKHR
            | Op::TerminateRayKHR
            | Op::TraceRayKHR
            | Op::ExecuteCallableKHR
            | Op::RayQueryInitializeKHR
            | Op::RayQueryTerminateKHR
            | Op::RayQueryGenerateIntersectionKHR
            | Op::RayQueryConfirmIntersectionKHR
            | Op::Name
            | Op::MemberName
            | Op::Decorate
            | Op::MemberDecorate
    )
}

fn is_literal(code: u32, index: usize) -> bool {
    match Op::from_u32(code) {
        Some(Op::CompositeExtract | Op::Load | Op::Switch) => index >= 1,
        Some(Op::CompositeInsert | Op::VectorShuffle | Op::Store) => index >= 2,
        Some(Op::ExtInst) => index == 1,
        Some(Op::BranchConditional) => index >= 3,
        Some(Op::LoopMerge | Op::SelectionMerge) => true,
        _ => false,
    }
}

#[derive(Default)]
pub(super) struct Usage {
    pub capabilities: Vec<Capability>,
    pub extensions: Vec<&'static str>,
}

struct Module {
    types: FastHashMap<Word, TypeInfo>,
    value_types: FastHashMap<Word, Word>,
    buffer_blocks: FastHashSet<Word>,
    contained: FastHashMap<(Word, bool, Word), bool>,
}

impl Module {
    fn info(&self, id: Word) -> Option<&TypeInfo> {
        self.types.get(&id)
    }

    fn contains(&mut self, id: Word, float: bool, width: Word) -> bool {
        let types = &self.types;
        crate::proc::contains(
            (id, float, width),
            &mut self.contained,
            |(id, float, width), children| match types.get(&id) {
                Some(&TypeInfo::Int(found)) => !float && found == width,
                Some(&TypeInfo::Float(found)) => float && found == width,
                Some(&TypeInfo::Struct(ref members)) => {
                    children.extend(members.iter().map(|&member| (member, float, width)));
                    false
                }
                Some(&TypeInfo::Element(element)) => {
                    children.push((element, float, width));
                    false
                }
                Some(&(TypeInfo::Pointer(..) | TypeInfo::EncodedFloat(_) | TypeInfo::Other))
                | None => false,
            },
        )
    }

    fn basic(&self, mut id: Word) -> Option<&TypeInfo> {
        for _ in 0..=self.types.len() {
            match *self.info(id)? {
                TypeInfo::Element(element) | TypeInfo::Pointer(_, element) => id = element,
                ref other => return Some(other),
            }
        }
        None
    }

    fn storage_class(&self, pointer: Word) -> Option<Word> {
        let ty = self.value_types.get(&pointer)?;
        match *self.info(*ty)? {
            TypeInfo::Pointer(class, _) => Some(class),
            _ => None,
        }
    }
}

const fn class(storage: StorageClass) -> Word {
    storage as Word
}

pub(super) fn usage(declarations: &[Word], functions: &[Word], annotations: &[Word]) -> Usage {
    let mut module = Module {
        types: FastHashMap::default(),
        value_types: FastHashMap::default(),
        buffer_blocks: FastHashSet::default(),
        contained: FastHashMap::default(),
    };
    for instruction in instructions(annotations) {
        if instruction.op == op(Op::Decorate)
            && instruction.operands.get(1) == Some(&(spirv::Decoration::BufferBlock as Word))
        {
            if let Some(&target) = instruction.operands.first() {
                module.buffer_blocks.insert(target);
            }
        }
    }
    let mut capabilities: FastIndexSet<Capability> = FastIndexSet::default();
    let mut extensions: FastIndexSet<&'static str> = FastIndexSet::default();
    let mut variables = Vec::new();
    let mut constants = Vec::new();
    for instruction in instructions(declarations) {
        let operands = instruction.operands;
        let first = operands.first().copied();
        let second = operands.get(1).copied();
        let info = match Op::from_u32(instruction.op) {
            Some(Op::TypeInt) => second.map(TypeInfo::Int),
            Some(Op::TypeFloat) if operands.get(2).is_some() => second.map(TypeInfo::EncodedFloat),
            Some(Op::TypeFloat) => second.map(TypeInfo::Float),
            Some(Op::TypeStruct) => {
                Some(TypeInfo::Struct(operands.get(1..).unwrap_or(&[]).to_vec()))
            }
            Some(
                Op::TypeVector
                | Op::TypeMatrix
                | Op::TypeArray
                | Op::TypeRuntimeArray
                | Op::TypeVectorIdEXT
                | Op::TypeCooperativeMatrixKHR
                | Op::TypeCooperativeMatrixNV,
            ) => second.map(TypeInfo::Element),
            Some(Op::TypePointer) => match (second, operands.get(2)) {
                (Some(storage), Some(&pointee)) => Some(TypeInfo::Pointer(storage, pointee)),
                _ => None,
            },
            Some(
                Op::TypeVoid
                | Op::TypeBool
                | Op::TypeImage
                | Op::TypeSampler
                | Op::TypeSampledImage
                | Op::TypeFunction,
            ) => Some(TypeInfo::Other),
            _ => None,
        };
        if let (Some(info), Some(id)) = (info, first) {
            if let TypeInfo::Pointer(storage, _) = info {
                if storage == class(StorageClass::PhysicalStorageBuffer) {
                    variables.push((id, Some(storage)));
                }
            }
            module.types.insert(id, info);
            continue;
        }
        if let (Some(ty), Some(id)) = (first, second) {
            module.value_types.insert(id, ty);
            if instruction.op == op(Op::Variable) {
                variables.push((ty, operands.get(2).copied()));
            }
            let constant = [
                Op::SpecConstantOp,
                Op::Constant,
                Op::ConstantComposite,
                Op::SpecConstant,
                Op::SpecConstantComposite,
                Op::ConstantNull,
                Op::ConstantCompositeReplicateEXT,
                Op::SpecConstantCompositeReplicateEXT,
            ]
            .iter()
            .any(|candidate| instruction.op == op(*candidate));
            if constant {
                constants.push(ty);
            }
        }
    }
    for instruction in instructions(functions) {
        if has_result_type(instruction.op) {
            if let (Some(&ty), Some(&id)) =
                (instruction.operands.first(), instruction.operands.get(1))
            {
                module.value_types.insert(id, ty);
                if instruction.op == op(Op::Variable) {
                    variables.push((ty, instruction.operands.get(2).copied()));
                }
            }
        }
    }
    let mut add = |capability: Capability| {
        capabilities.insert(capability);
    };
    for ty in constants {
        if module.contains(ty, false, 8) {
            add(Capability::Int8);
        }
        if module.contains(ty, false, 16) {
            add(Capability::Int16);
        }
        if module.contains(ty, true, 16) {
            add(Capability::Float16);
        }
    }
    for (pointer, storage) in variables {
        let Some(TypeInfo::Pointer(_, pointee)) = module.info(pointer).cloned() else {
            continue;
        };
        let storage = storage.unwrap_or(class(StorageClass::Function));
        let float16 = module.contains(pointee, true, 16);
        let int16 = module.contains(pointee, false, 16);
        if float16 || int16 {
            let storage_capability = if storage == class(StorageClass::Input)
                || storage == class(StorageClass::Output)
            {
                Some(Capability::StorageInputOutput16)
            } else if storage == class(StorageClass::Uniform) {
                if module.buffer_blocks.contains(&pointee) {
                    Some(Capability::StorageBuffer16BitAccess)
                } else {
                    Some(Capability::UniformAndStorageBuffer16BitAccess)
                }
            } else if storage == class(StorageClass::PushConstant) {
                Some(Capability::StoragePushConstant16)
            } else if storage == class(StorageClass::StorageBuffer)
                || storage == class(StorageClass::PhysicalStorageBuffer)
            {
                Some(Capability::StorageBuffer16BitAccess)
            } else {
                None
            };
            match storage_capability {
                Some(capability) => {
                    extensions.insert("SPV_KHR_16bit_storage");
                    add(capability);
                }
                None => {
                    if float16 {
                        add(Capability::Float16);
                    }
                    if int16 {
                        add(Capability::Int16);
                    }
                }
            }
        }
        if module.contains(pointee, false, 8) {
            let storage_capability = if storage == class(StorageClass::PushConstant) {
                Some(Capability::StoragePushConstant8)
            } else if storage == class(StorageClass::Uniform) {
                Some(Capability::UniformAndStorageBuffer8BitAccess)
            } else if storage == class(StorageClass::StorageBuffer)
                || storage == class(StorageClass::PhysicalStorageBuffer)
            {
                Some(Capability::StorageBuffer8BitAccess)
            } else {
                None
            };
            match storage_capability {
                Some(capability) => {
                    extensions.insert("SPV_KHR_8bit_storage");
                    add(capability);
                }
                None => add(Capability::Int8),
            }
        }
    }
    let storage16 = [
        Capability::StorageInputOutput16,
        Capability::StoragePushConstant16,
        Capability::StorageBuffer16BitAccess,
        Capability::UniformAndStorageBuffer16BitAccess,
    ]
    .iter()
    .any(|capability| capabilities.contains(capability));
    let storage8 = [
        Capability::StoragePushConstant8,
        Capability::UniformAndStorageBuffer8BitAccess,
        Capability::StorageBuffer8BitAccess,
    ]
    .iter()
    .any(|capability| capabilities.contains(capability));
    let mut found = Vec::new();
    for instruction in instructions(functions) {
        let code = instruction.op;
        if code == op(Op::Variable)
            || code == op(Op::Function)
            || code == op(Op::FunctionParameter)
            || code == op(Op::Label)
        {
            continue;
        }
        let mut types = Vec::new();
        let ids = if has_result_type(code) {
            if let Some(&ty) = instruction.operands.first() {
                types.push(ty);
            }
            instruction.operands.get(2..).unwrap_or(&[])
        } else {
            instruction.operands
        };
        for (index, id) in ids.iter().enumerate() {
            if is_literal(code, index) {
                continue;
            }
            if let Some(ty) = module.value_types.get(id) {
                types.push(*ty);
            }
        }
        for ty in types {
            post_process(
                &mut module,
                &instruction,
                ty,
                storage16,
                storage8,
                &mut found,
            );
        }
    }
    for capability in found {
        capabilities.insert(capability);
    }
    let declared = |float: bool, width: Word| {
        module.types.values().any(|info| match *info {
            TypeInfo::Int(found) => !float && found == width,
            TypeInfo::Float(found) => float && found == width,
            _ => false,
        })
    };
    let covered = |capabilities: &FastIndexSet<Capability>, candidates: &[Capability]| {
        candidates
            .iter()
            .any(|capability| capabilities.contains(capability))
    };
    let eight = [
        Capability::Int8,
        Capability::StoragePushConstant8,
        Capability::UniformAndStorageBuffer8BitAccess,
        Capability::StorageBuffer8BitAccess,
    ];
    if declared(true, 16) && !covered(&capabilities, &[Capability::Float16]) && !storage16 {
        capabilities.insert(Capability::Float16);
    }
    if declared(false, 16) && !covered(&capabilities, &[Capability::Int16]) && !storage16 {
        capabilities.insert(Capability::Int16);
    }
    if declared(false, 8) && !covered(&capabilities, &eight) {
        capabilities.insert(Capability::Int8);
    }
    Usage {
        capabilities: capabilities.into_iter().collect(),
        extensions: extensions.into_iter().collect(),
    }
}

fn post_process(
    module: &mut Module,
    instruction: &Instruction<'_>,
    ty: Word,
    storage16: bool,
    storage8: bool,
    found: &mut Vec<Capability>,
) {
    let basic = module.basic(ty);
    let (int, float, structure) = match basic {
        Some(&TypeInfo::Int(width)) => (Some(width), None, false),
        Some(&(TypeInfo::Float(width) | TypeInfo::EncodedFloat(width))) => {
            (None, Some(width), false)
        }
        Some(&TypeInfo::Struct(_)) => (None, None, true),
        _ => (None, None, false),
    };
    let code = instruction.op;
    if code == op(Op::Load) || code == op(Op::Store) {
        if structure {
            if module.contains(ty, false, 8) {
                found.push(Capability::Int8);
            }
            if module.contains(ty, false, 16) {
                found.push(Capability::Int16);
            }
            if module.contains(ty, true, 16) {
                found.push(Capability::Float16);
            }
            return;
        }
        let pointer = if code == op(Op::Load) {
            instruction.operands.get(2)
        } else {
            instruction.operands.first()
        };
        let storage = pointer.and_then(|pointer| module.storage_class(*pointer));
        let buffer = storage.is_some_and(|storage| {
            [
                StorageClass::PhysicalStorageBuffer,
                StorageClass::Uniform,
                StorageClass::StorageBuffer,
                StorageClass::PushConstant,
            ]
            .iter()
            .any(|candidate| class(*candidate) == storage)
        });
        let interface = storage.is_some_and(|storage| {
            storage == class(StorageClass::Input) || storage == class(StorageClass::Output)
        });
        if (int == Some(8) || float == Some(8)) && !buffer {
            found.push(Capability::Int8);
        }
        if !buffer && !interface {
            if int == Some(16) {
                found.push(Capability::Int16);
            }
            if float == Some(16) {
                found.push(Capability::Float16);
            }
        }
        return;
    }
    if code == op(Op::CopyObject) {
        return;
    }
    if code == op(Op::FConvert) || code == op(Op::SConvert) || code == op(Op::UConvert) {
        if !storage16 {
            if module.contains(ty, true, 16) {
                found.push(Capability::Float16);
            }
            if module.contains(ty, false, 16) {
                found.push(Capability::Int16);
            }
        }
        if module.contains(ty, false, 8) && !storage8 {
            found.push(Capability::Int8);
        }
        return;
    }
    if code == op(Op::AccessChain) || code == op(Op::PtrAccessChain) {
        if matches!(module.info(ty), Some(TypeInfo::Pointer(..))) {
            return;
        }
        match int {
            Some(16) => found.push(Capability::Int16),
            Some(8) => found.push(Capability::Int8),
            _ => {}
        }
        return;
    }
    let extended = code == op(Op::ExtInst);
    match (int, float) {
        (Some(16), _) => found.push(Capability::Int16),
        (Some(8), _) => found.push(Capability::Int8),
        (Some(64), _) if !extended => found.push(Capability::Int64),
        (_, Some(16)) => found.push(Capability::Float16),
        (_, Some(64)) if !extended => found.push(Capability::Float64),
        _ => {}
    }
}
