use std::collections::BTreeMap;
use std::fmt::Write as _;

use anyhow::{Context, Result, bail};

use super::cpp::{self, Evaluator, Symbols};
use super::grammar::Grammar;

const RGLSL_ONLY_INSTRUCTIONS: &[&str] = &[
    "OpUCountLeadingZerosINTEL",
    "OpUCountTrailingZerosINTEL",
    "OpAbsISubINTEL",
    "OpAbsUSubINTEL",
    "OpIAddSatINTEL",
    "OpUAddSatINTEL",
    "OpIAverageINTEL",
    "OpUAverageINTEL",
    "OpIAverageRoundedINTEL",
    "OpUAverageRoundedINTEL",
    "OpISubSatINTEL",
    "OpUSubSatINTEL",
    "OpIMul32x16INTEL",
    "OpUMul32x16INTEL",
];

const PLAIN_CLASSES: &[&str] = &[
    "Id",
    "VariableIds",
    "OptionalLiteral",
    "VariableLiterals",
    "VariableIdLiteral",
    "VariableLiteralId",
    "LiteralNumber",
    "LiteralString",
    "VariableLiteralStrings",
];

const NAMED_ENUMS: &[&str] = &["BuiltIn"];

const CONSTANTS: &[(&str, &str)] = &[
    ("OP_NAME", "Op::OpName"),
    ("OP_EXT_INST_IMPORT", "Op::OpExtInstImport"),
    ("OP_EXT_INST", "Op::OpExtInst"),
    ("OP_TYPE_BOOL", "Op::OpTypeBool"),
    ("OP_TYPE_INT", "Op::OpTypeInt"),
    ("OP_TYPE_FLOAT", "Op::OpTypeFloat"),
    ("OP_TYPE_VECTOR", "Op::OpTypeVector"),
    ("OP_TYPE_IMAGE", "Op::OpTypeImage"),
    ("OP_TYPE_STRUCT", "Op::OpTypeStruct"),
    ("OP_TYPE_POINTER", "Op::OpTypePointer"),
    ("OP_TYPE_UNTYPED_POINTER_KHR", "Op::OpTypeUntypedPointerKHR"),
    ("OP_DECORATE", "Op::OpDecorate"),
    ("OP_MEMBER_DECORATE", "Op::OpMemberDecorate"),
    ("OP_LOOP_MERGE", "Op::OpLoopMerge"),
    ("OP_SELECTION_MERGE", "Op::OpSelectionMerge"),
    ("OP_BRANCH_CONDITIONAL", "Op::OpBranchConditional"),
    ("OP_SWITCH", "Op::OpSwitch"),
    ("DECORATION_BUILT_IN", "Decoration::BuiltIn"),
    ("MEMORY_ACCESS_ALIGNED", "MemoryAccessMask::Aligned"),
    (
        "MEMORY_ACCESS_MAKE_POINTER_AVAILABLE",
        "MemoryAccessMask::MakePointerAvailable",
    ),
    (
        "MEMORY_ACCESS_MAKE_POINTER_VISIBLE",
        "MemoryAccessMask::MakePointerVisible",
    ),
    ("FLOAT8_E4M3", "FPEncoding::Float8E4M3EXT"),
    ("FLOAT8_E5M2", "FPEncoding::Float8E5M2EXT"),
    ("FLOAT4_E2M1", "FPEncoding::Float4E2M1EXT"),
    ("FLOAT6_E3M2", "FPEncoding::Float6E3M2EXT"),
    ("FLOAT6_E2M3", "FPEncoding::Float6E2M3EXT"),
    ("FLOAT8_UNSIGNED_E8M0", "FPEncoding::Float8UnsignedE8M0EXT"),
    ("MX_INT8", "FPEncoding::MXInt8EXT"),
];

struct Instruction {
    name: Option<String>,
    result: bool,
    ty: bool,
    operands: Vec<String>,
}

impl Instruction {
    const fn new() -> Self {
        Self {
            name: None,
            result: true,
            ty: true,
            operands: Vec::new(),
        }
    }
}

