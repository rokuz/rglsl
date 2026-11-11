use alloc::{format, vec::Vec};

use spirv::{Op, Word};

use super::{
    block::ExpressionPointer, Block, BlockContext, Error, Instruction, LocalType, LookupType,
    NumericType, Writer, WriterFlags,
};
use crate::{arena::Handle, DescriptorHeap, Module, StorageAccess, TypeInner};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum Value {
    Known(u32),
    Id(Word),
}

#[derive(Clone, Copy, Debug)]
pub(super) struct HeapRoot {
    pub base_type: Word,
    pub wrapped: bool,
    pub byte_offset: Option<Word>,
}

#[derive(Debug, Default)]
pub(super) struct HeapState {
    variables: [Option<Word>; 2],
    byte_array: Option<Word>,
    roots: crate::FastHashMap<Handle<crate::GlobalVariable>, HeapRoot>,
    sizes: crate::FastHashMap<(Handle<crate::Type>, Option<u32>), Value>,
    aligns: crate::FastHashMap<(Handle<crate::Type>, Option<u32>), Value>,
    strides: crate::FastHashMap<Handle<crate::Type>, Value>,
    offsets: crate::FastHashMap<Handle<crate::Type>, Vec<Value>>,
    size_of: crate::FastHashMap<Word, Word>,
    deferred: crate::FastHashSet<Handle<crate::Type>>,
    blocks: crate::FastHashSet<Word>,
}

const fn heap_index(heap: DescriptorHeap) -> usize {
    match heap {
        DescriptorHeap::Resource => 0,
        DescriptorHeap::Sampler => 1,
    }
}

fn is_descriptor(module: &Module, ty: Handle<crate::Type>) -> bool {
    match module.types[ty].inner {
        TypeInner::Image { .. }
        | TypeInner::Sampler { .. }
        | TypeInner::AccelerationStructure { .. }
        | TypeInner::Tensor { .. }
        | TypeInner::BufferDescriptor { .. } => true,
        TypeInner::Array { base, .. } => is_descriptor(module, base),
        _ => false,
    }
}

pub(super) fn contains_descriptor(module: &Module, ty: Handle<crate::Type>) -> bool {
    match module.types[ty].inner {
        TypeInner::Image { .. }
        | TypeInner::Sampler { .. }
        | TypeInner::AccelerationStructure { .. }
        | TypeInner::Tensor { .. }
        | TypeInner::BufferDescriptor { .. } => true,
        TypeInner::Array { base, .. } => contains_descriptor(module, base),
        TypeInner::Struct { ref members, .. } => members
            .iter()
            .any(|member| contains_descriptor(module, member.ty)),
        _ => false,
    }
}

fn innermost(module: &Module, ty: Handle<crate::Type>) -> Handle<crate::Type> {
    match module.types[ty].inner {
        TypeInner::Array { base, .. } => innermost(module, base),
        _ => ty,
    }
}

fn scalar_layout(
    module: &Module,
    ty: Handle<crate::Type>,
    matrix: Option<crate::MatrixLayout>,
) -> (u32, u32) {
    match module.types[ty].inner {
        TypeInner::Scalar(scalar) | TypeInner::Atomic(scalar) => {
            (u32::from(scalar.width), u32::from(scalar.width))
        }
        TypeInner::Vector { size, scalar } => (
            u32::from(scalar.width) * size as u32,
            u32::from(scalar.width),
        ),
        TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } => {
            let width = u32::from(scalar.width);
            let (line, count) = match matrix {
                Some(layout) if layout.row_major => (layout.stride, rows as u32),
                Some(layout) => (layout.stride, columns as u32),
                None => (width * rows as u32, columns as u32),
            };
            (line * count, width)
        }
        TypeInner::Pointer { .. } => (8, 8),
        TypeInner::Array { base, size, stride } => {
            let (element, alignment) = scalar_layout(module, base, matrix);
            let count = match size {
                crate::ArraySize::Constant(count) => count.get(),
                crate::ArraySize::Pending(_) | crate::ArraySize::Dynamic => 1,
            };
            (
                stride
                    .saturating_mul(count.saturating_sub(1))
                    .saturating_add(element),
                alignment,
            )
        }
        TypeInner::Struct { ref members, .. } => {
            let mut size = 0;
            let mut alignment = 0;
            for member in members {
                let (member_size, member_alignment) =
                    scalar_layout(module, member.ty, member.matrix_layout);
                size = size.max(member.offset.saturating_add(member_size));
                alignment = alignment.max(member_alignment);
            }
            (size, alignment.max(1))
        }
        _ => (0, 1),
    }
}

