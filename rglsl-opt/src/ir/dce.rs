use rglsl::compact::{KeepUnused, compact};
use std::collections::BTreeSet;

use rglsl::{
    AddressSpace, Arena, Binding, Block, BuiltIn, Expression, FastHashMap, FastHashSet, Function,
    GlobalVariable, Handle, LocalVariable, Module, Sampling, ShaderStage, Span, Statement, Type,
    TypeInner, UniqueArena,
};

use crate::analysis::for_each_result;
use crate::analysis::locals::FIRST;
use crate::float::{self, UndefinedUse};
use crate::ir::rebuild::{Policy, Rebuild};
use crate::{Changed, Context, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let context = session.context;
    session.rewrite(|module| dce(module, context))
}

fn dce(module: &mut Module, context: Context) -> Result<bool, String> {
    let mut changed = sweep_functions(module, context.keeps_variables())?;
    changed |= sweep_module(module)?;
    Ok(changed)
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
    first: u32,
    outer: u32,
}

struct Tree<'m> {
    nodes: Vec<Node<'m>>,
    exits: Vec<Vec<u32>>,
}

impl<'m> Tree<'m> {
    fn breaks_out(&self, id: u32) -> bool {
        self.exits.get(id as usize).is_some_and(|exits| {
            exits.iter().any(|&exit| {
                self.nodes
                    .get(exit as usize)
                    .is_some_and(|node| matches!(*node.statement, Statement::Break))
            })
        })
    }

