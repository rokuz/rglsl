use rglsl::{
    Block, Constant, Expression, FastHashMap, Function, Handle, LocalVariable, Statement, Type,
};
use rglsl_types::stack::recurse;

use crate::analysis::locals::{Locals, Root};
use crate::{Changed, DebugLevel, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let debug = session.context.debug == DebugLevel::Variables;
    let module = session.module()?;
    let mut changed = false;
    let functions = module
        .functions
        .iter_mut()
        .map(|(_, function)| function)
        .chain(
            module
                .entry_points
                .iter_mut()
                .map(|entry| &mut entry.function),
        );
    for function in functions {
        changed |= constant_arrays(function, debug);
    }
    Ok(if changed { Changed::Yes } else { Changed::No })
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum Key {
    Constant(Handle<Constant>),
    Zero(Handle<Type>),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Stored {
    Nothing,
    Always(Key, Handle<Expression>),
    Varies,
}

fn key(function: &Function, handle: Handle<Expression>) -> Option<Key> {
    match *function.expressions.try_get(handle).ok()? {
        Expression::Constant(constant) => Some(Key::Constant(constant)),
        Expression::ZeroValue(ty) => Some(Key::Zero(ty)),
        _ => None,
    }
}

fn whole_local(locals: &Locals, pointer: Handle<Expression>) -> Option<Handle<LocalVariable>> {
    let target = locals.pointer(pointer)?;
    match target.root {
        Root::Local(local) if target.whole => Some(local),
        _ => None,
    }
}

fn constant_arrays(function: &mut Function, debug: bool) -> bool {
    let locals = Locals::of(function, 0);
    let mut stored = vec![Stored::Nothing; function.local_variables.len()];
    for statement in function.body.walk() {
        let Statement::Store { pointer, value } = *statement else {
            continue;
        };
        let Some(local) = whole_local(&locals, pointer) else {
            continue;
        };
        let Some(slot) = stored.get_mut(local.index()) else {
            continue;
        };
        *slot = match (*slot, key(function, value)) {
            (Stored::Nothing, Some(key)) => Stored::Always(key, value),
            (Stored::Always(known, first), Some(key)) if known == key => {
                Stored::Always(known, first)
            }
            _ => Stored::Varies,
        };
    }
    let mut constant: Vec<Option<Key>> = vec![None; function.local_variables.len()];
    let mut inits: Vec<(Handle<LocalVariable>, Handle<Expression>)> = Vec::new();
    for ((handle, variable), (usage, &stored)) in function
        .local_variables
        .iter()
        .zip(locals.locals.iter().zip(&stored))
    {
        if usage.escaped || usage.partial_stores > 0 {
            continue;
        }
        let initial = variable.init.and_then(|init| key(function, init));
        let key_of = match stored {
            Stored::Always(key_of, value) => {
                match (variable.init, initial) {
                    (None, _) => inits.push((handle, value)),
                    (Some(_), Some(initial)) if initial == key_of => {}
                    (Some(_), _) => continue,
                }
                key_of
            }
            Stored::Nothing => match initial {
                Some(initial) => initial,
                None => continue,
            },
            Stored::Varies => continue,
        };
        if let Some(slot) = constant.get_mut(handle.index()) {
            *slot = Some(key_of);
        }
    }
    if constant.iter().all(Option::is_none) {
        return false;
    }
    for (local, value) in inits {
        if let Ok(variable) = function.local_variables.try_get_mut(local) {
            variable.init = Some(value);
        }
    }
    let mut first: FastHashMap<(Key, Handle<Type>), Handle<LocalVariable>> = FastHashMap::default();
    let mut merged: Vec<Option<Handle<LocalVariable>>> = vec![None; function.local_variables.len()];
    for (handle, variable) in function.local_variables.iter() {
        let Some(&Some(key_of)) = constant.get(handle.index()) else {
            continue;
        };
        let target = *first.entry((key_of, variable.ty)).or_insert(handle);
        if target != handle
            && let Some(slot) = merged.get_mut(handle.index())
        {
            *slot = Some(target);
        }
    }
    let removed = remove_stores(&mut function.body, &locals, &constant);
    if debug {
        describe_merged(function, &merged);
    }
    let mut retargeted = false;
    for (_, expression) in function.expressions.iter_mut() {
        if let Expression::LocalVariable(local) = *expression
            && let Some(&Some(target)) = merged.get(local.index())
        {
            *expression = Expression::LocalVariable(target);
            retargeted = true;
        }
    }
    removed || retargeted
}

fn describe_merged(function: &mut Function, merged: &[Option<Handle<LocalVariable>>]) {
    let mut values = Block::new();
    for (handle, variable) in function.local_variables.iter() {
        if variable.name.is_none() || merged.get(handle.index()).copied().flatten().is_none() {
            continue;
        }
        let Some(value) = variable.init else {
            continue;
        };
        values.push(
            Statement::DebugValue {
                variable: handle,
                value,
                indices: Vec::new(),
            },
            function.local_variables.get_span(handle),
        );
    }
    if values.is_empty() {
        return;
    }
    let body = core::mem::take(&mut function.body);
    for (statement, span) in body.span_into_iter() {
        values.push(statement, span);
    }
    function.body = values;
}

fn remove_stores(block: &mut Block, locals: &Locals, constant: &[Option<Key>]) -> bool {
    let old = core::mem::take(block);
    let mut out = Block::with_capacity(old.len());
    let mut removed = false;
    for (mut statement, span) in old.span_into_iter() {
        if let Statement::Store { pointer, .. } = statement
            && whole_local(locals, pointer)
                .is_some_and(|local| constant.get(local.index()).is_some_and(Option::is_some))
        {
            removed = true;
            continue;
        }
        statement.for_each_child_block_mut(|child| {
            removed |= recurse(|| remove_stores(child, locals, constant));
        });
        out.push(statement, span);
    }
    *block = out;
    removed
}
