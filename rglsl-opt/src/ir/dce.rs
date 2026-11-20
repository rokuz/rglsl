use rglsl::compact::{KeepUnused, compact};
use rglsl::ir::visit::{Visitor, VisitorMut};
use rglsl::{
    AddressSpace, Arena, Binding, Block, BuiltIn, Constant, Expression, Function, GlobalVariable,
    Handle, LocalVariable, Module, Override, Range, Sampling, ShaderStage, Statement, Type,
    TypeInner, UniqueArena,
};
use rglsl_types::stack::recurse;

use crate::float::{self, UndefinedUse};
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
    changed |= sweep_functions(module, complete, context.debug == DebugLevel::Variables)?;
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

const NONE: u32 = u32::MAX;

struct Node<'m> {
    statement: &'m Statement,
    parent: u32,
    end: u32,
}

struct Tree<'m> {
    nodes: Vec<Node<'m>>,
    exits: Vec<Vec<u32>>,
}

impl<'m> Tree<'m> {
    fn of(body: &'m Block) -> Self {
        struct Frame<'m> {
            statements: core::slice::Iter<'m, Statement>,
            parent: u32,
            breaks: u32,
            continues: u32,
        }
        let mut tree = Self {
            nodes: Vec::new(),
            exits: Vec::new(),
        };
        let mut pending = Vec::from([Frame {
            statements: body.iter(),
            parent: NONE,
            breaks: NONE,
            continues: NONE,
        }]);
        while let Some(frame) = pending.last_mut() {
            let Some(statement) = frame.statements.next() else {
                pending.pop();
                continue;
            };
            let (parent, breaks, continues) = (frame.parent, frame.breaks, frame.continues);
            let id = u32::try_from(tree.nodes.len()).unwrap_or(NONE);
            tree.nodes.push(Node {
                statement,
                parent,
                end: id.saturating_add(1),
            });
            tree.exits.push(Vec::new());
            let target = match *statement {
                Statement::Break => breaks,
                Statement::Continue => continues,
                _ => NONE,
            };
            if let Some(exits) = tree.exits.get_mut(target as usize) {
                exits.push(id);
            }
            let (breaks, continues) = match *statement {
                Statement::Loop { .. } => (id, id),
                Statement::Switch { .. } => (id, continues),
                _ => (breaks, continues),
            };
            let start = pending.len();
            statement.for_each_child_block(|child| {
                pending.push(Frame {
                    statements: child.iter(),
                    parent: id,
                    breaks,
                    continues,
                });
            });
            if let Some(children) = pending.get_mut(start..) {
                children.reverse();
            }
        }
        for id in (0..tree.nodes.len()).rev() {
            let Some(&Node { parent, end, .. }) = tree.nodes.get(id) else {
                continue;
            };
            if let Some(node) = tree.nodes.get_mut(parent as usize) {
                node.end = node.end.max(end);
            }
        }
        tree
    }
}

const WHOLE: u8 = u8::MAX;

struct Live<'m> {
    expressions: Vec<bool>,
    locals: Vec<bool>,
    widths: Vec<u8>,
    components: Vec<u8>,
    stores: Vec<Vec<(u32, u8)>>,
    roots: Vec<Root>,
    tree: Tree<'m>,
    statements: Vec<bool>,
    endless: Vec<u32>,
}

impl<'m> Live<'m> {
    fn new(function: &'m Function, types: &UniqueArena<Type>) -> Self {
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
        let tree = Tree::of(&function.body);
        Self {
            expressions: vec![false; function.expressions.len()],
            locals: vec![false; function.local_variables.len()],
            widths: function
                .local_variables
                .iter()
                .map(
                    |(_, local)| match types.get_handle(local.ty).map(|ty| &ty.inner) {
                        Ok(&TypeInner::Vector { size, .. }) => size as u8,
                        _ => 0,
                    },
                )
                .collect(),
            components: vec![0; function.local_variables.len()],
            stores: vec![Vec::new(); function.local_variables.len()],
            roots,
            statements: tree
                .nodes
                .iter()
                .map(|node| matches!(*node.statement, Statement::Emit(_)))
                .collect(),
            tree,
            endless: Vec::new(),
        }
    }

