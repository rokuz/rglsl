use alloc::collections::BTreeSet;
use std::process::Command;

use rglsl::{
    ShaderStage,
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
};
use rspirv::dr::{self, Operand};
use spirv::Op;

use crate::TestResult;

#[derive(Clone, Copy)]
enum Target {
    Vulkan11,
    Vulkan13,
}

impl Target {
    const fn spirv(self) -> (u8, u8) {
        match self {
            Self::Vulkan11 => (1, 3),
            Self::Vulkan13 => (1, 6),
        }
    }

    const fn environment(self) -> &'static str {
        match self {
            Self::Vulkan11 => "vulkan1.1",
            Self::Vulkan13 => "vulkan1.3",
        }
    }
}

const fn extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Fragment => "frag",
        ShaderStage::Vertex => "vert",
        ShaderStage::Mesh => "mesh",
        _ => "comp",
    }
}

fn scratch(name: &str) -> std::path::PathBuf {
    std::env::temp_dir().join(format!(
        "rglsl-sweep-{}-{:?}-{name}",
        std::process::id(),
        std::thread::current().id()
    ))
}

fn ours(stage: ShaderStage, target: Target, source: &str) -> Result<Vec<u32>, Vec<String>> {
    let frontend = glsl::Options {
        spirv_version: Some(target.spirv()),
        ..glsl::Options::from(stage)
    };
    let module = glsl::Frontend::default()
        .parse(&frontend, source)
        .map_err(|errors| {
            errors
                .errors
                .iter()
                .map(|error| error.kind.to_string())
                .collect::<Vec<_>>()
        })?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .map_err(|error| vec![format!("validation: {:?}", error.into_inner())])?;
    let options = spv::Options {
        lang_version: target.spirv(),
        flags: spv::WriterFlags::LABEL_VARYINGS | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    spv::write_vec(&module, &info, &options, None).map_err(|error| vec![format!("{error}")])
}

enum Glslang {
    Missing,
    Accepted(Vec<u32>),
    Rejected(String),
}

fn glslang(stage: ShaderStage, target: Target, source: &str) -> TestResult<Glslang> {
    let glslang = crate::stage_io::oracle("RGLSL_GLSLANG", "glslang");
    if !glslang.exists() {
        println!("glslang not found at {}", glslang.display());
        return Ok(Glslang::Missing);
    }
    let input = scratch(&format!("input.{}", extension(stage)));
    let output = scratch("glslang.spv");
    std::fs::write(&input, source)?;
    let result = Command::new(&glslang)
        .args(["--target-env", target.environment(), "-o"])
        .arg(&output)
        .arg(&input)
        .output()?;
    let _ = std::fs::remove_file(&input);
    if !result.status.success() {
        return Ok(Glslang::Rejected(format!(
            "{}{}",
            String::from_utf8_lossy(&result.stdout),
            String::from_utf8_lossy(&result.stderr)
        )));
    }
    let bytes = std::fs::read(&output)?;
    let _ = std::fs::remove_file(&output);
    let words = bytes
        .chunks_exact(4)
        .map(|chunk| <[u8; 4]>::try_from(chunk).map(u32::from_le_bytes))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(Glslang::Accepted(words))
}

fn validate(words: &[u32], target: Target) -> TestResult {
    crate::stage_io::spirv_val_in(words, &["--target-env", target.environment()])
}

#[derive(Debug, PartialEq, Eq)]
struct Summary {
    capabilities: BTreeSet<String>,
    extensions: BTreeSet<String>,
    opcodes: BTreeSet<String>,
}

fn summary(words: &[u32]) -> TestResult<Summary> {
    let module = dr::load_words(words)?;
    let capabilities = module
        .capabilities
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(Operand::Capability(capability)) => Some(format!("{capability:?}")),
            _ => None,
        })
        .collect();
    let extensions = module
        .extensions
        .iter()
        .filter_map(|inst| match inst.operands.first() {
            Some(Operand::LiteralString(name)) => Some(name.clone()),
            _ => None,
        })
        .collect();
    let opcodes = module
        .functions
        .iter()
        .flat_map(|function| function.blocks.iter())
        .flat_map(|block| block.instructions.iter())
        .map(|inst| format!("{:?}", inst.class.opcode))
        .collect();
    Ok(Summary {
        capabilities,
        extensions,
        opcodes,
    })
}

