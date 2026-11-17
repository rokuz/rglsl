mod copy;
mod returns;

use rglsl::{Expression, Function, FunctionControl, Handle, Module, Statement};

use crate::{Changed, Context, Inlining, OptError, Session};
use copy::Builder;
use returns::{Lowered, lower};

const GROWTH: u64 = 8;
const FLOOR: u64 = 1 << 18;

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let pass = session.pass;
    let inlining = session.profile.parameters.inlining;
    let context = session.context;
    let module = session.module()?;
    inline(module, inlining, context).map_err(|message| OptError::Pass { pass, message })
}

pub(crate) struct Plan {
    inlining: Inlining,
    lowered: Vec<Option<Lowered>>,
    sites: Vec<usize>,
    pinned: Vec<bool>,
    kills: Vec<bool>,
    full: Vec<u64>,
    limit: u64,
}

impl Plan {
    fn lowered(&self, function: Handle<Function>) -> Option<&Lowered> {
        self.lowered.get(function.index())?.as_ref()
    }

    fn decide(&self, function: Handle<Function>, continuing: bool, size: u64) -> bool {
        let index = function.index();
        if self.lowered(function).is_none()
            || (continuing && self.kills.get(index).copied().unwrap_or(true))
        {
            return false;
        }
        match self.inlining {
            Inlining::Exhaustive => self
                .full
                .get(index)
                .is_some_and(|&full| size.saturating_add(full) <= self.limit),
            Inlining::NoGrowth => {
                self.sites.get(index) == Some(&1) && self.pinned.get(index) == Some(&false)
            }
        }
    }
}

fn own_size(function: &Function) -> u64 {
    let statements = function.body.walk().count();
    u64::try_from(function.expressions.len().saturating_add(statements)).unwrap_or(u64::MAX)
}

fn inlinable(function: &Function) -> bool {
    function.linkage.is_definition()
        && function.control != FunctionControl::DontInline
        && function
            .arguments
            .iter()
            .all(|argument| argument.memory_decorations.is_empty())
}

fn ends_invocation(statement: &Statement) -> bool {
    matches!(
        *statement,
        Statement::Kill | Statement::TerminateInvocation | Statement::Abort { .. }
    )
}