    fn component(
        &self,
        function: &Function,
        pointer: Handle<Expression>,
    ) -> Option<(Handle<LocalVariable>, u32)> {
        let Ok(&Expression::AccessIndex { base, index }) = function.expressions.try_get(pointer)
        else {
            return None;
        };
        let Ok(&Expression::LocalVariable(local)) = function.expressions.try_get(base) else {
            return None;
        };
        let width = self.widths.get(local.index()).copied().unwrap_or(0);
        (index < u32::from(width)).then_some((local, index))
    }

    fn written(&self, function: &Function, pointer: Handle<Expression>) -> u8 {
        self.component(function, pointer)
            .map_or(WHOLE, |(_, index)| 1 << index)
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
    live: Vec<Live<'m>>,
    tracked: Vec<bool>,
    globals: Vec<bool>,
    global_stores: Vec<Vec<(usize, u32)>>,
    pending: Vec<(usize, Handle<Expression>)>,
    pending_statements: Vec<(usize, u32)>,
}

impl<'m> Marker<'m> {
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

    fn keep(&mut self, function: usize, id: u32) {
        let Some(live) = self.live.get_mut(function) else {
            return;
        };
        let mut current = id;
        while let Some(slot) = live.statements.get_mut(current as usize)
            && !*slot
        {
            *slot = true;
            self.pending_statements.push((function, current));
            current = live
                .tree
                .nodes
                .get(current as usize)
                .map_or(NONE, |node| node.parent);
        }
    }

    fn run(&mut self) {
        loop {
            if let Some((index, handle)) = self.pending.pop() {
                self.expression(index, handle);
            } else if let Some((index, id)) = self.pending_statements.pop() {
                self.statement(index, id);
            } else {
                return;
            }
        }
    }

    fn expression(&mut self, index: usize, handle: Handle<Expression>) {
        let Some(&function) = self.functions.get(index) else {
            return;
        };
        let Ok(expression) = function.expressions.try_get(handle) else {
            return;
        };
        match *expression {
            Expression::LocalVariable(local) => self.local(index, function, local),
            Expression::GlobalVariable(global) => self.global(global),
            Expression::AccessIndex { base, .. } => {
                if let Some((local, component)) = self
                    .live
                    .get(index)
                    .and_then(|live| live.component(function, handle))
                {
                    self.address(index, base);
                    self.component(index, function, local, component);
                    return;
                }
            }
            _ => {}
        }
        expression.for_each_operand(|operand| self.mark(index, operand));
    }

    fn address(&mut self, function: usize, handle: Handle<Expression>) {
        if let Some(slot) = self
            .live
            .get_mut(function)
            .and_then(|live| live.expressions.get_mut(handle.index()))
        {
            *slot = true;
        }
    }

    fn stored_through(&mut self, index: usize, pointer: Handle<Expression>) {
        let Some(&function) = self.functions.get(index) else {
            return;
        };
        let tracked = self.live.get(index).is_some_and(|live| {
            live.component(function, pointer).is_some()
                || function
                    .expressions
                    .try_get(pointer)
                    .is_ok_and(|expression| {
                        matches!(*expression, Expression::LocalVariable(local)
                        if live.widths.get(local.index()).is_some_and(|&width| width > 0))
                    })
        });
        if !tracked {
            self.mark(index, pointer);
            return;
        }
        self.address(index, pointer);
        if let Ok(&Expression::AccessIndex { base, .. }) = function.expressions.try_get(pointer) {
            self.address(index, base);
        }
    }

