mod common;

use common::{TestResult, emitted, entry, fragment};
use rglsl::{BinaryOperator, Expression, Function, MathFunction, Module};

const FOLD: &[&str] = &["forward", "fold", "dce"];

fn binaries(function: &Function, op: BinaryOperator) -> usize {
    emitted(function)
        .into_iter()
        .filter(|&handle| {
            matches!(function.expressions[handle], Expression::Binary { op: found, .. } if found == op)
        })
        .count()
}

fn maths(function: &Function, fun: MathFunction) -> usize {
    emitted(function)
        .into_iter()
        .filter(|&handle| {
            matches!(function.expressions[handle], Expression::Math { fun: found, .. } if found == fun)
        })
        .count()
}

fn shader(globals: &str, body: &str) -> String {
    format!(
        "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 1) flat in int k;
layout(location = 0) out vec4 color;
{globals}
void main() {{
{body}
}}
"
    )
}

fn optimized(source: &str) -> TestResult<Module> {
    fragment(source, FOLD)
}

#[test]
fn integer_arithmetic_on_forwarded_constants_folds() -> TestResult {
    let source = shader(
        "",
        "    int n = 4;
    int m = n * 3 + 1;
    int d = m / 2;
    color = vec4(float(m + d));",
    );
    let before = fragment(&source, &["forward"])?;
    assert!(binaries(entry(&before)?, BinaryOperator::Multiply) > 0);
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert_eq!(binaries(function, BinaryOperator::Multiply), 0);
    assert_eq!(binaries(function, BinaryOperator::Add), 0);
    assert_eq!(binaries(function, BinaryOperator::Divide), 0);
    assert!(
        emitted(function)
            .iter()
            .all(|&handle| !matches!(function.expressions[handle], Expression::As { .. }))
    );
    Ok(())
}

#[test]
fn exact_float_arithmetic_folds_and_rounded_arithmetic_stays() -> TestResult {
    let exact = shader(
        "",
        "    float a = 2.0;
    color = inColor * (a * 3.0 + 0.5);",
    );
    let module = optimized(&exact)?;
    let function = entry(&module)?;
    assert_eq!(binaries(function, BinaryOperator::Add), 0);
    assert_eq!(binaries(function, BinaryOperator::Multiply), 1);
    let rounded = shader(
        "",
        "    float a = 0.1;
    color = inColor * (a + 0.2);",
    );
    let module = optimized(&rounded)?;
    assert_eq!(binaries(entry(&module)?, BinaryOperator::Add), 1);
    Ok(())
}

