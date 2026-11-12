use alloc::collections::BTreeSet;

use rspirv::dr::Operand;
use spirv::Op;

use super::{
    assert_errors, assert_rejected_like_glslang, compile, compile_with, errors, Compiled, Debug,
    Glslang, Target, VULKAN_1_1, VULKAN_1_3, VULKAN_1_4,
};
use crate::TestResult;

const COMPONENTS: [&str; 11] = [
    "int8_t",
    "int16_t",
    "int32_t",
    "int64_t",
    "uint8_t",
    "uint16_t",
    "uint32_t",
    "uint64_t",
    "float16_t",
    "float32_t",
    "float64_t",
];

const BUILTIN_COMPONENTS: [&str; 8] = [
    "int8_t",
    "int16_t",
    "int32_t",
    "uint8_t",
    "uint16_t",
    "uint32_t",
    "float16_t",
    "float32_t",
];

const INTERPRETATIONS: [(&str, &str); 15] = [
    ("Float16NV", "float16_t"),
    ("Float32NV", "float32_t"),
    ("Float64NV", "float64_t"),
    ("SignedInt8NV", "int8_t"),
    ("SignedInt16NV", "int16_t"),
    ("SignedInt32NV", "int32_t"),
    ("SignedInt64NV", "int64_t"),
    ("UnsignedInt8NV", "uint8_t"),
    ("UnsignedInt16NV", "uint16_t"),
    ("UnsignedInt32NV", "uint32_t"),
    ("UnsignedInt64NV", "uint64_t"),
    ("SignedInt8PackedNV", "uint32_t"),
    ("UnsignedInt8PackedNV", "uint32_t"),
    ("FloatE4M3NV", "uint8_t"),
    ("FloatE5M2NV", "uint8_t"),
];

const LAYOUTS: [&str; 4] = [
    "RowMajorNV",
    "ColumnMajorNV",
    "InferencingOptimalNV",
    "TrainingOptimalNV",
];

fn header(extra: &str) -> String {
    format!(
        "#version 450 core
#extension GL_NV_cooperative_vector : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
#extension GL_KHR_memory_scope_semantics : enable
{extra}layout(local_size_x = 32) in;
"
    )
}

fn shader(buffers: &[(&str, &str)], body: &str) -> String {
    shader_with("", buffers, body)
}

fn shader_with(extra: &str, buffers: &[(&str, &str)], body: &str) -> String {
    let mut source = header(extra);
    for (binding, (name, element)) in buffers.iter().enumerate() {
        source.push_str(&format!(
            "layout(set = 0, binding = {binding}) buffer {name}Block {{ {element} {name}[]; }};\n"
        ));
    }
    source.push_str(body);
    source
}

fn with_context(result: TestResult<Compiled>, context: &str) -> TestResult<Compiled> {
    result.map_err(|error| format!("{context}: {error}").into())
}

fn memory_operands(compiled: &Compiled, op: Op, first: usize) -> Vec<Vec<String>> {
    compiled
        .instructions(op)
        .iter()
        .map(|inst| {
            inst.operands
                .iter()
                .skip(first)
                .map(|operand| match operand {
                    Operand::MemoryAccess(access) => format!("{access:?}"),
                    Operand::LiteralBit32(value) => value.to_string(),
                    other => format!("{other}"),
                })
                .collect()
        })
        .collect()
}

#[test]
fn component_conversions_match_glslang() -> TestResult {
    for from in COMPONENTS {
        for to in COMPONENTS {
            let wide = to.ends_with("64_t");
            let store = if wide {
                "o[0] = d[1]; o[1] = d[3];"
            } else {
                "coopVecStoreNV(d, o, 0);"
            };
            let source = shader(
                &[("o", to), ("i", from)],
                &format!(
                    "void main() {{
    coopvecNV<{from}, 4> s;
    coopVecLoadNV(s, i, 0);
    coopvecNV<{to}, 4> d = coopvecNV<{to}, 4>(s);
    {store}
}}
"
                ),
            );
            with_context(compile(&source, VULKAN_1_3), &format!("{from} -> {to}"))?;
        }
    }
    Ok(())
}

#[test]
fn arithmetic_on_every_component_type() -> TestResult {
    for component in COMPONENTS {
        let integer = !component.starts_with("float");
        let wide = component.ends_with("64_t");
        let mut operators = vec!["+", "-", "*", "/"];
        if integer {
            operators.extend(["%", "&", "|", "^", "<<", ">>"]);
        }
        let mut body = String::from("    coopvecNV<C, 5> v, u, r;\n    coopVecLoadNV(v, i, 0);\n    coopVecLoadNV(u, i, 64);\n    C x = i[7];\n");
        for (index, operator) in operators.iter().enumerate() {
            body.push_str(&format!("    r = v {operator} u; o[{index}] = r[1];\n"));
            body.push_str(&format!(
                "    r = v; r {operator}= u; o[{}] = r[2];\n",
                index + 20
            ));
        }
        body.push_str("    r = -v; o[40] = r[0];\n");
        if integer {
            body.push_str("    r = ~v; o[41] = r[0];\n");
        }
        body.push_str("    r = v * C(3); o[42] = r[1];\n    r = C(3) * v; o[43] = r[1];\n");
        body.push_str("    r = v; r *= C(2); o[44] = r[1];\n    r = v * x; o[45] = r[2];\n");
        body.push_str("    r = x * v; o[46] = r[3];\n    r = v; r++; ++r; r--; o[47] = r[0];\n");
        body.push_str("    o[48] = v[2] + v[x == C(0) ? 1 : 2] + C(v.length());\n");
        body.push_str("    r = v; r[1] = x; r[2] += x; o[49] = r[1] + r[2];\n");
        if !wide {
            body.push_str("    coopVecStoreNV(r, o, 256);\n");
        }
        let source = shader(
            &[("o", component), ("i", component)],
            &format!("void main() {{\n{}}}\n", body.replace('C', component)),
        );
        let compiled = with_context(
            compile_with(&source, VULKAN_1_3, Debug::None, Glslang::Accepts),
            component,
        )?;
        let expected = if component.starts_with("float") {
            Op::FMul
        } else {
            Op::IMul
        };
        assert!(
            compiled.count(expected) + compiled.count(Op::VectorTimesScalar) >= 5,
            "{component}"
        );
    }
    Ok(())
}

