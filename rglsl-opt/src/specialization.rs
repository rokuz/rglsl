use half::f16;
use rglsl::{Literal, Scalar, ScalarKind};

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Specialization {
    pub id: u32,
    pub value: String,
}

impl Specialization {
    pub fn new(id: u32, value: impl Into<String>) -> Self {
        Self {
            id,
            value: value.into(),
        }
    }

    pub fn parse(pair: &str) -> Result<Self, String> {
        let Some((id, value)) = pair.split_once(':') else {
            return Err(format!("`{pair}` is not <id>:<value>"));
        };
        let id = id
            .trim()
            .parse()
            .map_err(|_| format!("`{id}` is not a specialization constant id"))?;
        let value = value.trim();
        if value.is_empty() {
            return Err(format!("specialization constant {id} has no value"));
        }
        Ok(Self::new(id, value))
    }

    pub fn parse_list(list: &str) -> Result<Vec<Self>, String> {
        list.split([' ', ',', '\t', '\n'])
            .filter(|pair| !pair.is_empty())
            .map(Self::parse)
            .collect()
    }

    pub fn literal(&self, scalar: Scalar) -> Result<Literal, String> {
        let text = self.value.as_str();
        let invalid = |what: &str| {
            format!(
                "specialization constant {} is {what}, `{text}` is not such a value",
                self.id
            )
        };
        match (scalar.kind, scalar.width) {
            (ScalarKind::Bool, _) => match text {
                "true" => Ok(Literal::Bool(true)),
                "false" => Ok(Literal::Bool(false)),
                _ => Err(invalid("a bool")),
            },
            (ScalarKind::Sint | ScalarKind::Uint, width) => {
                let kind = if scalar.kind == ScalarKind::Sint {
                    "a signed"
                } else {
                    "an unsigned"
                };
                let what = format!("{kind} {}-bit integer", u32::from(width) * 8);
                integer(text)
                    .and_then(|value| integer_literal(scalar.kind, width, value))
                    .ok_or_else(|| invalid(&what))
            }
            (ScalarKind::Float, 2) => text
                .parse::<f64>()
                .map(|value| Literal::F16(f16::from_f64(value)))
                .map_err(|_| invalid("a 16-bit float")),
            (ScalarKind::Float, 4) => text
                .parse::<f32>()
                .map(Literal::F32)
                .map_err(|_| invalid("a 32-bit float")),
            (ScalarKind::Float, 8) => text
                .parse::<f64>()
                .map(Literal::F64)
                .map_err(|_| invalid("a 64-bit float")),
            _ => Err(format!(
                "specialization constant {} has a type that cannot be specialized while compiling",
                self.id
            )),
        }
    }
}

fn integer(text: &str) -> Option<i128> {
    let (negative, digits) = match text.strip_prefix('-') {
        Some(rest) => (true, rest),
        None => (false, text.strip_prefix('+').unwrap_or(text)),
    };
    let magnitude = match digits
        .strip_prefix("0x")
        .or_else(|| digits.strip_prefix("0X"))
    {
        Some(hex) => i128::from_str_radix(hex, 16).ok()?,
        None if !digits.is_empty() && digits.bytes().all(|byte| byte.is_ascii_digit()) => {
            digits.parse().ok()?
        }
        None => return None,
    };
    Some(if negative { -magnitude } else { magnitude })
}

fn integer_literal(kind: ScalarKind, width: u8, value: i128) -> Option<Literal> {
    Some(match (kind, width) {
        (ScalarKind::Sint, 1) => Literal::I8(i8::try_from(value).ok()?),
        (ScalarKind::Sint, 2) => Literal::I16(i16::try_from(value).ok()?),
        (ScalarKind::Sint, 4) => Literal::I32(i32::try_from(value).ok()?),
        (ScalarKind::Sint, 8) => Literal::I64(i64::try_from(value).ok()?),
        (ScalarKind::Uint, 1) => Literal::U8(u8::try_from(value).ok()?),
        (ScalarKind::Uint, 2) => Literal::U16(u16::try_from(value).ok()?),
        (ScalarKind::Uint, 4) => Literal::U32(u32::try_from(value).ok()?),
        (ScalarKind::Uint, 8) => Literal::U64(u64::try_from(value).ok()?),
        _ => return None,
    })
}
