use rglsl::{Expression, Function, Handle, LocalVariable, Statement};

pub(crate) fn stored_variable(
    function: &Function,
    pointer: Handle<Expression>,
) -> Option<(Handle<LocalVariable>, Vec<u32>)> {
    let mut indices = Vec::new();
    let mut current = pointer;
    loop {
        match *function.expressions.try_get(current).ok()? {
            Expression::AccessIndex { base, index } => {
                indices.push(index);
                current = base;
            }
            Expression::LocalVariable(local) => {
                function
                    .local_variables
                    .try_get(local)
                    .ok()?
                    .name
                    .as_ref()?;
                indices.reverse();
                return Some((local, indices));
            }
            _ => return None,
        }
    }
}

pub(crate) fn value_of_store(function: &Function, statement: &Statement) -> Option<Statement> {
    let Statement::Store { pointer, value } = *statement else {
        return None;
    };
    let (variable, indices) = stored_variable(function, pointer)?;
    Some(Statement::DebugValue {
        variable,
        value,
        indices,
    })
}
