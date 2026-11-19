mod common;

use common::{Stage, TestResult, interface, program, program_with};
use rglsl::{AddressSpace, Binding, BuiltIn, Module, ShaderStage, TypeInner};
use rglsl_opt::{Context, OptLevel, OptOptions};

const LTO: &[&str] = &["inline", "dce", "lto-io"];

fn optimized(sources: &[(ShaderStage, &str)]) -> TestResult<Vec<Stage>> {
    let options = OptOptions {
        level: OptLevel::Performance,
        validate_each: true,
        ..OptOptions::default()
    };
    program_with(sources, &options, Context::default())
}

fn stage(stages: &[Stage], which: ShaderStage) -> TestResult<&Module> {
    Ok(&stages
        .iter()
        .find(|candidate| candidate.stage == which)
        .ok_or("no such stage")?
        .module)
}

fn outputs(stages: &[Stage], which: ShaderStage) -> TestResult<Vec<String>> {
    Ok(interface(stage(stages, which)?, AddressSpace::Output))
}

fn inputs(stages: &[Stage], which: ShaderStage) -> TestResult<Vec<String>> {
    Ok(interface(stage(stages, which)?, AddressSpace::Input))
}

fn block_members(
    stages: &[Stage],
    which: ShaderStage,
    space: AddressSpace,
) -> TestResult<Vec<BuiltIn>> {
    let module = stage(stages, which)?;
    let mut found = Vec::new();
    for entry in &module.entry_points {
        for &handle in &entry.interface {
            let global = module.global_variables.try_get(handle)?;
            if global.space != space || global.io.is_some() {
                continue;
            }
            let mut ty = global.ty;
            while let TypeInner::Array { base, .. } = module.types[ty].inner {
                ty = base;
            }
            if let TypeInner::Struct { ref members, .. } = module.types[ty].inner {
                for member in members {
                    if let Some(Binding::BuiltIn(builtin)) = member.binding {
                        found.push(builtin.canonical());
                    }
                }
            }
        }
    }
    Ok(found)
}

const POSITION: BuiltIn = BuiltIn::Position { invariant: false };

const VERTEX: &str = "#version 450
layout(location = 0) in vec4 p;
layout(location = 0) out vec4 a;
layout(location = 1) out vec4 b;
layout(location = 2) out float c;
void main() {
    gl_Position = p;
    a = p * 2.0;
    b = p.yxzw;
    c = p.x;
}
";

const FRAGMENT: &str = "#version 450
layout(location = 0) in vec4 a;
layout(location = 1) in vec4 b;
layout(location = 2) in float c;
layout(location = 0) out vec4 o;
void main() {
    o = a + vec4(c);
}
";

#[test]
fn outputs_the_next_stage_does_not_read_are_removed() -> TestResult {
    let stages = optimized(&[
        (ShaderStage::Vertex, VERTEX),
        (ShaderStage::Fragment, FRAGMENT),
    ])?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "a", "c"]);
    assert_eq!(inputs(&stages, ShaderStage::Fragment)?, ["a", "c"]);
    assert_eq!(inputs(&stages, ShaderStage::Vertex)?, ["p"]);
    assert_eq!(outputs(&stages, ShaderStage::Fragment)?, ["o"]);
    Ok(())
}

#[test]
fn unwritten_built_in_members_leave_the_last_vertex_stage() -> TestResult {
    let stages = optimized(&[
        (ShaderStage::Vertex, VERTEX),
        (ShaderStage::Fragment, FRAGMENT),
    ])?;
    assert_eq!(
        block_members(&stages, ShaderStage::Vertex, AddressSpace::Output)?,
        [POSITION]
    );
    Ok(())
}

