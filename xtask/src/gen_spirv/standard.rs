use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::path::Path;

use anyhow::{Context, Result, bail};
use serde_json::Value;

pub struct ExtSetSource {
    pub grammar: &'static str,
    pub import: &'static str,
    pub prefix: bool,
    pub non_semantic: bool,
}

pub const EXT_SETS: &[ExtSetSource] = &[
    ExtSetSource {
        grammar: "extinst.glsl.std.450",
        import: "GLSL.std.450",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.opencl.std.100",
        import: "OpenCL.std",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.spv-amd-shader-explicit-vertex-parameter",
        import: "SPV_AMD_shader_explicit_vertex_parameter",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.spv-amd-shader-trinary-minmax",
        import: "SPV_AMD_shader_trinary_minmax",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.spv-amd-gcn-shader",
        import: "SPV_AMD_gcn_shader",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.spv-amd-shader-ballot",
        import: "SPV_AMD_shader_ballot",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.debuginfo",
        import: "DebugInfo",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.opencl.debuginfo.100",
        import: "OpenCL.DebugInfo.100",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.nonsemantic.shader.debuginfo",
        import: "NonSemantic.Shader.DebugInfo.",
        prefix: true,
        non_semantic: true,
    },
    ExtSetSource {
        grammar: "extinst.nonsemantic.graph.debuginfo",
        import: "NonSemantic.Graph.DebugInfo.",
        prefix: true,
        non_semantic: true,
    },
    ExtSetSource {
        grammar: "extinst.nonsemantic.clspvreflection",
        import: "NonSemantic.ClspvReflection.",
        prefix: true,
        non_semantic: true,
    },
    ExtSetSource {
        grammar: "extinst.nonsemantic.vkspreflection",
        import: "NonSemantic.VkspReflection.",
        prefix: true,
        non_semantic: true,
    },
    ExtSetSource {
        grammar: "extinst.tosa.001000.1",
        import: "TOSA.001000.1",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.arm.motion-engine.100",
        import: "Arm.MotionEngine.100",
        prefix: false,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.arm.experimental-ml-operations",
        import: "Arm.ExperimentalMLOperations.",
        prefix: true,
        non_semantic: false,
    },
    ExtSetSource {
        grammar: "extinst.nonsemantic.debugprintf",
        import: "NonSemantic.DebugPrintf",
        prefix: false,
        non_semantic: true,
    },
];

const UNKNOWN_NON_SEMANTIC: &str = "NonSemantic.";

const OPCODES: &[(&str, &str)] = &[
    ("OP_NAME", "OpName"),
    ("OP_DECORATE", "OpDecorate"),
    ("OP_EXT_INST_IMPORT", "OpExtInstImport"),
    ("OP_EXT_INST", "OpExtInst"),
    (
        "OP_EXT_INST_WITH_FORWARD_REFS",
        "OpExtInstWithForwardRefsKHR",
    ),
    ("OP_SWITCH", "OpSwitch"),
    ("OP_CONSTANT", "OpConstant"),
    ("OP_CONSTANT_TRUE", "OpConstantTrue"),
    ("OP_CONSTANT_FALSE", "OpConstantFalse"),
    ("OP_TYPE_VOID", "OpTypeVoid"),
    ("OP_TYPE_BOOL", "OpTypeBool"),
    ("OP_TYPE_INT", "OpTypeInt"),
    ("OP_TYPE_FLOAT", "OpTypeFloat"),
    ("OP_TYPE_VECTOR", "OpTypeVector"),
    ("OP_TYPE_MATRIX", "OpTypeMatrix"),
    ("OP_TYPE_ARRAY", "OpTypeArray"),
    ("OP_TYPE_RUNTIME_ARRAY", "OpTypeRuntimeArray"),
    ("OP_TYPE_NODE_PAYLOAD_ARRAY", "OpTypeNodePayloadArrayAMDX"),
    ("OP_TYPE_POINTER", "OpTypePointer"),
    ("OP_TYPE_UNTYPED_POINTER", "OpTypeUntypedPointerKHR"),
    ("OP_TYPE_PIPE", "OpTypePipe"),
    ("OP_TYPE_EVENT", "OpTypeEvent"),
    ("OP_TYPE_DEVICE_EVENT", "OpTypeDeviceEvent"),
    ("OP_TYPE_RESERVE_ID", "OpTypeReserveId"),
    ("OP_TYPE_QUEUE", "OpTypeQueue"),
    ("OP_TYPE_OPAQUE", "OpTypeOpaque"),
    ("OP_TYPE_PIPE_STORAGE", "OpTypePipeStorage"),
    ("OP_TYPE_NAMED_BARRIER", "OpTypeNamedBarrier"),
    ("OP_TYPE_STRUCT", "OpTypeStruct"),
];

