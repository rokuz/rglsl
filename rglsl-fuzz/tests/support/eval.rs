use std::collections::BTreeMap;

use rglsl_fuzz::ast::{
    BasicType, BinaryOperator, Expression, ExpressionKind, FunctionIdentifier, NumericKind,
    ScalarType, TypeSpecifierNonArray, UnaryOperator,
};
use rglsl_fuzz::basic;

use super::TestResult;

#[derive(Debug, Clone, PartialEq)]
pub struct Value {
    pub scalar: ScalarType,
    pub columns: u32,
    pub rows: u32,
    pub data: Vec<f64>,
}

impl Value {
    pub fn new(ty: BasicType, data: Vec<f64>) -> Self {
        let (columns, rows) = match ty {
            BasicType::Matrix { .. } => (basic::columns(ty), basic::rows(ty)),
            _ => (1, basic::columns(ty)),
        };
        Self {
            scalar: basic::element(ty),
            columns,
            rows,
            data,
        }
    }

    pub fn scalar(scalar: ScalarType, value: f64) -> Self {
        Self {
            scalar,
            columns: 1,
            rows: 1,
            data: vec![value],
        }
    }

    fn is_matrix(&self) -> bool {
        self.columns > 1
    }

    fn with_data(&self, data: Vec<f64>) -> Self {
        Self {
            data,
            ..self.clone()
        }
    }

    fn get(&self, index: usize) -> f64 {
        if self.data.len() == 1 {
            self.data[0]
        } else {
            self.data[index]
        }
    }

    pub fn approx_eq(&self, other: &Self) -> bool {
        self.data.len() == other.data.len()
            && self
                .data
                .iter()
                .zip(&other.data)
                .all(|(a, b)| (a - b).abs() <= 1e-4 * (1.0 + a.abs().max(b.abs())))
    }
}

fn wrap(scalar: ScalarType, value: f64) -> f64 {
    match scalar {
        ScalarType::Int => f64::from((value as i64) as i32),
        ScalarType::Uint => f64::from((value as i64) as u32),
        ScalarType::Bool => f64::from(u8::from(value != 0.0)),
        ScalarType::Float | ScalarType::Double => value,
        other => panic!("the fuzzer does not generate {other:?}"),
    }
}

fn convert(value: f64, from: ScalarType, to: ScalarType) -> f64 {
    match to {
        ScalarType::Bool => f64::from(u8::from(value != 0.0)),
        ScalarType::Int if from == ScalarType::Uint => f64::from(value as u32 as i32),
        ScalarType::Uint if from == ScalarType::Int => f64::from(value as i32 as u32),
        ScalarType::Int | ScalarType::Uint => wrap(to, value.trunc()),
        ScalarType::Float | ScalarType::Double => value,
        other => panic!("the fuzzer does not generate {other:?}"),
    }
}

#[derive(Debug, Default)]
pub struct Evaluator {
    pub variables: BTreeMap<String, Value>,
    pub checked_identities: usize,
}

impl Evaluator {
    pub fn with_injection_switch() -> Self {
        let mut evaluator = Self::default();
        evaluator.variables.insert(
            String::from("injectionSwitch"),
            Value::new(basic::VEC2, vec![0.0, 1.0]),
        );
        evaluator.variables.insert(
            String::from("gl_FragCoord"),
            Value::new(
                basic::vector(ScalarType::Float, 4),
                vec![0.5, 0.5, 0.0, 1.0],
            ),
        );
        evaluator
    }

