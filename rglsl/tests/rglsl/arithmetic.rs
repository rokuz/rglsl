#![cfg(all(feature = "glsl-in", feature = "spv-out"))]

use rglsl::{
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
    ShaderStage,
};
use rspirv::dr::{self, Operand};
use spirv::{Decoration, GlslStd450Op as GLOp, Op};

fn compile(source: &str) -> crate::TestResult<dr::Module> {
    let module = glsl::Frontend::default()
        .parse(&glsl::Options::from(ShaderStage::Fragment), source)
        .map_err(|errors| format!("shader rejected: {errors:?}"))?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module)?;
    let options = spv::Options {
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None)?;
    crate::stage_io::spirv_val(&words)?;
    Ok(dr::load_words(words)?)
}

fn shader(declarations: &str, body: &str) -> String {
    format!(
        "#version 450
#extension GL_EXT_shader_explicit_arithmetic_types : enable
{declarations}
void main() {{
{body}
}}
"
    )
}

fn instructions(module: &dr::Module, op: Op) -> Vec<&dr::Instruction> {
    module
        .all_inst_iter()
        .filter(|inst| inst.class.opcode == op)
        .collect()
}

fn count(module: &dr::Module, op: Op) -> usize {
    instructions(module, op).len()
}

fn glsl_ops(module: &dr::Module) -> Vec<u32> {
    instructions(module, Op::ExtInst)
        .into_iter()
        .filter_map(|inst| match inst.operands.get(1) {
            Some(&Operand::LiteralExtInstInteger(op)) => Some(op),
            _ => None,
        })
        .collect()
}

fn id(operand: Option<&Operand>) -> crate::TestResult<u32> {
    match operand {
        Some(&Operand::IdRef(id)) => Ok(id),
        other => Err(format!("{other:?} is not an id").into()),
    }
}

fn defining(module: &dr::Module, id: u32) -> crate::TestResult<&dr::Instruction> {
    module
        .all_inst_iter()
        .find(|inst| inst.result_id == Some(id))
        .ok_or_else(|| format!("%{id} is not defined").into())
}

fn constant_bits(module: &dr::Module, id: u32) -> crate::TestResult<Vec<u32>> {
    let inst = defining(module, id)?;
    match inst.class.opcode {
        Op::Constant => match inst.operands.first() {
            Some(&Operand::LiteralBit32(bits)) => Ok(vec![bits]),
            other => Err(format!("unexpected constant operand {other:?}").into()),
        },
        Op::ConstantNull => Ok(vec![0]),
        Op::ConstantTrue => Ok(vec![1]),
        Op::ConstantFalse => Ok(vec![0]),
        Op::ConstantComposite => {
            let mut bits = Vec::new();
            for operand in &inst.operands {
                bits.extend(constant_bits(module, id_of(operand)?)?);
            }
            Ok(bits)
        }
        other => Err(format!("%{id} is an {other:?}, not a constant").into()),
    }
}

fn id_of(operand: &Operand) -> crate::TestResult<u32> {
    id(Some(operand))
}

fn stored(module: &dr::Module) -> crate::TestResult<Vec<u32>> {
    let stores = instructions(module, Op::Store);
    let store = stores.last().ok_or("no store")?;
    constant_bits(module, id(store.operands.get(1))?)
}

fn folded(declarations: &str, body: &str) -> crate::TestResult<Vec<u32>> {
    let module = compile(&shader(declarations, body))?;
    if count(&module, Op::ExtInst) != 0 || count(&module, Op::FDiv) != 0 {
        return Err("the constant expression was not folded".into());
    }
    stored(&module)
}

fn decorated_ops(module: &dr::Module, decoration: Decoration) -> crate::TestResult<Vec<Op>> {
    let mut ops = Vec::new();
    for inst in &module.annotations {
        if inst.class.opcode == Op::Decorate
            && inst.operands.get(1) == Some(&Operand::Decoration(decoration))
        {
            let target = defining(module, id(inst.operands.first())?)?;
            if target.class.opcode != Op::Variable && target.class.opcode != Op::Load {
                ops.push(target.class.opcode);
            }
        }
    }
    ops.sort_by_key(|op| *op as u32);
    Ok(ops)
}

const MATRIX_INPUTS: &str = "layout(location = 0) in float s;
layout(location = 1) in mat3 m;
layout(location = 0) out vec4 o;";

