mod private;

use std::collections::BTreeMap;

use rglsl::{
    AddressSpace, Arena, Binding, Block, BuiltIn, Expression, Function, GlobalVariable, Handle,
    LocalVariable, Module, ShaderStage, Span, Statement, SwitchCase, Type, UniqueArena,
};
use rglsl_types::stack::recurse;

use crate::analysis::locals::{FIRST, Locals, Root, Usage};
use crate::analysis::{Class, classify_types, elements, for_each_result};
use crate::ir::rebuild::{Policy, Rebuild};
use crate::{Changed, Context, DebugLevel, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let pass = session.pass;
    let context = session.context;
    let stage = session.stage()?;
    let module = session.module()?;
    forward(module, stage, context).map_err(|message| OptError::Pass { pass, message })
}

fn forward(module: &mut Module, stage: ShaderStage, context: Context) -> Result<Changed, String> {
    let mut changed = false;
    let classes = classify_types(&module.types);
    let keep_stores = context.debug == DebugLevel::Variables;
    if !context.unlinked && !context.export_functions && !keep_stores {
        changed |= private::localize(module, &classes)?;
    }
    let readonly: Vec<bool> = module
        .global_variables
        .iter()
        .map(|(_, global)| readonly(global))
        .collect();
    let outputs: Vec<bool> = module
        .global_variables
        .iter()
        .map(|(_, global)| forwardable_output(stage, global))
        .collect();
    let global_types: Vec<Handle<Type>> = module
        .global_variables
        .iter()
        .map(|(_, global)| global.ty)
        .collect();
    let globals = Globals {
        types: &module.types,
        readonly: &readonly,
        outputs: &outputs,
        classes: &classes,
        global_types: &global_types,
    };
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
        if let Some(rewritten) = rewrite(globals, function, keep_stores)? {
            *function = rewritten;
            changed = true;
        }
    }
    Ok(if changed { Changed::Yes } else { Changed::No })
}

#[derive(Clone, Copy)]
struct Globals<'a> {
    types: &'a UniqueArena<Type>,
    readonly: &'a [bool],
    outputs: &'a [bool],
    classes: &'a [Class],
    global_types: &'a [Handle<Type>],
}

fn forwardable_output(stage: ShaderStage, global: &GlobalVariable) -> bool {
    global.space == AddressSpace::Output
        && matches!(
            stage,
            ShaderStage::Vertex | ShaderStage::TessEvaluation | ShaderStage::Fragment
        )
        && global.memory_decorations.is_empty()
        && global.spirv_decorations.is_empty()
}

fn readonly(global: &GlobalVariable) -> bool {
    let space = match global.space {
        AddressSpace::Uniform | AddressSpace::Immediate => true,
        AddressSpace::Input => !matches!(
            global.io,
            Some(Binding::BuiltIn(
                BuiltIn::HelperInvocation | BuiltIn::ShaderCore(_)
            ))
        ),
        _ => false,
    };
    space && global.memory_decorations.is_empty() && global.spirv_decorations.is_empty()
}

