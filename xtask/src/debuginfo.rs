use std::collections::{BTreeMap, BTreeSet};
use std::path::Path;

use anyhow::{bail, Context, Result};

const OP_STRING: u32 = 7;
const OP_LINE: u32 = 8;
const OP_SOURCE: u32 = 3;
const OP_SOURCE_EXTENSION: u32 = 4;
const OP_EXT_INST_IMPORT: u32 = 11;
const OP_EXT_INST: u32 = 12;
const OP_EXT_INST_WITH_FORWARD_REFS: u32 = 4433;
const OP_TYPE_INT: u32 = 21;
const OP_CONSTANT: u32 = 43;
const OP_FUNCTION: u32 = 54;
const OP_FUNCTION_END: u32 = 56;

const NON_SEMANTIC: &str = "NonSemantic.Shader.DebugInfo.";

#[derive(Debug, Default)]
pub struct Comparison {
    pub missing: Vec<String>,
    pub extra: Vec<String>,
}

impl Comparison {
    pub fn matches(&self) -> bool {
        self.missing.is_empty() && self.extra.is_empty()
    }

    pub fn note(&self) -> String {
        let first = |facts: &[String]| facts.first().cloned().unwrap_or_default();
        format!(
            "debug info differs from glslang: {} missing (first: {}), {} extra (first: {})",
            self.missing.len(),
            first(&self.missing),
            self.extra.len(),
            first(&self.extra)
        )
    }
}

pub fn compare(ours: &Path, reference: &Path) -> Result<Comparison> {
    let ours = facts(&read_words(ours)?)?;
    let reference = facts(&read_words(reference)?)?;
    Ok(Comparison {
        missing: reference.difference(&ours).cloned().collect(),
        extra: ours.difference(&reference).cloned().collect(),
    })
}

fn read_words(path: &Path) -> Result<Vec<u32>> {
    let bytes = std::fs::read(path).with_context(|| format!("reading {}", path.display()))?;
    if bytes.len() % 4 != 0 {
        bail!("{} is not a SPIR-V module", path.display());
    }
    Ok(bytes
        .chunks_exact(4)
        .map(|chunk| u32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
        .collect())
}

struct Instruction<'a> {
    opcode: u32,
    words: &'a [u32],
}

fn instructions(words: &[u32]) -> Result<Vec<Instruction<'_>>> {
    let Some(body) = words.get(5..) else {
        bail!("SPIR-V module without a header");
    };
    let mut found = Vec::new();
    let mut rest = body;
    while let Some(&first) = rest.first() {
        let count = usize::try_from(first >> 16)?;
        if count == 0 || count > rest.len() {
            bail!("malformed SPIR-V instruction");
        }
        let (current, tail) = rest.split_at(count);
        found.push(Instruction {
            opcode: first & 0xFFFF,
            words: current.get(1..).unwrap_or_default(),
        });
        rest = tail;
    }
    Ok(found)
}

fn literal_string(words: &[u32]) -> String {
    let bytes: Vec<u8> = words
        .iter()
        .flat_map(|word| word.to_le_bytes())
        .take_while(|&byte| byte != 0)
        .collect();
    String::from_utf8_lossy(&bytes).into_owned()
}

fn basename(name: &str) -> &str {
    name.rsplit(['/', '\\']).next().unwrap_or(name)
}

#[derive(Default)]
struct Module {
    strings: BTreeMap<u32, String>,
    constants: BTreeMap<u32, u32>,
    names: BTreeMap<u32, String>,
    definitions: BTreeMap<u32, String>,
}

impl Module {
    fn string(&self, id: u32) -> String {
        self.strings.get(&id).cloned().unwrap_or_default()
    }

    fn constant(&self, id: u32) -> String {
        self.constants
            .get(&id)
            .map_or_else(|| String::from("?"), u32::to_string)
    }

    fn name(&self, id: u32) -> String {
        self.names
            .get(&id)
            .cloned()
            .unwrap_or_else(|| String::from("?"))
    }
}

pub fn facts(words: &[u32]) -> Result<BTreeSet<String>> {
    let instructions = instructions(words)?;
    let mut module = Module::default();
    let mut debug_set = None;
    let mut int_types = BTreeSet::new();
    for instruction in &instructions {
        let operands = instruction.words;
        match instruction.opcode {
            OP_STRING => {
                if let Some((&id, text)) = operands.split_first() {
                    module.strings.insert(id, literal_string(text));
                }
            }
            OP_EXT_INST_IMPORT => {
                if let Some((&id, text)) = operands.split_first() {
                    if literal_string(text).starts_with(NON_SEMANTIC) {
                        debug_set = Some(id);
                    }
                }
            }
            OP_TYPE_INT => {
                if let Some(&id) = operands.first() {
                    int_types.insert(id);
                }
            }
            OP_CONSTANT => {
                if let [ty, id, value, ..] = *operands {
                    if int_types.contains(&ty) {
                        module.constants.insert(id, value);
                    }
                }
            }
            _ => {}
        }
    }
    let mut facts = BTreeSet::new();
    names(&instructions, debug_set, &mut module, &mut facts);
    facts.clear();
    names(&instructions, debug_set, &mut module, &mut facts);
    body_facts(&instructions, debug_set, &module, &mut facts);
    Ok(facts)
}

fn is_ext_inst(opcode: u32) -> bool {
    opcode == OP_EXT_INST || opcode == OP_EXT_INST_WITH_FORWARD_REFS
}

