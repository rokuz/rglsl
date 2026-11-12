use super::{
    assert_rejected_like_glslang, assert_rejected_unlike_glslang, compile_raw, RawCompiled,
    VULKAN_1_3,
};
use crate::TestResult;
use spirv::{Capability, Op};

const NV2: &str = "#extension GL_NV_cooperative_matrix2 : enable\n";
const MAINTENANCE1: &str = "#extension GL_EXT_cooperative_matrix_maintenance1 : enable\n";
const DECORATION_TRANSPOSE_EXT: u32 = 5440;
const CAPABILITY_CONVERSIONS_EXT: u32 = 5429;
const CAPABILITY_GET_COORDINATE_EXT: u32 = 5438;
const CAPABILITY_DECODE_VECTOR_NV: u32 = 5447;
const OP_GET_COORDINATE_EXT: u32 = 5363;
const TYPES: [&str; 8] = [
    "uint8_t",
    "int8_t",
    "uint16_t",
    "int16_t",
    "uint32_t",
    "int32_t",
    "float16_t",
    "float32_t",
];

fn shader(extensions: &str, declarations: &str, body: &str) -> String {
    format!(
        "#version 450
#extension GL_KHR_memory_scope_semantics : enable
#extension GL_KHR_cooperative_matrix : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
{extensions}layout(local_size_x = 32) in;
layout(binding = 0) buffer Buf {{ float16_t x[]; }} buf;
layout(binding = 1) buffer BufF {{ float x[]; }} buff;
layout(binding = 2) buffer BufI {{ int x[]; }} bufi;
layout(binding = 3) buffer Out {{ uvec2 u[]; }} outv;
{declarations}
void main() {{
{body}
}}
"
    )
}

fn typed_buffers() -> String {
    TYPES
        .iter()
        .enumerate()
        .map(|(index, ty)| {
            format!(
                "layout(binding = {}) buffer T{index} {{ {ty} x[]; }} v_{ty};\n",
                index + 10
            )
        })
        .collect()
}

fn op(op: Op) -> u32 {
    op as u32
}

fn capability(capability: Capability) -> u32 {
    capability as u32
}

fn decorations(compiled: &RawCompiled, decoration: u32) -> usize {
    compiled
        .operands(op(Op::Decorate))
        .iter()
        .filter(|operands| operands.get(1) == Some(&decoration))
        .count()
}

fn tensor_masks(compiled: &RawCompiled, opcode: Op, mask_index: usize) -> Vec<u32> {
    compiled
        .operands(op(opcode))
        .iter()
        .filter_map(|operands| operands.get(mask_index).copied())
        .collect()
}

#[test]
fn tensor_layouts_of_every_dimension_count_and_clamp_mode() -> TestResult {
    let modes = [
        "",
        ", gl_CooperativeMatrixClampModeUndefinedNV",
        ", gl_CooperativeMatrixClampModeConstantNV",
        ", gl_CooperativeMatrixClampModeClampToEdgeNV",
        ", gl_CooperativeMatrixClampModeRepeatNV",
        ", gl_CooperativeMatrixClampModeMirrorRepeatNV",
    ];
    let mut body = String::new();
    for dimensions in 1..=5u32 {
        let values: Vec<String> = (0..dimensions).map(|i| (8 + i).to_string()).collect();
        let values = values.join(", ");
        let slices: Vec<String> = (0..dimensions).map(|i| format!("{i}, {}", 4 + i)).collect();
        let slices = slices.join(", ");
        for mode in modes {
            body.push_str(&format!(
                "  {{ tensorLayoutNV<{dimensions}{mode}> t = createTensorLayoutNV({dimensions}{mode});
    t = setTensorLayoutDimensionNV(t, {values}); t = setTensorLayoutStrideNV(t, {values});
    t = setTensorLayoutBlockSizeNV(t, {values}); t = sliceTensorLayoutNV(t, {slices});
    t = setTensorLayoutClampValueNV(t, 7u);
    coopmat<float16_t, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseA> m;
    coopMatLoadTensorNV(m, buf.x, 0u, t); coopMatStoreTensorNV(m, buf.x, 64u, t); }}
"
            ));
        }
    }
    let compiled = compile_raw(&shader(NV2, "", &body), VULKAN_1_3)?;
    assert_eq!(compiled.count(op(Op::CreateTensorLayoutNV)), 30);
    for setter in [
        Op::TensorLayoutSetDimensionNV,
        Op::TensorLayoutSetStrideNV,
        Op::TensorLayoutSetBlockSizeNV,
        Op::TensorLayoutSliceNV,
        Op::TensorLayoutSetClampValueNV,
    ] {
        assert_eq!(compiled.count(op(setter)), 30, "{setter:?}");
    }
    assert_eq!(compiled.count(op(Op::TypeTensorLayoutNV)), 25);
    assert!(compiled.has_capability(capability(Capability::TensorAddressingNV)));
    assert!(compiled.has_extension("SPV_NV_tensor_addressing"));
    Ok(())
}

#[test]
fn tensor_views_with_every_dimension_count_and_permutation() -> TestResult {
    let views = [
        (1, "createTensorViewNV(1)", "tensorViewNV<1>"),
        (1, "createTensorViewNV(1, true)", "tensorViewNV<1, true>"),
        (2, "createTensorViewNV(2, false)", "tensorViewNV<2, false>"),
        (
            2,
            "createTensorViewNV(2, true, 1, 0)",
            "tensorViewNV<2, true, 1, 0>",
        ),
        (
            3,
            "createTensorViewNV(3, true, 2, 0, 1)",
            "tensorViewNV<3, true, 2, 0, 1>",
        ),
        (
            4,
            "createTensorViewNV(4, false, 3, 2, 1, 0)",
            "tensorViewNV<4, false, 3, 2, 1, 0>",
        ),
        (
            5,
            "createTensorViewNV(5, true, 4, 0, 3, 1, 2)",
            "tensorViewNV<5, true, 4, 0, 3, 1, 2>",
        ),
        (5, "createTensorViewNV(5)", "tensorViewNV<5>"),
    ];
    let mut body = String::new();
    for (index, (dimensions, create, ty)) in views.iter().enumerate() {
        let values: Vec<String> = (0..*dimensions).map(|i| (8 + i).to_string()).collect();
        let values = values.join(", ");
        body.push_str(&format!(
            "  {{ tensorLayoutNV<{dimensions}> t = createTensorLayoutNV({dimensions}); t = setTensorLayoutDimensionNV(t, {values});
    {ty} v = {create}; v = setTensorViewDimensionsNV(v, {values}); v = setTensorViewStrideNV(v, {values});
    v = setTensorViewClipNV(v, 0, 16, 0, 16);
    coopmat<float16_t, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseB> m;
    coopMatLoadTensorNV(m, buf.x, {index}, t, v); coopMatStoreTensorNV(m, buf.x, {index}, t, v); }}
"
        ));
    }
    let compiled = compile_raw(&shader(NV2, "", &body), VULKAN_1_3)?;
    assert_eq!(compiled.count(op(Op::CreateTensorViewNV)), views.len());
    assert_eq!(compiled.count(op(Op::TensorViewSetClipNV)), views.len());
    assert_eq!(
        tensor_masks(&compiled, Op::CooperativeMatrixStoreTensorNV, 4),
        vec![1; views.len()]
    );
    Ok(())
}

