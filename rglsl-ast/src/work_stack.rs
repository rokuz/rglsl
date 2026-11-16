use alloc::vec::Vec;
use core::cell::Cell;

pub(crate) struct WorkStack<T> {
    items: Cell<Vec<T>>,
}

impl<T> WorkStack<T> {
    pub(crate) fn with_capacity(capacity: usize) -> Self {
        Self {
            items: Cell::new(Vec::with_capacity(capacity)),
        }
    }

    fn update<R>(&self, change: impl FnOnce(&mut Vec<T>) -> R) -> R {
        let mut items = self.items.take();
        let result = change(&mut items);
        self.items.set(items);
        result
    }

    pub(crate) fn frame(&self) -> Frame<'_, T> {
        Frame {
            stack: self,
            base: self.update(|items| items.len()),
        }
    }
}

pub(crate) struct Frame<'s, T> {
    stack: &'s WorkStack<T>,
    base: usize,
}

impl<T> Frame<'_, T> {
    pub(crate) fn push(&self, item: T) {
        self.stack.update(|items| items.push(item));
    }

    pub(crate) fn pop(&self) -> Option<T> {
        self.stack.update(|items| {
            if items.len() > self.base {
                items.pop()
            } else {
                None
            }
        })
    }

    pub(crate) fn len(&self) -> usize {
        self.stack
            .update(|items| items.len().saturating_sub(self.base))
    }

    pub(crate) fn is_empty(&self) -> bool {
        self.len() == 0
    }
}

impl<T: Copy> Frame<'_, T> {
    pub(crate) fn last(&self) -> Option<T> {
        self.stack
            .update(|items| items.get(self.base..).and_then(<[T]>::last).copied())
    }
}

impl<T> Drop for Frame<'_, T> {
    fn drop(&mut self) {
        let base = self.base;
        self.stack.update(|items| items.truncate(base));
    }
}

#[cfg(test)]
mod tests {
    use super::WorkStack;

    #[test]
    fn a_frame_sees_and_drops_only_its_own_items() {
        let stack = WorkStack::with_capacity(4);
        let outer = stack.frame();
        outer.push(1);
        {
            let inner = stack.frame();
            assert!(inner.is_empty());
            inner.push(2);
            inner.push(3);
            assert_eq!(inner.last(), Some(3));
            assert_eq!(inner.pop(), Some(3));
            assert_eq!(inner.len(), 1);
        }
        assert_eq!(outer.len(), 1);
        assert_eq!(outer.pop(), Some(1));
        assert_eq!(outer.pop(), None);
    }
}
