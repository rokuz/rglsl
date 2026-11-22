mod common;

use common::{TestResult, debug_values, entry, fragment, optimized, stores};
use rglsl::{Function, ShaderStage, Statement};
use rglsl_opt::{Context, DebugLevel, TargetGpu};

const DCE: &[&str] = &["dce"];

#[derive(Debug, Default, PartialEq, Eq)]
struct Shape {
    ifs: usize,
    switches: usize,
    loops: usize,
    calls: usize,
    atomics: usize,
    kills: usize,
}

fn shape(function: &Function) -> Shape {
    let mut shape = Shape::default();
    for statement in function.body.walk() {
        match *statement {
            Statement::If { .. } => shape.ifs += 1,
            Statement::Switch { .. } => shape.switches += 1,
            Statement::Loop { .. } => shape.loops += 1,
            Statement::Call { .. } => shape.calls += 1,
            Statement::Atomic { .. } => shape.atomics += 1,
            Statement::Kill => shape.kills += 1,
            _ => {}
        }
    }
    shape
}

fn breaking_ifs(function: &Function) -> usize {
    function
        .body
        .walk()
        .filter(|statement| match **statement {
            Statement::If {
                ref accept,
                ref reject,
                ..
            } => accept
                .iter()
                .chain(reject.iter())
                .any(|statement| matches!(*statement, Statement::Break)),
            _ => false,
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
    color = inColor;
{body}
}}
"
    )
}

#[test]
fn a_loop_without_live_operations_is_removed() -> TestResult {
    let source = shader(
        "",
        "    int s = 0;
    for (int i = 0; i < k; i++) s += i * 3;",
    );
    let before = fragment(&source, &[])?;
    assert_eq!(shape(entry(&before)?).loops, 1);
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function), Shape::default());
    assert_eq!(function.local_variables.len(), 0);
    Ok(())
}

#[test]
fn nested_dead_loops_are_removed() -> TestResult {
    let source = shader(
        "",
        "    float t = 0.0;
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < i; j++) {
            if (inColor.x > float(j)) t += 1.0; else break;
            while (t < 4.0) t *= 2.0;
        }
    }",
    );
    let module = fragment(&source, DCE)?;
    assert_eq!(shape(entry(&module)?), Shape::default());
    Ok(())
}

fn returns(function: &Function) -> usize {
    function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Return { .. }))
        .count()
}

#[test]
fn a_dead_loop_without_an_exit_becomes_a_return() -> TestResult {
    let source = shader(
        "",
        "    if (k > 2) {
        while (true) { }
    }
    color = vec4(4.0);",
    );
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 0);
    assert_eq!(shape(function).ifs, 1);
    assert_eq!(
        returns(function),
        returns(entry(&fragment(&source, &[])?)?) + 1
    );
    Ok(())
}

#[test]
fn a_loop_without_an_exit_writing_an_output_is_kept() -> TestResult {
    let source = shader("", "    while (true) { color.x += 1.0; }");
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 1);
    assert_eq!(returns(function), returns(entry(&fragment(&source, &[])?)?));
    Ok(())
}

#[test]
fn stores_to_unread_vector_components_are_removed() -> TestResult {
    let source = shader(
        "",
        "    ivec3 v = ivec3(0);
    v.x += k * 3;
    v.y += k;
    v.z += k * 5;
    if (inColor.x > 0.5) {
        v.x += 1;
    }
    color.x = float(v.y);",
    );
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(stores(function, "v"), 2);
    assert_eq!(shape(function).ifs, 0);
    Ok(())
}

#[test]
fn a_whole_load_keeps_every_component_store() -> TestResult {
    let source = shader(
        "",
        "    ivec3 v = ivec3(0);
    v.x += k * 3;
    v.y += k;
    v.z += k * 5;
    color.xyz = vec3(v);",
    );
    let before = fragment(&source, &[])?;
    let module = fragment(&source, DCE)?;
    assert_eq!(stores(entry(&module)?, "v"), stores(entry(&before)?, "v"));
    Ok(())
}

