use alloc::vec::{self, Vec};
use core::fmt;
use core::hash::{Hash, Hasher};
use core::ops::{Deref, DerefMut};
use core::slice;

use arrayvec::ArrayVec;

pub struct SmallVec<T, const N: usize> {
    storage: Storage<T, N>,
}

#[derive(Clone)]
enum Storage<T, const N: usize> {
    Inline(ArrayVec<T, N>),
    Heap(Vec<T>),
}

impl<T, const N: usize> SmallVec<T, N> {
    pub const fn new() -> Self {
        Self {
            storage: Storage::Inline(ArrayVec::new_const()),
        }
    }

    pub fn with_capacity(capacity: usize) -> Self {
        if capacity <= N {
            Self::new()
        } else {
            Self {
                storage: Storage::Heap(Vec::with_capacity(capacity)),
            }
        }
    }

    pub const fn spilled(&self) -> bool {
        matches!(self.storage, Storage::Heap(_))
    }

    pub fn as_slice(&self) -> &[T] {
        match self.storage {
            Storage::Inline(ref inline) => inline.as_slice(),
            Storage::Heap(ref heap) => heap.as_slice(),
        }
    }

    pub fn as_mut_slice(&mut self) -> &mut [T] {
        match self.storage {
            Storage::Inline(ref mut inline) => inline.as_mut_slice(),
            Storage::Heap(ref mut heap) => heap.as_mut_slice(),
        }
    }

    pub fn push(&mut self, value: T) {
        match self.storage {
            Storage::Inline(ref mut inline) => {
                if let Err(full) = inline.try_push(value) {
                    let mut heap = Vec::with_capacity(N.saturating_mul(2).max(4));
                    heap.extend(inline.drain(..));
                    heap.push(full.element());
                    self.storage = Storage::Heap(heap);
                }
            }
            Storage::Heap(ref mut heap) => heap.push(value),
        }
    }

    pub fn pop(&mut self) -> Option<T> {
        match self.storage {
            Storage::Inline(ref mut inline) => inline.pop(),
            Storage::Heap(ref mut heap) => heap.pop(),
        }
    }

    pub fn remove(&mut self, index: usize) -> Option<T> {
        match self.storage {
            Storage::Inline(ref mut inline) => inline.pop_at(index),
            Storage::Heap(ref mut heap) => (index < heap.len()).then(|| heap.remove(index)),
        }
    }

    pub fn truncate(&mut self, len: usize) {
        match self.storage {
            Storage::Inline(ref mut inline) => inline.truncate(len),
            Storage::Heap(ref mut heap) => heap.truncate(len),
        }
    }

    pub fn clear(&mut self) {
        self.truncate(0);
    }
}

impl<T: Clone, const N: usize> SmallVec<T, N> {
    pub fn from_elem(value: T, count: usize) -> Self {
        let mut values = Self::with_capacity(count);
        values.extend(core::iter::repeat_n(value, count));
        values
    }

    pub fn extend_from_slice(&mut self, values: &[T]) {
        match self.storage {
            Storage::Heap(ref mut heap) => heap.extend_from_slice(values),
            Storage::Inline(_) => self.extend(values.iter().cloned()),
        }
    }
}

impl<T, const N: usize> Default for SmallVec<T, N> {
    fn default() -> Self {
        Self::new()
    }
}

impl<T: Clone, const N: usize> Clone for SmallVec<T, N> {
    fn clone(&self) -> Self {
        Self {
            storage: self.storage.clone(),
        }
    }
}

impl<T: fmt::Debug, const N: usize> fmt::Debug for SmallVec<T, N> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.debug_list().entries(self.as_slice()).finish()
    }
}

impl<T: PartialEq, const N: usize> PartialEq for SmallVec<T, N> {
    fn eq(&self, other: &Self) -> bool {
        self.as_slice() == other.as_slice()
    }
}

impl<T: Eq, const N: usize> Eq for SmallVec<T, N> {}

impl<T: PartialEq, const N: usize> PartialEq<[T]> for SmallVec<T, N> {
    fn eq(&self, other: &[T]) -> bool {
        self.as_slice() == other
    }
}

impl<T: PartialEq, const N: usize> PartialEq<Vec<T>> for SmallVec<T, N> {
    fn eq(&self, other: &Vec<T>) -> bool {
        self.as_slice() == other.as_slice()
    }
}

impl<T: Hash, const N: usize> Hash for SmallVec<T, N> {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.as_slice().hash(state);
    }
}

impl<T, const N: usize> Deref for SmallVec<T, N> {
    type Target = [T];

    fn deref(&self) -> &[T] {
        self.as_slice()
    }
}

impl<T, const N: usize> DerefMut for SmallVec<T, N> {
    fn deref_mut(&mut self) -> &mut [T] {
        self.as_mut_slice()
    }
}

impl<T, const N: usize> AsRef<[T]> for SmallVec<T, N> {
    fn as_ref(&self) -> &[T] {
        self.as_slice()
    }
}

