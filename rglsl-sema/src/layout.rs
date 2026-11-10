use crate::scope::Qualifiers;
use crate::types::{ArraySize, BlockType, Member, Packing, Scalar, Type, TypeKind, TypeRegistry};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Layout {
    pub alignment: u32,
    pub size: u32,
}

const VEC4_ALIGNMENT: u32 = 16;

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
        Scalar::Int16 | Scalar::Uint16 | Scalar::Float16 => 2,
        Scalar::Int8 | Scalar::Uint8 => 1,
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

pub fn layout_of(
    registry: &TypeRegistry,
    ty: &Type,
    packing: Packing,
    row_major: bool,
) -> Option<Layout> {
    layout_with_depth(registry, ty, packing, row_major, 0)
}

fn layout_with_depth(
    registry: &TypeRegistry,
    ty: &Type,
    packing: Packing,
    row_major: bool,
    depth: u32,
) -> Option<Layout> {
    if depth > 64 {
        return None;
    }
    if let Some(element) = ty.element_type().filter(|_| ty.is_array()) {
        let inner = layout_with_depth(registry, &element, packing, row_major, depth + 1)?;
        let count = match ty.outer_size()? {
            ArraySize::Unsized => 1,
            size => size.nominal().unwrap_or(1),
        };
        return Some(match packing {
            Packing::Scalar => {
                let stride = round_up(inner.size, inner.alignment)?;
                Layout {
                    alignment: inner.alignment,
                    size: stride
                        .checked_mul(count.saturating_sub(1))?
                        .checked_add(inner.size)?,
                }
            }
            Packing::Std140 | Packing::Std430 => {
                let alignment = if packing == Packing::Std140 {
                    inner.alignment.max(VEC4_ALIGNMENT)
                } else {
                    inner.alignment
                };
                let stride = round_up(inner.size, alignment)?;
                Layout {
                    alignment,
                    size: stride.checked_mul(count)?,
                }
            }
        });
    }
    match ty.kind {
        TypeKind::Scalar(scalar) => {
            let size = scalar_size(scalar);
            Some(Layout {
                alignment: size,
                size,
            })
        }
        TypeKind::Reference(_) => Some(Layout {
            alignment: 8,
            size: 8,
        }),
        TypeKind::Vector { scalar, size } => {
            let component = scalar_size(scalar);
            let bytes = component.checked_mul(u32::from(size))?;
            let alignment = match packing {
                Packing::Scalar => component,
                Packing::Std140 | Packing::Std430 if size == 2 => component * 2,
                Packing::Std140 | Packing::Std430 => component * 4,
            };
            Some(Layout {
                alignment,
                size: bytes,
            })
        }
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
            let line = layout_with_depth(
                registry,
                &Type::vector(scalar, vector),
                packing,
                row_major,
                depth + 1,
            )?;
            let alignment = if packing == Packing::Std140 {
                line.alignment.max(VEC4_ALIGNMENT)
            } else {
                line.alignment
            };
            let stride = match packing {
                Packing::Scalar => line.size,
                Packing::Std140 | Packing::Std430 => round_up(line.size, alignment)?,
            };
            Some(Layout {
                alignment,
                size: stride.checked_mul(u32::from(count))?,
            })
        }
        TypeKind::Struct(id) => {
            let structure = registry.structure(id)?;
            members_layout(registry, &structure.members, packing, row_major, depth + 1)
        }
        TypeKind::Error
        | TypeKind::Void
        | TypeKind::String
        | TypeKind::Block(_)
        | TypeKind::Opaque(_) => None,
    }
}

fn members_layout(
    registry: &TypeRegistry,
    members: &[Member],
    packing: Packing,
    row_major: bool,
    depth: u32,
) -> Option<Layout> {
    let mut size = 0_u32;
    let mut alignment = if packing == Packing::Std140 {
        VEC4_ALIGNMENT
    } else {
        0
    };
    for member in members {
        let row_major = member_row_major(&member.qualifiers, row_major);
        let inner = layout_with_depth(registry, &member.ty, packing, row_major, depth)?;
        alignment = alignment.max(inner.alignment);
        size = round_up(size, inner.alignment)?.checked_add(inner.size)?;
    }
    if packing != Packing::Scalar {
        size = round_up(size, alignment)?;
    }
    Some(Layout { alignment, size })
}

pub fn block_size(
    registry: &TypeRegistry,
    block: &BlockType,
    packing: Packing,
    row_major: bool,
) -> Option<u32> {
    let mut offset = 0_u32;
    let mut end = 0_u32;
    for member in &block.members {
        let row_major = member_row_major(&member.qualifiers, row_major);
        let inner = layout_of(registry, &member.ty, packing, row_major)?;
        let explicit = member
            .qualifiers
            .layout_entry("offset")
            .and_then(|entry| entry.value)
            .and_then(|value| u32::try_from(value).ok());
        let start = match explicit {
            Some(explicit) => explicit,
            None => {
                let aligned = match member
                    .qualifiers
                    .layout_entry("align")
                    .and_then(|entry| entry.value)
                    .and_then(|value| u32::try_from(value).ok())
                {
                    Some(align) => inner.alignment.max(align),
                    None => inner.alignment,
                };
                round_up(offset, aligned)?
            }
        };
        end = start.checked_add(inner.size)?;
        offset = end;
    }
    Some(end)
}
