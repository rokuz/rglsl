#[derive(Clone, Copy)]
struct Format {
    exponent_bits: u32,
    mantissa_bits: u32,
    infinity: bool,
}

const E4M3: Format = Format {
    exponent_bits: 4,
    mantissa_bits: 3,
    infinity: false,
};

const E5M2: Format = Format {
    exponent_bits: 5,
    mantissa_bits: 2,
    infinity: true,
};

const NAN: u8 = 0x7f;
const F64_MANTISSA_BITS: u32 = 52;
const F64_BIAS: i64 = 1023;

fn power_of_two(exponent: i64) -> f64 {
    match u64::try_from(exponent + F64_BIAS) {
        Ok(biased) if (1..2047).contains(&biased) => f64::from_bits(biased << F64_MANTISSA_BITS),
        _ => 0.0,
    }
}

impl Format {
    const fn bias(self) -> i64 {
        (1 << (self.exponent_bits - 1)) - 1
    }

    const fn mantissa_mask(self) -> u32 {
        (1 << self.mantissa_bits) - 1
    }

    const fn max_bits(self) -> u8 {
        if self.infinity {
            (((1 << self.exponent_bits) - 2) << self.mantissa_bits | self.mantissa_mask()) as u8
        } else {
            0x7e
        }
    }

    const fn infinity_bits(self) -> u8 {
        (((1 << self.exponent_bits) - 1) << self.mantissa_bits) as u8
    }

    fn decode(self, bits: u8) -> f64 {
        let sign = if bits & 0x80 != 0 { -1.0 } else { 1.0 };
        let magnitude = u32::from(bits & 0x7f);
        if !self.infinity && magnitude == 0x7f {
            return f64::NAN;
        }
        let exponent = magnitude >> self.mantissa_bits;
        let mantissa = magnitude & self.mantissa_mask();
        if self.infinity && exponent == (1 << self.exponent_bits) - 1 {
            return if mantissa == 0 {
                sign * f64::INFINITY
            } else {
                f64::NAN
            };
        }
        let fraction = f64::from(mantissa) * power_of_two(-i64::from(self.mantissa_bits));
        let value = if exponent == 0 {
            fraction * power_of_two(1 - self.bias())
        } else {
            (1.0 + fraction) * power_of_two(i64::from(exponent) - self.bias())
        };
        sign * value
    }

    fn encode(self, value: f64) -> u8 {
        let sign = if value.is_sign_negative() { 0x80 } else { 0 };
        if value.is_nan() {
            return NAN;
        }
        let magnitude = value.abs();
        if magnitude == 0.0 {
            return sign;
        }
        if magnitude > self.decode(self.max_bits()) {
            return if self.infinity {
                sign | self.infinity_bits()
            } else {
                sign | NAN
            };
        }
        let bits = magnitude.to_bits();
        let biased = i64::try_from(bits >> F64_MANTISSA_BITS).unwrap_or(0);
        let fraction = bits & ((1 << F64_MANTISSA_BITS) - 1);
        let (exponent, significand) = if biased == 0 {
            (1 - F64_BIAS, fraction)
        } else {
            (biased - F64_BIAS, fraction | (1 << F64_MANTISSA_BITS))
        };
        let minimum = 1 - self.bias();
        let (field, shift) = if exponent < minimum {
            (
                0,
                i64::from(F64_MANTISSA_BITS - self.mantissa_bits) + (minimum - exponent),
            )
        } else {
            (
                exponent + self.bias(),
                i64::from(F64_MANTISSA_BITS - self.mantissa_bits),
            )
        };
        let mantissa = u32::try_from(shift)
            .ok()
            .and_then(|shift| significand.checked_shr(shift))
            .unwrap_or(0);
        let mantissa = u32::try_from(mantissa).unwrap_or(0) & self.mantissa_mask();
        let field = u32::try_from(field).unwrap_or(0);
        let encoded = (field << self.mantissa_bits) | mantissa;
        sign | u8::try_from(encoded & 0x7f).unwrap_or(0)
    }
}

pub fn bf16_from_f64(value: f64) -> u16 {
    let bits = (value as f32).to_bits();
    u16::try_from(bits >> 16).unwrap_or(0)
}

pub fn bf16_to_f64(bits: u16) -> f64 {
    f64::from(f32::from_bits(u32::from(bits) << 16))
}

pub fn fe4m3_from_f64(value: f64) -> u8 {
    E4M3.encode(value)
}

pub fn fe4m3_to_f64(bits: u8) -> f64 {
    E4M3.decode(bits)
}

pub fn fe5m2_from_f64(value: f64) -> u8 {
    E5M2.encode(value)
}

pub fn fe5m2_to_f64(bits: u8) -> f64 {
    E5M2.decode(bits)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn float8_constants_match_glslang() {
        assert_eq!(fe4m3_from_f64(256.0), 120);
        assert_eq!(fe4m3_from_f64(1.125 * 256.0), 121);
        assert_eq!(fe4m3_from_f64(1.75 * 256.0), 126);
        assert_eq!(fe4m3_from_f64(1.85 * 256.0), 127);
        assert_eq!(fe4m3_from_f64(-256.0), 248);
        assert_eq!(fe4m3_from_f64(0.001), 0);
        assert_eq!(fe4m3_from_f64(0.0078125), 4);
        assert_eq!(fe4m3_to_f64(120), 256.0);
        assert_eq!(fe4m3_to_f64(4), 0.0078125);
        assert_eq!(fe5m2_to_f64(fe5m2_from_f64(3.0)), 3.0);
        assert_eq!(fe5m2_from_f64(1.0e6), 0x7c);
        assert_eq!(bf16_to_f64(bf16_from_f64(1.0)), 1.0);
        assert_eq!(bf16_from_f64(1.0), 16256);
    }
}
