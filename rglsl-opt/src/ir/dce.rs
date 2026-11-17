use rglsl::compact::{KeepUnused, compact};
use rglsl::ir::visit::{Visitor, VisitorMut};
use rglsl::{
    AddressSpace, Arena, Binding, Block, BuiltIn, Constant, Expression, Function, GlobalVariable,
    Handle, LocalVariable, Module, Override, Range, Sampling, ShaderStage, Statement, Type,
    TypeInner, UniqueArena,
};

use crate::{Changed, Context, DebugLevel, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let pass = session.pass;
    let context = session.context;
    let module = session.module()?;
    dce(module, context).map_err(|message| OptError::Pass { pass, message })
}

fn dce(module: &mut Module, context: Context) -> Result<Changed, String> {
    let complete = !context.unlinked && !context.export_functions;
    let mut changed = false;
    if context.debug != DebugLevel::Variables {
        changed |= sweep_functions(module, complete)?;
    }
    if complete {
        changed |= sweep_module(module)?;
    }
    Ok(if changed { Changed::Yes } else { Changed::No })
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Root {
    Value,
    Local(Handle<LocalVariable>),
    Global(Handle<GlobalVariable>),
}

type Store = (Handle<Expression>, Handle<Expression>);

struct Live {
    expressions: Vec<bool>,
    locals: Vec<bool>,
    stores: Vec<Vec<Store>>,
    roots: Vec<Root>,
}

impl Live {
    fn new(function: &Function) -> Self {
        let mut roots: Vec<Root> = Vec::with_capacity(function.expressions.len());
        for (_, expression) in function.expressions.iter() {
            let root = match *expression {
                Expression::LocalVariable(local) => Root::Local(local),
                Expression::GlobalVariable(global) => Root::Global(global),
                Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                    roots.get(base.index()).copied().unwrap_or(Root::Value)
                }
                _ => Root::Value,
            };
            roots.push(root);
        }
        Self {
            expressions: vec![false; function.expressions.len()],
            locals: vec![false; function.local_variables.len()],
            stores: vec![Vec::new(); function.local_variables.len()],
            roots,
        }
    }

    fn root(&self, pointer: Handle<Expression>) -> Root {
        self.roots
            .get(pointer.index())
            .copied()
            .unwrap_or(Root::Value)
    }
}

struct Marker<'m> {
    functions: Vec<&'m Function>,
    live: Vec<Live>,
    tracked: Vec<bool>,
    globals: Vec<bool>,
    global_stores: Vec<Vec<(usize, Store)>>,
    pending: Vec<(usize, Handle<Expression>)>,
}

impl Marker<'_> {
    fn mark(&mut self, function: usize, handle: Handle<Expression>) {
        if let Some(slot) = self
            .live
            .get_mut(function)
            .and_then(|live| live.expressions.get_mut(handle.index()))
            && !*slot
        {
            *slot = true;
            self.pending.push((function, handle));
        }
    }

    fn run(&mut self) {
        while let Some((index, handle)) = self.pending.pop() {
            let Some(&function) = self.functions.get(index) else {
                continue;
            };
            let Ok(expression) = function.expressions.try_get(handle) else {
                continue;
            };
            match *expression {
                Expression::LocalVariable(local) => self.local(index, function, local),
                Expression::GlobalVariable(global) => self.global(global),
                _ => {}
            }
            expression.for_each_operand(|operand| self.mark(index, operand));
        }
    }

    fn local(&mut self, index: usize, function: &Function, local: Handle<LocalVariable>) {
        let Some(live) = self.live.get_mut(index) else {
            return;
        };
        let Some(slot) = live.locals.get_mut(local.index()) else {
            return;
        };
        if *slot {
            return;
        }
        *slot = true;
        let stores = live
            .stores
            .get_mut(local.index())
            .map(core::mem::take)
            .unwrap_or_default();
        for (pointer, value) in stores {
            self.mark(index, pointer);
            self.mark(index, value);
        }
        if let Ok(variable) = function.local_variables.try_get(local)
            && let Some(init) = variable.init
        {
            self.mark(index, init);
        }
    }

    fn global(&mut self, global: Handle<GlobalVariable>) {
        if self.tracked.get(global.index()) != Some(&true) {
            return;
        }
        let Some(slot) = self.globals.get_mut(global.index()) else {
            return;
        };
        if *slot {
            return;
        }
        *slot = true;
        let stores = self
            .global_stores
            .get_mut(global.index())
            .map(core::mem::take)
            .unwrap_or_default();
        for (index, (pointer, value)) in stores {
            self.mark(index, pointer);
            self.mark(index, value);
        }
    }

    fn dead_store(&self, index: usize, pointer: Handle<Expression>) -> bool {
        let Some(live) = self.live.get(index) else {
            return false;
        };
        match live.root(pointer) {
            Root::Local(local) => live.locals.get(local.index()) == Some(&false),
            Root::Global(global) => {
                self.tracked.get(global.index()) == Some(&true)
                    && self.globals.get(global.index()) == Some(&false)
            }
            Root::Value => false,
        }
    }
}

