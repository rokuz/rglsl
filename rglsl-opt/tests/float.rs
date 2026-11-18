use half::f16;
use rglsl::{BinaryOperator, Literal, MathFunction, RelationalFunction, UnaryOperator};
use rglsl_opt::float::{
    Class, Domain, Guard, IDENTITIES, INVOLUTIONS, Number, Operation, REASSOCIATIONS, RULES, Rule,
    admits, rule,
};

type TestResult = Result<(), Box<dyn std::error::Error>>;

const MIN_NORMAL_F32: f32 = f32::MIN_POSITIVE;
const DENORMAL_F32: f32 = f32::MIN_POSITIVE / 2.0;

fn find(operation: Operation, domain: Domain) -> Result<&'static Rule, String> {
    rule(operation, domain).ok_or_else(|| format!("no rule for {operation:?} on {domain:?}"))
}

fn numbers(literals: &[Literal]) -> Result<Vec<Number>, String> {
    literals
        .iter()
        .map(|&literal| Number::of(literal).ok_or_else(|| format!("{literal:?} is not a number")))
        .collect()
}

fn check(
    operation: Operation,
    operands: &[&[Literal]],
    result: &[Literal],
) -> Result<bool, String> {
    let first = operands
        .first()
        .and_then(|values| values.first())
        .ok_or("no operand")?;
    let domain = match operation {
        Operation::Extract | Operation::Select => Domain::Any,
        _ => Number::of(*first).ok_or("not a number")?.domain(),
    };
    let rule = find(operation, domain)?;
    let operands = operands
        .iter()
        .map(|values| numbers(values))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(admits(rule, operation, &operands, &numbers(result)?))
}

fn f32_binary(op: BinaryOperator, a: f32, b: f32) -> Result<bool, String> {
    let result = match op {
        BinaryOperator::Add => a + b,
        BinaryOperator::Subtract => a - b,
        BinaryOperator::Multiply => a * b,
        BinaryOperator::Divide => a / b,
        _ => return Err(format!("{op:?} is not arithmetic")),
    };
    check(
        Operation::Binary(op),
        &[&[Literal::F32(a)], &[Literal::F32(b)]],
        &[Literal::F32(result)],
    )
}

#[test]
fn every_row_has_a_reason_and_float_rows_without_a_guard_are_never() {
    for row in RULES {
        assert!(!row.reason.is_empty(), "{row:?}");
        assert_eq!(
            row.guard == Guard::Refused,
            row.class == Class::Never,
            "{row:?}"
        );
        assert_ne!(row.class, Class::VulkanPermitted, "{row:?}");
    }
}

#[test]
fn rows_are_unique() {
    for (index, row) in RULES.iter().enumerate() {
        for other in RULES.iter().skip(index + 1) {
            assert!(
                row.operation != other.operation || row.domain != other.domain,
                "{row:?} and {other:?}"
            );
        }
    }
}

#[test]
fn float_algebra_is_never_applied() {
    for identity in IDENTITIES {
        assert_eq!(
            identity.domain == Domain::Float,
            identity.class == Class::Never,
            "{identity:?}"
        );
        assert!(!identity.reason.is_empty());
    }
    for involution in INVOLUTIONS {
        assert_eq!(
            involution.domain == Domain::Float,
            involution.class == Class::Never,
            "{involution:?}"
        );
    }
    for reassociation in REASSOCIATIONS {
        assert_eq!(
            reassociation.domain == Domain::Float,
            reassociation.class == Class::Never,
            "{reassociation:?}"
        );
    }
}

#[test]
fn never_rows_refuse_every_value() -> TestResult {
    for row in RULES.iter().filter(|row| row.class == Class::Never) {
        let operands = vec![vec![Number::of(Literal::F32(2.0)).ok_or("number")?]; 2];
        let result = [Number::of(Literal::F32(4.0)).ok_or("number")?];
        assert!(!admits(row, row.operation, &operands, &result), "{row:?}");
    }
    assert!(rule(Operation::Binary(BinaryOperator::Divide), Domain::Float).is_some());
    assert!(rule(Operation::Math(MathFunction::Sin), Domain::Float).is_some());
    assert!(rule(Operation::Math(MathFunction::Fma), Domain::Float).is_some());
    assert!(!f32_binary(BinaryOperator::Divide, 1.0, 2.0)?);
    Ok(())
}