#[test]
fn matrix_over_scalar_multiplies_by_the_reciprocal() -> crate::TestResult {
    for body in [
        "o = vec4((m / s)[1], 1.0);",
        "mat3 a = m; a /= s; o = vec4(a[1], 1.0);",
    ] {
        let module = compile(&shader(MATRIX_INPUTS, body))?;
        let divisions = instructions(&module, Op::FDiv);
        let [division] = divisions.as_slice() else {
            return Err(format!("{body}: {} divisions", divisions.len()).into());
        };
        assert_eq!(
            constant_bits(&module, id(division.operands.first())?)?,
            [1.0_f32.to_bits()]
        );
        assert_eq!(count(&module, Op::MatrixTimesScalar), 1, "{body}");
    }
    Ok(())
}

#[test]
fn half_matrix_over_scalar_uses_a_half_reciprocal() -> crate::TestResult {
    let module = compile(&shader(
        MATRIX_INPUTS,
        "f16mat3 h = f16mat3(m) / float16_t(s); o = vec4(h[0], 1.0);",
    ))?;
    let divisions = instructions(&module, Op::FDiv);
    let [division] = divisions.as_slice() else {
        return Err(format!("{} divisions", divisions.len()).into());
    };
    assert_eq!(
        constant_bits(&module, id(division.operands.first())?)?,
        [0x3c00]
    );
    assert_eq!(count(&module, Op::MatrixTimesScalar), 1);
    Ok(())
}

#[test]
fn matrix_negation_negates_each_column() -> crate::TestResult {
    let module = compile(&shader(MATRIX_INPUTS, "o = vec4((-m)[2], 1.0);"))?;
    assert_eq!(count(&module, Op::FNegate), 3);
    assert_eq!(count(&module, Op::MatrixTimesScalar), 0);
    Ok(())
}

#[test]
fn componentwise_matrix_operations_decorate_each_column() -> crate::TestResult {
    let module = compile(&shader(
        MATRIX_INPUTS,
        "precise mat3 a = m + m;
precise mat3 b = -m;
mediump mat3 r = m;
mediump mat3 c = r - r;
o = vec4(a[0] + b[1] + c[2], 1.0);",
    ))?;
    assert_eq!(
        decorated_ops(&module, Decoration::NoContraction)?,
        [
            Op::FNegate,
            Op::FNegate,
            Op::FNegate,
            Op::FAdd,
            Op::FAdd,
            Op::FAdd
        ]
    );
    let relaxed = decorated_ops(&module, Decoration::RelaxedPrecision)?;
    assert_eq!(relaxed.iter().filter(|&&op| op == Op::FSub).count(), 3);
    assert_eq!(
        relaxed
            .iter()
            .filter(|&&op| op == Op::CompositeConstruct)
            .count(),
        1
    );
    Ok(())
}

#[test]
fn float_inequality_is_unordered() -> crate::TestResult {
    let module = compile(&shader(
        "layout(location = 0) in vec3 v;
layout(location = 1) in vec3 w;
layout(location = 0) out vec4 o;",
        "o = vec4(notEqual(v, w), float(v.x != w.x));",
    ))?;
    assert_eq!(count(&module, Op::FUnordNotEqual), 2);
    assert_eq!(count(&module, Op::FOrdNotEqual), 0);
    Ok(())
}

#[test]
fn mod_is_fmod() -> crate::TestResult {
    let module = compile(&shader(
        "layout(location = 0) in vec3 v;
layout(location = 1) in float f;
layout(location = 2) flat in dvec2 d;
layout(location = 0) out vec4 o;",
        "o = vec4(mod(v, f) + mod(v, v), float(mod(d, d.x).y));",
    ))?;
    assert_eq!(count(&module, Op::FMod), 3);
    assert!(glsl_ops(&module).is_empty());
    Ok(())
}

#[test]
fn round_is_not_round_even() -> crate::TestResult {
    let module = compile(&shader(
        "layout(location = 0) in vec2 v;
layout(location = 0) out vec4 o;",
        "o = vec4(round(v), roundEven(v));",
    ))?;
    assert_eq!(
        glsl_ops(&module),
        [GLOp::Round as u32, GLOp::RoundEven as u32]
    );
    Ok(())
}

#[test]
fn scalar_geometry_uses_the_extended_instructions() -> crate::TestResult {
    let module = compile(&shader(
        "layout(location = 0) in float f;
layout(location = 0) out vec4 o;",
        "o = vec4(normalize(f), reflect(f, 0.5), faceforward(f, f, f), 1.0);",
    ))?;
    assert_eq!(
        glsl_ops(&module),
        [
            GLOp::Normalize as u32,
            GLOp::Reflect as u32,
            GLOp::FaceForward as u32
        ]
    );
    Ok(())
}

