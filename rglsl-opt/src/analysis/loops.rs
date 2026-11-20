use rglsl::{
    AddressSpace, BinaryOperator, Block, Expression, FastHashMap, Function, Handle, Literal,
    LocalVariable, LoopControl, Module, Statement, Type, TypeInner, UnaryOperator,
};
use rglsl_types::stack::recurse;

use crate::analysis::locals::{Locals, Root};
use crate::analysis::{Constants, for_each_result};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum IntegerKind {
    I8,
    U8,
    I16,
    U16,
    I32,
    U32,
    I64,
    U64,
}

impl IntegerKind {
    const fn of(literal: Literal) -> Option<(Self, i128)> {
        Some(match literal {
            Literal::I8(value) => (Self::I8, value as i128),
            Literal::U8(value) => (Self::U8, value as i128),
            Literal::I16(value) => (Self::I16, value as i128),
            Literal::U16(value) => (Self::U16, value as i128),
            Literal::I32(value) => (Self::I32, value as i128),
            Literal::U32(value) => (Self::U32, value as i128),
            Literal::I64(value) => (Self::I64, value as i128),
            Literal::U64(value) => (Self::U64, value as i128),
            _ => return None,
        })
    }

    pub fn literal(self, value: i128) -> Option<Literal> {
        Some(match self {
            Self::I8 => Literal::I8(i8::try_from(value).ok()?),
            Self::U8 => Literal::U8(u8::try_from(value).ok()?),
            Self::I16 => Literal::I16(i16::try_from(value).ok()?),
            Self::U16 => Literal::U16(u16::try_from(value).ok()?),
            Self::I32 => Literal::I32(i32::try_from(value).ok()?),
            Self::U32 => Literal::U32(u32::try_from(value).ok()?),
            Self::I64 => Literal::I64(i64::try_from(value).ok()?),
            Self::U64 => Literal::U64(u64::try_from(value).ok()?),
        })
    }

