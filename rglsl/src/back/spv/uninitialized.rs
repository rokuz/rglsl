use alloc::{vec, vec::Vec};

use rglsl_types::stack::recurse;

use crate::arena::{Handle, UniqueArena};
use crate::{Block, Expression, Function, LocalVariable, Statement, Type, TypeInner};

pub(super) fn plain_types(types: &UniqueArena<Type>) -> Vec<bool> {
    let mut plain: Vec<bool> = Vec::with_capacity(types.len());
    for (_, ty) in types.iter() {
        let is_plain = match ty.inner {
            TypeInner::Scalar(_) | TypeInner::Vector { .. } | TypeInner::Matrix { .. } => true,
            TypeInner::Struct { ref members, .. } => members
                .iter()
                .all(|member| plain.get(member.ty.index()).copied().unwrap_or(false)),
            _ => false,
        };
        plain.push(is_plain);
    }
    plain
}

pub(super) fn read_before_written(function: &Function, plain: &[bool]) -> Vec<bool> {
    Scan::new(function, plain, false).run()
}

pub(super) fn initial_value_observed(function: &Function, plain: &[bool]) -> Vec<bool> {
    Scan::new(function, plain, true).run()
}

struct Scan<'f> {
    function: &'f Function,
    strict: bool,
    read: Vec<bool>,
    written: Vec<bool>,
    trail: Vec<usize>,
    stamps: Vec<u32>,
    stamp: u32,
}

impl<'f> Scan<'f> {
    fn new(function: &'f Function, plain: &[bool], strict: bool) -> Self {
        let count = function.local_variables.len();
        Scan {
            function,
            strict,
            read: vec![false; count],
            written: function
                .local_variables
                .iter()
                .map(|(_, local)| {
                    (local.init.is_some() && !strict)
                        || !plain.get(local.ty.index()).copied().unwrap_or(false)
                })
                .collect(),
            trail: Vec::new(),
            stamps: vec![0; count],
            stamp: 0,
        }
    }

    fn run(mut self) -> Vec<bool> {
        let function = self.function;
        self.block(&function.body);
        self.read
    }

    fn root(&self, pointer: Handle<Expression>) -> Option<Handle<LocalVariable>> {
        let mut current = pointer;
        loop {
            match *self.function.expressions.try_get(current).ok()? {
                Expression::LocalVariable(local) => return Some(local),
                Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                    current = base;
                }
                _ => return None,
            }
        }
    }

    fn use_pointer(&mut self, pointer: Handle<Expression>) {
        if let Some(local) = self.root(pointer)
            && self.written.get(local.index()) == Some(&false)
            && let Some(slot) = self.read.get_mut(local.index())
        {
            *slot = true;
        }
    }

    fn write(&mut self, index: usize) {
        if let Some(slot) = self.written.get_mut(index)
            && !*slot
        {
            *slot = true;
            self.trail.push(index);
        }
    }

    fn undo(&mut self, start: usize) -> Vec<usize> {
        let undone: Vec<usize> = self.trail.drain(start..).collect();
        for &index in &undone {
            if let Some(slot) = self.written.get_mut(index) {
                *slot = false;
            }
        }
        undone
    }

    fn scoped(&mut self, block: &Block) -> Vec<usize> {
        let start = self.trail.len();
        recurse(|| self.block(block));
        self.undo(start)
    }

    fn block(&mut self, block: &Block) {
        for statement in block.iter() {
            self.statement(statement);
        }
    }

    fn statement(&mut self, statement: &Statement) {
        match *statement {
            Statement::Emit(ref range) => {
                for handle in range.clone() {
                    if let Ok(&Expression::Load { pointer }) =
                        self.function.expressions.try_get(handle)
                    {
                        self.use_pointer(pointer);
                    }
                }
            }
            Statement::Store { pointer, .. } => {
                if let Ok(&Expression::LocalVariable(local)) =
                    self.function.expressions.try_get(pointer)
                {
                    self.write(local.index());
                }
            }
            Statement::Block(ref block) => recurse(|| self.block(block)),
            Statement::If {
                ref accept,
                ref reject,
                ..
            } => {
                let accepted = self.scoped(accept);
                let rejected = self.scoped(reject);
                self.stamp = self.stamp.wrapping_add(1);
                let stamp = self.stamp;
                for &index in &accepted {
                    if let Some(slot) = self.stamps.get_mut(index) {
                        *slot = stamp;
                    }
                }
                for index in rejected {
                    if self.stamps.get(index) == Some(&stamp) {
                        self.write(index);
                    }
                }
            }
            Statement::Switch { ref cases, .. } => {
                for case in cases {
                    self.scoped(&case.body);
                }
            }
            Statement::Loop {
                ref body,
                ref continuing,
                ..
            } => {
                let start = self.trail.len();
                recurse(|| self.block(body));
                if self.strict {
                    self.undo(start);
                }
                recurse(|| self.block(continuing));
                self.undo(start);
            }
            Statement::Call { ref arguments, .. } => {
                for &argument in arguments {
                    if let Some(local) = self.root(argument) {
                        self.write(local.index());
                    }
                }
            }
            ref other => {
                let mut pointers = Vec::new();
                other.for_each_operand(|operand| pointers.push(operand));
                for pointer in pointers {
                    if let Some(local) = self.root(pointer) {
                        self.use_pointer(pointer);
                        self.write(local.index());
                    }
                }
            }
        }
    }
}
