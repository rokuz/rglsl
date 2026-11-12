use core::cell::RefCell;
use core::future::Future;

use rglsl_types::stack::{Call, Stack};

use super::Error;

pub(super) const INTERRUPTED: Error = Error::Internal("a frame on the heap stack was interrupted");

pub(super) struct Cx<'b, W> {
    target: &'b RefCell<&'b mut W>,
    stack: Stack<'b>,
}

impl<W> Clone for Cx<'_, W> {
    fn clone(&self) -> Self {
        Self {
            target: self.target,
            stack: self.stack.clone(),
        }
    }
}

impl<'b, W> Cx<'b, W> {
    pub(super) const fn new(target: &'b RefCell<&'b mut W>, stack: Stack<'b>) -> Self {
        Self { target, stack }
    }

    pub(super) fn with<T>(&self, work: impl FnOnce(&mut W) -> T) -> Result<T, Error> {
        let mut target = self.target.try_borrow_mut().map_err(|_| INTERRUPTED)?;
        Ok(work(&mut target))
    }

    pub(super) fn try_with<T>(
        &self,
        work: impl FnOnce(&mut W) -> Result<T, Error>,
    ) -> Result<T, Error> {
        self.with(work)?
    }

    pub(super) fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        self.stack.call(frame)
    }
}

macro_rules! on_heap {
    ($target:expr, |$cx:ident| $frame:expr) => {{
        let cell = core::cell::RefCell::new(&mut *$target);
        rglsl_types::stack::run(|stack| {
            let $cx = super::frames::Cx::new(&cell, stack);
            $frame
        })
        .unwrap_or(Err(super::frames::INTERRUPTED))
    }};
}

pub(super) use on_heap;
