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

pub(crate) fn relocate(module: &mut Module, ty: Handle<Type>, from: u32, to: u32) -> Handle<Type> {
    if from == to {
        return ty;
    }
    let mut layers = Vec::new();
    let mut current = ty;
    while let TypeInner::Array { base, size, stride } = module.types[current].inner {
        layers.push((module.types[current].name.clone(), size, stride));
        current = base;
    }
    let TypeInner::Struct {
        ref members,
        span: size,
    } = module.types[current].inner
    else {
        return ty;
    };
    let mut members = members.clone();
    let mut moved = false;
    for member in &mut members {
        if let Some(Binding::Location {
            ref mut location, ..
        }) = member.binding
        {
            *location = to.saturating_add(location.saturating_sub(from));
            moved = true;
        }
    }
    if !moved {
        return ty;
    }
    let span = module.types.get_span(current);
    let mut relocated = module.types.insert(
        Type {
            name: module.types[current].name.clone(),
            inner: TypeInner::Struct {
                members,
                span: size,
            },
        },
        span,
    );
    for (name, size, stride) in layers.into_iter().rev() {
        relocated = module.types.insert(
            Type {
                name,
                inner: TypeInner::Array {
                    base: relocated,
                    size,
                    stride,
                },
            },
            span,
        );
    }
    relocated
}

fn place(module: &mut Module, handle: Handle<GlobalVariable>, start: u32) {
    let Some(Binding::Location { location, .. }) = module.global_variables[handle].io else {
        return;
    };
    let ty = relocate(module, module.global_variables[handle].ty, location, start);
    let global = module.global_variables.get_mut(handle);
    global.ty = ty;
    if let Some(Binding::Location {
        ref mut location, ..
    }) = global.io
    {
        *location = start;
    }
}

fn located(module: &Module, handle: Handle<GlobalVariable>) -> Option<u32> {
    match module.global_variables[handle].io {
        Some(Binding::Location { location, .. }) => Some(location),
        _ => None,
    }
}

fn span(module: &Module, stage: ShaderStage, handle: Handle<GlobalVariable>) -> u32 {
    location_count(
        module,
        element(module, stage, &module.global_variables[handle]),
    )
    .max(1)
}

fn overlaps(taken: &[(u32, u32)], start: u32, count: u32) -> Option<u32> {
    let end = start.saturating_add(count);
    taken
        .iter()
        .find(|&&(from, to)| from < end && start < to)
        .map(|&(_, to)| to)
}

fn first_fit(taken: &[(u32, u32)], mut start: u32, count: u32) -> u32 {
    while let Some(until) = overlaps(taken, start, count) {
        start = until;
    }
    start
}

fn taken_by(
    module: &Module,
    stage: ShaderStage,
    space: AddressSpace,
    movable: &BTreeSet<Handle<GlobalVariable>>,
) -> Vec<(u32, u32)> {
    module
        .global_variables
        .iter()
        .filter(|&(handle, global)| global.space == space && !movable.contains(&handle))
        .flat_map(|(_, global)| ranges(module, stage, global))
        .collect()
}

fn assign_space(
    module: &mut Module,
    globals: &[MergedGlobal],
    stage: ShaderStage,
    space: AddressSpace,
    movable: &BTreeSet<Handle<GlobalVariable>>,
) {
    let taken = taken_by(module, stage, space, movable);
    let mut next = 0_u32;
    for merged in globals {
        if !movable.contains(&merged.handle)
            || module.global_variables[merged.handle].space != space
            || located(module, merged.handle).is_none()
        {
            continue;
        }
        let count = span(module, stage, merged.handle);
        let start = first_fit(&taken, next, count);
        next = start.saturating_add(count);
        place(module, merged.handle, start);
    }
}

fn automatic(globals: &[MergedGlobal]) -> BTreeSet<Handle<GlobalVariable>> {
    globals
        .iter()
        .filter(|global| global.automatic_location)
        .map(|global| global.handle)
        .collect()
}

