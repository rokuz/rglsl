#[rustfmt::skip]
mod glslang_tables;
mod stream;
mod tables;

#[cfg(test)]
mod tests;

use crate::Disassembly;

pub(crate) fn disassemble(words: &[u32]) -> Disassembly {
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
