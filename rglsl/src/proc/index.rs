/*!
Index helpers.
*/

use crate::arena::Handle;

/// An index that may be statically known, or may need to be computed at runtime.
///
/// This enum lets us handle both [`Access`] and [`AccessIndex`] expressions
/// with the same code.
///
/// [`Access`]: crate::Expression::Access
/// [`AccessIndex`]: crate::Expression::AccessIndex
#[derive(Clone, Copy, Debug)]
pub enum GuardedIndex {
    Known(u32),
    Expression(Handle<crate::Expression>),
}

#[cfg_attr(
    not(spv_out),
    allow(dead_code, reason = "only the SPIR-V backend uses these")
)]
impl GuardedIndex {
    /// Make a `GuardedIndex::Known` from a `GuardedIndex::Expression` if possible.
    ///
    /// Return values that are already `Known` unchanged.
    pub(crate) fn try_resolve_to_constant(
        &mut self,
        expressions: &crate::Arena<crate::Expression>,
        module: &crate::Module,
    ) {
        if let GuardedIndex::Expression(expr) = *self {
            *self = GuardedIndex::from_expression(expr, expressions, module);
        }
    }

    pub(crate) fn from_expression(
        expr: Handle<crate::Expression>,
        expressions: &crate::Arena<crate::Expression>,
        module: &crate::Module,
    ) -> Self {
        match module.to_ctx().get_const_val_from(expr, expressions) {
            Ok(value) => Self::Known(value),
            Err(_) => Self::Expression(expr),
        }
    }
}

#[derive(Clone, Copy, Debug, thiserror::Error, PartialEq)]
pub enum IndexableLengthError {
    #[error("Type is not indexable, and has no length (validation error)")]
    TypeNotIndexable,
    #[error(transparent)]
    ResolveArraySizeError(#[from] super::ResolveArraySizeError),
    #[error("Array size is still pending")]
    Pending(crate::ArraySize),
}

impl crate::TypeInner {
    /// Return the length of a subscriptable type.
    ///
    /// The `self` parameter should be a handle to a vector, matrix, or array
    /// type, a pointer to one of those, or a value pointer. Arrays may be
    /// fixed-size, dynamically sized, or sized by a specializable constant.
    /// This function does not handle struct member references, as with
    /// `AccessIndex`.
    ///
    /// The value returned is appropriate for bounds checks on subscripting.
    ///
    /// Return an error if `self` does not describe a subscriptable type at all.
    pub fn indexable_length(
        &self,
        module: &crate::Module,
    ) -> Result<IndexableLength, IndexableLengthError> {
        use crate::TypeInner as Ti;
        let known_length = match *self {
            Ti::Vector { size, .. } => size as _,
            Ti::Matrix { columns, .. } => columns as _,
            Ti::LongVector {
                size: crate::CooperativeSize::Constant(size),
                ..
            } => size.get(),
            Ti::LongVector { .. } | Ti::CooperativeMatrix { .. } => {
                return Ok(IndexableLength::Dynamic)
            }
            Ti::Array { size, .. } | Ti::BindingArray { size, .. } => {
                return size.to_indexable_length(module);
            }
            Ti::ValuePointer {
                size: Some(size), ..
            } => size as _,
            Ti::Pointer { base, .. } => {
                // When assigning types to expressions, ResolveContext::Resolve
                // does a separate sub-match here instead of a full recursion,
                // so we'll do the same.
                let base_inner = &module.types[base].inner;
                match *base_inner {
                    Ti::Vector { size, .. } => size as _,
                    Ti::Matrix { columns, .. } => columns as _,
                    Ti::LongVector {
                        size: crate::CooperativeSize::Constant(size),
                        ..
                    } => size.get(),
                    Ti::LongVector { .. } | Ti::CooperativeMatrix { .. } => {
                        return Ok(IndexableLength::Dynamic)
                    }
                    Ti::Array { size, .. } | Ti::BindingArray { size, .. } => {
                        return size.to_indexable_length(module)
                    }
                    _ => return Err(IndexableLengthError::TypeNotIndexable),
                }
            }
            _ => return Err(IndexableLengthError::TypeNotIndexable),
        };
        Ok(IndexableLength::Known(known_length))
    }

    /// Return the length of `self`, assuming overrides are yet to be supplied.
    ///
    /// Return the number of elements in `self`:
    ///
    /// - If `self` is a runtime-sized array, then return
    ///   [`IndexableLength::Dynamic`].
    ///
    /// - If `self` is an override-sized array, then assume that override values
    ///   have not yet been supplied, and return [`IndexableLength::Dynamic`].
    ///
    /// - Otherwise, the type simply tells us the length of `self`, so return
    ///   [`IndexableLength::Known`].
    ///
    /// If `self` is not an indexable type at all, return an error.
    ///
    /// The difference between this and `indexable_length_resolved` is that we
    /// treat override-sized arrays and dynamically-sized arrays both as
    /// [`Dynamic`], on the assumption that our callers want to treat both cases
    /// as "not yet possible to check".
    ///
    /// [`Dynamic`]: IndexableLength::Dynamic
    pub fn indexable_length_pending(
        &self,
        module: &crate::Module,
    ) -> Result<IndexableLength, IndexableLengthError> {
        let length = self.indexable_length(module);
        if let Err(IndexableLengthError::Pending(_)) = length {
            return Ok(IndexableLength::Dynamic);
        }
        length
    }

    /// Return the length of `self`, assuming overrides have been resolved.
    ///
    /// Return the number of elements in `self`:
    ///
    /// - If `self` is a runtime-sized array, then return
    ///   [`IndexableLength::Dynamic`].
    ///
    /// - If `self` is an override-sized array, then assume that the override's
    ///   value is a fully-evaluated constant expression, and return
    ///   [`IndexableLength::Known`]. Otherwise, return an error.
    ///
    /// - Otherwise, the type simply tells us the length of `self`, so return
    ///   [`IndexableLength::Known`].
    ///
    /// If `self` is not an indexable type at all, return an error.
    ///
    /// The difference between this and `indexable_length_pending` is
    /// that if `self` is override-sized, we require the override's
    /// value to be known.
    pub fn indexable_length_resolved(
        &self,
        module: &crate::Module,
    ) -> Result<IndexableLength, IndexableLengthError> {
        let length = self.indexable_length(module);

        // If the length is override-based, then try to compute its value now.
        if let Err(IndexableLengthError::Pending(size)) = length {
            if let IndexableLength::Known(computed) = size.resolve(module.to_ctx())? {
                return Ok(IndexableLength::Known(computed));
            }
        }
        length
    }
}

/// The number of elements in an indexable type.
///
/// This summarizes the length of vectors, matrices, and arrays in a way that is
/// convenient for indexing and bounds-checking code.
#[derive(Debug)]
pub enum IndexableLength {
    /// Values of this type always have the given number of elements.
    Known(u32),

    /// The number of elements is determined at runtime.
    Dynamic,
}

impl crate::ArraySize {
    pub const fn to_indexable_length(
        self,
        _module: &crate::Module,
    ) -> Result<IndexableLength, IndexableLengthError> {
        match self {
            Self::Constant(length) => Ok(IndexableLength::Known(length.get())),
            Self::Pending(_) => Err(IndexableLengthError::Pending(self)),
            Self::Dynamic => Ok(IndexableLength::Dynamic),
        }
    }
}
