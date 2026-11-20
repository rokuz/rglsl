use alloc::{vec, vec::Vec};

use rglsl_types::stack::recurse;
use spirv::Word;

use super::{Block, BlockContext, Error, Instruction};
use crate::arena::Handle;
use crate::{Expression, FastHashMap, Function, LocalVariable, Statement};

const NONE: u32 = u32::MAX;

fn address(block: &crate::Block) -> usize {
    core::ptr::from_ref(block).addr()
}

fn index(value: usize) -> u32 {
    u32::try_from(value).unwrap_or(NONE)
}

#[derive(Clone, Copy)]
struct Interval {
    start: u32,
    end: u32,
}

impl Interval {
    const fn contains(self, node: u32) -> bool {
        self.start <= node && node < self.end
    }
}

struct LoopRecord {
    parent: u32,
    nodes: Interval,
    outer: u32,
    body: usize,
}

struct Walk<'f> {
    function: &'f Function,
    roots: &'f [u32],
    nodes: FastHashMap<usize, u32>,
    parents: Vec<u32>,
    ends: Vec<u32>,
    links: Vec<u32>,
    innermost_loop: Vec<u32>,
    loops: Vec<LoopRecord>,
    current_loop: u32,
    homes: Vec<u32>,
    sites: Vec<(u32, u32)>,
    rejected: Vec<bool>,
    fallthrough: usize,
}

impl Walk<'_> {
    fn find(&mut self, node: u32) -> u32 {
        let mut root = node;
        while let Some(&link) = self.links.get(root as usize)
            && link != root
        {
            root = link;
        }
        let mut current = node;
        while let Some(link) = self.links.get_mut(current as usize)
            && *link != root
        {
            current = core::mem::replace(link, root);
        }
        root
    }

    fn access(&mut self, local: u32, node: u32) {
        let Some(&home) = self.homes.get(local as usize) else {
            return;
        };
        let found = if home == NONE { node } else { self.find(home) };
        if let Some(slot) = self.homes.get_mut(local as usize) {
            *slot = found;
        }
    }

    fn root(&self, pointer: Handle<Expression>) -> u32 {
        self.roots.get(pointer.index()).copied().unwrap_or(NONE)
    }

    fn block(&mut self, block: &crate::Block, parent: u32) {
        let node = index(self.parents.len());
        self.nodes.insert(address(block), node);
        self.parents.push(parent);
        self.ends.push(node);
        self.links.push(node);
        self.innermost_loop.push(self.current_loop);
        for statement in block.iter() {
            self.statement(statement, node);
        }
        let end = index(self.parents.len());
        if let Some(slot) = self.ends.get_mut(node as usize) {
            *slot = end;
        }
        if parent != NONE
            && let Some(link) = self.links.get_mut(node as usize)
        {
            *link = parent;
        }
    }

    fn statement(&mut self, statement: &Statement, node: u32) {
        match *statement {
            Statement::Emit(ref range) => {
                for handle in range.clone() {
                    if let Ok(&Expression::Load { pointer }) =
                        self.function.expressions.try_get(handle)
                    {
                        let local = self.root(pointer);
                        if local != NONE {
                            self.access(local, node);
                        }
                    }
                }
            }
            Statement::Store { pointer, .. } => {
                let local = self.root(pointer);
                if local != NONE {
                    self.access(local, node);
                    self.sites.push((local, node));
                    if self.fallthrough > 0
                        && let Some(slot) = self.rejected.get_mut(local as usize)
                    {
                        *slot = true;
                    }
                }
            }
            Statement::Block(ref block) => recurse(|| self.block(block, node)),
            Statement::If {
                ref accept,
                ref reject,
                ..
            } => recurse(|| {
                self.block(accept, node);
                self.block(reject, node);
            }),
            Statement::Switch { ref cases, .. } => recurse(|| {
                for case in cases {
                    let falls = case.fall_through && !case.body.is_empty();
                    self.fallthrough += usize::from(falls);
                    self.block(&case.body, node);
                    self.fallthrough -= usize::from(falls);
                }
            }),
            Statement::Loop {
                ref body,
                ref continuing,
                ..
            } => {
                let record = index(self.loops.len());
                let start = index(self.parents.len());
                self.loops.push(LoopRecord {
                    parent: node,
                    nodes: Interval { start, end: start },
                    outer: self.current_loop,
                    body: address(body),
                });
                self.current_loop = record;
                recurse(|| {
                    self.block(body, node);
                    self.block(continuing, node);
                });
                let end = index(self.parents.len());
                if let Some(entry) = self.loops.get_mut(record as usize) {
                    entry.nodes.end = end;
                    self.current_loop = entry.outer;
                }
            }
            _ => {}
        }
    }
}

