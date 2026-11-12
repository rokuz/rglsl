use std::cell::{Cell, RefCell};
use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::future::Future;
use std::rc::Rc;

use rglsl::front::glsl::Analyzed;
use rglsl::{AddressSpace, Module, TypeInner};
use rglsl_ast::ast::{DeclarationKind, ExpressionKind, ExternalDeclaration};
use rglsl_sema::analyze::is_shader_record;
use rglsl_sema::scope::{Origin, Storage, SymbolKind};
use rglsl_sema::{Analysis, SymbolId};
use rglsl_types::stack::{run, Call, Stack};

use super::database::Object;
use super::source::{declared_globals, io_name, BlockDefaults};
use super::types::{
    self, explicit_packing, explicit_row_major, layout_value, Kind, Layouts, Pack, RType,
};
use super::walk::{self, Event, Key, Op, Operand};
use super::{Options, Program};

#[derive(Debug, Clone)]
pub(super) struct Step {
    pub(super) key: Key,
    pub(super) op: StepOp,
    pub(super) left: RType,
    pub(super) result: RType,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) enum StepOp {
    Direct(i64),
    Indirect,
    Member(usize),
}

#[derive(Debug, Clone)]
pub(super) struct Blow {
    pub(super) base: RType,
    pub(super) name: String,
    pub(super) deref: usize,
    pub(super) offset: i64,
    pub(super) block_index: i64,
    pub(super) array_size: i64,
    pub(super) top_size: i64,
    pub(super) top_stride: i64,
    pub(super) storage: Storage,
    pub(super) active: bool,
}

pub(super) struct UnitCx<'p, 'd, 'a> {
    pub(super) program: &'p Program<'d>,
    pub(super) unit: usize,
    pub(super) source: &'a Analyzed,
    pub(super) analysis: &'a Analysis,
    pub(super) layouts: Layouts<'a>,
    pub(super) module: Option<&'a Module>,
    pub(super) defaults: BTreeMap<rglsl_sema::types::BlockId, BlockDefaults>,
    pub(super) heap_bindings: &'p BTreeMap<(usize, SymbolId), i64>,
    pub(super) used: &'p BTreeSet<(usize, SymbolId)>,
    pub(super) processed: &'p RefCell<BTreeSet<(usize, Key)>>,
    pub(super) stage: usize,
    pub(super) update_stage_masks: Cell<bool>,
    pub(super) derefs: RefCell<BTreeMap<Key, walk::Deref>>,
}

#[derive(Clone)]
pub(super) struct Cx<'b, 'c, 'p, 'd, 'a> {
    pub(super) unit: &'c UnitCx<'p, 'd, 'a>,
    pub(super) stack: Stack<'b>,
}

impl<'b> Cx<'b, '_, '_, '_, '_> {
    pub(super) fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        self.stack.call(frame)
    }
}

