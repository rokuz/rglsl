use spirv::Op;

use super::{
    assert_errors, assert_rejected_like_glslang, compile, same_literal_operands, VULKAN_1_3,
    VULKAN_1_4,
};
use crate::TestResult;

const HEADER: &str = "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_KHR_cooperative_matrix : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
#extension GL_EXT_bfloat16 : enable
#extension GL_EXT_float_e4m3 : enable
#extension GL_EXT_float_e5m2 : enable
";

const COMPONENTS: [&str; 11] = [
    "float",
    "float16_t",
    "bfloat16_t",
    "floate4m3_t",
    "floate5m2_t",
    "int",
    "int8_t",
    "int16_t",
    "uint",
    "uint8_t",
    "uint16_t",
];

const BUFFER_SCALARS: [(&str, &str); 14] = [
    ("float", "vec"),
    ("float16_t", "f16vec"),
    ("bfloat16_t", "bf16vec"),
    ("floate5m2_t", "fe5m2vec"),
    ("floate4m3_t", "fe4m3vec"),
    ("double", "dvec"),
    ("int8_t", "i8vec"),
    ("int16_t", "i16vec"),
    ("int", "ivec"),
    ("int64_t", "i64vec"),
    ("uint8_t", "u8vec"),
    ("uint16_t", "u16vec"),
    ("uint", "uvec"),
    ("uint64_t", "u64vec"),
];

const USES: [&str; 3] = ["gl_MatrixUseA", "gl_MatrixUseB", "gl_MatrixUseAccumulator"];

fn buffer_types() -> Vec<String> {
    BUFFER_SCALARS
        .iter()
        .flat_map(|(scalar, vector)| {
            [
                String::from(*scalar),
                format!("{vector}2"),
                format!("{vector}4"),
            ]
        })
        .collect()
}

fn shader(extensions: &str, declarations: &str, body: &str) -> String {
    format!(
        "{HEADER}{extensions}layout(local_size_x = 64) in;\n{declarations}void main()\n{{\n{body}}}\n"
    )
}

#[test]
fn load_and_store_every_component_and_buffer_type() -> TestResult {
    let buffers = buffer_types();
    let mut declarations = String::new();
    for (index, ty) in buffers.iter().enumerate() {
        declarations.push_str(&format!(
            "layout(binding = {index}) buffer B{index} {{ {ty} x{index}[]; }};\n"
        ));
    }
    declarations.push_str("shared uvec4 tile[256];\n");
    for component in COMPONENTS {
        let mut body = String::new();
        for (index, _) in buffers.iter().enumerate() {
            let usage = USES[index % USES.len()];
            let layout = index % 2;
            body.push_str(&format!(
                "    {{ coopmat<{component}, gl_ScopeSubgroup, 16, 8, {usage}> m; coopMatLoad(m, x{index}, {}u, 8, {layout}); coopMatStore(m, x{index}, {}u, 16u, {layout}); }}\n",
                index * 3,
                index * 5 + 1
            ));
        }
        body.push_str(&format!(
            "    {{ coopmat<{component}, gl_ScopeWorkgroup, 16, 8, gl_MatrixUseA> m; coopMatLoad(m, tile, 7u, 8u, 0); coopMatStore(m, tile, 9u, 8u, 1); }}\n"
        ));
        let source = shader(
            "#extension GL_EXT_shader_64bit_indexing : enable\n",
            &declarations,
            &body,
        );
        let compiled =
            compile(&source, VULKAN_1_3).map_err(|error| format!("{component}: {error}"))?;
        assert_eq!(
            compiled.count(Op::CooperativeMatrixLoadKHR),
            buffers.len() + 1
        );
        assert_eq!(
            compiled.count(Op::CooperativeMatrixStoreKHR),
            buffers.len() + 1
        );
    }
    Ok(())
}

