#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

use rglsl_fuzz::{analyze_shader, parse_shader, prepare_reference, ShaderJob};
use rglsl_sema::Stage;
use serde_json::Value;

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

fn job() -> ShaderJob {
    ShaderJob::parse(JSON, &[(String::from("frag"), SHADER.to_owned())]).expect("a valid job")
}

fn json(job: &ShaderJob) -> Value {
    serde_json::from_str(&job.emit().json).expect("valid JSON")
}

fn fragment(job: &ShaderJob) -> String {
    job.emit().shaders[0].1.clone()
}

#[test]
fn braces_are_added_to_every_branch_and_loop_body() {
    let prepared = prepare_reference(&job(), 0, false).expect("prepared");
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
}

#[test]
fn uniforms_without_values_get_zeros() {
    let prepared = prepare_reference(&job(), 0, false).expect("prepared");
    let uniforms = json(&prepared);
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
}

#[test]
fn every_loose_uniform_gets_its_own_block_and_binding() {
    let prepared = prepare_reference(&job(), 0, true).expect("prepared");
    let text = fragment(&prepared);
    let uniforms = json(&prepared);
    for (name, declaration) in [
        ("time", "float time;"),
        ("resolution", "vec2 resolution;"),
        ("offset", "vec2 offset;"),
        ("counts", "int counts[3];"),
    ] {
        let binding = uniforms[name]["binding"].as_u64().expect("a binding");
        let block = format!(
            "layout(set = 0, binding = {binding}) uniform buf{binding} {{\n    {declaration}\n}};"
        );
        assert!(text.contains(&block), "{block}\n{text}");
    }
    let sampler = uniforms["tex"]["binding"].as_u64().expect("a binding");
    assert!(text.contains(&format!(
        "layout(set = 0, binding = {sampler}) uniform sampler2D tex;"
    )));
    let mut bindings: Vec<u64> = ["time", "resolution", "offset", "counts", "tex"]
        .iter()
        .map(|name| uniforms[*name]["binding"].as_u64().expect("a binding"))
        .collect();
    bindings.sort_unstable();
    assert_eq!(bindings, [0, 1, 2, 3, 4]);
    let unit = parse_shader(&text).expect("the prepared shader parses");
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}",
        analysis.diagnostics
    );
}

#[test]
fn surplus_uniforms_become_initialised_globals() {
    let prepared = prepare_reference(&job(), 3, true).expect("prepared");
    let uniforms = json(&prepared);
    let names: Vec<&String> = uniforms.as_object().expect("an object").keys().collect();
    assert_eq!(names, ["resolution", "tex", "time"]);
    let text = fragment(&prepared);
    assert!(text.contains("int counts[3] = int[3](1, 2, 3);"), "{text}");
    assert!(text.contains("vec2 offset = vec2(0.0, 0.0);"), "{text}");
    assert!(text.contains("uniform buf"), "{text}");
    let unit = parse_shader(&text).expect("the prepared shader parses");
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}",
        analysis.diagnostics
    );
}

#[test]
fn existing_bindings_are_skipped() {
    let shader = "#version 450
layout(set = 0, binding = 0) uniform sampler2D first;
uniform float value;
layout(location = 0) out vec4 color;
void main() { color = texture(first, vec2(value)); }
";
    let job = ShaderJob::parse(
        r#"{ "first": { "func": "sampler2D", "texture": "DEFAULT", "binding": 0 } }"#,
        &[(String::from("frag"), shader.to_owned())],
    )
    .expect("a valid job");
    let mut prepared = prepare_reference(&job, 0, false).expect("prepared");
    prepared.make_uniform_bindings(None).expect("bindings");
    let text = fragment(&prepared);
    assert!(
        text.contains("layout(set = 0, binding = 1) uniform buf1 {\n    float value;\n};"),
        "{text}"
    );
}