impl UnitCx<'_, '_, '_> {
    pub(super) fn options(&self) -> Options {
        self.program.settings.options
    }

    pub(super) fn bit(&self) -> u32 {
        1u32 << self.stage
    }

    pub(super) fn processed(&self, key: Key) -> bool {
        self.processed.borrow().contains(&(self.unit, key))
    }

    pub(super) fn mark(&self, key: Key) {
        self.processed.borrow_mut().insert((self.unit, key));
    }

    pub(super) fn event(&self, event: Event) {
        match event {
            Event::Deref(key) => {
                let _ = run(|stack| {
                    let cx = Cx { unit: self, stack };
                    cx.dereferenced_uniform(key)
                });
            }
            Event::Symbol(symbol, key) => {
                let _ = run(|stack| {
                    let cx = Cx { unit: self, stack };
                    cx.visit_symbol(symbol, key)
                });
            }
            Event::Call(_) => {}
        }
    }

    pub(super) fn linker_object(&self, symbol: SymbolId, key: Key) {
        let Some(variable) = self.analysis.symbol(symbol).and_then(|s| s.variable()) else {
            return;
        };
        let options = self.options();
        let storage = variable.qualifiers.storage;
        if (storage == Storage::Uniform && options.shared_std140_ubo)
            || (storage == Storage::Buffer && options.shared_std140_ssbo)
        {
            let ty = self.symbol_type(symbol);
            if ty.as_ref().is_some_and(|ty| {
                ty.is_block() && matches!(ty.packing, Pack::Std140 | Pack::Shared)
            }) {
                self.event(Event::Symbol(symbol, key));
            }
        } else if options.all_io_variables && matches!(storage, Storage::In | Storage::Out) {
            self.event(Event::Symbol(symbol, key));
        }
    }

    pub(super) fn anonymous_index(&self, symbol: SymbolId) -> usize {
        let mut events: Vec<(u32, Option<SymbolId>)> = Vec::new();
        for declaration in &self.source.unit.external_declarations {
            let ExternalDeclaration::Declaration(declaration) = declaration else {
                continue;
            };
            if let DeclarationKind::Block { instance: None, .. } = declaration.kind {
                let declared = self.analysis.declarations.get(&declaration.id).copied();
                events.push((declaration.span.start, declared));
            }
        }
        let declared: BTreeSet<SymbolId> =
            events.iter().filter_map(|&(_, symbol)| symbol).collect();
        let mut first_use: BTreeMap<SymbolId, u32> = BTreeMap::new();
        for expression in rglsl_ast::expressions(&self.source.unit) {
            let ExpressionKind::Variable(_) = expression.kind else {
                continue;
            };
            let Some(&referenced) = self.analysis.references.get(&expression.id) else {
                continue;
            };
            if let Some(&SymbolKind::BlockMember { instance, .. }) =
                self.analysis.symbol(referenced).map(|found| &found.kind)
            {
                if declared.contains(&instance) {
                    continue;
                }
                let start = expression.span.start;
                first_use
                    .entry(instance)
                    .and_modify(|current| *current = (*current).min(start))
                    .or_insert(start);
            }
        }
        events.extend(
            first_use
                .into_iter()
                .map(|(instance, start)| (start, Some(instance))),
        );
        events.sort_by_key(|&(start, _)| start);
        events
            .iter()
            .position(|&(_, candidate)| candidate == Some(symbol))
            .unwrap_or(0)
    }

    pub(super) fn linker_objects(&self) -> Vec<SymbolId> {
        declared_globals(self.source)
    }
}