#[test]
fn sixty_four_bit_element_offsets() -> TestResult {
    let source = shader(
        "#extension GL_EXT_shader_64bit_indexing : enable\n",
        "layout(binding = 0) buffer B { float x[]; uint64_t base; };\n",
        "    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;
    coopMatLoad(m, x, base, 8u, 0);
    coopMatStore(m, x, base + 128ul, 8u, 1);
    coopMatStore(m, x, int64_t(4), 8u, 1);
",
    );
    for target in [VULKAN_1_3, VULKAN_1_4] {
        let compiled = compile(&source, target)?;
        assert_eq!(compiled.count(Op::CooperativeMatrixStoreKHR), 2);
    }
    Ok(())
}

#[test]
fn load_and_store_argument_types_follow_the_overloads() -> TestResult {
    let types = [
        "int", "uint", "int16_t", "uint16_t", "int8_t", "uint8_t", "int64_t", "uint64_t", "float",
        "bool",
    ];
    for wide in [false, true] {
        let mut body =
            String::from("    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;\n");
        for ty in types {
            body.push_str(&format!("    coopMatLoad(m, x, {ty}(1), 8, 0);\n"));
        }
        for ty in types {
            body.push_str(&format!("    coopMatStore(m, x, 0u, {ty}(1), 0);\n"));
        }
        for ty in ["uint", "int16_t", "bool", "int64_t"] {
            body.push_str(&format!("    coopMatStore(m, x, 0u, 8u, {ty}(1));\n"));
        }
        body.push_str(
            "    coopMatStore(m, x, 0u, 8u, 4202);\n    coopMatStore(m, x, 0u, 8u, 3);\n",
        );
        let extension = if wide {
            "#extension GL_EXT_shader_64bit_indexing : enable\n"
        } else {
            ""
        };
        let source = shader(
            extension,
            "layout(binding = 0) buffer B { float x[]; };\n",
            &body,
        );
        assert_rejected_like_glslang(&source, VULKAN_1_3)
            .map_err(|error| format!("64-bit indexing {wide}: {error}"))?;
    }
    Ok(())
}

#[test]
fn uint64_buffers_need_64bit_indexing() -> TestResult {
    let source = shader(
        "",
        "layout(binding = 0) buffer B { uint64_t x[]; u64vec2 y[]; };\n",
        "    coopmat<uint, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;
    coopMatLoad(m, x, 0u, 8u, 0);
    coopMatStore(m, y, 0u, 8u, 0);
",
    );
    assert_errors(
        &source,
        VULKAN_1_3,
        &[
            (13, "GL_EXT_shader_64bit_indexing"),
            (14, "GL_EXT_shader_64bit_indexing"),
        ],
    )
}

#[test]
fn load_and_store_need_buffer_or_shared_storage() -> TestResult {
    let source = shader(
        "",
        "layout(binding = 0) buffer B { float x[]; };
layout(binding = 1) readonly buffer R { float r[]; };
layout(binding = 2) uniform U { float u[16]; };
shared float s[256];
float g[256];
",
        "    float local[256];
    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;
    coopMatLoad(m, x, 0u, 8u, 0);
    coopMatLoad(m, s, 0u, 8u, 0);
    coopMatLoad(m, r, 0u, 8u, 0);
    coopMatLoad(m, local, 0u, 8u, 0);
    coopMatStore(m, g, 0u, 8u, 0);
    coopMatStore(m, u, 0u, 8u, 0);
    coopMatStore(m, x, 0u, 8u, 0);
    coopMatStore(m, s, 0u, 8u, 0);
",
    );
    assert_errors(
        &source,
        VULKAN_1_3,
        &[
            (21, "storage block or shared"),
            (22, "storage block or shared"),
            (23, "l-value"),
        ],
    )
}

#[test]
fn conversions_between_every_component_type() -> TestResult {
    for source_type in COMPONENTS {
        let mut body = format!(
            "    coopmat<{source_type}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseAccumulator> a; coopMatLoad(a, raw, 0u, 16u, 0);
    coopmat<{source_type}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> b; coopMatLoad(b, raw, 64u, 16u, 1);
"
        );
        for (index, target) in COMPONENTS.iter().enumerate() {
            body.push_str(&format!(
                "    {{ coopmat<{target}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseAccumulator> c = coopmat<{target}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseAccumulator>(a); coopMatStore(c, raw, {}u, 16u, 0); }}
    {{ coopmat<{target}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> c = coopmat<{target}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(b); coopMatStore(c, raw, {}u, 16u, 1); }}
",
                128 * (index + 1),
                128 * (index + 1) + 64
            ));
        }
        let source = shader(
            "",
            "layout(binding = 0) buffer B { uint8_t raw[]; };\n",
            &body,
        );
        compile(&source, VULKAN_1_3).map_err(|error| format!("{source_type}: {error}"))?;
    }
    Ok(())
}

