use alloc::collections::{BTreeMap, BTreeSet};
use std::process::Command;

use rglsl::{
    ShaderStage,
    back::spv,
    front::glsl,
    valid::{ValidationFlags, Validator},
};
use rspirv::dr::{self, Operand};
use spirv::Op;

use crate::TestResult;

const fn extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Fragment => "frag",
        ShaderStage::Vertex => "vert",
        _ => "comp",
    }
}

fn scratch(name: &str) -> std::path::PathBuf {
    std::env::temp_dir().join(format!(
        "rglsl-extended-instructions-{}-{:?}-{name}",
        std::process::id(),
        std::thread::current().id()
    ))
}

fn ours(stage: ShaderStage, source: &str) -> Result<Vec<u32>, Vec<(u32, String)>> {
    let line = |span: rglsl::Span| span.location(source).line_number;
    let module = glsl::Frontend::default()
        .parse(&glsl::Options::from(stage), source)
        .map_err(|errors| {
            errors
                .errors
                .iter()
                .map(|error| (line(error.meta), error.kind.to_string()))
                .collect::<Vec<_>>()
        })?;
    let info = Validator::new(ValidationFlags::all())
        .validate(&module)
        .map_err(|error| vec![(0, format!("validation: {:?}", error.into_inner()))])?;
    spv::write_vec(&module, &info, &spv::Options::default(), None)
        .map_err(|error| vec![(0, format!("backend: {error}"))])
}

enum Glslang {
    Missing,
    Accepted(Vec<u32>),
    Rejected(BTreeSet<u32>),
}

fn glslang(stage: ShaderStage, source: &str) -> TestResult<Glslang> {
    let glslang = crate::stage_io::oracle("RGLSL_GLSLANG", "glslang");
    if !glslang.exists() {
        println!("glslang not found at {}", glslang.display());
        return Ok(Glslang::Missing);
    }
    let input = scratch(&format!("input.{}", extension(stage)));
    let output = scratch("glslang.spv");
    std::fs::write(&input, source)?;
    let result = Command::new(&glslang)
        .arg("-V")
        .arg("-o")
        .arg(&output)
        .arg(&input)
        .output()?;
    let _ = std::fs::remove_file(&input);
    if !result.status.success() {
        let text = format!(
            "{}{}",
            String::from_utf8_lossy(&result.stdout),
            String::from_utf8_lossy(&result.stderr)
        );
        let lines = text
            .lines()
            .filter_map(|line| line.strip_prefix("ERROR: "))
            .filter_map(|line| line.split(':').nth(1))
            .filter_map(|line| line.trim().parse().ok())
            .collect();
        return Ok(Glslang::Rejected(lines));
    }
    let bytes = std::fs::read(&output)?;
    let _ = std::fs::remove_file(&output);
    let words = bytes
        .chunks_exact(4)
        .map(|chunk| <[u8; 4]>::try_from(chunk).map(u32::from_le_bytes))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(Glslang::Accepted(words))
}

fn constant_value(module: &dr::Module, id: u32) -> Option<String> {
    let definition = module
        .types_global_values
        .iter()
        .find(|inst| inst.result_id == Some(id))?;
    match definition.class.opcode {
        Op::Constant => match *definition.operands.first()? {
            Operand::LiteralBit32(value) => Some(value.to_string()),
            Operand::LiteralBit64(value) => Some(value.to_string()),
            _ => None,
        },
        Op::ConstantComposite => {
            let parts = definition
                .operands
                .iter()
                .map(|operand| match *operand {
                    Operand::IdRef(part) => constant_value(module, part),
                    _ => None,
                })
                .collect::<Option<Vec<_>>>()?;
            Some(format!("({})", parts.join(", ")))
        }
        _ => None,
    }
}

fn summary(words: &[u32]) -> TestResult<BTreeMap<String, usize>> {
    let module = dr::load_words(words)?;
    let mut sets = BTreeMap::new();
    for import in &module.ext_inst_imports {
        if let (Some(id), Some(Operand::LiteralString(name))) =
            (import.result_id, import.operands.first())
        {
            sets.insert(id, name.clone());
        }
    }
    let mut histogram = BTreeMap::new();
    let mut count = |key: String| *histogram.entry(key).or_insert(0) += 1;
    for capability in &module.capabilities {
        if let Some(Operand::Capability(capability)) = capability.operands.first() {
            count(format!("capability {capability:?}"));
        }
    }
    for extension in &module.extensions {
        if let Some(Operand::LiteralString(name)) = extension.operands.first() {
            count(format!("extension {name}"));
        }
    }
    for name in sets.values() {
        count(format!("import {name}"));
    }
    for inst in module.all_inst_iter() {
        if inst.class.opcode != Op::ExtInst {
            continue;
        }
        let (Some(&Operand::IdRef(set)), Some(&Operand::LiteralExtInstInteger(number))) =
            (inst.operands.first(), inst.operands.get(1))
        else {
            continue;
        };
        let operands = inst.operands.get(2..).unwrap_or_default();
        let constants: Vec<String> = operands
            .iter()
            .map(|operand| match *operand {
                Operand::IdRef(id) => constant_value(&module, id).unwrap_or_else(|| "_".into()),
                _ => "?".into(),
            })
            .collect();
        let set = sets.get(&set).map_or("?", String::as_str);
        count(format!("{set} {number} [{}]", constants.join(" ")));
    }
    Ok(histogram)
}

