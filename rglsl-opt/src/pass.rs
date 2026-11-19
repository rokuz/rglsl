use rglsl::{Module, ShaderStage};

use crate::{
    Context, GpuProfile, OptError, OptLevel, Specialization, StageModule, Summary, Unrolling,
};

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
        name: "specialize",
        scope: Scope::Program,
        applies: |summary| summary.overrides,
        run: crate::ir::specialize::run,
        debug_info: DebugRule::Preserves,
        counterpart: &[
            "--set-spec-const-default-value",
            "--freeze-spec-const",
            "--fold-spec-const-op-composite",
        ],
    },
    Pass {
        name: "lto-io",
        scope: Scope::Program,
        applies: |summary| !summary.unlinked && !summary.export_functions,
        run: crate::ir::lto_io::run,
        debug_info: DebugRule::LinesOnly,
        counterpart: &[
            "--lto",
            "AnalyzeLiveInput",
            "EliminateDeadOutputStores",
            "--eliminate-dead-input-components",
            "EliminateDeadOutputComponents",
        ],
    },
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
        name: "forward",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::forward::run,
        debug_info: DebugRule::Preserves,
        counterpart: &[
            "--eliminate-local-single-block",
            "--eliminate-local-single-store",
            "--private-to-local",
            "--ssa-rewrite",
        ],
    },
    Pass {
        name: "sroa",
        scope: Scope::Function,
        applies: |summary| summary.local_variables,
        run: crate::ir::sroa::run,
        debug_info: DebugRule::LinesOnly,
        counterpart: &["--scalar-replacement=0", "--convert-local-access-chains"],
    },
    Pass {
        name: "fold",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::fold::run,
        debug_info: DebugRule::Preserves,
        counterpart: &["--ccp", "--simplify-instructions"],
    },
    Pass {
        name: "dead-branch",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::dead_branch::run,
        debug_info: DebugRule::LinesOnly,
        counterpart: &["--eliminate-dead-branches"],
    },
    Pass {
        name: "unroll",
        scope: Scope::Function,
        applies: |summary| summary.loops,
        run: crate::ir::unroll::run,
        debug_info: DebugRule::LinesOnly,
        counterpart: &["--loop-unroll"],
    },
    Pass {
        name: "const-array",
        scope: Scope::Function,
        applies: |summary| summary.local_variables,
        run: crate::ir::const_array::run,
        debug_info: DebugRule::LinesOnly,
        counterpart: &["--copy-propagate-arrays"],
    },
    Pass {
        name: "cse",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::cse::run,
        debug_info: DebugRule::Preserves,
        counterpart: &["--redundancy-elimination"],
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
    pub level: OptLevel,
    pub context: Context,
    pub specialization: &'s [Specialization],
}

impl Session<'_, '_> {
    pub(crate) fn run_on(
        &mut self,
        index: usize,
        run: fn(&mut Session<'_, '_>) -> Result<Changed, OptError>,
    ) -> Result<Changed, OptError> {
        let mut session = Session {
            pass: self.pass,
            stages: &mut *self.stages,
            focus: Some(index),
            profile: self.profile,
            level: self.level,
            context: self.context,
            specialization: self.specialization,
        };
        run(&mut session)
    }

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

impl Session<'_, '_> {
    pub const fn unrolling(&self) -> Unrolling {
        match self.level {
            OptLevel::Size => self.profile.parameters.unroll_for_size,
            OptLevel::Disabled | OptLevel::Performance => self.profile.parameters.unroll,
        }
    }

    pub fn stage(&self) -> Result<ShaderStage, OptError> {
        let pass = self.pass;
        self.focus
            .and_then(|index| self.stages.get(index))
            .map(|stage| stage.stage)
            .ok_or_else(|| OptError::Pass {
                pass,
                message: String::from("a program-wide pass asked for the stage of one module"),
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
