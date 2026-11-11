use alloc::string::String;
use alloc::vec::Vec;
use core::fmt;

use rglsl_ast::ast::NodeId;

use crate::scope::{Qualifiers, SymbolId};
use crate::spirv::{SpirvType, SpirvTypeId};

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
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub struct NumericFeatures {
    pub explicit_arithmetic: bool,
    pub half_float: bool,
    pub int16: bool,
}

impl Scalar {
    pub const ALL: [Self; 15] = [
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
    ];

    pub const fn keyword(self) -> &'static str {
        self.syntax().keyword()
    }

    pub const fn vector_prefix(self) -> &'static str {
        self.syntax().vector_prefix()
    }

    pub const fn matrix_prefix(self) -> &'static str {
        match self.syntax().matrix_prefix() {
            Some(prefix) => prefix,
            None => "mat",
        }
    }

    const fn syntax(self) -> rglsl_ast::ast::ScalarType {
        use rglsl_ast::ast::ScalarType;
        match self {
            Self::Bool => ScalarType::Bool,
            Self::Int => ScalarType::Int,
            Self::Uint => ScalarType::Uint,
            Self::Float => ScalarType::Float,
            Self::Double => ScalarType::Double,
            Self::Int8 => ScalarType::Int8,
            Self::Uint8 => ScalarType::Uint8,
            Self::Int16 => ScalarType::Int16,
            Self::Uint16 => ScalarType::Uint16,
            Self::Int64 => ScalarType::Int64,
            Self::Uint64 => ScalarType::Uint64,
            Self::Float16 => ScalarType::Float16,
            Self::BFloat16 => ScalarType::BFloat16,
            Self::FloatE4M3 => ScalarType::FloatE4M3,
            Self::FloatE5M2 => ScalarType::FloatE5M2,
        }
    }

    pub const fn bits(self) -> u32 {
        match self {
            Self::Bool | Self::Int | Self::Uint | Self::Float => 32,
            Self::Double | Self::Int64 | Self::Uint64 => 64,
            Self::Int8 | Self::Uint8 => 8,
            Self::Int16 | Self::Uint16 | Self::Float16 | Self::BFloat16 => 16,
            Self::FloatE4M3 | Self::FloatE5M2 => 8,
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
        matches!(self, Self::BFloat16 | Self::FloatE4M3 | Self::FloatE5M2)
    }

    pub const fn promotes_to(self, target: Self, features: NumericFeatures) -> bool {
        if self as u8 == target as u8 {
            return true;
        }
        match self {
            Self::BFloat16 => return matches!(target, Self::Float | Self::Double),
            Self::FloatE4M3 | Self::FloatE5M2 => {
                return matches!(target, Self::Float16 | Self::Float | Self::Double)
            }
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

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct StructId(pub(crate) u32);

impl StructId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct BlockId(pub(crate) u32);

impl BlockId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum OpaqueKind {
    Sampler,
    CombinedSampler,
    Texture,
    Image,
    SubpassInput,
    AccelerationStructure,
    RayQuery,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum TextureDimension {
    D1,
    D2,
    D3,
    Cube,
    Buffer,
}

impl TextureDimension {
    pub const ALL: [Self; 5] = [Self::D1, Self::D2, Self::D3, Self::Cube, Self::Buffer];

    pub const fn coordinate_count(self) -> u8 {
        match self {
            Self::D1 | Self::Buffer => 1,
            Self::D2 => 2,
            Self::D3 | Self::Cube => 3,
        }
    }

    const fn suffix(self) -> &'static str {
        match self {
            Self::D1 => "1D",
            Self::D2 => "2D",
            Self::D3 => "3D",
            Self::Cube => "Cube",
            Self::Buffer => "Buffer",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum SampledType {
    Float,
    Int,
    Uint,
}

impl SampledType {
    pub const ALL: [Self; 3] = [Self::Float, Self::Int, Self::Uint];

    pub const fn scalar(self) -> Scalar {
        match self {
            Self::Float => Scalar::Float,
            Self::Int => Scalar::Int,
            Self::Uint => Scalar::Uint,
        }
    }

    const fn prefix(self) -> &'static str {
        match self {
            Self::Float => "",
            Self::Int => "i",
            Self::Uint => "u",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct Opaque {
    pub kind: OpaqueKind,
    pub sampled: SampledType,
    pub dimension: TextureDimension,
    pub arrayed: bool,
    pub shadow: bool,
    pub multisample: bool,
}

impl Opaque {
    pub const fn plain_sampler(shadow: bool) -> Self {
        Self {
            kind: OpaqueKind::Sampler,
            sampled: SampledType::Float,
            dimension: TextureDimension::D2,
            arrayed: false,
            shadow,
            multisample: false,
        }
    }

    pub const fn subpass_input(sampled: SampledType, multisample: bool) -> Self {
        Self {
            kind: OpaqueKind::SubpassInput,
            sampled,
            dimension: TextureDimension::D2,
            arrayed: false,
            shadow: false,
            multisample,
        }
    }

    pub const fn ray(kind: OpaqueKind) -> Self {
        Self {
            kind,
            sampled: SampledType::Float,
            dimension: TextureDimension::D2,
            arrayed: false,
            shadow: false,
            multisample: false,
        }
    }

    pub const fn is_acceleration_structure(self) -> bool {
        matches!(self.kind, OpaqueKind::AccelerationStructure)
    }

    pub const fn is_ray_query(self) -> bool {
        matches!(self.kind, OpaqueKind::RayQuery)
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        match word {
            "sampler" => return Some(Self::plain_sampler(false)),
            "samplerShadow" => return Some(Self::plain_sampler(true)),
            "accelerationStructureEXT" | "accelerationStructureNV" => {
                return Some(Self::ray(OpaqueKind::AccelerationStructure))
            }
            "rayQueryEXT" => return Some(Self::ray(OpaqueKind::RayQuery)),
            _ => {}
        }
        let families = ["sampler", "texture", "image", "subpassInput"];
        let is_family = |rest: &str| families.iter().any(|family| rest.starts_with(family));
        let (sampled, rest) = match (word.strip_prefix('i'), word.strip_prefix('u')) {
            _ if is_family(word) => (SampledType::Float, word),
            (Some(rest), _) if is_family(rest) => (SampledType::Int, rest),
            (_, Some(rest)) if is_family(rest) => (SampledType::Uint, rest),
            _ => return None,
        };
        match rest {
            "subpassInput" => return Some(Self::subpass_input(sampled, false)),
            "subpassInputMS" => return Some(Self::subpass_input(sampled, true)),
            _ => {}
        }
        let (kind, shape) = if let Some(shape) = rest.strip_prefix("sampler") {
            (OpaqueKind::CombinedSampler, shape)
        } else if let Some(shape) = rest.strip_prefix("texture") {
            (OpaqueKind::Texture, shape)
        } else if let Some(shape) = rest.strip_prefix("image") {
            (OpaqueKind::Image, shape)
        } else {
            return None;
        };
        let (shape, shadow) = match shape.strip_suffix("Shadow") {
            Some(shape) => (shape, true),
            None => (shape, false),
        };
        if shadow && (kind != OpaqueKind::CombinedSampler || sampled != SampledType::Float) {
            return None;
        }
        let (dimension, arrayed, multisample) = match shape {
            "1D" => (TextureDimension::D1, false, false),
            "2D" => (TextureDimension::D2, false, false),
            "3D" => (TextureDimension::D3, false, false),
            "Cube" => (TextureDimension::Cube, false, false),
            "1DArray" => (TextureDimension::D1, true, false),
            "2DArray" => (TextureDimension::D2, true, false),
            "CubeArray" => (TextureDimension::Cube, true, false),
            "Buffer" => (TextureDimension::Buffer, false, false),
            "2DMS" => (TextureDimension::D2, false, true),
            "2DMSArray" => (TextureDimension::D2, true, true),
            _ => return None,
        };
        if shadow
            && (multisample || matches!(dimension, TextureDimension::D3 | TextureDimension::Buffer))
        {
            return None;
        }
        Some(Self {
            kind,
            sampled,
            dimension,
            arrayed,
            shadow,
            multisample,
        })
    }

    pub const fn with_kind(self, kind: OpaqueKind) -> Self {
        Self { kind, ..self }
    }

    pub const fn is_image(self) -> bool {
        matches!(self.kind, OpaqueKind::Image)
    }

    pub const fn is_combined(self) -> bool {
        matches!(self.kind, OpaqueKind::CombinedSampler)
    }

    pub const fn is_buffer(self) -> bool {
        matches!(self.dimension, TextureDimension::Buffer)
    }
}

impl fmt::Display for Opaque {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let family = match self.kind {
            OpaqueKind::Sampler => {
                return formatter.write_str(if self.shadow {
                    "samplerShadow"
                } else {
                    "sampler"
                });
            }
            OpaqueKind::SubpassInput => {
                return write!(
                    formatter,
                    "{}subpassInput{}",
                    self.sampled.prefix(),
                    if self.multisample { "MS" } else { "" }
                );
            }
            OpaqueKind::AccelerationStructure => {
                return formatter.write_str("accelerationStructureEXT");
            }
            OpaqueKind::RayQuery => return formatter.write_str("rayQueryEXT"),
            OpaqueKind::CombinedSampler => "sampler",
            OpaqueKind::Texture => "texture",
            OpaqueKind::Image => "image",
        };
        write!(
            formatter,
            "{}{}{}{}{}{}",
            self.sampled.prefix(),
            family,
            self.dimension.suffix(),
            if self.multisample { "MS" } else { "" },
            if self.arrayed { "Array" } else { "" },
            if self.shadow { "Shadow" } else { "" }
        )
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum TypeKind {
    Error,
    Void,
    String,
    Scalar(Scalar),
    Vector {
        scalar: Scalar,
        size: u8,
    },
    Matrix {
        scalar: Scalar,
        columns: u8,
        rows: u8,
    },
    Struct(StructId),
    Block(BlockId),
    Reference(BlockId),
    Opaque(Opaque),
    CooperativeMatrix(CooperativeMatrix),
    LongVector {
        scalar: Scalar,
        size: ArraySize,
    },
    CooperativeVector {
        scalar: Scalar,
        size: ArraySize,
    },
    TensorLayout {
        dimensions: ArraySize,
        clamp_mode: ArraySize,
    },
    TensorView {
        dimensions: ArraySize,
        has_dimensions: bool,
        permutation: [u8; 5],
    },
    Tensor {
        scalar: Scalar,
        rank: u32,
    },
    Spirv(SpirvTypeId),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum CooperativeUse {
    A,
    B,
    Accumulator,
    Nv,
}

impl CooperativeUse {
    pub const fn from_value(value: i64) -> Option<Self> {
        match value {
            0 => Some(Self::A),
            1 => Some(Self::B),
            2 => Some(Self::Accumulator),
            _ => None,
        }
    }

    pub const fn value(self) -> u32 {
        match self {
            Self::A => 0,
            Self::B => 1,
            Self::Accumulator | Self::Nv => 2,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct CooperativeMatrix {
    pub scalar: Scalar,
    pub scope: ArraySize,
    pub rows: ArraySize,
    pub columns: ArraySize,
    pub usage: CooperativeUse,
    pub spirv_element: bool,
}

impl CooperativeMatrix {
    pub fn same_shape(&self, other: &Self) -> bool {
        self.scope == other.scope
            && self.rows == other.rows
            && self.columns == other.columns
            && self.usage == other.usage
    }

    pub const fn with_scalar(self, scalar: Scalar) -> Self {
        Self { scalar, ..self }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum ArraySize {
    Sized(u32),
    Specialized(SpecializedSize),
    Unsized,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum SpecializedSize {
    Constant { symbol: SymbolId, default: u32 },
    Expression(NodeId),
}

impl ArraySize {
    pub const fn nominal(self) -> Option<u32> {
        match self {
            Self::Sized(size)
            | Self::Specialized(SpecializedSize::Constant { default: size, .. }) => Some(size),
            Self::Specialized(SpecializedSize::Expression(_)) | Self::Unsized => None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct Type {
    pub kind: TypeKind,
    pub array: Vec<ArraySize>,
}

impl Type {
    pub const ERROR: Self = Self::new(TypeKind::Error);
    pub const VOID: Self = Self::new(TypeKind::Void);
    pub const STRING: Self = Self::new(TypeKind::String);
    pub const BOOL: Self = Self::scalar(Scalar::Bool);
    pub const INT: Self = Self::scalar(Scalar::Int);
    pub const UINT: Self = Self::scalar(Scalar::Uint);
    pub const FLOAT: Self = Self::scalar(Scalar::Float);
    pub const DOUBLE: Self = Self::scalar(Scalar::Double);

    pub const fn new(kind: TypeKind) -> Self {
        Self {
            kind,
            array: Vec::new(),
        }
    }

    pub const fn scalar(scalar: Scalar) -> Self {
        Self::new(TypeKind::Scalar(scalar))
    }

    pub const fn vector(scalar: Scalar, size: u8) -> Self {
        if size <= 1 {
            Self::scalar(scalar)
        } else {
            Self::new(TypeKind::Vector { scalar, size })
        }
    }

    pub const fn matrix(scalar: Scalar, columns: u8, rows: u8) -> Self {
        Self::new(TypeKind::Matrix {
            scalar,
            columns,
            rows,
        })
    }

    pub const fn opaque(opaque: Opaque) -> Self {
        Self::new(TypeKind::Opaque(opaque))
    }

    pub const fn structure(id: StructId) -> Self {
        Self::new(TypeKind::Struct(id))
    }

    pub const fn block(id: BlockId) -> Self {
        Self::new(TypeKind::Block(id))
    }

    pub const fn reference(id: BlockId) -> Self {
        Self::new(TypeKind::Reference(id))
    }

    pub const fn is_reference(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::Reference(_))
    }

    pub const fn as_reference(&self) -> Option<BlockId> {
        match self.kind {
            TypeKind::Reference(id) if !self.is_array() => Some(id),
            _ => None,
        }
    }

    pub fn contains_reference(&self, registry: &TypeRegistry) -> bool {
        match self.kind {
            TypeKind::Reference(_) => true,
            TypeKind::Struct(id) => registry
                .structure(id)
                .is_some_and(|structure| structure.contains_reference),
            _ => false,
        }
    }

    pub fn array_of(mut self, size: ArraySize) -> Self {
        self.array.insert(0, size);
        self
    }

    pub fn with_dimensions(mut self, outer: &[ArraySize]) -> Self {
        let mut dimensions = outer.to_vec();
        dimensions.append(&mut self.array);
        self.array = dimensions;
        self
    }

    pub const fn is_error(&self) -> bool {
        matches!(self.kind, TypeKind::Error)
    }

    pub const fn is_void(&self) -> bool {
        matches!(self.kind, TypeKind::Void)
    }

    pub const fn is_string(&self) -> bool {
        matches!(self.kind, TypeKind::String)
    }

    pub const fn is_array(&self) -> bool {
        !self.array.is_empty()
    }

    pub const fn is_scalar(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::Scalar(_))
    }

    pub const fn is_vector(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::Vector { .. })
    }

    pub const fn is_matrix(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::Matrix { .. })
    }

    pub const fn is_struct(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::Struct(_))
    }

    pub const fn base_scalar(&self) -> Option<Scalar> {
        match self.kind {
            TypeKind::Scalar(scalar)
            | TypeKind::Vector { scalar, .. }
            | TypeKind::Matrix { scalar, .. }
            | TypeKind::LongVector { scalar, .. }
            | TypeKind::CooperativeVector { scalar, .. }
            | TypeKind::CooperativeMatrix(CooperativeMatrix { scalar, .. }) => Some(scalar),
            _ => None,
        }
    }

    pub const fn is_long_vector(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::LongVector { .. })
    }

    pub const fn is_cooperative_vector(&self) -> bool {
        !self.is_array() && matches!(self.kind, TypeKind::CooperativeVector { .. })
    }

    pub const fn as_cooperative_matrix(&self) -> Option<CooperativeMatrix> {
        match self.kind {
            TypeKind::CooperativeMatrix(matrix) if !self.is_array() => Some(matrix),
            _ => None,
        }
    }

    pub const fn sized_vector_length(&self) -> Option<ArraySize> {
        match self.kind {
            TypeKind::LongVector { size, .. } | TypeKind::CooperativeVector { size, .. }
                if !self.is_array() =>
            {
                Some(size)
            }
            _ => None,
        }
    }

    pub fn contains_cooperative(&self, registry: &TypeRegistry) -> bool {
        match self.kind {
            TypeKind::CooperativeMatrix(_) | TypeKind::CooperativeVector { .. } => true,
            TypeKind::Struct(id) => registry.structure(id).is_some_and(|structure| {
                structure
                    .members
                    .iter()
                    .any(|member| member.ty.contains_cooperative(registry))
            }),
            _ => false,
        }
    }

    pub const fn scalar_type(&self) -> Option<Scalar> {
        if self.is_array() {
            None
        } else {
            self.base_scalar()
        }
    }

    pub fn is_numeric(&self) -> bool {
        self.scalar_type().is_some_and(Scalar::is_numeric)
    }

    pub fn is_arithmetic(&self) -> bool {
        self.scalar_type()
            .is_some_and(|scalar| scalar.is_numeric() && !scalar.is_encoded_float())
    }

    pub fn is_integer(&self) -> bool {
        self.scalar_type().is_some_and(Scalar::is_integer)
    }

    pub fn is_scalar_integer(&self) -> bool {
        self.is_scalar() && self.is_integer()
    }

    pub fn is_bool(&self) -> bool {
        !self.is_array() && self.kind == TypeKind::Scalar(Scalar::Bool)
    }

    pub const fn is_opaque(&self) -> bool {
        matches!(self.kind, TypeKind::Opaque(_) | TypeKind::Tensor { .. })
    }

    pub const fn as_tensor(&self) -> Option<(Scalar, u32)> {
        match self.kind {
            TypeKind::Tensor { scalar, rank } if !self.is_array() => Some((scalar, rank)),
            _ => None,
        }
    }

    pub const fn as_opaque(&self) -> Option<Opaque> {
        match self.kind {
            TypeKind::Opaque(opaque) if !self.is_array() => Some(opaque),
            _ => None,
        }
    }

    pub fn contains_opaque(&self, registry: &TypeRegistry) -> bool {
        match self.kind {
            TypeKind::Opaque(_) | TypeKind::Tensor { .. } => true,
            TypeKind::Struct(id) => registry
                .structure(id)
                .is_some_and(|structure| structure.contains_opaque),
            _ => false,
        }
    }

    pub fn contains_unsized_array(&self, registry: &TypeRegistry) -> bool {
        if self.array.contains(&ArraySize::Unsized) {
            return true;
        }
        match self.kind {
            TypeKind::Struct(id) => registry
                .structure(id)
                .is_some_and(|structure| structure.contains_unsized_array),
            _ => false,
        }
    }

    pub fn contains_scalar(&self, registry: &TypeRegistry, wanted: Scalar) -> bool {
        match self.kind {
            TypeKind::Struct(id) => registry
                .structure(id)
                .is_some_and(|structure| structure.scalars.contains(&wanted)),
            _ => self.base_scalar() == Some(wanted),
        }
    }

    pub fn component_count(&self) -> Option<u32> {
        if self.is_array() {
            return None;
        }
        match self.kind {
            TypeKind::Scalar(_) => Some(1),
            TypeKind::Vector { size, .. } => Some(u32::from(size)),
            TypeKind::Matrix { columns, rows, .. } => Some(u32::from(columns) * u32::from(rows)),
            TypeKind::LongVector {
                size: ArraySize::Sized(size),
                ..
            }
            | TypeKind::CooperativeVector {
                size: ArraySize::Sized(size),
                ..
            } => Some(size),
            _ => None,
        }
    }

    pub fn flattened_size(&self, registry: &TypeRegistry) -> Option<u32> {
        let mut total = match self.kind {
            TypeKind::Scalar(_) => 1,
            TypeKind::Vector { size, .. } => u32::from(size),
            TypeKind::Matrix { columns, rows, .. } => u32::from(columns) * u32::from(rows),
            TypeKind::LongVector {
                size: ArraySize::Sized(size),
                ..
            }
            | TypeKind::CooperativeVector {
                size: ArraySize::Sized(size),
                ..
            } => size,
            TypeKind::Struct(id) => registry.structure(id)?.flattened_size?,
            TypeKind::Reference(_) => 1,
            _ => return None,
        };
        for dimension in &self.array {
            match dimension {
                ArraySize::Sized(size) => total = total.checked_mul(*size)?,
                ArraySize::Specialized(_) | ArraySize::Unsized => return None,
            }
        }
        Some(total)
    }

    pub fn element_type(&self) -> Option<Self> {
        if let Some((_, inner)) = self.array.split_first() {
            return Some(Self {
                kind: self.kind,
                array: inner.to_vec(),
            });
        }
        match self.kind {
            TypeKind::Vector { scalar, .. }
            | TypeKind::LongVector { scalar, .. }
            | TypeKind::CooperativeVector { scalar, .. }
            | TypeKind::CooperativeMatrix(CooperativeMatrix { scalar, .. }) => {
                Some(Self::scalar(scalar))
            }
            TypeKind::Matrix { scalar, rows, .. } => Some(Self::vector(scalar, rows)),
            _ => None,
        }
    }

    pub const fn column_type(&self) -> Option<Self> {
        match self.kind {
            TypeKind::Matrix { scalar, rows, .. } if !self.is_array() => {
                Some(Self::vector(scalar, rows))
            }
            _ => None,
        }
    }

    pub const fn row_type(&self) -> Option<Self> {
        match self.kind {
            TypeKind::Matrix {
                scalar, columns, ..
            } if !self.is_array() => Some(Self::vector(scalar, columns)),
            _ => None,
        }
    }

    pub fn outer_size(&self) -> Option<ArraySize> {
        self.array.first().copied()
    }

    pub fn length(&self) -> Option<u32> {
        if let Some(size) = self.array.first() {
            return match size {
                ArraySize::Sized(size) => Some(*size),
                ArraySize::Specialized(_) | ArraySize::Unsized => None,
            };
        }
        match self.kind {
            TypeKind::Vector { size, .. } => Some(u32::from(size)),
            TypeKind::Matrix { columns, .. } => Some(u32::from(columns)),
            TypeKind::LongVector {
                size: ArraySize::Sized(size),
                ..
            }
            | TypeKind::CooperativeVector {
                size: ArraySize::Sized(size),
                ..
            } => Some(size),
            _ => None,
        }
    }

    pub fn with_scalar(&self, scalar: Scalar) -> Self {
        let kind = match self.kind {
            TypeKind::Scalar(_) => TypeKind::Scalar(scalar),
            TypeKind::Vector { size, .. } => TypeKind::Vector { scalar, size },
            TypeKind::Matrix { columns, rows, .. } => TypeKind::Matrix {
                scalar,
                columns,
                rows,
            },
            TypeKind::LongVector { size, .. } => TypeKind::LongVector { scalar, size },
            TypeKind::CooperativeVector { size, .. } => {
                TypeKind::CooperativeVector { scalar, size }
            }
            TypeKind::CooperativeMatrix(matrix) => {
                TypeKind::CooperativeMatrix(matrix.with_scalar(scalar))
            }
            other => other,
        };
        Self {
            kind,
            array: self.array.clone(),
        }
    }

    pub fn same_shape(&self, other: &Self) -> bool {
        if self.array != other.array {
            return false;
        }
        match (self.kind, other.kind) {
            (TypeKind::Scalar(_), TypeKind::Scalar(_)) => true,
            (TypeKind::Vector { size: left, .. }, TypeKind::Vector { size: right, .. }) => {
                left == right
            }
            (
                TypeKind::Matrix {
                    columns: left_columns,
                    rows: left_rows,
                    ..
                },
                TypeKind::Matrix {
                    columns: right_columns,
                    rows: right_rows,
                    ..
                },
            ) => left_columns == right_columns && left_rows == right_rows,
            (
                TypeKind::Vector { size, .. },
                TypeKind::LongVector {
                    size: ArraySize::Sized(length),
                    ..
                },
            )
            | (
                TypeKind::LongVector {
                    size: ArraySize::Sized(length),
                    ..
                },
                TypeKind::Vector { size, .. },
            ) => u32::from(size) == length,
            (TypeKind::LongVector { size: left, .. }, TypeKind::LongVector { size: right, .. })
            | (
                TypeKind::CooperativeVector { size: left, .. },
                TypeKind::CooperativeVector { size: right, .. },
            ) => left == right,
            (TypeKind::CooperativeMatrix(left), TypeKind::CooperativeMatrix(right)) => {
                left.same_shape(&right)
            }
            (left, right) => left == right,
        }
    }

    pub fn converts_implicitly_to(&self, target: &Self) -> bool {
        self.converts_with(target, NumericFeatures::default())
    }

    pub fn converts_with(&self, target: &Self, features: NumericFeatures) -> bool {
        if self == target {
            return true;
        }
        if self.is_array() || target.is_array() {
            return false;
        }
        if let (
            TypeKind::Vector { scalar, size },
            TypeKind::LongVector {
                scalar: long,
                size: ArraySize::Sized(length),
            },
        )
        | (
            TypeKind::LongVector {
                scalar: long,
                size: ArraySize::Sized(length),
            },
            TypeKind::Vector { scalar, size },
        ) = (self.kind, target.kind)
        {
            return u32::from(size) == length && scalar == long;
        }
        if matches!(self.kind, TypeKind::CooperativeMatrix(_))
            || matches!(target.kind, TypeKind::CooperativeMatrix(_))
            || !self.same_shape(target)
        {
            return false;
        }
        match (self.base_scalar(), target.base_scalar()) {
            (Some(from), Some(to)) => from.promotes_to(to, features),
            _ => false,
        }
    }

    pub fn contains_scalar_where(&self, registry: &TypeRegistry, test: fn(Scalar) -> bool) -> bool {
        match self.kind {
            TypeKind::Struct(id) => registry
                .structure(id)
                .is_some_and(|structure| structure.scalars.iter().any(|scalar| test(*scalar))),
            TypeKind::Block(id) => registry.block(id).is_some_and(|block| {
                block
                    .members
                    .iter()
                    .any(|member| member.ty.contains_scalar_where(registry, test))
            }),
            _ => self.base_scalar().is_some_and(test),
        }
    }

    pub const fn display<'a>(&'a self, registry: &'a TypeRegistry) -> TypeDisplay<'a> {
        TypeDisplay { ty: self, registry }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct TypeDisplay<'a> {
    ty: &'a Type,
    registry: &'a TypeRegistry,
}

impl fmt::Display for TypeDisplay<'_> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self.ty.kind {
            TypeKind::Error => formatter.write_str("<error>")?,
            TypeKind::Void => formatter.write_str("void")?,
            TypeKind::String => formatter.write_str("string")?,
            TypeKind::Scalar(scalar) => formatter.write_str(scalar.keyword())?,
            TypeKind::Vector { scalar, size } => {
                write!(formatter, "{}{size}", scalar.vector_prefix())?;
            }
            TypeKind::Matrix {
                scalar,
                columns,
                rows,
            } => {
                let prefix = scalar.matrix_prefix();
                if columns == rows {
                    write!(formatter, "{prefix}{columns}")?;
                } else {
                    write!(formatter, "{prefix}{columns}x{rows}")?;
                }
            }
            TypeKind::Struct(id) => {
                let name = self
                    .registry
                    .structure(id)
                    .and_then(|structure| structure.name.as_deref());
                formatter.write_str(name.unwrap_or("struct"))?;
            }
            TypeKind::Block(id) | TypeKind::Reference(id) => {
                let name = self.registry.block(id).map(|block| block.name.as_str());
                formatter.write_str(name.unwrap_or("block"))?;
            }
            TypeKind::Opaque(opaque) => write!(formatter, "{opaque}")?,
            TypeKind::CooperativeMatrix(matrix) => {
                write!(
                    formatter,
                    "coopmat<{}, {}, {}, {}, {}>",
                    matrix.scalar.keyword(),
                    ShowSize(matrix.scope),
                    ShowSize(matrix.rows),
                    ShowSize(matrix.columns),
                    matrix.usage.value()
                )?;
            }
            TypeKind::LongVector { scalar, size } => {
                write!(
                    formatter,
                    "vector<{}, {}>",
                    scalar.keyword(),
                    ShowSize(size)
                )?;
            }
            TypeKind::CooperativeVector { scalar, size } => {
                write!(
                    formatter,
                    "coopvecNV<{}, {}>",
                    scalar.keyword(),
                    ShowSize(size)
                )?;
            }
            TypeKind::TensorLayout {
                dimensions,
                clamp_mode,
            } => write!(
                formatter,
                "tensorLayoutNV<{}, {}>",
                ShowSize(dimensions),
                ShowSize(clamp_mode)
            )?,
            TypeKind::TensorView { dimensions, .. } => {
                write!(formatter, "tensorViewNV<{}>", ShowSize(dimensions))?;
            }
            TypeKind::Tensor { scalar, rank } => {
                write!(formatter, "tensorARM<{}, {rank}>", scalar.keyword())?;
            }
            TypeKind::Spirv(_) => formatter.write_str("spirv_type")?,
        }
        for dimension in &self.ty.array {
            match dimension {
                ArraySize::Sized(size) => write!(formatter, "[{size}]")?,
                ArraySize::Specialized(_) => formatter.write_str("[specialization constant]")?,
                ArraySize::Unsized => formatter.write_str("[]")?,
            }
        }
        Ok(())
    }
}

struct ShowSize(ArraySize);

impl fmt::Display for ShowSize {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self.0 {
            ArraySize::Sized(size) => write!(formatter, "{size}"),
            ArraySize::Specialized(_) => formatter.write_str("spec_const"),
            ArraySize::Unsized => formatter.write_str("?"),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Member {
    pub name: String,
    pub ty: Type,
    pub qualifiers: Qualifiers,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StructType {
    pub name: Option<String>,
    pub members: Vec<Member>,
    pub contains_opaque: bool,
    pub contains_unsized_array: bool,
    pub contains_reference: bool,
    pub scalars: Vec<Scalar>,
    pub flattened_size: Option<u32>,
}

impl StructType {
    pub fn member(&self, name: &str) -> Option<(usize, &Member)> {
        self.members
            .iter()
            .enumerate()
            .find(|(_, member)| member.name == name)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum BlockStorage {
    Uniform,
    Buffer,
    In,
    Out,
    ResourceHeap,
    SamplerHeap,
    RayPayload,
    RayPayloadIn,
    HitAttribute,
    CallableData,
    CallableDataIn,
}

impl BlockStorage {
    pub const fn is_heap(self) -> bool {
        matches!(self, Self::ResourceHeap | Self::SamplerHeap)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Packing {
    Std140,
    Std430,
    Scalar,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ReferenceLayout {
    pub alignment: u32,
    pub packing: Packing,
    pub row_major: bool,
    pub size: Option<u32>,
    pub defined: bool,
}

impl ReferenceLayout {
    pub fn element_size(&self) -> Option<u32> {
        let size = self.size?;
        let mask = self.alignment.checked_sub(1)?;
        size.checked_add(mask).map(|padded| padded & !mask)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BlockType {
    pub name: String,
    pub storage: BlockStorage,
    pub qualifiers: Qualifiers,
    pub members: Vec<Member>,
    pub reference: Option<ReferenceLayout>,
    pub buffer_type: bool,
}

impl BlockType {
    pub fn contains_unsized_array(&self, registry: &TypeRegistry) -> bool {
        self.members
            .iter()
            .any(|member| member.ty.contains_unsized_array(registry))
    }
}

impl BlockType {
    pub fn member(&self, name: &str) -> Option<(usize, &Member)> {
        self.members
            .iter()
            .enumerate()
            .find(|(_, member)| member.name == name)
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct TypeRegistry {
    structs: Vec<StructType>,
    blocks: Vec<BlockType>,
    spirv: Vec<SpirvType>,
}

impl TypeRegistry {
    pub const fn new() -> Self {
        Self {
            structs: Vec::new(),
            blocks: Vec::new(),
            spirv: Vec::new(),
        }
    }

    pub fn add_spirv(&mut self, ty: SpirvType) -> Option<SpirvTypeId> {
        if let Some(index) = self.spirv.iter().position(|known| *known == ty) {
            return Some(SpirvTypeId(u32::try_from(index).ok()?));
        }
        let id = SpirvTypeId(u32::try_from(self.spirv.len()).ok()?);
        self.spirv.push(ty);
        Some(id)
    }

    pub fn spirv(&self, id: SpirvTypeId) -> Option<&SpirvType> {
        self.spirv.get(usize::try_from(id.0).ok()?)
    }

    pub fn add_struct(&mut self, name: Option<String>, members: Vec<Member>) -> Option<StructId> {
        let id = StructId(u32::try_from(self.structs.len()).ok()?);
        let mut contains_opaque = false;
        let mut contains_unsized_array = false;
        let mut contains_reference = false;
        let mut scalars = Vec::new();
        let mut flattened_size = Some(0_u32);
        for member in &members {
            contains_opaque |= member.ty.contains_opaque(self);
            contains_unsized_array |= member.ty.contains_unsized_array(self);
            contains_reference |= member.ty.contains_reference(self);
            for scalar in Scalar::ALL {
                if member.ty.contains_scalar(self, scalar) && !scalars.contains(&scalar) {
                    scalars.push(scalar);
                }
            }
            flattened_size = match (flattened_size, member.ty.flattened_size(self)) {
                (Some(total), Some(size)) => total.checked_add(size),
                _ => None,
            };
        }
        self.structs.push(StructType {
            name,
            members,
            contains_opaque,
            contains_unsized_array,
            contains_reference,
            scalars,
            flattened_size,
        });
        Some(id)
    }

    pub fn add_block(&mut self, block: BlockType) -> Option<BlockId> {
        let id = BlockId(u32::try_from(self.blocks.len()).ok()?);
        self.blocks.push(block);
        Some(id)
    }

    pub fn structure(&self, id: StructId) -> Option<&StructType> {
        self.structs.get(usize::try_from(id.0).ok()?)
    }

    pub fn block(&self, id: BlockId) -> Option<&BlockType> {
        self.blocks.get(usize::try_from(id.0).ok()?)
    }

    pub fn block_mut(&mut self, id: BlockId) -> Option<&mut BlockType> {
        self.blocks.get_mut(usize::try_from(id.0).ok()?)
    }

    pub fn structs(&self) -> &[StructType] {
        &self.structs
    }

    pub fn blocks(&self) -> &[BlockType] {
        &self.blocks
    }
}

impl From<rglsl_ast::ast::ScalarType> for Scalar {
    fn from(scalar: rglsl_ast::ast::ScalarType) -> Self {
        use rglsl_ast::ast::ScalarType;
        match scalar {
            ScalarType::Bool => Self::Bool,
            ScalarType::Int => Self::Int,
            ScalarType::Uint => Self::Uint,
            ScalarType::Float => Self::Float,
            ScalarType::Double => Self::Double,
            ScalarType::Int8 => Self::Int8,
            ScalarType::Uint8 => Self::Uint8,
            ScalarType::Int16 => Self::Int16,
            ScalarType::Uint16 => Self::Uint16,
            ScalarType::Int64 => Self::Int64,
            ScalarType::Uint64 => Self::Uint64,
            ScalarType::Float16 => Self::Float16,
            ScalarType::BFloat16 => Self::BFloat16,
            ScalarType::FloatE4M3 => Self::FloatE4M3,
            ScalarType::FloatE5M2 => Self::FloatE5M2,
        }
    }
}

impl From<rglsl_ast::ast::BasicType> for Type {
    fn from(basic: rglsl_ast::ast::BasicType) -> Self {
        use rglsl_ast::ast::BasicType;
        let count = |dimension: rglsl_ast::ast::Dimension| match dimension {
            rglsl_ast::ast::Dimension::Two => 2,
            rglsl_ast::ast::Dimension::Three => 3,
            rglsl_ast::ast::Dimension::Four => 4,
        };
        match basic {
            BasicType::Scalar(scalar) => Self::scalar(scalar.into()),
            BasicType::Vector { scalar, size } => Self::vector(scalar.into(), count(size)),
            BasicType::Matrix {
                scalar,
                columns,
                rows,
            } => Self::matrix(scalar.into(), count(columns), count(rows)),
        }
    }
}
