use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl::{
    Binding, Expression, Function, Module, RayTracingData,
    ShaderStage, Statement,
};
use rglsl_link::{
    LinkError, Linked, OptLevel, OptOptions, Options as LinkOptions, ProgramOptions, decode,
    encode, link, link_spirv,
};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const TRACING: &str = "#version 460
#extension GL_EXT_ray_tracing : require
layout(set = 0, binding = 0) uniform accelerationStructureEXT scene;
void trace(vec3 origin, vec3 direction, const int payload) {
    traceRayEXT(scene, gl_RayFlagsOpaqueEXT, 0xff, 0, 0, 0, origin, 0.0, direction, 100.0, payload);
}
";

const SHADING: &str = "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
void shade(vec3 origin, const int payload) { trace(origin, vec3(0.0, 0.0, 1.0), payload); }
void call(uint record, const int data) { executeCallableEXT(record, data); }
";

const RAY_GENERATION: &str = "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
void shade(vec3 origin, const int payload);
void call(uint record, const int data);
const int SHADOW = 1;
layout(location = 0) rayPayloadEXT vec3 color;
layout(location = 1) rayPayloadEXT float visibility;
layout(location = 3) callableDataEXT vec4 parameters;
layout(set = 0, binding = 1) buffer Result { vec4 value; } result;
void main() {
    trace(vec3(0.0), vec3(0.0, 0.0, 1.0), 0);
    trace(vec3(1.0), vec3(0.0, 1.0, 0.0), SHADOW);
    shade(vec3(2.0), 0);
    shade(vec3(3.0), 1);
    call(0u, 3);
    result.value = vec4(color, visibility) + parameters;
}
";

fn object(stage: ShaderStage, source: &str) -> TestResult<ObjectModule> {
    Frontend::default()
        .compile(&Options::from(stage), source)
        .map_err(|errors| format!("{source}\n{errors:?}").into())
}

fn library_options() -> Options {
    Options {
        library: true,
        ..Options::from(ShaderStage::RayGeneration)
    }
}

fn library(source: &str) -> TestResult<ObjectModule> {
    Frontend::default()
        .compile(&library_options(), source)
        .map_err(|errors| format!("{source}\n{errors:?}").into())
}

fn compile_errors(options: &Options, source: &str) -> Vec<String> {
    match Frontend::default().compile(options, source) {
        Ok(_) => Vec::new(),
        Err(errors) => errors.errors.iter().map(ToString::to_string).collect(),
    }
}

fn link_errors(objects: &[ObjectModule]) -> TestResult<Vec<LinkError>> {
    match link(objects, &LinkOptions::default()) {
        Ok(_) => Err("linking succeeded".into()),
        Err(errors) => Ok(errors.errors),
    }
}

fn ray_data(statement: &Statement) -> Option<RayTracingData> {
    statement.ray_tracing_data().map(|(_, data)| data)
}

fn locations(module: &Module, function: &Function) -> TestResult<Vec<u32>> {
    let mut found = Vec::new();
    for data in function.body.walk().filter_map(ray_data) {
        let pointer = match data {
            RayTracingData::Pointer(pointer) => pointer,
            RayTracingData::Location(location) => {
                found.push(location);
                continue;
            }
            RayTracingData::Argument { .. } => {
                return Err(format!("{data:?} was not resolved").into());
            }
        };
        let Expression::GlobalVariable(variable) = function.expressions[pointer] else {
            return Err("the ray tracing data is not a global variable".into());
        };
        let Some(Binding::Location { location, .. }) = module.global_variables[variable].io else {
            return Err("the ray tracing variable has no location".into());
        };
        found.push(location);
    }
    Ok(found)
}

fn every_level_writes_spirv(objects: &[ObjectModule]) -> TestResult {
    for level in OptLevel::ALL {
        let options = ProgramOptions {
            optimize: OptOptions {
                level,
                ..OptOptions::default()
            },
            ..ProgramOptions::default()
        };
        let program = link_spirv(objects, &options).map_err(|error| error.to_string())?;
        assert_eq!(program.stages.len(), 1);
    }
    Ok(())
}