    fn component(
        &mut self,
        index: usize,
        function: &Function,
        local: Handle<LocalVariable>,
        component: u32,
    ) {
        let Some(live) = self.live.get_mut(index) else {
            return;
        };
        let bit = 1_u8 << component;
        let whole = live.locals.get(local.index()) == Some(&true);
        let Some(mask) = live.components.get_mut(local.index()) else {
            return;
        };
        if whole || *mask & bit != 0 {
            return;
        }
        let first = *mask == 0;
        *mask |= bit;
        let mut kept = Vec::new();
        if let Some(stores) = live.stores.get_mut(local.index()) {
            stores.retain(|&(id, written)| {
                if written & bit != 0 {
                    kept.push(id);
                    false
                } else {
                    true
                }
            });
        }
        for store in kept {
            self.keep(index, store);
        }
        if first
            && let Ok(variable) = function.local_variables.try_get(local)
            && let Some(init) = variable.init
        {
            self.mark(index, init);
        }
    }

    fn statement(&mut self, index: usize, id: u32) {
        let Some(node) = self
            .live
            .get(index)
            .and_then(|live| live.tree.nodes.get(id as usize))
        else {
            return;
        };
        let statement: &'m Statement = node.statement;
        match *statement {
            Statement::Emit(_) | Statement::Block(_) | Statement::Break | Statement::Continue => {}
            Statement::If { condition, .. } => self.mark(index, condition),
            Statement::Switch { selector, .. } => {
                self.mark(index, selector);
                self.exits(index, id);
            }
            Statement::Loop { break_if, .. } => {
                if let Some(condition) = break_if {
                    self.mark(index, condition);
                }
                self.exits(index, id);
            }
            Statement::Store { pointer, value } => {
                self.stored_through(index, pointer);
                self.mark(index, value);
            }
            ref other => {
                other.for_each_operand(|operand| self.mark(index, operand));
                let mut results = Vec::new();
                let Ok(()) = other.visit(&mut Collect(&mut results));
                for result in results {
                    self.mark(index, result);
                }
            }
        }
    }

