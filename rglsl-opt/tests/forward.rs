mod common;

use common::{
    TestResult, compiled, debug_values, decorations, entry, fragment, loads, local, optimized,
    stores,
};
use rglsl::{AddressSpace, Expression, Module, ShaderStage, Statement};
use rglsl_opt::{Context, DebugLevel, TargetGpu};

const FORWARD: &[&str] = &["forward"];
const CLEAN: &[&str] = &["forward", "dce"];

#[test]
fn a_stored_value_reaches_the_loads_that_follow() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    vec4 x = inColor * 2.0;
    float y = x.y;
    color = x + vec4(y);
}
";
    let before = fragment(source, &[])?;
    assert_eq!(loads(entry(&before)?, "x"), 2);
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "x"), 0);
    assert_eq!(loads(function, "y"), 0);
    let module = fragment(source, CLEAN)?;
    assert!(entry(&module)?.local_variables.is_empty());
    Ok(())
}

#[test]
fn a_value_stored_before_a_loop_reaches_loads_in_the_loop() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float k = inColor.x;
    color = vec4(0.0);
    for (int i = 0; i < 4; i++) color += vec4(k);
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "k"), 0);
    assert_eq!(loads(function, "i"), 1);
    Ok(())
}

fn continuing_source(skip: &str) -> String {
    format!(
        "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {{
    float x = 0.0;
    color = vec4(0.0);
    for (int i = 0; i < 4; i += int(x)) {{
        x = 1.0;
        {skip}
        x = 2.0;
        color += inColor;
    }}
}}
"
    )
}

#[test]
fn the_continuing_block_sees_values_of_the_body_before_any_continue() -> TestResult {
    let module = fragment(&continuing_source(""), FORWARD)?;
    assert_eq!(loads(entry(&module)?, "x"), 0);
    let module = fragment(
        &continuing_source("if (inColor.x > 0.5) continue;"),
        FORWARD,
    )?;
    assert_eq!(loads(entry(&module)?, "x"), 1);
    Ok(())
}

#[test]
fn a_variable_written_in_a_loop_is_read_from_memory_in_the_loop() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float sum = 0.0;
    for (int i = 0; i < 4; i++) {
        float before = sum;
        sum = before + inColor.x;
    }
    color = vec4(sum);
}
";
    let module = fragment(source, CLEAN)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "sum"), 2);
    assert_eq!(loads(function, "before"), 0);
    Ok(())
}

#[test]
fn branches_that_store_different_values_keep_the_load_after_them() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float x = 0.0;
    if (inColor.x > 0.5) x = inColor.y; else x = inColor.z;
    color = vec4(x);
}
";
    let module = fragment(source, CLEAN)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "x"), 1);
    assert_eq!(stores(function, "x"), 2);
    Ok(())
}

#[test]
fn a_value_stored_in_a_branch_reaches_only_that_branch() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float x = inColor.w;
    if (inColor.x > 0.5) {
        x = inColor.y;
        color = vec4(x);
    } else {
        color = vec4(x);
    }
    color += vec4(x);
}
";
    let module = fragment(source, FORWARD)?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "x"), 2);
    Ok(())
}

#[test]
fn repeated_loads_without_a_store_between_them_become_one() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float x = 0.0;
    if (inColor.x > 0.5) x = inColor.y;
    color = vec4(x, x, x * 2.0, x + 1.0);
}
";
    let module = fragment(source, CLEAN)?;
    assert_eq!(loads(entry(&module)?, "x"), 1);
    Ok(())
}

#[test]
fn an_overwritten_store_is_removed() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    vec4 x = inColor;
    x = inColor * 3.0;
    if (inColor.x > 0.5) x = vec4(1.0);
    color = x;
}
";
    let before = fragment(source, &[])?;
    assert_eq!(stores(entry(&before)?, "x"), 3);
    let module = fragment(source, CLEAN)?;
    assert_eq!(stores(entry(&module)?, "x"), 2);
    Ok(())
}

#[test]
fn a_store_before_a_break_is_kept() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float x = 1.0;
    for (int i = 0; i < 4; i++) {
        x = inColor.y;
        if (inColor.x > float(i)) break;
        x = inColor.z;
    }
    color = vec4(x);
}
";
    let module = fragment(source, CLEAN)?;
    assert_eq!(stores(entry(&module)?, "x"), 2);
    Ok(())
}