#[test]
fn tensor_element_offsets_convert_like_glslang() -> TestResult {
    let offsets = [
        "0",
        "1u",
        "int(gl_LocalInvocationIndex)",
        "gl_LocalInvocationIndex",
        "uint16_t(3)",
        "int16_t(3)",
        "uint8_t(2)",
        "int8_t(3)",
    ];
    let body: String = offsets
        .iter()
        .map(|offset| {
            format!(
                "  {{ tensorLayoutNV<2> t = createTensorLayoutNV(2); coopmat<float16_t, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseAccumulator> m;
    coopMatLoadTensorNV(m, buf.x, {offset}, t); coopMatStoreTensorNV(m, buf.x, {offset}, t); }}
"
            )
        })
        .collect();
    let compiled = compile_raw(&shader(NV2, "", &body), VULKAN_1_3)?;
    assert_eq!(
        compiled.count(op(Op::CooperativeMatrixLoadTensorNV)),
        offsets.len()
    );
    assert!(!compiled.has_capability(capability(Capability::Int16)));
    Ok(())
}

const DECODERS: &str = "#extension GL_EXT_long_vector : enable
#extension GL_NV_cooperative_matrix_decode_vector : enable
#extension GL_EXT_buffer_reference : enable
#extension GL_EXT_shader_64bit_indexing : enable
";

const DECODE_FUNCTIONS: &str = "layout(binding = 4) buffer BufType8 { uint8_t x[]; } Buf8;
layout(buffer_reference, std430, buffer_reference_align = 4) buffer dwordBuf { uint32_t d; };
layout(buffer_reference, std430, buffer_reference_align = 2) buffer halfBuf { float16_t h[]; };
float16_t decodeH(const in halfBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return b.h[coordInBlock[0]] * float16_t(blockCoords[1]); }
float16_t decodeF16Scalar(const in dwordBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return float16_t(b.d + blockCoords[0] + coordInBlock[1]); }
f16vec2 decodeF16x2(const in dwordBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return unpackFloat2x16(b.d); }
f16vec4 decodeF16x4(const in dwordBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return f16vec4(unpackFloat2x16(b.d), unpackFloat2x16(b.d + 1u)); }
vector<float16_t, 8> decodeF16x8(const in halfBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return vector<float16_t, 8>(b.h[0], b.h[1], b.h[2], b.h[3], b.h[4], b.h[5], b.h[6], b.h[7]); }
vector<float16_t, 2> decodeF16v2(const in halfBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return vector<float16_t, 2>(b.h[0], b.h[1]); }
uint8_t decodeU8Scalar(const in dwordBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return uint8_t(b.d); }
u8vec2 decodeU8x2(const in dwordBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return u8vec2(uint8_t(b.d), uint8_t(b.d >> 8)); }
vector<uint8_t, 8> decodeU8x8(const in dwordBuf b, const in uint32_t blockCoords[2], const in uint32_t coordInBlock[2]) { return vector<uint8_t, 8>(uint8_t(b.d)); }
float decodeF(const in dwordBuf b, const in uint32_t blockCoords[3], const in uint32_t coordInBlock[3]) { return uintBitsToFloat(b.d); }
vec4 decodeF4(const in dwordBuf b, const in uint32_t blockCoords[3], const in uint32_t coordInBlock[3]) { return vec4(uintBitsToFloat(b.d)); }
";

