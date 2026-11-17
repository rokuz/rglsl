use rglsl::{AddressSpace, Function, Module, ShaderStage, Statement};

use crate::{Context, DebugLevel};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Summary {
    pub stage: ShaderStage,
    pub functions: usize,
    pub calls: bool,
    pub loops: bool,
    pub local_variables: bool,
    pub private_globals: bool,
    pub overrides: bool,
    pub debug: DebugLevel,
    pub export_functions: bool,
    pub unlinked: bool,
}

impl Summary {
    pub fn of(stage: ShaderStage, module: &Module, context: Context) -> Self {
        let mut summary = Self {
            stage,
            functions: module.functions.len() + module.entry_points.len(),
            calls: false,
            loops: false,
            local_variables: false,
            private_globals: module
                .global_variables
                .iter()
                .any(|(_, global)| global.space == AddressSpace::Private),
            overrides: !module.overrides.is_empty(),
            debug: context.debug,
            export_functions: context.export_functions,
            unlinked: context.unlinked,
        };
        let functions = module
            .functions
            .iter()
            .map(|(_, function)| function)
            .chain(module.entry_points.iter().map(|entry| &entry.function));
        for function in functions {
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