#[test]
fn builtins_on_cooperative_vectors() -> TestResult {
    let functions = [
        ("min(v, u)", true),
        ("max(v, u)", true),
        ("clamp(v, u, z)", true),
        ("step(v, u)", false),
        ("fma(v, u, z)", false),
        ("exp(v)", false),
        ("log(v)", false),
        ("tanh(v)", false),
        ("atan(v)", false),
    ];
    for component in BUILTIN_COMPONENTS {
        let floating = component.starts_with("float");
        for (call, any) in functions {
            let source = shader(
                &[("o", component), ("i", component)],
                &format!(
                    "void main() {{
    coopvecNV<{component}, 5> v, u, z, r;
    coopVecLoadNV(v, i, 0);
    coopVecLoadNV(u, i, 64);
    coopVecLoadNV(z, i, 128);
    r = {call};
    coopVecStoreNV(r, o, 0);
}}
"
                ),
            );
            let context = format!("{call} on {component}");
            if floating || any {
                with_context(compile(&source, VULKAN_1_3), &context)?;
            } else {
                let found = errors(&source, VULKAN_1_3)?;
                let lines: BTreeSet<u32> = found.iter().map(|(line, _)| *line).collect();
                assert_eq!(lines, BTreeSet::from([13]), "{context}: {found:?}");
            }
        }
    }
    Ok(())
}

#[test]
fn builtins_reject_64_bit_and_scalar_arguments() -> TestResult {
    for component in ["int64_t", "uint64_t", "float64_t"] {
        for call in ["min(v, v)", "max(v, v)", "clamp(v, v, v)"] {
            assert_errors(
                &shader(
                    &[("o", "float")],
                    &format!(
                        "void main() {{\n    coopvecNV<{component}, 4> v;\n    v = {call};\n}}\n"
                    ),
                ),
                VULKAN_1_3,
                &[(9, "no overload")],
            )?;
        }
    }
    assert_errors(
        &shader(
            &[("o", "float")],
            "void main() {\n    coopvecNV<float, 4> v;\n    v = min(v, 1.0);\n}\n",
        ),
        VULKAN_1_3,
        &[(9, "no overload")],
    )?;
    assert_errors(
        &shader(
            &[("o", "float")],
            "void main() {\n    coopvecNV<float, 4> v;\n    v = abs(v);\n}\n",
        ),
        VULKAN_1_3,
        &[(9, "")],
    )
}

#[test]
fn matrix_multiply_every_interpretation() -> TestResult {
    for (interpretation, input) in INTERPRETATIONS {
        let input = match input {
            "float64_t" => "float32_t",
            "int64_t" => "int32_t",
            "uint64_t" => "uint32_t",
            other => other,
        };
        for result in ["float16_t", "float32_t", "int32_t", "uint32_t"] {
            let source = shader(
                &[("m", "int8_t"), ("b", "float16_t"), ("o", result), ("i", input)],
                &format!(
                    "void main() {{
    coopvecNV<{input}, 8> v;
    coopVecLoadNV(v, i, 0);
    coopvecNV<{result}, 16> r;
    coopVecMatMulNV(r, v, gl_ComponentType{interpretation}, m, 0, gl_ComponentType{interpretation}, 16, 8, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 64);
    coopVecStoreNV(r, o, 0);
    coopVecMatMulAddNV(r, v, gl_ComponentType{interpretation}, m, 128, gl_ComponentType{interpretation}, b, 16, gl_ComponentType{interpretation}, 16, 8, gl_CooperativeVectorMatrixLayoutColumnMajorNV, true, 64);
    coopVecStoreNV(r, o, 64);
}}
"
                ),
            );
            let context = format!("{interpretation} -> {result}");
            let compiled = with_context(compile(&source, VULKAN_1_3), &context)?;
            assert_eq!(
                compiled.count(Op::CooperativeVectorMatrixMulNV),
                1,
                "{context}"
            );
            assert_eq!(
                compiled.count(Op::CooperativeVectorMatrixMulAddNV),
                1,
                "{context}"
            );
        }
    }
    Ok(())
}

#[test]
fn matrix_multiply_signedness_operands() -> TestResult {
    let cases = [
        ("int8_t", "int32_t", "gl_ComponentTypeSignedInt8NV", 2 | 8),
        ("uint8_t", "int32_t", "gl_ComponentTypeUnsignedInt8NV", 8),
        ("int8_t", "uint32_t", "gl_ComponentTypeSignedInt8NV", 2),
        (
            "uint32_t",
            "int32_t",
            "gl_ComponentTypeSignedInt8PackedNV",
            8,
        ),
        ("float16_t", "float16_t", "gl_ComponentTypeFloat16NV", 0),
    ];
    for (input, result, interpretation, mask) in cases {
        let source = shader(
            &[("m", "int8_t"), ("o", result), ("i", input)],
            &format!(
                "void main() {{
    coopvecNV<{input}, 8> v;
    coopVecLoadNV(v, i, 0);
    coopvecNV<{result}, 16> r;
    coopVecMatMulNV(r, v, {interpretation}, m, 0, gl_ComponentTypeSignedInt8NV, 16, 8, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 16);
    coopVecStoreNV(r, o, 0);
}}
"
            ),
        );
        let compiled = compile(&source, VULKAN_1_3)?;
        let instructions = compiled.instructions(Op::CooperativeVectorMatrixMulNV);
        let [instruction] = instructions.as_slice() else {
            return Err("expected one multiplication".into());
        };
        let operands = match instruction.operands.get(10) {
            Some(Operand::CooperativeMatrixOperands(operands)) => operands.bits(),
            Some(other) => return Err(format!("unexpected operand {other}").into()),
            None => 0,
        };
        assert_eq!(operands, mask, "{input} -> {result}");
    }
    Ok(())
}

#[test]
fn matrix_layouts_and_transpose() -> TestResult {
    for layout in LAYOUTS {
        for transpose in ["true", "false"] {
            let source = shader(
                &[("m", "float16_t"), ("b", "float16_t"), ("o", "float16_t")],
                &format!(
                    "void main() {{
    coopvecNV<float16_t, 8> v;
    coopVecLoadNV(v, o, 0);
    coopvecNV<float16_t, 16> r;
    coopVecMatMulNV(r, v, gl_ComponentTypeFloat16NV, m, 0, gl_ComponentTypeFloat16NV, 16, 8, gl_CooperativeVectorMatrixLayout{layout}, {transpose}, 32);
    coopVecStoreNV(r, o, 0);
    coopVecMatMulAddNV(r, v, gl_ComponentTypeFloat16NV, m, 0, gl_ComponentTypeFloat16NV, b, 0, gl_ComponentTypeFloat16NV, 16, 8, gl_CooperativeVectorMatrixLayout{layout}, {transpose}, 32);
    coopVecStoreNV(r, o, 32);
    coopVecOuterProductAccumulateNV(v, v, m, 0, 16, gl_CooperativeVectorMatrixLayout{layout}, gl_ComponentTypeFloat16NV);
}}
"
                ),
            );
            with_context(
                compile(&source, VULKAN_1_3),
                &format!("{layout} {transpose}"),
            )?;
        }
    }
    Ok(())
}

