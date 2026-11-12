use alloc::vec::Vec;

use spirv::{Op, Word};

use super::block::{AccessTypeAdjustment, ExpressionPointer};
use super::{Block, BlockContext, Error, Instruction, LookupType, Writer};
use crate::{
    arena::Handle, CooperativeData, CooperativeFamily, CooperativeMatrixClass,
    CooperativeMatrixFunction, CooperativeSize, Expression, LongVectorClass, ScalarKind,
    TensorOperation, TypeInner,
};

const SPV_EXT_REPLICATED_COMPOSITES: &str = "SPV_EXT_replicated_composites";
const SPV_NV_COOPERATIVE_MATRIX2: &str = "SPV_NV_cooperative_matrix2";
const SPV_EXT_COOPERATIVE_MATRIX_MAINTENANCE1: &str = "SPV_EXT_cooperative_matrix_maintenance1";
const SPV_NV_COOPERATIVE_MATRIX_DECODE_VECTOR: &str = "SPV_NV_cooperative_matrix_decode_vector";
const CAPABILITY_COOPERATIVE_MATRIX_CONVERSIONS_EXT: Word = 5429;
const CAPABILITY_COOPERATIVE_MATRIX_GET_COORDINATE_EXT: Word = 5438;
const CAPABILITY_COOPERATIVE_MATRIX_DECODE_VECTOR_NV: Word = 5447;
const OP_COOPERATIVE_MATRIX_GET_COORDINATE_EXT: Word = 5363;
const DECORATION_COOPERATIVE_MATRIX_TRANSPOSE_EXT: Word = 5440;
const TENSOR_ADDRESSING_DECODE_VECTOR_FUNC: Word = 0x4;

#[derive(Clone, Copy)]
pub(super) enum ReplicateShape {
    Copies(u32),
    Replicated,
}

pub(super) const fn replicate_shape(inner: &TypeInner) -> Result<ReplicateShape, Error> {
    Ok(match *inner {
        TypeInner::CooperativeMatrix { .. } => ReplicateShape::Copies(1),
        TypeInner::Vector { size, .. } => ReplicateShape::Copies(size as u32),
        TypeInner::LongVector {
            size: CooperativeSize::Constant(size),
            class: LongVectorClass::Plain,
            ..
        } => ReplicateShape::Copies(size.get()),
        TypeInner::LongVector { .. } => ReplicateShape::Replicated,
        _ => return Err(Error::Validation("replicating into a non-composite type")),
    })
}

impl Writer {
    fn require_replicated_composites(&mut self) -> Result<(), Error> {
        self.require_any(
            "replicated composites",
            &[spirv::Capability::ReplicatedCompositesEXT],
        )?;
        self.use_extension(SPV_EXT_REPLICATED_COMPOSITES);
        Ok(())
    }

    pub(super) fn write_spec_constant_replicate(
        &mut self,
        type_id: Word,
        value_id: Word,
    ) -> Result<Word, Error> {
        self.require_replicated_composites()?;
        let id = self.id_gen.next();
        let mut instruction = Instruction::new(Op::SpecConstantCompositeReplicateEXT);
        instruction.set_type(type_id);
        instruction.set_result(id);
        instruction.add_operand(value_id);
        instruction.to_words(&mut self.logical_layout.declarations);
        Ok(id)
    }

    pub(super) fn write_constant_replicate(
        &mut self,
        ty: Handle<crate::Type>,
        value_id: Word,
        inner: &TypeInner,
    ) -> Result<Word, Error> {
        match replicate_shape(inner)? {
            ReplicateShape::Copies(count) => {
                let parts: Vec<Word> = (0..count).map(|_| value_id).collect();
                self.get_constant_composite(LookupType::Handle(ty), &parts)
            }
            ReplicateShape::Replicated => {
                self.require_replicated_composites()?;
                let type_id = self.get_handle_type_id(ty)?;
                let id = self.id_gen.next();
                let mut instruction = Instruction::new(Op::ConstantCompositeReplicateEXT);
                instruction.set_type(type_id);
                instruction.set_result(id);
                instruction.add_operand(value_id);
                instruction.to_words(&mut self.logical_layout.declarations);
                Ok(id)
            }
        }
    }
}

