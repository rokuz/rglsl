use std::fs;
use std::path::Path;

pub fn words_to_bytes(words: &[u32]) -> Vec<u8> {
    words.iter().flat_map(|word| word.to_le_bytes()).collect()
}

pub fn write(path: &str, words: &[u32], hex: bool, variable: Option<&str>) -> bool {
    let contents = if hex {
        rglsl_dis::hex_text(words, variable).into_bytes()
    } else {
        words_to_bytes(words)
    };
    fs::write(Path::new(path), contents).is_ok()
}

pub fn stdout(text: &str) {
    stdout_bytes(text.as_bytes());
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
