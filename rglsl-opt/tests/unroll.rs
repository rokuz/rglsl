mod common;

use common::{TestResult, compiled_at, entry, fragment, loads};
use rglsl::{Expression, Function, Literal, Module, ShaderStage, Statement, TypeInner};
use rglsl_opt::{Context, OptLevel, TargetGpu};

const PREPARE: &[&str] = &["inline", "dce", "forward", "fold", "dead-branch", "dce"];

fn with(extra: &[&'static str]) -> Vec<&'static str> {
    PREPARE.iter().chain(extra).copied().collect()
}

fn unrolled() -> Vec<&'static str> {
    with(&["unroll"])
}

fn cleaned() -> Vec<&'static str> {
    with(&[
        "unroll",
        "fold",
        "sroa",
        "forward",
        "fold",
        "dead-branch",
        "dce",
        "sroa",
        "forward",
        "fold",
        "dce",
    ])
}

fn loops(function: &Function) -> usize {
    function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Loop { .. }))
        .count()
}

fn arrays(module: &Module, function: &Function) -> usize {
    function
        .local_variables
        .iter()
        .filter(|(_, variable)| matches!(module.types[variable.ty].inner, TypeInner::Array { .. }))
        .count()
}

fn shader(body: &str) -> String {
    format!(
        "#version 450
#extension GL_EXT_control_flow_attributes : require
layout(location = 0) in vec4 inColor;
layout(location = 1) flat in int k;
layout(location = 0) out vec4 color;
void main() {{
    float a[4];
    float s = 0.0;
{body}
    color = vec4(s + a[k & 3]);
}}
"
    )
}

fn loops_after(source: &str, passes: &[&str]) -> TestResult<usize> {
    let module = fragment(source, passes)?;
    Ok(loops(entry(&module)?))
}

#[test]
fn a_loop_that_indexes_a_local_array_is_unrolled_and_the_array_disappears() -> TestResult {
    let source = shader(
        "    float b[4];
    for (int i = 0; i < 4; i++) b[i] = inColor[i] * float(i);
    for (int i = 0; i < 4; ++i) s += b[i];",
    );
    let before = fragment(&source, PREPARE)?;
    assert_eq!(loops(entry(&before)?), 2);
    assert_eq!(arrays(&before, entry(&before)?), 1);
    let module = fragment(&source, &cleaned())?;
    let function = entry(&module)?;
    assert_eq!(loops(function), 0);
    assert_eq!(arrays(&module, function), 0);
    Ok(())
}

#[test]
fn a_loop_with_a_bound_known_only_at_run_time_stays() -> TestResult {
    let source = shader("    for (int i = 0; i < k; i++) s += a[i & 3];");
    assert_eq!(loops_after(&source, &unrolled())?, 1);
    Ok(())
}

#[test]
fn dont_unroll_is_respected() -> TestResult {
    let source = shader("    [[dont_unroll]] for (int i = 0; i < 4; i++) a[i] = inColor[i];");
    assert_eq!(loops_after(&source, &unrolled())?, 1);
    Ok(())
}

#[test]
fn unroll_unrolls_a_loop_that_indexes_nothing() -> TestResult {
    let plain = shader("    for (int i = 0; i < 4; i++) s += inColor.x * s;");
    assert_eq!(loops_after(&plain, &unrolled())?, 1);
    let hinted = shader("    [[unroll]] for (int i = 0; i < 4; i++) s += inColor.x * s;");
    assert_eq!(loops_after(&hinted, &unrolled())?, 0);
    Ok(())
}

#[test]
fn do_while_and_while_loops_with_a_store_in_the_body_are_unrolled() -> TestResult {
    let source = shader(
        "    float b[4];
    int i = 0;
    do { b[i] = inColor[i]; i++; } while (i < 4);
    int j = 3;
    while (j >= 0) { s += b[j]; j--; }
    [[unroll]] for (uint u = 0u; u != 4u; u += 2u) s += b[u];",
    );
    assert_eq!(loops_after(&source, &unrolled())?, 0);
    let module = fragment(&source, &cleaned())?;
    assert_eq!(arrays(&module, entry(&module)?), 0);
    Ok(())
}

#[test]
fn the_counter_keeps_its_final_value_after_the_loop() -> TestResult {
    let source = shader(
        "    int i = 0;
    for (; i < 3; i++) a[i] = inColor[i];
    s = a[1] + float(i);",
    );
    let module = fragment(&source, &cleaned())?;
    let function = entry(&module)?;
    assert_eq!(loops(function), 0);
    assert_eq!(loads(function, "i"), 0);
    assert!(
        function
            .expressions
            .iter()
            .any(|(_, expression)| *expression == Expression::Literal(Literal::F32(3.0)))
    );
    Ok(())
}

