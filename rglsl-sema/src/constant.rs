use alloc::vec::Vec;

use rglsl_ast::ast::{BinaryOperator, UnaryOperator};

use crate::types::Scalar;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Value {
    Bool(bool),
    Int(i32),
    Uint(u32),
    Float(f64),
    Double(f64),
    Int8(i8),
    Uint8(u8),
    Int16(i16),
    Uint16(u16),
    Int64(i64),
    Uint64(u64),
    Float16(f64),
}

fn round_to_half(value: f64) -> f64 {
    half::f16::from_f64(value).to_f64()
}

fn round_to_single(value: f64) -> f64 {
    f64::from(value as f32)
}

const fn truncate_float(value: f64) -> i128 {
    if value.is_nan() {
        0
    } else {
        value as i128
    }
}

impl Value {
    pub const fn scalar(self) -> Scalar {
        match self {
            Self::Bool(_) => Scalar::Bool,
            Self::Int(_) => Scalar::Int,
            Self::Uint(_) => Scalar::Uint,
            Self::Float(_) => Scalar::Float,
            Self::Double(_) => Scalar::Double,
            Self::Int8(_) => Scalar::Int8,
            Self::Uint8(_) => Scalar::Uint8,
            Self::Int16(_) => Scalar::Int16,
            Self::Uint16(_) => Scalar::Uint16,
            Self::Int64(_) => Scalar::Int64,
            Self::Uint64(_) => Scalar::Uint64,
            Self::Float16(_) => Scalar::Float16,
        }
    }

    pub fn integer(scalar: Scalar, wide: i128) -> Self {
        match scalar {
            Scalar::Bool => Self::Bool(wide != 0),
            Scalar::Int => Self::Int(wide as i32),
            Scalar::Uint => Self::Uint(wide as u32),
            Scalar::Int8 => Self::Int8(wide as i8),
            Scalar::Uint8 => Self::Uint8(wide as u8),
            Scalar::Int16 => Self::Int16(wide as i16),
            Scalar::Uint16 => Self::Uint16(wide as u16),
            Scalar::Int64 => Self::Int64(wide as i64),
            Scalar::Uint64 => Self::Uint64(wide as u64),
            Scalar::Float | Scalar::Double | Scalar::Float16 => Self::floating(scalar, wide as f64),
        }
    }

    pub fn floating(scalar: Scalar, value: f64) -> Self {
        match scalar {
            Scalar::Float => Self::Float(round_to_single(value)),
            Scalar::Double => Self::Double(value),
            Scalar::Float16 => Self::Float16(round_to_half(value)),
            _ => Self::integer(scalar, truncate_float(value)),
        }
    }

    pub const fn wide(self) -> Option<i128> {
        Some(match self {
            Self::Int(value) => value as i128,
            Self::Uint(value) => value as i128,
            Self::Int8(value) => value as i128,
            Self::Uint8(value) => value as i128,
            Self::Int16(value) => value as i128,
            Self::Uint16(value) => value as i128,
            Self::Int64(value) => value as i128,
            Self::Uint64(value) => value as i128,
            _ => return None,
        })
    }

    pub const fn float(self) -> Option<f64> {
        match self {
            Self::Float(value) | Self::Double(value) | Self::Float16(value) => Some(value),
            _ => None,
        }
    }

    pub fn zero(scalar: Scalar) -> Self {
        Self::integer(scalar, 0)
    }

    pub fn one(scalar: Scalar) -> Self {
        Self::integer(scalar, 1)
    }

    pub fn as_i64(self) -> Option<i64> {
        self.wide().and_then(|value| i64::try_from(value).ok())
    }

    pub const fn as_bool(self) -> Option<bool> {
        match self {
            Self::Bool(value) => Some(value),
            _ => None,
        }
    }

    fn as_f64(self) -> f64 {
        match self {
            Self::Bool(value) => f64::from(u8::from(value)),
            Self::Float(value) | Self::Double(value) | Self::Float16(value) => value,
            other => other.wide().map_or(0.0, |value| value as f64),
        }
    }

    pub fn convert(self, target: Scalar) -> Self {
        if target == Scalar::Bool {
            return Self::Bool(match self {
                Self::Bool(value) => value,
                other => other.as_f64() != 0.0,
            });
        }
        if target.is_floating() {
            return Self::floating(target, self.as_f64());
        }
        match self {
            Self::Bool(value) => Self::integer(target, i128::from(value)),
            Self::Float(value) | Self::Double(value) | Self::Float16(value) => {
                if value < 0.0 && target.is_unsigned() {
                    Self::integer(target, i128::from(value as i64))
                } else {
                    Self::integer(target, truncate_float(value))
                }
            }
            other => Self::integer(target, other.wide().unwrap_or(0)),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Default)]
pub struct Constant {
    pub values: Vec<Value>,
}

impl Constant {
    pub const fn new(values: Vec<Value>) -> Self {
        Self { values }
    }

