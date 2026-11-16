use std::collections::{BTreeMap, BTreeSet};

use super::number;
use super::parse::{Parsed, Printed};
use super::tables;

const MAX_NAME: usize = 256;

#[derive(Debug, Default)]
pub(super) struct Names {
    names: BTreeMap<u32, String>,
    used: BTreeSet<String>,
}

fn sanitize(suggested: &[u8]) -> String {
    if suggested.is_empty() {
        return String::from("_");
    }
    suggested
        .iter()
        .map(|&byte| {
            if byte.is_ascii_alphanumeric() || byte == b'_' {
                char::from(byte)
            } else {
                '_'
            }
        })
        .collect()
}

fn enum_name(kind: tables::Kind, value: u32) -> String {
    match kind {
        tables::Kind::Enum(index) | tables::Kind::Mask(index) => tables::enumerant(index, value)
            .map_or_else(
                || format!("StorageClass{value}"),
                |enumerant| enumerant.name.to_owned(),
            ),
        _ => format!("StorageClass{value}"),
    }
}

pub(super) fn literal(parsed: &Parsed<'_>, operand: usize) -> String {
    let Some(operand) = parsed.operands.get(operand) else {
        return String::new();
    };
    let Printed::Number(kind) = operand.printed else {
        return String::new();
    };
    let low = parsed.word(operand.offset);
    match operand.count {
        1 => number::one_word(low, kind),
        2 => number::two_words(low, parsed.word(operand.offset + 1), kind),
        _ => None,
    }
    .unwrap_or_default()
}

impl Names {
    pub(super) fn get(&self, id: u32) -> String {
        self.names
            .get(&id)
            .cloned()
            .unwrap_or_else(|| id.to_string())
    }

    fn save(&mut self, id: u32, suggested: &[u8]) {
        if self.names.contains_key(&id) {
            return;
        }
        let base = if suggested.len() > MAX_NAME {
            id.to_string()
        } else {
            sanitize(suggested)
        };
        let mut name = base.clone();
        let mut index = 0_u32;
        while self.used.contains(&name) {
            name = format!("{base}_{index}");
            index += 1;
        }
        self.used.insert(name.clone());
        self.names.insert(id, name);
    }

    fn save_text(&mut self, id: u32, suggested: &str) {
        self.save(id, suggested.as_bytes());
    }

