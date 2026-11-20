use alloc::vec::Vec;
use core::convert::Infallible;

use super::{HandleMap, HandleSet, ModuleMap};
use crate::arena::{Arena, BadHandle, Handle, Range};
use crate::visit::{Visitor, VisitorMut};

pub struct ExpressionTracer<'tracer> {
    pub constants: &'tracer Arena<crate::Constant>,
    pub overrides: &'tracer Arena<crate::Override>,

    /// The arena in which we are currently tracing expressions.
    pub expressions: &'tracer Arena<crate::Expression>,

    /// The used map for `types`.
    pub types_used: &'tracer mut HandleSet<crate::Type>,

    /// The used map for global variables.
    pub global_variables_used: &'tracer mut HandleSet<crate::GlobalVariable>,

    /// The used map for `constants`.
    pub constants_used: &'tracer mut HandleSet<crate::Constant>,

    /// The used map for `overrides`.
    pub overrides_used: &'tracer mut HandleSet<crate::Override>,

    /// The used set for `arena`.
    ///
    /// This points to whatever arena holds the expressions we are
    /// currently tracing: either a function's expression arena, or
    /// the module's constant expression arena.
    pub expressions_used: &'tracer mut HandleSet<crate::Expression>,

    /// The used set for the module's `global_expressions` arena.
    ///
    /// If `None`, we are already tracing the constant expressions,
    /// and `expressions_used` already refers to their handle set.
    pub global_expressions_used: Option<&'tracer mut HandleSet<crate::Expression>>,
}

impl ExpressionTracer<'_> {
    /// Propagate usage through `self.expressions`, starting with `self.expressions_used`.
    ///
    /// Treat `self.expressions_used` as the initial set of "known
    /// live" expressions, and follow through to identify all
    /// transitively used expressions.
    ///
    /// Mark types, constants, and constant expressions used directly
    /// by `self.expressions` as used. Items used indirectly are not
    /// marked.
    ///
    /// [fe]: crate::Function::expressions
    /// [ce]: crate::Module::global_expressions
    pub fn trace_expressions(&mut self) {
        log::trace!(
            "entering trace_expression of {}",
            if self.global_expressions_used.is_some() {
                "function expressions"
            } else {
                "const expressions"
            }
        );

        // We don't need recursion or a work list. Because an
        // expression may only refer to other expressions that precede
        // it in the arena, it suffices to make a single pass over the
        // arena from back to front, marking the referents of used
        // expressions as used themselves.
        for (handle, expr) in self.expressions.iter().rev() {
            // If this expression isn't used, it doesn't matter what it uses.
            if !self.expressions_used.contains(handle) {
                continue;
            }

            log::trace!("tracing new expression {expr:?}");
            self.trace_expression(expr);
        }
    }

    pub fn trace_expression(&mut self, expr: &crate::Expression) {
        let Ok(()) = expr.visit(self);
    }
}

impl<'a> Visitor<'a> for ExpressionTracer<'_> {
    type Error = Infallible;

    fn expression(&mut self, handle: Handle<crate::Expression>) -> Result<(), Infallible> {
        self.expressions_used.insert(handle);
        Ok(())
    }

    fn result(&mut self, handle: Handle<crate::Expression>) -> Result<(), Infallible> {
        self.expressions_used.insert(handle);
        Ok(())
    }

    fn ty(&mut self, handle: Handle<crate::Type>) -> Result<(), Infallible> {
        self.types_used.insert(handle);
        Ok(())
    }

    fn constant(&mut self, handle: Handle<crate::Constant>) -> Result<(), Infallible> {
        self.constants_used.insert(handle);
        let constant = &self.constants[handle];
        self.types_used.insert(constant.ty);
        match self.global_expressions_used {
            Some(ref mut used) => used.insert(constant.init),
            None => self.expressions_used.insert(constant.init),
        };
        Ok(())
    }

    fn r#override(&mut self, handle: Handle<crate::Override>) -> Result<(), Infallible> {
        self.overrides_used.insert(handle);
        let r#override = &self.overrides[handle];
        self.types_used.insert(r#override.ty);
        if let Some(init) = r#override.init {
            match self.global_expressions_used {
                Some(ref mut used) => used.insert(init),
                None => self.expressions_used.insert(init),
            };
        }
        Ok(())
    }

    fn global_variable(&mut self, handle: Handle<crate::GlobalVariable>) -> Result<(), Infallible> {
        self.global_variables_used.insert(handle);
        Ok(())
    }
}

pub(super) struct Adjuster<'a, 'm> {
    pub module: &'m ModuleMap,
    pub expressions: &'m HandleMap<crate::Expression>,
    pub compacted: Option<&'m Arena<crate::Expression>>,
    pub blocks: Vec<&'a mut crate::Block>,
}

impl<'a> VisitorMut<'a> for Adjuster<'a, '_> {
    type Error = BadHandle;

    fn expression(&mut self, handle: &mut Handle<crate::Expression>) -> Result<(), BadHandle> {
        self.expressions.adjust(handle)
    }

    fn result(&mut self, handle: &mut Handle<crate::Expression>) -> Result<(), BadHandle> {
        self.expressions.adjust(handle)
    }

    fn emitted(&mut self, range: &mut Range<crate::Expression>) -> Result<(), BadHandle> {
        if let Some(compacted) = self.compacted {
            self.expressions.adjust_range(range, compacted);
        }
        Ok(())
    }

    fn ty(&mut self, handle: &mut Handle<crate::Type>) -> Result<(), BadHandle> {
        self.module.types.adjust(handle)
    }

    fn constant(&mut self, handle: &mut Handle<crate::Constant>) -> Result<(), BadHandle> {
        self.module.constants.adjust(handle)
    }

    fn r#override(&mut self, handle: &mut Handle<crate::Override>) -> Result<(), BadHandle> {
        self.module.overrides.adjust(handle)
    }

    fn global_variable(
        &mut self,
        handle: &mut Handle<crate::GlobalVariable>,
    ) -> Result<(), BadHandle> {
        self.module.globals.adjust(handle)
    }

    fn function(&mut self, handle: &mut Handle<crate::Function>) -> Result<(), BadHandle> {
        self.module.functions.adjust(handle)
    }

    fn block(&mut self, block: &'a mut crate::Block) -> Result<(), BadHandle> {
        self.blocks.push(block);
        Ok(())
    }
}

impl ModuleMap {
    pub fn adjust_expression(
        &self,
        expr: &mut crate::Expression,
        operand_map: &HandleMap<crate::Expression>,
    ) -> Result<(), BadHandle> {
        expr.visit_mut(&mut Adjuster {
            module: self,
            expressions: operand_map,
            compacted: None,
            blocks: Vec::new(),
        })
    }
}
