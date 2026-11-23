use alloc::{vec, vec::Vec};

use rglsl_types::stack::recurse;

use crate::arena::{Handle, UniqueArena};
use crate::{Block, Expression, FastHashSet, Function, LocalVariable, Statement, Type, TypeInner};

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

pub(super) fn read_unwritten(function: &Function, plain: &[bool]) -> Vec<bool> {
    Scan::new(function, plain, Mode::AnyWrite).run()
}

pub(super) fn initial_value_observed(function: &Function, plain: &[bool]) -> Vec<bool> {
    Scan::new(function, plain, Mode::Strict).run()
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Mode {
    AnyWrite,
    Strict,
}

struct Scan<'f> {
    function: &'f Function,
    mode: Mode,
    read: Vec<bool>,
    written: Vec<Option<usize>>,
    scopes: Vec<Scope>,
    current: usize,
}

#[derive(Default)]
struct Scope {
    merged_into: Option<usize>,
    open: bool,
    written: FastHashSet<usize>,
}

const ROOT: usize = 0;

impl<'f> Scan<'f> {
    fn new(function: &'f Function, plain: &[bool], mode: Mode) -> Self {
        let count = function.local_variables.len();
        Scan {
            function,
            mode,
            read: vec![false; count],
            written: function
                .local_variables
                .iter()
                .map(|(_, local)| {
                    ((local.init.is_some() && mode == Mode::AnyWrite)
                        || !plain.get(local.ty.index()).copied().unwrap_or(false))
                    .then_some(ROOT)
                })
                .collect(),
            scopes: Vec::from([Scope {
                open: true,
                ..Scope::default()
            }]),
            current: ROOT,
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

    fn representative(&mut self, scope: usize) -> usize {
        let mut top = scope;
        while let Some(next) = self.scopes.get(top).and_then(|scope| scope.merged_into) {
            top = next;
        }
        let mut current = scope;
        while let Some(entry) = self.scopes.get_mut(current)
            && let Some(next) = entry.merged_into
        {
            if next != top {
                entry.merged_into = Some(top);
            }
            current = next;
        }
        top
    }

    fn is_written(&mut self, index: usize) -> bool {
        let Some(&Some(scope)) = self.written.get(index) else {
            return false;
        };
        let top = self.representative(scope);
        self.scopes.get(top).is_some_and(|scope| scope.open)
    }

    fn use_pointer(&mut self, pointer: Handle<Expression>) {
        if let Some(local) = self.root(pointer)
            && !self.is_written(local.index())
            && let Some(slot) = self.read.get_mut(local.index())
        {
            *slot = true;
        }
    }

    fn write(&mut self, index: usize) {
        if self.is_written(index) {
            return;
        }
        let current = self.current;
        if let Some(slot) = self.written.get_mut(index) {
            *slot = Some(current);
            if self.mode == Mode::Strict
                && let Some(scope) = self.scopes.get_mut(current)
            {
                scope.written.insert(index);
            }
        }
    }

    fn scoped(&mut self, block: &Block) -> usize {
        let outer = self.current;
        let scope = self.scopes.len();
        self.scopes.push(Scope {
            open: true,
            ..Scope::default()
        });
        self.current = scope;
        recurse(|| self.block(block));
        self.current = outer;
        if let Some(entry) = self.scopes.get_mut(scope) {
            entry.open = false;
        }
        scope
    }

    fn merge(&mut self, scope: usize) {
        let current = self.current;
        if let Some(entry) = self.scopes.get_mut(scope) {
            entry.merged_into = Some(current);
        }
    }

    fn written_in(&mut self, scope: usize) -> FastHashSet<usize> {
        self.scopes
            .get_mut(scope)
            .map(|entry| core::mem::take(&mut entry.written))
            .unwrap_or_default()
    }

    fn forget(&mut self, scope: usize) {
        if let Some(entry) = self.scopes.get_mut(scope) {
            entry.written = FastHashSet::default();
        }
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
                if self.mode == Mode::AnyWrite {
                    self.merge(accepted);
                    self.merge(rejected);
                    return;
                }
                let accepted = self.written_in(accepted);
                let rejected = self.written_in(rejected);
                let (smaller, larger) = if accepted.len() <= rejected.len() {
                    (accepted, rejected)
                } else {
                    (rejected, accepted)
                };
                for index in smaller {
                    if larger.contains(&index) {
                        self.write(index);
                    }
                }
            }
            Statement::Switch { ref cases, .. } => {
                let mut scopes = Vec::with_capacity(cases.len());
                for case in cases {
                    scopes.push(self.scoped(&case.body));
                }
                if self.mode == Mode::AnyWrite {
                    for scope in scopes {
                        self.merge(scope);
                    }
                } else {
                    for scope in scopes {
                        self.forget(scope);
                    }
                }
            }
            Statement::Loop {
                ref body,
                ref continuing,
                ..
            } => {
                if self.mode == Mode::Strict {
                    let body = self.scoped(body);
                    self.forget(body);
                    let continuing = self.scoped(continuing);
                    self.forget(continuing);
                } else {
                    recurse(|| self.block(body));
                    recurse(|| self.block(continuing));
                }
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