#[test]
fn constructors_from_scalars() -> TestResult {
    let source = shader(
        "",
        "layout(constant_id = 0) const int LAYOUT = 1;
layout(binding = 0) buffer B { float o[]; };
",
        "    bool b = o[0] > 0.0;
    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m = coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(b);
    coopmat<int8_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> n = coopmat<int8_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(true);
    coopmat<uint, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> u = coopmat<uint, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(b);
    coopmat<float16_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> h = coopmat<float16_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(o[1]);
    coopMatStore(m, o, 0u, 8u, LAYOUT);
    coopMatStore(n, o, 64u, 8u, 0);
    coopMatStore(u, o, 128u, 8u, 0);
    coopMatStore(h, o, 192u, 8u, 0);
    coopMatLoad(m, o, 256u, 8u, LAYOUT);
    coopMatStore(m, o, 512u, 8u, gl_CooperativeMatrixLayoutColumnMajor);
",
    );
    compile(&source, VULKAN_1_3)?;
    Ok(())
}

#[test]
fn multiply_add_operands_match_glslang() -> TestResult {
    let integers = ["int8_t", "uint8_t", "int16_t", "uint16_t", "int", "uint"];
    let mut body = String::new();
    let mut count = 0;
    for a in integers {
        for b in integers {
            for c in ["int", "uint", "int16_t", "uint8_t"] {
                for flags in ["", ", 0", ", gl_MatrixOperandsSaturatingAccumulation"] {
                    body.push_str(&format!(
                        "    {{ coopmat<{a}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> a; coopmat<{b}, gl_ScopeSubgroup, 8, 16, gl_MatrixUseB> b; coopmat<{c}, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> c; coopMatLoad(a, raw, 0u, 8u, 0); coopMatLoad(b, raw, 1u, 8u, 0); coopMatLoad(c, raw, 2u, 8u, 0); c = coopMatMulAdd(a, b, c{flags}); coopMatStore(c, raw, {count}u, 8u, 0); }}\n"
                    ));
                    count += 1;
                }
            }
        }
    }
    let floats = [
        "float16_t",
        "float",
        "bfloat16_t",
        "floate4m3_t",
        "floate5m2_t",
    ];
    for a in floats {
        for c in ["float16_t", "float", "bfloat16_t"] {
            body.push_str(&format!(
                "    {{ coopmat<{a}, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> a; coopmat<{a}, gl_ScopeSubgroup, 8, 16, gl_MatrixUseB> b; coopmat<{c}, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> c; coopMatLoad(a, raw, 0u, 8u, 0); coopMatLoad(b, raw, 1u, 8u, 0); coopMatLoad(c, raw, 2u, 8u, 0); c = coopMatMulAdd(a, b, c, 0); coopMatStore(c, raw, {count}u, 8u, 0); }}\n"
            ));
            count += 1;
        }
    }
    let source = shader(
        "",
        "layout(binding = 0) buffer B { uint8_t raw[]; };\n",
        &body,
    );
    let compiled = compile(&source, VULKAN_1_3)?;
    assert_eq!(
        same_literal_operands(&compiled, Op::CooperativeMatrixMulAddKHR)?,
        count
    );
    Ok(())
}