impl BlockContext<'_> {
    fn cooperative_pointer(
        &mut self,
        pointer: Handle<Expression>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        match self.write_access_chain(pointer, block, AccessTypeAdjustment::None)? {
            ExpressionPointer::Ready { pointer_id } => Ok(pointer_id),
            ExpressionPointer::Conditional { .. } => Err(Error::FeatureNotImplemented(
                "bounds-checked cooperative memory access",
            )),
        }
    }

    pub(super) fn write_replicate(
        &mut self,
        expr_handle: Handle<Expression>,
        ty: Handle<crate::Type>,
        value: Handle<Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let value_id = self.cached.get(value)?;
        let shape = replicate_shape(&self.ir_module.types[ty].inner)?;
        if self.expression_constness.is_const(expr_handle) {
            let inner = self.ir_module.types[ty].inner.clone();
            return self.writer.write_constant_replicate(ty, value_id, &inner);
        }
        let id = self.gen_id();
        match shape {
            ReplicateShape::Copies(count) => {
                self.temp_list.clear();
                self.temp_list.extend((0..count).map(|_| value_id));
                block.body.push(Instruction::composite_construct(
                    result_type_id,
                    id,
                    &self.temp_list,
                ));
            }
            ReplicateShape::Replicated => {
                self.writer.require_replicated_composites()?;
                let mut instruction = Instruction::new(Op::CompositeConstructReplicateEXT);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(value_id);
                block.body.push(instruction);
            }
        }
        Ok(id)
    }

    fn matrix_class(&self, ty: Handle<crate::Type>) -> Result<CooperativeMatrixClass, Error> {
        match self.ir_module.types[ty].inner {
            TypeInner::CooperativeMatrix { class, .. } => Ok(class),
            _ => Err(Error::Validation("not a cooperative matrix")),
        }
    }

    fn note_matrix_layout(&mut self, layout: Handle<Expression>) -> Result<(), Error> {
        let value = match self.ir_function.expressions[layout] {
            Expression::Literal(crate::Literal::I32(value)) => i64::from(value),
            Expression::Literal(crate::Literal::U32(value)) => i64::from(value),
            _ => return Ok(()),
        };
        if matches!(value, 4202 | 4203) {
            self.writer.require_any(
                "blocked interleaved cooperative matrix layouts",
                &[spirv::Capability::CooperativeMatrixLayoutsARM],
            )?;
            self.writer
                .use_extension("SPV_ARM_cooperative_matrix_layouts");
        }
        Ok(())
    }

    pub(super) fn write_cooperative_load(
        &mut self,
        ty: Handle<crate::Type>,
        data: &CooperativeData,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let class = self.matrix_class(ty)?;
        self.note_matrix_layout(data.layout)?;
        let layout_id = self.cached.get(data.layout)?;
        let stride_id = match data.stride {
            Some(stride) => Some(self.cached.get(stride)?),
            None => None,
        };
        let memory = self.memory_access(data.pointer, false, false);
        let pointer_id = self.cooperative_pointer(data.pointer, block)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(match class {
            CooperativeMatrixClass::Khr => Op::CooperativeMatrixLoadKHR,
            CooperativeMatrixClass::Nv => Op::CooperativeMatrixLoadNV,
        });
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(pointer_id);
        match class {
            CooperativeMatrixClass::Khr => {
                instruction.add_operand(layout_id);
                if let Some(stride_id) = stride_id {
                    instruction.add_operand(stride_id);
                }
            }
            CooperativeMatrixClass::Nv => {
                instruction.add_operand(stride_id.ok_or(Error::Validation("missing stride"))?);
                instruction.add_operand(layout_id);
            }
        }
        instruction.add_operands(memory);
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_cooperative_store(
        &mut self,
        target: Handle<Expression>,
        data: &CooperativeData,
        block: &mut Block,
    ) -> Result<(), Error> {
        let class = match *self.fun_info[target].ty.inner_with(&self.ir_module.types) {
            TypeInner::CooperativeMatrix { class, .. } => class,
            _ => return Err(Error::Validation("not a cooperative matrix")),
        };
        let target_id = self.cached.get(target)?;
        self.note_matrix_layout(data.layout)?;
        let layout_id = self.cached.get(data.layout)?;
        let stride_id = match data.stride {
            Some(stride) => Some(self.cached.get(stride)?),
            None => None,
        };
        let memory = self.memory_access(data.pointer, false, true);
        let pointer_id = self.cooperative_pointer(data.pointer, block)?;
        let mut instruction = Instruction::new(match class {
            CooperativeMatrixClass::Khr => Op::CooperativeMatrixStoreKHR,
            CooperativeMatrixClass::Nv => Op::CooperativeMatrixStoreNV,
        });
        instruction.add_operand(pointer_id);
        instruction.add_operand(target_id);
        match class {
            CooperativeMatrixClass::Khr => {
                instruction.add_operand(layout_id);
                if let Some(stride_id) = stride_id {
                    instruction.add_operand(stride_id);
                }
            }
            CooperativeMatrixClass::Nv => {
                instruction.add_operand(stride_id.ok_or(Error::Validation("missing stride"))?);
                instruction.add_operand(layout_id);
            }
        }
        instruction.add_operands(memory);
        block.body.push(instruction);
        Ok(())
    }

    fn signed(&self, expression: Handle<Expression>) -> bool {
        self.fun_info[expression]
            .ty
            .inner_with(&self.ir_module.types)
            .scalar()
            .is_some_and(|scalar| scalar.kind == ScalarKind::Sint)
    }

    pub(super) fn write_cooperative_mul_add(
        &mut self,
        expr_handle: Handle<Expression>,
        [a, b, c]: [Handle<Expression>; 3],
        saturating: bool,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let class = match *self.fun_info[c].ty.inner_with(&self.ir_module.types) {
            TypeInner::CooperativeMatrix { class, .. } => class,
            _ => return Err(Error::Validation("not a cooperative matrix")),
        };
        let a_id = self.cached.get(a)?;
        let b_id = self.cached.get(b)?;
        let c_id = self.cached.get(c)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(match class {
            CooperativeMatrixClass::Khr => Op::CooperativeMatrixMulAddKHR,
            CooperativeMatrixClass::Nv => Op::CooperativeMatrixMulAddNV,
        });
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(a_id);
        instruction.add_operand(b_id);
        instruction.add_operand(c_id);
        if class == CooperativeMatrixClass::Khr {
            use spirv::CooperativeMatrixOperands as Operands;
            let mut operands = Operands::empty();
            if self.signed(a) {
                operands |= Operands::MATRIX_A_SIGNED_COMPONENTS_KHR;
            }
            if self.signed(b) {
                operands |= Operands::MATRIX_B_SIGNED_COMPONENTS_KHR;
            }
            if self.signed(c) {
                operands |= Operands::MATRIX_C_SIGNED_COMPONENTS_KHR;
            }
            if self.signed(expr_handle) {
                operands |= Operands::MATRIX_RESULT_SIGNED_COMPONENTS_KHR;
            }
            if saturating {
                operands |= Operands::SATURATING_ACCUMULATION_KHR;
            }
            if !operands.is_empty() {
                instruction.add_operand(operands.bits());
            }
        }
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_cooperative_length(
        &mut self,
        ty: Handle<crate::Type>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let class = self.matrix_class(ty)?;
        let type_id = self.get_handle_type_id(ty)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(match class {
            CooperativeMatrixClass::Khr => Op::CooperativeMatrixLengthKHR,
            CooperativeMatrixClass::Nv => Op::CooperativeMatrixLengthNV,
        });
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(type_id);
        block.body.push(instruction);
        Ok(id)
    }

    fn replicated_constant(
        &mut self,
        lookup: LookupType,
        inner: &TypeInner,
        scalar_id: Word,
    ) -> Result<Word, Error> {
        match replicate_shape(inner)? {
            ReplicateShape::Copies(count) => {
                let parts: Vec<Word> = (0..count).map(|_| scalar_id).collect();
                self.writer.get_constant_composite(lookup, &parts)
            }
            ReplicateShape::Replicated => {
                self.writer.require_replicated_composites()?;
                let type_id = self.get_type_id(lookup)?;
                let id = self.gen_id();
                let mut instruction = Instruction::new(Op::ConstantCompositeReplicateEXT);
                instruction.set_type(type_id);
                instruction.set_result(id);
                instruction.add_operand(scalar_id);
                instruction.to_words(&mut self.writer.logical_layout.declarations);
                Ok(id)
            }
        }
    }

    pub(super) fn write_cooperative_cast(
        &mut self,
        expr: Handle<Expression>,
        source: crate::Scalar,
        (kind, convert): (ScalarKind, Option<u8>),
        block: &mut Block,
        result_type_id: Word,
    ) -> Result<Word, Error> {
        use ScalarKind as Sk;
        let expr_id = self.cached.get(expr)?;
        let width = convert.unwrap_or(source.width);
        if source.kind == kind && source.width == width {
            return Ok(expr_id);
        }
        let id = self.gen_id();
        let float = |kind: Sk| kind.is_any_float();
        if convert.is_some() && (float(source.kind) || float(kind)) && source.kind != Sk::Bool {
            let op = match (float(source.kind), kind) {
                (true, Sk::Sint) => Some(Op::ConvertFToS),
                (true, Sk::Uint) => Some(Op::ConvertFToU),
                (true, _) if float(kind) => Some(Op::FConvert),
                (false, _) if source.kind == Sk::Sint && float(kind) => Some(Op::ConvertSToF),
                (false, _) if source.kind == Sk::Uint && float(kind) => Some(Op::ConvertUToF),
                _ => None,
            };
            if let Some(op) = op {
                block
                    .body
                    .push(Instruction::unary(op, result_type_id, id, expr_id));
                return Ok(id);
            }
        }
        let op = match (source.kind, kind, convert) {
            (_, _, None) => Op::Bitcast,
            (Sk::Bool, Sk::Bool, _) => Op::CopyObject,
            (Sk::Sint | Sk::Uint | Sk::Float, Sk::Bool, Some(_)) => {
                let op = match source.kind {
                    Sk::Float => Op::FUnordNotEqual,
                    _ => Op::INotEqual,
                };
                let zero = self.writer.get_constant_scalar_with(0, source)?;
                let lookup = self
                    .writer
                    .get_expression_lookup_type(&self.fun_info[expr].ty)?;
                let inner = self.fun_info[expr]
                    .ty
                    .inner_with(&self.ir_module.types)
                    .clone();
                let zero = self.replicated_constant(lookup, &inner, zero)?;
                block
                    .body
                    .push(Instruction::binary(op, result_type_id, id, expr_id, zero));
                return Ok(id);
            }
            (Sk::Bool, _, Some(width)) => {
                let target = crate::Scalar { kind, width };
                let zero = self.writer.get_constant_scalar_with(0, target)?;
                let one = self.writer.get_constant_scalar_with(1, target)?;
                let inner = self.result_inner(expr, target);
                let lookup =
                    self.writer
                        .get_expression_lookup_type(&crate::proc::TypeResolution::Value(
                            inner.clone(),
                        ))?;
                let zero = self.replicated_constant(lookup, &inner, zero)?;
                let one = self.replicated_constant(lookup, &inner, one)?;
                block.body.push(Instruction::ternary(
                    Op::Select,
                    result_type_id,
                    id,
                    expr_id,
                    one,
                    zero,
                ));
                return Ok(id);
            }
            (Sk::Float, Sk::Float, Some(_)) => Op::FConvert,
            (Sk::Float, Sk::Sint, Some(_)) => Op::ConvertFToS,
            (Sk::Float, Sk::Uint, Some(_)) => Op::ConvertFToU,
            (Sk::Sint, Sk::Float, Some(_)) => Op::ConvertSToF,
            (Sk::Uint, Sk::Float, Some(_)) => Op::ConvertUToF,
            (Sk::Sint | Sk::Uint, Sk::Sint | Sk::Uint, Some(width)) if width != source.width => {
                let op = if source.kind == Sk::Sint {
                    Op::SConvert
                } else {
                    Op::UConvert
                };
                if source.kind == kind {
                    op
                } else {
                    let intermediate = self.result_inner(
                        expr,
                        crate::Scalar {
                            kind: source.kind,
                            width,
                        },
                    );
                    let intermediate_type = self.get_expression_type_id(
                        &crate::proc::TypeResolution::Value(intermediate),
                    )?;
                    let widened = self.gen_id();
                    block
                        .body
                        .push(Instruction::unary(op, intermediate_type, widened, expr_id));
                    block
                        .body
                        .push(Instruction::unary(Op::Bitcast, result_type_id, id, widened));
                    return Ok(id);
                }
            }
            _ => Op::Bitcast,
        };
        block
            .body
            .push(Instruction::unary(op, result_type_id, id, expr_id));
        Ok(id)
    }

    fn result_inner(&self, expr: Handle<Expression>, scalar: crate::Scalar) -> TypeInner {
        match *self.fun_info[expr].ty.inner_with(&self.ir_module.types) {
            TypeInner::LongVector { size, class, .. } => TypeInner::LongVector {
                size,
                scalar,
                class,
            },
            TypeInner::CooperativeMatrix {
                columns,
                rows,
                role,
                scope,
                class,
                ..
            } => TypeInner::CooperativeMatrix {
                columns,
                rows,
                scalar,
                role,
                scope,
                class,
            },
            ref other => other.clone(),
        }
    }

    fn require_expect_assume(&mut self) -> Result<(), Error> {
        self.writer
            .require_any("expect and assume", &[spirv::Capability::ExpectAssumeKHR])?;
        self.writer.use_extension("SPV_KHR_expect_assume");
        Ok(())
    }

    pub(super) fn write_expect(
        &mut self,
        value: Handle<Expression>,
        expected: Handle<Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.require_expect_assume()?;
        let value_id = self.cached.get(value)?;
        let expected_id = self.cached.get(expected)?;
        let id = self.gen_id();
        block.body.push(Instruction::binary(
            Op::ExpectKHR,
            result_type_id,
            id,
            value_id,
            expected_id,
        ));
        Ok(id)
    }

    pub(super) fn write_assume(
        &mut self,
        condition: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.require_expect_assume()?;
        let condition_id = self.cached.get(condition)?;
        let mut instruction = Instruction::new(Op::AssumeTrueKHR);
        instruction.add_operand(condition_id);
        block.body.push(instruction);
        Ok(())
    }

    pub(super) fn write_cooperative_vector_load(
        &mut self,
        pointer: Handle<Expression>,
        offset: Handle<Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let memory = self.memory_access(pointer, false, false);
        let pointer_id = self.cooperative_pointer(pointer, block)?;
        let offset_id = self.cached.get(offset)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(Op::CooperativeVectorLoadNV);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(pointer_id);
        instruction.add_operand(offset_id);
        instruction.add_operands(memory);
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_cooperative_vector_mat_mul(
        &mut self,
        expr_handle: Handle<Expression>,
        operation: &crate::CooperativeVectorMatMul,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let matrix_id = self.cooperative_pointer(operation.matrix, block)?;
        let bias = match operation.bias {
            Some(bias) => Some((
                self.cooperative_pointer(bias.pointer, block)?,
                self.cached.get(bias.offset)?,
                self.cached.get(bias.interpretation)?,
            )),
            None => None,
        };
        let id = self.gen_id();
        let mut instruction = Instruction::new(if bias.is_some() {
            Op::CooperativeVectorMatrixMulAddNV
        } else {
            Op::CooperativeVectorMatrixMulNV
        });
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(self.cached.get(operation.input)?);
        instruction.add_operand(self.cached.get(operation.input_interpretation)?);
        instruction.add_operand(matrix_id);
        instruction.add_operand(self.cached.get(operation.matrix_offset)?);
        instruction.add_operand(self.cached.get(operation.matrix_interpretation)?);
        if let Some((pointer, offset, interpretation)) = bias {
            instruction.add_operand(pointer);
            instruction.add_operand(offset);
            instruction.add_operand(interpretation);
        }
        for operand in [
            operation.rows,
            operation.columns,
            operation.layout,
            operation.transpose,
            operation.stride,
        ] {
            instruction.add_operand(self.cached.get(operand)?);
        }
        use spirv::CooperativeMatrixOperands as Operands;
        let mut operands = Operands::empty();
        if self.signed(operation.input) {
            operands |= Operands::MATRIX_B_SIGNED_COMPONENTS_KHR;
        }
        if self.signed(expr_handle) {
            operands |= Operands::MATRIX_RESULT_SIGNED_COMPONENTS_KHR;
        }
        if !operands.is_empty() {
            instruction.add_operand(operands.bits());
        }
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_cooperative_vector_function(
        &mut self,
        function: &crate::CooperativeVectorFunction,
        block: &mut Block,
    ) -> Result<(), Error> {
        use crate::CooperativeVectorFunction as Cvf;
        match *function {
            Cvf::Store {
                value,
                pointer,
                offset,
            } => {
                let memory = self.memory_access(pointer, false, true);
                let pointer_id = self.cooperative_pointer(pointer, block)?;
                let mut instruction = Instruction::new(Op::CooperativeVectorStoreNV);
                instruction.add_operand(pointer_id);
                instruction.add_operand(self.cached.get(offset)?);
                instruction.add_operand(self.cached.get(value)?);
                instruction.add_operands(memory);
                block.body.push(instruction);
            }
            Cvf::OuterProductAccumulate {
                a,
                b,
                matrix,
                offset,
                stride,
                layout,
                interpretation,
            } => {
                self.require_cooperative_vector_training()?;
                let pointer_id = self.cooperative_pointer(matrix, block)?;
                let mut instruction =
                    Instruction::new(Op::CooperativeVectorOuterProductAccumulateNV);
                instruction.add_operand(pointer_id);
                for operand in [offset, a, b, layout, interpretation, stride] {
                    instruction.add_operand(self.cached.get(operand)?);
                }
                block.body.push(instruction);
            }
            Cvf::ReduceSumAccumulate {
                value,
                pointer,
                offset,
            } => {
                self.require_cooperative_vector_training()?;
                let pointer_id = self.cooperative_pointer(pointer, block)?;
                let mut instruction = Instruction::new(Op::CooperativeVectorReduceSumAccumulateNV);
                instruction.add_operand(pointer_id);
                instruction.add_operand(self.cached.get(offset)?);
                instruction.add_operand(self.cached.get(value)?);
                block.body.push(instruction);
            }
        }
        Ok(())
    }

    fn require_cooperative_vector_training(&mut self) -> Result<(), Error> {
        self.writer.require_any(
            "cooperative vector training",
            &[spirv::Capability::CooperativeVectorTrainingNV],
        )?;
        self.writer.use_extension("SPV_NV_cooperative_vector");
        Ok(())
    }

    pub(super) fn write_convert(
        &mut self,
        expr: Handle<Expression>,
        ty: Handle<crate::Type>,
        (saturating, family): (bool, CooperativeFamily),
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let source_inner = self.fun_info[expr]
            .ty
            .inner_with(&self.ir_module.types)
            .clone();
        let target_inner = self.ir_module.types[ty].inner.clone();
        let (Some(source), Some(target)) = (source_inner.scalar(), target_inner.scalar()) else {
            return Err(Error::Validation("conversion of a non-numeric value"));
        };
        let use_changes = match (&source_inner, &target_inner) {
            (
                &TypeInner::CooperativeMatrix { role: from, .. },
                &TypeInner::CooperativeMatrix { role: to, .. },
            ) => from != to,
            _ => false,
        };
        if use_changes {
            self.require_conversions(family)?;
        }
        let id = if source == target {
            let expr_id = self.cached.get(expr)?;
            if !use_changes {
                return Ok(expr_id);
            }
            let id = self.gen_id();
            block.body.push(Instruction::unary(
                Op::CooperativeMatrixConvertNV,
                result_type_id,
                id,
                expr_id,
            ));
            id
        } else {
            self.write_cooperative_cast(
                expr,
                source,
                (target.kind, Some(target.width)),
                block,
                result_type_id,
            )?
        };
        if saturating {
            self.writer.decorate(
                id,
                spirv::Decoration::SaturatedToLargestFloat8NormalConversionEXT,
                &[],
            );
        }
        Ok(id)
    }

    fn require_conversions(&mut self, family: CooperativeFamily) -> Result<(), Error> {
        match family {
            CooperativeFamily::Ext => {
                self.writer
                    .raw_capabilities
                    .insert(CAPABILITY_COOPERATIVE_MATRIX_CONVERSIONS_EXT);
                self.writer
                    .use_extension(SPV_EXT_COOPERATIVE_MATRIX_MAINTENANCE1);
            }
            CooperativeFamily::Khr | CooperativeFamily::Nv => {
                self.writer.require_any(
                    "cooperative matrix conversions",
                    &[spirv::Capability::CooperativeMatrixConversionsNV],
                )?;
                self.writer.use_extension(SPV_NV_COOPERATIVE_MATRIX2);
            }
        }
        Ok(())
    }

    fn require_family(
        &mut self,
        family: CooperativeFamily,
        capability: spirv::Capability,
    ) -> Result<(), Error> {
        self.writer
            .require_any("cooperative matrix operation", &[capability])?;
        match family {
            CooperativeFamily::Ext => self
                .writer
                .use_extension(SPV_EXT_COOPERATIVE_MATRIX_MAINTENANCE1),
            CooperativeFamily::Khr | CooperativeFamily::Nv => {
                self.writer.use_extension(SPV_NV_COOPERATIVE_MATRIX2)
            }
        }
        Ok(())
    }

    pub(super) fn write_tensor_create(
        &mut self,
        ty: Handle<crate::Type>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let op = match self.ir_module.types[ty].inner {
            TypeInner::TensorLayout { .. } => Op::CreateTensorLayoutNV,
            TypeInner::TensorView { .. } => Op::CreateTensorViewNV,
            _ => return Err(Error::Validation("creating a non-tensor type")),
        };
        let id = self.gen_id();
        let mut instruction = Instruction::new(op);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_tensor_set(
        &mut self,
        base: Handle<Expression>,
        operation: TensorOperation,
        operands: &[Handle<Expression>],
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let op = match operation {
            TensorOperation::LayoutSetBlockSize => Op::TensorLayoutSetBlockSizeNV,
            TensorOperation::LayoutSetDimension => Op::TensorLayoutSetDimensionNV,
            TensorOperation::LayoutSetStride => Op::TensorLayoutSetStrideNV,
            TensorOperation::LayoutSlice => Op::TensorLayoutSliceNV,
            TensorOperation::LayoutSetClampValue => Op::TensorLayoutSetClampValueNV,
            TensorOperation::ViewSetDimension => Op::TensorViewSetDimensionNV,
            TensorOperation::ViewSetStride => Op::TensorViewSetStrideNV,
            TensorOperation::ViewSetClip => Op::TensorViewSetClipNV,
        };
        let base_id = self.cached.get(base)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(op);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(base_id);
        for &operand in operands {
            instruction.add_operand(self.cached.get(operand)?);
        }
        block.body.push(instruction);
        Ok(id)
    }

    fn function_id(&self, function: Handle<crate::Function>) -> Result<Word, Error> {
        self.writer
            .lookup_function
            .get(&function)
            .copied()
            .ok_or(Error::Validation(
                "a referenced function is not written yet",
            ))
    }

    fn result_scalar(&self, expression: Handle<Expression>) -> Result<crate::Scalar, Error> {
        self.fun_info[expression]
            .ty
            .inner_with(&self.ir_module.types)
            .scalar()
            .ok_or(Error::Validation("a cooperative operand is not numeric"))
    }

    fn write_transpose_ext(
        &mut self,
        matrix: Handle<Expression>,
        result: Handle<Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.require_conversions(CooperativeFamily::Ext)?;
        let source = self.result_scalar(matrix)?;
        let target = self.result_scalar(result)?;
        let matrix_id = self.cached.get(matrix)?;
        let integer = |kind: ScalarKind| matches!(kind, ScalarKind::Sint | ScalarKind::Uint);
        let float = |kind: ScalarKind| kind.is_any_float();
        let op = match (source.kind, target.kind) {
            _ if source == target => Op::CooperativeMatrixConvertNV,
            (from, to) if float(from) && float(to) => Op::FConvert,
            (ScalarKind::Sint, to) if float(to) => Op::ConvertSToF,
            (ScalarKind::Uint, to) if float(to) => Op::ConvertUToF,
            (from, ScalarKind::Sint) if float(from) => Op::ConvertFToS,
            (from, ScalarKind::Uint) if float(from) => Op::ConvertFToU,
            (ScalarKind::Sint, _) if source.width != target.width => Op::SConvert,
            (ScalarKind::Uint, _) if source.width != target.width => Op::UConvert,
            _ => Op::CooperativeMatrixConvertNV,
        };
        let sign_change = integer(source.kind)
            && integer(target.kind)
            && source.kind != target.kind
            && source.width != target.width;
        let converted = self.gen_id();
        if sign_change {
            let intermediate = match self.fun_info[result].ty.inner_with(&self.ir_module.types) {
                &TypeInner::CooperativeMatrix {
                    columns,
                    rows,
                    role,
                    scope,
                    class,
                    ..
                } => TypeInner::CooperativeMatrix {
                    columns,
                    rows,
                    scalar: crate::Scalar {
                        kind: source.kind,
                        width: target.width,
                    },
                    role,
                    scope,
                    class,
                },
                _ => return Err(Error::Validation("transpose into a non-matrix")),
            };
            let intermediate_type =
                self.get_expression_type_id(&crate::proc::TypeResolution::Value(intermediate))?;
            block.body.push(Instruction::unary(
                op,
                intermediate_type,
                converted,
                matrix_id,
            ));
            self.decorate_transpose(converted);
            let id = self.gen_id();
            block.body.push(Instruction::unary(
                Op::Bitcast,
                result_type_id,
                id,
                converted,
            ));
            return Ok(id);
        }
        block
            .body
            .push(Instruction::unary(op, result_type_id, converted, matrix_id));
        self.decorate_transpose(converted);
        Ok(converted)
    }

    fn decorate_transpose(&mut self, id: Word) {
        let mut decoration = Instruction::new(Op::Decorate);
        decoration.add_operand(id);
        decoration.add_operand(DECORATION_COOPERATIVE_MATRIX_TRANSPOSE_EXT);
        self.writer.annotations.push(decoration);
    }

    fn require_tensor_access(&mut self) -> Result<(), Error> {
        self.writer.require_any(
            "cooperative matrix tensor addressing",
            &[spirv::Capability::CooperativeMatrixTensorAddressingNV],
        )?;
        self.writer.use_extension(SPV_NV_COOPERATIVE_MATRIX2);
        Ok(())
    }

    pub(super) fn write_cooperative_matrix_function(
        &mut self,
        function: &CooperativeMatrixFunction,
        result: Option<Handle<Expression>>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let result_type_id = match result {
            Some(result) => self.get_expression_type_id(&self.fun_info[result].ty)?,
            None => 0,
        };
        let id = self.gen_id();
        let instruction = match *function {
            CooperativeMatrixFunction::Transpose { matrix, family } => match (family, result) {
                (CooperativeFamily::Ext, Some(result)) => {
                    let converted =
                        self.write_transpose_ext(matrix, result, result_type_id, block)?;
                    self.cached.set(result, converted)?;
                    return Ok(());
                }
                _ => {
                    self.require_conversions(family)?;
                    let matrix_id = self.cached.get(matrix)?;
                    Instruction::unary(
                        Op::CooperativeMatrixTransposeNV,
                        result_type_id,
                        id,
                        matrix_id,
                    )
                }
            },
            CooperativeMatrixFunction::Reduce {
                matrix,
                mask,
                combine,
                family,
            } => {
                self.require_family(family, spirv::Capability::CooperativeMatrixReductionsNV)?;
                let mut instruction = Instruction::new(Op::CooperativeMatrixReduceNV);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(self.cached.get(matrix)?);
                instruction.add_operand(mask);
                instruction.add_operand(self.function_id(combine)?);
                instruction
            }
            CooperativeMatrixFunction::PerElement {
                matrix,
                function,
                ref arguments,
                family,
            } => {
                self.require_family(
                    family,
                    spirv::Capability::CooperativeMatrixPerElementOperationsNV,
                )?;
                let mut instruction = Instruction::new(Op::CooperativeMatrixPerElementOpNV);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(self.cached.get(matrix)?);
                instruction.add_operand(self.function_id(function)?);
                for &argument in arguments {
                    instruction.add_operand(self.cached.get(argument)?);
                }
                instruction
            }
            CooperativeMatrixFunction::GetCoordinate { matrix, index } => {
                self.writer
                    .raw_capabilities
                    .insert(CAPABILITY_COOPERATIVE_MATRIX_GET_COORDINATE_EXT);
                self.writer
                    .use_extension(SPV_EXT_COOPERATIVE_MATRIX_MAINTENANCE1);
                let mut instruction = Instruction::raw(OP_COOPERATIVE_MATRIX_GET_COORDINATE_EXT);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(self.cached.get(matrix)?);
                instruction.add_operand(self.cached.get(index)?);
                instruction
            }
            CooperativeMatrixFunction::LoadTensor {
                pointer,
                object,
                layout,
                view,
                decode,
                decode_vector,
            } => {
                self.require_tensor_access()?;
                let mut memory = self.memory_access(pointer, false, false);
                if memory.is_empty() {
                    memory.push(0);
                }
                let pointer_id = self.cooperative_pointer(pointer, block)?;
                let mut instruction = Instruction::new(Op::CooperativeMatrixLoadTensorNV);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(pointer_id);
                instruction.add_operand(self.cached.get(object)?);
                instruction.add_operand(self.cached.get(layout)?);
                instruction.add_operands(memory);
                let mut mask = 0;
                let mut extra = Vec::new();
                if let Some(view) = view {
                    mask |= spirv::TensorAddressingOperands::TENSOR_VIEW.bits();
                    extra.push(self.cached.get(view)?);
                }
                if let Some(decode) = decode {
                    self.writer.require_any(
                        "cooperative matrix block loads",
                        &[spirv::Capability::CooperativeMatrixBlockLoadsNV],
                    )?;
                    mask |= spirv::TensorAddressingOperands::DECODE_FUNC.bits();
                    extra.push(self.function_id(decode)?);
                }
                if let Some(decode_vector) = decode_vector {
                    self.writer
                        .raw_capabilities
                        .insert(CAPABILITY_COOPERATIVE_MATRIX_DECODE_VECTOR_NV);
                    self.writer
                        .use_extension(SPV_NV_COOPERATIVE_MATRIX_DECODE_VECTOR);
                    mask |= TENSOR_ADDRESSING_DECODE_VECTOR_FUNC;
                    extra.push(self.function_id(decode_vector)?);
                }
                instruction.add_operand(mask);
                instruction.add_operands(extra);
                instruction
            }
            CooperativeMatrixFunction::StoreTensor {
                pointer,
                value,
                layout,
                view,
            } => {
                self.require_tensor_access()?;
                let mut memory = self.memory_access(pointer, false, true);
                if memory.is_empty() {
                    memory.push(0);
                }
                let pointer_id = self.cooperative_pointer(pointer, block)?;
                let mut instruction = Instruction::new(Op::CooperativeMatrixStoreTensorNV);
                instruction.add_operand(pointer_id);
                instruction.add_operand(self.cached.get(value)?);
                instruction.add_operand(self.cached.get(layout)?);
                instruction.add_operands(memory);
                match view {
                    Some(view) => {
                        instruction
                            .add_operand(spirv::TensorAddressingOperands::TENSOR_VIEW.bits());
                        instruction.add_operand(self.cached.get(view)?);
                    }
                    None => instruction.add_operand(0),
                }
                block.body.push(instruction);
                return Ok(());
            }
        };
        block.body.push(instruction);
        if let Some(result) = result {
            self.cached.set(result, id)?;
        }
        Ok(())
    }
}
