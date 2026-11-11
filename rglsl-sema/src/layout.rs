use alloc::boxed::Box;
use alloc::vec::Vec;

use crate::scope::Qualifiers;
use crate::types::{ArraySize, BlockType, Member, Packing, Scalar, Type, TypeKind, TypeRegistry};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Layout {
    pub alignment: u32,
    pub size: u32,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TypeLayout {
    pub alignment: u32,
    pub size: u32,
    pub shape: Shape,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Shape {
    Plain,
    Matrix {
        stride: u32,
        row_major: bool,
    },
    Array {
        stride: u32,
        element: Box<TypeLayout>,
    },
    Struct(Vec<MemberLayout>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MemberLayout {
    pub offset: u32,
    pub layout: TypeLayout,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BlockLayout {
    pub members: Vec<MemberLayout>,
    pub alignment: u32,
    pub end: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MatrixLayout {
    pub stride: u32,
    pub row_major: bool,
}

pub trait ArrayLengths {
    fn length(&self, size: ArraySize) -> Option<u32>;
}

#[derive(Debug, Clone, Copy, Default)]
pub struct NominalLengths;

impl ArrayLengths for NominalLengths {
    fn length(&self, size: ArraySize) -> Option<u32> {
        Some(size.nominal().unwrap_or(1))
    }
}

impl TypeLayout {
    pub const fn summary(&self) -> Layout {
        Layout {
            alignment: self.alignment,
            size: self.size,
        }
    }

    pub fn matrix(&self) -> Option<MatrixLayout> {
        match self.shape {
            Shape::Matrix { stride, row_major } => Some(MatrixLayout { stride, row_major }),
            Shape::Array { ref element, .. } => element.matrix(),
            Shape::Plain | Shape::Struct(_) => None,
        }
    }
}

const VEC4_ALIGNMENT: u32 = 16;
const MAX_DEPTH: u32 = 64;

const fn round_up(value: u32, alignment: u32) -> Option<u32> {
    if alignment <= 1 {
        return Some(value);
    }
    match value.checked_add(alignment - 1) {
        Some(padded) => Some(padded / alignment * alignment),
        None => None,
    }
}

const fn scalar_size(scalar: Scalar) -> u32 {
    match scalar {
        Scalar::Bool | Scalar::Int | Scalar::Uint | Scalar::Float => 4,
        Scalar::Double | Scalar::Int64 | Scalar::Uint64 => 8,
        Scalar::Int16 | Scalar::Uint16 | Scalar::Float16 | Scalar::BFloat16 => 2,
        Scalar::Int8 | Scalar::Uint8 | Scalar::FloatE4M3 | Scalar::FloatE5M2 => 1,
    }
}

const fn plain(alignment: u32, size: u32) -> TypeLayout {
    TypeLayout {
        alignment,
        size,
        shape: Shape::Plain,
    }
}

pub fn member_row_major(qualifiers: &Qualifiers, row_major: bool) -> bool {
    if qualifiers.has_layout("row_major") {
        true
    } else if qualifiers.has_layout("column_major") {
        false
    } else {
        row_major
    }
}

fn layout_value(qualifiers: &Qualifiers, name: &str) -> Option<u32> {
    qualifiers
        .layout_entry(name)
        .and_then(|entry| entry.value)
        .and_then(|value| u32::try_from(value).ok())
}

pub fn layout_of(
    registry: &TypeRegistry,
    ty: &Type,
    packing: Packing,
    row_major: bool,
) -> Option<Layout> {
    type_layout(registry, ty, packing, row_major, &NominalLengths).map(|layout| layout.summary())
}

pub fn type_layout(
    registry: &TypeRegistry,
    ty: &Type,
    packing: Packing,
    row_major: bool,
    lengths: &dyn ArrayLengths,
) -> Option<TypeLayout> {
    Layouter {
        registry,
        packing,
        lengths,
    }
    .ty(ty, row_major, 0)
}

#[derive(Debug, Clone)]
pub struct MemberPlacer {
    block_align: Option<u32>,
    offset: u32,
    alignment: u32,
}

impl MemberPlacer {
    pub fn new(block: &Qualifiers) -> Self {
        Self {
            block_align: layout_value(block, "align"),
            offset: 0,
            alignment: 0,
        }
    }

    pub fn place(&mut self, qualifiers: &Qualifiers, layout: &TypeLayout) -> Option<u32> {
        let mut offset = layout_value(qualifiers, "offset").unwrap_or(self.offset);
        let actual = match layout_value(qualifiers, "align").or(self.block_align) {
            Some(align) => layout.alignment.max(align),
            None => layout.alignment,
        };
        offset = round_up(offset, actual)?;
        self.alignment = self.alignment.max(layout.alignment);
        self.offset = offset.checked_add(layout.size)?;
        Some(offset)
    }

    pub const fn end(&self) -> u32 {
        self.offset
    }

    pub const fn alignment(&self) -> u32 {
        self.alignment
    }
}

pub fn block_layout(
    registry: &TypeRegistry,
    qualifiers: &Qualifiers,
    members: &[Member],
    packing: Packing,
    row_major: bool,
    lengths: &dyn ArrayLengths,
) -> Option<BlockLayout> {
    let layouter = Layouter {
        registry,
        packing,
        lengths,
    };
    let mut placer = MemberPlacer::new(qualifiers);
    let mut laid = Vec::with_capacity(members.len());
    for member in members {
        let row_major = member_row_major(&member.qualifiers, row_major);
        let layout = layouter.ty(&member.ty, row_major, 0)?;
        let offset = placer.place(&member.qualifiers, &layout)?;
        laid.push(MemberLayout { offset, layout });
    }
    Some(BlockLayout {
        members: laid,
        alignment: placer.alignment(),
        end: placer.end(),
    })
}

pub fn block_size(
    registry: &TypeRegistry,
    block: &BlockType,
    packing: Packing,
    row_major: bool,
) -> Option<u32> {
    block_layout(
        registry,
        &block.qualifiers,
        &block.members,
        packing,
        row_major,
        &NominalLengths,
    )
    .map(|layout| layout.end)
}

struct Layouter<'a> {
    registry: &'a TypeRegistry,
    packing: Packing,
    lengths: &'a dyn ArrayLengths,
}

impl Layouter<'_> {
    fn ty(&self, ty: &Type, row_major: bool, depth: u32) -> Option<TypeLayout> {
        if depth > MAX_DEPTH {
            return None;
        }
        if let Some(element) = ty.element_type().filter(|_| ty.is_array()) {
            let inner = self.ty(&element, row_major, depth + 1)?;
            let count = self.lengths.length(ty.outer_size()?)?;
            return self.array(inner, count);
        }
        match ty.kind {
            TypeKind::Scalar(scalar) => {
                let size = scalar_size(scalar);
                Some(plain(size, size))
            }
            TypeKind::Reference(_) => Some(plain(8, 8)),
            TypeKind::Vector { scalar, size } => self.vector(scalar, size),
            TypeKind::Matrix {
                scalar,
                columns,
                rows,
            } => {
                let (vector, count) = if row_major {
                    (columns, rows)
                } else {
                    (rows, columns)
                };
                let line = self.vector(scalar, vector)?;
                let alignment = if self.packing == Packing::Std140 {
                    line.alignment.max(VEC4_ALIGNMENT)
                } else {
                    line.alignment
                };
                let stride = match self.packing {
                    Packing::Scalar => line.size,
                    Packing::Std140 | Packing::Std430 => round_up(line.size, alignment)?,
                };
                Some(TypeLayout {
                    alignment,
                    size: stride.checked_mul(u32::from(count))?,
                    shape: Shape::Matrix { stride, row_major },
                })
            }
            TypeKind::Struct(id) => {
                let structure = self.registry.structure(id)?;
                self.members(&structure.members, row_major, depth + 1)
            }
            TypeKind::Block(id) => {
                let block = self.registry.block(id).filter(|block| block.buffer_type)?;
                self.members(&block.members, row_major, depth + 1)
            }
            TypeKind::Opaque(_) => Some(plain(4, 4)),
            TypeKind::LongVector { scalar, size } => {
                let component = scalar_size(scalar);
                let count = self.lengths.length(size)?;
                let alignment = match self.packing {
                    Packing::Scalar => component,
                    Packing::Std140 | Packing::Std430 if count == 1 => component,
                    Packing::Std140 | Packing::Std430 if count == 2 => component * 2,
                    Packing::Std140 | Packing::Std430 => component * 4,
                };
                Some(plain(alignment, component.checked_mul(count)?))
            }
            TypeKind::Error
            | TypeKind::Void
            | TypeKind::String
            | TypeKind::CooperativeMatrix(_)
            | TypeKind::CooperativeVector { .. }
            | TypeKind::TensorLayout { .. }
            | TypeKind::TensorView { .. }
            | TypeKind::Tensor { .. }
            | TypeKind::Spirv(_) => None,
        }
    }

    fn vector(&self, scalar: Scalar, size: u8) -> Option<TypeLayout> {
        let component = scalar_size(scalar);
        let bytes = component.checked_mul(u32::from(size))?;
        let alignment = match self.packing {
            Packing::Scalar => component,
            Packing::Std140 | Packing::Std430 if size == 2 => component * 2,
            Packing::Std140 | Packing::Std430 => component * 4,
        };
        Some(plain(alignment, bytes))
    }

    fn array(&self, inner: TypeLayout, count: u32) -> Option<TypeLayout> {
        let alignment = if self.packing == Packing::Std140 {
            inner.alignment.max(VEC4_ALIGNMENT)
        } else {
            inner.alignment
        };
        let stride = round_up(inner.size, alignment)?;
        let size = match self.packing {
            Packing::Scalar => stride
                .checked_mul(count.saturating_sub(1))?
                .checked_add(inner.size)?,
            Packing::Std140 | Packing::Std430 => stride.checked_mul(count)?,
        };
        Some(TypeLayout {
            alignment,
            size,
            shape: Shape::Array {
                stride,
                element: Box::new(inner),
            },
        })
    }

    fn members(&self, members: &[Member], row_major: bool, depth: u32) -> Option<TypeLayout> {
        let mut size = 0_u32;
        let mut alignment = if self.packing == Packing::Std140 {
            VEC4_ALIGNMENT
        } else {
            1
        };
        let mut laid = Vec::with_capacity(members.len());
        for member in members {
            let row_major = member_row_major(&member.qualifiers, row_major);
            let inner = self.ty(&member.ty, row_major, depth)?;
            alignment = alignment.max(inner.alignment);
            let offset = round_up(size, inner.alignment)?;
            size = offset.checked_add(inner.size)?;
            laid.push(MemberLayout {
                offset,
                layout: inner,
            });
        }
        if self.packing != Packing::Scalar {
            size = round_up(size, alignment)?;
        }
        Some(TypeLayout {
            alignment,
            size,
            shape: Shape::Struct(laid),
        })
    }
}
