use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Mutex, PoisonError};
use std::time::Duration;

use anyhow::{bail, Context, Result};

use crate::corpus::STAGE_EXTENSIONS;
use crate::exec::{self, Executor, TargetId};
use crate::fuzz_exec::{self, Run, Staged};
use crate::oracles;
use crate::process::{self, Exit};
use crate::worker::{EXIT_ACCEPTED, EXIT_BACKEND_FAILED, EXIT_REJECTED};

#[derive(Debug)]
pub struct Options {
    pub shaders: PathBuf,
    pub jobs: Option<usize>,
    pub timeout_secs: u64,
    pub exec: Vec<TargetId>,
    pub exec_glslang: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
enum Verdict {
    Agree,
    GlslangRejects,
    WeReject,
    BackendFailed,
    InvalidSpirv,
    Crash,
    ExecSkipped,
    WrongResultGlslang,
    ExecFailed,
    WrongResult,
}

impl Verdict {
    const fn label(self) -> &'static str {
        match self {
            Self::Agree => "agree",
            Self::GlslangRejects => "glslang-rejects",
            Self::WeReject => "we-reject",
            Self::BackendFailed => "backend-failed",
            Self::InvalidSpirv => "invalid-spirv",
            Self::Crash => "crash",
            Self::ExecSkipped => "exec-skipped",
            Self::WrongResultGlslang => "wrong-result-glslang",
            Self::ExecFailed => "exec-failed",
            Self::WrongResult => "wrong-result",
        }
    }

    const fn is_failure(self) -> bool {
        matches!(
            self,
            Self::WeReject
                | Self::BackendFailed
                | Self::InvalidSpirv
                | Self::Crash
                | Self::ExecFailed
                | Self::WrongResult
        )
    }
}

#[derive(Debug)]
struct Outcome {
    shader: PathBuf,
    verdict: Verdict,
    note: String,
    spirv: PathBuf,
}

pub fn run(root: &Path, options: Options) -> Result<()> {
    let glslang = oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?;
    let spirv_val = oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?;
    let work = root.join("target").join("fuzz");
    fs::create_dir_all(&work)?;

    let shaders_dir = options.shaders.clone();
    let shaders = collect_shaders(&shaders_dir)?;
    if shaders.is_empty() {
        bail!("no shaders in {}", shaders_dir.display());
    }

    let spirv_dir = work.join("spirv");
    let _ = fs::remove_dir_all(&spirv_dir);
    fs::create_dir_all(&spirv_dir)?;

    let self_exe = std::env::current_exe().context("locating the xtask binary")?;
    let timeout = Duration::from_secs(options.timeout_secs);
    let jobs = options
        .jobs
        .unwrap_or_else(|| std::thread::available_parallelism().map_or(4, |n| n.get()))
        .max(1);

    let next = AtomicUsize::new(0);
    let outcomes: Mutex<Vec<Outcome>> = Mutex::new(Vec::with_capacity(shaders.len()));
    let errors: Mutex<Vec<anyhow::Error>> = Mutex::new(Vec::new());
    std::thread::scope(|scope| {
        for _ in 0..jobs {
            scope.spawn(|| loop {
                let index = next.fetch_add(1, Ordering::Relaxed);
                let Some(shader) = shaders.get(index) else {
                    break;
                };
                let spirv = spirv_dir.join(format!("{index}.spv"));
                match compare(
                    &glslang.path,
                    &spirv_val.path,
                    &self_exe,
                    shader,
                    &spirv,
                    timeout,
                ) {
                    Ok(outcome) => outcomes
                        .lock()
                        .unwrap_or_else(PoisonError::into_inner)
                        .push(outcome),
                    Err(error) => errors
                        .lock()
                        .unwrap_or_else(PoisonError::into_inner)
                        .push(error.context(shader.display().to_string())),
                }
            });
        }
    });
    if let Some(error) = errors
        .into_inner()
        .unwrap_or_else(PoisonError::into_inner)
        .into_iter()
        .next()
    {
        return Err(error);
    }
    let mut outcomes = outcomes
        .into_inner()
        .unwrap_or_else(PoisonError::into_inner);
    outcomes.sort_by(|a, b| a.shader.cmp(&b.shader));

    let mut per_target = Vec::new();
    for target in &options.exec {
        let executor = Executor::new(*target, root, &glslang.path, &work.join("exec"), timeout)?;
        eprintln!(
            "[xtask] exec on the {} target: {}",
            target.label(),
            executor.describe()
        );
        per_target.push((
            *target,
            metamorphic(&executor, &outcomes, options.exec_glslang),
        ));
    }
    merge(&mut outcomes, &per_target);

    let report = work.join("report.tsv");
    fs::write(&report, details(&shaders_dir, &outcomes))?;
    print!("{}", summary(&outcomes));
    eprintln!("[xtask] per-shader results: {}", report.display());
    Ok(())
}

