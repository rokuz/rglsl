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
    let evaluator = doc_constants(sources)?;
    let parameterize = cpp::function_body(sources.doc, "void Parameterize()")?;
    let (instructions, used_kinds) = instructions(sources, &evaluator, parameterize)?;
    let classes = enum_classes(parameterize)?;

    let mut out = String::new();
    out.push_str("use super::tables::Class::*;\nuse super::tables::Kind::{self, *};\nuse super::tables::{EnumClass, Instruction, Names, op};\n\n");
    write_constants(&mut out, sources)?;
    write_instructions(&mut out, &instructions)?;
    write_enum_names(&mut out, sources, &evaluator, &classes, &used_kinds)?;
    write_enum_classes(&mut out, &evaluator, &classes, &used_kinds)?;
    write_glsl_std_450(&mut out, sources)?;
    write_amd(&mut out, sources, &evaluator)?;
    write_nv(&mut out, sources, &evaluator)?;
    write_shader_debug_info(&mut out, sources, &evaluator)?;
    Ok(format!("{}\n", out.trim_end()))
}

fn doc_constants<'a>(sources: &Sources<'a>) -> Result<Evaluator<'a>> {
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
    Ok(evaluator)
}

fn instructions(
    sources: &Sources,
    evaluator: &Evaluator,
    parameterize: &str,
) -> Result<(BTreeMap<u32, Instruction>, Vec<String>)> {
    let mut instructions: BTreeMap<u32, Instruction> = BTreeMap::new();
    for case in cpp::switch_cases(
        cpp::function_body(sources.doc, "const char* OpcodeString(int")?,
        evaluator,
    )? {
        if case.name != "Bad" {
            instructions
                .entry(case.value)
                .or_insert_with(Instruction::new)
                .name = Some(case.name);
        }
    }
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
        let (opcode, instruction) = rglsl_only_instruction(sources.grammar, name)?;
        if instructions.contains_key(&opcode) {
            bail!("glslang's disassembler knows `{name}`: remove it from RGLSL_ONLY_INSTRUCTIONS");
        }
        instructions.insert(opcode, instruction);
    }
    if used_kinds.is_empty() {
        bail!("glslang's Parameterize() names no enumerated operand classes");
    }
    Ok((instructions, used_kinds))
}

fn rglsl_only_instruction(grammar: &Grammar, name: &str) -> Result<(u32, Instruction)> {
    let described = grammar
        .instruction(name)
        .with_context(|| format!("SPIRV-Headers has no instruction `{name}`"))?;
    let mut instruction = Instruction {
        name: Some(name.to_string()),
        result: false,
        ty: false,
        operands: Vec::new(),
    };
    for operand in &described.operands {
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
    Ok((described.opcode, instruction))
}

fn enum_classes(parameterize: &str) -> Result<BTreeMap<String, EnumClass>> {
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
    Ok(classes)
}

fn write_constants(out: &mut String, sources: &Sources) -> Result<()> {
    for (name, symbol) in CONSTANTS {
        writeln!(
            out,
            "pub(super) const {name}: u32 = {};",
            sources.symbols.value(symbol)?
        )?;
    }
    Ok(())
}

fn write_instructions(out: &mut String, instructions: &BTreeMap<u32, Instruction>) -> Result<()> {
    if instructions.is_empty() {
        bail!("glslang's OpcodeString() names no instructions");
    }
    out.push_str("\npub(super) const INSTRUCTIONS: &[Instruction] = &[\n");
    for (opcode, instruction) in instructions {
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
    Ok(())
}

fn class<'a>(classes: &'a BTreeMap<String, EnumClass>, kind: &str) -> Result<&'a EnumClass> {
    classes
        .get(kind)
        .with_context(|| format!("glslang has no OperandClassParams for Operand{kind}"))
}

fn write_enum_names(
    out: &mut String,
    sources: &Sources,
    evaluator: &Evaluator,
    classes: &BTreeMap<String, EnumClass>,
    used_kinds: &[String],
) -> Result<()> {
    let kinds = used_kinds
        .iter()
        .map(String::as_str)
        .chain(NAMED_ENUMS.iter().copied());
    for kind in kinds {
        let class = class(classes, kind)?;
        let body = cpp::function_body(sources.doc, &format!("const char* {}(int", class.function))?;
        let mut names: BTreeMap<u32, String> = BTreeMap::new();
        for case in cpp::switch_cases(body, evaluator)? {
            if case.name != "Bad" {
                names.insert(case.value, case.name);
            }
        }
        write_names(
            out,
            &screaming(kind),
            names.iter().map(|(v, n)| (*v, n.as_str())),
        )?;
    }
    Ok(())
}

fn write_enum_classes(
    out: &mut String,
    evaluator: &Evaluator,
    classes: &BTreeMap<String, EnumClass>,
    used_kinds: &[String],
) -> Result<()> {
    out.push_str("pub(super) const fn enum_class(kind: Kind) -> EnumClass {\n    match kind {\n");
    for kind in used_kinds {
        let class = class(classes, kind)?;
        writeln!(
            out,
            "        {kind} => EnumClass {{ ceiling: {}, names: {}, bitmask: {} }},",
            evaluator.eval(&class.ceiling)?,
            screaming(kind),
            class.bitmask
        )?;
    }
    out.push_str("    }\n}\n\n");
    Ok(())
}

