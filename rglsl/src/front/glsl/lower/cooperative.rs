use alloc::{format, vec::Vec};

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};
use rglsl_sema::{Callee, CooperativeCall, MatrixCall, QcomConversion, TensorCall};

use super::builtins::{derivative, math};
use super::function::FunctionLowerer;
use super::types::scalar;
use super::{internal, unsupported, Result};
use crate::{
    ArrayConversion, BinaryOperator, CooperativeData, CooperativeFamily, CooperativeMatrixFunction,
    CooperativeVectorBias, CooperativeVectorFunction, CooperativeVectorMatMul, Expression, Handle,
    MathFunction, RelationalFunction, Span, Statement, TensorOperation, UnaryOperator,
};

const REPLICATED: [&str; 7] = ["min", "max", "clamp", "mix", "step", "smoothstep", "mod"];

impl FunctionLowerer<'_, '_> {
    fn spread(
        &mut self,
        value: Handle<Expression>,
        ty: &GlslType,
        shape: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if !ty.is_scalar() {
            return Ok(value);
        }
        let element = ty.base_scalar().ok_or_else(|| internal(at))?;
        self.replicate(value, &shape.with_scalar(element), at)
    }

    pub(super) fn long_generic(
        &mut self,
        name: &str,
        result: &GlslType,
        shape: &GlslType,
        mut values: Vec<Handle<Expression>>,
        types: Vec<GlslType>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let arg = |values: &[Handle<Expression>], index: usize| {
            values.get(index).copied().ok_or_else(|| internal(at))
        };
        let first = types.first().cloned().unwrap_or(GlslType::VOID);
        if let Some((axis, ctrl)) = derivative(name) {
            let half = first.base_scalar() == Some(GlslScalar::Float16);
            let mut expr = arg(&values, 0)?;
            if half {
                expr = self.as_kind(expr, crate::Scalar::F32, at)?;
            }
            let value = self.add(Expression::Derivative { axis, ctrl, expr }, at)?;
            return if half {
                self.as_kind(value, crate::Scalar::F16, at)
            } else {
                Ok(value)
            };
        }
        let relational = match name {
            "isnan" => Some(RelationalFunction::IsNan),
            "isinf" => Some(RelationalFunction::IsInf),
            "any" => Some(RelationalFunction::Any),
            "all" => Some(RelationalFunction::All),
            _ => None,
        };
        if let Some(fun) = relational {
            let argument = arg(&values, 0)?;
            return self.add(Expression::Relational { fun, argument }, at);
        }
        let comparison = match name {
            "lessThan" => Some(BinaryOperator::Less),
            "lessThanEqual" => Some(BinaryOperator::LessEqual),
            "greaterThan" => Some(BinaryOperator::Greater),
            "greaterThanEqual" => Some(BinaryOperator::GreaterEqual),
            "equal" => Some(BinaryOperator::Equal),
            "notEqual" => Some(BinaryOperator::NotEqual),
            _ => None,
        };
        if let Some(op) = comparison {
            return self.binary_op(op, arg(&values, 0)?, arg(&values, 1)?, at);
        }
        if name == "not" {
            let expr = arg(&values, 0)?;
            return self.add(
                Expression::Unary {
                    op: UnaryOperator::LogicalNot,
                    expr,
                },
                at,
            );
        }
        if name.contains("BitsTo") {
            let kind = scalar(result.base_scalar().ok_or_else(|| internal(at))?).kind;
            let expr = arg(&values, 0)?;
            return self.add(
                Expression::As {
                    expr,
                    kind,
                    convert: None,
                },
                at,
            );
        }
        let element = first.base_scalar();
        let bit_operation = matches!(
            name,
            "findMSB"
                | "findLSB"
                | "bitCount"
                | "bitfieldReverse"
                | "bitfieldExtract"
                | "bitfieldInsert"
        );
        if let (Some(element), true) = (element, bit_operation) {
            if element.is_integer() && element.bits() < 32 {
                return self.long_narrow_bits(name, element, result, shape, &values, at);
            }
            if element.is_integer() && element.bits() == 64 && name == "bitCount" {
                return self.long_wide_bit_count(element, result, shape, &values, at);
            }
        }
        if REPLICATED.contains(&name) && !(name == "mix" && types.get(2).is_some_and(is_bool)) {
            for (value, ty) in values.iter_mut().zip(&types) {
                *value = self.spread(*value, ty, shape, at)?;
            }
        }
        match name {
            "mod" => {
                let x = arg(&values, 0)?;
                let y = arg(&values, 1)?;
                return self.binary_op(BinaryOperator::Modulo, x, y, at);
            }
            "mix" if types.get(2).is_some_and(is_bool) => {
                return self.add(
                    Expression::Select {
                        condition: arg(&values, 2)?,
                        accept: arg(&values, 1)?,
                        reject: arg(&values, 0)?,
                    },
                    at,
                );
            }
            "bitfieldExtract" | "bitfieldInsert" => {
                let start = if name == "bitfieldExtract" { 1 } else { 2 };
                for slot in values.iter_mut().skip(start) {
                    *slot = self.as_kind(*slot, crate::Scalar::U32, at)?;
                }
                let fun = if name == "bitfieldExtract" {
                    MathFunction::ExtractBits
                } else {
                    MathFunction::InsertBits
                };
                return self.math_call(fun, &values, at);
            }
            _ => {}
        }
        let fun = math(name, values.len())
            .ok_or_else(|| unsupported(format!("the built-in function `{name}`"), at))?;
        let value = self.math_call(fun, &values, at)?;
        let unsigned_input = first.base_scalar().is_some_and(GlslScalar::is_unsigned);
        if matches!(name, "bitCount" | "findLSB" | "findMSB") && unsigned_input {
            let target = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
            return self.as_kind(value, target, at);
        }
        Ok(value)
    }

