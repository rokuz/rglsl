mod ext;
mod stream;
mod tables;

#[cfg(test)]
mod tests;

#[derive(Debug)]
pub struct Disassembly {
    pub text: Vec<u8>,
    pub failed: bool,
}

pub fn disassemble_bytes(words: &[u32]) -> Disassembly {
    let mut stream = stream::Stream::new(words);
    let result = stream.disassemble();
    let mut text = stream.into_output();
    let failed = match result {
        Ok(()) => false,
        Err(killed) => {
            text.extend_from_slice(b"\nDisassembly failed: ");
            text.extend_from_slice(killed.message().as_bytes());
            text.push(b'\n');
            true
        }
    };
    Disassembly { text, failed }
}

pub fn disassemble(words: &[u32]) -> String {
    String::from_utf8_lossy(&disassemble_bytes(words).text).into_owned()
}
