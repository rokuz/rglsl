use super::{Block, BlockContext, Error, Instruction, NumericType, Word};
use crate::arena::{Handle, HandleSet};
use crate::{
    AtomicLocation, Expression, MemoryOrder, MemoryScope, MemorySemantics, Statement, Texel,
};

const MODEL_SEMANTICS: MemorySemantics = MemorySemantics::MAKE_AVAILABLE
    .union(MemorySemantics::MAKE_VISIBLE)
    .union(MemorySemantics::OUTPUT_MEMORY)
    .union(MemorySemantics::VOLATILE);

const fn spirv_scope(scope: MemoryScope) -> spirv::Scope {
    match scope {
        MemoryScope::CrossDevice => spirv::Scope::CrossDevice,
        MemoryScope::Device => spirv::Scope::Device,
        MemoryScope::Workgroup => spirv::Scope::Workgroup,
        MemoryScope::Subgroup => spirv::Scope::Subgroup,
        MemoryScope::Invocation => spirv::Scope::Invocation,
        MemoryScope::QueueFamily => spirv::Scope::QueueFamily,
        MemoryScope::ShaderCall => spirv::Scope::ShaderCallKHR,
    }
}

pub(super) struct OrderIds {
    pub scope: Word,
    pub semantics: Word,
    pub unequal: Word,
}

pub(super) fn collect_texel_images(block: &crate::Block, images: &mut HandleSet<Expression>) {
    for statement in block.iter() {
        match *statement {
            Statement::Block(ref inner) => collect_texel_images(inner, images),
            Statement::If {
                ref accept,
                ref reject,
                ..
            } => {
                collect_texel_images(accept, images);
                collect_texel_images(reject, images);
            }
            Statement::Switch { ref cases, .. } => {
                for case in cases {
                    collect_texel_images(&case.body, images);
                }
            }
            Statement::Loop {
                ref body,
                ref continuing,
                ..
            } => {
                collect_texel_images(body, images);
                collect_texel_images(continuing, images);
            }
            Statement::ImageAtomic {
                image,
                order: Some(_),
                ..
            }
            | Statement::AtomicLoad {
                location: AtomicLocation::Texel(Texel { image, .. }),
                ..
            }
            | Statement::AtomicStore {
                location: AtomicLocation::Texel(Texel { image, .. }),
                ..
            } => {
                images.insert(image);
            }
            _ => {}
        }
    }
}

impl super::Writer {
    pub(super) fn write_memory_scope(&mut self, scope: MemoryScope) -> Word {
        match scope {
            MemoryScope::QueueFamily => {
                self.use_vulkan_memory_model_capability();
            }
            MemoryScope::Device => {
                self.device_scope_used = true;
            }
            MemoryScope::CrossDevice
            | MemoryScope::Workgroup
            | MemoryScope::Subgroup
            | MemoryScope::Invocation
            | MemoryScope::ShaderCall => {}
        }
        self.get_constant_scalar(crate::Literal::I32(spirv_scope(scope) as i32))
    }

    pub(super) fn write_memory_semantics(&mut self, semantics: MemorySemantics) -> Word {
        if semantics.intersects(MODEL_SEMANTICS) {
            self.use_vulkan_memory_model_capability();
        }
        self.get_constant_scalar(crate::Literal::U32(semantics.bits()))
    }

    fn use_vulkan_memory_model_capability(&mut self) {
        self.capabilities_used
            .insert(spirv::Capability::VulkanMemoryModel);
        if self.lang_version() < (1, 5) {
            self.use_extension("SPV_KHR_vulkan_memory_model");
        }
    }

    pub(super) fn write_memory_order(&mut self, order: MemoryOrder) -> OrderIds {
        OrderIds {
            scope: self.write_memory_scope(order.scope),
            semantics: self.write_memory_semantics(order.semantics),
            unequal: self.write_memory_semantics(order.unequal),
        }
    }