#[test]
fn a_loop_writing_an_output_is_kept() -> TestResult {
    let source = shader("", "    for (int i = 0; i < k; i++) color.x += 1.0;");
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 1);
    assert_eq!(stores(function, "i"), 2);
    Ok(())
}

#[test]
fn a_break_deciding_a_live_store_is_kept() -> TestResult {
    let source = shader(
        "",
        "    int i = 0;
    while (true) {
        if (float(i) > inColor.x) break;
        float unused = float(i) * 2.0;
        i++;
    }
    color.y = float(i);
    for (int j = 0; j < 8; j++) {
        if (inColor.z > 0.5) break;
        color.z += 1.0;
    }",
    );
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 2);
    assert_eq!(breaking_ifs(function), 3);
    assert_eq!(stores(function, "unused"), 0);
    Ok(())
}

#[test]
fn dead_ifs_and_switches_are_removed() -> TestResult {
    let source = shader(
        "",
        "    float t = 0.0;
    if (inColor.x > 0.5) t = 1.0; else t = inColor.y;
    switch (k) {
    case 0: t = 2.0; break;
    case 1: if (t > 1.0) { t = 3.0; }
    default: t = 4.0; break;
    }
    {
        float u = t;
        u += 1.0;
    }",
    );
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function), Shape::default());
    assert!(
        !function
            .body
            .iter()
            .any(|statement| matches!(*statement, Statement::Block(_)))
    );
    Ok(())
}

#[test]
fn a_live_if_keeps_only_its_live_branch_content() -> TestResult {
    let source = shader(
        "",
        "    float t = 0.0;
    if (inColor.x > 0.5) {
        color.w = 1.0;
    } else {
        for (int i = 0; i < k; i++) t += 1.0;
    }",
    );
    let module = fragment(&source, DCE)?;
    let shape = shape(entry(&module)?);
    assert_eq!(shape.ifs, 1);
    assert_eq!(shape.loops, 0);
    Ok(())
}

#[test]
fn discard_keeps_its_loop() -> TestResult {
    let source = shader(
        "",
        "    for (int i = 0; i < k; i++) {
        if (inColor.x > float(i)) discard;
    }",
    );
    let module = fragment(&source, DCE)?;
    let shape = shape(entry(&module)?);
    assert_eq!(shape.loops, 1);
    assert_eq!(shape.kills, 1);
    assert!(shape.ifs >= 1);
    Ok(())
}

#[test]
fn an_atomic_keeps_its_loop() -> TestResult {
    let source = shader(
        "layout(std430, set = 0, binding = 0) buffer Counter { uint counter; };",
        "    for (int i = 0; i < k; i++) {
        if (inColor.x > float(i)) atomicAdd(counter, 1u);
    }",
    );
    let module = fragment(&source, DCE)?;
    let shape = shape(entry(&module)?);
    assert_eq!(shape.loops, 1);
    assert_eq!(shape.atomics, 1);
    Ok(())
}

#[test]
fn a_local_read_by_live_code_keeps_its_stores_and_loop() -> TestResult {
    let source = shader(
        "",
        "    float s = 0.0;
    for (int i = 0; i < k; i++) {
        if (inColor.x > float(i)) s += inColor.y;
    }
    color.y = s;",
    );
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 1);
    assert_eq!(shape(function).ifs, 2);
    assert_eq!(stores(function, "s"), 2);
    Ok(())
}

#[test]
fn a_call_with_side_effects_keeps_its_loop() -> TestResult {
    let source = shader(
        "void paint(float value) { color.z = value; }",
        "    for (int i = 0; i < k; i++) paint(float(i));",
    );
    let module = fragment(&source, DCE)?;
    let shape = shape(entry(&module)?);
    assert_eq!(shape.loops, 1);
    assert_eq!(shape.calls, 1);
    Ok(())
}

