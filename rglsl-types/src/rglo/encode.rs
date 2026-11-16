use alloc::string::String;
use alloc::vec::Vec;
use core::fmt::Write as _;

pub trait Encode {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>);
}

enum Item<'a> {
    Token(&'static str),
    Value(&'a dyn Encode),
    Unsigned(u64),
    Str(&'a str),
    Text(String),
}

pub struct Encoder<'a> {
    text: String,
    pending: Vec<Item<'a>>,
    queued: Vec<Item<'a>>,
}

impl core::fmt::Debug for Encoder<'_> {
    fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        formatter.write_str("Encoder")
    }
}

pub fn to_string<T: Encode>(value: &T) -> String {
    let mut encoder = Encoder {
        text: String::new(),
        pending: Vec::new(),
        queued: Vec::new(),
    };
    encoder.pending.push(Item::Value(value));
    while let Some(item) = encoder.pending.pop() {
        match item {
            Item::Token(token) => encoder.text.push_str(token),
            Item::Value(value) => {
                value.encode(&mut encoder);
                let Encoder {
                    ref mut pending,
                    ref mut queued,
                    ..
                } = encoder;
                pending.extend(queued.drain(..).rev());
            }
            Item::Unsigned(value) => write_unsigned(&mut encoder.text, value),
            Item::Str(value) => write_string(&mut encoder.text, value),
            Item::Text(text) => encoder.text.push_str(&text),
        }
    }
    encoder.text
}

impl<'a> Encoder<'a> {
    pub fn token(&mut self, token: &'static str) {
        if self.queued.is_empty() {
            self.text.push_str(token);
        } else {
            self.queued.push(Item::Token(token));
        }
    }

    pub fn value(&mut self, value: &'a dyn Encode) {
        self.queued.push(Item::Value(value));
    }

    pub fn unsigned(&mut self, value: u64) {
        if self.queued.is_empty() {
            write_unsigned(&mut self.text, value);
        } else {
            self.queued.push(Item::Unsigned(value));
        }
    }

    pub fn signed(&mut self, value: i64) {
        self.format(|text| {
            if value < 0 {
                text.push('-');
            }
            write_unsigned(text, value.unsigned_abs());
        });
    }

    pub fn float32(&mut self, value: f32) {
        self.format(|text| {
            if value.is_nan() && value.is_sign_negative() {
                text.push('-');
            }
            let _ = write!(text, "{value}");
            if value % 1.0 == 0.0 {
                text.push_str(".0");
            }
        });
    }

    pub fn float64(&mut self, value: f64) {
        self.format(|text| {
            if value.is_nan() && value.is_sign_negative() {
                text.push('-');
            }
            let _ = write!(text, "{value}");
            if value % 1.0 == 0.0 {
                text.push_str(".0");
            }
        });
    }

    pub fn boolean(&mut self, value: bool) {
        self.token(if value { "true" } else { "false" });
    }

    pub fn string(&mut self, value: &'a str) {
        if self.queued.is_empty() {
            write_string(&mut self.text, value);
        } else {
            self.queued.push(Item::Str(value));
        }
    }

    pub fn text(&mut self, text: String) {
        if self.queued.is_empty() {
            self.text.push_str(&text);
        } else {
            self.queued.push(Item::Text(text));
        }
    }

    pub fn sequence<T: Encode + 'a>(
        &mut self,
        open: &'static str,
        close: &'static str,
        items: impl IntoIterator<Item = &'a T>,
    ) {
        self.token(open);
        let mut first = true;
        for item in items {
            if !first {
                self.token(",");
            }
            first = false;
            self.value(item);
        }
        self.token(close);
    }

    fn format(&mut self, write: impl FnOnce(&mut String)) {
        if self.queued.is_empty() {
            write(&mut self.text);
        } else {
            let mut text = String::new();
            write(&mut text);
            self.queued.push(Item::Text(text));
        }
    }
}

fn write_unsigned(text: &mut String, mut value: u64) {
    let mut digits = [0_u8; 20];
    let mut start = digits.len();
    loop {
        start -= 1;
        if let Some(digit) = digits.get_mut(start) {
            *digit = b'0' + (value % 10) as u8;
        }
        value /= 10;
        if value == 0 || start == 0 {
            break;
        }
    }
    for &digit in digits.get(start..).unwrap_or_default() {
        text.push(char::from(digit));
    }
}

pub(super) fn write_string(text: &mut String, value: &str) {
    text.push('"');
    let mut plain = 0;
    for (at, character) in value.char_indices() {
        let escaped = character.escape_debug();
        if escaped.len() == 1 {
            continue;
        }
        text.push_str(value.get(plain..at).unwrap_or_default());
        text.extend(escaped);
        plain = at + character.len_utf8();
    }
    text.push_str(value.get(plain..).unwrap_or_default());
    text.push('"');
}
