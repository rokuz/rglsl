use rglsl::{Block, Expression, Function, Handle, Module, ScalarKind, Statement, TypeInner};
use rglsl_types::stack::recurse;

use crate::{Changed, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    session.rewrite(|module| {
        let plans: Vec<Vec<bool>> = module
            .all_functions()
            .map(|function| promoted(module, function))
            .collect();
        let mut changed = false;
        for (function, plan) in module.all_functions_mut().zip(plans) {
            if plan.contains(&true) {
                changed |= hoist_past_kills(&mut function.body);
            }
            for ((_, local), promote) in function.local_variables.iter_mut().zip(plan) {
                changed |= local.ssa != promote;
                local.ssa = promote;
            }
        }
        Ok(changed)
    })
}

fn ends_in_kill(block: &Block) -> bool {
    matches!(block.last(), Some(&Statement::Kill))
}

fn hoist_past_kills(block: &mut Block) -> bool {
    let mut changed = false;
    let statements = core::mem::take(block);
    let mut out = Block::with_capacity(statements.len());
    for (mut statement, span) in statements.span_into_iter() {
        statement.for_each_child_block_mut(|child| {
            changed |= recurse(|| hoist_past_kills(child));
        });
        let hoisted = match statement {
            Statement::If {
                ref mut accept,
                ref mut reject,
                ..
            } => match (ends_in_kill(accept), ends_in_kill(reject)) {
                (false, true) if !accept.is_empty() => Some(core::mem::take(accept)),
                (true, false) if !reject.is_empty() => Some(core::mem::take(reject)),
                _ => None,
            },
            _ => None,
        };
        out.push(statement, span);
        if let Some(hoisted) = hoisted {
            out.extend_block(hoisted);
            changed = true;
        }
    }
    *block = out;
    changed
}

fn promoted(module: &Module, function: &Function) -> Vec<bool> {
    let mut in_loops = vec![false; function.local_variables.len()];
    stored_in_loops(function, &function.body, false, &mut in_loops);
    function
        .local_variables
        .iter()
        .zip(in_loops)
        .map(|((_, local), in_loop)| {
            let inner = &module.types[local.ty].inner;
            let value = matches!(*inner, TypeInner::Scalar(_) | TypeInner::Vector { .. });
            value && !(in_loop && inner.scalar_kind() == Some(ScalarKind::Bool))
        })
        .collect()
}

fn root(function: &Function, pointer: Handle<Expression>) -> Option<usize> {
    let mut current = pointer;
    loop {
        match *function.expressions.try_get(current).ok()? {
            Expression::LocalVariable(local) => return Some(local.index()),
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                current = base;
            }
            _ => return None,
        }
    }
}

fn stored_in_loops(function: &Function, block: &Block, in_loop: bool, marks: &mut [bool]) {
    for statement in block.iter() {
        match *statement {
            Statement::Store { pointer, .. } if in_loop => {
                if let Some(mark) = root(function, pointer).and_then(|at| marks.get_mut(at)) {
                    *mark = true;
                }
            }
            Statement::Loop {
                ref body,
                ref continuing,
                ..
            } => recurse(|| {
                stored_in_loops(function, body, true, marks);
                stored_in_loops(function, continuing, true, marks);
            }),
            ref other => other.for_each_child_block(|child| {
                recurse(|| stored_in_loops(function, child, in_loop, marks));
            }),
        }
    }
}