    pub fn eval(&mut self, expression: &Expression) -> TestResult<Value> {
        Ok(match &expression.kind {
            ExpressionKind::Variable(name) => self
                .variables
                .get(name)
                .cloned()
                .ok_or_else(|| format!("unknown variable {name}"))?,
            ExpressionKind::Number(literal) => {
                let digits = literal.digits();
                match literal.kind {
                    NumericKind::Int => Value::scalar(ScalarType::Int, digits.parse()?),
                    NumericKind::Uint => Value::scalar(ScalarType::Uint, digits.parse()?),
                    NumericKind::Float | NumericKind::Double => {
                        Value::scalar(ScalarType::Float, digits.parse()?)
                    }
                    other => panic!("the fuzzer does not generate {other:?} literals"),
                }
            }
            ExpressionKind::Bool(value) => {
                Value::scalar(ScalarType::Bool, f64::from(u8::from(*value)))
            }
            ExpressionKind::String(value) => panic!("cannot evaluate the string {value:?}"),
            ExpressionKind::Parenthesized(inner) => self.eval(inner)?,
            ExpressionKind::FieldSelection { base, field } => {
                let base = self.eval(base)?;
                let data: Vec<f64> = field
                    .node
                    .chars()
                    .map(|component| {
                        let index = "xyzw"
                            .find(component)
                            .or_else(|| "rgba".find(component))
                            .or_else(|| "stpq".find(component))
                            .ok_or_else(|| format!("{component} is not a swizzle component"))?;
                        Ok::<f64, String>(base.data[index])
                    })
                    .collect::<Result<_, _>>()?;
                let rows = u32::try_from(data.len())?;
                Value {
                    scalar: base.scalar,
                    columns: 1,
                    rows,
                    data,
                }
            }
            ExpressionKind::Subscript { base, index } => {
                let base = self.eval(base)?;
                let index = self.eval(index)?.data[0] as usize;
                if base.is_matrix() {
                    let rows = base.rows as usize;
                    Value {
                        scalar: base.scalar,
                        columns: 1,
                        rows: base.rows,
                        data: base.data[index * rows..(index + 1) * rows].to_vec(),
                    }
                } else {
                    Value::scalar(base.scalar, base.data[index])
                }
            }
            ExpressionKind::FunctionCall(call) => match &call.function.node {
                FunctionIdentifier::Constructor(specifier) => {
                    let TypeSpecifierNonArray::Basic(ty) = specifier.non_array else {
                        panic!("unsupported constructor");
                    };
                    let arguments: Vec<Value> = call
                        .arguments
                        .iter()
                        .map(|a| self.eval(a))
                        .collect::<TestResult<_>>()?;
                    construct(ty, &arguments)
                }
                FunctionIdentifier::Function(name) => self.call(name, &call.arguments)?,
                _ => panic!("unsupported call"),
            },
            ExpressionKind::Unary { operator, operand } => {
                let value = self.eval(operand)?;
                let scalar = value.scalar;
                let data = value
                    .data
                    .iter()
                    .map(|x| match operator {
                        UnaryOperator::Minus => wrap(scalar, -x),
                        UnaryOperator::Plus => *x,
                        UnaryOperator::LogicalNot => f64::from(u8::from(*x == 0.0)),
                        UnaryOperator::BitNot => match scalar {
                            ScalarType::Uint => f64::from(!(*x as u32)),
                            _ => f64::from(!(*x as i32)),
                        },
                        _ => panic!("side effect"),
                    })
                    .collect();
                value.with_data(data)
            }
            ExpressionKind::Binary {
                operator,
                left,
                right,
            } => match operator {
                BinaryOperator::LogicalAnd => {
                    let left = self.eval(left)?;
                    if left.data[0] == 0.0 {
                        left
                    } else {
                        self.eval(right)?
                    }
                }
                BinaryOperator::LogicalOr => {
                    let left = self.eval(left)?;
                    if left.data[0] != 0.0 {
                        left
                    } else {
                        self.eval(right)?
                    }
                }
                _ => {
                    let left = self.eval(left)?;
                    let right = self.eval(right)?;
                    binary(*operator, &left, &right)?
                }
            },
            ExpressionKind::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                if self.eval(condition)?.data[0] != 0.0 {
                    self.eval(then_expression)?
                } else {
                    self.eval(else_expression)?
                }
            }
            ExpressionKind::Sequence(expressions) => {
                let mut last = None;
                for expression in expressions {
                    last = Some(self.eval(expression)?);
                }
                last.ok_or("an empty sequence")?
            }
            ExpressionKind::Postfix { .. } | ExpressionKind::Assignment { .. } => {
                panic!("side effect")
            }
        })
    }

    fn call(&mut self, name: &str, arguments: &[Expression]) -> TestResult<Value> {
        Ok(match name {
            "_GLF_IDENTITY" | "_GLF_ZERO" | "_GLF_ONE" | "_GLF_TRUE" | "_GLF_FALSE" => {
                let recorded = self.eval(&arguments[0])?;
                let value = self.eval(&arguments[1])?;
                assert!(
                    recorded.approx_eq(&value),
                    "{name}: {recorded:?} differs from {value:?} in {}",
                    arguments[1]
                );
                self.checked_identities += 1;
                value
            }
            "_GLF_FUZZED" | "_GLF_DEAD" => self.eval(&arguments[0])?,
            _ => {
                let values: Vec<Value> = arguments
                    .iter()
                    .map(|a| self.eval(a))
                    .collect::<TestResult<_>>()?;
                builtin(name, &values)
            }
        })
    }
}