fn matches_glslang(stage: ShaderStage, source: &str) -> TestResult<BTreeMap<String, usize>> {
    let words = ours(stage, source).map_err(|errors| format!("rglsl rejects: {errors:?}"))?;
    crate::stage_io::spirv_val(&words)?;
    let mine = summary(&words)?;
    match glslang(stage, source)? {
        Glslang::Missing => {}
        Glslang::Rejected(lines) => {
            return Err(format!("glslang rejects the shader on lines {lines:?}").into());
        }
        Glslang::Accepted(words) => {
            let theirs = summary(&words)?;
            if theirs != mine {
                return Err(format!(
                    "the module differs from glslang's:\n  glslang {theirs:?}\n  rglsl   {mine:?}"
                )
                .into());
            }
        }
    }
    Ok(mine)
}

fn rejected_like_glslang(stage: ShaderStage, source: &str, message: &str) -> TestResult {
    let Err(errors) = ours(stage, source) else {
        return Err(format!("rglsl accepts {source}").into());
    };
    if !errors.iter().any(|(_, text)| text.contains(message)) {
        return Err(format!("no error `{message}`: {errors:?}").into());
    }
    let lines: BTreeSet<u32> = errors.iter().map(|&(line, _)| line).collect();
    match glslang(stage, source)? {
        Glslang::Missing => Ok(()),
        Glslang::Accepted(_) => Err(format!("glslang accepts {source}").into()),
        Glslang::Rejected(theirs) if theirs == lines => Ok(()),
        Glslang::Rejected(theirs) => Err(format!(
            "glslang rejects on lines {theirs:?}, rglsl on {lines:?}: {errors:?}"
        )
        .into()),
    }
}

#[test]
fn double_packing_matches_glslang() -> TestResult {
    let summary = matches_glslang(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) buffer B { uvec2 words; double value; uvec2 split; };
        void main() {
            value = packDouble2x32(words) + packDouble2x32(uvec2(1u, 2u));
            split = unpackDouble2x32(value) + unpackDouble2x32(1.5lf);
        }",
    )?;
    for key in [
        "GLSL.std.450 59 [_]",
        "GLSL.std.450 59 [(1, 2)]",
        "GLSL.std.450 65 [_]",
        "GLSL.std.450 65 [4609434218613702656]",
    ] {
        assert_eq!(summary.get(key), Some(&1), "{key}: {summary:?}");
    }
    Ok(())
}

#[test]
fn amd_shader_ballot_matches_glslang() -> TestResult {
    let summary = matches_glslang(
        ShaderStage::Compute,
        "#version 450
        #extension GL_ARB_gpu_shader_int64 : enable
        #extension GL_AMD_shader_ballot : enable
        #extension GL_AMD_gcn_shader : enable
        layout(local_size_x = 8) in;
        const uvec4 reversed = uvec4(3u, 2u, 1u, 0u);
        layout(std430, binding = 0) buffer B { float f; vec3 v; ivec2 i; uvec4 u; uint m; };
        void main() {
            f = swizzleInvocationsAMD(f, uvec4(1u, 0u, 3u, 2u));
            v = swizzleInvocationsAMD(v, reversed);
            i = swizzleInvocationsMaskedAMD(i, uvec3(0x1fu, 0u, 1u));
            u = writeInvocationAMD(u, uvec4(7u), m);
            f = writeInvocationAMD(f, 1.0, 0u);
            m = mbcntAMD(ballotAMD(true));
            m += minInvocationsInclusiveScanNonUniformAMD(m) + addInvocationsAMD(m);
        }",
    )?;
    for key in [
        "SPV_AMD_shader_ballot 1 [_ (1, 0, 3, 2)]",
        "SPV_AMD_shader_ballot 1 [_ (3, 2, 1, 0)]",
        "SPV_AMD_shader_ballot 2 [_ (31, 0, 1)]",
        "SPV_AMD_shader_ballot 3 [_ (7, 7, 7, 7) _]",
        "SPV_AMD_shader_ballot 3 [_ 1065353216 0]",
        "SPV_AMD_shader_ballot 4 [_]",
    ] {
        assert_eq!(summary.get(key), Some(&1), "{key}: {summary:?}");
    }
    Ok(())
}

