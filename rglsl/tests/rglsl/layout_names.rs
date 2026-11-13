use alloc::collections::BTreeSet;
use std::process::Command;

use rglsl::{
    ShaderStage,
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
};
use rspirv::dr::{self, Operand};
use spirv::{Decoration, Op};

use crate::TestResult;

const RELEVANT: [Decoration; 15] = [
    Decoration::Location,
    Decoration::Component,
    Decoration::Index,
    Decoration::Binding,
    Decoration::DescriptorSet,
    Decoration::InputAttachmentIndex,
    Decoration::Offset,
    Decoration::ArrayStride,
    Decoration::MatrixStride,
    Decoration::RowMajor,
    Decoration::ColMajor,
    Decoration::SpecId,
    Decoration::XfbBuffer,
    Decoration::XfbStride,
    Decoration::Stream,
];

const fn extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vert",
        ShaderStage::TessControl => "tesc",
        ShaderStage::TessEvaluation => "tese",
        ShaderStage::Geometry => "geom",
        ShaderStage::Fragment => "frag",
        ShaderStage::RayGeneration => "rgen",
        _ => "comp",
    }
}

fn options(stage: ShaderStage) -> glsl::Options {
    glsl::Options {
        spirv_version: Some((1, 0)),
        ..glsl::Options::from(stage)
    }
}

fn rglsl_words(stage: ShaderStage, source: &str) -> TestResult<Vec<u32>> {
    let module = glsl::Frontend::default()
        .parse(&options(stage), source)
        .map_err(|errors| {
            errors
                .errors
                .iter()
                .map(|error| {
                    format!(
                        "{}: {}",
                        error.meta.location(source).line_number,
                        error.kind
                    )
                })
                .collect::<Vec<_>>()
                .join("\n")
        })?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .map_err(|error| format!("{:?}", error.into_inner()))?;
    let options = spv::Options {
        lang_version: (1, 0),
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None)?;
    crate::stage_io::spirv_val_in(&words, &["--target-env", "vulkan1.0"])?;
    Ok(words)
}

fn rglsl_errors(stage: ShaderStage, source: &str) -> TestResult<Vec<(u32, String)>> {
    let errors = crate::rejected(glsl::Frontend::default().parse(&options(stage), source))?;
    Ok(errors
        .errors
        .iter()
        .map(|error| {
            (
                error.meta.location(source).line_number,
                error.kind.to_string(),
            )
        })
        .collect())
}

fn scratch(name: &str) -> std::path::PathBuf {
    std::env::temp_dir().join(format!(
        "rglsl-layout-names-{}-{:?}-{name}",
        std::process::id(),
        std::thread::current().id()
    ))
}

enum Glslang {
    Missing,
    Accepted(Vec<u32>),
    Rejected(Vec<(u32, String)>),
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
        .args(["-V", "--target-env", "vulkan1.0", "-o"])
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
        let errors = text
            .lines()
            .filter_map(|line| line.strip_prefix("ERROR: "))
            .filter_map(|line| {
                let mut parts = line.splitn(3, ':');
                let _file = parts.next()?;
                let number = parts.next()?.trim().parse().ok()?;
                Some((number, String::from(parts.next()?.trim())))
            })
            .collect();
        return Ok(Glslang::Rejected(errors));
    }
    let bytes = std::fs::read(&output)?;
    let _ = std::fs::remove_file(&output);
    let words = bytes
        .chunks_exact(4)
        .map(|chunk| <[u8; 4]>::try_from(chunk).map(u32::from_le_bytes))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(Glslang::Accepted(words))
}

fn name_of(module: &dr::Module, id: Option<u32>) -> String {
    module
        .debug_names
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::Name
                && inst.operands.first() == id.map(Operand::IdRef).as_ref()
        })
        .and_then(|inst| match inst.operands.get(1) {
            Some(Operand::LiteralString(name)) if !name.is_empty() => Some(name.clone()),
            _ => None,
        })
        .unwrap_or_else(|| String::from("?"))
}

fn member_name_of(module: &dr::Module, id: Option<u32>, member: Option<&Operand>) -> String {
    module
        .debug_names
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::MemberName
                && inst.operands.first() == id.map(Operand::IdRef).as_ref()
                && inst.operands.get(1) == member
        })
        .and_then(|inst| match inst.operands.get(2) {
            Some(Operand::LiteralString(name)) if !name.is_empty() => Some(name.clone()),
            _ => None,
        })
        .unwrap_or_else(|| String::from("?"))
}

