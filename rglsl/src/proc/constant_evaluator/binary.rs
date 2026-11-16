use alloc::{format, string::ToString};

use half::f16;
use num_traits::{
    CheckedRem, CheckedShl, CheckedShr, PrimInt, WrappingAdd, WrappingMul, WrappingSub,
};

use super::{ConstantEvaluatorError, floored_modulo};
use crate::{BinaryOperator, Literal};

pub(super) fn literal_binary_op(
    op: BinaryOperator,
    left: Literal,
    right: Literal,
    glsl: bool,
) -> Result<Literal, ConstantEvaluatorError> {
    if !matches!(op, BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight)
        && core::mem::discriminant(&left) != core::mem::discriminant(&right)
    {
        return Err(ConstantEvaluatorError::InvalidBinaryOpArgs);
    }
    if matches!(
        (left, op),
        (
            Literal::Bool(_),
            BinaryOperator::Less
                | BinaryOperator::LessEqual
                | BinaryOperator::Greater
                | BinaryOperator::GreaterEqual
        )
    ) {
        return Err(ConstantEvaluatorError::InvalidBinaryOpArgs);
    }
    Ok(match op {
        BinaryOperator::Equal => Literal::Bool(left == right),
        BinaryOperator::NotEqual => Literal::Bool(left != right),
        BinaryOperator::Less => Literal::Bool(left < right),
        BinaryOperator::LessEqual => Literal::Bool(left <= right),
        BinaryOperator::Greater => Literal::Bool(left > right),
        BinaryOperator::GreaterEqual => Literal::Bool(left >= right),
        _ => arithmetic(op, left, right, glsl)?,
    })
}

fn arithmetic(
    op: BinaryOperator,
    left: Literal,
    right: Literal,
    glsl: bool,
) -> Result<Literal, ConstantEvaluatorError> {
    Ok(match (left, right) {
        (Literal::I8(a), Literal::I8(b)) => Literal::I8(integer(op, a, b)?),
        (Literal::I8(a), Literal::U32(b)) => Literal::I8(signed_shift(op, a, b)?),
        (Literal::U8(a), Literal::U8(b)) => Literal::U8(integer(op, a, b)?),
        (Literal::U8(a), Literal::U32(b)) => Literal::U8(unsigned_shift(op, a, b)?),
        (Literal::I16(a), Literal::I16(b)) => Literal::I16(integer(op, a, b)?),
        (Literal::I16(a), Literal::U32(b)) => Literal::I16(signed_shift(op, a, b)?),
        (Literal::U16(a), Literal::U16(b)) => Literal::U16(integer(op, a, b)?),
        (Literal::U16(a), Literal::U32(b)) => Literal::U16(unsigned_shift(op, a, b)?),
        (Literal::I32(a), Literal::I32(b)) => Literal::I32(match op {
            BinaryOperator::Divide if glsl => {
                if b == 0 {
                    i32::MAX
                } else {
                    a.wrapping_div(b)
                }
            }
            BinaryOperator::Modulo if glsl => {
                if b == 0 {
                    a
                } else {
                    a.wrapping_rem(b)
                }
            }
            _ => integer(op, a, b)?,
        }),
        (Literal::I32(a), Literal::U32(b)) => Literal::I32(match op {
            BinaryOperator::ShiftLeft if glsl => a.wrapping_shl(b),
            BinaryOperator::ShiftRight if glsl => a.wrapping_shr(b),
            _ => signed_shift(op, a, b)?,
        }),
        (Literal::U32(a), Literal::U32(b)) => Literal::U32(match op {
            BinaryOperator::Divide if glsl => a.checked_div(b).unwrap_or(u32::MAX),
            BinaryOperator::Modulo if glsl => a.checked_rem(b).unwrap_or(a),
            BinaryOperator::ShiftLeft if glsl => a.wrapping_shl(b),
            BinaryOperator::ShiftRight if glsl => a.wrapping_shr(b),
            BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight => unsigned_shift(op, a, b)?,
            _ => integer(op, a, b)?,
        }),
        (Literal::F32(a), Literal::F32(b)) => Literal::F32(match op {
            BinaryOperator::Add => a + b,
            BinaryOperator::Subtract => a - b,
            BinaryOperator::Multiply => a * b,
            BinaryOperator::Divide => a / b,
            BinaryOperator::Modulo => floored_modulo(f64::from(a), f64::from(b)) as f32,
            _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
        }),
        (Literal::F16(a), Literal::F16(b)) => {
            let result = match op {
                BinaryOperator::Add => a + b,
                BinaryOperator::Subtract => a - b,
                BinaryOperator::Multiply => a * b,
                BinaryOperator::Divide => a / b,
                BinaryOperator::Modulo => f16::from_f64(floored_modulo(a.to_f64(), b.to_f64())),
                _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
            };
            if !result.is_finite() {
                return Err(ConstantEvaluatorError::Overflow(format!("{op:?}")));
            }
            Literal::F16(result)
        }
        (Literal::Bool(a), Literal::Bool(b)) => Literal::Bool(match op {
            BinaryOperator::LogicalAnd => a && b,
            BinaryOperator::LogicalOr => a || b,
            BinaryOperator::And => a & b,
            BinaryOperator::InclusiveOr => a | b,
            _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
        }),
        _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
    })
}