#[test]
fn a_constant_first_store_becomes_the_initializer() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float sum = 0.0;
    for (int i = 0; i < 4; i++) sum += inColor.x;
    color = vec4(sum);
}
";
    let module = fragment(source, CLEAN)?;
    let function = entry(&module)?;
    for name in ["sum", "i"] {
        let handle = local(function, name).ok_or(name)?;
        let init = function.local_variables[handle].init.ok_or(name)?;
        assert!(matches!(function.expressions[init], Expression::Literal(_)));
        assert_eq!(stores(function, name), 1, "{name}");
    }
    Ok(())
}

fn private_globals(module: &Module) -> Vec<String> {
    module
        .global_variables
        .iter()
        .filter(|(_, global)| global.space == AddressSpace::Private)
        .filter_map(|(_, global)| global.name.clone())
        .collect()
}

#[test]
fn private_globals_of_one_entry_point_become_locals() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
vec4 scratch;
float scale = 2.0;
const vec2 pair = vec2(1.0, 2.0);
vec2 copy = pair;
void main() {
    scratch = inColor * scale;
    color = scratch + vec4(copy, 0.0, 0.0);
}
";
    let before = fragment(source, &["dce"])?;
    assert_eq!(private_globals(&before).len(), 3);
    let module = fragment(source, CLEAN)?;
    assert!(private_globals(&module).is_empty());
    let function = entry(&module)?;
    assert!(function.local_variables.is_empty());
    Ok(())
}

#[test]
fn a_private_global_read_before_it_is_written_reads_as_undefined() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
vec4 state;
void main() {
    color = state;
    state = inColor;
    color += state;
}
";
    let module = fragment(source, CLEAN)?;
    let function = entry(&module)?;
    assert!(local(function, "state").is_none());
    assert!(
        function
            .expressions
            .iter()
            .any(|(_, expression)| matches!(*expression, Expression::Undef(_)))
    );
    let first = fragment(source, &[])?;
    assert!(private_globals(&first).iter().any(|name| name == "state"));
    Ok(())
}

#[test]
fn a_private_global_of_two_functions_stays_global() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
vec4 shared_value;
void touch() { shared_value *= 2.0; }
void main() {
    shared_value = inColor;
    touch();
    touch();
    color = shared_value;
}
";
    let mobile = optimized(
        ShaderStage::Fragment,
        source,
        &["inline", "dce", "forward", "dce"],
        TargetGpu::UniversalMobile,
        Context::default(),
    )?;
    assert_eq!(private_globals(&mobile), ["shared_value"]);
    let desktop = fragment(source, &["inline", "dce", "forward", "dce"])?;
    assert!(private_globals(&desktop).is_empty());
    Ok(())
}

#[test]
fn a_private_global_of_an_unlinked_module_stays_global() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
vec4 scratch;
void main() {
    scratch = inColor;
    color = scratch;
}
";
    let module = optimized(
        ShaderStage::Fragment,
        source,
        CLEAN,
        TargetGpu::default(),
        Context {
            unlinked: true,
            ..Context::default()
        },
    )?;
    assert_eq!(private_globals(&module), ["scratch"]);
    Ok(())
}

#[test]
fn forwarded_values_keep_their_non_uniform_decoration() -> TestResult {
    let source = "#version 450
#extension GL_EXT_nonuniform_qualifier : enable
layout(location = 0) flat in int index;
layout(location = 1) in vec2 uv;
layout(location = 0) out vec4 color;
layout(set = 0, binding = 0) uniform sampler2D textures[];
void main() {
    int i = index;
    color = texture(textures[nonuniformEXT(i)], uv);
}
";
    let before = compiled(
        ShaderStage::Fragment,
        source,
        &[],
        TargetGpu::default(),
        Context::default(),
    )?;
    let after = compiled(
        ShaderStage::Fragment,
        source,
        CLEAN,
        TargetGpu::default(),
        Context::default(),
    )?;
    assert!(entry(&after.module)?.local_variables.is_empty());
    let expected = decorations(&before.words, spirv::Decoration::NonUniform);
    assert!(expected > 0);
    assert_eq!(
        decorations(&after.words, spirv::Decoration::NonUniform),
        expected
    );
    Ok(())
}