#[test]
fn matrix_and_bias_element_types() -> TestResult {
    for matrix in COMPONENTS {
        for bias in ["float16_t", "uint64_t", "int8_t"] {
            let source = shader(
                &[("m", matrix), ("b", bias), ("o", "float"), ("i", "float16_t")],
                "void main() {
    coopvecNV<float16_t, 8> v;
    coopVecLoadNV(v, i, 0);
    coopvecNV<float, 16> r;
    coopVecMatMulAddNV(r, v, gl_ComponentTypeFloat16NV, m, 0, gl_ComponentTypeFloat16NV, b, 0, gl_ComponentTypeFloat16NV, 16, 8, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 32);
    coopVecStoreNV(r, o, 0);
    coopVecOuterProductAccumulateNV(v, v, m, 0, 16, gl_CooperativeVectorMatrixLayoutTrainingOptimalNV, gl_ComponentTypeFloat16NV);
    coopVecReduceSumAccumulateNV(v, b, 0);
}
",
            );
            with_context(compile(&source, VULKAN_1_3), &format!("{matrix} {bias}"))?;
        }
    }
    for matrix in ["f16vec2", "bool", "bfloat16_t"] {
        let extra = if matrix == "bfloat16_t" {
            "#extension GL_EXT_bfloat16 : enable\n"
        } else {
            ""
        };
        let source = shader_with(
            extra,
            &[("m", matrix), ("o", "float")],
            "void main() {
    coopvecNV<float16_t, 8> v;
    coopvecNV<float, 16> r;
    coopVecMatMulNV(r, v, gl_ComponentTypeFloat16NV, m, 0, gl_ComponentTypeFloat16NV, 16, 8, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 32);
}
",
        );
        let line = if extra.is_empty() { 11 } else { 12 };
        assert_errors(&source, VULKAN_1_3, &[(line, "no overload")])?;
    }
    Ok(())
}

#[test]
fn matrix_multiply_specialization_and_dynamic_arguments() -> TestResult {
    let source = shader(
        &[("m", "float16_t"), ("b", "float16_t"), ("o", "float16_t")],
        "layout(constant_id = 0) const int layoutId = gl_CooperativeVectorMatrixLayoutRowMajorNV;
layout(constant_id = 1) const bool transposed = false;
layout(constant_id = 2) const uint rows = 8;
layout(constant_id = 3) const int interpretation = gl_ComponentTypeFloat16NV;
void main() {
    coopvecNV<float16_t, 8> v;
    coopVecLoadNV(v, o, 0);
    coopvecNV<float16_t, rows> r;
    coopVecMatMulNV(r, v, interpretation, m, 0, interpretation, rows, 8, layoutId, transposed, 32);
    coopVecStoreNV(r, o, 0);
    uint offset = uint(o[1]);
    uint stride = uint(o[2]);
    coopvecNV<float16_t, 16> s;
    coopVecMatMulAddNV(s, v * float16_t(2.0) + v, gl_ComponentTypeFloat16NV, m, offset, gl_ComponentTypeFloat16NV, b, offset + 1u, gl_ComponentTypeFloat16NV, 16, 8, 1 + 1, !true, stride);
    coopVecStoreNV(s, o, 16);
    coopVecOuterProductAccumulateNV(v, v, m, offset, stride, layoutId, interpretation);
    coopVecReduceSumAccumulateNV(v, b, offset);
}
",
    );
    let compiled = compile_with(&source, VULKAN_1_3, Debug::None, Glslang::Accepts)?;
    assert_eq!(compiled.count(Op::CooperativeVectorMatrixMulAddNV), 1);
    assert_eq!(
        compiled.count(Op::CooperativeVectorOuterProductAccumulateNV),
        1
    );
    Ok(())
}

#[test]
fn matrix_multiply_through_references_shared_and_functions() -> TestResult {
    let source = shader_with(
        "#extension GL_EXT_buffer_reference : enable\n",
        &[("o", "float16_t")],
        "layout(buffer_reference, std430) buffer Ref { float16_t d[]; };
layout(push_constant) uniform Push { Ref ref; } pc;
shared float16_t sh[256];
void multiply(out coopvecNV<float16_t, 16> r, coopvecNV<float16_t, 8> v) {
    coopVecMatMulNV(r, v, 0, pc.ref.d, 0, 0, 16, 8, 0, false, 32);
}
void main() {
    coopvecNV<float16_t, 8> v[2];
    coopVecLoadNV(v[0], pc.ref.d, 0);
    coopvecNV<float16_t, 16> r[3];
    multiply(r[1], v[0]);
    coopVecMatMulAddNV(r[2], v[0], 0, sh, 0, 0, sh, 128, 0, 16, 8, 0, false, 32);
    coopVecStoreNV(r[1] + r[2], o, 0);
    coopVecOuterProductAccumulateNV(v[0], v[0], pc.ref.d, 0, 16, 3, 0);
    coopVecReduceSumAccumulateNV(v[0], sh, 0);
}
",
    );
    let compiled = compile(&source, VULKAN_1_3)?;
    assert_eq!(compiled.count(Op::CooperativeVectorMatrixMulNV), 1);
    Ok(())
}

#[test]
fn training_matches_glslang() -> TestResult {
    let source = shader(
        &[("f", "float16_t"), ("u", "uint"), ("s", "int8_t")],
        "layout(constant_id = 0) const int layoutId = gl_CooperativeVectorMatrixLayoutInferencingOptimalNV;
void main() {
    coopvecNV<float16_t, 8> a;
    coopvecNV<float16_t, 5> b;
    coopVecLoadNV(a, f, 0);
    coopVecLoadNV(b, f, 16);
    coopVecOuterProductAccumulateNV(a, b, f, 100, 128, layoutId, gl_ComponentTypeFloat16NV);
    coopVecOuterProductAccumulateNV(a, b, s, 100, 128, gl_CooperativeVectorMatrixLayoutTrainingOptimalNV, gl_ComponentTypeFloat16NV);
    coopVecReduceSumAccumulateNV(a, f, 100);
    coopVecReduceSumAccumulateNV(a, s, 100);
    coopvecNV<uint8_t, 8> c;
    coopvecNV<uint8_t, 4> d;
    coopVecLoadNV(c, u, 0);
    coopVecLoadNV(d, u, 0);
    coopVecOuterProductAccumulateNV(c, d, u, 0, 16, 3, gl_ComponentTypeUnsignedInt8NV);
    coopVecReduceSumAccumulateNV(c, u, 4);
}
",
    );
    for target in [VULKAN_1_1, VULKAN_1_3] {
        let compiled = compile(&source, target)?;
        assert!(compiled.has_capability(spirv::Capability::CooperativeVectorTrainingNV));
        assert!(compiled.has_capability(spirv::Capability::Int8));
        assert_eq!(
            compiled.count(Op::CooperativeVectorOuterProductAccumulateNV),
            3
        );
        assert_eq!(
            compiled.count(Op::CooperativeVectorReduceSumAccumulateNV),
            3
        );
    }
    Ok(())
}