    fn long_narrow_bits(
        &mut self,
        name: &str,
        element: GlslScalar,
        result: &GlslType,
        shape: &GlslType,
        values: &[Handle<Expression>],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let source = scalar(element);
        let wide = crate::Scalar {
            kind: source.kind,
            width: 4,
        };
        let unsigned_narrow = crate::Scalar {
            kind: crate::ScalarKind::Uint,
            width: source.width,
        };
        let arg = |index: usize| values.get(index).copied().ok_or_else(|| internal(at));
        let widen =
            |lowerer: &mut Self, value: Handle<Expression>| lowerer.as_kind(value, wide, at);
        let zero_extend = |lowerer: &mut Self, value: Handle<Expression>| -> Result<_> {
            let unsigned = lowerer.add(
                Expression::As {
                    expr: value,
                    kind: unsigned_narrow.kind,
                    convert: None,
                },
                at,
            )?;
            lowerer.as_kind(unsigned, crate::Scalar::U32, at)
        };
        let target = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
        let value = match name {
            "bitfieldExtract" | "bitfieldInsert" => {
                let start = if name == "bitfieldExtract" { 1 } else { 2 };
                let mut converted = Vec::with_capacity(values.len());
                for (index, &value) in values.iter().enumerate() {
                    converted.push(if index < start {
                        widen(self, value)?
                    } else {
                        self.as_kind(value, crate::Scalar::U32, at)?
                    });
                }
                let fun = if name == "bitfieldExtract" {
                    MathFunction::ExtractBits
                } else {
                    MathFunction::InsertBits
                };
                self.math_call(fun, &converted, at)?
            }
            "bitfieldReverse" => {
                let value = zero_extend(self, arg(0)?)?;
                let reversed = self.math_call(MathFunction::ReverseBits, &[value], at)?;
                let amount =
                    self.literal(crate::Literal::U32(32 - u32::from(source.width) * 8), at)?;
                let amount = self.replicate(amount, &shape.with_scalar(GlslScalar::Uint), at)?;
                self.binary_op(BinaryOperator::ShiftRight, reversed, amount, at)?
            }
            _ => {
                let value = if name == "findMSB" && source.kind == crate::ScalarKind::Sint {
                    widen(self, arg(0)?)?
                } else {
                    zero_extend(self, arg(0)?)?
                };
                let fun = match name {
                    "bitCount" => MathFunction::CountOneBits,
                    "findLSB" => MathFunction::FirstTrailingBit,
                    _ => MathFunction::FirstLeadingBit,
                };
                self.math_call(fun, &[value], at)?
            }
        };
        self.as_kind(value, target, at)
    }

