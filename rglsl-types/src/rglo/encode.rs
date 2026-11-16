use alloc::string::String;
use core::fmt::Write as _;

pub trait Encode {
    fn encode(&self, out: &mut Encoder);
}

#[derive(Debug, Default)]
pub struct Encoder {
    text: String,
}

pub fn to_string<T: Encode + ?Sized>(value: &T) -> String {
    let mut out = Encoder::default();
    value.encode(&mut out);
    out.text
}

impl Encoder {
    pub fn token(&mut self, token: &str) {
        self.text.push_str(token);
    }

    pub fn unsigned(&mut self, mut value: u64) {
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
            self.text.push(char::from(digit));
        }
    }

    pub fn signed(&mut self, value: i64) {
        if value < 0 {
            self.text.push('-');
        }
        self.unsigned(value.unsigned_abs());
    }

    pub fn float32(&mut self, value: f32) {
        if value.is_nan() && value.is_sign_negative() {
            self.text.push('-');
        }
        let _ = write!(self.text, "{value}");
        if value % 1.0 == 0.0 {
            self.text.push_str(".0");
        }
    }

    pub fn float64(&mut self, value: f64) {
        if value.is_nan() && value.is_sign_negative() {
            self.text.push('-');
        }
        let _ = write!(self.text, "{value}");
        if value % 1.0 == 0.0 {
            self.text.push_str(".0");
        }
    }

    pub fn boolean(&mut self, value: bool) {
        self.token(if value { "true" } else { "false" });
    }

    pub fn string(&mut self, value: &str) {
        self.text.push('"');
        let mut plain = 0;
        for (at, character) in value.char_indices() {
            let escaped = character.escape_debug();
            if escaped.len() == 1 {
                continue;
            }
            self.text.push_str(value.get(plain..at).unwrap_or_default());
            self.text.extend(escaped);
            plain = at + character.len_utf8();
        }
        self.text.push_str(value.get(plain..).unwrap_or_default());
        self.text.push('"');
    }

    pub fn sequence<'a, T: Encode + 'a>(
        &mut self,
        open: &str,
        close: &str,
        items: impl IntoIterator<Item = &'a T>,
    ) {
        self.token(open);
        for (index, item) in items.into_iter().enumerate() {
            if index > 0 {
                self.token(",");
            }
            item.encode(self);
        }
        self.token(close);
    }
}