fn valid_like_glslang(stage: ShaderStage, target: Target, source: &str) -> TestResult<Summary> {
    let words =
        ours(stage, target, source).map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
    validate(&words, target)?;
    let mine = summary(&words)?;
    match glslang(stage, target, source)? {
        Glslang::Missing => {}
        Glslang::Rejected(text) => return Err(format!("glslang rejects: {text}").into()),
        Glslang::Accepted(words) => {
            let theirs = summary(&words)?;
            if theirs.capabilities != mine.capabilities || theirs.extensions != mine.extensions {
                return Err(format!(
                    "the module differs from glslang's:\n  glslang {theirs:?}\n  rglsl   {mine:?}"
                )
                .into());
            }
        }
    }
    Ok(mine)
}

fn opcode(summary: &Summary, op: Op) -> bool {
    summary.opcodes.contains(&format!("{op:?}"))
}

#[test]
fn amd_group_operations_declare_the_extension_of_groups() -> TestResult {
    let source = "#version 450
        #extension GL_AMD_shader_ballot : require
        layout(local_size_x = 8) in;
        layout(std430, binding = 0) buffer B { float f; uint u; };
        void main() {
            f = minInvocationsAMD(f);
            u = addInvocationsInclusiveScanAMD(u);
        }";
    for target in [Target::Vulkan11, Target::Vulkan13] {
        let words = ours(ShaderStage::Compute, target, source)
            .map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
        validate(&words, target)?;
        let summary = summary(&words)?;
        assert!(summary.capabilities.contains("Groups"), "{summary:?}");
        assert!(
            summary.extensions.contains("SPV_AMD_shader_ballot"),
            "{summary:?}"
        );
        assert!(opcode(&summary, Op::GroupFMin), "{summary:?}");
    }
    Ok(())
}

#[test]
fn float16_interpolation_and_derivatives_use_amd_half_float() -> TestResult {
    let source = "#version 450
        #extension GL_EXT_shader_16bit_storage : require
        #extension GL_EXT_shader_explicit_arithmetic_types : require
        layout(location = 0) in f16vec2 v;
        layout(location = 1) in float16_t w;
        layout(std430, binding = 0) buffer B { f16vec2 offset; f16vec2 r; float16_t s; };
        void main() {
            r = interpolateAtCentroid(v) + interpolateAtSample(v, 1);
            r += interpolateAtOffset(v, offset);
            s = interpolateAtOffset(w, offset) + interpolateAtSample(w, 0);
            r += dFdx(v) + dFdyFine(v) + fwidthCoarse(v);
            s += dFdxCoarse(w) + fwidth(w);
        }";
    for target in [Target::Vulkan11, Target::Vulkan13] {
        let summary = valid_like_glslang(ShaderStage::Fragment, target, source)?;
        assert!(
            summary.extensions.contains("SPV_AMD_gpu_shader_half_float"),
            "{summary:?}"
        );
        assert!(!opcode(&summary, Op::FConvert), "{summary:?}");
        assert!(opcode(&summary, Op::DPdxCoarse), "{summary:?}");
    }
    let summary = valid_like_glslang(
        ShaderStage::Fragment,
        Target::Vulkan11,
        "#version 450
        layout(location = 0) in vec2 v;
        layout(location = 0) out vec2 o;
        void main() { o = dFdx(v) + interpolateAtOffset(v, vec2(0.25)); }",
    )?;
    assert!(summary.extensions.is_empty(), "{summary:?}");
    Ok(())
}