const fn round_up(value: u32, alignment: u32) -> u32 {
    if alignment <= 1 {
        value
    } else {
        value.div_ceil(alignment).saturating_mul(alignment)
    }
}

fn storage_image_access(module: &Module, ty: Handle<crate::Type>) -> Option<StorageAccess> {
    match module.types[ty].inner {
        TypeInner::Array { base, .. } => storage_image_access(module, base),
        TypeInner::Image {
            class: crate::ImageClass::Storage { access, .. },
            ..
        } => Some(access),
        _ => None,
    }
}

impl Instruction {
    fn type_untyped_pointer(id: Word, class: spirv::StorageClass) -> Self {
        let mut instruction = Self::new(Op::TypeUntypedPointerKHR);
        instruction.set_result(id);
        instruction.add_operand(class as u32);
        instruction
    }

    fn type_buffer(id: Word, class: spirv::StorageClass) -> Self {
        let mut instruction = Self::new(Op::TypeBufferEXT);
        instruction.set_result(id);
        instruction.add_operand(class as u32);
        instruction
    }

    fn untyped_variable(result_type_id: Word, id: Word, class: spirv::StorageClass) -> Self {
        let mut instruction = Self::new(Op::UntypedVariableKHR);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(class as u32);
        instruction
    }

    fn untyped_access_chain(
        result_type_id: Word,
        id: Word,
        base_type_id: Word,
        base_id: Word,
        indices: &[Word],
    ) -> Self {
        let mut instruction = Self::new(Op::UntypedAccessChainKHR);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(base_type_id);
        instruction.add_operand(base_id);
        for &index in indices {
            instruction.add_operand(index);
        }
        instruction
    }

    fn buffer_pointer(result_type_id: Word, id: Word, descriptor_id: Word) -> Self {
        let mut instruction = Self::new(Op::BufferPointerEXT);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(descriptor_id);
        instruction
    }

    fn constant_size_of(result_type_id: Word, id: Word, type_id: Word) -> Self {
        let mut instruction = Self::new(Op::ConstantSizeOfEXT);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(type_id);
        instruction
    }

    fn decorate_id(target_id: Word, decoration: spirv::Decoration, operand: Word) -> Self {
        let mut instruction = Self::new(Op::DecorateId);
        instruction.add_operand(target_id);
        instruction.add_operand(decoration as u32);
        instruction.add_operand(operand);
        instruction
    }

    fn member_decorate_id(
        target_id: Word,
        member: Word,
        decoration: spirv::Decoration,
        operand: Word,
    ) -> Self {
        let mut instruction = Self::new(Op::MemberDecorateIdEXT);
        instruction.add_operand(target_id);
        instruction.add_operand(member);
        instruction.add_operand(decoration as u32);
        instruction.add_operand(operand);
        instruction
    }
}

impl Writer {
    pub(super) fn write_heap_type_local(&mut self, id: Word, local: LocalType) {
        let instruction = match local {
            LocalType::UntypedPointer { class } => Instruction::type_untyped_pointer(id, class),
            LocalType::BufferDescriptor { class } => {
                if class == spirv::StorageClass::StorageBuffer && self.lang_version() < (1, 3) {
                    self.use_extension("SPV_KHR_storage_buffer_storage_class");
                }
                Instruction::type_buffer(id, class)
            }
            _ => return,
        };
        instruction.to_words(&mut self.logical_layout.declarations);
    }

    fn use_heaps(&mut self) -> Result<(), Error> {
        self.require_any("descriptor heaps", &[spirv::Capability::UntypedPointersKHR])?;
        self.require_any("descriptor heaps", &[spirv::Capability::DescriptorHeapEXT])?;
        self.use_extension("SPV_EXT_descriptor_heap");
        self.use_extension("SPV_KHR_untyped_pointers");
        Ok(())
    }

