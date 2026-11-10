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
}

impl Value {
    pub const fn scalar(self) -> Scalar {
        match self {
            Self::Bool(_) => Scalar::Bool,
            Self::Int(_) => Scalar::Int,
            Self::Uint(_) => Scalar::Uint,
            Self::Float(_) => Scalar::Float,
            Self::Double(_) => Scalar::Double,
        }
    }

    pub const fn zero(scalar: Scalar) -> Self {
        match scalar {
            Scalar::Bool => Self::Bool(false),
            Scalar::Int => Self::Int(0),
            Scalar::Uint => Self::Uint(0),
            Scalar::Float => Self::Float(0.0),
            Scalar::Double => Self::Double(0.0),
        }
    }

    pub const fn one(scalar: Scalar) -> Self {
        match scalar {
            Scalar::Bool => Self::Bool(true),
            Scalar::Int => Self::Int(1),
            Scalar::Uint => Self::Uint(1),
            Scalar::Float => Self::Float(1.0),
            Scalar::Double => Self::Double(1.0),
        }
    }

    pub const fn as_i64(self) -> Option<i64> {
        match self {
            Self::Int(value) => Some(value as i64),
            Self::Uint(value) => Some(value as i64),
            _ => None,
        }
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
            Self::Int(value) => f64::from(value),
            Self::Uint(value) => f64::from(value),
            Self::Float(value) | Self::Double(value) => value,
        }
    }

    pub fn convert(self, target: Scalar) -> Self {
        match target {
            Scalar::Bool => Self::Bool(match self {
                Self::Bool(value) => value,
                Self::Int(value) => value != 0,
                Self::Uint(value) => value != 0,
                Self::Float(value) | Self::Double(value) => value != 0.0,
            }),
            Scalar::Int => Self::Int(match self {
                Self::Bool(value) => i32::from(value),
                Self::Int(value) => value,
                Self::Uint(value) => value as i32,
                Self::Float(value) | Self::Double(value) => value as i32,
            }),
            Scalar::Uint => Self::Uint(match self {
                Self::Bool(value) => u32::from(value),
                Self::Int(value) => value as u32,
                Self::Uint(value) => value,
                Self::Float(value) | Self::Double(value) => {
                    if value < 0.0 {
                        (value as i64) as u32
                    } else {
                        value as u32
                    }
                }
            }),
            Scalar::Float => Self::Float(f64::from(self.as_f64() as f32)),
            Scalar::Double => Self::Double(self.as_f64()),
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
        .map(|value| match (operator, *value) {
            (UnaryOperator::Plus, value) => Some(value),
            (UnaryOperator::Minus, Value::Int(value)) => Some(Value::Int(value.wrapping_neg())),
            (UnaryOperator::Minus, Value::Uint(value)) => Some(Value::Uint(value.wrapping_neg())),
            (UnaryOperator::Minus, Value::Float(value)) => Some(Value::Float(-value)),
            (UnaryOperator::Minus, Value::Double(value)) => Some(Value::Double(-value)),
            (UnaryOperator::LogicalNot, Value::Bool(value)) => Some(Value::Bool(!value)),
            (UnaryOperator::BitNot, Value::Int(value)) => Some(Value::Int(!value)),
            (UnaryOperator::BitNot, Value::Uint(value)) => Some(Value::Uint(!value)),
            _ => None,
        })
        .collect::<Option<Vec<_>>>()?;
    Some(Constant::new(values))
}

fn fold_int(operator: BinaryOperator, left: i32, right: i32) -> Option<Value> {
    let shift = u32::try_from(right).ok();
    Some(match operator {
        BinaryOperator::Add => Value::Int(left.wrapping_add(right)),
        BinaryOperator::Subtract => Value::Int(left.wrapping_sub(right)),
        BinaryOperator::Multiply => Value::Int(left.wrapping_mul(right)),
        BinaryOperator::Divide => Value::Int(left.checked_div(right)?),
        BinaryOperator::Modulo => Value::Int(left.checked_rem(right)?),
        BinaryOperator::ShiftLeft => Value::Int(left.checked_shl(shift?)?),
        BinaryOperator::ShiftRight => Value::Int(left.checked_shr(shift?)?),
        BinaryOperator::BitAnd => Value::Int(left & right),
        BinaryOperator::BitOr => Value::Int(left | right),
        BinaryOperator::BitXor => Value::Int(left ^ right),
        BinaryOperator::Less => Value::Bool(left < right),
        BinaryOperator::Greater => Value::Bool(left > right),
        BinaryOperator::LessEqual => Value::Bool(left <= right),
        BinaryOperator::GreaterEqual => Value::Bool(left >= right),
        _ => return None,
    })
}

fn fold_uint(operator: BinaryOperator, left: u32, right: u32) -> Option<Value> {
    Some(match operator {
        BinaryOperator::Add => Value::Uint(left.wrapping_add(right)),
        BinaryOperator::Subtract => Value::Uint(left.wrapping_sub(right)),
        BinaryOperator::Multiply => Value::Uint(left.wrapping_mul(right)),
        BinaryOperator::Divide => Value::Uint(left.checked_div(right)?),
        BinaryOperator::Modulo => Value::Uint(left.checked_rem(right)?),
        BinaryOperator::ShiftLeft => Value::Uint(left.checked_shl(right)?),
        BinaryOperator::ShiftRight => Value::Uint(left.checked_shr(right)?),
        BinaryOperator::BitAnd => Value::Uint(left & right),
        BinaryOperator::BitOr => Value::Uint(left | right),
        BinaryOperator::BitXor => Value::Uint(left ^ right),
        BinaryOperator::Less => Value::Bool(left < right),
        BinaryOperator::Greater => Value::Bool(left > right),
        BinaryOperator::LessEqual => Value::Bool(left <= right),
        BinaryOperator::GreaterEqual => Value::Bool(left >= right),
        _ => return None,
    })
}

fn fold_float(operator: BinaryOperator, left: f64, right: f64, double: bool) -> Option<Value> {
    let wrap = |value: f64| {
        if double {
            Value::Double(value)
        } else {
            Value::Float(value)
        }
    };
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
    match (left, right) {
        (Value::Int(left), Value::Int(right)) => fold_int(operator, left, right),
        (Value::Uint(left), Value::Uint(right)) => fold_uint(operator, left, right),
        (Value::Int(left), Value::Uint(right))
            if matches!(
                operator,
                BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight
            ) =>
        {
            fold_int(operator, left, i32::try_from(right).ok()?)
        }
        (Value::Uint(left), Value::Int(right))
            if matches!(
                operator,
                BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight
            ) =>
        {
            fold_uint(operator, left, u32::try_from(right).ok()?)
        }
        (Value::Float(left), Value::Float(right)) => fold_float(operator, left, right, false),
        (Value::Double(left), Value::Double(right)) => fold_float(operator, left, right, true),
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
    match (left, right) {
        (Value::Int(left), Value::Int(right)) => Some(left.cmp(&right)),
        (Value::Uint(left), Value::Uint(right)) => Some(left.cmp(&right)),
        (Value::Float(left), Value::Float(right)) | (Value::Double(left), Value::Double(right)) => {
            left.partial_cmp(&right)
        }
        _ => None,
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
    Some(match value {
        Value::Int(value) => Value::Int(value.wrapping_abs()),
        Value::Float(value) => Value::Float(if value < 0.0 { -value } else { value }),
        Value::Double(value) => Value::Double(if value < 0.0 { -value } else { value }),
        _ => return None,
    })
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
    let (number, double) = match value {
        Value::Float(number) => (number, false),
        Value::Double(number) => (number, true),
        _ => return None,
    };
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
    Some(if double {
        Value::Double(result)
    } else {
        Value::Float(result)
    })
}

fn sign(value: Value) -> Option<Value> {
    match value {
        Value::Int(number) => Some(Value::Int(number.signum())),
        other => rounded("sign", other),
    }
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