fn roots(function: &Function, candidates: &[bool]) -> Vec<u32> {
    let mut roots = vec![NONE; function.expressions.len()];
    for (handle, expression) in function.expressions.iter() {
        let root = match *expression {
            Expression::LocalVariable(local)
                if candidates.get(local.index()).copied().unwrap_or(false) =>
            {
                index(local.index())
            }
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                roots.get(base.index()).copied().unwrap_or(NONE)
            }
            _ => NONE,
        };
        if let Some(slot) = roots.get_mut(handle.index()) {
            *slot = root;
        }
    }
    roots
}

fn escaping(function: &Function, roots: &[u32]) -> Vec<bool> {
    let mut rejected = vec![false; function.local_variables.len()];
    let root = |handle: Handle<Expression>| roots.get(handle.index()).copied().unwrap_or(NONE);
    let reject = |rejected: &mut Vec<bool>, local: u32| {
        if let Some(slot) = rejected.get_mut(local as usize) {
            *slot = true;
        }
    };
    for (_, expression) in function.expressions.iter() {
        let allowed = match *expression {
            Expression::Load { pointer } => Some(pointer),
            Expression::AccessIndex { base, .. } => Some(base),
            _ => None,
        };
        expression.for_each_operand(|operand| {
            let local = root(operand);
            if local != NONE && allowed != Some(operand) {
                reject(&mut rejected, local);
            }
        });
    }
    for statement in function.body.walk() {
        let allowed = match *statement {
            Statement::Store { pointer, value } if pointer != value => Some(pointer),
            _ => None,
        };
        statement.for_each_operand(|operand| {
            let local = root(operand);
            if local != NONE && allowed != Some(operand) {
                reject(&mut rejected, local);
            }
        });
    }
    rejected
}

struct Frame {
    target: Word,
    position: u32,
    opened: u64,
    mark: usize,
    slots: Vec<u32>,
    edges: Vec<Edge>,
}

struct Edge {
    from: Word,
    values: Vec<Word>,
}

struct Header {
    slots: Vec<u32>,
    block: usize,
    edges: Vec<Edge>,
}

#[derive(Default)]
pub(super) struct Ssa {
    slots: Vec<u32>,
    pointers: Vec<u32>,
    locals: Vec<Handle<LocalVariable>>,
    homes: Vec<Interval>,
    nodes: FastHashMap<usize, u32>,
    loop_slots: FastHashMap<usize, Vec<u32>>,
    values: Vec<Word>,
    types: Vec<Word>,
    journal: Vec<(u32, Word)>,
    stamps: Vec<u64>,
    seq: u64,
    frames: Vec<Frame>,
    targets: FastHashMap<Word, usize>,
    headers: FastHashMap<Word, Header>,
    node: u32,
}

