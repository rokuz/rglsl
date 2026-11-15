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
        crate::StorageFormat::R8Unorm
        | crate::StorageFormat::R8Snorm
        | crate::StorageFormat::R8Uint
        | crate::StorageFormat::R8Sint
        | crate::StorageFormat::R16Uint
        | crate::StorageFormat::R16Sint
        | crate::StorageFormat::R16Float
        | crate::StorageFormat::Rg8Unorm
        | crate::StorageFormat::Rg8Snorm
        | crate::StorageFormat::Rg8Uint
        | crate::StorageFormat::Rg8Sint
        | crate::StorageFormat::Rg16Uint
        | crate::StorageFormat::Rg16Sint
        | crate::StorageFormat::Rgba8Unorm
        | crate::StorageFormat::Rgba8Snorm
        | crate::StorageFormat::Rgba8Uint
        | crate::StorageFormat::Rgba8Sint
        | crate::StorageFormat::Bgra8Unorm
        | crate::StorageFormat::Rgb10a2Uint
        | crate::StorageFormat::Rgb10a2Unorm
        | crate::StorageFormat::Rg11b10Ufloat
        | crate::StorageFormat::R32Uint
        | crate::StorageFormat::R32Sint
        | crate::StorageFormat::R32Float
        | crate::StorageFormat::Rg32Uint
        | crate::StorageFormat::Rg32Sint
        | crate::StorageFormat::Rg32Float
        | crate::StorageFormat::Rgba16Uint
        | crate::StorageFormat::Rgba16Sint
        | crate::StorageFormat::Rgba32Uint
        | crate::StorageFormat::Rgba32Sint
        | crate::StorageFormat::Rgba32Float
        | crate::StorageFormat::R64Uint
        | crate::StorageFormat::R64Sint
        | crate::StorageFormat::R16Unorm
        | crate::StorageFormat::R16Snorm
        | crate::StorageFormat::Rg16Unorm
        | crate::StorageFormat::Rg16Snorm
        | crate::StorageFormat::Rgba16Unorm
        | crate::StorageFormat::Rgba16Snorm
        | crate::StorageFormat::Unknown(_) => NumericType::Scalar(format.into()),
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
            Statement::Emit(_)
            | Statement::Block(_)
            | Statement::If { .. }
            | Statement::Switch { .. }
            | Statement::Loop { .. }
            | Statement::Break
            | Statement::Continue
            | Statement::Return { .. }
            | Statement::Kill
            | Statement::Demote
            | Statement::BeginInvocationInterlock
            | Statement::EndInvocationInterlock
            | Statement::EmitVertex { .. }
            | Statement::EndPrimitive { .. }
            | Statement::ControlBarrier(_)
            | Statement::MemoryBarrier(_)
            | Statement::ScopedBarrier { .. }
            | Statement::SplitBarrier { .. }
            | Statement::Store { .. }
            | Statement::ImageStore { .. }
            | Statement::Atomic { .. }
            | Statement::Call { .. }
            | Statement::RayQuery { .. }
            | Statement::RayPipelineFunction(_)
            | Statement::HitObject { .. }
            | Statement::ReorderThread { .. }
            | Statement::MeshFunction(_)
            | Statement::SubgroupBallot { .. }
            | Statement::SubgroupGather { .. }
            | Statement::SubgroupCollectiveOperation { .. }
            | Statement::SubgroupFunction { .. }
            | Statement::CooperativeStore { .. }
            | Statement::DebugPrintf { .. }
            | Statement::Assume { .. }
            | Statement::CooperativeVector(_)
            | Statement::CooperativeMatrix { .. }
            | Statement::Abort { .. }
            | Statement::TensorWrite { .. }
            | Statement::SpirvInstruction { .. } => {}
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
            crate::AtomicFunction::Add
            | crate::AtomicFunction::Subtract
            | crate::AtomicFunction::And
            | crate::AtomicFunction::ExclusiveOr
            | crate::AtomicFunction::InclusiveOr
            | crate::AtomicFunction::Exchange { .. } => spirv::Op::AtomicFAddEXT,
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
            Expression::Literal(_)
            | Expression::Constant(_)
            | Expression::Override(_)
            | Expression::ZeroValue(_)
            | Expression::Compose { .. }
            | Expression::Splat { .. }
            | Expression::Swizzle { .. }
            | Expression::LocalVariable(_)
            | Expression::Load { .. }
            | Expression::ImageSample { .. }
            | Expression::ImageLoad { .. }
            | Expression::ImageQuery { .. }
            | Expression::Unary { .. }
            | Expression::Binary { .. }
            | Expression::Select { .. }
            | Expression::Derivative { .. }
            | Expression::Relational { .. }
            | Expression::Math { .. }
            | Expression::As { .. }
            | Expression::CallResult(_)
            | Expression::AtomicResult { .. }
            | Expression::ArrayLength(_)
            | Expression::WideArrayLength(_)
            | Expression::PhysicalPointer { .. }
            | Expression::PhysicalAddress { .. }
            | Expression::BufferPointer { .. }
            | Expression::HeapOffset { .. }
            | Expression::RayQueryProceedResult
            | Expression::RayQueryGet { .. }
            | Expression::ReportIntersectionResult
            | Expression::AccelerationStructureFromAddress { .. }
            | Expression::HitObjectGet { .. }
            | Expression::FetchMicroTriangleVertex { .. }
            | Expression::SubgroupBallotResult
            | Expression::SubgroupOperationResult { .. }
            | Expression::SpirvInstructionResult { .. }
            | Expression::CooperativeLoad { .. }
            | Expression::CooperativeMultiplyAdd { .. }
            | Expression::CooperativeMatrixLength { .. }
            | Expression::Replicate { .. }
            | Expression::Expect { .. }
            | Expression::ImageSparseResident { .. }
            | Expression::IsHelperInvocation
            | Expression::ReadClock { .. }
            | Expression::InterpolateAt { .. }
            | Expression::FragmentFetch { .. }
            | Expression::ImageFootprint { .. }
            | Expression::AttachmentRead { .. }
            | Expression::CooperativeVectorLoad { .. }
            | Expression::CooperativeVectorMatMul { .. }
            | Expression::Convert { .. }
            | Expression::CooperativeMatrixResult { .. }
            | Expression::TensorCreate { .. }
            | Expression::ImageProcessing { .. }
            | Expression::ArrayConversion { .. }
            | Expression::Bitcast { .. }
            | Expression::TensorSet { .. }
            | Expression::TensorRead { .. }
            | Expression::TensorQuerySize { .. } => {
                Err(Error::Validation("Unexpected image expression"))
            }
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
                            crate::TypeInner::Vector { .. }
                            | crate::TypeInner::Matrix { .. }
                            | crate::TypeInner::CooperativeMatrix { .. }
                            | crate::TypeInner::LongVector { .. }
                            | crate::TypeInner::TensorLayout { .. }
                            | crate::TypeInner::TensorView { .. }
                            | crate::TypeInner::Tensor { .. }
                            | crate::TypeInner::Pointer { .. }
                            | crate::TypeInner::ValuePointer { .. }
                            | crate::TypeInner::Array { .. }
                            | crate::TypeInner::Struct { .. }
                            | crate::TypeInner::Image { .. }
                            | crate::TypeInner::Sampler { .. }
                            | crate::TypeInner::SampledImage { .. }
                            | crate::TypeInner::AccelerationStructure
                            | crate::TypeInner::RayQuery
                            | crate::TypeInner::HitObject { .. }
                            | crate::TypeInner::BindingArray { .. }
                            | crate::TypeInner::BufferDescriptor { .. }
                            | crate::TypeInner::Spirv { .. } => {
                                return Err(Error::Validation("Invalid atomic pointer"));
                            }
                        }
                    }
                    crate::TypeInner::ValuePointer {
                        size: None, scalar, ..
                    } => scalar,
                    crate::TypeInner::Scalar(_)
                    | crate::TypeInner::Vector { .. }
                    | crate::TypeInner::Matrix { .. }
                    | crate::TypeInner::CooperativeMatrix { .. }
                    | crate::TypeInner::LongVector { .. }
                    | crate::TypeInner::TensorLayout { .. }
                    | crate::TypeInner::TensorView { .. }
                    | crate::TypeInner::Tensor { .. }
                    | crate::TypeInner::Atomic(_)
                    | crate::TypeInner::ValuePointer { size: Some(_), .. }
                    | crate::TypeInner::Array { .. }
                    | crate::TypeInner::Struct { .. }
                    | crate::TypeInner::Image { .. }
                    | crate::TypeInner::Sampler { .. }
                    | crate::TypeInner::SampledImage { .. }
                    | crate::TypeInner::AccelerationStructure
                    | crate::TypeInner::RayQuery
                    | crate::TypeInner::HitObject { .. }
                    | crate::TypeInner::BindingArray { .. }
                    | crate::TypeInner::BufferDescriptor { .. }
                    | crate::TypeInner::Spirv { .. } => {
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