#[test]
fn multiply_add_errors() -> TestResult {
    let calls = [
        "c = coopMatMulAdd(a, b, c, 16u);",
        "c = coopMatMulAdd(b, a, c);",
        "c = coopMatMulAdd(a, b, a);",
        "c = coopMatMulAdd(a, b);",
        "coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> f; c = coopMatMulAdd(f, b, c);",
        "coopmat<int, gl_ScopeSubgroup, 8, 8, gl_MatrixUseB> b8; c = coopMatMulAdd(a, b8, c);",
        "coopmat<int, gl_ScopeSubgroup, 16, 8, gl_MatrixUseAccumulator> c8; c8 = coopMatMulAdd(a, b, c8);",
        "coopmat<uint, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> cu = coopMatMulAdd(a, b, c);",
        "c = coopMatMulAdd(a, b, c, 0x10, 1);",
        "c = coopMatMulAdd(a, b, c, 1.0);",
    ];
    let mut body = String::new();
    for (index, call) in calls.iter().enumerate() {
        body.push_str(&format!(
            "    {{ coopmat<int8_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> a; coopmat<int8_t, gl_ScopeSubgroup, 8, 16, gl_MatrixUseB> b; coopmat<int, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> c; coopMatLoad(a, raw, 0u, 8u, 0); coopMatLoad(b, raw, 1u, 8u, 0); coopMatLoad(c, raw, 2u, 8u, 0); {call} coopMatStore(c, raw, {index}u, 8u, 0); }}\n"
        ));
    }
    let source = shader(
        "",
        "layout(binding = 0) buffer B { uint8_t raw[]; };\n",
        &body,
    );
    assert_rejected_like_glslang(&source, VULKAN_1_3)
}

#[test]
fn multiply_add_operands_must_be_literal_constants() -> TestResult {
    let source = shader(
        "",
        "layout(constant_id = 0) const int OPERANDS = 16;
layout(binding = 0) buffer B { uint8_t raw[]; };
",
        "    coopmat<int8_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> a;
    coopmat<int8_t, gl_ScopeSubgroup, 8, 16, gl_MatrixUseB> b;
    coopmat<int, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> c;
    int operands = 16;
    c = coopMatMulAdd(a, b, c, OPERANDS);
    c = coopMatMulAdd(a, b, c, operands);
    coopMatStore(c, raw, 0u, 8u, 0);
",
    );
    let errors = super::errors(&source, VULKAN_1_3)?;
    let lines: Vec<u32> = errors.iter().map(|(line, _)| *line).collect();
    assert_eq!(lines, [17, 18]);
    Ok(())
}

#[test]
fn multiply_add_scopes_must_match() -> TestResult {
    let source = shader(
        "",
        "layout(binding = 0) buffer B { uint8_t raw[]; };\n",
        "    coopmat<int8_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> a;
    coopmat<int8_t, gl_ScopeSubgroup, 8, 16, gl_MatrixUseB> b;
    coopmat<int, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseAccumulator> c;
    c = coopMatMulAdd(a, b, c);
    coopMatStore(c, raw, 0u, 8u, 0);
",
    );
    let errors = super::errors(&source, VULKAN_1_3)?;
    assert!(errors
        .iter()
        .any(|(line, message)| *line == 15 && message.contains("scopes must match")));
    Ok(())
}