impl Ssa {
    pub(super) fn new(function: &Function, candidates: &[bool], observed: &[bool]) -> Self {
        if !candidates.iter().any(|&candidate| candidate) {
            return Self::default();
        }
        let roots = roots(function, candidates);
        let mut walk = Walk {
            function,
            roots: &roots,
            nodes: FastHashMap::default(),
            parents: Vec::new(),
            ends: Vec::new(),
            links: Vec::new(),
            innermost_loop: Vec::new(),
            loops: Vec::new(),
            current_loop: NONE,
            homes: vec![NONE; function.local_variables.len()],
            sites: Vec::new(),
            rejected: escaping(function, &roots),
            fallthrough: 0,
        };
        walk.block(&function.body, NONE);
        let total = index(walk.parents.len());
        let mut ssa = Self {
            slots: vec![NONE; function.local_variables.len()],
            ..Self::default()
        };
        for (handle, local) in function.local_variables.iter() {
            let at = handle.index();
            if !candidates.get(at).copied().unwrap_or(false)
                || walk.rejected.get(at).copied().unwrap_or(true)
            {
                continue;
            }
            let home = walk.homes.get(at).copied().unwrap_or(NONE);
            let whole =
                local.init.is_some() || observed.get(at).copied().unwrap_or(true) || home == NONE;
            let interval = if whole {
                Interval {
                    start: 0,
                    end: total,
                }
            } else {
                Interval {
                    start: home,
                    end: walk.ends.get(home as usize).copied().unwrap_or(total),
                }
            };
            if let Some(slot) = ssa.slots.get_mut(at) {
                *slot = index(ssa.locals.len());
            }
            ssa.locals.push(handle);
            ssa.homes.push(interval);
        }
        if ssa.locals.is_empty() {
            return Self::default();
        }
        ssa.pointers = roots
            .iter()
            .map(|&local| {
                if local == NONE {
                    NONE
                } else {
                    ssa.slots.get(local as usize).copied().unwrap_or(NONE)
                }
            })
            .collect();
        ssa.loop_headers(&walk);
        ssa.nodes = walk.nodes;
        ssa.values = vec![0; ssa.locals.len()];
        ssa.types = vec![0; ssa.locals.len()];
        ssa.stamps = vec![0; ssa.locals.len()];
        ssa
    }

    fn loop_headers(&mut self, walk: &Walk<'_>) {
        let mut last = vec![NONE; self.locals.len()];
        let mut lists: Vec<Vec<u32>> = Vec::new();
        lists.resize_with(walk.loops.len(), Vec::new);
        for &(local, node) in &walk.sites {
            let slot = self.slots.get(local as usize).copied().unwrap_or(NONE);
            let (Some(&home), Some(previous)) =
                (self.homes.get(slot as usize), last.get_mut(slot as usize))
            else {
                continue;
            };
            let mut current = walk
                .innermost_loop
                .get(node as usize)
                .copied()
                .unwrap_or(NONE);
            while let Some(record) = walk.loops.get(current as usize) {
                if !home.contains(record.parent)
                    || (*previous != NONE && record.nodes.contains(*previous))
                {
                    break;
                }
                if let Some(list) = lists.get_mut(current as usize) {
                    list.push(slot);
                }
                current = record.outer;
            }
            *previous = node;
        }
        for (record, list) in walk.loops.iter().zip(lists) {
            if !list.is_empty() {
                self.loop_slots.insert(record.body, list);
            }
        }
    }

    pub(super) const fn is_active(&self) -> bool {
        !self.locals.is_empty()
    }

    pub(super) fn promotes(&self, local: Handle<LocalVariable>) -> bool {
        self.slots
            .get(local.index())
            .is_some_and(|&slot| slot != NONE)
    }

    pub(super) fn pointer_slot(&self, expression: Handle<Expression>) -> Option<u32> {
        self.pointers
            .get(expression.index())
            .copied()
            .filter(|&slot| slot != NONE)
    }

    pub(super) fn set_initial(&mut self, local: Handle<LocalVariable>, value: Word) {
        if let Some(&slot) = self.slots.get(local.index())
            && let Some(entry) = self.values.get_mut(slot as usize)
        {
            *entry = value;
        }
    }

    pub(super) fn enter(&mut self, block: &crate::Block) -> u32 {
        let previous = self.node;
        if let Some(&node) = self.nodes.get(&address(block)) {
            self.node = node;
        }
        previous
    }

    pub(super) const fn leave(&mut self, previous: u32) {
        self.node = previous;
    }

