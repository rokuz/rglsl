use rglsl::ir::visit::Visitor;
use rglsl::{
    Block, Constant, Expression, Function, GlobalVariable, Handle, LocalVariable, Override, Range,
    Statement, Type,
};
use rglsl_types::stack::recurse;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Root {
    Local(Handle<LocalVariable>),
    Global(Handle<GlobalVariable>),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct Pointer {
    pub root: Root,
    pub whole: bool,
    pub constant: bool,
}

#[derive(Debug, Clone, Default)]
pub(crate) struct Usage {
    pub escaped: bool,
    pub dynamic: bool,
    pub whole_loads: u32,
    pub partial_loads: u32,
    pub whole_stores: u32,
    pub partial_stores: u32,
    pub stores: Vec<u32>,
}

impl Usage {
    pub const fn partial(&self) -> bool {
        self.partial_loads > 0 || self.partial_stores > 0
    }
}

#[derive(Debug)]
pub(crate) struct Locals {
    pub pointers: Vec<Option<Pointer>>,
    pub locals: Vec<Usage>,
    pub globals: Vec<Usage>,
    pub ends: Vec<u32>,
}

pub(crate) const FIRST: u32 = 1;

impl Locals {
    pub fn of(function: &Function, globals: usize) -> Self {
        let mut locals = Self {
            pointers: Vec::with_capacity(function.expressions.len()),
            locals: vec![Usage::default(); function.local_variables.len()],
            globals: vec![Usage::default(); globals],
            ends: vec![0; FIRST as usize],
        };
        for (_, expression) in function.expressions.iter() {
            let pointer = locals.expression(expression);
            locals.pointers.push(pointer);
        }
        locals.block(&function.body);
        locals
    }

    pub fn pointer(&self, handle: Handle<Expression>) -> Option<Pointer> {
        self.pointers.get(handle.index()).copied().flatten()
    }

    pub fn usage(&self, root: Root) -> Option<&Usage> {
        match root {
            Root::Local(local) => self.locals.get(local.index()),
            Root::Global(global) => self.globals.get(global.index()),
        }
    }

    fn usage_mut(&mut self, root: Root) -> Option<&mut Usage> {
        match root {
            Root::Local(local) => self.locals.get_mut(local.index()),
            Root::Global(global) => self.globals.get_mut(global.index()),
        }
    }

    pub fn statements(&self) -> u32 {
        u32::try_from(self.ends.len()).unwrap_or(u32::MAX)
    }

    pub fn end(&self, position: u32) -> u32 {
        self.ends
            .get(position as usize)
            .copied()
            .unwrap_or(u32::MAX)
    }

    fn escape(&mut self, operand: Handle<Expression>) {
        if let Some(pointer) = self.pointer(operand)
            && let Some(usage) = self.usage_mut(pointer.root)
        {
            usage.escaped = true;
        }
    }

    fn expression(&mut self, expression: &Expression) -> Option<Pointer> {
        match *expression {
            Expression::LocalVariable(local) => Some(Pointer {
                root: Root::Local(local),
                whole: true,
                constant: true,
            }),
            Expression::GlobalVariable(global) => Some(Pointer {
                root: Root::Global(global),
                whole: true,
                constant: true,
            }),
            Expression::AccessIndex { base, .. } => {
                let base = self.pointer(base)?;
                Some(Pointer {
                    root: base.root,
                    whole: false,
                    constant: base.constant,
                })
            }
            Expression::Access { base, index } => {
                self.escape(index);
                let pointer = self.pointer(base)?;
                if pointer.whole
                    && let Some(usage) = self.usage_mut(pointer.root)
                {
                    usage.dynamic = true;
                }
                Some(Pointer {
                    root: pointer.root,
                    whole: false,
                    constant: false,
                })
            }
            Expression::Load { pointer } => {
                if let Some(pointer) = self.pointer(pointer)
                    && let Some(usage) = self.usage_mut(pointer.root)
                {
                    if pointer.whole {
                        usage.whole_loads += 1;
                    } else {
                        usage.partial_loads += 1;
                    }
                }
                None
            }
            ref other => {
                other.for_each_operand(|operand| self.escape(operand));
                None
            }
        }
    }

    fn block(&mut self, block: &Block) {
        for statement in block.iter() {
            let position = self.statements();
            self.ends.push(position);
            self.statement(statement, position);
            statement.for_each_child_block(|child| recurse(|| self.block(child)));
            let end = self.statements();
            if let Some(slot) = self.ends.get_mut(position as usize) {
                *slot = end;
            }
        }
    }

    fn statement(&mut self, statement: &Statement, position: u32) {
        match *statement {
            Statement::Emit(_) => {}
            Statement::DebugValue { value, .. } => self.escape(value),
            Statement::Store { pointer, value } => {
                self.escape(value);
                if let Some(target) = self.pointer(pointer)
                    && let Some(usage) = self.usage_mut(target.root)
                {
                    usage.stores.push(position);
                    if target.whole {
                        usage.whole_stores += 1;
                    } else {
                        usage.partial_stores += 1;
                    }
                }
            }
            ref other => {
                let Ok(()) = other.visit(&mut Escapes(self));
            }
        }
    }
}

struct Escapes<'l>(&'l mut Locals);

impl<'a> Visitor<'a> for Escapes<'_> {
    type Error = core::convert::Infallible;

    fn expression(&mut self, handle: Handle<Expression>) -> Result<(), Self::Error> {
        self.0.escape(handle);
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

    fn global_variable(&mut self, handle: Handle<GlobalVariable>) -> Result<(), Self::Error> {
        if let Some(usage) = self.0.globals.get_mut(handle.index()) {
            usage.escaped = true;
        }
        Ok(())
    }

    fn local_variable(&mut self, handle: Handle<LocalVariable>) -> Result<(), Self::Error> {
        if let Some(usage) = self.0.locals.get_mut(handle.index()) {
            usage.escaped = true;
        }
        Ok(())
    }

    fn function(&mut self, _: Handle<rglsl::Function>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn block(&mut self, _: &'a Block) -> Result<(), Self::Error> {
        Ok(())
    }
}