    fn of(body: &'m Block) -> Self {
        struct Frame<'m> {
            statements: core::slice::Iter<'m, Statement>,
            parent: u32,
            breaks: u32,
            continues: u32,
            first: u32,
            outer: u32,
            falls: bool,
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
            first: NONE,
            outer: NONE,
            falls: false,
        }]);
        while let Some(frame) = pending.last_mut() {
            let id = u32::try_from(tree.nodes.len()).unwrap_or(NONE);
            let Some(statement) = frame.statements.next() else {
                let (parent, first, falls) = (frame.parent, frame.first, frame.falls);
                pending.pop();
                if let Some(next) = pending.last_mut()
                    && falls
                    && next.parent == parent
                    && next.first == NONE
                {
                    next.first = first;
                }
                continue;
            };
            if frame.first == NONE {
                frame.first = id;
            }
            let (parent, breaks, continues, first, outer) = (
                frame.parent,
                frame.breaks,
                frame.continues,
                frame.first,
                frame.outer,
            );
            tree.nodes.push(Node {
                statement,
                parent,
                end: id.saturating_add(1),
                first,
                outer,
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
            let outer = match *statement {
                Statement::Loop { .. } if outer == NONE => id,
                _ => outer,
            };
            let start = pending.len();
            let mut falls = match *statement {
                Statement::Switch { ref cases, .. } => {
                    cases.iter().map(|case| case.fall_through).collect()
                }
                _ => Vec::new(),
            }
            .into_iter();
            statement.for_each_child_block(|child| {
                pending.push(Frame {
                    statements: child.iter(),
                    parent: id,
                    breaks,
                    continues,
                    first: NONE,
                    outer,
                    falls: falls.next().unwrap_or(false),
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

type Lane = (u32, u32, u8);

fn covers(mask: u8, lane: usize) -> bool {
    u32::try_from(lane)
        .ok()
        .and_then(|lane| mask.checked_shr(lane))
        .is_some_and(|bits| bits & 1 != 0)
}

fn take(stores: &mut BTreeSet<u32>, start: u32, end: u32, kept: &mut Vec<u32>) {
    if start >= end {
        return;
    }
    let found: Vec<u32> = stores.range(start..end).copied().collect();
    for id in found {
        stores.remove(&id);
        kept.push(id);
    }
}

struct Live<'m> {
    expressions: Vec<bool>,
    addressed: Vec<bool>,
    used: Vec<bool>,
    widths: Vec<u8>,
    emitted: Vec<u32>,
    pending: Vec<Vec<BTreeSet<u32>>>,
    climbed: FastHashMap<Lane, u32>,
    looped: FastHashSet<Lane>,
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
        let mut emitted = vec![NONE; function.expressions.len()];
        for (id, node) in tree.nodes.iter().enumerate() {
            if let Statement::Emit(ref range) = *node.statement {
                let id = u32::try_from(id).unwrap_or(NONE);
                for handle in range.clone() {
                    if let Some(slot) = emitted.get_mut(handle.index()) {
                        *slot = id;
                    }
                }
            }
        }
        Self {
            expressions: vec![false; function.expressions.len()],
            addressed: vec![false; function.expressions.len()],
            used: vec![false; function.local_variables.len()],
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
            emitted,
            pending: vec![Vec::new(); function.local_variables.len()],
            climbed: FastHashMap::default(),
            looped: FastHashSet::default(),
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

    fn store(&mut self, local: Handle<LocalVariable>, id: u32, written: u8) {
        let lanes = usize::from(self.widths.get(local.index()).copied().unwrap_or(0).max(1));
        let Some(sets) = self.pending.get_mut(local.index()) else {
            return;
        };
        if sets.len() < lanes {
            sets.resize_with(lanes, BTreeSet::new);
        }
        for (lane, set) in sets.iter_mut().enumerate() {
            if covers(written, lane) {
                set.insert(id);
            }
        }
    }

    fn escape(&mut self, local: Handle<LocalVariable>, mask: u8, kept: &mut Vec<u32>) {
        if let Some(slot) = self.used.get_mut(local.index()) {
            *slot = true;
        }
        let Some(sets) = self.pending.get_mut(local.index()) else {
            return;
        };
        for (lane, set) in sets.iter_mut().enumerate() {
            if covers(mask, lane) {
                kept.extend(core::mem::take(set));
            }
        }
    }

    fn read(&mut self, local: Handle<LocalVariable>, mask: u8, at: u32, kept: &mut Vec<u32>) {
        if let Some(slot) = self.used.get_mut(local.index()) {
            *slot = true;
        }
        let Ok(variable) = u32::try_from(local.index()) else {
            return;
        };
        let Some(sets) = self.pending.get_mut(local.index()) else {
            return;
        };
        let nodes = &self.tree.nodes;
        let outer = nodes.get(at as usize).map_or(NONE, |node| node.outer);
        for (lane, stores) in sets.iter_mut().enumerate() {
            if !covers(mask, lane) || stores.is_empty() {
                continue;
            }
            let Ok(lane) = u8::try_from(lane) else {
                continue;
            };
            if let Some(looping) = nodes.get(outer as usize)
                && self.looped.insert((outer, variable, lane))
            {
                take(stores, outer, looping.end, kept);
            }
            let mut current = at;
            while let Some(node) = nodes.get(current as usize)
                && !stores.is_empty()
            {
                let done = self
                    .climbed
                    .entry((node.first, variable, lane))
                    .or_insert(NONE);
                let (start, seen) = match *done {
                    NONE => (node.first, false),
                    reached if reached >= current => break,
                    reached => (reached, true),
                };
                *done = current;
                take(stores, start, current, kept);
                let Some(parent) = nodes.get(node.parent as usize) else {
                    break;
                };
                let (Some(&first), Some(&last)) = (stores.first(), stores.last()) else {
                    break;
                };
                if seen || (node.parent <= first && last < parent.end) {
                    break;
                }
                current = node.parent;
            }
        }
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
            Expression::LocalVariable(local) => {
                self.escape(index, function, local, WHOLE);
                return;
            }
            Expression::GlobalVariable(global) => self.global(global),
            Expression::AccessIndex { base, .. } => {
                if let Some((local, component)) = self
                    .live
                    .get(index)
                    .and_then(|live| live.component(function, handle))
                {
                    self.address(index, base);
                    self.escape(index, function, local, 1 << component);
                    return;
                }
            }
            Expression::Load { pointer } => {
                if let Some((local, mask, at)) = self.live.get(index).and_then(|live| {
                    let Root::Local(local) = live.root(pointer) else {
                        return None;
                    };
                    let at = live.emitted.get(handle.index()).copied().unwrap_or(NONE);
                    Some((local, live.written(function, pointer), at))
                }) {
                    self.place(index, function, pointer);
                    self.read(index, function, local, mask, at);
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
            .and_then(|live| live.addressed.get_mut(handle.index()))
        {
            *slot = true;
        }
    }

    fn place(&mut self, index: usize, function: &Function, pointer: Handle<Expression>) {
        let mut current = pointer;
        loop {
            self.address(index, current);
            match function.expressions.try_get(current) {
                Ok(&Expression::Access {
                    base,
                    index: offset,
                }) => {
                    self.mark(index, offset);
                    current = base;
                }
                Ok(&Expression::AccessIndex { base, .. }) => current = base,
                _ => return,
            }
        }
    }

    fn stored_through(&mut self, index: usize, pointer: Handle<Expression>) {
        let Some(&function) = self.functions.get(index) else {
            return;
        };
        if self
            .live
            .get(index)
            .is_some_and(|live| matches!(live.root(pointer), Root::Local(_)))
        {
            self.place(index, function, pointer);
        } else {
            self.mark(index, pointer);
        }
    }

    fn escape(
        &mut self,
        index: usize,
        function: &Function,
        local: Handle<LocalVariable>,
        mask: u8,
    ) {
        let mut kept = Vec::new();
        if let Some(live) = self.live.get_mut(index) {
            live.escape(local, mask, &mut kept);
        }
        self.reached(index, function, local, kept);
    }

    fn read(
        &mut self,
        index: usize,
        function: &Function,
        local: Handle<LocalVariable>,
        mask: u8,
        at: u32,
    ) {
        let mut kept = Vec::new();
        if let Some(live) = self.live.get_mut(index) {
            if at == NONE {
                live.escape(local, mask, &mut kept);
            } else {
                live.read(local, mask, at, &mut kept);
            }
        }
        self.reached(index, function, local, kept);
    }

    fn reached(
        &mut self,
        index: usize,
        function: &Function,
        local: Handle<LocalVariable>,
        kept: Vec<u32>,
    ) {
        for store in kept {
            self.keep(index, store);
        }
        if let Ok(variable) = function.local_variables.try_get(local)
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
                for_each_result(other, |result| results.push(result));
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
                    if break_if.is_none() && !live.tree.breaks_out(id) {
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
                live.store(local, id, written);
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

fn sweep_functions(module: &mut Module, debug: bool) -> Result<bool, String> {
    let tracked: Vec<bool> = module
        .global_variables
        .iter()
        .map(|(_, global)| global.space == AddressSpace::Private)
        .collect();
    let functions: Vec<&Function> = module.all_functions().collect();
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
    let plans: Vec<Option<Plan>> = marker
        .live
        .iter_mut()
        .zip(debug_values)
        .map(|(live, values)| Plan::of(live, values))
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
        *function = plan.apply(function)?;
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
    fn of(live: &mut Live<'_>, debug_values: Vec<DebugValue>) -> Option<Self> {
        for (kept, &addressed) in live.expressions.iter_mut().zip(&live.addressed) {
            *kept |= addressed;
        }
        let any_dead = live.expressions.iter().any(|&live| !live)
            || live.used.iter().any(|&used| !used)
            || live.statements.iter().any(|&live| !live);
        any_dead.then(|| Self {
            expressions: core::mem::take(&mut live.expressions),
            locals: core::mem::take(&mut live.used),
            statements: core::mem::take(&mut live.statements),
            ends: live.tree.nodes.iter().map(|node| node.end).collect(),
            endless: core::mem::take(&mut live.endless),
            debug_values,
        })
    }

    fn debug_value(&self, id: u32) -> Option<&DebugValue> {
        let index = self.debug_values.partition_point(|value| value.id < id);
        self.debug_values.get(index).filter(|value| value.id == id)
    }

    fn apply(&self, function: &Function) -> Result<Function, String> {
        let mut described = vec![false; self.locals.len()];
        for value in &self.debug_values {
            if let Some(slot) = described.get_mut(value.variable.index()) {
                *slot = true;
            }
        }
        let mut locals = Vec::with_capacity(self.locals.len());
        let mut kept = Arena::new();
        for (handle, local) in function.local_variables.iter() {
            let span = function.local_variables.get_span(handle);
            let index = handle.index();
            locals.push(if self.locals.get(index) == Some(&true) {
                Some(kept.append(local.clone(), span))
            } else if described.get(index) == Some(&true) {
                let local = LocalVariable {
                    init: None,
                    ..local.clone()
                };
                Some(kept.append(local, span))
            } else {
                None
            });
        }
        let mut rebuild = Rebuild::with_locals(function, kept, locals);
        for (handle, _) in function.expressions.iter() {
            if self.expressions.get(handle.index()) == Some(&true) {
                rebuild.define(handle)?;
            }
        }
        let statements = u32::try_from(self.statements.len()).map_err(|error| error.to_string())?;
        rebuild.body(
            &mut Sweep { plan: self },
            Some(statements.saturating_add(FIRST)),
        )?;
        Ok(rebuild.finish())
    }
}

struct Sweep<'p> {
    plan: &'p Plan,
}

impl<'f> Policy<'f> for Sweep<'_> {
    fn statement(
        &mut self,
        rebuild: &mut Rebuild<'f>,
        statement: &Statement,
        span: Span,
        position: u32,
        block: &mut Block,
    ) -> Result<bool, String> {
        if let Statement::Emit(ref range) = *statement {
            for handle in range.clone() {
                if let Some(new) = rebuild.mapped(handle) {
                    rebuild.emitted(new, block, span);
                }
            }
            return Ok(true);
        }
        let id = position.saturating_sub(FIRST);
        let plan = self.plan;
        if plan.statements.get(id as usize) == Some(&true) {
            return Ok(false);
        }
        let end = plan
            .ends
            .get(id as usize)
            .copied()
            .ok_or_else(|| format!("statement {id} is not in the analysis"))?;
        rebuild.set_position(end.saturating_add(FIRST));
        if let Some(value) = plan.debug_value(id) {
            let debug_value = Statement::DebugValue {
                variable: rebuild.local(value.variable)?,
                value: rebuild
                    .mapped(value.value)
                    .ok_or("a debug value uses a dead expression")?,
                indices: value.indices.clone(),
            };
            rebuild.push(block, debug_value, span);
        }
        if plan.endless.binary_search(&id).is_ok() {
            rebuild.push(block, Statement::Return { value: None }, span);
        }
        Ok(true)
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
    let set = |slots: &mut [bool], index: usize| {
        if let Some(slot) = slots.get_mut(index) {
            *slot = true;
        }
    };
    for (_, expression) in function.expressions.iter() {
        if let Expression::GlobalVariable(global) = *expression {
            set(used, global.index());
        }
        expression.for_each_callee(|callee| set(reachable, callee.index()));
    }
    for statement in function.body.walk() {
        statement.for_each_callee(|callee| set(reachable, callee.index()));
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
