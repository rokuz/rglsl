#![forbid(unsafe_code)]

mod glslang;
mod hex;
pub mod reflection;
mod standard;
mod string;

pub use hex::hex_text;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Form {
    Glslang,
    Standard,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Disassembly {
    pub text: Vec<u8>,
    pub failed: bool,
}

impl Disassembly {
    pub fn to_text(&self) -> String {
        String::from_utf8_lossy(&self.text).into_owned()
    }
}

pub fn disassemble(words: &[u32], form: Form) -> Disassembly {
    match form {
        Form::Glslang => glslang::disassemble(words),
        Form::Standard => standard::disassemble(words),
    }
}
