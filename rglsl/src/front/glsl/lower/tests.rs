use alloc::boxed::Box;
use alloc::format;
use alloc::string::{String, ToString};
use alloc::vec::Vec;

use super::FLAT_EXPRESSIONS;
use crate::ShaderStage;
use crate::back::spv;
use crate::front::glsl::{Frontend, Options};
use crate::valid::{ValidationFlags, Validator};

type TestResult<T = ()> = Result<T, Box<dyn core::error::Error>>;

struct Input {
    name: String,
    stage: ShaderStage,
    source: String,
}

const SHADERS: [&str; 4] = [
    "#version 450
layout(location = 0) in vec4 colour;
layout(location = 0) out vec4 result;
layout(constant_id = 0) const int count = 2;
const float half_value = 0.5;
float scaled(float value, inout float total, out int steps) {
    steps = count + 1;
    total += value * half_value;
    return ((value + total) * (value - total)) / (1.0 + value * value);
}
void main() {
    float total = colour.x;
    int steps;
    float a = scaled(colour.y, total, steps);
    double wide = a * 2.0 + float(steps);
    int folded = (1 + 2) * (3 - count);
    uint mixed = uint(steps) + 1u * 3u;
    result = vec4(a, total + float(wide), float(folded) * (a + (a * (a + (a * (a + a))))), float(mixed));
}
",
    "#version 450
#extension GL_EXT_nonuniform_qualifier : enable
layout(set = 0, binding = 0) uniform sampler2D textures[];
layout(location = 0) flat in int index;
layout(location = 1) in vec2 uv;
layout(location = 0) out vec4 result;
void main() {
    int shifted = nonuniformEXT(index) + 1;
    precise float p = uv.x * uv.y + uv.x;
    mediump float m = uv.y;
    highp float h = m * m + (m - 1.0) * p;
    result = texture(textures[nonuniformEXT(shifted - 1)], uv) * h;
}
",
    "#version 450
layout(local_size_x = 8) in;
layout(std430, binding = 0) buffer Data { int values[]; } data;
shared int scratch[8];
void main() {
    int i = int(gl_LocalInvocationID.x);
    int j = (i + 1) & 7;
    bool b = i > 2 && j < 5 || i == j;
    scratch[i] = data.values[i] * 2 + (b ? 1 : 0);
    barrier();
    int k = scratch[j] - scratch[i] + (i << 2) % 5;
    data.values[i] = k * k - (k + (k * (k - (k * (k + 1)))));
}
",
    "#version 460
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout(location = 0) out vec4 result;
layout(push_constant) uniform Push { float16_t h; int64_t l; } push;
void main() {
    float16_t a = push.h * float16_t(2.0) + push.h;
    int64_t b = push.l + 3l * push.l;
    mat2 m = mat2(1.0, 2.0, 3.0, 4.0) * 0.5;
    vec2 v = m * vec2(a) + vec2(float(b));
    result = vec4(v, (v.x + v.y) * (v.x - v.y), 1.0);
}
",
];

fn compiled(stage: ShaderStage, source: &str, flat: bool) -> String {
    FLAT_EXPRESSIONS.with(|enabled| enabled.set(flat));
    let parsed = Frontend::default().parse(&Options::from(stage), source);
    FLAT_EXPRESSIONS.with(|enabled| enabled.set(true));
    let module = match parsed {
        Ok(module) => module,
        Err(errors) => return format!("{errors:?}"),
    };
    match Validator::new(ValidationFlags::all()).validate(&module) {
        Ok(info) => format!(
            "{:?}",
            spv::write_vec(&module, &info, &spv::Options::default(), None)
        ),
        Err(error) => format!("{error:?}"),
    }
}

fn snapshot_inputs() -> TestResult<Vec<Input>> {
    let directory = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/in/glsl");
    let mut inputs = Vec::new();
    for entry in std::fs::read_dir(directory)? {
        let path = entry?.path();
        let Some(stage) = path
            .extension()
            .and_then(|extension| extension.to_str())
            .and_then(ShaderStage::from_extension)
        else {
            continue;
        };
        let source = std::fs::read_to_string(&path)?;
        inputs.push(Input {
            name: path.display().to_string(),
            stage,
            source,
        });
    }
    Ok(inputs)
}

#[test]
fn flat_expressions_are_lowered_like_nested_ones() -> TestResult {
    let stages = [
        ShaderStage::Fragment,
        ShaderStage::Fragment,
        ShaderStage::Compute,
        ShaderStage::Fragment,
    ];
    let mut inputs: Vec<Input> = SHADERS
        .iter()
        .zip(stages)
        .enumerate()
        .map(|(index, (source, stage))| Input {
            name: format!("shader {index}"),
            stage,
            source: String::from(*source),
        })
        .collect();
    inputs.extend(snapshot_inputs()?);
    let mut compiled_count = 0;
    for Input {
        name,
        stage,
        source,
    } in inputs
    {
        let flat = compiled(stage, &source, true);
        assert_eq!(flat, compiled(stage, &source, false), "{name}");
        if flat.starts_with("Ok(") {
            compiled_count += 1;
        } else {
            assert!(!name.starts_with("shader"), "{name}: {flat}");
        }
    }
    assert!(compiled_count > SHADERS.len(), "{compiled_count}");
    Ok(())
}
