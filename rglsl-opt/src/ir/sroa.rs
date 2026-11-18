use rglsl::{
    ArraySize, Block, Expression, Function, Handle, LocalVariable, Module, Span, Statement, Type,
    TypeInner, UniqueArena,
};

use crate::analysis::locals::{Locals, Root};
use crate::analysis::{Class, classify_types};
use crate::ir::rebuild::{Policy, Rebuild};
use crate::{Changed, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let pass = session.pass;
    let limit = session.profile.parameters.scalar_replacement;
    let module = session.module()?;
    sroa(module, limit).map_err(|message| OptError::Pass { pass, message })
}

fn sroa(module: &mut Module, limit: u32) -> Result<Changed, String> {
    let types = &module.types;
    let classes = classify_types(types);
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
        if let Some(split) = split(types, &classes, function, limit)? {
            *function = split;
            changed = true;
        }
    }
    Ok(if changed { Changed::Yes } else { Changed::No })
}

struct Piece {
    ty: Handle<Type>,
    name: Option<String>,
    relaxed_precision: bool,
}

fn pieces(types: &UniqueArena<Type>, variable: &LocalVariable, limit: u32) -> Option<Vec<Piece>> {
    let name = |suffix: &dyn core::fmt::Display| {
        variable
            .name
            .as_ref()
            .map(|name| format!("{name}_{suffix}"))
    };
    let pieces: Vec<Piece> = match types.get_handle(variable.ty).ok()?.inner {
        TypeInner::Struct { ref members, .. } => {
            if u32::try_from(members.len()).ok()? > limit {
                return None;
            }
            members
                .iter()
                .enumerate()
                .map(|(index, member)| Piece {
                    ty: member.ty,
                    name: name(
                        &member
                            .name
                            .as_deref()
                            .map_or_else(|| index.to_string(), ToOwned::to_owned),
                    ),
                    relaxed_precision: variable.relaxed_precision || member.relaxed_precision,
                })
                .collect()
        }
        TypeInner::Array {
            base,
            size: ArraySize::Constant(size),
            ..
        } if size.get() <= limit => (0..size.get())
            .map(|index| Piece {
                ty: base,
                name: name(&index),
                relaxed_precision: variable.relaxed_precision,
            })
            .collect(),
        _ => return None,
    };
    (!pieces.is_empty()).then_some(pieces)
}

fn split(
    types: &UniqueArena<Type>,
    classes: &[Class],
    function: &Function,
    limit: u32,
) -> Result<Option<Function>, String> {
    let locals = Locals::of(function, 0);
    let mut plans: Vec<Option<Vec<Piece>>> = Vec::with_capacity(function.local_variables.len());
    for ((_, variable), usage) in function.local_variables.iter().zip(&locals.locals) {
        let candidate = !usage.escaped
            && !usage.dynamic
            && classes.get(variable.ty.index()) == Some(&Class::Plain)
            && usage.partial()
            && variable.init.is_none_or(|init| {
                function.expressions.try_get(init).is_ok_and(|init| {
                    matches!(*init, Expression::ZeroValue(_) | Expression::Compose { .. })
                })
            });
        plans.push(candidate.then(|| pieces(types, variable, limit)).flatten());
    }
    if plans.iter().all(Option::is_none) {
        return Ok(None);
    }
    let mut rebuild = Rebuild::new(function);
    let mut split = Split {
        types,
        locals: &locals,
        pieces: Vec::with_capacity(plans.len()),
        pointers: Vec::new(),
    };
    for plan in &plans {
        split.pieces.push(plan.as_ref().map(|pieces| {
            pieces
                .iter()
                .map(|piece| {
                    (
                        rebuild.out.local_variables.append(
                            LocalVariable {
                                name: piece.name.clone(),
                                ty: piece.ty,
                                init: None,
                                relaxed_precision: piece.relaxed_precision,
                            },
                            Span::UNDEFINED,
                        ),
                        piece.ty,
                    )
                })
                .collect()
        }));
    }
    split.pointers = vec![None; rebuild.out.local_variables.len()];
    rebuild.body(&mut split, locals.statements())?;
    for ((_, variable), pieces) in function.local_variables.iter().zip(&split.pieces) {
        let (Some(init), Some(pieces)) = (variable.init, pieces) else {
            continue;
        };
        for (index, &(piece, ty)) in pieces.iter().enumerate() {
            let value = match *rebuild.expression(init)? {
                Expression::Compose { ref components, .. } => {
                    let component = components
                        .get(index)
                        .copied()
                        .ok_or("a composite initializer has too few components")?;
                    rebuild.value(component)?
                }
                _ => rebuild.constant(Expression::ZeroValue(ty), Span::UNDEFINED),
            };
            rebuild
                .out
                .local_variables
                .try_get_mut(piece)
                .map_err(|error| error.to_string())?
                .init = Some(value);
        }
    }
    Ok(Some(rebuild.finish()))
}