#[test]
fn exact_sums_and_products_of_normal_values_fold() -> TestResult {
    assert!(f32_binary(BinaryOperator::Add, 1.5, 2.25)?);
    assert!(f32_binary(BinaryOperator::Subtract, 5.0, 1.5)?);
    assert!(f32_binary(BinaryOperator::Multiply, 3.0, 0.5)?);
    assert!(f32_binary(BinaryOperator::Add, 16_777_216.0, 2.0)?);
    assert!(f32_binary(BinaryOperator::Multiply, -2.0, 1.0e30)?);
    Ok(())
}

#[test]
fn rounded_results_do_not_fold() -> TestResult {
    assert!(!f32_binary(BinaryOperator::Add, 0.1, 0.2)?);
    assert!(!f32_binary(BinaryOperator::Add, 16_777_216.0, 1.0)?);
    assert!(!f32_binary(BinaryOperator::Add, 1.0, f32::EPSILON / 2.0)?);
    assert!(!f32_binary(BinaryOperator::Multiply, 1.1, 1.1)?);
    assert!(!f32_binary(BinaryOperator::Subtract, 1.0e30, 1.0)?);
    Ok(())
}

#[test]
fn zero_results_and_signed_zero_do_not_fold() -> TestResult {
    assert!(!f32_binary(BinaryOperator::Subtract, 1.0, 1.0)?);
    assert!(!f32_binary(BinaryOperator::Multiply, 0.0, 3.0)?);
    assert!(!f32_binary(BinaryOperator::Multiply, -0.0, 3.0)?);
    assert!(!f32_binary(BinaryOperator::Add, -0.0, 0.0)?);
    assert!(f32_binary(BinaryOperator::Add, -0.0, 3.0)?);
    assert!(f32_binary(BinaryOperator::Add, 0.0, 3.0)?);
    Ok(())
}

#[test]
fn denormals_do_not_fold() -> TestResult {
    assert!(!f32_binary(BinaryOperator::Add, DENORMAL_F32, 1.0)?);
    assert!(!f32_binary(BinaryOperator::Multiply, MIN_NORMAL_F32, 0.5)?);
    assert!(f32_binary(BinaryOperator::Multiply, MIN_NORMAL_F32, 2.0)?);
    assert!(!f32_binary(
        BinaryOperator::Subtract,
        MIN_NORMAL_F32 * 1.5,
        MIN_NORMAL_F32
    )?);
    Ok(())
}

#[test]
fn infinity_and_nan_do_not_fold() -> TestResult {
    assert!(!f32_binary(BinaryOperator::Add, f32::INFINITY, 1.0)?);
    assert!(!f32_binary(BinaryOperator::Add, f32::NEG_INFINITY, 1.0)?);
    assert!(!f32_binary(BinaryOperator::Add, f32::NAN, 1.0)?);
    assert!(!f32_binary(BinaryOperator::Multiply, f32::MAX, 2.0)?);
    assert!(!f32_binary(BinaryOperator::Add, f32::MAX, f32::MAX)?);
    Ok(())
}

#[test]
fn half_and_double_follow_their_own_formats() -> TestResult {
    let half = |a: f32, b: f32| {
        let (a, b) = (f16::from_f32(a), f16::from_f32(b));
        check(
            Operation::Binary(BinaryOperator::Add),
            &[&[Literal::F16(a)], &[Literal::F16(b)]],
            &[Literal::F16(a + b)],
        )
    };
    assert!(half(1.5, 2.0)?);
    assert!(!half(2048.0, 1.0)?);
    assert!(!half(0.1, 0.2)?);
    assert!(!half(60000.0, 60000.0)?);
    assert!(!half(3.0e-5, 1.0)?);
    let double = |a: f64, b: f64| {
        check(
            Operation::Binary(BinaryOperator::Multiply),
            &[&[Literal::F64(a)], &[Literal::F64(b)]],
            &[Literal::F64(a * b)],
        )
    };
    assert!(double(3.0, 0.25)?);
    assert!(!double(0.1, 3.0)?);
    assert!(!double(f64::MIN_POSITIVE, 0.5)?);
    assert!(double(16_777_217.0, 1.0)?);
    Ok(())
}