fn id_of(operand: Option<&Operand>) -> Option<u32> {
    match operand {
        Some(&Operand::IdRef(id)) => Some(id),
        _ => None,
    }
}

fn rest(operands: &[Operand]) -> String {
    operands
        .iter()
        .map(|operand| format!(" {operand}"))
        .collect()
}

fn facts(words: Vec<u32>) -> TestResult<BTreeSet<String>> {
    let module = dr::load_words(words)?;
    let mut found = BTreeSet::new();
    for inst in &module.annotations {
        match (inst.class.opcode, inst.operands.as_slice()) {
            (Op::Decorate, [target, Operand::Decoration(decoration), values @ ..])
                if RELEVANT.contains(decoration) =>
            {
                found.insert(format!(
                    "{} {decoration:?}{}",
                    name_of(&module, id_of(Some(target))),
                    rest(values)
                ));
            }
            (
                Op::MemberDecorate,
                [target, member, Operand::Decoration(decoration), values @ ..],
            ) if RELEVANT.contains(decoration) => {
                found.insert(format!(
                    "{}.{} {decoration:?}{}",
                    name_of(&module, id_of(Some(target))),
                    member_name_of(&module, id_of(Some(target)), Some(member)),
                    rest(values)
                ));
            }
            _ => {}
        }
    }
    for inst in &module.execution_modes {
        if let [_, Operand::ExecutionMode(mode), values @ ..] = inst.operands.as_slice() {
            found.insert(format!("mode {mode:?}{}", rest(values)));
        }
    }
    for inst in module.all_inst_iter() {
        match (inst.class.opcode, inst.operands.as_slice()) {
            (Op::TypeImage, [.., Operand::ImageFormat(format)]) => {
                found.insert(format!("image {format:?}"));
            }
            (Op::Variable, [Operand::StorageClass(class), ..]) => {
                let name = name_of(&module, inst.result_id);
                if name != "?" {
                    found.insert(format!("{name} in {class:?}"));
                }
            }
            _ => {}
        }
    }
    Ok(found)
}

fn assert_layouts(stage: ShaderStage, source: &str, expected: &[&str]) -> TestResult {
    let ours = facts(rglsl_words(stage, source)?)?;
    let missing: Vec<&&str> = expected
        .iter()
        .filter(|fact| !ours.contains(**fact))
        .collect();
    assert!(missing.is_empty(), "missing {missing:?} in {ours:#?}");
    match glslang(stage, source)? {
        Glslang::Missing => {}
        Glslang::Rejected(errors) => panic!("glslang rejects the shader: {errors:?}"),
        Glslang::Accepted(words) => {
            let theirs = facts(words)?;
            assert_eq!(
                ours, theirs,
                "rglsl and glslang lay the shader out differently"
            );
        }
    }
    Ok(())
}

fn assert_rejected_like_glslang(stage: ShaderStage, source: &str, name: &str) -> TestResult {
    let ours = rglsl_errors(stage, source)?;
    assert!(
        ours.iter()
            .all(|(_, message)| !message.contains("Internal error")),
        "{ours:?}"
    );
    let named = |message: &str| {
        message.contains(&format!("`{name}`"))
            || message.contains(&format!("layout({name})"))
            || message.starts_with(&format!("{name} "))
    };
    let Some(&(line, _)) = ours.iter().find(|(_, message)| named(message)) else {
        panic!("no error names `{name}`: {ours:?}");
    };
    match glslang(stage, source)? {
        Glslang::Missing => {}
        Glslang::Accepted(_) => panic!("glslang accepts {source}"),
        Glslang::Rejected(theirs) => {
            let quoted = format!("'{name}'");
            assert!(
                theirs
                    .iter()
                    .any(|(at, message)| *at == line && message.starts_with(&quoted)),
                "glslang: {theirs:?}, rglsl: {ours:?}"
            );
        }
    }
    Ok(())
}