    fn exits(&mut self, index: usize, id: u32) {
        let exits = self
            .live
            .get_mut(index)
            .and_then(|live| live.tree.exits.get_mut(id as usize))
            .map(core::mem::take)
            .unwrap_or_default();
        for exit in exits {
            self.keep(index, exit);
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
        for (store, _) in stores {
            self.keep(index, store);
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
        for (index, store) in stores {
            self.keep(index, store);
        }
    }

    fn undefined_store(&self, index: usize, value: Handle<Expression>) -> bool {
        float::folds_undefined(UndefinedUse::Store)
            && self
                .functions
                .get(index)
                .and_then(|function| function.expressions.try_get(value).ok())
                .is_some_and(|value| matches!(*value, Expression::Undef(_)))
    }

    fn roots(&mut self, index: usize) {
        let Some(live) = self.live.get(index) else {
            return;
        };
        let Some(&function) = self.functions.get(index) else {
            return;
        };
        let returns_nothing = function.result.is_none();
        let mut roots = Vec::new();
        let mut endless = Vec::new();
        let mut local_stores = Vec::new();
        let mut global_stores = Vec::new();
        for (id, node) in live.tree.nodes.iter().enumerate() {
            let id = u32::try_from(id).unwrap_or(NONE);
            match *node.statement {
                Statement::Emit(_)
                | Statement::Block(_)
                | Statement::If { .. }
                | Statement::Switch { .. }
                | Statement::Break
                | Statement::Continue => {}
                Statement::Loop { break_if, .. } => {
                    if break_if.is_none()
                        && live.tree.exits.get(id as usize).is_none_or(|exits| {
                            !exits.iter().any(|&exit| {
                                live.tree
                                    .nodes
                                    .get(exit as usize)
                                    .is_some_and(|node| matches!(*node.statement, Statement::Break))
                            })
                        })
                    {
                        if returns_nothing {
                            endless.push(id);
                            if node.parent != NONE {
                                roots.push(node.parent);
                            }
                        } else {
                            roots.push(id);
                        }
                    }
                }
                Statement::DebugValue { .. } => {}
                Statement::Store { pointer, value } => {
                    let root = live.root(pointer);
                    if removable(root, &self.tracked) && self.undefined_store(index, value) {
                        continue;
                    }
                    match root {
                        Root::Local(local) => {
                            local_stores.push((local, id, live.written(function, pointer)));
                        }
                        Root::Global(global) if self.tracked.get(global.index()) == Some(&true) => {
                            global_stores.push((global, id));
                        }
                        Root::Global(_) | Root::Value => roots.push(id),
                    }
                }
                _ => roots.push(id),
            }
        }
        if let Some(live) = self.live.get_mut(index) {
            live.endless = endless;
            for (local, id, written) in local_stores {
                if let Some(stores) = live.stores.get_mut(local.index()) {
                    stores.push((id, written));
                }
            }
        }
        for (global, id) in global_stores {
            if let Some(stores) = self.global_stores.get_mut(global.index()) {
                stores.push((index, id));
            }
        }
        for id in roots {
            self.keep(index, id);
        }
    }
}

fn sweep_functions(module: &mut Module, complete: bool, debug: bool) -> Result<bool, String> {
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
            .map(|function| Live::new(function, &module.types))
            .collect(),
        global_stores: vec![Vec::new(); tracked.len()],
        globals: vec![false; tracked.len()],
        tracked,
        functions,
        pending: Vec::new(),
        pending_statements: Vec::new(),
    };
    for index in 0..marker.functions.len() {
        marker.roots(index);
    }
    marker.run();
    let debug_values: Vec<Vec<DebugValue>> = (0..marker.functions.len())
        .map(|index| marker.debug_values(index, debug))
        .collect();
    let plans: Vec<Option<Plan>> = debug_values
        .into_iter()
        .enumerate()
        .map(|(index, values)| Plan::of(&marker, index, values))
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

fn removable(root: Root, tracked: &[bool]) -> bool {
    match root {
        Root::Local(_) => true,
        Root::Global(global) => tracked.get(global.index()) == Some(&true),
        Root::Value => false,
    }
}

struct DebugValue {
    id: u32,
    variable: Handle<LocalVariable>,
    value: Handle<Expression>,
    indices: Vec<u32>,
}

impl Marker<'_> {
    fn debug_values(&mut self, index: usize, debug: bool) -> Vec<DebugValue> {
        let Some(&function) = self.functions.get(index) else {
            return Vec::new();
        };
        let mut found = Vec::new();
        let Some(live) = self.live.get(index) else {
            return found;
        };
        for (id, node) in live.tree.nodes.iter().enumerate() {
            let Ok(id) = u32::try_from(id) else {
                break;
            };
            let candidate = match *node.statement {
                Statement::DebugValue {
                    variable,
                    value,
                    ref indices,
                } => Some((variable, value, indices.clone())),
                Statement::Store { pointer, value }
                    if debug && live.statements.get(id as usize) != Some(&true) =>
                {
                    crate::ir::debug::stored_variable(function, pointer)
                        .map(|(variable, indices)| (variable, value, indices))
                }
                _ => None,
            };
            if let Some((variable, value, indices)) = candidate {
                found.push(DebugValue {
                    id,
                    variable,
                    value,
                    indices,
                });
            }
        }
        for value in &found {
            if function
                .expressions
                .try_get(value.value)
                .is_ok_and(|value| {
                    matches!(
                        *value,
                        Expression::Literal(_) | Expression::Constant(_) | Expression::ZeroValue(_)
                    )
                })
            {
                self.mark(index, value.value);
            }
        }
        self.run();
        let Some(live) = self.live.get(index) else {
            return Vec::new();
        };
        found.retain(|value| {
            let parent = live
                .tree
                .nodes
                .get(value.id as usize)
                .map_or(NONE, |node| node.parent);
            live.expressions.get(value.value.index()) == Some(&true)
                && (parent == NONE || live.statements.get(parent as usize) == Some(&true))
        });
        found
    }
}

struct Plan {
    expressions: Vec<bool>,
    locals: Vec<bool>,
    statements: Vec<bool>,
    ends: Vec<u32>,
    endless: Vec<u32>,
    debug_values: Vec<DebugValue>,
}

impl Plan {
    fn of(marker: &Marker<'_>, index: usize, debug_values: Vec<DebugValue>) -> Option<Self> {
        let live = marker.live.get(index)?;
        let any_dead = live.expressions.iter().any(|&live| !live)
            || live
                .locals
                .iter()
                .zip(&live.components)
                .any(|(&whole, &components)| !whole && components == 0)
            || live.statements.iter().any(|&live| !live);
        any_dead.then(|| Self {
            expressions: live.expressions.clone(),
            locals: live
                .locals
                .iter()
                .zip(&live.components)
                .map(|(&whole, &components)| whole || components != 0)
                .collect(),
            statements: live.statements.clone(),
            ends: live.tree.nodes.iter().map(|node| node.end).collect(),
            endless: live.endless.clone(),
            debug_values,
        })
    }