    fn long_wide_bit_count(
        &mut self,
        element: GlslScalar,
        result: &GlslType,
        shape: &GlslType,
        values: &[Handle<Expression>],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let value = values.first().copied().ok_or_else(|| internal(at))?;
        let unsigned = if element.is_signed() {
            self.add(
                Expression::As {
                    expr: value,
                    kind: crate::ScalarKind::Uint,
                    convert: None,
                },
                at,
            )?
        } else {
            value
        };
        let low = self.as_kind(unsigned, crate::Scalar::U32, at)?;
        let amount = self.literal(crate::Literal::U32(32), at)?;
        let amount = self.replicate(amount, &shape.with_scalar(GlslScalar::Uint), at)?;
        let shifted = self.binary_op(BinaryOperator::ShiftRight, unsigned, amount, at)?;
        let high = self.as_kind(shifted, crate::Scalar::U32, at)?;
        let low = self.math_call(MathFunction::CountOneBits, &[low], at)?;
        let high = self.math_call(MathFunction::CountOneBits, &[high], at)?;
        let sum = self.binary_op(BinaryOperator::Add, low, high, at)?;
        let target = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
        self.as_kind(sum, target, at)
    }

    fn referenced_function(
        &self,
        argument: &AstExpression,
        at: Span,
    ) -> Result<Handle<crate::Function>> {
        let analysis = self.lw.analysis;
        let Some(&Callee::Function(id)) = analysis.calls.get(&argument.id) else {
            return Err(internal(at));
        };
        self.lw
            .functions
            .get(&id)
            .copied()
            .ok_or_else(|| unsupported("a function without a body as a cooperative callback", at))
    }

    pub(super) fn cooperative_family(&self) -> CooperativeFamily {
        let extensions = &self.lw.analysis.extensions;
        if extensions.contains("GL_EXT_cooperative_matrix_maintenance1") {
            CooperativeFamily::Ext
        } else if extensions.contains("GL_NV_cooperative_matrix2") {
            CooperativeFamily::Nv
        } else {
            CooperativeFamily::Khr
        }
    }

