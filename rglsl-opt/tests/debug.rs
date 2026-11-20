mod common;

use common::TestResult;
use rglsl::ShaderStage;
use rglsl::back::spv;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::valid::{ValidationFlags, Validator};
use rglsl_opt::{Context, DebugLevel, OptLevel, OptOptions, StageModule, TargetGpu, optimize};

const EXT_INST: u32 = 12;
const LINE: u32 = 8;
const LABEL: u32 = 248;
const PHI: u32 = 245;
const VARIABLE: u32 = 59;
const FUNCTION: u32 = 54;
const FUNCTION_END: u32 = 56;
const FUNCTION_CALL: u32 = 57;
const DEBUG_SCOPE: u32 = 23;
const DEBUG_INLINED_AT: u32 = 25;
const DEBUG_LOCAL_VARIABLE: u32 = 26;
const DEBUG_DECLARE: u32 = 28;
const DEBUG_VALUE: u32 = 29;
const DEBUG_LINE: u32 = 103;

struct Output {
    words: Vec<u32>,
    module: rglsl::Module,
}

fn compile(
    stage: ShaderStage,
    source: &str,
    passes: Option<&[&str]>,
    level: spv::DebugLevel,
) -> TestResult<Output> {
    let options = Options {
        debug_info: true,
        source_name: Some(String::from("shader.glsl")),
        ..Options::from(stage)
    };
    let mut module = Frontend::default()
        .parse(&options, source)
        .map_err(|errors| format!("{errors:?}"))?;
    let mut info = Validator::new(ValidationFlags::all()).validate(&module)?;
    let debug = match level {
        spv::DebugLevel::NonSemantic => DebugLevel::Variables,
        spv::DebugLevel::None | spv::DebugLevel::FileName | spv::DebugLevel::Lines => {
            DebugLevel::Lines
        }
    };
    optimize(
        &mut [StageModule {
            stage,
            module: &mut module,
            info: &mut info,
        }],
        &OptOptions {
            level: OptLevel::Performance,
            passes: passes.map(|passes| passes.iter().map(|&name| name.to_owned()).collect()),
            target_gpu: TargetGpu::default(),
            validate_each: true,
            specialization: Vec::new(),
        },
        Context {
            debug,
            ..Context::default()
        },
    )?;
    let options = spv::Options {
        lang_version: (1, 3),
        debug_info: Some(spv::DebugInfo {
            level,
            source_text: true,
            ..spv::DebugInfo::default()
        }),
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None)?;
    Ok(Output { words, module })
}