#[test]
fn vectors_fold_component_by_component() -> TestResult {
    let operation = Operation::Binary(BinaryOperator::Add);
    let a = [Literal::F32(1.0), Literal::F32(2.0)];
    let b = [Literal::F32(0.5), Literal::F32(0.25)];
    assert!(check(
        operation,
        &[&a, &b],
        &[Literal::F32(1.5), Literal::F32(2.25)]
    )?);
    let c = [Literal::F32(0.5), Literal::F32(0.1)];
    assert!(!check(
        operation,
        &[&a, &c],
        &[Literal::F32(1.5), Literal::F32(2.1)]
    )?);
    let scalar = [Literal::F32(1.0)];
    assert!(check(
        operation,
        &[&a, &scalar],
        &[Literal::F32(2.0), Literal::F32(3.0)]
    )?);
    Ok(())
}

#[test]
fn comparisons_refuse_nan_infinity_and_denormals() -> TestResult {
    let less = Operation::Binary(BinaryOperator::Less);
    let compare = |a: f32, b: f32| {
        check(
            less,
            &[&[Literal::F32(a)], &[Literal::F32(b)]],
            &[Literal::Bool(a < b)],
        )
    };
    assert!(compare(1.0, 2.0)?);
    assert!(compare(-0.0, 0.0)?);
    assert!(!compare(f32::NAN, 1.0)?);
    assert!(!compare(f32::INFINITY, 1.0)?);
    assert!(!compare(DENORMAL_F32, 0.0)?);
    let equal = check(
        Operation::Binary(BinaryOperator::Equal),
        &[&[Literal::F32(-0.0)], &[Literal::F32(0.0)]],
        &[Literal::Bool(true)],
    )?;
    assert!(equal);
    Ok(())
}

#[test]
fn selecting_functions_need_normal_nonzero_results() -> TestResult {
    let unary = |operation: Operation, a: f32, result: f32| {
        check(operation, &[&[Literal::F32(a)]], &[Literal::F32(result)])
    };
    let negate = Operation::Unary(UnaryOperator::Negate);
    assert!(unary(negate, 2.0, -2.0)?);
    assert!(!unary(negate, 0.0, -0.0)?);
    assert!(!unary(negate, DENORMAL_F32, -DENORMAL_F32)?);
    assert!(!unary(negate, f32::NAN, f32::NAN)?);
    for fun in [
        MathFunction::Floor,
        MathFunction::Ceil,
        MathFunction::Trunc,
        MathFunction::RoundEven,
        MathFunction::Abs,
        MathFunction::Sign,
    ] {
        let operation = Operation::Math(fun);
        assert!(!unary(operation, 0.0, 0.0)?, "{fun:?}");
        assert!(!unary(operation, f32::INFINITY, f32::INFINITY)?, "{fun:?}");
    }
    assert!(unary(Operation::Math(MathFunction::Floor), 2.5, 2.0)?);
    assert!(!unary(Operation::Math(MathFunction::Floor), 0.5, 0.0)?);
    assert!(unary(Operation::Math(MathFunction::Ceil), -2.5, -2.0)?);
    assert!(unary(Operation::Math(MathFunction::Trunc), -2.5, -2.0)?);
    assert!(unary(Operation::Math(MathFunction::RoundEven), 2.5, 2.0)?);
    assert!(unary(Operation::Math(MathFunction::Abs), -3.0, 3.0)?);
    assert!(unary(Operation::Math(MathFunction::Sign), -3.0, -1.0)?);
    let round = Operation::Math(MathFunction::Round);
    assert!(unary(round, 2.4, 2.0)?);
    assert!(!unary(round, 2.5, 3.0)?);
    assert!(!unary(round, -1.5, -2.0)?);
    let pair = |fun: MathFunction, a: f32, b: f32, result: f32| {
        check(
            Operation::Math(fun),
            &[&[Literal::F32(a)], &[Literal::F32(b)]],
            &[Literal::F32(result)],
        )
    };
    assert!(pair(MathFunction::Min, 1.0, 2.0, 1.0)?);
    assert!(!pair(MathFunction::Min, -0.0, 0.0, -0.0)?);
    assert!(!pair(MathFunction::Max, f32::NAN, 2.0, 2.0)?);
    assert!(!pair(MathFunction::Max, DENORMAL_F32, 2.0, 2.0)?);
    let clamp = |x: f32, low: f32, high: f32, result: f32| {
        check(
            Operation::Math(MathFunction::Clamp),
            &[
                &[Literal::F32(x)],
                &[Literal::F32(low)],
                &[Literal::F32(high)],
            ],
            &[Literal::F32(result)],
        )
    };
    assert!(clamp(5.0, 1.0, 2.0, 2.0)?);
    assert!(!clamp(5.0, 2.0, 1.0, 1.0)?);
    assert!(!clamp(-5.0, 0.0, 1.0, 0.0)?);
    Ok(())
}