    pub(super) fn heap_variable(&mut self, heap: DescriptorHeap) -> Result<Word, Error> {
        if let Some(id) = self.heap.variables[heap_index(heap)] {
            return Ok(id);
        }
        self.use_heaps()?;
        let class = spirv::StorageClass::UniformConstant;
        let type_id = self.get_localtype_id(LocalType::UntypedPointer { class });
        let id = self.id_gen.next();
        Instruction::untyped_variable(type_id, id, class)
            .to_words(&mut self.logical_layout.declarations);
        let (built_in, name) = match heap {
            DescriptorHeap::Resource => (spirv::BuiltIn::ResourceHeapEXT, "resource_heap"),
            DescriptorHeap::Sampler => (spirv::BuiltIn::SamplerHeapEXT, "sampler_heap"),
        };
        self.decorate(id, spirv::Decoration::BuiltIn, &[built_in as u32]);
        if self.flags.contains(WriterFlags::DEBUG) {
            self.debugs.push(Instruction::name(id, name));
        }
        self.heap.variables[heap_index(heap)] = Some(id);
        Ok(id)
    }

    pub(super) fn heap_variable_ids(&self) -> Vec<Word> {
        self.heap.variables.iter().flatten().copied().collect()
    }

    pub(super) fn heap_root(&self, global: Handle<crate::GlobalVariable>) -> Option<HeapRoot> {
        self.heap.roots.get(&global).copied()
    }

    pub(super) fn heap_laid_out(&mut self, module: &Module) {
        for (_, var) in module.global_variables.iter() {
            if let crate::AddressSpace::DescriptorHeap(_) = var.space {
                self.mark_heap_laid_out(module, var.ty);
            }
        }
    }

    fn mark_heap_laid_out(&mut self, module: &Module, ty: Handle<crate::Type>) {
        if !contains_descriptor(module, ty) {
            super::writer::mark_laid_out(&module.types, &mut self.laid_out_types, ty);
            return;
        }
        match module.types[ty].inner {
            TypeInner::Array { base, .. } => self.mark_heap_laid_out(module, base),
            TypeInner::Struct { ref members, .. } => {
                for member in members {
                    self.mark_heap_laid_out(module, member.ty);
                }
            }
            TypeInner::BufferDescriptor { base, .. } => {
                super::writer::mark_laid_out(&module.types, &mut self.laid_out_types, base);
            }
            _ => {}
        }
    }

    fn uint_type(&mut self) -> Word {
        self.get_u32_type_id()
    }

    fn value_id(&mut self, value: Value) -> Word {
        match value {
            Value::Known(value) => self.get_constant_scalar(crate::Literal::U32(value)),
            Value::Id(id) => id,
        }
    }

    fn heap_op(&mut self, op: Op, left: Value, right: Value) -> Value {
        if let (Value::Known(a), Value::Known(b)) = (left, right) {
            let folded = match op {
                Op::IAdd => a.checked_add(b),
                Op::ISub => a.checked_sub(b),
                Op::IMul => a.checked_mul(b),
                Op::UMod => a.checked_rem(b),
                _ => None,
            };
            if let Some(folded) = folded {
                return Value::Known(folded);
            }
        }
        let type_id = self.uint_type();
        let operands = [self.value_id(left), self.value_id(right)];
        Value::Id(self.heap_spec_op(type_id, op, &operands))
    }

    fn heap_spec_op(&mut self, type_id: Word, op: Op, operands: &[Word]) -> Word {
        let id = self.id_gen.next();
        let mut instruction = Instruction::new(Op::SpecConstantOp);
        instruction.set_type(type_id);
        instruction.set_result(id);
        instruction.add_operand(op as u32);
        for &operand in operands {
            instruction.add_operand(operand);
        }
        instruction.to_words(&mut self.logical_layout.declarations);
        id
    }

    fn align_to(&mut self, value: Value, alignment: Value) -> Value {
        if let (Value::Known(value), Value::Known(alignment)) = (value, alignment) {
            if alignment > 0 {
                return Value::Known(round_up(value, alignment));
            }
        }
        let remainder = self.heap_op(Op::UMod, value, alignment);
        let missing = self.heap_op(Op::ISub, alignment, remainder);
        let padding = self.heap_op(Op::UMod, missing, alignment);
        self.heap_op(Op::IAdd, value, padding)
    }

    fn select_max(&mut self, left: Value, right: Value) -> Value {
        if let (Value::Known(a), Value::Known(b)) = (left, right) {
            return Value::Known(a.max(b));
        }
        let bool_type = self.get_bool_type_id();
        let operands = [self.value_id(left), self.value_id(right)];
        let greater = self.heap_spec_op(bool_type, Op::UGreaterThan, &operands);
        let type_id = self.uint_type();
        Value::Id(self.heap_spec_op(type_id, Op::Select, &[greater, operands[0], operands[1]]))
    }

