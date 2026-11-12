use alloc::string::String;
use alloc::vec::Vec;

use super::{reported, TestResult};
use crate::{analyze, Options, ResourceLimits, Stage};

fn diagnostics(
    stage: Stage,
    limits: ResourceLimits,
    source: &str,
) -> TestResult<Vec<(u32, String)>> {
    let unit = rglsl_ast::parse(source)?;
    let options = Options {
        limits,
        ..Options::new(stage)
    };
    Ok(reported(&analyze(&unit, &options), source))
}

fn found(line: u32, kind: &str) -> Vec<(u32, String)> {
    alloc::vec![(line, String::from(kind))]
}

fn defaults_and(change: impl FnOnce(&mut ResourceLimits)) -> ResourceLimits {
    let mut limits = ResourceLimits::default();
    change(&mut limits);
    limits
}

#[test]
fn configuration_names_cover_every_limit() {
    let limits = ResourceLimits::default();
    let entries = limits.entries();
    assert_eq!(entries.len(), 111);
    let mut copy = ResourceLimits::zeroed();
    for &(name, value) in &entries {
        assert!(copy.set(name, value), "{name}");
    }
    assert_eq!(copy, limits);
    assert!(!copy.set("MaxWidgets", 1));
    assert!(limits
        .configuration()
        .starts_with("MaxLights 32\nMaxClipPlanes 6\n"));
    assert_eq!(limits.max_task_work_group_size_ext(), [128, 128, 128]);
    assert!(!limits.index_limits());
    assert!(ResourceLimits::zeroed().index_limits());
}

#[test]
fn local_size_follows_the_work_group_size_limits() -> TestResult {
    let source =
        "#version 450\nlayout(local_size_x = 2048, local_size_z = 128) in;\nvoid main() {}\n";
    let mut expected = found(2, "InvalidQualifier");
    expected.extend(found(2, "InvalidQualifier"));
    assert_eq!(
        diagnostics(Stage::Compute, ResourceLimits::default(), source)?,
        expected
    );
    let larger = defaults_and(|limits| {
        limits.max_compute_work_group_size_x = 2048;
        limits.max_compute_work_group_size_z = 128;
    });
    assert!(diagnostics(Stage::Compute, larger, source)?.is_empty());
    let mesh = "#version 450\n#extension GL_NV_mesh_shader : require\nlayout(local_size_x = 33) in;\nlayout(triangles, max_vertices = 3, max_primitives = 1) out;\nvoid main() {}\n";
    assert_eq!(
        diagnostics(Stage::Mesh, ResourceLimits::default(), mesh)?,
        found(3, "InvalidQualifier")
    );
    let wider = defaults_and(|limits| limits.max_mesh_work_group_size_x_nv = 33);
    assert!(diagnostics(Stage::Mesh, wider, mesh)?.is_empty());
    let task = "#version 450\n#extension GL_NV_mesh_shader : require\nlayout(local_size_x = 33) in;\nvoid main() {}\n";
    assert_eq!(
        diagnostics(Stage::Task, ResourceLimits::default(), task)?,
        found(3, "InvalidQualifier")
    );
    let unlimited = defaults_and(|limits| limits.max_compute_work_group_size_x = -1);
    let small = "#version 450\nlayout(local_size_x = 4000) in;\nvoid main() {}\n";
    assert!(diagnostics(Stage::Compute, unlimited, small)?.is_empty());
    Ok(())
}

#[test]
fn fragment_output_locations_follow_the_draw_buffers() -> TestResult {
    let source =
        "#version 450\nlayout(location = 6) out vec4 color;\nvoid main() { color = vec4(1.0); }\n";
    assert!(diagnostics(Stage::Fragment, ResourceLimits::default(), source)?.is_empty());
    let fewer = defaults_and(|limits| limits.max_draw_buffers = 6);
    assert_eq!(
        diagnostics(Stage::Fragment, fewer, source)?,
        found(2, "InvalidQualifier")
    );
    let vertex =
        "#version 450\nlayout(location = 6) out vec4 color;\nvoid main() { color = vec4(1.0); }\n";
    assert!(diagnostics(Stage::Vertex, fewer, vertex)?.is_empty());
    Ok(())
}

#[test]
fn transform_feedback_layouts_follow_the_limits() -> TestResult {
    let buffer = "#version 450\nlayout(location = 0, xfb_buffer = 4, xfb_offset = 0) out vec4 v;\nvoid main() { v = vec4(1.0); }\n";
    assert_eq!(
        diagnostics(Stage::Vertex, ResourceLimits::default(), buffer)?,
        found(2, "ResourceLimit")
    );
    let more = defaults_and(|limits| limits.max_transform_feedback_buffers = 5);
    assert!(diagnostics(Stage::Vertex, more, buffer)?.is_empty());
    let stride = "#version 450\nlayout(xfb_buffer = 0, xfb_stride = 260) out;\nvoid main() {}\n";
    assert_eq!(
        diagnostics(Stage::Vertex, ResourceLimits::default(), stride)?,
        found(2, "ResourceLimit")
    );
    let wider = defaults_and(|limits| limits.max_transform_feedback_interleaved_components = 65);
    assert!(diagnostics(Stage::Vertex, wider, stride)?.is_empty());
    Ok(())
}

