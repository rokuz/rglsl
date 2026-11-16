use crate::{Form, disassemble};

const FRAGMENT: [u32; 82] = [
    0x07230203, 0x00010000, 0x0008000b, 0x0000000c, 0x00000000, 0x00020011, 0x00000001, 0x0006000b,
    0x00000001, 0x4c534c47, 0x6474732e, 0x3035342e, 0x00000000, 0x0003000e, 0x00000000, 0x00000001,
    0x0006000f, 0x00000004, 0x00000004, 0x6e69616d, 0x00000000, 0x00000009, 0x00030010, 0x00000004,
    0x00000007, 0x00030003, 0x00000002, 0x000001c2, 0x00040005, 0x00000004, 0x6e69616d, 0x00000000,
    0x00030005, 0x00000009, 0x00000063, 0x00040047, 0x00000009, 0x0000001e, 0x00000000, 0x00020013,
    0x00000002, 0x00030021, 0x00000003, 0x00000002, 0x00030016, 0x00000006, 0x00000020, 0x00040017,
    0x00000007, 0x00000006, 0x00000004, 0x00040020, 0x00000008, 0x00000003, 0x00000007, 0x0004003b,
    0x00000008, 0x00000009, 0x00000003, 0x0004002b, 0x00000006, 0x0000000a, 0x3f576aa4, 0x0007002c,
    0x00000007, 0x0000000b, 0x0000000a, 0x0000000a, 0x0000000a, 0x0000000a, 0x00050036, 0x00000002,
    0x00000004, 0x00000000, 0x00000003, 0x000200f8, 0x00000005, 0x0003003e, 0x00000009, 0x0000000b,
    0x000100fd, 0x00010038,
];

const FRAGMENT_TEXT: &str = r#"; SPIR-V
; Version: 1.0
; Generator: Khronos Glslang Reference Front End; 11
; Bound: 12
; Schema: 0
               OpCapability Shader
          %1 = OpExtInstImport "GLSL.std.450"
               OpMemoryModel Logical GLSL450
               OpEntryPoint Fragment %main "main" %c
               OpExecutionMode %main OriginUpperLeft
               OpSource GLSL 450
               OpName %main "main"
               OpName %c "c"
               OpDecorate %c Location 0
       %void = OpTypeVoid
          %3 = OpTypeFunction %void
      %float = OpTypeFloat 32
    %v4float = OpTypeVector %float 4
%_ptr_Output_v4float = OpTypePointer Output %v4float
          %c = OpVariable %_ptr_Output_v4float Output
%float_0_841470957 = OpConstant %float 0.841470957
         %11 = OpConstantComposite %v4float %float_0_841470957 %float_0_841470957 %float_0_841470957 %float_0_841470957
       %main = OpFunction %void None %3
          %5 = OpLabel
               OpStore %c %11
               OpReturn
               OpFunctionEnd
"#;

#[test]
fn prints_spirv_dis_text() {
    let disassembly = disassemble(&FRAGMENT, Form::Standard);
    assert!(!disassembly.failed);
    assert_eq!(disassembly.to_text(), FRAGMENT_TEXT);
}

#[test]
fn names_types_constants_and_duplicates() {
    let mut words = vec![0x0723_0203, 0x0001_0000, 0, 9, 0];
    let mut push = |opcode: u32, operands: &[u32]| {
        let count = u32::try_from(operands.len() + 1).unwrap_or(0);
        words.push((count << 16) | opcode);
        words.extend_from_slice(operands);
    };
    push(5, &[1, u32::from_le_bytes(*b"a.b\0")]);
    push(5, &[2, u32::from_le_bytes(*b"a_b\0")]);
    push(21, &[3, 32, 1]);
    push(43, &[3, 4, 0xffff_fff9]);
    push(22, &[5, 64]);
    push(43, &[5, 6, 0, 0x3ff8_0000]);
    push(19, &[1]);
    push(19, &[2]);
    let text = disassemble(&words, Form::Standard).to_text();
    assert!(text.contains("        %a_b = OpTypeVoid\n"), "{text}");
    assert!(text.contains("      %a_b_0 = OpTypeVoid\n"), "{text}");
    assert!(
        text.contains("     %int_n7 = OpConstant %int -7\n"),
        "{text}"
    );
    assert!(
        text.contains(" %double_1_5 = OpConstant %double 1.5\n"),
        "{text}"
    );
}

#[test]
fn malformed_input_fails_with_the_text_so_far() {
    let truncated = FRAGMENT.get(..20).unwrap_or_default();
    let disassembly = disassemble(truncated, Form::Standard);
    assert!(disassembly.failed);
    let text = disassembly.to_text();
    assert!(text.starts_with("; SPIR-V\n"), "{text}");
    assert!(text.contains("Disassembly failed: "), "{text}");
    assert!(disassemble(&[1, 2], Form::Standard).failed);
    for length in 0..FRAGMENT.len() {
        let _ = disassemble(FRAGMENT.get(..length).unwrap_or_default(), Form::Standard);
    }
    for index in 5..FRAGMENT.len() {
        for value in [0, 1, 0xffff, 0x0001_0000, 0x7fff_ffff, u32::MAX] {
            let mut words = FRAGMENT.to_vec();
            if let Some(word) = words.get_mut(index) {
                *word = value;
            }
            let _ = disassemble(&words, Form::Standard);
        }
    }
}