const ENUMERANTS: &[(&str, &str, &str)] = &[
    ("DECORATION_BUILT_IN", "Decoration", "BuiltIn"),
    ("FP_ENCODING_BFLOAT16", "FPEncoding", "BFloat16KHR"),
    ("FP_ENCODING_FLOAT8_E4M3", "FPEncoding", "Float8E4M3EXT"),
    ("FP_ENCODING_FLOAT8_E5M2", "FPEncoding", "Float8E5M2EXT"),
    ("FP_ENCODING_FLOAT6_E2M3", "FPEncoding", "Float6E2M3EXT"),
    ("FP_ENCODING_FLOAT6_E3M2", "FPEncoding", "Float6E3M2EXT"),
    ("FP_ENCODING_FLOAT4_E2M1", "FPEncoding", "Float4E2M1EXT"),
    (
        "FP_ENCODING_FLOAT8_E8M0",
        "FPEncoding",
        "Float8UnsignedE8M0EXT",
    ),
    ("FP_ENCODING_MXINT8", "FPEncoding", "MXInt8EXT"),
];

const NAMED_KINDS: &[(&str, &str)] = &[
    ("STORAGE_CLASS", "StorageClass"),
    ("ACCESS_QUALIFIER", "AccessQualifier"),
];

const BUILT_IN_NAMES: &[(&str, &str)] = &[
    ("Position", "gl_Position"),
    ("PointSize", "gl_PointSize"),
    ("ClipDistance", "gl_ClipDistance"),
    ("CullDistance", "gl_CullDistance"),
    ("VertexId", "gl_VertexID"),
    ("InstanceId", "gl_InstanceID"),
    ("PrimitiveId", "gl_PrimitiveID"),
    ("InvocationId", "gl_InvocationID"),
    ("Layer", "gl_Layer"),
    ("ViewportIndex", "gl_ViewportIndex"),
    ("TessLevelOuter", "gl_TessLevelOuter"),
    ("TessLevelInner", "gl_TessLevelInner"),
    ("TessCoord", "gl_TessCoord"),
    ("PatchVertices", "gl_PatchVertices"),
    ("FragCoord", "gl_FragCoord"),
    ("PointCoord", "gl_PointCoord"),
    ("FrontFacing", "gl_FrontFacing"),
    ("SampleId", "gl_SampleID"),
    ("SamplePosition", "gl_SamplePosition"),
    ("SampleMask", "gl_SampleMask"),
    ("FragDepth", "gl_FragDepth"),
    ("HelperInvocation", "gl_HelperInvocation"),
    ("NumWorkgroups", "gl_NumWorkGroups"),
    ("WorkgroupSize", "gl_WorkGroupSize"),
    ("WorkgroupId", "gl_WorkGroupID"),
    ("LocalInvocationId", "gl_LocalInvocationID"),
    ("GlobalInvocationId", "gl_GlobalInvocationID"),
    ("LocalInvocationIndex", "gl_LocalInvocationIndex"),
    ("WorkDim", "WorkDim"),
    ("GlobalSize", "GlobalSize"),
    ("EnqueuedWorkgroupSize", "EnqueuedWorkgroupSize"),
    ("GlobalOffset", "GlobalOffset"),
    ("GlobalLinearId", "GlobalLinearId"),
    ("SubgroupSize", "SubgroupSize"),
    ("SubgroupMaxSize", "SubgroupMaxSize"),
    ("NumSubgroups", "NumSubgroups"),
    ("NumEnqueuedSubgroups", "NumEnqueuedSubgroups"),
    ("SubgroupId", "SubgroupId"),
    ("SubgroupLocalInvocationId", "SubgroupLocalInvocationId"),
    ("VertexIndex", "gl_VertexIndex"),
    ("InstanceIndex", "gl_InstanceIndex"),
    ("BaseInstance", "gl_BaseInstance"),
    ("SubgroupEqMaskKHR", "SubgroupEqMaskKHR"),
    ("SubgroupGeMaskKHR", "SubgroupGeMaskKHR"),
    ("SubgroupGtMaskKHR", "SubgroupGtMaskKHR"),
    ("SubgroupLeMaskKHR", "SubgroupLeMaskKHR"),
    ("SubgroupLtMaskKHR", "SubgroupLtMaskKHR"),
];

