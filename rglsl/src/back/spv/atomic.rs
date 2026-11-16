use super::{Block, BlockContext, Error, Instruction, NumericType, Word, feature};
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

pub(super) fn texel_numeric_type(format: crate::StorageFormat) -> NumericType {
    match format {
        crate::StorageFormat::Rg16Float => NumericType::Vector {
            size: crate::VectorSize::Bi,
            scalar: crate::Scalar::F16,
        },
        crate::StorageFormat::Rgba16Float => NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar::F16,
        },
        _ => NumericType::Scalar(format.into()),
    }
}

pub(super) struct OrderIds {
    pub scope: Word,
    pub semantics: Word,
    pub unequal: Word,
}

pub(super) fn collect_texel_images(block: &crate::Block, images: &mut HandleSet<Expression>) {
    for statement in block.walk() {
        match *statement {
            Statement::ImageAtomic { image, order, .. } => {
                if order.is_some() {
                    images.insert(image);
                }
            }
            Statement::AtomicLoad { ref location, .. }
            | Statement::AtomicStore { ref location, .. } => {
                if let AtomicLocation::Texel(Texel { image, .. }) = *location {
                    images.insert(image);
                }
            }
            _ => {}
        }
    }
}

impl super::Writer {
    pub(super) fn write_memory_scope(&mut self, scope: MemoryScope) -> Word {
        match scope {
            MemoryScope::QueueFamily => {
                self.use_feature(&feature::VULKAN_MEMORY_MODEL);
            }
            MemoryScope::Device => {
                self.device_scope_used = true;
            }
            _ => {}
        }
        self.get_constant_scalar(crate::Literal::I32(spirv_scope(scope) as i32))
    }

    pub(super) fn write_memory_semantics(&mut self, semantics: MemorySemantics) -> Word {
        if semantics.intersects(MODEL_SEMANTICS) {
            self.use_feature(&feature::VULKAN_MEMORY_MODEL);
        }
        self.get_constant_scalar(crate::Literal::U32(semantics.bits()))
    }

    pub(super) fn write_memory_order(&mut self, order: MemoryOrder) -> OrderIds {
        OrderIds {
            scope: self.write_memory_scope(order.scope),
            semantics: self.write_memory_semantics(order.semantics),
            unequal: self.write_memory_semantics(order.unequal),
        }
    }

    pub(super) fn float_atomic(
        &mut self,
        fun: crate::AtomicFunction,
        scalar: crate::Scalar,
        vector: bool,
    ) -> Result<spirv::Op, Error> {
        let op = match fun {
            crate::AtomicFunction::Min => spirv::Op::AtomicFMinEXT,
            crate::AtomicFunction::Max => spirv::Op::AtomicFMaxEXT,
            _ => spirv::Op::AtomicFAddEXT,
        };
        if vector {
            return Ok(op);
        }
        let add = matches!(fun, crate::AtomicFunction::Add);
        self.require(match (add, scalar.width) {
            (true, 2) => &feature::ATOMIC_FLOAT16_ADD,
            (true, 4) => &feature::ATOMIC_FLOAT32_ADD,
            (true, _) => &feature::ATOMIC_FLOAT64_ADD,
            (false, 2) => &feature::ATOMIC_FLOAT16_MIN_MAX,
            (false, 4) => &feature::ATOMIC_FLOAT32_MIN_MAX,
            (false, _) => &feature::ATOMIC_FLOAT64_MIN_MAX,
        })?;
        Ok(op)
    }