    fn constant_size_of(&mut self, type_id: Word) -> Value {
        if let Some(&id) = self.heap.size_of.get(&type_id) {
            return Value::Id(id);
        }
        let result_type = self.uint_type();
        let id = self.id_gen.next();
        Instruction::constant_size_of(result_type, id, type_id)
            .to_words(&mut self.logical_layout.declarations);
        self.heap.size_of.insert(type_id, id);
        Value::Id(id)
    }

    fn value_size(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        size: Option<u32>,
    ) -> Result<Value, Error> {
        if let Some(&value) = self.heap.sizes.get(&(ty, size)) {
            return Ok(value);
        }
        let value = if is_descriptor(module, ty) {
            match size {
                Some(size) => Value::Known(size),
                None => {
                    let type_id = self.get_handle_type_id(ty)?;
                    self.constant_size_of(type_id)
                }
            }
        } else if contains_descriptor(module, ty) {
            self.struct_size(module, ty)?
        } else {
            let (size, alignment) = scalar_layout(module, ty, None);
            Value::Known(round_up(size, alignment))
        };
        self.heap.sizes.insert((ty, size), value);
        Ok(value)
    }

    fn value_align(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        size: Option<u32>,
    ) -> Result<Value, Error> {
        if let Some(&value) = self.heap.aligns.get(&(ty, size)) {
            return Ok(value);
        }
        let value = if is_descriptor(module, ty) {
            self.value_size(module, ty, size)?
        } else if contains_descriptor(module, ty) {
            self.struct_align(module, ty)?
        } else {
            Value::Known(scalar_layout(module, ty, None).1)
        };
        self.heap.aligns.insert((ty, size), value);
        Ok(value)
    }

    fn array_stride(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        size: Option<u32>,
    ) -> Result<Value, Error> {
        if let Some(&value) = self.heap.strides.get(&ty) {
            return Ok(value);
        }
        let TypeInner::Array { base, stride, .. } = module.types[ty].inner else {
            return Ok(Value::Known(0));
        };
        let value = if !contains_descriptor(module, ty) {
            Value::Known(stride)
        } else if let TypeInner::Array {
            size: inner_size, ..
        } = module.types[base].inner
        {
            let inner = self.array_stride(module, base, size)?;
            match inner_size {
                crate::ArraySize::Constant(count) => {
                    self.heap_op(Op::IMul, inner, Value::Known(count.get()))
                }
                crate::ArraySize::Pending(handle) => {
                    let count = self.written_override_id(handle)?;
                    self.heap_op(Op::IMul, inner, Value::Id(count))
                }
                crate::ArraySize::Dynamic => inner,
            }
        } else if stride != 0 {
            Value::Known(stride)
        } else {
            self.value_size(module, base, size)?
        };
        self.heap.strides.insert(ty, value);
        Ok(value)
    }

    fn member_size(
        &mut self,
        module: &Module,
        member: &crate::StructMember,
    ) -> Result<Value, Error> {
        let size = member.heap.and_then(|heap| heap.size);
        Ok(match module.types[member.ty].inner {
            TypeInner::Array {
                size: array_size, ..
            } => {
                if !contains_descriptor(module, member.ty) {
                    return Ok(Value::Known(
                        scalar_layout(module, member.ty, member.matrix_layout).0,
                    ));
                }
                let stride = self.array_stride(module, member.ty, size)?;
                match array_size {
                    crate::ArraySize::Constant(count) => {
                        self.heap_op(Op::IMul, stride, Value::Known(count.get()))
                    }
                    crate::ArraySize::Pending(handle) => {
                        let count = self.written_override_id(handle)?;
                        self.heap_op(Op::IMul, stride, Value::Id(count))
                    }
                    crate::ArraySize::Dynamic => stride,
                }
            }
            TypeInner::Matrix { .. } => {
                let (size, alignment) = scalar_layout(module, member.ty, member.matrix_layout);
                Value::Known(round_up(size, alignment))
            }
            _ => self.value_size(module, member.ty, size)?,
        })
    }