#[test]
fn sign_changing_widening_extends_by_the_source_sign() -> crate::TestResult {
    let module = compile(&shader(
        "layout(location = 0) flat in int i;
layout(location = 1) flat in uint u;
layout(location = 0) out uvec4 o;
layout(location = 1) out ivec4 p;",
        "o = uvec4(uint(int8_t(i))); p = ivec4(int(uint16_t(u)));",
    ))?;
    let mut widened = Vec::new();
    for inst in instructions(&module, Op::Bitcast) {
        widened.push(defining(&module, id(inst.operands.first())?)?.class.opcode);
    }
    assert_eq!(widened, [Op::SConvert, Op::UConvert]);
    Ok(())
}

const FLOAT_OUTPUT: &str = "layout(location = 0) out float o;";

fn float_bits(value: f64) -> u32 {
    (value as f32).to_bits()
}

#[test]
fn float_constants_fold_in_double_precision() -> crate::TestResult {
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = (0.1 * 0.1) * 3.0;")?,
        [float_bits(0.1 * 0.1 * 3.0)]
    );
    assert_eq!(
        folded(
            "layout(location = 0) out float o;
const float a = 0.1;
const float b = a * a;",
            "o = b * 3.0;"
        )?,
        [float_bits(0.1 * 0.1 * 3.0)]
    );
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = mod(5.3, 2.1);")?,
        [float_bits(5.3 - 2.1 * (5.3_f64 / 2.1).floor())]
    );
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = fract(1.7);")?,
        [float_bits(1.7 - 1.0)]
    );
    assert_eq!(
        folded(
            FLOAT_OUTPUT,
            "o = (mat2(0.1, 0.2, 0.3, 0.4) * vec2(0.7, 0.9)).x;"
        )?,
        [float_bits(0.1 * 0.7 + 0.3 * 0.9)]
    );
    Ok(())
}

#[test]
fn builtins_fold_like_glslang() -> crate::TestResult {
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = round(2.5);")?,
        [3.0_f32.to_bits()]
    );
    assert_eq!(folded(FLOAT_OUTPUT, "o = abs(-0.0);")?, [0]);
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = smoothstep(0.0, 1.0, 0.3);")?,
        [float_bits(0.3 * 0.3 * (3.0 - 2.0 * 0.3))]
    );
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = mix(0.1, 0.7, 0.3);")?,
        [float_bits(0.1 * (1.0 - 0.3) + 0.7 * 0.3)]
    );
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = intBitsToFloat(1065353217);")?,
        [1_065_353_217]
    );
    assert_eq!(
        folded(
            FLOAT_OUTPUT,
            "o = reflect(vec2(0.1, 0.2), vec2(0.6, 0.8)).x;"
        )?,
        [float_bits(0.1 - 2.0 * (0.1 * 0.6 + 0.2 * 0.8) * 0.6)]
    );
    assert_eq!(
        folded(FLOAT_OUTPUT, "o = float(0.0 / 0.0 >= 1.0);")?,
        [1.0_f32.to_bits()]
    );
    Ok(())
}

#[test]
fn builtins_glslang_does_not_fold_stay_at_run_time() -> crate::TestResult {
    let module = compile(&shader(FLOAT_OUTPUT, "o = fma(0.1, 0.2, 0.3);"))?;
    assert_eq!(glsl_ops(&module), [GLOp::Fma as u32]);
    Ok(())
}

#[test]
fn half_constants_round_toward_zero() -> crate::TestResult {
    let module = compile(&shader(
        "layout(set = 0, binding = 0) buffer B { float16_t h[2]; };",
        "h[0] = float16_t(0.3); h[1] = float16_t(65520.0);",
    ))?;
    let mut values = Vec::new();
    for store in instructions(&module, Op::Store) {
        values.extend(constant_bits(&module, id(store.operands.get(1))?)?);
    }
    assert_eq!(values, [0x34cc, 0x7bff]);
    Ok(())
}

#[test]
fn integer_constants_fold_like_glslang() -> crate::TestResult {
    let output = "layout(location = 0) out int o;";
    assert_eq!(folded(output, "o = int(3e9);")?, [i32::MAX as u32]);
    assert_eq!(folded(output, "o = int(uint(-1.0));")?, [0]);
    assert_eq!(folded(output, "o = int(int8_t(1) << int8_t(9));")?, [0]);
    assert_eq!(
        folded(output, "o = int(int8_t(-128) >> int8_t(9));")?,
        [u32::MAX]
    );
    Ok(())
}