fn is_shader(path: &Path) -> bool {
    stage_of(path).is_some()
}

fn stage_of(path: &Path) -> Option<&'static str> {
    let extension = path.extension()?.to_str()?;
    STAGE_EXTENSIONS
        .iter()
        .copied()
        .find(|stage| *stage == extension)
}

fn collect_shaders(dir: &Path) -> Result<Vec<PathBuf>> {
    let mut shaders = Vec::new();
    let mut pending = vec![dir.to_path_buf()];
    while let Some(dir) = pending.pop() {
        let entries = fs::read_dir(&dir).with_context(|| format!("reading {}", dir.display()))?;
        for entry in entries {
            let path = entry?.path();
            if path.is_dir() {
                pending.push(path);
            } else if is_shader(&path) {
                shaders.push(path);
            }
        }
    }
    shaders.sort();
    Ok(shaders)
}

fn compare(
    glslang: &Path,
    spirv_val: &Path,
    self_exe: &Path,
    shader: &Path,
    spirv: &Path,
    timeout: Duration,
) -> Result<Outcome> {
    let outcome = |verdict, note: String| Outcome {
        shader: shader.to_path_buf(),
        verdict,
        note,
        spirv: spirv.to_path_buf(),
    };
    let stage = stage_of(shader).context("not a shader file")?;

    let mut reference = Command::new(glslang);
    reference
        .args(["--target-env", "vulkan1.0", "-o"])
        .arg(spirv.with_extension("glslang.spv"))
        .arg(shader);
    let reference = process::run(reference, timeout)?;
    if !matches!(reference.exit, Exit::Code(0)) {
        let combined = format!("{}\n{}", reference.stdout, reference.stderr);
        let note = combined
            .lines()
            .find(|line| line.starts_with("ERROR"))
            .unwrap_or("glslang failed");
        return Ok(outcome(Verdict::GlslangRejects, note.to_string()));
    }

    let mut ours = Command::new(self_exe);
    ours.arg("compile-one")
        .args(["--stage", stage, "--spv", "1.0", "--out"])
        .arg(spirv)
        .arg(shader);
    let ours = process::run(ours, timeout)?;
    let diagnostic = ours
        .stdout
        .lines()
        .find_map(|line| line.strip_prefix("E "))
        .unwrap_or_default()
        .to_string();
    match ours.exit {
        Exit::Code(EXIT_ACCEPTED) => {}
        Exit::Code(EXIT_REJECTED) => return Ok(outcome(Verdict::WeReject, diagnostic)),
        Exit::Code(EXIT_BACKEND_FAILED) => return Ok(outcome(Verdict::BackendFailed, diagnostic)),
        Exit::Code(_) | Exit::Signal => {
            let note = ours
                .stderr
                .lines()
                .find(|line| !line.trim().is_empty())
                .unwrap_or("crashed");
            return Ok(outcome(Verdict::Crash, note.to_string()));
        }
        Exit::Timeout => return Ok(outcome(Verdict::Crash, "timeout".to_string())),
    }

    let mut validator = Command::new(spirv_val);
    validator.args(["--target-env", "vulkan1.0"]).arg(spirv);
    let validation = process::run(validator, timeout)?;
    if !matches!(validation.exit, Exit::Code(0)) {
        let note = validation
            .stderr
            .lines()
            .chain(validation.stdout.lines())
            .find(|line| !line.trim().is_empty())
            .unwrap_or("spirv-val failed");
        return Ok(outcome(Verdict::InvalidSpirv, note.to_string()));
    }
    Ok(outcome(Verdict::Agree, String::new()))
}