#[test]
fn arithmetic_operators_match_glslang() -> TestResult {
    let accepted = [
        "mf = mf * 2.0;",
        "mf = 2.0 * mf;",
        "mh = mh * float16_t(2.0);",
        "mi = mi * 2;",
        "mu = mu * 2u;",
        "mi8 = mi8 * int8_t(2);",
        "mf = mf * mf;",
        "mf *= mf;",
        "mf *= 2.0;",
        "mf += mf;",
        "mf -= mf;",
        "mf /= mf;",
        "mf = -mf;",
        "mi = -mi;",
        "mf = +mf;",
        "mf++;",
        "--mi;",
        "mi = mi / mi;",
        "mu = mu / mu - mu;",
        "mf = (o[0] > 0.0) ? mf : mf * 2.0;",
    ];
    let declarations = "layout(binding = 0) buffer B { float o[]; int i[]; uint u[]; float16_t h[]; int8_t b[]; };\n";
    let locals = "    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> mf; coopMatLoad(mf, o, 0u, 16u, 0);
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> mh; coopMatLoad(mh, h, 0u, 16u, 0);
    coopmat<int, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> mi; coopMatLoad(mi, i, 0u, 16u, 0);
    coopmat<uint, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> mu; coopMatLoad(mu, u, 0u, 16u, 0);
    coopmat<int8_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> mi8; coopMatLoad(mi8, b, 0u, 16u, 0);
";
    let stores = "    coopMatStore(mf, o, 0u, 16u, 0); coopMatStore(mh, h, 0u, 16u, 0); coopMatStore(mi, i, 0u, 16u, 0); coopMatStore(mu, u, 0u, 16u, 0); coopMatStore(mi8, b, 0u, 16u, 0);\n";
    let body = format!(
        "{locals}{}{stores}",
        accepted
            .iter()
            .map(|line| format!("    {line}\n"))
            .collect::<String>()
    );
    compile(&shader("", declarations, &body), VULKAN_1_3)?;
    let rejected = [
        "mh = mh * 2.0;",
        "mf = mf * float16_t(2.0);",
        "mf = mf * 2;",
        "mi = mi * 2u;",
        "mu = mu * 2;",
        "mi8 = mi8 * 2;",
        "mf = mf / 2.0;",
        "mf = mf + 2.0;",
        "mi = mi << 1;",
        "bool c = !mf;",
        "mf = mh;",
        "mf = mf * mh;",
        "mf = mf * 2.0lf;",
    ];
    for line in rejected {
        let body = format!("{locals}    {line}\n{stores}");
        assert_errors(&shader("", declarations, &body), VULKAN_1_3, &[(17, "")])
            .map_err(|error| format!("`{line}`: {error}"))?;
    }
    Ok(())
}

#[test]
fn small_float_matrices_have_no_arithmetic() -> TestResult {
    for component in ["bfloat16_t", "floate4m3_t", "floate5m2_t"] {
        for line in ["m = m + m;", "m = -m;", "m = m * m;", "m = m * m[0];"] {
            let body = format!(
                "    coopmat<{component}, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> m; coopMatLoad(m, o, 0u, 16u, 0);
    {line}
    coopMatStore(m, o, 0u, 16u, 0);
"
            );
            let source = shader("", "layout(binding = 0) buffer B { float o[]; };\n", &body);
            assert_errors(&source, VULKAN_1_3, &[(13, "")])
                .map_err(|error| format!("{component} `{line}`: {error}"))?;
        }
    }
    Ok(())
}

#[test]
fn operators_glslang_translates_to_invalid_spirv_are_rejected() -> TestResult {
    for line in [
        "mi = mi % mi;",
        "mi = mi & mi;",
        "mi = ~mi;",
        "bool b = mi == mi; i[0] = int(b);",
    ] {
        let body = format!(
            "    coopmat<int, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> mi; coopMatLoad(mi, i, 0u, 16u, 0);
    {line}
    coopMatStore(mi, i, 0u, 16u, 0);
"
        );
        let source = shader("", "layout(binding = 0) buffer B { int i[]; };\n", &body);
        let errors = super::errors(&source, VULKAN_1_3)?;
        assert!(
            errors.iter().all(|(error_line, _)| *error_line == 13),
            "`{line}`: {errors:?}"
        );
    }
    Ok(())
}

#[test]
fn length_and_element_access() -> TestResult {
    let source = shader(
        "",
        "layout(constant_id = 0) const int SC = 3;
layout(constant_id = 1) const float SF = 2.5;
const coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> gm = coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(4.0);
layout(binding = 0) buffer B { uint8_t raw[]; };
",
        "    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> a; coopMatLoad(a, raw, 0u, 16u, 0);
    raw[3] = uint8_t(a.length());
    raw[4] = uint8_t(coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(1.0).length());
    raw[5] = uint8_t(a[1]);
    a[2] = 3.0;
    a[SC] = SF;
    uint index = uint(raw[6]);
    a[index] = a[index + 1u];
    for (int i = 0; i < a.length(); ++i) { a[i] = a[i] * 2.0 + float(i); }
    coopMatStore(a, raw, 6u, 16u, 0);
    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> arr[3];
    arr[0] = a; arr[1] = gm; arr[2] = coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>(SF);
    arr[1][2] = 9.0;
    coopMatStore(arr[SC - 2], raw, 7u, 16u, 0);
",
    );
    let compiled = compile(&source, VULKAN_1_3)?;
    assert_eq!(compiled.count(Op::CooperativeMatrixLengthKHR), 3);
    Ok(())
}

