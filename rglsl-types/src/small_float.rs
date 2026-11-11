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

#[derive(Clone, Copy)]
struct Microscaling {
    exponent_bits: u32,
    fraction_bits: u32,
}

const E2M1: Microscaling = Microscaling {
    exponent_bits: 2,
    fraction_bits: 1,
};

const E3M2: Microscaling = Microscaling {
    exponent_bits: 3,
    fraction_bits: 2,
};

const E2M3: Microscaling = Microscaling {
    exponent_bits: 2,
    fraction_bits: 3,
};

const F32_FRACTION_BITS: u32 = 23;
const F32_FRACTION_MASK: u32 = (1 << F32_FRACTION_BITS) - 1;
const F32_EXPONENT_MASK: u32 = 0xff << F32_FRACTION_BITS;
const F32_BIAS: i32 = 127;

impl Microscaling {
    const fn bias(self) -> i32 {
        (1 << (self.exponent_bits - 1)) - 1
    }

    const fn used_bits(self) -> u32 {
        self.exponent_bits + self.fraction_bits + 1
    }

    const fn sign_mask(self) -> u32 {
        1 << (self.used_bits() - 1)
    }

    const fn used_mask(self) -> u32 {
        (1 << self.used_bits()) - 1
    }

    const fn fraction_mask(self) -> u32 {
        (1 << self.fraction_bits) - 1
    }

    const fn exponent_mask(self) -> u32 {
        ((1 << self.exponent_bits) - 1) << self.fraction_bits
    }

    fn decode(self, bits: u8) -> f64 {
        let bits = u32::from(bits) & self.used_mask();
        let sign = if bits & self.sign_mask() != 0 {
            -1.0
        } else {
            1.0
        };
        let exponent = (bits & self.exponent_mask()) >> self.fraction_bits;
        let fraction =
            f64::from(bits & self.fraction_mask()) * power_of_two(-i64::from(self.fraction_bits));
        let bias = i64::from(self.bias());
        let value = if exponent == 0 {
            fraction * power_of_two(1 - bias)
        } else {
            (1.0 + fraction) * power_of_two(i64::from(exponent) - bias)
        };
        sign * value
    }

    fn encode(self, value: f64) -> u8 {
        let bits = (value as f32).to_bits();
        let negative = bits & 0x8000_0000 != 0;
        let sign = if negative { self.sign_mask() } else { 0 };
        if bits & 0x7fff_ffff == 0 {
            return narrow(sign);
        }
        let significand = bits & F32_FRACTION_MASK;
        let exponent_bits = (bits & F32_EXPONENT_MASK) >> F32_FRACTION_BITS;
        let throwaway = F32_FRACTION_BITS - self.fraction_bits;
        let rounded = normalized_significand(bits) >> throwaway;
        let mut exponent = i32::try_from(exponent_bits).unwrap_or(0) - F32_BIAS;
        if exponent == -F32_BIAS {
            exponent += 1;
            let mut check = 1_u32 << (F32_FRACTION_BITS - 1);
            while check != 0 {
                exponent -= 1;
                if check & significand != 0 {
                    break;
                }
                check >>= 1;
            }
        }
        let all_ones = bits & F32_EXPONENT_MASK == F32_EXPONENT_MASK;
        let nan = all_ones && significand != 0;
        let infinite = !nan && (exponent > self.bias() + 1 || (significand == 0 && all_ones));
        if infinite {
            let mask = if negative {
                self.used_mask()
            } else {
                self.used_mask() & !self.sign_mask()
            };
            return narrow(mask);
        }
        if nan {
            let shifted = (significand >> throwaway) & 0xff;
            let shifted = if shifted == 0 { 1 } else { shifted };
            return narrow(sign | self.exponent_mask() | shifted);
        }
        self.assemble(sign, wrap_to_i8(exponent), rounded)
    }

    fn assemble(self, sign: u32, mut exponent: i32, mut significand: u32) -> u8 {
        let minimum = -self.bias();
        if exponent <= minimum {
            significand |= 1 << self.fraction_bits;
            significand >>= 1;
        }
        while exponent < minimum {
            significand >>= 1;
            exponent += 1;
        }
        let biased = wrap_to_i8(exponent + self.bias());
        let field = u32::from_ne_bytes(biased.to_ne_bytes()).wrapping_shl(self.fraction_bits)
            & self.exponent_mask();
        narrow(sign | field | (significand & self.fraction_mask()))
    }
}

fn narrow(bits: u32) -> u8 {
    u8::try_from(bits & 0xff).unwrap_or(0)
}

fn wrap_to_i8(value: i32) -> i32 {
    let byte = value.to_le_bytes()[0];
    i32::from(i8::from_le_bytes([byte]))
}

fn normalized_significand(bits: u32) -> u32 {
    if bits & 0x7fff_ffff == 0 {
        return 0;
    }
    let significand = bits & F32_FRACTION_MASK;
    let exponent_bits = (bits & F32_EXPONENT_MASK) >> F32_FRACTION_BITS;
    let mut exponent = i32::try_from(exponent_bits).unwrap_or(0) - F32_BIAS;
    if exponent == -F32_BIAS {
        let mut probe = significand;
        while probe != 0 && probe & (1 << (F32_FRACTION_BITS - 1)) == 0 {
            probe <<= 1;
            exponent -= 1;
        }
    }
    let mut normalized = significand;
    let mut index = exponent;
    while index <= -F32_BIAS {
        normalized <<= 1;
        index += 1;
    }
    normalized & F32_FRACTION_MASK
}