#[test]
fn a_written_point_size_stays_in_the_last_vertex_stage() -> TestResult {
    let vertex = VERTEX.replace("c = p.x;", "c = p.x;\n    gl_PointSize = 2.0;");
    let stages = optimized(&[
        (ShaderStage::Vertex, &vertex),
        (ShaderStage::Fragment, FRAGMENT),
    ])?;
    assert_eq!(
        block_members(&stages, ShaderStage::Vertex, AddressSpace::Output)?,
        [POSITION, BuiltIn::PointSize]
    );
    Ok(())
}

#[test]
fn a_program_without_the_pass_keeps_its_interface() -> TestResult {
    let stages = program(
        &[
            (ShaderStage::Vertex, VERTEX),
            (ShaderStage::Fragment, FRAGMENT),
        ],
        &["inline", "dce"],
    )?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "a", "b", "c"]);
    Ok(())
}

#[test]
fn an_input_without_a_written_output_becomes_undefined() -> TestResult {
    let vertex = "#version 450
layout(location = 0) in vec4 p;
layout(location = 0) out vec4 a;
layout(location = 1) out vec4 never;
void main() {
    gl_Position = p;
    a = p;
}
";
    let fragment = "#version 450
layout(location = 0) in vec4 a;
layout(location = 1) in vec4 never;
layout(location = 0) out vec4 o;
void main() {
    o = a + never;
}
";
    let stages = optimized(&[
        (ShaderStage::Vertex, vertex),
        (ShaderStage::Fragment, fragment),
    ])?;
    assert_eq!(inputs(&stages, ShaderStage::Fragment)?, ["a"]);
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "a"]);
    Ok(())
}

const COMPONENTS: &str = "#version 450
layout(location = 0) in vec4 p;
layout(location = 1, component = 0) out float x;
layout(location = 1, component = 2) out vec2 yz;
void main() {
    gl_Position = p;
    x = p.x;
    yz = p.yz;
}
";

#[test]
fn components_the_next_stage_does_not_read_are_removed() -> TestResult {
    let fragment = "#version 450
layout(location = 1, component = 2) in vec2 yz;
layout(location = 0) out vec4 o;
void main() {
    o = vec4(yz, 0.0, 1.0);
}
";
    let stages = optimized(&[
        (ShaderStage::Vertex, COMPONENTS),
        (ShaderStage::Fragment, fragment),
    ])?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "yz"]);
    Ok(())
}

#[test]
fn outputs_sharing_components_with_a_read_input_stay() -> TestResult {
    let fragment = "#version 450
layout(location = 1) in vec3 xyz;
layout(location = 0) out vec4 o;
void main() {
    o = vec4(xyz, 1.0);
}
";
    let stages = optimized(&[
        (ShaderStage::Vertex, COMPONENTS),
        (ShaderStage::Fragment, fragment),
    ])?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "x", "yz"]);
    Ok(())
}

#[test]
fn matrices_and_arrays_cover_every_location_they_take() -> TestResult {
    let vertex = "#version 450
layout(location = 0) in vec4 p;
layout(location = 0) out mat4 m;
layout(location = 4) out vec4 after;
layout(location = 5) out vec4 list[3];
layout(location = 8) out dvec4 wide;
layout(location = 10) out vec4 last;
void main() {
    gl_Position = p;
    m = mat4(p, p, p, p);
    after = p;
    list[0] = p; list[1] = p; list[2] = p;
    wide = dvec4(p);
    last = p;
}
";
    let fragment = "#version 450
layout(location = 3) in vec4 inside_m;
layout(location = 7) in vec4 inside_list;
layout(location = 9) flat in dvec2 inside_wide;
layout(location = 0) out vec4 o;
void main() {
    o = inside_m + inside_list + vec4(inside_wide, 0.0, 0.0);
}
";
    let stages = optimized(&[
        (ShaderStage::Vertex, vertex),
        (ShaderStage::Fragment, fragment),
    ])?;
    assert_eq!(
        outputs(&stages, ShaderStage::Vertex)?,
        ["", "list", "m", "wide"]
    );
    Ok(())
}

