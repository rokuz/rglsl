use rglsl::ShaderStage;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl_link::{OptLevel, OptOptions, ProgramOptions, link_spirv};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const RAY_QUERIES: &str = "#version 460
#extension GL_EXT_ray_query : require
#extension GL_EXT_nonuniform_qualifier : require
layout(set = 0, binding = 4) uniform accelerationStructureEXT scenes[];
float occlusion(uint scene, vec3 origin) {
    rayQueryEXT query;
    rayQueryInitializeEXT(query, scenes[nonuniformEXT(scene)], gl_RayFlagsOpaqueEXT, 0xFFu, origin, 0.0, vec3(0.0, 0.0, 1.0), 10.0);
    while (rayQueryProceedEXT(query)) {}
    return rayQueryGetIntersectionTypeEXT(query, true) == gl_RayQueryCommittedIntersectionNoneEXT ? 1.0 : 0.0;
}
";

const PLAIN: &str = "#version 460
#extension GL_EXT_ray_query : enable
#extension GL_EXT_opacity_micromap_ray_query_mode : enable
float occlusion(uint scene, vec3 origin);
layout(location = 0) out vec4 color;
void main() { color = vec4(1.0); }
";

const QUERYING: &str = "#version 460
#extension GL_EXT_ray_query : enable
#extension GL_EXT_opacity_micromap_ray_query_mode : enable
float occlusion(uint scene, vec3 origin);
layout(location = 0) out vec4 color;
layout(push_constant) uniform Push { uint scene; } pc;
void main() { color = vec4(occlusion(pc.scene, vec3(0.0))); }
";

const RAY_QUERY: u32 = 4472;
const OPACITY_MICROMAP_MODE: u32 = 6031;
const OP_CAPABILITY: u32 = 17;
const OP_EXECUTION_MODE_ID: u32 = 331;
const OP_VARIABLE: u32 = 59;

fn object(source: &str, library: bool) -> TestResult<ObjectModule> {
    let options = Options {
        library,
        ..Options::from(ShaderStage::Fragment)
    };
    Frontend::default()
        .compile(&options, source)
        .map_err(|errors| format!("{source}\n{errors:?}").into())
}

fn instructions(words: &[u32]) -> Vec<(u32, Vec<u32>)> {
    let mut found = Vec::new();
    let mut rest = words.get(5..).unwrap_or(&[]);
    while let Some(&head) = rest.first() {
        let count = usize::try_from(head >> 16).unwrap_or(0).max(1);
        let operands = rest.get(1..count).unwrap_or(&[]).to_vec();
        found.push((head & 0xFFFF, operands));
        rest = rest.get(count..).unwrap_or(&[]);
    }
    found
}

fn linked(main: &str, prune: bool, level: OptLevel) -> TestResult<Vec<(u32, Vec<u32>)>> {
    let objects = [object(main, false)?, object(RAY_QUERIES, true)?];
    let options = ProgramOptions {
        spirv_version: (1, 6),
        prune_library_globals: prune,
        optimize: OptOptions {
            level,
            ..OptOptions::default()
        },
        ..ProgramOptions::default()
    };
    let program = link_spirv(&objects, &options).map_err(|error| error.to_string())?;
    let words = program
        .stage(ShaderStage::Fragment)
        .map(|binary| binary.words.clone())
        .ok_or("no fragment stage")?;
    Ok(instructions(&words))
}

fn has_capability(instructions: &[(u32, Vec<u32>)], capability: u32) -> bool {
    instructions
        .iter()
        .any(|(op, operands)| *op == OP_CAPABILITY && operands.first() == Some(&capability))
}

fn has_opacity_micromap_mode(instructions: &[(u32, Vec<u32>)]) -> bool {
    instructions.iter().any(|(op, operands)| {
        *op == OP_EXECUTION_MODE_ID && operands.get(1) == Some(&OPACITY_MICROMAP_MODE)
    })
}

fn variables(instructions: &[(u32, Vec<u32>)]) -> usize {
    instructions
        .iter()
        .filter(|(op, _)| *op == OP_VARIABLE)
        .count()
}

#[test]
fn unreferenced_library_globals_are_kept_unless_pruning_is_asked_for() -> TestResult {
    let kept = linked(PLAIN, false, OptLevel::Disabled)?;
    assert!(has_capability(&kept, RAY_QUERY));
    assert!(has_opacity_micromap_mode(&kept));
    let pruned = linked(PLAIN, true, OptLevel::Disabled)?;
    assert!(!has_capability(&pruned, RAY_QUERY));
    assert!(!has_opacity_micromap_mode(&pruned));
    assert_eq!(variables(&kept), variables(&pruned) + 1);
    Ok(())
}

#[test]
fn pruning_keeps_what_a_reachable_function_uses() -> TestResult {
    for level in [OptLevel::Disabled, OptLevel::Performance] {
        let pruned = linked(QUERYING, true, level)?;
        let kept = linked(QUERYING, false, level)?;
        assert!(has_capability(&pruned, RAY_QUERY));
        assert!(has_opacity_micromap_mode(&pruned));
        assert_eq!(pruned, kept);
    }
    Ok(())
}
