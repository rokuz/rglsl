mod common;

use common::{TestResult, entry, fragment, loads, local, optimized};
use rglsl::{Function, Module, ShaderStage, TypeInner};
use rglsl_opt::{Context, TargetGpu};

fn aggregates(module: &Module, function: &Function) -> Vec<String> {
    function
        .local_variables
        .iter()
        .filter(|(_, variable)| {
            matches!(
                module.types[variable.ty].inner,
                TypeInner::Struct { .. } | TypeInner::Array { .. }
            )
        })
        .map(|(_, variable)| variable.name.clone().unwrap_or_default())
        .collect()
}

#[test]
fn a_struct_read_by_members_is_split_into_variables() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
struct Light { vec3 direction; float power; };
void main() {
    Light light;
    light.direction = inColor.xyz;
    light.power = inColor.w;
    if (inColor.x > 0.5) light.power *= 2.0;
    color = vec4(light.direction * light.power, 1.0);
}
";
    let before = fragment(source, &[])?;
    assert_eq!(aggregates(&before, entry(&before)?), ["light"]);
    let module = fragment(source, &["sroa"])?;
    let function = entry(&module)?;
    assert!(local(function, "light_direction").is_some());
    assert!(local(function, "light_power").is_some());
    let module = fragment(source, &["sroa", "forward", "dce"])?;
    let function = entry(&module)?;
    assert!(aggregates(&module, function).is_empty());
    assert!(local(function, "light_direction").is_none());
    assert_eq!(loads(function, "light_power"), 1);
    Ok(())
}

#[test]
fn an_array_with_constant_indices_disappears() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float weights[3] = float[](0.25, 0.5, 0.25);
    weights[1] = inColor.y;
    color = vec4(weights[0] + weights[1] + weights[2]);
}
";
    let module = fragment(source, &["sroa", "forward", "dce"])?;
    assert!(entry(&module)?.local_variables.is_empty());
    Ok(())
}

#[test]
fn an_array_with_a_dynamic_index_stays() -> TestResult {
    let source = "#version 450
layout(location = 0) flat in int index;
layout(location = 0) out vec4 color;
void main() {
    float weights[3] = float[](0.25, 0.5, 0.25);
    weights[1] = 2.0;
    color = vec4(weights[index]);
}
";
    let module = fragment(source, &["sroa"])?;
    assert_eq!(aggregates(&module, entry(&module)?), ["weights"]);
    Ok(())
}

#[test]
fn whole_loads_and_stores_of_a_split_variable_go_member_by_member() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
struct Pair { vec2 a; vec2 b; };
layout(set = 0, binding = 0) uniform U { Pair pair; } u;
void main() {
    Pair p = u.pair;
    p.a = inColor.xy;
    Pair q = p;
    q.b += vec2(1.0);
    color = vec4(q.a, q.b);
}
";
    let module = fragment(source, &["sroa"])?;
    let function = entry(&module)?;
    assert!(local(function, "p_a").is_some());
    assert!(local(function, "q_b").is_some());
    let module = fragment(
        source,
        &["sroa", "forward", "dce", "sroa", "forward", "dce"],
    )?;
    assert!(aggregates(&module, entry(&module)?).is_empty());
    Ok(())
}

#[test]
fn nested_aggregates_are_split_one_level_per_run() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
struct Inner { float values[2]; };
void main() {
    Inner inner;
    inner.values[0] = inColor.x;
    inner.values[1] = inColor.y;
    if (inColor.z > 0.5) inner.values[1] = 0.0;
    color = vec4(inner.values[0], inner.values[1], 0.0, 1.0);
}
";
    let once = fragment(source, &["sroa", "forward", "dce"])?;
    assert_eq!(aggregates(&once, entry(&once)?), ["inner_values"]);
    let twice = fragment(
        source,
        &["sroa", "forward", "dce", "sroa", "forward", "dce"],
    )?;
    let function = entry(&twice)?;
    assert!(aggregates(&twice, function).is_empty());
    assert_eq!(loads(function, "inner_values_1"), 1);
    Ok(())
}

#[test]
fn the_mobile_profile_splits_only_small_arrays() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float big[100];
    big[3] = inColor.x;
    big[7] = inColor.y;
    if (inColor.z > 0.5) big[7] = 1.0;
    color = vec4(big[3], big[7], 0.0, 1.0);
}
";
    let mobile = optimized(
        ShaderStage::Fragment,
        source,
        &["sroa"],
        TargetGpu::UniversalMobile,
        Context::default(),
    )?;
    assert_eq!(aggregates(&mobile, entry(&mobile)?), ["big"]);
    let desktop = fragment(source, &["sroa", "forward", "dce"])?;
    assert!(aggregates(&desktop, entry(&desktop)?).is_empty());
    Ok(())
}
