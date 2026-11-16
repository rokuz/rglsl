#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Encoding {
    Unknown,
    BFloat16,
    Float8E4M3,
    Float8E5M2,
    Float8E8M0,
    Float6E2M3,
    Float6E3M2,
    Float4E2M1,
    MxInt8,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Number {
    Unsigned(u32),
    Signed(u32),
    Float(u32, Encoding),
}

struct Layout {
    exponent_bits: u32,
    fraction_bits: u32,
    bias: i64,
}

const HALF: Layout = Layout {
    exponent_bits: 5,
    fraction_bits: 10,
    bias: 15,
};
const SINGLE: Layout = Layout {
    exponent_bits: 8,
    fraction_bits: 23,
    bias: 127,
};
const DOUBLE: Layout = Layout {
    exponent_bits: 11,
    fraction_bits: 52,
    bias: 1023,
};
const BFLOAT: Layout = Layout {
    exponent_bits: 8,
    fraction_bits: 7,
    bias: 127,
};
const E4M3: Layout = Layout {
    exponent_bits: 4,
    fraction_bits: 3,
    bias: 7,
};
const E5M2: Layout = Layout {
    exponent_bits: 5,
    fraction_bits: 2,
    bias: 15,
};
const E8M0: Layout = Layout {
    exponent_bits: 8,
    fraction_bits: 0,
    bias: 127,
};
const E2M3: Layout = Layout {
    exponent_bits: 2,
    fraction_bits: 3,
    bias: 1,
};
const E3M2: Layout = Layout {
    exponent_bits: 3,
    fraction_bits: 2,
    bias: 3,
};
const E2M1: Layout = Layout {
    exponent_bits: 2,
    fraction_bits: 1,
    bias: 1,
};

fn hex_float(bits: u64, layout: &Layout, has_zero: bool) -> String {
    let fraction_bits = u64::from(layout.fraction_bits);
    let nibbles = fraction_bits.div_ceil(4);
    let overflow = nibbles * 4 - fraction_bits;
    let sign_bit = fraction_bits + u64::from(layout.exponent_bits);
    let negative = sign_bit < 64 && (bits >> sign_bit) & 1 == 1;
    let exponent = (bits >> fraction_bits) & ((1_u64 << layout.exponent_bits) - 1);
    let fraction_mask = (1_u64 << fraction_bits) - 1;
    let mut fraction = (bits & fraction_mask) << overflow;
    let zero = has_zero && exponent == 0 && fraction == 0;
    let denormal = has_zero && exponent == 0 && !zero;
    let mut int_exponent = i64::try_from(exponent).unwrap_or(0) - layout.bias;
    if zero {
        int_exponent = 0;
    }
    if denormal && fraction_bits > 0 {
        let top = 1_u64 << (fraction_bits + overflow - 1);
        while fraction & top == 0 {
            fraction <<= 1;
            int_exponent -= 1;
        }
        fraction <<= 1;
        fraction &= (1_u64 << (fraction_bits + overflow)) - 1;
    }
    let mut shown = nibbles;
    while shown > 0 && fraction & 0xf == 0 {
        fraction >>= 4;
        shown -= 1;
    }
    let mut text = String::new();
    if negative {
        text.push('-');
    }
    text.push_str("0x");
    text.push(if zero { '0' } else { '1' });
    if shown > 0 {
        let width = usize::try_from(shown).unwrap_or(0);
        text.push_str(&format!(".{fraction:0width$x}"));
    }
    text.push('p');
    if int_exponent >= 0 {
        text.push('+');
    }
    text.push_str(&int_exponent.to_string());
    text
}

fn general(value: f64, precision: usize) -> String {
    if value == 0.0 {
        return String::from(if value.is_sign_negative() { "-0" } else { "0" });
    }
    let scientific = format!("{:.*e}", precision.saturating_sub(1), value);
    let (mantissa, exponent) = scientific
        .split_once('e')
        .unwrap_or((scientific.as_str(), "0"));
    let exponent: i64 = exponent.parse().unwrap_or(0);
    let limit = i64::try_from(precision).unwrap_or(i64::MAX);
    if exponent < -4 || exponent >= limit {
        let mantissa = trim_fraction(mantissa);
        let sign = if exponent < 0 { '-' } else { '+' };
        let magnitude = exponent.unsigned_abs();
        format!("{mantissa}e{sign}{magnitude:02}")
    } else {
        let decimals = usize::try_from(limit - 1 - exponent).unwrap_or(0);
        trim_fraction(&format!("{value:.decimals$}")).to_owned()
    }
}

