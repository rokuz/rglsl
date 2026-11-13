//! Displaying rglsl IR terms in debugging output.

use crate::proc::TypeResolution;
use crate::{Handle, Scalar, Type, TypeInner, UniqueArena};

use core::fmt;

/// A wrapper for displaying rglsl IR terms in debugging output.
///
/// This is like [`DiagnosticDisplay`], but requires weaker context
/// and produces correspondingly lower-fidelity output. For example,
/// this cannot show the override names for override-sized array
/// lengths.
///
/// [`DiagnosticDisplay`]: super::DiagnosticDisplay
pub struct DiagnosticDebug<T>(pub T);

impl fmt::Debug for DiagnosticDebug<(Handle<Type>, &UniqueArena<Type>)> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (handle, ctx) = self.0;

        {
            let _ = ctx;
            write!(f, "{handle:?}")?;
        }

        Ok(())
    }
}

impl fmt::Debug for DiagnosticDebug<(&TypeInner, &UniqueArena<Type>)> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (inner, ctx) = self.0;

        {
            let _ = ctx;
            write!(f, "{inner:?}")?;
        }

        Ok(())
    }
}

impl fmt::Debug for DiagnosticDebug<(&TypeResolution, &UniqueArena<Type>)> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (resolution, ctx) = self.0;

        {
            let _ = ctx;
            write!(f, "{resolution:?}")?;
        }

        Ok(())
    }
}

impl fmt::Debug for DiagnosticDebug<Scalar> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let scalar = self.0;

        write!(f, "{scalar:?}")?;

        Ok(())
    }
}

pub trait ForDebugWithTypes: Sized {
    /// Format this type using [`core::fmt::Debug`].
    ///
    /// Given an arena to look up type handles in, return a value that
    /// implements the [`core::fmt::Debug`] trait by displaying `self`
    /// in a language-appropriate way.
    fn for_debug(self, types: &UniqueArena<Type>) -> DiagnosticDebug<(Self, &UniqueArena<Type>)> {
        DiagnosticDebug((self, types))
    }
}

impl ForDebugWithTypes for Handle<Type> {}
impl ForDebugWithTypes for &TypeInner {}
impl ForDebugWithTypes for &TypeResolution {}
