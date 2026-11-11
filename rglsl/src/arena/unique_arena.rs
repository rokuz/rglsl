//! The [`UniqueArena`] type and supporting definitions.

use alloc::vec::Vec;
use core::{fmt, hash, ops};

use super::{
    handle::{BadHandle, Handle},
    Range,
};
use crate::{FastIndexSet, Span};

/// An arena whose elements are guaranteed to be unique.
///
/// A `UniqueArena` holds a set of unique values of type `T`, each with an
/// associated [`Span`]. Inserting a value returns a `Handle<T>`, which can be
/// used to index the `UniqueArena` and obtain shared access to the `T` element.
/// Access via a `Handle` is an array lookup - no hash lookup is necessary.
///
/// The element type must implement `Eq` and `Hash`. Insertions of equivalent
/// elements, according to `Eq`, all return the same `Handle`.
///
/// Once inserted, elements generally may not be mutated, although a `replace`
/// method exists to support rare cases.
///
/// `UniqueArena` is similar to [`Arena`]: If `Arena` is vector-like,
/// `UniqueArena` is `HashSet`-like.
///
/// [`Arena`]: super::Arena
#[derive(Clone)]
pub struct UniqueArena<T> {
    set: FastIndexSet<T>,

    /// Spans for the elements, indexed by handle.
    ///
    /// The length of this vector is always equal to `set.len()`. `FastIndexSet`
    /// promises that its elements "are indexed in a compact range, without
    /// holes in the range 0..set.len()", so we can always use the indices
    /// returned by insertion as indices into this vector.
    span_info: Vec<Span>,
}

impl<T> UniqueArena<T> {
    /// Create a new arena with no initial capacity allocated.
    pub fn new() -> Self {
        UniqueArena {
            set: FastIndexSet::default(),
            span_info: Vec::new(),
        }
    }

    /// Return the current number of items stored in this arena.
    pub fn len(&self) -> usize {
        self.set.len()
    }

    /// Return `true` if the arena contains no elements.
    pub fn is_empty(&self) -> bool {
        self.set.is_empty()
    }

    /// Clears the arena, keeping all allocations.
    pub fn clear(&mut self) {
        self.set.clear();
        self.span_info.clear();
    }

    /// Replaces this arena with an empty one, returning the old data.
    pub fn take(&mut self) -> Self {
        core::mem::take(self)
    }

    /// Return the span associated with `handle`.
    ///
    /// If a value has been inserted multiple times, the span returned is the
    /// one provided with the first insertion.
    pub fn get_span(&self, handle: Handle<T>) -> Span {
        *self
            .span_info
            .get(handle.index())
            .unwrap_or(&Span::default())
    }

    pub(crate) fn drain_all(&mut self) -> UniqueArenaDrain<'_, T> {
        let handles = Range::full_range_from_size(self.set.len());
        UniqueArenaDrain {
            inner_elts: self.set.drain(..),
            inner_spans: self.span_info.drain(..),
            handles,
        }
    }
}

pub struct UniqueArenaDrain<'a, T> {
    inner_elts: indexmap::set::Drain<'a, T>,
    inner_spans: alloc::vec::Drain<'a, Span>,
    handles: Range<T>,
}

impl<T> Iterator for UniqueArenaDrain<'_, T> {
    type Item = (Handle<T>, T, Span);

    fn next(&mut self) -> Option<Self::Item> {
        let elt = self.inner_elts.next()?;
        let handle = self.handles.next()?;
        let span = self.inner_spans.next().unwrap_or_default();
        Some((handle, elt, span))
    }
}

impl<T: Eq + hash::Hash> UniqueArena<T> {
    /// Returns an iterator over the items stored in this arena, returning both
    /// the item's handle and a reference to it.
    pub fn iter(&self) -> impl DoubleEndedIterator<Item = (Handle<T>, &T)> + ExactSizeIterator {
        let handles = Range::full_range_from_size(self.set.len());
        self.set.iter().zip(handles).map(|(v, handle)| (handle, v))
    }

    /// Insert a new value into the arena.
    ///
    /// Return a [`Handle<T>`], which can be used to index this arena to get a
    /// shared reference to the element.
    ///
    /// If this arena already contains an element that is `Eq` to `value`,
    /// return a `Handle` to the existing element, and drop `value`.
    ///
    /// If `value` is inserted into the arena, associate `span` with
    /// it. An element's span can be retrieved with the [`get_span`]
    /// method.
    ///
    /// [`Handle<T>`]: Handle
    /// [`get_span`]: UniqueArena::get_span
    pub fn insert(&mut self, value: T, span: Span) -> Handle<T> {
        let (index, added) = self.set.insert_full(value);

        if added {
            debug_assert!(index == self.span_info.len());
            self.span_info.push(span);
        }

        debug_assert!(self.set.len() == self.span_info.len());

        Handle::from_usize(index)
    }

