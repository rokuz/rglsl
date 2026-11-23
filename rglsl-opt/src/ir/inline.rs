mod copy;
mod returns;

use rglsl::{Expression, Function, FunctionControl, Handle, Module, Statement};

use crate::{Changed, Inlining, OptError, Session};
use copy::Inliner;
use returns::{Lowered, lower};

const GROWTH: u64 = 8;
const FLOOR: u64 = 1 << 18;

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let inlining = session.profile.parameters.inlining;
    session.rewrite(|module| inline(module, inlining))
}

pub(crate) struct Plan {
    inlining: Inlining,
    ranges: Vec<Option<(u32, u32)>>,
    lowered: Vec<Option<Lowered>>,
    sites: Vec<usize>,
    pinned: Vec<bool>,
    kills: Vec<bool>,
    full: Vec<u64>,
    limit: u64,
}

impl Plan {
    fn debug_range(&self, function: Handle<Function>) -> Option<(u32, u32)> {
        self.ranges.get(function.index()).copied().flatten()
    }

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

fn inline(module: &mut Module, inlining: Inlining) -> Result<bool, String> {
    let Some(plan) = plan(module, inlining) else {
        return Ok(false);
    };
    apply(module, &plan)
}

struct CallGraph {
    sites: Vec<usize>,
    pinned: Vec<bool>,
    kills: Vec<bool>,
    callees: Vec<Vec<Handle<Function>>>,
    total: u64,
}

impl CallGraph {
    fn of(module: &Module) -> Self {
        let count = module.functions.len();
        let mut graph = Self {
            sites: vec![0; count],
            pinned: vec![false; count],
            kills: vec![false; count],
            callees: vec![Vec::new(); count],
            total: 0,
        };
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
            graph.add(handle, function);
        }
        graph
    }

    fn add(&mut self, handle: Option<Handle<Function>>, function: &Function) {
        self.total = self.total.saturating_add(own_size(function));
        let mut ends = false;
        for statement in function.body.walk() {
            ends |= ends_invocation(statement);
            if let Statement::Call {
                function: callee, ..
            } = *statement
            {
                if let Some(slot) = self.sites.get_mut(callee.index()) {
                    *slot += 1;
                }
                if let Some(handle) = handle
                    && let Some(list) = self.callees.get_mut(handle.index())
                {
                    list.push(callee);
                }
            }
        }
        for (_, expression) in function.expressions.iter() {
            if matches!(*expression, Expression::CallResult(_)) {
                continue;
            }
            expression.for_each_callee(|callee| {
                if let Some(slot) = self.pinned.get_mut(callee.index()) {
                    *slot = true;
                }
            });
        }
        if let Some(handle) = handle
            && let Some(slot) = self.kills.get_mut(handle.index())
        {
            *slot = ends;
        }
    }
}

fn plan(module: &mut Module, inlining: Inlining) -> Option<Plan> {
    let CallGraph {
        sites,
        pinned,
        mut kills,
        callees,
        total,
    } = CallGraph::of(module);
    let count = module.functions.len();
    let mut full = vec![0u64; count];
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
        return None;
    }
    Some(Plan {
        inlining,
        ranges: debug_ranges(module),
        lowered,
        sites,
        pinned,
        kills,
        full,
        limit: total.saturating_mul(GROWTH).max(FLOOR),
    })
}

fn debug_ranges(module: &Module) -> Vec<Option<(u32, u32)>> {
    module
        .functions
        .iter()
        .map(|(handle, _)| {
            let info = module.debug_info.as_deref()?;
            let start = u32::try_from(module.functions.get_span(handle).to_range()?.start).ok()?;
            let record = info.function(start)?;
            Some((record.start, record.stop))
        })
        .collect()
}

fn apply(module: &mut Module, plan: &Plan) -> Result<bool, String> {
    let mut debug = module.debug_info.take();
    let mut rooted = vec![false; module.functions.len()];
    let mut pending: Vec<Handle<Function>> = Vec::new();
    for (handle, _) in module.functions.iter() {
        if plan.pinned.get(handle.index()) == Some(&true) {
            pending.push(handle);
            if let Some(slot) = rooted.get_mut(handle.index()) {
                *slot = true;
            }
        }
    }
    let mut entries = Vec::with_capacity(module.entry_points.len());
    for entry in &module.entry_points {
        entries.push(rebuild(
            plan,
            &entry.function,
            &mut rooted,
            &mut pending,
            &mut debug,
        )?);
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
        if let Some(function) = rebuild(plan, function, &mut rooted, &mut pending, &mut debug)? {
            functions.push((handle, function));
        }
    }
    module.debug_info = debug;
    let changed = !functions.is_empty() || entries.iter().any(Option::is_some);
    for (handle, function) in functions {
        *module.functions.get_mut(handle) = function;
    }
    for (entry, function) in module.entry_points.iter_mut().zip(entries) {
        if let Some(function) = function {
            entry.function = function;
        }
    }
    Ok(changed)
}

fn rebuild(
    plan: &Plan,
    function: &Function,
    rooted: &mut [bool],
    pending: &mut Vec<Handle<Function>>,
    debug: &mut Option<Box<rglsl::DebugInfo>>,
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
    let (inliner, function) = Inliner::build(plan, function, debug.take())?;
    enqueue(&inliner.kept, rooted, pending);
    *debug = inliner.debug;
    Ok(inliner.inlined.then_some(function))
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
