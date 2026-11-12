use super::{assert_errors, compile, VULKAN_1_3};
use spirv::Op;

#[test]
fn multiply_add_matches_glslang() -> crate::TestResult {
    let compiled = compile(
        r"#version 450
#extension GL_KHR_cooperative_matrix : require
#extension GL_KHR_memory_scope_semantics : require
#extension GL_EXT_shader_explicit_arithmetic_types : require
layout(local_size_x = 32) in;
layout(binding = 0) buffer Data { float16_t x[]; };
layout(binding = 1) buffer Result { float y[]; };
void main() {
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> a;
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseB> b;
    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> c =
        coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator>(0.0);
    coopMatLoad(a, x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
    coopMatLoad(b, x, 256, 16, gl_CooperativeMatrixLayoutColumnMajor);
    c = coopMatMulAdd(a, b, c);
    coopMatStore(c, y, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
}
",
        VULKAN_1_3,
    )?;
    assert_eq!(compiled.count(Op::CooperativeMatrixMulAddKHR), 1);
    Ok(())
}

#[test]
fn per_element_result_must_match_the_input() -> crate::TestResult {
    assert_errors(
        r"#version 450
#extension GL_KHR_cooperative_matrix : require
#extension GL_NV_cooperative_matrix2 : require
#extension GL_KHR_memory_scope_semantics : require
#extension GL_EXT_shader_explicit_arithmetic_types : require
layout(local_size_x = 32) in;
float16_t relu(const in uint32_t row, const in uint32_t col, const in float16_t x) { return max(x, float16_t(0)); }
void main() {
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> a;
    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> b;
    coopMatPerElementNV(b, a, relu);
}
",
        VULKAN_1_3,
        &[(11, "")],
    )
}
