use arrayvec::ArrayVec;
use spirv::Word;

use super::super::{
    Block, BlockContext, Dimension, Error, Instruction, LocalType, NumericType, feature, grammar,
};
use super::AccessTypeAdjustment;
use crate::arena::Handle;

const fn get_dimension(type_inner: &crate::TypeInner) -> Result<Dimension, Error> {
    match *type_inner {
        crate::TypeInner::Scalar(_) => Ok(Dimension::Scalar),
        crate::TypeInner::Vector { .. } | crate::TypeInner::LongVector { .. } => {
            Ok(Dimension::Vector)
        }
        crate::TypeInner::Matrix { .. } => Ok(Dimension::Matrix),
        crate::TypeInner::CooperativeMatrix { .. } => Ok(Dimension::CooperativeMatrix),
        _ => Err(Error::Validation(
            "binary operand is not a scalar, vector or matrix",
        )),
    }
}

const fn binary_scalar_op(
    op: crate::BinaryOperator,
    kind: Option<crate::ScalarKind>,
) -> Result<spirv::Op, Error> {
    use crate::BinaryOperator as Bo;
    use crate::ScalarKind as Sk;
    let invalid = Err(Error::Validation(
        "invalid operand type for a binary operator",
    ));
    Ok(match op {
        Bo::Divide => match kind {
            Some(Sk::Sint) => spirv::Op::SDiv,
            Some(Sk::Uint) => spirv::Op::UDiv,
            Some(Sk::Float) => spirv::Op::FDiv,
            _ => return invalid,
        },
        Bo::Modulo => match kind {
            Some(Sk::Float) => spirv::Op::FMod,
            Some(Sk::Sint) => spirv::Op::SMod,
            Some(Sk::Uint) => spirv::Op::UMod,
            _ => return invalid,
        },
        Bo::Equal => match kind {
            Some(Sk::Sint | Sk::Uint) => spirv::Op::IEqual,
            Some(Sk::Float) => spirv::Op::FOrdEqual,
            Some(Sk::Bool) => spirv::Op::LogicalEqual,
            _ => return invalid,
        },
        Bo::NotEqual => match kind {
            Some(Sk::Sint | Sk::Uint) => spirv::Op::INotEqual,
            Some(Sk::Float) => spirv::Op::FUnordNotEqual,
            Some(Sk::Bool) => spirv::Op::LogicalNotEqual,
            _ => return invalid,
        },
        Bo::Less => match kind {
            Some(Sk::Sint) => spirv::Op::SLessThan,
            Some(Sk::Uint) => spirv::Op::ULessThan,
            Some(Sk::Float) => spirv::Op::FOrdLessThan,
            _ => return invalid,
        },
        Bo::LessEqual => match kind {
            Some(Sk::Sint) => spirv::Op::SLessThanEqual,
            Some(Sk::Uint) => spirv::Op::ULessThanEqual,
            Some(Sk::Float) => spirv::Op::FOrdLessThanEqual,
            _ => return invalid,
        },
        Bo::Greater => match kind {
            Some(Sk::Sint) => spirv::Op::SGreaterThan,
            Some(Sk::Uint) => spirv::Op::UGreaterThan,
            Some(Sk::Float) => spirv::Op::FOrdGreaterThan,
            _ => return invalid,
        },
        Bo::GreaterEqual => match kind {
            Some(Sk::Sint) => spirv::Op::SGreaterThanEqual,
            Some(Sk::Uint) => spirv::Op::UGreaterThanEqual,
            Some(Sk::Float) => spirv::Op::FOrdGreaterThanEqual,
            _ => return invalid,
        },
        Bo::And => match kind {
            Some(Sk::Bool) => spirv::Op::LogicalAnd,
            _ => spirv::Op::BitwiseAnd,
        },
        Bo::ExclusiveOr => spirv::Op::BitwiseXor,
        Bo::InclusiveOr => match kind {
            Some(Sk::Bool) => spirv::Op::LogicalOr,
            _ => spirv::Op::BitwiseOr,
        },
        Bo::LogicalAnd => spirv::Op::LogicalAnd,
        Bo::LogicalOr => spirv::Op::LogicalOr,
        Bo::ShiftLeft => spirv::Op::ShiftLeftLogical,
        Bo::ShiftRight => match kind {
            Some(Sk::Sint) => spirv::Op::ShiftRightArithmetic,
            Some(Sk::Uint) => spirv::Op::ShiftRightLogical,
            _ => return invalid,
        },
        Bo::Add | Bo::Subtract | Bo::Multiply => return invalid,
    })
}

