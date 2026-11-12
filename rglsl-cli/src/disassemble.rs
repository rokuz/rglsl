use rspirv::binary::Disassemble as _;

pub fn disassemble(words: &[u32]) -> String {
    match rspirv::dr::load_words(words) {
        Ok(module) => module.disassemble(),
        Err(error) => format!("; cannot disassemble the module: {error}"),
    }
}