fn names(
    instructions: &[Instruction<'_>],
    debug_set: Option<u32>,
    module: &mut Module,
    facts: &mut BTreeSet<String>,
) {
    for instruction in instructions {
        let operands = instruction.words;
        if is_ext_inst(instruction.opcode) && operands.get(2).copied() == debug_set {
            if let [_, id, _, opcode, ref rest @ ..] = *operands {
                if opcode == 101 {
                    if let [debug_function, function, ..] = *rest {
                        let name = module.name(debug_function);
                        module.definitions.insert(function, name);
                    }
                }
                let name = describe(module, opcode, rest, facts);
                if let Some(name) = name {
                    module.names.insert(id, name);
                }
            }
        }
    }
}

fn body_facts(
    instructions: &[Instruction<'_>],
    debug_set: Option<u32>,
    module: &Module,
    facts: &mut BTreeSet<String>,
) {
    let mut function = String::new();
    for instruction in instructions {
        let operands = instruction.words;
        match instruction.opcode {
            OP_FUNCTION => {
                function = operands
                    .get(1)
                    .and_then(|id| module.definitions.get(id))
                    .cloned()
                    .unwrap_or_default();
            }
            OP_FUNCTION_END => function.clear(),
            OP_LINE => {
                if let [file, line, ..] = *operands {
                    facts.insert(format!(
                        "opline {}:{line} in {function}",
                        basename(&module.string(file))
                    ));
                }
            }
            OP_SOURCE_EXTENSION => {
                facts.insert(format!("opsourceextension {}", literal_string(operands)));
            }
            OP_SOURCE => {
                if let Some(&file) = operands.get(2) {
                    facts.insert(format!(
                        "opsource {} text={}",
                        basename(&module.string(file)),
                        operands.len() > 3
                    ));
                }
            }
            OP_EXT_INST if operands.get(2).copied() == debug_set => {
                if let [_, _, _, opcode, ref rest @ ..] = *operands {
                    body_fact(module, opcode, rest, &function, facts);
                }
            }
            _ => {}
        }
    }
}

fn describe(
    module: &Module,
    opcode: u32,
    operands: &[u32],
    facts: &mut BTreeSet<String>,
) -> Option<String> {
    let at = |index: usize| operands.get(index).copied().unwrap_or(0);
    let string = |index: usize| module.string(at(index));
    let constant = |index: usize| module.constant(at(index));
    let name = |index: usize| module.name(at(index));
    match opcode {
        0 => Some(String::from("none")),
        1 => {
            facts.insert(format!("unit language={}", constant(3)));
            Some(String::from("unit"))
        }
        2 => Some(string(0)),
        3 => Some(format!("ptr({},{})", name(0), constant(1))),
        5 => Some(format!("{}[{}]", name(0), constant(1))),
        6 => Some(format!("{}x{}", name(0), constant(1))),
        8 => {
            let parameters: Vec<String> = (2..operands.len()).map(name).collect();
            Some(format!("fn({};{})", name(1), parameters.join(",")))
        }
        10 => {
            let title = string(0);
            if title.is_empty() && operands.len() <= 9 {
                return Some(String::from("struct"));
            }
            let members: Vec<String> = (9..operands.len()).map(name).collect();
            let description = if string(6).starts_with('@') {
                format!("opaque:{title}")
            } else {
                format!("struct:{title}")
            };
            facts.insert(format!("composite {description} {{{}}}", members.join(",")));
            Some(description)
        }
        11 => Some(format!(
            "{}:{}@{}:{}",
            string(0),
            name(1),
            constant(3),
            constant(4)
        )),
        18 => {
            facts.insert(format!(
                "global {} type={} source={} line={}",
                string(0),
                name(1),
                name(2),
                constant(3)
            ));
            None
        }
        20 => {
            let description = format!("{}@{}", string(0), constant(3));
            facts.insert(format!(
                "function {description} type={} source={}",
                name(1),
                name(2)
            ));
            Some(description)
        }
        21 => {
            let description = format!("{}/{{@{}}}", name(3), constant(1));
            facts.insert(format!("block {description} source={}", name(0)));
            Some(description)
        }
        26 => {
            let description = format!("{}/{}", name(5), string(0));
            let argument = if operands.len() > 7 {
                constant(7)
            } else {
                String::from("-")
            };
            facts.insert(format!(
                "local {description} type={} line={} arg={argument}",
                name(1),
                constant(3)
            ));
            Some(description)
        }
        107 => {
            facts.insert(format!("entrypoint {}", name(0)));
            None
        }
        35 => {
            let file = basename(&string(0)).to_string();
            facts.insert(format!("source {file} text={}", operands.len() > 1));
            Some(file)
        }
        _ => None,
    }
}

fn body_fact(
    module: &Module,
    opcode: u32,
    operands: &[u32],
    function: &str,
    facts: &mut BTreeSet<String>,
) {
    let at = |index: usize| operands.get(index).copied().unwrap_or(0);
    let name = |index: usize| module.name(at(index));
    let fact = match opcode {
        23 => format!("scope {} in {function}", name(0)),
        28 => format!("declare {}", name(0)),
        29 => format!("value {}", name(0)),
        101 => format!("definition {}", name(0)),
        103 => format!("line {}:{} in {function}", name(0), module.constant(at(1))),
        _ => return,
    };
    facts.insert(fact);
}
