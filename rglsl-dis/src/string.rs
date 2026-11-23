pub(crate) fn decode_string(words: &[u32]) -> Vec<u8> {
    let mut bytes = Vec::new();
    for word in words {
        for byte in word.to_le_bytes() {
            if byte == 0 {
                return bytes;
            }
            bytes.push(byte);
        }
    }
    bytes
}