fn specializations(linked: &Linked) -> TestResult<Vec<(String, Vec<u32>)>> {
    let mut found = Vec::new();
    for (_, function) in linked.module.functions.iter() {
        let locations = locations(&linked.module, function)?;
        if !locations.is_empty() {
            found.push((function.name.clone().unwrap_or_default(), locations));
        }
    }
    found.sort();
    Ok(found)
}

fn calls(linked: &Linked, callee: &str) -> usize {
    linked
        .module
        .entry_points
        .iter()
        .map(|entry| &entry.function)
        .chain(linked.module.functions.iter().map(|(_, function)| function))
        .flat_map(|function| function.body.walk())
        .filter(|statement| match **statement {
            Statement::Call { function, .. } => {
                linked.module.functions[function].name.as_deref() == Some(callee)
            }
            _ => false,
        })
        .count()
}

#[test]
fn a_library_function_traces_with_the_payload_its_caller_names() -> TestResult {
    for order in [[0_usize, 1, 2], [2, 1, 0], [1, 2, 0]] {
        let sources = [
            object(ShaderStage::RayGeneration, RAY_GENERATION)?,
            library(TRACING)?,
            library(SHADING)?,
        ];
        let objects: Vec<ObjectModule> = order
            .iter()
            .filter_map(|&index| sources.get(index).cloned())
            .collect();
        let linked = link(&objects, &LinkOptions::default())?;
        assert_eq!(
            specializations(&linked)?,
            [
                (String::from("call"), vec![3]),
                (String::from("trace"), vec![0]),
                (String::from("trace"), vec![1]),
            ]
        );
        assert_eq!(linked.module.functions.len(), 5);
        assert_eq!(calls(&linked, "trace"), 4);
        assert_eq!(calls(&linked, "shade"), 2);
        every_level_writes_spirv(&objects)?;
    }
    Ok(())
}

#[test]
fn a_location_parameter_survives_the_object_file() -> TestResult {
    let tracing = library(TRACING)?;
    rglsl_link::validate_object(&tracing)?;
    let decoded = decode(&encode(&tracing)?)?;
    let linked = link(
        &[
            object(ShaderStage::RayGeneration, RAY_GENERATION)?,
            decoded,
            library(SHADING)?,
        ],
        &LinkOptions::default(),
    )?;
    assert_eq!(specializations(&linked)?.len(), 3);
    Ok(())
}

#[test]
fn a_location_parameter_is_declared_once_per_program() -> TestResult {
    let closest_hit = object(
        ShaderStage::ClosestHit,
        "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
layout(location = 0) rayPayloadInEXT vec3 color;
layout(location = 2) rayPayloadEXT float visibility;
void main() {
    trace(gl_WorldRayOriginEXT, vec3(0.0, 1.0, 0.0), 2);
    trace(gl_WorldRayOriginEXT, vec3(0.0, 1.0, 0.0), 0);
    color = vec3(visibility);
}
",
    )?;
    let linked = link(&[closest_hit, library(TRACING)?], &LinkOptions::default())?;
    assert_eq!(
        specializations(&linked)?,
        [
            (String::from("trace"), vec![0]),
            (String::from("trace"), vec![2]),
        ]
    );
    Ok(())
}

#[test]
fn a_location_that_is_not_constant_is_a_link_error() -> TestResult {
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
layout(location = 0) rayPayloadEXT vec3 color;
layout(push_constant) uniform Selection { int payload; } selection;
void main() { trace(vec3(0.0), vec3(1.0), selection.payload); }
",
    )?;
    assert_eq!(
        link_errors(&[ray_generation, library(TRACING)?])?,
        [LinkError::RayLocationNotConstant(String::from("trace"))]
    );
    let indirect = library(
        "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
void shade(vec3 origin, int payload) { trace(origin, vec3(1.0), payload + 1); }
",
    )?;
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
void shade(vec3 origin, int payload);
layout(location = 0) rayPayloadEXT vec3 color;
void main() { shade(vec3(0.0), 0); }
",
    )?;
    assert_eq!(
        link_errors(&[ray_generation, indirect, library(TRACING)?])?,
        [LinkError::RayLocationNotConstant(String::from("trace"))]
    );
    Ok(())
}

