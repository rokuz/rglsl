use spirv::Word;

use super::super::{
    Block, BlockContext, Error, Instruction, LocalVariable, index::BoundsCheckResult,
};
use super::AccessTypeAdjustment;
use crate::{arena::Handle, proc::index::GuardedIndex};

impl BlockContext<'_> {
    #[inline(never)]
    pub(super) fn returned_array_element(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Option<Word>, Error> {
        let (base, index) = match self.ir_function.expressions[expr_handle] {
            crate::Expression::Access { base, .. } => (base, None),
            crate::Expression::AccessIndex { base, index } => (base, Some(index)),
            _ => return Ok(None),
        };
        let returned = matches!(
            self.ir_function.expressions[base],
            crate::Expression::CallResult(_)
        ) && matches!(
            *self.fun_info[base].ty.inner_with(&self.ir_module.types),
            crate::TypeInner::BindingArray { .. }
        );
        if !returned {
            return Ok(None);
        }
        let result_type_id = self.get_expression_type_id(&self.fun_info[expr_handle].ty)?;
        let Some(index) = index else {
            self.spill_to_internal_variable(base, block)?;
            self.function.spilled_accesses.insert(expr_handle);
            return self
                .maybe_access_spilled_composite(expr_handle, block, result_type_id)
                .map(Some);
        };
        let id = self.gen_id();
        let base_id = self.cached.get(base)?;
        block.body.push(Instruction::composite_extract(
            result_type_id,
            id,
            base_id,
            &[index],
        ));
        Ok(Some(id))
    }

    pub(super) fn write_access(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        base: Handle<crate::Expression>,
        index: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        if matches!(
            *self.fun_info[base].ty.inner_with(&self.ir_module.types),
            crate::TypeInner::Pointer { .. } | crate::TypeInner::ValuePointer { .. }
        ) {
            return Ok(0);
        }
        if self.function.spilled_accesses.contains(base) {
            self.function.spilled_accesses.insert(expr_handle);
            return self.maybe_access_spilled_composite(expr_handle, block, result_type_id);
        }
        let base_ty_inner = self.fun_info[base].ty.inner_with(&self.ir_module.types);
        match *base_ty_inner {
            crate::TypeInner::Pointer { .. } | crate::TypeInner::ValuePointer { .. } => Ok(0),
            crate::TypeInner::Vector { .. } => self.write_vector_access(
                result_type_id,
                base,
                None,
                GuardedIndex::Expression(index),
                block,
            ),
            crate::TypeInner::Array { .. }
            | crate::TypeInner::Matrix { .. }
            | crate::TypeInner::LongVector { .. }
            | crate::TypeInner::CooperativeMatrix { .. } => {
                match GuardedIndex::from_expression(
                    index,
                    &self.ir_function.expressions,
                    self.ir_module,
                ) {
                    GuardedIndex::Known(value) => {
                        let id = self.gen_id();
                        let base_id = self.cached.get(base)?;
                        block.body.push(Instruction::composite_extract(
                            result_type_id,
                            id,
                            base_id,
                            &[value],
                        ));
                        Ok(id)
                    }
                    GuardedIndex::Expression(_) => {
                        self.spill_to_internal_variable(base, block)?;
                        self.function.spilled_accesses.insert(expr_handle);
                        self.maybe_access_spilled_composite(expr_handle, block, result_type_id)
                    }
                }
            }
            crate::TypeInner::BindingArray {
                base: binding_type, ..
            } => {
                if self.function.texel_images.contains(expr_handle) {
                    return Ok(0);
                }
                let result_id = self.write_access_chain(
                    expr_handle,
                    block,
                    AccessTypeAdjustment::IntroducePointer(self.handle_class(base)),
                )?;

                let binding_type_id = self.get_handle_type_id(binding_type)?;
                self.function.handle_pointers.insert(expr_handle, result_id);

                let load_id = self.gen_id();
                block
                    .body
                    .push(Instruction::load(binding_type_id, load_id, result_id, None));

                Ok(load_id)
            }
            ref other => {
                log::error!(
                    "Unable to access base {:?} of type {:?}",
                    self.ir_function.expressions[base],
                    other
                );
                Err(Error::Validation(
                    "only vectors and arrays may be dynamically indexed by value",
                ))
            }
        }
    }

    pub(super) fn write_access_index(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        base: Handle<crate::Expression>,
        index: u32,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        if matches!(
            *self.fun_info[base].ty.inner_with(&self.ir_module.types),
            crate::TypeInner::Pointer { .. } | crate::TypeInner::ValuePointer { .. }
        ) {
            return Ok(0);
        }
        if self.function.spilled_accesses.contains(base) {
            self.function.spilled_accesses.insert(expr_handle);
            return self.maybe_access_spilled_composite(expr_handle, block, result_type_id);
        }
        match *self.fun_info[base].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Pointer { .. } | crate::TypeInner::ValuePointer { .. } => Ok(0),
            crate::TypeInner::Vector { .. }
            | crate::TypeInner::Matrix { .. }
            | crate::TypeInner::LongVector { .. }
            | crate::TypeInner::CooperativeMatrix { .. }
            | crate::TypeInner::Array { .. }
            | crate::TypeInner::Struct { .. } => {
                let id = self.gen_id();
                let base_id = self.cached.get(base)?;
                block.body.push(Instruction::composite_extract(
                    result_type_id,
                    id,
                    base_id,
                    &[index],
                ));
                Ok(id)
            }
            crate::TypeInner::BindingArray {
                base: binding_type, ..
            } => {
                if self.function.texel_images.contains(expr_handle) {
                    return Ok(0);
                }
                let result_id = self.write_access_chain(
                    expr_handle,
                    block,
                    AccessTypeAdjustment::IntroducePointer(self.handle_class(base)),
                )?;

                let binding_type_id = self.get_handle_type_id(binding_type)?;
                self.function.handle_pointers.insert(expr_handle, result_id);

                let load_id = self.gen_id();
                block
                    .body
                    .push(Instruction::load(binding_type_id, load_id, result_id, None));

                Ok(load_id)
            }
            ref other => {
                log::error!("Unable to access index of {other:?}");
                Err(Error::FeatureNotImplemented("access index for type"))
            }
        }
    }

    fn tensor_array_capability(
        &mut self,
        base: Handle<crate::Expression>,
        index: Handle<crate::Expression>,
        non_uniform: bool,
    ) -> Result<(), Error> {
        use spirv::Capability as Cap;
        let mut ty = self.fun_info[base].ty.inner_with(&self.ir_module.types);
        if let crate::TypeInner::Pointer { base, .. } = *ty {
            ty = &self.ir_module.types[base].inner;
        }
        let crate::TypeInner::BindingArray { base: element, .. } = *ty else {
            return Ok(());
        };
        if !matches!(
            self.ir_module.types[element].inner,
            crate::TypeInner::Tensor { .. }
        ) || self.expression_constness.is_const(index)
        {
            return Ok(());
        }
        let capability = if non_uniform {
            Cap::StorageTensorArrayNonUniformIndexingARM
        } else {
            Cap::StorageTensorArrayDynamicIndexingARM
        };
        self.writer
            .require_any("dynamic indexing of tensor arrays", &[capability])
    }

    fn binding_array_capability(
        &mut self,
        base: Handle<crate::Expression>,
        non_uniform: bool,
    ) -> Result<(), Error> {
        use spirv::Capability as Cap;
        let mut ty = self.fun_info[base].ty.inner_with(&self.ir_module.types);
        let mut space = None;
        if let crate::TypeInner::Pointer {
            base,
            space: pointer_space,
        } = *ty
        {
            ty = &self.ir_module.types[base].inner;
            space = Some(pointer_space);
        }
        let element = match *ty {
            crate::TypeInner::BindingArray { base: element, .. } => element,
            crate::TypeInner::Array { base: element, .. } => {
                if !matches!(space, Some(crate::AddressSpace::DescriptorHeap(_))) {
                    return Ok(());
                }
                if let crate::TypeInner::BufferDescriptor {
                    base,
                    space: buffer,
                } = self.ir_module.types[element].inner
                {
                    space = Some(buffer);
                    base
                } else {
                    element
                }
            }
            _ => return Ok(()),
        };
        let (dynamic, nonuniform) = match self.ir_module.types[element].inner {
            crate::TypeInner::Image { dim, class, .. } => match (dim, class) {
                (crate::ImageDimension::Subpass, _) => (
                    Some(Cap::InputAttachmentArrayDynamicIndexing),
                    Cap::InputAttachmentArrayNonUniformIndexing,
                ),
                (crate::ImageDimension::Buffer, crate::ImageClass::Storage { .. }) => (
                    Some(Cap::StorageTexelBufferArrayDynamicIndexing),
                    Cap::StorageTexelBufferArrayNonUniformIndexing,
                ),
                (
                    crate::ImageDimension::Buffer,
                    crate::ImageClass::Sampled { .. } | crate::ImageClass::Depth { .. },
                ) => (
                    Some(Cap::UniformTexelBufferArrayDynamicIndexing),
                    Cap::UniformTexelBufferArrayNonUniformIndexing,
                ),
                (
                    crate::ImageDimension::D1
                    | crate::ImageDimension::D2
                    | crate::ImageDimension::D3
                    | crate::ImageDimension::Cube
                    | crate::ImageDimension::TileImageData,
                    crate::ImageClass::Storage { .. },
                ) => (None, Cap::StorageImageArrayNonUniformIndexing),
                _ => (None, Cap::SampledImageArrayNonUniformIndexing),
            },
            crate::TypeInner::SampledImage { dim, .. } => {
                if dim == crate::ImageDimension::Buffer {
                    (
                        Some(Cap::UniformTexelBufferArrayDynamicIndexing),
                        Cap::UniformTexelBufferArrayNonUniformIndexing,
                    )
                } else {
                    (None, Cap::SampledImageArrayNonUniformIndexing)
                }
            }
            crate::TypeInner::Struct { .. } => match space {
                Some(crate::AddressSpace::Storage { .. }) => {
                    (None, Cap::StorageBufferArrayNonUniformIndexing)
                }
                Some(crate::AddressSpace::Uniform) => {
                    (None, Cap::UniformBufferArrayNonUniformIndexing)
                }
                _ => return Ok(()),
            },
            _ => return Ok(()),
        };
        if non_uniform {
            self.writer
                .require_descriptor_indexing("non-uniform indexing of binding arrays", nonuniform)
        } else if let Some(dynamic) = dynamic {
            self.writer
                .require_descriptor_indexing("dynamic indexing of binding arrays", dynamic)
        } else {
            Ok(())
        }
    }

    pub(in super::super) fn write_access_chain(
        &mut self,
        mut expr_handle: Handle<crate::Expression>,
        block: &mut Block,
        type_adjustment: AccessTypeAdjustment,
    ) -> Result<Word, Error> {
        let non_uniform_access = self
            .non_uniform(expr_handle)
            .contains(crate::NonUniform::ACCESS);
        let result_type_id = {
            let resolution = &self.fun_info[expr_handle].ty;
            match type_adjustment {
                AccessTypeAdjustment::None => self.writer.get_expression_type_id(resolution)?,
                AccessTypeAdjustment::IntroducePointer(class) => {
                    self.writer.get_resolution_pointer_id(resolution, class)?
                }
            }
        };

        self.temp_list.clear();
        let mut heap_root = None;
        let root_id = loop {
            if let Some(spilled) = self.function.spilled_composites.get(&expr_handle) {
                break spilled.id;
            }

            expr_handle = match self.ir_function.expressions[expr_handle] {
                crate::Expression::Access { base, index } => {
                    let non_uniform_index = self
                        .non_uniform(expr_handle)
                        .contains(crate::NonUniform::ACCESS)
                        && !self.non_uniform(base).contains(crate::NonUniform::ACCESS);
                    self.binding_array_capability(base, non_uniform_index)?;
                    self.tensor_array_capability(base, index, non_uniform_index)?;
                    let index = GuardedIndex::Expression(index);
                    let index_id = self.write_access_chain_index(index)?;
                    self.temp_list.push(index_id);

                    base
                }
                crate::Expression::AccessIndex { base, index } => {
                    let mut base_ty = self.fun_info[base].ty.inner_with(&self.ir_module.types);
                    if let crate::TypeInner::Pointer { base, .. } = *base_ty {
                        base_ty = &self.ir_module.types[base].inner;
                    }
                    if let crate::TypeInner::Struct { .. } = *base_ty {
                        let index_id = self.get_index_constant(index);
                        self.temp_list.push(index_id);
                    } else {
                        let index_id = self.write_access_chain_index(GuardedIndex::Known(index))?;
                        self.temp_list.push(index_id);
                    }
                    base
                }
                crate::Expression::GlobalVariable(handle) => {
                    if self.heap_global(expr_handle).is_some() {
                        heap_root = Some((handle, None));
                    }
                    let gv = &self.writer.global_variables[handle];
                    break gv.access_id;
                }
                crate::Expression::HeapOffset { pointer, offset } => {
                    let handle = self
                        .heap_global(pointer)
                        .ok_or(Error::Validation("a heap offset of a non-heap pointer"))?;
                    heap_root = Some((handle, Some(offset)));
                    break 0;
                }
                crate::Expression::BufferPointer { .. } => {
                    break self.cached.get(expr_handle)?;
                }
                crate::Expression::LocalVariable(variable) => {
                    break self.function.local_id(variable)?;
                }
                crate::Expression::FunctionArgument(index) => {
                    break self.function.parameter_id(index)?;
                }
                _ => {
                    if matches!(
                        *self.fun_info[expr_handle]
                            .ty
                            .inner_with(&self.ir_module.types),
                        crate::TypeInner::Pointer {
                            space: crate::AddressSpace::PhysicalStorage { .. },
                            ..
                        }
                    ) {
                        break self.cached.get(expr_handle)?;
                    }
                    return Err(Error::Validation("unexpected pointer expression"));
                }
            }
        };

        if let Some((global, offset)) = heap_root {
            self.temp_list.reverse();
            let indices = core::mem::take(&mut self.temp_list);
            let pointer_id =
                self.write_heap_chain(global, offset, result_type_id, &indices, block)?;
            self.temp_list = indices;
            if non_uniform_access {
                self.writer.decorate_non_uniform(pointer_id)?;
            }
            return Ok(pointer_id);
        }
        let expr_pointer = if self.temp_list.is_empty() {
            root_id
        } else {
            self.temp_list.reverse();
            let pointer_id = self.gen_id();
            let access =
                Instruction::access_chain(result_type_id, pointer_id, root_id, &self.temp_list);
            if non_uniform_access {
                self.writer.decorate_non_uniform(pointer_id)?;
            }
            block.body.push(access);
            pointer_id
        };
        Ok(expr_pointer)
    }

    fn write_access_chain_index(&mut self, index: GuardedIndex) -> Result<Word, Error> {
        match self.write_bounds_check(index)? {
            BoundsCheckResult::KnownInBounds(known_index) => {
                let scalar = crate::Literal::U32(known_index);
                Ok(self.writer.get_constant_scalar(scalar))
            }
            BoundsCheckResult::Computed(computed_index_id) => Ok(computed_index_id),
        }
    }

    pub(super) fn write_checked_load(
        &mut self,
        pointer: Handle<crate::Expression>,
        block: &mut Block,
        access_type_adjustment: AccessTypeAdjustment,
        result_type_id: Word,
    ) -> Result<Word, Error> {
        let class = match access_type_adjustment {
            AccessTypeAdjustment::IntroducePointer(class) => Some(class),
            AccessTypeAdjustment::None => self.pointer_class(pointer),
        };
        let heap = matches!(
            *self.fun_info[pointer].ty.inner_with(&self.ir_module.types),
            crate::TypeInner::Pointer {
                space: crate::AddressSpace::DescriptorHeap(_),
                ..
            }
        );
        let plain_load = !heap
            && class.is_some_and(|class| {
                let explicit = self.writer.has_explicit_layout(class);
                self.writer
                    .needs_layout_conversion_explicit(result_type_id, explicit)
            });
        let load_type_id = if plain_load {
            self.writer.plain_type_id(result_type_id)
        } else {
            result_type_id
        };

        let load_id = {
            let pointer_id = self.write_access_chain(pointer, block, access_type_adjustment)?;
            let id = self.gen_id();
            let atomic_space = if let crate::TypeInner::Pointer { base, space } =
                *self.fun_info[pointer].ty.inner_with(&self.ir_module.types)
                && matches!(
                    self.ir_module.types[base].inner,
                    crate::TypeInner::Atomic(_)
                ) {
                Some(space)
            } else {
                None
            };
            let instruction = if let Some(space) = atomic_space {
                let (semantics, scope) = space.to_spirv_semantics_and_scope();
                let scope_constant_id = self.get_scope_constant(scope as u32);
                let semantics_id = self.get_index_constant(semantics.bits());
                Instruction::atomic_load(
                    result_type_id,
                    id,
                    pointer_id,
                    scope_constant_id,
                    semantics_id,
                )
            } else {
                let mut instruction = Instruction::load(load_type_id, id, pointer_id, None);
                let component = self.physical_component_load;
                for operand in self.memory_access(pointer, component, false) {
                    instruction.add_operand(operand);
                }
                instruction
            };
            block.body.push(instruction);
            id
        };

        if plain_load {
            self.writer
                .convert_layout(block, result_type_id, load_id, false)
        } else {
            Ok(load_id)
        }
    }

    pub(super) fn pointer_class(
        &self,
        pointer: Handle<crate::Expression>,
    ) -> Option<spirv::StorageClass> {
        match *self.fun_info[pointer].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Pointer { space, .. }
            | crate::TypeInner::ValuePointer { space, .. } => {
                Some(self.writer.storage_class(space))
            }
            _ => None,
        }
    }

    fn spill_to_internal_variable(
        &mut self,
        base: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        use indexmap::map::Entry;

        let spill_variable_id = match self.function.spilled_composites.entry(base) {
            Entry::Occupied(preexisting) => preexisting.get().id,
            Entry::Vacant(vacant) => {
                let pointer_type_id = self.writer.get_resolution_pointer_id(
                    &self.fun_info[base].ty,
                    spirv::StorageClass::Function,
                )?;
                let id = self.writer.id_gen.next();
                vacant.insert(LocalVariable {
                    id,
                    instruction: Instruction::variable(
                        pointer_type_id,
                        id,
                        spirv::StorageClass::Function,
                        None,
                    ),
                });
                id
            }
        };

        let mut base_id = self.cached.get(base)?;
        let base_type_id = self.get_expression_type_id(&self.fun_info[base].ty)?;
        if self
            .writer
            .needs_layout_conversion(base_type_id, spirv::StorageClass::Function)
        {
            base_id = self
                .writer
                .convert_layout(block, base_type_id, base_id, true)?;
        }
        block
            .body
            .push(Instruction::store(spill_variable_id, base_id, None));
        Ok(())
    }

    fn maybe_access_spilled_composite(
        &mut self,
        access: Handle<crate::Expression>,
        block: &mut Block,
        result_type_id: Word,
    ) -> Result<Word, Error> {
        let access_uses = self.function.access_uses.get(&access).map_or(0, |r| *r);
        if access_uses == self.fun_info[access].ref_count {
            Ok(0)
        } else {
            self.write_checked_load(
                access,
                block,
                AccessTypeAdjustment::IntroducePointer(spirv::StorageClass::Function),
                result_type_id,
            )
        }
    }
}