    fn debug_value(&self, id: u32) -> Option<&DebugValue> {
        let index = self.debug_values.partition_point(|value| value.id < id);
        self.debug_values.get(index).filter(|value| value.id == id)
    }

    fn apply(self, function: &mut Function) -> Result<(), String> {
        let mut described = vec![false; self.locals.len()];
        for value in &self.debug_values {
            if let Some(slot) = described.get_mut(value.variable.index()) {
                *slot = true;
            }
        }
        let mut locals = Vec::with_capacity(self.locals.len());
        let mut kept_locals = Arena::new();
        for (handle, mut local, span) in function.local_variables.drain() {
            if self.locals.get(handle.index()) == Some(&true) {
                locals.push(Some(kept_locals.append(local, span)));
            } else if described.get(handle.index()) == Some(&true) {
                local.init = None;
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
        let mut next = 0;
        let maps = Maps {
            expressions: &map,
            locals: &locals,
        };
        self.rebuild(&mut function.body, maps, &mut next)?;
        if next as usize != self.statements.len() {
            return Err(format!(
                "the rebuilt body has {next} statements, the analysis counted {}",
                self.statements.len()
            ));
        }
        Ok(())
    }

    fn rebuild(&self, block: &mut Block, maps: Maps<'_>, next: &mut u32) -> Result<(), String> {
        let map = maps.expressions;
        let statements = core::mem::take(block);
        for (mut statement, span) in statements.span_into_iter() {
            let id = *next;
            let end = self
                .ends
                .get(id as usize)
                .copied()
                .ok_or_else(|| format!("statement {id} is not in the analysis"))?;
            if let Statement::Emit(ref range) = statement {
                *next = end;
                let mut kept = range
                    .clone()
                    .filter_map(|handle| map.get(handle.index()).copied().flatten());
                if let Some(first) = kept.next() {
                    let last = kept.next_back().unwrap_or(first);
                    block.push(Statement::Emit(Range::new_from_bounds(first, last)), span);
                }
                continue;
            }
            if self.statements.get(id as usize) != Some(&true) {
                *next = end;
                if let Some(value) = self.debug_value(id) {
                    block.push(maps.debug_value(value)?, span);
                }
                if self.endless.binary_search(&id).is_ok() {
                    block.push(Statement::Return { value: None }, span);
                }
                continue;
            }
            *next = id.saturating_add(1);
            let mut result = Ok(());
            statement.for_each_child_block_mut(|child| {
                if result.is_ok() {
                    result = recurse(|| self.rebuild(child, maps, next));
                }
            });
            result?;
            statement.visit_mut(&mut Renumber { map })?;
            block.push(statement, span);
        }
        Ok(())
    }
}

#[derive(Clone, Copy)]
struct Maps<'a> {
    expressions: &'a [Option<Handle<Expression>>],
    locals: &'a [Option<Handle<LocalVariable>>],
}

impl Maps<'_> {
    fn debug_value(&self, value: &DebugValue) -> Result<Statement, String> {
        Ok(Statement::DebugValue {
            variable: self
                .locals
                .get(value.variable.index())
                .copied()
                .flatten()
                .ok_or("a debug value names a removed local variable")?,
            value: self
                .expressions
                .get(value.value.index())
                .copied()
                .flatten()
                .ok_or("a debug value uses a dead expression")?,
            indices: value.indices.clone(),
        })
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
