mod common;

use common::{TestResult, entry, fragment};
use rglsl::{Function, Statement};

const PRUNE: &[&str] = &["forward", "fold", "dead-branch", "dce"];

#[derive(Debug, Default, PartialEq, Eq)]
struct Shape {
    ifs: usize,
    switches: usize,
    loops: usize,
    cases: usize,
}

fn shape(function: &Function) -> Shape {
    let mut shape = Shape::default();
    for statement in function.body.walk() {
        match *statement {
            Statement::If { .. } => shape.ifs += 1,
            Statement::Switch { ref cases, .. } => {
                shape.switches += 1;
                shape.cases += cases.len();
            }
            Statement::Loop { .. } => shape.loops += 1,
            _ => {}
        }
    }
    shape
}

fn shader(globals: &str, body: &str) -> String {
    format!(
        "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 1) flat in int k;
layout(location = 0) out vec4 color;
{globals}
void main() {{
    color = inColor;
{body}
}}
"
    )
}

#[test]
fn a_constant_if_keeps_only_the_taken_branch() -> TestResult {
    let source = shader(
        "",
        "    int n = 4;
    if (n > 3) color.x = 1.0; else color.y = 2.0;
    bool off = false;
    if (off) color.z = 3.0;",
    );
    let before = fragment(&source, &["forward", "fold"])?;
    assert_eq!(shape(entry(&before)?).ifs, 2);
    let module = fragment(&source, PRUNE)?;
    assert_eq!(shape(entry(&module)?), Shape::default());
    Ok(())
}

#[test]
fn a_constant_switch_keeps_the_selected_case() -> TestResult {
    let source = shader(
        "",
        "    int n = 2;
    switch (n) {
    case 1: color.x = 1.0; break;
    case 2: color.y = 2.0;
    case 3: color.z = 3.0; break;
    default: color.w = 4.0; break;
    }
    switch (n + 5) {
    case 1: color.x = 0.0; break;
    default: color.w = 5.0;
    }
    switch (n) { case 9: color.x = 9.0; break; }",
    );
    let module = fragment(&source, PRUNE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function), Shape::default());
    let stores = function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Store { .. }))
        .count();
    assert_eq!(stores, 4);
    Ok(())
}

#[test]
fn a_constant_switch_with_an_inner_break_keeps_one_case() -> TestResult {
    let source = shader(
        "",
        "    int n = 2;
    switch (n) {
    case 1: color.x = 1.0; break;
    case 2: if (inColor.x > 0.5) break; color.y = 2.0; break;
    default: color.w = 4.0; break;
    }",
    );
    let module = fragment(&source, PRUNE)?;
    let found = shape(entry(&module)?);
    assert_eq!((found.switches, found.cases), (1, 1));
    Ok(())
}

#[test]
fn a_loop_that_never_iterates_disappears() -> TestResult {
    let source = shader(
        "",
        "    int limit = 0;
    for (int i = k; limit > 0; i++) color.x += float(i);
    do { color.y += 1.0; } while (false);
    while (limit > 3) { color.z += 1.0; }",
    );
    let module = fragment(&source, PRUNE)?;
    assert_eq!(shape(entry(&module)?).loops, 0);
    Ok(())
}

#[test]
fn a_loop_with_a_break_inside_its_body_stays() -> TestResult {
    let source = shader(
        "",
        "    do { if (inColor.x > 0.5) break; color.y += 1.0; } while (false);
    for (;;) { color.w += 1.0; if (inColor.y > 0.5) continue; break; }",
    );
    let module = fragment(&source, PRUNE)?;
    assert_eq!(shape(entry(&module)?).loops, 2);
    Ok(())
}

#[test]
fn branches_on_specialization_constants_stay() -> TestResult {
    let source = shader(
        "layout(constant_id = 0) const bool ON = true;
layout(constant_id = 1) const int MODE = 1;",
        "    if (ON) color.x = 1.0;
    switch (MODE) { case 1: color.y = 1.0; break; default: color.z = 1.0; break; }",
    );
    let module = fragment(&source, PRUNE)?;
    let found = shape(entry(&module)?);
    assert_eq!((found.ifs, found.switches), (1, 1));
    Ok(())
}

#[test]
fn code_after_a_taken_return_is_removed() -> TestResult {
    let source = shader(
        "",
        "    bool done = true;
    if (done) { color.x = 1.0; return; }
    color.y = 2.0;",
    );
    let module = fragment(&source, PRUNE)?;
    let function = entry(&module)?;
    let stores = function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Store { .. }))
        .count();
    assert_eq!(stores, 2);
    Ok(())
}

#[test]
fn a_loop_whose_body_always_returns_runs_once() -> TestResult {
    let source = shader(
        "",
        "    for (int i = 0; i < k; ++i, color.w = 9.0) {
        color.x = 2.0;
        return;
    }
    color.y = 4.0;",
    );
    let module = fragment(&source, &["dead-branch"])?;
    assert_eq!(
        shape(entry(&module)?),
        Shape {
            ifs: 1,
            ..Shape::default()
        }
    );
    Ok(())
}

#[test]
fn a_loop_whose_body_always_discards_without_a_check_disappears() -> TestResult {
    let source = shader(
        "",
        "    while (true) {
        color.x = 2.0;
        discard;
    }",
    );
    let module = fragment(&source, &["dead-branch"])?;
    assert_eq!(shape(entry(&module)?), Shape::default());
    Ok(())
}