type RunPair = (Run, Option<Run>);
type StagedPair = (Staged, Option<Staged>);
type Judgement = Option<(Verdict, String)>;

fn stage_all(executor: &Executor, outcomes: &[Outcome], glslang: bool) -> Vec<StagedPair> {
    let indices: Vec<usize> = (0..outcomes.len()).collect();
    exec::parallel_map(&indices, |index| {
        let Some(outcome) = outcomes.get(*index) else {
            return (Staged::Refused(String::new()), None);
        };
        if outcome.verdict != Verdict::Agree || fuzz_exec::family_of(&outcome.shader).is_none() {
            return (Staged::Refused(String::new()), None);
        }
        let dir = executor
            .work_dir()
            .join("fuzz")
            .join(format!("exec{index}"));
        let json = fuzz_exec::job_json(&outcome.shader);
        let ours =
            fuzz_exec::stage_module(executor, &outcome.spirv, json.as_deref(), &dir, "rglsl");
        let theirs = glslang.then(|| {
            fuzz_exec::stage_module(
                executor,
                &outcome.spirv.with_extension("glslang.spv"),
                json.as_deref(),
                &dir,
                "glslang",
            )
        });
        (ours, theirs)
    })
}

fn execute(
    executor: &Executor,
    staged: &[StagedPair],
    indices: &[usize],
    alone: bool,
) -> BTreeMap<usize, RunPair> {
    let mut jobs = Vec::new();
    for index in indices {
        if let Some((ours, theirs)) = staged.get(*index) {
            for stage in std::iter::once(ours).chain(theirs.iter()) {
                if let Staged::Ready { job, .. } = stage {
                    jobs.push(job.clone());
                }
            }
        }
    }
    let results = if alone {
        executor.confirm_jobs(&jobs)
    } else {
        executor.run_jobs(&jobs)
    };
    let mut results = results.into_iter();
    let mut runs = BTreeMap::new();
    for index in indices {
        let Some((ours, theirs)) = staged.get(*index) else {
            continue;
        };
        let mut finish = |stage: &Staged| {
            let result = match stage {
                Staged::Ready { .. } => results.next(),
                Staged::Refused(_) => None,
            };
            fuzz_exec::finish(stage, result)
        };
        let ours = finish(ours);
        let theirs = theirs.as_ref().map(&mut finish);
        runs.insert(*index, (ours, theirs));
    }
    runs
}

fn differs(reference: &Run, variant: &Run) -> Option<Result<String, String>> {
    match (reference, variant) {
        (
            Run::Ran {
                plan: reference_plan,
                outputs: reference_outputs,
            },
            Run::Ran { plan, outputs },
        ) => fuzz_exec::compare_runs((reference_plan, reference_outputs), (plan, outputs))
            .err()
            .map(Ok),
        (Run::Ran { .. }, Run::Failed(error)) => Some(Err(error.clone())),
        _ => None,
    }
}