fn rewrite(
    module: Globals<'_>,
    function: &Function,
    keep_stores: bool,
) -> Result<Option<Function>, String> {
    let Globals {
        types,
        readonly,
        outputs,
        classes,
        global_types,
    } = module;
    let locals = Locals::of(function, readonly.len());
    let class = |local: &LocalVariable| {
        classes
            .get(local.ty.index())
            .copied()
            .unwrap_or(Class::Opaque)
    };
    let calls = function
        .body
        .walk()
        .any(|statement| matches!(*statement, Statement::Call { .. }));
    let global_class = |ty: Handle<Type>| classes.get(ty.index()).copied().unwrap_or(Class::Opaque);
    let mut tracked: Vec<bool> = function
        .local_variables
        .iter()
        .zip(&locals.locals)
        .map(|((_, variable), usage)| !usage.escaped && class(variable) != Class::Opaque)
        .collect();
    let mut references: Vec<bool> = function
        .local_variables
        .iter()
        .map(|(_, variable)| class(variable) == Class::References)
        .collect();
    let mut slot_types: Vec<Handle<Type>> = function
        .local_variables
        .iter()
        .map(|(_, variable)| variable.ty)
        .collect();
    for ((usage, &output), &ty) in locals.globals.iter().zip(outputs).zip(global_types) {
        tracked.push(output && !calls && !usage.escaped && global_class(ty) == Class::Plain);
        references.push(false);
        slot_types.push(ty);
    }
    let loaded = |usage: &Usage| usage.whole_loads + usage.partial_loads;
    if locals
        .locals
        .iter()
        .chain(&locals.globals)
        .zip(&tracked)
        .all(|(usage, &tracked)| !tracked || (loaded(usage) == 0 && usage.stores.len() < 2))
        && locals
            .globals
            .iter()
            .zip(readonly)
            .all(|(usage, &readonly)| !readonly || loaded(usage) < 2)
    {
        return Ok(None);
    }
    let Some(plan) = Scan::run(
        types,
        function,
        &locals,
        Tracked {
            locals: function.local_variables.len(),
            tracked: &tracked,
            references: &references,
            types: &slot_types,
        },
        readonly,
        keep_stores,
    )?
    else {
        return Ok(None);
    };
    let mut rebuild = Rebuild::new(function);
    rebuild.body(&mut Apply { plan: &plan, types }, locals.statements())?;
    for &(local, value) in &plan.inits {
        let value = rebuild.value(value)?;
        rebuild
            .out
            .local_variables
            .try_get_mut(local)
            .map_err(|error| error.to_string())?
            .init = Some(value);
    }
    Ok(Some(rebuild.finish()))
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Replace {
    Keep,
    Value(Handle<Expression>),
    Path {
        value: Handle<Expression>,
        pointer: Handle<Expression>,
        skip: bool,
    },
    Compose {
        ty: Handle<Type>,
        parts: Parts,
    },
}

const PARTS: usize = 4;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
struct Parts {
    base: Option<Handle<Expression>>,
    parts: [Option<Handle<Expression>>; PARTS],
    count: u8,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Known {
    Whole(Handle<Expression>),
    Parts(Parts),
}

const EXTRACTS: usize = 3;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Scope {
    Never,
    Always,
    Block { id: u32, position: u32 },
}

#[derive(Debug, Clone, Copy)]
struct Record {
    known: Known,
    position: u32,
    region: u32,
}

#[derive(Debug, Clone, Copy)]
struct Pending {
    position: u32,
    region: u32,
    loop_region: u32,
    epoch: u32,
    exits: u32,
    observable: bool,
}

#[derive(Debug, Clone, Copy)]
struct Loop {
    start: u32,
    end: u32,
}

struct Plan {
    replace: Vec<Replace>,
    dead: Vec<bool>,
    inits: Vec<(Handle<LocalVariable>, Handle<Expression>)>,
}

#[derive(Clone, Copy)]
struct Tracked<'a> {
    locals: usize,
    tracked: &'a [bool],
    references: &'a [bool],
    types: &'a [Handle<Type>],
}

struct Scan<'a> {
    function: &'a Function,
    handles: Vec<Handle<LocalVariable>>,
    counts: Vec<u8>,
    locals: &'a Locals,
    readonly: &'a [bool],
    tracked: Tracked<'a>,
    keep_stores: bool,
    reads: BTreeMap<(usize, Vec<u32>), Handle<Expression>>,
    plan: Plan,
    scope: Vec<Scope>,
    active: Vec<bool>,
    reached: Vec<u32>,
    continues: Vec<u32>,
    block: u32,
    region: u32,
    loop_region: u32,
    loops: Vec<Loop>,
    known: Vec<Option<Record>>,
    pending: Vec<Option<Pending>>,
    touched: Vec<bool>,
    epoch: u32,
    exits: u32,
    changed: bool,
    twice: bool,
}