impl UnitCx<'_, '_, '_> {
    pub(super) fn block_layout(&self, ty: &mut RType, block: &rglsl_sema::types::BlockType) {
        let storage = ty.storage;
        if !matches!(storage, Storage::Uniform | Storage::Buffer) {
            return;
        }
        let Kind::Aggregate(types::Aggregate::Block(id)) = ty.kind else {
            return;
        };
        let defaults = self.defaults.get(&id).copied().unwrap_or_default();
        let push_constant = block.qualifiers.has_layout("push_constant");
        let shader_record = is_shader_record(&block.qualifiers);
        ty.packing = match explicit_packing(&block.qualifiers) {
            Some(packing) => packing,
            None if push_constant || shader_record => Pack::Std430,
            None => defaults.packing.unwrap_or(if self.program.settings.spirv {
                if storage == Storage::Buffer {
                    Pack::Std430
                } else {
                    Pack::Std140
                }
            } else {
                Pack::Shared
            }),
        };
        ty.row_major = Some(
            explicit_row_major(&block.qualifiers)
                .or(defaults.row_major)
                .unwrap_or(false),
        );
        ty.align = layout_value(&block.qualifiers, "align");
    }

    pub(super) fn symbol_type(&self, symbol: SymbolId) -> Option<RType> {
        let found = self.analysis.symbol(symbol)?;
        let variable = found.variable()?;
        let mut ty = RType::from_sema(&variable.ty, variable.qualifiers.storage);
        self.layouts
            .implicit
            .symbols
            .get(&symbol)
            .copied()
            .unwrap_or_default()
            .adopt(
                &mut ty,
                found.name == "gl_SampleMask" && variable.origin == Origin::BuiltIn,
            );
        self.layouts
            .implicit
            .inner_symbols
            .get(&symbol)
            .copied()
            .unwrap_or_default()
            .adopt_inner(&mut ty);
        let block = match ty.kind {
            Kind::Aggregate(types::Aggregate::Block(id)) => self.analysis.types.block(id),
            _ => None,
        };
        if let Some(block) = block {
            self.block_layout(&mut ty, block);
        }
        if matches!(ty.storage, Storage::Uniform | Storage::Buffer) {
            ty.binding = self
                .heap_bindings
                .get(&(self.unit, symbol))
                .copied()
                .or_else(|| self.binding(symbol, &found.name, block, &variable.qualifiers));
        }
        Some(ty)
    }

    pub(super) fn binding(
        &self,
        symbol: SymbolId,
        name: &str,
        block: Option<&rglsl_sema::types::BlockType>,
        qualifiers: &rglsl_sema::scope::Qualifiers,
    ) -> Option<i64> {
        let explicit = layout_value(qualifiers, "binding")
            .or_else(|| block.and_then(|block| layout_value(&block.qualifiers, "binding")));
        if !self.program.settings.spirv {
            return explicit;
        }
        if explicit.is_none() && !self.used.contains(&(self.unit, symbol)) {
            return None;
        }
        let Some(module) = self.module else {
            return explicit;
        };
        let found = module
            .global_variables
            .iter()
            .find(|&(_, global)| match block {
                Some(block) => {
                    let mut ty = global.ty;
                    if let Some(TypeInner::BindingArray { base, .. }) =
                        module.types.get_handle(ty).ok().map(|ty| &ty.inner)
                    {
                        ty = *base;
                    }
                    matches!(
                        global.space,
                        AddressSpace::Uniform | AddressSpace::Storage { .. }
                    ) && module
                        .types
                        .get_handle(ty)
                        .ok()
                        .and_then(|ty| ty.name.as_deref())
                        == Some(block.name.as_str())
                }
                None => {
                    global.space == AddressSpace::Handle && global.name.as_deref() == Some(name)
                }
            });
        match found {
            Some((_, global)) => global
                .binding
                .as_ref()
                .map(|binding| i64::from(binding.binding))
                .or(explicit),
            None => explicit,
        }
    }

    pub(super) fn chain(&self, top: Key) -> Option<(SymbolId, Key, Vec<Step>)> {
        let derefs = self.derefs.borrow();
        let mut keys = Vec::new();
        let mut current = top;
        let (symbol, base_key) = loop {
            let deref = derefs.get(&current)?;
            keys.push((current, deref.op.clone()));
            match deref.left {
                Operand::Deref(next) => current = next,
                Operand::Symbol(symbol, key) => break (symbol, key),
                Operand::Other => return None,
            }
        };
        drop(derefs);
        let mut left = self.symbol_type(symbol)?;
        let mut steps = Vec::with_capacity(keys.len());
        for (key, op) in keys.into_iter().rev() {
            let (op, result) = match op {
                Op::Direct(index) => (StepOp::Direct(index), self.index_type(&left)),
                Op::Indirect => (StepOp::Indirect, self.index_type(&left)),
                Op::Field(ref name) => {
                    let index = self.layouts.member_index(&left, name)?;
                    (StepOp::Member(index), self.layouts.member(&left, index)?)
                }
                Op::Member(index) => (StepOp::Member(index), self.layouts.member(&left, index)?),
            };
            steps.push(Step {
                key,
                op,
                left: left.clone(),
                result: result.clone(),
            });
            left = result;
        }
        Some((symbol, base_key, steps))
    }

    pub(super) fn index_type(&self, left: &RType) -> RType {
        let mut element = left.clone();
        element.storage = Storage::None;
        if left.is_array() {
            element.dims.remove(0);
            return element;
        }
        element.kind = match left.kind {
            Kind::Matrix(scalar, _, rows) => Kind::Vector(scalar, rows),
            Kind::Vector(scalar, _) => Kind::Scalar(scalar),
            other => other,
        };
        element
    }

    pub(super) fn block_name(&self, ty: &RType) -> String {
        match ty.kind {
            Kind::Aggregate(types::Aggregate::Block(id)) => self
                .analysis
                .types
                .block(id)
                .map(|block| block.name.clone())
                .unwrap_or_default(),
            _ => String::new(),
        }
    }

    pub(super) fn add_block_name(&self, name: &str, ty: &RType, size: i64) -> i64 {
        let strict = self.options().strict_array_suffix;
        let element = {
            let mut element = ty.clone();
            element.dims.clear();
            element
        };
        let mut names = vec![String::from(name)];
        for dimension in &ty.dims {
            let count = i64::from(dimension.unwrap_or(0));
            let mut next = Vec::new();
            for prefix in &names {
                for index in 0..count {
                    next.push(format!("{prefix}[{index}]"));
                }
            }
            names = next;
        }
        let mut first = 0;
        for (position, name) in names.iter().enumerate() {
            let index = self.add_single_block(name, ty, &element, size, strict);
            if position == 0 {
                first = index;
            }
        }
        first
    }

    pub(super) fn add_single_block(
        &self,
        name: &str,
        ty: &RType,
        element: &RType,
        size: i64,
        strict: bool,
    ) -> i64 {
        let separate = self.options().separate_buffers && ty.storage == Storage::Buffer;
        let update = self.update_stage_masks.get();
        let bit = self.bit();
        let mut database = self.program.database.borrow_mut();
        let existing = database.names.get(name).copied();
        let blocks = if separate {
            &mut database.buffer_blocks
        } else {
            &mut database.uniform_blocks
        };
        let index = match existing {
            None => {
                let index = blocks.len();
                let mut object = Object::new(
                    String::from(name),
                    -1,
                    -1,
                    size,
                    i64::try_from(index).unwrap_or(-1),
                    element.binding.unwrap_or(-1),
                );
                object.num_members = self.layouts.count_members(element, strict);
                if update {
                    object.stages |= bit;
                }
                blocks.push(object);
                database.names.insert(String::from(name), index);
                index
            }
            Some(index) => {
                if update {
                    if let Some(object) = blocks.get_mut(index) {
                        object.stages |= bit;
                    }
                }
                index
            }
        };
        i64::try_from(index).unwrap_or(-1)
    }
}

