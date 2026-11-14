use std::collections::BTreeSet;

use rglsl::back::spv;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::{AddressSpace, ShaderStage, TypeInner};
use rglsl_link::{Linked, Options as LinkOptions, decode, encode, link_objects, validate_object};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const OP_EXTENSION: u32 = 10;
const OP_EXT_INST_IMPORT: u32 = 11;
const OP_ENTRY_POINT: u32 = 15;
const OP_EXECUTION_MODE: u32 = 16;
const OP_CAPABILITY: u32 = 17;
const OP_VARIABLE: u32 = 59;
const OP_DECORATE: u32 = 71;
const OP_MEMBER_DECORATE: u32 = 72;
const OP_EXECUTION_MODE_ID: u32 = 331;

fn writer_options() -> spv::Options<'static> {
    spv::Options {
        lang_version: (1, 6),
        flags: spv::WriterFlags::LABEL_VARYINGS | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    }
}

fn frontend_options(stage: ShaderStage, auto_map: bool) -> Options {
    Options {
        auto_map_bindings: auto_map,
        auto_map_locations: auto_map,
        spirv_version: Some((1, 6)),
        ..Options::from(stage)
    }
}

fn direct(stage: ShaderStage, source: &str, auto_map: bool) -> TestResult<Vec<u32>> {
    let module = Frontend::default()
        .parse(&frontend_options(stage, auto_map), source)
        .map_err(|errors| format!("{errors:?}"))?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module)?;
    Ok(spv::write_vec(&module, &info, &writer_options(), None)?)
}

fn through_object(stage: ShaderStage, source: &str, auto_map: bool) -> TestResult<Vec<u32>> {
    let object = Frontend::default()
        .compile(&frontend_options(stage, auto_map), source)
        .map_err(|errors| format!("{errors:?}"))?;
    validate_object(&object)?;
    let object = decode(&encode(&object)?)?;
    let options = LinkOptions {
        auto_map_bindings: auto_map,
        auto_map_locations: auto_map,
        ..LinkOptions::default()
    };
    let linked = link_objects(&[object], &options)?;
    let [ref stage] = *linked.as_slice() else {
        return Err(format!("{} stages", linked.len()).into());
    };
    Ok(spv::write_vec(
        &stage.module,
        &stage.info,
        &writer_options(),
        None,
    )?)
}

fn instructions(words: &[u32]) -> TestResult<Vec<(u32, &[u32])>> {
    let mut found = Vec::new();
    let mut rest = words.get(5..).ok_or("no header")?;
    while let Some(&first) = rest.first() {
        let count = usize::try_from(first >> 16)?;
        if count == 0 || count > rest.len() {
            return Err("truncated instruction".into());
        }
        let (instruction, tail) = rest.split_at(count);
        found.push((first & 0xffff, instruction.get(1..).unwrap_or_default()));
        rest = tail;
    }
    Ok(found)
}

#[derive(Debug, PartialEq, Eq)]
struct Summary {
    declarations: BTreeSet<(u32, Vec<u32>)>,
    interface: usize,
    decorations: Vec<Vec<u32>>,
    variables: Vec<u32>,
}

fn summary(words: &[u32]) -> TestResult<Summary> {
    let mut declarations = BTreeSet::new();
    let mut interface = 0;
    let mut decorations = Vec::new();
    let mut variables = Vec::new();
    for (opcode, operands) in instructions(words)? {
        match opcode {
            OP_CAPABILITY | OP_EXTENSION | OP_EXT_INST_IMPORT => {
                let start = usize::from(opcode == OP_EXT_INST_IMPORT);
                declarations.insert((opcode, operands.get(start..).unwrap_or_default().to_vec()));
            }
            OP_EXECUTION_MODE => {
                declarations.insert((opcode, operands.get(1..).unwrap_or_default().to_vec()));
            }
            OP_EXECUTION_MODE_ID => {
                declarations.insert((opcode, operands.get(1..2).unwrap_or_default().to_vec()));
            }
            OP_ENTRY_POINT => {
                let name_words = operands
                    .iter()
                    .skip(2)
                    .position(|word| word.to_le_bytes().contains(&0))
                    .ok_or("unterminated name")?;
                interface = operands.len().saturating_sub(3 + name_words);
                declarations.insert((opcode, operands.get(..1).unwrap_or_default().to_vec()));
            }
            OP_VARIABLE => variables.extend(operands.get(2).copied()),
            OP_DECORATE => decorations.push(operands.get(1..).unwrap_or_default().to_vec()),
            OP_MEMBER_DECORATE => decorations.push(operands.get(1..).unwrap_or_default().to_vec()),
            _ => {}
        }
    }
    decorations.sort();
    variables.sort_unstable();
    Ok(Summary {
        declarations,
        interface,
        decorations,
        variables,
    })
}

fn assert_same(stage: ShaderStage, source: &str, auto_map: bool) -> TestResult {
    let direct = summary(&direct(stage, source, auto_map)?)?;
    let linked = summary(&through_object(stage, source, auto_map)?)?;
    assert_eq!(direct, linked, "{source}");
    Ok(())
}

#[test]
fn module_flags_are_merged() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
#extension GL_EXT_buffer_reference : enable
#extension GL_EXT_shader_64bit_indexing : enable
#pragma shader_64bit_indexing
layout(local_size_x = 1) in;
layout(binding = 0) buffer Block { float x[]; } block;
void main() { block.x[1] = 2.0; }
",
        false,
    )
}

const NODE: &str = "#extension GL_EXT_buffer_reference : enable
layout(buffer_reference) buffer Node;
layout(buffer_reference, std430) buffer Node { Node next; uint value; };
";