fn construct(ty: BasicType, arguments: &[Value]) -> Value {
    let target = basic::element(ty);
    let count = basic::num_elements(ty) as usize;
    let mut result = Value::new(ty, vec![0.0; count]);
    if basic::is_matrix(ty) {
        if let [single] = arguments {
            if single.data.len() == 1 {
                for column in 0..result.columns as usize {
                    for row in 0..result.rows as usize {
                        result.data[column * result.rows as usize + row] =
                            if column == row { single.data[0] } else { 0.0 };
                    }
                }
                return result;
            }
            if single.is_matrix() {
                for column in 0..result.columns as usize {
                    for row in 0..result.rows as usize {
                        let value =
                            if column < single.columns as usize && row < single.rows as usize {
                                single.data[column * single.rows as usize + row]
                            } else if column == row {
                                1.0
                            } else {
                                0.0
                            };
                        result.data[column * result.rows as usize + row] = value;
                    }
                }
                return result;
            }
        }
    }
    let flattened: Vec<f64> = arguments
        .iter()
        .flat_map(|argument| {
            argument
                .data
                .iter()
                .map(move |x| convert(*x, argument.scalar, target))
        })
        .collect();
    if flattened.len() == 1 && count > 1 {
        result.data = vec![flattened[0]; count];
    } else {
        assert!(flattened.len() >= count, "too few constructor components");
        result.data = flattened[..count].to_vec();
    }
    result
}

fn integer_op(operator: BinaryOperator, scalar: ScalarType, a: f64, b: f64) -> f64 {
    if scalar == ScalarType::Uint {
        let (a, b) = (a as u32, b as u32);
        f64::from(match operator {
            BinaryOperator::Add => a.wrapping_add(b),
            BinaryOperator::Subtract => a.wrapping_sub(b),
            BinaryOperator::Multiply => a.wrapping_mul(b),
            BinaryOperator::Divide => a.checked_div(b).unwrap_or(0),
            BinaryOperator::Modulo => a.checked_rem(b).unwrap_or(0),
            BinaryOperator::BitAnd => a & b,
            BinaryOperator::BitOr => a | b,
            BinaryOperator::BitXor => a ^ b,
            BinaryOperator::ShiftLeft => a.wrapping_shl(b),
            BinaryOperator::ShiftRight => a.wrapping_shr(b),
            _ => unreachable!(),
        })
    } else {
        let (a, b) = (a as i32, b as i32);
        f64::from(match operator {
            BinaryOperator::Add => a.wrapping_add(b),
            BinaryOperator::Subtract => a.wrapping_sub(b),
            BinaryOperator::Multiply => a.wrapping_mul(b),
            BinaryOperator::Divide => a.checked_div(b).unwrap_or(0),
            BinaryOperator::Modulo => a.checked_rem(b).unwrap_or(0),
            BinaryOperator::BitAnd => a & b,
            BinaryOperator::BitOr => a | b,
            BinaryOperator::BitXor => a ^ b,
            BinaryOperator::ShiftLeft => a.wrapping_shl(b as u32),
            BinaryOperator::ShiftRight => a.wrapping_shr(b as u32),
            _ => unreachable!(),
        })
    }
}

fn binary(operator: BinaryOperator, left: &Value, right: &Value) -> TestResult<Value> {
    let boolean = |value: bool| Value::scalar(ScalarType::Bool, f64::from(u8::from(value)));
    match operator {
        BinaryOperator::Equal => return Ok(boolean(left.approx_eq(right))),
        BinaryOperator::NotEqual => return Ok(boolean(!left.approx_eq(right))),
        BinaryOperator::Less => return Ok(boolean(left.data[0] < right.data[0])),
        BinaryOperator::Greater => return Ok(boolean(left.data[0] > right.data[0])),
        BinaryOperator::LessEqual => return Ok(boolean(left.data[0] <= right.data[0])),
        BinaryOperator::GreaterEqual => return Ok(boolean(left.data[0] >= right.data[0])),
        BinaryOperator::LogicalXor => {
            return Ok(boolean((left.data[0] != 0.0) != (right.data[0] != 0.0)))
        }
        _ => {}
    }
    if operator == BinaryOperator::Multiply
        && (left.is_matrix() || right.is_matrix())
        && left.data.len() > 1
        && right.data.len() > 1
    {
        return linear_product(left, right);
    }
    let shape = if left.data.len() >= right.data.len()
        || operator == BinaryOperator::ShiftLeft
        || operator == BinaryOperator::ShiftRight
    {
        left
    } else {
        right
    };
    let scalar = left.scalar;
    let data = (0..shape.data.len())
        .map(|index| {
            let (a, b) = (left.get(index), right.get(index));
            if scalar == ScalarType::Float {
                match operator {
                    BinaryOperator::Add => a + b,
                    BinaryOperator::Subtract => a - b,
                    BinaryOperator::Multiply => a * b,
                    BinaryOperator::Divide => a / b,
                    _ => panic!("unsupported float operator {operator:?}"),
                }
            } else {
                integer_op(operator, scalar, a, b)
            }
        })
        .collect();
    Ok(shape.with_data(data))
}

