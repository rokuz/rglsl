use rglsl::{
    AddressSpace, Binding, Block, BuiltIn, Expression, Function, GlobalVariable, Handle, Module,
    ShaderStage, Statement, Type, TypeInner,
};
use rglsl_types::stack::recurse;

use super::slots;
use crate::StageModule;

const fn removable_builtin(builtin: BuiltIn) -> bool {
    matches!(
        builtin,
        BuiltIn::Position { .. }
            | BuiltIn::PointSize
            | BuiltIn::ClipDistances
            | BuiltIn::CullDistance
    )
}

fn contains(list: &[BuiltIn], builtin: BuiltIn) -> bool {
    list.iter()
        .any(|&other| other.canonical() == builtin.canonical())
}

#[derive(Debug, Clone)]
struct BlockVariable {
    global: Handle<GlobalVariable>,
    arrayed: bool,
    members: Vec<BuiltIn>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Level {
    Variable,
    Element,
    Member(u32),
}

#[derive(Debug, Clone)]
struct Members {
    referenced: Vec<bool>,
    loaded: Vec<bool>,
    whole: bool,
}

fn block_variable(
    module: &Module,
    stage: ShaderStage,
    handle: Handle<GlobalVariable>,
) -> Option<BlockVariable> {
    let global = module.global_variables.try_get(handle).ok()?;
    if global.io.is_some()
        || !matches!(global.space, AddressSpace::Input | AddressSpace::Output)
        || !global.spirv_decorations.is_empty()
    {
        return None;
    }
    let arrayed = slots::arrayed(stage, global.space == AddressSpace::Input, false);
    let element = slots::element(&module.types, global.ty, arrayed);
    if arrayed && element == global.ty {
        return None;
    }
    let TypeInner::Struct { ref members, .. } = module.types.get_handle(element).ok()?.inner else {
        return None;
    };
    let members = members
        .iter()
        .map(|member| match member.binding {
            Some(Binding::BuiltIn(builtin)) => Some(builtin),
            _ => None,
        })
        .collect::<Option<Vec<BuiltIn>>>()?;
    (!members.is_empty()).then_some(BlockVariable {
        global: handle,
        arrayed,
        members,
    })
}

fn blocks(module: &Module, stage: ShaderStage, space: AddressSpace) -> Vec<BlockVariable> {
    module
        .entry_points
        .iter()
        .flat_map(|entry| entry.interface.iter().copied())
        .filter_map(|handle| block_variable(module, stage, handle))
        .filter(|block| {
            module
                .global_variables
                .try_get(block.global)
                .is_ok_and(|global| global.space == space)
        })
        .collect()
}

fn levels(function: &Function, block: &BlockVariable) -> Vec<Option<Level>> {
    let mut levels: Vec<Option<Level>> = Vec::with_capacity(function.expressions.len());
    for (_, expression) in function.expressions.iter() {
        let at = |base: Handle<Expression>| levels.get(base.index()).copied().flatten();
        let level = match *expression {
            Expression::GlobalVariable(global) if global == block.global => Some(Level::Variable),
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. }
                if block.arrayed && at(base) == Some(Level::Variable) =>
            {
                Some(Level::Element)
            }
            Expression::AccessIndex { base, index }
                if at(base)
                    == Some(if block.arrayed {
                        Level::Element
                    } else {
                        Level::Variable
                    }) =>
            {
                Some(Level::Member(index))
            }
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                match at(base) {
                    Some(Level::Member(index)) => Some(Level::Member(index)),
                    _ => None,
                }
            }
            _ => None,
        };
        levels.push(level);
    }
    levels
}

fn functions(module: &Module) -> impl Iterator<Item = &Function> {
    module
        .functions
        .iter()
        .map(|(_, function)| function)
        .chain(module.entry_points.iter().map(|entry| &entry.function))
}

