#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Scalar {
    Bool,
    Int,
    Uint,
    Float,
    Double,
    Int8,
    Uint8,
    Int16,
    Uint16,
    Int64,
    Uint64,
    Float16,
    BFloat16,
    FloatE4M3,
    FloatE5M2,
    FloatE2M1,
    FloatE3M2,
    FloatE2M3,
    FloatUE8M0,
    FloatMXINT8,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub struct NumericFeatures {
    pub explicit_arithmetic: bool,
    pub half_float: bool,
    pub int16: bool,
}

impl Scalar {
    pub const ALL: [Self; 20] = [
        Self::Bool,
        Self::Int,
        Self::Uint,
        Self::Float,
        Self::Double,
        Self::Int8,
        Self::Uint8,
        Self::Int16,
        Self::Uint16,
        Self::Int64,
        Self::Uint64,
        Self::Float16,
        Self::BFloat16,
        Self::FloatE4M3,
        Self::FloatE5M2,
        Self::FloatE2M1,
        Self::FloatE3M2,
        Self::FloatE2M3,
        Self::FloatUE8M0,
        Self::FloatMXINT8,
    ];

    pub const fn keyword(self) -> &'static str {
        match self {
            Self::Bool => "bool",
            Self::Int => "int",
            Self::Uint => "uint",
            Self::Float => "float",
            Self::Double => "double",
            Self::Int8 => "int8_t",
            Self::Uint8 => "uint8_t",
            Self::Int16 => "int16_t",
            Self::Uint16 => "uint16_t",
            Self::Int64 => "int64_t",
            Self::Uint64 => "uint64_t",
            Self::Float16 => "float16_t",
            Self::BFloat16 => "bfloat16_t",
            Self::FloatE4M3 => "floate4m3_t",
            Self::FloatE5M2 => "floate5m2_t",
            Self::FloatE2M1 => "floate2m1_t",
            Self::FloatE3M2 => "floate3m2_t",
            Self::FloatE2M3 => "floate2m3_t",
            Self::FloatUE8M0 => "floatue8m0_t",
            Self::FloatMXINT8 => "floatmxint8_t",
        }
    }

    pub const fn vector_prefix(self) -> &'static str {
        match self {
            Self::Bool => "bvec",
            Self::Int => "ivec",
            Self::Uint => "uvec",
            Self::Float => "vec",
            Self::Double => "dvec",
            Self::Int8 => "i8vec",
            Self::Uint8 => "u8vec",
            Self::Int16 => "i16vec",
            Self::Uint16 => "u16vec",
            Self::Int64 => "i64vec",
            Self::Uint64 => "u64vec",
            Self::Float16 => "f16vec",
            Self::BFloat16 => "bf16vec",
            Self::FloatE4M3 => "fe4m3vec",
            Self::FloatE5M2 => "fe5m2vec",
            Self::FloatE2M1 => "fe2m1vec",
            Self::FloatE3M2 => "fe3m2vec",
            Self::FloatE2M3 => "fe2m3vec",
            Self::FloatUE8M0 => "fue8m0vec",
            Self::FloatMXINT8 => "fmxint8vec",
        }
    }

    pub const fn matrix_prefix(self) -> Option<&'static str> {
        match self {
            Self::Float => Some("mat"),
            Self::Double => Some("dmat"),
            Self::Float16 => Some("f16mat"),
            _ => None,
        }
    }

    pub(crate) fn from_scalar_keyword(word: &str) -> Option<Self> {
        Some(match word {
            "int32_t" => Self::Int,
            "uint32_t" => Self::Uint,
            "float32_t" => Self::Float,
            "float64_t" => Self::Double,
            _ => {
                return Self::ALL
                    .into_iter()
                    .find(|scalar| scalar.keyword() == word);
            }
        })
    }

    pub(crate) fn vector_prefixes() -> impl Iterator<Item = (&'static str, Self)> {
        Self::ALL
            .into_iter()
            .map(|scalar| (scalar.vector_prefix(), scalar))
            .chain([
                ("i32vec", Self::Int),
                ("u32vec", Self::Uint),
                ("f32vec", Self::Float),
                ("f64vec", Self::Double),
            ])
    }

    pub(crate) fn matrix_prefixes() -> impl Iterator<Item = (&'static str, Self)> {
        Self::ALL
            .into_iter()
            .filter_map(|scalar| scalar.matrix_prefix().map(|prefix| (prefix, scalar)))
            .chain([("f32mat", Self::Float), ("f64mat", Self::Double)])
    }

    pub const fn bits(self) -> u32 {
        match self {
            Self::Bool | Self::Int | Self::Uint | Self::Float => 32,
            Self::Double | Self::Int64 | Self::Uint64 => 64,
            Self::Int8 | Self::Uint8 => 8,
            Self::Int16 | Self::Uint16 | Self::Float16 | Self::BFloat16 => 16,
            Self::FloatE4M3 | Self::FloatE5M2 | Self::FloatUE8M0 | Self::FloatMXINT8 => 8,
            Self::FloatE2M1 => 4,
            Self::FloatE3M2 | Self::FloatE2M3 => 6,
        }
    }

    pub const fn is_numeric(self) -> bool {
        !matches!(self, Self::Bool)
    }

    pub const fn is_integer(self) -> bool {
        self.is_signed() || self.is_unsigned()
    }

    pub const fn is_signed(self) -> bool {
        matches!(self, Self::Int | Self::Int8 | Self::Int16 | Self::Int64)
    }

    pub const fn is_unsigned(self) -> bool {
        matches!(self, Self::Uint | Self::Uint8 | Self::Uint16 | Self::Uint64)
    }

    pub const fn is_floating(self) -> bool {
        matches!(self, Self::Float | Self::Double | Self::Float16)
    }

    pub const fn cooperative_vector_family(self) -> Option<u8> {
        match self {
            Self::Float | Self::Float16 => Some(0),
            Self::Uint | Self::Uint8 | Self::Uint16 => Some(1),
            Self::Int | Self::Int8 | Self::Int16 => Some(2),
            _ => None,
        }
    }

    pub const fn is_16bit(self) -> bool {
        matches!(self, Self::Int16 | Self::Uint16 | Self::Float16)
    }

    pub const fn is_8bit(self) -> bool {
        matches!(self, Self::Int8 | Self::Uint8)
    }

    pub const fn unsigned(self) -> Self {
        match self {
            Self::Int => Self::Uint,
            Self::Int8 => Self::Uint8,
            Self::Int16 => Self::Uint16,
            Self::Int64 => Self::Uint64,
            other => other,
        }
    }

    const fn integral_promotion(self, target: Self) -> bool {
        matches!(target, Self::Int)
            && matches!(self, Self::Int8 | Self::Int16 | Self::Uint8 | Self::Uint16)
    }

    const fn floating_promotion(self, target: Self) -> bool {
        matches!(target, Self::Double) && matches!(self, Self::Float16 | Self::Float)
    }

    const fn integral_conversion(self, target: Self) -> bool {
        match self {
            Self::Int => matches!(target, Self::Uint | Self::Int64 | Self::Uint64),
            Self::Uint => matches!(target, Self::Int64 | Self::Uint64),
            Self::Int8 => matches!(
                target,
                Self::Uint8 | Self::Int16 | Self::Uint16 | Self::Uint | Self::Int64 | Self::Uint64
            ),
            Self::Uint8 => matches!(
                target,
                Self::Int16 | Self::Uint16 | Self::Uint | Self::Int64 | Self::Uint64
            ),
            Self::Int16 => matches!(
                target,
                Self::Uint16 | Self::Uint | Self::Int64 | Self::Uint64
            ),
            Self::Uint16 => matches!(target, Self::Uint | Self::Int64 | Self::Uint64),
            Self::Int64 => matches!(target, Self::Uint64),
            _ => false,
        }
    }

    const fn floating_conversion(self, target: Self) -> bool {
        matches!(target, Self::Float) && matches!(self, Self::Float16)
    }

    const fn floating_integral_conversion(self, target: Self) -> bool {
        match self {
            Self::Int | Self::Uint => matches!(target, Self::Float | Self::Double),
            Self::Int8 | Self::Uint8 | Self::Int16 | Self::Uint16 => {
                matches!(target, Self::Float16 | Self::Float | Self::Double)
            }
            Self::Int64 | Self::Uint64 => matches!(target, Self::Double),
            _ => false,
        }
    }

    pub const fn is_promotion(self, target: Self) -> bool {
        self.integral_promotion(target) || self.floating_promotion(target)
    }

    pub const fn is_conversion(self, target: Self) -> bool {
        self.integral_conversion(target)
            || self.floating_conversion(target)
            || self.floating_integral_conversion(target)
    }

    pub const fn is_encoded_float(self) -> bool {
        matches!(
            self,
            Self::BFloat16
                | Self::FloatE4M3
                | Self::FloatE5M2
                | Self::FloatE2M1
                | Self::FloatE3M2
                | Self::FloatE2M3
                | Self::FloatUE8M0
                | Self::FloatMXINT8
        )
    }

    pub const fn is_microscaling(self) -> bool {
        matches!(
            self,
            Self::FloatE2M1
                | Self::FloatE3M2
                | Self::FloatE2M3
                | Self::FloatUE8M0
                | Self::FloatMXINT8
        )
    }

    pub const fn is_sub_byte(self) -> bool {
        matches!(self, Self::FloatE2M1 | Self::FloatE3M2 | Self::FloatE2M3)
    }

    pub const fn promotes_to(self, target: Self, features: NumericFeatures) -> bool {
        if self as u8 == target as u8 {
            return true;
        }
        match self {
            Self::BFloat16 => return matches!(target, Self::Float | Self::Double),
            Self::FloatE4M3 | Self::FloatE5M2 => {
                return matches!(target, Self::Float16 | Self::Float | Self::Double);
            }
            Self::FloatE2M1 => {
                return matches!(
                    target,
                    Self::Float16
                        | Self::Float
                        | Self::Double
                        | Self::BFloat16
                        | Self::FloatE4M3
                        | Self::FloatE5M2
                );
            }
            Self::FloatE3M2 | Self::FloatE2M3 | Self::FloatMXINT8 => {
                return matches!(
                    target,
                    Self::Float16 | Self::Float | Self::Double | Self::BFloat16
                );
            }
            Self::FloatUE8M0 => return false,
            _ => {}
        }
        if features.explicit_arithmetic && (self.is_promotion(target) || self.is_conversion(target))
        {
            return true;
        }
        let int16 = features.int16;
        let half = features.half_float;
        match target {
            Self::Double => match self {
                Self::Int | Self::Uint | Self::Int64 | Self::Uint64 | Self::Float => true,
                Self::Int16 | Self::Uint16 => int16,
                Self::Float16 => half,
                _ => false,
            },
            Self::Float => match self {
                Self::Int | Self::Uint => true,
                Self::Int16 | Self::Uint16 => int16,
                Self::Float16 => half,
                _ => false,
            },
            Self::Uint => match self {
                Self::Int => true,
                Self::Int16 | Self::Uint16 => int16,
                _ => false,
            },
            Self::Int => matches!(self, Self::Int16) && int16,
            Self::Uint64 => match self {
                Self::Int | Self::Uint | Self::Int64 => true,
                Self::Int16 | Self::Uint16 => int16,
                _ => false,
            },
            Self::Int64 => match self {
                Self::Int => true,
                Self::Int16 => int16,
                _ => false,
            },
            Self::Float16 => matches!(self, Self::Int16 | Self::Uint16) && int16,
            Self::Uint16 => matches!(self, Self::Int16) && int16,
            _ => false,
        }
    }

    pub const fn converts_implicitly_to(self, target: Self) -> bool {
        self.promotes_to(
            target,
            NumericFeatures {
                explicit_arithmetic: false,
                half_float: false,
                int16: false,
            },
        )
    }

    pub fn common(self, other: Self, features: NumericFeatures) -> Option<Self> {
        if !self.is_numeric() || !other.is_numeric() {
            return None;
        }
        if self == other {
            return Some(self);
        }
        let reaches = |from: Self, to: Self| from.promotes_to(to, features);
        for target in [Self::Double, Self::Float, Self::Float16] {
            if (self == target && reaches(other, target))
                || (other == target && reaches(self, target))
            {
                return Some(target);
            }
        }
        if !self.is_integer()
            || !other.is_integer()
            || !(reaches(self, other) || reaches(other, self))
        {
            return None;
        }
        let wider = |first: Self, second: Self| {
            if first.bits() < second.bits() {
                second
            } else {
                first
            }
        };
        Some(if self.is_signed() == other.is_signed() {
            wider(self, other)
        } else if self.is_unsigned() && self.bits() > other.bits() {
            self
        } else if other.is_unsigned() && other.bits() > self.bits() {
            other
        } else if self.is_signed() {
            if self.bits() > other.bits() {
                self
            } else {
                self.unsigned()
            }
        } else if other.bits() > self.bits() {
            other
        } else {
            other.unsigned()
        })
    }
}
