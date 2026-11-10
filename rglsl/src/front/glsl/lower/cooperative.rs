use alloc::{format, vec::Vec};

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};
use rglsl_sema::CooperativeCall;

use super::builtins::{derivative, math};
use super::function::FunctionLowerer;
use super::types::scalar;
use super::{internal, unsupported, Result};
use crate::{
    BinaryOperator, CooperativeData, CooperativeVectorBias, CooperativeVectorFunction,
    CooperativeVectorMatMul, Expression, Handle, MathFunction, RelationalFunction, Span, Statement,
    UnaryOperator,
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
                let divided = self.binary_op(BinaryOperator::Divide, x, y, at)?;
                let floor = self.math_call(MathFunction::Floor, &[divided], at)?;
                let product = self.binary_op(BinaryOperator::Multiply, floor, y, at)?;
                return self.binary_op(BinaryOperator::Subtract, x, product, at);
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

    pub(super) fn cooperative_call(
        &mut self,
        kind: CooperativeCall,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match kind {
            CooperativeCall::Load { .. } | CooperativeCall::Store { .. } => {
                let data = self.cooperative_data(&arguments[1..], at)?;
                let matrix = argument(0)?;
                if let CooperativeCall::Load { .. } = kind {
                    let matrix_ty = self.info(matrix)?.ty.clone();
                    let ty = self.lw.ir_type(&matrix_ty, at)?;
                    let place = self.place(matrix)?;
                    let value = self.add(Expression::CooperativeLoad { ty, data }, at)?;
                    self.store(&place, value, at)?;
                } else {
                    let target = self.rvalue(matrix)?;
                    self.push(Statement::CooperativeStore { target, data }, at);
                }
                Ok(None)
            }
            CooperativeCall::VectorLoad => {
                let pointer = self.array_pointer(argument(1)?, at)?;
                let offset = self.rvalue(argument(2)?)?;
                let vector = argument(0)?;
                let vector_ty = self.info(vector)?.ty.clone();
                let ty = self.lw.ir_type(&vector_ty, at)?;
                let place = self.place(vector)?;
                let value = self.add(
                    Expression::CooperativeVectorLoad {
                        ty,
                        pointer,
                        offset,
                    },
                    at,
                )?;
                self.store(&place, value, at)?;
                Ok(None)
            }
            CooperativeCall::VectorStore | CooperativeCall::VectorReduceSum => {
                let value = self.rvalue(argument(0)?)?;
                let pointer = self.array_pointer(argument(1)?, at)?;
                let offset = self.rvalue(argument(2)?)?;
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
                self.push(Statement::CooperativeVector(function), at);
                Ok(None)
            }
            CooperativeCall::VectorOuterProduct => {
                let a = self.rvalue(argument(0)?)?;
                let b = self.rvalue(argument(1)?)?;
                let matrix = self.array_pointer(argument(2)?, at)?;
                let offset = self.rvalue(argument(3)?)?;
                let stride = self.rvalue(argument(4)?)?;
                let layout = self.rvalue(argument(5)?)?;
                let interpretation = self.rvalue(argument(6)?)?;
                self.push(
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
                );
                Ok(None)
            }
            CooperativeCall::VectorMatMul { bias } => {
                let input = self.rvalue(argument(1)?)?;
                let input_interpretation = self.rvalue(argument(2)?)?;
                let matrix = self.array_pointer(argument(3)?, at)?;
                let matrix_offset = self.rvalue(argument(4)?)?;
                let matrix_interpretation = self.rvalue(argument(5)?)?;
                let (bias, rest) = if bias {
                    let pointer = self.array_pointer(argument(6)?, at)?;
                    let offset = self.rvalue(argument(7)?)?;
                    let interpretation = self.rvalue(argument(8)?)?;
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
                let rows = self.rvalue(argument(rest)?)?;
                let columns = self.rvalue(argument(rest + 1)?)?;
                let layout = self.rvalue(argument(rest + 2)?)?;
                let transpose = self.rvalue(argument(rest + 3)?)?;
                let stride = self.rvalue(argument(rest + 4)?)?;
                let result = argument(0)?;
                let result_ty = self.info(result)?.ty.clone();
                let ty = self.lw.ir_type(&result_ty, at)?;
                let place = self.place(result)?;
                let value = self.add(
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
                )?;
                self.store(&place, value, at)?;
                Ok(None)
            }
            CooperativeCall::MulAdd { saturating, .. } => {
                let a = self.rvalue(argument(0)?)?;
                let b = self.rvalue(argument(1)?)?;
                let c = self.rvalue(argument(2)?)?;
                self.add(
                    Expression::CooperativeMultiplyAdd {
                        a,
                        b,
                        c,
                        saturating,
                    },
                    at,
                )
                .map(Some)
            }
        }
    }

    fn array_pointer(&mut self, buffer: &AstExpression, at: Span) -> Result<Handle<Expression>> {
        let place = self.place(buffer)?;
        if place.swizzle.is_some() {
            return Err(internal(at));
        }
        Ok(place.pointer)
    }

    fn cooperative_data(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<CooperativeData> {
        let &[ref buffer, ref element, ref stride, ref layout] = arguments else {
            return Err(internal(at));
        };
        let place = self.place(buffer)?;
        if place.swizzle.is_some() {
            return Err(internal(at));
        }
        let index = self.rvalue(element)?;
        let pointer = self.add(
            Expression::Access {
                base: place.pointer,
                index,
            },
            at,
        )?;
        let stride = self.rvalue(stride)?;
        let layout = self.rvalue(layout)?;
        Ok(CooperativeData {
            pointer,
            stride: Some(stride),
            layout,
        })
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

fn is_bool(ty: &GlslType) -> bool {
    ty.base_scalar() == Some(GlslScalar::Bool)
}