    fn member_align(
        &mut self,
        module: &Module,
        member: &crate::StructMember,
    ) -> Result<Value, Error> {
        let size = member.heap.and_then(|heap| heap.size);
        Ok(match module.types[member.ty].inner {
            TypeInner::Array { .. } if !contains_descriptor(module, member.ty) => {
                Value::Known(scalar_layout(module, member.ty, member.matrix_layout).1)
            }
            TypeInner::Array { .. } => {
                let element = innermost(module, member.ty);
                self.value_align(module, element, size)?
            }
            _ => self.value_align(module, member.ty, size)?,
        })
    }

    fn struct_offsets(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
    ) -> Result<Vec<Value>, Error> {
        if let Some(offsets) = self.heap.offsets.get(&ty) {
            return Ok(offsets.clone());
        }
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Ok(Vec::new());
        };
        let mut offsets = Vec::with_capacity(members.len());
        let mut current = Value::Known(0);
        let mut previous: Option<&crate::StructMember> = None;
        for member in members {
            if let Some(explicit) = member.heap.and_then(|heap| heap.offset) {
                current = Value::Known(explicit);
            } else if let Some(previous) = previous {
                let size = self.member_size(module, previous)?;
                let unaligned = self.heap_op(Op::IAdd, current, size);
                let alignment = self.member_align(module, member)?;
                current = self.align_to(unaligned, alignment);
            }
            offsets.push(current);
            previous = Some(member);
        }
        self.heap.offsets.insert(ty, offsets.clone());
        Ok(offsets)
    }

    fn struct_align(&mut self, module: &Module, ty: Handle<crate::Type>) -> Result<Value, Error> {
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Ok(Value::Known(1));
        };
        let mut alignment = None;
        for member in members {
            let member_alignment = self.member_align(module, member)?;
            alignment = Some(match alignment {
                None => member_alignment,
                Some(current) => self.select_max(current, member_alignment),
            });
        }
        Ok(alignment.unwrap_or(Value::Known(1)))
    }

    fn struct_size(&mut self, module: &Module, ty: Handle<crate::Type>) -> Result<Value, Error> {
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Ok(Value::Known(0));
        };
        let Some(last) = members.last() else {
            return Ok(Value::Known(0));
        };
        let offsets = self.struct_offsets(module, ty)?;
        let last_offset = offsets.last().copied().unwrap_or(Value::Known(0));
        let size = self.member_size(module, last)?;
        let raw = self.heap_op(Op::IAdd, last_offset, size);
        let alignment = self.struct_align(module, ty)?;
        Ok(self.align_to(raw, alignment))
    }

    pub(super) fn heap_array_layout(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        id: Word,
    ) -> Result<(), Error> {
        if !contains_descriptor(module, ty) {
            return Ok(());
        }
        let stride = self.array_stride(module, ty, None)?;
        let stride = self.value_id(stride);
        self.annotations.push(Instruction::decorate_id(
            id,
            spirv::Decoration::ArrayStrideIdEXT,
            stride,
        ));
        Ok(())
    }

    pub(super) fn heap_struct_layout(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        id: Word,
    ) -> Result<(), Error> {
        if !contains_descriptor(module, ty) {
            return Ok(());
        }
        let offsets = self.struct_offsets(module, ty)?;
        let offsets: Vec<Value> = offsets
            .into_iter()
            .map(|offset| Value::Id(self.value_id(offset)))
            .collect();
        self.decorate_heap_members(module, ty, id, &offsets)
    }

    fn decorate_heap_members(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        id: Word,
        offsets: &[Value],
    ) -> Result<(), Error> {
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Ok(());
        };
        for (index, (member, &offset)) in members.iter().zip(offsets).enumerate() {
            let index =
                u32::try_from(index).map_err(|_| Error::Validation("too many struct members"))?;
            if let Some(layout) = member.matrix_layout {
                let majorness = if layout.row_major {
                    spirv::Decoration::RowMajor
                } else {
                    spirv::Decoration::ColMajor
                };
                self.annotations
                    .push(Instruction::member_decorate(id, index, majorness, &[]));
                self.annotations.push(Instruction::member_decorate(
                    id,
                    index,
                    spirv::Decoration::MatrixStride,
                    &[layout.stride],
                ));
            }
            let offset = self.value_id(offset);
            self.annotations.push(Instruction::member_decorate_id(
                id,
                index,
                spirv::Decoration::OffsetIdEXT,
                offset,
            ));
        }
        Ok(())
    }

    pub(super) fn prepare_heaps(&mut self, module: &Module) {
        self.heap_laid_out(module);
        for (_, var) in module.global_variables.iter() {
            if let crate::AddressSpace::DescriptorHeap(_) = var.space {
                let structure = matches!(module.types[var.ty].inner, TypeInner::Struct { .. });
                if structure && var.heap_offset.is_some() && contains_descriptor(module, var.ty) {
                    self.heap.deferred.insert(var.ty);
                }
            }
        }
    }

    pub(super) fn is_deferred_heap_type(&self, ty: Handle<crate::Type>) -> bool {
        self.heap.deferred.contains(&ty)
    }

    fn write_deferred_root(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        root: Value,
    ) -> Result<Word, Error> {
        if let Some(&id) = self.lookup_type.get(&LookupType::Handle(ty)) {
            return Ok(id);
        }
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Err(Error::Validation("a deferred heap root is not a struct"));
        };
        let mut offsets = self.struct_offsets(module, ty)?;
        for offset in offsets.iter_mut() {
            *offset = match *offset {
                Value::Known(0) => root,
                other => self.heap_op(Op::IAdd, root, other),
            };
        }
        for offset in offsets.iter_mut() {
            *offset = Value::Id(self.value_id(*offset));
        }
        let member_ids = members
            .iter()
            .map(|member| self.get_handle_type_id(member.ty))
            .collect::<Result<Vec<Word>, Error>>()?;
        let id = self.id_gen.next();
        Instruction::type_struct(id, &member_ids).to_words(&mut self.logical_layout.declarations);
        self.lookup_type.insert(LookupType::Handle(ty), id);
        self.decorate_heap_members(module, ty, id, &offsets)?;
        if self.flags.contains(WriterFlags::DEBUG) {
            if let Some(ref name) = module.types[ty].name {
                self.debugs.push(Instruction::name(id, name));
            }
            for (index, member) in members.iter().enumerate() {
                if let (Some(name), Ok(index)) = (member.name.as_ref(), u32::try_from(index)) {
                    self.debugs.push(Instruction::member_name(id, index, name));
                }
            }
        }
        Ok(id)
    }

    fn decorate_buffer_descriptors(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
    ) -> Result<(), Error> {
        match module.types[ty].inner {
            TypeInner::Array { base, .. } => self.decorate_buffer_descriptors(module, base)?,
            TypeInner::Struct { ref members, .. } => {
                for member in members {
                    if contains_descriptor(module, member.ty) {
                        self.decorate_buffer_descriptors(module, member.ty)?;
                    }
                }
            }
            TypeInner::BufferDescriptor { base, space } => {
                let block_id = self.get_handle_type_id(base)?;
                if self.buffer_blocks.insert(block_id) {
                    self.decorate(block_id, spirv::Decoration::Block, &[]);
                }
                if let crate::AddressSpace::Storage { access } = space {
                    if self.heap.blocks.insert(block_id) {
                        self.decorate_buffer_access(module, base, block_id, access);
                    }
                }
            }
            _ => {}
        }
        Ok(())
    }

    fn decorate_buffer_access(
        &mut self,
        module: &Module,
        base: Handle<crate::Type>,
        block_id: Word,
        access: StorageAccess,
    ) {
        let TypeInner::Struct { ref members, .. } = module.types[base].inner else {
            return;
        };
        for index in 0..members.len() {
            let Ok(index) = u32::try_from(index) else {
                return;
            };
            if !access.contains(StorageAccess::STORE) {
                self.annotations.push(Instruction::member_decorate(
                    block_id,
                    index,
                    spirv::Decoration::NonWritable,
                    &[],
                ));
            }
            if !access.contains(StorageAccess::LOAD) {
                self.annotations.push(Instruction::member_decorate(
                    block_id,
                    index,
                    spirv::Decoration::NonReadable,
                    &[],
                ));
            }
        }
    }

    fn byte_array(&mut self) -> Result<Word, Error> {
        if let Some(id) = self.heap.byte_array {
            return Ok(id);
        }
        self.require_any("descriptor heap offsets", &[spirv::Capability::Int8])?;
        let element = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::U8));
        let id = self.id_gen.next();
        Instruction::type_runtime_array(id, element)
            .to_words(&mut self.logical_layout.declarations);
        self.decorate(id, spirv::Decoration::ArrayStride, &[1]);
        self.heap.byte_array = Some(id);
        Ok(id)
    }

    pub(super) fn write_heap_layouts(&mut self, module: &Module) -> Result<(), Error> {
        for (handle, var) in module.global_variables.iter() {
            let crate::AddressSpace::DescriptorHeap(_) = var.space else {
                continue;
            };
            let ty = var.ty;
            let descriptors = contains_descriptor(module, ty);
            let structure = matches!(module.types[ty].inner, TypeInner::Struct { .. });
            let folded = self.is_deferred_heap_type(ty);
            let mut base_type = match var.heap_offset {
                Some(offset) if folded => {
                    let root = Value::Id(self.constant_ids[offset]);
                    self.write_deferred_root(module, ty, root)?
                }
                _ => self.get_handle_type_id(ty)?,
            };
            self.decorate_buffer_descriptors(module, ty)?;
            if structure {
                let runtime = match module.types[ty].inner {
                    TypeInner::Struct { ref members, .. } => members.last().is_some_and(|member| {
                        matches!(
                            module.types[member.ty].inner,
                            TypeInner::Array {
                                size: crate::ArraySize::Dynamic,
                                ..
                            }
                        )
                    }),
                    _ => false,
                };
                if (!descriptors || runtime) && self.buffer_blocks.insert(base_type) {
                    self.decorate(base_type, spirv::Decoration::Block, &[]);
                }
            }
            let byte_offset = match var.heap_offset {
                Some(offset) if !folded => {
                    self.byte_array()?;
                    Some(self.constant_ids[offset])
                }
                _ => None,
            };
            let access = storage_image_access(module, ty)
                .filter(|access| !access.contains(StorageAccess::LOAD | StorageAccess::STORE))
                .filter(|_| matches!(module.types[ty].inner, TypeInner::Array { .. }));
            if let Some(access) = access {
                let zero = self.get_constant_scalar(crate::Literal::U32(0));
                let wrapper = self.id_gen.next();
                Instruction::type_struct(wrapper, &[base_type])
                    .to_words(&mut self.logical_layout.declarations);
                self.decorate(wrapper, spirv::Decoration::Block, &[]);
                if !access.contains(StorageAccess::LOAD) {
                    self.annotations.push(Instruction::member_decorate(
                        wrapper,
                        0,
                        spirv::Decoration::NonReadable,
                        &[],
                    ));
                }
                if !access.contains(StorageAccess::STORE) {
                    self.annotations.push(Instruction::member_decorate(
                        wrapper,
                        0,
                        spirv::Decoration::NonWritable,
                        &[],
                    ));
                }
                self.annotations.push(Instruction::member_decorate_id(
                    wrapper,
                    0,
                    spirv::Decoration::OffsetIdEXT,
                    zero,
                ));
                if self.flags.contains(WriterFlags::DEBUG) {
                    if let Some(ref name) = var.name {
                        self.debugs
                            .push(Instruction::name(wrapper, &format!("{name}_heap")));
                        self.debugs.push(Instruction::member_name(wrapper, 0, name));
                    }
                }
                base_type = wrapper;
            }
            self.heap.roots.insert(
                handle,
                HeapRoot {
                    base_type,
                    wrapped: access.is_some(),
                    byte_offset,
                },
            );
        }
        Ok(())
    }
}

