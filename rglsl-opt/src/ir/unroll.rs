use rglsl::{Block, Expression, FastHashMap, Function, Handle, Module, Span, Statement};
use rglsl_types::stack::recurse;

use crate::analysis::locals::{Locals, Root};
use crate::analysis::loops::{Exit, Loops};
use crate::ir::rebuild::{Policy, Rebuild};
use crate::ir::rewrite_functions;
use crate::{Changed, OptError, Session, Unrolling};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let limits = session.unrolling();
    session.rewrite(|module| {
        rewrite_functions(module, |module, function| rewrite(module, function, limits))
    })
}

fn plan(loops: &Loops, limits: Unrolling) -> Vec<Option<u64>> {
    let count = loops.loops.len();
    let mut inner = vec![0_u64; count];
    let mut chosen = vec![None; count];
    for (index, info) in loops.loops.iter().enumerate().rev() {
        let size = info
            .own
            .saturating_add(inner.get(index).copied().unwrap_or(0))
            .max(1);
        let mut contribution = size;
        if info.never_entered && !info.control.dont_unroll {
            if let Some(slot) = chosen.get_mut(index) {
                *slot = Some(0);
            }
            contribution = 0;
        } else if let Some(counter) = info.counter
            && info.simple
            && !info.control.dont_unroll
        {
            let budget = if info.control.unroll {
                limits.hinted
            } else if info.indexes {
                limits.indexed
            } else {
                limits.other
            };
            let total = size.saturating_mul(counter.trips);
            if counter.trips <= 1 || total <= u64::from(budget) {
                if let Some(slot) = chosen.get_mut(index) {
                    *slot = Some(counter.trips);
                }
                contribution = total;
            }
        }
        if let Some(slot) = info.parent.and_then(|parent| inner.get_mut(parent)) {
            *slot = slot.saturating_add(contribution);
        }
    }
    chosen
}

fn rewrite(
    module: &Module,
    function: &Function,
    limits: Unrolling,
) -> Result<Option<Function>, String> {
    if !function
        .body
        .walk()
        .any(|statement| matches!(*statement, Statement::Loop { .. }))
    {
        return Ok(None);
    }
    let locals = Locals::of(function, 0);
    let loops = Loops::of(module, function, &locals);
    let chosen = plan(&loops, limits);
    let mut policy = Unroll {
        locals: &locals,
        loops: &loops,
        chosen: FastHashMap::default(),
        exits: FastHashMap::default(),
        current: vec![None; function.local_variables.len()],
    };
    for (index, (info, trips)) in loops.loops.iter().zip(&chosen).enumerate() {
        let Some(trips) = *trips else {
            continue;
        };
        policy.chosen.insert(info.position, (index, trips));
        if let Some(Exit::Header(at)) = info.exit {
            policy.exits.insert(at, ());
        }
    }
    if policy.chosen.is_empty() {
        return Ok(None);
    }
    let mut rebuild = Rebuild::new(function);
    rebuild.body(&mut policy, Some(locals.statements()))?;
    Ok(Some(rebuild.finish()))
}

#[derive(Debug, Clone, Copy)]
struct Active {
    store: u32,
    now: Handle<Expression>,
    next: Handle<Expression>,
}

struct Unroll<'l> {
    locals: &'l Locals,
    loops: &'l Loops,
    chosen: FastHashMap<u32, (usize, u64)>,
    exits: FastHashMap<u32, ()>,
    current: Vec<Option<Active>>,
}

impl<'f> Policy<'f> for Unroll<'_> {
    fn expression(
        &mut self,
        rebuild: &mut Rebuild<'f>,
        handle: Handle<Expression>,
        _: &mut Block,
    ) -> Result<bool, String> {
        let Expression::Load { pointer } = *rebuild.expression(handle)? else {
            return Ok(false);
        };
        let Some(target) = self.locals.pointer(pointer) else {
            return Ok(false);
        };
        let Root::Local(local) = target.root else {
            return Ok(false);
        };
        if !target.whole {
            return Ok(false);
        }
        let Some(&Some(active)) = self.current.get(local.index()) else {
            return Ok(false);
        };
        let value = if self.loops.emitted_at(handle) < active.store {
            active.now
        } else {
            active.next
        };
        rebuild.set(handle, value)?;
        Ok(true)
    }

    fn statement(
        &mut self,
        rebuild: &mut Rebuild<'f>,
        statement: &Statement,
        span: Span,
        position: u32,
        block: &mut Block,
    ) -> Result<bool, String> {
        if self.exits.contains_key(&position) {
            rebuild.set_position(self.locals.end(position));
            return Ok(true);
        }
        let Some(&(index, trips)) = self.chosen.get(&position) else {
            return Ok(false);
        };
        let Statement::Loop {
            ref body,
            ref continuing,
            ..
        } = *statement
        else {
            return Err(format!("the statement at {position} is not a loop"));
        };
        let info = self
            .loops
            .loops
            .get(index)
            .ok_or("an unrolled loop is missing from the loop tree")?;
        if trips == 0 {
            rebuild.set_position(info.end);
            return Ok(true);
        }
        let counter = info.counter.ok_or("an unrolled loop has no counter")?;
        let end = info.end;
        let slot = counter.local.index();
        let saved = self.current.get(slot).copied().flatten();
        let value = |iteration: u64| {
            counter
                .value(iteration)
                .ok_or_else(|| format!("the counter value of iteration {iteration} overflows"))
        };
        let mut now = rebuild.constant(Expression::Literal(value(0)?), span);
        for iteration in 0..trips {
            let next = rebuild.constant(Expression::Literal(value(iteration + 1)?), span);
            if let Some(active) = self.current.get_mut(slot) {
                *active = Some(Active {
                    store: counter.store,
                    now,
                    next,
                });
            }
            rebuild.set_position(position + 1);
            rebuild.forget(body);
            rebuild.forget(continuing);
            let mut copy = recurse(|| rebuild.block(self, body))?;
            let mut tail = recurse(|| rebuild.block(self, continuing))?;
            rebuild.flush(block, span);
            block.append(&mut copy);
            block.append(&mut tail);
            now = next;
        }
        if let Some(active) = self.current.get_mut(slot) {
            *active = saved;
        }
        rebuild.set_position(end);
        Ok(true)
    }
}