const UE8M0_NAN: u8 = 0xff;
const MXINT8_SCALE: f32 = 64.0;
const MXINT8_LIMIT: f32 = 127.0 / 64.0;

pub fn fe2m1_from_f64(value: f64) -> u8 {
    E2M1.encode(value)
}

pub fn fe2m1_to_f64(bits: u8) -> f64 {
    E2M1.decode(bits)
}

pub fn fe3m2_from_f64(value: f64) -> u8 {
    E3M2.encode(value)
}

pub fn fe3m2_to_f64(bits: u8) -> f64 {
    E3M2.decode(bits)
}

pub fn fe2m3_from_f64(value: f64) -> u8 {
    E2M3.encode(value)
}

pub fn fe2m3_to_f64(bits: u8) -> f64 {
    E2M3.decode(bits)
}

pub fn fue8m0_from_f64(value: f64) -> u8 {
    let value = value as f32;
    let value = if value < 0.0 { 0.0 } else { value };
    narrow(value.to_bits() >> F32_FRACTION_BITS)
}

pub fn fue8m0_to_f64(bits: u8) -> f64 {
    if bits == UE8M0_NAN {
        f64::NAN
    } else {
        power_of_two(i64::from(bits) - i64::from(F32_BIAS))
    }
}

fn round_half_away(value: f32) -> i32 {
    let truncated = value as i32;
    let fraction = value - truncated as f32;
    if fraction.abs() >= 0.5 {
        truncated + if value < 0.0 { -1 } else { 1 }
    } else {
        truncated
    }
}

pub fn fmxint8_from_f64(value: f64) -> u8 {
    let value = value as f32;
    let value = if MXINT8_LIMIT < value {
        MXINT8_LIMIT
    } else {
        value
    };
    let value = if value < -MXINT8_LIMIT {
        -MXINT8_LIMIT
    } else {
        value
    };
    round_half_away(value * MXINT8_SCALE).to_le_bytes()[0]
}

pub fn fmxint8_to_f64(bits: u8) -> f64 {
    f64::from(i8::from_le_bytes([bits])) / f64::from(MXINT8_SCALE)
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

    #[test]
    fn microscaling_constants_match_glslang() {
        let e2m1: [f64; 17] = [
            0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0, -0.0, -0.5, -1.0, -1.5, -2.0, -3.0, -4.0, -6.0,
            10.0,
        ];
        let encoded: [u8; 17] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7];
        for (value, bits) in e2m1.into_iter().zip(encoded) {
            assert_eq!(fe2m1_from_f64(value), bits, "{value}");
        }
        assert_eq!(fe2m1_from_f64(1.1), 2);
        assert_eq!(fe2m1_to_f64(7), 6.0);
        assert_eq!(fe2m1_to_f64(9), -0.5);
        for (value, bits) in [
            (0.0, 0),
            (0.125, 1),
            (1.0, 8),
            (7.5, 31),
            (-0.0, 32),
            (-0.125, 33),
            (-1.0, 40),
            (-7.5, 63),
            (10.0, 31),
        ] {
            assert_eq!(fe2m3_from_f64(value), bits, "{value}");
        }
        for (value, bits) in [
            (0.0, 0),
            (0.0625, 1),
            (1.0, 12),
            (28.0, 31),
            (-0.0, 32),
            (-0.0625, 33),
            (-1.0, 44),
            (-28.0, 63),
            (10.0, 25),
            (20.0, 29),
        ] {
            assert_eq!(fe3m2_from_f64(value), bits, "{value}");
        }
        assert_eq!(fe3m2_to_f64(25), 10.0);
        assert_eq!(fe2m3_to_f64(31), 7.5);
        for (value, bits) in [
            (0.0, 0),
            (5.88e-39, 0),
            (1.176e-38, 1),
            (8.51e37, 253),
            (1.71e38, 254),
            (f64::INFINITY, 255),
            (-100.0, 0),
            (f64::NEG_INFINITY, 0),
            (1.0, 127),
            (10.0, 130),
            (20.0, 131),
        ] {
            assert_eq!(fue8m0_from_f64(value), bits, "{value}");
        }
        assert_eq!(fue8m0_to_f64(130), 8.0);
        assert!(fue8m0_to_f64(255).is_nan());
        for (value, bits) in [
            (0.0, 0),
            (0.015625, 1),
            (1.0, 64),
            (2.0 - 0.015625, 127),
            (-0.015625, 255),
            (-1.0, 192),
            (-(2.0 - 0.015625), 129),
            (f64::INFINITY, 127),
            (-100.0, 129),
            (f64::NEG_INFINITY, 129),
            (10.0, 127),
        ] {
            assert_eq!(fmxint8_from_f64(value), bits, "{value}");
        }
        assert_eq!(fmxint8_to_f64(192), -1.0);
    }
}