type Pieces = Vec<(Handle<LocalVariable>, Handle<Type>)>;

struct Split<'l> {
    types: &'l UniqueArena<Type>,
    locals: &'l Locals,
    pieces: Vec<Option<Pieces>>,
    pointers: Vec<Option<Handle<Expression>>>,
}

impl Split<'_> {
    fn whole(&self, pointer: Handle<Expression>) -> Option<(Handle<LocalVariable>, &Pieces)> {
        let target = self.locals.pointer(pointer)?;
        let Root::Local(local) = target.root else {
            return None;
        };
        if !target.whole {
            return None;
        }
        Some((local, self.pieces.get(local.index())?.as_ref()?))
    }

    fn pointer(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        piece: Handle<LocalVariable>,
    ) -> Handle<Expression> {
        if let Some(&Some(pointer)) = self.pointers.get(piece.index()) {
            return pointer;
        }
        let pointer = rebuild.constant(Expression::LocalVariable(piece), Span::UNDEFINED);
        if let Some(slot) = self.pointers.get_mut(piece.index()) {
            *slot = Some(pointer);
        }
        pointer
    }
}

impl Policy for Split<'_> {
    fn expression(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        block: &mut Block,
    ) -> Result<bool, String> {
        match *rebuild.expression(handle)? {
            Expression::AccessIndex { base, index } => {
                let Some(&(piece, _)) = self
                    .whole(base)
                    .and_then(|(_, pieces)| pieces.get(index as usize))
                else {
                    return Ok(false);
                };
                let pointer = self.pointer(rebuild, piece);
                rebuild.set(handle, pointer)?;
                Ok(true)
            }
            Expression::Load { pointer } => {
                let Some((local, pieces)) = self.whole(pointer) else {
                    return Ok(false);
                };
                let pieces = pieces.clone();
                let ty = rebuild
                    .source
                    .local_variables
                    .try_get(local)
                    .map_err(|error| error.to_string())?
                    .ty;
                let span = rebuild.span(handle);
                let mut components = Vec::with_capacity(pieces.len());
                for &(piece, _) in &pieces {
                    let pointer = self.pointer(rebuild, piece);
                    components.push(rebuild.emit(Expression::Load { pointer }, span, block));
                }
                let compose = rebuild.emit(Expression::Compose { ty, components }, span, block);
                rebuild.carry(handle, compose);
                rebuild.set(handle, compose)?;
                Ok(true)
            }
            _ => Ok(false),
        }
    }

    fn statement(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        statement: &Statement,
        span: Span,
        _: u32,
        block: &mut Block,
    ) -> Result<bool, String> {
        let Statement::Store { pointer, value } = *statement else {
            return Ok(false);
        };
        let Some(pieces) = self.whole(pointer).map(|(_, pieces)| pieces.clone()) else {
            return Ok(false);
        };
        let source = rebuild.expression(value)?;
        let mut stores = Vec::with_capacity(pieces.len());
        for (index, &(piece, ty)) in pieces.iter().enumerate() {
            let part = match *source {
                Expression::Compose { ref components, .. } if components.len() == pieces.len() => {
                    let component = components
                        .get(index)
                        .copied()
                        .ok_or("a composite has too few components")?;
                    rebuild.value(component)?
                }
                Expression::ZeroValue(_) => {
                    rebuild.constant(Expression::ZeroValue(ty), rebuild.span(value))
                }
                Expression::Undef(_) => {
                    rebuild.constant(Expression::Undef(ty), rebuild.span(value))
                }
                _ => {
                    let base = rebuild.value(value)?;
                    let index = u32::try_from(index).map_err(|error| error.to_string())?;
                    rebuild.extract(self.types, base, index, span, block)
                }
            };
            let pointer = self.pointer(rebuild, piece);
            stores.push(Statement::Store {
                pointer,
                value: part,
            });
        }
        for store in stores {
            rebuild.push(block, store, span);
        }
        Ok(true)
    }
}
