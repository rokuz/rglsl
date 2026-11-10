use alloc::vec::Vec;

use spirv::{Op, Word};

use super::block::{AccessTypeAdjustment, ExpressionPointer};
use super::{Block, BlockContext, Error, Instruction, LookupType, Writer};
use crate::{
    arena::Handle, CooperativeData, CooperativeMatrixClass, CooperativeSize, Expression,
    LongVectorClass, ScalarKind, TypeInner,
};

const SPV_EXT_REPLICATED_COMPOSITES: &str = "SPV_EXT_replicated_composites";

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

    pub(super) fn write_cooperative_load(
        &mut self,
        ty: Handle<crate::Type>,
        data: &CooperativeData,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let class = self.matrix_class(ty)?;
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
}