#[test]
fn functions_structs_and_arrays_of_matrices() -> TestResult {
    let source = shader(
        "",
        "#define MAT(T, U) coopmat<T, gl_ScopeSubgroup, 16, 8, U>
layout(binding = 0) buffer B { uint8_t raw[]; };
MAT(float, gl_MatrixUseA) global;
MAT(float, gl_MatrixUseA) pass(MAT(float, gl_MatrixUseA) m, inout MAT(int, gl_MatrixUseB) n, out MAT(uint, gl_MatrixUseAccumulator) o) {
    n = n * 2;
    o = MAT(uint, gl_MatrixUseAccumulator)(7u);
    return m * 0.5;
}
struct S { MAT(float, gl_MatrixUseA) m; int k; MAT(float16_t, gl_MatrixUseB) arr[2]; };
",
        "    MAT(float, gl_MatrixUseA) a; coopMatLoad(a, raw, 0u, 16u, 0);
    MAT(int, gl_MatrixUseB) b; coopMatLoad(b, raw, 0u, 16u, 0);
    MAT(uint, gl_MatrixUseAccumulator) c;
    MAT(float, gl_MatrixUseA) r = pass(a, b, c);
    coopMatStore(r, raw, 0u, 16u, 0);
    coopMatStore(b, raw, 1u, 16u, 0);
    coopMatStore(c, raw, 2u, 16u, 0);
    S s;
    s.m = a;
    s.k = 2;
    s.arr[1] = MAT(float16_t, gl_MatrixUseB)(1.0hf);
    s.arr[0] = MAT(float16_t, gl_MatrixUseB)(s.m[0]);
    coopMatStore(s.m, raw, 8u, 16u, 0);
    coopMatStore(s.arr[1], raw, 9u, 16u, 0);
    global = -a;
    global += a;
    global *= 3.0;
    coopMatStore(global, raw, 11u, 16u, 0);
",
    );
    compile(&source, VULKAN_1_3)?;
    Ok(())
}

#[test]
fn specialization_constant_sizes() -> TestResult {
    let source = shader(
        "",
        "layout(constant_id = 0) const uint M = 16;
layout(constant_id = 1) const int N = 8;
layout(constant_id = 2) const int K = 16;
layout(constant_id = 3) const int SCOPE = gl_ScopeSubgroup;
const int TWO_N = N * 2;
layout(binding = 0) buffer B { float16_t h[]; float f[]; int i[]; };
",
        "    coopmat<float16_t, gl_ScopeSubgroup, M, K, gl_MatrixUseA> a;
    coopmat<float16_t, gl_ScopeSubgroup, K, N, gl_MatrixUseB> b;
    coopmat<float, gl_ScopeSubgroup, M, N, gl_MatrixUseAccumulator> c = coopmat<float, gl_ScopeSubgroup, M, N, gl_MatrixUseAccumulator>(0.0);
    coopMatLoad(a, h, 0u, K, gl_CooperativeMatrixLayoutRowMajor);
    coopMatLoad(b, h, 256u, N, gl_CooperativeMatrixLayoutColumnMajor);
    c = coopMatMulAdd(a, b, c);
    coopMatStore(c, f, 0u, N, gl_CooperativeMatrixLayoutRowMajor);
    i[0] = c.length();
    coopmat<float, SCOPE, M, TWO_N, gl_MatrixUseAccumulator> d = coopmat<float, SCOPE, M, TWO_N, gl_MatrixUseAccumulator>(1.0);
    i[1] = d.length();
    for (int k = 0; k < d.length(); ++k) d[k] = d[k] + 1.0;
    coopMatStore(d, f, 64u, TWO_N, 0);
",
    );
    compile(&source, VULKAN_1_3)?;
    Ok(())
}

