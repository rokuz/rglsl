#[path = "support/samples.rs"]
mod samples;

use rglsl_ast::ast::{BinaryOperator, Expression, ExpressionKind, FunctionIdentifier};
use rglsl_ast::visit_expressions;
use rglsl_fuzz::parse_shader;
use samples::{TestResult, sample_jobs, samples_directory};

fn unparenthesized(expression: &Expression) -> &Expression {
    let mut current = expression;
    while let ExpressionKind::Parenthesized(inner) = &current.kind {
        current = inner;
    }
    current
}

fn call(expression: &Expression) -> Option<(&str, &[Expression])> {
    let ExpressionKind::FunctionCall(call) = &unparenthesized(expression).kind else {
        return None;
    };
    let FunctionIdentifier::Function(name) = &call.function.node else {
        return None;
    };
    Some((name.as_str(), call.arguments.as_slice()))
}

fn literal(expression: &Expression) -> Option<f64> {
    let ExpressionKind::Number(number) = &unparenthesized(expression).kind else {
        return None;
    };
    let digits = number
        .text
        .trim_end_matches(['f', 'F', 'u', 'U', 'l', 'L', 'h', 'H']);
    digits.parse().ok()
}

fn is_literal(expression: &Expression) -> bool {
    match &unparenthesized(expression).kind {
        ExpressionKind::Number(_) => true,
        ExpressionKind::FunctionCall(call) => {
            matches!(call.function.node, FunctionIdentifier::Constructor(_))
                && call.arguments.iter().all(is_literal)
        }
        _ => false,
    }
}

fn hazard(expression: &Expression) -> Option<String> {
    if let Some((name, arguments)) = call(expression) {
        match (name, arguments) {
            ("pow", [_, exponent]) if literal(exponent).is_some() => {
                return Some(
                    "pow with a literal exponent: pow(x, y) is undefined for x < 0, write the product"
                        .into(),
                );
            }
            ("clamp", [value, _, _]) if is_literal(value) => {
                return Some(
                    "clamp of a literal: the value and the bounds are swapped, and clamp is undefined when minVal > maxVal"
                        .into(),
                );
            }
            ("bitfieldExtract", [base, _, bits])
                if literal(bits) == Some(0.0) && !is_literal(base) =>
            {
                return Some(
                    "bitfieldExtract of a run-time value with a literal count of 0: KosmicKrisp computes it wrongly (xtask/exec-regressions/bitfield_extract_zero_count covers it)"
                        .into(),
                );
            }
            _ => {}
        }
    }
    if let ExpressionKind::Binary {
        operator: BinaryOperator::Multiply,
        left,
        right,
    } = &expression.kind
    {
        let amplified = |trigonometric: &Expression, factor: &Expression| {
            call(trigonometric).is_some_and(|(name, _)| matches!(name, "sin" | "cos" | "tan"))
                && literal(factor).is_some_and(|value| value.abs() >= 100.0)
        };
        if amplified(left, right) || amplified(right, left) {
            return Some(
                "a trigonometric function scaled by a large literal: its last bits differ between drivers"
                    .into(),
            );
        }
    }
    None
}

fn hazards(source: &str) -> TestResult<Vec<String>> {
    let unit = parse_shader(source)?;
    let mut found = Vec::new();
    visit_expressions(&unit, |expression| {
        if let Some(why) = hazard(expression) {
            found.push(why);
        }
    });
    Ok(found)
}

#[test]
fn templates_avoid_undefined_and_driver_dependent_results() -> TestResult {
    let jobs = sample_jobs()?;
    assert!(!jobs.is_empty());
    let mut failures = Vec::new();
    for (name, _) in &jobs {
        let source = std::fs::read_to_string(samples_directory().join(format!("{name}.frag")))?;
        for why in hazards(&source)? {
            failures.push(format!("{name}: {why}"));
        }
    }
    assert!(failures.is_empty(), "{}", failures.join("\n"));
    Ok(())
}

#[test]
fn finds_the_constructs_that_made_references_differ() -> TestResult {
    let shader = |body: &str| {
        format!(
            "#version 450\nlayout(location = 0) out vec4 c;\nlayout(set = 0, binding = 0) uniform B {{ vec2 r; }};\nvoid main() {{\n{body}\n}}\n"
        )
    };
    for (body, expected) in [
        ("float x = r.x; c = vec4(pow(x, 2.0));", "pow"),
        ("c = vec4(clamp(0.0, 1.0, r.x * 3.0));", "clamp"),
        (
            "c = vec4(fract(sin(dot(r, vec2(12.5, 3.))) * 4250.));",
            "trigonometric",
        ),
        (
            "c = vec4(float(bitfieldExtract(int(r.x), 0, 0)));",
            "bitfieldExtract",
        ),
    ] {
        let found = hazards(&shader(body))?;
        assert!(
            found.iter().any(|why| why.contains(expected)),
            "{body}: {found:?}"
        );
    }
    for body in [
        "float x = r.x; c = vec4(x * x, pow(abs(x), r.y), 0.0, 1.0);",
        "c = vec4(clamp(r.x * 3.0, 0.0, 1.0));",
        "c = vec4(sin(r.x) * 0.5, cos(r.y) * 20.0, 0.0, 1.0);",
        "c = vec4(float(bitfieldExtract(int(r.x), 0, 1) + bitfieldExtract(0, 0, 0)));",
    ] {
        assert_eq!(hazards(&shader(body))?, Vec::<String>::new(), "{body}");
    }
    Ok(())
}
