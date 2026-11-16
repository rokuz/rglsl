use spirv::Word;

use super::super::{
    Block, BlockContext, Error, Instruction, LocalType, NumericType, feature, grammar,
};
use crate::arena::Handle;

enum MathOp {
    Ext(spirv::GlslStd450Op),
    Custom(Instruction),
    Emitted,
}

struct MathIds {
    id: Word,
    result_type_id: Word,
    arg0_id: Word,
    arg1_id: Word,
    arg2_id: Word,
}

const fn integer_functions2(
    fun: crate::MathFunction,
    kind: Option<crate::ScalarKind>,
) -> Result<spirv::Op, Error> {
    use crate::MathFunction as Mf;
    use crate::ScalarKind as Sk;
    use spirv::Op;
    Ok(match (fun, kind) {
        (Mf::IntelCountLeadingZeros, Some(Sk::Uint)) => Op::UCountLeadingZerosINTEL,
        (Mf::IntelCountTrailingZeros, Some(Sk::Uint)) => Op::UCountTrailingZerosINTEL,
        (Mf::AbsoluteDifference, Some(Sk::Sint)) => Op::AbsISubINTEL,
        (Mf::AbsoluteDifference, Some(Sk::Uint)) => Op::AbsUSubINTEL,
        (Mf::AddSaturate, Some(Sk::Sint)) => Op::IAddSatINTEL,
        (Mf::AddSaturate, Some(Sk::Uint)) => Op::UAddSatINTEL,
        (Mf::SubtractSaturate, Some(Sk::Sint)) => Op::ISubSatINTEL,
        (Mf::SubtractSaturate, Some(Sk::Uint)) => Op::USubSatINTEL,
        (Mf::Average, Some(Sk::Sint)) => Op::IAverageINTEL,
        (Mf::Average, Some(Sk::Uint)) => Op::UAverageINTEL,
        (Mf::AverageRounded, Some(Sk::Sint)) => Op::IAverageRoundedINTEL,
        (Mf::AverageRounded, Some(Sk::Uint)) => Op::UAverageRoundedINTEL,
        (Mf::Multiply32x16, Some(Sk::Sint)) => Op::IMul32x16INTEL,
        (Mf::Multiply32x16, Some(Sk::Uint)) => Op::UMul32x16INTEL,
        _ => return Err(Error::Validation("integer function of a non-integer value")),
    })
}

const fn trinary_minmax(
    fun: crate::MathFunction,
    kind: Option<crate::ScalarKind>,
) -> Result<Word, Error> {
    use crate::MathFunction as Mf;
    use crate::ScalarKind as Sk;
    Ok(match (fun, kind) {
        (Mf::Min3, Some(Sk::Float)) => grammar::amd_shader_trinary_minmax::FMin3AMD,
        (Mf::Min3, Some(Sk::Uint)) => grammar::amd_shader_trinary_minmax::UMin3AMD,
        (Mf::Min3, Some(Sk::Sint)) => grammar::amd_shader_trinary_minmax::SMin3AMD,
        (Mf::Max3, Some(Sk::Float)) => grammar::amd_shader_trinary_minmax::FMax3AMD,
        (Mf::Max3, Some(Sk::Uint)) => grammar::amd_shader_trinary_minmax::UMax3AMD,
        (Mf::Max3, Some(Sk::Sint)) => grammar::amd_shader_trinary_minmax::SMax3AMD,
        (Mf::Mid3, Some(Sk::Float)) => grammar::amd_shader_trinary_minmax::FMid3AMD,
        (Mf::Mid3, Some(Sk::Uint)) => grammar::amd_shader_trinary_minmax::UMid3AMD,
        (Mf::Mid3, Some(Sk::Sint)) => grammar::amd_shader_trinary_minmax::SMid3AMD,
        _ => return Err(Error::Validation("trinary min/max of a non-numeric value")),
    })
}

const fn float_sint_uint_ext(
    kind: Option<crate::ScalarKind>,
    float_op: spirv::GlslStd450Op,
    sint_op: spirv::GlslStd450Op,
    uint_op: spirv::GlslStd450Op,
    message: &'static str,
) -> Result<spirv::GlslStd450Op, Error> {
    use crate::ScalarKind as Sk;
    match kind {
        Some(Sk::Float) => Ok(float_op),
        Some(Sk::Sint) => Ok(sint_op),
        Some(Sk::Uint) => Ok(uint_op),
        _ => Err(Error::Validation(message)),
    }
}