#[test]
fn tensor_loads_with_views_and_decode_functions() -> TestResult {
    let body = "    coopmat<float16_t, gl_ScopeWorkgroup, 64, 32, gl_MatrixUseA> A;
    coopmat<uint8_t, gl_ScopeWorkgroup, 64, 32, gl_MatrixUseB> Bu8;
    coopmat<float, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseAccumulator> C;
    tensorLayoutNV<2, gl_CooperativeMatrixClampModeConstantNV> t = createTensorLayoutNV(2, gl_CooperativeMatrixClampModeConstantNV);
    t = setTensorLayoutBlockSizeNV(t, 4, 8);
    t = setTensorLayoutDimensionNV(t, 256, 512);
    t = setTensorLayoutClampValueNV(t, 0x3c00);
    tensorViewNV<2, false, 1, 0> v = createTensorViewNV(2, false, 1, 0);
    tensorLayoutNV<3> t3 = createTensorLayoutNV(3);
    t3 = setTensorLayoutDimensionNV(t3, 4, 64, 64);
    t3 = sliceTensorLayoutNV(t3, 1, 1, 0, 16, 0, 16);
    tensorViewNV<3, true, 0, 2, 1> v3 = createTensorViewNV(3, true, 0, 2, 1);
    v3 = setTensorViewDimensionsNV(v3, 1, 16, 16);
    v3 = setTensorViewStrideNV(v3, 256, 16, 1);
    v3 = setTensorViewClipNV(v3, 0, 16, 0, 16);
    coopMatLoadTensorNV(A, buf.x, 0u, t, decodeH);
    coopMatStoreTensorNV(A, buf.x, 4096u, t);
    coopMatLoadTensorNV(A, buf.x, 0u, t, v, decodeH);
    coopMatStoreTensorNV(A, buf.x, 8192u, t, v);
    coopMatLoadTensorNV(A, buf.x, 0u, t, decodeF16Scalar, decodeF16x2);
    coopMatStoreTensorNV(A, buf.x, 12288u, t);
    coopMatLoadTensorNV(A, buf.x, 0u, t, v, decodeF16Scalar, decodeF16x4);
    coopMatStoreTensorNV(A, buf.x, 16384u, t);
    coopMatLoadTensorNV(A, buf.x, uint64_t(0), t, decodeH, decodeF16x8);
    coopMatStoreTensorNV(A, buf.x, uint64_t(20480), t);
    coopMatLoadTensorNV(A, buf.x, 0u, t, decodeH, decodeF16v2);
    coopMatStoreTensorNV(A, buf.x, int64_t(24576), t);
    coopMatLoadTensorNV(Bu8, Buf8.x, 0u, t, decodeU8Scalar, decodeU8x2);
    coopMatStoreTensorNV(Bu8, Buf8.x, 4096u, t);
    coopMatLoadTensorNV(Bu8, Buf8.x, 0u, t, v, decodeU8Scalar, decodeU8x8);
    coopMatStoreTensorNV(Bu8, Buf8.x, 8192u, t, v);
    coopMatLoadTensorNV(C, buff.x, 0u, t3, v3, decodeF, decodeF4);
    coopMatStoreTensorNV(C, buff.x, 4096u, t3, v3);
    coopMatLoadTensorNV(C, buff.x, 0u, t3);
    coopMatStoreTensorNV(C, buff.x, 8192u, t3);";
    let compiled = compile_raw(
        &shader(&format!("{NV2}{DECODERS}"), DECODE_FUNCTIONS, body),
        VULKAN_1_3,
    )?;
    let mut masks = tensor_masks(&compiled, Op::CooperativeMatrixLoadTensorNV, 6);
    masks.sort_unstable();
    assert_eq!(masks, vec![0, 2, 3, 6, 6, 6, 6, 7, 7, 7]);
    assert!(compiled.has_capability(CAPABILITY_DECODE_VECTOR_NV));
    assert!(compiled.has_capability(capability(Capability::CooperativeMatrixBlockLoadsNV)));
    assert!(compiled.has_extension("SPV_NV_cooperative_matrix_decode_vector"));
    Ok(())
}

#[test]
fn scalar_decoding_needs_no_decode_vector_capability() -> TestResult {
    let body = "    coopmat<float16_t, gl_ScopeWorkgroup, 64, 32, gl_MatrixUseA> A;
    tensorLayoutNV<2> t = createTensorLayoutNV(2);
    coopMatLoadTensorNV(A, buf.x, 0u, t, decodeH);
    coopMatStoreTensorNV(A, buf.x, 64u, t);";
    let compiled = compile_raw(
        &shader(&format!("{NV2}{DECODERS}"), DECODE_FUNCTIONS, body),
        VULKAN_1_3,
    )?;
    assert!(!compiled.has_capability(CAPABILITY_DECODE_VECTOR_NV));
    assert!(!compiled.has_extension("SPV_NV_cooperative_matrix_decode_vector"));
    Ok(())
}

#[test]
fn tensor_memory_operands_follow_the_buffer_qualifiers() -> TestResult {
    let declarations = "layout(binding = 5) coherent buffer A0 { float16_t x[]; } coh;
layout(binding = 6) volatile buffer A1 { float16_t x[]; } vol;
layout(binding = 7) nontemporal buffer A2 { float16_t x[]; } nt;
layout(binding = 8) readonly buffer A3 { float16_t x[]; } ro;
layout(binding = 9) writeonly buffer A4 { float16_t x[]; } wo;
layout(binding = 10) workgroupcoherent buffer A5 { float16_t x[]; } wgc;
shared float16_t sh[1024];";
    let body = "    coopmat<float16_t, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseA> m;
    tensorLayoutNV<2> t = createTensorLayoutNV(2);
    coopMatLoadTensorNV(m, coh.x, 0u, t); coopMatStoreTensorNV(m, coh.x, 16u, t);
    coopMatLoadTensorNV(m, vol.x, 0u, t); coopMatStoreTensorNV(m, vol.x, 16u, t);
    coopMatLoadTensorNV(m, nt.x, 0u, t); coopMatStoreTensorNV(m, nt.x, 16u, t);
    coopMatLoadTensorNV(m, ro.x, 0u, t); coopMatStoreTensorNV(m, wo.x, 16u, t);
    coopMatLoadTensorNV(m, wgc.x, 0u, t); coopMatStoreTensorNV(m, wgc.x, 16u, t);
    coopMatLoadTensorNV(m, sh, 0u, t); coopMatStoreTensorNV(m, sh, 16u, t);";
    let compiled = compile_raw(
        &shader(
            &format!("{NV2}#extension GL_EXT_nontemporal_keyword : enable\n"),
            declarations,
            body,
        ),
        VULKAN_1_3,
    )?;
    let mine = compiled.operands(op(Op::CooperativeMatrixStoreTensorNV));
    let Some(theirs) = compiled.glslang.as_ref() else {
        return Ok(());
    };
    let reference = RawCompiled {
        words: theirs.clone(),
        glslang: None,
    };
    let memory = |all: &[Vec<u32>]| -> Vec<u32> {
        all.iter()
            .filter_map(|operands| operands.get(3).copied())
            .collect()
    };
    assert_eq!(
        memory(&mine),
        memory(&reference.operands(op(Op::CooperativeMatrixStoreTensorNV)))
    );
    Ok(())
}

fn reduction_shader(extensions: &str, suffix: &str) -> String {
    let functions = "float16_t sumh(const in float16_t a, const in float16_t b) { return a + b; }
float sumf(const in float a, const in float b) { return max(a, b); }
int sumi(const in int a, const in int b) { return a * b; }";
    let shapes = [
        ("Row", 16, 8),
        ("Column", 1, 32),
        ("RowAndColumn", 1, 1),
        ("2x2", 8, 16),
        ("Row", 16, 32),
        ("Column", 16, 32),
        ("RowAndColumn", 16, 32),
    ];
    let mut body = String::new();
    let mut slot = 0;
    for (ty, buffer, function) in [
        ("float16_t", "buf", "sumh"),
        ("float", "buff", "sumf"),
        ("int", "bufi", "sumi"),
    ] {
        for (mode, rows, columns) in shapes {
            body.push_str(&format!(
                "  {{ coopmat<{ty}, gl_ScopeSubgroup, 16, 32, gl_MatrixUseAccumulator> m; coopMatLoad(m, {buffer}.x, 0, 32, gl_CooperativeMatrixLayoutRowMajor);
    coopmat<{ty}, gl_ScopeSubgroup, {rows}, {columns}, gl_MatrixUseAccumulator> r;
    coopMatReduce{suffix}(r, m, gl_CooperativeMatrixReduce{mode}{suffix}, {function});
    coopMatStore(r, {buffer}.x, {}, {columns}, gl_CooperativeMatrixLayoutRowMajor); }}
",
                slot * 1024
            ));
            slot += 1;
        }
    }
    shader(extensions, functions, &body)
}

