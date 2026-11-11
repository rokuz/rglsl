use core::cell::RefCell;
use core::future::Future;

use rglsl_ast::Span;
use rglsl_types::stack::{Call, Stack};

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;

pub(crate) struct Cx<'b, T> {
    context: &'b RefCell<&'b mut T>,
    stack: Stack<'b>,
}

impl<T> Clone for Cx<'_, T> {
    fn clone(&self) -> Self {
        Self {
            context: self.context,
            stack: self.stack.clone(),
        }
    }
}

impl<'b, T> Cx<'b, T> {
    pub(crate) const fn new(context: &'b RefCell<&'b mut T>, stack: Stack<'b>) -> Self {
        Self { context, stack }
    }

    pub(crate) fn call<R: 'b>(&self, frame: impl Future<Output = R> + 'b) -> Call<'b, R> {
        self.stack.call(frame)
    }

    pub(crate) fn with<R>(&self, work: impl FnOnce(&mut T) -> R) -> R {
        work(&mut self.context.borrow_mut())
    }
}

impl Analyzer<'_> {
    pub(crate) fn stalled<T>(&mut self, fallback: T) -> T {
        self.error(Span::default(), DiagnosticKind::Internal);
        fallback
    }
}