fn judge(outcomes: &[Outcome], runs: &BTreeMap<usize, RunPair>, index: usize) -> Judgement {
    let outcome = outcomes.get(index)?;
    if outcome.verdict != Verdict::Agree {
        return None;
    }
    let reference = fuzz_exec::family_of(&outcome.shader)?;
    let (ours, theirs) = runs.get(&index)?;
    let reference_index = outcomes.iter().position(|o| o.shader == reference);
    let reference_runs = reference_index.and_then(|i| runs.get(&i));
    Some(if reference == outcome.shader {
        match (ours, theirs) {
            (Run::Refused(why), _) => (Verdict::ExecSkipped, why.clone()),
            (Run::Failed(why), Some(Run::Failed(_))) => (
                Verdict::ExecSkipped,
                format!("glslang's module fails on the driver too: {why}"),
            ),
            (Run::Failed(why), _) => (Verdict::ExecFailed, why.clone()),
            (Run::Ran { .. }, Some(theirs)) => match differs(theirs, ours) {
                Some(Ok(difference)) => (
                    Verdict::WrongResult,
                    format!("differs from glslang's reference: {difference}"),
                ),
                _ => (Verdict::Agree, String::new()),
            },
            (Run::Ran { .. }, None) => (Verdict::Agree, String::new()),
        }
    } else {
        match (reference_runs, ours) {
            (_, Run::Refused(why)) => (Verdict::ExecSkipped, why.clone()),
            (_, Run::Failed(why)) => (Verdict::ExecFailed, why.clone()),
            (Some((reference_ours @ Run::Ran { .. }, reference_theirs)), Run::Ran { .. }) => {
                let glslang_difference = match (reference_theirs, theirs) {
                    (Some(reference_theirs), Some(theirs)) => {
                        differs(reference_theirs, theirs).map(|d| d.unwrap_or_else(|e| e))
                    }
                    _ => None,
                };
                match (differs(reference_ours, ours), glslang_difference) {
                    (Some(Ok(difference)), None) => (
                        Verdict::WrongResult,
                        format!("differs from the reference: {difference}"),
                    ),
                    (Some(Ok(difference)), Some(_)) => (
                        Verdict::WrongResultGlslang,
                        format!("glslang's variant differs from its reference too: {difference}"),
                    ),
                    (_, Some(difference)) => (
                        Verdict::WrongResultGlslang,
                        format!("only glslang's variant differs from its reference: {difference}"),
                    ),
                    _ => (Verdict::Agree, String::new()),
                }
            }
            (Some((reference, _)), Run::Ran { .. }) => (
                Verdict::ExecSkipped,
                match reference {
                    Run::Refused(why) | Run::Failed(why) => {
                        format!("the reference did not run: {why}")
                    }
                    Run::Ran { .. } => String::new(),
                },
            ),
            (None, Run::Ran { .. }) => (
                Verdict::ExecSkipped,
                "the reference was not compiled".to_string(),
            ),
        }
    })
}

const fn needs_confirmation(verdict: Verdict) -> bool {
    matches!(
        verdict,
        Verdict::WrongResult | Verdict::WrongResultGlslang | Verdict::ExecFailed
    )
}

fn metamorphic(executor: &Executor, outcomes: &[Outcome], glslang: bool) -> Vec<Judgement> {
    let staged = stage_all(executor, outcomes, glslang);
    let all: Vec<usize> = (0..outcomes.len()).collect();
    let mut runs = execute(executor, &staged, &all, false);
    let mut judgements: Vec<Judgement> = all.iter().map(|i| judge(outcomes, &runs, *i)).collect();
    let failing: Vec<usize> = judgements
        .iter()
        .enumerate()
        .filter(|(_, j)| j.as_ref().is_some_and(|(v, _)| needs_confirmation(*v)))
        .map(|(i, _)| i)
        .collect();
    if failing.is_empty() {
        return judgements;
    }
    let mut involved: Vec<usize> = failing.clone();
    for index in &failing {
        let reference = outcomes
            .get(*index)
            .and_then(|o| fuzz_exec::family_of(&o.shader));
        if let Some(position) = reference.and_then(|r| outcomes.iter().position(|o| o.shader == r))
        {
            involved.push(position);
        }
    }
    involved.sort_unstable();
    involved.dedup();
    eprintln!(
        "[xtask] confirming {} failing shaders alone on the {} target",
        failing.len(),
        executor.target.label()
    );
    runs.extend(execute(executor, &staged, &involved, true));
    for index in failing {
        let confirmed = judge(outcomes, &runs, index).map(|(verdict, note)| {
            if needs_confirmation(verdict) {
                (verdict, format!("{note} (confirmed alone)"))
            } else {
                (verdict, note)
            }
        });
        if let Some(slot) = judgements.get_mut(index) {
            *slot = confirmed;
        }
    }
    judgements
}