impl<'b, 'c: 'b, 'p, 'd, 'a> Cx<'b, 'c, 'p, 'd, 'a> {
    pub(super) async fn visit_symbol(self, symbol: SymbolId, key: Key) {
        let unit = self.unit;
        let Some(variable) = unit.analysis.symbol(symbol).and_then(|s| s.variable()) else {
            return;
        };
        let options = unit.options();
        let storage = variable.qualifiers.storage;
        let Some(ty) = unit.symbol_type(symbol) else {
            return;
        };
        if storage == Storage::Uniform {
            if ty.is_block() {
                if options.shared_std140_ubo {
                    self.call(self.clone().add_uniform(symbol, key)).await;
                }
            } else {
                self.call(self.clone().add_uniform(symbol, key)).await;
            }
        }
        if options.shared_std140_ssbo
            && storage == Storage::Buffer
            && ty.is_block()
            && matches!(ty.packing, Pack::Std140 | Pack::Shared)
        {
            self.call(self.clone().add_uniform(symbol, key)).await;
        }
        let program = unit.program;
        if (unit.stage == program.first && storage == Storage::In)
            || (unit.stage == program.last && storage == Storage::Out)
        {
            self.add_pipe_io(symbol, key, &ty);
        }
    }

    pub(super) async fn add_uniform(self, symbol: SymbolId, key: Key) {
        let unit = self.unit;
        if unit.processed(key) {
            return;
        }
        unit.mark(key);
        let Some(found) = unit.analysis.symbol(symbol) else {
            return;
        };
        let Some(ty) = unit.symbol_type(symbol) else {
            return;
        };
        let mut block_index = -1;
        let mut offset = -1;
        let mut base_name = found.name.clone();
        if ty.is_block() {
            offset = 0;
            let block_name = unit.block_name(&ty);
            base_name = if found.name.is_empty() {
                String::new()
            } else {
                block_name.clone()
            };
            block_index = unit.add_block_name(&block_name, &ty, unit.layouts.block_size(&ty));
        }
        let storage = ty.storage;
        let active = unit.update_stage_masks.get();
        self.call(self.clone().blow_up(
            Rc::from(Vec::new()),
            Blow {
                base: ty,
                name: base_name,
                deref: 0,
                offset,
                block_index,
                array_size: 0,
                top_size: -1,
                top_stride: 0,
                storage,
                active,
            },
        ))
        .await;
    }

    pub(super) async fn dereferenced_uniform(self, top: Key) {
        let unit = self.unit;
        let Some((symbol, base_key, steps)) = unit.chain(top) else {
            return;
        };
        let Some(last) = steps.last() else {
            return;
        };
        if (last.left.is_vector() || last.left.is_matrix()) && !last.left.is_array() {
            return;
        }
        let Some(found) = unit.analysis.symbol(symbol) else {
            return;
        };
        let Some(variable) = found.variable() else {
            return;
        };
        if !matches!(
            variable.qualifiers.storage,
            Storage::Uniform | Storage::Buffer
        ) {
            return;
        }
        if unit.processed(top) {
            return;
        }
        let Some(base) = unit.symbol_type(symbol) else {
            return;
        };
        let mut offset = -1;
        let mut block_index = -1;
        let anonymous = found.name.is_empty();
        let block = base.is_block();
        if block {
            offset = 0;
            let block_name = unit.block_name(&base);
            let base_name = if anonymous {
                String::new()
            } else {
                block_name.clone()
            };
            block_index = unit.add_block_name(&block_name, &base, unit.layouts.block_size(&base));
            if unit.options().all_block_variables {
                self.call(self.clone().blow_up(
                    Rc::from(Vec::new()),
                    Blow {
                        base: base.clone(),
                        name: base_name,
                        deref: 0,
                        offset: 0,
                        block_index,
                        array_size: 0,
                        top_size: -1,
                        top_stride: 0,
                        storage: base.storage,
                        active: false,
                    },
                ))
                .await;
            }
        }
        let mut derefs = Vec::new();
        for step in steps.iter().rev() {
            if step.left.granular() {
                continue;
            }
            derefs.push(step.clone());
            unit.mark(step.key);
        }
        derefs.reverse();
        unit.mark(base_key);
        let mut array_size = 0;
        if last.left.granular() && last.left.is_array() {
            if let StepOp::Direct(index) = last.op {
                array_size = index + 1;
            }
        }
        let base_name = if anonymous {
            String::new()
        } else if block {
            unit.block_name(&base)
        } else {
            found.name.clone()
        };
        let storage = base.storage;
        self.call(self.clone().blow_up(
            Rc::from(derefs),
            Blow {
                base,
                name: base_name,
                deref: 0,
                offset,
                block_index,
                array_size,
                top_size: -1,
                top_stride: 0,
                storage,
                active: true,
            },
        ))
        .await;
    }

    pub(super) async fn blow_up(self, derefs: Rc<[Step]>, call: Blow) {
        let unit = self.unit;
        let layouts = &unit.layouts;
        let options = unit.options();
        let strict = options.strict_array_suffix;
        let mut block_parent = call.base.is_block() && call.base.storage == Storage::Buffer;
        let mut name = call.name.clone();
        let mut terminal = call.base.clone();
        let mut offset = call.offset;
        let mut top_stride = call.top_stride;
        let mut position = call.deref;
        while let Some(step) = derefs.get(position) {
            terminal = step.result.clone();
            match step.op {
                StepOp::Indirect => {
                    let stride = layouts.array_stride(&call.base, &step.left);
                    if top_stride == 0 {
                        top_stride = stride;
                    }
                    for index in 0..step.left.outer_size().max(1) {
                        let mut child_name = name.clone();
                        if terminal.is_block() {
                        } else if strict && block_parent {
                            child_name.push_str("[0]");
                        } else if strict || !call.base.is_block() {
                            let _ = write!(child_name, "[{index}]");
                        }
                        self.call(self.clone().blow_up(
                            Rc::clone(&derefs),
                            Blow {
                                base: terminal.clone(),
                                name: child_name,
                                deref: position + 1,
                                offset,
                                top_stride,
                                ..call.clone()
                            },
                        ))
                        .await;
                        if offset >= 0 {
                            offset += stride;
                        }
                    }
                    return;
                }
                StepOp::Direct(index) => {
                    let stride = layouts.array_stride(&call.base, &step.left);
                    if terminal.is_block() {
                    } else if strict && block_parent {
                        name.push_str("[0]");
                    } else if strict || !call.base.is_block() {
                        let _ = write!(name, "[{index}]");
                        if offset >= 0 {
                            offset += stride * index;
                        }
                    }
                    if top_stride == 0 {
                        top_stride = stride;
                    }
                    if top_stride != 0 && step.left.is_array() {
                        block_parent = false;
                    }
                }
                StepOp::Member(member) => {
                    if offset >= 0 {
                        offset += layouts.offset_of(&step.left, member);
                    }
                    if !name.is_empty() {
                        name.push('.');
                    }
                    name.push_str(layouts.member_name(&step.left, member).unwrap_or_default());
                    if !step.left.is_block() && terminal.is_array() {
                        block_parent = false;
                    }
                }
            }
            position += 1;
        }
        let end = derefs.len();
        if !terminal.granular() {
            let base_offset = offset;
            if terminal.is_array() {
                let stride = if offset >= 0 {
                    layouts.array_stride(&call.base, &terminal)
                } else {
                    0
                };
                let mut count = terminal.outer_size().max(1);
                if (strict && block_parent) || (call.top_size == count && top_stride == 0) {
                    count = 1;
                }
                if top_stride == 0 {
                    top_stride = stride;
                }
                for index in 0..count {
                    let mut child_name = name.clone();
                    if !terminal.is_block() {
                        let _ = write!(child_name, "[{index}]");
                    }
                    if offset >= 0 {
                        offset = base_offset + stride * index;
                    }
                    self.call(self.clone().blow_up(
                        Rc::clone(&derefs),
                        Blow {
                            base: terminal.element(),
                            name: child_name,
                            deref: end,
                            offset,
                            array_size: 0,
                            top_stride,
                            ..call.clone()
                        },
                    ))
                    .await;
                }
            } else {
                let member_offsets = if base_offset >= 0 {
                    layouts.member_offsets(&terminal)
                } else {
                    Vec::new()
                };
                let mut top_size = call.top_size;
                for index in 0..layouts.member_count(&terminal) {
                    let Some(member) = layouts.member(&terminal, index) else {
                        continue;
                    };
                    let mut child_name = name.clone();
                    if !child_name.is_empty() {
                        child_name.push('.');
                    }
                    child_name.push_str(layouts.member_name(&terminal, index).unwrap_or_default());
                    let member_offset = member_offsets.get(index).copied().unwrap_or(0);
                    if offset >= 0 {
                        offset = base_offset + member_offset;
                    }
                    let mut array_stride = top_stride;
                    if terminal.is_block()
                        && terminal.storage == Storage::Buffer
                        && member.is_array()
                    {
                        array_stride = layouts.array_stride(&call.base, &member);
                    }
                    if top_size == -1 && array_stride == 0 && block_parent {
                        top_size = 1;
                    }
                    let dimension = if member.is_unsized_array() {
                        0
                    } else {
                        member.outer_size()
                    };
                    let child = if strict && block_parent {
                        if member.is_array() && member.is_struct() {
                            child_name.push_str("[0]");
                            Blow {
                                base: member.element(),
                                name: child_name,
                                deref: end,
                                offset: member_offset,
                                block_index: call.block_index,
                                array_size: 0,
                                top_size: dimension,
                                top_stride: array_stride,
                                storage: terminal.storage,
                                active: false,
                            }
                        } else if member.is_array() {
                            Blow {
                                base: member,
                                name: child_name,
                                deref: end,
                                offset: member_offset,
                                block_index: call.block_index,
                                array_size: 0,
                                top_size: dimension,
                                top_stride: 0,
                                storage: terminal.storage,
                                active: false,
                            }
                        } else {
                            Blow {
                                base: member,
                                name: child_name,
                                deref: end,
                                offset: member_offset,
                                block_index: call.block_index,
                                array_size: 0,
                                top_size: 1,
                                top_stride: 0,
                                storage: terminal.storage,
                                active: false,
                            }
                        }
                    } else {
                        Blow {
                            base: member,
                            name: child_name,
                            deref: end,
                            offset,
                            block_index: call.block_index,
                            array_size: 0,
                            top_size,
                            top_stride: array_stride,
                            storage: call.storage,
                            active: call.active,
                        }
                    };
                    self.call(self.clone().blow_up(Rc::clone(&derefs), child))
                        .await;
                }
            }
            return;
        }
        if options.basic_array_suffix && terminal.is_array() {
            name.push_str("[0]");
        }
        let array_size = if call.array_size == 0 {
            terminal.gl_array_size()
        } else {
            call.array_size
        };
        let separate = options.separate_buffers && call.storage == Storage::Buffer;
        let bit = unit.bit();
        let stage_bit = options.all_block_variables && call.active;
        let mut database = unit.program.database.borrow_mut();
        let existing = database.names.get(&name).copied();
        let variables = if separate {
            &mut database.buffer_variables
        } else {
            &mut database.uniforms
        };
        match existing {
            None => {
                let index = variables.len();
                let mut object = Object::new(
                    name.clone(),
                    offset,
                    terminal.gl_type(),
                    array_size,
                    call.block_index,
                    terminal.binding.unwrap_or(-1),
                );
                if terminal.is_array() {
                    object.array_stride = layouts.array_stride(&call.base, &terminal);
                    if top_stride == 0 {
                        top_stride = object.array_stride;
                    }
                }
                object.top_level_array_stride = top_stride;
                if stage_bit {
                    object.stages |= bit;
                }
                variables.push(object);
                database.names.insert(name, index);
            }
            Some(index) => {
                if let Some(object) = variables.get_mut(index) {
                    if array_size > 1 {
                        object.size = object.size.max(array_size);
                    }
                    if stage_bit {
                        object.stages |= bit;
                    }
                }
            }
        }
    }

    pub(super) fn add_pipe_io(&self, symbol: SymbolId, key: Key, ty: &RType) {
        let unit = self.unit;
        if unit.processed(key) {
            return;
        }
        unit.mark(key);
        let Some(found) = unit.analysis.symbol(symbol) else {
            return;
        };
        let input = ty.storage == Storage::In;
        if unit.options().unwrap_io_blocks {
            let anonymous = found.name.is_empty();
            let base_name = if anonymous {
                String::new()
            } else if ty.is_block() {
                unit.block_name(ty)
            } else {
                String::from(io_name(&found.name))
            };
            let start = if ty.is_array() && ty.is_block() {
                ty.element()
            } else {
                ty.clone()
            };
            self.blow_up_io(input, base_name, start);
            return;
        }
        let name = if found.name.is_empty() {
            format!("anon@{}", unit.anonymous_index(symbol))
        } else {
            String::from(io_name(&found.name))
        };
        let bit = unit.bit();
        let mut database = unit.program.database.borrow_mut();
        let database = &mut *database;
        let (items, names) = if input {
            (&mut database.pipe_inputs, &mut database.pipe_in_names)
        } else {
            (&mut database.pipe_outputs, &mut database.pipe_out_names)
        };
        match names.get(&name).copied() {
            None => {
                names.insert(name.clone(), items.len());
                let mut object = Object::new(name, 0, ty.gl_type(), ty.gl_array_size(), 0, -1);
                object.stages |= bit;
                items.push(object);
            }
            Some(index) => {
                if let Some(object) = items.get_mut(index) {
                    object.stages |= bit;
                }
            }
        }
    }

    pub(super) fn blow_up_io(&self, input: bool, base_name: String, ty: RType) {
        let unit = self.unit;
        let layouts = &unit.layouts;
        let mut pending = vec![(base_name, ty)];
        while let Some((mut name, ty)) = pending.pop() {
            if !ty.granular() {
                let mut children = Vec::new();
                if ty.is_array() {
                    for index in 0..ty.outer_size().max(1) {
                        children.push((format!("{name}[{index}]"), ty.element()));
                    }
                } else {
                    for index in 0..layouts.member_count(&ty) {
                        let Some(member) = layouts.member(&ty, index) else {
                            continue;
                        };
                        let mut child = name.clone();
                        if !child.is_empty() {
                            child.push('.');
                        }
                        child.push_str(layouts.member_name(&ty, index).unwrap_or_default());
                        children.push((child, member));
                    }
                }
                pending.extend(children.into_iter().rev());
                continue;
            }
            if unit.options().basic_array_suffix && ty.is_array() {
                name.push_str("[0]");
            }
            let key = format!("{} {name}", if input { "in" } else { "out" });
            let bit = unit.bit();
            let mut database = unit.program.database.borrow_mut();
            let database = &mut *database;
            let items = if input {
                &mut database.pipe_inputs
            } else {
                &mut database.pipe_outputs
            };
            match database.names.get(&key).copied() {
                None => {
                    database.names.insert(key, items.len());
                    let mut object = Object::new(name, 0, ty.gl_type(), ty.gl_array_size(), 0, -1);
                    object.stages |= bit;
                    items.push(object);
                }
                Some(index) => {
                    if let Some(object) = items.get_mut(index) {
                        object.stages |= bit;
                    }
                }
            }
        }
    }
}