fn members(module: &Module, block: &BlockVariable) -> Members {
    let count = block.members.len();
    let mut members = Members {
        referenced: vec![false; count],
        loaded: vec![false; count],
        whole: false,
    };
    let mark = |slots: &mut Vec<bool>, index: u32| {
        if let Some(slot) = slots.get_mut(index as usize) {
            *slot = true;
        }
    };
    for function in functions(module) {
        let levels = levels(function, block);
        let at = |handle: Handle<Expression>| levels.get(handle.index()).copied().flatten();
        for (handle, expression) in function.expressions.iter() {
            if let Some(Level::Member(index)) = at(handle) {
                mark(&mut members.referenced, index);
            }
            let chained = match *expression {
                Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                    Some(base)
                }
                _ => None,
            };
            expression.for_each_operand(|operand| match at(operand) {
                Some(Level::Variable | Level::Element) if chained != Some(operand) => {
                    members.whole = true;
                }
                Some(Level::Member(index)) if chained != Some(operand) => {
                    mark(&mut members.loaded, index);
                }
                _ => {}
            });
        }
        for statement in function.body.walk() {
            let stored = match *statement {
                Statement::Store { pointer, .. } => Some(pointer),
                _ => None,
            };
            statement.for_each_operand(|operand| match at(operand) {
                Some(Level::Variable | Level::Element) => members.whole = true,
                Some(Level::Member(index)) if stored != Some(operand) => {
                    mark(&mut members.loaded, index);
                }
                _ => {}
            });
        }
    }
    members
}

pub(super) fn read(consumer: &StageModule<'_>) -> Vec<BuiltIn> {
    let module = &*consumer.module;
    let mut read = Vec::new();
    for block in blocks(module, consumer.stage, AddressSpace::Input) {
        let members = members(module, &block);
        for (index, &builtin) in block.members.iter().enumerate() {
            if members.whole || members.referenced.get(index) == Some(&true) {
                read.push(builtin);
            }
        }
    }
    for entry in &module.entry_points {
        for &handle in &entry.interface {
            if let Ok(global) = module.global_variables.try_get(handle)
                && global.space == AddressSpace::Input
                && let Some(Binding::BuiltIn(builtin)) = global.io
            {
                read.push(builtin);
            }
        }
    }
    read
}

pub(super) fn removable(producer: &StageModule<'_>, read: &[BuiltIn], last: bool) -> Vec<BuiltIn> {
    let module = &*producer.module;
    let mut removable = Vec::new();
    for block in blocks(module, producer.stage, AddressSpace::Output) {
        let members = members(module, &block);
        if members.whole {
            continue;
        }
        for (index, &builtin) in block.members.iter().enumerate() {
            let referenced = members.referenced.get(index) == Some(&true);
            let loaded = members.loaded.get(index) == Some(&true);
            let allowed = if last {
                !matches!(builtin, BuiltIn::Position { .. }) && !referenced
            } else {
                !loaded
            };
            if allowed && removable_builtin(builtin) && !contains(read, builtin) {
                removable.push(builtin);
            }
        }
    }
    removable
}

pub(super) fn remove_stores(producer: &mut StageModule<'_>, removed: &[BuiltIn]) -> bool {
    let stage = producer.stage;
    let module = &mut *producer.module;
    let mut changed = false;
    for block in blocks(module, stage, AddressSpace::Output) {
        let dropped: Vec<u32> = block
            .members
            .iter()
            .enumerate()
            .filter(|&(_, &builtin)| contains(removed, builtin))
            .filter_map(|(index, _)| u32::try_from(index).ok())
            .collect();
        if dropped.is_empty() {
            continue;
        }
        let bodies = module
            .functions
            .iter_mut()
            .map(|(_, function)| function)
            .chain(
                module
                    .entry_points
                    .iter_mut()
                    .map(|entry| &mut entry.function),
            );
        for function in bodies {
            let levels = levels(function, &block);
            changed |= remove(&mut function.body, &levels, &dropped);
        }
    }
    changed
}

