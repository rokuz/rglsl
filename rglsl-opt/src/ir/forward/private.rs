use rglsl::{
    AddressSpace, Constant, EntryPoint, Expression, Function, GlobalVariable, Handle,
    LocalVariable, Module,
};

use crate::analysis::Class;
use crate::analysis::locals::{Locals, Root};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Owner {
    Nobody,
    Entry(usize),
    Many,
}

pub(super) fn localize(module: &mut Module, classes: &[Class]) -> Result<bool, String> {
    let count = module.global_variables.len();
    let mut owners: Vec<Owner> = module
        .global_variables
        .iter()
        .map(|(_, global)| {
            if movable(global) && classes.get(global.ty.index()) == Some(&Class::Plain) {
                Owner::Nobody
            } else {
                Owner::Many
            }
        })
        .collect();
    if owners.iter().all(|&owner| owner == Owner::Many) {
        return Ok(false);
    }
    for entry in &module.entry_points {
        for global in pinned(entry) {
            if let Some(slot) = owners.get_mut(global.index()) {
                *slot = Owner::Many;
            }
        }
    }
    let mut seen = vec![usize::MAX; count];
    let functions = module
        .functions
        .iter()
        .map(|(_, function)| (None, function))
        .chain(
            module
                .entry_points
                .iter()
                .enumerate()
                .map(|(index, entry)| (Some(index), &entry.function)),
        );
    for (ordinal, (entry, function)) in functions.enumerate() {
        for (_, expression) in function.expressions.iter() {
            let Expression::GlobalVariable(global) = *expression else {
                continue;
            };
            let (Some(slot), Some(last)) =
                (owners.get_mut(global.index()), seen.get_mut(global.index()))
            else {
                continue;
            };
            if *last == ordinal {
                continue;
            }
            *last = ordinal;
            *slot = match (*slot, entry) {
                (Owner::Nobody, Some(index)) => Owner::Entry(index),
                _ => Owner::Many,
            };
        }
    }
    let overridable = overridable(module);
    let mut changed = false;
    for index in 0..module.entry_points.len() {
        let candidates: Vec<Handle<GlobalVariable>> = module
            .global_variables
            .iter()
            .filter(|&(handle, _)| owners.get(handle.index()) == Some(&Owner::Entry(index)))
            .map(|(handle, _)| handle)
            .collect();
        if candidates.is_empty() {
            continue;
        }
        let Some(entry) = module.entry_points.get(index) else {
            continue;
        };
        let locals = Locals::of(&entry.function, count);
        let mut moved = vec![None; count];
        let mut any = false;
        for global in candidates {
            if locals
                .usage(Root::Global(global))
                .is_none_or(|usage| usage.escaped)
            {
                continue;
            }
            if let Some(local) = localized(module, index, global, &overridable)?
                && let Some(slot) = moved.get_mut(global.index())
            {
                *slot = Some(local);
                any = true;
            }
        }
        if !any {
            continue;
        }
        let function = &mut module
            .entry_points
            .get_mut(index)
            .ok_or("the entry point disappeared")?
            .function;
        retarget(function, &moved);
        changed = true;
    }
    Ok(changed)
}

fn movable(global: &GlobalVariable) -> bool {
    global.space == AddressSpace::Private
        && global.spirv_decorations.is_empty()
        && global.memory_decorations.is_empty()
        && global.io.is_none()
        && global.binding.is_none()
}

fn pinned(entry: &EntryPoint) -> impl Iterator<Item = Handle<GlobalVariable>> + '_ {
    entry
        .interface
        .iter()
        .copied()
        .chain(entry.task_payload)
        .chain(entry.incoming_ray_payload)
        .chain(entry.geometry.iter().flat_map(|geometry| {
            geometry
                .passthrough
                .iter()
                .copied()
                .chain(geometry.streams.iter().map(|&(variable, _)| variable))
        }))
        .chain(
            entry
                .mesh_shader
                .iter()
                .flat_map(|mesh| mesh.task_memory.iter().copied()),
        )
}

fn localized(
    module: &mut Module,
    index: usize,
    global: Handle<GlobalVariable>,
    overridable: &[bool],
) -> Result<Option<Handle<LocalVariable>>, String> {
    let variable = module
        .global_variables
        .try_get(global)
        .map_err(|error| error.to_string())?
        .clone();
    let span = module.global_variables.get_span(global);
    let init = match variable.init {
        None => None,
        Some(init) => {
            let expression = match *module
                .global_expressions
                .try_get(init)
                .map_err(|error| error.to_string())?
            {
                Expression::Literal(literal) => Expression::Literal(literal),
                Expression::Constant(constant) => Expression::Constant(constant),
                Expression::ZeroValue(ty) => Expression::ZeroValue(ty),
                _ if overridable.get(init.index()).is_none_or(|&depends| depends) => {
                    return Ok(None);
                }
                _ => Expression::Constant(module.constants.append(
                    Constant {
                        name: None,
                        ty: variable.ty,
                        init,
                    },
                    span,
                )),
            };
            Some(expression)
        }
    };
    let function = &mut module
        .entry_points
        .get_mut(index)
        .ok_or("the entry point disappeared")?
        .function;
    let init = init.map(|expression| function.expressions.append(expression, span));
    Ok(Some(function.local_variables.append(
        LocalVariable {
            name: variable.name,
            ty: variable.ty,
            init,
            relaxed_precision: variable.relaxed_precision,
        },
        span,
    )))
}

fn overridable(module: &Module) -> Vec<bool> {
    let mut overridable: Vec<bool> = Vec::with_capacity(module.global_expressions.len());
    for (_, expression) in module.global_expressions.iter() {
        let mut depends = matches!(*expression, Expression::Override(_));
        expression.for_each_operand(|operand| {
            depends |= overridable
                .get(operand.index())
                .is_none_or(|&depends| depends);
        });
        overridable.push(depends);
    }
    overridable
}

fn retarget(function: &mut Function, moved: &[Option<Handle<LocalVariable>>]) {
    for (_, expression) in function.expressions.iter_mut() {
        if let Expression::GlobalVariable(global) = *expression
            && let Some(&Some(local)) = moved.get(global.index())
        {
            *expression = Expression::LocalVariable(local);
        }
    }
}

pub(super) fn never_written(module: &Module, classes: &[Class]) -> Vec<bool> {
    let count = module.global_variables.len();
    let mut undefined: Vec<bool> = module
        .global_variables
        .iter()
        .map(|(_, global)| {
            movable(global)
                && global.init.is_none()
                && classes
                    .get(global.ty.index())
                    .is_some_and(|&class| class != Class::Opaque)
        })
        .collect();
    if !undefined.contains(&true) {
        return undefined;
    }
    let functions = module
        .functions
        .iter()
        .map(|(_, function)| function)
        .chain(module.entry_points.iter().map(|entry| &entry.function));
    for function in functions {
        let locals = Locals::of(function, count);
        for (slot, usage) in undefined.iter_mut().zip(&locals.globals) {
            if usage.escaped || !usage.stores.is_empty() {
                *slot = false;
            }
        }
    }
    undefined
}
