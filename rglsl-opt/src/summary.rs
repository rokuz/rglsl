use rglsl::{Function, Module, Statement};

use crate::Context;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Summary {
    pub calls: bool,
    pub loops: bool,
    pub local_variables: bool,
    pub whole_program: bool,
}

impl Summary {
    pub fn of(module: &Module, context: Context) -> Self {
        let mut summary = Self {
            calls: false,
            loops: false,
            local_variables: false,
            whole_program: context.whole_program(),
        };
        for function in module.all_functions() {
            summary.add(function);
        }
        summary
    }

    fn add(&mut self, function: &Function) {
        self.local_variables |= !function.local_variables.is_empty();
        for statement in function.body.walk() {
            match *statement {
                Statement::Call { .. } => self.calls = true,
                Statement::Loop { .. } => self.loops = true,
                _ => {}
            }
        }
    }
}
