use alloc::string::String;
use alloc::vec::Vec;
use core::fmt;

use rglsl_ast::ast::NodeId;

use crate::scope::{Qualifiers, SymbolId};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Scalar {
    Bool,
    Int,
    Uint,
    Float,
    Double,
}

impl Scalar {
    pub const ALL: [Self; 5] = [Self::Bool, Self::Int, Self::Uint, Self::Float, Self::Double];

    pub const fn keyword(self) -> &'static str {
        match self {
            Self::Bool => "bool",
            Self::Int => "int",
            Self::Uint => "uint",
            Self::Float => "float",
            Self::Double => "double",
        }
    }

    pub const fn vector_prefix(self) -> &'static str {
        match self {
            Self::Bool => "bvec",
            Self::Int => "ivec",
            Self::Uint => "uvec",
            Self::Float => "vec",
            Self::Double => "dvec",
        }
    }

    pub const fn numeric_rank(self) -> Option<u8> {
        match self {
            Self::Bool => None,
            Self::Int => Some(0),
            Self::Uint => Some(1),
            Self::Float => Some(2),
            Self::Double => Some(3),
        }
    }

    pub const fn is_numeric(self) -> bool {
        !matches!(self, Self::Bool)
    }

    pub const fn is_integer(self) -> bool {
        matches!(self, Self::Int | Self::Uint)
    }

    pub const fn is_floating(self) -> bool {
        matches!(self, Self::Float | Self::Double)
    }

    pub fn converts_implicitly_to(self, target: Self) -> bool {
        if self == target {
            return true;
        }
        match (self.numeric_rank(), target.numeric_rank()) {
            (Some(from), Some(to)) => from < to,
            _ => false,
        }
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

    pub fn from_keyword(word: &str) -> Option<Self> {
        match word {
            "sampler" => return Some(Self::plain_sampler(false)),
            "samplerShadow" => return Some(Self::plain_sampler(true)),
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
    Opaque(Opaque),
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
            | TypeKind::Matrix { scalar, .. } => Some(scalar),
            _ => None,
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
        matches!(self.kind, TypeKind::Opaque(_))
    }

    pub const fn as_opaque(&self) -> Option<Opaque> {
        match self.kind {
            TypeKind::Opaque(opaque) if !self.is_array() => Some(opaque),
            _ => None,
        }
    }

    pub fn contains_opaque(&self, registry: &TypeRegistry) -> bool {
        match self.kind {
            TypeKind::Opaque(_) => true,
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
            _ => None,
        }
    }

    pub fn flattened_size(&self, registry: &TypeRegistry) -> Option<u32> {
        let mut total = match self.kind {
            TypeKind::Scalar(_) => 1,
            TypeKind::Vector { size, .. } => u32::from(size),
            TypeKind::Matrix { columns, rows, .. } => u32::from(columns) * u32::from(rows),
            TypeKind::Struct(id) => registry.structure(id)?.flattened_size?,
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
            TypeKind::Vector { scalar, .. } => Some(Self::scalar(scalar)),
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
            (left, right) => left == right,
        }
    }

    pub fn converts_implicitly_to(&self, target: &Self) -> bool {
        if self == target {
            return true;
        }
        if self.is_array() || target.is_array() || !self.same_shape(target) {
            return false;
        }
        match (self.base_scalar(), target.base_scalar()) {
            (Some(from), Some(to)) => from.converts_implicitly_to(to),
            _ => false,
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
            TypeKind::Scalar(scalar) => formatter.write_str(scalar.keyword())?,
            TypeKind::Vector { scalar, size } => {
                write!(formatter, "{}{size}", scalar.vector_prefix())?;
            }
            TypeKind::Matrix {
                scalar,
                columns,
                rows,
            } => {
                let prefix = if scalar == Scalar::Double {
                    "dmat"
                } else {
                    "mat"
                };
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
            TypeKind::Block(id) => {
                let name = self.registry.block(id).map(|block| block.name.as_str());
                formatter.write_str(name.unwrap_or("block"))?;
            }
            TypeKind::Opaque(opaque) => write!(formatter, "{opaque}")?,
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
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BlockType {
    pub name: String,
    pub storage: BlockStorage,
    pub qualifiers: Qualifiers,
    pub members: Vec<Member>,
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
}

impl TypeRegistry {
    pub const fn new() -> Self {
        Self {
            structs: Vec::new(),
            blocks: Vec::new(),
        }
    }

    pub fn add_struct(&mut self, name: Option<String>, members: Vec<Member>) -> Option<StructId> {
        let id = StructId(u32::try_from(self.structs.len()).ok()?);
        let mut contains_opaque = false;
        let mut contains_unsized_array = false;
        let mut scalars = Vec::new();
        let mut flattened_size = Some(0_u32);
        for member in &members {
            contains_opaque |= member.ty.contains_opaque(self);
            contains_unsized_array |= member.ty.contains_unsized_array(self);
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
