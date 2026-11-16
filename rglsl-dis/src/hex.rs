use std::fmt::Write as _;

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

#[cfg(test)]
mod tests {
    use super::hex_text;

    #[test]
    fn eight_words_per_line_and_a_c_array() {
        let words: Vec<u32> = (0..9).collect();
        let version = env!("CARGO_PKG_VERSION");
        assert_eq!(
            hex_text(&words, None),
            format!(
                "\t// rglsl {version}\n\t0x00000000,0x00000001,0x00000002,0x00000003,0x00000004,0x00000005,0x00000006,0x00000007,\n\t0x00000008\n"
            )
        );
        assert_eq!(
            hex_text(&[1], Some("words")),
            format!(
                "\t// rglsl {version}\n\t #pragma once\nconst uint32_t words[] = {{\n\t0x00000001\n}};\n"
            )
        );
    }
}
