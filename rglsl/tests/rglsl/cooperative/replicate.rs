use spirv::Op;

use super::{assert_errors, compile, VULKAN_1_0, VULKAN_1_1, VULKAN_1_3};
use crate::TestResult;

const DECLARATIONS: &str = "const int csix = 6;
struct S { int a; int b; int c; };
struct SS { S s1; S s2; };
const S cs = S(csix, csix, csix);
const SS css = SS(cs, cs);
const float spec_float = 3;
const vec4 cv = vec4(spec_float);
const mat4 cm = mat4(cv, cv, cv, cv);
const int cfive = 5;
const int carr[3] = {cfive, cfive, cfive};
const int carr2[3][3] = {carr, carr, carr};
const coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> ccoop = coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA>(spec_float);
";

const SPECIALIZED: &str = "layout(constant_id = 1) const int csix = 6;
struct S { int a; int b; int c; };
struct SS { S s1; S s2; };
const S cs = S(csix, csix, csix);
const SS css = SS(cs, cs);
layout(constant_id = 2) const float spec_float = 3;
const vec4 cv = vec4(spec_float);
const mat4 cm = mat4(cv, cv, cv, cv);
layout(constant_id = 0) const int cfive = 5;
const int carr[3] = {cfive, cfive, cfive};
const int carr2[3][3] = {carr, carr, carr};
const coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> ccoop = coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA>(spec_float);
";

fn source(declarations: &str, pragma: bool) -> String {
    format!(
        "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_KHR_cooperative_matrix : enable
#extension GL_EXT_spec_constant_composites : enable
{}
layout(local_size_x = 64) in;
{declarations}
layout(binding = 0) buffer B {{ vec4 v4; mat4 m4; int i3[3]; int i33[3][3]; S s; SS ss; float f[]; }};
void main()
{{
    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> coop = coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA>(1.0);
    float a = f[0];
    vec4 v = vec4(a);
    v4 = v + cv;
    m4 = mat4(v, v, v, v) + cm;
    int five = int(f[1]);
    int arr[3] = {{five, five, five}};
    i3 = arr;
    i33 = int[3][3](arr, arr, arr);
    i33 = carr2;
    S s2 = S(five, five, five);
    s = s2;
    ss = SS(s2, s2);
    ss = css;
    i3 = carr;
    coopMatStore(coop, f, 0u, 16u, 0);
    coopMatStore(ccoop, f, 256u, 16u, 0);
}}
",
        if pragma {
            "#pragma use_replicated_composites"
        } else {
            ""
        }
    )
}

fn replicated(compiled: &super::Compiled) -> usize {
    compiled.count(Op::ConstantCompositeReplicateEXT)
        + compiled.count(Op::SpecConstantCompositeReplicateEXT)
        + compiled.count(Op::CompositeConstructReplicateEXT)
}

#[test]
fn replicated_composites_match_glslang() -> TestResult {
    for declarations in [DECLARATIONS, SPECIALIZED] {
        let compiled = compile(&source(declarations, true), VULKAN_1_3)?;
        assert!(compiled.has_capability(spirv::Capability::ReplicatedCompositesEXT));
        assert!(compiled.count(Op::CompositeConstructReplicateEXT) >= 5);
        let plain = compile(&source(declarations, false), VULKAN_1_3)?;
        assert_eq!(replicated(&plain), 0);
    }
    Ok(())
}

#[test]
fn variable_pointers_pragma() -> TestResult {
    let shader = "#version 450 core
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_NV_cooperative_matrix : enable
#pragma use_variable_pointers
layout(local_size_x = 64) in;
layout(binding = 0) coherent buffer Block { float x[]; } block;
void main()
{
    fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> m = fcoopmatNV<32, gl_ScopeSubgroup, 16, 8>(0.0);
    coopMatStoreNV(m, block.x, 16, 128, false);
}
";
    for target in [VULKAN_1_1, VULKAN_1_3] {
        let compiled = compile(shader, target)?;
        assert!(compiled.has_capability(spirv::Capability::VariablePointers));
    }
    let old = "#version 450 core
#pragma use_variable_pointers
layout(local_size_x = 64) in;
void main()
{
}
";
    assert_errors(old, VULKAN_1_0, &[(2, "SPIR-V 1.3")])
}
