mod common;

use common::{TestResult, entry, fragment};
use rglsl::{Expression, Function, Module, Statement, TypeInner};

const PREPARE: &[&str] = &["inline", "dce", "forward", "fold", "dead-branch", "dce"];

fn with(extra: &[&'static str]) -> Vec<&'static str> {
    PREPARE.iter().chain(extra).copied().collect()
}

fn array_locals(module: &Module, function: &Function) -> Vec<bool> {
    function
        .local_variables
        .iter()
        .filter(|(_, variable)| matches!(module.types[variable.ty].inner, TypeInner::Array { .. }))
        .map(|(_, variable)| variable.init.is_some())
        .collect()
}

fn array_stores(module: &Module, function: &Function) -> usize {
    function
        .body
        .walk()
        .filter(|statement| {
            let Statement::Store { pointer, .. } = **statement else {
                return false;
            };
            let Expression::LocalVariable(local) = function.expressions[pointer] else {
                return false;
            };
            matches!(
                module.types[function.local_variables[local].ty].inner,
                TypeInner::Array { .. }
            )
        })
        .count()
}

fn shader(body: &str) -> String {
    format!(
        "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 1) flat in int k;
layout(location = 0) out vec4 color;
const float w[5] = float[](0.1, 0.2, 0.3, 0.2, 0.1);
void main() {{
    float s = 0.0;
{body}
    color = vec4(s);
}}
"
    )
}

#[test]
fn a_constant_array_indexed_in_a_loop_is_stored_once() -> TestResult {
    let source = shader("    for (int i = 0; i < k; ++i) s += w[i] * inColor.x;");
    let before = fragment(&source, PREPARE)?;
    let function = entry(&before)?;
    assert_eq!(array_locals(&before, function), [false]);
    assert_eq!(array_stores(&before, function), 1);
    let module = fragment(&source, &with(&["const-array"]))?;
    let function = entry(&module)?;
    assert_eq!(array_locals(&module, function), [true]);
    assert_eq!(array_stores(&module, function), 0);
    Ok(())
}

#[test]
fn copies_of_the_same_constant_share_one_variable() -> TestResult {
    let source = shader(
        "    for (int i = 0; i < k; ++i) s += w[i];
    s += w[k];
    for (int i = 0; i < k; ++i) s *= w[4 - i];",
    );
    let before = fragment(&source, PREPARE)?;
    assert_eq!(array_locals(&before, entry(&before)?).len(), 3);
    let module = fragment(&source, &with(&["const-array", "dce"]))?;
    let function = entry(&module)?;
    assert_eq!(array_locals(&module, function), [true]);
    assert_eq!(array_stores(&module, function), 0);
    Ok(())
}

#[test]
fn an_array_with_different_values_keeps_its_stores() -> TestResult {
    let source = shader(
        "    float t[3] = float[](1.0, 2.0, 3.0);
    if (inColor.x > 0.5) t = float[](4.0, 5.0, 6.0);
    s = t[k];",
    );
    let before = fragment(&source, PREPARE)?;
    let stores = array_stores(&before, entry(&before)?);
    assert!(stores > 0);
    let module = fragment(&source, &with(&["const-array"]))?;
    assert_eq!(array_stores(&module, entry(&module)?), stores);
    Ok(())
}

#[test]
fn an_array_passed_by_pointer_keeps_its_stores() -> TestResult {
    let source = "#version 450
layout(location = 0) flat in int k;
layout(location = 0) out vec4 color;
const float w[3] = float[](0.1, 0.2, 0.3);
float pick(inout float a[3]) { a[0] = 1.0; return a[k]; }
void main() {
    float t[3] = w;
    color = vec4(pick(t) + t[k]);
}
";
    let before = fragment(source, &[])?;
    let stores = array_stores(&before, entry(&before)?);
    let module = fragment(source, &["const-array"])?;
    assert_eq!(array_stores(&module, entry(&module)?), stores);
    Ok(())
}