    fn holds(self, value: i128) -> bool {
        self.literal(value).is_some()
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct Counter {
    pub local: Handle<LocalVariable>,
    pub store: u32,
    pub kind: IntegerKind,
    pub start: i128,
    pub step: i128,
    pub trips: u64,
}

impl Counter {
    pub fn value(&self, iteration: u64) -> Option<Literal> {
        let offset = self.step.checked_mul(i128::from(iteration))?;
        self.kind.literal(self.start.checked_add(offset)?)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Exit {
    Header(u32),
    Footer,
}

#[derive(Debug, Clone)]
pub(crate) struct LoopInfo {
    pub position: u32,
    pub end: u32,
    pub parent: Option<usize>,
    pub control: LoopControl,
    pub own: u64,
    pub indexes: bool,
    pub simple: bool,
    pub exit: Option<Exit>,
    pub counter: Option<Counter>,
    pub never_entered: bool,
}

#[derive(Debug)]
pub(crate) struct Loops {
    pub loops: Vec<LoopInfo>,
    pub emitted_at: Vec<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Dependence {
    Constant,
    One(Handle<LocalVariable>),
    Locals,
    Opaque,
}

impl Dependence {
    fn join(self, other: Self) -> Self {
        match (self, other) {
            (Self::Constant, other) | (other, Self::Constant) => other,
            (Self::Opaque, _) | (_, Self::Opaque) => Self::Opaque,
            (Self::One(a), Self::One(b)) if a == b => Self::One(a),
            _ => Self::Locals,
        }
    }
}

#[derive(Debug, Clone, Copy, Default)]
struct Facts {
    breaks: u32,
    continues: bool,
    ends: bool,
    size: u64,
}

impl Facts {
    fn nested(&mut self, inner: Self) {
        self.breaks = self.breaks.saturating_add(inner.breaks);
        self.continues |= inner.continues;
        self.size = self.size.saturating_add(inner.size);
    }
}

type Siblings = FastHashMap<Handle<LocalVariable>, (u32, Handle<Expression>)>;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Pointee {
    Type(Handle<Type>),
    Column,
    Unknown,
}

struct Walker<'a> {
    module: &'a Module,
    function: &'a Function,
    locals: &'a Locals,
    dependence: Vec<Dependence>,
    pointees: Vec<Pointee>,
    accesses: FastHashMap<Handle<LocalVariable>, Vec<u32>>,
    several: Vec<bool>,
    emitted_at: Vec<u32>,
    position: u32,
    loops: Vec<LoopInfo>,
    current: Option<usize>,
}

impl Loops {
    pub fn of(module: &Module, function: &Function, locals: &Locals) -> Self {
        let mut walker = Walker {
            module,
            function,
            locals,
            dependence: Vec::with_capacity(function.expressions.len()),
            pointees: Vec::with_capacity(function.expressions.len()),
            accesses: FastHashMap::default(),
            several: Vec::new(),
            emitted_at: vec![u32::MAX; function.expressions.len()],
            position: crate::analysis::locals::FIRST,
            loops: Vec::new(),
            current: None,
        };
        walker.dependences();
        walker.block(&function.body);
        Self {
            loops: walker.loops,
            emitted_at: walker.emitted_at,
        }
    }

    pub fn emitted_at(&self, handle: Handle<Expression>) -> u32 {
        self.emitted_at
            .get(handle.index())
            .copied()
            .unwrap_or(u32::MAX)
    }
}

pub(crate) fn literal(
    module: &Module,
    function: &Function,
    handle: Handle<Expression>,
) -> Option<Literal> {
    Constants::of(module).literal(&function.expressions, handle)
}

fn integer(
    module: &Module,
    function: &Function,
    handle: Handle<Expression>,
) -> Option<(IntegerKind, i128)> {
    IntegerKind::of(literal(module, function, handle)?)
}

#[derive(Debug, Clone, Copy)]
struct Term {
    load: Handle<Expression>,
    local: Handle<LocalVariable>,
    offset: i128,
    kind: IntegerKind,
}

const fn negated(op: BinaryOperator) -> Option<BinaryOperator> {
    Some(match op {
        BinaryOperator::Less => BinaryOperator::GreaterEqual,
        BinaryOperator::LessEqual => BinaryOperator::Greater,
        BinaryOperator::Greater => BinaryOperator::LessEqual,
        BinaryOperator::GreaterEqual => BinaryOperator::Less,
        BinaryOperator::Equal => BinaryOperator::NotEqual,
        BinaryOperator::NotEqual => BinaryOperator::Equal,
        _ => return None,
    })
}

const fn swapped(op: BinaryOperator) -> Option<BinaryOperator> {
    Some(match op {
        BinaryOperator::Less => BinaryOperator::Greater,
        BinaryOperator::LessEqual => BinaryOperator::GreaterEqual,
        BinaryOperator::Greater => BinaryOperator::Less,
        BinaryOperator::GreaterEqual => BinaryOperator::LessEqual,
        BinaryOperator::Equal => BinaryOperator::Equal,
        BinaryOperator::NotEqual => BinaryOperator::NotEqual,
        _ => return None,
    })
}

fn compare(op: BinaryOperator, left: Literal, right: Literal) -> Option<bool> {
    let ordering = match (left, right) {
        (Literal::F64(a), Literal::F64(b)) => a.partial_cmp(&b)?,
        (Literal::F32(a), Literal::F32(b)) => a.partial_cmp(&b)?,
        (Literal::F16(a), Literal::F16(b)) => a.partial_cmp(&b)?,
        (left, right) => {
            let (left_kind, a) = IntegerKind::of(left)?;
            let (right_kind, b) = IntegerKind::of(right)?;
            if left_kind != right_kind {
                return None;
            }
            a.cmp(&b)
        }
    };
    Some(match op {
        BinaryOperator::Less => ordering.is_lt(),
        BinaryOperator::LessEqual => ordering.is_le(),
        BinaryOperator::Greater => ordering.is_gt(),
        BinaryOperator::GreaterEqual => ordering.is_ge(),
        BinaryOperator::Equal => ordering.is_eq(),
        BinaryOperator::NotEqual => ordering.is_ne(),
        _ => return None,
    })
}

fn below(start: i128, step: i128, bound: i128) -> Option<i128> {
    if start < bound {
        Some(0)
    } else if step < 0 {
        start
            .checked_sub(bound)?
            .checked_div(step.checked_neg()?)?
            .checked_add(1)
    } else {
        None
    }
}

fn first(start: i128, step: i128, op: BinaryOperator, bound: i128) -> Option<i128> {
    match op {
        BinaryOperator::Less => below(start, step, bound),
        BinaryOperator::LessEqual => below(start, step, bound.checked_add(1)?),
        BinaryOperator::Greater => below(
            start.checked_neg()?,
            step.checked_neg()?,
            bound.checked_neg()?,
        ),
        BinaryOperator::GreaterEqual => below(
            start.checked_neg()?,
            step.checked_neg()?,
            bound.checked_neg()?.checked_add(1)?,
        ),
        BinaryOperator::Equal => {
            if step == 0 {
                return (start == bound).then_some(0);
            }
            let distance = bound.checked_sub(start)?;
            (distance.checked_rem(step)? == 0)
                .then(|| distance.checked_div(step))
                .flatten()
                .filter(|&count| count >= 0)
        }
        BinaryOperator::NotEqual => {
            if start != bound {
                Some(0)
            } else if step != 0 {
                Some(1)
            } else {
                None
            }
        }
        _ => None,
    }
}

impl<'a> Walker<'a> {
    fn dependences(&mut self) {
        for (_, expression) in self.function.expressions.iter() {
            let dependence = match *expression {
                Expression::Literal(_)
                | Expression::Constant(_)
                | Expression::ZeroValue(_)
                | Expression::LocalVariable(_)
                | Expression::GlobalVariable(_) => Dependence::Constant,
                Expression::Load { pointer } => match self.locals.pointer(pointer) {
                    Some(target) if target.whole => match target.root {
                        Root::Local(local) => Dependence::One(local),
                        Root::Global(_) => Dependence::Opaque,
                    },
                    _ => Dependence::Opaque,
                },
                ref other => {
                    let mut operands = 0_usize;
                    let mut joined = Dependence::Constant;
                    other.for_each_operand(|operand| {
                        operands += 1;
                        joined = joined.join(
                            self.dependence
                                .get(operand.index())
                                .copied()
                                .unwrap_or(Dependence::Opaque),
                        );
                    });
                    if operands == 0 {
                        Dependence::Opaque
                    } else {
                        joined
                    }
                }
            };
            self.dependence.push(dependence);
            let pointee = self.pointee_of(expression);
            self.pointees.push(pointee);
        }
    }

    fn pointee_of(&self, expression: &Expression) -> Pointee {
        let element = |base: Handle<Expression>, member: Option<u32>| {
            let Some(&Pointee::Type(ty)) = self.pointees.get(base.index()) else {
                return Pointee::Unknown;
            };
            match self.module.types.get_handle(ty).map(|ty| &ty.inner) {
                Ok(&TypeInner::Array { base, .. }) => Pointee::Type(base),
                Ok(&TypeInner::Matrix { .. }) => Pointee::Column,
                Ok(TypeInner::Struct { members, .. }) => member
                    .and_then(|member| members.get(member as usize))
                    .map_or(Pointee::Unknown, |member| Pointee::Type(member.ty)),
                _ => Pointee::Unknown,
            }
        };
        match *expression {
            Expression::LocalVariable(local) => self
                .function
                .local_variables
                .try_get(local)
                .map_or(Pointee::Unknown, |variable| Pointee::Type(variable.ty)),
            Expression::GlobalVariable(global) => self
                .module
                .global_variables
                .try_get(global)
                .map_or(Pointee::Unknown, |variable| Pointee::Type(variable.ty)),
            Expression::AccessIndex { base, index } => element(base, Some(index)),
            Expression::Access { base, .. } => element(base, None),
            _ => Pointee::Unknown,
        }
    }

    fn indexes_memory(&self, base: Handle<Expression>) -> bool {
        match self.pointees.get(base.index()) {
            Some(&Pointee::Type(ty)) => self.module.types.get_handle(ty).is_ok_and(|ty| {
                matches!(ty.inner, TypeInner::Array { .. } | TypeInner::Matrix { .. })
            }),
            _ => false,
        }
    }

    fn end(&self, position: u32) -> u32 {
        self.locals.end(position)
    }

    fn indexed(&mut self, handle: Handle<Expression>, position: u32) {
        let Ok(&Expression::Access { base, index }) = self.function.expressions.try_get(handle)
        else {
            return;
        };
        let Some(pointer) = self.locals.pointer(base) else {
            return;
        };
        let memory = match pointer.root {
            Root::Local(_) => true,
            Root::Global(global) => self
                .module
                .global_variables
                .try_get(global)
                .is_ok_and(|variable| variable.space == AddressSpace::Private),
        };
        if !memory || !self.indexes_memory(base) {
            return;
        }
        match self.dependence.get(index.index()).copied() {
            Some(Dependence::One(local)) => self.accesses.entry(local).or_default().push(position),
            Some(Dependence::Locals) => {
                if let Some(slot) = self
                    .current
                    .and_then(|current| self.several.get_mut(current))
                {
                    *slot = true;
                }
            }
            _ => {}
        }
    }

    fn block(&mut self, block: &'a Block) -> Facts {
        let mut facts = Facts::default();
        let mut siblings = Siblings::default();
        for statement in block.iter() {
            let position = self.position;
            self.position += 1;
            match *statement {
                Statement::Emit(ref range) => {
                    for handle in range.clone() {
                        if let Some(slot) = self.emitted_at.get_mut(handle.index()) {
                            *slot = position;
                        }
                        facts.size = facts.size.saturating_add(1);
                        self.indexed(handle, position);
                    }
                }
                Statement::Store { pointer, value } => {
                    facts.size = facts.size.saturating_add(1);
                    if let Some(local) = self.locals.whole_local(pointer) {
                        siblings.insert(local, (position, value));
                    }
                }
                Statement::Break => {
                    facts.breaks = facts.breaks.saturating_add(1);
                    facts.ends = true;
                }
                Statement::Continue => {
                    facts.continues = true;
                    facts.ends = true;
                }
                Statement::Block(ref inner) => {
                    let inner = recurse(|| self.block(inner));
                    facts.nested(inner);
                    facts.ends |= inner.ends;
                }
                Statement::If {
                    ref accept,
                    ref reject,
                    ..
                } => {
                    facts.size = facts.size.saturating_add(1);
                    let accepted = recurse(|| self.block(accept));
                    let rejected = recurse(|| self.block(reject));
                    facts.nested(accepted);
                    facts.nested(rejected);
                }
                Statement::Switch { ref cases, .. } => {
                    facts.size = facts.size.saturating_add(1);
                    for case in cases {
                        let inner = recurse(|| self.block(&case.body));
                        facts.continues |= inner.continues;
                        facts.size = facts.size.saturating_add(inner.size);
                    }
                }
                Statement::Loop {
                    ref body,
                    ref continuing,
                    break_if,
                    control,
                } => self.walk_loop(position, [body, continuing], break_if, control, &siblings),
                ref other => {
                    facts.size = facts.size.saturating_add(1);
                    facts.ends |= other.is_terminator();
                    let emitted_at = &mut self.emitted_at;
                    for_each_result(other, |handle| {
                        if let Some(slot) = emitted_at.get_mut(handle.index()) {
                            *slot = position;
                        }
                    });
                }
            }
        }
        facts
    }

    fn walk_loop(
        &mut self,
        position: u32,
        [body, continuing]: [&'a Block; 2],
        break_if: Option<Handle<Expression>>,
        control: LoopControl,
        siblings: &Siblings,
    ) {
        let index = self.loops.len();
        self.loops.push(LoopInfo {
            position,
            end: self.end(position),
            parent: self.current,
            control,
            own: 0,
            indexes: false,
            simple: false,
            exit: None,
            counter: None,
            never_entered: false,
        });
        self.several.push(false);
        let saved = self.current.replace(index);
        let in_body = recurse(|| self.block(body));
        let in_continuing = recurse(|| self.block(continuing));
        self.current = saved;
        self.finish(
            index,
            body,
            continuing,
            break_if,
            in_body,
            in_continuing,
            siblings,
        );
    }

    #[allow(clippy::too_many_arguments)]
    fn finish(
        &mut self,
        index: usize,
        body: &Block,
        continuing: &Block,
        break_if: Option<Handle<Expression>>,
        in_body: Facts,
        in_continuing: Facts,
        siblings: &Siblings,
    ) {
        let Some(info) = self.loops.get(index) else {
            return;
        };
        let (position, end, parent) = (info.position, info.end, info.parent);
        let several = self.several.get(index).copied().unwrap_or(false);
        if let Some(parent) = parent
            && let Some(slot) = self.several.get_mut(parent)
        {
            *slot |= several;
        }
        let header = self.header(position, body);
        let exit = match (header, break_if) {
            (Some((at, condition, when)), None) => Some((Exit::Header(at), condition, when)),
            (None, Some(condition)) => Some((Exit::Footer, condition, true)),
            _ => None,
        };
        let simple = exit.is_some()
            && !in_body.continues
            && !in_body.ends
            && !in_continuing.ends
            && in_body.breaks == u32::from(header.is_some() && break_if.is_none());
        let counter = exit.and_then(|(kind, condition, when)| {
            self.counter(
                position, end, parent, body, continuing, kind, condition, when, siblings,
            )
        });
        let never_entered = simple
            && counter.is_none()
            && exit.is_some_and(|(kind, condition, when)| {
                matches!(kind, Exit::Header(_))
                    && self.exits_on_entry(position, parent, condition, when, siblings)
            });
        let indexes = several
            || counter.is_some_and(|counter| {
                self.accesses.get(&counter.local).is_some_and(|positions| {
                    let from = positions.partition_point(|&at| at <= position);
                    positions.get(from).is_some_and(|&at| at < end)
                })
            });
        if let Some(info) = self.loops.get_mut(index) {
            info.own = in_body.size.saturating_add(in_continuing.size);
            info.simple = simple;
            info.exit = exit.map(|(kind, _, _)| kind);
            info.counter = counter;
            info.never_entered = never_entered;
            info.indexes = indexes;
        }
    }

    fn header(&self, position: u32, body: &Block) -> Option<(u32, Handle<Expression>, bool)> {
        let mut at = position + 1;
        for statement in body.iter() {
            match *statement {
                Statement::Emit(_) => at = self.end(at),
                Statement::If {
                    condition,
                    ref accept,
                    ref reject,
                    ..
                } => {
                    let only_break = |block: &Block| {
                        block.len() == 1 && matches!(block.first(), Some(Statement::Break))
                    };
                    return if accept.is_empty() && only_break(reject) {
                        Some((at, condition, false))
                    } else if reject.is_empty() && only_break(accept) {
                        Some((at, condition, true))
                    } else {
                        None
                    };
                }
                _ => return None,
            }
        }
        None
    }

    fn term(&self, handle: Handle<Expression>) -> Option<Term> {
        let load_of =
            |handle: Handle<Expression>| match *self.function.expressions.try_get(handle).ok()? {
                Expression::Load { pointer } => self.locals.whole_local(pointer),
                _ => None,
            };
        let kind_of = |local: Handle<LocalVariable>| {
            let ty = self.function.local_variables.try_get(local).ok()?.ty;
            match self.module.types.get_handle(ty).ok()?.inner {
                TypeInner::Scalar(scalar) => {
                    IntegerKind::of(Literal::zero(scalar)?).map(|(kind, _)| kind)
                }
                _ => None,
            }
        };
        if let Some(local) = load_of(handle) {
            return Some(Term {
                load: handle,
                local,
                offset: 0,
                kind: kind_of(local)?,
            });
        }
        let Expression::Binary { op, left, right } =
            *self.function.expressions.try_get(handle).ok()?
        else {
            return None;
        };
        let (load, constant, sign) = match op {
            BinaryOperator::Add => {
                if load_of(left).is_some() {
                    (left, right, 1)
                } else {
                    (right, left, 1)
                }
            }
            BinaryOperator::Subtract => (left, right, -1),
            _ => return None,
        };
        let local = load_of(load)?;
        let kind = kind_of(local)?;
        let (constant_kind, value) = integer(self.module, self.function, constant)?;
        if constant_kind != kind {
            return None;
        }
        Some(Term {
            load,
            local,
            offset: value.checked_mul(sign)?,
            kind,
        })
    }

    fn start(
        &self,
        local: Handle<LocalVariable>,
        position: u32,
        parent: Option<usize>,
        siblings: &Siblings,
    ) -> Option<(IntegerKind, i128)> {
        let value = self.entry_value(local, position, parent, siblings)?;
        integer(self.module, self.function, value)
    }

    fn exits_on_entry(
        &self,
        position: u32,
        parent: Option<usize>,
        condition: Handle<Expression>,
        exit_when: bool,
        siblings: &Siblings,
    ) -> bool {
        let mut condition = condition;
        let mut exit_when = exit_when;
        while let Ok(&Expression::Unary {
            op: UnaryOperator::LogicalNot,
            expr,
        }) = self.function.expressions.try_get(condition)
        {
            condition = expr;
            exit_when = !exit_when;
        }
        let Ok(&Expression::Binary { op, left, right }) =
            self.function.expressions.try_get(condition)
        else {
            return false;
        };
        let operand = |handle: Handle<Expression>| {
            if let Some(value) = literal(self.module, self.function, handle) {
                return Some(value);
            }
            let Ok(&Expression::Load { pointer }) = self.function.expressions.try_get(handle)
            else {
                return None;
            };
            let local = self.locals.whole_local(pointer)?;
            let usage = self.locals.locals.get(local.index())?;
            if usage.escaped || usage.partial_stores > 0 {
                return None;
            }
            let value = self.entry_value(local, position, parent, siblings)?;
            literal(self.module, self.function, value)
        };
        let (Some(left), Some(right)) = (operand(left), operand(right)) else {
            return false;
        };
        compare(op, left, right) == Some(exit_when)
    }

    fn entry_value(
        &self,
        local: Handle<LocalVariable>,
        position: u32,
        parent: Option<usize>,
        siblings: &Siblings,
    ) -> Option<Handle<Expression>> {
        let usage = self.locals.locals.get(local.index())?;
        let before = usage.stores.partition_point(|&at| at < position);
        let value = match before
            .checked_sub(1)
            .and_then(|last| usage.stores.get(last))
        {
            Some(&last) => {
                let &(at, value) = siblings.get(&local)?;
                (at == last).then_some(value)?
            }
            None if parent.is_none() => self.function.local_variables.try_get(local).ok()?.init?,
            None => return None,
        };
        Some(value)
    }

    #[allow(clippy::too_many_arguments)]
    fn counter(
        &self,
        position: u32,
        end: u32,
        parent: Option<usize>,
        body: &Block,
        continuing: &Block,
        exit: Exit,
        condition: Handle<Expression>,
        exit_when: bool,
        siblings: &Siblings,
    ) -> Option<Counter> {
        let mut condition = condition;
        let mut exit_when = exit_when;
        while let Ok(&Expression::Unary {
            op: UnaryOperator::LogicalNot,
            expr,
        }) = self.function.expressions.try_get(condition)
        {
            condition = expr;
            exit_when = !exit_when;
        }
        let Expression::Binary { op, left, right } =
            *self.function.expressions.try_get(condition).ok()?
        else {
            return None;
        };
        let (term, bound, op) = match (self.term(left), self.term(right)) {
            (Some(term), _) => (term, right, op),
            (None, Some(term)) => (term, left, swapped(op)?),
            (None, None) => return None,
        };
        let op = if exit_when { op } else { negated(op)? };
        let (bound_kind, bound) = integer(self.module, self.function, bound)?;
        if bound_kind != term.kind {
            return None;
        }
        let usage = self.locals.locals.get(term.local.index())?;
        if usage.escaped || usage.partial_stores > 0 {
            return None;
        }
        let from = usage.stores.partition_point(|&at| at <= position);
        let to = usage.stores.partition_point(|&at| at < end);
        if to != from + 1 {
            return None;
        }
        let store = *usage.stores.get(from)?;
        let value = self.direct_store(position, body, continuing, store, term.local)?;
        let step_term = self.term(value)?;
        if step_term.local != term.local || step_term.offset == 0 {
            return None;
        }
        let current = |load: Handle<Expression>| {
            let at = self
                .emitted_at
                .get(load.index())
                .copied()
                .unwrap_or(u32::MAX);
            (at > position && at < store)
                .then_some(true)
                .or_else(|| (at > store && at < end).then_some(false))
        };
        if current(step_term.load) != Some(true) {
            return None;
        }
        let step = step_term.offset;
        let lag = if current(term.load)? { 0 } else { 1 };
        if matches!(exit, Exit::Header(_)) && lag != 0 {
            return None;
        }
        let (kind, start) = self.start(term.local, position, parent, siblings)?;
        if kind != term.kind {
            return None;
        }
        let tested = start
            .checked_add(term.offset)?
            .checked_add(step.checked_mul(lag)?)?;
        let first = first(tested, step, op, bound)?;
        let trips = match exit {
            Exit::Header(_) => first,
            Exit::Footer => first.checked_add(1)?,
        };
        let last_tested = tested.checked_add(step.checked_mul(first)?)?;
        let last_value = start.checked_add(step.checked_mul(trips)?)?;
        if !kind.holds(tested) || !kind.holds(last_tested) || !kind.holds(last_value) {
            return None;
        }
        Some(Counter {
            local: term.local,
            store,
            kind,
            start,
            step,
            trips: u64::try_from(trips).ok()?,
        })
    }

    fn direct_store(
        &self,
        position: u32,
        body: &Block,
        continuing: &Block,
        store: u32,
        local: Handle<LocalVariable>,
    ) -> Option<Handle<Expression>> {
        let mut at = position + 1;
        for statement in body.iter().chain(continuing.iter()) {
            if at == store {
                return match *statement {
                    Statement::Store { pointer, value }
                        if self.locals.whole_local(pointer) == Some(local) =>
                    {
                        Some(value)
                    }
                    _ => None,
                };
            }
            if at > store {
                return None;
            }
            at = self.end(at);
        }
        None
    }
}