#[test]
fn loops_that_leave_early_stay() -> TestResult {
    let broken =
        shader("    for (int i = 0; i < 4; i++) { if (inColor[i] > 0.5) break; a[i] = 1.0; }");
    assert_eq!(loops_after(&broken, &unrolled())?, 1);
    let continued =
        shader("    for (int i = 0; i < 4; i++) { if (inColor[i] > 0.5) continue; a[i] = 1.0; }");
    assert_eq!(loops_after(&continued, &unrolled())?, 1);
    let switched = shader(
        "    for (int i = 0; i < 4; i++) { switch (k) { case 1: continue; default: break; } a[i] = 1.0; }",
    );
    assert_eq!(loops_after(&switched, &unrolled())?, 1);
    let returned =
        shader("    for (int i = 0; i < 4; i++) { a[i] = 1.0; if (inColor[i] > 0.5) return; }");
    assert_eq!(loops_after(&returned, &unrolled())?, 0);
    Ok(())
}

#[test]
fn a_counter_written_in_the_body_or_wrapping_around_stays() -> TestResult {
    let written =
        shader("    for (int i = 0; i < 4; i++) { a[i] = 1.0; if (inColor.x > 0.5) i++; }");
    assert_eq!(loops_after(&written, &unrolled())?, 1);
    let wrapping = shader("    for (uint i = 0u; i != 7u; i += 2u) a[i & 3u] = 1.0;");
    assert_eq!(loops_after(&wrapping, &unrolled())?, 1);
    let unsigned = shader("    for (uint i = 3u; i >= 0u; i--) a[i & 3u] = 1.0;");
    assert_eq!(loops_after(&unsigned, &unrolled())?, 1);
    let overflowing = shader("    for (int i = 2147483644; i <= 2147483647; i++) a[i & 3] = 1.0;");
    assert_eq!(loops_after(&overflowing, &unrolled())?, 1);
    Ok(())
}

#[test]
fn a_loop_that_never_runs_disappears() -> TestResult {
    let source = shader("    for (int i = 5; i < 3; i++) a[i] = 1.0;");
    assert_eq!(loops_after(&source, &unrolled())?, 0);
    Ok(())
}

#[test]
fn nested_loops_are_unrolled_from_the_inside() -> TestResult {
    let source = shader(
        "    float m[3][3];
    for (int i = 0; i < 3; i++) for (int j = 0; j < 3; j++) m[i][j] = inColor[i] * inColor[j];
    for (int i = 0; i < 3; i++) for (int j = 0; j < 3; j++) s += m[j][i];",
    );
    let module = fragment(&source, &cleaned())?;
    let function = entry(&module)?;
    assert_eq!(loops(function), 0);
    assert_eq!(arrays(&module, function), 0);
    Ok(())
}

#[test]
fn a_loop_that_indexes_only_vector_components_stays() -> TestResult {
    let local = shader("    vec4 w = inColor * 2.0;\n    for (int i = 0; i < 4; i++) s += w[i];");
    assert_eq!(loops_after(&local, &unrolled())?, 1);
    let member = shader(
        "    struct P { vec4 v; float f; };
    P p = P(inColor, 1.0);
    for (int i = 0; i < 4; i++) s += p.v[i] * p.f;",
    );
    assert_eq!(loops_after(&member, &unrolled())?, 1);
    let column = shader(
        "    mat4 m = mat4(inColor, inColor, inColor, inColor);
    for (int i = 0; i < 4; i++) s += m[1][i];",
    );
    assert_eq!(loops_after(&column, &unrolled())?, 1);
    let matrix = shader(
        "    mat4 m = mat4(inColor, inColor.yzwx, inColor.zwxy, inColor.wxyz);
    for (int i = 0; i < 4; i++) s += m[i].x;",
    );
    assert_eq!(loops_after(&matrix, &unrolled())?, 0);
    Ok(())
}

#[test]
fn an_outer_loop_that_does_not_index_stays() -> TestResult {
    let source = shader(
        "    for (int i = 0; i < 4; i++) a[i] = inColor[i];
    for (int n = 0; n < 4; n++) { s *= inColor.w; for (int i = 0; i < 4; i++) s += a[i]; }",
    );
    let module = fragment(&source, &unrolled())?;
    assert_eq!(loops(entry(&module)?), 1);
    Ok(())
}

#[test]
fn the_size_limit_keeps_long_loops() -> TestResult {
    let long =
        shader("    float b[64]; for (int i = 0; i < 4096; i++) b[i & 63] += inColor.x; s = b[k];");
    assert_eq!(loops_after(&long, &unrolled())?, 1);
    let medium = shader(
        "    float b[64]; for (int i = 0; i < 64; i++) b[i] = inColor.x * float(i); s = b[k];",
    );
    assert_eq!(loops_after(&medium, &unrolled())?, 0);
    let passes = unrolled();
    let size = compiled_at(
        OptLevel::Size,
        ShaderStage::Fragment,
        &medium,
        &passes,
        TargetGpu::default(),
        Context::default(),
    )?;
    assert_eq!(loops(entry(&size.module)?), 1);
    Ok(())
}
