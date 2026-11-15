use alloc::string::String;
use alloc::sync::Arc;
use alloc::vec::Vec;
use core::cmp::Ordering;
use core::fmt;
use core::hash::{Hash, Hasher};
use rglsl_ast::opaque::{OpaqueKeyword, SampledFamily, SampledPrefix, SampledShape, WidePrefix};

use rglsl_ast::ast::NodeId;
pub use rglsl_ast::scalar::{NumericFeatures, Scalar};

use crate::scope::{Qualifiers, SymbolId};
use crate::spirv::{SpirvType, SpirvTypeId};

index_id!(StructId);

index_id!(BlockId);

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum OpaqueKind {
    Sampler,
    CombinedSampler,
    Texture,
    Image,
    SubpassInput,
    AccelerationStructure,
    RayQuery,
    HitObjectNv,
    HitObjectExt,
    TileImage,
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
    Int64,
    Uint64,
}

impl SampledType {
    pub const ALL: [Self; 3] = [Self::Float, Self::Int, Self::Uint];
    pub const WIDE: [Self; 2] = [Self::Int64, Self::Uint64];

    pub const fn scalar(self) -> Scalar {
        match self {
            Self::Float => Scalar::Float,
            Self::Int => Scalar::Int,
            Self::Uint => Scalar::Uint,
            Self::Int64 => Scalar::Int64,
            Self::Uint64 => Scalar::Uint64,
        }
    }

    pub const fn is_integer(self) -> bool {
        !matches!(self, Self::Float)
    }