    pub(super) fn write_scoped_barrier(
        &mut self,
        execution: Option<MemoryScope>,
        memory: MemoryScope,
        semantics: MemorySemantics,
        block: &mut Block,
    ) {
        let execution_id = execution.map(|scope| self.write_memory_scope(scope));
        let memory_id = self.write_memory_scope(memory);
        let semantics_id = self.write_memory_semantics(semantics);
        block.body.push(match execution_id {
            Some(execution_id) => {
                Instruction::control_barrier(execution_id, memory_id, semantics_id)
            }
            None => Instruction::memory_barrier(memory_id, semantics_id),
        });
    }
}

impl BlockContext<'_> {
    fn atomic_scalar(&mut self, scalar: crate::Scalar) {
        if scalar.width == 8 {
            self.writer
                .capabilities_used
                .insert(spirv::Capability::Int64Atomics);
        }
    }

    fn image_pointer(
        &mut self,
        image: Handle<Expression>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        match self.ir_function.expressions[image] {
            Expression::GlobalVariable(handle) => Ok(self.writer.global_variables[handle].var_id),
            Expression::FunctionArgument(index) => Ok(self.function.parameter_id(index)),
            Expression::Access { .. } | Expression::AccessIndex { .. } => {
                match self.write_access_chain(
                    image,
                    block,
                    super::block::AccessTypeAdjustment::IntroducePointer(
                        spirv::StorageClass::UniformConstant,
                    ),
                )? {
                    super::block::ExpressionPointer::Ready { pointer_id } => Ok(pointer_id),
                    super::block::ExpressionPointer::Conditional { .. } => Err(
                        Error::FeatureNotImplemented("Texture array out-of-bounds handling"),
                    ),
                }
            }
            _ => Err(Error::Validation("Unexpected image expression")),
        }
    }

    pub(super) fn write_texel_pointer(
        &mut self,
        texel: &Texel,
        block: &mut Block,
    ) -> Result<(Word, crate::Scalar), Error> {
        let crate::TypeInner::Image {
            class: crate::ImageClass::Storage { format, .. },
            ..
        } = *self.fun_info[texel.image]
            .ty
            .inner_with(&self.ir_module.types)
        else {
            return Err(Error::Validation("Invalid image class"));
        };
        let scalar: crate::Scalar = format.into();
        self.atomic_scalar(scalar);
        if let Some(pointer_id) = self.write_heap_texel_pointer(texel, block)? {
            return Ok((pointer_id, scalar));
        }
        let image_id = self.image_pointer(texel.image, block)?;
        let scalar_type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let pointer_type_id = self.get_pointer_type_id(scalar_type_id, spirv::StorageClass::Image);
        let coordinates =
            self.write_image_coordinates(texel.coordinate, texel.array_index, block)?;
        let sample_id = match texel.sample {
            Some(sample) => self.cached.get(sample)?,
            None => self.writer.get_constant_scalar(crate::Literal::U32(0)),
        };
        let pointer_id = self.gen_id();
        block.body.push(Instruction::image_texel_pointer(
            pointer_type_id,
            pointer_id,
            image_id,
            coordinates.value_id,
            sample_id,
        ));
        if self
            .non_uniform(texel.image)
            .contains(crate::NonUniform::VALUE)
        {
            self.writer.decorate_non_uniform(pointer_id)?;
        }
        Ok((pointer_id, scalar))
    }

    fn write_location_pointer(
        &mut self,
        location: &AtomicLocation,
        block: &mut Block,
    ) -> Result<(Word, crate::Scalar), Error> {
        match *location {
            AtomicLocation::Pointer(pointer) => {
                let scalar = match *self.fun_info[pointer].ty.inner_with(&self.ir_module.types) {
                    crate::TypeInner::Pointer { base, .. } => {
                        match self.ir_module.types[base].inner {
                            crate::TypeInner::Scalar(scalar) | crate::TypeInner::Atomic(scalar) => {
                                scalar
                            }
                            _ => return Err(Error::Validation("Invalid atomic pointer")),
                        }
                    }
                    crate::TypeInner::ValuePointer {
                        size: None, scalar, ..
                    } => scalar,
                    _ => return Err(Error::Validation("Invalid atomic pointer")),
                };
                self.atomic_scalar(scalar);
                let pointer_id = match self.write_access_chain(
                    pointer,
                    block,
                    super::block::AccessTypeAdjustment::None,
                )? {
                    super::block::ExpressionPointer::Ready { pointer_id } => pointer_id,
                    super::block::ExpressionPointer::Conditional { .. } => {
                        return Err(Error::FeatureNotImplemented(
                            "Atomics out-of-bounds handling",
                        ));
                    }
                };
                Ok((pointer_id, scalar))
            }
            AtomicLocation::Texel(ref texel) => self.write_texel_pointer(texel, block),
        }
    }

    pub(super) fn write_atomic_load(
        &mut self,
        location: &AtomicLocation,
        order: MemoryOrder,
        result: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let (pointer_id, scalar) = self.write_location_pointer(location, block)?;
        let ids = self.writer.write_memory_order(order);
        let type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let id = self.gen_id();
        block.body.push(Instruction::atomic_load(
            type_id,
            id,
            pointer_id,
            ids.scope,
            ids.semantics,
        ));
        self.cached.set(result, id)?;
        Ok(())
    }

    pub(super) fn write_atomic_store(
        &mut self,
        location: &AtomicLocation,
        value: Handle<Expression>,
        order: MemoryOrder,
        block: &mut Block,
    ) -> Result<(), Error> {
        let (pointer_id, _) = self.write_location_pointer(location, block)?;
        let ids = self.writer.write_memory_order(order);
        block.body.push(Instruction::atomic_store(
            pointer_id,
            ids.scope,
            ids.semantics,
            self.cached.get(value)?,
        ));
        Ok(())
    }

    pub(super) fn write_ordered_image_atomic(
        &mut self,
        texel: &Texel,
        fun: crate::AtomicFunction,
        value: Handle<Expression>,
        result: Option<Handle<Expression>>,
        order: MemoryOrder,
        block: &mut Block,
    ) -> Result<(), Error> {
        let (pointer_id, scalar) = self.write_texel_pointer(texel, block)?;
        let ids = self.writer.write_memory_order(order);
        let type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let signed = scalar.kind == crate::ScalarKind::Sint;
        let op = match fun {
            crate::AtomicFunction::Add => spirv::Op::AtomicIAdd,
            crate::AtomicFunction::Subtract => spirv::Op::AtomicISub,
            crate::AtomicFunction::And => spirv::Op::AtomicAnd,
            crate::AtomicFunction::ExclusiveOr => spirv::Op::AtomicXor,
            crate::AtomicFunction::InclusiveOr => spirv::Op::AtomicOr,
            crate::AtomicFunction::Min if signed => spirv::Op::AtomicSMin,
            crate::AtomicFunction::Min => spirv::Op::AtomicUMin,
            crate::AtomicFunction::Max if signed => spirv::Op::AtomicSMax,
            crate::AtomicFunction::Max => spirv::Op::AtomicUMax,
            crate::AtomicFunction::Exchange { compare: None } => spirv::Op::AtomicExchange,
            crate::AtomicFunction::Exchange { compare: Some(_) } => {
                spirv::Op::AtomicCompareExchange
            }
        };
        let id = self.gen_id();
        let mut instruction = Instruction::new(op);
        instruction.set_type(type_id);
        instruction.set_result(id);
        instruction.add_operand(pointer_id);
        instruction.add_operand(ids.scope);
        instruction.add_operand(ids.semantics);
        if let crate::AtomicFunction::Exchange {
            compare: Some(compare),
        } = fun
        {
            instruction.add_operand(ids.unequal);
            instruction.add_operand(self.cached.get(value)?);
            instruction.add_operand(self.cached.get(compare)?);
        } else {
            instruction.add_operand(self.cached.get(value)?);
        }
        block.body.push(instruction);
        if let Some(result) = result {
            self.cached.set(result, id)?;
        }
        Ok(())
    }
}