fn linear_product(left: &Value, right: &Value) -> TestResult<Value> {
    let (left_columns, left_rows) = if left.is_matrix() {
        (left.columns as usize, left.rows as usize)
    } else {
        (left.rows as usize, 1)
    };
    let (right_columns, right_rows) = if right.is_matrix() {
        (right.columns as usize, right.rows as usize)
    } else {
        (1, right.rows as usize)
    };
    assert_eq!(left_columns, right_rows);
    let at = |value: &Value, rows: usize, column: usize, row: usize| {
        if value.is_matrix() {
            value.data[column * rows + row]
        } else {
            value.data[column.max(row)]
        }
    };
    let mut data = Vec::new();
    for column in 0..right_columns {
        for row in 0..left_rows {
            let mut sum = 0.0;
            for k in 0..left_columns {
                sum += at(left, left_rows, k, row) * at(right, right_rows, column, k);
            }
            data.push(sum);
        }
    }
    Ok(if left.is_matrix() && right.is_matrix() {
        Value {
            scalar: ScalarType::Float,
            columns: u32::try_from(right_columns)?,
            rows: u32::try_from(left_rows)?,
            data,
        }
    } else {
        let rows = u32::try_from(data.len())?;
        Value {
            scalar: ScalarType::Float,
            columns: 1,
            rows,
            data,
        }
    })
}

fn determinant(data: &[f64], size: usize) -> f64 {
    if size == 1 {
        return data[0];
    }
    let mut total = 0.0;
    for column in 0..size {
        let mut minor = Vec::new();
        for c in 0..size {
            if c == column {
                continue;
            }
            for r in 1..size {
                minor.push(data[c * size + r]);
            }
        }
        let sign = if column % 2 == 0 { 1.0 } else { -1.0 };
        total += sign * data[column * size] * determinant(&minor, size - 1);
    }
    total
}

fn builtin(name: &str, values: &[Value]) -> Value {
    let first = &values[0];
    let map = |f: fn(f64) -> f64| first.with_data(first.data.iter().map(|x| f(*x)).collect());
    let float = |x: f64| Value::scalar(ScalarType::Float, x);
    match name {
        "sqrt" => map(f64::sqrt),
        "abs" => map(f64::abs),
        "sin" => map(f64::sin),
        "cos" => map(f64::cos),
        "tan" => map(f64::tan),
        "exp" => map(f64::exp),
        "log" => map(f64::ln),
        "round" => map(f64::round),
        "dot" => float(
            first
                .data
                .iter()
                .zip(&values[1].data)
                .map(|(a, b)| a * b)
                .sum(),
        ),
        "length" => float(first.data.iter().map(|a| a * a).sum::<f64>().sqrt()),
        "normalize" => {
            let length = first.data.iter().map(|a| a * a).sum::<f64>().sqrt();
            first.with_data(first.data.iter().map(|a| a / length).collect())
        }
        "cross" => {
            let (a, b) = (&first.data, &values[1].data);
            first.with_data(vec![
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0],
            ])
        }
        "determinant" => float(determinant(&first.data, first.columns as usize)),
        "transpose" => {
            let (columns, rows) = (first.columns as usize, first.rows as usize);
            let mut data = vec![0.0; columns * rows];
            for column in 0..columns {
                for row in 0..rows {
                    data[row * columns + column] = first.data[column * rows + row];
                }
            }
            Value {
                scalar: first.scalar,
                columns: first.rows,
                rows: first.columns,
                data,
            }
        }
        "min" | "max" | "clamp" => {
            let data = (0..first.data.len())
                .map(|index| {
                    let a = first.get(index);
                    let b = values[1].get(index);
                    match name {
                        "min" => a.min(b),
                        "max" => a.max(b),
                        _ => a.max(b).min(values[2].get(index)),
                    }
                })
                .collect();
            first.with_data(data)
        }
        "mix" => {
            let data = (0..first.data.len())
                .map(|index| {
                    let (x, y, a) = (first.get(index), values[1].get(index), values[2].get(index));
                    if values[2].scalar == ScalarType::Bool {
                        if a != 0.0 {
                            y
                        } else {
                            x
                        }
                    } else {
                        x * (1.0 - a) + y * a
                    }
                })
                .collect();
            first.with_data(data)
        }
        _ => panic!("unsupported builtin {name}"),
    }
}