#[test]
fn double_derivatives_are_not_supported() -> TestResult {
    for call in ["dFdx(d)", "dFdyFine(d)", "fwidthCoarse(dvec2(d))"] {
        let source = format!(
            "#version 450
            layout(std430, binding = 0) buffer B {{ double d; dvec2 r; }};
            void main() {{ r = dvec2({call}); }}"
        );
        let Err(errors) = ours(ShaderStage::Fragment, Target::Vulkan11, &source) else {
            return Err(format!("rglsl accepts {call}").into());
        };
        assert!(
            errors.iter().any(|error| error.contains(
                "of a double is not supported: SPIR-V derivatives take 16- or 32-bit floats"
            )),
            "{errors:?}"
        );
    }
    Ok(())
}

#[test]
fn packing_small_integers_is_a_bitcast() -> TestResult {
    let source = "#version 450
        #extension GL_EXT_shader_explicit_arithmetic_types : require
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) buffer B { uint r; u16vec2 v; i8vec4 w; uint64_t q; i16vec4 x; };
        void main() {
            const uint e = packUint2x16(u16vec2(3, 4));
            r = e + packUint2x16(v) + uint(pack32(w)) + uint(pack16(w.xy));
            q = pack64(v.xyxy) + packUint4x16(u16vec4(x));
            v = unpack16(r);
            x = unpackInt4x16(int64_t(q));
        }";
    for target in [Target::Vulkan11, Target::Vulkan13] {
        let summary = valid_like_glslang(ShaderStage::Compute, target, source)?;
        assert!(opcode(&summary, Op::Bitcast), "{summary:?}");
        assert!(!opcode(&summary, Op::ShiftLeftLogical), "{summary:?}");
        assert!(!opcode(&summary, Op::ShiftRightLogical), "{summary:?}");
    }
    Ok(())
}

#[test]
fn ldexp_takes_a_16_bit_exponent() -> TestResult {
    let source = "#version 450
        #extension GL_EXT_shader_explicit_arithmetic_types : require
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) buffer B { f16vec2 x; i16vec2 e; float16_t s; int16_t k; };
        void main() {
            x = ldexp(x, e);
            s = ldexp(s, k) + ldexp(float16_t(1.5), int16_t(3));
        }";
    for target in [Target::Vulkan11, Target::Vulkan13] {
        let summary = valid_like_glslang(ShaderStage::Compute, target, source)?;
        assert!(summary.capabilities.contains("Int16"), "{summary:?}");
        assert!(!opcode(&summary, Op::SConvert), "{summary:?}");
    }
    Ok(())
}

#[test]
fn micro_triangle_fetches_need_no_ray_queries() -> TestResult {
    let source = "#version 460
        #extension GL_NV_displacement_micromap : require
        layout(local_size_x = 1) in;
        layout(binding = 0) uniform accelerationStructureEXT a;
        layout(std430, binding = 1) buffer B { ivec4 i; vec3 p; vec2 b; };
        void main() {
            p = fetchMicroTriangleVertexPositionNV(a, i.x, i.y, i.z, i.zw);
            b = fetchMicroTriangleVertexBarycentricNV(a, i.x, i.y, i.z, i.zw);
        }";
    let summary = valid_like_glslang(ShaderStage::Compute, Target::Vulkan13, source)?;
    assert!(!summary.capabilities.contains("RayQueryKHR"), "{summary:?}");
    assert!(
        summary.capabilities.contains("DisplacementMicromapNV"),
        "{summary:?}"
    );
    let summary = valid_like_glslang(
        ShaderStage::Compute,
        Target::Vulkan13,
        "#version 460
        #extension GL_EXT_ray_query : require
        layout(local_size_x = 1) in;
        layout(binding = 0) uniform accelerationStructureEXT a;
        layout(std430, binding = 1) buffer B { float t; };
        void main() {
            rayQueryEXT q;
            rayQueryInitializeEXT(q, a, 0u, 0xffu, vec3(0.0), 0.0, vec3(1.0), t);
        }",
    )?;
    assert!(summary.capabilities.contains("RayQueryKHR"), "{summary:?}");
    Ok(())
}