fn sweep_functions(module: &mut Module, complete: bool) -> Result<bool, String> {
    let tracked: Vec<bool> = module
        .global_variables
        .iter()
        .map(|(_, global)| complete && global.space == AddressSpace::Private)
        .collect();
    let functions: Vec<&Function> = module
        .functions
        .iter()
        .map(|(_, function)| function)
        .chain(module.entry_points.iter().map(|entry| &entry.function))
        .collect();
    let mut marker = Marker {
        live: functions
            .iter()
            .map(|function| Live::new(function))
            .collect(),
        global_stores: vec![Vec::new(); tracked.len()],
        globals: vec![false; tracked.len()],
        tracked,
        functions,
        pending: Vec::new(),
    };
    for index in 0..marker.functions.len() {
        let Some(&function) = marker.functions.get(index) else {
            continue;
        };
        for statement in function.body.walk() {
            match *statement {
                Statement::Emit(_) => {}
                Statement::Store { pointer, value } => {
                    let root = marker
                        .live
                        .get(index)
                        .map_or(Root::Value, |live| live.root(pointer));
                    match root {
                        Root::Local(local) => {
                            if let Some(stores) = marker
                                .live
                                .get_mut(index)
                                .and_then(|live| live.stores.get_mut(local.index()))
                            {
                                stores.push((pointer, value));
                            }
                        }
                        Root::Global(global)
                            if marker.tracked.get(global.index()) == Some(&true) =>
                        {
                            if let Some(stores) = marker.global_stores.get_mut(global.index()) {
                                stores.push((index, (pointer, value)));
                            }
                        }
                        Root::Global(_) | Root::Value => {
                            marker.mark(index, pointer);
                            marker.mark(index, value);
                        }
                    }
                }
                ref other => {
                    other.for_each_operand(|operand| marker.mark(index, operand));
                    let mut results = Vec::new();
                    let Ok(()) = other.visit(&mut Collect(&mut results));
                    for result in results {
                        marker.mark(index, result);
                    }
                }
            }
        }
    }
    marker.run();
    let plans: Vec<Option<Plan>> = (0..marker.functions.len())
        .map(|index| Plan::of(&marker, index))
        .collect();
    drop(marker);
    let mut changed = false;
    let handles: Vec<Handle<Function>> =
        module.functions.iter().map(|(handle, _)| handle).collect();
    for (index, plan) in plans.into_iter().enumerate() {
        let Some(plan) = plan else {
            continue;
        };
        let function = if let Some(&handle) = handles.get(index) {
            Some(module.functions.get_mut(handle))
        } else {
            module
                .entry_points
                .get_mut(index - handles.len())
                .map(|entry| &mut entry.function)
        };
        let function = function.ok_or_else(|| format!("no function {index}"))?;
        plan.apply(function)?;
        changed = true;
    }
    Ok(changed)
}

struct Plan {
    expressions: Vec<bool>,
    locals: Vec<bool>,
    dead_stores: Vec<bool>,
}

impl Plan {
    fn of(marker: &Marker<'_>, index: usize) -> Option<Self> {
        let live = marker.live.get(index)?;
        let function = marker.functions.get(index)?;
        let dead_stores: Vec<bool> = function
            .expressions
            .iter()
            .map(|(pointer, _)| marker.dead_store(index, pointer))
            .collect();
        let any_dead = live.expressions.iter().any(|&live| !live)
            || live.locals.iter().any(|&live| !live)
            || dead_stores.iter().any(|&dead| dead);
        any_dead.then(|| Self {
            expressions: live.expressions.clone(),
            locals: live.locals.clone(),
            dead_stores,
        })
    }

    fn dead_store(&self, pointer: Handle<Expression>) -> bool {
        self.dead_stores.get(pointer.index()) == Some(&true)
    }

