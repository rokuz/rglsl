use rglsl::Module;
use rglsl::compact::{KeepUnused, compact};
use rglsl::valid::{ModuleInfo, ValidationFlags, ValidationMode, Validator};

use crate::error::chain;
use crate::pass::find;
use crate::{
    Changed, Context, DebugLevel, DebugRule, GpuProfile, OptError, OptOptions, PASSES, Pass, Scope,
    Session, StageModule, Step, Summary,
};

enum Planned<'t> {
    Run(&'t Pass),
    Repeat { limit: u8, passes: Vec<&'t Pass> },
}

struct Run<'r, 'm> {
    stages: &'r mut [StageModule<'m>],
    summaries: Vec<Summary>,
    changed: Vec<bool>,
    profile: &'static GpuProfile,
    context: Context,
    validate_each: bool,
}

pub fn optimize(
    stages: &mut [StageModule<'_>],
    options: &OptOptions,
    context: Context,
) -> Result<(), OptError> {
    run(PASSES, stages, options, context)
}

pub(crate) fn run(
    table: &[Pass],
    stages: &mut [StageModule<'_>],
    options: &OptOptions,
    context: Context,
) -> Result<(), OptError> {
    let plan = plan(table, options)?;
    execute(&plan, stages, options, context)
}

fn execute(
    plan: &[Planned<'_>],
    stages: &mut [StageModule<'_>],
    options: &OptOptions,
    context: Context,
) -> Result<(), OptError> {
    let profile = options.target_gpu.profile()?;
    if plan.is_empty() {
        return Ok(());
    }
    let mut run = Run {
        summaries: stages
            .iter()
            .map(|stage| Summary::of(stage.stage, stage.module, context))
            .collect(),
        changed: vec![false; stages.len()],
        stages,
        profile,
        context,
        validate_each: options.validate_each,
    };
    for step in plan {
        match *step {
            Planned::Run(pass) => {
                run.pass(pass)?;
            }
            Planned::Repeat { limit, ref passes } => {
                for _ in 0..limit {
                    let mut changed = false;
                    for pass in passes {
                        changed |= run.pass(pass)? == Changed::Yes;
                    }
                    if !changed {
                        break;
                    }
                }
            }
        }
    }
    run.finish()
}

impl OptOptions {
    pub fn check(&self) -> Result<(), OptError> {
        plan(PASSES, self)?;
        self.target_gpu.profile()?;
        Ok(())
    }
}

fn plan<'t>(table: &'t [Pass], options: &OptOptions) -> Result<Vec<Planned<'t>>, OptError> {
    if let Some(ref passes) = options.passes {
        return passes
            .iter()
            .map(|name| find(table, name).map(Planned::Run))
            .collect();
    }
    options
        .level
        .preset()?
        .steps
        .iter()
        .map(|step| {
            Ok(match *step {
                Step::Run(name) => Planned::Run(find(table, name)?),
                Step::Repeat { limit, passes } => Planned::Repeat {
                    limit,
                    passes: passes
                        .iter()
                        .map(|name| find(table, name))
                        .collect::<Result<_, _>>()?,
                },
            })
        })
        .collect()
}

fn validate(module: &Module, context: Context) -> Result<ModuleInfo, String> {
    let mut validator = Validator::new(ValidationFlags::all());
    validator.mode(if context.unlinked {
        ValidationMode::Object
    } else {
        ValidationMode::Executable
    });
    validator
        .validate(module)
        .map_err(|error| chain(error.as_inner()))
}

impl Run<'_, '_> {
    fn pass(&mut self, pass: &Pass) -> Result<Changed, OptError> {
        if pass.debug_info == DebugRule::LinesOnly && self.context.debug == DebugLevel::Variables {
            return Ok(Changed::No);
        }
        let mut result = Changed::No;
        match pass.scope {
            Scope::Function => {
                for index in 0..self.stages.len() {
                    if !self.summaries.get(index).is_some_and(pass.applies) {
                        continue;
                    }
                    if self.session(pass, Some(index))? == Changed::Yes {
                        result = Changed::Yes;
                        self.after_change(pass, index)?;
                    }
                }
            }
            Scope::Program => {
                if self.summaries.iter().any(pass.applies)
                    && self.session(pass, None)? == Changed::Yes
                {
                    result = Changed::Yes;
                    for index in 0..self.stages.len() {
                        self.after_change(pass, index)?;
                    }
                }
            }
        }
        Ok(result)
    }

    fn session(&mut self, pass: &Pass, focus: Option<usize>) -> Result<Changed, OptError> {
        let mut session = Session {
            pass: pass.name,
            stages: self.stages,
            focus,
            profile: self.profile,
            context: self.context,
        };
        (pass.run)(&mut session)
    }

    fn after_change(&mut self, pass: &Pass, index: usize) -> Result<(), OptError> {
        let Some(stage) = self.stages.get(index) else {
            return Ok(());
        };
        if let Some(changed) = self.changed.get_mut(index) {
            *changed = true;
        }
        if let Some(summary) = self.summaries.get_mut(index) {
            *summary = Summary::of(stage.stage, stage.module, self.context);
        }
        if self.validate_each {
            validate(stage.module, self.context).map_err(|message| OptError::InvalidIr {
                pass: pass.name,
                stage: stage.stage,
                message,
            })?;
        }
        Ok(())
    }

    fn finish(self) -> Result<(), OptError> {
        for (stage, &changed) in self.stages.iter_mut().zip(&self.changed) {
            if changed {
                finish_stage(stage, self.context)?;
            }
        }
        Ok(())
    }
}

fn finish_stage(stage: &mut StageModule<'_>, context: Context) -> Result<(), OptError> {
    compact(stage.module, KeepUnused::Declarations).map_err(|error| OptError::Compact {
        stage: stage.stage,
        message: chain(&error),
    })?;
    *stage.info = validate(stage.module, context).map_err(|message| OptError::Invalid {
        stage: stage.stage,
        message,
    })?;
    Ok(())
}

#[cfg(test)]
mod tests;
