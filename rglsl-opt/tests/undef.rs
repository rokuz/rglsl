mod common;

use common::{TestResult, compiled, entry, fragment, loads, stores};
use rglsl::{Expression, Function, ShaderStage, Statement};
use rglsl_opt::float::{UNDEFINED, UndefinedUse, folds_undefined};
use rglsl_opt::{Context, TargetGpu};

const FORWARD: &[&str] = &["forward"];
const FOLD: &[&str] = &["forward", "fold"];
const BRANCHES: &[&str] = &["forward", "fold", "dead-branch", "dce"];
const CLEAN: &[&str] = &["forward", "dce"];
const PRESET: &[&str] = &["inline", "dce", "forward", "fold", "dead-branch", "dce"];

fn undefs(function: &Function) -> usize {
    function
        .expressions
        .iter()
        .filter(|&(_, expression)| matches!(*expression, Expression::Undef(_)))
        .count()
}

fn global_loads(function: &Function) -> usize {
    function
        .expressions
        .iter()
        .filter(|&(_, expression)| match *expression {
            Expression::Load { pointer } => {
                let mut current = pointer;
                loop {
                    match function.expressions[current] {
                        Expression::GlobalVariable(_) => break true,
                        Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                            current = base;
                        }
                        _ => break false,
                    }
                }
            }
            _ => false,
        })
        .count()
}

fn spirv_undefs(source: &str, passes: &[&str]) -> TestResult<usize> {
    let words = compiled(
        ShaderStage::Fragment,
        source,
        passes,
        TargetGpu::default(),
        Context::default(),
    )?
    .words;
    let mut count = 0;
    let mut at = 5;
    while let Some(&first) = words.get(at) {
        let length = (first >> 16) as usize;
        if length == 0 {
            break;
        }
        if first & 0xffff == spirv::Op::Undef as u32 {
            count += 1;
        }
        at += length;
    }
    Ok(count)
}

fn ifs(function: &Function) -> usize {
    function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::If { .. }))
        .count()
}

fn switches(function: &Function) -> usize {
    function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Switch { .. }))
        .count()
}

#[test]
fn a_variable_that_is_never_written_reads_as_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
void main() {
    float f;
    vec3 w;
    color = vec4(f, w);
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "f"), 0);
    assert_eq!(loads(function, "w"), 0);
    assert_eq!(undefs(function), 2);
    assert_eq!(spirv_undefs(source, CLEAN)?, 0);
    let module = fragment(source, CLEAN)?;
    assert!(entry(&module)?.local_variables.is_empty());
    Ok(())
}

#[test]
fn a_load_before_the_first_store_reads_as_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float f;
    color = vec4(f);
    f = inColor.x;
    color += vec4(f);
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "f"), 0);
    assert_eq!(undefs(function), 1);
    Ok(())
}

#[test]
fn a_store_on_one_path_keeps_the_load_after_the_merge() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float f;
    if (inColor.y > 0.5) f = inColor.x;
    color = vec4(f);
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "f"), 1);
    assert_eq!(undefs(function), 0);
    Ok(())
}

#[test]
fn a_value_carried_by_a_loop_is_not_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float f;
    color = vec4(0.0);
    for (int i = 0; i < 4; i++) {
        color += vec4(f);
        f = inColor.x;
    }
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "f"), 1);
    assert_eq!(undefs(function), 0);
    Ok(())
}

#[test]
fn a_dynamically_indexed_array_that_is_never_written_reads_as_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) flat in int k;
layout(location = 0) out vec4 color;
struct Node { int data; int left; };
Node tree[10];
void main() {
    Node node = tree[k];
    color = vec4(float(node.data), float(node.left), 0.0, 1.0);
}
";
    let module = fragment(source, PRESET)?;
    let function = entry(&module)?;
    assert_eq!(global_loads(function), 0);
    assert_eq!(undefs(function), 1);
    assert_eq!(loads(function, "tree"), 0);
    assert_eq!(loads(function, "node"), 0);
    assert!(
        module
            .global_variables
            .iter()
            .all(|(_, global)| { global.name.as_deref() != Some("tree") })
    );
    Ok(())
}

#[test]
fn a_private_global_that_no_function_writes_reads_as_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
float g;
float twice() { return g * 2.0; }
void main() {
    color = vec4(twice(), g, 0.0, 1.0);
}
";
    let module = fragment(source, FORWARD)?;
    for (_, function) in module.functions.iter() {
        assert_eq!(global_loads(function), 0);
        assert_eq!(undefs(function), 1);
    }
    assert_eq!(global_loads(entry(&module)?), 0);
    Ok(())
}

