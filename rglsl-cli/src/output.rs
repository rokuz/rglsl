use std::fmt::Write as _;
use std::fs;
use std::path::Path;

pub fn words_to_bytes(words: &[u32]) -> Vec<u8> {
    words.iter().flat_map(|word| word.to_le_bytes()).collect()
}

pub fn hex_text(words: &[u32], variable: Option<&str>) -> String {
    let mut text = format!("\t// rglsl {}\n", env!("CARGO_PKG_VERSION"));
    if let Some(name) = variable {
        text.push_str("\t #pragma once\n");
        let _ = writeln!(text, "const uint32_t {name}[] = {{");
    }
    let count = words.len();
    for (line, chunk) in words.chunks(8).enumerate() {
        text.push('\t');
        for (column, word) in chunk.iter().enumerate() {
            let _ = write!(text, "0x{word:08x}");
            if line * 8 + column + 1 < count {
                text.push(',');
            }
        }
        text.push('\n');
    }
    if variable.is_some() {
        text.push_str("};\n");
    }
    text
}

pub fn write(path: &str, words: &[u32], hex: bool, variable: Option<&str>) -> bool {
    let contents = if hex {
        hex_text(words, variable).into_bytes()
    } else {
        words_to_bytes(words)
    };
    fs::write(Path::new(path), contents).is_ok()
}

fn escape_dependency(text: &str) -> String {
    let mut escaped = String::with_capacity(text.len());
    for character in text.chars() {
        match character {
            ' ' | ':' | '#' | '[' | ']' | '\\' => escaped.push('\\'),
            '$' => escaped.push('$'),
            _ => {}
        }
        escaped.push(character);
    }
    escaped
}

pub fn write_depfile(path: &str, outputs: &[String], sources: &[String]) -> bool {
    let mut text = String::new();
    for output in outputs {
        text.push_str(&escape_dependency(output));
        text.push(':');
        for source in sources {
            text.push(' ');
            text.push_str(&escape_dependency(source));
        }
        text.push('\n');
    }
    fs::write(path, text).is_ok()
}

pub fn stdout(text: &str) {
    use std::io::Write as _;
    let _ = std::io::stdout().lock().write_all(text.as_bytes());
}

pub fn stdout_bytes(bytes: &[u8]) {
    use std::io::Write as _;
    let _ = std::io::stdout().lock().write_all(bytes);
}

pub fn stderr(text: &str) {
    use std::io::Write as _;
    let _ = std::io::stderr().lock().write_all(text.as_bytes());
}

macro_rules! out {
    ($($argument:tt)*) => {
        $crate::output::stdout(&format!("{}\n", format_args!($($argument)*)))
    };
}

macro_rules! err {
    ($($argument:tt)*) => {
        $crate::output::stderr(&format!("{}\n", format_args!($($argument)*)))
    };
}

pub(crate) use err;
pub(crate) use out;