pub(crate) fn assign_locations(module: &mut Module, globals: &[MergedGlobal], stage: ShaderStage) {
    let movable = automatic(globals);
    for space in [AddressSpace::Input, AddressSpace::Output] {
        assign_space(module, globals, stage, space, &movable);
    }
}

pub(crate) struct StageIo<'a> {
    pub module: &'a mut Module,
    pub globals: &'a [MergedGlobal],
    pub stage: ShaderStage,
}

fn pairs<'g>(from: &StageIo<'g>, to: &StageIo<'g>) -> Vec<(&'g MergedGlobal, &'g MergedGlobal)> {
    let mut pairs = Vec::new();
    for output in from.globals {
        let variable = &from.module.global_variables[output.handle];
        if variable.space != AddressSpace::Output || located(from.module, output.handle).is_none() {
            continue;
        }
        let input = to.globals.iter().find(|input| {
            input.name == output.name
                && to.module.global_variables[input.handle].space == AddressSpace::Input
                && located(to.module, input.handle).is_some()
        });
        if let Some(input) = input {
            pairs.push((output, input));
        }
    }
    pairs
}

pub(crate) fn match_locations(from: StageIo, to: StageIo) {
    let mut outputs = automatic(from.globals);
    let mut inputs = automatic(to.globals);
    let pairs = pairs(&from, &to);
    for &(output, input) in &pairs {
        match (
            outputs.contains(&output.handle),
            inputs.contains(&input.handle),
        ) {
            (false, true) => {
                if let Some(location) = located(from.module, output.handle) {
                    place(to.module, input.handle, location);
                    inputs.remove(&input.handle);
                }
            }
            (true, false) => {
                if let Some(location) = located(to.module, input.handle) {
                    place(from.module, output.handle, location);
                    outputs.remove(&output.handle);
                }
            }
            _ => {}
        }
    }
    let both: Vec<_> = pairs
        .iter()
        .filter(|&&(output, input)| {
            outputs.contains(&output.handle) && inputs.contains(&input.handle)
        })
        .copied()
        .collect();
    let unmatched_outputs: BTreeSet<_> = outputs
        .iter()
        .copied()
        .filter(|&handle| !both.iter().any(|&(output, _)| output.handle == handle))
        .collect();
    let unmatched_inputs: BTreeSet<_> = inputs
        .iter()
        .copied()
        .filter(|&handle| !both.iter().any(|&(_, input)| input.handle == handle))
        .collect();
    let mut taken_out = taken_by(from.module, from.stage, AddressSpace::Output, &outputs);
    let mut taken_in = taken_by(to.module, to.stage, AddressSpace::Input, &inputs);
    for &(output, input) in &both {
        let count = span(from.module, from.stage, output.handle).max(span(
            to.module,
            to.stage,
            input.handle,
        ));
        let mut start = 0;
        loop {
            start = first_fit(&taken_out, start, count);
            match overlaps(&taken_in, start, count) {
                Some(until) => start = until,
                None => break,
            }
        }
        let end = start.saturating_add(count);
        taken_out.push((start, end));
        taken_in.push((start, end));
        place(from.module, output.handle, start);
        place(to.module, input.handle, start);
    }
    assign_space(
        from.module,
        from.globals,
        from.stage,
        AddressSpace::Output,
        &unmatched_outputs,
    );
    assign_space(
        to.module,
        to.globals,
        to.stage,
        AddressSpace::Input,
        &unmatched_inputs,
    );
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

pub(crate) fn assign_bindings(
    module: &mut Module,
    globals: &[MergedGlobal],
    shifts: Option<&rglsl::proc::BindingShifts>,
) {
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
            let base = shifts.map_or(0, |shifts| {
                shifts.base_of(module, &module.global_variables[handle], group)
            });
            let used = taken.entry(group).or_default();
            let free = rglsl::proc::free_binding(used, base);
            used.insert(free);
            free
        } else {
            0
        };
        module.global_variables.get_mut(handle).binding = Some(ResourceBinding { group, binding });
    }
}
