#[rustfmt::skip]
mod grammar;
mod names;
mod number;
mod parse;
mod tables;

#[cfg(test)]
mod tests;

use crate::Disassembly;
use names::Names;
use parse::{Parsed, Parser, Printed};

const MAGIC: u32 = 0x0723_0203;
const HEADER_WORDS: usize = 5;
const INDENT: usize = 15;

fn mask(text: &mut Vec<u8>, kind: u16, word: u32) {
    let mut remaining = word;
    let mut bit = 1_u32;
    let mut emitted = 0;
    while remaining != 0 {
        if remaining & bit != 0 {
            remaining ^= bit;
            if let Some(enumerant) = tables::enumerant(kind, bit) {
                if emitted > 0 {
                    text.push(b'|');
                }
                text.extend_from_slice(enumerant.name.as_bytes());
                emitted += 1;
            }
        }
        bit = bit.wrapping_shl(1);
        if bit == 0 {
            break;
        }
    }
    if emitted == 0
        && let Some(enumerant) = tables::enumerant(kind, 0)
    {
        text.extend_from_slice(enumerant.name.as_bytes());
    }
}

fn operand(text: &mut Vec<u8>, parsed: &Parsed<'_>, index: usize, names: &Names) {
    let Some(operand) = parsed.operands.get(index) else {
        return;
    };
    let word = parsed.word(operand.offset);
    match operand.printed {
        Printed::Id | Printed::ResultId => {
            text.push(b'%');
            text.extend_from_slice(names.get(word).as_bytes());
        }
        Printed::ExtInst => {
            let name = parsed
                .ext_set
                .and_then(|set| tables::ext_instruction(set, word))
                .map_or_else(
                    || word.to_string(),
                    |instruction| instruction.name.to_owned(),
                );
            text.extend_from_slice(name.as_bytes());
        }
        Printed::SpecConstantOp => {
            if let Some(instruction) = tables::instruction(word) {
                text.extend_from_slice(instruction.name.as_bytes());
            }
        }
        Printed::Number(_) => {
            text.extend_from_slice(names::literal(parsed, index).as_bytes());
        }
        Printed::String => {
            text.push(b'"');
            for byte in parsed.string(index) {
                if byte == b'"' || byte == b'\\' {
                    text.push(b'\\');
                }
                text.push(byte);
            }
            text.push(b'"');
        }
        Printed::Enum(kind) => {
            if let Some(enumerant) = tables::enumerant(kind, word) {
                text.extend_from_slice(enumerant.name.as_bytes());
            }
        }
        Printed::Mask(kind) => mask(text, kind, word),
    }
}

fn instruction(text: &mut Vec<u8>, parsed: &Parsed<'_>, names: &Names) {
    if parsed.result_id != 0 {
        let name = names.get(parsed.result_id);
        let padding = INDENT.saturating_sub(4 + name.len());
        text.extend(std::iter::repeat_n(b' ', padding));
        text.push(b'%');
        text.extend_from_slice(name.as_bytes());
        text.extend_from_slice(b" = ");
    } else {
        text.extend(std::iter::repeat_n(b' ', INDENT));
    }
    text.extend_from_slice(b"Op");
    text.extend_from_slice(parsed.name.as_bytes());
    for (index, parsed_operand) in parsed.operands.iter().enumerate() {
        if parsed_operand.printed == Printed::ResultId {
            continue;
        }
        text.push(b' ');
        operand(text, parsed, index, names);
    }
    text.push(b'\n');
}

fn header(text: &mut Vec<u8>, words: &[u32]) {
    let word = |index: usize| words.get(index).copied().unwrap_or(0);
    let version = word(1);
    let generator = word(2);
    let tool = generator >> 16;
    text.extend_from_slice(b"; SPIR-V\n");
    text.extend_from_slice(
        format!(
            "; Version: {}.{}\n",
            (version >> 16) & 0xff,
            (version >> 8) & 0xff
        )
        .as_bytes(),
    );
    let generator_line = match tables::generator(tool) {
        Some(name) => format!("; Generator: {name}; {}\n", generator & 0xffff),
        None => format!("; Generator: Unknown({tool}); {}\n", generator & 0xffff),
    };
    text.extend_from_slice(generator_line.as_bytes());
    text.extend_from_slice(format!("; Bound: {}\n", word(3)).as_bytes());
    text.extend_from_slice(format!("; Schema: {}\n", word(4)).as_bytes());
}

fn native(words: &[u32]) -> Option<Vec<u32>> {
    match words.first() {
        Some(&MAGIC) => Some(words.to_vec()),
        Some(&first) if first.swap_bytes() == MAGIC => {
            Some(words.iter().map(|word| word.swap_bytes()).collect())
        }
        _ => None,
    }
}

pub(crate) fn disassemble(words: &[u32]) -> Disassembly {
    let mut text = Vec::new();
    let failed = |mut text: Vec<u8>, message: &str| {
        text.extend_from_slice(b"\nDisassembly failed: ");
        text.extend_from_slice(message.as_bytes());
        text.push(b'\n');
        Disassembly { text, failed: true }
    };
    if words.len() < HEADER_WORDS {
        return failed(text, "the module is shorter than the SPIR-V header");
    }
    let Some(words) = native(words) else {
        return failed(text, "invalid SPIR-V magic number");
    };
    header(&mut text, &words);
    let mut parser = Parser::default();
    let mut instructions = Vec::new();
    let mut error = None;
    let mut remaining = words.get(HEADER_WORDS..).unwrap_or_default();
    while !remaining.is_empty() {
        match parser.parse(remaining) {
            Ok(parsed) => {
                remaining = remaining.get(parsed.words.len()..).unwrap_or_default();
                instructions.push(parsed);
            }
            Err(message) => {
                error = Some(message);
                break;
            }
        }
    }
    let mut names = Names::default();
    for parsed in &instructions {
        names.add(parsed);
    }
    for parsed in &instructions {
        instruction(&mut text, parsed, &names);
    }
    match error {
        Some(message) => failed(text, &message),
        None => Disassembly {
            text,
            failed: false,
        },
    }
}