fn instructions(words: &[u32]) -> Vec<(u32, Vec<u32>)> {
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

fn debug_opcode(operands: &[u32]) -> Option<u32> {
    operands.get(3).copied()
}

fn debug_count(words: &[u32], opcode: u32) -> usize {
    instructions(words)
        .iter()
        .filter(|(op, operands)| *op == EXT_INST && debug_opcode(operands) == Some(opcode))
        .count()
}

fn count(words: &[u32], opcode: u32) -> usize {
    instructions(words)
        .iter()
        .filter(|(op, _)| *op == opcode)
        .count()
}

fn function_variables(words: &[u32]) -> usize {
    instructions(words)
        .iter()
        .filter(|(op, operands)| *op == VARIABLE && operands.get(2) == Some(&7))
        .count()
}

fn code(words: &[u32]) -> Vec<u32> {
    let mut inside = false;
    let mut found = Vec::new();
    for (op, operands) in instructions(words) {
        if op == FUNCTION {
            inside = true;
        }
        if !inside || op == LINE || (op == EXT_INST && debug_opcode(&operands).is_some()) {
            continue;
        }
        found.push(op);
    }
    found
}

fn unlined(words: &[u32]) -> Vec<u32> {
    let mut found = Vec::new();
    let mut inside = false;
    let mut lined = false;
    let mut debug_set = None;
    for (op, operands) in instructions(words) {
        if op == 11 {
            debug_set = operands.first().copied();
        }
        match op {
            FUNCTION => inside = true,
            FUNCTION_END => inside = false,
            LABEL => lined = false,
            LINE => lined = true,
            EXT_INST if operands.get(2).copied() == debug_set => {
                if debug_opcode(&operands) == Some(DEBUG_LINE) {
                    lined = true;
                }
            }
            PHI | VARIABLE | 55 => {}
            _ if inside && !lined => found.push(op),
            _ => {}
        }
    }
    found
}

const INLINED: &str = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
float scale(float x) {
    float twice = x * 2.0;
    return twice + 1.0;
}
float both(float a) {
    float first = scale(a);
    return scale(first);
}
void main() {
    float value = both(inColor.x);
    color = vec4(value);
}
";

#[test]
fn inlined_code_is_in_the_callee_scope_inlined_at_the_call() -> TestResult {
    let output = compile(
        ShaderStage::Fragment,
        INLINED,
        Some(&["inline", "dce"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(count(&output.words, FUNCTION_CALL), 0);
    assert_eq!(debug_count(&output.words, DEBUG_INLINED_AT), 3);
    let inlined_scopes = instructions(&output.words)
        .into_iter()
        .filter(|(op, operands)| {
            *op == EXT_INST && debug_opcode(operands) == Some(DEBUG_SCOPE) && operands.len() == 6
        })
        .count();
    assert!(inlined_scopes >= 3, "{inlined_scopes}");
    let info = output.module.debug_info.as_deref().ok_or("no debug info")?;
    assert_eq!(info.inlined.len(), 3);
    let nested = info
        .inlined
        .iter()
        .filter(|region| info.origin(region.call).1.is_some())
        .count();
    assert_eq!(nested, 2);
    Ok(())
}

#[test]
fn the_locals_of_every_inlined_copy_share_one_debug_variable() -> TestResult {
    let output = compile(
        ShaderStage::Fragment,
        INLINED,
        Some(&["inline", "dce"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(debug_count(&output.words, DEBUG_LOCAL_VARIABLE), 5);
    assert_eq!(debug_count(&output.words, DEBUG_DECLARE), 7);
    Ok(())
}

#[test]
fn inlined_lines_are_those_of_the_callee() -> TestResult {
    let output = compile(
        ShaderStage::Fragment,
        INLINED,
        Some(&["inline"]),
        spv::DebugLevel::Lines,
    )?;
    let lines: Vec<u32> = instructions(&output.words)
        .into_iter()
        .filter(|&(op, _)| op == LINE)
        .filter_map(|(_, operands)| operands.get(1).copied())
        .collect();
    assert!(lines.contains(&5), "{lines:?}");
    assert!(lines.contains(&9), "{lines:?}");
    assert!(lines.iter().all(|&line| line <= 15), "{lines:?}");
    Ok(())
}

#[test]
fn forwarded_variables_are_described_by_debug_values() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float x = inColor.x * 2.0;
    float y = x + inColor.y;
    color = vec4(y);
}
";
    let output = compile(
        ShaderStage::Fragment,
        source,
        Some(&["forward", "dce"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(function_variables(&output.words), 0);
    assert_eq!(debug_count(&output.words, DEBUG_DECLARE), 0);
    assert_eq!(debug_count(&output.words, DEBUG_VALUE), 2);
    assert_eq!(debug_count(&output.words, DEBUG_LOCAL_VARIABLE), 2);
    Ok(())
}

#[test]
fn promoted_variables_are_described_at_stores_and_merges() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
void main() {
    float x = inColor.z;
    if (inColor.x > 0.5) {
        x = inColor.y;
    }
    color = vec4(x);
}
";
    let output = compile(
        ShaderStage::Fragment,
        source,
        Some(&["ssa"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(function_variables(&output.words), 0);
    assert_eq!(count(&output.words, PHI), 1);
    assert_eq!(debug_count(&output.words, DEBUG_DECLARE), 0);
    assert_eq!(debug_count(&output.words, DEBUG_VALUE), 3);
    assert_eq!(debug_count(&output.words, DEBUG_LOCAL_VARIABLE), 1);
    Ok(())
}

#[test]
fn dead_stores_of_constants_become_debug_values() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
void main() {
    float unused = 3.0;
    color = vec4(1.0);
}
";
    let output = compile(
        ShaderStage::Fragment,
        source,
        Some(&["dce"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(function_variables(&output.words), 0);
    assert_eq!(debug_count(&output.words, DEBUG_VALUE), 1);
    Ok(())
}

#[test]
fn split_aggregates_are_described_member_by_member() -> TestResult {
    let source = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 color;
struct Pair { float a; float b; };
void main() {
    Pair pair;
    pair.a = inColor.x;
    pair.b = inColor.y;
    color = vec4(pair.a, pair.b, 0.0, 1.0);
}
";
    let output = compile(
        ShaderStage::Fragment,
        source,
        Some(&["sroa", "forward", "dce"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(function_variables(&output.words), 0);
    let indexed = instructions(&output.words)
        .into_iter()
        .filter(|(op, operands)| {
            *op == EXT_INST && debug_opcode(operands) == Some(DEBUG_VALUE) && operands.len() == 8
        })
        .count();
    assert_eq!(indexed, 2);
    Ok(())
}

#[test]
fn constant_arrays_keep_their_names() -> TestResult {
    let source = "#version 450
layout(location = 0) flat in int index;
layout(location = 0) out vec4 color;
const float table[3] = float[3](1.0, 2.0, 3.0);
void main() {
    float first[3] = table;
    float second[3] = table;
    color = vec4(first[index], second[index], 0.0, 1.0);
}
";
    let output = compile(
        ShaderStage::Fragment,
        source,
        Some(&["forward", "const-array", "dce"]),
        spv::DebugLevel::NonSemantic,
    )?;
    assert!(function_variables(&output.words) <= 2);
    assert_eq!(debug_count(&output.words, DEBUG_LOCAL_VARIABLE), 2);
    assert_eq!(
        debug_count(&output.words, DEBUG_DECLARE) + debug_count(&output.words, DEBUG_VALUE),
        2
    );
    Ok(())
}

const EVERY_PASS: &str = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 1) flat in int index;
layout(location = 0) out vec4 color;
struct Light { vec4 position; float range; };
const bool enabled = false;
float attenuate(Light light, float d) {
    float ratio = d / light.range;
    return 1.0 - ratio * ratio;
}
void main() {
    Light light = Light(inColor, 4.0);
    float table[4] = float[4](0.1, 0.2, 0.3, 0.4);
    float sum = 0.0;
    for (int i = 0; i < 4; i++) {
        sum += attenuate(light, float(i)) * table[i];
    }
    if (enabled) {
        sum = 0.0;
    }
    float unused = sum * 3.0;
    color = light.position * sum + vec4(table[index & 3]);
}
";

#[test]
fn every_pass_runs_with_debug_variables() -> TestResult {
    let output = compile(
        ShaderStage::Fragment,
        EVERY_PASS,
        None,
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(count(&output.words, FUNCTION_CALL), 0);
    assert_eq!(count(&output.words, 246), 0);
    assert!(debug_count(&output.words, DEBUG_INLINED_AT) >= 1);
    assert!(debug_count(&output.words, DEBUG_VALUE) >= 1);
    Ok(())
}

#[test]
fn debug_variables_change_no_code() -> TestResult {
    let lines = compile(
        ShaderStage::Fragment,
        EVERY_PASS,
        None,
        spv::DebugLevel::Lines,
    )?;
    let variables = compile(
        ShaderStage::Fragment,
        EVERY_PASS,
        None,
        spv::DebugLevel::NonSemantic,
    )?;
    assert_eq!(code(&lines.words), code(&variables.words));
    let inlined = compile(
        ShaderStage::Fragment,
        INLINED,
        None,
        spv::DebugLevel::NonSemantic,
    )?;
    let inlined_lines = compile(ShaderStage::Fragment, INLINED, None, spv::DebugLevel::Lines)?;
    assert_eq!(code(&inlined_lines.words), code(&inlined.words));
    Ok(())
}

#[test]
fn every_optimized_instruction_has_a_line() -> TestResult {
    for level in [spv::DebugLevel::Lines, spv::DebugLevel::NonSemantic] {
        for source in [EVERY_PASS, INLINED] {
            let output = compile(ShaderStage::Fragment, source, None, level)?;
            assert_eq!(unlined(&output.words), Vec::<u32>::new(), "{level:?}");
        }
    }
    Ok(())
}
