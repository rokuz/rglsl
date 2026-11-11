#![allow(
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

use rglsl_fuzz::{analyze_shader, parse_shader, prepare_reference, ShaderJob};
use rglsl_sema::Stage;
use serde_json::Value;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const SHADER: &str = "#version 450
precision highp float;
layout(location = 0) out vec4 _GLF_color;
uniform float time;
uniform vec2 resolution, offset;
uniform int counts[3];
uniform sampler2D tex;
void main() {
    float x = time;
    if (x > 0.0) x = 1.0; else if (x < 0.0) x = 2.0; else x = 3.0;
    for (int i = 0; i < counts[0]; i++) x += 1.0;
    while (x < 10.0) x *= 2.0;
    do x -= 1.0; while (x > 5.0);
    _GLF_color = texture(tex, resolution + offset) * x;
}
";

const JSON: &str = r#"{
  "resolution": { "func": "glUniform2f", "args": [256.0, 128.0] },
  "counts": { "func": "glUniform1iv", "args": [1, 2, 3], "count": 3 }
}"#;

fn job() -> TestResult<ShaderJob> {
    Ok(ShaderJob::parse(
        JSON,
        &[(String::from("frag"), SHADER.to_owned())],
    )?)
}

fn json(job: &ShaderJob) -> TestResult<Value> {
    Ok(serde_json::from_str(&job.emit().json)?)
}

fn fragment(job: &ShaderJob) -> String {
    job.emit().shaders[0].1.clone()
}

#[test]
fn braces_are_added_to_every_branch_and_loop_body() -> TestResult {
    let prepared = prepare_reference(&job()?, 0, false)?;
    let text = fragment(&prepared);
    assert!(
        text.contains("if (x > 0.0) {\n        x = 1.0;\n    } else {\n        if (x < 0.0) {"),
        "{text}"
    );
    assert!(
        text.contains("} else {\n            x = 3.0;\n        }"),
        "{text}"
    );
    assert!(text.contains("i++) {\n        x += 1.0;\n    }"), "{text}");
    assert!(
        text.contains("while (x < 10.0) {\n        x *= 2.0;\n    }"),
        "{text}"
    );
    assert!(
        text.contains("do {\n        x -= 1.0;\n    } while (x > 5.0);"),
        "{text}"
    );
    Ok(())
}

#[test]
fn uniforms_without_values_get_zeros() -> TestResult {
    let prepared = prepare_reference(&job()?, 0, false)?;
    let uniforms = json(&prepared)?;
    assert_eq!(uniforms["time"]["func"], "glUniform1f");
    assert_eq!(uniforms["time"]["args"], serde_json::json!([0.0]));
    assert_eq!(uniforms["offset"]["func"], "glUniform2f");
    assert_eq!(uniforms["offset"]["args"], serde_json::json!([0.0, 0.0]));
    assert_eq!(
        uniforms["resolution"]["args"],
        serde_json::json!([256.0, 128.0])
    );
    assert_eq!(uniforms["tex"]["func"], "sampler2D");
    assert_eq!(uniforms["tex"]["texture"], "DEFAULT");
    Ok(())
}

#[test]
fn every_loose_uniform_gets_its_own_block_and_binding() -> TestResult {
    let prepared = prepare_reference(&job()?, 0, true)?;
    let text = fragment(&prepared);
    let uniforms = json(&prepared)?;
    for (name, declaration) in [
        ("time", "float time;"),
        ("resolution", "vec2 resolution;"),
        ("offset", "vec2 offset;"),
        ("counts", "int counts[3];"),
    ] {
        let binding = uniforms[name]["binding"]
            .as_u64()
            .ok_or_else(|| format!("{name} has no binding"))?;
        let block = format!(
            "layout(set = 0, binding = {binding}) uniform buf{binding} {{\n    {declaration}\n}};"
        );
        assert!(text.contains(&block), "{block}\n{text}");
    }
    let sampler = uniforms["tex"]["binding"]
        .as_u64()
        .ok_or("tex has no binding")?;
    assert!(text.contains(&format!(
        "layout(set = 0, binding = {sampler}) uniform sampler2D tex;"
    )));
    let mut bindings: Vec<u64> = ["time", "resolution", "offset", "counts", "tex"]
        .iter()
        .map(|name| uniforms[*name]["binding"].as_u64())
        .collect::<Option<_>>()
        .ok_or("a uniform has no binding")?;
    bindings.sort_unstable();
    assert_eq!(bindings, [0, 1, 2, 3, 4]);
    let unit = parse_shader(&text)?;
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}",
        analysis.diagnostics
    );
    Ok(())
}

#[test]
fn surplus_uniforms_become_initialised_globals() -> TestResult {
    let prepared = prepare_reference(&job()?, 3, true)?;
    let uniforms = json(&prepared)?;
    let names: Vec<&String> = uniforms
        .as_object()
        .ok_or("the uniforms are not an object")?
        .keys()
        .collect();
    assert_eq!(names, ["resolution", "tex", "time"]);
    let text = fragment(&prepared);
    assert!(text.contains("int counts[3] = int[3](1, 2, 3);"), "{text}");
    assert!(text.contains("vec2 offset = vec2(0.0, 0.0);"), "{text}");
    assert!(text.contains("uniform buf"), "{text}");
    let unit = parse_shader(&text)?;
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}",
        analysis.diagnostics
    );
    Ok(())
}

#[test]
fn existing_bindings_are_skipped() -> TestResult {
    let shader = "#version 450
layout(set = 0, binding = 0) uniform sampler2D first;
uniform float value;
layout(location = 0) out vec4 color;
void main() { color = texture(first, vec2(value)); }
";
    let job = ShaderJob::parse(
        r#"{ "first": { "func": "sampler2D", "texture": "DEFAULT", "binding": 0 } }"#,
        &[(String::from("frag"), shader.to_owned())],
    )?;
    let mut prepared = prepare_reference(&job, 0, false)?;
    prepared.make_uniform_bindings(None)?;
    let text = fragment(&prepared);
    assert!(
        text.contains("layout(set = 0, binding = 1) uniform buf1 {\n    float value;\n};"),
        "{text}"
    );
    Ok(())
}