    pub(super) fn node_of(&self, block: &crate::Block) -> u32 {
        self.nodes.get(&address(block)).copied().unwrap_or(NONE)
    }

    pub(super) const fn node(&self) -> u32 {
        self.node
    }

    fn value(&self, slot: u32) -> Word {
        self.values.get(slot as usize).copied().unwrap_or(0)
    }

    fn define(&mut self, slot: u32, id: Word) {
        let Some(entry) = self.values.get_mut(slot as usize) else {
            return;
        };
        self.journal.push((slot, core::mem::replace(entry, id)));
        self.seq += 1;
        let stamp = self.stamps.get(slot as usize).copied().unwrap_or(0);
        let home = self.homes.get(slot as usize).copied();
        for frame in self.frames.iter_mut().rev() {
            if stamp > frame.opened || !home.is_some_and(|home| home.contains(frame.position)) {
                break;
            }
            frame.slots.push(slot);
        }
        if let Some(entry) = self.stamps.get_mut(slot as usize) {
            *entry = self.seq;
        }
    }

    fn rollback(&mut self, mark: usize) {
        while self.journal.len() > mark {
            let Some((slot, previous)) = self.journal.pop() else {
                break;
            };
            if let Some(entry) = self.values.get_mut(slot as usize) {
                *entry = previous;
            }
        }
    }

    pub(super) fn open(&mut self, target: Word, position: u32) {
        if !self.is_active() {
            return;
        }
        self.targets.insert(target, self.frames.len());
        self.frames.push(Frame {
            target,
            position,
            opened: self.seq,
            mark: self.journal.len(),
            slots: Vec::new(),
            edges: Vec::new(),
        });
    }

    pub(super) fn restart(&mut self) {
        if let Some(mark) = self.frames.last().map(|frame| frame.mark) {
            self.rollback(mark);
        }
    }

    fn capture(slots: &[u32], values: &[Word]) -> Vec<Word> {
        slots
            .iter()
            .map(|&slot| values.get(slot as usize).copied().unwrap_or(0))
            .collect()
    }

    fn record(&mut self, from: Word, target: Word) {
        if let Some(frame) = self
            .targets
            .get(&target)
            .and_then(|&at| self.frames.get_mut(at))
            && frame.edges.last().is_none_or(|edge| edge.from != from)
        {
            let values = Self::capture(&frame.slots, &self.values);
            frame.edges.push(Edge { from, values });
        }
        if let Some(header) = self.headers.get_mut(&target)
            && header.edges.last().is_none_or(|edge| edge.from != from)
        {
            let values = Self::capture(&header.slots, &self.values);
            header.edges.push(Edge { from, values });
        }
    }

    fn close(&mut self, label: Word) -> Option<Frame> {
        if self.frames.last()?.target != label {
            return None;
        }
        let frame = self.frames.pop()?;
        self.targets.remove(&label);
        self.rollback(frame.mark);
        Some(frame)
    }

    pub(super) fn is_balanced(&self) -> bool {
        self.frames.is_empty() && self.headers.is_empty()
    }
}

fn targets(instruction: &Instruction) -> Vec<Word> {
    let operands: &[Word] = &instruction.operands;
    if instruction.op == spirv::Op::Branch as u32 {
        operands.first().copied().into_iter().collect()
    } else if instruction.op == spirv::Op::BranchConditional as u32 {
        operands.get(1..3).unwrap_or_default().to_vec()
    } else if instruction.op == spirv::Op::Switch as u32 {
        operands.iter().skip(1).step_by(2).copied().collect()
    } else {
        Vec::new()
    }
}