type Enumerants = Vec<(u32, String, Vec<String>)>;

struct Kinds {
    aliases: BTreeMap<(String, String), u32>,
    indices: BTreeMap<(Option<usize>, String), (usize, bool)>,
    tables: Vec<(bool, Enumerants)>,
}

fn load(path: &Path) -> Result<Value> {
    let text =
        std::fs::read_to_string(path).with_context(|| format!("cannot read {}", path.display()))?;
    serde_json::from_str(&text).with_context(|| format!("{} is not JSON", path.display()))
}

fn number(value: Option<&Value>) -> Option<u32> {
    match value? {
        Value::Number(number) => number.as_u64().and_then(|n| u32::try_from(n).ok()),
        Value::String(text) => super::cpp::parse_integer(text),
        _ => None,
    }
}

fn text(value: Option<&Value>) -> String {
    value
        .and_then(Value::as_str)
        .map(String::from)
        .unwrap_or_default()
}

fn rust_string(value: &str) -> String {
    format!("{value:?}")
}

impl Kinds {
    fn add(&mut self, grammar: Option<usize>, json: &Value) -> Result<()> {
        let Some(kinds) = json.get("operand_kinds").and_then(Value::as_array) else {
            return Ok(());
        };
        for kind in kinds {
            let category = text(kind.get("category"));
            let mask = match category.as_str() {
                "ValueEnum" => false,
                "BitEnum" => true,
                _ => continue,
            };
            let name = text(kind.get("kind"));
            let mut enumerants = Vec::new();
            for enumerant in kind
                .get("enumerants")
                .and_then(Value::as_array)
                .into_iter()
                .flatten()
            {
                let value = number(enumerant.get("value"))
                    .with_context(|| format!("an enumerant of {name} has no value"))?;
                let parameters = enumerant
                    .get("parameters")
                    .and_then(Value::as_array)
                    .map(|parameters| {
                        parameters
                            .iter()
                            .map(|parameter| {
                                let kind = text(parameter.get("kind"));
                                let quantifier = text(parameter.get("quantifier"));
                                format!("{kind}{quantifier}")
                            })
                            .collect()
                    })
                    .unwrap_or_default();
                if grammar.is_none() {
                    for alias in enumerant
                        .get("aliases")
                        .and_then(Value::as_array)
                        .into_iter()
                        .flatten()
                        .filter_map(Value::as_str)
                    {
                        self.aliases.insert((name.clone(), alias.to_owned()), value);
                    }
                }
                enumerants.push((value, text(enumerant.get("enumerant")), parameters));
            }
            enumerants.sort_by_key(|&(value, _, _)| value);
            enumerants.dedup_by_key(|entry| entry.0);
            self.indices
                .insert((grammar, name), (self.tables.len(), mask));
            self.tables.push((mask, enumerants));
        }
        Ok(())
    }

    fn operand(&self, grammar: Option<usize>, kind: &str, quantifier: &str) -> Result<String> {
        let quantifier = match quantifier {
            "" => "One",
            "?" => "Optional",
            "*" => "Variable",
            other => bail!("unknown quantifier {other}"),
        };
        let kind = match kind {
            "IdResultType" => String::from("TypeId"),
            "IdResult" => String::from("ResultId"),
            "IdRef" | "IdMemorySemantics" | "IdScope" | "PairIdRefIdRef" => String::from("Id"),
            "LiteralInteger" => String::from("LiteralInteger"),
            "LiteralFloat" => String::from("LiteralFloat"),
            "LiteralString" => String::from("LiteralString"),
            "LiteralContextDependentNumber" => String::from("TypedNumber"),
            "LiteralExtInstInteger" => String::from("ExtInstNumber"),
            "LiteralSpecConstantOpInteger" => String::from("SpecConstantOp"),
            "PairLiteralIntegerIdRef" => String::from("PairNumberId"),
            "PairIdRefLiteralInteger" => String::from("PairIdInteger"),
            other => {
                let &(index, mask) = self
                    .indices
                    .get(&(grammar, other.to_owned()))
                    .or_else(|| self.indices.get(&(None, other.to_owned())))
                    .with_context(|| format!("unknown operand kind {other}"))?;
                if mask {
                    format!("Mask({index})")
                } else {
                    format!("Enum({index})")
                }
            }
        };
        Ok(format!("Operand({kind}, {quantifier})"))
    }