#[test]
fn load_and_store_every_buffer_element_type() -> TestResult {
    let elements = [
        "int8_t",
        "int16_t",
        "int32_t",
        "int64_t",
        "uint8_t",
        "uint16_t",
        "uint32_t",
        "uint64_t",
        "float16_t",
        "float32_t",
        "float64_t",
        "i8vec2",
        "u16vec3",
        "f16vec4",
        "f32vec2",
        "f64vec3",
        "u64vec4",
        "i64vec2",
    ];
    for element in elements {
        let buffer = shader(
            &[("data", element), ("o", "float")],
            "void main() {
    coopvecNV<float, 8> v;
    coopVecLoadNV(v, data, 16);
    v = v * 2.0;
    coopVecStoreNV(v, data, 64);
    o[0] = v[3];
}
",
        );
        with_context(compile(&buffer, VULKAN_1_3), element)?;
        let shared = shader(
            &[("o", "float")],
            &format!(
                "shared {element} sh[64];
void main() {{
    coopvecNV<float16_t, 8> v;
    coopVecLoadNV(v, sh, 16);
    coopVecStoreNV(v, sh, 32);
    o[0] = float(v[3]);
}}
"
            ),
        );
        with_context(compile(&shared, VULKAN_1_3), element)?;
    }
    for element in ["bool", "bvec2", "f16mat2"] {
        assert_errors(
            &shader(
                &[("data", element)],
                "void main() {\n    coopvecNV<float, 8> v;\n    coopVecLoadNV(v, data, 16);\n}\n",
            ),
            VULKAN_1_3,
            &[(9, "no overload")],
        )?;
    }
    Ok(())
}

#[test]
fn load_and_store_memory_operands() -> TestResult {
    let source = shader_with(
        "#extension GL_EXT_buffer_reference : enable\n",
        &[],
        "layout(set = 0, binding = 0) buffer Plain { float data[]; } plain;
layout(set = 0, binding = 1) coherent buffer Coherent { float data[]; } coherentBuffer;
layout(set = 0, binding = 2) buffer Volatile { volatile float data[]; } volatileBuffer;
layout(set = 0, binding = 3) readonly buffer ReadOnly { float data[]; } readOnly;
layout(set = 0, binding = 4) writeonly buffer WriteOnly { float data[]; } writeOnly;
layout(buffer_reference, std430) coherent buffer Ref { float data[]; };
layout(push_constant) uniform Push { Ref ref; } pc;
shared float sh[64];
void main() {
    coopvecNV<float, 8> v;
    coopVecLoadNV(v, plain.data, 0);
    coopVecStoreNV(v, plain.data, 8);
    coopVecLoadNV(v, coherentBuffer.data, 0);
    coopVecStoreNV(v, coherentBuffer.data, 8);
    coopVecLoadNV(v, volatileBuffer.data, 0);
    coopVecStoreNV(v, volatileBuffer.data, 8);
    coopVecLoadNV(v, pc.ref.data, 0);
    coopVecStoreNV(v, pc.ref.data, 8);
    coopVecLoadNV(v, sh, 0);
    coopVecStoreNV(v, sh, 8);
    coopVecLoadNV(v, readOnly.data, 0);
    coopVecStoreNV(v, writeOnly.data, 0);
}
",
    );
    for target in [VULKAN_1_1, VULKAN_1_3, VULKAN_1_4] {
        let compiled = compile(&source, target)?;
        let loads = memory_operands(&compiled, Op::CooperativeVectorLoadNV, 2);
        let stores = memory_operands(&compiled, Op::CooperativeVectorStoreNV, 3);
        let reference = compiled.glslang.as_ref().map(|module| {
            let reference = Compiled {
                module: module.clone(),
                glslang: None,
            };
            (
                memory_operands(&reference, Op::CooperativeVectorLoadNV, 2),
                memory_operands(&reference, Op::CooperativeVectorStoreNV, 3),
            )
        });
        if let Some((their_loads, their_stores)) = reference {
            let masks = |operands: &[Vec<String>]| -> Vec<String> {
                operands
                    .iter()
                    .map(|list| list.first().cloned().unwrap_or_default())
                    .collect()
            };
            assert_eq!(masks(&loads), masks(&their_loads));
            assert_eq!(masks(&stores), masks(&their_stores));
        }
        assert_eq!(loads.len(), 6);
        assert!(loads.iter().all(|operands| !operands.is_empty()));
        assert!(stores.iter().all(|operands| !operands.is_empty()));
        assert!(loads
            .iter()
            .any(|operands| operands.get(1).is_some_and(|alignment| alignment == "16")));
    }
    Ok(())
}

