use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Mutex, PoisonError};
use std::time::Duration;

use anyhow::{Context, Result, bail};

use crate::corpus::STAGE_EXTENSIONS;
use crate::exec::{self, Executor, TargetId, TargetSpec};
use crate::fuzz_exec::{self, Run, Staged};
use crate::oracles;
use crate::process::{self, Exit};
use crate::worker::{EXIT_ACCEPTED, EXIT_BACKEND_FAILED, EXIT_REJECTED};

#[derive(Debug)]
pub struct Options {
    pub shaders: PathBuf,
    pub jobs: Option<usize>,
    pub timeout_secs: u64,
    pub exec: Vec<TargetSpec>,
    pub exec_glslang: bool,
    pub optimize: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Verdict {
    Agree,
    GlslangRejects,
    WeReject,
    BackendFailed,
    InvalidSpirv,
    Crash,
    OptimizerFailed,
    InvalidSpirvOptimized,
    ExecSkipped,
    WrongResultSpirvOpt,
    WrongResultGlslang,
    ExecError,
    ExecFailed,
    WrongResult,
    ExecFailedOptimized,
    WrongResultOptimized,
}

impl Verdict {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Agree => "agree",
            Self::GlslangRejects => "glslang-rejects",
            Self::WeReject => "we-reject",
            Self::BackendFailed => "backend-failed",
            Self::InvalidSpirv => "invalid-spirv",
            Self::Crash => "crash",
            Self::OptimizerFailed => "optimizer-failed",
            Self::InvalidSpirvOptimized => "invalid-spirv-O",
            Self::ExecSkipped => "exec-skipped",
            Self::WrongResultSpirvOpt => "wrong-result-spirv-opt",
            Self::WrongResultGlslang => "wrong-result-glslang",
            Self::ExecError => "exec-error",
            Self::ExecFailed => "exec-failed",
            Self::WrongResult => "wrong-result",
            Self::ExecFailedOptimized => "exec-failed-O",
            Self::WrongResultOptimized => "wrong-result-O",
        }
    }

    pub const fn is_failure(self) -> bool {
        matches!(
            self,
            Self::WeReject
                | Self::BackendFailed
                | Self::InvalidSpirv
                | Self::Crash
                | Self::OptimizerFailed
                | Self::InvalidSpirvOptimized
                | Self::ExecError
                | Self::ExecFailed
                | Self::WrongResult
                | Self::ExecFailedOptimized
                | Self::WrongResultOptimized
        )
    }
}

#[derive(Debug)]
pub struct Outcome {
    pub shader: PathBuf,
    pub verdict: Verdict,
    pub note: String,
    pub spirv: PathBuf,
}