#[test]
fn reductions_of_every_mode_and_family() -> TestResult {
    for (extensions, suffix, extension) in [
        (NV2.to_string(), "NV", "SPV_NV_cooperative_matrix2"),
        (
            format!("{NV2}{MAINTENANCE1}"),
            "NV",
            "SPV_EXT_cooperative_matrix_maintenance1",
        ),
        (
            MAINTENANCE1.to_string(),
            "EXT",
            "SPV_EXT_cooperative_matrix_maintenance1",
        ),
    ] {
        let compiled = compile_raw(&reduction_shader(&extensions, suffix), VULKAN_1_3)?;
        let masks: Vec<u32> = compiled
            .operands(op(Op::CooperativeMatrixReduceNV))
            .iter()
            .filter_map(|operands| operands.get(3).copied())
            .collect();
        assert_eq!(masks, [1, 2, 3, 4, 1, 2, 3].repeat(3), "{suffix}");
        assert!(compiled.has_capability(capability(Capability::CooperativeMatrixReductionsNV)));
        assert!(compiled.has_extension(extension), "{extensions}");
    }
    Ok(())
}

fn per_element_shader(extensions: &str, suffix: &str) -> String {
    let functions = "float16_t e0(const in uint32_t r, const in uint32_t c, const in float16_t x) { return x * float16_t(r + c); }
float16_t e1(const in uint32_t r, const in uint32_t c, const in float16_t x, const in float16_t y) { return x + y; }
float16_t e2(const in uint32_t r, const in uint32_t c, const in float16_t x, const in float16_t y, const in float z) { return x + y * float16_t(z); }
float16_t e3(const in uint32_t r, const in uint32_t c, const in float16_t x, const in float16_t y, const in uvec2 z, const in float16_t w) { return x + y + w + float16_t(z.x); }
int ei(const in uint32_t r, const in uint32_t c, const in int x, const in int y, const in bool b) { return b ? x : y; }";
    let body = format!(
        "  coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> m, n, r;
  coopMatLoad(m, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor); coopMatLoad(n, buf.x, 256, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(r, m, e0); coopMatStore(r, buf.x, 512, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(r, m, e1, n); coopMatStore(r, buf.x, 1024, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(r, m, e1, float16_t(2.0)); coopMatStore(r, buf.x, 1536, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(r, m, e2, n, buff.x[0]); coopMatStore(r, buf.x, 2048, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(r, m, e3, m, outv.u[0], n); coopMatStore(r, buf.x, 2560, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(m, m, e0); coopMatStore(m, buf.x, 3072, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopmat<int, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> a, b;
  coopMatLoad(a, bufi.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
  coopMatPerElement{suffix}(b, a, ei, a, bufi.x[3] > 0); coopMatStore(b, bufi.x, 512, 16, gl_CooperativeMatrixLayoutRowMajor);"
    );
    shader(extensions, functions, &body)
}

#[test]
fn per_element_operations_with_extra_operands() -> TestResult {
    for (extensions, suffix, extension) in [
        (NV2.to_string(), "NV", "SPV_NV_cooperative_matrix2"),
        (
            format!("{NV2}{MAINTENANCE1}"),
            "NV",
            "SPV_EXT_cooperative_matrix_maintenance1",
        ),
        (
            MAINTENANCE1.to_string(),
            "EXT",
            "SPV_EXT_cooperative_matrix_maintenance1",
        ),
    ] {
        let compiled = compile_raw(&per_element_shader(&extensions, suffix), VULKAN_1_3)?;
        let lengths: Vec<usize> = compiled
            .operands(op(Op::CooperativeMatrixPerElementOpNV))
            .iter()
            .map(Vec::len)
            .collect();
        assert_eq!(lengths, vec![4, 5, 5, 6, 7, 4, 6], "{suffix}");
        assert!(compiled.has_capability(capability(
            Capability::CooperativeMatrixPerElementOperationsNV
        )));
        assert!(compiled.has_extension(extension), "{extensions}");
    }
    Ok(())
}

fn transpose_shader(extensions: &str, suffix: &str, maintenance: bool) -> String {
    let mut body = String::new();
    let mut slot = 0;
    for source in TYPES {
        let targets: Vec<&str> = if maintenance {
            TYPES.to_vec()
        } else {
            vec![source]
        };
        let uses: &[&str] = if maintenance { &["A", "B"] } else { &["B"] };
        for target in targets {
            for usage in uses {
                body.push_str(&format!(
                    "  {{ coopmat<{source}, gl_ScopeSubgroup, 16, 32, gl_MatrixUseAccumulator> m; coopMatLoad(m, v_{source}.x, 0, 32, gl_CooperativeMatrixLayoutRowMajor);
    coopmat<{target}, gl_ScopeSubgroup, 32, 16, gl_MatrixUse{usage}> r; coopMatTranspose{suffix}(r, m);
    coopMatStore(r, v_{target}.x, {}, 16, gl_CooperativeMatrixLayoutRowMajor); }}
",
                    slot * 512
                ));
                slot += 1;
            }
        }
    }
    shader(extensions, &typed_buffers(), &body)
}

#[test]
fn nv_transposes_without_maintenance1() -> TestResult {
    let compiled = compile_raw(&transpose_shader(NV2, "NV", false), VULKAN_1_3)?;
    assert_eq!(
        compiled.count(op(Op::CooperativeMatrixTransposeNV)),
        TYPES.len()
    );
    assert!(compiled.has_capability(capability(Capability::CooperativeMatrixConversionsNV)));
    assert_eq!(decorations(&compiled, DECORATION_TRANSPOSE_EXT), 0);
    Ok(())
}

#[test]
fn transposes_with_maintenance1_are_decorated_conversions() -> TestResult {
    for (extensions, suffix) in [
        (MAINTENANCE1.to_string(), "EXT"),
        (format!("{NV2}{MAINTENANCE1}"), "NV"),
    ] {
        let compiled = compile_raw(&transpose_shader(&extensions, suffix, true), VULKAN_1_3)?;
        assert_eq!(compiled.count(op(Op::CooperativeMatrixTransposeNV)), 0);
        assert_eq!(
            decorations(&compiled, DECORATION_TRANSPOSE_EXT),
            TYPES.len() * TYPES.len() * 2,
            "{suffix}"
        );
        assert!(compiled.has_capability(CAPABILITY_CONVERSIONS_EXT));
        assert!(!compiled.has_capability(capability(Capability::CooperativeMatrixConversionsNV)));
        assert!(compiled.has_extension("SPV_EXT_cooperative_matrix_maintenance1"));
    }
    Ok(())
}

fn conversion_shader(extensions: &str, from: &str, to: &str) -> String {
    let mut body = String::new();
    let mut slot = 0;
    for source in TYPES {
        for target in TYPES {
            body.push_str(&format!(
                "  {{ coopmat<{source}, gl_ScopeSubgroup, 16, 16, gl_MatrixUse{from}> m; coopMatLoad(m, v_{source}.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
    coopmat<{target}, gl_ScopeSubgroup, 16, 16, gl_MatrixUse{to}> r = coopmat<{target}, gl_ScopeSubgroup, 16, 16, gl_MatrixUse{to}>(m);
    coopMatStore(r, v_{target}.x, {}, 16, gl_CooperativeMatrixLayoutRowMajor); }}
",
                slot * 256
            ));
            slot += 1;
        }
    }
    shader(extensions, &typed_buffers(), &body)
}

#[test]
fn conversions_between_uses_and_component_types() -> TestResult {
    let combinations = [
        ("Accumulator", "A"),
        ("Accumulator", "B"),
        ("Accumulator", "Accumulator"),
        ("A", "A"),
    ];
    for maintenance in [false, true] {
        let extensions = if maintenance {
            format!("{NV2}{MAINTENANCE1}")
        } else {
            NV2.to_string()
        };
        for (from, to) in combinations {
            let compiled = compile_raw(&conversion_shader(&extensions, from, to), VULKAN_1_3)?;
            let use_changes = from != to;
            let conversions = if maintenance {
                compiled.has_capability(CAPABILITY_CONVERSIONS_EXT)
            } else {
                compiled.has_capability(capability(Capability::CooperativeMatrixConversionsNV))
            };
            assert_eq!(conversions, use_changes, "{from} -> {to}");
        }
    }
    Ok(())
}

#[test]
fn conversions_from_a_and_b_to_accumulator_need_maintenance1() -> TestResult {
    let compiled = compile_raw(
        &conversion_shader(MAINTENANCE1, "A", "Accumulator"),
        VULKAN_1_3,
    )?;
    assert!(compiled.has_capability(CAPABILITY_CONVERSIONS_EXT));
    assert_rejected_like_glslang(&conversion_shader(NV2, "A", "Accumulator"), VULKAN_1_3)?;
    assert_rejected_like_glslang(&conversion_shader(NV2, "B", "A"), VULKAN_1_3)
}

#[test]
fn get_coordinate_of_every_use() -> TestResult {
    let mut body = String::new();
    for (index, (ty, usage, buffer)) in [
        ("float16_t", "A", "buf"),
        ("float16_t", "B", "buf"),
        ("float", "Accumulator", "buff"),
        ("int", "Accumulator", "bufi"),
    ]
    .iter()
    .enumerate()
    {
        body.push_str(&format!(
            "  {{ coopmat<{ty}, gl_ScopeSubgroup, 16, 16, gl_MatrixUse{usage}> m; coopMatLoad(m, {buffer}.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
    for (int i = 0; i < m.length(); i++) outv.u[i + {}] = coopMatGetCoordinateEXT(m, i);
    outv.u[{index}] = coopMatGetCoordinateEXT(m, 3u) + coopMatGetCoordinateEXT(m, uint16_t(1)) + coopMatGetCoordinateEXT(m, int8_t(2)); }}
",
            index * 64
        ));
    }
    let compiled = compile_raw(&shader(MAINTENANCE1, "", &body), VULKAN_1_3)?;
    assert_eq!(compiled.count(OP_GET_COORDINATE_EXT), 16);
    assert!(compiled.has_capability(CAPABILITY_GET_COORDINATE_EXT));
    Ok(())
}

const ERROR_DECLARATIONS: &str = "#extension GL_EXT_buffer_reference : enable
layout(constant_id = 0) const int spec = 1;
layout(constant_id = 1) const uint specu = 16;
layout(buffer_reference, std430, buffer_reference_align = 2) buffer H { float16_t h; };
float16_t sumh(const in float16_t a, const in float16_t b) { return a + b; }
float16_t sum3(const in float16_t a, const in float16_t b, const in float16_t c) { return a + b; }
float16_t sumNonConst(in float16_t a, const in float16_t b) { return a + b; }
float sumf(const in float a, const in float b) { return a + b; }
float16_t sumMixed(const in float16_t a, const in float b) { return a; }
float16_t e0(const in uint32_t r, const in uint32_t c, const in float16_t x) { return x; }
float16_t e1(const in uint32_t r, const in uint32_t c, const in float16_t x, const in float16_t y) { return x + y; }
float16_t eInt(const in int r, const in uint32_t c, const in float16_t x) { return x; }
float16_t eTwo(const in uint32_t r, const in uint32_t c) { return float16_t(r); }
float16_t eF(const in uint32_t r, const in uint32_t c, const in float16_t x, const in float y) { return x; }
float eRet(const in uint32_t r, const in uint32_t c, const in float16_t x) { return x; }
float16_t eOut(const in uint32_t r, const in uint32_t c, out float16_t x) { x = float16_t(0); return x; }
float16_t d2(const in H b, const in uint32_t bc[2], const in uint32_t c[2]) { return b.h; }
float16_t d3(const in H b, const in uint32_t bc[3], const in uint32_t c[3]) { return b.h; }
float16_t dNotRef(const in uint b, const in uint32_t bc[2], const in uint32_t c[2]) { return float16_t(b); }
float16_t dNotArray(const in H b, const in uint32_t bc, const in uint32_t c) { return b.h; }
float16_t dInt(const in H b, const in int bc[2], const in int c[2]) { return b.h; }
float16_t dTwo(const in H b, const in uint32_t bc[2]) { return b.h; }
float dRet(const in H b, const in uint32_t bc[2], const in uint32_t c[2]) { return 1.0; }
float16_t dNonConst(in H b, const in uint32_t bc[2], const in uint32_t c[2]) { return b.h; }
f16vec2 dv2(const in H b, const in uint32_t bc[2], const in uint32_t c[2]) { return f16vec2(b.h); }
f16vec3 dv3(const in H b, const in uint32_t bc[2], const in uint32_t c[2]) { return f16vec3(b.h); }
vec2 dvf(const in H b, const in uint32_t bc[2], const in uint32_t c[2]) { return vec2(b.h); }";

const ERROR_LOCALS: &str = "    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> A;
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseB> B;
    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseB> Bf;
    coopmat<float16_t, gl_ScopeWorkgroup, 16, 16, gl_MatrixUseB> Bw;
    coopmat<float16_t, gl_ScopeSubgroup, 16, 8, gl_MatrixUseB> B168;
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> Acc;
    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> Acc2;
    coopmat<float16_t, gl_ScopeSubgroup, 8, 8, gl_MatrixUseAccumulator> Acc8;
    coopmat<float16_t, gl_ScopeSubgroup, specu, specu, gl_MatrixUseAccumulator> AccS;
    coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> Accf;
    tensorLayoutNV<2> t = createTensorLayoutNV(2);
    tensorViewNV<2> v = createTensorViewNV(2);
    uint dyn = outv.u[0].x;
    float16_t localArray[4];
";

fn error_shader(extensions: &str, statement: &str) -> String {
    shader(
        extensions,
        ERROR_DECLARATIONS,
        &format!("{ERROR_LOCALS}    {statement}"),
    )
}

#[test]
fn nv_errors_are_reported_on_glslang_lines() -> TestResult {
    let statements = [
        "coopMatTransposeNV(A, Acc);",
        "coopMatTransposeNV(B, A);",
        "coopMatTransposeNV(Bw, Acc);",
        "coopMatTransposeNV(B168, Acc);",
        "coopMatTransposeNV(B);",
        "coopMatTransposeNV(B + B, Acc);",
        "coopMatReduceNV(Acc, Acc, spec, sumh);",
        "coopMatReduceNV(Acc, Acc, int(dyn), sumh);",
        "coopMatReduceNV(Acc, Acc, 0, sumh);",
        "coopMatReduceNV(Acc, Acc, 5, sumh);",
        "coopMatReduceNV(Acc, Acc, 1u, sumh);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, sum3);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, sumNonConst);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, sumf);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, sumMixed);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, 3);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduce2x2NV, sumh);",
        "coopMatReduceNV(Accf, Acc, gl_CooperativeMatrixReduceRowNV, sumh);",
        "coopMatReduceNV(A, Acc, gl_CooperativeMatrixReduceRowNV, sumh);",
        "coopMatReduceNV(Acc + Acc, Acc, gl_CooperativeMatrixReduceRowNV, sumh);",
        "coopMatPerElementNV(Acc, Acc);",
        "coopMatPerElementNV(Acc);",
        "coopMatPerElementNV();",
        "coopMatPerElementNV(Acc, Acc, eTwo);",
        "coopMatPerElementNV(Acc, Acc, e0, Acc);",
        "coopMatPerElementNV(Acc, Acc, e1);",
        "coopMatPerElementNV(Acc, Acc, eInt);",
        "coopMatPerElementNV(Acc, Acc, eRet);",
        "coopMatPerElementNV(Acc, Acc, eOut);",
        "coopMatPerElementNV(Acc, Acc, e1, 1.0);",
        "coopMatPerElementNV(Acc, Acc, eF, 1);",
        "coopMatPerElementNV(Accf, Acc, e0);",
        "coopMatPerElementNV(A, Acc, e0);",
        "coopMatPerElementNV(Acc8, Acc, e0);",
        "coopMatPerElementNV(Acc, Acc, e1, Acc8);",
        "coopMatPerElementEXT(Acc, Acc, e0);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, dNotRef);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, dNotArray);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, dInt);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, dTwo);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, dRet);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, dNonConst);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, d2, dv2);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, d2, d2, d2);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, 3);",
        "coopMatLoadTensorNV(A, localArray, 0, t);",
        "coopMatLoadTensorNV(A, buf.x, 1.0, t);",
        "coopMatLoadTensorNV(A, buf.x, uint64_t(1), t);",
        "coopMatLoadTensorNV(A, buf.x, 0, v, t);",
        "coopMatLoadTensorNV(A + A, buf.x, 0, t);",
        "coopMatLoadTensorNV(A, buf.x, 0, v);",
        "coopMatStoreTensorNV(A, buf.x, 0, t, d2);",
        "coopMatStoreTensorNV(A, localArray, 0, t);",
        "tensorLayoutNV<2> a = createTensorLayoutNV(-1);",
        "createTensorLayoutNV(dyn);",
        "createTensorLayoutNV(int8_t(2));",
        "tensorLayoutNV<1> a = createTensorLayoutNV(true);",
        "createTensorLayoutNV(2.0);",
        "createTensorLayoutNV(2, 1, 1);",
        "createTensorLayoutNV();",
        "tensorLayoutNV<2> a = createTensorLayoutNV(spec);",
        "createTensorViewNV(2, 1);",
        "createTensorViewNV(2, false, 0, 1, 2, 3, 4, 5);",
        "createTensorViewNV(2, spec);",
        "t = setTensorLayoutDimensionNV(t);",
        "t = setTensorLayoutDimensionNV(t, 1, 2, 3, 4, 5, 6);",
        "t = setTensorLayoutDimensionNV(t, 1.0, 2.0);",
        "t = setTensorViewDimensionsNV(t, 1, 2);",
        "v = setTensorLayoutDimensionNV(v, 1, 2);",
        "t = sliceTensorLayoutNV(t, 1, 2, 3);",
        "t = sliceTensorLayoutNV(t, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);",
        "t = setTensorLayoutClampValueNV(t, 1, 2);",
        "t = setTensorLayoutClampValueNV(t, 1.5);",
        "v = setTensorViewClipNV(v, 1, 2, 3);",
        "tensorLayoutNV<3> t3 = t;",
        "tensorLayoutNV<2, 1> tm = t;",
        "tensorViewNV<2, true> vt = v;",
        "tensorLayoutNV a;",
        "tensorLayoutNV<1, 2, 3> a;",
        "tensorViewNV a;",
        "tensorViewNV<1, 2, 3, 4, 5, 6, 7, 8> a;",
        "tensorLayoutNV<1.0> a;",
        "tensorLayoutNV<-1> a;",
        "uvec2 c = coopMatGetCoordinateEXT(Acc, 0);",
        "uint q = t[0];",
        "t = tensorLayoutNV<2>(t);",
        "int n = t.length();",
    ];
    for statement in statements {
        assert_rejected_like_glslang(&error_shader(NV2, statement), VULKAN_1_3)
            .map_err(|error| format!("{statement}: {error}"))?;
    }
    Ok(())
}

#[test]
fn nv_calls_that_glslang_accepts_too() -> TestResult {
    let statements = [
        "coopMatReduceNV(AccS, Acc, gl_CooperativeMatrixReduceRowNV, sumh); coopMatStore(AccS, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatReduceNV(Acc8, Acc, gl_CooperativeMatrixReduceRowAndColumnNV, sumh); coopMatStore(Acc8, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatReduceNV(Acc8, Acc, gl_CooperativeMatrixReduce2x2NV, sumh); coopMatStore(Acc8, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowEXT, sumh); coopMatStore(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatTransposeNV(Bf, Acc); coopMatStore(Bf, buff.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatPerElementNV(Acc, Acc, eF, 1.0); coopMatStore(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatLoadTensorNV(A, buf.x, 0, t, d2); coopMatStore(A, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatLoadTensorNV(A, buf.x, -1, t); coopMatStore(A, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "t = setTensorLayoutDimensionNV(t, -1, 2); t = setTensorLayoutStrideNV(t, int8_t(1), uint16_t(2)); coopMatStoreTensorNV(A, buf.x, 0, t);",
        "tensorLayoutNV<spec> a = createTensorLayoutNV(spec); a = setTensorLayoutDimensionNV(a, 1, 2, 3);",
        "t = dyn > 0 ? t : createTensorLayoutNV(2); coopMatStoreTensorNV(A, buf.x, 0, t);",
    ];
    for statement in statements {
        let source = error_shader(NV2, statement);
        super::compile_raw_with(&source, VULKAN_1_3, super::Glslang::Accepts)
            .map_err(|error| format!("{statement}: {error}"))?;
    }
    Ok(())
}

#[test]
fn invalid_spirv_from_glslang_is_rejected() -> TestResult {
    let cases = [
        (
            "tensorLayoutNV<0> a = createTensorLayoutNV(0);",
            "dimension count must be between 1 and 5",
        ),
        (
            "tensorLayoutNV<6> a = createTensorLayoutNV(6);",
            "dimension count must be between 1 and 5",
        ),
        (
            "tensorLayoutNV<2, 9> a = createTensorLayoutNV(2, 9);",
            "clamp mode",
        ),
        (
            "tensorViewNV<2, false, 7, 0> a = createTensorViewNV(2, false, 7, 0);",
            "permutation",
        ),
        (
            "tensorViewNV<2, false, 0, 0> a = createTensorViewNV(2, false, 0, 0);",
            "permutation",
        ),
        (
            "tensorViewNV<3, false, 1> a = createTensorViewNV(3, false, 1);",
            "permutation",
        ),
        (
            "t = setTensorLayoutDimensionNV(t, 1, 2, 3);",
            "must match the tensor dimension count",
        ),
        (
            "t = setTensorLayoutStrideNV(t, 1);",
            "must match the tensor dimension count",
        ),
        (
            "t = setTensorLayoutBlockSizeNV(t, 1, 2, 3);",
            "must match the tensor dimension count",
        ),
        (
            "t = sliceTensorLayoutNV(t, 1, 2);",
            "must match the tensor dimension count",
        ),
        (
            "v = setTensorViewDimensionsNV(v, 1, 2, 3);",
            "must match the tensor dimension count",
        ),
        (
            "v = setTensorViewStrideNV(v, 1);",
            "must match the tensor dimension count",
        ),
        (
            "coopMatLoadTensorNV(A, buf.x, 0, t, d3);",
            "coordinate parameters must be uint32_t",
        ),
        ("t = t + t;", "cannot be applied"),
        ("bool q = t == t;", "cannot be applied"),
        (
            "coopMatPerElementNV(Acc, Acc, 3);",
            "expected a result matrix, an input matrix, and a per-element function",
        ),
        ("coopMatPerElementNV(Acc + Acc, Acc, e0);", "l-value"),
    ];
    let line = u32::try_from(error_shader(NV2, "").lines().count().saturating_sub(1))?;
    for (statement, message) in cases {
        assert_rejected_unlike_glslang(
            &error_shader(NV2, statement),
            VULKAN_1_3,
            &[(line, message)],
        )
        .map_err(|error| format!("{statement}: {error}"))?;
    }
    Ok(())
}

#[test]
fn tensor_layouts_cannot_be_block_members() -> TestResult {
    let source = shader(
        NV2,
        "layout(binding = 5) buffer TB {\n    tensorLayoutNV<2> m;\n} tb;",
        "",
    );
    let line = u32::try_from(
        source
            .lines()
            .position(|text| text.contains("tensorLayoutNV<2> m;"))
            .ok_or("no member line")?
            + 1,
    )?;
    assert_rejected_unlike_glslang(&source, VULKAN_1_3, &[(line, "tensor layout")])
}

#[test]
fn ambiguous_tensor_offsets_with_64bit_indexing() -> TestResult {
    let extensions = format!("{NV2}#extension GL_EXT_shader_64bit_indexing : enable\n");
    for offset in ["0", "uint16_t(1)", "int8_t(1)"] {
        let statement = format!("coopMatLoadTensorNV(A, buf.x, {offset}, t);");
        assert_rejected_like_glslang(&error_shader(&extensions, &statement), VULKAN_1_3)
            .map_err(|error| format!("{offset}: {error}"))?;
    }
    Ok(())
}

#[test]
fn maintenance1_errors_are_reported_on_glslang_lines() -> TestResult {
    let statements = [
        "coopMatTransposeEXT(Acc, A);",
        "coopMatTransposeEXT(Acc, B);",
        "coopMatTransposeEXT(Bw, Acc);",
        "coopMatTransposeEXT(B168, Acc);",
        "coopMatTransposeNV(Acc2, Acc);",
        "coopMatReduceEXT(Acc, Acc, int(dyn), sumh);",
        "coopMatReduceEXT(Acc, Acc, 5, sumh);",
        "coopMatReduceEXT(Accf, Acc, gl_CooperativeMatrixReduceRowEXT, sumh);",
        "coopMatReduceEXT(A, Acc, gl_CooperativeMatrixReduceRowEXT, sumh);",
        "coopMatReduceEXT(Acc, Acc, gl_CooperativeMatrixReduce2x2EXT, sumh);",
        "coopMatReduceEXT(Acc, Acc, gl_CooperativeMatrixReduceRowEXT, sum3);",
        "coopMatPerElementEXT(Acc8, Acc, e0);",
        "coopMatPerElementEXT(Acc, Acc, eInt);",
        "coopMatPerElementEXT(Acc, Acc, e1, Acc8);",
        "coopMatPerElementEXT(Acc, Acc, e1, f16vec2(1.0));",
        "coopMatPerElementEXT(Acc, Acc);",
        "uvec2 c = coopMatGetCoordinateEXT(Acc, 1.0);",
        "uvec2 c = coopMatGetCoordinateEXT(t, 0);",
        "uvec2 c = coopMatGetCoordinateEXT(Acc);",
        "coopMatTransposeNV(B, Acc);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, sumh);",
    ];
    for statement in statements {
        assert_rejected_like_glslang(&error_shader(MAINTENANCE1, statement), VULKAN_1_3)
            .map_err(|error| format!("{statement}: {error}"))?;
    }
    Ok(())
}

#[test]
fn maintenance1_calls_with_specialization_sizes() -> TestResult {
    let declarations =
        "float16_t combine(const in float16_t a, const in float16_t b) { return a + b; }
layout(constant_id = 0) const int SpecRows = 16;
layout(constant_id = 1) const int SpecCols = 8;
layout(constant_id = 2) const int SpecScope = gl_ScopeWorkgroup;
const int SpecScopeAlias = SpecScope * 1;
const int SpecRowResultCols = SpecCols * 3;
const int SpecColumnResultRows = SpecRows * 3;
const int SpecTransposeRows = SpecCols * 1;
const int SpecTransposeCols = SpecRows * 1;";
    let body = "    coopmat<float16_t, SpecScope, SpecRows, SpecCols, gl_MatrixUseAccumulator> SpecAcc;
    coopMatLoad(SpecAcc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
    coopmat<float16_t, SpecScopeAlias, SpecRows, SpecRowResultCols, gl_MatrixUseAccumulator> SpecRowResult;
    coopmat<float16_t, SpecScopeAlias, SpecColumnResultRows, SpecCols, gl_MatrixUseAccumulator> SpecColumnResult;
    coopmat<float16_t, SpecScopeAlias, SpecTransposeRows, SpecTransposeCols, gl_MatrixUseB> SpecTransposeResult;
    coopMatReduceEXT(SpecRowResult, SpecAcc, gl_CooperativeMatrixReduceRowEXT, combine);
    coopMatReduceEXT(SpecColumnResult, SpecAcc, gl_CooperativeMatrixReduceColumnEXT, combine);
    coopMatTransposeEXT(SpecTransposeResult, SpecAcc);
    coopMatStore(SpecRowResult, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
    coopMatStore(SpecColumnResult, buf.x, 1024, 16, gl_CooperativeMatrixLayoutRowMajor);
    coopMatStore(SpecTransposeResult, buf.x, 2048, 16, gl_CooperativeMatrixLayoutRowMajor);";
    let compiled = compile_raw(&shader(MAINTENANCE1, declarations, body), VULKAN_1_3)?;
    assert_eq!(compiled.count(op(Op::CooperativeMatrixReduceNV)), 2);
    assert_eq!(decorations(&compiled, DECORATION_TRANSPOSE_EXT), 1);
    Ok(())
}

#[test]
fn extension_requirements_match_glslang() -> TestResult {
    let statements = [
        "coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> T = coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA>(Acc); coopMatStore(T, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseB> T; coopMatTransposeNV(T, Acc); coopMatStore(T, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseB> T; coopMatTransposeEXT(T, Acc); coopMatStore(T, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatReduceNV(Acc, Acc, gl_CooperativeMatrixReduceRowNV, sumh); coopMatStore(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatReduceEXT(Acc, Acc, gl_CooperativeMatrixReduceRowEXT, sumh); coopMatStore(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatPerElementNV(Acc, Acc, e0); coopMatStore(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "coopMatPerElementEXT(Acc, Acc, e0); coopMatStore(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);",
        "outv.u[0] = coopMatGetCoordinateEXT(Acc, 0);",
        "tensorLayoutNV<2> t = createTensorLayoutNV(2); coopMatStoreTensorNV(Acc, buf.x, 0, t);",
        "outv.u[0].x = uint(gl_CooperativeMatrixReduceRowNV + gl_CooperativeMatrixReduce2x2EXT + gl_CooperativeMatrixClampModeMirrorRepeatNV);",
    ];
    let declarations =
        "float16_t sumh(const in float16_t a, const in float16_t b) { return a + b; }
float16_t e0(const in uint32_t r, const in uint32_t c, const in float16_t x) { return x; }";
    for extensions in [
        String::new(),
        NV2.to_string(),
        MAINTENANCE1.to_string(),
        format!("{NV2}{MAINTENANCE1}"),
    ] {
        for statement in statements {
            let body = format!(
                "    coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> Acc;
    coopMatLoad(Acc, buf.x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
    {statement}"
            );
            let source = shader(&extensions, declarations, &body);
            if super::errors(&source, VULKAN_1_3).is_ok() {
                assert_rejected_like_glslang(&source, VULKAN_1_3)
            } else {
                compile_raw(&source, VULKAN_1_3).map(|_| ())
            }
            .map_err(|error| format!("{extensions} {statement}: {error}"))?;
        }
    }
    Ok(())
}
