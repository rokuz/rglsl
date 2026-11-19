use rglsl::{
    ArraySize, Binding, GlobalVariable, Handle, Module, ShaderStage, Type, TypeInner, UniqueArena,
};
use rglsl_types::stack::recurse;

#[derive(Debug, Clone, Default)]
pub(super) struct Slots {
    ranges: Vec<(u32, u32)>,
}

impl Slots {
    fn push(&mut self, first: u32, count: Option<u32>) {
        let end = count
            .and_then(|count| first.checked_add(count))
            .unwrap_or(u32::MAX);
        if end > first {
            self.ranges.push((first, end));
        }
    }

    pub fn extend(&mut self, other: &Self) {
        self.ranges.extend_from_slice(&other.ranges);
    }

    pub fn finish(&mut self) {
        self.ranges.sort_unstable();
        let mut merged: Vec<(u32, u32)> = Vec::with_capacity(self.ranges.len());
        for &(first, end) in &self.ranges {
            match merged.last_mut() {
                Some(last) if first <= last.1 => last.1 = last.1.max(end),
                _ => merged.push((first, end)),
            }
        }
        self.ranges = merged;
    }

    pub fn overlaps(&self, other: &Self) -> bool {
        other.ranges.iter().any(|&(first, end)| {
            let after = self.ranges.partition_point(|&(_, last)| last <= first);
            self.ranges
                .get(after)
                .is_some_and(|&(start, _)| start < end)
        })
    }
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
            location, patch, ..
        }) => {
            let ty = element(&module.types, global.ty, arrayed(stage, input, patch));
            slots.push(location, locations(&module.types, ty));
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
                slots.push(0, None);
                return slots;
            };
            for member in members {
                match member.binding {
                    Some(Binding::Location { location, .. }) => {
                        slots.push(location, locations(&module.types, member.ty));
                    }
                    Some(Binding::BuiltIn(_)) => {}
                    None => slots.push(0, None),
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

fn locations(types: &UniqueArena<Type>, ty: Handle<Type>) -> Option<u32> {
    let vector = |size: u32, width: u8| if size * u32::from(width) > 16 { 2 } else { 1 };
    match types.get_handle(ty).ok()?.inner {
        TypeInner::Scalar(_) => Some(1),
        TypeInner::Vector { size, scalar } => Some(vector(size as u32, scalar.width)),
        TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } => (columns as u32).checked_mul(vector(rows as u32, scalar.width)),
        TypeInner::Array {
            base,
            size: ArraySize::Constant(length),
            ..
        } => recurse(|| locations(types, base))?.checked_mul(length.get()),
        TypeInner::Struct { ref members, .. } => {
            let mut total: u32 = 0;
            for member in members {
                total = total.checked_add(recurse(|| locations(types, member.ty))?)?;
            }
            Some(total)
        }
        _ => None,
    }
}