fn integer<T>(op: BinaryOperator, a: T, b: T) -> Result<T, ConstantEvaluatorError>
where
    T: PrimInt + CheckedRem + WrappingAdd + WrappingSub + WrappingMul,
{
    Ok(match op {
        BinaryOperator::Add => a.wrapping_add(&b),
        BinaryOperator::Subtract => a.wrapping_sub(&b),
        BinaryOperator::Multiply => a.wrapping_mul(&b),
        BinaryOperator::Divide => a.checked_div(&b).ok_or_else(|| {
            if b.is_zero() {
                ConstantEvaluatorError::DivisionByZero
            } else {
                ConstantEvaluatorError::Overflow("division".into())
            }
        })?,
        BinaryOperator::Modulo => a.checked_rem(&b).ok_or_else(|| {
            if b.is_zero() {
                ConstantEvaluatorError::RemainderByZero
            } else {
                ConstantEvaluatorError::Overflow("remainder".into())
            }
        })?,
        BinaryOperator::And => a & b,
        BinaryOperator::ExclusiveOr => a ^ b,
        BinaryOperator::InclusiveOr => a | b,
        _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
    })
}

fn signed_shift<T>(op: BinaryOperator, a: T, b: u32) -> Result<T, ConstantEvaluatorError>
where
    T: PrimInt + CheckedShl + CheckedShr,
{
    Ok(match op {
        BinaryOperator::ShiftLeft => {
            let magnitude = if a < T::zero() { !a } else { a };
            if magnitude.leading_zeros() <= b {
                return Err(ConstantEvaluatorError::Overflow("<<".to_string()));
            }
            CheckedShl::checked_shl(&a, b).ok_or(ConstantEvaluatorError::ShiftedMoreThan32Bits)?
        }
        BinaryOperator::ShiftRight => {
            CheckedShr::checked_shr(&a, b).ok_or(ConstantEvaluatorError::ShiftedMoreThan32Bits)?
        }
        _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
    })
}

fn unsigned_shift<T>(op: BinaryOperator, a: T, b: u32) -> Result<T, ConstantEvaluatorError>
where
    T: PrimInt + CheckedShl + CheckedShr,
{
    Ok(match op {
        BinaryOperator::ShiftLeft => {
            let factor = CheckedShl::checked_shl(&T::one(), b)
                .ok_or(ConstantEvaluatorError::ShiftedMoreThan32Bits)?;
            a.checked_mul(&factor)
                .ok_or(ConstantEvaluatorError::Overflow("<<".to_string()))?
        }
        BinaryOperator::ShiftRight => {
            CheckedShr::checked_shr(&a, b).ok_or(ConstantEvaluatorError::ShiftedMoreThan32Bits)?
        }
        _ => return Err(ConstantEvaluatorError::InvalidBinaryOpArgs),
    })
}
