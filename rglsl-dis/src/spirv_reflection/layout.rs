use std::collections::{BTreeMap, BTreeSet};

use rglsl_types::stack::recurse;
use spirv::StorageClass;

use super::module::{DecorationFlags, Module, Type};
use super::{BlockLayout, ReflectError};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
struct MatrixLayout {
    stride: u32,
    row_major: bool,
}

#[derive(Debug)]
pub(super) struct Sizes<'m> {
    module: &'m Module,
    known: BTreeMap<(u32, Option<MatrixLayout>), u32>,
    active: BTreeSet<u32>,
}

pub(super) fn element_chain(
    module: &Module,
    id: u32,
) -> Result<(u32, Vec<Option<u32>>), ReflectError> {
    let mut lengths = Vec::new();
    let mut current = id;
    let mut visited = BTreeSet::new();
    loop {
        if !visited.insert(current) {
            return Err(ReflectError::CyclicType(current));
        }
        match *module.ty(current)? {
            Type::Array { element, length } => {
                lengths.push(Some(module.array_length(current, length)?));
                current = element;
            }
            Type::RuntimeArray { element } => {
                lengths.push(None);
                current = element;
            }
            _ => return Ok((current, lengths)),
        }
    }
}

impl<'m> Sizes<'m> {
    pub(super) const fn new(module: &'m Module) -> Self {
        Self {
            module,
            known: BTreeMap::new(),
            active: BTreeSet::new(),
        }
    }

    pub(super) fn size(&mut self, id: u32) -> Result<u32, ReflectError> {
        self.sized(id, None)
    }

    fn sized(&mut self, id: u32, matrix: Option<MatrixLayout>) -> Result<u32, ReflectError> {
        let matrix = matrix.filter(|_| {
            matches!(
                self.module.types.get(&id),
                Some(Type::Matrix { .. } | Type::Array { .. })
            )
        });
        if let Some(&size) = self.known.get(&(id, matrix)) {
            return Ok(size);
        }
        if !self.active.insert(id) {
            return Err(ReflectError::CyclicType(id));
        }
        let size = recurse(|| self.compute(id, matrix));
        self.active.remove(&id);
        let size = size?;
        self.known.insert((id, matrix), size);
        Ok(size)
    }

    fn compute(&mut self, id: u32, matrix: Option<MatrixLayout>) -> Result<u32, ReflectError> {
        let module = self.module;
        let overflow = ReflectError::SizeOverflow(id);
        match *module.ty(id)? {
            Type::Int { width, .. } | Type::Float { width, .. } => Ok(width.div_ceil(8)),
            Type::Vector { component, count } => self
                .sized(component, None)?
                .checked_mul(count)
                .ok_or(overflow),
            Type::Matrix { column, columns } => match matrix {
                Some(MatrixLayout {
                    stride,
                    row_major: true,
                }) => {
                    let Type::Vector { count: rows, .. } = *module.ty(column)? else {
                        return Err(ReflectError::UnsizedType(column));
                    };
                    stride.checked_mul(rows).ok_or(overflow)
                }
                Some(MatrixLayout {
                    stride,
                    row_major: false,
                }) => stride.checked_mul(columns).ok_or(overflow),
                None => self
                    .sized(column, None)?
                    .checked_mul(columns)
                    .ok_or(overflow),
            },
            Type::Array { element, length } => {
                let count = module.array_length(id, length)?;
                let stride = match module.decorations(id).array_stride {
                    Some(stride) => stride,
                    None => self.sized(element, matrix)?,
                };
                stride.checked_mul(count).ok_or(overflow)
            }
            Type::RuntimeArray { .. } => Ok(0),
            Type::Struct { ref members } => {
                let mut end = 0_u32;
                for (index, &member) in (0_u32..).zip(members) {
                    let decorations = module.member_decorations(id, index);
                    let matrix = decorations.matrix_stride.map(|stride| MatrixLayout {
                        stride,
                        row_major: decorations.flags.contains(DecorationFlags::ROW_MAJOR),
                    });
                    let offset = decorations.offset.unwrap_or(end);
                    let size = self.sized(member, matrix)?;
                    let member_end = offset.checked_add(size).ok_or(overflow)?;
                    end = end.max(member_end);
                }
                Ok(end)
            }
            Type::Pointer { class, .. } if class.is(&StorageClass::PhysicalStorageBuffer) => Ok(8),
            Type::Bool
            | Type::Image { .. }
            | Type::Sampler
            | Type::SampledImage { .. }
            | Type::Pointer { .. }
            | Type::AccelerationStructure
            | Type::Tensor { .. }
            | Type::Graph { .. }
            | Type::Other => Err(ReflectError::UnsizedType(id)),
        }
    }

    pub(super) fn block(&mut self, id: u32) -> Result<BlockLayout, ReflectError> {
        let size = self.size(id)?;
        let module = self.module;
        let runtime_array_stride = if let Type::Struct { ref members } = *module.ty(id)?
            && let Some(&last) = members.last()
            && let Type::RuntimeArray { element } = *module.ty(last)?
        {
            Some(match module.decorations(last).array_stride {
                Some(stride) => stride,
                None => self.size(element)?,
            })
        } else {
            None
        };
        Ok(BlockLayout {
            size,
            runtime_array_stride,
        })
    }

    pub(super) fn push_constant_range(&mut self, id: u32) -> Result<(u32, u32), ReflectError> {
        let end = self.size(id)?;
        let module = self.module;
        let offset = match *module.ty(id)? {
            Type::Struct { ref members } => (0_u32..)
                .zip(members)
                .filter_map(|(index, _)| module.member_decorations(id, index).offset)
                .min()
                .unwrap_or(0),
            _ => 0,
        };
        Ok((offset, end.saturating_sub(offset)))
    }
}
