mod common;

use common::{TestResult, emitted, entry, fragment, optimized};
use rglsl::{BinaryOperator, Expression, Function, ShaderStage};
use rglsl_opt::{Context, TargetGpu};

const CSE: &[&str] = &["cse", "dce"];

fn multiplies(function: &Function) -> usize {
    emitted(function)
        .into_iter()
        .filter(|&handle| {
            matches!(
                function.expressions[handle],
                Expression::Binary {
                    op: BinaryOperator::Multiply,
                    ..
                }
            )
        })
        .count()
}

fn shader(body: &str) -> String {
    format!(
        "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {{
    vec4 c = inColor;
{body}
}}
"
    )
}

#[test]
fn a_repeated_expression_is_computed_once() -> TestResult {
    let source = shader("    color = vec4(c.x * c.y, c.x * c.y + 1.0, 0.0, 1.0);");
    let before = fragment(&source, &["forward", "dce"])?;
    assert_eq!(multiplies(entry(&before)?), 2);
    let module = fragment(&source, &["forward", "dce", "cse", "dce"])?;
    assert_eq!(multiplies(entry(&module)?), 1);
    Ok(())
}

#[test]
fn an_outer_value_is_reused_in_nested_blocks_but_not_across_branches() -> TestResult {
    let source = shader(
        "    float a = c.x * c.y;
    color = vec4(a);
    if (c.z > 0.5) { color.x = c.x * c.y; color.y = c.z * c.w; }
    else { color.y = c.z * c.w; }",
    );
    let module = fragment(&source, &["forward", "dce", "cse", "dce"])?;
    assert_eq!(multiplies(entry(&module)?), 3);
    Ok(())
}

#[test]
fn precise_values_are_kept_apart() -> TestResult {
    let passes = &["forward", "dce", "cse", "dce"];
    let plain = shader(
        "    float a = c.x * c.y;
    float b = c.x * c.y;
    color = vec4(a, b, 0.0, 1.0);",
    );
    let module = fragment(&plain, passes)?;
    assert_eq!(multiplies(entry(&module)?), 1);
    let precise = shader(
        "    precise float a = c.x * c.y;
    float b = c.x * c.y;
    color = vec4(a, b, 0.0, 1.0);",
    );
    let module = fragment(&precise, passes)?;
    assert_eq!(multiplies(entry(&module)?), 2);
    Ok(())
}

#[test]
fn the_mobile_profile_reuses_values_only_in_the_same_block() -> TestResult {
    let source = shader(
        "    float a = c.x * c.y;
    color = vec4(a * c.x * c.y);
    if (c.z > 0.5) color.x = c.x * c.y;",
    );
    let passes = &["forward", "dce", "cse", "dce"];
    let desktop = fragment(&source, passes)?;
    let mobile = optimized(
        ShaderStage::Fragment,
        &source,
        passes,
        TargetGpu::UniversalMobile,
        Context::default(),
    )?;
    assert_eq!(
        multiplies(entry(&mobile)?),
        multiplies(entry(&desktop)?) + 1
    );
    Ok(())
}

#[test]
fn values_from_the_loop_body_are_not_reused_in_continuing() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    color = vec4(0.0);
    for (int i = 0; i < 4; i += int(inColor.x * inColor.y)) {
        if (inColor.z > 0.5) continue;
        color.x += inColor.x * inColor.y;
    }
}
";
    let module = fragment(source, CSE)?;
    assert_eq!(multiplies(entry(&module)?), 2);
    Ok(())
}

#[test]
fn an_outer_value_is_not_reused_inside_a_loop() -> TestResult {
    let source = shader(
        "    color = vec4(c.x * c.y);
    for (int i = 0; i < int(c.w); i++) { color.x += c.x * c.y; }",
    );
    let module = fragment(&source, &["forward", "dce", "cse", "dce"])?;
    assert_eq!(multiplies(entry(&module)?), 2);
    Ok(())
}