#[test]
fn division_and_transcendental_functions_never_fold() -> TestResult {
    let source = shader(
        "",
        "    float a = 1.0;
    float b = 4.0;
    color = vec4(a / b, sqrt(b), sin(a), exp(a));",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert_eq!(binaries(function, BinaryOperator::Divide), 1);
    assert_eq!(maths(function, MathFunction::Sqrt), 1);
    assert_eq!(maths(function, MathFunction::Sin), 1);
    assert_eq!(maths(function, MathFunction::Exp), 1);
    Ok(())
}

#[test]
fn precise_and_relaxed_expressions_do_not_fold() -> TestResult {
    let precise = shader(
        "",
        "    float a = 2.0;
    precise float b = a * 3.0;
    color = inColor * b;",
    );
    let module = optimized(&precise)?;
    assert_eq!(binaries(entry(&module)?, BinaryOperator::Multiply), 2);
    let relaxed = shader(
        "",
        "    mediump float a = 2.0;
    mediump float b = a * 3.0;
    color = inColor * b;",
    );
    let module = optimized(&relaxed)?;
    assert_eq!(binaries(entry(&module)?, BinaryOperator::Multiply), 2);
    Ok(())
}

#[test]
fn float_controls_turn_off_float_folding() -> TestResult {
    let source = shader(
        "#extension GL_EXT_spirv_intrinsics : enable
spirv_execution_mode(4459, 32);",
        "    float a = 2.0;
    int n = 3;
    color = inColor * (a * 3.0) + vec4(float(n * 2 + 1));",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert_eq!(binaries(function, BinaryOperator::Multiply), 2);
    assert!(
        emitted(function)
            .iter()
            .all(|&handle| !matches!(function.expressions[handle], Expression::As { .. }))
    );
    Ok(())
}

#[test]
fn integer_identities_disappear_and_float_identities_stay() -> TestResult {
    let source = shader(
        "",
        "    int zero = 0;
    int one = 1;
    float fone = 1.0;
    float fzero = 0.0;
    int x = (k + zero) * one;
    int y = (k | zero) ^ zero;
    color = vec4(float(x + y), inColor.x * fone, inColor.y + fzero, 0.0);",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert_eq!(binaries(function, BinaryOperator::InclusiveOr), 0);
    assert_eq!(binaries(function, BinaryOperator::ExclusiveOr), 0);
    assert_eq!(binaries(function, BinaryOperator::Add), 2);
    assert_eq!(binaries(function, BinaryOperator::Multiply), 1);
    Ok(())
}

#[test]
fn integer_constants_reassociate_and_floats_do_not() -> TestResult {
    let source = shader(
        "",
        "    int x = ((k + 1) + 2) + 3;
    float y = ((inColor.x * 2.0) * 3.0) * 4.0;
    color = vec4(float(x), y, 0.0, 0.0);",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    let adds: Vec<_> = emitted(function)
        .into_iter()
        .filter(|&handle| {
            matches!(
                function.expressions[handle],
                Expression::Binary {
                    op: BinaryOperator::Add,
                    ..
                }
            )
        })
        .collect();
    assert_eq!(adds.len(), 1);
    assert_eq!(binaries(function, BinaryOperator::Multiply), 3);
    Ok(())
}

#[test]
fn a_select_with_a_constant_condition_picks_its_operand() -> TestResult {
    let source = shader(
        "",
        "    bool on = true;
    color = mix(inColor, inColor.wzyx, bvec4(on));",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert!(
        emitted(function)
            .iter()
            .all(|&handle| !matches!(function.expressions[handle], Expression::Select { .. }))
    );
    Ok(())
}

#[test]
fn constant_vectors_fold_component_by_component() -> TestResult {
    let source = shader(
        "",
        "    vec4 a = vec4(1.0, 2.0, 3.0, 4.0);
    ivec2 b = ivec2(3, 4);
    color = inColor + (a * 2.0 - vec4(0.5)) + vec4(b.xyxy * 2);",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert_eq!(binaries(function, BinaryOperator::Multiply), 0);
    assert_eq!(binaries(function, BinaryOperator::Subtract), 0);
    Ok(())
}

#[test]
fn bitfields_with_a_zero_count_fold() -> TestResult {
    let source = shader(
        "",
        "    int x = int(inColor.x * 255.0);
    ivec2 v = ivec2(inColor.yz * 255.0);
    int count = 0;
    int extracted = bitfieldExtract(x, 3, count);
    ivec2 inserted = bitfieldInsert(v, ivec2(x), 1, count);
    uint unsigned_extracted = bitfieldExtract(uint(x), 5, 0);
    color = vec4(float(extracted), vec2(inserted), float(unsigned_extracted));",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    assert_eq!(maths(function, MathFunction::ExtractBits), 0);
    assert_eq!(maths(function, MathFunction::InsertBits), 0);
    let kept = shader(
        "",
        "    int x = int(inColor.x * 255.0);
    int count = int(inColor.w);
    color = vec4(float(bitfieldExtract(x, 1, 2)), float(bitfieldExtract(x, 0, count)), 0.0, 1.0);",
    );
    let module = optimized(&kept)?;
    assert_eq!(maths(entry(&module)?, MathFunction::ExtractBits), 2);
    Ok(())
}

#[test]
fn a_component_of_a_vector_operation_with_constant_components_folds() -> TestResult {
    let source = shader(
        "",
        "    vec2 s = vec2(5.0, 3.0) + vec2(inColor.x, 1.0);
    vec3 m = vec3(inColor.y, 2.0, 0.5) * 4.0;
    color = vec4(s.y, m.y, m.z, s.x);",
    );
    let module = optimized(&source)?;
    let function = entry(&module)?;
    let extracts = emitted(function)
        .into_iter()
        .filter(|&handle| {
            matches!(
                function.expressions[handle],
                Expression::AccessIndex { index: 1 | 2, .. }
            )
        })
        .count();
    assert_eq!(extracts, 0);
    Ok(())
}
