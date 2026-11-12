use rglsl::object::ObjectModule;
use rglsl::{Expression, Handle, Literal, Module, Override};

use crate::error::LinkError;

fn merged_ids(objects: &[ObjectModule]) -> [Option<u32>; 3] {
    let mut ids = [None; 3];
    for object in objects {
        for (slot, &id) in ids.iter_mut().zip(&object.layout.local_size_ids) {
            if slot.is_none() {
                *slot = id;
            }
        }
    }
    ids
}

fn default_size(module: &Module, placeholder: Handle<Override>) -> u32 {
    module
        .overrides
        .try_get(placeholder)
        .ok()
        .and_then(|value| value.init)
        .and_then(|init| module.global_expressions.try_get(init).ok())
        .and_then(|expression| match *expression {
            Expression::Literal(Literal::U32(size)) => Some(size),
            _ => None,
        })
        .unwrap_or(1)
}

fn replace_override(module: &mut Module, placeholder: Handle<Override>, size: u32) {
    let replace = |expression: &mut Expression| {
        if *expression == Expression::Override(placeholder) {
            *expression = Expression::Literal(Literal::U32(size));
        }
    };
    for (_, expression) in module.global_expressions.iter_mut() {
        replace(expression);
    }
    for (_, function) in module.functions.iter_mut() {
        for (_, expression) in function.expressions.iter_mut() {
            replace(expression);
        }
    }
    for entry in &mut module.entry_points {
        for (_, expression) in entry.function.expressions.iter_mut() {
            replace(expression);
        }
    }
}

fn clear_entry_slots(module: &mut Module) {
    let expressions = &module.global_expressions;
    for entry in &mut module.entry_points {
        let Some(ref mut slots) = entry.workgroup_size_overrides else {
            continue;
        };
        for slot in slots.iter_mut() {
            let literal = slot
                .and_then(|handle| expressions.try_get(handle).ok())
                .is_some_and(|expression| matches!(*expression, Expression::Literal(_)));
            if literal {
                *slot = None;
            }
        }
        if slots.iter().all(Option::is_none) {
            entry.workgroup_size_overrides = None;
        }
    }
}

fn specialized(object: &ObjectModule, ids: [Option<u32>; 3]) -> Option<ObjectModule> {
    let mut twin = ObjectModule::clone(object.specialized.as_deref()?);
    twin.name.clone_from(&object.name);
    for (placeholder, id) in twin.work_group_size_placeholders.into_iter().zip(ids) {
        let Some(placeholder) = placeholder else {
            continue;
        };
        match id {
            Some(id) => {
                if let Ok(value) = twin.module.overrides.try_get(placeholder) {
                    let mut value = value.clone();
                    value.id = Some(id);
                    *twin.module.overrides.get_mut(placeholder) = value;
                }
            }
            None => {
                let size = default_size(&twin.module, placeholder);
                replace_override(&mut twin.module, placeholder, size);
            }
        }
    }
    clear_entry_slots(&mut twin.module);
    twin.work_group_size_placeholders = [None; 3];
    Some(twin)
}

pub(crate) fn specialize(
    objects: Vec<ObjectModule>,
    errors: &mut Vec<LinkError>,
) -> Vec<ObjectModule> {
    let ids = merged_ids(&objects);
    objects
        .into_iter()
        .map(|object| {
            let needed = object.work_group_size_constant
                && ids
                    .iter()
                    .zip(&object.layout.local_size_ids)
                    .any(|(merged, own)| merged.is_some() && own.is_none());
            if !needed {
                return object;
            }
            specialized(&object, ids).unwrap_or_else(|| {
                errors.push(LinkError::WorkGroupSize(
                    object
                        .name
                        .as_ref()
                        .map_or_else(|| String::from("a unit"), |name| format!("`{name}`")),
                ));
                object
            })
        })
        .collect()
}