const ROOT: u32 = 0;

impl<'a> Scan<'a> {
    fn run(
        types: &'a UniqueArena<Type>,
        function: &'a Function,
        locals: &'a Locals,
        tracked: Tracked<'a>,
        readonly: &'a [bool],
        keep_stores: bool,
    ) -> Result<Option<Plan>, String> {
        let count = tracked.tracked.len();
        let mut scan = Self {
            function,
            handles: function
                .local_variables
                .iter()
                .map(|(handle, _)| handle)
                .collect(),
            counts: tracked
                .types
                .iter()
                .map(|&ty| {
                    elements(types, ty)
                        .filter(|&count| count <= PARTS)
                        .and_then(|count| u8::try_from(count).ok())
                        .unwrap_or(0)
                })
                .collect(),
            locals,
            readonly,
            tracked,
            keep_stores,
            reads: BTreeMap::new(),
            plan: Plan {
                replace: vec![Replace::Keep; function.expressions.len()],
                dead: vec![false; locals.statements() as usize],
                inits: Vec::new(),
            },
            scope: function
                .expressions
                .iter()
                .map(|(_, expression)| {
                    if expression.needs_pre_emit() {
                        Scope::Always
                    } else {
                        Scope::Never
                    }
                })
                .collect(),
            active: vec![true],
            reached: vec![0],
            continues: Vec::new(),
            block: ROOT,
            region: ROOT,
            loop_region: ROOT,
            loops: Vec::new(),
            known: vec![None; count],
            pending: vec![None; count],
            touched: vec![false; count],
            epoch: 0,
            exits: 0,
            changed: false,
            twice: false,
        };
        for (handle, local) in function.local_variables.iter() {
            if let Some(init) = local.init
                && scan.tracked(handle.index())
                && scan.scope(init) == Scope::Always
                && let Some(slot) = scan.known.get_mut(handle.index())
            {
                *slot = Some(Record {
                    known: Known::Whole(init),
                    position: 0,
                    region: ROOT,
                });
            }
        }
        let mut position = FIRST;
        scan.block(&function.body, &mut position)?;
        let unread: Vec<u32> = scan
            .pending
            .iter()
            .flatten()
            .filter(|pending| pending.loop_region == ROOT && !pending.observable)
            .map(|pending| pending.position)
            .collect();
        for position in unread {
            scan.mark_dead(position);
        }
        if scan.twice || !scan.changed {
            return Ok(None);
        }
        Ok(Some(scan.plan))
    }

    fn slot(&self, root: Root) -> Option<usize> {
        let slot = match root {
            Root::Local(local) => local.index(),
            Root::Global(global) => self.tracked.locals.checked_add(global.index())?,
        };
        self.tracked(slot).then_some(slot)
    }

    fn observable(&self, slot: usize) -> bool {
        slot >= self.tracked.locals
    }

    fn usage(&self, slot: usize) -> Option<&Usage> {
        match slot.checked_sub(self.tracked.locals) {
            Some(global) => self.locals.globals.get(global),
            None => self.locals.locals.get(slot),
        }
    }

    fn tracked(&self, local: usize) -> bool {
        self.tracked.tracked.get(local) == Some(&true)
    }

    fn references(&self, local: usize) -> bool {
        self.tracked.references.get(local) != Some(&false)
    }

    fn scope(&self, handle: Handle<Expression>) -> Scope {
        self.scope
            .get(handle.index())
            .copied()
            .unwrap_or(Scope::Never)
    }

    fn is_active(&self, id: u32) -> bool {
        self.active.get(id as usize) == Some(&true)
    }

    fn reaches(&self, id: u32, position: u32) -> bool {
        self.is_active(id)
            || self
                .reached
                .get(id as usize)
                .is_some_and(|&reached| position < reached)
    }

    fn visible(&self, handle: Handle<Expression>) -> bool {
        match self.scope(handle) {
            Scope::Always => true,
            Scope::Never => false,
            Scope::Block { id, position } => self.reaches(id, position),
        }
    }

