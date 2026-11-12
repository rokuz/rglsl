use rglsl::back::spv;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;
use rglsl_link::{decode, encode, link_objects, Options as LinkOptions};
use rglsl_pp::MemoryIncluder;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const HEADER: &str =
    "layout(location = 0) out vec4 color;\nfloat twice(float x) {\n    return x * 2.0;\n}\n";

const MAIN: &str = "#version 450
#extension GL_GOOGLE_include_directive : require
#include \"header.h\"
struct Light {
    vec4 position;
    float range;
};
void main() {
    const float scale = 0.5;
    Light light = Light(vec4(1.0), 2.0);
    for (int i = 0; i < 2; i++) {
        light.range = twice(light.range);
    }
    color = light.position * light.range * scale;
}
";

const LIBRARY: &str = "#version 450
float halve(float x) {
    return x * 0.5;
}
";

const PROGRAM: &str = "#version 450
layout(location = 0) out vec4 color;
float halve(float x);
void main() {
    color = vec4(halve(4.0));
}
";

fn options(stage: ShaderStage, name: &str) -> Options {
    Options {
        debug_info: true,
        source_name: Some(String::from(name)),
        ..Options::from(stage)
    }
}

fn with_header() -> TestResult<rglsl::Module> {
    let mut includer = MemoryIncluder::new();
    let root = includer.add_file("main.frag", MAIN);
    includer.add_file("header.h", HEADER);
    Frontend::default()
        .parse_with_includer(
            &options(ShaderStage::Fragment, "main.frag"),
            MAIN,
            root,
            &mut includer,
        )
        .map_err(|errors| format!("{errors:?}").into())
}

fn spirv(module: &rglsl::Module, level: spv::DebugLevel) -> TestResult<Vec<u32>> {
    let info = Validator::new(ValidationFlags::all(), Capabilities::all()).validate(module)?;
    let options = spv::Options {
        debug_info: Some(spv::DebugInfo {
            level,
            source_text: true,
            ..spv::DebugInfo::default()
        }),
        ..spv::Options::default()
    };
    Ok(spv::write_vec(module, &info, &options, None)?)
}

fn opcodes(words: &[u32]) -> Vec<(u32, Vec<u32>)> {
    let mut found = Vec::new();
    let mut rest = words.get(5..).unwrap_or_default();
    while let Some(&first) = rest.first() {
        let count = usize::try_from(first >> 16).unwrap_or(0);
        if count == 0 || count > rest.len() {
            break;
        }
        let (current, tail) = rest.split_at(count);
        found.push((
            first & 0xFFFF,
            current.get(1..).unwrap_or_default().to_vec(),
        ));
        rest = tail;
    }
    found
}

fn strings(words: &[u32]) -> Vec<String> {
    opcodes(words)
        .into_iter()
        .filter(|&(opcode, _)| opcode == 7)
        .map(|(_, operands)| {
            let bytes: Vec<u8> = operands
                .iter()
                .skip(1)
                .flat_map(|word| word.to_le_bytes())
                .take_while(|&byte| byte != 0)
                .collect();
            String::from_utf8_lossy(&bytes).into_owned()
        })
        .collect()
}

fn debug_instructions(words: &[u32], instruction: u32) -> usize {
    opcodes(words)
        .into_iter()
        .filter(|(opcode, operands)| *opcode == 12 && operands.get(3) == Some(&instruction))
        .count()
}

#[test]
fn the_frontend_records_sources_lines_and_scopes() -> TestResult {
    let module = with_header()?;
    let info = module.debug_info.as_deref().ok_or("no debug information")?;
    let names: Vec<&str> = info
        .sources
        .iter()
        .map(|source| source.name.as_str())
        .collect();
    assert!(
        matches!(names.as_slice(), [main, header] if *main == "main.frag" && header.ends_with("header.h")),
        "{names:?}"
    );
    assert!(info.sources.iter().all(|source| source.text.is_some()));
    assert_eq!(info.units.len(), 1);
    assert!(info.units.first().is_some_and(|unit| unit.entry.is_some()));
    assert_eq!(info.scopes.len(), 1);
    assert!(info
        .scopes
        .first()
        .is_some_and(|scope| scope.at.line == 11 && scope.at.source == 0));
    let header = info
        .lines
        .iter()
        .filter(|line| line.source == 1)
        .map(|line| line.line)
        .collect::<Vec<_>>();
    assert!(header.contains(&3), "{header:?}");
    let light = info
        .structs
        .iter()
        .find(|structure| structure.name == "Light")
        .ok_or("no Light")?;
    let lines: Vec<u32> = light.members.iter().map(|member| member.at.line).collect();
    assert_eq!(lines, [5, 6]);
    Ok(())
}

