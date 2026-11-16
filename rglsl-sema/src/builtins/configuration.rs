use alloc::format;
use alloc::string::{String, ToString};
use alloc::vec::Vec;

use super::ResourceLimits;

const DELIMITERS: &[u8] = b" \t\n\r";
const BYTE_ORDER_MARK: &[u8] = &[0xef, 0xbb, 0xbf];

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Configuration {
    pub limits: ResourceLimits,
    pub messages: Vec<String>,
}

impl ResourceLimits {
    pub fn decode_configuration(bytes: &[u8]) -> Configuration {
        decode(bytes)
    }
}

fn text_of(bytes: &[u8]) -> &[u8] {
    let bytes = match bytes.strip_prefix(BYTE_ORDER_MARK) {
        Some(rest) if bytes.len() > 3 => rest,
        _ => bytes,
    };
    let end = bytes
        .iter()
        .position(|&byte| byte == 0)
        .unwrap_or(bytes.len());
    bytes.get(..end).unwrap_or_default()
}

fn is_delimiter(byte: u8) -> bool {
    DELIMITERS.contains(&byte)
}

fn token(text: &[u8], start: usize) -> Option<(usize, usize)> {
    let begin = start
        + text
            .get(start..)?
            .iter()
            .position(|&byte| !is_delimiter(byte))?;
    let end = text
        .get(begin..)?
        .iter()
        .position(|&byte| is_delimiter(byte))
        .map_or(text.len(), |length| begin + length);
    Some((begin, end))
}

fn atoi(text: &[u8]) -> i32 {
    let (negative, digits) = match text.split_first() {
        Some((b'-', rest)) => (true, rest),
        Some((b'+', rest)) => (false, rest),
        _ => (false, text),
    };
    let mut value: i64 = 0;
    for &digit in digits.iter().take_while(|byte| byte.is_ascii_digit()) {
        let digit = i64::from(digit - b'0');
        value = if negative {
            value.saturating_mul(10).saturating_sub(digit)
        } else {
            value.saturating_mul(10).saturating_add(digit)
        };
    }
    let [low_0, low_1, low_2, low_3, ..] = value.to_le_bytes();
    i32::from_le_bytes([low_0, low_1, low_2, low_3])
}

fn bad_value(value: &[u8]) -> String {
    format!(
        "Error: '{}' bad .conf file.  Each name must be followed by one number.\n",
        String::from_utf8_lossy(value)
    )
}

fn decode(bytes: &[u8]) -> Configuration {
    let text = text_of(bytes);
    let mut decoded = Configuration {
        limits: ResourceLimits::zeroed(),
        messages: Vec::new(),
    };
    let mut position = 0;
    while let Some((name_start, name_end)) = token(text, position) {
        let name = text.get(name_start..name_end).unwrap_or_default();
        let Some((value_start, value_end)) = token(text, name_end) else {
            decoded.messages.push(bad_value(b""));
            return decoded;
        };
        position = value_end;
        let value = text.get(value_start..value_end).unwrap_or_default();
        if !value
            .first()
            .is_some_and(|&first| first == b'-' || first.is_ascii_digit())
        {
            decoded.messages.push(bad_value(value));
            return decoded;
        }
        let name = String::from_utf8_lossy(name).to_string();
        if !decoded.limits.set(&name, atoi(value)) {
            decoded.messages.push(format!(
                "Warning: unrecognized limit ({name}) in configuration file.\n"
            ));
        }
    }
    decoded
}

#[cfg(test)]
mod tests {
    use alloc::string::String;
    use alloc::vec;

    use super::{ResourceLimits, atoi};

    #[test]
    fn the_default_configuration_lists_every_limit() {
        let text = ResourceLimits::default().configuration();
        assert_eq!(text.lines().count(), 111);
        assert!(text.starts_with("MaxLights 32\nMaxClipPlanes 6\n"));
        assert!(text.ends_with("generalConstantMatrixVectorIndexing 1\n"));
        assert!(text.contains("\nMinProgramTexelOffset -8\n"));
    }

    #[test]
    fn decoding_the_default_configuration_gives_the_defaults() {
        let decoded = ResourceLimits::decode_configuration(
            ResourceLimits::default().configuration().as_bytes(),
        );
        assert!(decoded.messages.is_empty());
        assert_eq!(decoded.limits, ResourceLimits::default());
    }

    #[test]
    fn limits_missing_from_a_configuration_are_zero() {
        let decoded = ResourceLimits::decode_configuration(
            b"\xef\xbb\xbfMaxDrawBuffers 4\r\n\tMaxPatchVertices\t-3",
        );
        assert!(decoded.messages.is_empty());
        assert_eq!(decoded.limits.max_draw_buffers, 4);
        assert_eq!(decoded.limits.max_patch_vertices, -3);
        assert_eq!(decoded.limits.max_clip_distances, 0);
        assert_eq!(decoded.limits.while_loops, 0);
    }

    #[test]
    fn unknown_names_warn_and_bad_values_stop_decoding() {
        let decoded = ResourceLimits::decode_configuration(
            b"Foo 1\nMaxDrawBuffers 2\nMaxViewports x\nMaxSamples 8\n",
        );
        assert_eq!(
            decoded.messages,
            vec![
                String::from("Warning: unrecognized limit (Foo) in configuration file.\n"),
                String::from(
                    "Error: 'x' bad .conf file.  Each name must be followed by one number.\n"
                ),
            ]
        );
        assert_eq!(decoded.limits.max_draw_buffers, 2);
        assert_eq!(decoded.limits.max_samples, 0);
    }

    #[test]
    fn a_name_without_a_value_is_a_bad_configuration() {
        let decoded = ResourceLimits::decode_configuration(b"MaxDrawBuffers 3 MaxSamples");
        assert_eq!(
            decoded.messages,
            vec![String::from(
                "Error: '' bad .conf file.  Each name must be followed by one number.\n"
            )]
        );
        assert_eq!(decoded.limits.max_draw_buffers, 3);
    }

    #[test]
    fn values_are_read_like_atoi() {
        assert_eq!(atoi(b"12abc"), 12);
        assert_eq!(atoi(b"-"), 0);
        assert_eq!(atoi(b"-7"), -7);
        assert_eq!(atoi(b"4294967297"), 1);
        assert_eq!(atoi(b"99999999999999999999"), -1);
    }
}