    fn canonical(&self, handle: Handle<Expression>) -> Handle<Expression> {
        match self.plan.replace.get(handle.index()) {
            Some(&Replace::Value(value)) => value,
            _ => handle,
        }
    }

    fn stored_in_later_loop(&self, local: usize, after: u32) -> bool {
        let first = self.loops.partition_point(|entered| entered.start <= after);
        let Some(entered) = self.loops.get(first) else {
            return false;
        };
        let Some(usage) = self.usage(local) else {
            return true;
        };
        let at = usage
            .stores
            .partition_point(|&position| position < entered.start);
        usage
            .stores
            .get(at)
            .is_some_and(|&position| position < entered.end)
    }

    fn known(&self, local: usize) -> Option<Known> {
        let record = self.known.get(local).copied().flatten()?;
        (self.reaches(record.region, record.position)
            && !self.stored_in_later_loop(local, record.position))
        .then_some(record.known)
    }

    fn part(&self, parts: &Parts, index: u32) -> Option<Handle<Expression>> {
        parts
            .parts
            .get(index as usize)
            .copied()
            .flatten()
            .filter(|&part| self.visible(part))
    }

    fn composable(&self, parts: &Parts) -> bool {
        let base = parts.base.filter(|&base| self.visible(base));
        let free = base.is_some_and(|base| {
            matches!(
                self.function.expressions.try_get(base),
                Ok(Expression::Compose { components, .. })
                    if components.len() == usize::from(parts.count)
            )
        });
        let mut extracts = 0;
        for index in 0..u32::from(parts.count) {
            if self.part(parts, index).is_some() {
                continue;
            }
            if base.is_none() {
                return false;
            }
            if !free {
                extracts += 1;
            }
        }
        extracts <= EXTRACTS
    }

    fn forwarded(
        &self,
        local: usize,
        pointer: Handle<Expression>,
        whole: bool,
        constant: bool,
    ) -> Result<Option<Replace>, String> {
        let Some(known) = self.known(local) else {
            return Ok(None);
        };
        if self.references(local) {
            return Ok(match known {
                Known::Whole(value)
                    if whole
                        && self.visible(value)
                        && !matches!(
                            self.function.expressions.try_get(value),
                            Ok(Expression::Access { .. } | Expression::AccessIndex { .. })
                        ) =>
                {
                    Some(Replace::Value(value))
                }
                _ => None,
            });
        }
        Ok(match known {
            Known::Whole(value) if !self.visible(value) => None,
            Known::Whole(value) if whole => Some(Replace::Value(value)),
            Known::Whole(value) if constant => Some(Replace::Path {
                value,
                pointer,
                skip: false,
            }),
            Known::Whole(_) => None,
            Known::Parts(parts) if whole => self
                .composable(&parts)
                .then(|| self.tracked.types.get(local).copied())
                .flatten()
                .map(|ty| Replace::Compose { ty, parts }),
            Known::Parts(parts) if constant => {
                let indices = path(&self.function.expressions, pointer)?;
                let Some(&first) = indices.last() else {
                    return Ok(None);
                };
                if let Some(part) = self.part(&parts, first) {
                    Some(if indices.len() == 1 {
                        Replace::Value(part)
                    } else {
                        Replace::Path {
                            value: part,
                            pointer,
                            skip: true,
                        }
                    })
                } else {
                    parts
                        .base
                        .filter(|&base| self.visible(base))
                        .map(|value| Replace::Path {
                            value,
                            pointer,
                            skip: false,
                        })
                }
            }
            Known::Parts(_) => None,
        })
    }

    fn set_known(&mut self, local: usize, record: Option<Record>) {
        if let Some(slot) = self.known.get_mut(local) {
            *slot = record;
        }
    }

    fn set_pending(&mut self, local: usize, pending: Option<Pending>) {
        if let Some(slot) = self.pending.get_mut(local) {
            *slot = pending;
        }
    }