#[test]
fn amd_lane_patterns_are_checked_like_glslang() -> TestResult {
    let shader = |call: &str| {
        format!(
            "#version 450
            #extension GL_AMD_shader_ballot : enable
            layout(local_size_x = 8) in;
            layout(constant_id = 0) const uint k = 1u;
            layout(std430, binding = 0) buffer B {{ float f; uvec4 o; }};
            void main() {{
                f = {call};
            }}"
        )
    };
    for (call, message) in [
        (
            "swizzleInvocationsAMD(f, o)",
            "argument must be a compile-time constant",
        ),
        (
            "swizzleInvocationsAMD(f, uvec4(k))",
            "argument must be a compile-time constant",
        ),
        (
            "swizzleInvocationsAMD(f, uvec4(4u, 0u, 0u, 0u))",
            "components must be in the range [0, 3]",
        ),
        (
            "swizzleInvocationsMaskedAMD(f, uvec3(32u, 0u, 0u))",
            "components must be in the range [0, 31]",
        ),
    ] {
        rejected_like_glslang(ShaderStage::Compute, &shader(call), message)?;
    }
    Ok(())
}

#[test]
fn texel_grad_fetch_is_not_a_built_in_function() -> TestResult {
    for (name, arguments) in [
        ("texelGradFetch", "s, ivec2(0), 0, vec2(0.0), vec2(0.0)"),
        (
            "texelGradFetchOffset",
            "s, ivec2(0), 0, vec2(0.0), vec2(0.0), ivec2(0)",
        ),
        (
            "sparseTexelGradFetchARB",
            "s, ivec2(0), 0, vec2(0.0), vec2(0.0), o",
        ),
        (
            "sparseTexelGradFetchOffsetARB",
            "s, ivec2(0), 0, vec2(0.0), vec2(0.0), ivec2(0), o",
        ),
    ] {
        let source = format!(
            "#version 450
            #extension GL_ARB_sparse_texture2 : enable
            layout(binding = 0) uniform sampler2D s;
            layout(location = 0) out vec4 o;
            void main() {{ {name}({arguments}); }}"
        );
        let Err(errors) = ours(ShaderStage::Fragment, &source) else {
            return Err(format!("rglsl accepts {name}").into());
        };
        let expected = format!("no overload of `{name}` matches the arguments");
        assert_eq!(errors, [(5, expected)], "{name}");
    }
    Ok(())
}

#[test]
fn lane_patterns_out_of_range_are_invalid() -> TestResult {
    let source = "#version 450
        #extension GL_AMD_shader_ballot : enable
        layout(local_size_x = 8) in;
        layout(std430, binding = 0) buffer B { float f; ivec2 i; };
        void main() {
            f = swizzleInvocationsAMD(f, uvec4(3u, 2u, 1u, 0u));
            i = swizzleInvocationsMaskedAMD(i, uvec3(31u, 0u, 1u));
        }";
    let validate = |module: &rglsl::Module| {
        Validator::new(ValidationFlags::all())
            .validate(module)
            .map(|_| ())
            .map_err(|error| format!("{:?}", error.into_inner()))
    };
    let module = glsl::Frontend::default()
        .parse(&glsl::Options::from(ShaderStage::Compute), source)
        .map_err(|errors| format!("{errors:?}"))?;
    validate(&module)?;
    for (offset, mask) in [([4, 0, 0, 0], [31, 0, 1]), ([3, 2, 1, 0], [0, 32, 0])] {
        let mut module = module.clone();
        let entry = module.entry_points.first_mut().ok_or("no entry point")?;
        let mut patched = 0;
        entry.function.body.visit_blocks_mut(|block| {
            for statement in block.iter_mut() {
                let rglsl::Statement::SubgroupFunction { ref mut fun, .. } = *statement else {
                    continue;
                };
                match *fun {
                    rglsl::SubgroupFunction::AmdSwizzle {
                        offset: ref mut pattern,
                        ..
                    } => *pattern = offset,
                    rglsl::SubgroupFunction::AmdSwizzleMasked {
                        mask: ref mut pattern,
                        ..
                    } => *pattern = mask,
                    _ => continue,
                }
                patched += 1;
            }
        });
        assert_eq!(patched, 2);
        let error = validate(&module)
            .err()
            .ok_or("an out-of-range lane pattern is valid")?;
        assert!(error.contains("LanePatternOutOfRange"), "{error}");
    }
    Ok(())
}
