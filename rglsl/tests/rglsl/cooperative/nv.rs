use spirv::Op;

use super::{
    assert_errors, assert_rejected_like_glslang, compile, compile_with, Debug, Glslang, VULKAN_1_3,
};
use crate::TestResult;

const HEADER: &str = "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_NV_cooperative_matrix : enable
#extension GL_NV_integer_cooperative_matrix : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout(local_size_x = 64) in;
";

const MATRICES: [(&str, &str); 8] = [
    ("f16", "fcoopmatNV<16, gl_ScopeSubgroup, 16, 16>"),
    ("f32", "fcoopmatNV<32, gl_ScopeSubgroup, 16, 16>"),
    ("i8", "icoopmatNV<8, gl_ScopeSubgroup, 16, 16>"),
    ("i16", "icoopmatNV<16, gl_ScopeSubgroup, 16, 16>"),
    ("i32", "icoopmatNV<32, gl_ScopeSubgroup, 16, 16>"),
    ("u8", "ucoopmatNV<8, gl_ScopeSubgroup, 16, 16>"),
    ("u16", "ucoopmatNV<16, gl_ScopeSubgroup, 16, 16>"),
    ("u32", "ucoopmatNV<32, gl_ScopeSubgroup, 16, 16>"),
];

const BUFFERS: [&str; 22] = [
    "float",
    "vec2",
    "vec4",
    "float16_t",
    "f16vec2",
    "f16vec4",
    "double",
    "dvec2",
    "int8_t",
    "int16_t",
    "int",
    "ivec2",
    "ivec4",
    "int64_t",
    "uint8_t",
    "uint16_t",
    "uint",
    "uvec2",
    "uvec4",
    "uint64_t",
    "u64vec2",
    "uvec3",
];

fn buffer_allowed(floating: bool, load: bool, buffer: &str) -> bool {
    let integers = [
        "int8_t", "int16_t", "int", "int64_t", "ivec2", "ivec4", "uint8_t", "uint16_t", "uint",
        "uint64_t", "uvec2", "uvec4",
    ];
    if !floating {
        return integers.contains(&buffer);
    }
    let floats = [
        "float16_t",
        "float",
        "uint8_t",
        "uint16_t",
        "uint",
        "uint64_t",
        "uvec2",
        "uvec4",
    ];
    floats.contains(&buffer) || (!load && buffer == "double")
}

#[test]
fn load_and_store_buffer_types() -> TestResult {
    let mut declarations = String::new();
    for (index, buffer) in BUFFERS.iter().enumerate() {
        declarations.push_str(&format!(
            "layout(binding = {index}) buffer B{index} {{ {buffer} x{index}[]; }};\n"
        ));
    }
    for (name, matrix) in MATRICES {
        let floating = name.starts_with('f');
        let mut accepted = String::new();
        let mut rejected = String::new();
        for (index, buffer) in BUFFERS.iter().enumerate() {
            for load in [true, false] {
                let call = if load {
                    format!("    {{ {matrix} m; coopMatLoadNV(m, x{index}, {index}, 8, true); }}\n")
                } else {
                    format!("    {{ {matrix} m = {matrix}(1); coopMatStoreNV(m, x{index}, {index}u, 8u, false); }}\n")
                };
                if buffer_allowed(floating, load, buffer) {
                    accepted.push_str(&call);
                } else {
                    rejected.push_str(&call);
                }
            }
        }
        let source = format!("{HEADER}{declarations}void main() {{\n{accepted}}}\n");
        compile_with(&source, VULKAN_1_3, Debug::None, Glslang::SameStructure)
            .map_err(|error| format!("{name} accepted: {error}"))?;
        let source = format!("{HEADER}{declarations}void main() {{\n{rejected}}}\n");
        assert_rejected_like_glslang(&source, VULKAN_1_3)
            .map_err(|error| format!("{name} rejected: {error}"))?;
    }
    Ok(())
}

#[test]
fn conversions_between_component_types() -> TestResult {
    let mut body = String::new();
    let mut offset = 0;
    for (source_name, source_type) in MATRICES {
        let buffer = if source_name.starts_with('f') {
            "u"
        } else {
            "i"
        };
        body.push_str(&format!(
            "  {{ {source_type} a; coopMatLoadNV(a, {buffer}, 0, 16, false);\n"
        ));
        for (target_name, target_type) in MATRICES {
            let output = match target_name.as_bytes().first() {
                Some(b'f') => "f",
                Some(b'i') => "i",
                _ => "u",
            };
            body.push_str(&format!(
                "    {{ {target_type} c = {target_type}(a); coopMatStoreNV(c, {output}, {offset}, 16, true); }}\n"
            ));
            offset += 1;
        }
        body.push_str("  }\n");
    }
    let source = format!(
        "{HEADER}layout(binding = 0) buffer B {{ uint u[]; float f[]; int i[]; }};\nvoid main() {{\n{body}}}\n"
    );
    compile(&source, VULKAN_1_3)?;
    Ok(())
}

