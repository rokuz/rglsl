use std::collections::BTreeSet;

use rglsl::back::spv;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl::valid::{ValidationFlags, Validator};
use rglsl::{AddressSpace, ShaderStage, TypeInner};
use rglsl_link::{
    LinkError, Linked, Options as LinkOptions, decode, encode, link_objects, validate_object,
};

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

fn frontend_options(stage: ShaderStage) -> Options {
    Options {
        spirv_version: Some((1, 6)),
        ..Options::from(stage)
    }
}

fn direct(stage: ShaderStage, source: &str) -> TestResult<Vec<u32>> {
    let module = Frontend::default()
        .parse(&frontend_options(stage), source)
        .map_err(|errors| format!("{errors:?}"))?;
    let info = Validator::new(ValidationFlags::all()).validate(&module)?;
    Ok(spv::write_vec(&module, &info, &writer_options(), None)?)
}

fn through_object(stage: ShaderStage, source: &str) -> TestResult<Vec<u32>> {
    let object = Frontend::default()
        .compile(&frontend_options(stage), source)
        .map_err(|errors| format!("{errors:?}"))?;
    validate_object(&object)?;
    let object = decode(&encode(&object)?)?;
    let linked = link_objects(&[object], &LinkOptions::default())?;
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

fn program(stage: ShaderStage, source: &str) -> TestResult<Vec<u32>> {
    let linked = rglsl_link::compile_program(
        &frontend_options(stage),
        source,
        rglsl_pp::FileId(0),
        &mut rglsl_pp::NoIncluder,
    )?;
    Ok(spv::write_vec(
        &linked.module,
        &linked.info,
        &writer_options(),
        None,
    )?)
}

fn assert_same(stage: ShaderStage, source: &str) -> TestResult {
    let direct = direct(stage, source)?;
    let linked = through_object(stage, source)?;
    assert_eq!(summary(&direct)?, summary(&linked)?, "{source}");
    assert_eq!(direct, linked, "{source}");
    assert_eq!(direct, program(stage, source)?, "{source}");
    Ok(())
}

#[test]
fn every_snapshot_input_compiles_to_the_same_words_on_every_path() -> TestResult {
    let directory = std::path::Path::new(concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../rglsl/tests/in/glsl"
    ));
    let mut compared = 0;
    for entry in std::fs::read_dir(directory)? {
        let path = entry?.path();
        let Some(stage) = path
            .extension()
            .and_then(|extension| extension.to_str())
            .and_then(ShaderStage::from_extension)
        else {
            continue;
        };
        let source = std::fs::read_to_string(&path)?;
        let Ok(direct) = direct(stage, &source) else {
            continue;
        };
        assert_eq!(
            direct,
            through_object(stage, &source)?,
            "{}",
            path.display()
        );
        assert_eq!(direct, program(stage, &source)?, "{}", path.display());
        compared += 1;
    }
    assert!(compared > 30, "only {compared} inputs compared");
    Ok(())
}

#[test]
fn ray_queries_of_two_functions_with_one_name_stay_apart() -> TestResult {
    let source = "#version 460
#extension GL_EXT_ray_query : enable
layout(local_size_x = 1) in;
layout(binding = 0) uniform accelerationStructureEXT scene;
void first() {
    rayQueryEXT query;
    rayQueryInitializeEXT(query, scene, 0u, 0xFFu, vec3(0.0), 0.0, vec3(1.0), 1.0);
}
void second() {
    rayQueryEXT query;
    rayQueryInitializeEXT(query, scene, 0u, 0xFFu, vec3(0.0), 0.0, vec3(1.0), 1.0);
}
void uncalled() {
    rayQueryEXT query;
    rayQueryInitializeEXT(query, scene, 0u, 0xFFu, vec3(0.0), 0.0, vec3(1.0), 1.0);
}
void main() { first(); second(); }
";
    assert_same(ShaderStage::Compute, source)?;
    let object = compile(ShaderStage::Compute, false, source)?;
    let stage = only_stage(&[object])?;
    let queries = stage
        .module
        .global_variables
        .iter()
        .filter(|&(_, global)| global.space == AddressSpace::Private)
        .count();
    assert_eq!(queries, 2);
    Ok(())
}