    fn touch(&mut self, local: usize) -> bool {
        self.touched
            .get_mut(local)
            .is_some_and(|slot| core::mem::replace(slot, true))
    }

    fn replace(&mut self, handle: Handle<Expression>, replace: Replace) {
        if let Some(slot) = self.plan.replace.get_mut(handle.index()) {
            *slot = replace;
            self.changed = true;
        }
    }

    fn set_reached(&mut self, id: u32, position: u32) {
        if let Some(slot) = self.reached.get_mut(id as usize) {
            *slot = position;
        }
    }

    fn mark_dead(&mut self, position: u32) {
        if self.keep_stores {
            return;
        }
        if let Some(slot) = self.plan.dead.get_mut(position as usize) {
            *slot = true;
            self.changed = true;
        }
    }

    fn enter(&mut self, region: bool) -> (u32, u32) {
        let id = u32::try_from(self.active.len()).unwrap_or(u32::MAX);
        self.active.push(true);
        self.reached.push(0);
        let saved = (self.block, self.region);
        self.block = id;
        if region {
            self.region = id;
        }
        saved
    }

    fn leave(&mut self, saved: (u32, u32)) {
        if let Some(slot) = self.active.get_mut(self.block as usize) {
            *slot = false;
        }
        (self.block, self.region) = saved;
    }

    fn region(&mut self, block: &Block, position: &mut u32) -> Result<(), String> {
        let saved = self.enter(true);
        recurse(|| self.block(block, position))?;
        self.leave(saved);
        Ok(())
    }

    fn loop_region(&mut self, block: &Block, position: &mut u32) -> Result<u32, String> {
        let saved = self.loop_region;
        let id = u32::try_from(self.active.len()).unwrap_or(u32::MAX);
        self.loop_region = id;
        self.region(block, position)?;
        self.loop_region = saved;
        Ok(id)
    }

    fn block(&mut self, block: &Block, position: &mut u32) -> Result<(), String> {
        for statement in block.iter() {
            let at = *position;
            *position += 1;
            match *statement {
                Statement::Emit(ref range) => {
                    for handle in range.clone() {
                        self.emitted(handle, at)?;
                    }
                }
                Statement::Store { pointer, value } => self.store(pointer, value, at),
                Statement::Block(ref inner) => {
                    let saved = self.enter(false);
                    recurse(|| self.block(inner, position))?;
                    self.leave(saved);
                }
                Statement::If {
                    ref accept,
                    ref reject,
                    ..
                } => {
                    self.region(accept, position)?;
                    self.region(reject, position)?;
                }
                Statement::Switch { ref cases, .. } => {
                    for SwitchCase { body, .. } in cases {
                        self.region(body, position)?;
                    }
                }
                Statement::Loop {
                    ref body,
                    ref continuing,
                    ..
                } => {
                    self.loops.push(Loop {
                        start: at,
                        end: self.locals.end(at),
                    });
                    self.continues.push(u32::MAX);
                    let body = self.loop_region(body, position)?;
                    let first_continue = self.continues.pop().unwrap_or(0);
                    self.set_reached(body, first_continue);
                    self.loop_region(continuing, position)?;
                    self.set_reached(body, 0);
                    self.loops.pop();
                }
                Statement::Break => self.epoch += 1,
                Statement::Return { .. } => self.exits += 1,
                Statement::Continue => {
                    self.epoch += 1;
                    if let Some(first) = self.continues.last_mut() {
                        *first = (*first).min(at);
                    }
                }
                ref other => {
                    let scope = Scope::Block {
                        id: self.block,
                        position: at,
                    };
                    let mut results = Vec::new();
                    for_each_result(other, |result| results.push(result));
                    for result in results {
                        if let Some(slot) = self.scope.get_mut(result.index()) {
                            *slot = scope;
                        }
                    }
                }
            }
        }
        Ok(())
    }