#[test]
fn multiply_add_component_classes() -> TestResult {
    let mut accepted = String::new();
    let mut rejected = String::new();
    for (a_name, a_type) in MATRICES {
        for (c_name, c_type) in MATRICES {
            let class = |name: &str| name.as_bytes().first().copied();
            if (class(a_name) == Some(b'f')) != (class(c_name) == Some(b'f')) {
                continue;
            }
            let a_buffer = if a_name.starts_with('f') { "u" } else { "i" };
            let c_buffer = if c_name.starts_with('f') { "u" } else { "i" };
            let line = format!(
                "    {{ {a_type} a; {a_type} b; {c_type} c; coopMatLoadNV(a, {a_buffer}, 0, 16, false); coopMatLoadNV(b, {a_buffer}, 0, 16, false); coopMatLoadNV(c, {c_buffer}, 0, 16, false); c = coopMatMulAddNV(a, b, c); coopMatStoreNV(c, {c_buffer}, 0, 16, false); }}\n"
            );
            if class(a_name) == class(c_name) {
                accepted.push_str(&line);
            } else {
                rejected.push_str(&line);
            }
        }
    }
    let declarations = "layout(binding = 0) buffer B { uint u[]; int i[]; };\n";
    let source = format!("{HEADER}{declarations}void main() {{\n{accepted}}}\n");
    let compiled = compile(&source, VULKAN_1_3)?;
    assert_eq!(compiled.count(Op::CooperativeMatrixMulAddNV), 22);
    let source = format!("{HEADER}{declarations}void main() {{\n{rejected}}}\n");
    assert_rejected_like_glslang(&source, VULKAN_1_3)
}

#[test]
fn length_is_a_specialization_constant() -> TestResult {
    let source = format!(
        "{HEADER}layout(constant_id = 0) const int N = 8;
layout(binding = 0) buffer B {{ float f[]; int i[]; }};
void main() {{
    fcoopmatNV<32, gl_ScopeSubgroup, 16, N> m = fcoopmatNV<32, gl_ScopeSubgroup, 16, N>(1.0);
    i[0] = m.length();
    for (int k = 0; k < m.length(); ++k) m[k] = m[k] * 2.0;
    fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> n = fcoopmatNV<32, gl_ScopeSubgroup, 16, 8>(2.0);
    i[1] = n.length();
    coopMatStoreNV(m, f, 0, 8, false);
    coopMatStoreNV(n, f, 128, 8, false);
}}
"
    );
    let compiled = compile(&source, VULKAN_1_3)?;
    assert_eq!(compiled.count(Op::CooperativeMatrixLengthNV), 0);
    Ok(())
}

#[test]
fn operators() -> TestResult {
    let source = format!(
        "{HEADER}layout(binding = 0) buffer B {{ float f[]; }};
void main() {{
    fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> m = fcoopmatNV<32, gl_ScopeSubgroup, 16, 8>(1.0);
    m = m + m;
    m = m - m;
    m = m / m;
    m = -m;
    m = 2.0 * m;
    m = m * 2.0;
    m *= 3.0;
    coopMatStoreNV(m, f, 0, 8, false);
}}
"
    );
    compile(&source, VULKAN_1_3)?;
    for line in [
        "m = m * m;",
        "m *= m;",
        "m = m * float16_t(2.0);",
        "m = m + 1.0;",
        "fcoopmatNV<16, gl_ScopeSubgroup, 16, 8> h; m = h;",
    ] {
        let source = format!(
            "{HEADER}layout(binding = 0) buffer B {{ float f[]; }};
void main() {{
    fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> m = fcoopmatNV<32, gl_ScopeSubgroup, 16, 8>(1.0);
    {line}
    coopMatStoreNV(m, f, 0, 8, false);
}}
"
        );
        assert_errors(&source, VULKAN_1_3, &[(10, "")])
            .map_err(|error| format!("`{line}`: {error}"))?;
    }
    Ok(())
}

#[test]
fn column_major_must_be_constant() -> TestResult {
    let source = format!(
        "{HEADER}layout(constant_id = 0) const bool COLUMN = true;
layout(binding = 0) buffer B {{ float f[]; }};
void main() {{
    fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> m;
    coopMatLoadNV(m, f, 0, 8, COLUMN);
    bool column = f[0] > 0.0;
    coopMatStoreNV(m, f, 0, 8, column);
}}
"
    );
    let errors = super::errors(&source, VULKAN_1_3)?;
    let lines: Vec<u32> = errors.iter().map(|(line, _)| *line).collect();
    assert_eq!(lines, [13]);
    Ok(())
}

#[test]
fn double_matrices_keep_their_width() -> TestResult {
    let source = format!(
        "{HEADER}layout(binding = 0) buffer B {{ uint u[]; double d[]; }};
void main() {{
    fcoopmatNV<64, gl_ScopeSubgroup, 16, 16> a;
    coopMatLoadNV(a, u, 0, 16, false);
    coopMatStoreNV(a, d, 0, 16, false);
}}
"
    );
    let compiled = compile_with(&source, VULKAN_1_3, Debug::None, Glslang::Accepts)?;
    assert!(compiled.has_capability(spirv::Capability::Float64));
    assert!(compiled
        .disassemble()
        .contains("OpTypeCooperativeMatrixNV %"));
    Ok(())
}

#[test]
fn needs_an_extension() -> TestResult {
    for (extension, declaration) in [
        (
            "GL_KHR_cooperative_matrix",
            "fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> m;",
        ),
        (
            "GL_NV_cooperative_matrix",
            "icoopmatNV<32, gl_ScopeSubgroup, 16, 8> m;",
        ),
    ] {
        let source = format!(
            "#version 450 core
#extension {extension} : enable
layout(local_size_x = 64) in;
void main() {{
    {declaration}
}}
"
        );
        assert_errors(&source, VULKAN_1_3, &[(5, "")])
            .map_err(|error| format!("{extension}: {error}"))?;
    }
    Ok(())
}
