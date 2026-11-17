use crate::arena::Handle;
use crate::{Expression, Function, NamedExpressions, NonUniformExpressions, PrecisionExpressions};

#[derive(Debug)]
pub struct FunctionTables<'a> {
    pub named_expressions: &'a mut NamedExpressions,
    pub non_uniform: &'a mut NonUniformExpressions,
    pub precision: &'a mut PrecisionExpressions,
}

impl FunctionTables<'_> {
    pub fn remap(self, mut map: impl FnMut(Handle<Expression>) -> Option<Handle<Expression>>) {
        let named = core::mem::take(self.named_expressions);
        self.named_expressions.reserve(named.len());
        self.named_expressions.extend(
            named
                .into_iter()
                .filter_map(|(handle, name)| Some((map(handle)?, name))),
        );
        let non_uniform = core::mem::take(self.non_uniform);
        self.non_uniform.extend(
            non_uniform
                .into_iter()
                .filter_map(|(handle, flags)| Some((map(handle)?, flags))),
        );
        let precision = core::mem::take(self.precision);
        self.precision.extend(
            precision
                .into_iter()
                .filter_map(|(handle, flags)| Some((map(handle)?, flags))),
        );
    }
}

impl Function {
    pub const fn tables(&mut self) -> FunctionTables<'_> {
        FunctionTables {
            named_expressions: &mut self.named_expressions,
            non_uniform: &mut self.non_uniform,
            precision: &mut self.precision,
        }
    }
}

#[cfg(test)]
mod tests {
    use alloc::string::String;
    use alloc::vec::Vec;

    use crate::{Expression, Function, Literal, NonUniform, Precision, Span};

    #[test]
    fn remap_moves_and_drops_every_table_entry() {
        let mut function = Function::default();
        let handles: Vec<_> = (0..3)
            .map(|value| {
                function
                    .expressions
                    .append(Expression::Literal(Literal::U32(value)), Span::UNDEFINED)
            })
            .collect();
        let [first, second, third] = handles[..] else {
            panic!("three expressions");
        };
        function.named_expressions.insert(first, String::from("a"));
        function.named_expressions.insert(third, String::from("c"));
        function.non_uniform.insert(second, NonUniform::default());
        function.non_uniform.insert(third, NonUniform::default());
        function.precision.insert(first, Precision::RELAXED);
        function.precision.insert(second, Precision::NO_CONTRACTION);
        function.tables().remap(|handle| match handle {
            handle if handle == first => Some(second),
            handle if handle == third => Some(first),
            _ => None,
        });
        assert_eq!(
            function.named_expressions.into_iter().collect::<Vec<_>>(),
            [(second, String::from("a")), (first, String::from("c"))]
        );
        assert_eq!(
            function.non_uniform.keys().copied().collect::<Vec<_>>(),
            [first]
        );
        assert_eq!(
            function.precision.into_iter().collect::<Vec<_>>(),
            [(second, Precision::RELAXED)]
        );
    }
}
