use std::cell::RefCell;
use std::collections::BTreeMap;

use rglsl_sema::scope::{Qualifiers, Storage};
use rglsl_sema::types::{
    ArraySize, BlockId, BlockStorage, Member, Opaque, OpaqueKind, SampledType, Scalar, StructId,
    TextureDimension, Type, TypeKind, TypeRegistry,
};

use super::gl;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Pack {
    None,
    Shared,
    Std140,
    Std430,
    Scalar,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Aggregate {
    Struct(StructId),
    Block(BlockId),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Kind {
    Aggregate(Aggregate),
    Reference(BlockId),
    Scalar(Scalar),
    Vector(Scalar, u8),
    Matrix(Scalar, u8, u8),
    LongVector(Scalar, u32),
    Opaque(Opaque),
    Other,
}

#[derive(Debug, Clone)]
pub struct RType {
    pub kind: Kind,
    pub dims: Vec<Option<u32>>,
    pub storage: Storage,
    pub packing: Pack,
    pub row_major: Option<bool>,
    pub offset: Option<i64>,
    pub align: Option<i64>,
    pub binding: Option<i64>,
}

pub fn explicit_row_major(qualifiers: &Qualifiers) -> Option<bool> {
    qualifiers
        .layout
        .iter()
        .rev()
        .find_map(|entry| match entry.name.as_str() {
            "row_major" => Some(true),
            "column_major" => Some(false),
            _ => None,
        })
}

pub fn explicit_packing(qualifiers: &Qualifiers) -> Option<Pack> {
    qualifiers
        .layout
        .iter()
        .rev()
        .find_map(|entry| match entry.name.as_str() {
            "std140" => Some(Pack::Std140),
            "std430" => Some(Pack::Std430),
            "scalar" => Some(Pack::Scalar),
            "shared" | "packed" => Some(Pack::Shared),
            _ => None,
        })
}

pub fn layout_value(qualifiers: &Qualifiers, name: &str) -> Option<i64> {
    qualifiers.layout_entry(name).and_then(|entry| entry.value)
}

const fn dimension(size: ArraySize) -> Option<u32> {
    match size {
        ArraySize::Unsized => None,
        ArraySize::Sized(_) | ArraySize::Specialized(_) => Some(size.checked_size()),
    }
}

impl RType {
    pub fn from_sema(ty: &Type, storage: Storage) -> Self {
        let kind = match ty.kind {
            TypeKind::Scalar(scalar) => Kind::Scalar(scalar),
            TypeKind::Vector { scalar, size } => Kind::Vector(scalar, size),
            TypeKind::Matrix {
                scalar,
                columns,
                rows,
            } => Kind::Matrix(scalar, columns, rows),
            TypeKind::Struct(id) => Kind::Aggregate(Aggregate::Struct(id)),
            TypeKind::Block(id) => Kind::Aggregate(Aggregate::Block(id)),
            TypeKind::Reference(id) => Kind::Reference(id),
            TypeKind::Opaque(opaque) => Kind::Opaque(opaque),
            TypeKind::Tensor { scalar, .. } => Kind::Scalar(scalar),
            TypeKind::LongVector { scalar, size } => {
                Kind::LongVector(scalar, size.nominal().unwrap_or(1))
            }
            _ => Kind::Other,
        };
        Self {
            kind,
            dims: ty
                .dimensions()
                .iter()
                .map(|&size| dimension(size))
                .collect(),
            storage,
            packing: Pack::None,
            row_major: None,
            offset: None,
            align: None,
            binding: None,
        }
    }

    pub const fn is_block(&self) -> bool {
        matches!(self.kind, Kind::Aggregate(Aggregate::Block(_)))
    }

    pub const fn is_struct(&self) -> bool {
        matches!(self.kind, Kind::Aggregate(_))
    }

    pub fn is_array(&self) -> bool {
        !self.dims.is_empty()
    }

    pub fn is_unsized_array(&self) -> bool {
        matches!(self.dims.first(), Some(None))
    }

    pub fn has_unsized(&self) -> bool {
        self.dims.iter().any(Option::is_none)
    }

    pub const fn is_vector(&self) -> bool {
        matches!(self.kind, Kind::Vector(..))
    }

    pub const fn is_matrix(&self) -> bool {
        matches!(self.kind, Kind::Matrix(..))
    }

    pub fn outer_size(&self) -> i64 {
        self.dims
            .first()
            .map_or(0, |size| i64::from(size.unwrap_or(0)))
    }

    pub fn cumulative_size(&self) -> i64 {
        self.dims
            .iter()
            .map(|size| i64::from(size.unwrap_or(0)))
            .product()
    }

    pub fn granular(&self) -> bool {
        !self.is_struct() && self.dims.len() < 2
    }

    pub fn element(&self) -> Self {
        let mut element = self.clone();
        if !element.dims.is_empty() {
            element.dims.remove(0);
        }
        element
    }

    pub fn gl_array_size(&self) -> i64 {
        if self.is_array() {
            self.outer_size()
        } else {
            1
        }
    }

    pub fn gl_type(&self) -> i64 {
        match self.kind {
            Kind::Opaque(opaque) => sampler_type(opaque),
            Kind::Aggregate(_) | Kind::Reference(_) | Kind::Other => 0,
            Kind::Vector(scalar, size) => gl::vector(scalar, size),
            Kind::Matrix(scalar, columns, rows) => gl::matrix(scalar, columns, rows),
            Kind::Scalar(scalar) | Kind::LongVector(scalar, _) => gl::scalar(scalar),
        }
    }
}

fn sampler_type(opaque: Opaque) -> i64 {
    let image = match opaque.kind {
        OpaqueKind::Image => true,
        OpaqueKind::CombinedSampler | OpaqueKind::Texture => false,
        _ => return 0,
    };
    let sampled = match opaque.sampled {
        SampledType::Float => gl::Sampled::Float,
        SampledType::Int => gl::Sampled::Int,
        SampledType::Uint => gl::Sampled::Uint,
        SampledType::Int64 | SampledType::Uint64 => return 0,
    };
    let dimension = match opaque.dimension {
        TextureDimension::D1 => gl::Dimension::D1,
        TextureDimension::D2 => gl::Dimension::D2,
        TextureDimension::D3 => gl::Dimension::D3,
        TextureDimension::Cube => gl::Dimension::Cube,
        TextureDimension::Buffer => gl::Dimension::Buffer,
    };
    gl::sampler(gl::Sampler {
        image,
        sampled,
        dimension,
        arrayed: opaque.arrayed,
        shadow: opaque.shadow,
        multisample: opaque.multisample,
    })
}

const fn scalar_size(scalar: Scalar) -> i64 {
    match scalar {
        Scalar::Int64 | Scalar::Uint64 | Scalar::Double => 8,
        Scalar::Float16 | Scalar::BFloat16 | Scalar::Int16 | Scalar::Uint16 => 2,
        Scalar::FloatE5M2
        | Scalar::FloatE4M3
        | Scalar::FloatUE8M0
        | Scalar::FloatMXINT8
        | Scalar::Int8
        | Scalar::Uint8 => 1,
        Scalar::Bool
        | Scalar::Int
        | Scalar::Uint
        | Scalar::Float
        | Scalar::FloatE2M1
        | Scalar::FloatE3M2
        | Scalar::FloatE2M3 => 4,
    }
}

const fn element_scalar_size(kind: Kind) -> i64 {
    match kind {
        Kind::Scalar(scalar)
        | Kind::Vector(scalar, _)
        | Kind::Matrix(scalar, ..)
        | Kind::LongVector(scalar, _) => scalar_size(scalar),
        Kind::Reference(_) => 8,
        Kind::Opaque(_) | Kind::Aggregate(_) | Kind::Other => 4,
    }
}

pub const fn round_up(value: i64, alignment: i64) -> i64 {
    (value + alignment - 1) & !(alignment - 1)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Layout {
    pub alignment: i64,
    pub size: i64,
    pub stride: i64,
}

type StructKey = (Aggregate, Pack, bool);

type OffsetKey = (BlockId, Pack, bool, Option<i64>, Storage);

#[derive(Debug, Clone, Copy, Default)]
pub struct Sizing {
    pub size: u32,
    pub variably: bool,
}

impl Sizing {
    pub fn constant(&mut self, index: i64) {
        let size = u32::try_from(index.saturating_add(1)).unwrap_or(u32::MAX);
        self.size = self.size.max(size);
    }

    pub fn adopt(self, ty: &mut RType, always: bool) {
        if let Some(outer @ None) = ty.dims.first_mut() {
            if always || !self.variably {
                *outer = Some(self.size.max(1));
            }
        }
    }

    pub fn adopt_inner(self, ty: &mut RType) {
        if let Some(inner @ None) = ty.dims.get_mut(1) {
            *inner = Some(self.size.max(1));
        }
    }
}

#[derive(Debug, Default)]
pub struct Implicit {
    pub symbols: BTreeMap<rglsl_sema::SymbolId, Sizing>,
    pub members: BTreeMap<(Aggregate, usize), Sizing>,
    pub inner_symbols: BTreeMap<rglsl_sema::SymbolId, Sizing>,
    pub inner_members: BTreeMap<(Aggregate, usize), Sizing>,
}

#[derive(Debug)]
pub struct Layouts<'a> {
    pub registry: &'a TypeRegistry,
    pub implicit: Implicit,
    structs: RefCell<BTreeMap<StructKey, (i64, i64)>>,
    counts: RefCell<BTreeMap<StructId, i64>>,
    offsets: RefCell<BTreeMap<OffsetKey, Option<Vec<i64>>>>,
}

impl<'a> Layouts<'a> {
    pub fn new(registry: &'a TypeRegistry, implicit: Implicit) -> Self {
        Self {
            registry,
            implicit,
            structs: RefCell::new(BTreeMap::new()),
            counts: RefCell::new(BTreeMap::new()),
            offsets: RefCell::new(BTreeMap::new()),
        }
    }

    pub fn members(&self, aggregate: Aggregate) -> &'a [Member] {
        match aggregate {
            Aggregate::Struct(id) => self
                .registry
                .structure(id)
                .map_or(&[], |structure| structure.members.as_slice()),
            Aggregate::Block(id) => self
                .registry
                .block(id)
                .map_or(&[], |block| block.members.as_slice()),
        }
    }

    pub fn aggregate_of(&self, ty: &RType) -> Option<(Aggregate, Pack, Option<bool>)> {
        match ty.kind {
            Kind::Aggregate(aggregate) => Some((aggregate, ty.packing, ty.row_major)),
            Kind::Reference(id) => {
                let block = self.registry.block(id)?;
                let (packing, row_major) =
                    block.reference.map_or((Pack::Std430, false), |layout| {
                        (pack_of(layout.packing), layout.row_major)
                    });
                Some((Aggregate::Block(id), packing, Some(row_major)))
            }
            _ => None,
        }
    }

    fn member_rtype(&self, aggregate: Aggregate, index: usize, storage: Storage) -> Option<RType> {
        let members = self.members(aggregate);
        let member = members.get(index)?;
        let mut ty = RType::from_sema(&member.ty, storage);
        let buffer_block = match aggregate {
            Aggregate::Block(id) => self
                .registry
                .block(id)
                .is_some_and(|block| block.storage == BlockStorage::Buffer),
            Aggregate::Struct(_) => false,
        };
        if !(buffer_block && index + 1 == members.len()) {
            self.implicit
                .members
                .get(&(aggregate, index))
                .copied()
                .unwrap_or_default()
                .adopt(&mut ty, false);
        }
        self.implicit
            .inner_members
            .get(&(aggregate, index))
            .copied()
            .unwrap_or_default()
            .adopt_inner(&mut ty);
        Some(ty)
    }

    pub fn member(&self, parent: &RType, index: usize) -> Option<RType> {
        let (aggregate, packing, row_major) = self.aggregate_of(parent)?;
        let member = self.members(aggregate).get(index)?;
        let mut ty = self.member_rtype(aggregate, index, parent.storage)?;
        ty.packing = packing;
        ty.row_major = explicit_row_major(&member.qualifiers).or(row_major);
        ty.align = layout_value(&member.qualifiers, "align").or(parent.align);
        if let (Aggregate::Block(_), Kind::Aggregate(_)) = (aggregate, parent.kind) {
            ty.offset = self.fixed_offset(parent, index);
        }
        Some(ty)
    }

    pub fn member_index(&self, parent: &RType, name: &str) -> Option<usize> {
        let (aggregate, ..) = self.aggregate_of(parent)?;
        self.members(aggregate)
            .iter()
            .position(|member| member.name == name)
    }

    pub fn member_name(&self, parent: &RType, index: usize) -> Option<&'a str> {
        let (aggregate, ..) = self.aggregate_of(parent)?;
        self.members(aggregate)
            .get(index)
            .map(|member| member.name.as_str())
    }

    pub fn member_count(&self, parent: &RType) -> usize {
        self.aggregate_of(parent)
            .map_or(0, |(aggregate, ..)| self.members(aggregate).len())
    }

    fn fixed_offset(&self, block: &RType, index: usize) -> Option<i64> {
        let Kind::Aggregate(Aggregate::Block(id)) = block.kind else {
            return None;
        };
        let key = (
            id,
            block.packing,
            block.row_major.unwrap_or(false),
            block.align,
            block.storage,
        );
        if let Some(known) = self.offsets.borrow().get(&key) {
            return known
                .as_ref()
                .and_then(|offsets| offsets.get(index).copied());
        }
        let offsets = self.fixed_offsets(block);
        let found = offsets
            .as_ref()
            .and_then(|offsets| offsets.get(index).copied());
        self.offsets.borrow_mut().insert(key, offsets);
        found
    }

    fn fixed_offsets(&self, block: &RType) -> Option<Vec<i64>> {
        if !matches!(block.storage, Storage::Uniform | Storage::Buffer) {
            return None;
        }
        if !matches!(block.packing, Pack::Std140 | Pack::Std430 | Pack::Scalar) {
            return None;
        }
        let Kind::Aggregate(aggregate @ Aggregate::Block(_)) = block.kind else {
            return None;
        };
        let members = self.members(aggregate);
        let parent_row_major = block.row_major.unwrap_or(false);
        let mut offsets = Vec::with_capacity(members.len());
        let mut offset = 0;
        for (index, member) in members.iter().enumerate() {
            let row_major = explicit_row_major(&member.qualifiers).unwrap_or(parent_row_major);
            let Some(ty) = self.member_rtype(aggregate, index, block.storage) else {
                continue;
            };
            let layout = self.alignment(&ty, block.packing, row_major);
            let mut alignment = layout.alignment;
            if let Some(explicit) = layout_value(&member.qualifiers, "offset") {
                offset = explicit;
            }
            if let Some(align) = layout_value(&member.qualifiers, "align").or(block.align) {
                alignment = alignment.max(align);
            }
            offset = round_up(offset, alignment);
            offsets.push(offset);
            offset += layout.size;
        }
        Some(offsets)
    }

    pub fn member_offsets(&self, parent: &RType) -> Vec<i64> {
        let count = self.member_count(parent);
        let mut offsets = Vec::with_capacity(count);
        let mut offset = 0;
        for index in 0..count {
            let Some(member) = self.member(parent, index) else {
                break;
            };
            if let Some(explicit) = member.offset {
                offset = explicit;
            }
            let layout = self.member_layout(parent, &member);
            offset = round_up(offset, layout.alignment);
            offsets.push(offset);
            offset += layout.size;
        }
        offsets
    }

    pub fn offset_of(&self, parent: &RType, index: usize) -> i64 {
        if let Some(explicit) = self.member(parent, index).and_then(|member| member.offset) {
            return explicit;
        }
        let mut offset = 0;
        for current in 0..=index {
            let Some(member) = self.member(parent, current) else {
                break;
            };
            let layout = self.member_layout(parent, &member);
            offset = round_up(offset, layout.alignment);
            if current < index {
                offset += layout.size;
            }
        }
        offset
    }

    fn member_layout(&self, parent: &RType, member: &RType) -> Layout {
        let row_major = member.row_major.unwrap_or(parent.row_major == Some(true));
        self.alignment(member, parent.packing, row_major)
    }

    pub fn block_size(&self, block: &RType) -> i64 {
        let count = self.member_count(block);
        let Some(last) = count.checked_sub(1) else {
            return 0;
        };
        let offset = self.offset_of(block, last);
        let size = self.member(block, last).map_or(0, |member| {
            self.alignment(&member, block.packing, block.row_major == Some(true))
                .size
        });
        offset + size
    }

    pub fn array_stride(&self, base: &RType, ty: &RType) -> i64 {
        if ty.is_block() {
            return 0;
        }
        let row_major = ty.row_major.unwrap_or(base.row_major == Some(true));
        self.alignment(ty, base.packing, row_major).stride
    }

    pub fn alignment(&self, ty: &RType, packing: Pack, row_major: bool) -> Layout {
        let scalar = packing == Pack::Scalar;
        let std140 = packing == Pack::Std140;
        let mut layout = self.element_layout(ty.kind, packing, row_major);
        for size in ty.dims.iter().rev() {
            let count = i64::from(size.unwrap_or(0));
            if scalar {
                let stride = round_up(layout.size, layout.alignment);
                layout.size += stride * (count - 1);
                layout.stride = stride;
            } else {
                if std140 {
                    layout.alignment = layout.alignment.max(16);
                }
                let stride = round_up(layout.size, layout.alignment);
                layout.stride = stride;
                layout.size = stride
                    * if size.is_none() && count == 0 {
                        1
                    } else {
                        count
                    };
            }
        }
        layout
    }

    fn element_layout(&self, kind: Kind, packing: Pack, row_major: bool) -> Layout {
        let scalar = packing == Pack::Scalar;
        let std140 = packing == Pack::Std140;
        let component = element_scalar_size(kind);
        let vector = |length: i64| -> (i64, i64) {
            if scalar {
                (component, component * length)
            } else {
                match length {
                    1 => (component, component),
                    2 => (2 * component, 2 * component),
                    _ => (4 * component, component * length),
                }
            }
        };
        match kind {
            Kind::Aggregate(aggregate) => {
                let (alignment, size) = self.struct_layout((aggregate, packing, row_major));
                Layout {
                    alignment,
                    size,
                    stride: 0,
                }
            }
            Kind::Vector(_, length) => {
                let (alignment, size) = vector(i64::from(length));
                Layout {
                    alignment,
                    size,
                    stride: 0,
                }
            }
            Kind::LongVector(_, length) => {
                let (alignment, size) = vector(i64::from(length));
                Layout {
                    alignment,
                    size,
                    stride: 0,
                }
            }
            Kind::Matrix(_, columns, rows) => {
                let (mut alignment, size) =
                    vector(i64::from(if row_major { columns } else { rows }));
                let stride = if scalar {
                    size
                } else {
                    if std140 {
                        alignment = alignment.max(16);
                    }
                    round_up(size, alignment)
                };
                Layout {
                    alignment,
                    size: stride * i64::from(if row_major { rows } else { columns }),
                    stride,
                }
            }
            Kind::Scalar(_) | Kind::Reference(_) | Kind::Opaque(_) | Kind::Other => Layout {
                alignment: component,
                size: component,
                stride: 0,
            },
        }
    }

    fn struct_layout(&self, root: StructKey) -> (i64, i64) {
        if let Some(&known) = self.structs.borrow().get(&root) {
            return known;
        }
        let mut pending = vec![root];
        while let Some(&key) = pending.last() {
            if self.structs.borrow().contains_key(&key) {
                pending.pop();
                continue;
            }
            let (aggregate, packing, row_major) = key;
            let members = self.members(aggregate);
            let missing = members.iter().find_map(|member| {
                let TypeKind::Struct(id) = member.ty.kind else {
                    return None;
                };
                let member_row_major = explicit_row_major(&member.qualifiers).unwrap_or(row_major);
                let nested = (Aggregate::Struct(id), packing, member_row_major);
                (!self.structs.borrow().contains_key(&nested)).then_some(nested)
            });
            if let Some(nested) = missing {
                pending.push(nested);
                continue;
            }
            let scalar = packing == Pack::Scalar;
            let mut size = 0;
            let mut max_alignment = if packing == Pack::Std140 { 16 } else { 0 };
            for (index, member) in members.iter().enumerate() {
                let member_row_major = explicit_row_major(&member.qualifiers).unwrap_or(row_major);
                let Some(ty) = self.member_rtype(aggregate, index, Storage::None) else {
                    continue;
                };
                let layout = self.alignment(&ty, packing, member_row_major);
                max_alignment = max_alignment.max(layout.alignment);
                size = round_up(size, layout.alignment);
                size += layout.size;
            }
            if !scalar {
                size = round_up(size, max_alignment);
            }
            self.structs.borrow_mut().insert(key, (max_alignment, size));
            pending.pop();
        }
        self.structs.borrow().get(&root).copied().unwrap_or((0, 0))
    }

    pub fn count_members(&self, parent: &RType, strict: bool) -> i64 {
        let Some((aggregate, ..)) = self.aggregate_of(parent) else {
            return 1;
        };
        let block_parent = parent.is_block() && parent.storage == Storage::Buffer;
        let mut total = 0;
        for index in 0..self.members(aggregate).len() {
            let Some(ty) = self.member_rtype(aggregate, index, Storage::None) else {
                continue;
            };
            let mut count = match ty.kind {
                Kind::Aggregate(Aggregate::Struct(id)) => self.struct_members(id),
                _ => 1,
            };
            if ty.is_array() && !ty.has_unsized() && ty.is_struct() && (!strict || !block_parent) {
                count *= ty.cumulative_size();
            }
            total += count;
        }
        total
    }

    fn struct_members(&self, root: StructId) -> i64 {
        if let Some(&known) = self.counts.borrow().get(&root) {
            return known;
        }
        let mut pending = vec![root];
        while let Some(&id) = pending.last() {
            if self.counts.borrow().contains_key(&id) {
                pending.pop();
                continue;
            }
            let members = self.members(Aggregate::Struct(id));
            let missing = members.iter().find_map(|member| match member.ty.kind {
                TypeKind::Struct(nested) if !self.counts.borrow().contains_key(&nested) => {
                    Some(nested)
                }
                _ => None,
            });
            if let Some(nested) = missing {
                pending.push(nested);
                continue;
            }
            let mut total = 0;
            for (index, member) in members.iter().enumerate() {
                let Some(ty) = self.member_rtype(Aggregate::Struct(id), index, Storage::None)
                else {
                    continue;
                };
                let mut count = match member.ty.kind {
                    TypeKind::Struct(nested) => {
                        self.counts.borrow().get(&nested).copied().unwrap_or(1)
                    }
                    _ => 1,
                };
                if ty.is_array() && !ty.has_unsized() && ty.is_struct() {
                    count *= ty.cumulative_size();
                }
                total += count;
            }
            self.counts.borrow_mut().insert(id, total);
            pending.pop();
        }
        self.counts.borrow().get(&root).copied().unwrap_or(1)
    }
}

pub const fn pack_of(packing: rglsl_sema::types::Packing) -> Pack {
    match packing {
        rglsl_sema::types::Packing::Std140 => Pack::Std140,
        rglsl_sema::types::Packing::Std430 => Pack::Std430,
        rglsl_sema::types::Packing::Scalar => Pack::Scalar,
    }
}