#[test]
fn offsets_of_every_integer_type() -> TestResult {
    let offsets = [
        ("16", false, false),
        ("16u", false, false),
        ("int(o[1])", false, false),
        ("uint(o[1])", false, false),
        ("int16_t(o[1])", false, false),
        ("uint16_t(o[1])", false, false),
        ("uint8_t(o[1])", false, false),
        ("16ul", true, true),
        ("uint64_t(o[1])", true, true),
        ("int64_t(o[1])", true, true),
    ];
    for (offset, wide, needs_extension) in offsets {
        for extension in [false, true] {
            let extra = if extension {
                "#extension GL_EXT_shader_64bit_indexing : enable\n"
            } else {
                ""
            };
            let source = shader_with(
                extra,
                &[("data", "float"), ("o", "float")],
                &format!(
                    "void main() {{
    coopvecNV<float, 8> v;
    coopVecLoadNV(v, data, {offset});
    coopVecStoreNV(v, data, {offset});
    coopvecNV<float, 8> r;
    coopVecMatMulNV(r, v, gl_ComponentTypeFloat32NV, data, {offset}, gl_ComponentTypeFloat32NV, 8, 8, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 32);
    coopVecMatMulAddNV(r, v, gl_ComponentTypeFloat32NV, data, {offset}, gl_ComponentTypeFloat32NV, data, {offset}, gl_ComponentTypeFloat32NV, 8, 8, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 32);
    coopVecOuterProductAccumulateNV(v, v, data, {offset}, 0, gl_CooperativeVectorMatrixLayoutTrainingOptimalNV, gl_ComponentTypeFloat32NV);
    coopVecReduceSumAccumulateNV(v, data, {offset});
    coopVecStoreNV(r, o, 16u);
}}
"
                ),
            );
            let first = if extension { 11 } else { 10 };
            let calls: Vec<u32> = [0, 1, 3, 4, 5, 6].iter().map(|line| first + line).collect();
            let context = format!("offset {offset}, extension {extension}");
            if needs_extension && !extension {
                let expected: Vec<(u32, &str)> = calls
                    .iter()
                    .map(|line| (*line, "GL_EXT_shader_64bit_indexing"))
                    .collect();
                assert_errors(&source, VULKAN_1_3, &expected)
                    .map_err(|error| format!("{context}: {error}"))?;
            } else if extension && !wide && !offset.contains("uint(") && offset != "16u" {
                let expected: Vec<(u32, &str)> =
                    calls.iter().map(|line| (*line, "ambiguous")).collect();
                assert_errors(&source, VULKAN_1_3, &expected)
                    .map_err(|error| format!("{context}: {error}"))?;
            } else {
                let compiled = with_context(compile(&source, VULKAN_1_3), &context)?;
                let wide_type = compiled.module.types_global_values.iter().any(|ty| {
                    ty.class.opcode == Op::TypeInt
                        && ty.operands.first() == Some(&Operand::LiteralBit32(64))
                });
                assert_eq!(wide_type, wide, "{context}");
            }
        }
    }
    Ok(())
}

#[test]
fn shader_64bit_indexing_pragma() -> TestResult {
    let source = shader_with(
        "#extension GL_EXT_buffer_reference : enable\n#extension GL_EXT_shader_64bit_indexing : enable\n#pragma shader_64bit_indexing\n",
        &[("x", "float16_t")],
        "void main() {
    uint64_t element = 0;
    coopvecNV<float16_t, 2> vec;
    coopVecLoadNV(vec, x, element);
    coopVecMatMulAddNV(vec, vec, 0, x, element, 0, x, element, 0, 2, 2, 0, false, 0);
    coopVecMatMulNV(vec, vec, 0, x, element, 0, 2, 2, 0, false, 0);
    coopVecStoreNV(vec, x, element);
    coopVecOuterProductAccumulateNV(vec, vec, x, element, 0, 0, 0);
    coopVecReduceSumAccumulateNV(vec, x, element);
}
",
    );
    let compiled = compile(&source, VULKAN_1_3)?;
    assert!(compiled
        .extensions()
        .contains("SPV_EXT_shader_64bit_indexing"));
    Ok(())
}

#[test]
fn constructors_and_replicated_composites() -> TestResult {
    let source = shader(
        &[("o", "float"), ("h", "float16_t")],
        "layout(constant_id = 0) const uint N = 3;
void main() {
    float x = o[0];
    coopvecNV<float, 5> a = coopvecNV<float, 5>(0.0);
    coopvecNV<float, 5> b = coopvecNV<float, 5>(x);
    coopvecNV<float, 5> c = coopvecNV<float, 5>(vec3(x), vec2(1.0));
    coopvecNV<float, 5> d = coopvecNV<float, 5>(x, 1, 2.0, x, true);
    coopvecNV<float16_t, 5> e = coopvecNV<float16_t, 5>(a + b + c + d);
    coopvecNV<uint8_t, 4> f = coopvecNV<uint8_t, 4>(x);
    coopvecNV<int8_t, 4> g = coopvecNV<int8_t, 4>(-3);
    coopvecNV<float16_t, N> s = coopvecNV<float16_t, N>(1.0);
    coopvecNV<float16_t, N> t = coopvecNV<float16_t, N>(h[1]);
    coopvecNV<float, 4> arr[2] = coopvecNV<float, 4>[2](coopvecNV<float, 4>(x), coopvecNV<float, 4>(2.0));
    coopVecStoreNV(e, h, 0);
    coopVecStoreNV(f, h, 16);
    coopVecStoreNV(g, h, 32);
    coopVecStoreNV(s + t, h, 48);
    coopVecStoreNV(arr[1], o, 0);
}
",
    );
    let compiled = compile_with(&source, VULKAN_1_3, Debug::None, Glslang::Accepts)?;
    assert!(compiled.has_capability(spirv::Capability::ReplicatedCompositesEXT));
    assert!(compiled.count(Op::ConstantCompositeReplicateEXT) >= 3);
    assert!(compiled.count(Op::CompositeConstructReplicateEXT) >= 3);
    for inst in compiled.instructions(Op::ConstantComposite) {
        let parts: BTreeSet<String> = inst
            .operands
            .iter()
            .map(|operand| format!("{operand}"))
            .collect();
        let cooperative =
            compiled.module.types_global_values.iter().any(|ty| {
                ty.class.opcode == Op::TypeVectorIdEXT && ty.result_id == inst.result_type
            });
        assert!(!cooperative || parts.len() > 1, "{inst:?}");
    }
    Ok(())
}

#[test]
fn long_vector_constructors_bitcast() -> TestResult {
    let extra = "#extension GL_EXT_long_vector : enable\n";
    let cases = [
        ("vector<float, 20> v = vector<float, 20>(o[0]);\n    coopvecNV<float, 20> c = coopvecNV<float, 20>(v);\n    coopVecStoreNV(c, o, 0);", 1),
        ("vector<float, 20> v = vector<float, 20>(o[0]);\n    coopvecNV<float16_t, 20> c = coopvecNV<float16_t, 20>(v);\n    coopVecStoreNV(c, h, 0);", 1),
        ("coopvecNV<float, 20> d;\n    coopVecLoadNV(d, o, 0);\n    vector<float, 20> w = vector<float, 20>(d);\n    o[1] = w[3];", 1),
        ("coopvecNV<float, 20> d;\n    coopVecLoadNV(d, o, 0);\n    vector<float16_t, 20> w = vector<float16_t, 20>(d);\n    o[1] = float(w[3]);", 1),
        ("vector<float, N> v = vector<float, N>(o[0]);\n    coopvecNV<float, N> c = coopvecNV<float, N>(v);\n    coopVecStoreNV(c, o, 0);", 0),
        ("coopvecNV<float, N> d;\n    coopVecLoadNV(d, o, 0);\n    vector<float, N> w = vector<float, N>(d);\n    o[1] = w[0];", 0),
        ("vec4 x = vec4(o[2]);\n    coopvecNV<float, 4> e = coopvecNV<float, 4>(x);\n    coopVecStoreNV(e, o, 64);", 0),
    ];
    for (body, bitcasts) in cases {
        let source = shader_with(
            extra,
            &[("o", "float"), ("h", "float16_t")],
            &format!("layout(constant_id = 0) const uint N = 6;\nvoid main() {{\n    {body}\n}}\n"),
        );
        let compiled = with_context(
            compile_with(&source, VULKAN_1_3, Debug::None, Glslang::Accepts),
            body,
        )?;
        assert_eq!(compiled.count(Op::Bitcast), bitcasts, "{body}");
    }
    let mixed = shader_with(
        extra,
        &[("o", "float")],
        "layout(constant_id = 0) const uint N = 6;
void main() {
    vector<float, N> v = vector<float, N>(o[0]);
    o[1] = v[2];
    coopvecNV<float, N> c;
    coopVecLoadNV(c, o, 0);
    o[2] = c[3];
}
",
    );
    let compiled = compile(&mixed, VULKAN_1_3)?;
    assert_eq!(compiled.count(Op::TypeVectorIdEXT), 1);
    Ok(())
}