fn remove(block: &mut Block, levels: &[Option<Level>], dropped: &[u32]) -> bool {
    let old = core::mem::take(block);
    let mut out = Block::with_capacity(old.len());
    let mut removed = false;
    for (mut statement, span) in old.span_into_iter() {
        if let Statement::Store { pointer, .. } = statement
            && let Some(&Some(Level::Member(index))) = levels.get(pointer.index())
            && dropped.contains(&index)
        {
            removed = true;
            continue;
        }
        statement.for_each_child_block_mut(|child| {
            removed |= recurse(|| remove(child, levels, dropped));
        });
        out.push(statement, span);
    }
    *block = out;
    removed
}

pub(super) fn retype(
    stage: &mut StageModule<'_>,
    space: AddressSpace,
    dropped: &[BuiltIn],
) -> Result<Vec<BuiltIn>, String> {
    let module = &mut *stage.module;
    let mut removed = Vec::new();
    for block in blocks(module, stage.stage, space) {
        let members = members(module, &block);
        if members.whole {
            continue;
        }
        let keep: Vec<bool> = block
            .members
            .iter()
            .enumerate()
            .map(|(index, builtin)| {
                !contains(dropped, *builtin) || members.referenced.get(index) == Some(&true)
            })
            .collect();
        if keep.iter().all(|&kept| kept) || !keep.iter().any(|&kept| kept) {
            continue;
        }
        removed.extend(
            block
                .members
                .iter()
                .zip(&keep)
                .filter(|&(_, &kept)| !kept)
                .map(|(&builtin, _)| builtin),
        );
        let mut map = Vec::with_capacity(keep.len());
        let mut next = 0_u32;
        for &kept in &keep {
            map.push(kept.then_some(next));
            if kept {
                next += 1;
            }
        }
        let global_ty = module
            .global_variables
            .try_get(block.global)
            .map_err(|error| error.to_string())?
            .ty;
        let element = slots::element(&module.types, global_ty, block.arrayed);
        let old = module
            .types
            .get_handle(element)
            .map_err(|error| error.to_string())?
            .clone();
        let span = module.types.get_span(element);
        let TypeInner::Struct {
            members: ref old_members,
            span: size,
        } = old.inner
        else {
            return Err(String::from("a built-in block is not a struct"));
        };
        let kept_members = old_members
            .iter()
            .zip(&keep)
            .filter(|&(_, &kept)| kept)
            .map(|(member, _)| member.clone())
            .collect();
        let structure = module.types.insert(
            Type {
                name: old.name.clone(),
                inner: TypeInner::Struct {
                    members: kept_members,
                    span: size,
                },
            },
            span,
        );
        let ty = if block.arrayed {
            let outer = module
                .types
                .get_handle(global_ty)
                .map_err(|error| error.to_string())?
                .clone();
            let TypeInner::Array { size, stride, .. } = outer.inner else {
                return Err(String::from("an arrayed built-in block is not an array"));
            };
            module.types.insert(
                Type {
                    name: outer.name,
                    inner: TypeInner::Array {
                        base: structure,
                        size,
                        stride,
                    },
                },
                module.types.get_span(global_ty),
            )
        } else {
            structure
        };
        module
            .global_variables
            .try_get_mut(block.global)
            .map_err(|error| error.to_string())?
            .ty = ty;
        let bodies = module
            .functions
            .iter_mut()
            .map(|(_, function)| function)
            .chain(
                module
                    .entry_points
                    .iter_mut()
                    .map(|entry| &mut entry.function),
            );
        for function in bodies {
            let levels = levels(function, &block);
            let outer = if block.arrayed {
                Level::Element
            } else {
                Level::Variable
            };
            for (handle, expression) in function.expressions.iter_mut() {
                let Expression::AccessIndex {
                    base,
                    ref mut index,
                } = *expression
                else {
                    continue;
                };
                if levels.get(base.index()).copied().flatten() != Some(outer)
                    || levels.get(handle.index()).copied().flatten() != Some(Level::Member(*index))
                {
                    continue;
                }
                *index =
                    map.get(*index as usize).copied().flatten().ok_or_else(|| {
                        String::from("a removed built-in member is still accessed")
                    })?;
            }
        }
    }
    Ok(removed)
}