#[test]
fn a_variable_passed_by_pointer_is_left_alone() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void set(out float a) { a = inColor.x; }
void main() {
    float x = 1.0;
    set(x);
    set(x);
    color = vec4(x);
}
";
    let module = optimized(
        ShaderStage::Fragment,
        source,
        &["inline", "forward"],
        TargetGpu::UniversalMobile,
        Context::default(),
    )?;
    let function = entry(&module)?;
    let mut passed = Vec::new();
    for statement in function.body.walk() {
        if let Statement::Call { ref arguments, .. } = *statement {
            for &argument in arguments {
                if let Expression::LocalVariable(local) = function.expressions[argument] {
                    passed.push(local);
                }
            }
        }
    }
    assert_eq!(passed.len(), 2);
    for local in passed {
        let loaded = common::emitted(function).into_iter().any(|handle| {
            matches!(
                function.expressions[handle],
                Expression::Load { pointer }
                    if function.expressions[pointer] == Expression::LocalVariable(local)
            )
        });
        assert!(loaded, "{local:?}");
    }
    Ok(())
}

#[test]
fn forwarded_stores_of_debug_variables_become_debug_values() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
vec4 scratch;
void main() {
    float x = 0.0;
    x = inColor.x * 2.0;
    scratch = inColor;
    color = vec4(x) + scratch;
}
";
    let module = optimized(
        ShaderStage::Fragment,
        source,
        CLEAN,
        TargetGpu::default(),
        Context {
            debug: DebugLevel::Variables,
            ..Context::default()
        },
    )?;
    let function = entry(&module)?;
    assert_eq!(loads(function, "x"), 0);
    assert_eq!(stores(function, "x"), 0);
    assert_eq!(debug_values(function, "x"), 2);
    assert!(private_globals(&module).is_empty());
    Ok(())
}

#[test]
fn components_stored_one_by_one_make_up_the_vector() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    vec4 x = vec4(0.0);
    x.x += inColor.y;
    x.yz = inColor.zw;
    vec4 y = inColor;
    y.zw = vec2(1.0);
    color = x + y + vec4(y.w + y.x);
}
";
    let module = fragment(source, CLEAN)?;
    assert!(entry(&module)?.local_variables.is_empty());
    Ok(())
}

fn output_loads(module: &Module) -> TestResult<usize> {
    let function = entry(module)?;
    Ok(common::emitted(function)
        .into_iter()
        .filter(|&handle| match function.expressions[handle] {
            Expression::Load { pointer } => matches!(
                function.expressions[pointer],
                Expression::GlobalVariable(global)
                    if module.global_variables[global].space == AddressSpace::Output
            ),
            _ => false,
        })
        .count())
}

#[test]
fn outputs_written_earlier_are_not_read_back() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    color = inColor;
    color += vec4(1.0);
    if (inColor.x > 0.5) color *= 2.0;
    color.x += 1.0;
}
";
    let before = fragment(source, &[])?;
    assert_eq!(output_loads(&before)?, 2);
    let module = fragment(source, FORWARD)?;
    assert_eq!(output_loads(&module)?, 0);
    let geometry = "#version 450
layout(points) in;
layout(points, max_vertices = 2) out;
layout(location = 0) out vec4 color;
void main() {
    color = vec4(1.0);
    EmitVertex();
    color += vec4(1.0);
    EmitVertex();
}
";
    let module = optimized(
        ShaderStage::Geometry,
        geometry,
        FORWARD,
        TargetGpu::default(),
        Context::default(),
    )?;
    assert_eq!(output_loads(&module)?, 1);
    Ok(())
}

fn output_stores(module: &Module) -> TestResult<usize> {
    let function = entry(module)?;
    Ok(function
        .body
        .walk()
        .filter(|statement| match **statement {
            Statement::Store { pointer, .. } => matches!(
                function.expressions[pointer],
                Expression::GlobalVariable(global)
                    if module.global_variables[global].space == AddressSpace::Output
            ),
            _ => false,
        })
        .count())
}

#[test]
fn an_overwritten_output_store_is_removed_unless_a_return_may_skip_the_next_one() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    color = vec4(0.0);
    color = inColor;
    if (inColor.x > 0.5) return;
    color = inColor * 2.0;
}
";
    let before = fragment(source, &[])?;
    assert_eq!(output_stores(&before)?, 3);
    let module = fragment(source, FORWARD)?;
    assert_eq!(output_stores(&module)?, 2);
    Ok(())
}