    fn apply(self, function: &mut Function) -> Result<(), String> {
        let mut locals = Vec::with_capacity(self.locals.len());
        let mut kept_locals = Arena::new();
        for (handle, local, span) in function.local_variables.drain() {
            if self.locals.get(handle.index()) == Some(&true) {
                locals.push(Some(kept_locals.append(local, span)));
            } else {
                locals.push(None);
            }
        }
        let mut map: Vec<Option<Handle<Expression>>> = Vec::with_capacity(self.expressions.len());
        let mut kept = Arena::new();
        for (handle, mut expression, span) in function.expressions.drain() {
            if self.expressions.get(handle.index()) != Some(&true) {
                map.push(None);
                continue;
            }
            let mut failed = false;
            expression.for_each_operand_mut(|operand| {
                match map.get(operand.index()).copied().flatten() {
                    Some(new) => *operand = new,
                    None => failed = true,
                }
            });
            if let Expression::LocalVariable(ref mut local) = expression {
                match locals.get(local.index()).copied().flatten() {
                    Some(new) => *local = new,
                    None => failed = true,
                }
            }
            if failed {
                return Err(format!("a live expression {handle:?} uses a dead one"));
            }
            map.push(Some(kept.append(expression, span)));
        }
        function.expressions = kept;
        for (_, local) in kept_locals.iter_mut() {
            if let Some(ref mut init) = local.init {
                *init = map
                    .get(init.index())
                    .copied()
                    .flatten()
                    .ok_or("a live local variable has a dead initializer")?;
            }
        }
        function.local_variables = kept_locals;
        function
            .tables()
            .remap(|handle| map.get(handle.index()).copied().flatten());
        let mut error = None;
        function.body.visit_blocks_mut(|block| {
            if error.is_some() {
                return;
            }
            if let Err(message) = self.rebuild(block, &map) {
                error = Some(message);
            }
        });
        error.map_or(Ok(()), Err)
    }

    fn rebuild(&self, block: &mut Block, map: &[Option<Handle<Expression>>]) -> Result<(), String> {
        let statements = core::mem::take(block);
        for (mut statement, span) in statements.span_into_iter() {
            match statement {
                Statement::Emit(ref range) => {
                    let mut kept = range
                        .clone()
                        .filter_map(|handle| map.get(handle.index()).copied().flatten());
                    if let Some(first) = kept.next() {
                        let last = kept.next_back().unwrap_or(first);
                        block.push(Statement::Emit(Range::new_from_bounds(first, last)), span);
                    }
                }
                Statement::Store { pointer, .. } if self.dead_store(pointer) => {}
                _ => {
                    statement.visit_mut(&mut Renumber { map })?;
                    block.push(statement, span);
                }
            }
        }
        Ok(())
    }
}

struct Collect<'a>(&'a mut Vec<Handle<Expression>>);

impl<'a> Visitor<'a> for Collect<'_> {
    type Error = core::convert::Infallible;

    fn expression(&mut self, _: Handle<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn result(&mut self, handle: Handle<Expression>) -> Result<(), Self::Error> {
        self.0.push(handle);
        Ok(())
    }

    fn emitted(&mut self, _: &Range<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn ty(&mut self, _: Handle<Type>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn constant(&mut self, _: Handle<Constant>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn r#override(&mut self, _: Handle<Override>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn global_variable(&mut self, _: Handle<GlobalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<LocalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn function(&mut self, _: Handle<Function>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn block(&mut self, _: &'a Block) -> Result<(), Self::Error> {
        Ok(())
    }
}

struct Renumber<'a> {
    map: &'a [Option<Handle<Expression>>],
}

impl Renumber<'_> {
    fn renumber(&self, handle: &mut Handle<Expression>) -> Result<(), String> {
        *handle = self
            .map
            .get(handle.index())
            .copied()
            .flatten()
            .ok_or_else(|| format!("a statement uses the dead expression {handle:?}"))?;
        Ok(())
    }
}

impl<'a> VisitorMut<'a> for Renumber<'_> {
    type Error = String;

    fn expression(&mut self, handle: &mut Handle<Expression>) -> Result<(), String> {
        self.renumber(handle)
    }

    fn result(&mut self, handle: &mut Handle<Expression>) -> Result<(), String> {
        self.renumber(handle)
    }

    fn emitted(&mut self, _: &mut Range<Expression>) -> Result<(), String> {
        Err(String::from("an Emit statement inside another statement"))
    }

    fn ty(&mut self, _: &mut Handle<Type>) -> Result<(), String> {
        Ok(())
    }

    fn constant(&mut self, _: &mut Handle<Constant>) -> Result<(), String> {
        Ok(())
    }

    fn r#override(&mut self, _: &mut Handle<Override>) -> Result<(), String> {
        Ok(())
    }

    fn global_variable(&mut self, _: &mut Handle<GlobalVariable>) -> Result<(), String> {
        Ok(())
    }

    fn local_variable(&mut self, _: &mut Handle<LocalVariable>) -> Result<(), String> {
        Err(String::from("a statement names a local variable"))
    }

    fn function(&mut self, _: &mut Handle<Function>) -> Result<(), String> {
        Ok(())
    }

    fn block(&mut self, _: &'a mut Block) -> Result<(), String> {
        Ok(())
    }
}