#[test]
fn functions_and_aggregates() -> TestResult {
    let source = shader(
        &[("o", "float"), ("h", "float16_t")],
        "struct S { coopvecNV<float, 4> m; float f; };
coopvecNV<float, 4> global = coopvecNV<float, 4>(2.0);
coopvecNV<float, 4> f(coopvecNV<float, 4> a, inout coopvecNV<float, 4> b, out coopvecNV<float, 4> c) {
    b += a;
    c = a * b;
    return c - a;
}
float pick(coopvecNV<float, 4> v) { return v[0]; }
float pick(coopvecNV<float, 5> v) { return v[1]; }
float pick(coopvecNV<float16_t, 4> v) { return float(v[2]); }
float widen(coopvecNV<int, 4> v) { return float(v[0]); }
void main() {
    coopvecNV<float, 4> a, b, c, d;
    coopVecLoadNV(a, o, 0);
    coopVecLoadNV(b, o, 16);
    d = f(a, b, c);
    S s = S(d, 1.0);
    s.m *= 2.0;
    coopvecNV<float, 4> arr[3];
    arr[1] = o[9] > 0.0 ? s.m : global;
    int k = int(o[3]);
    arr[1][k] = 3.0;
    arr[1][k + 1] += arr[1][k];
    coopVecStoreNV(arr[1], o, 32);
    coopvecNV<float, 5> e;
    coopVecLoadNV(e, o, 0);
    coopvecNV<float16_t, 4> g;
    coopVecLoadNV(g, h, 0);
    coopvecNV<int8_t, 4> i8;
    coopVecLoadNV(i8, h, 0);
    o[0] = pick(a) + pick(e) + pick(g) + float(arr.length()) + (a * 2.0)[k] + widen(i8);
    precise coopvecNV<float, 4> p = a * a + a;
    coopVecStoreNV(p, o, 64);
}
",
    );
    compile_with(&source, VULKAN_1_3, Debug::None, Glslang::Accepts)?;
    compile_with(&source, VULKAN_1_3, Debug::NonSemantic, Glslang::Accepts)?;
    let compiled = compile_with(
        &source,
        VULKAN_1_1,
        Debug::NonSemanticWithSource,
        Glslang::Accepts,
    )?;
    assert!(
        compiled.capabilities().contains("CooperativeVectorNV"),
        "{}",
        compiled.disassemble()
    );
    Ok(())
}

#[test]
fn constant_folding_and_specialization() -> TestResult {
    let source = shader(
        &[("o", "float"), ("h", "float16_t")],
        "layout(constant_id = 0) const uint N = 6;
void main() {
    const coopvecNV<float, 4> c = coopvecNV<float, 4>(1.0, 2.0, 3.0, 4.0);
    const coopvecNV<float, 4> d = c * 2.0 + c;
    const coopvecNV<float, 4> m = min(c, coopvecNV<float, 4>(2.5));
    o[0] = d[2] + m[3] + max(c, d)[3] + clamp(c, d, d)[0] + step(c, d)[1];
    coopVecStoreNV(d, o, 4);
    int k = int(o[1]);
    o[2] = c[k];
    coopvecNV<float16_t, N> v, u;
    coopVecLoadNV(v, h, 0);
    coopVecLoadNV(u, h, 64);
    v = v * u + float16_t(2.0) * v;
    v = exp(clamp(v, u, u));
    coopVecStoreNV(v, h, N);
    o[3] = float(v.length()) + float(v[3]);
}
",
    );
    for target in [VULKAN_1_1, VULKAN_1_3] {
        compile_with(&source, target, Debug::None, Glslang::Accepts)?;
    }
    Ok(())
}

#[test]
fn glslang_tests_match() -> TestResult {
    let coopvec2 = "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_NV_cooperative_vector : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout (local_size_x = 64, local_size_y = 1, local_size_z = 1) in;
layout(set = 0, binding = 0) buffer Out { uint8_t o[]; };
layout(constant_id = 0) const uint N = 3;
void main()
{
    coopvecNV<int32_t, 4> v12;
    coopVecLoadNV(v12, o, 0);
    coopVecStoreNV(coopvecNV<uint8_t, 4>(v12), o, 0);
    coopvecNV<float32_t, 4> v13;
    coopVecLoadNV(v13, o, 0);
    coopVecStoreNV(coopvecNV<int8_t, 4>(v13), o, 16);
    coopvecNV<uint32_t, N> v8 = coopvecNV<uint32_t, N>(1);
    v8 = v8 ^ ~v8;
    v8 >>= v8;
    coopVecStoreNV(v8, o, 32);
}
";
    let compiled = compile_with(coopvec2, VULKAN_1_1, Debug::None, Glslang::Accepts)?;
    assert!(compiled.has_capability(spirv::Capability::Int8));
    assert!(compiled.count(Op::SConvert) + compiled.count(Op::UConvert) >= 1);
    assert_eq!(compiled.count(Op::ConvertFToS), 1);
    Ok(())
}

