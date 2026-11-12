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
    BFloat16(f64),
    FloatE4M3(f64),
    FloatE5M2(f64),
    FloatE2M1(f64),
    FloatE3M2(f64),
    FloatE2M3(f64),
    FloatUE8M0(f64),
    FloatMXINT8(f64),
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
            Self::BFloat16(_) => Scalar::BFloat16,
            Self::FloatE4M3(_) => Scalar::FloatE4M3,
            Self::FloatE5M2(_) => Scalar::FloatE5M2,
            Self::FloatE2M1(_) => Scalar::FloatE2M1,
            Self::FloatE3M2(_) => Scalar::FloatE3M2,
            Self::FloatE2M3(_) => Scalar::FloatE2M3,
            Self::FloatUE8M0(_) => Scalar::FloatUE8M0,
            Self::FloatMXINT8(_) => Scalar::FloatMXINT8,
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
            Scalar::Float
            | Scalar::Double
            | Scalar::Float16
            | Scalar::BFloat16
            | Scalar::FloatE4M3
            | Scalar::FloatE5M2
            | Scalar::FloatE2M1
            | Scalar::FloatE3M2
            | Scalar::FloatE2M3
            | Scalar::FloatUE8M0
            | Scalar::FloatMXINT8 => Self::floating(scalar, wide as f64),
        }
    }

    pub fn floating(scalar: Scalar, value: f64) -> Self {
        match scalar {
            Scalar::Float => Self::Float(value),
            Scalar::Double => Self::Double(value),
            Scalar::Float16 => Self::Float16(value),
            Scalar::BFloat16 => Self::BFloat16(value),
            Scalar::FloatE4M3 => Self::FloatE4M3(value),
            Scalar::FloatE5M2 => Self::FloatE5M2(value),
            Scalar::FloatE2M1 => Self::FloatE2M1(value),
            Scalar::FloatE3M2 => Self::FloatE3M2(value),
            Scalar::FloatE2M3 => Self::FloatE2M3(value),
            Scalar::FloatUE8M0 => Self::FloatUE8M0(value),
            Scalar::FloatMXINT8 => Self::FloatMXINT8(value),
            _ => Self::truncated(scalar, value),
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
            Self::Float(value)
            | Self::Double(value)
            | Self::Float16(value)
            | Self::BFloat16(value)
            | Self::FloatE4M3(value)
            | Self::FloatE5M2(value)
            | Self::FloatE2M1(value)
            | Self::FloatE3M2(value)
            | Self::FloatE2M3(value)
            | Self::FloatUE8M0(value)
            | Self::FloatMXINT8(value) => Some(value),
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
            Self::Float(value)
            | Self::Double(value)
            | Self::Float16(value)
            | Self::BFloat16(value)
            | Self::FloatE4M3(value)
            | Self::FloatE5M2(value)
            | Self::FloatE2M1(value)
            | Self::FloatE3M2(value)
            | Self::FloatE2M3(value)
            | Self::FloatUE8M0(value)
            | Self::FloatMXINT8(value) => value,
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
        if target.is_floating() || target.is_encoded_float() {
            return Self::floating(target, self.as_f64());
        }
        match (self, self.float()) {
            (Self::Bool(value), _) => Self::integer(target, i128::from(value)),
            (_, Some(value)) => Self::truncated(target, value),
            (other, None) => Self::integer(target, other.wide().unwrap_or(0)),
        }
    }

    fn truncated(target: Scalar, value: f64) -> Self {
        match target {
            Scalar::Int => Self::Int(value as i32),
            Scalar::Uint => Self::Uint(value as u32),
            Scalar::Int64 => Self::Int64(value as i64),
            Scalar::Uint64 => Self::Uint64(value as u64),
            _ => Self::integer(target, i128::from(value as i32)),
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
        BinaryOperator::Divide if right == 0 => wrap(division_by_zero(scalar)),
        BinaryOperator::Divide => wrap(left.checked_div(right)?),
        BinaryOperator::Modulo if right == 0 => wrap(left),
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

const fn division_by_zero(scalar: Scalar) -> i128 {
    if scalar.is_signed() {
        (1_i128 << (scalar.bits() - 1)) - 1
    } else {
        -1
    }
}

fn fold_shift(operator: BinaryOperator, left: Value, right: Value) -> Option<Value> {
    let scalar = left.scalar();
    let value = left.wide()?;
    let promoted = scalar.bits().max(32);
    let amount = u32::try_from(right.wide()?.rem_euclid(i128::from(promoted))).ok()?;
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
        BinaryOperator::Divide => wrap(divided(left, right)),
        BinaryOperator::Less => Value::Bool(left < right),
        BinaryOperator::Greater => Value::Bool(left > right),
        BinaryOperator::LessEqual => {
            Value::Bool(left.partial_cmp(&right) != Some(core::cmp::Ordering::Greater))
        }
        BinaryOperator::GreaterEqual => {
            Value::Bool(left.partial_cmp(&right) != Some(core::cmp::Ordering::Less))
        }
        _ => return None,
    })
}

fn divided(left: f64, right: f64) -> f64 {
    if right != 0.0 {
        left / right
    } else if left > 0.0 {
        f64::INFINITY
    } else if left < 0.0 {
        f64::NEG_INFINITY
    } else {
        f64::NAN
    }
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

fn less(left: Value, right: Value) -> Option<bool> {
    if left.scalar() != right.scalar() {
        return None;
    }
    match (left.wide(), right.wide()) {
        (Some(left), Some(right)) => Some(left < right),
        _ => Some(left.float()? < right.float()?),
    }
}

fn smaller(left: Value, right: Value) -> Option<Value> {
    Some(if less(right, left)? { right } else { left })
}

fn larger(left: Value, right: Value) -> Option<Value> {
    Some(if less(left, right)? { right } else { left })
}

fn equal(left: Value, right: Value) -> Option<bool> {
    if left.scalar() != right.scalar() {
        return None;
    }
    match (left, right) {
        (Value::Bool(left), Value::Bool(right)) => Some(left == right),
        _ => match (left.wide(), right.wide()) {
            (Some(left), Some(right)) => Some(left == right),
            _ => Some(left.float()? == right.float()?),
        },
    }
}

fn absolute(value: Value) -> Option<Value> {
    Some(match value {
        Value::Int(number) => Value::Int(number.wrapping_abs()),
        other if other.float().is_some() => Value::floating(other.scalar(), other.float()?.abs()),
        other => other,
    })
}

fn sign(value: Value) -> Option<Value> {
    let scalar = value.scalar();
    if let Some(number) = value.float() {
        let sign = if number == 0.0 {
            0.0
        } else if number < 0.0 {
            -1.0
        } else {
            1.0
        };
        return Some(Value::floating(scalar, sign));
    }
    Some(Value::integer(scalar, value.wide()?.signum()))
}

fn round_even(value: f64) -> f64 {
    let floor = libm::floor(value);
    let even = floor / 2.0 == libm::floor(floor / 2.0);
    if even {
        libm::ceil(value - 0.5)
    } else {
        libm::floor(value + 0.5)
    }
}

fn unary_float(name: &str, value: f64) -> Option<f64> {
    use core::f64::consts::PI;
    Some(match name {
        "radians" => value * PI / 180.0,
        "degrees" => value * 180.0 / PI,
        "sin" => libm::sin(value),
        "cos" => libm::cos(value),
        "tan" => libm::tan(value),
        "asin" => libm::asin(value),
        "acos" => libm::acos(value),
        "atan" => libm::atan(value),
        "sinh" => libm::sinh(value),
        "cosh" => libm::cosh(value),
        "tanh" => libm::tanh(value),
        "asinh" => libm::asinh(value),
        "acosh" => libm::acosh(value),
        "atanh" => libm::atanh(value),
        "dFdx" | "dFdy" | "fwidth" | "dFdxFine" | "dFdyFine" | "fwidthFine" | "dFdxCoarse"
        | "dFdyCoarse" | "fwidthCoarse" => 0.0,
        "exp" => libm::exp(value),
        "log" => libm::log(value),
        "exp2" => libm::exp2(value),
        "log2" => libm::log2(value),
        "sqrt" => libm::sqrt(value),
        "inversesqrt" => 1.0 / libm::sqrt(value),
        "floor" => libm::floor(value),
        "ceil" => libm::ceil(value),
        "trunc" if value > 0.0 => libm::floor(value),
        "trunc" => libm::ceil(value),
        "round" => libm::floor(0.5 + value),
        "roundEven" => round_even(value),
        "fract" => value - libm::floor(value),
        _ => return None,
    })
}

fn bits(name: &str, value: Value) -> Option<Value> {
    Some(match name {
        "floatBitsToInt" => Value::Int((value.float()? as f32).to_bits() as i32),
        "floatBitsToUint" => Value::Uint((value.float()? as f32).to_bits()),
        "intBitsToFloat" => match value {
            Value::Int(bits) => Value::Float(f64::from(f32::from_bits(bits as u32))),
            _ => return None,
        },
        "uintBitsToFloat" => match value {
            Value::Uint(bits) => Value::Float(f64::from(f32::from_bits(bits))),
            _ => return None,
        },
        _ => return None,
    })
}

fn smooth(edge0: f64, edge1: f64, value: f64) -> f64 {
    let t = ((value - edge0) / (edge1 - edge0)).clamp(0.0, 1.0);
    t * t * (3.0 - 2.0 * t)
}

fn componentwise(name: &str, result: Scalar, arguments: &[Value]) -> Option<Value> {
    let float = |index: usize| arguments.get(index).and_then(|value| value.float());
    let value = |index: usize| arguments.get(index).copied();
    let floating = |number: f64| Some(Value::floating(result, number));
    match (name, arguments.len()) {
        ("abs", 1) => absolute(value(0)?),
        ("sign", 1) => sign(value(0)?),
        ("isnan", 1) => Some(Value::Bool(float(0)?.is_nan())),
        ("isinf", 1) => Some(Value::Bool(float(0)?.is_infinite())),
        ("not", 1) => Some(Value::Bool(!value(0)?.as_bool()?)),
        ("floatBitsToInt" | "floatBitsToUint" | "intBitsToFloat" | "uintBitsToFloat", 1) => {
            bits(name, value(0)?)
        }
        (_, 1) => floating(unary_float(name, float(0)?)?),
        ("atan", 2) => floating(libm::atan2(float(0)?, float(1)?)),
        ("pow", 2) => floating(libm::pow(float(0)?, float(1)?)),
        ("mod", 2) => {
            let (left, right) = (float(0)?, float(1)?);
            floating(left - right * libm::floor(left / right))
        }
        ("min", 2) => smaller(value(0)?, value(1)?),
        ("max", 2) => larger(value(0)?, value(1)?),
        ("clamp", 3) => smaller(larger(value(0)?, value(1)?)?, value(2)?),
        ("lessThan", 2) => less(value(0)?, value(1)?).map(Value::Bool),
        ("greaterThan", 2) => less(value(1)?, value(0)?).map(Value::Bool),
        ("lessThanEqual", 2) => less(value(1)?, value(0)?).map(|greater| Value::Bool(!greater)),
        ("greaterThanEqual", 2) => less(value(0)?, value(1)?).map(|less| Value::Bool(!less)),
        ("equal", 2) => equal(value(0)?, value(1)?).map(Value::Bool),
        ("notEqual", 2) => equal(value(0)?, value(1)?).map(|equal| Value::Bool(!equal)),
        ("mix", 3) => match value(2)? {
            Value::Bool(select) => floating(if select { float(1)? } else { float(0)? }),
            _ => {
                let (left, right, weight) = (float(0)?, float(1)?, float(2)?);
                floating(left * (1.0 - weight) + right * weight)
            }
        },
        ("step", 2) => floating(if float(1)? < float(0)? { 0.0 } else { 1.0 }),
        ("smoothstep", 3) => floating(smooth(float(0)?, float(1)?, float(2)?)),
        ("matrixCompMult", 2) => floating(float(0)? * float(1)?),
        _ => None,
    }
}

fn floats(constant: &Constant) -> Option<Vec<f64>> {
    constant.values.iter().map(|value| value.float()).collect()
}

fn dot(left: &[f64], right: &[f64]) -> f64 {
    left.iter()
        .zip(right)
        .fold(0.0, |sum, (left, right)| sum + left * right)
}

fn geometric(name: &str, result: Scalar, arguments: &[Constant]) -> Option<Vec<Value>> {
    let float = |index: usize| arguments.get(index).and_then(floats);
    let wrap = |numbers: Vec<f64>| {
        numbers
            .into_iter()
            .map(|number| Value::floating(result, number))
            .collect::<Vec<_>>()
    };
    let booleans = |index: usize| -> Option<Vec<bool>> {
        arguments
            .get(index)?
            .values
            .iter()
            .map(|value| value.as_bool())
            .collect()
    };
    Some(match name {
        "length" => {
            let vector = float(0)?;
            wrap(alloc::vec![libm::sqrt(dot(&vector, &vector))])
        }
        "normalize" => {
            let vector = float(0)?;
            let length = libm::sqrt(dot(&vector, &vector));
            wrap(vector.iter().map(|component| component / length).collect())
        }
        "distance" => {
            let (from, to) = (float(0)?, float(1)?);
            let sum = from
                .iter()
                .zip(&to)
                .fold(0.0, |sum, (from, to)| sum + (to - from) * (to - from));
            wrap(alloc::vec![libm::sqrt(sum)])
        }
        "dot" => wrap(alloc::vec![dot(&float(0)?, &float(1)?)]),
        "cross" => {
            let (a, b) = (float(0)?, float(1)?);
            let (&[a0, a1, a2], &[b0, b1, b2]) = (a.as_slice(), b.as_slice()) else {
                return None;
            };
            wrap(alloc::vec![
                a1 * b2 - a2 * b1,
                a2 * b0 - a0 * b2,
                a0 * b1 - a1 * b0
            ])
        }
        "faceforward" => {
            let (normal, incident, reference) = (float(0)?, float(1)?, float(2)?);
            let facing = dot(&incident, &reference) < 0.0;
            wrap(
                normal
                    .iter()
                    .map(|&component| if facing { component } else { -component })
                    .collect(),
            )
        }
        "reflect" => {
            let (incident, normal) = (float(0)?, float(1)?);
            let twice = dot(&incident, &normal) * 2.0;
            wrap(
                incident
                    .iter()
                    .zip(&normal)
                    .map(|(incident, normal)| incident - twice * normal)
                    .collect(),
            )
        }
        "refract" => {
            let (incident, normal) = (float(0)?, float(1)?);
            let eta = *float(2)?.first()?;
            let cosine = dot(&incident, &normal);
            let k = 1.0 - eta * eta * (1.0 - cosine * cosine);
            wrap(if k < 0.0 {
                alloc::vec![0.0; incident.len()]
            } else {
                incident
                    .iter()
                    .zip(&normal)
                    .map(|(incident, normal)| {
                        eta * incident - (eta * cosine + libm::sqrt(k)) * normal
                    })
                    .collect()
            })
        }
        "outerProduct" => {
            let (column, row) = (float(0)?, float(1)?);
            wrap(
                row.iter()
                    .flat_map(|right| column.iter().map(move |left| left * right))
                    .collect(),
            )
        }
        "any" => alloc::vec![Value::Bool(booleans(0)?.into_iter().any(|value| value))],
        "all" => alloc::vec![Value::Bool(booleans(0)?.into_iter().all(|value| value))],
        _ => return None,
    })
}

pub fn fold_builtin(name: &str, arguments: &[Constant], result: Scalar) -> Option<Constant> {
    if let Some(values) = geometric(name, result, arguments) {
        return Some(Constant::new(values));
    }
    let length = arguments
        .iter()
        .map(|argument| argument.values.len())
        .max()?;
    let pick = |argument: &Constant, index: usize| -> Option<Value> {
        match argument.values.as_slice() {
            [single] => Some(*single),
            values => values.get(index).copied(),
        }
    };
    let values = (0..length)
        .map(|index| {
            let components = arguments
                .iter()
                .map(|argument| pick(argument, index))
                .collect::<Option<Vec<_>>>()?;
            componentwise(name, result, &components)
        })
        .collect::<Option<Vec<_>>>()?;
    Some(Constant::new(values))
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Linear {
    Vector(usize),
    Matrix { columns: usize, rows: usize },
}

fn total(mut terms: impl Iterator<Item = Option<f64>>) -> Option<f64> {
    terms.try_fold(0.0, |sum, term| Some(sum + term?))
}

pub fn fold_linear(
    left: &Constant,
    left_shape: Linear,
    right: &Constant,
    right_shape: Linear,
) -> Option<Constant> {
    let result = left.first()?.scalar();
    let (a, b) = (floats(left)?, floats(right)?);
    let at = |values: &[f64], index: usize| values.get(index).copied();
    let mut values = Vec::new();
    match (left_shape, right_shape) {
        (
            Linear::Matrix { rows, .. },
            Linear::Matrix {
                columns: right_columns,
                rows: inner,
            },
        ) => {
            for column in 0..right_columns {
                for row in 0..rows {
                    values.push(total((0..inner).map(|i| {
                        Some(at(&a, i * rows + row)? * at(&b, column * inner + i)?)
                    }))?);
                }
            }
        }
        (Linear::Matrix { rows, .. }, Linear::Vector(inner)) => {
            for row in 0..rows {
                values.push(total(
                    (0..inner).map(|j| Some(at(&a, j * rows + row)? * at(&b, j)?)),
                )?);
            }
        }
        (Linear::Vector(inner), Linear::Matrix { columns, rows }) => {
            for column in 0..columns {
                values.push(total(
                    (0..inner).map(|j| Some(at(&a, j)? * at(&b, column * rows + j)?)),
                )?);
            }
        }
        (Linear::Vector(_), Linear::Vector(_)) => return None,
    }
    Some(Constant::new(
        values
            .into_iter()
            .map(|number| Value::floating(result, number))
            .collect(),
    ))
}
