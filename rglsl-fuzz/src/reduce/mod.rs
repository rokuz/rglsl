pub mod change;
pub mod finders;
pub mod guards;

use std::collections::BTreeSet;

use rglsl_ast::TranslationUnit;

use crate::constants::GLOBAL_LOOP_BOUNDS;
use crate::error::Error;
use crate::generate::analyze_shader;
use crate::job::{parse_unit, ShaderJob};
use crate::macros::{emit, expand_macros};

pub use finders::Pass;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ReduceOptions {
    pub preserve_semantics: bool,
    pub max_steps: u32,
    pub guards: bool,
}

impl Default for ReduceOptions {
    fn default() -> Self {
        Self {
            preserve_semantics: false,
            max_steps: 2000,
            guards: true,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Reduction {
    pub job: ShaderJob,
    pub loop_bound: Option<u32>,
    pub steps: u32,
    pub successes: u32,
}

pub type Judge<'a> = dyn FnMut(&ShaderJob) -> Result<bool, Error> + 'a;

struct Reducer<'a, 'b> {
    judge: &'a mut Judge<'b>,
    options: ReduceOptions,
    steps: u32,
    successes: u32,
    rejected: BTreeSet<String>,
}

fn renumbered(unit: &TranslationUnit) -> Option<TranslationUnit> {
    parse_unit("reduction", &emit(unit)).ok()
}

impl Reducer<'_, '_> {
    fn exhausted(&self) -> bool {
        self.steps >= self.options.max_steps
    }

    fn try_candidate(
        &mut self,
        current: &mut ShaderJob,
        shader: usize,
        unit: TranslationUnit,
    ) -> Result<bool, Error> {
        let Some(old) = current.shaders.get(shader) else {
            return Ok(false);
        };
        let text = emit(&unit);
        if text == emit(&old.unit) || self.rejected.contains(&text) {
            return Ok(false);
        }
        let Ok(unit) = parse_unit("reduction", &text) else {
            self.rejected.insert(text);
            return Ok(false);
        };
        let mut candidate = current.clone();
        if let Some(slot) = candidate.shaders.get_mut(shader) {
            slot.unit = unit;
        }
        self.steps += 1;
        if (self.judge)(&candidate)? {
            self.successes += 1;
            *current = candidate;
            Ok(true)
        } else {
            self.rejected.insert(text);
            Ok(false)
        }
    }

    fn run_pass(
        &mut self,
        pass: Pass,
        current: &mut ShaderJob,
        shader: usize,
    ) -> Result<bool, Error> {
        let mut progress = false;
        let mut granularity = usize::MAX;
        let mut index = 0;
        while !self.exhausted() {
            let Some(entry) = current.shaders.get(shader) else {
                break;
            };
            let stage = entry.stage();
            let analysis = analyze_shader(&entry.unit, stage, true, None);
            let opportunities = finders::find(pass, &entry.unit, &analysis);
            if opportunities.is_empty() {
                break;
            }
            granularity = granularity.min(opportunities.len()).max(1);
            if index >= opportunities.len() {
                if granularity == 1 {
                    break;
                }
                granularity = (granularity / 2).max(1);
                index = 0;
                continue;
            }
            let end = (index + granularity).min(opportunities.len());
            let chunk = opportunities.get(index..end).unwrap_or_default();
            let candidate = change::apply(&entry.unit, chunk);
            if self.try_candidate(current, shader, candidate)? {
                progress = true;
            } else {
                index += granularity;
            }
        }
        Ok(progress)
    }
}

pub fn reduce(
    job: &ShaderJob,
    options: ReduceOptions,
    judge: &mut Judge<'_>,
) -> Result<Reduction, Error> {
    let mut current = job.clone();
    for shader in &mut current.shaders {
        shader.unit = renumbered(&shader.unit).ok_or_else(|| Error::Parse {
            shader: shader.extension.clone(),
            message: String::from("the shader does not parse after printing"),
        })?;
    }
    if !judge(&current)? {
        return Err(Error::Generation(String::from(
            "the shader job is not interesting to begin with",
        )));
    }
    let mut passes: Vec<Pass> = Pass::PRESERVING.to_vec();
    if !options.preserve_semantics {
        passes.extend(Pass::EVERYWHERE);
    }
    let mut bound = None;
    if !options.preserve_semantics && options.guards {
        for candidate in GLOBAL_LOOP_BOUNDS {
            if let Some(guarded) = add_guards_to_job(&current, candidate) {
                if judge(&guarded)? {
                    bound = Some(candidate);
                    break;
                }
            }
        }
    }
    let mut guarded_judge = |candidate: &ShaderJob| -> Result<bool, Error> {
        let Some(bound) = bound else {
            return judge(candidate);
        };
        match add_guards_to_job(candidate, bound) {
            Some(candidate) => judge(&candidate),
            None => Ok(false),
        }
    };
    let mut reducer = Reducer {
        judge: &mut guarded_judge,
        options,
        steps: 0,
        successes: 0,
        rejected: BTreeSet::new(),
    };
    loop {
        let mut progress = false;
        for pass in &passes {
            for shader in 0..current.shaders.len() {
                progress |= reducer.run_pass(*pass, &mut current, shader)?;
            }
        }
        if !progress || reducer.exhausted() {
            break;
        }
    }
    let steps = reducer.steps;
    let successes = reducer.successes;
    let job = match bound {
        Some(bound) => add_guards_to_job(&current, bound).unwrap_or(current),
        None => current,
    };
    Ok(Reduction {
        job,
        loop_bound: bound,
        steps,
        successes,
    })
}

pub fn add_guards_to_job(job: &ShaderJob, bound: u32) -> Option<ShaderJob> {
    let mut result = job.clone();
    for shader in &mut result.shaders {
        let stage = shader.stage();
        shader.unit = guards::add_guards(&shader.unit, stage, bound)?;
    }
    Some(result)
}

pub fn finalise(job: &ShaderJob) -> ShaderJob {
    let mut result = job.clone();
    for shader in &mut result.shaders {
        let expanded = expand_macros(&shader.unit);
        if let Some(unit) = renumbered(&expanded) {
            shader.unit = unit;
        }
    }
    result
}
