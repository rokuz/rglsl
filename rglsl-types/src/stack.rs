use alloc::boxed::Box;
use alloc::rc::Rc;
use alloc::vec::Vec;
use core::cell::Cell;
use core::fmt;
use core::future::Future;
use core::pin::Pin;
use core::task::{Context, Poll, Waker};

type Frame<'b> = Pin<Box<dyn Future<Output = ()> + 'b>>;

#[derive(Clone, Copy, Debug, PartialEq, Eq, thiserror::Error)]
#[error("a walk driven by the frame stack stopped before it finished")]
pub struct Stalled;

#[derive(Clone)]
pub struct Stack<'b> {
    spawned: Rc<Cell<Option<Frame<'b>>>>,
}

impl fmt::Debug for Stack<'_> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("Stack")
    }
}

impl<'b> Stack<'b> {
    pub fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        let slot = Rc::new(Cell::new(None));
        let result = Rc::clone(&slot);
        Call {
            stack: self.clone(),
            frame: Some(Box::pin(async move {
                result.set(Some(frame.await));
            })),
            slot,
        }
    }
}

#[must_use]
pub struct Call<'b, T> {
    stack: Stack<'b>,
    frame: Option<Frame<'b>>,
    slot: Rc<Cell<Option<T>>>,
}

impl<T> fmt::Debug for Call<'_, T> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("Call")
    }
}

impl<T> Future for Call<'_, T> {
    type Output = T;

    fn poll(self: Pin<&mut Self>, _: &mut Context<'_>) -> Poll<T> {
        let this = self.get_mut();
        if let Some(frame) = this.frame.take() {
            this.stack.spawned.set(Some(frame));
            return Poll::Pending;
        }
        match this.slot.take() {
            Some(value) => Poll::Ready(value),
            None => Poll::Pending,
        }
    }
}

pub fn run<'b, T: 'b, F: Future<Output = T> + 'b>(root: impl FnOnce(Stack<'b>) -> F) -> Option<T> {
    let stack = Stack {
        spawned: Rc::new(Cell::new(None)),
    };
    let mut root = core::pin::pin!(root(stack.clone()));
    let mut frames: Vec<Frame<'b>> = Vec::new();
    let mut context = Context::from_waker(Waker::noop());
    loop {
        match frames.last_mut() {
            Some(top) => {
                if top.as_mut().poll(&mut context).is_ready() {
                    frames.pop();
                    continue;
                }
            }
            None => {
                if let Poll::Ready(value) = root.as_mut().poll(&mut context) {
                    return Some(value);
                }
            }
        }
        frames.push(stack.spawned.take()?);
    }
}

#[cfg(test)]
mod tests {
    use super::run;

    #[test]
    fn a_frame_that_waits_without_a_call_stalls_the_run() {
        assert_eq!(run(|_| core::future::pending::<u32>()), None);
        assert_eq!(run(|_| async { 7 }), Some(7));
    }
}