#[test]
fn fragment_layouts_in_any_case() -> TestResult {
    assert_layouts(
        ShaderStage::Fragment,
        "#version 450
const int BASE = 1;
layout(LOCATION = BASE + 1, Component = 2) out vec2 color;
layout(Location = 0) out vec4 other;
layout(Location = 1) flat in ivec2 indices;
layout(INPUT_ATTACHMENT_INDEX = 1, SET = 0, BINDING = 4) uniform subpassInput attachment;
layout(Set = 2, Binding = 1) uniform sampler2D tex;
layout(PUSH_CONSTANT, Std430) uniform Push { layout(OFFSET = 16) vec4 tint; } push;
layout(Std140, BINDING = BASE * 3) uniform Block {
    layout(row_MAJOR) mat3 rows;
    layout(COLUMN_major) mat2 columns;
    layout(Offset = 96) float last;
} block;
layout(EARLY_FRAGMENT_TESTS) in;
void main() {
    color = vec2(indices) + block.rows[0].xy + block.columns[1] + vec2(block.last);
    other = texture(tex, color) + push.tint + subpassLoad(attachment);
}
",
        &[
            "color Location 2",
            "color Component 2",
            "other Location 0",
            "indices Location 1",
            "attachment InputAttachmentIndex 1",
            "attachment DescriptorSet 0",
            "attachment Binding 4",
            "tex DescriptorSet 2",
            "tex Binding 1",
            "push in PushConstant",
            "Push.tint Offset 16",
            "block Binding 3",
            "Block.rows RowMajor",
            "Block.rows MatrixStride 16",
            "Block.columns ColMajor",
            "Block.columns Offset 48",
            "Block.last Offset 96",
            "mode EarlyFragmentTests",
        ],
    )
}

#[test]
fn compute_layouts_in_any_case() -> TestResult {
    assert_layouts(
        ShaderStage::Compute,
        "#version 450
#extension GL_EXT_scalar_block_layout : require
layout(LOCAL_SIZE_X_ID = 3, Local_Size_Y = 2) in;
layout(CONSTANT_ID = 7) const int COUNT = 3;
const int SLOT = 3;
layout(SET = 1, BINDING = 2, STD430) buffer Values { float values[]; } data;
layout(Scalar, Binding = SLOT) buffer Tight { vec3 position; float weight; } tight;
layout(RGBA8, Binding = 5) uniform writeonly image2D picture;
layout(R32UI, binding = 6) uniform coherent uimage2D counters;
void main() {
    data.values[gl_GlobalInvocationID.x] = float(COUNT) + tight.weight + tight.position.x;
    imageStore(picture, ivec2(0), vec4(1.0));
    imageAtomicAdd(counters, ivec2(0), 1u);
}
",
        &[
            "data DescriptorSet 1",
            "data Binding 2",
            "Values.values Offset 0",
            "tight Binding 3",
            "Tight.weight Offset 12",
            "picture Binding 5",
            "counters Binding 6",
            "image Rgba8",
            "image R32ui",
            "COUNT SpecId 7",
            "? SpecId 3",
        ],
    )
}

#[test]
fn stage_layouts_in_any_case() -> TestResult {
    assert_layouts(
        ShaderStage::Vertex,
        "#version 450
layout(Location = 0, XFB_BUFFER = 1, Xfb_Offset = 8, XFB_STRIDE = 32) out vec4 captured;
void main() { captured = vec4(1.0); gl_Position = vec4(0.0); }
",
        &[
            "captured Location 0",
            "captured XfbBuffer 1",
            "captured Offset 8",
            "captured XfbStride 32",
            "mode Xfb",
        ],
    )?;
    assert_layouts(
        ShaderStage::Geometry,
        "#version 450
layout(TRIANGLES, Invocations = 2) in;
layout(LINE_STRIP, MAX_VERTICES = 4) out;
void main() { EmitVertex(); EndPrimitive(); }
",
        &[
            "mode Triangles",
            "mode Invocations 2",
            "mode OutputLineStrip",
            "mode OutputVertices 4",
        ],
    )?;
    assert_layouts(
        ShaderStage::TessControl,
        "#version 450
layout(VERTICES = 3) out;
void main() { gl_TessLevelOuter[0] = 1.0; }
",
        &["mode OutputVertices 3"],
    )?;
    assert_layouts(
        ShaderStage::TessEvaluation,
        "#version 450
layout(Triangles, EQUAL_SPACING, Cw, POINT_MODE) in;
void main() { gl_Position = vec4(gl_TessCoord, 1.0); }
",
        &[
            "mode Triangles",
            "mode SpacingEqual",
            "mode VertexOrderCw",
            "mode PointMode",
        ],
    )
}

#[test]
fn diagnostics_name_layouts_as_glslang() -> TestResult {
    assert_rejected_like_glslang(
        ShaderStage::Fragment,
        "#version 450
layout(LOCATION = 100000) out vec4 color;
void main() { color = vec4(1.0); }
",
        "location",
    )?;
    assert_rejected_like_glslang(
        ShaderStage::Fragment,
        "#version 450
layout(Local_Size_X = 2) in;
void main() {}
",
        "local_size_x",
    )?;
    assert_rejected_like_glslang(
        ShaderStage::Fragment,
        "#version 450
layout(SHARED, Binding = 0) uniform Block { float value; } block;
void main() {}
",
        "shared",
    )?;
    assert_rejected_like_glslang(
        ShaderStage::Fragment,
        "#version 450
layout(HEAP_OFFSET = 1) out vec4 color;
void main() {}
",
        "heap_offset",
    )
}