const NON_FINITE_SEARCH: usize = 64;

const fn per_component(op: spirv::Op) -> bool {
    matches!(
        op,
        spirv::Op::FAdd | spirv::Op::FSub | spirv::Op::FMul | spirv::Op::FDiv | spirv::Op::FMod
    )
}

struct BinaryOperands {
    id: Word,
    result_type_id: Word,
    left_id: Word,
    right_id: Word,
}

impl BlockContext<'_> {
    pub(super) fn write_swizzle(
        &mut self,
        size: crate::VectorSize,
        vector: Handle<crate::Expression>,
        pattern: [crate::SwizzleComponent; 4],
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let vector_id = self.cached.get(vector)?;
        self.temp_list.clear();
        for &sc in pattern[..size as usize].iter() {
            self.temp_list.push(sc as Word);
        }
        let id = self.gen_id();
        block.body.push(Instruction::vector_shuffle(
            result_type_id,
            id,
            vector_id,
            vector_id,
            &self.temp_list,
        ));
        Ok(id)
    }

    pub(super) fn write_unary(
        &mut self,
        op: crate::UnaryOperator,
        expr: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let id = self.gen_id();
        let expr_id = self.cached.get(expr)?;
        let expr_ty_inner = self.fun_info[expr].ty.inner_with(&self.ir_module.types);

        let spirv_op = match op {
            crate::UnaryOperator::Negate => match expr_ty_inner.scalar_kind() {
                Some(crate::ScalarKind::Float) => spirv::Op::FNegate,
                Some(crate::ScalarKind::Sint) => spirv::Op::SNegate,
                _ => return Err(Error::Validation("Unexpected kind for negation")),
            },
            crate::UnaryOperator::LogicalNot => spirv::Op::LogicalNot,
            crate::UnaryOperator::BitwiseNot => spirv::Op::Not,
        };

        block
            .body
            .push(Instruction::unary(spirv_op, result_type_id, id, expr_id));
        Ok(id)
    }

    fn write_add_sub(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        left: Handle<crate::Expression>,
        operands: &BinaryOperands,
        float_op: spirv::Op,
        int_op: spirv::Op,
        block: &mut Block,
    ) -> Result<Option<spirv::Op>, Error> {
        let left_ty_inner = self.fun_info[left]
            .ty
            .inner_with(&self.ir_module.types)
            .clone();
        match left_ty_inner {
            crate::TypeInner::Scalar(scalar)
            | crate::TypeInner::Vector { scalar, .. }
            | crate::TypeInner::LongVector { scalar, .. }
            | crate::TypeInner::CooperativeMatrix { scalar, .. } => Ok(Some(match scalar.kind {
                crate::ScalarKind::Float => float_op,
                _ => int_op,
            })),
            crate::TypeInner::Matrix {
                columns,
                rows,
                scalar,
            } => {
                self.write_matrix_matrix_column_op(
                    expr_handle,
                    block,
                    operands,
                    (columns, rows),
                    scalar.width,
                    float_op,
                )?;
                Ok(None)
            }
            _ => Err(Error::Validation(
                "invalid operand type for a binary operator",
            )),
        }
    }

    fn write_multiply(
        &mut self,
        left: Handle<crate::Expression>,
        right: Handle<crate::Expression>,
        (left_dimension, right_dimension): (Dimension, Dimension),
        operands: &BinaryOperands,
        block: &mut Block,
    ) -> Result<Option<(spirv::Op, bool)>, Error> {
        let mut reverse_operands = false;
        let op = match (left_dimension, right_dimension) {
            (Dimension::Scalar, Dimension::Vector) => {
                let right_ty_inner = self.fun_info[right]
                    .ty
                    .inner_with(&self.ir_module.types)
                    .clone();
                self.write_vector_scalar_mult(
                    block,
                    operands.id,
                    operands.result_type_id,
                    operands.right_id,
                    operands.left_id,
                    &right_ty_inner,
                )?;
                return Ok(None);
            }
            (Dimension::Vector, Dimension::Scalar) => {
                let left_ty_inner = self.fun_info[left]
                    .ty
                    .inner_with(&self.ir_module.types)
                    .clone();
                self.write_vector_scalar_mult(
                    block,
                    operands.id,
                    operands.result_type_id,
                    operands.left_id,
                    operands.right_id,
                    &left_ty_inner,
                )?;
                return Ok(None);
            }
            (Dimension::Vector, Dimension::Matrix) => spirv::Op::VectorTimesMatrix,
            (Dimension::Matrix | Dimension::CooperativeMatrix, Dimension::Scalar) => {
                spirv::Op::MatrixTimesScalar
            }
            (Dimension::Scalar, Dimension::Matrix | Dimension::CooperativeMatrix) => {
                reverse_operands = true;
                spirv::Op::MatrixTimesScalar
            }
            (Dimension::Matrix, Dimension::Vector) => spirv::Op::MatrixTimesVector,
            (Dimension::Matrix, Dimension::Matrix) => spirv::Op::MatrixTimesMatrix,
            (Dimension::Vector, Dimension::Vector)
            | (Dimension::Scalar, Dimension::Scalar)
            | (Dimension::CooperativeMatrix, Dimension::CooperativeMatrix) => {
                let left_kind = self.fun_info[left]
                    .ty
                    .inner_with(&self.ir_module.types)
                    .scalar_kind();
                if left_kind == Some(crate::ScalarKind::Float) {
                    spirv::Op::FMul
                } else {
                    spirv::Op::IMul
                }
            }
            _ => {
                return Err(Error::FeatureNotImplemented(
                    "component-wise multiplication of cooperative matrices",
                ));
            }
        };
        Ok(Some((op, reverse_operands)))
    }

    pub(super) fn write_binary(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        op: crate::BinaryOperator,
        left: Handle<crate::Expression>,
        right: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let id = self.gen_id();
        let left_id = self.cached.get(left)?;
        let right_id = self.cached.get(right)?;

        let left_ty_inner = self.fun_info[left].ty.inner_with(&self.ir_module.types);
        let right_ty_inner = self.fun_info[right].ty.inner_with(&self.ir_module.types);

        let left_dimension = get_dimension(left_ty_inner)?;
        let right_dimension = get_dimension(right_ty_inner)?;
        let left_scalar_kind = left_ty_inner.scalar_kind();
        let vector_pair = match (left_ty_inner, right_ty_inner) {
            (&crate::TypeInner::Vector { size, scalar }, &crate::TypeInner::Vector { .. }) => {
                Some((size, scalar))
            }
            _ => None,
        };

        let operands = BinaryOperands {
            id,
            result_type_id,
            left_id,
            right_id,
        };

        let emitted = match op {
            crate::BinaryOperator::Add => self
                .write_add_sub(
                    expr_handle,
                    left,
                    &operands,
                    spirv::Op::FAdd,
                    spirv::Op::IAdd,
                    block,
                )?
                .map(|spirv_op| (spirv_op, false)),
            crate::BinaryOperator::Subtract => self
                .write_add_sub(
                    expr_handle,
                    left,
                    &operands,
                    spirv::Op::FSub,
                    spirv::Op::ISub,
                    block,
                )?
                .map(|spirv_op| (spirv_op, false)),
            crate::BinaryOperator::Multiply => self.write_multiply(
                left,
                right,
                (left_dimension, right_dimension),
                &operands,
                block,
            )?,
            _ => Some((binary_scalar_op(op, left_scalar_kind)?, false)),
        };

        if let Some((spirv_op, false)) = emitted
            && per_component(spirv_op)
            && let Some(shape) = vector_pair
            && (self.non_finite_constant(left) || self.non_finite_constant(right))
        {
            self.write_per_component(expr_handle, spirv_op, &operands, shape, block)?;
        } else if let Some((spirv_op, reverse_operands)) = emitted {
            block.body.push(Instruction::binary(
                spirv_op,
                result_type_id,
                id,
                if reverse_operands { right_id } else { left_id },
                if reverse_operands { left_id } else { right_id },
            ));
        }

        Ok(id)
    }

    fn non_finite_constant(&self, handle: Handle<crate::Expression>) -> bool {
        if !self.expression_constness.is_const(handle) {
            return false;
        }
        let mut pending = alloc::vec![(handle, false)];
        let mut visited = 0;
        while let Some((handle, global)) = pending.pop() {
            visited += 1;
            if visited > NON_FINITE_SEARCH {
                return false;
            }
            let arena = if global {
                &self.ir_module.global_expressions
            } else {
                &self.ir_function.expressions
            };
            let Ok(expression) = arena.try_get(handle) else {
                continue;
            };
            match *expression {
                crate::Expression::Literal(literal) if literal.is_non_finite() => return true,
                crate::Expression::Constant(constant) => {
                    if let Ok(constant) = self.ir_module.constants.try_get(constant) {
                        pending.push((constant.init, true));
                    }
                }
                crate::Expression::Compose { ref components, .. } => {
                    pending.extend(components.iter().map(|&component| (component, global)));
                }
                crate::Expression::Splat { value, .. } => pending.push((value, global)),
                _ => {}
            }
        }
        false
    }

    fn write_per_component(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        op: spirv::Op,
        operands: &BinaryOperands,
        (size, scalar): (crate::VectorSize, crate::Scalar),
        block: &mut Block,
    ) -> Result<(), Error> {
        let precision = self
            .ir_function
            .precision
            .get(&expr_handle)
            .copied()
            .unwrap_or_default();
        let non_uniform = self
            .non_uniform(expr_handle)
            .contains(crate::NonUniform::VALUE);
        let scalar_type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let mut components = ArrayVec::<Word, 4>::new();
        for index in 0..size as u32 {
            let left = self.gen_id();
            let right = self.gen_id();
            let result = self.gen_id();
            block.body.push(Instruction::composite_extract(
                scalar_type_id,
                left,
                operands.left_id,
                &[index],
            ));
            block.body.push(Instruction::composite_extract(
                scalar_type_id,
                right,
                operands.right_id,
                &[index],
            ));
            block
                .body
                .push(Instruction::binary(op, scalar_type_id, result, left, right));
            self.writer.decorate_precision(result, precision);
            if non_uniform {
                self.writer.decorate_non_uniform(result)?;
            }
            components.push(result);
        }
        block.body.push(Instruction::composite_construct(
            operands.result_type_id,
            operands.id,
            &components,
        ));
        Ok(())
    }

    fn write_matrix_matrix_column_op(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
        operands: &BinaryOperands,
        (columns, rows): (crate::VectorSize, crate::VectorSize),
        width: u8,
        op: spirv::Op,
    ) -> Result<(), Error> {
        let &BinaryOperands {
            id: result_id,
            result_type_id,
            left_id,
            right_id,
        } = operands;
        self.temp_list.clear();
        let non_uniform = self
            .non_uniform(expr_handle)
            .contains(crate::NonUniform::VALUE);

        let vector_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: rows,
            scalar: crate::Scalar::float(width),
        });

        for index in 0..columns as u32 {
            let column_id_left = self.gen_id();
            let column_id_right = self.gen_id();
            let column_id_res = self.gen_id();

            block.body.push(Instruction::composite_extract(
                vector_type_id,
                column_id_left,
                left_id,
                &[index],
            ));
            block.body.push(Instruction::composite_extract(
                vector_type_id,
                column_id_right,
                right_id,
                &[index],
            ));
            block.body.push(Instruction::binary(
                op,
                vector_type_id,
                column_id_res,
                column_id_left,
                column_id_right,
            ));
            if non_uniform {
                self.writer.decorate_non_uniform(column_id_res)?;
            }

            self.temp_list.push(column_id_res);
        }

        block.body.push(Instruction::composite_construct(
            result_type_id,
            result_id,
            &self.temp_list,
        ));
        Ok(())
    }

    fn write_vector_scalar_mult(
        &mut self,
        block: &mut Block,
        result_id: Word,
        result_type_id: Word,
        vector_id: Word,
        scalar_id: Word,
        vector: &crate::TypeInner,
    ) -> Result<(), Error> {
        let (size, kind) = match *vector {
            crate::TypeInner::Vector {
                size,
                scalar: crate::Scalar { kind, .. },
            } => (size, kind),
            crate::TypeInner::LongVector { scalar, .. } => {
                if scalar.kind != crate::ScalarKind::Float {
                    return Err(Error::Validation(
                        "vector-scalar multiplication of a non-vector",
                    ));
                }
                block.body.push(Instruction::binary(
                    spirv::Op::VectorTimesScalar,
                    result_type_id,
                    result_id,
                    vector_id,
                    scalar_id,
                ));
                return Ok(());
            }
            _ => {
                return Err(Error::Validation(
                    "vector-scalar multiplication of a non-vector",
                ));
            }
        };

        let (op, operand_id) = match kind {
            crate::ScalarKind::Float => (spirv::Op::VectorTimesScalar, scalar_id),
            _ => {
                let operand_id = self.gen_id();
                self.temp_list.clear();
                self.temp_list.resize(size as usize, scalar_id);
                block.body.push(Instruction::composite_construct(
                    result_type_id,
                    operand_id,
                    &self.temp_list,
                ));
                (spirv::Op::IMul, operand_id)
            }
        };

        block.body.push(Instruction::binary(
            op,
            result_type_id,
            result_id,
            vector_id,
            operand_id,
        ));
        Ok(())
    }

    fn write_matrix_as(
        &mut self,
        expr_id: Word,
        (columns, rows, scalar): (crate::VectorSize, crate::VectorSize, crate::Scalar),
        convert: Option<u8>,
        kind: crate::ScalarKind,
        block: &mut Block,
        result_type_id: Word,
    ) -> Result<Word, Error> {
        let Some(convert) = convert else {
            return Ok(expr_id);
        };

        if convert == scalar.width {
            return Ok(expr_id);
        }

        if kind != crate::ScalarKind::Float {
            return Err(Error::Validation("Matrices must be floats"));
        }

        let column_src_ty = self.get_localtype_id(LocalType::Numeric(NumericType::Vector {
            size: rows,
            scalar,
        }));

        let column_dst_ty = self.get_localtype_id(LocalType::Numeric(NumericType::Vector {
            size: rows,
            scalar: crate::Scalar {
                kind,
                width: convert,
            },
        }));

        let mut components = ArrayVec::<Word, 4>::new();

        for column in 0..columns as usize {
            let column_id = self.gen_id();
            block.body.push(Instruction::composite_extract(
                column_src_ty,
                column_id,
                expr_id,
                &[column as u32],
            ));

            let column_conv_id = self.gen_id();
            block.body.push(Instruction::unary(
                spirv::Op::FConvert,
                column_dst_ty,
                column_conv_id,
                column_id,
            ));

            components.push(column_conv_id);
        }

        let construct_id = self.gen_id();

        block.body.push(Instruction::composite_construct(
            result_type_id,
            construct_id,
            &components,
        ));

        Ok(construct_id)
    }

    pub(super) fn write_as_expression(
        &mut self,
        expr: Handle<crate::Expression>,
        convert: Option<u8>,
        kind: crate::ScalarKind,
        block: &mut Block,
        result_type_id: u32,
    ) -> Result<u32, Error> {
        use crate::ScalarKind as Sk;
        let expr_id = self.cached.get(expr)?;
        let ty = self.fun_info[expr].ty.inner_with(&self.ir_module.types);

        let small = |kind: crate::ScalarKind| kind.is_encoded_float();
        if let crate::TypeInner::Scalar(scalar) | crate::TypeInner::Vector { scalar, .. } = *ty
            && (small(scalar.kind) || small(kind))
        {
            return self.write_cooperative_cast(
                expr,
                scalar,
                (kind, convert),
                block,
                result_type_id,
            );
        }
        if let crate::TypeInner::LongVector { scalar, .. }
        | crate::TypeInner::CooperativeMatrix { scalar, .. } = *ty
        {
            return self.write_cooperative_cast(
                expr,
                scalar,
                (kind, convert),
                block,
                result_type_id,
            );
        }

        if let crate::TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } = *ty
        {
            return self.write_matrix_as(
                expr_id,
                (columns, rows, scalar),
                convert,
                kind,
                block,
                result_type_id,
            );
        }

        let (src_scalar, src_size) = match *ty {
            crate::TypeInner::Scalar(scalar) => (scalar, None),
            crate::TypeInner::Vector { scalar, size } => (scalar, Some(size)),
            ref other => {
                log::error!("As source {other:?}");
                return Err(Error::Validation("Unexpected Expression::As source"));
            }
        };

        enum Cast {
            Identity(Word),
            Unary(spirv::Op, Word),
            Binary(spirv::Op, Word, Word),
            Ternary(spirv::Op, Word, Word, Word),
            Resized(spirv::Op, Word, Word),
        }
        let cast = match (src_scalar.kind, kind, convert) {
            (src_kind, kind, convert)
                if src_kind == kind
                    && convert.filter(|&width| width != src_scalar.width).is_none() =>
            {
                Cast::Identity(expr_id)
            }
            (Sk::Bool, Sk::Bool, _) => Cast::Unary(spirv::Op::CopyObject, expr_id),
            (_, _, None) => Cast::Unary(spirv::Op::Bitcast, expr_id),
            (_, Sk::Bool, Some(_)) => {
                let op = match src_scalar.kind {
                    Sk::Sint | Sk::Uint => spirv::Op::INotEqual,
                    Sk::Float => spirv::Op::FUnordNotEqual,
                    _ => {
                        return Err(Error::Validation(
                            "conversion to bool from a non-numeric value",
                        ));
                    }
                };
                let zero_scalar_id = self.writer.get_constant_scalar_with(0, src_scalar)?;
                let zero_id = match src_size {
                    Some(size) => {
                        let ty = LocalType::Numeric(NumericType::Vector {
                            size,
                            scalar: src_scalar,
                        })
                        .into();

                        self.temp_list.clear();
                        self.temp_list.resize(size as _, zero_scalar_id);

                        self.writer.get_constant_composite(ty, &self.temp_list)?
                    }
                    None => zero_scalar_id,
                };

                Cast::Binary(op, expr_id, zero_id)
            }
            (Sk::Bool, _, Some(dst_width)) => {
                let dst_scalar = crate::Scalar {
                    kind,
                    width: dst_width,
                };
                let zero_scalar_id = self.writer.get_constant_scalar_with(0, dst_scalar)?;
                let one_scalar_id = self.writer.get_constant_scalar_with(1, dst_scalar)?;
                let (accept_id, reject_id) = match src_size {
                    Some(size) => {
                        let ty = LocalType::Numeric(NumericType::Vector {
                            size,
                            scalar: dst_scalar,
                        })
                        .into();

                        self.temp_list.clear();
                        self.temp_list.resize(size as _, zero_scalar_id);

                        let vec0_id = self.writer.get_constant_composite(ty, &self.temp_list)?;

                        self.temp_list.fill(one_scalar_id);

                        let vec1_id = self.writer.get_constant_composite(ty, &self.temp_list)?;

                        (vec1_id, vec0_id)
                    }
                    None => (one_scalar_id, zero_scalar_id),
                };

                Cast::Ternary(spirv::Op::Select, expr_id, accept_id, reject_id)
            }
            (Sk::Float, Sk::Sint, Some(_)) => Cast::Unary(spirv::Op::ConvertFToS, expr_id),
            (Sk::Float, Sk::Uint, Some(_)) => Cast::Unary(spirv::Op::ConvertFToU, expr_id),
            (Sk::Float, Sk::Float, Some(dst_width)) if src_scalar.width != dst_width => {
                Cast::Unary(spirv::Op::FConvert, expr_id)
            }
            (Sk::Sint, Sk::Float, Some(_)) => Cast::Unary(spirv::Op::ConvertSToF, expr_id),
            (Sk::Sint, Sk::Sint, Some(dst_width)) if src_scalar.width != dst_width => {
                Cast::Unary(spirv::Op::SConvert, expr_id)
            }
            (Sk::Uint, Sk::Float, Some(_)) => Cast::Unary(spirv::Op::ConvertUToF, expr_id),
            (Sk::Uint, Sk::Uint, Some(dst_width)) if src_scalar.width != dst_width => {
                Cast::Unary(spirv::Op::UConvert, expr_id)
            }
            (Sk::Uint, Sk::Sint, Some(dst_width)) | (Sk::Sint, Sk::Uint, Some(dst_width))
                if src_scalar.width != dst_width =>
            {
                let op = if src_scalar.kind == Sk::Sint {
                    spirv::Op::SConvert
                } else {
                    spirv::Op::UConvert
                };
                let scalar = crate::Scalar {
                    kind: src_scalar.kind,
                    width: dst_width,
                };
                let resized = match src_size {
                    Some(size) => NumericType::Vector { size, scalar },
                    None => NumericType::Scalar(scalar),
                };
                Cast::Resized(op, self.writer.get_numeric_type_id(resized), expr_id)
            }
            _ => Cast::Unary(spirv::Op::Bitcast, expr_id),
        };
        Ok(match cast {
            Cast::Identity(expr) => expr,
            Cast::Unary(op, op1) => {
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::unary(op, result_type_id, id, op1));
                id
            }
            Cast::Binary(op, op1, op2) => {
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::binary(op, result_type_id, id, op1, op2));
                id
            }
            Cast::Ternary(op, op1, op2, op3) => {
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::ternary(op, result_type_id, id, op1, op2, op3));
                id
            }
            Cast::Resized(op, resized_type_id, op1) => {
                let resized_id = self.gen_id();
                block
                    .body
                    .push(Instruction::unary(op, resized_type_id, resized_id, op1));
                let id = self.gen_id();
                block.body.push(Instruction::unary(
                    spirv::Op::Bitcast,
                    result_type_id,
                    id,
                    resized_id,
                ));
                id
            }
        })
    }

    pub(super) fn write_select(
        &mut self,
        condition: Handle<crate::Expression>,
        accept: Handle<crate::Expression>,
        reject: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let id = self.gen_id();
        let mut condition_id = self.cached.get(condition)?;
        let accept_id = self.cached.get(accept)?;
        let reject_id = self.cached.get(reject)?;

        let condition_ty = self.fun_info[condition]
            .ty
            .inner_with(&self.ir_module.types);
        let object_ty = self.fun_info[accept].ty.inner_with(&self.ir_module.types);

        if let (
            &crate::TypeInner::Scalar(
                condition_scalar @ crate::Scalar {
                    kind: crate::ScalarKind::Bool,
                    ..
                },
            ),
            &crate::TypeInner::Vector { size, .. },
            true,
        ) = (condition_ty, object_ty, self.writer.lang_version() < (1, 4))
        {
            self.temp_list.clear();
            self.temp_list.resize(size as usize, condition_id);

            let bool_vector_type_id = self.get_numeric_type_id(NumericType::Vector {
                size,
                scalar: condition_scalar,
            });

            let id = self.gen_id();
            block.body.push(Instruction::composite_construct(
                bool_vector_type_id,
                id,
                &self.temp_list,
            ));
            condition_id = id;
        }

        let instruction =
            Instruction::select(result_type_id, id, condition_id, accept_id, reject_id);
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_derivative(
        &mut self,
        axis: crate::DerivativeAxis,
        ctrl: crate::DerivativeControl,
        expr: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        use crate::{DerivativeAxis as Axis, DerivativeControl as Ctrl};
        match ctrl {
            Ctrl::Coarse | Ctrl::Fine => {
                self.writer
                    .require_any("DerivativeControl", &[spirv::Capability::DerivativeControl])?;
            }
            Ctrl::None => {}
        }
        if self.is_half(expr) {
            self.writer.use_feature(&feature::AMD_GPU_SHADER_HALF_FLOAT);
        }
        let id = self.gen_id();
        let expr_id = self.cached.get(expr)?;
        let op = match (axis, ctrl) {
            (Axis::X, Ctrl::Coarse) => spirv::Op::DPdxCoarse,
            (Axis::X, Ctrl::Fine) => spirv::Op::DPdxFine,
            (Axis::X, Ctrl::None) => spirv::Op::DPdx,
            (Axis::Y, Ctrl::Coarse) => spirv::Op::DPdyCoarse,
            (Axis::Y, Ctrl::Fine) => spirv::Op::DPdyFine,
            (Axis::Y, Ctrl::None) => spirv::Op::DPdy,
            (Axis::Width, Ctrl::Coarse) => spirv::Op::FwidthCoarse,
            (Axis::Width, Ctrl::Fine) => spirv::Op::FwidthFine,
            (Axis::Width, Ctrl::None) => spirv::Op::Fwidth,
        };
        block
            .body
            .push(Instruction::derivative(op, result_type_id, id, expr_id));
        Ok(id)
    }

    pub(super) fn write_relational(
        &mut self,
        fun: crate::RelationalFunction,
        argument: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        use crate::RelationalFunction as Rf;
        let arg_id = self.cached.get(argument)?;
        let op = match fun {
            Rf::All => spirv::Op::All,
            Rf::Any => spirv::Op::Any,
            Rf::IsNan => spirv::Op::IsNan,
            Rf::IsInf => spirv::Op::IsInf,
        };
        let id = self.gen_id();
        block
            .body
            .push(Instruction::relational(op, result_type_id, id, arg_id));
        Ok(id)
    }

    fn write_interpolate_at_vertex_amd(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        pointer: Handle<crate::Expression>,
        vertex: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let pointer_id = self.write_access_chain(pointer, block, AccessTypeAdjustment::None)?;
        if self.is_half(expr_handle) {
            self.writer.use_feature(&feature::AMD_GPU_SHADER_HALF_FLOAT);
        }
        self.writer
            .use_feature(&feature::AMD_SHADER_EXPLICIT_VERTEX_PARAMETER);
        let set = self
            .writer
            .spirv_ext_import(feature::AMD_SHADER_EXPLICIT_VERTEX_PARAMETER_SET);
        let id = self.gen_id();
        block.body.push(Instruction::ext_inst(
            set,
            grammar::amd_shader_explicit_vertex_parameter::InterpolateAtVertexAMD,
            result_type_id,
            id,
            &[pointer_id, self.cached.get(vertex)?],
        ));
        Ok(id)
    }

    pub(super) fn write_interpolate_at(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        pointer: Handle<crate::Expression>,
        location: crate::InterpolationLocation,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        if let crate::InterpolationLocation::VertexAmd(vertex) = location {
            return self.write_interpolate_at_vertex_amd(
                expr_handle,
                pointer,
                vertex,
                result_type_id,
                block,
            );
        }
        self.writer.require_any(
            "interpolation functions",
            &[spirv::Capability::InterpolationFunction],
        )?;
        let pointer_id = self.write_access_chain(pointer, block, AccessTypeAdjustment::None)?;
        let (op, operand) = match location {
            crate::InterpolationLocation::Centroid => {
                (spirv::GlslStd450Op::InterpolateAtCentroid, None)
            }
            crate::InterpolationLocation::Sample(sample) => (
                spirv::GlslStd450Op::InterpolateAtSample,
                Some(self.cached.get(sample)?),
            ),
            crate::InterpolationLocation::Offset(offset) => (
                spirv::GlslStd450Op::InterpolateAtOffset,
                Some(self.cached.get(offset)?),
            ),
            crate::InterpolationLocation::VertexAmd(_) => {
                return Err(Error::Validation(
                    "vertex interpolation reached the GLSL.std.450 path",
                ));
            }
        };
        let offset = if let crate::InterpolationLocation::Offset(offset) = location {
            Some(offset)
        } else {
            None
        };
        if [Some(expr_handle), offset]
            .into_iter()
            .flatten()
            .any(|handle| self.is_half(handle))
        {
            self.writer.use_feature(&feature::AMD_GPU_SHADER_HALF_FLOAT);
        }
        let id = self.gen_id();
        let mut operands = alloc::vec![pointer_id];
        operands.extend(operand);
        block.body.push(Instruction::ext_inst_gl_op(
            self.writer.gl450_ext_inst_id,
            op,
            result_type_id,
            id,
            &operands,
        ));
        Ok(id)
    }

    pub(super) fn write_fragment_fetch(
        &mut self,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        fragment: Option<Handle<crate::Expression>>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.writer.require(&feature::AMD_FRAGMENT_MASK)?;
        let image_id = self.get_image_id(image, block)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(match fragment {
            None => spirv::Op::FragmentMaskFetchAMD,
            Some(_) => spirv::Op::FragmentFetchAMD,
        });
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(image_id);
        instruction.add_operand(self.cached.get(coordinate)?);
        if let Some(fragment) = fragment {
            instruction.add_operand(self.cached.get(fragment)?);
        }
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_read_clock(
        &mut self,
        source: crate::ClockSource,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let id = self.gen_id();
        let scope = match source {
            crate::ClockSource::Subgroup => Some(spirv::Scope::Subgroup),
            crate::ClockSource::Device => Some(spirv::Scope::Device),
            crate::ClockSource::AmdTime => None,
        };
        match scope {
            Some(scope) => {
                self.writer.require(&feature::SHADER_CLOCK)?;
                let scope_id = self.get_scope_constant(scope as u32);
                let mut instruction = Instruction::new(spirv::Op::ReadClockKHR);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(scope_id);
                block.body.push(instruction);
            }
            None => {
                let set = self.writer.spirv_ext_import(feature::AMD_GCN_SHADER_SET);
                block.body.push(Instruction::ext_inst(
                    set,
                    grammar::amd_gcn_shader::TimeAMD,
                    result_type_id,
                    id,
                    &[],
                ));
            }
        }
        Ok(id)
    }

    pub(super) fn write_is_helper_invocation(
        &mut self,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.writer.require(&feature::DEMOTE_TO_HELPER_INVOCATION)?;
        let id = self.gen_id();
        block
            .body
            .push(Instruction::is_helper_invocation(result_type_id, id));
        Ok(id)
    }

    pub(super) fn write_image_sparse_resident(
        &mut self,
        code: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.writer
            .require_any("sparse residency", &[spirv::Capability::SparseResidency])?;
        let id = self.gen_id();
        let code_id = self.cached.get(code)?;
        block.body.push(Instruction::unary(
            spirv::Op::ImageSparseTexelsResident,
            result_type_id,
            id,
            code_id,
        ));
        Ok(id)
    }

    pub(super) fn write_acceleration_structure_from_address(
        &mut self,
        address: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let address_id = self.cached.get(address)?;
        let id = self.gen_id();
        block.body.push(Instruction::unary(
            spirv::Op::ConvertUToAccelerationStructureKHR,
            result_type_id,
            id,
            address_id,
        ));
        Ok(id)
    }
}
