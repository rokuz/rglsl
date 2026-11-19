use rglsl::{
    ArraySize, Binding, GlobalVariable, Handle, Module, ShaderStage, Type, TypeInner, UniqueArena,
};
use rglsl_types::stack::recurse;

const ALL: u8 = 0b1111;

#[derive(Debug, Clone, Default)]
pub(super) struct Slots {
    ranges: [Vec<(u32, u32)>; 16],
}

impl Slots {
    fn push(&mut self, first: u32, shape: Option<Shape>, component: u32) {
        let (count, mask) = match shape {
            Some(shape) => (Some(shape.locations), shape.mask),
            None => (None, ALL),
        };
        let mask = u32::from(mask)
            .checked_shl(component)
            .filter(|&mask| mask <= u32::from(ALL))
            .and_then(|mask| u8::try_from(mask).ok())
            .unwrap_or(ALL);
        let end = count
            .and_then(|count| first.checked_add(count))
            .unwrap_or(u32::MAX);
        if end > first
            && let Some(group) = self.ranges.get_mut(usize::from(mask))
        {
            group.push((first, end));
        }
    }

    pub fn extend(&mut self, other: &Self) {
        for (group, more) in self.ranges.iter_mut().zip(&other.ranges) {
            group.extend_from_slice(more);
        }
    }

    pub fn finish(&mut self) {
        for group in &mut self.ranges {
            group.sort_unstable();
            let mut merged: Vec<(u32, u32)> = Vec::with_capacity(group.len());
            for &(first, end) in group.iter() {
                match merged.last_mut() {
                    Some(last) if first <= last.1 => last.1 = last.1.max(end),
                    _ => merged.push((first, end)),
                }
            }
            *group = merged;
        }
    }

    pub fn overlaps(&self, other: &Self) -> bool {
        other.ranges.iter().enumerate().any(|(theirs, queries)| {
            queries.iter().any(|&(first, end)| {
                self.ranges.iter().enumerate().any(|(ours, group)| {
                    ours & theirs != 0 && {
                        let after = group.partition_point(|&(_, last)| last <= first);
                        group.get(after).is_some_and(|&(start, _)| start < end)
                    }
                })
            })
        })
    }
}

#[derive(Debug, Clone, Copy)]
struct Shape {
    locations: u32,
    mask: u8,
}

pub(super) fn arrayed(stage: ShaderStage, input: bool, patch: bool) -> bool {
    match (stage, input) {
        (ShaderStage::TessControl, _) | (ShaderStage::TessEvaluation, true) => !patch,
        (ShaderStage::Geometry, true) | (ShaderStage::Mesh, false) => true,
        _ => false,
    }
}

pub(super) fn of(module: &Module, stage: ShaderStage, global: &GlobalVariable) -> Slots {
    let input = global.space == rglsl::AddressSpace::Input;
    let mut slots = Slots::default();
    match global.io {
        Some(Binding::Location {
            location,
            patch,
            component,
            ..
        }) => {
            let ty = element(&module.types, global.ty, arrayed(stage, input, patch));
            slots.push(location, shape(&module.types, ty), component.unwrap_or(0));
        }
        Some(Binding::BuiltIn(_)) => {}
        None => {
            let patch = block_members(&module.types, global.ty)
                .and_then(|members| members.iter().find_map(|member| member.binding.as_ref()))
                .is_some_and(|binding| matches!(*binding, Binding::Location { patch: true, .. }));
            let ty = element(&module.types, global.ty, arrayed(stage, input, patch));
            let Some(TypeInner::Struct { members, .. }) =
                module.types.get_handle(ty).ok().map(|ty| &ty.inner)
            else {
                slots.push(0, None, 0);
                return slots;
            };
            for member in members {
                match member.binding {
                    Some(Binding::Location {
                        location,
                        component,
                        ..
                    }) => {
                        slots.push(
                            location,
                            shape(&module.types, member.ty),
                            component.unwrap_or(0),
                        );
                    }
                    Some(Binding::BuiltIn(_)) => {}
                    None => slots.push(0, None, 0),
                }
            }
        }
    }
    slots.finish();
    slots
}

fn block_members(types: &UniqueArena<Type>, ty: Handle<Type>) -> Option<&[rglsl::StructMember]> {
    let mut current = ty;
    loop {
        match types.get_handle(current).ok()?.inner {
            TypeInner::Array { base, .. } => current = base,
            TypeInner::Struct { ref members, .. } => return Some(members),
            _ => return None,
        }
    }
}

pub(super) fn element(types: &UniqueArena<Type>, ty: Handle<Type>, arrayed: bool) -> Handle<Type> {
    match types.get_handle(ty).ok().map(|ty| &ty.inner) {
        Some(&TypeInner::Array { base, .. }) if arrayed => base,
        _ => ty,
    }
}

fn vector(size: u32, width: u8) -> Shape {
    let components = if width == 8 { size * 2 } else { size };
    if components > 4 {
        Shape {
            locations: 2,
            mask: ALL,
        }
    } else {
        Shape {
            locations: 1,
            mask: u8::try_from((1_u32 << components) - 1).unwrap_or(ALL),
        }
    }
}

fn shape(types: &UniqueArena<Type>, ty: Handle<Type>) -> Option<Shape> {
    match types.get_handle(ty).ok()?.inner {
        TypeInner::Scalar(scalar) => Some(vector(1, scalar.width)),
        TypeInner::Vector { size, scalar } => Some(vector(size as u32, scalar.width)),
        TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } => {
            let column = vector(rows as u32, scalar.width);
            Some(Shape {
                locations: (columns as u32).checked_mul(column.locations)?,
                mask: column.mask,
            })
        }
        TypeInner::Array {
            base,
            size: ArraySize::Constant(length),
            ..
        } => {
            let element = recurse(|| shape(types, base))?;
            Some(Shape {
                locations: element.locations.checked_mul(length.get())?,
                mask: element.mask,
            })
        }
        TypeInner::Struct { ref members, .. } => {
            let mut total: u32 = 0;
            for member in members {
                total = total.checked_add(recurse(|| shape(types, member.ty))?.locations)?;
            }
            Some(Shape {
                locations: total,
                mask: ALL,
            })
        }
        _ => None,
    }
}