#[test]
fn classification_needs_a_finite_value() -> TestResult {
    let is_nan = Operation::Relational(RelationalFunction::IsNan);
    assert!(check(
        is_nan,
        &[&[Literal::F32(1.0)]],
        &[Literal::Bool(false)]
    )?);
    assert!(!check(
        is_nan,
        &[&[Literal::F32(f32::NAN)]],
        &[Literal::Bool(true)]
    )?);
    let is_inf = Operation::Relational(RelationalFunction::IsInf);
    assert!(!check(
        is_inf,
        &[&[Literal::F32(f32::INFINITY)]],
        &[Literal::Bool(true)]
    )?);
    Ok(())
}

#[test]
fn conversions_fold_only_exact_values() -> TestResult {
    let to_float = Operation::Convert(Domain::Float);
    let to_signed = Operation::Convert(Domain::Signed);
    let to_unsigned = Operation::Convert(Domain::Unsigned);
    assert!(check(
        to_float,
        &[&[Literal::I32(3)]],
        &[Literal::F32(3.0)]
    )?);
    assert!(!check(
        to_float,
        &[&[Literal::I32(0)]],
        &[Literal::F32(0.0)]
    )?);
    assert!(!check(
        to_float,
        &[&[Literal::I32(16_777_217)]],
        &[Literal::F32(16_777_216.0)]
    )?);
    assert!(check(
        to_float,
        &[&[Literal::U32(16_777_216)]],
        &[Literal::F32(16_777_216.0)]
    )?);
    assert!(check(
        to_signed,
        &[&[Literal::F32(3.75)]],
        &[Literal::I32(3)]
    )?);
    assert!(check(
        to_signed,
        &[&[Literal::F32(-3.75)]],
        &[Literal::I32(-3)]
    )?);
    assert!(check(
        to_signed,
        &[&[Literal::F32(0.0)]],
        &[Literal::I32(0)]
    )?);
    assert!(!check(
        to_signed,
        &[&[Literal::F32(1.0e10)]],
        &[Literal::I32(i32::MAX)]
    )?);
    assert!(!check(
        to_signed,
        &[&[Literal::F32(f32::NAN)]],
        &[Literal::I32(0)]
    )?);
    assert!(!check(
        to_unsigned,
        &[&[Literal::F32(-1.0)]],
        &[Literal::U32(0)]
    )?);
    assert!(!check(
        to_signed,
        &[&[Literal::F32(DENORMAL_F32)]],
        &[Literal::I32(0)]
    )?);
    assert!(check(
        to_float,
        &[&[Literal::F64(0.5)]],
        &[Literal::F32(0.5)]
    )?);
    assert!(!check(
        to_float,
        &[&[Literal::F64(0.1)]],
        &[Literal::F32(0.1)]
    )?);
    assert!(check(
        to_float,
        &[&[Literal::F32(65504.0)]],
        &[Literal::F16(f16::from_f32(65504.0))]
    )?);
    assert!(!check(
        to_float,
        &[&[Literal::F32(70000.0)]],
        &[Literal::F16(f16::INFINITY)]
    )?);
    assert!(check(
        to_float,
        &[&[Literal::Bool(true)]],
        &[Literal::F32(1.0)]
    )?);
    assert!(!check(
        to_float,
        &[&[Literal::Bool(false)]],
        &[Literal::F32(0.0)]
    )?);
    let to_bool = Operation::Convert(Domain::Bool);
    assert!(check(
        to_bool,
        &[&[Literal::F32(2.0)]],
        &[Literal::Bool(true)]
    )?);
    assert!(!check(
        to_bool,
        &[&[Literal::F32(f32::NAN)]],
        &[Literal::Bool(true)]
    )?);
    Ok(())
}