#[test]
fn redeclared_clip_and_cull_arrays_follow_the_limits() -> TestResult {
    let variable = "#version 450\nout float gl_ClipDistance[9];\nvoid main() {}\n";
    assert_eq!(
        diagnostics(Stage::Vertex, ResourceLimits::default(), variable)?,
        found(2, "ArrayLimit")
    );
    let more = defaults_and(|limits| {
        limits.max_clip_distances = 9;
        limits.max_cull_distances = 9;
    });
    assert!(diagnostics(Stage::Vertex, more, variable)?.is_empty());
    let block = "#version 450\nout gl_PerVertex {\n    vec4 gl_Position;\n    float gl_CullDistance[9];\n};\nvoid main() {}\n";
    assert_eq!(
        diagnostics(Stage::Vertex, ResourceLimits::default(), block)?,
        found(4, "ArrayLimit")
    );
    assert!(diagnostics(Stage::Vertex, more, block)?.is_empty());
    let index = "#version 450\nvoid main() { gl_ClipDistance[8] = 1.0; }\n";
    assert_eq!(
        diagnostics(Stage::Vertex, ResourceLimits::default(), index)?,
        found(2, "IndexOutOfRange")
    );
    assert!(diagnostics(Stage::Vertex, more, index)?.is_empty());
    Ok(())
}

#[test]
fn tessellation_needs_a_positive_patch_size() -> TestResult {
    let source = "#version 450\nlayout(vertices = 3) out;\nvoid main() {}\n";
    let none = defaults_and(|limits| limits.max_patch_vertices = 0);
    assert_eq!(
        diagnostics(Stage::TessControl, none, source)?,
        found(1, "BuiltinArraySize")
    );
    assert!(diagnostics(Stage::Vertex, none, "#version 450\nvoid main() {}\n")?.is_empty());
    Ok(())
}

#[test]
fn loops_can_be_disabled() -> TestResult {
    let source = "#version 450\nvoid main() {\n    int i = 0;\n    while (i < 4) { i++; }\n    do { i--; } while (i > 0);\n}\n";
    assert!(diagnostics(Stage::Fragment, ResourceLimits::default(), source)?.is_empty());
    let none = defaults_and(|limits| limits.while_loops = 0);
    let mut expected = found(4, "LoopNotAvailable");
    expected.extend(found(5, "LoopNotAvailable"));
    assert_eq!(diagnostics(Stage::Fragment, none, source)?, expected);
    Ok(())
}

#[test]
fn for_loops_can_be_required_to_be_inductive() -> TestResult {
    let inductive = defaults_and(|limits| limits.non_inductive_for_loops = 0);
    let allowed = "#version 450\nvoid main() {\n    float s = 0.0;\n    for (int i = 0; i < 4; i++) { s += float(i); }\n    for (float x = 1.0; x >= 0.0; x -= 0.5) { s += x; }\n    for (int j = 8; (j) != 2; j--) { s += 1.0; }\n}\n";
    assert!(diagnostics(Stage::Fragment, inductive, allowed)?.is_empty());
    for (body, line) in [
        ("int n = 4;\n    for (int i = 0; i < n; i++) {}", 3),
        ("for (uint i = 0u; i < 4u; i++) {}", 2),
        ("int i;\n    for (i = 0; i < 4; i++) {}", 3),
        ("for (int i = 0; i < 4; ++i) {}", 2),
        ("for (int i = 0; i < 4; i *= 2) {}", 2),
        ("for (int i = 0, j = 0; i < 4; i++) {}", 2),
        ("for (int i = 0; i < 4; i++) {\n        i += 1;\n    }", 3),
    ] {
        let source = alloc::format!("#version 450\nvoid main() {{\n    {body}\n}}\n");
        assert_eq!(
            diagnostics(Stage::Fragment, inductive, &source)?,
            found(line + 1, "InductiveLoop"),
            "{body}"
        );
    }
    let out_argument = "#version 450\nvoid bump(inout int value) { value++; }\nvoid main() {\n    for (int i = 0; i < 4; i++) {\n        bump(i);\n    }\n}\n";
    assert_eq!(
        diagnostics(Stage::Fragment, inductive, out_argument)?,
        found(5, "InductiveLoop")
    );
    Ok(())
}

#[test]
fn indices_can_be_required_to_be_constant_index_expressions() -> TestResult {
    let source = "#version 450\nlayout(location = 0) flat in int which;\nlayout(location = 0) out vec4 color;\nlayout(binding = 0) uniform Block { vec4 weights[4]; };\nvoid main() {\n    vec4 local[2] = vec4[2](vec4(1.0), vec4(2.0));\n    const int k = 1;\n    color = local[k] + weights[1];\n    for (int i = 0; i < 2; i++) { color += local[i + 1] + weights[i]; }\n    color += local[which];\n    color += weights[which];\n}\n";
    assert!(diagnostics(Stage::Fragment, ResourceLimits::default(), source)?.is_empty());
    let variable = defaults_and(|limits| {
        limits.general_variable_indexing = 0;
        limits.non_inductive_for_loops = 0;
    });
    assert_eq!(
        diagnostics(Stage::Fragment, variable, source)?,
        found(10, "NonConstantIndex")
    );
    let uniform = defaults_and(|limits| {
        limits.general_uniform_indexing = 0;
        limits.non_inductive_for_loops = 0;
    });
    assert_eq!(
        diagnostics(Stage::Fragment, uniform, source)?,
        found(11, "NonConstantIndex")
    );
    let without_loops = defaults_and(|limits| limits.general_uniform_indexing = 0);
    let mut expected = found(9, "NonConstantIndex");
    expected.extend(found(11, "NonConstantIndex"));
    assert_eq!(
        diagnostics(Stage::Fragment, without_loops, source)?,
        expected
    );
    Ok(())
}
