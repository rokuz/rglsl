use std::collections::BTreeSet;

use rglsl::{AddressSpace, Binding, Expression, Function, GlobalVariable, Handle, TypeInner};

use crate::error::{LinkError, SourcePosition};
use crate::interface::ranges;
use crate::{Merged, calls};

fn reachable(merged: &Merged) -> Vec<&Function> {
    let Some(entry) = merged.module.entry_points.first() else {
        return Vec::new();
    };
    let mut functions = vec![&entry.function];
    let mut pending = Vec::new();
    calls::callees(&entry.function.body, &mut pending);
    let mut seen: BTreeSet<Handle<Function>> = BTreeSet::new();
    while let Some(handle) = pending.pop() {
        if !seen.insert(handle) {
            continue;
        }
        let function = &merged.module.functions[handle];
        functions.push(function);
        let mut found = Vec::new();
        calls::callees(&function.body, &mut found);
        pending.extend(found.into_iter().filter(|callee| !seen.contains(callee)));
    }
    functions
}

fn builtin(merged: &Merged, global: &GlobalVariable) -> bool {
    if matches!(global.io, Some(Binding::BuiltIn(_))) {
        return true;
    }
    let mut ty = global.ty;
    while let TypeInner::Array { base, .. } = merged.module.types[ty].inner {
        ty = base;
    }
    matches!(
        merged.module.types[ty].inner,
        TypeInner::Struct { ref members, .. }
            if members.iter().any(|member| matches!(member.binding, Some(Binding::BuiltIn(_))))
    )
}

fn member_names(merged: &Merged, global: &GlobalVariable) -> Vec<String> {
    let mut ty = global.ty;
    while let TypeInner::Array { base, .. } = merged.module.types[ty].inner {
        ty = base;
    }
    match merged.module.types[ty].inner {
        TypeInner::Struct { ref members, .. } if global.io.is_none() => members
            .iter()
            .filter_map(|member| member.name.clone())
            .collect(),
        _ => Vec::new(),
    }
}

struct Io {
    name: String,
    handle: Handle<GlobalVariable>,
    locations: Vec<(u32, u32)>,
    members: Vec<String>,
}

fn interface(merged: &Merged, space: AddressSpace) -> Vec<Io> {
    merged
        .globals
        .iter()
        .filter_map(|symbol| {
            let global = &merged.module.global_variables[symbol.handle];
            if global.space != space || builtin(merged, global) || symbol.name.starts_with("gl_") {
                return None;
            }
            Some(Io {
                name: symbol.name.clone(),
                handle: symbol.handle,
                locations: ranges(&merged.module, merged.stage, global),
                members: member_names(merged, global),
            })
        })
        .collect()
}

fn matched(input: &Io, outputs: &[Io]) -> bool {
    let overlaps = |&(start, end): &(u32, u32)| {
        outputs.iter().any(|output| {
            output
                .locations
                .iter()
                .any(|&(from, to)| start < to && from < end)
        })
    };
    input.locations.iter().any(overlaps)
        || outputs.iter().any(|output| {
            output.name == input.name
                || output.members.contains(&input.name)
                || input.members.contains(&output.name)
        })
}

pub(crate) fn check(from: &Merged, to: &Merged, errors: &mut Vec<LinkError>) {
    if to
        .module
        .entry_points
        .first()
        .and_then(|entry| entry.geometry.as_ref())
        .is_some_and(|geometry| !geometry.passthrough.is_empty())
        || from
            .module
            .entry_points
            .first()
            .and_then(|entry| entry.geometry.as_ref())
            .is_some_and(|geometry| !geometry.passthrough.is_empty())
    {
        return;
    }
    let outputs = interface(from, AddressSpace::Output);
    let unmatched: Vec<Io> = interface(to, AddressSpace::Input)
        .into_iter()
        .filter(|input| !matched(input, &outputs))
        .collect();
    if unmatched.is_empty() {
        return;
    }
    let stages = format!("{} and {}", to.stage.name(), from.stage.name());
    for function in reachable(to) {
        for (handle, expression) in function.expressions.iter() {
            let Expression::GlobalVariable(global) = *expression else {
                continue;
            };
            let Some(input) = unmatched.iter().find(|input| input.handle == global) else {
                continue;
            };
            errors.push(LinkError::UnmatchedInput {
                stages: stages.clone(),
                name: input.name.clone(),
                at: SourcePosition::of(
                    &to.module,
                    function.expressions.get_span(handle),
                    to.source_name.as_deref(),
                ),
            });
        }
    }
}