impl BlockContext<'_> {
    pub(super) fn write_math(
        &mut self,
        fun: crate::MathFunction,
        arg: Handle<crate::Expression>,
        [arg1, arg2, arg3]: [Option<Handle<crate::Expression>>; 3],
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        use crate::MathFunction as Mf;
        use crate::ScalarKind as Sk;

        let bfloat_dot = fun == Mf::Dot
            && self.fun_info[arg]
                .ty
                .inner_with(&self.ir_module.types)
                .scalar_kind()
                == Some(Sk::BFloat);
        if bfloat_dot {
            self.writer.require_any(
                "bfloat16 dot product",
                &[spirv::Capability::BFloat16DotProductKHR],
            )?;
        }

        let arg0_id = self.cached.get(arg)?;
        let arg_scalar_kind = self.fun_info[arg]
            .ty
            .inner_with(&self.ir_module.types)
            .scalar_kind();
        let arg1_id = match arg1 {
            Some(handle) => self.cached.get(handle)?,
            None => 0,
        };
        let arg2_id = match arg2 {
            Some(handle) => self.cached.get(handle)?,
            None => 0,
        };
        let arg3_id = match arg3 {
            Some(handle) => self.cached.get(handle)?,
            None => 0,
        };

        let id = self.gen_id();
        let ids = MathIds {
            id,
            result_type_id,
            arg0_id,
            arg1_id,
            arg2_id,
        };

        let math_op = match fun {
            Mf::Abs => match arg_scalar_kind {
                Some(Sk::Float) => MathOp::Ext(spirv::GlslStd450Op::FAbs),
                Some(Sk::Sint) => MathOp::Ext(spirv::GlslStd450Op::SAbs),
                Some(Sk::Uint) => MathOp::Custom(Instruction::unary(
                    spirv::Op::CopyObject,
                    result_type_id,
                    id,
                    arg0_id,
                )),
                _ => return Err(Error::Validation("abs of a non-numeric value")),
            },
            Mf::Min => MathOp::Ext(float_sint_uint_ext(
                arg_scalar_kind,
                spirv::GlslStd450Op::FMin,
                spirv::GlslStd450Op::SMin,
                spirv::GlslStd450Op::UMin,
                "min of a non-numeric value",
            )?),
            Mf::Max => MathOp::Ext(float_sint_uint_ext(
                arg_scalar_kind,
                spirv::GlslStd450Op::FMax,
                spirv::GlslStd450Op::SMax,
                spirv::GlslStd450Op::UMax,
                "max of a non-numeric value",
            )?),
            Mf::Clamp => MathOp::Ext(float_sint_uint_ext(
                arg_scalar_kind,
                spirv::GlslStd450Op::FClamp,
                spirv::GlslStd450Op::SClamp,
                spirv::GlslStd450Op::UClamp,
                "clamp of a non-numeric value",
            )?),
            Mf::IntelCountLeadingZeros
            | Mf::IntelCountTrailingZeros
            | Mf::AbsoluteDifference
            | Mf::AddSaturate
            | Mf::SubtractSaturate
            | Mf::Average
            | Mf::AverageRounded
            | Mf::Multiply32x16 => self.write_intel_integer_math(fun, arg_scalar_kind, &ids)?,
            Mf::CubeFaceIndex | Mf::CubeFaceCoord => {
                self.write_amd_cube_face(fun == Mf::CubeFaceIndex, &ids)
            }
            Mf::Min3 | Mf::Max3 | Mf::Mid3 => {
                self.write_trinary_minmax(fun, arg_scalar_kind, &ids)?
            }
            Mf::Sin => MathOp::Ext(spirv::GlslStd450Op::Sin),
            Mf::Sinh => MathOp::Ext(spirv::GlslStd450Op::Sinh),
            Mf::Asin => MathOp::Ext(spirv::GlslStd450Op::Asin),
            Mf::Cos => MathOp::Ext(spirv::GlslStd450Op::Cos),
            Mf::Cosh => MathOp::Ext(spirv::GlslStd450Op::Cosh),
            Mf::Acos => MathOp::Ext(spirv::GlslStd450Op::Acos),
            Mf::Tan => MathOp::Ext(spirv::GlslStd450Op::Tan),
            Mf::Tanh => MathOp::Ext(spirv::GlslStd450Op::Tanh),
            Mf::Atan => MathOp::Ext(spirv::GlslStd450Op::Atan),
            Mf::Atan2 => MathOp::Ext(spirv::GlslStd450Op::Atan2),
            Mf::Asinh => MathOp::Ext(spirv::GlslStd450Op::Asinh),
            Mf::Acosh => MathOp::Ext(spirv::GlslStd450Op::Acosh),
            Mf::Atanh => MathOp::Ext(spirv::GlslStd450Op::Atanh),
            Mf::Radians => MathOp::Ext(spirv::GlslStd450Op::Radians),
            Mf::Degrees => MathOp::Ext(spirv::GlslStd450Op::Degrees),
            Mf::Ceil => MathOp::Ext(spirv::GlslStd450Op::Ceil),
            Mf::Round => MathOp::Ext(spirv::GlslStd450Op::Round),
            Mf::RoundEven => MathOp::Ext(spirv::GlslStd450Op::RoundEven),
            Mf::Floor => MathOp::Ext(spirv::GlslStd450Op::Floor),
            Mf::Fract => MathOp::Ext(spirv::GlslStd450Op::Fract),
            Mf::Trunc => MathOp::Ext(spirv::GlslStd450Op::Trunc),
            Mf::Modf => MathOp::Ext(spirv::GlslStd450Op::ModfStruct),
            Mf::Frexp => MathOp::Ext(spirv::GlslStd450Op::FrexpStruct),
            Mf::Ldexp => MathOp::Ext(spirv::GlslStd450Op::Ldexp),
            Mf::Dot => self.write_dot_math(arg, &ids, block)?,
            Mf::IntegerDot
            | Mf::IntegerDotAccSat
            | Mf::PackedIntegerDot4x8
            | Mf::PackedIntegerDot4x8AccSat => self.write_integer_dot(fun, arg, arg1, &ids)?,
            Mf::Dot4I8Packed | Mf::Dot4U8Packed => {
                self.write_packed_dot4x8(matches!(fun, Mf::Dot4I8Packed), &ids, block);
                MathOp::Emitted
            }
            Mf::Outer => MathOp::Custom(Instruction::binary(
                spirv::Op::OuterProduct,
                result_type_id,
                id,
                arg0_id,
                arg1_id,
            )),
            Mf::Cross => MathOp::Ext(spirv::GlslStd450Op::Cross),
            Mf::Distance => MathOp::Ext(spirv::GlslStd450Op::Distance),
            Mf::Length => MathOp::Ext(spirv::GlslStd450Op::Length),
            Mf::Normalize => MathOp::Ext(spirv::GlslStd450Op::Normalize),
            Mf::FaceForward => MathOp::Ext(spirv::GlslStd450Op::FaceForward),
            Mf::Reflect => MathOp::Ext(spirv::GlslStd450Op::Reflect),
            Mf::Refract => MathOp::Ext(spirv::GlslStd450Op::Refract),
            Mf::Exp => MathOp::Ext(spirv::GlslStd450Op::Exp),
            Mf::Exp2 => MathOp::Ext(spirv::GlslStd450Op::Exp2),
            Mf::Log => MathOp::Ext(spirv::GlslStd450Op::Log),
            Mf::Log2 => MathOp::Ext(spirv::GlslStd450Op::Log2),
            Mf::Pow => MathOp::Ext(spirv::GlslStd450Op::Pow),
            Mf::Sign => MathOp::Ext(match arg_scalar_kind {
                Some(Sk::Float) => spirv::GlslStd450Op::FSign,
                Some(Sk::Sint) => spirv::GlslStd450Op::SSign,
                _ => return Err(Error::Validation("sign of a non-signed value")),
            }),
            Mf::Fma => MathOp::Ext(spirv::GlslStd450Op::Fma),
            Mf::Mix => self.write_mix(arg, arg2, &ids, block)?,
            Mf::Step => MathOp::Ext(spirv::GlslStd450Op::Step),
            Mf::SmoothStep => MathOp::Ext(spirv::GlslStd450Op::SmoothStep),
            Mf::Sqrt => MathOp::Ext(spirv::GlslStd450Op::Sqrt),
            Mf::InverseSqrt => MathOp::Ext(spirv::GlslStd450Op::InverseSqrt),
            Mf::Inverse => MathOp::Ext(spirv::GlslStd450Op::MatrixInverse),
            Mf::Transpose => MathOp::Custom(Instruction::unary(
                spirv::Op::Transpose,
                result_type_id,
                id,
                arg0_id,
            )),
            Mf::Determinant => MathOp::Ext(spirv::GlslStd450Op::Determinant),
            Mf::ReverseBits
            | Mf::CountTrailingZeros
            | Mf::CountLeadingZeros
            | Mf::CountOneBits
            | Mf::ExtractBits
            | Mf::InsertBits
            | Mf::AddCarry
            | Mf::SubBorrow
            | Mf::MulExtended
            | Mf::FirstTrailingBit
            | Mf::FirstLeadingBit => {
                self.write_bit_math(fun, arg, arg_scalar_kind, &ids, arg3_id, block)?
            }
            Mf::Pack4x8unorm => MathOp::Ext(spirv::GlslStd450Op::PackUnorm4x8),
            Mf::Pack4x8snorm => MathOp::Ext(spirv::GlslStd450Op::PackSnorm4x8),
            Mf::Pack2x16float => MathOp::Ext(spirv::GlslStd450Op::PackHalf2x16),
            Mf::Pack2x16unorm => MathOp::Ext(spirv::GlslStd450Op::PackUnorm2x16),
            Mf::Pack2x16snorm => MathOp::Ext(spirv::GlslStd450Op::PackSnorm2x16),
            Mf::PackDouble2x32 => MathOp::Ext(spirv::GlslStd450Op::PackDouble2x32),
            Mf::Pack4xI8 | Mf::Pack4xU8 | Mf::Pack4xI8Clamp | Mf::Pack4xU8Clamp => self
                .write_pack4x8(
                    block,
                    &ids,
                    matches!(fun, Mf::Pack4xI8 | Mf::Pack4xI8Clamp),
                    matches!(fun, Mf::Pack4xI8Clamp | Mf::Pack4xU8Clamp),
                ),
            Mf::Unpack4x8unorm => MathOp::Ext(spirv::GlslStd450Op::UnpackUnorm4x8),
            Mf::Unpack4x8snorm => MathOp::Ext(spirv::GlslStd450Op::UnpackSnorm4x8),
            Mf::Unpack2x16float => MathOp::Ext(spirv::GlslStd450Op::UnpackHalf2x16),
            Mf::Unpack2x16unorm => MathOp::Ext(spirv::GlslStd450Op::UnpackUnorm2x16),
            Mf::Unpack2x16snorm => MathOp::Ext(spirv::GlslStd450Op::UnpackSnorm2x16),
            Mf::UnpackDouble2x32 => MathOp::Ext(spirv::GlslStd450Op::UnpackDouble2x32),
            Mf::Unpack4xI8 | Mf::Unpack4xU8 => {
                self.write_unpack4x8(block, &ids, matches!(fun, Mf::Unpack4xI8))
            }
        };

        match math_op {
            MathOp::Ext(op) => block.body.push(Instruction::ext_inst_gl_op(
                self.writer.gl450_ext_inst_id,
                op,
                result_type_id,
                id,
                &[arg0_id, arg1_id, arg2_id, arg3_id][..fun.argument_count()],
            )),
            MathOp::Custom(inst) => block.body.push(inst),
            MathOp::Emitted => {}
        }
        Ok(id)
    }

    fn write_intel_integer_math(
        &mut self,
        fun: crate::MathFunction,
        arg_scalar_kind: Option<crate::ScalarKind>,
        ids: &MathIds,
    ) -> Result<MathOp, Error> {
        let op = integer_functions2(fun, arg_scalar_kind)?;
        self.writer.require(&feature::INTEGER_FUNCTIONS_2)?;
        Ok(MathOp::Custom(if fun.argument_count() == 1 {
            Instruction::unary(op, ids.result_type_id, ids.id, ids.arg0_id)
        } else {
            Instruction::binary(op, ids.result_type_id, ids.id, ids.arg0_id, ids.arg1_id)
        }))
    }

    fn write_amd_cube_face(&mut self, is_index: bool, ids: &MathIds) -> MathOp {
        let op = if is_index {
            grammar::amd_gcn_shader::CubeFaceIndexAMD
        } else {
            grammar::amd_gcn_shader::CubeFaceCoordAMD
        };
        let set = self.writer.spirv_ext_import(feature::AMD_GCN_SHADER_SET);
        MathOp::Custom(Instruction::ext_inst(
            set,
            op,
            ids.result_type_id,
            ids.id,
            &[ids.arg0_id],
        ))
    }

    fn write_trinary_minmax(
        &mut self,
        fun: crate::MathFunction,
        arg_scalar_kind: Option<crate::ScalarKind>,
        ids: &MathIds,
    ) -> Result<MathOp, Error> {
        let op = trinary_minmax(fun, arg_scalar_kind)?;
        let set = self
            .writer
            .spirv_ext_import(feature::AMD_SHADER_TRINARY_MINMAX_SET);
        Ok(MathOp::Custom(Instruction::ext_inst(
            set,
            op,
            ids.result_type_id,
            ids.id,
            &[ids.arg0_id, ids.arg1_id, ids.arg2_id],
        )))
    }

    fn write_pack4x8(
        &mut self,
        block: &mut Block,
        ids: &MathIds,
        is_signed: bool,
        should_clamp: bool,
    ) -> MathOp {
        let last_instruction = if self.writer.require_all(&[spirv::Capability::Int8]).is_ok() {
            self.write_pack4x8_optimized(
                block,
                ids.result_type_id,
                ids.arg0_id,
                ids.id,
                is_signed,
                should_clamp,
            )
        } else {
            self.write_pack4x8_polyfill(
                block,
                ids.result_type_id,
                ids.arg0_id,
                ids.id,
                is_signed,
                should_clamp,
            )
        };
        MathOp::Custom(last_instruction)
    }

    fn write_unpack4x8(&mut self, block: &mut Block, ids: &MathIds, is_signed: bool) -> MathOp {
        let last_instruction = if self.writer.require_all(&[spirv::Capability::Int8]).is_ok() {
            self.write_unpack4x8_optimized(
                block,
                ids.result_type_id,
                ids.arg0_id,
                ids.id,
                is_signed,
            )
        } else {
            self.write_unpack4x8_polyfill(block, ids.result_type_id, ids.arg0_id, ids.id, is_signed)
        };
        MathOp::Custom(last_instruction)
    }

    fn write_bit_math(
        &mut self,
        fun: crate::MathFunction,
        arg: Handle<crate::Expression>,
        arg_scalar_kind: Option<crate::ScalarKind>,
        ids: &MathIds,
        arg3_id: Word,
        block: &mut Block,
    ) -> Result<MathOp, Error> {
        use crate::MathFunction as Mf;
        use crate::ScalarKind as Sk;
        Ok(match fun {
            Mf::ReverseBits => MathOp::Custom(Instruction::unary(
                spirv::Op::BitReverse,
                ids.result_type_id,
                ids.id,
                ids.arg0_id,
            )),
            Mf::CountTrailingZeros => self.write_count_trailing_zeros(arg, ids, block)?,
            Mf::CountLeadingZeros => self.write_count_leading_zeros(arg, ids, block)?,
            Mf::CountOneBits => MathOp::Custom(Instruction::unary(
                spirv::Op::BitCount,
                ids.result_type_id,
                ids.id,
                ids.arg0_id,
            )),
            Mf::ExtractBits => {
                let op = match arg_scalar_kind {
                    Some(Sk::Uint) => spirv::Op::BitFieldUExtract,
                    Some(Sk::Sint) => spirv::Op::BitFieldSExtract,
                    _ => {
                        return Err(Error::Validation("bitfieldExtract of a non-integer value"));
                    }
                };
                MathOp::Custom(Instruction::ternary(
                    op,
                    ids.result_type_id,
                    ids.id,
                    ids.arg0_id,
                    ids.arg1_id,
                    ids.arg2_id,
                ))
            }
            Mf::InsertBits => MathOp::Custom(Instruction::quaternary(
                spirv::Op::BitFieldInsert,
                ids.result_type_id,
                ids.id,
                ids.arg0_id,
                ids.arg1_id,
                ids.arg2_id,
                arg3_id,
            )),
            Mf::AddCarry => MathOp::Custom(Instruction::binary(
                spirv::Op::IAddCarry,
                ids.result_type_id,
                ids.id,
                ids.arg0_id,
                ids.arg1_id,
            )),
            Mf::SubBorrow => MathOp::Custom(Instruction::binary(
                spirv::Op::ISubBorrow,
                ids.result_type_id,
                ids.id,
                ids.arg0_id,
                ids.arg1_id,
            )),
            Mf::MulExtended => {
                let op = if arg_scalar_kind == Some(Sk::Sint) {
                    spirv::Op::SMulExtended
                } else {
                    spirv::Op::UMulExtended
                };
                MathOp::Custom(Instruction::binary(
                    op,
                    ids.result_type_id,
                    ids.id,
                    ids.arg0_id,
                    ids.arg1_id,
                ))
            }
            Mf::FirstTrailingBit => MathOp::Ext(spirv::GlslStd450Op::FindILsb),
            Mf::FirstLeadingBit => match arg_scalar_kind {
                Some(Sk::Uint) => MathOp::Ext(spirv::GlslStd450Op::FindUMsb),
                Some(Sk::Sint) => MathOp::Ext(spirv::GlslStd450Op::FindSMsb),
                _ => return Err(Error::Validation("firstLeadingBit argument")),
            },
            _ => return Err(Error::Validation("unexpected math function")),
        })
    }

    fn write_dot_math(
        &mut self,
        arg: Handle<crate::Expression>,
        ids: &MathIds,
        block: &mut Block,
    ) -> Result<MathOp, Error> {
        let result_type_id = ids.result_type_id;
        match *self.fun_info[arg].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Vector { size, scalar } => match scalar.kind {
                crate::ScalarKind::Float | crate::ScalarKind::BFloat => {
                    Ok(MathOp::Custom(Instruction::binary(
                        spirv::Op::Dot,
                        result_type_id,
                        ids.id,
                        ids.arg0_id,
                        ids.arg1_id,
                    )))
                }
                _ => {
                    self.write_dot_product(
                        ids.id,
                        result_type_id,
                        ids.arg0_id,
                        ids.arg1_id,
                        size as u32,
                        block,
                        |result_id, composite_id, index| {
                            Instruction::composite_extract(
                                result_type_id,
                                result_id,
                                composite_id,
                                &[index],
                            )
                        },
                    );
                    Ok(MathOp::Emitted)
                }
            },
            crate::TypeInner::LongVector { scalar, .. } => {
                if scalar.kind == crate::ScalarKind::Float {
                    Ok(MathOp::Custom(Instruction::binary(
                        spirv::Op::Dot,
                        result_type_id,
                        ids.id,
                        ids.arg0_id,
                        ids.arg1_id,
                    )))
                } else {
                    Err(Error::Validation("dot product of an invalid operand type"))
                }
            }
            _ => Err(Error::Validation("dot product of an invalid operand type")),
        }
    }

    fn write_integer_dot(
        &mut self,
        fun: crate::MathFunction,
        arg: Handle<crate::Expression>,
        arg1: Option<Handle<crate::Expression>>,
        ids: &MathIds,
    ) -> Result<MathOp, Error> {
        use crate::MathFunction as Mf;
        let packed = matches!(fun, Mf::PackedIntegerDot4x8 | Mf::PackedIntegerDot4x8AccSat);
        let accumulate = matches!(fun, Mf::IntegerDotAccSat | Mf::PackedIntegerDot4x8AccSat);
        let arg_ty = self.fun_info[arg].ty.inner_with(&self.ir_module.types);
        let right_ty = match arg1 {
            Some(handle) => self.fun_info[handle].ty.inner_with(&self.ir_module.types),
            None => return Err(Error::Validation("integer dot product operands")),
        };
        let (Some(left_scalar), Some(right_scalar)) = (arg_ty.scalar(), right_ty.scalar()) else {
            return Err(Error::Validation("integer dot product operands"));
        };
        let is_vec4_8bit = left_scalar.width == 1
            && matches!(
                *arg_ty,
                crate::TypeInner::Vector {
                    size: crate::VectorSize::Quad,
                    ..
                }
            );
        let feature = if packed {
            &feature::DOT_PRODUCT_INPUT_4X8_BIT_PACKED
        } else if is_vec4_8bit {
            &feature::DOT_PRODUCT_INPUT_4X8_BIT
        } else {
            &feature::DOT_PRODUCT_INPUT_ALL
        };
        self.writer.require(feature)?;
        let left_signed = left_scalar.kind == crate::ScalarKind::Sint;
        let right_signed = right_scalar.kind == crate::ScalarKind::Sint;
        let (op, first, second) = match (left_signed, right_signed, accumulate) {
            (false, false, false) => (spirv::Op::UDot, ids.arg0_id, ids.arg1_id),
            (false, false, true) => (spirv::Op::UDotAccSat, ids.arg0_id, ids.arg1_id),
            (true, true, false) => (spirv::Op::SDot, ids.arg0_id, ids.arg1_id),
            (true, true, true) => (spirv::Op::SDotAccSat, ids.arg0_id, ids.arg1_id),
            (true, false, false) => (spirv::Op::SUDot, ids.arg0_id, ids.arg1_id),
            (true, false, true) => (spirv::Op::SUDotAccSat, ids.arg0_id, ids.arg1_id),
            (false, true, false) => (spirv::Op::SUDot, ids.arg1_id, ids.arg0_id),
            (false, true, true) => (spirv::Op::SUDotAccSat, ids.arg1_id, ids.arg0_id),
        };
        let mut instruction = Instruction::binary(op, ids.result_type_id, ids.id, first, second);
        if accumulate {
            instruction.add_operand(ids.arg2_id);
        }
        if packed {
            instruction.add_operand(spirv::PackedVectorFormat::PackedVectorFormat4x8Bit as Word);
        }
        Ok(MathOp::Custom(instruction))
    }

    fn write_packed_dot4x8(&mut self, signed: bool, ids: &MathIds, block: &mut Block) {
        let result_type_id = ids.result_type_id;
        if self
            .writer
            .try_require(&feature::DOT_PRODUCT_INPUT_4X8_BIT_PACKED)
        {
            let op = if signed {
                spirv::Op::SDot
            } else {
                spirv::Op::UDot
            };
            block.body.push(Instruction::ternary(
                op,
                result_type_id,
                ids.id,
                ids.arg0_id,
                ids.arg1_id,
                spirv::PackedVectorFormat::PackedVectorFormat4x8Bit as Word,
            ));
            return;
        }

        let (extract_op, arg0_id, arg1_id) = if signed {
            let new_arg0_id = self.gen_id();
            block.body.push(Instruction::unary(
                spirv::Op::Bitcast,
                result_type_id,
                new_arg0_id,
                ids.arg0_id,
            ));

            let new_arg1_id = self.gen_id();
            block.body.push(Instruction::unary(
                spirv::Op::Bitcast,
                result_type_id,
                new_arg1_id,
                ids.arg1_id,
            ));

            (spirv::Op::BitFieldSExtract, new_arg0_id, new_arg1_id)
        } else {
            (spirv::Op::BitFieldUExtract, ids.arg0_id, ids.arg1_id)
        };

        let eight = self.writer.get_constant_scalar(crate::Literal::U32(8));

        const VEC_LENGTH: u8 = 4;
        let bit_shifts: [_; VEC_LENGTH as usize] = core::array::from_fn(|index| {
            self.writer
                .get_constant_scalar(crate::Literal::U32(index as u32 * 8))
        });

        self.write_dot_product(
            ids.id,
            result_type_id,
            arg0_id,
            arg1_id,
            VEC_LENGTH as Word,
            block,
            |result_id, composite_id, index| {
                Instruction::ternary(
                    extract_op,
                    result_type_id,
                    result_id,
                    composite_id,
                    bit_shifts[index as usize],
                    eight,
                )
            },
        );
    }

    fn write_mix(
        &mut self,
        arg: Handle<crate::Expression>,
        arg2: Option<Handle<crate::Expression>>,
        ids: &MathIds,
        block: &mut Block,
    ) -> Result<MathOp, Error> {
        let Some(selector) = arg2 else {
            return Err(Error::Validation("mix has no selector"));
        };
        let arg_ty = self.fun_info[arg].ty.inner_with(&self.ir_module.types);
        let selector_ty = self.fun_info[selector].ty.inner_with(&self.ir_module.types);
        if let (&crate::TypeInner::Vector { size, .. }, &crate::TypeInner::Scalar(scalar)) =
            (arg_ty, selector_ty)
        {
            let selector_type_id = self.get_numeric_type_id(NumericType::Vector { size, scalar });
            self.temp_list.clear();
            self.temp_list.resize(size as usize, ids.arg2_id);

            let selector_id = self.gen_id();
            block.body.push(Instruction::composite_construct(
                selector_type_id,
                selector_id,
                &self.temp_list,
            ));

            Ok(MathOp::Custom(Instruction::ext_inst_gl_op(
                self.writer.gl450_ext_inst_id,
                spirv::GlslStd450Op::FMix,
                ids.result_type_id,
                ids.id,
                &[ids.arg0_id, ids.arg1_id, selector_id],
            )))
        } else {
            Ok(MathOp::Ext(spirv::GlslStd450Op::FMix))
        }
    }

    fn write_count_trailing_zeros(
        &mut self,
        arg: Handle<crate::Expression>,
        ids: &MathIds,
        block: &mut Block,
    ) -> Result<MathOp, Error> {
        let uint_id = match *self.fun_info[arg].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Vector { size, scalar } => {
                let ty = LocalType::Numeric(NumericType::Vector { size, scalar }).into();

                self.temp_list.clear();
                self.temp_list.resize(
                    size as _,
                    self.writer
                        .get_constant_scalar_with(scalar.width * 8, scalar)?,
                );

                self.writer.get_constant_composite(ty, &self.temp_list)?
            }
            crate::TypeInner::Scalar(scalar) => self
                .writer
                .get_constant_scalar_with(scalar.width * 8, scalar)?,
            _ => {
                return Err(Error::Validation(
                    "countTrailingZeros of a non-integer value",
                ));
            }
        };

        let lsb_id = self.gen_id();
        block.body.push(Instruction::ext_inst_gl_op(
            self.writer.gl450_ext_inst_id,
            spirv::GlslStd450Op::FindILsb,
            ids.result_type_id,
            lsb_id,
            &[ids.arg0_id],
        ));

        Ok(MathOp::Custom(Instruction::ext_inst_gl_op(
            self.writer.gl450_ext_inst_id,
            spirv::GlslStd450Op::UMin,
            ids.result_type_id,
            ids.id,
            &[uint_id, lsb_id],
        )))
    }

    fn write_count_leading_zeros(
        &mut self,
        arg: Handle<crate::Expression>,
        ids: &MathIds,
        block: &mut Block,
    ) -> Result<MathOp, Error> {
        let (int_type_id, int_id, width) =
            match *self.fun_info[arg].ty.inner_with(&self.ir_module.types) {
                crate::TypeInner::Vector { size, scalar } => {
                    let ty = LocalType::Numeric(NumericType::Vector { size, scalar }).into();

                    self.temp_list.clear();
                    self.temp_list.resize(
                        size as _,
                        self.writer
                            .get_constant_scalar_with(scalar.width * 8 - 1, scalar)?,
                    );

                    (
                        self.get_type_id(ty)?,
                        self.writer.get_constant_composite(ty, &self.temp_list)?,
                        scalar.width,
                    )
                }
                crate::TypeInner::Scalar(scalar) => (
                    self.get_numeric_type_id(NumericType::Scalar(scalar)),
                    self.writer
                        .get_constant_scalar_with(scalar.width * 8 - 1, scalar)?,
                    scalar.width,
                ),
                _ => {
                    return Err(Error::Validation(
                        "countLeadingZeros of a non-integer value",
                    ));
                }
            };

        if width != 4 {
            return Err(Error::FeatureNotImplemented(
                "countLeadingZeros of a non-32-bit integer",
            ));
        }

        let msb_id = self.gen_id();
        block.body.push(Instruction::ext_inst_gl_op(
            self.writer.gl450_ext_inst_id,
            spirv::GlslStd450Op::FindUMsb,
            int_type_id,
            msb_id,
            &[ids.arg0_id],
        ));

        Ok(MathOp::Custom(Instruction::binary(
            spirv::Op::ISub,
            ids.result_type_id,
            ids.id,
            int_id,
            msb_id,
        )))
    }

    #[expect(clippy::too_many_arguments)]
    fn write_dot_product(
        &mut self,
        result_id: Word,
        result_type_id: Word,
        arg0_id: Word,
        arg1_id: Word,
        size: u32,
        block: &mut Block,
        extractor: impl Fn(Word, Word, Word) -> Instruction,
    ) {
        let mut partial_sum = self.writer.get_constant_null(result_type_id);
        let last_component = size - 1;
        for index in 0..=last_component {
            let a_id = self.gen_id();
            block.body.push(extractor(a_id, arg0_id, index));
            let b_id = self.gen_id();
            block.body.push(extractor(b_id, arg1_id, index));
            let prod_id = self.gen_id();
            block.body.push(Instruction::binary(
                spirv::Op::IMul,
                result_type_id,
                prod_id,
                a_id,
                b_id,
            ));

            let id = if index == last_component {
                result_id
            } else {
                self.gen_id()
            };

            block.body.push(Instruction::binary(
                spirv::Op::IAdd,
                result_type_id,
                id,
                partial_sum,
                prod_id,
            ));
            partial_sum = id;
        }
    }

    fn write_pack4x8_optimized(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
        should_clamp: bool,
    ) -> Instruction {
        let int_type = if is_signed {
            crate::ScalarKind::Sint
        } else {
            crate::ScalarKind::Uint
        };
        let wide_vector_type = NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar {
                kind: int_type,
                width: 4,
            },
        };
        let wide_vector_type_id = self.get_numeric_type_id(wide_vector_type);
        let packed_vector_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar {
                kind: crate::ScalarKind::Uint,
                width: 1,
            },
        });

        let mut wide_vector = arg0_id;
        if should_clamp {
            let (min, max, clamp_op) = if is_signed {
                (
                    crate::Literal::I32(-128),
                    crate::Literal::I32(127),
                    spirv::GlslStd450Op::SClamp,
                )
            } else {
                (
                    crate::Literal::U32(0),
                    crate::Literal::U32(255),
                    spirv::GlslStd450Op::UClamp,
                )
            };
            let [min, max] = [min, max].map(|lit| {
                let scalar = self.writer.get_constant_scalar(lit);
                self.writer.get_local_constant_composite(
                    LocalType::Numeric(wide_vector_type),
                    &[scalar; 4],
                )
            });

            let clamp_id = self.gen_id();
            block.body.push(Instruction::ext_inst_gl_op(
                self.writer.gl450_ext_inst_id,
                clamp_op,
                wide_vector_type_id,
                clamp_id,
                &[wide_vector, min, max],
            ));

            wide_vector = clamp_id;
        }

        let packed_vector = self.gen_id();
        block.body.push(Instruction::unary(
            spirv::Op::UConvert,
            packed_vector_type_id,
            packed_vector,
            wide_vector,
        ));

        Instruction::unary(spirv::Op::Bitcast, result_type_id, id, packed_vector)
    }

    fn write_pack4x8_polyfill(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
        should_clamp: bool,
    ) -> Instruction {
        let int_type = if is_signed {
            crate::ScalarKind::Sint
        } else {
            crate::ScalarKind::Uint
        };
        let uint_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::U32));
        let int_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar {
            kind: int_type,
            width: 4,
        }));

        let mut last_instruction = Instruction::new(spirv::Op::Nop);

        let zero = self.writer.get_constant_scalar(crate::Literal::U32(0));
        let mut preresult = zero;
        block
            .body
            .reserve(usize::from(VEC_LENGTH) * (2 + usize::from(is_signed)));

        let eight = self.writer.get_constant_scalar(crate::Literal::U32(8));
        const VEC_LENGTH: u8 = 4;
        for i in 0..u32::from(VEC_LENGTH) {
            let offset = self.writer.get_constant_scalar(crate::Literal::U32(i * 8));
            let mut extracted = self.gen_id();
            block.body.push(Instruction::binary(
                spirv::Op::CompositeExtract,
                int_type_id,
                extracted,
                arg0_id,
                i,
            ));
            if is_signed {
                let casted = self.gen_id();
                block.body.push(Instruction::unary(
                    spirv::Op::Bitcast,
                    uint_type_id,
                    casted,
                    extracted,
                ));
                extracted = casted;
            }
            if should_clamp {
                let (min, max, clamp_op) = if is_signed {
                    (
                        crate::Literal::I32(-128),
                        crate::Literal::I32(127),
                        spirv::GlslStd450Op::SClamp,
                    )
                } else {
                    (
                        crate::Literal::U32(0),
                        crate::Literal::U32(255),
                        spirv::GlslStd450Op::UClamp,
                    )
                };
                let [min, max] = [min, max].map(|lit| self.writer.get_constant_scalar(lit));

                let clamp_id = self.gen_id();
                block.body.push(Instruction::ext_inst_gl_op(
                    self.writer.gl450_ext_inst_id,
                    clamp_op,
                    result_type_id,
                    clamp_id,
                    &[extracted, min, max],
                ));

                extracted = clamp_id;
            }
            let is_last = i == u32::from(VEC_LENGTH - 1);
            if is_last {
                last_instruction = Instruction::quaternary(
                    spirv::Op::BitFieldInsert,
                    result_type_id,
                    id,
                    preresult,
                    extracted,
                    offset,
                    eight,
                );
            } else {
                let new_preresult = self.gen_id();
                block.body.push(Instruction::quaternary(
                    spirv::Op::BitFieldInsert,
                    result_type_id,
                    new_preresult,
                    preresult,
                    extracted,
                    offset,
                    eight,
                ));
                preresult = new_preresult;
            }
        }
        last_instruction
    }

    fn write_unpack4x8_optimized(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
    ) -> Instruction {
        let (int_type, convert_op) = if is_signed {
            (crate::ScalarKind::Sint, spirv::Op::SConvert)
        } else {
            (crate::ScalarKind::Uint, spirv::Op::UConvert)
        };

        let packed_vector_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar {
                kind: int_type,
                width: 1,
            },
        });

        let packed_vector = self.gen_id();
        block.body.push(Instruction::unary(
            spirv::Op::Bitcast,
            packed_vector_type_id,
            packed_vector,
            arg0_id,
        ));

        Instruction::unary(convert_op, result_type_id, id, packed_vector)
    }

    fn write_unpack4x8_polyfill(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
    ) -> Instruction {
        let (int_type, extract_op) = if is_signed {
            (crate::ScalarKind::Sint, spirv::Op::BitFieldSExtract)
        } else {
            (crate::ScalarKind::Uint, spirv::Op::BitFieldUExtract)
        };

        let sint_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::I32));

        let eight = self.writer.get_constant_scalar(crate::Literal::U32(8));
        let int_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar {
            kind: int_type,
            width: 4,
        }));
        block
            .body
            .reserve(usize::from(VEC_LENGTH) * 2 + usize::from(is_signed));
        let arg_id = if is_signed {
            let new_arg_id = self.gen_id();
            block.body.push(Instruction::unary(
                spirv::Op::Bitcast,
                sint_type_id,
                new_arg_id,
                arg0_id,
            ));
            new_arg_id
        } else {
            arg0_id
        };

        const VEC_LENGTH: u8 = 4;
        let parts: [_; VEC_LENGTH as usize] = core::array::from_fn(|_| self.gen_id());
        for (i, part_id) in parts.into_iter().enumerate() {
            let index = self
                .writer
                .get_constant_scalar(crate::Literal::U32(i as u32 * 8));
            block.body.push(Instruction::ternary(
                extract_op,
                int_type_id,
                part_id,
                arg_id,
                index,
                eight,
            ));
        }

        Instruction::composite_construct(result_type_id, id, &parts)
    }
}