#[test]
fn arm_layouts() -> TestResult {
    let source = shader(
        "",
        "layout(binding = 0) buffer B { float f[]; };\n",
        "    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> m;
    coopMatLoad(m, f, 0u, 4u, gl_CooperativeMatrixLayoutRowBlockedInterleavedARM);
    coopMatStore(m, f, 128u, 4u, gl_CooperativeMatrixLayoutColumnBlockedInterleavedARM);
",
    );
    let compiled = compile(&source, VULKAN_1_3)?;
    assert!(compiled
        .extensions()
        .contains("SPV_ARM_cooperative_matrix_layouts"));
    assert!(compiled
        .capabilities()
        .contains("CooperativeMatrixLayoutsARM"));
    Ok(())
}

#[test]
fn type_parameter_errors() -> TestResult {
    let declarations = [
        "coopmat<float, gl_ScopeSubgroup, 16, 8, 3> m;",
        "coopmat<float, gl_ScopeSubgroup, 16, 8, -1> m;",
        "coopmat<float, gl_ScopeSubgroup, -16, 8, gl_MatrixUseA> m;",
        "coopmat<float, gl_ScopeSubgroup, true, 8, gl_MatrixUseA> m;",
        "coopmat<float, gl_ScopeSubgroup, 16.0, 8, gl_MatrixUseA> m;",
        "coopmat<float, gl_ScopeSubgroup, int16_t(16), 8, gl_MatrixUseA> m;",
        "coopmat<double, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;",
        "coopmat<int64_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;",
        "coopmat<bool, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;",
        "coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA, 1> m;",
        "coopmat<gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;",
        "coopmat<float, gl_ScopeSubgroup, 16, gl_MatrixUseA> m;",
        "coopmat m;",
        "int r = 16; coopmat<float, gl_ScopeSubgroup, r, 8, gl_MatrixUseA> m;",
        "struct S { float x; }; coopmat<S, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;",
        "coopmat<void, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> m;",
    ];
    for declaration in declarations {
        let source = shader("", "", &format!("    {declaration}\n"));
        assert_errors(&source, VULKAN_1_3, &[(11, "")])
            .map_err(|error| format!("`{declaration}`: {error}"))?;
    }
    Ok(())
}

#[test]
fn type_parameters_on_other_types() -> TestResult {
    let source = format!(
        "{HEADER}layout(local_size_x = 64) in;
struct S {{ float<3> m; int x; }};
layout(binding = 0) buffer B {{ float<5> b; vec4<2> c; }};
float<4> g;
void main()
{{
    float<16> x = 1.0;
    float<16> y;
    float z = float<2>(1.0);
    vec4<3> v = vec4(1.0);
    S<3> s;
    float<X> w;
    b = x + z;
}}
"
    );
    assert_errors(
        &source,
        VULKAN_1_3,
        &[
            (11, "unexpected type parameters"),
            (14, "unexpected type parameters"),
            (15, "unexpected type parameters"),
            (17, "unexpected type parameters"),
            (18, "unexpected type parameters"),
            (19, ""),
        ],
    )
}

#[test]
fn qualifier_and_storage_errors() -> TestResult {
    let source = format!(
        "{HEADER}#extension GL_EXT_buffer_reference : enable
layout(local_size_x = 64) in;
#define MAT coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>
struct S {{ MAT m; }};
layout(constant_id = 0) int Y = 1;
layout(constant_id = 1) const vec2 V = vec2(1.0);
uniform MAT um;
layout(push_constant) uniform P {{ MAT pm; }};
layout(buffer_reference) buffer R {{ MAT rm; }};
layout(binding = 1) buffer O {{ S os; float o[]; }};
volatile MAT vo;
shared MAT sm;
shared S ss;
shared MAT sa[4];
MAT ga[2][3];
const MAT g() {{ return MAT(1.0); }}
void main()
{{
    MAT b = {{ 1.0 }};
    coopMatStore(ga[1][2], o, 0u, 8u, 0);
}}
"
    );
    assert_errors(
        &source,
        VULKAN_1_3,
        &[
            (12, "const"),
            (13, "scalar"),
            (14, ""),
            (15, "cooperative matrix"),
            (16, "cooperative matrix"),
            (17, "cooperative matrix"),
            (18, ""),
            (19, "shared memory"),
            (20, "shared memory"),
            (21, "shared memory"),
            (23, "function return"),
            (26, ""),
        ],
    )
}