#[test]
fn unknown_layout_identifiers_are_rejected_like_glslang() -> TestResult {
    let cases: [(ShaderStage, &str, &str); 8] = [
        (
            ShaderStage::Fragment,
            "layout(Foo, binding = 0) uniform Block { float value; } block;",
            "foo",
        ),
        (
            ShaderStage::Fragment,
            "layout(location = 0, BAR = 3) out vec4 color;",
            "bar",
        ),
        (
            ShaderStage::Fragment,
            "layout(Location) out vec4 color;",
            "location",
        ),
        (
            ShaderStage::Fragment,
            "layout(STD140 = 1, binding = 0) uniform Block { float value; } block;",
            "std140",
        ),
        (ShaderStage::Fragment, "layout(Triangles) in;", "triangles"),
        (
            ShaderStage::Vertex,
            "layout(location = 0, Index = 1) out vec4 color;",
            "index",
        ),
        (
            ShaderStage::Compute,
            "layout(Viewport_Relative) out;",
            "viewport_relative",
        ),
        (
            ShaderStage::Vertex,
            "layout(tile_attachmentQCOM, rgba8, binding = 0) uniform image2D picture;",
            "tile_attachmentqcom",
        ),
    ];
    for (stage, declaration, name) in cases {
        let source = format!("#version 450\n{declaration}\nvoid main() {{}}\n");
        assert_rejected_like_glslang(stage, &source, name)?;
    }
    Ok(())
}

#[test]
fn layout_values_need_literals_like_glslang() -> TestResult {
    let cases: [(ShaderStage, &str, &str); 7] = [
        (
            ShaderStage::Compute,
            "layout(binding = S) buffer Block { float value; } block;",
            "binding",
        ),
        (
            ShaderStage::Compute,
            "layout(Set = S, binding = 0) buffer Block { float value; } block;",
            "set",
        ),
        (
            ShaderStage::Fragment,
            "layout(location = S + 1) out vec4 color;",
            "location",
        ),
        (
            ShaderStage::Compute,
            "layout(local_size_x = S) in;",
            "local_size",
        ),
        (
            ShaderStage::Compute,
            "layout(LOCAL_SIZE_Y_ID = S) in;",
            "local_size",
        ),
        (
            ShaderStage::Compute,
            "layout(constant_id = S) const int OTHER = 1;",
            "constant_id",
        ),
        (
            ShaderStage::Fragment,
            "layout(input_attachment_index = S, binding = 0) uniform subpassInput attachment;",
            "input_attachment_index",
        ),
    ];
    for (stage, declaration, name) in cases {
        let source = format!(
            "#version 450\nlayout(constant_id = 1) const int S = 1;\n{declaration}\nvoid main() {{}}\n"
        );
        assert_rejected_like_glslang(stage, &source, name)?;
    }
    Ok(())
}

#[test]
fn local_size_lookalikes_are_rejected_like_glslang() -> TestResult {
    for (declaration, name) in [
        ("layout(LOCAL_SIZE_W = 0) in;", "local_size_w"),
        ("layout(local_size_w = 1) in;", "local_size_w"),
        ("layout(local_size_xy = 0) in;", "local_size_xy"),
    ] {
        let source = format!("#version 450\n{declaration}\nvoid main() {{}}\n");
        assert_rejected_like_glslang(ShaderStage::Compute, &source, name)?;
    }
    Ok(())
}

#[test]
fn shaders_of_an_unsupported_version_are_still_analyzed_like_glslang() -> TestResult {
    let source = "#version 450
layout(ShaderRecordEXT) buffer Record { float value; } record;
void main() {}
";
    assert_rejected_like_glslang(ShaderStage::RayGeneration, source, "shader record EXT")?;
    let errors = rglsl_errors(ShaderStage::RayGeneration, source)?;
    assert!(
        errors
            .iter()
            .any(|(_, message)| message.contains("ray tracing shaders require")),
        "{errors:?}"
    );
    Ok(())
}

#[test]
fn a_missing_location_is_one_error() -> TestResult {
    let errors = rglsl_errors(
        ShaderStage::Fragment,
        "#version 450
out vec4 color;
void main() { color = vec4(1.0); }
",
    )?;
    assert_eq!(
        errors,
        [(
            2,
            String::from("SPIR-V requires a location for user inputs and outputs")
        )]
    );
    Ok(())
}