#[test]
fn transform_feedback_outputs_stay() -> TestResult {
    let vertex = "#version 450
layout(location = 0) in vec4 p;
layout(location = 1, xfb_buffer = 0, xfb_offset = 0) out vec4 captured;
layout(location = 2) out vec4 dropped;
void main() {
    gl_Position = p;
    captured = p;
    dropped = p;
}
";
    let fragment = "#version 450
layout(location = 0) out vec4 o;
void main() {
    o = vec4(1.0);
}
";
    let stages = optimized(&[
        (ShaderStage::Vertex, vertex),
        (ShaderStage::Fragment, fragment),
    ])?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "captured"]);
    Ok(())
}

const GEOMETRY_VERTEX: &str = "#version 450
layout(location = 0) in vec4 p;
layout(location = 0) out vec4 color;
layout(location = 1) out vec4 unused;
void main() {
    gl_Position = p;
    gl_PointSize = 3.0;
    color = p;
    unused = p * 3.0;
}
";

const GEOMETRY: &str = "#version 450
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;
layout(location = 0) in vec4 color[];
layout(location = 1) in vec4 unused[];
layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 extra;
void main() {
    for (int i = 0; i < 3; ++i) {
        gl_Position = gl_in[i].gl_Position;
        outColor = color[i];
        extra = color[i] * 2.0;
        EmitVertex();
    }
    EndPrimitive();
}
";

const GEOMETRY_FRAGMENT: &str = "#version 450
layout(location = 0) in vec4 outColor;
layout(location = 0) out vec4 o;
void main() {
    o = outColor;
}
";

#[test]
fn dead_outputs_propagate_back_through_a_chain() -> TestResult {
    let stages = optimized(&[
        (ShaderStage::Vertex, GEOMETRY_VERTEX),
        (ShaderStage::Geometry, GEOMETRY),
        (ShaderStage::Fragment, GEOMETRY_FRAGMENT),
    ])?;
    assert_eq!(outputs(&stages, ShaderStage::Geometry)?, ["", "outColor"]);
    assert_eq!(inputs(&stages, ShaderStage::Geometry)?, ["color", "gl_in"]);
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "color"]);
    Ok(())
}

#[test]
fn built_ins_the_next_stage_does_not_read_leave_both_blocks() -> TestResult {
    let stages = optimized(&[
        (ShaderStage::Vertex, GEOMETRY_VERTEX),
        (ShaderStage::Geometry, GEOMETRY),
        (ShaderStage::Fragment, GEOMETRY_FRAGMENT),
    ])?;
    assert_eq!(
        block_members(&stages, ShaderStage::Vertex, AddressSpace::Output)?,
        [POSITION]
    );
    assert_eq!(
        block_members(&stages, ShaderStage::Geometry, AddressSpace::Input)?,
        [POSITION]
    );
    assert_eq!(
        block_members(&stages, ShaderStage::Geometry, AddressSpace::Output)?,
        [POSITION]
    );
    Ok(())
}

#[test]
fn the_last_stage_keeps_its_outputs() -> TestResult {
    let stages = optimized(&[
        (ShaderStage::Vertex, GEOMETRY_VERTEX),
        (ShaderStage::Geometry, GEOMETRY),
    ])?;
    assert_eq!(
        outputs(&stages, ShaderStage::Geometry)?,
        ["", "extra", "outColor"]
    );
    assert_eq!(
        block_members(&stages, ShaderStage::Geometry, AddressSpace::Output)?.len(),
        4
    );
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "color"]);
    Ok(())
}

const CONTROL_VERTEX: &str = "#version 450
layout(location = 0) in vec4 p;
layout(location = 0) out vec4 v;
void main() {
    gl_Position = p;
    v = p;
}
";