#[test]
fn debug_variables_keep_no_dead_code() -> TestResult {
    let source = shader(
        "",
        "    float t = 0.0;
    for (int i = 0; i < k; i++) t += 1.0;",
    );
    let module = optimized(
        ShaderStage::Fragment,
        &source,
        DCE,
        TargetGpu::default(),
        Context {
            debug: DebugLevel::Variables,
            ..Context::default()
        },
    )?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 0);
    assert_eq!(stores(function, "t"), 0);
    assert_eq!(debug_values(function, "t"), 1);
    Ok(())
}

#[test]
fn a_vector_read_whole_after_one_component_keeps_its_component_stores() -> TestResult {
    let source = shader(
        "struct Pair { int tag; vec4 value; };
int steps = 0;
void walk(float start) {
    for (int i = 0; i < k; i++) {
        steps++;
        if (start > 1.0) continue;
    }
}",
        "    Pair pair = Pair(k, vec4(1.0));
    if (k > 2) pair.value.x = 2.0;
    walk(pair.value.x);
    pair.value.yzw = vec3(0.0);
    color = vec4(pair.value.yzw, 1.0);
    if (steps > 1) color.x = 0.5;",
    );
    let split = fragment(&source, &["inline", "sroa"])?;
    let before = stores(entry(&split)?, "pair_value");
    assert!(before >= 4);
    let module = fragment(&source, &["inline", "sroa", "dce"])?;
    assert_eq!(stores(entry(&module)?, "pair_value"), before);
    Ok(())
}

#[test]
fn a_loop_writing_a_local_read_only_in_an_earlier_branch_is_removed() -> TestResult {
    let source = shader(
        "",
        "    int n = 2;
    if (inColor.x > 0.5) {
        color.x = float(n);
    } else if (inColor.y > 0.5) {
        for (int i = 0; i < k; i++) {
            if (inColor.z > float(i)) n++;
        }
        color.y = 1.0;
    }",
    );
    let before = fragment(&source, &[])?;
    assert_eq!(shape(entry(&before)?).loops, 1);
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 0);
    assert_eq!(stores(function, "n"), stores(entry(&before)?, "n") - 1);
    Ok(())
}

#[test]
fn a_store_reaching_a_read_through_a_loop_back_edge_is_kept() -> TestResult {
    let source = shader(
        "",
        "    int n = 2;
    for (int i = 0; i < k; i++) {
        if (inColor.x > float(i)) {
            color.x += float(n);
        } else {
            n++;
        }
    }",
    );
    let before = fragment(&source, &[])?;
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(shape(function).loops, 1);
    assert_eq!(stores(function, "n"), stores(entry(&before)?, "n"));
    Ok(())
}

#[test]
fn a_store_after_the_last_read_is_removed() -> TestResult {
    let source = shader(
        "",
        "    float t = inColor.x;
    if (k > 1) t += inColor.y;
    color.x = t;
    if (k > 2) t = inColor.z;
    t *= 2.0;",
    );
    let before = fragment(&source, &[])?;
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(stores(function, "t"), stores(entry(&before)?, "t") - 2);
    assert_eq!(shape(function).ifs, 1);
    Ok(())
}

#[test]
fn a_store_falling_through_into_the_reading_case_is_kept() -> TestResult {
    let source = shader(
        "",
        "    float t = 0.0;
    switch (k) {
    case 0: t = 1.0; break;
    case 1: t = 2.0;
    case 2: color.x = t; break;
    default: t = 3.0; break;
    }",
    );
    let before = fragment(&source, &[])?;
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(stores(function, "t"), stores(entry(&before)?, "t") - 2);
    Ok(())
}

#[test]
fn a_component_store_after_its_last_read_is_removed() -> TestResult {
    let source = shader(
        "",
        "    vec2 v = inColor.xy;
    color.x = v.x;
    v.x = 3.0;
    v.y += 1.0;
    color.y = v.y;",
    );
    let before = fragment(&source, &[])?;
    let module = fragment(&source, DCE)?;
    let function = entry(&module)?;
    assert_eq!(stores(function, "v"), stores(entry(&before)?, "v") - 1);
    Ok(())
}
