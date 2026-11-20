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

impl From<bool> for Changed {
    fn from(changed: bool) -> Self {
        if changed { Self::Yes } else { Self::No }
    }
}

#[derive(Debug)]
pub struct Pass {
    pub name: &'static str,
    pub scope: Scope,
    pub applies: fn(&Summary) -> bool,
    pub run: fn(&mut Session<'_, '_>) -> Result<Changed, OptError>,
    pub counterpart: &'static [&'static str],
}

pub static PASSES: &[Pass] = &[
    Pass {
        name: "specialize",
        scope: Scope::Program,
        applies: |_| true,
        run: crate::ir::specialize::run,
        counterpart: &[
            "--set-spec-const-default-value",
            "--freeze-spec-const",
            "--fold-spec-const-op-composite",
        ],
    },
    Pass {
        name: "lto-io",
        scope: Scope::Program,
        applies: |summary| summary.whole_program,
        run: crate::ir::lto_io::run,
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
        counterpart: &["--scalar-replacement=0", "--convert-local-access-chains"],
    },
    Pass {
        name: "fold",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::fold::run,
        counterpart: &["--ccp", "--simplify-instructions"],
    },
    Pass {
        name: "dead-branch",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::dead_branch::run,
        counterpart: &["--eliminate-dead-branches"],
    },
    Pass {
        name: "unroll",
        scope: Scope::Function,
        applies: |summary| summary.loops,
        run: crate::ir::unroll::run,
        counterpart: &["--loop-unroll"],
    },
    Pass {
        name: "const-array",
        scope: Scope::Function,
        applies: |summary| summary.local_variables,
        run: crate::ir::const_array::run,
        counterpart: &["--copy-propagate-arrays"],
    },
    Pass {
        name: "cse",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::cse::run,
        counterpart: &["--redundancy-elimination"],
    },
    Pass {
        name: "dce",
        scope: Scope::Function,
        applies: |_| true,
        run: crate::ir::dce::run,
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

    pub(crate) fn rewrite(
        &mut self,
        rewrite: impl FnOnce(&mut Module) -> Result<bool, String>,
    ) -> Result<Changed, OptError> {
        let pass = self.pass;
        rewrite(self.module()?)
            .map(Changed::from)
            .map_err(|message| OptError::Pass { pass, message })
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