fn sweep_module(module: &mut Module) -> Result<bool, String> {
    let mut reachable = vec![false; module.functions.len()];
    let mut used = vec![false; module.global_variables.len()];
    for entry in &module.entry_points {
        uses(&entry.function, &mut reachable, &mut used);
    }
    for (handle, function) in module.functions.iter().rev() {
        if reachable.get(handle.index()) == Some(&true) {
            uses(function, &mut reachable, &mut used);
        }
    }
    let mut changed = false;
    for entry in &mut module.entry_points {
        let before = entry.interface.len();
        let stage = entry.stage;
        let passthrough: Vec<Handle<GlobalVariable>> = entry
            .geometry
            .iter()
            .flat_map(|geometry| geometry.passthrough.iter().copied())
            .collect();
        entry.interface.retain(|&global| {
            module
                .global_variables
                .try_get(global)
                .is_ok_and(|variable| {
                    variable.space != AddressSpace::Input
                        || used.get(global.index()) == Some(&true)
                        || passthrough.contains(&global)
                        || shades_per_sample(stage, variable, &module.types)
                })
        });
        changed |= entry.interface.len() != before;
    }
    let before = sizes(module);
    compact(module, KeepUnused::No).map_err(|error| error.to_string())?;
    Ok(changed || sizes(module) != before)
}

fn uses(function: &Function, reachable: &mut [bool], used: &mut [bool]) {
    for (_, expression) in function.expressions.iter() {
        if let Expression::GlobalVariable(global) = *expression
            && let Some(slot) = used.get_mut(global.index())
        {
            *slot = true;
        }
    }
    for statement in function.body.walk() {
        statement.for_each_callee(|callee| {
            if let Some(slot) = reachable.get_mut(callee.index()) {
                *slot = true;
            }
        });
    }
    for (_, expression) in function.expressions.iter() {
        let Ok(()) = expression.visit(&mut Callees(reachable));
    }
}

fn shades_per_sample(
    stage: ShaderStage,
    variable: &GlobalVariable,
    types: &UniqueArena<Type>,
) -> bool {
    let per_sample = |binding: &Binding| {
        matches!(
            *binding,
            Binding::BuiltIn(BuiltIn::SampleIndex | BuiltIn::SamplePosition)
                | Binding::Location {
                    sampling: Some(Sampling::Sample),
                    ..
                }
        )
    };
    if stage != ShaderStage::Fragment {
        return false;
    }
    if let Some(ref binding) = variable.io {
        return per_sample(binding);
    }
    let mut ty = variable.ty;
    loop {
        match types[ty].inner {
            TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. } => ty = base,
            TypeInner::Struct { ref members, .. } => {
                return members
                    .iter()
                    .any(|member| member.binding.as_ref().is_some_and(per_sample));
            }
            _ => return false,
        }
    }
}

fn sizes(module: &Module) -> Vec<usize> {
    let mut sizes = Vec::from([
        module.types.len(),
        module.constants.len(),
        module.overrides.len(),
        module.global_variables.len(),
        module.global_expressions.len(),
        module.functions.len(),
    ]);
    sizes.extend(
        module
            .functions
            .iter()
            .map(|(_, function)| function.expressions.len())
            .chain(
                module
                    .entry_points
                    .iter()
                    .map(|entry| entry.function.expressions.len()),
            ),
    );
    sizes
}

struct Callees<'a>(&'a mut [bool]);

impl<'a> Visitor<'a> for Callees<'_> {
    type Error = core::convert::Infallible;

    fn expression(&mut self, _: Handle<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn result(&mut self, _: Handle<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn emitted(&mut self, _: &Range<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn ty(&mut self, _: Handle<Type>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn constant(&mut self, _: Handle<Constant>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn r#override(&mut self, _: Handle<Override>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn global_variable(&mut self, _: Handle<GlobalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<LocalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn function(&mut self, handle: Handle<Function>) -> Result<(), Self::Error> {
        if let Some(slot) = self.0.get_mut(handle.index()) {
            *slot = true;
        }
        Ok(())
    }

    fn block(&mut self, _: &'a Block) -> Result<(), Self::Error> {
        Ok(())
    }
}