    /// Replace an old value with a new value.
    ///
    /// # Panics
    ///
    /// - if the old value is not in the arena
    /// - if the new value already exists in the arena
    pub fn replace(&mut self, old: Handle<T>, new: T) -> Result<(), ReplaceError> {
        self.check_contains_handle(old)?;
        let (_, added) = self.set.insert_full(new);
        if !added {
            return Err(ReplaceError::AlreadyPresent);
        }
        match self.set.swap_remove_index(old.index()) {
            Some(_) => Ok(()),
            None => Err(BadHandle::new(old).into()),
        }
    }

    /// Return this arena's handle for `value`, if present.
    ///
    /// If this arena already contains an element equal to `value`,
    /// return its handle. Otherwise, return `None`.
    pub fn get(&self, value: &T) -> Option<Handle<T>> {
        self.set
            .get_index_of(value)
            .and_then(Handle::try_from_usize)
    }

    /// Return this arena's value at `handle`, if that is a valid handle.
    pub fn get_handle(&self, handle: Handle<T>) -> Result<&T, BadHandle> {
        self.set
            .get_index(handle.index())
            .ok_or_else(|| BadHandle::new(handle))
    }

    /// Assert that `handle` is valid for this arena.
    pub fn check_contains_handle(&self, handle: Handle<T>) -> Result<(), BadHandle> {
        if handle.index() < self.set.len() {
            Ok(())
        } else {
            Err(BadHandle::new(handle))
        }
    }
}

#[derive(Clone, Copy, Debug, thiserror::Error, PartialEq)]
pub enum ReplaceError {
    #[error(transparent)]
    BadHandle(#[from] BadHandle),
    #[error("The replacement value is already present in the arena")]
    AlreadyPresent,
}

impl<T> Default for UniqueArena<T> {
    fn default() -> Self {
        Self::new()
    }
}

impl<T: fmt::Debug + Eq + hash::Hash> fmt::Debug for UniqueArena<T> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_map().entries(self.iter()).finish()
    }
}

impl<T> ops::Index<Handle<T>> for UniqueArena<T> {
    type Output = T;
    fn index(&self, handle: Handle<T>) -> &T {
        &self.set[handle.index()]
    }
}

#[cfg(feature = "serialize")]
impl<T> serde::Serialize for UniqueArena<T>
where
    T: Eq + hash::Hash + serde::Serialize,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.set.serialize(serializer)
    }
}

#[cfg(feature = "deserialize")]
impl<'de, T> serde::Deserialize<'de> for UniqueArena<T>
where
    T: Eq + hash::Hash + serde::Deserialize<'de>,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let items = Vec::<T>::deserialize(deserializer)?;
        let count = items.len();
        let set: FastIndexSet<T> = items.into_iter().collect();
        if set.len() != count {
            return Err(<D::Error as serde::de::Error>::custom(
                "a unique arena has duplicate elements",
            ));
        }
        let span_info = core::iter::repeat_n(Span::default(), set.len()).collect();

        Ok(Self { set, span_info })
    }
}

//Note: largely borrowed from `HashSet` implementation
#[cfg(feature = "arbitrary")]
impl<'a, T> arbitrary::Arbitrary<'a> for UniqueArena<T>
where
    T: Eq + hash::Hash + arbitrary::Arbitrary<'a>,
{
    fn arbitrary(u: &mut arbitrary::Unstructured<'a>) -> arbitrary::Result<Self> {
        let mut arena = Self::default();
        for elem in u.arbitrary_iter()? {
            arena.set.insert(elem?);
            arena.span_info.push(Span::UNDEFINED);
        }
        Ok(arena)
    }

    fn arbitrary_take_rest(u: arbitrary::Unstructured<'a>) -> arbitrary::Result<Self> {
        let mut arena = Self::default();
        for elem in u.arbitrary_take_rest_iter()? {
            arena.set.insert(elem?);
            arena.span_info.push(Span::UNDEFINED);
        }
        Ok(arena)
    }

    #[inline]
    fn size_hint(depth: usize) -> (usize, Option<usize>) {
        let depth_hint = <usize as arbitrary::Arbitrary>::size_hint(depth);
        arbitrary::size_hint::and(depth_hint, (0, None))
    }
}