fn merge(outcomes: &mut [Outcome], per_target: &[(TargetId, Vec<Judgement>)]) {
    for (index, outcome) in outcomes.iter_mut().enumerate() {
        let verdicts: Vec<(TargetId, &(Verdict, String))> = per_target
            .iter()
            .filter_map(|(target, judgements)| {
                judgements
                    .get(index)
                    .and_then(Option::as_ref)
                    .map(|j| (*target, j))
            })
            .collect();
        let Some((target, (verdict, note))) = verdicts.iter().max_by_key(|(_, (v, _))| *v) else {
            continue;
        };
        let mut text = if note.is_empty() {
            String::new()
        } else {
            format!("{}: {note}", target.label())
        };
        for (other, (other_verdict, _)) in &verdicts {
            if other != target {
                let _ = write!(
                    text,
                    "{}{}: {}",
                    if text.is_empty() { "" } else { "; " },
                    other.label(),
                    other_verdict.label()
                );
            }
        }
        outcome.verdict = *verdict;
        outcome.note = text;
    }
}

fn details(root: &Path, outcomes: &[Outcome]) -> String {
    let mut out = String::from("shader\tverdict\tnote\n");
    for outcome in outcomes {
        let shader = outcome.shader.strip_prefix(root).unwrap_or(&outcome.shader);
        let _ = writeln!(
            out,
            "{}\t{}\t{}",
            shader.display(),
            outcome.verdict.label(),
            outcome.note.replace(['\t', '\n'], " ")
        );
    }
    out
}

fn summary(outcomes: &[Outcome]) -> String {
    let mut counts: BTreeMap<Verdict, usize> = BTreeMap::new();
    let mut causes: BTreeMap<(Verdict, String), usize> = BTreeMap::new();
    for outcome in outcomes {
        *counts.entry(outcome.verdict).or_default() += 1;
        if outcome.verdict.is_failure() {
            *causes
                .entry((outcome.verdict, cause(&outcome.note)))
                .or_default() += 1;
        }
    }

    let mut out = format!("{} shaders\n", outcomes.len());
    for (verdict, count) in &counts {
        let _ = writeln!(out, "{count:>6}  {}", verdict.label());
    }
    let mut causes: Vec<_> = causes.into_iter().collect();
    causes.sort_by(|a, b| b.1.cmp(&a.1));
    if !causes.is_empty() {
        out.push_str("\nfailures by cause\n");
    }
    for ((verdict, cause), count) in causes {
        let _ = writeln!(out, "{count:>6}  {}  {cause}", verdict.label());
    }
    out
}

fn cause(note: &str) -> String {
    let mut words = note.split(' ');
    let phase = words.next().unwrap_or_default();
    let line = words.next().unwrap_or_default();
    let is_diagnostic = line == "-" || line.parse::<u32>().is_ok();
    let message = if is_diagnostic {
        format!("{phase}: {}", words.collect::<Vec<_>>().join(" "))
    } else {
        note.to_string()
    };
    message.chars().take(100).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn groups_failures_by_message() {
        assert_eq!(
            cause("parse 12 Unknown function 'foo'"),
            "parse: Unknown function 'foo'"
        );
        assert_eq!(cause("validate - bad"), "validate: bad");
        assert_eq!(cause("thread panicked"), "thread panicked");
    }
}
