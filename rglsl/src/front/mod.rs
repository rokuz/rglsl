/*!
Frontend parsers that consume binary and text shaders and load them into [`Module`](super::Module)s.
*/

#[cfg(feature = "spv-in")]
pub(crate) mod interpolator;
mod type_gen;

#[cfg(feature = "spv-in")]
pub mod atomic_upgrade;
#[cfg(feature = "glsl-in")]
pub mod glsl;
#[cfg(feature = "spv-in")]
pub mod spv;

use alloc::boxed::Box;
use core::ops;

use crate::{
    arena::{Arena, Handle, HandleVec, UniqueArena},
    proc::{ResolveContext, ResolveError, TypeResolution},
};

/// A table of types for an `Arena<Expression>`.
///
/// A front end can use a `Typifier` to get types for an arena's expressions
/// while it is still contributing expressions to it. At any point, you can call
/// [`typifier.grow(expr, arena, ctx)`], where `expr` is a `Handle<Expression>`
/// referring to something in `arena`, and the `Typifier` will resolve the types
/// of all the expressions up to and including `expr`. Then you can write
/// `typifier[handle]` to get the type of any handle at or before `expr`.
///
/// Note that `Typifier` does *not* build an `Arena<Type>` as a part of its
/// usual operation. Ideally, a module's type arena should only contain types
/// actually needed by `Handle<Type>`s elsewhere in the module — functions,
/// variables, [`Compose`] expressions, other types, and so on — so we don't
/// want every little thing that occurs as the type of some intermediate
/// expression to show up there.
///
/// Instead, `Typifier` accumulates a [`TypeResolution`] for each expression,
/// which refers to the `Arena<Type>` in the [`ResolveContext`] passed to `grow`
/// as needed. [`TypeResolution`] is a lightweight representation for
/// intermediate types like this; see its documentation for details.
///
/// If you do need to register a `Typifier`'s conclusion in an `Arena<Type>`
/// (say, for a [`LocalVariable`] whose type you've inferred), you can use
/// [`register_type`] to do so.
///
/// [`typifier.grow(expr, arena)`]: Typifier::grow
/// [`register_type`]: Typifier::register_type
/// [`Compose`]: crate::Expression::Compose
/// [`LocalVariable`]: crate::LocalVariable
#[derive(Debug, Default)]
pub struct Typifier {
    resolutions: HandleVec<crate::Expression, TypeResolution>,
}

impl Typifier {
    pub const fn new() -> Self {
        Typifier {
            resolutions: HandleVec::new(),
        }
    }

    pub fn reset(&mut self) {
        self.resolutions.clear()
    }

    pub fn get<'a>(
        &'a self,
        expr_handle: Handle<crate::Expression>,
        types: &'a UniqueArena<crate::Type>,
    ) -> &'a crate::TypeInner {
        self.resolutions[expr_handle].inner_with(types)
    }

    /// Add an expression's type to an `Arena<Type>`.
    ///
    /// Add the type of `expr_handle` to `types`, and return a `Handle<Type>`
    /// referring to it.
    ///
    /// # Note
    ///
    /// If you just need a [`TypeInner`] for `expr_handle`'s type, consider
    /// using `typifier[expression].inner_with(types)` instead. Calling
    /// [`TypeResolution::inner_with`] often lets us avoid adding anything to
    /// the arena, which can significantly reduce the number of types that end
    /// up in the final module.
    ///
    /// [`TypeInner`]: crate::TypeInner
    pub fn register_type(
        &self,
        expr_handle: Handle<crate::Expression>,
        types: &mut UniqueArena<crate::Type>,
    ) -> Handle<crate::Type> {
        match self[expr_handle].clone() {
            TypeResolution::Handle(handle) => handle,
            TypeResolution::Value(inner) => {
                types.insert(crate::Type { name: None, inner }, crate::Span::UNDEFINED)
            }
        }
    }

    /// Grow this typifier until it contains a type for `expr_handle`.
    pub fn grow(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        expressions: &Arena<crate::Expression>,
        ctx: &ResolveContext,
    ) -> Result<(), ResolveError> {
        if self.resolutions.len() <= expr_handle.index() {
            for (eh, expr) in expressions.iter().skip(self.resolutions.len()) {
                //Note: the closure can't `Err` by construction
                let resolution = ctx.resolve(expr, |h| Ok(&self.resolutions[h]))?;
                log::debug!("Resolving {eh:?} = {expr:?} : {resolution:?}");
                self.resolutions.insert(eh, resolution);
            }
        }
        Ok(())
    }

    /// Recompute the type resolution for `expr_handle`.
    ///
    /// If the type of `expr_handle` hasn't yet been calculated, call
    /// [`grow`](Self::grow) to ensure it is covered.
    ///
    /// In either case, when this returns, `self[expr_handle]` should be an
    /// updated type resolution for `expr_handle`.
    pub fn invalidate(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        expressions: &Arena<crate::Expression>,
        ctx: &ResolveContext,
    ) -> Result<(), ResolveError> {
        if self.resolutions.len() <= expr_handle.index() {
            self.grow(expr_handle, expressions, ctx)
        } else {
            let expr = &expressions[expr_handle];
            //Note: the closure can't `Err` by construction
            let resolution = ctx.resolve(expr, |h| Ok(&self.resolutions[h]))?;
            self.resolutions[expr_handle] = resolution;
            Ok(())
        }
    }
}

impl ops::Index<Handle<crate::Expression>> for Typifier {
    type Output = TypeResolution;
    fn index(&self, handle: Handle<crate::Expression>) -> &Self::Output {
        &self.resolutions[handle]
    }
}

impl crate::Module {
    pub fn get_or_insert_default_doc_comments(&mut self) -> &mut Box<crate::DocComments> {
        self.doc_comments
            .get_or_insert_with(|| Box::new(crate::DocComments::default()))
    }
}
