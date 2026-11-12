use rspirv::dr;
use spirv::Op;

use super::{compile_with, Compiled, Debug, Glslang, VULKAN_1_3};
use crate::TestResult;

const DEBUG_TYPE_COOPERATIVE_MATRIX: u32 = 110;

fn cooperative_debug_types_in(words: &[u32]) -> usize {
    let mut count = 0;
    let mut rest = words.get(5..).unwrap_or(&[]);
    while let Some((&first, _)) = rest.split_first() {
        let length = usize::try_from(first >> 16)
            .unwrap_or(1)
            .clamp(1, rest.len());
        let (instruction, tail) = rest.split_at(length);
        if first & 0xffff == Op::ExtInst as u32
            && instruction.get(4) == Some(&DEBUG_TYPE_COOPERATIVE_MATRIX)
        {
            count += 1;
        }
        rest = tail;
    }
    count
}

fn import_names(compiled: &Compiled) -> Vec<String> {
    compiled
        .module
        .ext_inst_imports
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(dr::Operand::LiteralString(name)) => Some(name.clone()),
            _ => None,
        })
        .collect()
}

#[test]
fn khr_matrices_have_cooperative_debug_types() -> TestResult {
    let source = "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_KHR_cooperative_matrix : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout(local_size_x = 64) in;
layout(constant_id = 0) const int N = 8;
layout(constant_id = 1) const uint M = 16;
layout(binding = 0) buffer B { float f[]; };
void main()
{
    coopmat<float, gl_ScopeSubgroup, 16, N, gl_MatrixUseA> a = coopmat<float, gl_ScopeSubgroup, 16, N, gl_MatrixUseA>(1.0);
    coopmat<float16_t, gl_ScopeWorkgroup, 8, 8, gl_MatrixUseAccumulator> b = coopmat<float16_t, gl_ScopeWorkgroup, 8, 8, gl_MatrixUseAccumulator>(2.0);
    coopmat<int8_t, gl_ScopeSubgroup, M, 8, gl_MatrixUseB> c = coopmat<int8_t, gl_ScopeSubgroup, M, 8, gl_MatrixUseB>(int8_t(3));
    coopMatStore(a, f, 0u, 8u, 0);
    coopMatStore(b, f, 64u, 8u, 0);
    coopMatStore(c, f, 128u, 8u, 0);
}
";
    for debug in [Debug::NonSemantic, Debug::NonSemanticWithSource] {
        let compiled = compile_with(source, VULKAN_1_3, debug, Glslang::Accepts)?;
        assert_eq!(cooperative_debug_types_in(&compiled.words), 3);
        if let Some(words) = &compiled.glslang_words {
            assert_eq!(cooperative_debug_types_in(words), 3);
        }
        let converted = compiled
            .instructions(Op::SpecConstantOp)
            .iter()
            .filter(|inst| {
                matches!(
                    inst.operands.first(),
                    Some(dr::Operand::LiteralSpecConstantOpInteger(Op::IAdd))
                )
            })
            .count();
        assert_eq!(converted, 1);
        assert!(import_names(&compiled)
            .iter()
            .any(|name| name.starts_with("NonSemantic.Shader.DebugInfo.10")));
    }
    Ok(())
}

#[test]
fn nv_matrices_are_opaque_debug_types() -> TestResult {
    let source = "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_NV_cooperative_matrix : enable
layout(local_size_x = 64) in;
layout(binding = 0) buffer B { float f[]; };
void main()
{
    fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> c = fcoopmatNV<32, gl_ScopeSubgroup, 16, 8>(3.0);
    coopMatStoreNV(c, f, 128u, 8u, false);
}
";
    let compiled = compile_with(source, VULKAN_1_3, Debug::NonSemantic, Glslang::Accepts)?;
    assert_eq!(cooperative_debug_types_in(&compiled.words), 0);
    assert!(compiled.disassemble().contains("\"coopmat\""));
    Ok(())
}