impl<T, const N: usize> Extend<T> for SmallVec<T, N> {
    fn extend<I: IntoIterator<Item = T>>(&mut self, values: I) {
        for value in values {
            self.push(value);
        }
    }
}

impl<T, const N: usize> FromIterator<T> for SmallVec<T, N> {
    fn from_iter<I: IntoIterator<Item = T>>(values: I) -> Self {
        let values = values.into_iter();
        let mut collected = Self::with_capacity(values.size_hint().0);
        collected.extend(values);
        collected
    }
}

impl<T, const N: usize> From<Vec<T>> for SmallVec<T, N> {
    fn from(values: Vec<T>) -> Self {
        if values.len() <= N {
            values.into_iter().collect()
        } else {
            Self {
                storage: Storage::Heap(values),
            }
        }
    }
}

impl<T: Clone, const N: usize> From<&[T]> for SmallVec<T, N> {
    fn from(values: &[T]) -> Self {
        if values.len() <= N {
            values.iter().cloned().collect()
        } else {
            Self {
                storage: Storage::Heap(values.to_vec()),
            }
        }
    }
}

impl<T, const N: usize, const M: usize> From<[T; M]> for SmallVec<T, N> {
    fn from(values: [T; M]) -> Self {
        values.into_iter().collect()
    }
}

pub enum IntoIter<T, const N: usize> {
    Inline(arrayvec::IntoIter<T, N>),
    Heap(vec::IntoIter<T>),
}

impl<T, const N: usize> Iterator for IntoIter<T, N> {
    type Item = T;

    fn next(&mut self) -> Option<T> {
        match *self {
            Self::Inline(ref mut inline) => inline.next(),
            Self::Heap(ref mut heap) => heap.next(),
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        match *self {
            Self::Inline(ref inline) => inline.size_hint(),
            Self::Heap(ref heap) => heap.size_hint(),
        }
    }
}

impl<T, const N: usize> DoubleEndedIterator for IntoIter<T, N> {
    fn next_back(&mut self) -> Option<T> {
        match *self {
            Self::Inline(ref mut inline) => inline.next_back(),
            Self::Heap(ref mut heap) => heap.next_back(),
        }
    }
}

impl<T, const N: usize> ExactSizeIterator for IntoIter<T, N> {}

impl<T: fmt::Debug, const N: usize> fmt::Debug for IntoIter<T, N> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let remaining = match *self {
            Self::Inline(ref inline) => inline.as_slice(),
            Self::Heap(ref heap) => heap.as_slice(),
        };
        formatter.debug_tuple("IntoIter").field(&remaining).finish()
    }
}

impl<T, const N: usize> IntoIterator for SmallVec<T, N> {
    type Item = T;
    type IntoIter = IntoIter<T, N>;

    fn into_iter(self) -> IntoIter<T, N> {
        match self.storage {
            Storage::Inline(inline) => IntoIter::Inline(inline.into_iter()),
            Storage::Heap(heap) => IntoIter::Heap(heap.into_iter()),
        }
    }
}

impl<'a, T, const N: usize> IntoIterator for &'a SmallVec<T, N> {
    type Item = &'a T;
    type IntoIter = slice::Iter<'a, T>;

    fn into_iter(self) -> slice::Iter<'a, T> {
        self.as_slice().iter()
    }
}

impl<'a, T, const N: usize> IntoIterator for &'a mut SmallVec<T, N> {
    type Item = &'a mut T;
    type IntoIter = slice::IterMut<'a, T>;

    fn into_iter(self) -> slice::IterMut<'a, T> {
        self.as_mut_slice().iter_mut()
    }
}

#[cfg(test)]
mod tests {
    use alloc::vec::Vec;

    use super::SmallVec;

    #[test]
    fn values_spill_to_the_heap_in_order() {
        let mut values = SmallVec::<u32, 2>::new();
        for value in 0..5 {
            values.push(value);
            assert_eq!(values.spilled(), value >= 2);
        }
        assert_eq!(values.as_slice(), &[0, 1, 2, 3, 4]);
        assert_eq!(values.pop(), Some(4));
        values.truncate(1);
        assert_eq!(values, Vec::from([0]));
        assert_eq!(values.into_iter().rev().collect::<Vec<_>>(), [0]);
    }

    #[test]
    fn conversions_keep_the_values() {
        let from_vec = SmallVec::<u32, 1>::from(Vec::from([1, 2, 3]));
        let from_slice = SmallVec::<u32, 1>::from(&[1, 2, 3][..]);
        let collected: SmallVec<u32, 1> = (1..4).collect();
        assert_eq!(from_vec, from_slice);
        assert_eq!(from_vec, collected);
        assert_eq!(SmallVec::<u32, 4>::from_elem(7, 3).as_slice(), &[7, 7, 7]);
        let mut extended = SmallVec::<u32, 2>::from([1]);
        extended.extend_from_slice(&[2, 3]);
        assert_eq!(extended.as_slice(), &[1, 2, 3]);
    }
}
