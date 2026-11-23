mod common;

use common::{TestResult, debug_values, fragment, optimized};
use rglsl::{AddressSpace, Module, ShaderStage, Statement};
use rglsl_opt::{Context, DebugLevel, TargetGpu};

fn calls(module: &Module) -> usize {
    module
        .entry_points
        .iter()
        .map(|entry| &entry.function)
        .chain(module.functions.iter().map(|(_, function)| function))
        .flat_map(|function| function.body.walk())
        .filter(|statement| matches!(**statement, Statement::Call { .. }))
        .count()
}

fn entry_calls(module: &Module) -> TestResult<usize> {
    let entry = module.entry_points.first().ok_or("no entry point")?;
    Ok(entry
        .function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Call { .. }))
        .count())
}

const RETURNS: &str = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
float early(float x) { if (x < 0.0) return 0.0; float y = x * 2.0; return y + 1.0; }
float looped(float x) {
    for (int i = 0; i < 4; i++) { if (x > 10.0) return x; x *= 2.0; }
    return -x;
}
float switched(int k) {
    switch (k) { case 0: return 1.0; case 1: break; default: if (k > 5) return 3.0; }
    return 2.0;
}
void out_param(out float a, inout float b) { a = 1.0; b += a; }
void nothing() {}
float twice(float x) { float t = 1.0; t += x; return t; }
void main() {
    float a, b = 2.0;
    out_param(a, b);
    nothing();
    color = inColor * early(inColor.x) + vec4(looped(a), switched(int(b)), 0.0, 0.0);
    for (int i = 0; i < 3; i++) color.x += twice(float(i));
}
";

#[test]
fn inline_removes_every_call_from_the_entry_point() -> TestResult {
    let before = fragment(RETURNS, &[])?;
    assert!(entry_calls(&before)? > 0);
    let module = fragment(RETURNS, &["inline"])?;
    assert_eq!(entry_calls(&module)?, 0);
    Ok(())
}

#[test]
fn inline_then_dce_leaves_one_function() -> TestResult {
    let module = fragment(RETURNS, &["inline", "dce"])?;
    assert_eq!(calls(&module), 0);
    assert!(module.functions.is_empty());
    Ok(())
}

#[test]
fn a_call_in_a_continuing_block_to_a_function_that_discards_stays() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
int step_or_discard(int i) { if (i > 100) discard; return i + 1; }
int plain(int i) { return i + 2; }
void main() {
    color = vec4(0.0);
    for (int i = 0; i < 4; i = step_or_discard(i)) color.x += 1.0;
    for (int i = 0; i < 4; i = plain(i)) color.y += 1.0;
}
";
    let module = fragment(source, &["inline"])?;
    assert_eq!(entry_calls(&module)?, 1);
    Ok(())
}

#[test]
fn a_chain_of_calls_is_inlined_into_main() -> TestResult {
    let mut source = String::from("#version 450\nlayout(location = 0) out vec4 color;\n");
    source.push_str("int h0(int a) { return a + 1; }\n");
    for level in 1..200 {
        source.push_str(&format!(
            "int h{level}(int a) {{ if (a > {level}) return a; return h{}(a) + 1; }}\n",
            level - 1
        ));
    }
    source.push_str("void main() { color = vec4(float(h199(int(gl_FragCoord.x)))); }\n");
    let module = fragment(&source, &["inline", "dce"])?;
    assert_eq!(calls(&module), 0);
    Ok(())
}

#[test]
fn the_mobile_profile_inlines_only_functions_called_once() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
float once(float x) { return x * 3.0; }
float many(float x) { return x * 5.0; }
void main() { color = vec4(once(1.0), many(2.0), many(3.0), 1.0); }
";
    let module = optimized(
        ShaderStage::Fragment,
        source,
        &["inline", "dce"],
        TargetGpu::UniversalMobile,
        Context::default(),
    )?;
    assert_eq!(entry_calls(&module)?, 2);
    assert_eq!(module.functions.len(), 1);
    let desktop = fragment(source, &["inline", "dce"])?;
    assert_eq!(calls(&desktop), 0);
    Ok(())
}

const INTERFACE: &str = "#version 450
layout(location = 0) in vec4 used;
layout(location = 1) in vec4 unused;
layout(location = 2) sample in vec4 per_sample;
layout(location = 0) out vec4 color;
layout(location = 1) out vec4 never_written;
layout(set = 0, binding = 0) uniform U { vec4 k; } u;
layout(set = 0, binding = 1) uniform sampler2D unused_texture;
layout(push_constant) uniform P { vec4 p; } unused_push;
void main() {
    float dead = 3.0;
    dead = used.x + 2.0;
    color = used * u.k;
}
";

fn globals(module: &Module) -> Vec<String> {
    module
        .global_variables
        .iter()
        .filter_map(|(_, global)| global.name.clone())
        .collect()
}

#[test]
fn dce_removes_unused_inputs_and_resources_and_keeps_outputs() -> TestResult {
    let module = fragment(INTERFACE, &["dce"])?;
    let names = globals(&module);
    for kept in ["used", "per_sample", "color", "never_written", "u"] {
        assert!(names.iter().any(|name| name == kept), "{kept}: {names:?}");
    }
    for removed in ["unused", "unused_texture", "unused_push"] {
        assert!(
            !names.iter().any(|name| name == removed),
            "{removed}: {names:?}"
        );
    }
    let entry = module.entry_points.first().ok_or("no entry point")?;
    assert!(entry.function.local_variables.is_empty());
    assert!(entry.interface.iter().all(|&global| {
        module.global_variables[global].space != AddressSpace::Input
            || module.global_variables[global]
                .name
                .as_deref()
                .is_some_and(|name| name != "unused")
    }));
    Ok(())
}

#[test]
fn dce_keeps_debug_variables_only_for_their_debug_values() -> TestResult {
    let module = optimized(
        ShaderStage::Fragment,
        INTERFACE,
        &["dce"],
        TargetGpu::default(),
        Context {
            debug: DebugLevel::Variables,
        },
    )?;
    let entry = module.entry_points.first().ok_or("no entry point")?;
    assert_eq!(entry.function.local_variables.len(), 1);
    assert_eq!(debug_values(&entry.function, "dead"), 1);
    assert!(!globals(&module).iter().any(|name| name == "unused"));
    Ok(())
}

#[test]
fn dce_removes_stores_to_private_variables_nobody_reads() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
vec4 written_only;
vec4 read_back;
void main() {
    written_only = vec4(1.0);
    read_back = vec4(2.0);
    color = read_back;
}
";
    let module = fragment(source, &["dce"])?;
    let names = globals(&module);
    assert!(
        !names.iter().any(|name| name == "written_only"),
        "{names:?}"
    );
    assert!(names.iter().any(|name| name == "read_back"), "{names:?}");
    Ok(())
}