    fn emitted(&mut self, handle: Handle<Expression>, at: u32) -> Result<(), String> {
        let slot = self
            .scope
            .get_mut(handle.index())
            .ok_or_else(|| format!("expression {handle:?} is out of range"))?;
        if *slot != Scope::Never {
            self.twice = true;
        }
        *slot = Scope::Block {
            id: self.block,
            position: at,
        };
        let expression = self
            .function
            .expressions
            .try_get(handle)
            .map_err(|error| error.to_string())?;
        let Expression::Load { pointer } = *expression else {
            return Ok(());
        };
        let Some(target) = self.locals.pointer(pointer) else {
            return Ok(());
        };
        if let Root::Global(global) = target.root
            && self.readonly.get(global.index()) == Some(&true)
        {
            if target.constant {
                self.read_only(handle, global, pointer)?;
            }
            return Ok(());
        }
        let Some(local) = self.slot(target.root) else {
            return Ok(());
        };
        if !self.tracked(local) {
            return Ok(());
        }
        self.touch(local);
        if let Some(replace) = self.forwarded(local, pointer, target.whole, target.constant)? {
            self.replace(handle, replace);
            return Ok(());
        }
        self.set_pending(local, None);
        if target.whole {
            self.set_known(
                local,
                Some(Record {
                    known: Known::Whole(handle),
                    position: at,
                    region: self.region,
                }),
            );
        }
        Ok(())
    }

    fn read_only(
        &mut self,
        handle: Handle<Expression>,
        global: Handle<GlobalVariable>,
        pointer: Handle<Expression>,
    ) -> Result<(), String> {
        let key = (global.index(), path(&self.function.expressions, pointer)?);
        if let Some(&earlier) = self.reads.get(&key)
            && self.visible(earlier)
        {
            if self.function.precision.get(&earlier) == self.function.precision.get(&handle) {
                self.replace(handle, Replace::Value(earlier));
            }
            return Ok(());
        }
        self.reads.insert(key, handle);
        Ok(())
    }

    fn store(&mut self, pointer: Handle<Expression>, value: Handle<Expression>, at: u32) {
        let Some(target) = self.locals.pointer(pointer) else {
            return;
        };
        let Some(local) = self.slot(target.root) else {
            return;
        };
        if !self.tracked(local) {
            return;
        }
        let touched = self.touch(local);
        let observable = self.observable(local);
        if target.whole
            && let Some(pending) = self.pending.get(local).copied().flatten()
            && pending.epoch == self.epoch
            && (!observable || pending.exits == self.exits)
            && self.region <= pending.region
            && self.is_active(pending.loop_region)
        {
            self.mark_dead(pending.position);
        }
        let pending = Pending {
            position: at,
            region: self.region,
            loop_region: self.loop_region,
            epoch: self.epoch,
            exits: self.exits,
            observable,
        };
        if !target.whole {
            let parts = self.partial(local, pointer, value);
            self.set_known(
                local,
                parts.map(|parts| Record {
                    known: Known::Parts(parts),
                    position: at,
                    region: self.region,
                }),
            );
            self.set_pending(local, Some(pending));
            return;
        }
        let value = self.canonical(value);
        if !observable
            && !touched
            && !self.keep_stores
            && self.region == ROOT
            && let Some(handle) = self.initializer(local, value)
        {
            self.plan.inits.push((handle, value));
            self.mark_dead(at);
            self.set_pending(local, None);
        } else {
            self.set_pending(local, Some(pending));
        }
        self.set_known(
            local,
            Some(Record {
                known: Known::Whole(value),
                position: at,
                region: self.region,
            }),
        );
    }