pub fn run(root: &Path, options: Options) -> Result<()> {
    let glslang = oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?;
    let spirv_val = oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?;
    let work = crate::fuzz_libfuzzer::fuzz_root(root).join("differential");
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
            scope.spawn(|| {
                loop {
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
                        options.optimize,
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

    let optimizer = match (options.optimize, options.exec.is_empty()) {
        (true, false) => Some(Optimizer {
            spirv_opt: oracles::find_tool(root, "spirv-opt", "RGLSL_SPIRV_OPT")?.path,
            timeout,
        }),
        _ => None,
    };
    let executors = exec::open_executors(
        &options.exec,
        root,
        &glslang.path,
        &work.join("exec"),
        timeout,
        exec::events::DEFAULT_MAX_RESETS,
    )?;
    let judgements = exec::parallel_map(&executors, |executor| {
        metamorphic(
            executor,
            &outcomes,
            options.exec_glslang,
            options.optimize,
            optimizer.as_ref(),
        )
    });
    let per_target: Vec<(TargetId, Vec<Judgement>)> = executors
        .iter()
        .map(|executor| executor.target.clone())
        .zip(judgements)
        .collect();
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

pub fn collect_shaders(dir: &Path) -> Result<Vec<PathBuf>> {
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

pub fn optimized_module(spirv: &Path) -> PathBuf {
    spirv.with_extension("O.spv")
}

pub fn compare(
    glslang: &Path,
    spirv_val: &Path,
    self_exe: &Path,
    shader: &Path,
    spirv: &Path,
    timeout: Duration,
    optimize: bool,
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

    if let Some((verdict, note)) = ours(self_exe, stage, shader, spirv, None, timeout)? {
        return Ok(outcome(verdict, note));
    }
    if let Some(note) = invalid(spirv_val, spirv, timeout)? {
        return Ok(outcome(Verdict::InvalidSpirv, note));
    }
    if optimize {
        let optimized = optimized_module(spirv);
        if let Some((_, note)) = ours(self_exe, stage, shader, &optimized, Some("O"), timeout)? {
            return Ok(outcome(Verdict::OptimizerFailed, note));
        }
        if let Some(note) = invalid(spirv_val, &optimized, timeout)? {
            return Ok(outcome(Verdict::InvalidSpirvOptimized, note));
        }
    }
    Ok(outcome(Verdict::Agree, String::new()))
}

fn ours(
    self_exe: &Path,
    stage: &str,
    shader: &Path,
    spirv: &Path,
    level: Option<&str>,
    timeout: Duration,
) -> Result<Option<(Verdict, String)>> {
    let mut ours = Command::new(self_exe);
    ours.arg("compile-one")
        .args(["--stage", stage, "--spv", "1.0", "--out"])
        .arg(spirv);
    if let Some(level) = level {
        ours.arg(format!("--opt={level}"));
    }
    ours.arg(shader);
    let ours = process::run(ours, timeout)?;
    let diagnostic = ours
        .stdout
        .lines()
        .find_map(|line| line.strip_prefix("E "))
        .unwrap_or_default()
        .to_string();
    Ok(match ours.exit {
        Exit::Code(EXIT_ACCEPTED) => None,
        Exit::Code(EXIT_REJECTED) => Some((Verdict::WeReject, diagnostic)),
        Exit::Code(EXIT_BACKEND_FAILED) => Some((Verdict::BackendFailed, diagnostic)),
        Exit::Code(_) | Exit::Signal => {
            let note = ours
                .stderr
                .lines()
                .find(|line| !line.trim().is_empty())
                .unwrap_or("crashed");
            Some((Verdict::Crash, note.to_string()))
        }
        Exit::Timeout => Some((Verdict::Crash, "timeout".to_string())),
    })
}

fn invalid(spirv_val: &Path, spirv: &Path, timeout: Duration) -> Result<Option<String>> {
    let mut validator = Command::new(spirv_val);
    validator.args(["--target-env", "vulkan1.0"]).arg(spirv);
    let validation = process::run(validator, timeout)?;
    if matches!(validation.exit, Exit::Code(0)) {
        return Ok(None);
    }
    Ok(Some(
        validation
            .stderr
            .lines()
            .chain(validation.stdout.lines())
            .find(|line| !line.trim().is_empty())
            .unwrap_or("spirv-val failed")
            .to_string(),
    ))
}

type RunPair = (Run, Option<Run>, Option<Run>);

#[derive(Debug)]
struct Optimizer {
    spirv_opt: PathBuf,
    timeout: Duration,
}
type StagedPair = (Staged, Option<Staged>, Option<Staged>);
type Judgement = Option<(Verdict, String)>;

fn stage_all(
    executor: &Executor,
    outcomes: &[Outcome],
    glslang: bool,
    optimize: bool,
) -> Vec<StagedPair> {
    let indices: Vec<usize> = (0..outcomes.len()).collect();
    exec::parallel_map(&indices, |index| {
        let Some(outcome) = outcomes.get(*index) else {
            return (Staged::Refused(String::new()), None, None);
        };
        if outcome.verdict != Verdict::Agree || fuzz_exec::family_of(&outcome.shader).is_none() {
            return (Staged::Refused(String::new()), None, None);
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
        let optimized = optimize.then(|| {
            fuzz_exec::stage_module(
                executor,
                &optimized_module(&outcome.spirv),
                json.as_deref(),
                &dir,
                "rglsl-O",
            )
        });
        (ours, theirs, optimized)
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
        if let Some((ours, theirs, optimized)) = staged.get(*index) {
            for stage in std::iter::once(ours)
                .chain(theirs.iter())
                .chain(optimized.iter())
            {
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
        let Some((ours, theirs, optimized)) = staged.get(*index) else {
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
        let optimized = optimized.as_ref().map(&mut finish);
        runs.insert(*index, (ours, theirs, optimized));
    }
    runs
}

fn differs(
    reference: &Run,
    variant: &Run,
    tolerance: fuzz_exec::Tolerance,
) -> Option<Result<String, String>> {
    match (reference, variant) {
        (
            Run::Ran {
                plan: reference_plan,
                outputs: reference_outputs,
            },
            Run::Ran { plan, outputs },
        ) => fuzz_exec::compare_runs(
            (reference_plan, reference_outputs),
            (plan, outputs),
            tolerance,
        )
        .err()
        .map(Ok),
        (Run::Ran { .. }, Run::Failed(error)) => Some(Err(error.clone())),
        _ => None,
    }
}

fn judge(outcomes: &[Outcome], runs: &BTreeMap<usize, RunPair>, index: usize) -> Judgement {
    let judged = judge_unoptimized(outcomes, runs, index)?;
    if judged.0.is_failure() {
        return Some(judged);
    }
    let (ours, _, optimized) = runs.get(&index)?;
    if let Some(error) = not_run(&[("rglsl's -O module", optimized.as_ref())]) {
        return Some(error);
    }
    Some(match (ours, optimized) {
        (Run::Ran { .. }, Some(optimized)) => {
            match differs(ours, optimized, fuzz_exec::Tolerance::OneLevel) {
                Some(Ok(difference)) => (
                    Verdict::WrongResultOptimized,
                    format!("-O differs from the unoptimized module: {difference}"),
                ),
                Some(Err(error)) => (
                    Verdict::ExecFailedOptimized,
                    format!("-O fails, the unoptimized module runs: {error}"),
                ),
                None => judged,
            }
        }
        _ => judged,
    })
}

fn judge_unoptimized(
    outcomes: &[Outcome],
    runs: &BTreeMap<usize, RunPair>,
    index: usize,
) -> Judgement {
    let outcome = outcomes.get(index)?;
    if outcome.verdict != Verdict::Agree {
        return None;
    }
    let reference = fuzz_exec::family_of(&outcome.shader)?;
    let (ours, theirs, _) = runs.get(&index)?;
    let reference_index = outcomes.iter().position(|o| o.shader == reference);
    let reference_runs = reference_index.and_then(|i| runs.get(&i));
    let mut modules = vec![
        ("rglsl's module", Some(ours)),
        ("glslang's module", theirs.as_ref()),
    ];
    if reference != outcome.shader {
        modules.push(("the reference's rglsl module", reference_runs.map(|r| &r.0)));
        modules.push((
            "the reference's glslang module",
            reference_runs.and_then(|r| r.1.as_ref()),
        ));
    }
    if let Some(error) = not_run(&modules) {
        return Some(error);
    }
    Some(if reference == outcome.shader {
        match (ours, theirs) {
            (Run::NotExecuted(why), _) => exec_error("rglsl's module", why),
            (Run::Refused(why), _) => (Verdict::ExecSkipped, why.clone()),
            (Run::Failed(why), Some(Run::Failed(_))) => (
                Verdict::ExecSkipped,
                format!("glslang's module fails on the driver too: {why}"),
            ),
            (Run::Failed(why), _) => (Verdict::ExecFailed, why.clone()),
            (Run::Ran { .. }, Some(theirs)) => {
                match differs(theirs, ours, fuzz_exec::Tolerance::Exact) {
                    Some(Ok(difference)) => (
                        Verdict::WrongResult,
                        format!("differs from glslang's reference: {difference}"),
                    ),
                    _ => (Verdict::Agree, String::new()),
                }
            }
            (Run::Ran { .. }, None) => (Verdict::Agree, String::new()),
        }
    } else {
        match (reference_runs, ours) {
            (_, Run::NotExecuted(why)) => exec_error("rglsl's module", why),
            (_, Run::Refused(why)) => (Verdict::ExecSkipped, why.clone()),
            (_, Run::Failed(why)) => match theirs {
                Some(Run::Failed(_)) => (
                    Verdict::ExecSkipped,
                    format!("glslang's module fails on the driver too: {why}"),
                ),
                _ => (Verdict::ExecFailed, why.clone()),
            },
            (Some((reference_ours @ Run::Ran { .. }, reference_theirs, _)), Run::Ran { .. }) => {
                let glslang_difference = match (reference_theirs, theirs) {
                    (Some(reference_theirs), Some(theirs)) => {
                        differs(reference_theirs, theirs, fuzz_exec::Tolerance::Exact)
                            .map(|d| d.unwrap_or_else(|e| e))
                    }
                    _ => None,
                };
                match (
                    differs(reference_ours, ours, fuzz_exec::Tolerance::Exact),
                    glslang_difference,
                ) {
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
            (Some((reference, _, _)), Run::Ran { .. }) => (
                Verdict::ExecSkipped,
                match reference {
                    Run::Refused(why) | Run::Failed(why) | Run::NotExecuted(why) => {
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

fn exec_error(module: &str, why: &str) -> (Verdict, String) {
    (
        Verdict::ExecError,
        format!("the target did not run {module}: {why}"),
    )
}

fn not_run(modules: &[(&str, Option<&Run>)]) -> Judgement {
    modules.iter().find_map(|(module, run)| match run {
        Some(Run::NotExecuted(why)) => Some(exec_error(module, why)),
        _ => None,
    })
}

const fn optimizer_differs(verdict: Verdict) -> bool {
    matches!(
        verdict,
        Verdict::WrongResultOptimized | Verdict::ExecFailedOptimized
    )
}

fn judge_spirv_opt(judged: (Verdict, String), ours: &Run, spirv_opt: &Run) -> (Verdict, String) {
    let (verdict, note) = judged;
    if !optimizer_differs(verdict) {
        return (verdict, note);
    }
    match (
        spirv_opt,
        differs(ours, spirv_opt, fuzz_exec::Tolerance::OneLevel),
    ) {
        (Run::Ran { .. }, Some(Ok(difference))) => (
            Verdict::WrongResultSpirvOpt,
            format!("{note}; spirv-opt -O of the unoptimized module differs too: {difference}"),
        ),
        (Run::Failed(why), _) => (
            Verdict::WrongResultSpirvOpt,
            format!("{note}; spirv-opt -O of the unoptimized module fails too: {why}"),
        ),
        (Run::Ran { .. }, _) => (
            verdict,
            format!("{note}; spirv-opt -O of the unoptimized module matches it"),
        ),
        (Run::Refused(why) | Run::NotExecuted(why), _) => (
            verdict,
            format!("{note}; spirv-opt -O of the unoptimized module did not run: {why}"),
        ),
    }
}

fn spirv_opt_module(optimizer: &Optimizer, spirv: &Path, out: &Path) -> Result<(), String> {
    let mut command = Command::new(&optimizer.spirv_opt);
    command
        .args(["-O", "--skip-validation", "--target-env=vulkan1.0"])
        .arg(spirv)
        .arg("-o")
        .arg(out);
    let output = process::run(command, optimizer.timeout).map_err(|e| format!("{e:#}"))?;
    if matches!(output.exit, Exit::Code(0)) {
        return Ok(());
    }
    Err(format!(
        "spirv-opt -O failed: {}",
        exec::amber::first_line(&output.stderr, &output.stdout)
    ))
}

fn check_spirv_opt(
    executor: &Executor,
    outcomes: &[Outcome],
    runs: &BTreeMap<usize, RunPair>,
    judgements: &mut [Judgement],
    optimizer: &Optimizer,
) {
    let indices: Vec<usize> = judgements
        .iter()
        .enumerate()
        .filter(|(_, j)| j.as_ref().is_some_and(|(v, _)| optimizer_differs(*v)))
        .map(|(i, _)| i)
        .collect();
    if indices.is_empty() {
        return;
    }
    eprintln!(
        "[xtask] running spirv-opt -O of {} shaders whose -O module differs on the {} target",
        indices.len(),
        executor.target.label()
    );
    let staged: Vec<Staged> = exec::parallel_map(&indices, |index| {
        let Some(outcome) = outcomes.get(*index) else {
            return Staged::Refused("no shader".into());
        };
        let dir = executor
            .work_dir()
            .join("fuzz")
            .join(format!("exec{index}"));
        let module = dir.join("spirv-opt.O.spv");
        if let Err(error) = spirv_opt_module(optimizer, &outcome.spirv, &module) {
            return Staged::Refused(error);
        }
        let json = fuzz_exec::job_json(&outcome.shader);
        fuzz_exec::stage_module(executor, &module, json.as_deref(), &dir, "spirv-opt-O")
    });
    let jobs: Vec<_> = staged
        .iter()
        .filter_map(|stage| match stage {
            Staged::Ready { job, .. } => Some(job.clone()),
            Staged::Refused(_) => None,
        })
        .collect();
    let mut results = executor.confirm_jobs(&jobs).into_iter();
    for (index, stage) in indices.into_iter().zip(&staged) {
        let result = match stage {
            Staged::Ready { .. } => results.next(),
            Staged::Refused(_) => None,
        };
        let spirv_opt = fuzz_exec::finish(stage, result);
        let (Some(slot), Some((ours, _, _))) = (judgements.get_mut(index), runs.get(&index)) else {
            continue;
        };
        *slot = slot
            .take()
            .map(|judged| judge_spirv_opt(judged, ours, &spirv_opt));
    }
}

const fn needs_confirmation(verdict: Verdict) -> bool {
    matches!(
        verdict,
        Verdict::WrongResult
            | Verdict::WrongResultGlslang
            | Verdict::ExecFailed
            | Verdict::WrongResultOptimized
            | Verdict::ExecFailedOptimized
    )
}

fn metamorphic(
    executor: &Executor,
    outcomes: &[Outcome],
    glslang: bool,
    optimize: bool,
    optimizer: Option<&Optimizer>,
) -> Vec<Judgement> {
    let staged = stage_all(executor, outcomes, glslang, optimize);
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
    if let Some(optimizer) = optimizer {
        check_spirv_opt(executor, outcomes, &runs, &mut judgements, optimizer);
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
                    .map(|j| (target.clone(), j))
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
            if other != target && other_verdict != verdict {
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
    let mut out = String::from("input\tverdict\tnote\n");
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

pub fn cause(note: &str) -> String {
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

    #[test]
    fn a_variant_that_fails_for_glslang_too_is_skipped() -> anyhow::Result<()> {
        let dir = std::env::temp_dir().join(format!("rglsl-judge-{}", std::process::id()));
        fs::create_dir_all(&dir)?;
        fs::write(dir.join("reference.frag"), "")?;
        fs::write(dir.join("variant_000.frag"), "")?;
        let outcome = |name: &str| Outcome {
            shader: dir.join(name),
            verdict: Verdict::Agree,
            note: String::new(),
            spirv: PathBuf::new(),
        };
        let outcomes = [outcome("reference.frag"), outcome("variant_000.frag")];
        let lost = || Run::Failed("device lost".to_string());
        let verdict = |theirs: Option<Run>| {
            let runs = BTreeMap::from([
                (0, (lost(), Some(lost()), None)),
                (1, (lost(), theirs, None)),
            ]);
            judge(&outcomes, &runs, 1).map(|(verdict, _)| verdict)
        };
        assert_eq!(verdict(Some(lost())), Some(Verdict::ExecSkipped));
        assert_eq!(verdict(None), Some(Verdict::ExecFailed));
        assert_eq!(
            verdict(Some(Run::Refused(String::new()))),
            Some(Verdict::ExecFailed)
        );
        fs::remove_dir_all(&dir)?;
        Ok(())
    }

    #[test]
    fn a_job_the_target_did_not_run_is_an_exec_error() -> anyhow::Result<()> {
        let dir = std::env::temp_dir().join(format!("rglsl-not-run-{}", std::process::id()));
        fs::create_dir_all(&dir)?;
        fs::write(dir.join("reference.frag"), "")?;
        fs::write(dir.join("variant_000.frag"), "")?;
        let outcome = |name: &str| Outcome {
            shader: dir.join(name),
            verdict: Verdict::Agree,
            note: String::new(),
            spirv: PathBuf::new(),
        };
        let outcomes = [outcome("reference.frag"), outcome("variant_000.frag")];
        let offline = || Run::NotExecuted("remote target: ssh: connect timed out".to_string());
        let ran = || -> anyhow::Result<Run> {
            Ok(Run::Ran {
                plan: Box::new(plan()?),
                outputs: outputs(1),
            })
        };
        let cases = [
            ((offline(), Some(offline())), (offline(), Some(offline()))),
            ((ran()?, Some(ran()?)), (offline(), Some(offline()))),
            ((ran()?, Some(ran()?)), (ran()?, Some(offline()))),
            ((offline(), Some(ran()?)), (ran()?, Some(ran()?))),
        ];
        for ((reference_ours, reference_theirs), (ours, theirs)) in cases {
            let runs = BTreeMap::from([
                (0, (reference_ours, reference_theirs, None)),
                (1, (ours, theirs, None)),
            ]);
            let judged = judge(&outcomes, &runs, 1);
            assert!(
                judged.as_ref().is_some_and(|(verdict, note)| {
                    *verdict == Verdict::ExecError
                        && verdict.is_failure()
                        && note.contains("did not run")
                        && note.contains("ssh: connect timed out")
                }),
                "{judged:?}"
            );
        }
        let runs = BTreeMap::from([
            (0, (ran()?, Some(ran()?), None)),
            (1, (ran()?, Some(ran()?), Some(offline()))),
        ]);
        assert_eq!(
            judge(&outcomes, &runs, 1).map(|(verdict, _)| verdict),
            Some(Verdict::ExecError)
        );
        let runs = BTreeMap::from([(0, (offline(), Some(offline()), None))]);
        assert_eq!(
            judge(&outcomes, &runs, 0).map(|(verdict, _)| verdict),
            Some(Verdict::ExecError)
        );
        fs::remove_dir_all(&dir)?;
        Ok(())
    }

    fn plan() -> anyhow::Result<crate::exec::plan::Plan> {
        use crate::exec::plan::{Inputs, Plan, Target};
        use crate::exec::reflect::{Reflection, Scalar, ScalarKind, Slot};
        let reflection = Reflection::new(spirv::ExecutionModel::GLCompute);
        let mut plan = Plan::new(&reflection, &Inputs::default())
            .map_err(|refusal| anyhow::anyhow!("{refusal:?}"))?;
        plan.targets.push(Target {
            name: "buffer".into(),
            buffer: "b".into(),
            dump: "dump:0:0".into(),
            slots: vec![Slot {
                offset: 0,
                scalar: Scalar {
                    kind: ScalarKind::Uint,
                    width: 32,
                },
            }],
        });
        Ok(plan)
    }

    fn outputs(value: u32) -> crate::exec::Outputs {
        [("dump:0:0".to_string(), value.to_le_bytes().to_vec())]
            .into_iter()
            .collect()
    }

    #[test]
    fn an_optimizer_difference_that_spirv_opt_shares_is_not_ours() -> anyhow::Result<()> {
        let run = |value: u32| -> anyhow::Result<Run> {
            Ok(Run::Ran {
                plan: Box::new(plan()?),
                outputs: outputs(value),
            })
        };
        let differs = (
            Verdict::WrongResultOptimized,
            "-O differs from the unoptimized module: x".to_string(),
        );
        let fails = (
            Verdict::ExecFailedOptimized,
            "-O fails, the unoptimized module runs: y".to_string(),
        );
        let ours = run(1)?;
        let (verdict, note) = judge_spirv_opt(differs.clone(), &ours, &run(2)?);
        assert_eq!(verdict, Verdict::WrongResultSpirvOpt);
        assert!(!verdict.is_failure());
        assert!(note.contains("spirv-opt -O of the unoptimized module differs too"));
        let failed = Run::Failed("device lost".into());
        assert_eq!(
            judge_spirv_opt(fails.clone(), &ours, &failed).0,
            Verdict::WrongResultSpirvOpt
        );
        let (verdict, note) = judge_spirv_opt(differs.clone(), &ours, &run(1)?);
        assert_eq!(verdict, Verdict::WrongResultOptimized);
        assert!(note.ends_with("spirv-opt -O of the unoptimized module matches it"));
        assert_eq!(
            judge_spirv_opt(fails, &ours, &run(1)?).0,
            Verdict::ExecFailedOptimized
        );
        for other in [Run::Refused("no".into()), Run::NotExecuted("ssh".into())] {
            assert_eq!(
                judge_spirv_opt(differs.clone(), &ours, &other).0,
                Verdict::WrongResultOptimized
            );
        }
        let agree = (Verdict::Agree, String::new());
        assert_eq!(judge_spirv_opt(agree, &ours, &run(2)?).0, Verdict::Agree);
        Ok(())
    }

    #[test]
    fn failures_outrank_the_other_verdicts_in_a_merge() {
        let failures = [
            Verdict::ExecError,
            Verdict::ExecFailed,
            Verdict::WrongResult,
            Verdict::ExecFailedOptimized,
            Verdict::WrongResultOptimized,
        ];
        let others = [
            Verdict::Agree,
            Verdict::ExecSkipped,
            Verdict::WrongResultSpirvOpt,
            Verdict::WrongResultGlslang,
        ];
        for failure in failures {
            assert!(failure.is_failure());
            for other in others {
                assert!(!other.is_failure());
                assert!(failure > other, "{failure:?} vs {other:?}");
            }
        }
        assert!(Verdict::WrongResult > Verdict::ExecError);
        let mut outcomes = [Outcome {
            shader: PathBuf::from("v.frag"),
            verdict: Verdict::Agree,
            note: String::new(),
            spirv: PathBuf::new(),
        }];
        let per_target = [
            (
                TargetId::Local,
                vec![Some((Verdict::WrongResultSpirvOpt, "spirv".to_string()))],
            ),
            (
                TargetId::Remote("amd".into()),
                vec![Some((Verdict::ExecError, "offline".to_string()))],
            ),
        ];
        merge(&mut outcomes, &per_target);
        assert_eq!(outcomes[0].verdict, Verdict::ExecError);
        assert!(outcomes[0].note.starts_with("amd: offline"));
    }
}
