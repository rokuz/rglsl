use rglsl::Module;

use crate::{Context, GpuProfile, OptError, StageModule, Summary};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Scope {
    Program,
    Function,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Changed {
    No,
    Yes,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DebugRule {
    Preserves,
    LinesOnly,
}

#[derive(Debug)]
pub struct Pass {
    pub name: &'static str,
    pub scope: Scope,
    pub applies: fn(&Summary) -> bool,
    pub run: fn(&mut Session<'_, '_>) -> Result<Changed, OptError>,
    pub debug_info: DebugRule,
    pub counterpart: &'static [&'static str],
}

pub static PASSES: &[Pass] = &[
    Pass {
        name: "inline",
        scope: Scope::Function,
        applies: |summary| summary.calls,
        run: crate::ir::inline::run,
        debug_info: DebugRule::LinesOnly,
        counterpart: &[
            "--wrap-opkill",
            "--merge-return",
            "--inline-entry-points-exhaustive",
            "--eliminate-dead-functions",
        ],
    },
    Pass {
        name: "dce",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::dce::run,
        debug_info: DebugRule::Preserves,
        counterpart: &["--eliminate-dead-code-aggressive"],
    },
];

#[derive(Debug)]
pub struct Session<'s, 'm> {
    pub pass: &'static str,
    pub stages: &'s mut [StageModule<'m>],
    pub focus: Option<usize>,
    pub profile: &'static GpuProfile,
    pub context: Context,
}

impl Session<'_, '_> {
    pub fn module(&mut self) -> Result<&mut Module, OptError> {
        let pass = self.pass;
        self.focus
            .and_then(|index| self.stages.get_mut(index))
            .map(|stage| &mut *stage.module)
            .ok_or_else(|| OptError::Pass {
                pass,
                message: String::from("a program-wide pass asked for the module of one stage"),
            })
    }
}

pub(crate) fn find<'t>(table: &'t [Pass], name: &str) -> Result<&'t Pass, OptError> {
    table
        .iter()
        .find(|pass| pass.name == name)
        .ok_or_else(|| OptError::UnknownPass {
            name: name.to_owned(),
            known: if table.is_empty() {
                String::from("none")
            } else {
                table
                    .iter()
                    .map(|pass| pass.name)
                    .collect::<Vec<_>>()
                    .join(", ")
            },
        })
}