    const fn prefix(self) -> &'static str {
        match self {
            Self::Float => "",
            Self::Int => "i",
            Self::Uint => "u",
            Self::Int64 => "i64",
            Self::Uint64 => "u64",
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

    pub const fn is_hit_object(self) -> bool {
        matches!(
            self.kind,
            OpaqueKind::HitObjectNv | OpaqueKind::HitObjectExt
        )
    }

    pub const fn is_private_object(self) -> bool {
        self.is_ray_query() || self.is_hit_object()
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        OpaqueKeyword::parse(word).and_then(Self::from_opaque_keyword)
    }

    pub const fn from_opaque_keyword(keyword: OpaqueKeyword) -> Option<Self> {
        const fn sampled_type(prefix: SampledPrefix) -> SampledType {
            match prefix {
                SampledPrefix::Float => SampledType::Float,
                SampledPrefix::Int => SampledType::Int,
                SampledPrefix::Uint => SampledType::Uint,
            }
        }
        match keyword {
            OpaqueKeyword::AtomicUint => None,
            OpaqueKeyword::Sampler => Some(Self::plain_sampler(false)),
            OpaqueKeyword::SamplerShadow => Some(Self::plain_sampler(true)),
            OpaqueKeyword::AccelerationStructureNv | OpaqueKeyword::AccelerationStructureExt => {
                Some(Self::ray(OpaqueKind::AccelerationStructure))
            }
            OpaqueKeyword::RayQueryExt => Some(Self::ray(OpaqueKind::RayQuery)),
            OpaqueKeyword::HitObjectNv => Some(Self::ray(OpaqueKind::HitObjectNv)),
            OpaqueKeyword::HitObjectExt => Some(Self::ray(OpaqueKind::HitObjectExt)),
            OpaqueKeyword::Attachment(prefix) => Some(Self {
                kind: OpaqueKind::TileImage,
                sampled: sampled_type(prefix),
                dimension: TextureDimension::D2,
                arrayed: false,
                shadow: false,
                multisample: false,
            }),
            OpaqueKeyword::Shadow(shape) => Self::sampled_image(
                OpaqueKind::CombinedSampler,
                SampledType::Float,
                shape.shape(),
                true,
            ),
            OpaqueKeyword::Sampled {
                prefix,
                family,
                shape,
            } => Self::sampled_image(
                match family {
                    SampledFamily::Sampler => OpaqueKind::CombinedSampler,
                    SampledFamily::Texture => OpaqueKind::Texture,
                    SampledFamily::Image => OpaqueKind::Image,
                },
                sampled_type(prefix),
                shape,
                false,
            ),
            OpaqueKeyword::SubpassInput {
                prefix,
                multisample,
            } => Some(Self::subpass_input(sampled_type(prefix), multisample)),
            OpaqueKeyword::WideImage { prefix, shape } => Self::sampled_image(
                OpaqueKind::Image,
                match prefix {
                    WidePrefix::Int64 => SampledType::Int64,
                    WidePrefix::Uint64 => SampledType::Uint64,
                },
                shape,
                false,
            ),
        }
    }

    const fn sampled_image(
        kind: OpaqueKind,
        sampled: SampledType,
        shape: SampledShape,
        shadow: bool,
    ) -> Option<Self> {
        let (dimension, arrayed, multisample) = match shape {
            SampledShape::D1 => (TextureDimension::D1, false, false),
            SampledShape::D2 => (TextureDimension::D2, false, false),
            SampledShape::D3 => (TextureDimension::D3, false, false),
            SampledShape::Cube => (TextureDimension::Cube, false, false),
            SampledShape::D1Array => (TextureDimension::D1, true, false),
            SampledShape::D2Array => (TextureDimension::D2, true, false),
            SampledShape::CubeArray => (TextureDimension::Cube, true, false),
            SampledShape::Buffer => (TextureDimension::Buffer, false, false),
            SampledShape::D2Ms => (TextureDimension::D2, false, true),
            SampledShape::D2MsArray => (TextureDimension::D2, true, true),
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
            OpaqueKind::HitObjectNv => return formatter.write_str("hitObjectNV"),
            OpaqueKind::HitObjectExt => return formatter.write_str("hitObjectEXT"),
            OpaqueKind::TileImage => {
                return write!(formatter, "{}attachmentEXT", self.sampled.prefix());
            }
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
        rank: ArraySize,
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

    pub const fn checked_size(self) -> u32 {
        match self {
            Self::Sized(size)
            | Self::Specialized(SpecializedSize::Constant { default: size, .. }) => size,
            Self::Specialized(SpecializedSize::Expression(_)) => 1,
            Self::Unsized => 0,
        }
    }
}

#[derive(Clone)]
struct Dimensions {
    all: Option<Arc<[ArraySize]>>,
    start: usize,
}

impl Dimensions {
    const NONE: Self = Self {
        all: None,
        start: 0,
    };

    fn from_vec(dimensions: Vec<ArraySize>) -> Self {
        if dimensions.is_empty() {
            Self::NONE
        } else {
            Self {
                all: Some(Arc::from(dimensions)),
                start: 0,
            }
        }
    }

    fn as_slice(&self) -> &[ArraySize] {
        self.all
            .as_deref()
            .and_then(|all| all.get(self.start..))
            .unwrap_or_default()
    }

    fn inner(&self) -> Self {
        match self.all {
            Some(ref all) if self.start + 1 < all.len() => Self {
                all: Some(Arc::clone(all)),
                start: self.start + 1,
            },
            _ => Self::NONE,
        }
    }

    fn same(&self, other: &Self) -> bool {
        match (&self.all, &other.all) {
            (Some(left), Some(right)) if Arc::ptr_eq(left, right) && self.start == other.start => {
                true
            }
            _ => self.as_slice() == other.as_slice(),
        }
    }
}

#[derive(Clone)]
pub struct SharedDimensions {
    all: Arc<[ArraySize]>,
    start: usize,
}

impl SharedDimensions {
    fn address(&self) -> *const ArraySize {
        Arc::as_ptr(&self.all).cast::<ArraySize>()
    }
}

impl PartialEq for SharedDimensions {
    fn eq(&self, other: &Self) -> bool {
        Arc::ptr_eq(&self.all, &other.all) && self.start == other.start
    }
}

impl Eq for SharedDimensions {}

impl PartialOrd for SharedDimensions {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for SharedDimensions {
    fn cmp(&self, other: &Self) -> Ordering {
        self.address()
            .cmp(&other.address())
            .then(self.start.cmp(&other.start))
    }
}

impl Hash for SharedDimensions {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.address().hash(state);
        self.start.hash(state);
    }
}

impl fmt::Debug for SharedDimensions {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter
            .debug_struct("SharedDimensions")
            .field("address", &self.address())
            .field("start", &self.start)
            .finish()
    }
}

#[derive(Clone)]
pub struct Type {
    pub kind: TypeKind,
    dimensions: Dimensions,
}

impl PartialEq for Type {
    fn eq(&self, other: &Self) -> bool {
        self.kind == other.kind && self.dimensions.same(&other.dimensions)
    }
}

impl Eq for Type {}

impl PartialOrd for Type {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Type {
    fn cmp(&self, other: &Self) -> Ordering {
        self.kind.cmp(&other.kind).then_with(|| {
            if self.dimensions.same(&other.dimensions) {
                Ordering::Equal
            } else {
                self.dimensions().cmp(other.dimensions())
            }
        })
    }
}

impl Hash for Type {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.kind.hash(state);
        self.dimensions().hash(state);
    }
}

impl fmt::Debug for Type {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter
            .debug_struct("Type")
            .field("kind", &self.kind)
            .field("array", &self.dimensions())
            .finish()
    }
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
            dimensions: Dimensions::NONE,
        }
    }

    pub fn dimensions(&self) -> &[ArraySize] {
        self.dimensions.as_slice()
    }

    pub fn shared_dimensions(&self) -> Option<SharedDimensions> {
        self.dimensions.all.as_ref().map(|all| SharedDimensions {
            all: Arc::clone(all),
            start: self.dimensions.start,
        })
    }

    pub fn set_dimensions(&mut self, dimensions: &[ArraySize]) {
        if self.dimensions() != dimensions {
            self.dimensions = Dimensions::from_vec(dimensions.to_vec());
        }
    }

    pub fn update_dimensions(&mut self, update: impl FnOnce(&mut [ArraySize])) {
        let mut dimensions = self.dimensions().to_vec();
        update(&mut dimensions);
        self.set_dimensions(&dimensions);
    }

    pub fn set_dimension(&mut self, index: usize, size: ArraySize) {
        if self
            .dimensions()
            .get(index)
            .is_some_and(|current| *current != size)
        {
            self.update_dimensions(|dimensions| {
                if let Some(slot) = dimensions.get_mut(index) {
                    *slot = size;
                }
            });
        }
    }

    pub fn set_outer_size(&mut self, size: ArraySize) {
        self.set_dimension(0, size);
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

    pub fn array_of(self, size: ArraySize) -> Self {
        self.with_dimensions(&[size])
    }

    pub fn with_dimensions(mut self, outer: &[ArraySize]) -> Self {
        if outer.is_empty() {
            return self;
        }
        let mut dimensions = outer.to_vec();
        dimensions.extend_from_slice(self.dimensions());
        self.dimensions = Dimensions::from_vec(dimensions);
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
        self.dimensions.all.is_some()
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

    pub fn passes_as_cooperative_vector(&self, parameter: &Self) -> bool {
        match (self.kind, parameter.kind) {
            (
                TypeKind::CooperativeVector {
                    scalar: from,
                    size: from_size,
                },
                TypeKind::CooperativeVector {
                    scalar: to,
                    size: to_size,
                },
            ) if !self.is_array() && !parameter.is_array() => {
                from_size == to_size
                    && from.cooperative_vector_family().is_some()
                    && from.cooperative_vector_family() == to.cooperative_vector_family()
            }
            _ => false,
        }
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
        registry
            .find_in_members(self, |ty| {
                matches!(
                    ty.kind,
                    TypeKind::CooperativeMatrix(_) | TypeKind::CooperativeVector { .. }
                )
                .then_some(())
            })
            .is_some()
    }

    pub fn contains_tensor_nv(&self, registry: &TypeRegistry) -> bool {
        registry
            .find_in_members(self, |ty| {
                matches!(
                    ty.kind,
                    TypeKind::TensorLayout { .. } | TypeKind::TensorView { .. }
                )
                .then_some(())
            })
            .is_some()
    }

    pub fn contains_cooperative_matrix(&self, registry: &TypeRegistry) -> bool {
        registry
            .find_in_members(self, |ty| {
                matches!(ty.kind, TypeKind::CooperativeMatrix(_)).then_some(())
            })
            .is_some()
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

    pub const fn as_tensor(&self) -> Option<(Scalar, ArraySize)> {
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
        if self.dimensions().contains(&ArraySize::Unsized) {
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
        for dimension in self.dimensions() {
            match dimension {
                ArraySize::Sized(size) => total = total.checked_mul(*size)?,
                ArraySize::Specialized(_) | ArraySize::Unsized => return None,
            }
        }
        Some(total)
    }

    pub fn element_type(&self) -> Option<Self> {
        if self.is_array() {
            return Some(Self {
                kind: self.kind,
                dimensions: self.dimensions.inner(),
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
        self.dimensions().first().copied()
    }

    pub fn length(&self) -> Option<u32> {
        if let Some(size) = self.dimensions().first() {
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
            dimensions: self.dimensions.clone(),
        }
    }

    pub fn same_shape(&self, other: &Self) -> bool {
        if !self.dimensions.same(&other.dimensions) {
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
            || self.is_cooperative_vector()
            || target.is_cooperative_vector()
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
                let prefix = scalar.matrix_prefix().unwrap_or("mat");
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
                write!(
                    formatter,
                    "tensorARM<{}, {}>",
                    scalar.keyword(),
                    ShowSize(rank)
                )?;
            }
            TypeKind::Spirv(_) => formatter.write_str("spirv_type")?,
        }
        for dimension in self.ty.dimensions() {
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
    Shared,
    In,
    Out,
    ResourceHeap,
    SamplerHeap,
    RayPayload,
    RayPayloadIn,
    HitAttribute,
    CallableData,
    CallableDataIn,
    HitObjectAttributeNv,
    HitObjectAttributeExt,
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

impl TypeRegistry {
    pub fn find_in_members<'t, T>(
        &'t self,
        ty: &'t Type,
        mut found: impl FnMut(&'t Type) -> Option<T>,
    ) -> Option<T> {
        let mut pending = Vec::from([ty]);
        while let Some(ty) = pending.pop() {
            if let Some(result) = found(ty) {
                return Some(result);
            }
            if let TypeKind::Struct(id) = ty.kind
                && let Some(structure) = self.structure(id)
            {
                pending.extend(structure.members.iter().rev().map(|member| &member.ty));
            }
        }
        None
    }
}

#[derive(Debug, Clone, Default)]
pub struct TypeRegistry {
    base: Option<Arc<crate::builtins::Builtins>>,
    block_overrides: rglsl_types::FastHashMap<usize, BlockType>,
    structs: Vec<StructType>,
    blocks: Vec<BlockType>,
    spirv: Vec<SpirvType>,
}

#[derive(Debug, Clone)]
pub struct StructIter<'a> {
    registry: &'a TypeRegistry,
    index: usize,
    end: usize,
}

impl<'a> Iterator for StructIter<'a> {
    type Item = &'a StructType;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index >= self.end {
            return None;
        }
        let current = self.index;
        self.index += 1;
        let base_len = self.registry.base_structs_len();
        if current < base_len {
            self.registry.base.as_ref()?.types().structs.get(current)
        } else {
            self.registry.structs.get(current - base_len)
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let len = self.end.saturating_sub(self.index);
        (len, Some(len))
    }
}

impl ExactSizeIterator for StructIter<'_> {}

#[derive(Debug, Clone)]
pub struct BlockIter<'a> {
    registry: &'a TypeRegistry,
    index: usize,
    end: usize,
}

impl<'a> Iterator for BlockIter<'a> {
    type Item = &'a BlockType;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index >= self.end {
            return None;
        }
        let current = self.index;
        self.index += 1;
        let base_len = self.registry.base_blocks_len();
        if current < base_len {
            self.registry
                .block_overrides
                .get(&current)
                .or_else(|| self.registry.base.as_ref()?.types().blocks.get(current))
        } else {
            self.registry.blocks.get(current - base_len)
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let len = self.end.saturating_sub(self.index);
        (len, Some(len))
    }
}

impl ExactSizeIterator for BlockIter<'_> {}

impl PartialEq for TypeRegistry {
    fn eq(&self, other: &Self) -> bool {
        let spirv_len = self.base_spirv_len() + self.spirv.len();
        let other_spirv_len = other.base_spirv_len() + other.spirv.len();
        let spirv = self
            .base
            .iter()
            .flat_map(|builtins| &builtins.types().spirv)
            .chain(&self.spirv);
        let other_spirv = other
            .base
            .iter()
            .flat_map(|builtins| &builtins.types().spirv)
            .chain(&other.spirv);
        self.structs().len() == other.structs().len()
            && self.blocks().len() == other.blocks().len()
            && spirv_len == other_spirv_len
            && self.structs().eq(other.structs())
            && self.blocks().eq(other.blocks())
            && spirv.eq(other_spirv)
    }
}

impl Eq for TypeRegistry {}

impl TypeRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_builtins(builtins: Arc<crate::builtins::Builtins>) -> Self {
        Self {
            base: Some(builtins),
            block_overrides: rglsl_types::FastHashMap::default(),
            structs: Vec::new(),
            blocks: Vec::new(),
            spirv: Vec::new(),
        }
    }

    fn base_structs_len(&self) -> usize {
        self.base
            .as_ref()
            .map_or(0, |builtins| builtins.types().structs.len())
    }

    fn base_blocks_len(&self) -> usize {
        self.base
            .as_ref()
            .map_or(0, |builtins| builtins.types().blocks.len())
    }

    fn base_spirv_len(&self) -> usize {
        self.base
            .as_ref()
            .map_or(0, |builtins| builtins.types().spirv.len())
    }

    pub fn add_spirv(&mut self, ty: SpirvType) -> Option<SpirvTypeId> {
        let base_len = self.base_spirv_len();
        if let Some(builtins) = &self.base
            && let Some(index) = builtins.types().spirv.iter().position(|known| *known == ty)
        {
            return SpirvTypeId::new(u32::try_from(index).ok()?);
        }
        if let Some(index) = self.spirv.iter().position(|known| *known == ty) {
            return SpirvTypeId::new(u32::try_from(base_len.checked_add(index)?).ok()?);
        }
        let id = SpirvTypeId::new(u32::try_from(base_len.checked_add(self.spirv.len())?).ok()?)?;
        self.spirv.push(ty);
        Some(id)
    }

    pub fn spirv(&self, id: SpirvTypeId) -> Option<&SpirvType> {
        let index = usize::try_from(id.index()).ok()?;
        let base_len = self.base_spirv_len();
        if index < base_len {
            self.base.as_ref()?.types().spirv.get(index)
        } else {
            self.spirv.get(index - base_len)
        }
    }

    pub fn add_struct(&mut self, name: Option<String>, members: Vec<Member>) -> Option<StructId> {
        let total = self.base_structs_len().checked_add(self.structs.len())?;
        let id = StructId::new(u32::try_from(total).ok()?)?;
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
        let total = self.base_blocks_len().checked_add(self.blocks.len())?;
        let id = BlockId::new(u32::try_from(total).ok()?)?;
        self.blocks.push(block);
        Some(id)
    }

    pub fn structure(&self, id: StructId) -> Option<&StructType> {
        let index = usize::try_from(id.index()).ok()?;
        let base_len = self.base_structs_len();
        if index < base_len {
            self.base.as_ref()?.types().structs.get(index)
        } else {
            self.structs.get(index - base_len)
        }
    }

    pub fn block(&self, id: BlockId) -> Option<&BlockType> {
        let index = usize::try_from(id.index()).ok()?;
        let base_len = self.base_blocks_len();
        if index < base_len {
            self.block_overrides
                .get(&index)
                .or_else(|| self.base.as_ref()?.types().blocks.get(index))
        } else {
            self.blocks.get(index - base_len)
        }
    }

    pub fn block_mut(&mut self, id: BlockId) -> Option<&mut BlockType> {
        let index = usize::try_from(id.index()).ok()?;
        let base_len = self.base_blocks_len();
        if index < base_len {
            if !self.block_overrides.contains_key(&index) {
                let block = self.base.as_ref()?.types().blocks.get(index)?.clone();
                self.block_overrides.insert(index, block);
            }
            self.block_overrides.get_mut(&index)
        } else {
            self.blocks.get_mut(index - base_len)
        }
    }

    pub fn structs(&self) -> StructIter<'_> {
        StructIter {
            registry: self,
            index: 0,
            end: self.base_structs_len() + self.structs.len(),
        }
    }

    pub fn blocks(&self) -> BlockIter<'_> {
        BlockIter {
            registry: self,
            index: 0,
            end: self.base_blocks_len() + self.blocks.len(),
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
            BasicType::Scalar(scalar) => Self::scalar(scalar),
            BasicType::Vector { scalar, size } => Self::vector(scalar, count(size)),
            BasicType::Matrix {
                scalar,
                columns,
                rows,
            } => Self::matrix(scalar, count(columns), count(rows)),
        }
    }
}