fn inline(module: &mut Module, inlining: Inlining, context: Context) -> Result<Changed, String> {
    let count = module.functions.len();
    let all_roots = context.unlinked || context.export_functions;
    let mut sites = vec![0usize; count];
    let mut pinned = vec![all_roots; count];
    let mut kills = vec![false; count];
    let mut full = vec![0u64; count];
    let mut callees: Vec<Vec<Handle<Function>>> = vec![Vec::new(); count];
    let mut total = 0u64;
    let bodies = module
        .functions
        .iter()
        .map(|(handle, function)| (Some(handle), function))
        .chain(
            module
                .entry_points
                .iter()
                .map(|entry| (None, &entry.function)),
        );
    for (handle, function) in bodies {
        total = total.saturating_add(own_size(function));
        let mut ends = false;
        for statement in function.body.walk() {
            ends |= ends_invocation(statement);
            if let Statement::Call {
                function: callee, ..
            } = *statement
            {
                if let Some(slot) = sites.get_mut(callee.index()) {
                    *slot += 1;
                }
                if let Some(handle) = handle
                    && let Some(list) = callees.get_mut(handle.index())
                {
                    list.push(callee);
                }
            }
        }
        for (_, expression) in function.expressions.iter() {
            if matches!(*expression, Expression::CallResult(_)) {
                continue;
            }
            expression.visit(&mut References {
                pinned: &mut pinned,
            });
        }
        if let Some(handle) = handle
            && let Some(slot) = kills.get_mut(handle.index())
        {
            *slot = ends;
        }
    }
    let mut lowered: Vec<Option<Lowered>> = Vec::with_capacity(count);
    for (handle, function) in module.functions.iter() {
        let index = handle.index();
        let mut size = own_size(function);
        let mut ends = kills.get(index).copied().unwrap_or(false);
        for callee in callees.get(index).into_iter().flatten() {
            ends |= kills.get(callee.index()).copied().unwrap_or(false);
            if inlinable(&module.functions[*callee]) {
                size = size.saturating_add(full.get(callee.index()).copied().unwrap_or(u64::MAX));
            }
        }
        if let Some(slot) = kills.get_mut(index) {
            *slot = ends;
        }
        if let Some(slot) = full.get_mut(index) {
            *slot = size;
        }
        let candidate = inlinable(function) && sites.get(index).is_some_and(|&sites| sites > 0);
        lowered.push(
            candidate
                .then(|| lower(function, &mut module.types))
                .flatten(),
        );
    }
    if lowered.iter().all(Option::is_none) {
        return Ok(Changed::No);
    }
    let plan = Plan {
        inlining,
        lowered,
        sites,
        pinned,
        kills,
        full,
        limit: total.saturating_mul(GROWTH).max(FLOOR),
    };
    let mut entries = Vec::with_capacity(module.entry_points.len());
    let mut rooted = vec![false; count];
    let mut pending: Vec<Handle<Function>> = Vec::new();
    for (handle, _) in module.functions.iter() {
        if plan.pinned.get(handle.index()) == Some(&true) {
            pending.push(handle);
            if let Some(slot) = rooted.get_mut(handle.index()) {
                *slot = true;
            }
        }
    }
    for entry in &module.entry_points {
        entries.push(rebuild(&plan, &entry.function, &mut rooted, &mut pending)?);
    }
    let mut functions = Vec::new();
    while let Some(handle) = pending.pop() {
        let function = module
            .functions
            .try_get(handle)
            .map_err(|error| error.to_string())?;
        if !function.linkage.is_definition() {
            continue;
        }
        if let Some(function) = rebuild(&plan, function, &mut rooted, &mut pending)? {
            functions.push((handle, function));
        }
    }
    drop(plan);
    let changed = !functions.is_empty() || entries.iter().any(Option::is_some);
    for (handle, function) in functions {
        *module.functions.get_mut(handle) = function;
    }
    for (entry, function) in module.entry_points.iter_mut().zip(entries) {
        if let Some(function) = function {
            entry.function = function;
        }
    }
    Ok(if changed { Changed::Yes } else { Changed::No })
}

fn rebuild(
    plan: &Plan,
    function: &Function,
    rooted: &mut [bool],
    pending: &mut Vec<Handle<Function>>,
) -> Result<Option<Function>, String> {
    let mut called = Vec::new();
    for statement in function.body.walk() {
        if let Statement::Call { function, .. } = *statement {
            called.push(function);
        }
    }
    if called.iter().all(|&callee| plan.lowered(callee).is_none()) {
        enqueue(&called, rooted, pending);
        return Ok(None);
    }
    let builder = Builder::build(plan, function)?;
    enqueue(&builder.kept, rooted, pending);
    Ok(builder.inlined.then(|| builder.finish()))
}

fn enqueue(kept: &[Handle<Function>], rooted: &mut [bool], pending: &mut Vec<Handle<Function>>) {
    for &function in kept {
        if let Some(slot) = rooted.get_mut(function.index())
            && !*slot
        {
            *slot = true;
            pending.push(function);
        }
    }
}

struct References<'a> {
    pinned: &'a mut [bool],
}

impl<'a> rglsl::ir::visit::Visitor<'a> for References<'_> {
    type Error = core::convert::Infallible;

    fn expression(&mut self, _: Handle<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn result(&mut self, _: Handle<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn emitted(&mut self, _: &rglsl::Range<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn ty(&mut self, _: Handle<rglsl::Type>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn constant(&mut self, _: Handle<rglsl::Constant>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn r#override(&mut self, _: Handle<rglsl::Override>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn global_variable(&mut self, _: Handle<rglsl::GlobalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<rglsl::LocalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn function(&mut self, handle: Handle<Function>) -> Result<(), Self::Error> {
        if let Some(slot) = self.pinned.get_mut(handle.index()) {
            *slot = true;
        }
        Ok(())
    }

    fn block(&mut self, _: &'a rglsl::Block) -> Result<(), Self::Error> {
        Ok(())
    }
}