struct EnumClass {
    ceiling: String,
    function: String,
    bitmask: bool,
}

pub struct Sources<'a> {
    pub doc: &'a str,
    pub disassemble: &'a str,
    pub symbols: &'a Symbols,
    pub grammar: &'a Grammar,
}

pub fn generate(sources: &Sources) -> Result<String> {
    let mut evaluator = Evaluator {
        symbols: sources.symbols,
        constants: BTreeMap::new(),
    };
    for raw in sources.doc.lines() {
        let line = cpp::strip_comment(raw).trim();
        let Some((name, expression)) = line
            .strip_prefix("const int ")
            .and_then(|rest| rest.split_once('='))
        else {
            continue;
        };
        let value = evaluator.eval(expression.trim().trim_end_matches(';'))?;
        evaluator.constants.insert(name.trim().to_string(), value);
    }

    let mut instructions: BTreeMap<u32, Instruction> = BTreeMap::new();
    for case in cpp::switch_cases(
        cpp::function_body(sources.doc, "const char* OpcodeString(int")?,
        &evaluator,
    )? {
        if case.name != "Bad" {
            instructions
                .entry(case.value)
                .or_insert_with(Instruction::new)
                .name = Some(case.name);
        }
    }
    let parameterize = cpp::function_body(sources.doc, "void Parameterize()")?;
    let mut used_kinds: Vec<String> = Vec::new();
    for raw in parameterize.lines() {
        let line = cpp::strip_comment(raw).trim();
        let Some(rest) = line.strip_prefix("InstructionDesc[enumCast(") else {
            continue;
        };
        let (opcode, call) = rest
            .split_once(")].")
            .with_context(|| format!("unexpected InstructionDesc line `{line}`"))?;
        let opcode = evaluator.eval(opcode)?;
        let instruction = instructions.entry(opcode).or_insert_with(Instruction::new);
        if let Some(arguments) = call.strip_prefix("setResultAndType(") {
            let (result, ty) = arguments
                .trim_end_matches(");")
                .split_once(',')
                .with_context(|| format!("unexpected setResultAndType in `{line}`"))?;
            instruction.result = boolean(result)?;
            instruction.ty = boolean(ty)?;
        } else if let Some(arguments) = call.strip_prefix("operands.push(Operand") {
            let class = arguments
                .split(',')
                .next()
                .unwrap_or_default()
                .trim()
                .to_string();
            if !PLAIN_CLASSES.contains(&class.as_str()) && !used_kinds.contains(&class) {
                used_kinds.push(class.clone());
            }
            instruction.operands.push(class);
        } else {
            bail!("unexpected InstructionDesc line `{line}`");
        }
    }
    for name in RGLSL_ONLY_INSTRUCTIONS {
        let grammar = sources
            .grammar
            .instruction(name)
            .with_context(|| format!("SPIRV-Headers has no instruction `{name}`"))?;
        if instructions.contains_key(&grammar.opcode) {
            bail!("glslang's disassembler knows `{name}`: remove it from RGLSL_ONLY_INSTRUCTIONS");
        }
        let mut instruction = Instruction {
            name: Some((*name).to_string()),
            result: false,
            ty: false,
            operands: Vec::new(),
        };
        for operand in &grammar.operands {
            match (operand.kind.as_str(), operand.quantifier.as_deref()) {
                ("IdResultType", None) => instruction.ty = true,
                ("IdResult", None) => instruction.result = true,
                ("IdRef", None) => instruction.operands.push("Id".to_string()),
                ("IdRef", Some("*")) => instruction.operands.push("VariableIds".to_string()),
                (kind, quantifier) => bail!(
                    "no glslang operand class for the operand {kind}{} of `{name}`",
                    quantifier.unwrap_or_default()
                ),
            }
        }
        instructions.insert(grammar.opcode, instruction);
    }

    let mut classes: BTreeMap<String, EnumClass> = BTreeMap::new();
    for raw in parameterize.lines() {
        let line = cpp::strip_comment(raw).trim();
        let Some(rest) = line.strip_prefix("OperandClassParams[Operand") else {
            continue;
        };
        let Some((class, call)) = rest.split_once("].set(") else {
            continue;
        };
        let arguments: Vec<&str> = call
            .trim_end_matches(");")
            .split(',')
            .map(str::trim)
            .collect();
        let (Some(ceiling), Some(function)) = (arguments.first(), arguments.get(1)) else {
            bail!("unexpected OperandClassParams line `{line}`");
        };
        classes.insert(
            class.to_string(),
            EnumClass {
                ceiling: (*ceiling).to_string(),
                function: (*function).to_string(),
                bitmask: arguments.get(3) == Some(&"true"),
            },
        );
    }

    let mut out = String::new();
    out.push_str("use super::tables::Class::*;\nuse super::tables::Kind::{self, *};\nuse super::tables::{EnumClass, Instruction, Names, op};\n\n");
    for (name, symbol) in CONSTANTS {
        writeln!(
            out,
            "pub(super) const {name}: u32 = {};",
            sources.symbols.value(symbol)?
        )?;
    }
    out.push_str("\npub(super) const INSTRUCTIONS: &[Instruction] = &[\n");
    for (opcode, instruction) in &instructions {
        let operands: Vec<String> = instruction
            .operands
            .iter()
            .map(|class| {
                if PLAIN_CLASSES.contains(&class.as_str()) {
                    class.clone()
                } else {
                    format!("Enum({class})")
                }
            })
            .collect();
        writeln!(
            out,
            "    op({opcode}, {:?}, {}, {}, &[{}]),",
            instruction.name.as_deref().unwrap_or("Bad"),
            instruction.result,
            instruction.ty,
            operands.join(", ")
        )?;
    }
    out.push_str("];\n\n");

    let mut kinds = used_kinds.clone();
    kinds.extend(NAMED_ENUMS.iter().map(|kind| (*kind).to_string()));
    for kind in &kinds {
        let class = classes
            .get(kind)
            .with_context(|| format!("glslang has no OperandClassParams for Operand{kind}"))?;
        let body = cpp::function_body(sources.doc, &format!("const char* {}(int", class.function))?;
        let mut names: BTreeMap<u32, String> = BTreeMap::new();
        for case in cpp::switch_cases(body, &evaluator)? {
            if case.name != "Bad" {
                names.insert(case.value, case.name);
            }
        }
        write_names(
            &mut out,
            &screaming(kind),
            names.iter().map(|(v, n)| (*v, n.as_str())),
        )?;
    }

    out.push_str("pub(super) const fn enum_class(kind: Kind) -> EnumClass {\n    match kind {\n");
    for kind in &used_kinds {
        let class = classes
            .get(kind)
            .with_context(|| format!("glslang has no OperandClassParams for Operand{kind}"))?;
        writeln!(
            out,
            "        {kind} => EnumClass {{ ceiling: {}, names: {}, bitmask: {} }},",
            evaluator.eval(&class.ceiling)?,
            screaming(kind),
            class.bitmask
        )?;
    }
    out.push_str("    }\n}\n\n");

    let glsl_body =
        cpp::function_body(sources.disassemble, "static void GLSLstd450GetDebugNames(")?;
    let count = sources.symbols.value("GLSLstd450Count")?;
    let mut glsl: Vec<&str> = vec!["Unknown"; usize::try_from(count)?];
    for raw in glsl_body.lines() {
        let line = cpp::strip_comment(raw).trim();
        let Some((index, name)) = line
            .strip_prefix("names[")
            .and_then(|rest| rest.split_once(']'))
        else {
            continue;
        };
        let name = name
            .trim()
            .trim_start_matches('=')
            .trim()
            .trim_end_matches(';')
            .trim_matches('"');
        if name == "Unknown" {
            continue;
        }
        let index = usize::try_from(sources.symbols.value(index)?)?;
        let slot = glsl
            .get_mut(index)
            .with_context(|| format!("GLSL.std.450 entry {index} is out of range"))?;
        *slot = name;
    }
    writeln!(out, "pub(super) const GLSL_STD_450: [&str; {count}] = [")?;
    for name in glsl {
        writeln!(out, "    {name:?},")?;
    }
    out.push_str("];\n\n");

    let amd = cpp::switch_cases(
        cpp::function_body(
            sources.disassemble,
            "static const char* GLSLextAMDGetDebugNames(const char* name",
        )?,
        &evaluator,
    )?;
    let mut sets: Vec<(String, Vec<(u32, String)>)> = Vec::new();
    for case in amd {
        let [set] = case.sets.as_slice() else {
            bail!("an AMD ext-inst name belongs to {} sets", case.sets.len());
        };
        match sets.iter_mut().find(|(name, _)| name == set) {
            Some((_, names)) => names.push((case.value, case.name)),
            None => sets.push((set.clone(), vec![(case.value, case.name)])),
        }
    }
    out.push_str("pub(super) const AMD: &[(&[u8], Names)] = &[\n");
    for (set, mut names) in sets {
        names.retain(|(_, name)| name != "Bad");
        names.sort();
        writeln!(out, "    (b{set:?}, &[")?;
        for (value, name) in names {
            writeln!(out, "        ({value}, {name:?}),")?;
        }
        out.push_str("    ]),\n");
    }
    out.push_str("];\n\n");

    let nv = cpp::switch_cases(
        cpp::function_body(
            sources.disassemble,
            "static const char* GLSLextNVGetDebugNames(const char* name",
        )?,
        &evaluator,
    )?;
    let nv_sets = nv.first().map(|case| case.sets.clone()).unwrap_or_default();
    if nv.iter().any(|case| case.sets != nv_sets) {
        bail!("the NV ext-inst names are not one table");
    }
    out.push_str("pub(super) const NV_SETS: &[&[u8]] = &[\n");
    for set in &nv_sets {
        writeln!(out, "    b{set:?},")?;
    }
    out.push_str("];\n\n");
    let mut nv_names: Vec<(u32, String)> = nv
        .into_iter()
        .filter(|case| case.name != "Bad")
        .map(|case| (case.value, case.name))
        .collect();
    nv_names.sort();
    write_names(
        &mut out,
        "NV",
        nv_names.iter().map(|(v, n)| (*v, n.as_str())),
    )?;

    let debug = cpp::switch_cases(
        cpp::function_body(
            sources.disassemble,
            "static const char* NonSemanticShaderDebugInfoGetDebugNames(unsigned",
        )?,
        &evaluator,
    )?;
    let mut debug_names: Vec<(u32, String)> = debug
        .into_iter()
        .filter(|case| case.name != "Bad")
        .map(|case| (case.value, case.name))
        .collect();
    debug_names.sort();
    write_names(
        &mut out,
        "SHADER_DEBUG_INFO",
        debug_names.iter().map(|(v, n)| (*v, n.as_str())),
    )?;
    Ok(format!("{}\n", out.trim_end()))
}

fn write_names<'a>(
    out: &mut String,
    table: &str,
    names: impl Iterator<Item = (u32, &'a str)>,
) -> Result<()> {
    writeln!(out, "pub(super) const {table}: Names = &[")?;
    for (value, name) in names {
        writeln!(out, "    ({value}, {name:?}),")?;
    }
    out.push_str("];\n\n");
    Ok(())
}

fn boolean(text: &str) -> Result<bool> {
    match text.trim() {
        "true" => Ok(true),
        "false" => Ok(false),
        other => bail!("`{other}` is not a boolean"),
    }
}

pub fn screaming(name: &str) -> String {
    let mut out = String::new();
    let mut previous_lower = false;
    for c in name.chars() {
        if c.is_ascii_uppercase() && previous_lower {
            out.push('_');
        }
        previous_lower = c.is_ascii_lowercase() || c.is_ascii_digit();
        out.push(c.to_ascii_uppercase());
    }
    out
}