#[test]
fn a_location_without_a_variable_is_a_link_error() -> TestResult {
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
void call(uint record, const int data);
layout(location = 0) rayPayloadEXT vec3 color;
void main() { trace(vec3(0.0), vec3(1.0), 4); }
",
    )?;
    let errors = link_errors(&[ray_generation, library(TRACING)?])?;
    assert_eq!(
        errors,
        [LinkError::RayLocationNotDeclared {
            qualifiers: "rayPayloadEXT/rayPayloadInEXT",
            location: 4,
            function: String::from("trace"),
        }]
    );
    assert_eq!(
        errors.first().map(ToString::to_string).as_deref(),
        Some(
            "`trace` needs a rayPayloadEXT/rayPayloadInEXT variable with location 4, but none is declared"
        )
    );
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
void call(uint record, const int data);
layout(location = 0) rayPayloadEXT vec3 color;
void main() { call(0u, 0); }
",
    )?;
    assert_eq!(
        link_errors(&[ray_generation, library(SHADING)?, library(TRACING)?])?,
        [LinkError::RayLocationNotDeclared {
            qualifiers: "callableDataEXT/callableDataInEXT",
            location: 0,
            function: String::from("call"),
        }]
    );
    Ok(())
}

#[test]
fn only_a_const_parameter_of_a_library_stands_for_a_location() {
    const CONSTANT: &str = "the payload number must be a compile-time constant";
    let rejected = |options: &Options, source: &str| {
        let errors = compile_errors(options, source);
        assert!(
            errors.iter().any(|error| error.contains(CONSTANT)),
            "{source}\n{errors:?}"
        );
    };
    let body = "traceRayEXT(scene, 0u, 0xff, 0, 0, 0, vec3(0.0), 0.0, vec3(1.0), 1.0, payload);";
    let header = "#version 460
#extension GL_EXT_ray_tracing : require
layout(set = 0, binding = 0) uniform accelerationStructureEXT scene;
layout(location = 0) rayPayloadEXT vec3 color;
";
    rejected(
        &Options::from(ShaderStage::RayGeneration),
        &format!(
            "{header}void trace(const int payload) {{ {body} }}\nvoid main() {{ trace(0); }}\n"
        ),
    );
    rejected(
        &library_options(),
        &format!("{header}void trace(int payload) {{ {body} }}\n"),
    );
    rejected(
        &library_options(),
        &format!("{header}uniform int payload;\nvoid trace() {{ {body} }}\n"),
    );
    rejected(
        &library_options(),
        &format!("{header}void trace(const int number) {{ int payload = number; {body} }}\n"),
    );
    let accepted = compile_errors(
        &library_options(),
        &format!("{header}void trace(const int payload) {{ {body} }}\n"),
    );
    assert!(accepted.is_empty(), "{accepted:?}");
}

#[test]
fn calls_in_nested_blocks_keep_their_own_payload() -> TestResult {
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
void trace(vec3 origin, vec3 direction, const int payload);
layout(location = 0) rayPayloadEXT vec3 color;
layout(location = 1) rayPayloadEXT float visibility;
layout(location = 2) rayPayloadEXT vec4 extra;
layout(push_constant) uniform Selection { int count; } selection;
void main() {
    trace(vec3(0.0), vec3(1.0), 0);
    if (selection.count > 1) {
        for (int i = 0; i < selection.count; ++i) {
            trace(vec3(i), vec3(1.0), 2);
        }
        trace(vec3(1.0), vec3(1.0), 1);
    } else {
        trace(vec3(2.0), vec3(1.0), 1);
    }
    trace(vec3(3.0), vec3(1.0), 0);
}
",
    )?;
    let linked = link(
        &[ray_generation, library(TRACING)?],
        &LinkOptions::default(),
    )?;
    let module = &linked.module;
    let entry = &module
        .entry_points
        .first()
        .ok_or("no entry point")?
        .function;
    let mut checked = 0;
    for statement in entry.body.walk() {
        let Statement::Call {
            function,
            ref arguments,
            ..
        } = *statement
        else {
            continue;
        };
        let payload = *arguments.last().ok_or("a call without arguments")?;
        let Expression::Literal(rglsl::Literal::I32(expected)) = entry.expressions[payload] else {
            return Err("the payload argument is not a literal".into());
        };
        assert_eq!(
            locations(module, &module.functions[function])?,
            [u32::try_from(expected)?]
        );
        checked += 1;
    }
    assert_eq!(checked, 5);
    assert_eq!(module.functions.len(), 3);
    Ok(())
}