fn write_glsl_std_450(out: &mut String, sources: &Sources) -> Result<()> {
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
    if glsl.iter().all(|&name| name == "Unknown") {
        bail!("glslang's GLSLstd450GetDebugNames() names no instructions");
    }
    writeln!(out, "pub(super) const GLSL_STD_450: [&str; {count}] = [")?;
    for name in glsl {
        writeln!(out, "    {name:?},")?;
    }
    out.push_str("];\n\n");
    Ok(())
}

fn write_amd(out: &mut String, sources: &Sources, evaluator: &Evaluator) -> Result<()> {
    let amd = cpp::switch_cases(
        cpp::function_body(
            sources.disassemble,
            "static const char* GLSLextAMDGetDebugNames(const char* name",
        )?,
        evaluator,
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
    if sets.is_empty() {
        bail!("glslang's GLSLextAMDGetDebugNames() names no instruction sets");
    }
    out.push_str("pub(super) const AMD: &[(&[u8], Names)] = &[\n");
    for (set, mut names) in sets {
        names.retain(|(_, name)| name != "Bad");
        if names.is_empty() {
            bail!("glslang names no instructions of {set}");
        }
        names.sort();
        writeln!(out, "    (b{set:?}, &[")?;
        for (value, name) in names {
            writeln!(out, "        ({value}, {name:?}),")?;
        }
        out.push_str("    ]),\n");
    }
    out.push_str("];\n\n");
    Ok(())
}

fn write_nv(out: &mut String, sources: &Sources, evaluator: &Evaluator) -> Result<()> {
    write_sets(
        out,
        "NV_IMPORT_SETS",
        &nv_import_sets(sources.disassemble, sources.symbols)?,
    )?;
    let nv = cpp::switch_cases(
        cpp::function_body(
            sources.disassemble,
            "static const char* GLSLextNVGetDebugNames(const char* name",
        )?,
        evaluator,
    )?;
    let nv_sets = nv.first().map(|case| case.sets.clone()).unwrap_or_default();
    if nv.iter().any(|case| case.sets != nv_sets) {
        bail!("the NV ext-inst names are not one table");
    }
    write_sets(out, "NV_SETS", &nv_sets)?;
    let mut nv_names: Vec<(u32, String)> = nv
        .into_iter()
        .filter(|case| case.name != "Bad")
        .map(|case| (case.value, case.name))
        .collect();
    nv_names.sort();
    write_names(out, "NV", nv_names.iter().map(|(v, n)| (*v, n.as_str())))
}

fn nv_import_sets(disassemble: &str, symbols: &Symbols) -> Result<Vec<String>> {
    let marker = "extInstSet = GLSLextNVInst;";
    let end = disassemble
        .find(marker)
        .with_context(|| format!("glslang's disassembler has no `{marker}`"))?;
    let head = disassemble.get(..end).unwrap_or_default();
    let start = head
        .rfind("else if (")
        .with_context(|| format!("no condition before `{marker}`"))?;
    let condition = head.get(start..).unwrap_or_default();
    let mut sets = Vec::new();
    for (index, _) in condition.match_indices("spv::") {
        let symbol: String = condition
            .get(index + "spv::".len()..)
            .unwrap_or_default()
            .chars()
            .take_while(|&c| c.is_ascii_alphanumeric() || c == '_')
            .collect();
        sets.push(symbols.string(&symbol)?.to_string());
    }
    Ok(sets)
}

fn write_sets(out: &mut String, table: &str, sets: &[String]) -> Result<()> {
    if sets.is_empty() {
        bail!("the generated table {table} is empty");
    }
    writeln!(out, "pub(super) const {table}: &[&[u8]] = &[")?;
    for set in sets {
        writeln!(out, "    b{set:?},")?;
    }
    out.push_str("];\n\n");
    Ok(())
}

fn write_shader_debug_info(
    out: &mut String,
    sources: &Sources,
    evaluator: &Evaluator,
) -> Result<()> {
    let debug = cpp::switch_cases(
        cpp::function_body(
            sources.disassemble,
            "static const char* NonSemanticShaderDebugInfoGetDebugNames(unsigned",
        )?,
        evaluator,
    )?;
    let mut debug_names: Vec<(u32, String)> = debug
        .into_iter()
        .filter(|case| case.name != "Bad")
        .map(|case| (case.value, case.name))
        .collect();
    debug_names.sort();
    write_names(
        out,
        "SHADER_DEBUG_INFO",
        debug_names.iter().map(|(v, n)| (*v, n.as_str())),
    )
}

fn write_names<'a>(
    out: &mut String,
    table: &str,
    names: impl Iterator<Item = (u32, &'a str)>,
) -> Result<()> {
    let mut names = names.peekable();
    if names.peek().is_none() {
        bail!("the generated table {table} is empty");
    }
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