    fn operands(&self, grammar: Option<usize>, operands: &[(String, String)]) -> Result<String> {
        let list = operands
            .iter()
            .map(|(kind, quantifier)| self.operand(grammar, kind, quantifier))
            .collect::<Result<Vec<_>>>()?;
        Ok(format!("&[{}]", list.join(", ")))
    }

    fn value(&self, kind: &str, name: &str) -> Result<u32> {
        let &(index, _) = self
            .indices
            .get(&(None, kind.to_owned()))
            .with_context(|| format!("unknown operand kind {kind}"))?;
        self.tables
            .get(index)
            .and_then(|(_, enumerants)| {
                enumerants
                    .iter()
                    .find(|(_, candidate, _)| candidate == name)
                    .map(|&(value, _, _)| value)
            })
            .or_else(|| {
                self.aliases
                    .get(&(kind.to_owned(), name.to_owned()))
                    .copied()
            })
            .with_context(|| format!("{kind} has no enumerant {name}"))
    }
}

fn instruction_operands(instruction: &Value) -> Vec<(String, String)> {
    instruction
        .get("operands")
        .and_then(Value::as_array)
        .map(|operands| {
            operands
                .iter()
                .map(|operand| (text(operand.get("kind")), text(operand.get("quantifier"))))
                .collect()
        })
        .unwrap_or_default()
}

fn split_parameter(parameter: &str) -> (String, String) {
    match parameter.strip_suffix('?') {
        Some(kind) => (kind.to_owned(), String::from("?")),
        None => match parameter.strip_suffix('*') {
            Some(kind) => (kind.to_owned(), String::from("*")),
            None => (parameter.to_owned(), String::new()),
        },
    }
}

fn generators(registry: &str) -> Vec<(u32, String)> {
    let mut found = Vec::new();
    let Some(start) = registry.find("<ids type=\"vendor\"") else {
        return found;
    };
    let section = registry.get(start..).unwrap_or_default();
    let section = section
        .find("</ids>")
        .and_then(|end| section.get(..end))
        .unwrap_or(section);
    for line in section.split("<id ").skip(1) {
        let attribute = |name: &str| {
            let key = format!("{name}=\"");
            line.find(&key).and_then(|position| {
                let rest = line.get(position + key.len()..)?;
                rest.find('"').and_then(|end| rest.get(..end))
            })
        };
        let (Some(value), Some(vendor)) = (attribute("value"), attribute("vendor")) else {
            continue;
        };
        let Ok(value) = value.parse::<u32>() else {
            continue;
        };
        let name = match attribute("tool") {
            Some(tool) => format!("{vendor} {tool}"),
            None => vendor.to_owned(),
        };
        found.push((value, name.replace("&amp;", "&")));
    }
    found
}

