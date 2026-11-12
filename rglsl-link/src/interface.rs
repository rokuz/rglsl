use std::collections::{BTreeMap, BTreeSet};

use rglsl::{
    AddressSpace, ArraySize, Binding, Expression, GlobalVariable, Handle, Module, ResourceBinding,
    ShaderStage, Type, TypeInner, VectorSize,
};

use crate::merge::MergedGlobal;

const fn vector_locations(size: VectorSize, width: u8) -> u32 {
    match (size, width) {
        (VectorSize::Tri | VectorSize::Quad, 8) => 2,
        _ => 1,
    }
}

fn location_count(module: &Module, ty: Handle<Type>) -> u32 {
    let mut counts: BTreeMap<Handle<Type>, u32> = BTreeMap::new();
    let Ok(()) = rglsl::proc::post_order(
        &mut counts,
        ty,
        |counts, ty, children| {
            if counts.contains_key(&ty) {
                return false;
            }
            match module.types[ty].inner {
                TypeInner::Array {
                    base,
                    size: ArraySize::Constant(_),
                    ..
                } => children.push(base),
                TypeInner::Struct { ref members, .. } => {
                    children.extend(members.iter().map(|member| member.ty));
                }
                _ => {}
            }
            true
        },
        |counts, ty| {
            let count = |ty| counts.get(&ty).copied().unwrap_or(1);
            let total = match module.types[ty].inner {
                TypeInner::Vector { size, scalar } => vector_locations(size, scalar.width),
                TypeInner::Matrix {
                    columns,
                    rows,
                    scalar,
                } => (columns as u32).saturating_mul(vector_locations(rows, scalar.width)),
                TypeInner::Array {
                    base,
                    size: ArraySize::Constant(length),
                    ..
                } => length.get().saturating_mul(count(base)),
                TypeInner::Array { .. } => 1,
                TypeInner::Struct { ref members, .. } => members
                    .iter()
                    .map(|member| count(member.ty))
                    .fold(0, u32::saturating_add),
                _ => 1,
            };
            counts.insert(ty, total);
            Ok::<(), core::convert::Infallible>(())
        },
    );
    counts.get(&ty).copied().unwrap_or(1)
}

const fn arrayed(stage: ShaderStage, space: AddressSpace) -> bool {
    matches!(
        (stage, space),
        (
            ShaderStage::TessControl,
            AddressSpace::Input | AddressSpace::Output
        ) | (
            ShaderStage::TessEvaluation | ShaderStage::Geometry,
            AddressSpace::Input
        ) | (ShaderStage::Mesh, AddressSpace::Output)
    )
}

fn element(module: &Module, stage: ShaderStage, global: &GlobalVariable) -> Handle<Type> {
    let patch = matches!(global.io, Some(Binding::Location { patch: true, .. }));
    match module.types[global.ty].inner {
        TypeInner::Array { base, .. } if arrayed(stage, global.space) && !patch => base,
        _ => global.ty,
    }
}

fn ranges(module: &Module, stage: ShaderStage, global: &GlobalVariable) -> Vec<(u32, u32)> {
    match global.io {
        Some(Binding::Location { location, .. }) => {
            let count = location_count(module, element(module, stage, global));
            vec![(location, location.saturating_add(count.max(1)))]
        }
        Some(Binding::BuiltIn(_)) => Vec::new(),
        None => match module.types[element(module, stage, global)].inner {
            TypeInner::Struct { ref members, .. } => members
                .iter()
                .filter_map(|member| match member.binding {
                    Some(Binding::Location { location, .. }) => Some((
                        location,
                        location.saturating_add(location_count(module, member.ty).max(1)),
                    )),
                    _ => None,
                })
                .collect(),
            _ => Vec::new(),
        },
    }
}

pub(crate) fn assign_locations(module: &mut Module, globals: &[MergedGlobal], stage: ShaderStage) {
    let automatic: BTreeSet<Handle<GlobalVariable>> = globals
        .iter()
        .filter(|global| global.automatic_location)
        .map(|global| global.handle)
        .collect();
    for space in [AddressSpace::Input, AddressSpace::Output] {
        let mut taken: Vec<(u32, u32)> = Vec::new();
        for (handle, global) in module.global_variables.iter() {
            if global.space == space && !automatic.contains(&handle) {
                taken.extend(ranges(module, stage, global));
            }
        }
        let mut next = 0_u32;
        for merged in globals {
            if !automatic.contains(&merged.handle) {
                continue;
            }
            let global = &module.global_variables[merged.handle];
            if global.space != space || !matches!(global.io, Some(Binding::Location { .. })) {
                continue;
            }
            let count = location_count(module, element(module, stage, global));
            let end = |start: u32| start.saturating_add(count.max(1));
            let mut start = next;
            while let Some(&(_, until)) = taken
                .iter()
                .find(|&&(from, to)| from < end(start) && start < to)
            {
                start = until;
            }
            next = start.saturating_add(count);
            if let Some(Binding::Location {
                ref mut location, ..
            }) = module.global_variables.get_mut(merged.handle).io
            {
                *location = start;
            }
        }
    }
}

fn live_globals(module: &Module) -> BTreeSet<Handle<GlobalVariable>> {
    let functions = module
        .functions
        .iter()
        .map(|(_, function)| function)
        .chain(module.entry_points.iter().map(|entry| &entry.function));
    let mut live = BTreeSet::new();
    for function in functions {
        for (_, expression) in function.expressions.iter() {
            if let Expression::GlobalVariable(handle) = *expression {
                live.insert(handle);
            }
        }
    }
    live
}

pub(crate) fn assign_bindings(module: &mut Module, globals: &[MergedGlobal]) {
    let mut unbound: Vec<(Handle<GlobalVariable>, Option<u32>)> = globals
        .iter()
        .filter_map(|global| global.automatic_binding.map(|set| (global.handle, set)))
        .collect();
    if unbound.is_empty() {
        return;
    }
    unbound.sort_by_key(|&(_, set)| set.is_none());
    let automatic: BTreeSet<Handle<GlobalVariable>> =
        unbound.iter().map(|&(handle, _)| handle).collect();
    let live = live_globals(module);
    let mut taken: BTreeMap<u32, BTreeSet<u32>> = BTreeMap::new();
    for (handle, global) in module.global_variables.iter() {
        if automatic.contains(&handle) {
            continue;
        }
        if let Some(ref binding) = global.binding {
            taken
                .entry(binding.group)
                .or_default()
                .insert(binding.binding);
        }
    }
    for (handle, set) in unbound {
        let group = set.unwrap_or(0);
        let binding = if live.contains(&handle) {
            let used = taken.entry(group).or_default();
            let free = (0..=u32::MAX)
                .find(|binding| !used.contains(binding))
                .unwrap_or(u32::MAX);
            used.insert(free);
            free
        } else {
            0
        };
        module.global_variables.get_mut(handle).binding = Some(ResourceBinding { group, binding });
    }
}
