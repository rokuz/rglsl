#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

use rglsl_fuzz::{analyze_shader, generate_family, parse_shader, FamilyOptions, Random, ShaderJob};
use rglsl_sema::Stage;

const JSON: &str = r#"{
    "injectionSwitch": { "func": "glUniform2f", "args": [0.0, 1.0] },
    "resolution": { "func": "glUniform2f", "args": [256.0, 256.0] }
}"#;

const SHADER: &str = r#"#version 450
#extension GL_EXT_debug_printf : enable
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform buf0 { vec2 injectionSwitch; };
layout(set = 0, binding = 1) uniform buf1 { vec2 resolution; };
void main() {
    float x = gl_FragCoord.x / resolution.x;
    int count = 0;
    for (int i = 0; i < 4; i++) {
        count += i;
        debugPrintfEXT("step \"%d\"\t%f\n", count, x);
    }
    "a statement";
    debugPrintfEXT("%s %d", "word", count);
    _GLF_color = vec4(x, float(count) / 6.0, 0.0, 1.0);
}
"#;

fn assert_valid(name: &str, text: &str) {
    let unit = parse_shader(text).unwrap_or_else(|error| panic!("{name}: {error}"));
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{name}: {:?}\n{text}",
        analysis.diagnostics
    );
}

#[test]
fn variants_keep_debug_printf_formats_literal() {
    let job = ShaderJob::parse(JSON, &[(String::from("frag"), String::from(SHADER))])
        .expect("a valid job");
    let mut options = FamilyOptions {
        variants: 4,
        ..FamilyOptions::default()
    };
    options.generator.max_uniforms = 4;
    for seed in 0..4 {
        let family =
            generate_family(&job, &options, &mut Random::new(seed)).expect("a shader family");
        assert_eq!(family.variants.len(), 4, "{:?}", family.failures);
        for (number, variant) in family.variants.iter().enumerate() {
            let text = &variant.emit().shaders[0].1;
            assert!(
                text.contains(r#"debugPrintfEXT("step \"%d\"\t%f\n""#),
                "{text}"
            );
            assert!(text.contains(r#"debugPrintfEXT("%s %d", "word""#), "{text}");
            assert_valid(&format!("seed {seed} variant {number}"), text);
        }
    }
}