    pub(super) fn long_math_result(
        &mut self,
        fun: MathFunction,
        ty: &GlslType,
        at: Span,
    ) -> Result<()> {
        let argument = self.lw.ir_type(ty, at)?;
        let inner = self.lw.module.types[argument].inner.clone();
        let members =
            crate::proc::long_math_result_members(fun, &inner).ok_or_else(|| internal(at))?;
        for member in members {
            self.lw.insert_type(member);
        }
        let result = crate::proc::long_math_result(fun, &inner, &self.lw.module.types)
            .ok_or_else(|| internal(at))?;
        self.lw.module.types.insert(result, Span::UNDEFINED);
        Ok(())
    }
}

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn cooperative_call(
        self,
        kind: CooperativeCall,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match kind {
            CooperativeCall::Qcom(conversion) => {
                let (conversion, target) = match conversion {
                    QcomConversion::Bitcast => (ArrayConversion::Bitcast, 1),
                    QcomConversion::ExtractSubArray => (ArrayConversion::SubArray, 2),
                    QcomConversion::VectorToMatrix => (ArrayConversion::ToCooperativeMatrix, 1),
                    QcomConversion::MatrixToVector => (ArrayConversion::FromCooperativeMatrix, 1),
                };
                let expr = {
                    let frame = self.clone().rvalue(argument(0)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let index = if conversion == ArrayConversion::SubArray {
                    Some({
                        let frame = self.clone().rvalue(argument(1)?);
                        let result = self.nest(frame).await;
                        result
                    }?)
                } else {
                    None
                };
                let destination = argument(target)?;
                let destination_ty = self.with(|this| this.info(destination))??.ty.clone();
                let ty = self.with(|this| this.lw.ir_type(&destination_ty, at))??;
                let place = {
                    let frame = self.clone().place(destination);
                    let result = self.nest(frame).await;
                    result
                }?;
                let value = self.with(|this| {
                    this.add(
                        Expression::ArrayConversion {
                            conversion,
                            expr,
                            index,
                            ty,
                        },
                        at,
                    )
                })??;
                self.with(|this| this.store(&place, value, at))??;
                Ok(None)
            }
            CooperativeCall::Load { .. } | CooperativeCall::Store { .. } => {
                let data = {
                    let frame = self.clone().cooperative_data(&arguments[1..], at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let matrix = argument(0)?;
                if let CooperativeCall::Load { .. } = kind {
                    let matrix_ty = self.with(|this| this.info(matrix))??.ty.clone();
                    let ty = self.with(|this| this.lw.ir_type(&matrix_ty, at))??;
                    let place = {
                        let frame = self.clone().place(matrix);
                        let result = self.nest(frame).await;
                        result
                    }?;
                    let value =
                        self.with(|this| this.add(Expression::CooperativeLoad { ty, data }, at))??;
                    self.with(|this| this.store(&place, value, at))??;
                } else {
                    let target = {
                        let frame = self.clone().rvalue(matrix);
                        let result = self.nest(frame).await;
                        result
                    }?;
                    self.with(|this| this.push(Statement::CooperativeStore { target, data }, at))?;
                }
                Ok(None)
            }
            CooperativeCall::VectorLoad => {
                let pointer = {
                    let frame = self.clone().array_pointer(argument(1)?, at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let offset = {
                    let frame = self.clone().rvalue(argument(2)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let vector = argument(0)?;
                let vector_ty = self.with(|this| this.info(vector))??.ty.clone();
                let ty = self.with(|this| this.lw.ir_type(&vector_ty, at))??;
                let place = {
                    let frame = self.clone().place(vector);
                    let result = self.nest(frame).await;
                    result
                }?;
                let value = self.with(|this| {
                    this.add(
                        Expression::CooperativeVectorLoad {
                            ty,
                            pointer,
                            offset,
                        },
                        at,
                    )
                })??;
                self.with(|this| this.store(&place, value, at))??;
                Ok(None)
            }
            CooperativeCall::VectorStore | CooperativeCall::VectorReduceSum => {
                let value = {
                    let frame = self.clone().rvalue(argument(0)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let pointer = {
                    let frame = self.clone().array_pointer(argument(1)?, at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let offset = {
                    let frame = self.clone().rvalue(argument(2)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let function = if kind == CooperativeCall::VectorStore {
                    CooperativeVectorFunction::Store {
                        value,
                        pointer,
                        offset,
                    }
                } else {
                    CooperativeVectorFunction::ReduceSumAccumulate {
                        value,
                        pointer,
                        offset,
                    }
                };
                self.with(|this| this.push(Statement::CooperativeVector(function), at))?;
                Ok(None)
            }
            other => {
                self.nest(self.clone().cooperative_vector_call(other, arguments, at))
                    .await
            }
        }
    }

    async fn cooperative_vector_call(
        self,
        kind: CooperativeCall,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match kind {
            CooperativeCall::VectorOuterProduct => {
                let a = {
                    let frame = self.clone().rvalue(argument(0)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let b = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let matrix = {
                    let frame = self.clone().array_pointer(argument(2)?, at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let offset = {
                    let frame = self.clone().rvalue(argument(3)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let stride = {
                    let frame = self.clone().rvalue(argument(4)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let layout = {
                    let frame = self.clone().rvalue(argument(5)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let interpretation = {
                    let frame = self.clone().rvalue(argument(6)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                self.with(|this| {
                    this.push(
                        Statement::CooperativeVector(
                            CooperativeVectorFunction::OuterProductAccumulate {
                                a,
                                b,
                                matrix,
                                offset,
                                stride,
                                layout,
                                interpretation,
                            },
                        ),
                        at,
                    )
                })?;
                Ok(None)
            }
            CooperativeCall::VectorMatMul { bias } => {
                let input = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let input_interpretation = {
                    let frame = self.clone().rvalue(argument(2)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let matrix = {
                    let frame = self.clone().array_pointer(argument(3)?, at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let matrix_offset = {
                    let frame = self.clone().rvalue(argument(4)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let matrix_interpretation = {
                    let frame = self.clone().rvalue(argument(5)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let (bias, rest) = if bias {
                    let pointer = {
                        let frame = self.clone().array_pointer(argument(6)?, at);
                        let result = self.nest(frame).await;
                        result
                    }?;
                    let offset = {
                        let frame = self.clone().rvalue(argument(7)?);
                        let result = self.nest(frame).await;
                        result
                    }?;
                    let interpretation = {
                        let frame = self.clone().rvalue(argument(8)?);
                        let result = self.nest(frame).await;
                        result
                    }?;
                    (
                        Some(CooperativeVectorBias {
                            pointer,
                            offset,
                            interpretation,
                        }),
                        9,
                    )
                } else {
                    (None, 6)
                };
                let rows = {
                    let frame = self.clone().rvalue(argument(rest)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let columns = {
                    let frame = self.clone().rvalue(argument(rest + 1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let layout = {
                    let frame = self.clone().rvalue(argument(rest + 2)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let transpose = {
                    let frame = self.clone().rvalue(argument(rest + 3)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let stride = {
                    let frame = self.clone().rvalue(argument(rest + 4)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let result = argument(0)?;
                let result_ty = self.with(|this| this.info(result))??.ty.clone();
                let ty = self.with(|this| this.lw.ir_type(&result_ty, at))??;
                let place = {
                    let frame = self.clone().place(result);
                    let result = self.nest(frame).await;
                    result
                }?;
                let value = self.with(|this| {
                    this.add(
                        Expression::CooperativeVectorMatMul {
                            ty,
                            operation: CooperativeVectorMatMul {
                                input,
                                input_interpretation,
                                matrix,
                                matrix_offset,
                                matrix_interpretation,
                                bias,
                                rows,
                                columns,
                                layout,
                                transpose,
                                stride,
                            },
                        },
                        at,
                    )
                })??;
                self.with(|this| this.store(&place, value, at))??;
                Ok(None)
            }
            CooperativeCall::SaturatedConvert => {
                let target = argument(0)?;
                let target_ty = self.with(|this| this.info(target))??.ty.clone();
                let ty = self.with(|this| this.lw.ir_type(&target_ty, at))??;
                let place = {
                    let frame = self.clone().place(target);
                    let result = self.nest(frame).await;
                    result
                }?;
                let expr = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let family = self.with(|this| this.cooperative_family())?;
                let value = self.with(|this| {
                    this.add(
                        Expression::Convert {
                            expr,
                            ty,
                            saturating: true,
                            family,
                        },
                        at,
                    )
                })??;
                self.with(|this| this.store(&place, value, at))??;
                Ok(None)
            }
            CooperativeCall::MulAdd { saturating, .. } => {
                let a = {
                    let frame = self.clone().rvalue(argument(0)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let b = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let c = {
                    let frame = self.clone().rvalue(argument(2)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                self.with(|this| {
                    this.add(
                        Expression::CooperativeMultiplyAdd {
                            a,
                            b,
                            c,
                            saturating,
                        },
                        at,
                    )
                    .map(Some)
                })?
            }
            _ => Err(internal(at)),
        }
    }

    pub(super) async fn tensor_call(
        self,
        kind: TensorCall,
        result: &'b GlslType,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let operation = match kind {
            TensorCall::CreateLayout | TensorCall::CreateView => {
                let ty = self.with(|this| this.lw.ir_type(result, at))??;
                return self.with(|this| this.add(Expression::TensorCreate { ty }, at))?;
            }
            TensorCall::LayoutSetBlockSize => TensorOperation::LayoutSetBlockSize,
            TensorCall::LayoutSetDimension => TensorOperation::LayoutSetDimension,
            TensorCall::LayoutSetStride => TensorOperation::LayoutSetStride,
            TensorCall::LayoutSlice => TensorOperation::LayoutSlice,
            TensorCall::LayoutSetClampValue => TensorOperation::LayoutSetClampValue,
            TensorCall::ViewSetDimension => TensorOperation::ViewSetDimension,
            TensorCall::ViewSetStride => TensorOperation::ViewSetStride,
            TensorCall::ViewSetClip => TensorOperation::ViewSetClip,
        };
        let (base, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let base = {
            let frame = self.clone().rvalue(base);
            let result = self.nest(frame).await;
            result
        }?;
        let mut operands = Vec::with_capacity(rest.len());
        for argument in rest {
            operands.push({
                let frame = self.clone().rvalue(argument);
                let result = self.nest(frame).await;
                result
            }?);
        }
        self.with(|this| {
            this.add(
                Expression::TensorSet {
                    base,
                    operation,
                    operands,
                },
                at,
            )
        })?
    }

    pub(super) async fn matrix_call(
        self,
        kind: MatrixCall,
        result: &'b GlslType,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let family = self.with(|this| match this.cooperative_family() {
            CooperativeFamily::Ext => CooperativeFamily::Ext,
            CooperativeFamily::Khr | CooperativeFamily::Nv => CooperativeFamily::Nv,
        })?;
        let (function, target) = match kind {
            MatrixCall::LoadTensor { view } | MatrixCall::StoreTensor { view } => {
                let pointer = {
                    let frame = self
                        .clone()
                        .cooperative_element(argument(1)?, argument(2)?, at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let layout = {
                    let frame = self.clone().rvalue(argument(3)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let view_value = if view {
                    Some({
                        let frame = self.clone().rvalue(argument(4)?);
                        let result = self.nest(frame).await;
                        result
                    }?)
                } else {
                    None
                };
                let start = if view { 5 } else { 4 };
                if let MatrixCall::StoreTensor { .. } = kind {
                    let value = {
                        let frame = self.clone().rvalue(argument(0)?);
                        let result = self.nest(frame).await;
                        result
                    }?;
                    self.with(|this| {
                        this.push(
                            Statement::CooperativeMatrix {
                                function: CooperativeMatrixFunction::StoreTensor {
                                    pointer,
                                    value,
                                    layout,
                                    view: view_value,
                                },
                                result: None,
                            },
                            at,
                        )
                    })?;
                    return Ok(None);
                }
                let decode = match arguments.get(start) {
                    Some(argument) => {
                        Some(self.with(|this| this.referenced_function(argument, at))??)
                    }
                    None => None,
                };
                let decode_vector = match arguments.get(start + 1) {
                    Some(argument) => {
                        Some(self.with(|this| this.referenced_function(argument, at))??)
                    }
                    None => None,
                };
                let object = {
                    let frame = self.clone().rvalue(argument(0)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                (
                    CooperativeMatrixFunction::LoadTensor {
                        pointer,
                        object,
                        layout,
                        view: view_value,
                        decode,
                        decode_vector,
                    },
                    Some(argument(0)?),
                )
            }
            MatrixCall::Transpose { .. } => {
                let matrix = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                (
                    CooperativeMatrixFunction::Transpose { matrix, family },
                    Some(argument(0)?),
                )
            }
            MatrixCall::Reduce { mask, .. } => {
                let matrix = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let combine =
                    self.try_with(|this| Ok(this.referenced_function(argument(3)?, at)))??;
                (
                    CooperativeMatrixFunction::Reduce {
                        matrix,
                        mask,
                        combine,
                        family,
                    },
                    Some(argument(0)?),
                )
            }
            MatrixCall::PerElement { .. } => {
                let matrix = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let function =
                    self.try_with(|this| Ok(this.referenced_function(argument(2)?, at)))??;
                let mut extra = Vec::new();
                for argument in arguments.iter().skip(3) {
                    extra.push({
                        let frame = self.clone().rvalue(argument);
                        let result = self.nest(frame).await;
                        result
                    }?);
                }
                (
                    CooperativeMatrixFunction::PerElement {
                        matrix,
                        function,
                        arguments: extra,
                        family,
                    },
                    Some(argument(0)?),
                )
            }
            MatrixCall::GetCoordinate => {
                let matrix = {
                    let frame = self.clone().rvalue(argument(0)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let index = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                (
                    CooperativeMatrixFunction::GetCoordinate { matrix, index },
                    None,
                )
            }
        };
        let result_ty = match target {
            Some(target) => self.with(|this| this.info(target))??.ty.clone(),
            None => result.clone(),
        };
        let ty = self.with(|this| this.lw.ir_type(&result_ty, at))??;
        let value = self.with(|this| {
            this.result_statement(
                Expression::CooperativeMatrixResult { ty },
                |result| Statement::CooperativeMatrix {
                    function,
                    result: Some(result),
                },
                at,
            )
        })?;
        match target {
            Some(target) => {
                let place = {
                    let frame = self.clone().place(target);
                    let result = self.nest(frame).await;
                    result
                }?;
                self.with(|this| this.store(&place, value, at))??;
                Ok(None)
            }
            None => Ok(Some(value)),
        }
    }

    async fn cooperative_element(
        self,
        buffer: &'b AstExpression,
        element: &'b AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let base = {
            let frame = self.clone().array_pointer(buffer, at);
            let result = self.nest(frame).await;
            result
        }?;
        let index = {
            let frame = self.clone().rvalue(element);
            let result = self.nest(frame).await;
            result
        }?;
        self.with(|this| this.add(Expression::Access { base, index }, at))?
    }

    async fn array_pointer(
        self,
        buffer: &'b AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let place = {
            let frame = self.clone().place(buffer);
            let result = self.nest(frame).await;
            result
        }?;
        if place.swizzle.is_some() {
            return Err(internal(at));
        }
        Ok(place.pointer)
    }

    async fn cooperative_data(
        self,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<CooperativeData> {
        let &[ref buffer, ref element, ref stride, ref layout] = arguments else {
            return Err(internal(at));
        };
        let place = {
            let frame = self.clone().place(buffer);
            let result = self.nest(frame).await;
            result
        }?;
        if place.swizzle.is_some() {
            return Err(internal(at));
        }
        let index = {
            let frame = self.clone().rvalue(element);
            let result = self.nest(frame).await;
            result
        }?;
        let pointer = self.with(|this| {
            this.add(
                Expression::Access {
                    base: place.pointer,
                    index,
                },
                at,
            )
        })??;
        let stride = {
            let frame = self.clone().rvalue(stride);
            let result = self.nest(frame).await;
            result
        }?;
        let layout = {
            let frame = self.clone().rvalue(layout);
            let result = self.nest(frame).await;
            result
        }?;
        Ok(CooperativeData {
            pointer,
            stride: Some(stride),
            layout,
        })
    }
}

fn is_bool(ty: &GlslType) -> bool {
    ty.base_scalar() == Some(GlslScalar::Bool)
}