pub fn generate(unified: &Path, registry: &str) -> Result<String> {
    let core = load(&unified.join("spirv.core.grammar.json"))?;
    let mut sets = Vec::new();
    for set in EXT_SETS {
        sets.push(load(
            &unified.join(format!("{}.grammar.json", set.grammar)),
        )?);
    }
    let mut kinds = Kinds {
        aliases: BTreeMap::new(),
        indices: BTreeMap::new(),
        tables: Vec::new(),
    };
    kinds.add(None, &core)?;
    for (index, set) in sets.iter().enumerate() {
        kinds.add(Some(index), set)?;
    }

    let mut out = String::new();
    out.push_str(
        "use super::tables::Kind::{self, *};\nuse super::tables::Quantifier::*;\nuse super::tables::{Enumerant, EnumKind, ExtInstruction, ExtSet, Instruction, Operand};\n\n",
    );

    let mut instructions: Vec<(u32, String, bool, String)> = Vec::new();
    let mut opcodes: BTreeMap<String, u32> = BTreeMap::new();
    for instruction in core
        .get("instructions")
        .and_then(Value::as_array)
        .context("the core grammar has no instructions")?
    {
        let opcode = number(instruction.get("opcode")).context("an instruction has no opcode")?;
        let name = text(instruction.get("opname"));
        let mut operands = instruction_operands(instruction);
        if name == "OpExtInst"
            && operands
                .last()
                .is_some_and(|(kind, quantifier)| kind == "IdRef" && quantifier == "*")
        {
            operands.pop();
        }
        let type_declaration =
            text(instruction.get("class")) == "Type-Declaration" && name != "OpTypeForwardPointer";
        opcodes.insert(name.clone(), opcode);
        instructions.push((
            opcode,
            name.get(2..).unwrap_or_default().to_owned(),
            type_declaration,
            kinds.operands(None, &operands)?,
        ));
    }
    instructions.sort_by_key(|&(opcode, _, _, _)| opcode);
    instructions.dedup_by_key(|entry| entry.0);

    for &(constant, name) in OPCODES {
        let opcode = opcodes
            .get(name)
            .with_context(|| format!("the core grammar has no {name}"))?;
        let _ = writeln!(out, "pub(super) const {constant}: u32 = {opcode};");
    }
    for &(constant, kind, name) in ENUMERANTS {
        let _ = writeln!(
            out,
            "pub(super) const {constant}: u32 = {};",
            kinds.value(kind, name)?
        );
    }
    for &(constant, kind) in NAMED_KINDS {
        let &(index, _) = kinds
            .indices
            .get(&(None, kind.to_owned()))
            .with_context(|| format!("unknown operand kind {kind}"))?;
        let _ = writeln!(out, "pub(super) const {constant}: Kind = Enum({index});");
    }

    out.push_str("\npub(super) static INSTRUCTIONS: &[Instruction] = &[\n");
    for (opcode, name, type_declaration, operands) in &instructions {
        let _ = writeln!(
            out,
            "    Instruction {{ opcode: {opcode}, name: {}, type_declaration: {type_declaration}, operands: {operands} }},",
            rust_string(name)
        );
    }
    out.push_str("];\n\npub(super) static KINDS: &[EnumKind] = &[\n");
    let grammar_of: BTreeMap<usize, Option<usize>> = kinds
        .indices
        .iter()
        .map(|(&(grammar, _), &(index, _))| (index, grammar))
        .collect();
    for (index, (_, enumerants)) in kinds.tables.iter().enumerate() {
        let grammar = grammar_of.get(&index).copied().flatten();
        let _ = writeln!(out, "    EnumKind {{ enumerants: &[");
        for (value, name, parameters) in enumerants {
            let parameters: Vec<(String, String)> = parameters
                .iter()
                .map(|parameter| split_parameter(parameter))
                .collect();
            let _ = writeln!(
                out,
                "        Enumerant {{ value: {value}, name: {}, parameters: {} }},",
                rust_string(name),
                kinds.operands(grammar, &parameters)?
            );
        }
        out.push_str("    ] },\n");
    }
    out.push_str("];\n\npub(super) static EXT_SETS: &[ExtSet] = &[\n");
    for (index, (source, set)) in EXT_SETS.iter().zip(&sets).enumerate() {
        let mut entries: Vec<(u32, String, String)> = Vec::new();
        for instruction in set
            .get("instructions")
            .and_then(Value::as_array)
            .into_iter()
            .flatten()
        {
            let opcode = number(instruction.get("opcode"))
                .with_context(|| format!("an instruction of {} has no opcode", source.grammar))?;
            entries.push((
                opcode,
                text(instruction.get("opname")),
                kinds.operands(Some(index), &instruction_operands(instruction))?,
            ));
        }
        entries.sort_by_key(|&(opcode, _, _)| opcode);
        entries.dedup_by_key(|entry| entry.0);
        let _ = writeln!(
            out,
            "    ExtSet {{ import: {}, prefix: {}, non_semantic: {}, instructions: &[",
            rust_string(source.import),
            source.prefix,
            source.non_semantic
        );
        for (opcode, name, operands) in entries {
            let _ = writeln!(
                out,
                "        ExtInstruction {{ number: {opcode}, name: {}, operands: {operands} }},",
                rust_string(&name)
            );
        }
        out.push_str("    ] },\n");
    }
    let _ = writeln!(
        out,
        "    ExtSet {{ import: {}, prefix: true, non_semantic: true, instructions: &[] }},",
        rust_string(UNKNOWN_NON_SEMANTIC)
    );
    out.push_str("];\n\npub(super) static GENERATORS: &[(u32, &str)] = &[\n");
    for (value, name) in generators(registry) {
        let _ = writeln!(out, "    ({value}, {}),", rust_string(&name));
    }
    out.push_str("];\n\npub(super) static BUILT_IN_NAMES: &[(u32, &str)] = &[\n");
    for &(built_in, name) in BUILT_IN_NAMES {
        let _ = writeln!(
            out,
            "    ({}, {}),",
            kinds.value("BuiltIn", built_in)?,
            rust_string(name)
        );
    }
    out.push_str("];\n");
    Ok(out)
}
