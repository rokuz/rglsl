use super::data::f16_bits_to_f64;
use super::reflect::{Scalar, ScalarKind, Slot};

pub const MAX_ULP: u64 = 4;

#[derive(Debug, Clone, PartialEq)]
pub enum Comparison {
    Equal { tolerated: usize },
    Differ(Difference),
}

#[derive(Debug, Clone, PartialEq)]
pub struct Difference {
    pub offset: u32,
    pub expected: String,
    pub actual: String,
    pub count: usize,
}

fn read(bytes: &[u8], offset: u32, size: u32) -> Option<u64> {
    let start = usize::try_from(offset).ok()?;
    let end = start.checked_add(usize::try_from(size).ok()?)?;
    let slice = bytes.get(start..end)?;
    let mut raw = [0u8; 8];
    raw.get_mut(..slice.len())?.copy_from_slice(slice);
    Some(u64::from_le_bytes(raw))
}

fn ordered(bits: u64, width: u32) -> i128 {
    let sign_bit = 1u64 << (width - 1);
    let magnitude = i128::from(bits & (sign_bit - 1));
    if bits & sign_bit != 0 {
        -magnitude
    } else {
        magnitude
    }
}

fn float_value(bits: u64, width: u32) -> f64 {
    match width {
        16 => f16_bits_to_f64(u16::try_from(bits).unwrap_or(0)),
        32 => f64::from(f32::from_bits(u32::try_from(bits).unwrap_or(0))),
        _ => f64::from_bits(bits),
    }
}

pub fn floats_match(expected: u64, actual: u64, width: u32) -> Option<bool> {
    if expected == actual {
        return Some(false);
    }
    let a = float_value(expected, width);
    let b = float_value(actual, width);
    if a.is_nan() && b.is_nan() {
        return Some(true);
    }
    if a == 0.0 && b == 0.0 {
        return Some(true);
    }
    if a.is_nan() || b.is_nan() || a.is_infinite() || b.is_infinite() {
        return None;
    }
    let distance = (ordered(expected, width) - ordered(actual, width)).unsigned_abs();
    (distance <= u128::from(MAX_ULP)).then_some(true)
}

fn display(bits: u64, scalar: Scalar) -> String {
    match scalar.kind {
        ScalarKind::Float => format!("{:?}", float_value(bits, scalar.width)),
        ScalarKind::Sint => {
            let shift = 64 - scalar.width.min(64);
            let value = ((bits << shift) as i64) >> shift;
            value.to_string()
        }
        ScalarKind::Uint | ScalarKind::Bool => bits.to_string(),
    }
}

pub fn compare(expected: &[u8], actual: &[u8], slots: &[Slot]) -> Comparison {
    if expected.len() != actual.len() {
        return Comparison::Differ(Difference {
            offset: 0,
            expected: format!("{} bytes", expected.len()),
            actual: format!("{} bytes", actual.len()),
            count: 1,
        });
    }
    let mut tolerated = 0;
    let mut first: Option<Difference> = None;
    let mut count = 0;
    for slot in slots {
        let size = slot.scalar.bytes();
        let (Some(a), Some(b)) = (
            read(expected, slot.offset, size),
            read(actual, slot.offset, size),
        ) else {
            continue;
        };
        let matches = match slot.scalar.kind {
            ScalarKind::Float => floats_match(a, b, slot.scalar.width),
            ScalarKind::Bool => Some(false).filter(|_| (a != 0) == (b != 0)),
            ScalarKind::Sint | ScalarKind::Uint => Some(false).filter(|_| a == b),
        };
        match matches {
            Some(true) => tolerated += 1,
            Some(false) => {}
            None => {
                count += 1;
                if first.is_none() {
                    first = Some(Difference {
                        offset: slot.offset,
                        expected: display(a, slot.scalar),
                        actual: display(b, slot.scalar),
                        count: 0,
                    });
                }
            }
        }
    }
    match first {
        Some(difference) => Comparison::Differ(Difference {
            count,
            ..difference
        }),
        None => Comparison::Equal { tolerated },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const F32: Scalar = Scalar {
        kind: ScalarKind::Float,
        width: 32,
    };
    const I32: Scalar = Scalar {
        kind: ScalarKind::Sint,
        width: 32,
    };

    fn floats(values: &[f32]) -> Vec<u8> {
        values.iter().flat_map(|v| v.to_le_bytes()).collect()
    }

    fn slots(scalar: Scalar, count: u32) -> Vec<Slot> {
        (0..count)
            .map(|i| Slot {
                offset: i * scalar.bytes(),
                scalar,
            })
            .collect()
    }

    #[test]
    fn equal_bytes_are_equal() {
        let a = floats(&[1.0, 2.0]);
        assert_eq!(
            compare(&a, &a, &slots(F32, 2)),
            Comparison::Equal { tolerated: 0 }
        );
    }

    #[test]
    fn floats_within_ulps_are_tolerated() {
        let a = floats(&[1.0, f32::NAN, 0.0]);
        let next = f32::from_bits(1.0f32.to_bits() + 3);
        let b = floats(&[next, f32::from_bits(0x7fc0_0001), -0.0]);
        assert_eq!(
            compare(&a, &b, &slots(F32, 3)),
            Comparison::Equal { tolerated: 3 }
        );
    }

    #[test]
    fn floats_beyond_ulps_differ() {
        let a = floats(&[1.0, 2.0, 3.0]);
        let b = floats(&[1.0, f32::from_bits(2.0f32.to_bits() + 5), 4.0]);
        let Comparison::Differ(difference) = compare(&a, &b, &slots(F32, 3)) else {
            panic!("expected a difference");
        };
        assert_eq!(difference.offset, 4);
        assert_eq!(difference.count, 2);
        assert_eq!(difference.expected, "2.0");
    }

    #[test]
    fn ulps_cross_zero_and_nan_is_not_a_number() {
        let tiny = f32::from_bits(1);
        let minus_tiny = -tiny;
        assert_eq!(
            floats_match(
                u64::from(tiny.to_bits()),
                u64::from(minus_tiny.to_bits()),
                32
            ),
            Some(true)
        );
        assert_eq!(
            floats_match(
                u64::from(1.0f32.to_bits()),
                u64::from(f32::NAN.to_bits()),
                32
            ),
            None
        );
        assert_eq!(
            floats_match(
                u64::from(f32::INFINITY.to_bits()),
                u64::from(f32::MAX.to_bits()),
                32
            ),
            None
        );
    }

    #[test]
    fn integers_are_exact_and_padding_is_ignored() {
        let a: Vec<u8> = [5i32, -1, 9].iter().flat_map(|v| v.to_le_bytes()).collect();
        let mut b = a.clone();
        b[8..12].copy_from_slice(&(-1i32).to_le_bytes());
        let only_first_two = slots(I32, 2);
        assert_eq!(
            compare(&a, &b, &only_first_two),
            Comparison::Equal { tolerated: 0 }
        );
        let Comparison::Differ(difference) = compare(&a, &b, &slots(I32, 3)) else {
            panic!("expected a difference");
        };
        assert_eq!(difference.offset, 8);
        assert_eq!(difference.expected, "9");
        assert_eq!(difference.actual, "-1");
    }

    #[test]
    fn sizes_must_match() {
        assert!(matches!(
            compare(&[0; 4], &[0; 8], &[]),
            Comparison::Differ(_)
        ));
    }
}
