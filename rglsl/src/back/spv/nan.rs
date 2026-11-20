use crate::{Expression, Literal, Module};

pub(super) fn nan_literal(module: &Module) -> Option<Literal> {
    core::iter::once(&module.global_expressions)
        .chain(module.all_functions().map(|function| &function.expressions))
        .flat_map(|expressions| expressions.iter())
        .find_map(|(_, expression)| match *expression {
            Expression::Literal(literal) if literal.is_nan() => Some(literal),
            _ => None,
        })
}
