use std::collections::BTreeMap;
use std::path::Path;

use anyhow::{Context, Result};
use serde_json::Value;

#[derive(Clone)]
pub struct Operand {
    pub kind: String,
    pub quantifier: Option<String>,
}

pub struct Instruction {
    pub opcode: u32,
    pub operands: Vec<Operand>,
}

pub struct Grammar {
    instructions: BTreeMap<String, Instruction>,
    enumerants: BTreeMap<(String, String), u32>,
}

impl Grammar {
    pub fn load(path: &Path) -> Result<Self> {
        let text = std::fs::read_to_string(path)
            .with_context(|| format!("cannot read {}", path.display()))?;
        let json: Value = serde_json::from_str(&text)
            .with_context(|| format!("{} is not JSON", path.display()))?;
        let mut instructions = BTreeMap::new();
        for instruction in array(&json, "instructions")? {
            let opcode = number(instruction.get("opcode"))
                .with_context(|| format!("an instruction of {} has no opcode", path.display()))?;
            let operands = instruction
                .get("operands")
                .and_then(Value::as_array)
                .map(|operands| {
                    operands
                        .iter()
                        .map(|operand| Operand {
                            kind: text_of(operand.get("kind")),
                            quantifier: operand
                                .get("quantifier")
                                .and_then(Value::as_str)
                                .map(String::from),
                        })
                        .collect::<Vec<_>>()
                })
                .unwrap_or_default();
            for name in names(instruction, "opname") {
                instructions.insert(
                    name,
                    Instruction {
                        opcode,
                        operands: operands.clone(),
                    },
                );
            }
        }
        let mut enumerants = BTreeMap::new();
        let kinds = json.get("operand_kinds").and_then(Value::as_array);
        for kind in kinds.into_iter().flatten() {
            let kind_name = text_of(kind.get("kind"));
            let Some(values) = kind.get("enumerants").and_then(Value::as_array) else {
                continue;
            };
            for enumerant in values {
                let Some(value) = number(enumerant.get("value")) else {
                    continue;
                };
                for name in names(enumerant, "enumerant") {
                    enumerants.insert((kind_name.clone(), name), value);
                }
            }
        }
        Ok(Self {
            instructions,
            enumerants,
        })
    }

    pub fn instruction(&self, name: &str) -> Option<&Instruction> {
        self.instructions.get(name)
    }

    pub fn enumerant(&self, kind: &str, name: &str) -> Option<u32> {
        self.enumerants
            .get(&(kind.to_string(), name.to_string()))
            .copied()
    }
}

fn array<'a>(json: &'a Value, key: &str) -> Result<&'a Vec<Value>> {
    json.get(key)
        .and_then(Value::as_array)
        .with_context(|| format!("the grammar has no `{key}` array"))
}

fn text_of(value: Option<&Value>) -> String {
    value
        .and_then(Value::as_str)
        .map(String::from)
        .unwrap_or_default()
}

fn names(entry: &Value, key: &str) -> Vec<String> {
    let mut names: Vec<String> = entry
        .get(key)
        .and_then(Value::as_str)
        .map(String::from)
        .into_iter()
        .collect();
    if let Some(aliases) = entry.get("aliases").and_then(Value::as_array) {
        names.extend(aliases.iter().filter_map(Value::as_str).map(String::from));
    }
    names
}

fn number(value: Option<&Value>) -> Option<u32> {
    match value? {
        Value::Number(number) => number.as_u64().and_then(|n| u32::try_from(n).ok()),
        Value::String(text) => super::cpp::parse_integer(text),
        _ => None,
    }
}