    pub(super) fn write_split_barrier(
        &mut self,
        phase: crate::BarrierPhase,
        execution: MemoryScope,
        memory: MemoryScope,
        semantics: MemorySemantics,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.require(&feature::SPLIT_BARRIER)?;
        let execution_id = self.write_memory_scope(execution);
        let memory_id = self.write_memory_scope(memory);
        let semantics_id = self.write_memory_semantics(semantics);
        block.body.push(Instruction::split_barrier(
            phase,
            execution_id,
            memory_id,
            semantics_id,
        ));
        Ok(())
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
        if scalar.width == 8 && scalar.kind != crate::ScalarKind::Float {
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
            Expression::FunctionArgument(index) => self.function.parameter_id(index),
            Expression::Access { .. } | Expression::AccessIndex { .. } => self.write_access_chain(
                image,
                block,
                super::block::AccessTypeAdjustment::IntroducePointer(
                    spirv::StorageClass::UniformConstant,
                ),
            ),
            _ => Err(Error::Validation("Unexpected image expression")),
        }
    }

    pub(super) fn write_texel_pointer(
        &mut self,
        texel: &Texel,
        block: &mut Block,
    ) -> Result<(Word, NumericType), Error> {
        let crate::TypeInner::Image {
            class: crate::ImageClass::Storage { format, .. },
            ..
        } = *self.fun_info[texel.image]
            .ty
            .inner_with(&self.ir_module.types)
        else {
            return Err(Error::Validation("Invalid image class"));
        };
        let numeric = texel_numeric_type(format);
        let (scalar, half_vector) = match numeric {
            NumericType::Scalar(scalar) => (scalar, false),
            NumericType::Vector { scalar, .. } => (scalar, scalar == crate::Scalar::F16),
            NumericType::Matrix { scalar, .. } => (scalar, false),
        };
        if half_vector {
            self.writer.require(&feature::ATOMIC_FLOAT16_VECTOR)?;
        }
        self.atomic_scalar(scalar);
        if let Some(pointer_id) = self.write_heap_texel_pointer(texel, block)? {
            return Ok((pointer_id, numeric));
        }
        let image_id = self.image_pointer(texel.image, block)?;
        let pointee_type_id = self.get_numeric_type_id(numeric);
        let pointer_type_id = self.get_pointer_type_id(pointee_type_id, spirv::StorageClass::Image);
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
            coordinates,
            sample_id,
        ));
        if self
            .non_uniform(texel.image)
            .contains(crate::NonUniform::VALUE)
        {
            self.writer.decorate_non_uniform(pointer_id)?;
        }
        Ok((pointer_id, numeric))
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
                            _ => {
                                return Err(Error::Validation("Invalid atomic pointer"));
                            }
                        }
                    }
                    crate::TypeInner::ValuePointer {
                        size: None, scalar, ..
                    } => scalar,
                    _ => {
                        return Err(Error::Validation("Invalid atomic pointer"));
                    }
                };
                self.atomic_scalar(scalar);
                let pointer_id = self.write_access_chain(
                    pointer,
                    block,
                    super::block::AccessTypeAdjustment::None,
                )?;
                Ok((pointer_id, scalar))
            }
            AtomicLocation::Texel(ref texel) => {
                let (pointer_id, numeric) = self.write_texel_pointer(texel, block)?;
                match numeric {
                    NumericType::Scalar(scalar) => Ok((pointer_id, scalar)),
                    NumericType::Vector { .. } | NumericType::Matrix { .. } => {
                        Err(Error::Validation("Invalid atomic texel type"))
                    }
                }
            }
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
        let (pointer_id, numeric) = self.write_texel_pointer(texel, block)?;
        let ids = self.writer.write_memory_order(order);
        let type_id = self.get_numeric_type_id(numeric);
        let (scalar, vector) = match numeric {
            NumericType::Scalar(scalar) => (scalar, false),
            NumericType::Vector { scalar, .. } => (scalar, true),
            NumericType::Matrix { scalar, .. } => (scalar, false),
        };
        let signed = scalar.kind == crate::ScalarKind::Sint;
        let op = match fun {
            crate::AtomicFunction::Add
            | crate::AtomicFunction::Min
            | crate::AtomicFunction::Max
                if scalar.kind == crate::ScalarKind::Float =>
            {
                self.writer.float_atomic(fun, scalar, vector)?
            }
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