    pub fn single(value: Value) -> Self {
        Self {
            values: alloc::vec![value],
        }
    }

    pub fn first(&self) -> Option<Value> {
        self.values.first().copied()
    }

    pub fn scalar_i64(&self) -> Option<i64> {
        match self.values.as_slice() {
            [value] => value.as_i64(),
            _ => None,
        }
    }

    pub fn convert(&self, target: Scalar) -> Self {
        Self {
            values: self
                .values
                .iter()
                .map(|value| value.convert(target))
                .collect(),
        }
    }

    pub fn slice(&self, start: usize, length: usize) -> Option<Self> {
        let end = start.checked_add(length)?;
        self.values.get(start..end).map(|values| Self {
            values: values.to_vec(),
        })
    }
}

pub fn fold_unary(operator: UnaryOperator, operand: &Constant) -> Option<Constant> {
    let values = operand
        .values
        .iter()
        .map(|value| {
            let scalar = value.scalar();
            match (operator, *value) {
                (UnaryOperator::Plus, value) => Some(value),
                (UnaryOperator::LogicalNot, Value::Bool(value)) => Some(Value::Bool(!value)),
                (UnaryOperator::Minus, value) => match (value.wide(), value.float()) {
                    (Some(wide), _) => Some(Value::integer(scalar, wide.wrapping_neg())),
                    (_, Some(number)) => Some(Value::floating(scalar, -number)),
                    _ => None,
                },
                (UnaryOperator::BitNot, value) => {
                    value.wide().map(|wide| Value::integer(scalar, !wide))
                }
                _ => None,
            }
        })
        .collect::<Option<Vec<_>>>()?;
    Some(Constant::new(values))
}

fn fold_integer(
    operator: BinaryOperator,
    scalar: Scalar,
    left: i128,
    right: i128,
) -> Option<Value> {
    let wrap = |value: i128| Value::integer(scalar, value);
    Some(match operator {
        BinaryOperator::Add => wrap(left.wrapping_add(right)),
        BinaryOperator::Subtract => wrap(left.wrapping_sub(right)),
        BinaryOperator::Multiply => wrap(left.wrapping_mul(right)),
        BinaryOperator::Divide => wrap(left.checked_div(right)?),
        BinaryOperator::Modulo => wrap(left.checked_rem(right)?),
        BinaryOperator::BitAnd => wrap(left & right),
        BinaryOperator::BitOr => wrap(left | right),
        BinaryOperator::BitXor => wrap(left ^ right),
        BinaryOperator::Less => Value::Bool(left < right),
        BinaryOperator::Greater => Value::Bool(left > right),
        BinaryOperator::LessEqual => Value::Bool(left <= right),
        BinaryOperator::GreaterEqual => Value::Bool(left >= right),
        _ => return None,
    })
}

fn fold_shift(operator: BinaryOperator, left: Value, right: Value) -> Option<Value> {
    let scalar = left.scalar();
    let value = left.wide()?;
    let amount = u32::try_from(right.wide()?).ok()?;
    if amount >= scalar.bits() {
        return None;
    }
    Some(match operator {
        BinaryOperator::ShiftLeft => Value::integer(scalar, value << amount),
        BinaryOperator::ShiftRight => Value::integer(scalar, value >> amount),
        _ => return None,
    })
}

fn fold_float(operator: BinaryOperator, scalar: Scalar, left: f64, right: f64) -> Option<Value> {
    let wrap = |value: f64| Value::floating(scalar, value);
    Some(match operator {
        BinaryOperator::Add => wrap(left + right),
        BinaryOperator::Subtract => wrap(left - right),
        BinaryOperator::Multiply => wrap(left * right),
        BinaryOperator::Divide => wrap(left / right),
        BinaryOperator::Less => Value::Bool(left < right),
        BinaryOperator::Greater => Value::Bool(left > right),
        BinaryOperator::LessEqual => Value::Bool(left <= right),
        BinaryOperator::GreaterEqual => Value::Bool(left >= right),
        _ => return None,
    })
}

fn fold_pair(operator: BinaryOperator, left: Value, right: Value) -> Option<Value> {
    if matches!(
        operator,
        BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight
    ) {
        return fold_shift(operator, left, right);
    }
    if left.scalar() != right.scalar() {
        return None;
    }
    let scalar = left.scalar();
    if let (Some(left), Some(right)) = (left.wide(), right.wide()) {
        return fold_integer(operator, scalar, left, right);
    }
    if let (Some(left), Some(right)) = (left.float(), right.float()) {
        return fold_float(operator, scalar, left, right);
    }
    match (left, right) {
        (Value::Bool(left), Value::Bool(right)) => Some(Value::Bool(match operator {
            BinaryOperator::LogicalAnd => left && right,
            BinaryOperator::LogicalOr => left || right,
            BinaryOperator::LogicalXor => left != right,
            _ => return None,
        })),
        _ => None,
    }
}

pub fn fold_binary(
    operator: BinaryOperator,
    left: &Constant,
    right: &Constant,
) -> Option<Constant> {
    if matches!(operator, BinaryOperator::Equal | BinaryOperator::NotEqual) {
        if left.values.len() != right.values.len() {
            return None;
        }
        let equal = left.values == right.values;
        return Some(Constant::single(Value::Bool(
            equal == (operator == BinaryOperator::Equal),
        )));
    }
    let length = left.values.len().max(right.values.len());
    let pick = |constant: &Constant, index: usize| match constant.values.as_slice() {
        [single] => Some(*single),
        values => values.get(index).copied(),
    };
    let values = (0..length)
        .map(|index| fold_pair(operator, pick(left, index)?, pick(right, index)?))
        .collect::<Option<Vec<_>>>()?;
    Some(Constant::new(values))
}

fn compare(left: Value, right: Value) -> Option<core::cmp::Ordering> {
    if left.scalar() != right.scalar() {
        return None;
    }
    match (left.wide(), right.wide()) {
        (Some(left), Some(right)) => Some(left.cmp(&right)),
        _ => left.float()?.partial_cmp(&right.float()?),
    }
}

fn smaller(left: Value, right: Value) -> Option<Value> {
    Some(if compare(right, left)?.is_lt() {
        right
    } else {
        left
    })
}

fn larger(left: Value, right: Value) -> Option<Value> {
    Some(if compare(left, right)?.is_lt() {
        right
    } else {
        left
    })
}

fn absolute(value: Value) -> Option<Value> {
    let scalar = value.scalar();
    if scalar.is_signed() {
        return Some(Value::integer(scalar, value.wide()?.wrapping_abs()));
    }
    let number = value.float()?;
    Some(Value::floating(
        scalar,
        if number < 0.0 { -number } else { number },
    ))
}

fn truncated(value: f64) -> Option<f64> {
    const LIMIT: f64 = 4_503_599_627_370_496.0;
    if value.is_nan() {
        None
    } else if value >= LIMIT || value <= -LIMIT {
        Some(value)
    } else {
        Some((value as i64) as f64)
    }
}

fn rounded(name: &str, value: Value) -> Option<Value> {
    let number = value.float()?;
    let whole = truncated(number)?;
    let result = match name {
        "trunc" => whole,
        "floor" if whole > number => whole - 1.0,
        "ceil" if whole < number => whole + 1.0,
        "floor" | "ceil" => whole,
        "sign" if number > 0.0 => 1.0,
        "sign" if number < 0.0 => -1.0,
        "sign" => 0.0,
        _ => return None,
    };
    Some(Value::floating(value.scalar(), result))
}

fn sign(value: Value) -> Option<Value> {
    let scalar = value.scalar();
    if scalar.is_signed() {
        return Some(Value::integer(scalar, value.wide()?.signum()));
    }
    rounded("sign", value)
}

pub fn fold_builtin(name: &str, arguments: &[Constant]) -> Option<Constant> {
    let length = arguments
        .iter()
        .map(|argument| argument.values.len())
        .max()?;
    let pick = |argument: usize, index: usize| -> Option<Value> {
        let constant = arguments.get(argument)?;
        match constant.values.as_slice() {
            [single] => Some(*single),
            values => values.get(index).copied(),
        }
    };
    let values = (0..length)
        .map(|index| match (name, arguments.len()) {
            ("abs", 1) => absolute(pick(0, index)?),
            ("sign", 1) => sign(pick(0, index)?),
            ("floor" | "ceil" | "trunc", 1) => rounded(name, pick(0, index)?),
            ("min", 2) => smaller(pick(0, index)?, pick(1, index)?),
            ("max", 2) => larger(pick(0, index)?, pick(1, index)?),
            ("clamp", 3) => smaller(larger(pick(0, index)?, pick(1, index)?)?, pick(2, index)?),
            _ => None,
        })
        .collect::<Option<Vec<_>>>()?;
    Some(Constant::new(values))
}