fn footprint_operands(words: &[u32]) -> TestResult<Vec<String>> {
    let module = dr::load_words(words)?;
    Ok(module
        .all_inst_iter()
        .filter(|inst| inst.class.opcode == Op::ImageSampleFootprintNV)
        .map(|inst| match inst.operands.get(4) {
            Some(&Operand::ImageOperands(mask)) if mask == spirv::ImageOperands::LOD => {
                String::from("LOD")
            }
            Some(&Operand::ImageOperands(mask)) if mask == spirv::ImageOperands::MIN_LOD => {
                String::from("MIN_LOD")
            }
            Some(&Operand::ImageOperands(mask)) => format!("{mask:?}"),
            _ => String::from("implicit"),
        })
        .collect())
}

#[test]
fn footprints_without_implicit_derivatives_use_level_zero() -> TestResult {
    let body = "
        layout(binding = 0) uniform sampler2D s;
        layout(std430, binding = 1) buffer B { vec2 p; float c; uint lod; };
        void main() {
            gl_TextureFootprint2DNV f;
            bool single = textureFootprintNV(s, p, 2, true, f);
            single = single && textureFootprintClampNV(s, p, c, 2, false, f);
            lod = f.lod + uint(single);
        }";
    let cases = [
        (ShaderStage::Vertex, "", ["LOD", "LOD"]),
        (
            ShaderStage::Compute,
            "layout(local_size_x = 1) in;",
            ["LOD", "LOD"],
        ),
        (
            ShaderStage::Compute,
            "#extension GL_NV_compute_shader_derivatives : require
            layout(local_size_x = 2, local_size_y = 2) in;
            layout(derivative_group_quadsNV) in;",
            ["implicit", "MIN_LOD"],
        ),
        (ShaderStage::Fragment, "", ["implicit", "MIN_LOD"]),
    ];
    for (stage, layout, expected) in cases {
        let source = format!(
            "#version 450
            #extension GL_NV_shader_texture_footprint : require
            {layout}
            {body}"
        );
        let words = ours(stage, Target::Vulkan11, &source)
            .map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
        validate(&words, Target::Vulkan11)?;
        assert_eq!(footprint_operands(&words)?, expected, "{source}");
    }
    Ok(())
}

fn declares(words: &[u32], op: Op) -> TestResult<bool> {
    let module = dr::load_words(words)?;
    Ok(module
        .types_global_values
        .iter()
        .any(|inst| inst.class.opcode == op))
}

#[test]
fn texel_buffers_are_images_in_spirv_1_6() -> TestResult {
    let source = "#version 460
        #extension GL_EXT_nonuniform_qualifier : require
        layout(binding = 0) uniform isamplerBuffer s;
        layout(binding = 1) uniform usamplerBuffer u[];
        layout(binding = 2) uniform textureBuffer t;
        layout(binding = 3) uniform sampler m;
        layout(location = 0) flat in int k;
        layout(location = 0) out ivec4 o;
        layout(location = 1) out vec4 p;
        uvec4 fetch(usamplerBuffer b) { return texelFetch(b, 2); }
        void main() {
            o = texelFetch(s, 3) + textureSize(s) + ivec4(texelFetch(u[nonuniformEXT(k)], k));
            o += ivec4(fetch(u[1])) + textureSize(u[k]);
            p = texelFetch(samplerBuffer(t, m), 1);
        }";
    let summary = valid_like_glslang(ShaderStage::Fragment, Target::Vulkan13, source)?;
    assert!(opcode(&summary, Op::ImageFetch), "{summary:?}");
    assert!(opcode(&summary, Op::ImageQuerySize), "{summary:?}");
    let words = ours(ShaderStage::Fragment, Target::Vulkan13, source)
        .map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
    assert!(!declares(&words, Op::TypeSampledImage)?);
    let words = ours(ShaderStage::Fragment, Target::Vulkan11, source)
        .map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
    validate(&words, Target::Vulkan11)?;
    assert!(declares(&words, Op::TypeSampledImage)?);
    Ok(())
}