#[test]
fn rejected_like_glslang() -> TestResult {
    let cases: [(&str, u32, &str); 28] = [
        ("coopvecNV<float> v;", 7, ""),
        ("coopvecNV<float, 0> v;", 7, "positive number of components"),
        ("coopvecNV<float, 4, 4> v;", 7, ""),
        ("coopvecNV<float, 4> v; o[0] = v.x;", 7, ""),
        ("coopvecNV<float, 4> v; v[4] = 1.0;", 7, "out of range"),
        ("coopvecNV<float, N> v; v[100] = 1.0;", 7, "out of range"),
        ("coopvecNV<float, 4> v; o[0] = v[1.0];", 7, ""),
        ("coopvecNV<float, 4> v, u; bool b = v < u;", 7, ""),
        ("coopvecNV<uint, 4> v; v = !v;", 7, ""),
        (
            "coopvecNV<float, 4> v; coopvecNV<float, 5> u; v = v + u;",
            7,
            "",
        ),
        (
            "coopvecNV<float, 4> v; coopvecNV<float16_t, 4> u; v = v + u;",
            7,
            "",
        ),
        (
            "coopvecNV<float, 4> v; coopvecNV<float16_t, 4> u; v = u;",
            7,
            "",
        ),
        (
            "coopvecNV<uint, 4> v; coopvecNV<int, 4> u; v = v + u;",
            7,
            "",
        ),
        (
            "coopvecNV<uint, 4> v; coopvecNV<int, 4> u; v = v << u;",
            7,
            "",
        ),
        ("coopvecNV<float, 4> v; v = v + 1.0;", 7, ""),
        ("coopvecNV<float, 4> v; v = v / 2.0;", 7, ""),
        ("coopvecNV<uint, 4> v; v = v << 2u;", 7, ""),
        ("coopvecNV<float, 4> v; v = v % v;", 7, ""),
        ("coopvecNV<float, 4> v; v = v & v;", 7, ""),
        ("coopvecNV<float, 4> v; vec4 u = vec4(1); v = v + u;", 7, ""),
        ("coopvecNV<int, 4> v; v = v * 1.5;", 7, ""),
        ("coopvecNV<float16_t, 4> v; int k = 1; v = v * k;", 7, ""),
        ("coopvecNV<float, 4> v = 1.0;", 7, ""),
        (
            "coopvecNV<float, 4> v = coopvecNV<float, 4>(1.0, 2.0);",
            7,
            "",
        ),
        (
            "coopvecNV<float, 4> v = coopvecNV<float, 4>(1.0, 2.0, 3.0, 4.0, 5.0);",
            7,
            "",
        ),
        ("coopvecNV<float, 4> v; vec4 u = vec4(v);", 7, ""),
        ("coopvecNV<float, 4> v; float u = float(v);", 7, ""),
        (
            "coopvecNV<float, 4> a; coopvecNV<float, 5> v = coopvecNV<float, 5>(a);",
            7,
            "",
        ),
    ];
    for (body, line, message) in cases {
        let source = shader(
            &[],
            &format!("layout(constant_id = 0) const uint N = 6;\nvoid main() {{ {body} }}\n"),
        );
        assert_errors(&source, VULKAN_1_3, &[(line, message)])
            .map_err(|error| format!("{body}: {error}"))?;
    }
    let declarations = [
        ("layout(binding = 5) buffer B { coopvecNV<float, 4> m; } b;", "member of block"),
        ("layout(binding = 5) uniform U { coopvecNV<float, 4> m; } u;", "member of block"),
        ("layout(push_constant) uniform P { coopvecNV<float, 4> m; } p;", "member of block"),
        ("#extension GL_EXT_buffer_reference : enable\nlayout(buffer_reference) buffer R { coopvecNV<float, 4> u; };", "member of block"),
        ("layout(location = 0) in coopvecNV<float, 4> m;", ""),
        ("uniform coopvecNV<float, 4> u;", ""),
    ];
    for (declaration, message) in declarations {
        let line = 6 + u32::try_from(declaration.matches('\n').count())?;
        let source = format!("{}{declaration}\nvoid main() {{ }}\n", header(""));
        assert_errors(&source, VULKAN_1_3, &[(line, message)])
            .map_err(|error| format!("{declaration}: {error}"))?;
    }
    let no_extension = "#version 450 core
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout(local_size_x = 32) in;
void main() { coopvecNV<float, 4> v; }
";
    assert_errors(no_extension, VULKAN_1_3, &[(4, "GL_NV_cooperative_vector")])
}

#[test]
fn call_errors_like_glslang() -> TestResult {
    let cases: [(&str, &str); 17] = [
        ("coopvecNV<float16_t, 16> r; int i = int(o[0]); coopVecMatMulAddNV(r, v, i, m, 0, i, m, 0, i, 16, 8, i, false, 32);", "compile-time constant"),
        ("coopvecNV<float16_t, 16> r; uint i = uint(o[0]); bool t = o[1] > 0.0; coopVecMatMulAddNV(r, v, 0, m, 0, 0, m, 0, 0, i, i, 0, t, 32);", "compile-time constant"),
        ("int i = int(o[0]); coopVecOuterProductAccumulateNV(v, v, m, 0, 16, i, i);", "compile-time constant"),
        ("coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, v, 0, m, 0, 0, 16, 8, 0, 1, 32);", "no overload"),
        ("coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, v, 0u, m, 0, 0u, 16, 8, 0u, false, 32);", "no overload"),
        ("coopvecNV<float16_t, 16> r; coopVecMatMulNV(r + r, v, 0, m, 0, 0, 16, 8, 0, false, 32);", "l-value"),
        ("float16_t r; coopVecMatMulNV(r, v, 0, m, 0, 0, 16, 8, 0, false, 32);", "no overload"),
        ("f16vec4 w; coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, w, 0, m, 0, 0, 16, 8, 0, false, 32);", "no overload"),
        ("coopvecNV<double, 8> w; coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, w, 0, m, 0, 0, 16, 8, 0, false, 32);", "no overload"),
        ("coopvecNV<float16_t, 16> r; coopVecMatMulAddNV(r, v, 0, m, 0, 0, 16, 8, 0, false, 32);", "no overload"),
        ("coopvecNV<float, 8> u; coopVecOuterProductAccumulateNV(v, u, m, 0, 16, 3, 0);", "basic types must match"),
        ("vec4 u; coopVecOuterProductAccumulateNV(v, u, m, 0, 16, 3, 0);", "no overload"),
        ("coopVecOuterProductAccumulateNV(v, v, m, 0, 16, 3);", "no overload"),
        ("vec4 u; coopVecReduceSumAccumulateNV(u, m, 0);", "no overload"),
        ("coopVecLoadNV(v * float16_t(2.0), m, 0);", "l-value"),
        ("coopVecLoadNV(v, m, 1.0);", "no overload"),
        ("coopvecNV<double, 8> w; coopVecStoreNV(w, m, 0);", "no overload"),
    ];
    for (body, message) in cases {
        let source = shader(
            &[("m", "float16_t"), ("o", "float")],
            &format!("void main() {{ coopvecNV<float16_t, 8> v; {body} }}\n"),
        );
        assert_errors(&source, VULKAN_1_3, &[(8, message)])
            .map_err(|error| format!("{body}: {error}"))?;
    }
    let storage = shader(
        &[("matrix", "float")],
        "layout(binding = 2) buffer Rows { float rows[4][8]; } nested;
shared float sharedArray[16];
void main() {
    float local[4];
    coopvecNV<float, 4> v;
    coopVecStoreNV(v, local, 0);
    coopVecLoadNV(v, local, 0);
    coopVecLoadNV(v, nested.rows[1], 0);
    coopVecStoreNV(v, matrix, 0);
    coopVecLoadNV(v, sharedArray, 0);
}
",
    );
    assert_errors(
        &storage,
        VULKAN_1_3,
        &[
            (12, "buffer or shared storage"),
            (13, "buffer or shared storage"),
            (14, "buffer or shared storage"),
        ],
    )
}