fn compile(stage: ShaderStage, library: bool, source: &str) -> TestResult<ObjectModule> {
    let options = Options {
        library,
        ..frontend_options(stage, false)
    };
    Ok(Frontend::default()
        .compile(&options, source)
        .map_err(|errors| format!("{errors:?}"))?)
}

fn only_stage(objects: &[ObjectModule]) -> TestResult<Linked> {
    let linked = link_objects(objects, &LinkOptions::default())?;
    linked.into_iter().next().ok_or_else(|| "no stage".into())
}

#[test]
fn cyclic_buffer_references_link() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        &format!(
            "#version 450
{NODE}layout(local_size_x = 1) in;
layout(std430, binding = 0) buffer Root {{ Node head; }} root;
void main() {{ root.head.next.next.value = root.head.value; }}
"
        ),
        false,
    )
}

#[test]
fn cyclic_buffer_references_of_two_modules_are_one_type() -> TestResult {
    let main = compile(
        ShaderStage::Compute,
        false,
        &format!(
            "#version 450
{NODE}layout(local_size_x = 1) in;
layout(std430, binding = 0) buffer Root {{ Node head; }} root;
uint total(Node node);
void main() {{ root.head.value = total(root.head.next); }}
"
        ),
    )?;
    let library = compile(
        ShaderStage::Compute,
        true,
        &format!(
            "#version 450
uint unrelated() {{ return 1u; }}
{NODE}uint total(Node node) {{ return node.value + node.next.value; }}
"
        ),
    )?;
    let stage = only_stage(&[main, library])?;
    let pointers = stage
        .module
        .types
        .iter()
        .filter(|&(_, ty)| {
            matches!(
                ty.inner,
                TypeInner::Pointer {
                    space: AddressSpace::PhysicalStorage { .. },
                    ..
                }
            )
        })
        .count();
    assert_eq!(pointers, 1);
    spv::write_vec(&stage.module, &stage.info, &writer_options(), None)?;
    Ok(())
}

#[test]
fn a_constant_id_shared_with_the_local_size_links() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
layout(constant_id = 0) const int DIM = 1;
layout(local_size_x_id = 0, local_size_y_id = 0) in;
layout(std430, binding = 0) buffer Out { int value; } result;
void main() { result.value = DIM * int(gl_WorkGroupSize.x); }
",
        false,
    )
}

#[test]
fn composite_specialization_constants_link() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
#extension GL_EXT_spec_constant_composites : enable
layout(local_size_x = 1) in;
layout(constant_id = 1) const int six = 6;
struct S { int a; int b; };
const S pair = S(six, six);
layout(constant_id = 2) const float spec = 3.0;
const vec4 splat = vec4(spec);
const int list[2] = { six, six };
layout(std430, binding = 0) buffer Out { vec4 v; int i; } result;
void main() { result.v = splat; result.i = pair.b + list[1]; }
",
        false,
    )
}

#[test]
fn unused_expressions_stay() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
#extension GL_EXT_shader_explicit_arithmetic_types_float16 : require
layout(local_size_x = 1) in;
void main() { vec4 v = vec4(0.0); vec4(f16vec4(v)); }
",
        false,
    )
}

#[test]
fn long_vector_math_results_stay() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
#extension GL_EXT_long_vector : enable
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout(local_size_x = 1) in;
layout(std430, binding = 0) buffer Out { int value; } result;
void main() {
    vector<int32_t, 5> a = vector<int32_t, 5>(result.value);
    vector<int32_t, 5> high;
    vector<int32_t, 5> low;
    imulExtended(a, a, high, low);
    vector<float, 5> f = vector<float, 5>(float(result.value));
    vector<float, 5> whole;
    vector<float, 5> part = modf(f, whole);
    result.value = high[0] + low[1] + int(part[2] + whole[3]);
}
",
        false,
    )
}

#[test]
fn globals_of_uncalled_functions_are_not_declared() -> TestResult {
    assert_same(
        ShaderStage::Mesh,
        "#version 460
#extension GL_EXT_mesh_shader : enable
#extension GL_ARB_shader_draw_parameters : enable
#extension GL_EXT_multiview : enable
layout(local_size_x = 1) in;
layout(max_vertices = 3, max_primitives = 1, triangles) out;
int uncalled() { return gl_DrawIDARB + gl_ViewIndex; }
void main() { SetMeshOutputsEXT(0u, 0u); }
",
        false,
    )
}

#[test]
fn globals_of_functions_called_after_a_return_are_declared() -> TestResult {
    assert_same(
        ShaderStage::Compute,
        "#version 450
layout(local_size_x = 1) in;
layout(std430, binding = 0) buffer Out { uint value; } result;
void late() { result.value = gl_GlobalInvocationID.x; }
void main() { result.value = 0u; return; late(); }
",
        false,
    )
}

fn interface_names(stage: &Linked) -> Vec<String> {
    let Some(entry) = stage.module.entry_points.first() else {
        return Vec::new();
    };
    let mut names: Vec<String> = entry
        .interface
        .iter()
        .filter_map(|&handle| stage.module.global_variables[handle].name.clone())
        .collect();
    names.sort();
    names
}

#[test]
fn globals_of_library_functions_follow_the_linked_calls() -> TestResult {
    let library = "#version 450
float depth() { return gl_FragCoord.z; }
int view() { return gl_SampleID; }
";
    let main = compile(
        ShaderStage::Fragment,
        false,
        "#version 450
layout(location = 0) out vec4 color;
float depth();
void main() { color = vec4(depth()); }
",
    )?;
    let stage = only_stage(&[main, compile(ShaderStage::Fragment, true, library)?])?;
    assert_eq!(interface_names(&stage), ["color", "gl_FragCoord"]);
    Ok(())
}
