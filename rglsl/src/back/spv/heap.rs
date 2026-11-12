use alloc::{format, vec::Vec};

use spirv::{Op, Word};

use super::{
    block::ExpressionPointer, frames::on_heap, Block, BlockContext, Error, Instruction, LocalType,
    LookupType, NumericType, Writer, WriterFlags,
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
    descriptors: crate::FastHashMap<Handle<crate::Type>, bool>,
    unused: crate::FastHashSet<Handle<crate::Type>>,
    blocks: crate::FastHashSet<Word>,
}

const fn heap_index(heap: DescriptorHeap) -> usize {
    match heap {
        DescriptorHeap::Resource => 0,
        DescriptorHeap::Sampler => 1,
    }
}

const fn is_descriptor_inner(inner: &TypeInner) -> bool {
    matches!(
        *inner,
        TypeInner::Image { .. }
            | TypeInner::Sampler { .. }
            | TypeInner::AccelerationStructure { .. }
            | TypeInner::Tensor { .. }
            | TypeInner::BufferDescriptor { .. }
    )
}

fn is_descriptor(module: &Module, ty: Handle<crate::Type>) -> bool {
    is_descriptor_inner(&module.types[innermost(module, ty)].inner)
}

fn innermost(module: &Module, ty: Handle<crate::Type>) -> Handle<crate::Type> {
    crate::proc::array_element(&module.types, ty)
}

enum LayoutChildren<'a> {
    Array(Handle<crate::Type>),
    Struct(&'a [crate::StructMember]),
}

enum LayoutTask<'a> {
    Visit(Handle<crate::Type>, Option<crate::MatrixLayout>),
    Array { stride: u32, count: u32 },
    Struct(&'a [crate::StructMember]),
}

fn scalar_layout(
    module: &Module,
    ty: Handle<crate::Type>,
    matrix: Option<crate::MatrixLayout>,
) -> (u32, u32) {
    let mut tasks = Vec::from([LayoutTask::Visit(ty, matrix)]);
    let mut results: Vec<(u32, u32)> = Vec::new();
    while let Some(task) = tasks.pop() {
        match task {
            LayoutTask::Visit(ty, matrix) => match scalar_layout_step(module, ty, matrix) {
                Ok(leaf) => results.push(leaf),
                Err((task, LayoutChildren::Array(base))) => {
                    tasks.push(task);
                    tasks.push(LayoutTask::Visit(base, matrix));
                }
                Err((task, LayoutChildren::Struct(members))) => {
                    tasks.push(task);
                    tasks.extend(
                        members
                            .iter()
                            .rev()
                            .map(|member| LayoutTask::Visit(member.ty, member.matrix_layout)),
                    );
                }
            },
            LayoutTask::Array { stride, count } => {
                let (element, alignment) = results.pop().unwrap_or((0, 1));
                results.push((
                    stride
                        .saturating_mul(count.saturating_sub(1))
                        .saturating_add(element),
                    alignment,
                ));
            }
            LayoutTask::Struct(members) => {
                let start = results.len().saturating_sub(members.len());
                let mut size = 0;
                let mut alignment = 0;
                for (member, (member_size, member_alignment)) in
                    members.iter().zip(results.drain(start..))
                {
                    size = size.max(member.offset.saturating_add(member_size));
                    alignment = alignment.max(member_alignment);
                }
                results.push((size, alignment.max(1)));
            }
        }
    }
    results.pop().unwrap_or((0, 1))
}

fn scalar_layout_step(
    module: &Module,
    ty: Handle<crate::Type>,
    matrix: Option<crate::MatrixLayout>,
) -> Result<(u32, u32), (LayoutTask<'_>, LayoutChildren<'_>)> {
    Ok(match module.types[ty].inner {
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
            let count = match size {
                crate::ArraySize::Constant(count) => count.get(),
                crate::ArraySize::Pending(_) | crate::ArraySize::Dynamic => 1,
            };
            return Err((
                LayoutTask::Array { stride, count },
                LayoutChildren::Array(base),
            ));
        }
        TypeInner::Struct { ref members, .. } => {
            return Err((LayoutTask::Struct(members), LayoutChildren::Struct(members)))
        }
        _ => (0, 1),
    })
}