#[test]
fn integer_rules_refuse_undefined_operations() -> TestResult {
    let binary = |op: BinaryOperator, a: Literal, b: Literal, result: Literal| {
        check(Operation::Binary(op), &[&[a], &[b]], &[result])
    };
    assert!(binary(
        BinaryOperator::Add,
        Literal::I32(i32::MAX),
        Literal::I32(1),
        Literal::I32(i32::MIN)
    )?);
    assert!(binary(
        BinaryOperator::Divide,
        Literal::I32(7),
        Literal::I32(2),
        Literal::I32(3)
    )?);
    assert!(!binary(
        BinaryOperator::Divide,
        Literal::I32(7),
        Literal::I32(0),
        Literal::I32(i32::MAX)
    )?);
    assert!(!binary(
        BinaryOperator::Divide,
        Literal::I32(i32::MIN),
        Literal::I32(-1),
        Literal::I32(i32::MIN)
    )?);
    assert!(!binary(
        BinaryOperator::Divide,
        Literal::U32(7),
        Literal::U32(0),
        Literal::U32(u32::MAX)
    )?);
    assert!(binary(
        BinaryOperator::Modulo,
        Literal::I32(7),
        Literal::I32(3),
        Literal::I32(1)
    )?);
    assert!(!binary(
        BinaryOperator::Modulo,
        Literal::I32(-7),
        Literal::I32(3),
        Literal::I32(-1)
    )?);
    assert!(!binary(
        BinaryOperator::Modulo,
        Literal::I32(7),
        Literal::I32(-3),
        Literal::I32(1)
    )?);
    assert!(binary(
        BinaryOperator::ShiftLeft,
        Literal::U32(1),
        Literal::U32(31),
        Literal::U32(1 << 31)
    )?);
    assert!(!binary(
        BinaryOperator::ShiftLeft,
        Literal::U32(1),
        Literal::U32(32),
        Literal::U32(1)
    )?);
    assert!(!binary(
        BinaryOperator::ShiftRight,
        Literal::I32(-8),
        Literal::U32(40),
        Literal::I32(-1)
    )?);
    let abs = Operation::Math(MathFunction::Abs);
    assert!(check(abs, &[&[Literal::I32(-5)]], &[Literal::I32(5)])?);
    assert!(!check(
        abs,
        &[&[Literal::I32(i32::MIN)]],
        &[Literal::I32(i32::MIN)]
    )?);
    let clamp = Operation::Math(MathFunction::Clamp);
    assert!(check(
        clamp,
        &[&[Literal::I32(9)], &[Literal::I32(1)], &[Literal::I32(4)]],
        &[Literal::I32(4)]
    )?);
    assert!(!check(
        clamp,
        &[&[Literal::I32(9)], &[Literal::I32(4)], &[Literal::I32(1)]],
        &[Literal::I32(1)]
    )?);
    Ok(())
}

#[test]
fn copies_keep_every_bit_pattern() -> TestResult {
    assert!(check(
        Operation::Extract,
        &[&[Literal::F32(f32::NAN), Literal::F32(DENORMAL_F32)]],
        &[Literal::F32(DENORMAL_F32)]
    )?);
    assert!(check(
        Operation::Select,
        &[
            &[Literal::Bool(true)],
            &[Literal::F32(-0.0)],
            &[Literal::F32(1.0)]
        ],
        &[Literal::F32(-0.0)]
    )?);
    Ok(())
}
