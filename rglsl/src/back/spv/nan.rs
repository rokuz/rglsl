use crate::{Expression, Literal, Module};

pub(super) fn nan_literal(module: &Module) -> Option<Literal> {
    let functions = module
        .functions
        .iter()
        .map(|(_, function)| function)
        .chain(module.entry_points.iter().map(|entry| &entry.function));
    core::iter::once(&module.global_expressions)
        .chain(functions.map(|function| &function.expressions))
        .flat_map(|expressions| expressions.iter())
        .find_map(|(_, expression)| match *expression {
            Expression::Literal(literal) if literal.is_nan() => Some(literal),
            _ => None,
        })
}