    fn partial(
        &self,
        local: usize,
        pointer: Handle<Expression>,
        value: Handle<Expression>,
    ) -> Option<Parts> {
        if self.references(local) {
            return None;
        }
        let count = self.counts.get(local).copied().filter(|&count| count > 0)?;
        let Ok(&Expression::AccessIndex { base, index }) =
            self.function.expressions.try_get(pointer)
        else {
            return None;
        };
        if !self.locals.pointer(base).is_some_and(|target| target.whole)
            || index >= u32::from(count)
        {
            return None;
        }
        let mut parts = match self.known(local) {
            Some(Known::Whole(base)) => Parts {
                base: Some(base),
                parts: [None; PARTS],
                count,
            },
            Some(Known::Parts(parts)) => parts,
            None => Parts {
                base: None,
                parts: [None; PARTS],
                count,
            },
        };
        let slot = parts.parts.get_mut(index as usize)?;
        *slot = Some(self.canonical(value));
        Some(parts)
    }

    fn initializer(&self, slot: usize, value: Handle<Expression>) -> Option<Handle<LocalVariable>> {
        let handle = self.handles.get(slot).copied()?;
        let variable = self.function.local_variables.try_get(handle).ok()?;
        (variable.init.is_none()
            && self.function.expressions.try_get(value).is_ok_and(|value| {
                matches!(
                    *value,
                    Expression::Literal(_) | Expression::Constant(_) | Expression::ZeroValue(_)
                )
            }))
        .then_some(handle)
    }
}

struct Apply<'p> {
    plan: &'p Plan,
    types: &'p UniqueArena<Type>,
}

impl Policy for Apply<'_> {
    fn expression(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        block: &mut Block,
    ) -> Result<bool, String> {
        match self.plan.replace.get(handle.index()).copied() {
            None | Some(Replace::Keep) => Ok(false),
            Some(Replace::Value(value)) => {
                let new = rebuild.value(value)?;
                rebuild.share_non_uniform(handle, new)?;
                rebuild.set(handle, new)?;
                Ok(true)
            }
            Some(Replace::Path {
                value,
                pointer,
                skip,
            }) => {
                let mut indices = path(&rebuild.source.expressions, pointer)?;
                if skip {
                    indices.pop();
                }
                let span = rebuild.span(handle);
                let fresh = rebuild.out.expressions.len();
                let mut base = rebuild.value(value)?;
                for index in indices.into_iter().rev() {
                    base = rebuild.extract(self.types, base, index, span, block);
                }
                if base.index() >= fresh {
                    rebuild.carry(handle, base);
                } else {
                    rebuild.share_non_uniform(handle, base)?;
                }
                rebuild.set(handle, base)?;
                Ok(true)
            }
            Some(Replace::Compose { ty, parts }) => {
                let span = rebuild.span(handle);
                let mut components = Vec::with_capacity(usize::from(parts.count));
                for index in 0..parts.count {
                    let component = match parts.parts.get(usize::from(index)).copied().flatten() {
                        Some(part) => rebuild.value(part)?,
                        None => {
                            let base = parts.base.ok_or("a composed value lacks a part")?;
                            let base = rebuild.value(base)?;
                            rebuild.extract(self.types, base, u32::from(index), span, block)
                        }
                    };
                    components.push(component);
                }
                let compose = rebuild.emit(Expression::Compose { ty, components }, span, block);
                rebuild.carry(handle, compose);
                rebuild.set(handle, compose)?;
                Ok(true)
            }
        }
    }

    fn statement(
        &mut self,
        _: &mut Rebuild<'_>,
        _: &Statement,
        _: Span,
        position: u32,
        _: &mut Block,
    ) -> Result<bool, String> {
        Ok(self.plan.dead.get(position as usize) == Some(&true))
    }
}

fn path(expressions: &Arena<Expression>, pointer: Handle<Expression>) -> Result<Vec<u32>, String> {
    let mut indices = Vec::new();
    let mut current = pointer;
    loop {
        match *expressions
            .try_get(current)
            .map_err(|error| error.to_string())?
        {
            Expression::AccessIndex { base, index } => {
                indices.push(index);
                current = base;
            }
            Expression::LocalVariable(_) | Expression::GlobalVariable(_) => return Ok(indices),
            ref other => return Err(format!("{other:?} in a constant access path")),
        }
    }
}
