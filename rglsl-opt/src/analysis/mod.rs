pub(crate) mod locals;

use rglsl::ir::visit::Visitor;
use rglsl::{
    AddressSpace, ArraySize, Block, Constant, Expression, Function, GlobalVariable, Handle,
    LocalVariable, Override, Range, Statement, Type, TypeInner, UniqueArena,
};

pub(crate) fn for_each_result(statement: &Statement, result: impl FnMut(Handle<Expression>)) {
    let Ok(()) = statement.visit(&mut Results(result));
}

struct Results<F>(F);

impl<'a, F: FnMut(Handle<Expression>)> Visitor<'a> for Results<F> {
    type Error = core::convert::Infallible;

    fn expression(&mut self, _: Handle<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn result(&mut self, handle: Handle<Expression>) -> Result<(), Self::Error> {
        (self.0)(handle);
        Ok(())
    }

    fn emitted(&mut self, _: &Range<Expression>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn ty(&mut self, _: Handle<Type>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn constant(&mut self, _: Handle<Constant>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn r#override(&mut self, _: Handle<Override>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn global_variable(&mut self, _: Handle<GlobalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<LocalVariable>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn function(&mut self, _: Handle<Function>) -> Result<(), Self::Error> {
        Ok(())
    }

    fn block(&mut self, _: &'a Block) -> Result<(), Self::Error> {
        Ok(())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub(crate) enum Class {
    Plain,
    References,
    Opaque,
}

pub(crate) fn classify_types(types: &UniqueArena<Type>) -> Vec<Class> {
    let mut classes: Vec<Class> = Vec::with_capacity(types.len());
    for (_, ty) in types.iter() {
        let class = |handle: Handle<Type>| {
            classes
                .get(handle.index())
                .copied()
                .unwrap_or(Class::Opaque)
        };
        let value = match ty.inner {
            TypeInner::Scalar(_)
            | TypeInner::Vector { .. }
            | TypeInner::Matrix { .. }
            | TypeInner::CooperativeMatrix { .. }
            | TypeInner::LongVector { .. } => Class::Plain,
            TypeInner::Pointer {
                space: AddressSpace::PhysicalStorage { .. },
                ..
            } => Class::References,
            TypeInner::Array {
                base,
                size: ArraySize::Constant(_),
                ..
            } => class(base),
            TypeInner::Struct { ref members, .. } => members
                .iter()
                .map(|member| class(member.ty))
                .max()
                .unwrap_or(Class::Plain),
            _ => Class::Opaque,
        };
        classes.push(value);
    }
    classes
}

pub(crate) fn elements(types: &UniqueArena<Type>, ty: Handle<Type>) -> Option<usize> {
    match types.get_handle(ty).ok()?.inner {
        TypeInner::Vector { size, .. } => Some(size as usize),
        TypeInner::Matrix { columns, .. } => Some(columns as usize),
        TypeInner::Array {
            size: ArraySize::Constant(size),
            ..
        } => usize::try_from(size.get()).ok(),
        TypeInner::Struct { ref members, .. } => Some(members.len()),
        _ => None,
    }
}
