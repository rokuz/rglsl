use super::reflect::{Layout, Scalar, ScalarKind, Slot};

#[derive(Debug, Clone)]
pub struct Rng {
    state: u64,
}

impl Rng {
    pub fn new(seed: u64) -> Self {
        Self { state: seed }
    }

    pub fn from_text(text: &str) -> Self {
        let mut hash: u64 = 0xcbf2_9ce4_8422_2325;
        for byte in text.bytes() {
            hash ^= u64::from(byte);
            hash = hash.wrapping_mul(0x0000_0100_0000_01b3);
        }
        Self::new(hash)
    }

    pub fn next_u64(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9e37_79b9_7f4a_7c15);
        let mut z = self.state;
        z = (z ^ (z >> 30)).wrapping_mul(0xbf58_476d_1ce4_e5b9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94d0_49bb_1331_11eb);
        z ^ (z >> 31)
    }

    pub fn below(&mut self, bound: u64) -> u64 {
        if bound == 0 {
            return 0;
        }
        self.next_u64() % bound
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Value {
    Float(f64),
    Int(i64),
}

impl Value {
    pub fn random(scalar: Scalar, rng: &mut Rng) -> Self {
        match scalar.kind {
            ScalarKind::Float => {
                let steps = i64::try_from(rng.below(33)).unwrap_or(0) - 16;
                Self::Float(steps as f64 / 8.0)
            }
            ScalarKind::Bool => Self::Int(i64::try_from(rng.below(2)).unwrap_or(0)),
            ScalarKind::Sint | ScalarKind::Uint => {
                Self::Int(i64::try_from(rng.below(8)).unwrap_or(0))
            }
        }
    }

    pub fn as_f64(self) -> f64 {
        match self {
            Self::Float(value) => value,
            Self::Int(value) => value as f64,
        }
    }

    pub fn as_i64(self) -> i64 {
        match self {
            Self::Float(value) => value as i64,
            Self::Int(value) => value,
        }
    }
}

pub fn f32_to_f16_bits(value: f32) -> u16 {
    let bits = value.to_bits();
    let sign = ((bits >> 16) & 0x8000) as u16;
    let exponent = ((bits >> 23) & 0xff) as i32;
    let mantissa = bits & 0x007f_ffff;
    if exponent == 0xff {
        let nan = if mantissa == 0 { 0 } else { 0x0200 };
        return sign | 0x7c00 | nan;
    }
    let unbiased = exponent - 127;
    if unbiased > 15 {
        return sign | 0x7c00;
    }
    if unbiased >= -14 {
        let half_exponent = u16::try_from(unbiased + 15).unwrap_or(0);
        return sign | (half_exponent << 10) | (mantissa >> 13) as u16;
    }
    if unbiased >= -24 {
        let shift = u32::try_from(-unbiased - 14 + 13).unwrap_or(31);
        let full = mantissa | 0x0080_0000;
        return sign | (full >> shift.min(31)) as u16;
    }
    sign
}

pub fn f16_bits_to_f64(bits: u16) -> f64 {
    let sign = if bits & 0x8000 != 0 { -1.0 } else { 1.0 };
    let exponent = i32::from((bits >> 10) & 0x1f);
    let mantissa = f64::from(bits & 0x3ff);
    match exponent {
        0 => sign * mantissa * 2f64.powi(-24),
        0x1f if mantissa == 0.0 => sign * f64::INFINITY,
        0x1f => f64::NAN,
        _ => sign * (1.0 + mantissa / 1024.0) * 2f64.powi(exponent - 15),
    }
}

pub fn write_scalar(bytes: &mut [u8], offset: u32, scalar: Scalar, value: Value) {
    let encoded: Vec<u8> = match (scalar.kind, scalar.width) {
        (ScalarKind::Float, 16) => f32_to_f16_bits(value.as_f64() as f32)
            .to_le_bytes()
            .to_vec(),
        (ScalarKind::Float, 64) => value.as_f64().to_le_bytes().to_vec(),
        (ScalarKind::Float, _) => (value.as_f64() as f32).to_le_bytes().to_vec(),
        (_, width) => {
            let raw = value.as_i64().to_le_bytes();
            let length = usize::try_from(width / 8).unwrap_or(4).clamp(1, 8);
            raw.get(..length).map(<[u8]>::to_vec).unwrap_or_default()
        }
    };
    let Ok(start) = usize::try_from(offset) else {
        return;
    };
    if let Some(target) = bytes.get_mut(start..start + encoded.len()) {
        target.copy_from_slice(&encoded);
    }
}

pub fn fill_random(layout: &Layout, runtime_length: u32, rng: &mut Rng) -> Vec<u8> {
    let size = usize::try_from(layout.size(runtime_length)).unwrap_or(0);
    let mut bytes = vec![0u8; size];
    let mut slots = Vec::new();
    layout.slots(0, runtime_length, &mut slots);
    for Slot { offset, scalar } in slots {
        write_scalar(&mut bytes, offset, scalar, Value::random(scalar, rng));
    }
    bytes
}

pub fn fill_values(layout: &Layout, runtime_length: u32, values: &[Value]) -> Vec<u8> {
    let size = usize::try_from(layout.size(runtime_length)).unwrap_or(0);
    let mut bytes = vec![0u8; size];
    let mut slots = Vec::new();
    layout.slots(0, runtime_length, &mut slots);
    for (Slot { offset, scalar }, value) in slots.into_iter().zip(values) {
        write_scalar(&mut bytes, offset, scalar, *value);
    }
    bytes
}

#[cfg(test)]
mod tests {
    use super::*;

    const F32: Scalar = Scalar {
        kind: ScalarKind::Float,
        width: 32,
    };
    const U32: Scalar = Scalar {
        kind: ScalarKind::Uint,
        width: 32,
    };

    #[test]
    fn rng_is_deterministic() {
        let mut a = Rng::from_text("shader.comp:0:1");
        let mut b = Rng::from_text("shader.comp:0:1");
        let mut c = Rng::from_text("shader.comp:0:2");
        let xs: Vec<u64> = (0..8).map(|_| a.next_u64()).collect();
        let ys: Vec<u64> = (0..8).map(|_| b.next_u64()).collect();
        let zs: Vec<u64> = (0..8).map(|_| c.next_u64()).collect();
        assert_eq!(xs, ys);
        assert_ne!(xs, zs);
    }

    #[test]
    fn random_values_are_small_and_exact() {
        let mut rng = Rng::new(7);
        for _ in 0..200 {
            let Value::Float(value) = Value::random(F32, &mut rng) else {
                panic!("expected a float");
            };
            assert!((-2.0..=2.0).contains(&value));
            assert_eq!(f64::from(value as f32), value);
            let Value::Int(value) = Value::random(U32, &mut rng) else {
                panic!("expected an integer");
            };
            assert!((0..8).contains(&value));
        }
    }

    #[test]
    fn half_conversion_round_trips() {
        for value in [0.0f32, 1.0, -2.5, 0.125, 65504.0, 6.103_515_6e-5] {
            assert_eq!(f16_bits_to_f64(f32_to_f16_bits(value)), f64::from(value));
        }
        assert_eq!(f32_to_f16_bits(1.0), 0x3c00);
        assert_eq!(f32_to_f16_bits(-2.0), 0xc000);
    }

    #[test]
    fn fills_std140_struct_with_matrix() {
        let layout = Layout::Struct {
            members: vec![
                (0, Layout::Scalar(U32)),
                (
                    16,
                    Layout::Matrix {
                        scalar: F32,
                        columns: 2,
                        rows: 2,
                        stride: 16,
                        row_major: false,
                    },
                ),
            ],
        };
        assert_eq!(layout.size(0), 40);
        let values: Vec<Value> = (1..=5).map(|v| Value::Int(v)).collect();
        let bytes = fill_values(&layout, 0, &values);
        assert_eq!(bytes.len(), 40);
        assert_eq!(&bytes[0..4], &1u32.to_le_bytes());
        assert_eq!(&bytes[16..20], &2f32.to_le_bytes());
        assert_eq!(&bytes[20..24], &3f32.to_le_bytes());
        assert_eq!(&bytes[32..36], &4f32.to_le_bytes());
        assert_eq!(&bytes[36..40], &5f32.to_le_bytes());
        assert_eq!(&bytes[24..32], &[0; 8]);
    }

    #[test]
    fn runtime_arrays_take_the_requested_length() {
        let layout = Layout::Struct {
            members: vec![
                (0, Layout::Scalar(U32)),
                (
                    16,
                    Layout::Array {
                        element: Box::new(Layout::Vector {
                            scalar: F32,
                            count: 3,
                        }),
                        length: None,
                        stride: 16,
                    },
                ),
            ],
        };
        assert!(layout.has_runtime_array());
        assert_eq!(layout.runtime_stride(), 16);
        assert_eq!(layout.size(4), 16 + 16 * 4);
        let mut rng = Rng::new(1);
        assert_eq!(fill_random(&layout, 4, &mut rng).len(), 80);
    }
}