const CONTROL: &str = "#version 450
layout(vertices = 3) out;
layout(location = 0) in vec4 v[];
layout(location = 0) out vec4 shared_value[];
layout(location = 1) out vec4 written_only[];
layout(location = 2) patch out vec4 corner;
void main() {
    shared_value[gl_InvocationID] = v[gl_InvocationID];
    written_only[gl_InvocationID] = v[gl_InvocationID];
    barrier();
    corner = shared_value[(gl_InvocationID + 1) % 3];
    gl_out[gl_InvocationID].gl_Position = gl_in[gl_InvocationID].gl_Position;
    gl_TessLevelOuter[0] = 1.0;
    gl_TessLevelOuter[1] = 1.0;
    gl_TessLevelOuter[2] = 1.0;
    gl_TessLevelInner[0] = 1.0;
}
";

const EVALUATION: &str = "#version 450
layout(triangles) in;
layout(location = 2) patch in vec4 corner;
layout(location = 0) out vec4 color;
void main() {
    gl_Position = gl_in[0].gl_Position * gl_TessCoord.x;
    color = corner;
}
";

const EVALUATION_FRAGMENT: &str = "#version 450
layout(location = 0) in vec4 color;
layout(location = 0) out vec4 o;
void main() {
    o = color;
}
";

#[test]
fn control_outputs_read_by_other_invocations_stay() -> TestResult {
    let stages = optimized(&[
        (ShaderStage::Vertex, CONTROL_VERTEX),
        (ShaderStage::TessControl, CONTROL),
        (ShaderStage::TessEvaluation, EVALUATION),
        (ShaderStage::Fragment, EVALUATION_FRAGMENT),
    ])?;
    let outputs = outputs(&stages, ShaderStage::TessControl)?;
    assert!(outputs.contains(&String::from("shared_value")));
    assert!(outputs.contains(&String::from("corner")));
    assert!(!outputs.contains(&String::from("written_only")));
    Ok(())
}

#[test]
fn the_pass_alone_needs_a_linked_program() -> TestResult {
    let options = OptOptions {
        passes: Some(LTO.iter().map(|&name| name.to_owned()).collect()),
        validate_each: true,
        ..OptOptions::default()
    };
    let unlinked = Context {
        unlinked: true,
        ..Context::default()
    };
    let stages = program_with(
        &[
            (ShaderStage::Vertex, VERTEX),
            (ShaderStage::Fragment, FRAGMENT),
        ],
        &options,
        unlinked,
    )?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "a", "b", "c"]);
    let stages = program(
        &[
            (ShaderStage::Vertex, VERTEX),
            (ShaderStage::Fragment, FRAGMENT),
        ],
        LTO,
    )?;
    assert_eq!(outputs(&stages, ShaderStage::Vertex)?, ["", "a", "c"]);
    Ok(())
}

#[test]
fn a_mesh_pipeline_drops_unread_outputs() -> TestResult {
    let mesh = "#version 450
#extension GL_EXT_mesh_shader : require
layout(local_size_x = 1) in;
layout(triangles, max_vertices = 3, max_primitives = 1) out;
layout(location = 0) out vec4 color[];
layout(location = 1) out vec4 unused[];
void main() {
    SetMeshOutputsEXT(3, 1);
    for (int i = 0; i < 3; ++i) {
        gl_MeshVerticesEXT[i].gl_Position = vec4(float(i));
        color[i] = vec4(1.0);
        unused[i] = vec4(2.0);
    }
    gl_PrimitiveTriangleIndicesEXT[0] = uvec3(0, 1, 2);
}
";
    let fragment = "#version 450
layout(location = 0) in vec4 color;
layout(location = 0) out vec4 o;
void main() {
    o = color;
}
";
    let stages = optimized(&[(ShaderStage::Mesh, mesh), (ShaderStage::Fragment, fragment)])?;
    let outputs = outputs(&stages, ShaderStage::Mesh)?;
    assert!(outputs.contains(&String::from("color")));
    assert!(!outputs.contains(&String::from("unused")));
    Ok(())
}