#[test]
fn functions_called_only_from_dead_code_are_linked() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
vec4 late() { return vec4(1.0); }
void main() { color = vec4(0.0); return; color = late(); }
";
    assert_same(ShaderStage::Fragment, source)?;
    let object = compile(ShaderStage::Fragment, false, source)?;
    let stage = only_stage(&[object])?;
    assert_eq!(stage.module.functions.len(), 1);
    Ok(())
}

#[test]
fn a_dead_call_to_a_function_without_a_body_is_a_link_error() -> TestResult {
    let object = compile(
        ShaderStage::Fragment,
        false,
        "#version 450
layout(location = 0) out vec4 color;
vec4 missing();
void main() { color = vec4(0.0); return; color = missing(); }
",
    )?;
    let Err(errors) = link_objects(&[object], &LinkOptions::default()) else {
        return Err("linked a dead call to a function without a body".into());
    };
    assert!(
        errors
            .iter()
            .any(|error| matches!(*error, LinkError::MissingDefinition(_)))
    );
    Ok(())
}

#[test]
fn constant_initializers_match_between_a_program_and_a_library() -> TestResult {
    let program = compile(
        ShaderStage::Fragment,
        false,
        "#version 450
layout(location = 0) out vec4 color;
float scale = 0.5;
float scaled();
void main() { color = vec4(scaled()); }
",
    )?;
    let same = compile(
        ShaderStage::Fragment,
        true,
        "#version 450
float scale = 0.5;
float scaled() { return scale * 2.0; }
",
    )?;
    let other = compile(
        ShaderStage::Fragment,
        true,
        "#version 450
float scale = 0.25;
float scaled() { return scale * 2.0; }
",
    )?;
    only_stage(&[program.clone(), same])?;
    let Err(errors) = link_objects(&[program, other], &LinkOptions::default()) else {
        return Err("linked different initializers".into());
    };
    assert!(
        errors
            .iter()
            .any(|error| error.to_string().contains("initializers"))
    );
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
    )
}

const NODE: &str = "#extension GL_EXT_buffer_reference : enable
layout(buffer_reference) buffer Node;
layout(buffer_reference, std430) buffer Node { Node next; uint value; };
";