    pub(super) fn add(&mut self, parsed: &Parsed<'_>) {
        if parsed.operands.is_empty() {
            return;
        }
        let result = parsed.result_id;
        match parsed.opcode {
            tables::OP_NAME => {
                let name = parsed.string(1);
                self.save(parsed.word(1), &name);
            }
            tables::OP_DECORATE => {
                if parsed.word(2) == tables::DECORATION_BUILT_IN
                    && parsed.words.len() > 3
                    && let Some(name) = tables::built_in_name(parsed.word(3))
                {
                    self.save_text(parsed.word(1), name);
                }
            }
            tables::OP_TYPE_VOID => self.save_text(result, "void"),
            tables::OP_TYPE_BOOL => self.save_text(result, "bool"),
            tables::OP_TYPE_INT => {
                let width = parsed.word(2);
                let (mut signedness, root) = match width {
                    8 => ("", String::from("char")),
                    16 => ("", String::from("short")),
                    32 => ("", String::from("int")),
                    64 => ("", String::from("long")),
                    _ => ("i", width.to_string()),
                };
                if parsed.word(3) == 0 {
                    signedness = "u";
                }
                self.save_text(result, &format!("{signedness}{root}"));
            }
            tables::OP_TYPE_FLOAT => {
                let encoded = if parsed.words.len() > 3 {
                    match parsed.word(3) {
                        tables::FP_ENCODING_BFLOAT16 => Some("bfloat16"),
                        tables::FP_ENCODING_FLOAT8_E4M3 => Some("fp8e4m3"),
                        tables::FP_ENCODING_FLOAT8_E5M2 => Some("fp8e5m2"),
                        tables::FP_ENCODING_FLOAT6_E2M3 => Some("fp6e2m3"),
                        tables::FP_ENCODING_FLOAT6_E3M2 => Some("fp6e3m2"),
                        tables::FP_ENCODING_FLOAT4_E2M1 => Some("fp4e2m1"),
                        tables::FP_ENCODING_FLOAT8_E8M0 => Some("fp8e8m0"),
                        tables::FP_ENCODING_MXINT8 => Some("mxint8"),
                        _ => None,
                    }
                } else {
                    None
                };
                let name = match encoded {
                    Some(name) => String::from(name),
                    None => match parsed.word(2) {
                        16 => String::from("half"),
                        32 => String::from("float"),
                        64 => String::from("double"),
                        width => format!("fp{width}"),
                    },
                };
                self.save_text(result, &name);
            }
            tables::OP_TYPE_VECTOR => {
                let name = format!("v{}{}", parsed.word(3), self.get(parsed.word(2)));
                self.save_text(result, &name);
            }
            tables::OP_TYPE_MATRIX => {
                let name = format!("mat{}{}", parsed.word(3), self.get(parsed.word(2)));
                self.save_text(result, &name);
            }
            tables::OP_TYPE_ARRAY => {
                let name = format!(
                    "_arr_{}_{}",
                    self.get(parsed.word(2)),
                    self.get(parsed.word(3))
                );
                self.save_text(result, &name);
            }
            tables::OP_TYPE_RUNTIME_ARRAY => {
                let name = format!("_runtimearr_{}", self.get(parsed.word(2)));
                self.save_text(result, &name);
            }
            tables::OP_TYPE_NODE_PAYLOAD_ARRAY => {
                let name = format!("_payloadarr_{}", self.get(parsed.word(2)));
                self.save_text(result, &name);
            }
            tables::OP_TYPE_POINTER => {
                let name = format!(
                    "_ptr_{}_{}",
                    enum_name(tables::STORAGE_CLASS, parsed.word(2)),
                    self.get(parsed.word(3))
                );
                self.save_text(result, &name);
            }
            tables::OP_TYPE_UNTYPED_POINTER => {
                let name = format!("_ptr_{}", enum_name(tables::STORAGE_CLASS, parsed.word(2)));
                self.save_text(result, &name);
            }
            tables::OP_TYPE_PIPE => {
                let name = format!(
                    "Pipe{}",
                    enum_name(tables::ACCESS_QUALIFIER, parsed.word(2))
                );
                self.save_text(result, &name);
            }
            tables::OP_TYPE_EVENT => self.save_text(result, "Event"),
            tables::OP_TYPE_DEVICE_EVENT => self.save_text(result, "DeviceEvent"),
            tables::OP_TYPE_RESERVE_ID => self.save_text(result, "ReserveId"),
            tables::OP_TYPE_QUEUE => self.save_text(result, "Queue"),
            tables::OP_TYPE_OPAQUE => {
                let name = format!("Opaque_{}", sanitize(&parsed.string(1)));
                self.save_text(result, &name);
            }
            tables::OP_TYPE_PIPE_STORAGE => self.save_text(result, "PipeStorage"),
            tables::OP_TYPE_NAMED_BARRIER => self.save_text(result, "NamedBarrier"),
            tables::OP_TYPE_STRUCT => self.save_text(result, &format!("_struct_{result}")),
            tables::OP_CONSTANT_TRUE => self.save_text(result, "true"),
            tables::OP_CONSTANT_FALSE => self.save_text(result, "false"),
            tables::OP_CONSTANT => {
                let value = literal(parsed, 2).replace('-', "n");
                let name = format!("{}_{value}", self.get(parsed.type_id));
                self.save_text(result, &name);
            }
            _ => {
                if result != 0 && !self.names.contains_key(&result) {
                    self.save_text(result, &result.to_string());
                }
            }
        }
    }
}