impl BlockContext<'_> {
    pub(super) fn promote_locals(&mut self) -> Result<(), Error> {
        let function = self.ir_function;
        if !function.local_variables.iter().any(|(_, local)| local.ssa) {
            return Ok(());
        }
        let mut candidates = Vec::with_capacity(function.local_variables.len());
        for (_, local) in function.local_variables.iter() {
            let plain = self
                .writer
                .nullable_types
                .get(local.ty.index())
                .copied()
                .unwrap_or(false);
            let candidate = local.ssa && plain && {
                let type_id = self.get_handle_type_id(local.ty)?;
                !self
                    .writer
                    .needs_layout_conversion(type_id, spirv::StorageClass::Function)
            };
            candidates.push(candidate);
        }
        let observed =
            super::uninitialized::initial_value_observed(function, &self.writer.nullable_types);
        self.ssa = Ssa::new(function, &candidates, &observed);
        for (handle, local) in function.local_variables.iter() {
            if let Some(init) = local.init
                && self.ssa.promotes(handle)
            {
                let value = self.cached.get(init)?;
                self.ssa.set_initial(handle, value);
            }
        }
        Ok(())
    }

    pub(super) fn consume(&mut self, block: Block, termination: Instruction) {
        if self.ssa.is_active() {
            for target in targets(&termination) {
                self.ssa.record(block.label_id, target);
            }
        }
        self.function.consume(block, termination);
    }

    pub(super) fn begin_block(&mut self, label: Word) -> Result<Block, Error> {
        let mut block = Block::new(label);
        let Some(frame) = self.ssa.close(label) else {
            return Ok(block);
        };
        let mut defined = Vec::new();
        for (at, &slot) in frame.slots.iter().enumerate() {
            let base = self.ssa.value(slot);
            let incoming = |edge: &Edge| edge.values.get(at).copied().unwrap_or(base);
            let Some(first) = frame.edges.first().map(incoming) else {
                break;
            };
            if frame.edges.iter().all(|edge| incoming(edge) == first) {
                if first != base {
                    defined.push((slot, first, false));
                }
                continue;
            }
            let type_id = self.ssa_type(slot)?;
            let id = self.gen_id();
            let mut phi = Instruction::phi(type_id, id);
            for edge in &frame.edges {
                let value = self.ssa_resolve(slot, incoming(edge))?;
                phi.add_operand(value);
                phi.add_operand(edge.from);
            }
            block.body.push(phi);
            self.ssa_decorate(slot, id);
            defined.push((slot, id, true));
        }
        for (slot, id, phi) in defined {
            self.ssa.define(slot, id);
            if phi {
                self.ssa_debug_value(slot, id, &mut block);
            }
        }
        Ok(block)
    }

    pub(super) fn open_loop_header(&mut self, header: Word, body: &crate::Block) {
        if !self.ssa.is_active() {
            return;
        }
        let slots = self
            .ssa
            .loop_slots
            .remove(&address(body))
            .unwrap_or_default();
        self.ssa.headers.insert(
            header,
            Header {
                slots,
                block: 0,
                edges: Vec::new(),
            },
        );
    }

    pub(super) fn write_loop_header_phis(
        &mut self,
        header: Word,
        block: &mut Block,
    ) -> Result<(), Error> {
        let Some(slots) = self.ssa.headers.get_mut(&header).map(|entry| {
            entry.block = self.function.blocks.len();
            entry.slots.clone()
        }) else {
            return Ok(());
        };
        let mut defined = Vec::with_capacity(slots.len());
        for slot in slots {
            let type_id = self.ssa_type(slot)?;
            let id = self.gen_id();
            block.body.push(Instruction::phi(type_id, id));
            self.ssa_decorate(slot, id);
            defined.push((slot, id));
        }
        for (slot, id) in defined {
            self.ssa.define(slot, id);
            self.ssa_debug_value(slot, id, block);
        }
        Ok(())
    }

    pub(super) fn close_loop_header(&mut self, header: Word) -> Result<(), Error> {
        let Some(entry) = self.ssa.headers.remove(&header) else {
            return Ok(());
        };
        for (at, &slot) in entry.slots.iter().enumerate() {
            let mut operands = Vec::with_capacity(entry.edges.len() * 2);
            for edge in &entry.edges {
                let value = edge.values.get(at).copied().unwrap_or(0);
                operands.push(self.ssa_resolve(slot, value)?);
                operands.push(edge.from);
            }
            let phi = self
                .function
                .blocks
                .get_mut(entry.block)
                .and_then(|block| block.body.get_mut(at))
                .filter(|phi| phi.op == spirv::Op::Phi as u32)
                .ok_or(Error::Internal("loop header without its phi"))?;
            for operand in operands {
                phi.add_operand(operand);
            }
        }
        Ok(())
    }

    fn ssa_type(&mut self, slot: u32) -> Result<Word, Error> {
        let known = self.ssa.types.get(slot as usize).copied().unwrap_or(0);
        if known != 0 {
            return Ok(known);
        }
        let local = self
            .ssa
            .locals
            .get(slot as usize)
            .copied()
            .ok_or(Error::Internal("promoted local without a slot"))?;
        let type_id = self.get_handle_type_id(self.ir_function.local_variables[local].ty)?;
        if let Some(entry) = self.ssa.types.get_mut(slot as usize) {
            *entry = type_id;
        }
        Ok(type_id)
    }

    fn ssa_resolve(&mut self, slot: u32, value: Word) -> Result<Word, Error> {
        if value != 0 {
            return Ok(value);
        }
        let type_id = self.ssa_type(slot)?;
        Ok(self.writer.get_constant_null(type_id))
    }

    fn ssa_current(&mut self, slot: u32) -> Result<Word, Error> {
        let value = self.ssa.value(slot);
        self.ssa_resolve(slot, value)
    }

    fn ssa_decorate(&mut self, slot: u32, id: Word) {
        if let Some(&local) = self.ssa.locals.get(slot as usize)
            && self.ir_function.local_variables[local].relaxed_precision
        {
            self.writer
                .decorate(id, spirv::Decoration::RelaxedPrecision, &[]);
        }
    }

    fn ssa_debug_value(&mut self, slot: u32, id: Word, block: &mut Block) {
        if let Some(&local) = self.ssa.locals.get(slot as usize) {
            self.writer
                .debug_value(self.ir_module, self.ir_function, block, (local, id), &[]);
        }
    }

    fn ssa_indices(&self, pointer: Handle<Expression>) -> Result<Vec<Word>, Error> {
        let mut indices = Vec::new();
        let mut current = pointer;
        loop {
            match self.ir_function.expressions[current] {
                Expression::LocalVariable(_) => break,
                Expression::AccessIndex { base, index } => {
                    indices.push(index);
                    current = base;
                }
                _ => return Err(Error::Internal("promoted local accessed through a pointer")),
            }
        }
        indices.reverse();
        Ok(indices)
    }

    pub(super) fn write_ssa_load(
        &mut self,
        expression: Handle<Expression>,
        (pointer, slot): (Handle<Expression>, u32),
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let value = self.ssa_current(slot)?;
        let indices = self.ssa_indices(pointer)?;
        if !indices.is_empty() {
            let id = self.gen_id();
            block.body.push(Instruction::composite_extract(
                result_type_id,
                id,
                value,
                &indices,
            ));
            return Ok(id);
        }
        let decorated = !self.non_uniform(expression).is_empty()
            || self
                .ir_function
                .precision
                .get(&expression)
                .is_some_and(|precision| !precision.is_empty());
        if !decorated {
            return Ok(value);
        }
        let id = self.gen_id();
        block
            .body
            .push(Instruction::copy_object(result_type_id, id, value));
        Ok(id)
    }

    pub(super) fn write_ssa_store(
        &mut self,
        (pointer, slot): (Handle<Expression>, u32),
        value: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let value_id = self.cached.get(value)?;
        let indices = self.ssa_indices(pointer)?;
        let stored = if indices.is_empty() {
            value_id
        } else {
            let composite = self.ssa_current(slot)?;
            let type_id = self.ssa_type(slot)?;
            let id = self.gen_id();
            block.body.push(Instruction::composite_insert(
                type_id, id, value_id, composite, &indices,
            ));
            id
        };
        self.ssa.define(slot, stored);
        self.ssa_debug_value(slot, stored, block);
        Ok(())
    }
}