fn compile(stage: ShaderStage, library: bool, source: &str) -> TestResult<ObjectModule> {
    let options = Options {
        library,
        ..frontend_options(stage)
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

const INVALID_HELPER: &str = "#extension GL_ARB_gpu_shader_fp64 : enable
#extension GL_EXT_shader_explicit_arithmetic_types_float64 : enable
layout(location = 1) in flat f64vec2 shifted;
f64vec2 offsetted() { return interpolateAtOffset(shifted, f64vec2(0.5)); }
";

#[test]
fn invalid_functions_nobody_calls_link() -> TestResult {
    assert_same(
        ShaderStage::Fragment,
        &format!(
            "#version 450
{INVALID_HELPER}layout(location = 0) out vec4 color;
void main() {{ color = vec4(1.0); }}
"
        ),
    )
}

#[test]
fn invalid_functions_are_reported_when_linked_code_calls_them() -> TestResult {
    let program = compile(
        ShaderStage::Fragment,
        false,
        &format!(
            "#version 450
{INVALID_HELPER}layout(location = 0) out vec4 color;
float relay();
void main() {{ color = vec4(relay()); }}
"
        ),
    )?;
    let calling = compile(
        ShaderStage::Fragment,
        true,
        "#version 450
#extension GL_ARB_gpu_shader_fp64 : enable
dvec2 offsetted();
float relay() { return float(offsetted().x); }
",
    )?;
    let errors = match link_objects(&[program.clone(), calling], &LinkOptions::default()) {
        Ok(_) => return Err("linking succeeded".into()),
        Err(errors) => errors.errors,
    };
    assert!(
        matches!(
            errors.as_slice(),
            [LinkError::InvalidFunction { signature, .. }] if signature == "offsetted()"
        ),
        "{errors:?}"
    );
    let ignoring = compile(
        ShaderStage::Fragment,
        true,
        "#version 450
float relay() { return 1.0; }
",
    )?;
    only_stage(&[program, ignoring])?;
    Ok(())
}

const DOUBLE_DERIVATIVE: &str = "#extension GL_ARB_gpu_shader_fp64 : enable
layout(location = 1) in flat dvec2 slope;
double steepness() { return dFdx(slope.x); }
";

#[test]
fn functions_nobody_calls_that_do_not_lower_link() -> TestResult {
    assert_same(
        ShaderStage::Fragment,
        &format!(
            "#version 450
{DOUBLE_DERIVATIVE}layout(location = 0) out vec4 color;
void main() {{ color = vec4(1.0); }}
"
        ),
    )
}

#[test]
fn functions_that_do_not_lower_are_reported_when_linked_code_calls_them() -> TestResult {
    let program = compile(
        ShaderStage::Fragment,
        false,
        &format!(
            "#version 450
{DOUBLE_DERIVATIVE}layout(location = 0) out vec4 color;
float relay();
void main() {{ color = vec4(relay()); }}
"
        ),
    )?;
    let calling = compile(
        ShaderStage::Fragment,
        true,
        "#version 450
#extension GL_ARB_gpu_shader_fp64 : enable
double steepness();
float relay() { return float(steepness()); }
",
    )?;
    let errors = match link_objects(&[program.clone(), calling], &LinkOptions::default()) {
        Ok(_) => return Err("linking succeeded".into()),
        Err(errors) => errors.errors,
    };
    assert!(
        matches!(
            errors.as_slice(),
            [LinkError::InvalidFunction { signature, message }]
                if signature == "steepness()" && message.contains("is not supported")
        ),
        "{errors:?}"
    );
    let ignoring = compile(
        ShaderStage::Fragment,
        true,
        "#version 450
float relay() { return 1.0; }
",
    )?;
    only_stage(&[program, ignoring])?;
    Ok(())
}

#[test]
fn libraries_report_lowering_errors_when_compiled() -> TestResult {
    for body in [INVALID_HELPER, DOUBLE_DERIVATIVE] {
        let source = format!("#version 450\n{body}");
        for library in [true, false] {
            let options = Options {
                library,
                ..frontend_options(ShaderStage::Fragment)
            };
            let Err(errors) = Frontend::default().compile(&options, &source) else {
                return Err("a library with a lowering error compiled".into());
            };
            let first = errors.errors.first().ok_or("no error reported")?;
            assert!(
                first.kind.to_string().contains("is not supported"),
                "{errors:?}"
            );
            assert!(first.meta.is_defined(), "{errors:?}");
        }
    }
    Ok(())
}

#[test]
fn functions_main_calls_report_lowering_errors_when_compiled() -> TestResult {
    let source = format!(
        "#version 450
{DOUBLE_DERIVATIVE}layout(location = 0) out vec4 color;
void main() {{ color = vec4(float(steepness())); }}
"
    );
    let options = frontend_options(ShaderStage::Fragment);
    let Err(direct) = Frontend::default().parse(&options, &source) else {
        return Err("the direct path accepted the shader".into());
    };
    let Err(object) = Frontend::default().compile(&options, &source) else {
        return Err("the object path accepted the shader".into());
    };
    let messages = |errors: &rglsl::front::glsl::ParseErrors| -> Vec<String> {
        errors.errors.iter().map(ToString::to_string).collect()
    };
    assert_eq!(messages(&direct), messages(&object));
    Ok(())
}