#[test]
fn constructor_errors() -> TestResult {
    let lines = [
        "MAT m = MAT();",
        "MAT m = MAT(1.0, 2.0);",
        "MAT m = MAT(vec2(1.0));",
        "mat4 x; MAT m = MAT(x);",
        "float a[2]; MAT m = MAT(a);",
        "coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseB> a; MAT m = MAT(a);",
        "coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseAccumulator> a; MAT m = MAT(a);",
        "coopmat<float, gl_ScopeSubgroup, 8, 16, gl_MatrixUseA> a; MAT m = MAT(a);",
        "coopmat<float, gl_ScopeWorkgroup, 16, 8, gl_MatrixUseA> a; MAT m = MAT(a);",
        "coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseB> a; MAT m = a;",
        "MAT m = 1.0;",
        "MAT m; if (m) {}",
        "MAT m; float x = m.x;",
        "MAT m; float x = m[0][0];",
        "MAT m; float x = m[1.0];",
        "MAT m; int l = m.length(1);",
        "MAT m; m = abs(m);",
        "MAT m; m = transpose(m);",
    ];
    for line in lines {
        let source = shader(
            "",
            "#define MAT coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA>\n",
            &format!("    {line}\n"),
        );
        assert_rejected_like_glslang(&source, VULKAN_1_3)
            .map_err(|error| format!("`{line}`: {error}"))?;
    }
    Ok(())
}

#[test]
fn glslang_error_tests() -> TestResult {
    let source = format!(
        "{HEADER}layout(local_size_x = 64) in;
float<16> ftemplate16;
coopmat fnoparams;
struct S {{ int s; }};
coopmat<void, gl_ScopeSubgroup, 8, 8, gl_MatrixUseA> fbadtype;
coopmat<S, gl_ScopeSubgroup, 8, 8, gl_MatrixUseA> fbadtype2;
coopmat<16, gl_ScopeSubgroup, 8, 8, gl_MatrixUseA> fbadtype3;
coopmat<float16_t, gl_ScopeSubgroup, 8, gl_MatrixUseA> fbadnumparams;
int X = 8;
coopmat<float16_t, gl_ScopeSubgroup, 8, X, gl_MatrixUseA> fbadparam;
layout(constant_id = 0) const int Y = 1;
shared coopmat<float16_t, gl_ScopeSubgroup, 16, 16> sharedmat;
layout(set = 0, binding = 0) buffer InvBlock {{
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> bufmat;
}} invblock;
void main()
{{
    coopmat<float, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> f32_16_8;
    coopmat<float16_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseA> f16_16_8;
    f32_16_8 = f16_16_8;
    f32_16_8 = f16_16_8 + f16_16_8;
    coopmat<float16_t, gl_ScopeSubgroup, 8, 8, gl_MatrixUseA> f16_8_8;
    f16_16_8 = f16_8_8;
    coopmat<float16_t, gl_ScopeSubgroup, 8, Y, gl_MatrixUseA> f16_8_Y;
    coopmat<float16_t, gl_ScopeSubgroup, 8, (Y+1), gl_MatrixUseA> f16_8_Y1;
    f16_8_Y = f16_8_Y1;
    f16_8_8 = coopmat<float16_t, gl_ScopeSubgroup, 8, 8, gl_MatrixUseA>(1, 1);
    mat4 m4;
    coopmat<float, gl_ScopeSubgroup, 4, 4, gl_MatrixUseA> f32_4_4 = coopmat<float, gl_ScopeSubgroup, 4, 4, gl_MatrixUseA>(m4);
    f16_16_8[0][0];
    f16_16_8.x;
    transpose(f16_8_8);
    float16_t larr[16];
    coopmat<float16_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseAccumulator> lvar;
    coopMatLoad(lvar, larr, 1, 2, gl_CooperativeMatrixLayoutRowMajor);
    coopMatStore(lvar, larr, 1, 2, gl_CooperativeMatrixLayoutRowMajor);
}}
"
    );
    assert_rejected_like_glslang(&source, VULKAN_1_3)
}