impl BlockContext<'_> {
    pub(super) fn heap_global(
        &self,
        expr: Handle<crate::Expression>,
    ) -> Option<Handle<crate::GlobalVariable>> {
        match self.ir_function.expressions[expr] {
            crate::Expression::GlobalVariable(handle) => {
                match self.ir_module.global_variables[handle].space {
                    crate::AddressSpace::DescriptorHeap(_) => Some(handle),
                    _ => None,
                }
            }
            _ => None,
        }
    }

    pub(super) fn write_heap_chain(
        &mut self,
        global: Handle<crate::GlobalVariable>,
        offset: Option<Handle<crate::Expression>>,
        result_type_id: Word,
        indices: &[Word],
        block: &mut Block,
    ) -> Result<Word, Error> {
        let var = &self.ir_module.global_variables[global];
        let crate::AddressSpace::DescriptorHeap(heap) = var.space else {
            return Err(Error::Validation("not a descriptor heap view"));
        };
        let root = self
            .writer
            .heap_root(global)
            .ok_or(Error::Validation("a descriptor heap view is not written"))?;
        let mut base = self.writer.heap_variable(heap)?;
        let byte_offset = match offset {
            Some(offset) => Some(self.cached.get(offset)?),
            None => root.byte_offset,
        };
        if let Some(byte_offset) = byte_offset {
            let byte_array = self.writer.byte_array()?;
            let id = self.gen_id();
            block.body.push(Instruction::untyped_access_chain(
                result_type_id,
                id,
                byte_array,
                base,
                &[byte_offset],
            ));
            base = id;
        }
        let mut operands = Vec::with_capacity(indices.len() + 1);
        if root.wrapped {
            operands.push(self.get_index_constant(0));
        }
        operands.extend_from_slice(indices);
        let id = self.gen_id();
        block.body.push(Instruction::untyped_access_chain(
            result_type_id,
            id,
            root.base_type,
            base,
            &operands,
        ));
        if self.writer.flags.contains(WriterFlags::DEBUG) {
            if let Some(ref name) = var.name {
                self.writer.debugs.push(Instruction::name(id, name));
            }
        }
        Ok(id)
    }

    pub(super) fn write_heap_texel_pointer(
        &mut self,
        texel: &crate::Texel,
        block: &mut Block,
    ) -> Result<Option<Word>, Error> {
        let crate::Expression::Load { pointer } = self.ir_function.expressions[texel.image] else {
            return Ok(None);
        };
        let heap = matches!(
            *self.fun_info[pointer].ty.inner_with(&self.ir_module.types),
            TypeInner::Pointer {
                space: crate::AddressSpace::DescriptorHeap(_),
                ..
            }
        );
        if !heap {
            return Ok(None);
        }
        let chain = match self.write_access_chain(
            pointer,
            block,
            super::block::AccessTypeAdjustment::None,
        )? {
            ExpressionPointer::Ready { pointer_id } => pointer_id,
            ExpressionPointer::Conditional { .. } => {
                return Err(Error::Validation("a heap image is not addressable"))
            }
        };
        let image_type_id = self.get_expression_type_id(&self.fun_info[texel.image].ty)?;
        let pointer_type_id = self.writer.get_localtype_id(LocalType::UntypedPointer {
            class: spirv::StorageClass::Image,
        });
        let coordinates =
            self.write_image_coordinates(texel.coordinate, texel.array_index, block)?;
        let sample_id = match texel.sample {
            Some(sample) => self.cached.get(sample)?,
            None => self.writer.get_constant_scalar(crate::Literal::U32(0)),
        };
        let id = self.gen_id();
        let mut instruction = Instruction::new(Op::UntypedImageTexelPointerEXT);
        instruction.set_type(pointer_type_id);
        instruction.set_result(id);
        instruction.add_operand(image_type_id);
        instruction.add_operand(chain);
        instruction.add_operand(coordinates.value_id);
        instruction.add_operand(sample_id);
        block.body.push(instruction);
        if self
            .non_uniform(texel.image)
            .contains(crate::NonUniform::VALUE)
        {
            self.writer.decorate_non_uniform(id)?;
        }
        Ok(Some(id))
    }

    pub(super) fn write_buffer_pointer(
        &mut self,
        descriptor: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let chain = match self.write_access_chain(
            descriptor,
            block,
            super::block::AccessTypeAdjustment::None,
        )? {
            ExpressionPointer::Ready { pointer_id } => pointer_id,
            ExpressionPointer::Conditional { .. } => {
                return Err(Error::Validation("a buffer descriptor is not addressable"))
            }
        };
        let id = self.gen_id();
        block
            .body
            .push(Instruction::buffer_pointer(result_type_id, id, chain));
        let space = match *self.fun_info[descriptor]
            .ty
            .inner_with(&self.ir_module.types)
        {
            TypeInner::Pointer { base, .. } => match self.ir_module.types[base].inner {
                TypeInner::BufferDescriptor { space, .. } => space,
                _ => return Err(Error::Validation("a buffer pointer of a non-buffer")),
            },
            _ => return Err(Error::Validation("a buffer pointer of a non-pointer")),
        };
        if let crate::AddressSpace::Storage { access } = space {
            if !access.contains(StorageAccess::LOAD) {
                self.writer
                    .decorate(id, spirv::Decoration::NonReadable, &[]);
            }
            if !access.contains(StorageAccess::STORE) {
                self.writer
                    .decorate(id, spirv::Decoration::NonWritable, &[]);
            }
        }
        Ok(id)
    }
}