fn trim_fraction(text: &str) -> &str {
    if text.contains('.') {
        text.trim_end_matches('0').trim_end_matches('.')
    } else {
        text
    }
}

fn single(word: u32) -> String {
    let value = f32::from_bits(word);
    if value == 0.0 || value.is_normal() {
        general(f64::from(value), 9)
    } else {
        hex_float(u64::from(word), &SINGLE, true)
    }
}

fn double(bits: u64) -> String {
    let value = f64::from_bits(bits);
    if value == 0.0 || value.is_normal() {
        general(value, 17)
    } else {
        hex_float(bits, &DOUBLE, true)
    }
}

pub(super) fn one_word(word: u32, number: Number) -> Option<String> {
    Some(match number {
        Number::Unsigned(_) => word.to_string(),
        Number::Signed(_) => word.cast_signed().to_string(),
        Number::Float(width, encoding) => match encoding {
            Encoding::Unknown => match width {
                16 => hex_float(u64::from(word & 0xffff), &HALF, true),
                32 => single(word),
                _ => return None,
            },
            Encoding::BFloat16 => hex_float(u64::from(word & 0xffff), &BFLOAT, true),
            Encoding::Float8E4M3 => hex_float(u64::from(word & 0xff), &E4M3, true),
            Encoding::Float8E5M2 => hex_float(u64::from(word & 0xff), &E5M2, true),
            Encoding::Float8E8M0 => hex_float(u64::from(word & 0xff), &E8M0, false),
            Encoding::Float6E2M3 => hex_float(u64::from(word & 0x3f), &E2M3, true),
            Encoding::Float6E3M2 => hex_float(u64::from(word & 0x3f), &E3M2, true),
            Encoding::Float4E2M1 => hex_float(u64::from(word & 0xf), &E2M1, true),
            Encoding::MxInt8 => {
                let [low, ..] = word.to_le_bytes();
                let value = f32::from(low.cast_signed()) / 64.0;
                hex_float(u64::from(value.to_bits()), &SINGLE, true)
            }
        },
    })
}

pub(super) fn two_words(low: u32, high: u32, number: Number) -> Option<String> {
    let bits = u64::from(low) | (u64::from(high) << 32);
    Some(match number {
        Number::Unsigned(_) => bits.to_string(),
        Number::Signed(_) => bits.cast_signed().to_string(),
        Number::Float(..) => double(bits),
    })
}

#[cfg(test)]
mod tests {
    use super::{Encoding, Number, one_word, two_words};

    fn float(value: f32) -> Option<String> {
        one_word(value.to_bits(), Number::Float(32, Encoding::Unknown))
    }

    #[test]
    fn floats_print_like_iostreams() {
        assert_eq!(float(1.0).as_deref(), Some("1"));
        assert_eq!(float(0.5).as_deref(), Some("0.5"));
        assert_eq!(float(0.1).as_deref(), Some("0.100000001"));
        assert_eq!(float(-2.5).as_deref(), Some("-2.5"));
        assert_eq!(float(1.0e10).as_deref(), Some("1e+10"));
        assert_eq!(float(1.5e-5).as_deref(), Some("1.49999996e-05"));
        assert_eq!(float(-0.0).as_deref(), Some("-0"));
        assert_eq!(float(f32::INFINITY).as_deref(), Some("0x1p+128"));
        assert_eq!(float(f32::NAN).as_deref(), Some("0x1.8p+128"));
        assert_eq!(
            one_word(0x3c00, Number::Float(16, Encoding::Unknown)).as_deref(),
            Some("0x1p+0")
        );
        assert_eq!(
            two_words(0, 0x3ff8_0000, Number::Float(64, Encoding::Unknown)).as_deref(),
            Some("1.5")
        );
        assert_eq!(
            two_words(u32::MAX, u32::MAX, Number::Signed(64)).as_deref(),
            Some("-1")
        );
    }
}
