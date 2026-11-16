use alloc::boxed::Box;
use alloc::rc::Rc;
use alloc::vec::Vec;
use core::cell::Cell;
use core::fmt;
use core::future::Future;
use core::pin::Pin;
use core::task::{Context, Poll, Waker};

type Frame<'b> = Pin<Box<dyn Future<Output = ()> + 'b>>;
type Body<'b, T> = Pin<Box<dyn Future<Output = T> + 'b>>;

pub const INLINE_STACK_BYTES: usize = 32 * 1024;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct InlineDepth(u8);

impl InlineDepth {
    pub const MAX: Self = Self(6);

    pub const fn nested(self) -> Option<Self> {
        match self.0.checked_sub(1) {
            Some(remaining) => Some(Self(remaining)),
            None => None,
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, thiserror::Error)]
#[error("a walk driven by the frame stack stopped before it finished")]
pub struct Stalled;

#[derive(Clone)]
pub struct Stack<'b> {
    spawned: Rc<Cell<Option<Frame<'b>>>>,
    base: usize,
}

impl fmt::Debug for Stack<'_> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("Stack")
    }
}

#[inline(never)]
fn stack_address() -> usize {
    let marker = 0_u8;
    core::ptr::from_ref(&marker).addr()
}

impl<'b> Stack<'b> {
    pub fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        Call {
            stack: self.clone(),
            state: State::Unpolled(Box::pin(frame)),
        }
    }

    fn has_room(&self) -> bool {
        stack_address().abs_diff(self.base) < INLINE_STACK_BYTES
    }

    fn spawn<T: 'b>(&self, frame: Body<'b, T>) -> Rc<Cell<Option<T>>> {
        let slot = Rc::new(Cell::new(None));
        let result = Rc::clone(&slot);
        self.spawned.set(Some(Box::pin(async move {
            result.set(Some(frame.await));
        })));
        slot
    }
}

enum State<'b, T> {
    Unpolled(Body<'b, T>),
    Inline(Body<'b, T>),
    Spawned(Rc<Cell<Option<T>>>),
    Finished,
}

#[must_use]
pub struct Call<'b, T> {
    stack: Stack<'b>,
    state: State<'b, T>,
}

impl<T> fmt::Debug for Call<'_, T> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("Call")
    }
}

impl<'b, T: 'b> Future for Call<'b, T> {
    type Output = T;

    fn poll(self: Pin<&mut Self>, context: &mut Context<'_>) -> Poll<T> {
        let this = self.get_mut();
        this.state = match core::mem::replace(&mut this.state, State::Finished) {
            State::Unpolled(frame) if this.stack.has_room() => State::Inline(frame),
            State::Unpolled(frame) => State::Spawned(this.stack.spawn(frame)),
            started => started,
        };
        let polled = match this.state {
            State::Inline(ref mut frame) => frame.as_mut().poll(context),
            State::Spawned(ref slot) => slot.take().map_or(Poll::Pending, Poll::Ready),
            State::Unpolled(_) | State::Finished => Poll::Pending,
        };
        if polled.is_ready() {
            this.state = State::Finished;
        }
        polled
    }
}

pub fn run<'b, T: 'b, F: Future<Output = T> + 'b>(root: impl FnOnce(Stack<'b>) -> F) -> Option<T> {
    let stack = Stack {
        spawned: Rc::new(Cell::new(None)),
        base: stack_address(),
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
    use super::{Stack, run};

    #[test]
    fn a_frame_that_waits_without_a_call_stalls_the_run() {
        assert_eq!(run(|_| core::future::pending::<u32>()), None);
        assert_eq!(run(|_| async { 7 }), Some(7));
    }

    async fn depth(stack: Stack<'_>, levels: u32) -> u32 {
        let mut total = 0;
        if levels > 0 {
            total = stack.call(depth(stack.clone(), levels - 1)).await + 1;
        }
        total
    }

    #[test]
    fn deep_calls_finish_inline_and_on_the_trampoline() {
        for levels in [0, 1, 10, 1000, 100_000] {
            assert_eq!(run(|stack| depth(stack, levels)), Some(levels));
        }
    }

    #[test]
    fn a_stall_below_inline_frames_stalls_the_run() {
        async fn stall(stack: Stack<'_>, levels: u32) -> u32 {
            if levels == 0 {
                return core::future::pending::<u32>().await;
            }
            stack.call(stall(stack.clone(), levels - 1)).await
        }
        assert_eq!(run(|stack| stall(stack, 3)), None);
    }
}