#[test]
fn non_semantic_debug_information_describes_the_program() -> TestResult {
    let module = with_header()?;
    let words = spirv(&module, spv::DebugLevel::NonSemantic)?;
    let strings = strings(&words);
    for expected in [
        "NonSemantic.Shader.DebugInfo.100",
        "main.frag",
        "twice",
        "Light",
        "light",
        "scale",
        "i",
    ] {
        let present = strings.iter().any(|string| string == expected)
            || opcodes(&words).iter().any(|(opcode, _)| *opcode == 11)
                && expected.starts_with("NonSemantic");
        assert!(present, "{expected} is missing from {strings:?}");
    }
    assert_eq!(debug_instructions(&words, 35), 2);
    assert_eq!(debug_instructions(&words, 1), 1);
    assert_eq!(debug_instructions(&words, 20), 2);
    assert_eq!(debug_instructions(&words, 101), 2);
    assert_eq!(debug_instructions(&words, 21), 1);
    assert!(debug_instructions(&words, 26) >= 4);
    assert!(debug_instructions(&words, 28) >= 2);
    assert!(debug_instructions(&words, 29) >= 1);
    assert!(debug_instructions(&words, 103) >= 4);
    assert!(debug_instructions(&words, 23) >= 3);
    Ok(())
}

#[test]
fn line_debug_information_uses_op_line_and_op_source() -> TestResult {
    let module = with_header()?;
    let words = spirv(&module, spv::DebugLevel::Lines)?;
    let instructions = opcodes(&words);
    assert_eq!(
        instructions
            .iter()
            .filter(|(opcode, _)| *opcode == 3)
            .count(),
        2
    );
    assert!(
        instructions
            .iter()
            .filter(|(opcode, _)| *opcode == 8)
            .count()
            >= 4
    );
    assert_eq!(debug_instructions(&words, 103), 0);
    Ok(())
}

#[test]
fn debug_information_changes_no_code() -> TestResult {
    let module = with_header()?;
    let plain = spirv(&module, spv::DebugLevel::None)?;
    let full = spirv(&module, spv::DebugLevel::NonSemantic)?;
    let semantic = |words: &[u32]| -> Vec<u32> {
        let mut inside = false;
        let mut code = Vec::new();
        for (opcode, _) in opcodes(words) {
            match opcode {
                54 => inside = true,
                56 => inside = false,
                8 | 12 => continue,
                _ => {}
            }
            if inside {
                code.push(opcode);
            }
        }
        code
    };
    assert_eq!(semantic(&plain), semantic(&full));
    Ok(())
}

fn object(stage: ShaderStage, name: &str, source: &str, library: bool) -> TestResult<ObjectModule> {
    let options = Options {
        library,
        ..options(stage, name)
    };
    let object = Frontend::default()
        .compile(&options, source)
        .map_err(|errors| format!("{errors:?}"))?;
    Ok(decode(&encode(&object)?)?)
}

#[test]
fn object_files_and_linking_keep_debug_information_per_unit() -> TestResult {
    let program = object(ShaderStage::Fragment, "program.frag", PROGRAM, false)?;
    let library = object(ShaderStage::Fragment, "library.glsl", LIBRARY, true)?;
    assert!(program.module.debug_info.is_some());
    assert!(program
        .module
        .functions
        .iter()
        .chain(library.module.functions.iter())
        .all(
            |(handle, _)| program.module.functions.try_get(handle).is_err()
                || program
                    .module
                    .functions
                    .get_span(handle)
                    .to_range()
                    .is_some()
        ));
    let linked = link_objects(&[program, library], &LinkOptions::default())
        .map_err(|errors| errors.to_string())?;
    let stage = linked.first().ok_or("nothing linked")?;
    let info = stage
        .module
        .debug_info
        .as_deref()
        .ok_or("no debug information after linking")?;
    let names: Vec<&str> = info
        .sources
        .iter()
        .map(|source| source.name.as_str())
        .collect();
    assert_eq!(names, ["program.frag", "library.glsl"]);
    assert_eq!(info.units.len(), 2);
    let starts: Vec<u32> = info
        .functions
        .iter()
        .map(|function| function.start)
        .collect();
    assert_eq!(starts.len(), 2);
    assert!(starts.windows(2).all(|pair| pair.first() < pair.get(1)));
    let words = spirv(&stage.module, spv::DebugLevel::NonSemantic)?;
    assert_eq!(debug_instructions(&words, 1), 2);
    assert_eq!(debug_instructions(&words, 20), 2);
    let strings = strings(&words);
    assert!(strings.iter().any(|string| string == "halve"));
    assert!(strings.iter().any(|string| string == "library.glsl"));
    Ok(())
}