const fn round_up(value: u32, alignment: u32) -> u32 {
    if alignment <= 1 {
        value
    } else {
        value.div_ceil(alignment).saturating_mul(alignment)
    }
}

fn storage_image_access(module: &Module, ty: Handle<crate::Type>) -> Option<StorageAccess> {
    match module.types[innermost(module, ty)].inner {
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

    pub(super) fn contains_descriptor(&mut self, module: &Module, ty: Handle<crate::Type>) -> bool {
        crate::proc::contains_type(
            &module.types,
            ty,
            &mut self.heap.descriptors,
            |inner, children| match *inner {
                TypeInner::Array { base, .. } => {
                    children.push(base);
                    false
                }
                TypeInner::Struct { ref members, .. } => {
                    children.extend(members.iter().map(|member| member.ty));
                    false
                }
                ref other => is_descriptor_inner(other),
            },
        )
    }

    fn mark_heap_laid_out(&mut self, module: &Module, ty: Handle<crate::Type>) {
        let mut pending = Vec::from([ty]);
        while let Some(ty) = pending.pop() {
            if !self.contains_descriptor(module, ty) {
                super::writer::mark_laid_out(&module.types, &mut self.laid_out_types, ty);
                continue;
            }
            match module.types[ty].inner {
                TypeInner::Array { base, .. } => pending.push(base),
                TypeInner::Struct { ref members, .. } => {
                    pending.extend(members.iter().rev().map(|member| member.ty));
                }
                TypeInner::BufferDescriptor { base, .. } => {
                    super::writer::mark_laid_out(&module.types, &mut self.laid_out_types, base);
                }
                _ => {}
            }
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

    pub(super) fn heap_array_layout(
        &mut self,
        module: &Module,
        ty: Handle<crate::Type>,
        id: Word,
    ) -> Result<(), Error> {
        if !self.contains_descriptor(module, ty) {
            return Ok(());
        }
        let stride = on_heap!(self, |cx| cx.array_stride(module, ty, None))?;
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
        if !self.contains_descriptor(module, ty) {
            return Ok(());
        }
        let offsets = on_heap!(self, |cx| cx.struct_offsets(module, ty))?;
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

    pub(super) fn prepare_heaps(&mut self, module: &Module, info: &crate::valid::ModuleInfo) {
        self.heap.unused = unused_heap_types(module, info);
        self.heap_laid_out(module);
        for (_, var) in module.global_variables.iter() {
            if let crate::AddressSpace::DescriptorHeap(_) = var.space {
                let structure = matches!(module.types[var.ty].inner, TypeInner::Struct { .. });
                if structure
                    && var.heap_offset.is_some()
                    && self.contains_descriptor(module, var.ty)
                {
                    self.heap.deferred.insert(var.ty);
                }
            }
        }
    }

    pub(super) fn is_deferred_heap_type(&self, ty: Handle<crate::Type>) -> bool {
        self.heap.deferred.contains(&ty)
    }

    pub(super) fn is_unused_heap_type(&self, ty: Handle<crate::Type>) -> bool {
        self.heap.unused.contains(&ty)
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
        let mut offsets = on_heap!(self, |cx| cx.struct_offsets(module, ty))?;
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
        let mut pending = Vec::from([ty]);
        while let Some(ty) = pending.pop() {
            match module.types[ty].inner {
                TypeInner::Array { base, .. } => pending.push(base),
                TypeInner::Struct { ref members, .. } => {
                    for member in members.iter().rev() {
                        if self.contains_descriptor(module, member.ty) {
                            pending.push(member.ty);
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
        for (index, member) in members.iter().enumerate() {
            let Ok(index) = u32::try_from(index) else {
                return;
            };
            for decoration in super::writer::access_decorations(access, member.memory_decorations) {
                self.annotations.push(Instruction::member_decorate(
                    block_id,
                    index,
                    decoration,
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

    pub(super) fn write_heap_layouts(
        &mut self,
        module: &Module,
        info: &crate::valid::ModuleInfo,
    ) -> Result<(), Error> {
        for (handle, var) in module.global_variables.iter() {
            let crate::AddressSpace::DescriptorHeap(_) = var.space else {
                continue;
            };
            if !heap_view_used(module, info, handle) {
                continue;
            }
            let ty = var.ty;
            let descriptors = self.contains_descriptor(module, ty);
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

fn heap_view_used(
    module: &Module,
    info: &crate::valid::ModuleInfo,
    global: Handle<crate::GlobalVariable>,
) -> bool {
    module
        .functions
        .iter()
        .any(|(function, _)| !info[function][global].is_empty())
        || (0..module.entry_points.len())
            .any(|index| !info.get_entry_point(index)[global].is_empty())
}

fn type_children(inner: &TypeInner) -> Vec<Handle<crate::Type>> {
    match *inner {
        TypeInner::Array { base, .. }
        | TypeInner::BindingArray { base, .. }
        | TypeInner::Pointer { base, .. }
        | TypeInner::BufferDescriptor { base, .. } => alloc::vec![base],
        TypeInner::Struct { ref members, .. } => members.iter().map(|member| member.ty).collect(),
        _ => Vec::new(),
    }
}

fn reach(
    module: &Module,
    roots: impl IntoIterator<Item = Handle<crate::Type>>,
) -> crate::FastHashSet<Handle<crate::Type>> {
    let mut found = crate::FastHashSet::default();
    let mut pending: Vec<Handle<crate::Type>> = roots.into_iter().collect();
    while let Some(ty) = pending.pop() {
        if found.insert(ty) {
            pending.extend(type_children(&module.types[ty].inner));
        }
    }
    found
}

fn unused_heap_types(
    module: &Module,
    info: &crate::valid::ModuleInfo,
) -> crate::FastHashSet<Handle<crate::Type>> {
    let unused_views = module
        .global_variables
        .iter()
        .filter(|&(handle, var)| {
            matches!(var.space, crate::AddressSpace::DescriptorHeap(_))
                && !heap_view_used(module, info, handle)
        })
        .map(|(_, var)| var.ty);
    let candidates = reach(module, unused_views);
    if candidates.is_empty() {
        return candidates;
    }
    let mut roots: Vec<Handle<crate::Type>> = module
        .types
        .iter()
        .map(|(handle, _)| handle)
        .filter(|handle| !candidates.contains(handle))
        .collect();
    roots.extend(
        module
            .global_variables
            .iter()
            .filter(|&(handle, var)| {
                !matches!(var.space, crate::AddressSpace::DescriptorHeap(_))
                    || heap_view_used(module, info, handle)
            })
            .map(|(_, var)| var.ty),
    );
    roots.extend(module.constants.iter().map(|(_, constant)| constant.ty));
    roots.extend(module.overrides.iter().map(|(_, item)| item.ty));
    roots.extend(
        module
            .global_expressions
            .iter()
            .filter_map(|(handle, _)| info[handle].handle()),
    );
    let special = &module.special_types;
    roots.extend(
        [
            special.ray_desc,
            special.ray_intersection,
            special.ray_vertex_return,
            special.external_texture_params,
            special.external_texture_transfer_function,
        ]
        .into_iter()
        .flatten(),
    );
    roots.extend(special.predeclared_types.values().copied());
    let functions = module
        .functions
        .iter()
        .map(|(handle, function)| (function, &info[handle]))
        .chain(
            module
                .entry_points
                .iter()
                .enumerate()
                .map(|(index, entry)| (&entry.function, info.get_entry_point(index))),
        );
    for (function, function_info) in functions {
        roots.extend(function.arguments.iter().map(|argument| argument.ty));
        roots.extend(function.result.as_ref().map(|result| result.ty));
        roots.extend(function.local_variables.iter().map(|(_, local)| local.ty));
        roots.extend(
            function
                .expressions
                .iter()
                .filter_map(|(handle, _)| function_info[handle].ty.handle()),
        );
    }
    let needed = reach(module, roots);
    candidates
        .into_iter()
        .filter(|ty| !needed.contains(ty))
        .collect()
}

type HeapCx<'b> = super::frames::Cx<'b, Writer>;

impl<'b> HeapCx<'b> {
    async fn value_size(
        self,
        module: &'b Module,
        ty: Handle<crate::Type>,
        size: Option<u32>,
    ) -> Result<Value, Error> {
        if let Some(value) = self.with(|writer| writer.heap.sizes.get(&(ty, size)).copied())? {
            return Ok(value);
        }
        let value = if is_descriptor(module, ty) {
            match size {
                Some(size) => Value::Known(size),
                None => self.try_with(|writer| {
                    let type_id = writer.get_handle_type_id(ty)?;
                    Ok(writer.constant_size_of(type_id))
                })?,
            }
        } else if self.with(|writer| writer.contains_descriptor(module, ty))? {
            self.call(self.clone().struct_size(module, ty)).await?
        } else {
            let (size, alignment) = scalar_layout(module, ty, None);
            Value::Known(round_up(size, alignment))
        };
        self.with(|writer| writer.heap.sizes.insert((ty, size), value))?;
        Ok(value)
    }

    async fn value_align(
        self,
        module: &'b Module,
        ty: Handle<crate::Type>,
        size: Option<u32>,
    ) -> Result<Value, Error> {
        if let Some(value) = self.with(|writer| writer.heap.aligns.get(&(ty, size)).copied())? {
            return Ok(value);
        }
        let value = if is_descriptor(module, ty) {
            self.call(self.clone().value_size(module, ty, size)).await?
        } else if self.with(|writer| writer.contains_descriptor(module, ty))? {
            self.call(self.clone().struct_align(module, ty)).await?
        } else {
            Value::Known(scalar_layout(module, ty, None).1)
        };
        self.with(|writer| writer.heap.aligns.insert((ty, size), value))?;
        Ok(value)
    }

    fn times(&self, value: Value, count: crate::ArraySize) -> Result<Value, Error> {
        self.try_with(|writer| {
            Ok(match count {
                crate::ArraySize::Constant(count) => {
                    writer.heap_op(Op::IMul, value, Value::Known(count.get()))
                }
                crate::ArraySize::Pending(handle) => {
                    let count = writer.written_override_id(handle)?;
                    writer.heap_op(Op::IMul, value, Value::Id(count))
                }
                crate::ArraySize::Dynamic => value,
            })
        })
    }

    async fn array_stride(
        self,
        module: &'b Module,
        ty: Handle<crate::Type>,
        size: Option<u32>,
    ) -> Result<Value, Error> {
        if let Some(value) = self.with(|writer| writer.heap.strides.get(&ty).copied())? {
            return Ok(value);
        }
        let TypeInner::Array { base, stride, .. } = module.types[ty].inner else {
            return Ok(Value::Known(0));
        };
        let value = if !self.with(|writer| writer.contains_descriptor(module, ty))? {
            Value::Known(stride)
        } else if let TypeInner::Array {
            size: inner_size, ..
        } = module.types[base].inner
        {
            let inner = self
                .call(self.clone().array_stride(module, base, size))
                .await?;
            self.times(inner, inner_size)?
        } else if stride != 0 {
            Value::Known(stride)
        } else {
            self.call(self.clone().value_size(module, base, size))
                .await?
        };
        self.with(|writer| writer.heap.strides.insert(ty, value))?;
        Ok(value)
    }

    async fn member_size(
        self,
        module: &'b Module,
        member: &'b crate::StructMember,
    ) -> Result<Value, Error> {
        let size = member.heap.and_then(|heap| heap.size);
        Ok(match module.types[member.ty].inner {
            TypeInner::Array {
                size: array_size, ..
            } => {
                if !self.with(|writer| writer.contains_descriptor(module, member.ty))? {
                    return Ok(Value::Known(
                        scalar_layout(module, member.ty, member.matrix_layout).0,
                    ));
                }
                let stride = self
                    .call(self.clone().array_stride(module, member.ty, size))
                    .await?;
                self.times(stride, array_size)?
            }
            TypeInner::Matrix { .. } => {
                let (size, alignment) = scalar_layout(module, member.ty, member.matrix_layout);
                Value::Known(round_up(size, alignment))
            }
            _ => {
                self.call(self.clone().value_size(module, member.ty, size))
                    .await?
            }
        })
    }

    async fn member_align(
        self,
        module: &'b Module,
        member: &'b crate::StructMember,
    ) -> Result<Value, Error> {
        let size = member.heap.and_then(|heap| heap.size);
        Ok(match module.types[member.ty].inner {
            TypeInner::Array { .. }
                if !self.with(|writer| writer.contains_descriptor(module, member.ty))? =>
            {
                Value::Known(scalar_layout(module, member.ty, member.matrix_layout).1)
            }
            TypeInner::Array { .. } => {
                let element = innermost(module, member.ty);
                self.call(self.clone().value_align(module, element, size))
                    .await?
            }
            _ => {
                self.call(self.clone().value_align(module, member.ty, size))
                    .await?
            }
        })
    }

    async fn struct_offsets(
        self,
        module: &'b Module,
        ty: Handle<crate::Type>,
    ) -> Result<Vec<Value>, Error> {
        if let Some(offsets) = self.with(|writer| writer.heap.offsets.get(&ty).cloned())? {
            return Ok(offsets);
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
                let size = self
                    .call(self.clone().member_size(module, previous))
                    .await?;
                let unaligned = self.with(|writer| writer.heap_op(Op::IAdd, current, size))?;
                let alignment = self.call(self.clone().member_align(module, member)).await?;
                current = self.with(|writer| writer.align_to(unaligned, alignment))?;
            }
            offsets.push(current);
            previous = Some(member);
        }
        self.with(|writer| writer.heap.offsets.insert(ty, offsets.clone()))?;
        Ok(offsets)
    }

    async fn struct_align(
        self,
        module: &'b Module,
        ty: Handle<crate::Type>,
    ) -> Result<Value, Error> {
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Ok(Value::Known(1));
        };
        let mut alignment = None;
        for member in members {
            let member_alignment = self.call(self.clone().member_align(module, member)).await?;
            alignment = Some(match alignment {
                None => member_alignment,
                Some(current) => {
                    self.with(|writer| writer.select_max(current, member_alignment))?
                }
            });
        }
        Ok(alignment.unwrap_or(Value::Known(1)))
    }

    async fn struct_size(
        self,
        module: &'b Module,
        ty: Handle<crate::Type>,
    ) -> Result<Value, Error> {
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Ok(Value::Known(0));
        };
        let Some(last) = members.last() else {
            return Ok(Value::Known(0));
        };
        let offsets = self.call(self.clone().struct_offsets(module, ty)).await?;
        let last_offset = offsets.last().copied().unwrap_or(Value::Known(0));
        let size = self.call(self.clone().member_size(module, last)).await?;
        let raw = self.with(|writer| writer.heap_op(Op::IAdd, last_offset, size))?;
        let alignment = self.call(self.clone().struct_align(module, ty)).await?;
        self.with(|writer| writer.align_to(raw, alignment))
    }
}