#[test]
fn a_private_global_written_by_another_function_is_kept() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
float g;
void set() { g = inColor.x; }
void main() {
    set();
    color = vec4(g);
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(undefs(function), 0);
    assert_eq!(global_loads(function), 1);
    Ok(())
}

#[test]
fn a_part_of_an_undefined_value_is_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
struct S { vec3 v; int i; };
void main() {
    S s;
    vec4 w;
    color = vec4(s.v.y, w.yx, float(s.i));
}
";
    let module = fragment(source, &["fold"])?;
    let before = entry(&module)?;
    assert!(
        before
            .expressions
            .iter()
            .any(|(_, expression)| matches!(*expression, Expression::Load { .. }))
    );
    let module = fragment(source, &["forward", "fold", "dce"])?;
    let function = entry(&module)?;
    assert!(function.expressions.iter().all(|(_, expression)| !matches!(
        *expression,
        Expression::Load { .. }
            | Expression::Access { .. }
            | Expression::AccessIndex { .. }
            | Expression::Swizzle { .. }
    )));
    assert!(undefs(function) >= 1);
    let module = fragment(source, FOLD)?;
    let function = entry(&module)?;
    let undefined_bases = function
        .expressions
        .iter()
        .filter(|&(_, expression)| match *expression {
            Expression::AccessIndex { base, .. } | Expression::Swizzle { vector: base, .. } => {
                matches!(function.expressions[base], Expression::Undef(_))
            }
            _ => false,
        })
        .count();
    assert_eq!(undefined_bases, 0);
    Ok(())
}

#[test]
fn branches_and_switches_on_undefined_values_are_kept() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
void main() {
    bool c;
    int i;
    color = vec4(0.0);
    if (c) color.x = 1.0;
    switch (i) {
        case 1: color.y = 2.0; break;
        default: color.y = 3.0; break;
    }
}
";
    let module = fragment(source, BRANCHES)?;
    let function = entry(&module)?;
    assert_eq!(undefs(function), 2);
    assert_eq!(ifs(function), 1);
    assert_eq!(switches(function), 1);
    assert!(!folds_undefined(UndefinedUse::Condition));
    assert!(!folds_undefined(UndefinedUse::Selector));
    Ok(())
}

#[test]
fn an_operation_on_an_undefined_value_is_kept_unless_every_value_folds() -> TestResult {
    let source = "#version 450
layout(location = 0) flat in int k;
layout(location = 0) out vec4 color;
void main() {
    int j;
    color = vec4(float(j + k), float(j * 0), 0.0, 1.0);
}
";
    let module = fragment(source, &["forward", "fold", "dce"])?;
    let function = entry(&module)?;
    let products = function
        .expressions
        .iter()
        .filter(|&(_, expression)| {
            matches!(
                *expression,
                Expression::Binary {
                    op: rglsl::BinaryOperator::Multiply,
                    ..
                }
            )
        })
        .count();
    let sums = function
        .expressions
        .iter()
        .filter(|&(_, expression)| {
            matches!(
                *expression,
                Expression::Binary {
                    op: rglsl::BinaryOperator::Add,
                    ..
                }
            )
        })
        .count();
    assert_eq!(products, 0);
    assert_eq!(sums, 1);
    Ok(())
}

#[test]
fn a_store_of_an_undefined_value_is_removed() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float f;
    float g = inColor.x;
    if (inColor.y > 0.5) g = f;
    color = vec4(g);
}
";
    let module = fragment(source, FORWARD)?;
    assert_eq!(stores(entry(&module)?, "g"), 2);
    let module = fragment(source, CLEAN)?;
    let function = entry(&module)?;
    assert_eq!(stores(function, "g"), 1);
    assert_eq!(loads(function, "g"), 1);
    assert_eq!(undefs(function), 0);
    Ok(())
}

#[test]
fn every_undefined_value_rule_names_its_counterpart_and_reason() {
    for row in UNDEFINED {
        assert!(!row.counterpart.is_empty(), "{row:?}");
        assert!(!row.reason.is_empty(), "{row:?}");
    }
    for usage in [
        UndefinedUse::Load,
        UndefinedUse::Extract,
        UndefinedUse::Operand,
        UndefinedUse::Condition,
        UndefinedUse::Selector,
        UndefinedUse::Store,
    ] {
        assert_eq!(
            UNDEFINED.iter().filter(|row| row.usage == usage).count(),
            1,
            "{usage:?}"
        );
    }
    assert!(folds_undefined(UndefinedUse::Load));
    assert!(folds_undefined(UndefinedUse::Extract));
    assert!(folds_undefined(UndefinedUse::Store));
    assert!(!folds_undefined(UndefinedUse::Operand));
}
