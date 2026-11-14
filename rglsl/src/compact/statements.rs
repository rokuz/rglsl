use alloc::{vec, vec::Vec};
use core::convert::Infallible;

use super::expressions::Adjuster;
use super::functions::FunctionTracer;
use super::{FunctionMap, ModuleMap};
use crate::arena::{BadHandle, Handle, Range};
use crate::visit::Visitor;

struct StatementTracer<'a, 't, 'f> {
    tracer: &'t mut FunctionTracer<'f>,
    blocks: Vec<&'a crate::Block>,
}

impl<'a> Visitor<'a> for StatementTracer<'a, '_, '_> {
    type Error = Infallible;

    fn expression(&mut self, handle: Handle<crate::Expression>) -> Result<(), Infallible> {
        self.tracer.expressions_used.insert(handle);
        Ok(())
    }

    fn result(&mut self, handle: Handle<crate::Expression>) -> Result<(), Infallible> {
        self.tracer.expressions_used.insert(handle);
        Ok(())
    }

    fn emitted(&mut self, _: &Range<crate::Expression>) -> Result<(), Infallible> {
        Ok(())
    }

    fn ty(&mut self, handle: Handle<crate::Type>) -> Result<(), Infallible> {
        self.tracer.types_used.insert(handle);
        Ok(())
    }

    fn constant(&mut self, handle: Handle<crate::Constant>) -> Result<(), Infallible> {
        self.tracer.as_expression().constant(handle)
    }

    fn r#override(&mut self, handle: Handle<crate::Override>) -> Result<(), Infallible> {
        self.tracer.as_expression().r#override(handle)
    }

    fn global_variable(&mut self, handle: Handle<crate::GlobalVariable>) -> Result<(), Infallible> {
        self.tracer.global_variables_used.insert(handle);
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<crate::LocalVariable>) -> Result<(), Infallible> {
        Ok(())
    }

    fn function(&mut self, handle: Handle<crate::Function>) -> Result<(), Infallible> {
        self.tracer.trace_call(handle);
        Ok(())
    }

    fn block(&mut self, block: &'a crate::Block) -> Result<(), Infallible> {
        self.blocks.push(block);
        Ok(())
    }
}

impl FunctionTracer<'_> {
    pub fn trace_block(&mut self, block: &crate::Block) {
        let mut tracer = StatementTracer {
            tracer: self,
            blocks: vec![block],
        };
        while let Some(block) = tracer.blocks.pop() {
            for statement in block.iter() {
                let Ok(()) = statement.visit(&mut tracer);
            }
        }
    }
}

impl FunctionMap {
    pub fn adjust_body(
        &self,
        function: &mut crate::Function,
        module: &ModuleMap,
    ) -> Result<(), BadHandle> {
        let mut adjuster = Adjuster {
            module,
            expressions: &self.expressions,
            compacted: Some(&function.expressions),
            blocks: vec![&mut function.body],
        };
        while let Some(block) = adjuster.blocks.pop() {
            let statements: &mut [crate::Statement] = block;
            for statement in statements {
                statement.visit_mut(&mut adjuster)?;
            }
        }
        Ok(())
    }
}