#[test]
fn hit_object_calls_take_their_locations_from_the_caller() -> TestResult {
    let library = library(
        "#version 460
#extension GL_EXT_ray_tracing : require
#extension GL_EXT_ray_query : require
#extension GL_EXT_shader_invocation_reorder : require
layout(set = 0, binding = 0) uniform accelerationStructureEXT scene;
void traced(hitObjectEXT hit, const int payload) {
    hitObjectTraceRayEXT(hit, scene, 1u, 1u, 1u, 1u, 1u, vec3(0.5), 0.5, vec3(1.0), 1.0, payload);
}
void executed(hitObjectEXT hit, const int payload) { hitObjectExecuteShaderEXT(hit, payload); }
void attributes(hitObjectEXT hit, const int location) { hitObjectGetAttributesEXT(hit, location); }
void recorded(hitObjectEXT hit, rayQueryEXT query, const int location) {
    hitObjectRecordFromQueryEXT(hit, query, 1u, location);
}
",
    )?;
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
#extension GL_EXT_ray_query : require
#extension GL_EXT_shader_invocation_reorder : require
void traced(hitObjectEXT hit, const int payload);
void executed(hitObjectEXT hit, const int payload);
void attributes(hitObjectEXT hit, const int location);
void recorded(hitObjectEXT hit, rayQueryEXT query, const int location);
layout(location = 1) rayPayloadEXT vec4 color;
layout(location = 4) rayPayloadEXT float visibility;
layout(location = 2) hitObjectAttributeEXT vec2 barycentrics;
layout(location = 3) hitObjectAttributeEXT vec3 extra;
void main() {
    hitObjectEXT hit;
    rayQueryEXT query;
    traced(hit, 1);
    traced(hit, 4);
    executed(hit, 4);
    attributes(hit, 2);
    recorded(hit, query, 3);
}
",
    )?;
    let objects = [ray_generation, library];
    let linked = link(&objects, &LinkOptions::default())?;
    assert_eq!(
        specializations(&linked)?,
        [
            (String::from("attributes"), vec![2]),
            (String::from("executed"), vec![4]),
            (String::from("recorded"), vec![3]),
            (String::from("traced"), vec![1]),
            (String::from("traced"), vec![4]),
        ]
    );
    every_level_writes_spirv(&objects)?;
    let missing = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_EXT_ray_tracing : require
#extension GL_EXT_shader_invocation_reorder : require
void attributes(hitObjectEXT hit, const int location);
void main() {
    hitObjectEXT hit;
    attributes(hit, 5);
}
",
    )?;
    let [_, library] = objects;
    assert_eq!(
        link_errors(&[missing, library])?,
        [LinkError::RayLocationNotDeclared {
            qualifiers: "hitObjectAttributeNV/hitObjectAttributeEXT",
            location: 5,
            function: String::from("attributes"),
        }]
    );
    Ok(())
}

#[test]
fn nv_calls_take_their_location_numbers_from_the_caller() -> TestResult {
    let library = library(
        "#version 460
#extension GL_NV_ray_tracing : require
layout(set = 0, binding = 0) uniform accelerationStructureNV scene;
void trace(const int payload) {
    traceNV(scene, 0u, 0, 1, 1, 0, vec3(0.0), 0.5, vec3(1.0), 0.75, payload);
}
void call(const int data) { executeCallableNV(0u, data); }
",
    )?;
    let ray_generation = object(
        ShaderStage::RayGeneration,
        "#version 460
#extension GL_NV_ray_tracing : require
void trace(const int payload);
void call(const int data);
layout(location = 1) rayPayloadNV vec4 color;
layout(location = 2) callableDataNV vec4 parameters;
void main() {
    trace(1);
    call(2);
}
",
    )?;
    let objects = [ray_generation, library];
    let linked = link(&objects, &LinkOptions::default())?;
    assert_eq!(
        specializations(&linked)?,
        [
            (String::from("call"), vec![2]),
            (String::from("trace"), vec![1]),
        ]
    );
    every_level_writes_spirv(&objects)
}