#[test]
fn glslang_emits_invalid_spirv_rglsl_rejects() -> TestResult {
    let cases = [
        "coopvecNV<float, 4> v, u; bool b = v == u;",
        "coopvecNV<float, 4> v; coopvecNV<float16_t, 4> u; v = fma(v, u, v);",
        "coopvecNV<float, 4> v; coopvecNV<float, 5> u; v = min(v, u);",
        "coopvecNV<int, 4> v; v = exp(v);",
        "coopvecNV<uint8_t, 4> v; v = step(v, v);",
        "coopvecNV<bool, 4> v;",
        "coopvecNV<float16_t, 8> v; coopvecNV<int8_t, 16> r; coopVecMatMulNV(r, v, 0, m, 0, 0, 16, 8, 0, false, 32);",
        "coopvecNV<float16_t, 8> v; coopvecNV<uint16_t, 16> r; coopVecMatMulNV(r, v, 0, m, 0, 0, 16, 8, 0, false, 32);",
        "coopvecNV<float16_t, 8> v; coopvecNV<double, 16> r; coopVecMatMulNV(r, v, 0, m, 0, 0, 16, 8, 0, false, 32);",
        "coopvecNV<float16_t, 8> v; coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, v, 0, m, 0, 0, 15, 8, 0, false, 32);",
        "coopvecNV<float16_t, 8> v; coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, v, 0, m, 0, 0, 16, 7, 0, false, 32);",
        "float16_t local[64]; coopvecNV<float16_t, 8> v; coopvecNV<float16_t, 16> r; coopVecMatMulNV(r, v, 0, local, 0, 0, 16, 8, 0, false, 32);",
    ];
    for body in cases {
        let source = shader(
            &[("m", "float16_t")],
            &format!("void main() {{ {body} }}\n"),
        );
        let found = errors(&source, VULKAN_1_3)?;
        let lines: BTreeSet<u32> = found.iter().map(|(line, _)| *line).collect();
        assert_eq!(lines, BTreeSet::from([7]), "{body}: {found:?}");
    }
    let shared = shader(&[], "shared coopvecNV<float, 4> g;\nvoid main() { }\n");
    let found = errors(&shared, VULKAN_1_3)?;
    assert!(found
        .iter()
        .any(|(line, message)| *line == 6 && message.contains("shared")));
    let packed = shader(
        &[("m", "int8_t"), ("o", "float")],
        "void main() {
    coopvecNV<uint, 4> p;
    coopVecLoadNV(p, m, 0);
    coopvecNV<float, 16> r;
    coopVecMatMulNV(r, p, gl_ComponentTypeSignedInt8PackedNV, m, 0, gl_ComponentTypeSignedInt8NV, 16, 16, 0, false, 16);
    coopVecStoreNV(r, o, 0);
}
",
    );
    compile(&packed, VULKAN_1_3)?;
    Ok(())
}

#[test]
fn readonly_and_writeonly_buffers() -> TestResult {
    let read_only = shader(
        &[],
        "layout(binding = 2) readonly buffer R { float data[]; } ro;
void main() {
    coopvecNV<float, 8> v;
    coopVecLoadNV(v, ro.data, 0);
    coopVecStoreNV(v, ro.data, 0);
    coopVecReduceSumAccumulateNV(v, ro.data, 0);
}
",
    );
    let found = errors(&read_only, VULKAN_1_3)?;
    let lines: BTreeSet<u32> = found.iter().map(|(line, _)| *line).collect();
    assert_eq!(lines, BTreeSet::from([10, 11]), "{found:?}");
    let write_only = shader(
        &[],
        "layout(binding = 2) writeonly buffer W { float data[]; } wo;
void main() {
    coopvecNV<float, 8> v;
    coopVecLoadNV(v, wo.data, 0);
    coopVecStoreNV(v, wo.data, 0);
}
",
    );
    let found = errors(&write_only, VULKAN_1_3)?;
    let lines: BTreeSet<u32> = found.iter().map(|(line, _)| *line).collect();
    assert_eq!(lines, BTreeSet::from([9]), "{found:?}");
    Ok(())
}

#[test]
fn memory_model_follows_variable_declarations() -> TestResult {
    let parameter_only = shader(
        &[("o", "float")],
        "struct S { coopvecNV<float, 4> m; };
float f(coopvecNV<float, 4> v) { return v[0]; }
void main() { S s; s.m = coopvecNV<float, 4>(2.0); o[0] = f(s.m); }
",
    );
    let compiled = compile(&parameter_only, VULKAN_1_3)?;
    assert!(!compiled.has_capability(spirv::Capability::VulkanMemoryModel));
    let variable = shader(
        &[("o", "float")],
        "void main() { coopvecNV<float, 4> v = coopvecNV<float, 4>(o[1]); o[0] = v[1]; }\n",
    );
    let compiled = compile(&variable, VULKAN_1_3)?;
    assert!(compiled.has_capability(spirv::Capability::VulkanMemoryModel));
    Ok(())
}

#[test]
fn every_target_validates() -> TestResult {
    let source = shader(
        &[("m", "float16_t"), ("o", "float16_t")],
        "void main() {
    coopvecNV<float16_t, 8> v;
    coopVecLoadNV(v, o, 0);
    coopvecNV<float16_t, 16> r;
    coopVecMatMulNV(r, v, gl_ComponentTypeFloat16NV, m, 0, gl_ComponentTypeFloat16NV, 16, 8, gl_CooperativeVectorMatrixLayoutInferencingOptimalNV, false, 0);
    r = tanh(r) * float16_t(0.5);
    coopVecStoreNV(r, o, 0);
}
",
    );
    let targets: [Target; 3] = [VULKAN_1_1, VULKAN_1_3, VULKAN_1_4];
    for target in targets {
        compile(&source, target)?;
    }
    assert_rejected_like_glslang(
        &shader(&[], "void main() { coopvecNV<float, -1> v; }\n"),
        VULKAN_1_3,
    )
}
