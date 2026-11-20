mod common;

use common::{TestResult, compiled};
use rglsl::ShaderStage;
use rglsl_opt::{Context, TargetGpu};

const PHI: u32 = 245;
const VARIABLE: u32 = 59;
const STORE: u32 = 62;
const LOAD: u32 = 61;
const COMPOSITE_INSERT: u32 = 82;
const CONSTANT_NULL: u32 = 46;
const FUNCTION_STORAGE: u32 = 7;

struct Counts {
    phis: usize,
    variables: usize,
    stores: usize,
    loads: usize,
    inserts: usize,
    nulls: usize,
}

fn counts(words: &[u32]) -> Counts {
    let mut counts = Counts {
        phis: 0,
        variables: 0,
        stores: 0,
        loads: 0,
        inserts: 0,
        nulls: 0,
    };
    let mut at = 5;
    while let Some(&first) = words.get(at) {
        let length = (first >> 16) as usize;
        if length == 0 {
            break;
        }
        match first & 0xffff {
            PHI => counts.phis += 1,
            VARIABLE if words.get(at + 3) == Some(&FUNCTION_STORAGE) => counts.variables += 1,
            STORE => counts.stores += 1,
            LOAD => counts.loads += 1,
            COMPOSITE_INSERT => counts.inserts += 1,
            CONSTANT_NULL => counts.nulls += 1,
            _ => {}
        }
        at += length;
    }
    counts
}

fn shader(globals: &str, body: &str) -> String {
    format!(
        "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 1) flat in int count;
layout(location = 0) out vec4 color;
{globals}
void main() {{
{body}
}}
"
    )
}

fn fragment(source: &str, passes: &[&str]) -> TestResult<Counts> {
    let compiled = compiled(
        ShaderStage::Fragment,
        source,
        passes,
        TargetGpu::default(),
        Context::default(),
    )?;
    Ok(counts(&compiled.words))
}

#[test]
fn a_local_written_on_both_branches_becomes_a_phi() -> TestResult {
    let source = shader(
        "",
        "    float x;
    if (inColor.x > 0.5) { x = inColor.y; } else { x = inColor.z; }
    color = vec4(x);",
    );
    let before = fragment(&source, &[])?;
    assert_eq!((before.phis, before.variables), (0, 1));
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.phis, after.variables), (1, 0));
    Ok(())
}

#[test]
fn a_value_carried_by_a_loop_gets_header_phis() -> TestResult {
    let source = shader(
        "",
        "    float s = 0.0;
    for (int i = 0; i < count; i++) { s += float(i); }
    color = vec4(s);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!(after.variables, 0);
    assert_eq!(after.phis, 2);
    Ok(())
}

#[test]
fn values_reaching_a_loop_exit_merge_through_breaks() -> TestResult {
    let source = shader(
        "",
        "    float s = 0.0;
    int i = 0;
    while (true) {
        if (float(i) > inColor.x) { s = 1.0; break; }
        if (i > count) { break; }
        s += inColor.y;
        i++;
    }
    color = vec4(s);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!(after.variables, 0);
    assert!(after.phis >= 3);
    Ok(())
}

#[test]
fn a_local_passed_by_pointer_stays_a_variable() -> TestResult {
    let source = shader(
        "void set(out float a) { a = inColor.x; }",
        "    float x;
    float y = inColor.y;
    if (inColor.z > 0.0) { y = 2.0; }
    set(x);
    color = vec4(x, y, 0.0, 1.0);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!(after.variables, 1);
    assert_eq!(after.phis, 1);
    Ok(())
}

#[test]
fn a_dynamically_indexed_local_stays_a_variable() -> TestResult {
    let source = shader(
        "",
        "    vec4 v = inColor;
    v[count & 3] = 1.0;
    color = v;",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.variables, after.phis), (1, 0));
    Ok(())
}

#[test]
fn component_stores_become_inserts() -> TestResult {
    let source = shader(
        "",
        "    vec4 v = vec4(0.0);
    if (inColor.x > 0.5) { v.y = inColor.y; }
    v.x = inColor.z;
    color = v;",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.variables, after.stores), (0, 1));
    assert_eq!(after.inserts, 2);
    assert_eq!(after.phis, 1);
    Ok(())
}

#[test]
fn a_local_read_before_written_starts_as_null() -> TestResult {
    let source = shader(
        "",
        "    float x;
    if (inColor.x > 0.5) { x = inColor.y; }
    color = vec4(x);",
    );
    let before = fragment(&source, &[])?;
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.variables, after.phis), (0, 1));
    assert_eq!(after.nulls, before.nulls);
    Ok(())
}

#[test]
fn switches_merge_the_values_of_their_cases() -> TestResult {
    let source = shader(
        "",
        "    float x = 0.0;
    switch (count) {
        case 0: x = inColor.x; break;
        case 1: if (inColor.y > 0.0) { x = 2.0; break; } x = 3.0; break;
        default: break;
    }
    color = vec4(x);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.variables, after.phis), (0, 1));
    Ok(())
}

#[test]
fn a_local_written_in_a_falling_through_case_stays_a_variable() -> TestResult {
    let source = shader(
        "",
        "    float x = 0.0;
    float y = 1.0;
    switch (count) {
        case 0: x = inColor.x;
        case 1: x += 1.0; break;
        default: y = 2.0; break;
    }
    color = vec4(x, y, 0.0, 1.0);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.variables, after.phis), (1, 1));
    Ok(())
}

#[test]
fn continue_paths_meet_at_the_continuing_block() -> TestResult {
    let source = shader(
        "",
        "    float s = 0.0;
    float t = 0.0;
    for (int i = 0; i < count; i++) {
        t = float(i);
        if (inColor.x > t) { continue; }
        t = t * 2.0;
        s += t;
    }
    color = vec4(s, t, 0.0, 1.0);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!(after.variables, 0);
    assert!(after.phis >= 4);
    Ok(())
}

#[test]
fn promotion_follows_the_other_passes() -> TestResult {
    let source = shader(
        "",
        "    float s = 0.0;
    for (int i = 0; i < count; i++) {
        if (inColor.x > float(i)) { s += inColor.y; } else { s -= 1.0; }
    }
    color = vec4(s);",
    );
    let after = fragment(&source, &["forward", "fold", "dce", "ssa"])?;
    assert_eq!(after.variables, 0);
    assert!(after.phis >= 3);
    Ok(())
}

#[test]
fn matrices_stay_variables() -> TestResult {
    let source = shader(
        "",
        "    mat2 m = mat2(inColor);
    if (inColor.x > 0.5) { m = mat2(inColor.wzyx); }
    color = vec4(m[0], m[1]);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert_eq!((after.variables, after.phis), (1, 0));
    Ok(())
}

#[test]
fn booleans_stored_in_loops_stay_variables() -> TestResult {
    let source = shader(
        "",
        "    bool positive = true;
    bool first = inColor.x > 0.0;
    if (inColor.y > 0.0) { first = !first; }
    float s = 0.0;
    for (int i = 0; i < count; i++) {
        positive = positive && inColor[i & 3] > 0.0;
        s += float(i);
    }
    color = vec4(s, positive ? 1.0 : 0.0, first ? 1.0 : 0.0, 1.0);",
    );
    let after = fragment(&source, &["ssa"])?;
    assert!(after.variables >= 1);
    assert!(after.phis >= 3);
    Ok(())
}
